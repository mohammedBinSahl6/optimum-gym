"use client"
import React from "react"
import { useParams } from "next/navigation"
import { Edit2Icon, User, Calendar, CreditCard } from "lucide-react"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import Loader from "@/components/loader/Loader"
import EditMemberInfoBoard from "../EditMemberInfoBoard"
import EditMemberForm from "../EditMemberForm"
import { cn } from "@/lib/utils"
import type { PrivateSessionResponse } from "@/app/actions/getPrivateSessions"
import useEditPageUserInfo from "@/hooks/useEditPageUserInfo"
import MoreInfoMembershipModal from "../MoreInfoMembershipModal"

const EditMember = () => {
  const [isEdit, setIsEdit] = React.useState(false)
  React.useState<PrivateSessionResponse[]>()
  const { data } = useSession()
  const { userId } = useParams()
  const { memberships, privateSessions, profile, loading } = useEditPageUserInfo(userId as string)
  const t = useTranslations("EditMemberPage")

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5">
        <Loader size="lg" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5">
        <div className="text-center space-y-4">
          <User className="w-16 h-16 text-primary-red mx-auto" />
          <h1 className="text-4xl font-bold text-primary-red">{t("UserNotFound")}</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-red to-primary-blue bg-clip-text text-transparent">
                {userId === data?.user?.id
                  ? t("Greeting") + " " + data?.user?.firstName + " " + data?.user?.lastName
                  : profile?.firstName + " " + profile?.lastName}{" "}
                {t("Profile")}
              </h1>
              <p className="text-primary-blue/70 text-lg">
                {profile.role === "MEMBER" ? "Member" : profile.role === "COACH" ? "Coach" : "Admin"}
              </p>
            </div>
            <button
              onClick={() => setIsEdit(!isEdit)}
              disabled={isEdit}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200",
                "bg-gradient-to-r from-primary-blue to-primary-light-blue text-white",
                "hover:shadow-lg hover:scale-105 active:scale-95",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              )}
            >
              <Edit2Icon size={20} />
              <span className="hidden sm:inline">{t("EditProfile")}</span>
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isEdit ? (
              <EditMemberForm userProfile={profile} setIsEdit={setIsEdit} />
            ) : (
              <EditMemberInfoBoard userProfile={profile} />
            )}
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-6">
              <h3 className="text-xl font-semibold text-primary-blue mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-primary-blue/70">Active Memberships</span>
                  <span className="font-semibold text-primary-red">
                    {memberships?.filter((m) => m.status === "ACTIVE").length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-blue/70">Private Sessions</span>
                  <span className="font-semibold text-primary-red">{privateSessions?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-blue/70">Member Since</span>
                  <span className="font-semibold text-primary-blue text-sm">
                    {profile.craetedAt ? new Date(profile.craetedAt).getFullYear() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Memberships Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-primary-blue to-primary-light-blue rounded-xl">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary-blue">{t("Memberships")}</h2>
          </div>

          {memberships?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberships.map((membership, index) => (
                <MoreInfoMembershipModal key={index} membership={membership}>
                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-primary-blue to-primary-light-blue rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-white/80 text-sm font-medium">{t("MembershipCardStartDate")}</p>
                            <p className="font-semibold">{membership.startDate.toLocaleDateString()}</p>
                          </div>
                          <div
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium",
                              membership.status === "ACTIVE"
                                ? "bg-green-500/20 text-green-100 border border-green-400/30"
                                : membership.status === "EXPIRED"
                                  ? "bg-red-500/20 text-red-100 border border-red-400/30"
                                  : "bg-yellow-500/20 text-yellow-100 border border-yellow-400/30",
                            )}
                          >
                            {membership.status}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-white/80 text-sm font-medium">{t("MembershipCardEndDate")}</p>
                          <p className="font-semibold">{membership.endDate.toLocaleDateString()}</p>
                        </div>

                        <div className="pt-2 border-t border-white/20">
                          <p className="text-white/90 text-sm truncate">{membership.plan}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </MoreInfoMembershipModal>
              ))}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-12 text-center">
              <CreditCard className="w-16 h-16 text-primary-light mx-auto mb-4" />
              <p className="text-primary-blue/70 text-lg">{t("NoMemberships")}</p>
            </div>
          )}
        </div>

        {/* Private Sessions Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-primary-red to-primary-red/80 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary-blue">{t("PrivateSessions")}</h2>
          </div>

          {privateSessions?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privateSessions.map((session, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-red to-primary-red/80 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {session.coach.firstName} {session.coach.lastName}
                        </p>
                        <p className="text-white/80 text-sm">{t("PrivateSessionCoach")}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">{t("PrivateSessionStartDate")}</span>
                        <span className="font-medium">{session.startSessionDate.toLocaleDateString()}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">{t("PrivateSessionLeft")}</span>
                        <div className="bg-white/20 px-3 py-1 rounded-full">
                          <span className="font-bold text-lg">{session.sessionsNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-12 text-center">
              <Calendar className="w-16 h-16 text-primary-light mx-auto mb-4" />
              <p className="text-primary-blue/70 text-lg">{t("NoPrivateSessions")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditMember
