import { Spinner } from "@/components/Spinner";

export default function PayeePageLoading() {
  return (
    <div className="m-4">
      <div className="flex justify-center items-center gap-2 mt-4">
        <div>
          <Spinner />
        </div>
        <div>Loading...</div>
      </div>
    </div>
  );
}
