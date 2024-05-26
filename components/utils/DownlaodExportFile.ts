import { parseCookies } from 'nookies';
export const DownloadExportFile = async (url: string, id: string, fileName: string) => {
  try {
    const cookies = parseCookies();
    const JSESSION = cookies.JSESSIONID;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: `JSESSIONID=${JSESSION}`,
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
    a.download = fileName; // Ajouter ".csv" à la fin du nom du fichier
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier:", error);
    throw error;
  }
};