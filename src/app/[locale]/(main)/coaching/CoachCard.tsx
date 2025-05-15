import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CoachCardProps {
  coach: User;
}

const CoachCard = ({ coach }: CoachCardProps) => {
  return (
    <Link
      href={`/profile/${coach.id}`}
      className="max-w-md w-full bg-primary-red rounded-3xl p-5 flex gap-5 items-center"
    >
      <Image
        src={coach.image ?? "/assets/no-pic.svg"}
        width={90}
        height={90}
        alt={coach.firstName}
        className="rounded-3xl"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-white">
          C: {coach.firstName} {coach.lastName}
        </h1>
        <span className="text-sm text-white mt-auto">Show profile</span>
      </div>
    </Link>
  );
};

export default CoachCard;
