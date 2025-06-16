export const stripHtml = (html: string) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
export const truncateText = (text: string, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};
