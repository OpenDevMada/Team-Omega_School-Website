import { api } from "@/lib/api";
import { passwordSchema, userSchema } from "@/schemas/user.schema";
import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";
import type { Role, User, UserCredentials } from "@/types/user";
import { ENDPOINTS } from "@/utils/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import Cookie from "js-cookie";

const emailSchema = userSchema.pick({
  email: true,
});
const passwordSchemaDto = passwordSchema.pick({
  newPassword: true,
});

interface ApiLoginResponse {
  accessToken: string;
  refreshToken?: string;
  role: Role;
  email: string;
}

interface ApiResetPasswordResponse {
  details?: string
  error?: string
  status?: number
}

export const authService = {
  getUser: async () => {
    try {
      const role = localStorage.getItem("userRole") as Role | null;

      if (!role) {
        throw new Error("No role found in localStorage");
      }

      const endpoint = `/${role.toLowerCase()}s/me`;

      const response = await api.get(endpoint);
      return response.data as Student | Teacher | User;
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  },
  signIn: async (credentials: UserCredentials): Promise<ApiLoginResponse> => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.SIGN_IN, credentials);

      if (response.data.role) {
        localStorage.setItem("userRole", response.data.role);
      }

      localStorage.setItem("access-token-frontend", response.data.accessToken);

      return response.data;
    } catch (error: any) {
      console.error("Sign in error:", error);

      if (error.response?.status === 401) {
        toast.error("Email ou mot de passe invalide");
      } else if (error.response?.status === 403) {
        toast.error("Accès refusé");
      } else {
        toast.error("Erreur de connexion. Veuillez réessayer.");
      }

      throw error;
    }
  },
  signOut: async () => {
    try {
      await api.post(ENDPOINTS.AUTH.SIGN_OUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
    localStorage.removeItem("access-token-frontend");
    localStorage.removeItem("userRole");
    }
  },
  sendEmailForResetingPassword: async ({
    email,
  }: z.infer<typeof emailSchema>): Promise<string | null> => {
    try {
      const response = await api.post(
        ENDPOINTS.AUTH.REQUEST_SEND_EMAIL,
        { email },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Email send password error: ${error}`);
      toast.error("Une erreur inattendue est survenue durant l'envoi d'email");
      throw error;
    }
  },
  verifyEmailOtp: async (email: string, otpValue: string): Promise<boolean | null> => {
    try {
      const response = await api.post(
        ENDPOINTS.AUTH.VERIFY_EMAIL_OTP,
        { email, otp: otpValue },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Reset password error: ${error}`);
      toast.error("Une erreur inattendue sur l'envoi de l'otp");
      throw error;
    }
  },
  resetPassword: async ({
    email,
    otp,
    values,
  }: {
    email: string;
    otp: string;
    values: z.infer<typeof passwordSchemaDto>;
  }): Promise<ApiResetPasswordResponse | string> => {
    try {
      const response = await api.post(
        ENDPOINTS.AUTH.RESET_PASSWORD,
        { email, otp, newPassword: values.newPassword },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Reset password error: ${error}`);
      toast.error(
        "Une erreur inattendue est survenue durant la modification de votre mot de passe"
      );
      throw error;
    }
  },
  refreshToken: async (): Promise<ApiLoginResponse | null> => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.REFRESH_TOKEN);
      return response.data;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  },
};

export const getAuthentifiedUser = () => {
  const [user, setUser] = useState<Student | Teacher | User>();
  useEffect(() => {
    authService.getUser().then(setUser);
  });
  return user;
};

export const useAuthUser = () => {
  const [user, setUser] = useState<Student | Teacher | User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getUser()
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};