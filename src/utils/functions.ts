// converts date to ISO-8601 DateTime
export const formatDate = (date: Date | undefined): string => {
  // Check if 'date' is a valid Date object
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  } else {
    // Handle the case when 'date' is not a valid Date object
    console.error("Invalid date object:", date);
    return ""; // or throw an error, return a default value, etc.
  }
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
