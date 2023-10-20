export type ApiFetchOptions = {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: HeadersInit;
    body?: any;
    cache?: RequestCache;
  };