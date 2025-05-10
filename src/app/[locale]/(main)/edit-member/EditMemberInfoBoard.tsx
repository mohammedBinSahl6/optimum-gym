import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { User } from "@prisma/client";

const EditMemberInfoBoard = ({ userProfile }: { userProfile: User }) => {
  const getGenderIcon = () => {
    if (userProfile.gender === "MALE") {
      return <span className="text-primary-blue text-2xl">♂</span>;
    }

    return <span className="text-primary-red text-2xl">♀</span>;
  };

  const userAge = userProfile.dateOfBirth
    ? new Date().getFullYear() - userProfile?.dateOfBirth?.getFullYear()
    : "-";

  const t = useTranslations("EditMemberPage");

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
        {t("EditMemberUsername")}:{" "}
        <span className="font-medium">{userProfile.username}</span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberFirstName")}:{" "}
        <span className="font-medium">{userProfile.firstName}</span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberLastName")}:{" "}
        <span className="font-medium">{userProfile.lastName}</span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberFullName")}:{" "}
        <span className="font-medium">{userProfile.fullName}</span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberEmail")}:{" "}
        <span className="font-medium">{userProfile.email}</span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberPhoneNumber")}:
        <span className="font-medium"> {userProfile.phoneNumber}</span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberNationality")}:{" "}
        <span className="font-medium">{userProfile.nationality}</span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberDateOfBirth")}:{" "}
        <span className="font-medium">
          {userProfile.dateOfBirth?.toLocaleDateString()} -{" "}
          {t("EditMemberBoardAge", { userAge })}
        </span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberAddress")}:{" "}
        <span className="font-medium">{userProfile.address}</span>
      </span>
      <span className="text-xl font-bold">
        {t("EditMemberMoreInfo")}:{" "}
        <span className="font-medium">{userProfile.info}</span>
      </span>
    </div>
  );
};

export default EditMemberInfoBoard;
