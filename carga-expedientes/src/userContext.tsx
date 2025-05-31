import { createContext, useContext, useState, ReactNode, use } from 'react';
import { userLogin } from './UserManage';

type User = any; // Replace 'any' with your user type if available

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const login = async (user: string, password: string) => {
    const userData = await userLogin(user, password);

    if (userData.status !== 200) {
      throw new Error(userData.error || 'Login failed');
    }

    setUser(userData.data);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}