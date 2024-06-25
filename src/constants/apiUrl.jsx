//The endpoint for retrieving data
export const BASE_URL = "https://nf-api.onrender.com/api/v1";

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
