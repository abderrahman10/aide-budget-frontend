import { parseCookies } from 'nookies';

export const DownloadExportFile = async (url: string, fileName: string) => {
  try {
    const cookies = parseCookies();
    const JSSESSION = cookies.JSESSIONID;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: `JSESSIONID=${JSSESSION}`,
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
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier:", error);
    throw error;
  }
};