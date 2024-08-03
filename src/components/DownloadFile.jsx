import { useState } from "react";
import supabase from "../../utils/supabase";

const DownloadFile = async () => {
  const [error, setError] = useState(null);
  try {
    const { data, error } = await supabase.storage
      .from("public/sababu_docs")
      .download("admin/Sababu_Fund_Inc_Registration_Form_001.pdf");

    if (error) {
      console.error("Error downloading file:", error.message);
      setError(error.message);
      return;
    }

    // Create a URL for the Blob object
    const url = URL.createObjectURL(data);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sababu_Fund_Inc_Registration_Form_001.pdf";
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the anchor element and revoking the object URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    setError("Something went wrong");
    console.error("Error:", error);
  }
};

export default DownloadFile;
