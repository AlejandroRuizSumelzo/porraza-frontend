"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { User2, ShieldCheck, Settings2 } from "lucide-react";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Separator } from "@/presentation/components/ui/separator";
import { ProfilePictureUpload } from "@/presentation/components/settings/profile-picture-upload";
import { ProfileForm } from "@/presentation/components/settings/profile-form";
import { ChangePasswordForm } from "@/presentation/components/settings/change-password-form";
import { DeleteAccountSection } from "@/presentation/components/settings/delete-account-section";
import { useUpdateUserClient } from "@/presentation/hooks/users/use-update-user-client";
import { useUploadProfilePictureClient } from "@/presentation/hooks/users/use-upload-profile-picture-client";
import { useChangePasswordClient } from "@/presentation/hooks/users/use-change-password-client";
import { useDeleteUserClient } from "@/presentation/hooks/users/use-delete-user-client";
import { useAuthStore } from "@/infrastructure/store/auth-store";
import type { UpdateProfileFormData } from "@/presentation/schemas/update-profile-schema";
import type { ChangePasswordFormData } from "@/presentation/schemas/change-password-schema";

/**
 * SettingsPageContent Component
 *
 * Main settings page with tabs for:
 * 1. Profile - Avatar upload + basic info (name, email)
 * 2. Security - Change password
 * 3. Account - Danger zone (delete account)
 *
 * Clean Architecture:
 * - Presentation layer component
 * - Uses DI hooks for all business logic
 * - Updates Zustand store after successful operations
 * - Provides feedback via toast notifications
 */
export function SettingsPageContent() {
  const t = useTranslations("settings");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { updateUser, isUpdating } = useUpdateUserClient();
  const { uploadProfilePicture, isUploading } = useUploadProfilePictureClient();
  const { changePassword, isChanging } = useChangePasswordClient();
  const { deleteUser, isDeleting } = useDeleteUserClient();

  // Guard: User must be authenticated
  if (!user) {
    return null;
  }

  const handleProfileUpdate = async (data: UpdateProfileFormData) => {
    const result = await updateUser(user.id, data);

    if (result) {
      setUser(result);
      toast.success(t("profile.updateSuccess"));
    }
  };

  const handleProfilePictureUpload = async (file: File) => {
    const result = await uploadProfilePicture(user.id, file);

    if (result) {
      setUser(result);
      toast.success(t("profile.pictureUploadSuccess"));
    }
  };

  const handleProfilePictureRemove = async () => {
    // TODO: Implement remove profile picture use case if backend supports it
    toast.info("Funcionalidad de eliminar foto próximamente");
  };

  const handlePasswordChange = async (data: ChangePasswordFormData) => {
    const result = await changePassword(
      user.id,
      data.currentPassword,
      data.newPassword
    );

    if (result) {
      toast.success(t("security.passwordChangeSuccess"));
    }
  };

  const handleAccountDelete = async (password: string) => {
    const result = await deleteUser(user.id);

    if (result) {
      toast.success(t("account.deleteSuccess"));

      // Clear auth and redirect to home
      clearAuth();
      router.push("/");
    }
  };

  // Validation messages for forms
  const profileValidationMessages = {
    nameRequired: t("profile.validation.nameRequired"),
    nameMin: t("profile.validation.nameMin"),
    emailRequired: t("profile.validation.emailRequired"),
    emailInvalid: t("profile.validation.emailInvalid"),
  };

  const passwordValidationMessages = {
    currentPasswordRequired: t("security.validation.currentPasswordRequired"),
    newPasswordRequired: t("security.validation.newPasswordRequired"),
    newPasswordMin: t("security.validation.newPasswordMin"),
    newPasswordUppercase: t("security.validation.newPasswordUppercase"),
    newPasswordLowercase: t("security.validation.newPasswordLowercase"),
    newPasswordNumber: t("security.validation.newPasswordNumber"),
    confirmPasswordRequired: t("security.validation.confirmPasswordRequired"),
    passwordsMismatch: t("security.validation.passwordsMismatch"),
    passwordsSame: t("security.validation.passwordsSame"),
  };

  const deleteValidationMessages = {
    passwordRequired: t("account.validation.passwordRequired"),
    confirmationRequired: t("account.validation.confirmationRequired"),
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">{t("description")}</p>
      </div>

      <Separator />

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="profile" className="gap-2">
            <User2 className="size-4" />
            <span className="hidden sm:inline">{t("tabs.profile")}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <ShieldCheck className="size-4" />
            <span className="hidden sm:inline">{t("tabs.security")}</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2">
            <Settings2 className="size-4" />
            <span className="hidden sm:inline">{t("tabs.account")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.title")}</CardTitle>
              <CardDescription>{t("profile.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Profile Picture Upload */}
              <div className="flex justify-center py-4">
                <ProfilePictureUpload
                  currentImageUrl={user.profilePictureUrl}
                  userName={user.name}
                  onUpload={handleProfilePictureUpload}
                  onRemove={handleProfilePictureRemove}
                  isUploading={isUploading}
                />
              </div>

              <Separator />

              {/* Profile Form */}
              <ProfileForm
                user={user}
                onSubmit={handleProfileUpdate}
                isLoading={isUpdating}
                validationMessages={profileValidationMessages}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("security.title")}</CardTitle>
              <CardDescription>{t("security.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChangePasswordForm
                onSubmit={handlePasswordChange}
                isLoading={isChanging}
                validationMessages={passwordValidationMessages}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("account.title")}</CardTitle>
              <CardDescription>{t("account.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <DeleteAccountSection
                userEmail={user.email}
                onDelete={handleAccountDelete}
                isLoading={isDeleting}
                validationMessages={deleteValidationMessages}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
