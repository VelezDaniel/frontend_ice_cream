
export function randomString(number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = '';
  for (let i = 0; i < number; i++) {
    const randomI = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomI);    
  }
  return result;
}