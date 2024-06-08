/* eslint-disable unicorn/no-null */
'use client';

import { useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

import authApiRequest from 'src/apiRequests/auth';

export default function AutoRefreshToken() {
  const { refresh } = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      await handleRefresh();
    }, 1000 * 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = async () => {
    const now = new Date();
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken || refreshToken === '') {
      await authApiRequest.logoutFromNextClientToNextServer(true);
      refresh();
      return;
    }

    const decoded = jwtDecode(refreshToken);

    if (decoded.exp && decoded.exp < now.getTime() / 1000) {
      await authApiRequest.logoutFromNextClientToNextServer(true);
      refresh();
      return;
    }

    const res = await authApiRequest.refreshTokenFromNextClientToNextServer();
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    refresh();
  };

  return null;
}
