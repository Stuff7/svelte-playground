import { API_URL } from '@Playground/config';
import type { HttpMethod } from 'types/http';
import { accessToken, awake, setAccessToken } from 'store/server';
import {
  ApiError,
  isApiErrorAndWarn,
  queryParams,
  type ApiErrorResponse,
  type ApiResource,
  type ApiResult,
  type FilesQuery,
  type File,
  type User,
  type CreateFolderBody,
  type UpdateFileBody,
  type VideoMetadata,
  type VideoMetadataQuery,
  type CreateVideoBody,
  type DeleteFilesResponse,
  type DeleteFilesQuery,
  type FolderChildrenAndAncestors,
  type MoveFilesBody,
  type MoveFilesResponse,
} from './models';

export async function getUser(): Promise<Option<User>> {
  const data = await apiRequest<User>('/users/me', {
    authorization: true,
    revokeOn401: true,
  });
  return isApiErrorAndWarn(data) ? null : data;
}

export async function getUserFiles(query: FilesQuery): Promise<File[]> {
  const data = await apiRequest<File[]>(`/files${queryParams(query)}`, {
    authorization: true,
  });
  return isApiErrorAndWarn(data) ? [] : data;
}

export async function getFolderFamily(folderId: string): Promise<Option<FolderChildrenAndAncestors>> {
  const data = await apiRequest<FolderChildrenAndAncestors>(`/files/folder/${folderId}`, {
    authorization: true,
  });
  return isApiErrorAndWarn(data) ? null : data;
}

export async function createFolder(name: string, folder: Option<string> = 'root'): Promise<Option<File>> {
  const body: CreateFolderBody = { name, folder };
  const data = await apiRequest<File>('/files/folder', {
    authorization: true,
    method: 'POST',
    body,
  });
  return isApiErrorAndWarn(data) ? null : data;
}

export async function updateFile(
  fileId: string,
  { name, folder }: { name?: string, folder?: string },
): Promise<Option<File>> {
  const body: UpdateFileBody = { name, folder };
  const data = await apiRequest<File>(`/files/${fileId}`, {
    authorization: true,
    method: 'PATCH',
    body,
  });
  return isApiErrorAndWarn(data) ? null : data;
}

export async function deleteFiles(ids: string[]): Promise<Option<DeleteFilesResponse>> {
  const query: DeleteFilesQuery = { id: ids };
  const data = await apiRequest<DeleteFilesResponse>(`/files${queryParams(query)}`, {
    authorization: true,
    method: 'DELETE',
  });
  return isApiErrorAndWarn(data) ? null : data;
}

export async function moveFiles(folder: string, files: string[]): Promise<number> {
  const body: MoveFilesBody = { folder, files };
  const data = await apiRequest<MoveFilesResponse>('/files/folder/move', {
    authorization: true,
    method: 'PUT',
    body,
  });
  return isApiErrorAndWarn(data) ? 0 : data.movedCount;
}

export async function createVideo(videoId: string, body: CreateVideoBody): Promise<Option<File>> {
  const data = await apiRequest<File>(`/files/video/${videoId}`, {
    authorization: true,
    method: 'POST',
    body,
  });
  return isApiErrorAndWarn(data) ? null : data;
}

export async function getVideoMetadata(videoId: string): Promise<Option<VideoMetadata>> {
  const query: VideoMetadataQuery = { videoId };
  const data = await apiRequest<VideoMetadata>(`/files/video/metadata${queryParams(query)}`, {
    authorization: true,
  });
  return isApiErrorAndWarn(data) ? null : data;
}

export async function pingServer(): Promise<boolean> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 2e3);
  try {
    const response = await fetch(`${API_URL}/ping`, { signal: controller.signal });
    return response.ok;
  } catch (error) {
    console.warn('The server is sleeping 😴');
    return false;
  }
}

export async function logout(): Promise<void> {
  if (!accessToken) {
    return;
  }

  const response = await fetch(`${API_URL}/logout`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.ok) {
    setAccessToken(null);
  }
}

interface ApiRequestOptions {
  authorization?: boolean,
  revokeOn401?: boolean,
  method?: HttpMethod,
  body?: Record<string, unknown>,
}

export async function apiRequest<T extends ApiResource>(
  endpoint: string, {
    authorization = false,
    revokeOn401 = false,
    method = 'GET',
    body,
  } = {} as ApiRequestOptions,
): Promise<ApiResult<T>> {
  const url = `${API_URL}/api${endpoint}`;

  if (!awake) {
    return new ApiError(`Tried to make an API request (${url}) while the server was sleeping.`);
  }

  if (authorization && !accessToken) {
    return new ApiError(`Tried to make an authorized API request (${url}) while logged out.`);
  }

  const options: RequestInit = { method };

  if (authorization) {
    options.headers  = { Authorization: `Bearer ${accessToken}` };
  }
  if (body) {
    options.body = JSON.stringify(body);
  }

  const { data, response } = await fetchJSON<T | ApiErrorResponse>(url, options);

  if (revokeOn401 && response.status === 401) {
    setAccessToken(null);
  }

  if (!data) {
    return new ApiError('API request returned no body', response);
  }

  const responseIsError = !response.ok;
  const dataIsError = 'error' in data;

  if (responseIsError) {
    if (!dataIsError) {
      return new ApiError('API response has bad status but body is not an error', response);
    }
    return new ApiError(`API response error: ${data.message} (${data.statusCode}: ${data.error})`, response);
  }

  if (dataIsError) {
    return new ApiError('API response body is an error but status is ok', response);
  }

  return data;
}

interface JSONResponse<T> {
  data: Option<T>,
  response: Response,
}

export async function fetchJSON<T>(url: string, options = {} as RequestInit): Promise<JSONResponse<T>> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
    },
  });
  if (response.headers.get('Content-Type') == 'application/json') {
    return {
      data: await response.json() as T,
      response,
    };
  }
  return { data: null, response };
}
