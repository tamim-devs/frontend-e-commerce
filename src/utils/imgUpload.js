import imageCompression from "browser-image-compression";

export const imageUpload = async (image) => {
  try {
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1000,
      initialQuality: 0.7,
      useWebWorker: true,
    };

    const compressedImage = await imageCompression(image, options);

    const formData = new FormData();
    formData.append("image", compressedImage);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error?.message || "Image upload failed");
    }

    return data.data.url;
  } catch (error) {
    console.error("Image Upload Error:", error);
    throw error;
  }
};