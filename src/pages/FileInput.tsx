import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  const [images, setImages] = React.useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...urls]); // append instead of overwrite
    }
  };

  const handleDelete = () => {
    setImages([]);
  };

  return (
    <div className="p-5">
      <div className="flex gap-2">
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload files
          <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
        </Button>
        {images.length > 0 && (
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete All
          </Button>
        )}
      </div>

      {/* Grid Preview Section */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden shadow-md border">
            <img
              src={src}
              alt={`preview ${index}`}
              className="w-full h-[250px] object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <button
              onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
              className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
