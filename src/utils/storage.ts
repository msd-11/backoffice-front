const storagePrefix = "toutouche_back_";

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token-access`) as string
    );
  },
  getRefreshToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token-refresh`) as string
    );
  },
  setToken: (accessToken: string, refreshToken?: string) => {
    window.localStorage.setItem(
      `${storagePrefix}token-access`,
      JSON.stringify(accessToken)
    );
    if (refreshToken) {
      window.localStorage.setItem(
        `${storagePrefix}token-refresh`,
        JSON.stringify(refreshToken)
      );
    }
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token-refresh`);
    window.localStorage.removeItem(`${storagePrefix}token-access`);
  },
};

export default storage;
