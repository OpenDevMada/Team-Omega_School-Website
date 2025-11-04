import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";
import type { User } from "@/types/user";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type UserType = User | Teacher | Student | null;

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<User | Teacher | Student | null>>;
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
  loading: true
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me", { withCredentials: true });
      if (res.data?.user && res.status === 200) { setUser(res.data?.user) } else { setUser(null) };
    } catch (error) {
      console.error(`Unexpected error occured on fetching user: ${error}`);
      return null;
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { fetchUser() }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}