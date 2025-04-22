import React from "react";
import Image from "next/image";

import { User } from "@prisma/client";

const EditMemberInfoBoard = ({ userProfile }: { userProfile: User }) => {
  const getGenderIcon = () => {
    if (userProfile.gender === "MALE") {
      return <span className="text-primary-blue text-2xl">♂</span>;
    }

    return <span className="text-primary-red text-2xl">♀</span>;
  };

  const userAge =
  userProfile.dateOfBirth ?
    new Date().getFullYear() - userProfile?.dateOfBirth?.getFullYear() : '-';

  return (
    <div className="flex flex-col justify-center gap-5 border rounded-xl p-10 w-full md:w-3/4 animate-flipY">
      <Image
        src={userProfile.image ?? "/assets/no-pic.svg"}
        alt="Profile Picture"
        width={100}
        height={100}
        className="rounded-full"
      />
      {getGenderIcon()}
      <span className="bg-green-100 p-3 rounded-sm w-fit text-sm">
        {userProfile.role}
      </span>
      <span className="text-xl font-bold">
        Username: <span className="font-medium">{userProfile.username}</span>
      </span>
      <span className="text-xl font-bold">
        First Name: <span className="font-medium">{userProfile.firstName}</span>
      </span>
      <span className="text-xl font-bold">
        Last Name: <span className="font-medium">{userProfile.lastName}</span>
      </span>
      <span className="text-xl font-bold">
        Full Name: <span className="font-medium">{userProfile.fullName}</span>
      </span>
      <span className="text-xl font-bold">
        Email: <span className="font-medium">{userProfile.email}</span>
      </span>
      <span className="text-xl font-bold">
        Phone Number:{" "}
        <span className="font-medium">{userProfile.phoneNumber}</span>
      </span>
      <span className="text-xl font-bold">
        Nationality:{" "}
        <span className="font-medium">{userProfile.nationality}</span>
      </span>
      <span className="text-xl font-bold">
        Date Of Birth:{" "}
        <span className="font-medium">
          {userProfile.dateOfBirth?.toLocaleDateString() } - Age: {userAge} yrs
          old
        </span>
      </span>
      <span className="text-xl font-bold">
        Address: <span className="font-medium">{userProfile.address}</span>
      </span>
      <span className="text-xl font-bold">
        More info: <span className="font-medium">{userProfile.info}</span>
      </span>
    </div>
  );
};

export default EditMemberInfoBoard;
