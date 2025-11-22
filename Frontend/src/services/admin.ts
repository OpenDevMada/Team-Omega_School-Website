import type { BaseUser } from "@/types/user";
import { BaseService } from "./base";

class AdminService extends BaseService<BaseUser, any, any> {
  constructor() {
    super("/admins");
  }
}

export const adminService = new AdminService();
