import { axios } from "@/lib/axios";

export const sendImage = (image: File): Promise<void> => {
  const data = new FormData();
  data.append("image", image, image.name);
  return axios.post(`/image`, data, {
    headers: {
      "Content-Type": image.type,
    },
  });
};
