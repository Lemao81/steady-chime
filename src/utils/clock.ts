export function minuteOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}

export function msUntilNextMinute(date: Date): number {
  return 60_000 - date.getSeconds() * 1000 - date.getMilliseconds()
}
