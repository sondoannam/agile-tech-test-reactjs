'use client';
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-console */
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { LogoIcon } from '@components/UI/IconJsx';
import authApiRequest from 'src/apiRequests/auth';

const SignIn = () => {
  const { push } = useRouter()
  const [username, setUsername] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await authApiRequest.login({ username });
      console.log(res);

      await authApiRequest.auth(res);

      toast.success('Sign In Success');
      push('/');
    } catch (error) {
      toast.error('Error: ' + error);
    }
  };

  return (
    <div className='content-wrapper login_page'>
      <div className='w-full'>
        <LogoIcon />
      </div>

      <div className='login_section'>
        <h1 className='login_title'>Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='form-control'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <button type='submit' className='btn-large'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
