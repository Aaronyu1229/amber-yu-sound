"use client";

import { motion } from "framer-motion";
import { rank } from "@/lib/tension/rank";
import type { TensionTrack } from "@/lib/tension/types";
import { useLocale } from "@/lib/i18n";
import styles from "./tension.module.css";

export function TensionProblem({ tracks }: { tracks: TensionTrack[] }) {
  const { t } = useLocale();
  const topMatches = rank(tracks, { tension: 2, excitement: 9, winImpact: 9 }, { moment: "Winning Panel" }).slice(0, 3);
  return <section className={styles.problem}><div className={styles.wrap}><div className={styles.center}><span className={styles.tag}>{t.pages.tension.problem.tag}</span><h2 className={styles.h2}>{t.pages.tension.problem.title} <em>{t.pages.tension.problem.titleHighlight}</em></h2><p className={styles.lead}>{t.pages.tension.problem.description}</p></div><div className={styles.vs}><div className={styles.vsCard}><span>{t.pages.tension.problem.today}</span><p className={styles.query}>{t.pages.tension.problem.todayQuery}</p><div className={styles.fileList}>{t.pages.tension.problem.files.map((file) => <div key={file}><span>{file}</span><span>?</span></div>)}</div><p>{t.pages.tension.problem.todayNote}</p></div><div className={`${styles.vsCard} ${styles.goodCard}`}><span>{t.pages.tension.problem.withTension}</span><p className={styles.query}>{t.pages.tension.problem.tensionQuery}</p><div className={`${styles.fileList} ${styles.goodFiles}`}>{topMatches.map((track) => <div key={track.id}><span>{track.name} — {track.label || track.moment}</span><span>{track.fit}% {t.pages.tension.demo.fit}</span></div>)}</div><p>{t.pages.tension.problem.tensionNote}</p></div></div></div></section>;
}

export default function TensionContentSections({ tracks }: { tracks: TensionTrack[] }) {
  const { t } = useLocale();
  const stats = [["1,290+", t.pages.tension.stats.annotated], ["1,240+", t.pages.tension.stats.rated], ["10", t.pages.tension.stats.dimensions], [String(tracks.length), t.pages.tension.stats.preview]];
  return <><section className={styles.tagging}><div className={styles.wrap}><div className={styles.center}><span className={styles.tag}>{t.pages.tension.tagging.tag}</span><h2 className={styles.h2}>{t.pages.tension.tagging.title} <em>{t.pages.tension.tagging.titleHighlight}</em></h2><p className={styles.lead}>{t.pages.tension.tagging.description}</p></div><div className={styles.axes}>{t.pages.tension.tagging.axes.map((axis, axisIndex) => <motion.article className={styles.axis} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={axis.title}><h3>{axis.title}</h3><p>{axis.description}</p><ul>{axis.items.map((item, itemIndex) => <li className={item.includes("→") ? styles.axisSlider : axisIndex === 2 && itemIndex < 2 ? styles.axisAuto : ""} key={item}>{item}</li>)}</ul></motion.article>)}</div><div className={styles.who}>{t.pages.tension.tagging.who.map((item) => <div key={item.title}><b>{item.title}</b><span>{item.description}</span></div>)}</div></div></section><section className={styles.stats}><div className={styles.wrap}><div className={styles.statGrid}>{stats.map(([value, label]) => <div className={styles.stat} key={label}><b>{value}</b><span>{label}</span></div>)}</div><p>{t.pages.tension.stats.note}</p></div></section><section className={styles.steps}><div className={styles.wrap}><div className={styles.center}><span className={styles.tag}>{t.pages.tension.steps.tag}</span><h2 className={styles.h2}>{t.pages.tension.steps.title} <em>{t.pages.tension.steps.titleHighlight}</em></h2></div><div className={styles.stepRow}>{t.pages.tension.steps.items.map((item, index) => <div className={styles.step} key={item.title}><i>{index + 1}</i><b>{item.title}</b><span>{item.description}</span></div>)}</div></div></section></>;
}
