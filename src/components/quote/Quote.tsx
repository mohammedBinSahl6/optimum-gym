import { QuoteType } from "@/types/quote-type";
import { toast } from "sonner";

const REVALIDATE_TIME = 60 * 60 * 24; // 24 hours

const Quote = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    cache: "force-cache",
    mode: "no-cors",
    next: {
      revalidate: REVALIDATE_TIME,
    },
  });

  const quote = await response.json().then((data: QuoteType) => data);

  if (!quote?.data) {
    toast("Error fetching quote");
  }

  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-8 bg-gray-100">
      <h1 className="text:md md:text-3xl text-primary-red font-bold text-center">
        &quot;{quote.data.quote}&quot;
      </h1>
    </div>
  );
};

export default Quote;
