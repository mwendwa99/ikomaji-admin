// converts date to ISO-8601 DateTime
export const formatDate = (date: any) => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    const isoDate = date.toISOString();
    return isoDate.split("T")[0]; // Extract the "YYYY-MM-DD" part
  }
  return ""; // Handle invalid or empty date values
};

// uploads image to cloudinary
export const uploadImage = async (imageDataUrl: string, name: any) => {
  const cloud_name = import.meta.env.VITE_APP_CLOUDINARY_CLOUD;

  const imageData = new FormData();
  imageData.append("file", imageDataUrl); // Pass the Data URL directly

  // Cloudinary upload preset and cloud name
  imageData.append("upload_preset", "ikomaji-preset");
  imageData.append("cloud_name", `${cloud_name}`);

  // set a custom publicId to uniquely identify each image from its filename
  const filename = imageDataUrl.split("/").pop()?.slice(0, 6);
  imageData.append("public_id", `${name}-${filename}` || "");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "POST",
      body: imageData,
    }
  );

  const data = await res.json();
  return data.url;
};
