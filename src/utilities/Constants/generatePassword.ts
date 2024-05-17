export function generatePassword() {
  let pass = "";
  const str =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 6;

  for (let i = 0; i < passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * str.length);
    pass += str.charAt(randomNumber);
  }
  return pass;
}
