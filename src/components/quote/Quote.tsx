import { QuoteType } from "@/types/quote-type";

const Quote = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    cache: "force-cache",
    mode: "no-cors",
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  const quote = await response
    .json()
    .then((data: QuoteType) => data)
    .catch(() => null);

  if (!quote?.data) {
    return (
      <div className="text-red-500">Error fetching quote try reloading</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Quote</h1>
      <p className="text-lg text-gray-700">{quote.data.quote}</p>
      <p className="text-lg text-gray-700 mt-2">{quote.data.author}</p>
    </div>
  );
};

export default Quote;
