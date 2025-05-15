import Image from "next/image";
import React from "react";
import CoachCard from "./CoachCard";
import { getTranslations } from "next-intl/server";

const CoachingPage = async () => {
  const coaches = await prisma.user.findMany({
    where: {
      role: "COACH",
      accepted: true,
    },
  });

  const t = await getTranslations('CoachingPage');

  return (
    <div className="flex flex-col overflow-hidden gap-10 md:p-10 min-h-lvh">
      <header className="flex flex-col items-center justify-center md:gap-10 gap-4 w-full">
        <Image
          src="/assets/coaching-header.png"
          alt="coaching header"
          width={500}
          height={500}
          className="md:w-1/2 w-full h-full md:rounded-3xl md:border-2 border-primary-light"
        />
        <h1 className="md:text-7xl text-5xl font-bold text-primary-blue">{t('Title')}</h1>
        <p className="text-xl p-5">
          {t('Description')}
        </p>
      </header>
      <section className="flex flex-col items-center justify-center gap-10 w-full">
        {!coaches.length ? (
          <span>{t('NoCoachesFound')}</span>
        ) : (
          coaches.map((coach) => <CoachCard coach={coach} key={coach.id} />)
        )}
      </section>
    </div>
  );
};

export default CoachingPage;
