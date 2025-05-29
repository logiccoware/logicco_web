import util from "util";

export function logData(message: string = "Logged data:", data: unknown): void {
  console.log(
    message,
    util.inspect(data, false, null, true /* enable colors */)
  );
}
