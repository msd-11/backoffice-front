import Axios, { InternalAxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import { useNotificationStore } from "@/stores/notifications";
import storage from "@/utils/storage";
import { refreshToken } from "@/features/auth/api/refresh";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers!.authorization = `Bearer ${token}`;
  }
  config.headers!.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    console.log(error.response);

    const originalRequest = error.config;
    console.log("MHH");
    console.log(
      storage.getToken(),
      storage.getRefreshToken(),
      error.response.status === 401
    );

    console.log(storage.getToken() === null);
    console.log(storage.getRefreshToken() === null);

    if (
      (storage.getToken() === null || storage.getRefreshToken() === null) &&
      error.response.data === ""
    ) {
      window.location.reload();
    } else if (
      error.response.status === 401 &&
      storage.getToken() &&
      storage.getRefreshToken()
    ) {
      try {
        const dataResponse = await refreshToken({
          "access-token": storage.getToken(),
          "refresh-token": storage.getRefreshToken(),
        });

        const { data } = dataResponse;
        storage.setToken(data["access-token"]);

        originalRequest.headers.Authorization = `Bearer ${data["access-token"]}`;
        return axios(originalRequest);
      } catch (e) {
        storage.clearToken();
        window.location.reload();

        return Promise.reject(error);
      }
    } else if (
      (!storage.getToken() || !storage.getRefreshToken()) &&
      error.response.data.data.description === "Email or password missmatch"
    ) {
      return Promise.reject(error);
    } else if (!storage.getToken() || !storage.getRefreshToken()) {
      window.location.reload();
    } else {
      return Promise.reject(error);
    }

    console.log("FIN");
  }
);
