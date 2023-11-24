export type SessionResponse = {
  statusCode: number;
  data: Session[];
};

export type Session = {
  id: string;
  ip: string;
  browser: string;
  platform: string;
  deviceType: string;
};

export type SessionFinal = Session & IpInfo;

export type IpInfoResponse = {
  data: IpInfo;
};

export type IpInfo = {
  country: string;
  countryCode: string;
};
