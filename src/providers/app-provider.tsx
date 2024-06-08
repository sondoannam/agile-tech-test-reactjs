/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable unicorn/no-null */
'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AppContext = createContext<{
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
}>({
  accessToken: null,
  setAccessToken: () => {},
  isAuthenticated: false,
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [accessTokenState, setAccessTokenState] = useState<string | null>(() => {
    return null;
  });

  const isAuthenticated = !!accessTokenState;

  const setAccessToken = useCallback(
    (accessToken: string | null) => {
      setAccessTokenState(accessToken);
      localStorage.setItem('accessToken', accessToken || '');
    },
    [setAccessTokenState],
  );

  useEffect(() => {
    const _accessToken = localStorage.getItem('accessToken');
    if (!_accessToken || _accessToken === '') {
      setAccessTokenState(null);
      localStorage.removeItem('accessToken');
      return;
    }
    setAccessTokenState(_accessToken);
  }, [setAccessTokenState]);

  return (
    <AppContext.Provider
      value={{
        accessToken: accessTokenState,
        setAccessToken,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
