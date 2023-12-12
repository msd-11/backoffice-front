export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: "ADMIN" | "USER";
};

export type UserResponse = {
  statusCode: number;
  data: {
    "access-token": string;
    "refresh-token": string;
  };
};

export type RefreshResponse = {
  statusCode: number;
  data: {
    "access-token": string;
  };
};
