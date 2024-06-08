/* eslint-disable no-console */
'use client';

import { useRouter } from 'next/navigation';

import { LogoIcon } from '@components/UI/IconJsx';
import authApiRequest from 'src/apiRequests/auth';
import { useAppContext } from 'src/providers/app-provider';

const Header = () => {
  const { push, refresh } = useRouter();
  const { accessToken } = useAppContext();

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      refresh();
    } catch (error) {
      console.log(error)
      authApiRequest.logoutFromNextClientToNextServer(true).then(() => {
        push('/sign-in');
      });
    }
  }

  return (
    <div className='content-wrapper'>
      <div className='header w-full flex justify-between items-center'>
        <LogoIcon />
        {accessToken
          ? (
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='btn-large'
                style={{ width: '208.7px' }}
                onClick={() => push('/profile')}
              >
                Profile
              </button>
              <button
                type='button'
                className='btn-large'
                style={{ width: '208.7px' }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )
          : (
            <button
              type='button'
              className='btn-large'
              style={{ width: '208.7px' }}
              onClick={() => push('/sign-in')}
            >
            Sign In
            </button>
          )}
      </div>
    </div>
  );
};

export default Header;
