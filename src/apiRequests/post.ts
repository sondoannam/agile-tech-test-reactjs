import http from 'src/lib/http';
import { CreatePostDtoReq, GetPostDtoReq, GetPostDtoRes } from 'src/models';

const postApiRequest = {
  getTags: () => http.get<any>('/posts/tags'),
  getPosts: (req: GetPostDtoReq) => {
    let url = '/posts';
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(req)) {
      if (value === undefined || value === null) {
        continue;
      }
      params.set(key, String(value));
    }

    url += `?${params.toString()}`;

    return http.get<GetPostDtoRes>(url);
  },
  createPost: (body: CreatePostDtoReq) => http.post<any>('/posts', body),
  updatePost: (id: string, body: any) => http.patch<any>(`/posts/${id}`, body),
  deletePost: (id: string) => http.delete<any>(`/posts/${id}`),
};

export default postApiRequest;
