export function handleApiError(error: unknown, defaultMessage: string): never {
  const message =
    error instanceof Error ? error.message : String(error);
  throw new Error(`${defaultMessage}: ${message}`);
}
