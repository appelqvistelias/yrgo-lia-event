// NOT IN USE!
// This is a component for uploading images to Supabase storage.
// It is not currently used in the application, but it can be used as a reference for future image upload functionality.

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSuccess(false);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Vänligen välj en fil först");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Generate a random file name
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("user-images")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      setSuccess(true);
      setSelectedFile(null);
      // Reset the file input
      document.getElementById("file-input").value = "";
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button onClick={handleUpload} disabled={uploading || !selectedFile}>
        {uploading ? "Laddar upp..." : "Ladda upp bild"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Bilden har laddats upp!</p>}

      {selectedFile && (
        <div>
          <p>Vald fil: {selectedFile.name}</p>
          <p>Storlek: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
}
