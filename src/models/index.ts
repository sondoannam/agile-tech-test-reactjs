export type Post = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export type GetPostDtoReq = {
  page?: number;
  title?: string;
  tags?: string;
}

export type GetPostDtoRes = {
  posts: Post[];
  current_page: number;
  total_page: number;
  page_size: number;
  total: number;
}

export type CreatePostDtoReq = {
  title: string;
  description: string;
  tags: string[];
}

export type LoginDtoReq = {
  username: string;
}

export type LoginDtoRes = {
  accessToken: string;
  refreshToken: string;
}

export type RefreshTokenDtoReq = {
  refreshToken: string;
}

export type RefreshTokenDtoRes = {
  accessToken: string;
  refreshToken: string;
}

export type GalleriesRes = {
  id: string;
  imageUrl: string;
  desctiption: string;
}