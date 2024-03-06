export type EmployeeListResponse = {
  statusCode: number;
  data: Employee[];
};

export type Employee = {
  puid: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: Role[];
  disabled: boolean;
};

export type EmployeeResponse = {
  statusCode: number;
  data: Employee;
};

export type Role = {
  id: number;
  name: string;
};

export type RolesResponse = {
  statusCode: number;
  data: Role[];
};
