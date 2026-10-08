// Öffnungsstatus in Berliner Zeit. Nach Mitternacht zählt die Zeit bis zur Schließung noch zum Vortag.
export type Hours = { day: number; open: number; close: number };
export type PubState = { day: number; open: boolean; kind: 'open' | 'today' | 'tomorrow'; time: string };

const wd: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});
export const hhmm = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

export function pubState(hours: Hours[], date = new Date()): PubState {
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  const today = wd[parts.weekday];
  const mins = Number(parts.hour) * 60 + Number(parts.minute);
  const of = (day: number) => hours.find((h) => h.day === day)!;
  const prevDay = (today + 6) % 7;
  const prev = of(prevDay);
  if (prev.close > 1440 && mins < prev.close - 1440) return { day: prevDay, open: true, kind: 'open', time: hhmm(prev.close) };
  const cur = of(today);
  if (mins >= cur.open && mins < cur.close) return { day: today, open: true, kind: 'open', time: hhmm(cur.close) };
  if (mins < cur.open) return { day: today, open: false, kind: 'today', time: hhmm(cur.open) };
  return { day: today, open: false, kind: 'tomorrow', time: hhmm(of((today + 1) % 7).open) };
}
