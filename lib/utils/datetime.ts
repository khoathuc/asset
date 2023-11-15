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