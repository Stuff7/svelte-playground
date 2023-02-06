import { snakeCase } from 'utils/string';

export type Provider = 'google';
export type UserID = `${Provider}@${string}`;

export interface UserResponse {
  _id: UserID,
  name: string,
  picture: string,
}

export class User {
  id: UserID;
  name: string;
  picture: string;

  constructor(userResponse: UserResponse) {
    this.id = userResponse._id;
    this.name = userResponse.name;
    this.picture = userResponse.picture;
  }
}

export interface Video {
  type: 'video',
  name: string,
  playId: string,
  durationMillis: number,
  width: number,
  height: number,
  thumbnail: string,
  mimeType: string,
  sizeBytes: number,
}

export interface Folder {
  type: 'folder',
}

export type FileMetadata = Video | Folder;
export type FileType = FileMetadata['type'];

export interface UserFileResponse {
  _id: string,
  folderId: string,
  userId: string,
  name: string,
  metadata: FileMetadata,
}

export class UserFile {
  id: string;
  folderId: string;
  userId: string;
  name: string;
  metadata: FileMetadata;

  constructor(response: UserFileResponse) {
    this.id = response._id;
    this.folderId = response.folderId;
    this.name = response.name;
    this.userId = response.userId;
    this.metadata = response.metadata;
  }
}

export type UserFilesQuery = {
  folder?: Option<string>,
}

export function queryParams<T extends Record<string, unknown>>(query: T): string {
  const entries = Object.entries(query);
  return entries.length ? `?${
    entries
      .map(([key, value]) => value == null ? '' : `${snakeCase(key)}=${encodeURIComponent(`${value}`)}`)
      .filter((entry) => entry)
      .join('&')
  }` : '';
}

export interface ApiErrorResponse {
  statusCode: number,
  error: string,
  message: string,
}

export type ApiResource = UserResponse | UserFileResponse[];

export class ApiError extends Error {
  response: Option<Response>;

  constructor(message: string, response: Option<Response> = null, ...params: ConstructorParameters<typeof Error>) {
    super(...params);
    Object.setPrototypeOf(this, ApiError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = this.constructor.name;
    this.response = response;
    this.message = response ?
      `${message} (${response.status} ${response.statusText} for ${response.url})` : message;
  }
}

export function isApiError(data: unknown): data is ApiError {
  return data instanceof ApiError;
}

export function isApiErrorAndWarn(data: unknown): data is ApiError {
  const isError = isApiError(data);
  if (isError) {
    console.warn(data);
  }
  return isError;
}

export type ApiResult<T> = T | ApiError;
