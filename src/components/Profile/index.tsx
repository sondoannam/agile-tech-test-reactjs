/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Header from '@components/Header';
import { ArrowDown, LogoIcon, Pen, Trash } from '@components/UI/IconJsx';
import authApiRequest from 'src/apiRequests/auth';
import postApiRequest from 'src/apiRequests/post';
import { CreatePostDtoReq, Post } from 'src/models';

import styles from './index.module.scss';

const ProfilePage = () => {
  const { push, refresh } = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [tags, setTags] = useState<any>();

  const fetchPosts = async (page: number) => {
    try {
      const res = await postApiRequest.getPosts({ page });
      setPosts(res.posts);
      setPage(res.current_page);
      setTotalPage(res.total_page);
    } catch (error) {
      console.log(error);
      toast.error('Get post failed');
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await postApiRequest.getTags();
        setTags(res);
      } catch (error) {
        console.log(error);
        toast.error('Get tags failed');
      }
    };

    fetchTags();
    fetchPosts(1);
  }, []);

  console.log(tags);

  const handleCreatePost = async () => {
    try {
      const payload: CreatePostDtoReq = {
        title: 'Learn Nextjs',
        description: 'Learn Nextjs description',
        tags: ['Reactjs', 'Typescript'],
      };

      await postApiRequest.createPost(payload);
      await fetchPosts(page);
      refresh();
      toast.success('Create post success');
    } catch (error) {
      console.log(error);
      toast.error('Create post failed');
    }
  };

  const handleUpdatePost = async (id: string) => {
    try {
      await postApiRequest.updatePost(id, { title: 'Learn Reactjs' });
      await fetchPosts(page);
      refresh();
      toast.success('Update post success');
    } catch (error) {
      console.log(error);
      toast.error('Update post failed');
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const res = await postApiRequest.deletePost(id);
      await fetchPosts(page);
      console.log('delete success', res);
      refresh();
      toast.success('Delete post success');
    } catch (error) {
      console.log(error);
      toast.error('Delete post failed');
    }
  };

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      refresh();
    } catch (error) {
      console.log(error);
      authApiRequest.logoutFromNextClientToNextServer(true).then(() => {
        push('/sign-in');
      });
    }
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const handleOpenSelect = () => {
    ref.current?.classList.toggle(styles.open);
  };

  const handleSelectTag = (tag: string) => {
    handleOpenSelect();
    console.log(tag);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.mobile_header}>
        <Header />
      </div>
      <div className={styles.left_section}>
        <LogoIcon />
        <div className={styles.navigation}>
          <Link href='/profile'>Posts</Link>
          <button type='button' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.right_section}>
        <div className={styles.control}>
          <button
            type='button'
            className='btn-large'
            style={{ width: '208.7px' }}
            onClick={handleCreatePost}
          >
            Add new
          </button>

          <div className='flex items-center gap-2'>
            <input type='text' placeholder='Title' className={styles.search} />
            <div className={styles.select}>
              <button className={styles.select_trigger} onClick={handleOpenSelect}>
                <p>Tags</p>
                <ArrowDown />
              </button>
              <div className={styles.select_options} ref={ref}>
                <div className={styles.select_option}>
                  <button onClick={() => handleSelectTag('html')}>
                    <p>HTML, CSS</p>
                  </button>
                </div>
                <div className={styles.select_option}>
                  <button onClick={() => handleSelectTag('javascript')}>
                    <p>Javascript</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.posts}>
          <table>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th id='mobile_disable'>Description</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td id='mobile_disable'>{post.description}</td>
                <td>{post.tags.toString()}</td>
                <td>
                  <div className='flex items-center gap-2'>
                    <button type='button' title='edit' onClick={() => handleUpdatePost(post.id)}>
                      <Pen />
                    </button>
                    <button type='button' title='delete' onClick={() => handleDeletePost(post.id)}>
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
          <div className='flex items-center justify-end gap-2'>
            <button type='button' disabled={page === 1} onClick={() => fetchPosts(page - 1)}>
              Previous
            </button>
            <p>{page}</p>
            <button
              type='button'
              disabled={page === totalPage}
              onClick={() => fetchPosts(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
