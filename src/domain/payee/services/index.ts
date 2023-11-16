import { apiService } from "@/domain/api/services";
import { PayeeService } from "@/domain/payee/services/PayeeService";

export const payeeService = new PayeeService(apiService);
