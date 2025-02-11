import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-lvh">
      <Image src="/assets/logo.svg" alt="Logo" width={128} height={128} />
    </div>
  );
}
