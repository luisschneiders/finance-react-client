export function delay(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
