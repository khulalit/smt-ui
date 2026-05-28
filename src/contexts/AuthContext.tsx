import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import {
  fetchCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
} from "../api/auth";

export interface User {
  email: string;
  role?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetchCurrentUser();
        if (response.data) {
          setUser({
            email: response.data.email,
            role: response.data.role as any,
          });
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await loginRequest(credentials);
    const token = response.data?.access_token;

    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("token", token);
    }

    if (response.data?.user) {
      setUser(response.data.user);
    } else {
      const res = await fetchCurrentUser();
      setUser({ email: credentials.email, role: res?.data?.role as any });
    }
  };

  const logout = async () => {
    await logoutRequest().catch(() => {});
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
