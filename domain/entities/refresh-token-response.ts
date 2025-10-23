/**
 * Refresh Token Response
 * Response from refresh token operation containing new access token
 */
export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number; // segundos hasta que expire el nuevo accessToken
}
