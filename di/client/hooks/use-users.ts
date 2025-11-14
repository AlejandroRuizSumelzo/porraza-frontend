"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * Use Update User Hook
 * Access the UpdateUserUseCase from the DI container
 *
 * @returns UpdateUserUseCase instance
 *
 * @example
 * ```tsx
 * const updateUserUseCase = useUpdateUser();
 * const updatedUser = await updateUserUseCase.execute(userId, { name: 'Jane Smith' });
 * ```
 */
export function useUpdateUser() {
  const { updateUserUseCase } = useDependencies();
  return updateUserUseCase;
}

/**
 * Use Delete User Hook
 * Access the DeleteUserUseCase from the DI container
 *
 * @returns DeleteUserUseCase instance
 *
 * @example
 * ```tsx
 * const deleteUserUseCase = useDeleteUser();
 * await deleteUserUseCase.execute(userId);
 * ```
 */
export function useDeleteUser() {
  const { deleteUserUseCase } = useDependencies();
  return deleteUserUseCase;
}

/**
 * Use Upload Profile Picture Hook
 * Access the UploadProfilePictureUseCase from the DI container
 *
 * @returns UploadProfilePictureUseCase instance
 *
 * @example
 * ```tsx
 * const uploadProfilePictureUseCase = useUploadProfilePicture();
 * const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
 * const updatedUser = await uploadProfilePictureUseCase.execute(userId, file);
 * ```
 */
export function useUploadProfilePicture() {
  const { uploadProfilePictureUseCase } = useDependencies();
  return uploadProfilePictureUseCase;
}

/**
 * Use Change Password Hook
 * Access the ChangePasswordUseCase from the DI container
 *
 * @returns ChangePasswordUseCase instance
 *
 * @example
 * ```tsx
 * const changePasswordUseCase = useChangePassword();
 * const result = await changePasswordUseCase.execute(userId, 'OldPass123', 'NewPass456');
 * ```
 */
export function useChangePassword() {
  const { changePasswordUseCase } = useDependencies();
  return changePasswordUseCase;
}
