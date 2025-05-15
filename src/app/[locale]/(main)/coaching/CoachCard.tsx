import { User } from "@prisma/client";
import { BadgeCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CoachCardProps {
  coach: User;
}

const CoachCard = async ({ coach }: CoachCardProps) => {
  const t = await getTranslations("CoachingPage");
  return (
    <Link
      href={`/edit-member/${coach.id}`}
      className="max-w-lg w-full border-b-primary-red border-b-2 p-5 flex flex-col gap-5 hover:scale-105 transition-all hover:bg-gray-100"
    >
      <div className="flex gap-5 items-center">
        <Image
          src={coach.image ?? "/assets/no-pic.svg"}
          width={70}
          height={70}
          alt={coach.firstName}
          className="rounded-full border-[3px] border-primary-red"
        />
        <h1 className="text-xl font-bold text-primary-blue flex items-center gap-3">
          {t("CoachPrefix")} {coach.firstName} {coach.lastName}{" "}
          <BadgeCheck color="#A41623" />
        </h1>
      </div>
      <p>{coach.info}</p>
      <span className="text-sm text-white mt-auto">{t("ShowProfile")}</span>
    </Link>
  );
};

export default CoachCard;
