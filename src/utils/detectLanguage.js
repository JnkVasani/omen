export function detectLanguage(name) {
  if (name.endsWith(".js")) return "javascript";
  if (name.endsWith(".html")) return "html";
  if (name.endsWith(".css")) return "css";
  return "plaintext";
}