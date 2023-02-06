import { API_URL } from '@Playground/config';
import {
  ApiError,
  isApiErrorAndWarn,
  queryParams,
  User,
  UserFile,
  type ApiErrorResponse,
  type ApiResource,
  type ApiResult,
  type UserFilesQuery,
  type UserFileResponse,
  type UserResponse,
} from './models';
import { accessToken, awake, setAccessToken } from 'store/server';

export async function getUser(): Promise<Option<User>> {
  const data = await apiRequest<UserResponse>('/users/me', {
    authorization: true,
    revokeOn401: true,
  });
  return isApiErrorAndWarn(data) ? null : new User(data);
}

export async function getUserFiles(folder = 'root'): Promise<UserFile[]> {
  const query: UserFilesQuery = { folder };
  const data = await apiRequest<UserFileResponse[]>(`/files${queryParams(query)}`, {
    authorization: true,
  });
  return isApiErrorAndWarn(data) ? [] : data.map(user => new UserFile(user));
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

export async function apiRequest<T extends ApiResource>(
  endpoint: string, {
    authorization = false,
    revokeOn401 = false,
  },
): Promise<ApiResult<T>> {
  const url = `${API_URL}/api${endpoint}`;

  if (!awake) {
    return new ApiError(`Tried to make an API request (${url}) while the server was sleeping.`);
  }

  if (authorization && !accessToken) {
    return new ApiError(`Tried to make an authorized API request (${url}) while logged out.`);
  }

  let options;

  if (authorization) {
    options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
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

export async function fetchJSON<T>(url: string, options?: RequestInit): Promise<JSONResponse<T>> {
  const response = await fetch(url, options);
  if (response.headers.get('Content-Type') == 'application/json') {
    return {
      data: await response.json() as T,
      response,
    };
  }
  return { data: null, response };
}
