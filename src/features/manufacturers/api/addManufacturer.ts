import { axios } from "@/lib/axios";

import { Manufacturer, ManufacturerResponse } from "../types";

export const addManufacturer = (
  manufacturer: Manufacturer
): Promise<ManufacturerResponse> => {
  return axios.post(`/manufacturer`, manufacturer);
};
