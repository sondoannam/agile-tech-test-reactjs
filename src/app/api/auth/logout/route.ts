/* eslint-disable no-console */
import { cookies } from 'next/headers';

import authApiRequest from 'src/apiRequests/auth';

export async function POST(request: Request) {
  const req = (await request.json()) as { force?: boolean; signal?: AbortSignal };
  console.log(req);
  const force = req.force;
  const appendHeaders = new Headers();
  appendHeaders.append('Set-Cookie', 'accessToken=; Path=/; HttpOnly; Max-Age=0');
  appendHeaders.append('Set-Cookie', 'refreshToken=; Path=/; HttpOnly; Max-Age=0');

  if (force) {
    return Response.json(
      {
        message: 'Buộc đăng xuất thành công',
      },
      {
        status: 200,
        headers: appendHeaders,
      },
    );
  }
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken) {
    return Response.json(
      { message: 'Không nhận được access token' },
      {
        status: 401,
      },
    );
  }
  try {
    await authApiRequest.logoutFromNextServerToServer(accessToken.value);

    return new Response(undefined, {
      status: 200,
      headers: appendHeaders,
    });
  } catch (error: any) {
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
