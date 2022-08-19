export function formatDate(date: string | Date | number): string {
  if (typeof date === 'string') date = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };
  return new Intl.DateTimeFormat(navigator.language, options)
    .format(date)
    .toString();
}
