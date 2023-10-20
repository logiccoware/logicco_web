import { ApiService } from "@/domain/api/services/ApiService";

export const apiService = new ApiService(process.env.NEXT_PUBLIC_API_BASE_URL);
export const apiNextService = new ApiService(process.env.NEXT_PUBLIC_APP_URL);
