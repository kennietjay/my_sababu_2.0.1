import supabase from "./supabase";

export const downloadFile = async (bucket, filePath, fileName) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(filePath);

    if (error) {
      console.error("Error downloading file:", error.message);
      return { success: false, error: error.message };
    }

    // Create a URL for the Blob object
    const url = URL.createObjectURL(data);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the anchor element and revoking the object URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Something went wrong" };
  }
};

export const downloadFiles = async (files) => {
  for (const file of files) {
    const { bucket, filePath, fileName } = file;
    await downloadFile(bucket, filePath, fileName);
  }
};
