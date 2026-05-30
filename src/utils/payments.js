export function findNextUnpaidAppointment(appts, dayIdx) {
  return appts
    .filter(appt => appt.dayIdx === dayIdx && !appt.paid)
    .sort((a, b) => a.start - b.start)[0] ?? null;
}

export function clampProgress(current, expected) {
  if (expected <= 0) return 0;
  return Math.min(Math.max(current / expected, 0), 1);
}
