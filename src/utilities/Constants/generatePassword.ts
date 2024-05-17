export function generatePassword() {
  let pass = "";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  // const symbols = "!@#$%^&*()";
  const symbols = "#?!@$%^&*-";
  const allChars = lowercase + uppercase + numbers + symbols;
  const passwordLength = 8;

  pass += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  pass += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
  pass += symbols.charAt(Math.floor(Math.random() * symbols.length));

  for (let i = 4; i < passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * allChars.length);
    pass += allChars.charAt(randomNumber);
  }
  // pass = pass.split('').sort(function(){return 0.5-Math.random()}).join('');

  return pass;
}
