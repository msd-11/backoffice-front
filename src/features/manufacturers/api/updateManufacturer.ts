import { axios } from "@/lib/axios";

import { Manufacturer } from "../types";

export const updateManufacturer = (
  manufacturer: Manufacturer
): Promise<void> => {
  return axios.put(`/manufacturer/${manufacturer.id}`, manufacturer);
};
