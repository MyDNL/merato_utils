export function handleError(error: unknown, context?: string): string {
  let message = context ? `${context}: ` : "";
  const defaultMessage = "An unexpected error occurred";

  if (error instanceof AggregateError) {
    const messages = error.errors
      .map((err) => {
        if (err instanceof Error) {
          console.error(`[${context || "Error"}]:`, err.stack); // Log stack for debugging
          return err.message;
        }
        return String(err);
      })
      .filter(Boolean)
      .join("; ");
    return message + (messages || "Multiple errors occurred");
  }

  if (error instanceof Error) {
    console.error(`[${context || "Error"}]:`, error.stack); // Log stack for debugging
    return message + (error.message || defaultMessage);
  }

  if (typeof error === "string") {
    return message + (error || defaultMessage);
  }

  return message + (String(error) || defaultMessage);
}