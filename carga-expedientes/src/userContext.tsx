import { createContext, useContext, useState, ReactNode } from 'react';
import { userLogin } from './UserManage';
import localData from './localdataManage';

type User = any; // Replace 'any' with your user type if available

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(localData.getUser() || null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localData.getUser());
  
  const login = async (user: string, password: string) => {
    const userData = await userLogin(user, password);

    if (userData.status !== 200) {
      throw new Error(userData.error || 'Login failed');
    }

    setUser(userData.data);
    setIsAuthenticated(true);
    localData.setUser(userData.data); // Store user data in local storage
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localData.setUser(null); // Clear user data from local storage
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}