/**
 * Format a date string into a human-readable format.
 * If the date string is invalid, returns the original string.
 * If the date string is undefined or null, returns undefined.
 * @param dateString - The date string to format.
 * @returns The formatted date string or undefined if the input is undefined or null.
 */
export const formatDate = (dateString: string | undefined | null): string | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString + 'T00:00:00');
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const getDepartureMonth = (dateString: string | undefined | null): string | undefined => {
  if (!dateString) return undefined;
  const date = new Date(`${dateString}T00:00:00`);
  if (isNaN(date.getTime())) {
    const fallbackDate = new Date(dateString);
    if (isNaN(fallbackDate.getTime())) return undefined;
    return fallbackDate.toLocaleDateString('en-US', { month: 'long' });
  }

  return date.toLocaleDateString('en-US', { month: 'long' });
};

const getPreferredLocation = (
  city: string | undefined | null,
  destination: string | undefined | null,
): string => {
  const cityCandidate = city?.split(',')[0]?.trim();
  if (cityCandidate) return cityCandidate;

  const destinationCandidate = destination?.split(',')[0]?.trim();
  if (destinationCandidate) return destinationCandidate;

  return 'Unknown destination';
};

export const deriveTripName = (
  providedName: string | undefined | null,
  departureDate: string | undefined | null,
  city: string | undefined | null,
  destination: string | undefined | null,
): string => {
  const normalizedName = providedName?.trim();
  if (normalizedName) return normalizedName;

  const location = getPreferredLocation(city, destination);
  const month = getDepartureMonth(departureDate);

  return month ? `${month} trip to ${location}` : `Trip to ${location}`;
};

/**
 * Format an ISO time string into a human-readable format.
 * If the time string is invalid, returns the original string.
 * If the time string is undefined or null, returns undefined.
 * @param isoTime - The ISO time string to format.
 * @returns The formatted time string or undefined if the input is undefined or null.
 */
export function formatTime(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Calculate the number of nights between two dates.
 * If either of the dates is invalid or undefined/null, returns undefined.
 * @param departureDate - The departure date string.
 * @param returnDate - The return date string.
 * @returns The number of nights between the two dates, or undefined if the input is invalid.
 */
export const calculateNights = (
  departureDate: string | undefined | null,
  returnDate: string | undefined | null,
): number | undefined => {
  if (!departureDate || !returnDate) return undefined;
  const departure = new Date(departureDate + 'T00:00:00');
  const returnD = new Date(returnDate + 'T00:00:00');
  if (isNaN(departure.getTime()) || isNaN(returnD.getTime())) return undefined;
  const diffMs = returnD.getTime() - departure.getTime();
  const nights = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : undefined;
};

/**
 * Format an ISO 8601 duration string into a human-readable format.
 * If the input string does not match the ISO 8601 duration format, returns unchanged input string.
 * eg. Input: "PT1H30M" Output: "1 hour and 30 minutes"
 * eg. Input: "PT2H" Output: "2 hours"
 *
 * @param isoDuration - The ISO 8601 duration string to format.
 * @returns The formatted duration string or an empty string if the input is invalid.
 */
export const formatIsoDuration = (isoDuration: string): string => {
  // Regex to match the ISO 8601 duration format
  const matches = isoDuration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);

  // If no match, return input
  if (!matches) return isoDuration;

  const hours = matches[1];
  const minutes = matches[2];

  const formattedHours = `${hours} ${hours === '1' ? 'hour' : 'hours'}`;
  const formattedMinutes = `${minutes} ${minutes === '1' ? 'minute' : 'minutes'}`;

  // If 0 hours, return minutes
  if (hours === '0') {
    return formattedMinutes;
  }

  // If 0 minutes, return hours
  if (minutes === '0') {
    return formattedHours;
  }

  // Otherwise, return hours and minutes
  return `${formattedHours} and ${formattedMinutes}`;
};
