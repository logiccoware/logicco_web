import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Skeleton className="w-3/4 h-10 mb-4" />
      <Skeleton className="w-1/2 h-6 mb-2" />
      <Skeleton className="w-3/4 h-4 mb-2" />
      <Skeleton className="w-3/4 h-4 mb-2" />
      <Skeleton className="w-1/3 h-8 mt-6" />
      <Skeleton className="w-full h-40 mt-4" />
      <Skeleton className="w-1/4 h-10 mt-6" />
    </div>
  );
}
