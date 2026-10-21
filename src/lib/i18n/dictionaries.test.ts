import { describe, expect, it } from "vitest";
import { dictionaries } from "./dictionaries";

function keys(value: unknown, path = ""): string[] {
  if (!value || typeof value !== "object") return [path];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => keys(item, `${path}[${index}]`));
  }
  return Object.entries(value).flatMap(([key, item]) =>
    keys(item, path ? `${path}.${key}` : key),
  );
}

describe("Tension dictionaries", () => {
  it("keeps English and Traditional Chinese Tension keys in parity", () => {
    expect(keys(dictionaries.en.pages.tension).sort()).toEqual(
      keys(dictionaries.zh.pages.tension).sort(),
    );
  });
});
