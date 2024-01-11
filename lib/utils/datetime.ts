export function isValidDateFormat(dateString: string) {
  // Regular expression for YYYY-MM-DD format
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormatRegex.test(dateString)) {
    return false; // Does not match the expected format
  }

  try {
    // Attempt to create a Date object
    const dateObject = new Date(dateString);

    // Check if the created Date object is a valid date
    return !isNaN(dateObject.getTime());
  } catch (error) {
    return false; // An error occurred during date creation
  }
}

export function getDateOfBeginOfMonth(year: number, month: number) {
  // Ensure month is in the valid range (1 to 12)
  if (month < 1 || month > 12) {
    throw new Error("Invalid month. Month must be between 1 and 12.");
  }

  // Create a new Date object with the specified year and month
  const firstDayOfMonth = new Date(year, month - 1, 1);

  // Set hours, minutes, seconds, and milliseconds to the beginning of the day
  firstDayOfMonth.setHours(0, 0, 0, 0);

  return firstDayOfMonth;
}


export function getDateOfEndOfMonth(year: number, month: number) {
  // Ensure month is in the valid range (1 to 12)
  if (month < 1 || month > 12) {
      throw new Error("Invalid month. Month must be between 1 and 12.");
  }

  // Create a new Date object with the next month and day 0 (last day of the current month)
  const lastDayOfCurrentMonth = new Date(year, month, 0);

  // Set hours, minutes, seconds, and milliseconds to the end of the day
  lastDayOfCurrentMonth.setHours(23, 59, 59, 999);

  return lastDayOfCurrentMonth;
}