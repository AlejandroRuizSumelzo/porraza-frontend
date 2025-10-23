export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // segundos hasta que expire el accessToken
}
