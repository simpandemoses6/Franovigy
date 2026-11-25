// "2024/01/10" -> "10 Jan 2024"  (anything that isn't in that format is shown as typed)
export function formatDate(raw: string): string {
  const m = raw.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (!m) return raw;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
