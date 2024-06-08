import http from 'src/lib/http';
import { LoginDtoReq, LoginDtoRes, RefreshTokenDtoReq, RefreshTokenDtoRes } from 'src/models';

const authApiRequest = {
  login: (body: LoginDtoReq) => http.post<LoginDtoRes>('/auth/login', body),

  refreshToken: (body: RefreshTokenDtoReq) =>
    http.post<RefreshTokenDtoRes>('/auth/refresh-token', body),

  refreshTokenFromNextClientToNextServer: () =>
    http.post<RefreshTokenDtoRes>(
      '/api/auth/refresh',
      {},
      {
        baseUrl: '',
      },
    ),

  logout: () => http.delete<any>('/auth/logout'),

  auth: (body: LoginDtoRes) => http.post('/api/auth', body, { baseUrl: '' }),

  logoutFromNextServerToServer: (accessToken: string) =>
    http.delete('/auth/logout', { headers: { Authorization: `Bearer ${accessToken}` } }),

  logoutFromNextClientToNextServer: (force?: boolean, signal?: AbortSignal) =>
    http.post('/api/auth/logout', { force }, { baseUrl: '', signal }),
};

export default authApiRequest;
