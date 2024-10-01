export const formatterWithCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatterWithoutCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

export function formatDayMonthYear(timeStamp: string) {
  const day = timeStamp.substring(8, 10);
  const month = Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(timeStamp.substring(5, 7)));
  const year = timeStamp.substring(0, 4);
  return (day + " " + month + ", " + year);
}

export function formatDayWithSuffix(day: string) {
  let formattedDay = day;
  if (day.charAt(0) == '0') {
    formattedDay = day.charAt(1);
  }

  let suffix = "th";
  if (day == '1' || day == "21") {
    suffix = "st";
  } else if (day == '2' || day == '22') {
    suffix = "nd";
  } else if (day == '3' || day == '23') {
    suffix = "rd";
  }

  return formattedDay + suffix;
}