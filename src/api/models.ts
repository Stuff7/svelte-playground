import { snakeCase } from 'utils/string';

export type Provider = 'google';
export type UserID = `${Provider}@${string}`;

export interface User {
  _id: UserID,
  name: string,
  picture: string,
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

export type VideoMetadata = Omit<Video, 'type'>;

export type VideoMetadataQuery = {
  fileUrl: string,
}

export type CreateVideoBody = {
  name?: string,
  thumbnail?: string,
  folder?: string,
}

export interface Folder {
  type: 'folder',
}

export type FileMetadata = Video | Folder;
export type FileType = FileMetadata['type'];

export interface UserFile {
  _id: string,
  folderId: string,
  userId: string,
  name: string,
  metadata: FileMetadata,
}

export type UserFilesQuery = {
  folder?: Option<string>,
}

export type CreateFolderBody = {
  name: string,
  folder?: Option<string>,
}

export type UpdateFileBody = {
  name?: string,
  folder?: string,
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

export type ApiResource = User | UserFile[] | UserFile | VideoMetadata;

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
