/**
 * User DTO
 * Represents user data from the API
 */
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  hasPaid: boolean;
  paymentDate?: string | null;
  stripeCustomerId?: string | null;
  profilePictureUrl?: string | null;
}

/**
 * Update User Request DTO
 * Request body for PATCH /users/:id endpoint
 * All fields are optional - only provided fields will be updated
 */
export interface UpdateUserRequestDTO {
  name?: string;
  email?: string;
  isActive?: boolean;
}

/**
 * Update User Response DTO
 * Response from the API for successful user update
 * Matches the backend response format exactly for PATCH /users/:id
 */
export interface UpdateUserResponseDTO extends UserDTO {}

/**
 * Change Password Request DTO
 * Request body for PATCH /users/:id/password endpoint
 */
export interface ChangePasswordRequestDTO {
  currentPassword: string;
  newPassword: string;
}

/**
 * Change Password Response DTO
 * Response from the API for successful password change
 * Matches the backend response format exactly for PATCH /users/:id/password
 */
export interface ChangePasswordResponseDTO {
  message: string;
}

/**
 * Upload Profile Picture Response DTO
 * Response from the API for successful profile picture upload
 * Matches the backend response format exactly for POST /users/:id/profile-picture
 */
export interface UploadProfilePictureResponseDTO extends UserDTO {}
