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
  videoId: string,
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

export interface File {
  _id: string,
  folderId: string,
  userId: string,
  name: string,
  metadata: FileMetadata,
}

export type BasicFileInfo = Omit<File, 'metadata'>;

export type FilesQuery = Partial<BasicFileInfo> & {
  type?: Option<string>,
};

export type CreateFolderBody = {
  name: string,
  folder?: Option<string>,
}

export type UpdateFileBody = {
  name?: string,
  folder?: string,
}

export type MoveFilesBody = {
  files: string[],
  folder: string,
}

export type MoveFilesResponse = {
  movedCount: number,
}

export type DeleteFilesQuery = {
  id: string[],
}

export type DeleteFilesResponse = {
  deleted: number,
}

export type FolderChildrenAndAncestors = BasicFileInfo & {
  ancestors: BasicFileInfo[],
  children: BasicFileInfo[],
}

export function queryParams<T extends Record<string, unknown>>(query: T): string {
  const entries = Object.entries(query);
  return entries.length ? `?${
    entries
      .map(([key, v]) => {
        if (v == null) { return ''; }
        let value = v;
        if (v instanceof Array) { value = v.join(','); }
        return `${key}=${encodeURIComponent(`${value}`)}`;
      })
      .filter((entry) => entry)
      .join('&')
  }` : '';
}

export interface ApiErrorResponse {
  statusCode: number,
  error: string,
  message: string,
}

export type ApiResource = (
  User | File[] | File | VideoMetadata |
  DeleteFilesResponse | FolderChildrenAndAncestors | MoveFilesResponse
);

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

export function sortFiles(files: File[]) {
  return files.sort((a, b) => {
    if (a.metadata.type === b.metadata.type) {
      return a.name.localeCompare(b.name);
    }
    if (a.metadata.type === 'folder') {
      return -1;
    }
    if (b.metadata.type === 'folder') {
      return 1;
    }
    return 0;
  });
}

export type ApiResult<T> = T | ApiError;
