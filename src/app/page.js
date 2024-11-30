"use client";
import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const HomePage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const supabase = require("@supabase/supabase-js").createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Fetch photos from Supabase
    const fetchPhotos = async () => {
      const { data, error } = await supabase.from("photos").select("file_url");

      if (error) {
        console.error("Error fetching photos:", error);
      } else {
        setPhotos(data);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* ImageList without forced rowHeight to maintain original aspect ratio */}
      <ImageList
        sx={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16, // Adjust gap between images
        }}
        variant="masonry" // Use masonry for maintaining aspect ratio
        cols={3} // Number of columns (adjustable)
      >
        {photos.map((photo, index) => (
          <ImageListItem key={photo.file_url}>
            <img
              src={photo.file_url}
              alt={`Photo ${index + 1}`}
              loading="lazy"
              style={{
                width: "100%", // Ensures it fills its container
                height: "auto", // Maintains original aspect ratio
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default HomePage;
