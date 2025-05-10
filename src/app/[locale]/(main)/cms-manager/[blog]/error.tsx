"use client";
export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col gap-4 w-screen items-center justify-center p-12 md:p-24">
      <h1 className="text-4xl font-bold">Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
