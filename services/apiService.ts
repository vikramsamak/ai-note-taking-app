import { apiRequest } from "@/utils/apiRequest";
import { AxiosRequestConfig } from "axios";

export class ApiService {
  constructor(private endpoint: string) {}

  public async get<T>({
    id,
    config,
  }: { id?: string | number; config?: AxiosRequestConfig } = {}) {
    const url = id ? `${this.endpoint}/${id}` : this.endpoint;
    return apiRequest<T>({ ...config, method: "GET", url });
  }

  public async post<T>({
    data,
    config,
  }: {
    data: unknown;
    config?: AxiosRequestConfig;
  }) {
    return apiRequest<T>({
      ...config,
      method: "POST",
      url: this.endpoint,
      data,
    });
  }

  public async put<T>({
    id,
    data,
    config,
  }: {
    id: string | number;
    data: unknown;
    config?: AxiosRequestConfig;
  }) {
    const url = `${this.endpoint}/${id}`;
    return apiRequest<T>({ ...config, method: "PUT", url, data });
  }

  public async patch<T>({
    id,
    data,
    config,
  }: {
    id: string | number;
    data: unknown;
    config?: AxiosRequestConfig;
  }) {
    const url = `${this.endpoint}/${id}`;
    return apiRequest<T>({ ...config, method: "PATCH", url, data });
  }

  public async delete<T>({
    id,
    config,
  }: {
    id: string | number;
    config?: AxiosRequestConfig;
  }) {
    const url = `${this.endpoint}/${id}`;
    return apiRequest<T>({ ...config, method: "DELETE", url });
  }
}
