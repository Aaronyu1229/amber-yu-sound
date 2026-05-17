-- ============ Insights CMS schema ============
-- Run this in the Supabase SQL editor for the project.

-- 1. Admin allowlist table (RLS source of truth, kept in sync by seed script)
create table if not exists public.admin_emails (
  email text primary key
);
alter table public.admin_emails enable row level security;
-- No policies: table is only read by the SECURITY DEFINER helper below and
-- written by the service-role seed script (which bypasses RLS).

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_emails
    where email = lower((auth.jwt() ->> 'email'))
  );
$$;

-- 2. Insights table
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  date date not null,
  author text not null,
  cover_image text not null default '',
  gradient text not null default 'from-amber-900/40 to-purple-900/40',
  en jsonb not null,
  zh jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.insights enable row level security;

-- Public: read only published
create policy "public reads published"
  on public.insights for select
  using (status = 'published');

-- Admin: full read
create policy "admin reads all"
  on public.insights for select
  using (public.is_admin());

create policy "admin inserts"
  on public.insights for insert
  with check (public.is_admin());

create policy "admin updates"
  on public.insights for update
  using (public.is_admin())
  with check (public.is_admin());

-- No DELETE policy: deletion is soft (status='archived'). Hard delete blocked.

-- 3. Storage bucket for images
insert into storage.buckets (id, name, public)
values ('insights', 'insights', true)
on conflict (id) do nothing;

create policy "public reads insight images"
  on storage.objects for select
  using (bucket_id = 'insights');

create policy "admin writes insight images"
  on storage.objects for insert
  with check (bucket_id = 'insights' and public.is_admin());

create policy "admin updates insight images"
  on storage.objects for update
  using (bucket_id = 'insights' and public.is_admin());
