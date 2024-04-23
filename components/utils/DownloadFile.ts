import { parseCookies } from 'nookies';

export const downloadFile = async (url: string) => {
  const cookies = parseCookies();
  const JSSESSION = cookies.JSESSIONID;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `JSESSIONID=${JSSESSION?.valueOf}`,
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to download file");
  }
  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "participant.csv";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(blobUrl);
};