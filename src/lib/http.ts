/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from 'next/navigation';

import { normalizePath } from '@utils/common';
import envConfig from 'src/config';
import { LoginDtoRes } from 'src/models';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

// eslint-disable-next-line unicorn/no-null
const clientLogoutRequest: null | Promise<any> = null;
export const isClient = typeof window !== 'undefined';

const handleAuthRequest = (url: string, payload: any) => {
  if (isClient) {
    if (normalizePath(url) === 'auth/login' || normalizePath(url) === 'auth/refresh') {
      const { accessToken, refreshToken } = payload as LoginDtoRes;
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    } else if (normalizePath(url) === 'auth/logout' || normalizePath(url) === 'api/auth/logout') {
      console.log('logout request');
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
}

const getLocalAccessToken = () => {
  if (isClient) {
    return localStorage.getItem('accessToken');
  }
}

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined,
) => {
  let body: FormData | string | undefined;

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
        'Content-Type': 'application/json',
      };

  if (getLocalAccessToken()) {
    baseHeaders.Authorization = `Bearer ${getLocalAccessToken()}`;
  }

  const baseUrl =
    options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_APP_API_URL : options.baseUrl;

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  // Interceptor
  if (!res.ok) {
    const error = await res.json();
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new Error('entity', { cause: error });
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient) {
        throw new Error('unauthorized', { cause: error });
      } else {
        const accessToken = (options?.headers as any)?.Authorization.split(
          'Bearer '
        )[1]
        redirect(`/logout?accessToken=${accessToken}`)
      }
    } else {
      throw new Error(res.statusText, { cause: error });
    }
  }

  const payload = await res.json() as Response;

  handleAuthRequest(url, payload);

  return payload;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PATCH', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options })
  }
}

export default http;