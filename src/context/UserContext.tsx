import { createContext, useContext, ReactNode, useState } from "react";

type User = {
  username: string;
  email: string;
  password: string;
  name: string;
  gender: string;
  birthdate: string;
};

type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
  isLoggedIn: boolean;
  getUser: () => User | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (newUser: User) => {
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const register = (newUser: User) => {
    setUser(newUser);
  };

  const getUser = () => {
    return user;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, isLoggedIn, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};