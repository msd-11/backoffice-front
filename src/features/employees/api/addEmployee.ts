import { axios } from "@/lib/axios";

import { Employee, EmployeeResponse } from "../types";

export const addEmployee = (employee: Employee): Promise<EmployeeResponse> => {
  return axios.post(`/employees`, employee);
};
