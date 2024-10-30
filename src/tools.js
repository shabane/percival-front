export function isValidLink(url) {
  const urlPattern =
    /^(https?|ftp|vless|vmess|ss|trojan):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}
