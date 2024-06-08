/* eslint-disable no-console */
import { cookies } from 'next/headers';

import authApiRequest from 'src/apiRequests/auth';

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    return Response.json(
      { message: 'Không nhận được refresh token' },
      {
        status: 401,
      },
    );
  }

  console.log(refreshToken.value);
  try {
    const res = await authApiRequest.refreshToken({
      refreshToken: refreshToken.value,
    });

    const appendHeaders = new Headers();

    appendHeaders.append(
      'Set-Cookie',
      `accessToken=${res.accessToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
    );

    appendHeaders.append(
      'Set-Cookie',
      `refreshToken=${res.refreshToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
    );

    return Response.json(res, {
      status: 200,
      headers: appendHeaders,
    });
  } catch (error) {
    console.log('error', error);
    return error instanceof Error
      ? Response.json({ message: error.message }, { status: 500 })
      : Response.json(
        {
          message: 'Lỗi không xác định',
        },
        {
          status: 500,
        },
      );
  }
}
