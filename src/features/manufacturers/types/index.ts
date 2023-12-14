export type ManufacturerListResponse = {
  statusCode: number;
  data: Manufacturer[];
};

export type Manufacturer = {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
  country: string;
  createdAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  status: string;
};

export type ManufacturerResponse = {
  statusCode: number;
  data: Manufacturer;
};
