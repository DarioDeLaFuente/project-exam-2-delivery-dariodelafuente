const BASE_URL = import.meta.env.VITE_API_URL;

export const ALL_PROFILES_URL = `${BASE_URL}/social/profiles`;
export const PROFILE_URL = `${BASE_URL}/social/profiles/`;
export const LOGIN_URL = `${BASE_URL}/social/auth/login`;
export const REGISTER_URL = `${BASE_URL}/social/auth/register`;
export const POSTS_URL = `${BASE_URL}/social/posts`;
export const POSTS_FOLLOWING_URL = `${BASE_URL}/social/posts/following`;

export const SINGLE_PROFILE_URL = (name) =>
  `${BASE_URL}/social/profiles/${name}`;
export const PROFILE_POSTS_URL = (name) =>
  `${BASE_URL}/social/profiles/${name}/posts`;
