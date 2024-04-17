export function setUserId(userId: string) {
  localStorage.setItem("userId", userId);
}

export function getUserId() {
  return localStorage.getItem("userId");
}

export function clearUserId() {
  localStorage.removeItem("userId");
}
