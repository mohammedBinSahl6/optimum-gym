import Image from "next/image";
import React from "react";
import CoachCard from "./CoachCard";

const CoachingPage = async () => {
  const coaches = await prisma.user.findMany({
    where: {
      role: "COACH",
      accepted: true,
    },
  });

  return (
    <div className="flex flex-col overflow-hidden gap-10 md:p-10 min-h-lvh">
      <header className="flex flex-col items-center justify-center gap-10 w-full">
        <Image
          src="/assets/coaching-header.png"
          alt="coaching header"
          width={500}
          height={500}
          className="w-1/2 h-full rounded-3xl border-2 border-primary-light"
        />
        <h1 className="text-7xl font-bold text-primary-blue">Coaching List</h1>
        <p className="text-xl">
          Find the right coach for your fitness goals and start your journey to
          success.
        </p>
      </header>
      <section className="flex flex-col items-center justify-center gap-10 w-full">
        {!coaches.length ? (
          <span>No coaches found.</span>
        ) : (
          coaches.map((coach) => <CoachCard coach={coach} key={coach.id} />)
        )}
      </section>
    </div>
  );
};

export default CoachingPage;
