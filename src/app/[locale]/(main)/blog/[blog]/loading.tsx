import Loader from "@/components/loader/Loader";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 w-screen items-center justify-center p-12 md:p-24">
      <Loader />
    </div>
  );
}
