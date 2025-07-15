"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { User } from "@prisma/client";
import {
  UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Info,
  Badge,
} from "lucide-react";

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

  const infoItems = [
    {
      icon: UserIcon,
      label: t("EditMemberUsername"),
      value: userProfile.username,
    },
    {
      icon: UserIcon,
      label: t("EditMemberFirstName"),
      value: userProfile.firstName,
    },
    {
      icon: UserIcon,
      label: t("EditMemberLastName"),
      value: userProfile.lastName,
    },
    {
      icon: UserIcon,
      label: t("EditMemberFullName"),
      value: userProfile.fullName,
    },
    {
      icon: Mail,
      label: t("EditMemberEmail"),
      value: userProfile.email,
    },
    {
      icon: Phone,
      label: t("EditMemberPhoneNumber"),
      value: userProfile.phoneNumber,
    },
    {
      icon: Globe,
      label: t("EditMemberNationality"),
      value: userProfile.nationality,
    },
    {
      icon: Calendar,
      label: t("EditMemberDateOfBirth"),
      value: userProfile.dateOfBirth
        ? `${userProfile.dateOfBirth.toLocaleDateString()} - ${t(
            "EditMemberBoardAge",
            { userAge }
          )}`
        : "-",
    },
    {
      icon: MapPin,
      label: t("EditMemberAddress"),
      value: userProfile.address,
    },
    {
      icon: Info,
      label: t("EditMemberMoreInfo"),
      value: userProfile.info,
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-8 animate-flipY">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-primary-light/30">
        <div className="relative mb-4">
          <Image
            src={userProfile.image ?? "/assets/no-pic.svg"}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full border-4 border-primary-light shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-primary-light/50">
            {getGenderIcon()}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-primary-blue">
            {userProfile.firstName} {userProfile.lastName}
          </h3>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-full">
            <Badge className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium text-sm">
              {userProfile.role}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="group p-4 rounded-xl border border-primary-light/30 hover:border-primary-blue/30 hover:bg-primary-blue/5 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-blue/10 rounded-lg group-hover:bg-primary-blue/20 transition-colors duration-200">
                <item.icon className="w-4 h-4 text-primary-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-blue/70 mb-1">
                  {item.label}
                </p>
                <p className="text-primary-blue font-medium break-words">
                  {item.value || "-"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditMemberInfoBoard;
