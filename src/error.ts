export function handleError(error: unknown): string {
  let errorMessage = "An unexpected error occurred";

  if (error instanceof AggregateError) {
    errorMessage = error.errors
      .map((err) => (err instanceof Error ? err.message : String(err)))
      .filter((msg) => msg)
      .join("; ") || "Multiple errors occurred";
  } else if (error instanceof Error) {
    errorMessage = error.message || errorMessage;
  } else if (typeof error === "string") {
    errorMessage = error || errorMessage;
  } else {
    errorMessage = String(error) || errorMessage;
  }

  return errorMessage;
}