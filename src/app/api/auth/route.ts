import { LoginDtoRes } from 'src/models';

export async function POST(request: Request) {
  const body = (await request.json()) as LoginDtoRes;

  const accessToken = body.accessToken;
  const refreshToken = body.refreshToken;

  if (!accessToken) {
    return Response.json(
      { message: 'Không nhận được access token' },
      {
        status: 400,
      },
    );
  }

  const appendHeaders = new Headers();

  appendHeaders.append(
    'Set-Cookie',
    `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
  );

  appendHeaders.append(
    'Set-Cookie',
    `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
  );

  return Response.json(body, {
    status: 200,
    headers: appendHeaders,
  });
}
