import { axios } from "@/lib/axios";

export const sendImage = (image: File): Promise<void> => {
  return axios.post(`/image`, image, {
    headers: {
      "Content-Type": image.type,
    },
  });
};
