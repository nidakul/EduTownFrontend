class TokenService {
  getToken(): string | null {
    return localStorage.getItem("token");
  }

    // Token'ın var olup olmadığını kontrol et
  hasToken(): boolean {
    return localStorage.getItem("token") != null;
  }

   // Token'ı localStorage'dan sil
   removeToken() {
    localStorage.removeItem("token");
  }

  // Token'ı localStorage'a kaydet
  saveToken(token: string) {
    localStorage.setItem("token", token);
  }
}

export default new TokenService();
 