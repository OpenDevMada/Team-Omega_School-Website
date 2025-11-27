import { api } from "@/lib/api";
import { passwordSchema, userSchema } from "@/schemas/user.schema";
import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";
import type { User, UserCredentials } from "@/types/user";
import { ROUTES } from "@/utils/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const emailSchema = userSchema.pick({
  email: true,
});
const passwordSchemaDto = passwordSchema.pick({
  newPassword: true,
});

export const authService = {
  getUser: async () => {
    const response = await api.get("/auth/me", { withCredentials: true });
    return response.data as Student | Teacher | User;
  },
  signIn: async (credentials: UserCredentials) => {
    try {
      const response = await api.post(
        ROUTES.WEBSITE.AUTH.SIGN_IN,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Sign in error: ${error}`);
      toast.error("Une erreur inattendue est survenue durant la connexion.");
      throw error;
    }
  },
  signOut: async () => {
    try {
      const response = await api.get("/sign-out", { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(`Sign out error: ${error}`);
      toast.error("Une erreur inattendue est survenue durant la deconnexion.");
      throw error;
    }
  },
  sendEmailForResetingPassword: async ({
    email,
  }: z.infer<typeof emailSchema>) => {
    try {
      const response = await api.post(`/sendEmail`, email, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Email send password error: ${error}`);
      toast.error("Une erreur inattendue est survenue durant l'envoi d'email");
      throw error;
    }
  },
  verifyEmailOtp: async (otpValue: string) => {
    try {
      const response = await api.post(`/verify-otp`, otpValue, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Reset password error: ${error}`);
      toast.error("Une erreur inattendue sur l'envoi de l'otp");
      throw error;
    }
  },
  resetPassword: async (newPassword: z.infer<typeof passwordSchemaDto>) => {
    try {
      const response = await api.post(`/reset-password`, newPassword, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Reset password error: ${error}`);
      toast.error(
        "Une erreur inattendue est survenue durant la modification de votre mot de passe"
      );
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
}
