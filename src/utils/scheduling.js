export function parseDisplayTime(value) {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?(am|pm)$/i);
  if (!match) return null;

  let hour = Number(match[1]);
  const minutes = match[2] ? Number(match[2]) : 0;
  if (hour < 1 || hour > 12 || minutes > 59) return null;

  const ampm = match[3].toLowerCase();
  if (ampm === 'pm' && hour !== 12) hour += 12;
  if (ampm === 'am' && hour === 12) hour = 0;
  return hour + minutes / 60;
}

export function validateTimeRange(fromTime, toTime) {
  const start = parseDisplayTime(fromTime);
  const end = parseDisplayTime(toTime);

  if (start === null || end === null) {
    return { error: 'Enter times like 1:00pm or 2:30pm.' };
  }

  if (end <= start) {
    return { error: 'The end time must be later than the start time.' };
  }

  return { start, end, error: null };
}
