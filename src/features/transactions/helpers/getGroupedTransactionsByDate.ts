import { TTransaction } from "../schema";

export interface IGroupedTransactionsByDate {
  date: string;
  transactions: TTransaction[];
}

/**
 * Groups an array of transactions by their date
 * @param transactions Array of transactions to group
 * @returns Array of objects containing date and transactions for that date
 */
export function getGroupedTransactionsByDate(
  transactions: TTransaction[]
): IGroupedTransactionsByDate[] {
  // Use a map to group transactions by date
  const groupedMap = transactions.reduce((acc, transaction) => {
    const date = transaction.date;

    if (!acc.has(date)) {
      acc.set(date, []);
    }

    acc.get(date)?.push(transaction);
    return acc;
  }, new Map<string, TTransaction[]>());

  // Convert map to array and sort by date (most recent first)
  const result = Array.from(groupedMap.entries()).map(
    ([date, transactions]) => ({
      date,
      transactions,
    })
  );

  // Sort by date in descending order (newest first)
  result.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return result;
}
