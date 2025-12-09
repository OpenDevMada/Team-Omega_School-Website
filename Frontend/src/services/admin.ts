import { BaseService } from "./base";
import type { Admin, PaginatedResponse } from "@/types/admin";
import { api } from "@/lib/api";

class AdminService extends BaseService<Admin, any, any> {
  constructor() {
    super("/admins");
  }

  async getAllPaginated(page: number = 0, size: number = 10): Promise<PaginatedResponse<Admin>> {
    const response = await api.get<PaginatedResponse<Admin>>("/admins", {
      params: { page, size },
    });
    return response.data;
  }
}

export const adminService = new AdminService();
