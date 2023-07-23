type ErrorWithMessageAndStatus = {
  status: number;
  message: string;
};

export function isErrorWithMessageAndStatus(
  error: unknown
): error is ErrorWithMessageAndStatus {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error
  );
}
