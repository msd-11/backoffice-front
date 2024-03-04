export type ClientListResponse = {
  statusCode: number;
  data: Client[];
};

export type Client = {
  puid: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
  disabled: boolean;
};

export type ClientResponse = {
  statusCode: number;
  data: Client;
};
