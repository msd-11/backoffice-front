export type EmployeeListResponse = {
  statusCode: number;
  data: Employee[];
};

export type Employee = {
  puid: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
  disabled: boolean;
};

export type EmployeeResponse = {
  statusCode: number;
  data: Employee;
};
