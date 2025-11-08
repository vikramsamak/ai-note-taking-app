import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export const apiRequest = async <T>({ ...config }: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response) {
      console.error("API Error:", axiosError.response.data);
      throw new Error(axiosError.response.data.message || "An error occurred");
    } else if (axiosError.request) {
      console.error("Network Error:", axiosError.request);
      throw new Error("Network error, please try again later.");
    } else {
      console.error("Error:", axiosError.message);
      throw new Error(axiosError.message);
    }
  }
};
