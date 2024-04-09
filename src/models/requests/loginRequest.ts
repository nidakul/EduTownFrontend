export interface LoginRequest {
  nationalIdentity: string;
  password: string;
  authenticatorCode?: string;
}
