import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserData {
  firstName: string;
  companyName: string;
  industry: string;
  teamSize: string;
  goals: string[];
  platforms: string[];
  experience: string;
  businessDescription?: string;
  businessMessage?: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface UserContextType {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const defaultUserData: UserData = {
  firstName: "",
  companyName: "",
  industry: "",
  teamSize: "",
  goals: [],
  platforms: [],
  experience: "",
  businessDescription: "",
  businessMessage: "",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserDataState] = useState<UserData>(() => {
    const saved = localStorage.getItem("marketmind_user");
    return saved ? JSON.parse(saved) : defaultUserData;
  });

  const [authUser, setAuthUserState] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("marketmind_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem("marketmind_token");
  });

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem("marketmind_user", JSON.stringify(updated));
      return updated;
    });
  };

  const setAuthUser = (user: AuthUser | null) => {
    setAuthUserState(user);
    if (user) {
      localStorage.setItem("marketmind_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("marketmind_auth_user");
    }
  };

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("marketmind_token", newToken);
    } else {
      localStorage.removeItem("marketmind_token");
    }
  };

  const logout = () => {
    setAuthUser(null);
    setToken(null);
    setUserDataState(defaultUserData);
    localStorage.removeItem("marketmind_user");
    localStorage.removeItem("marketmind_auth_user");
    localStorage.removeItem("marketmind_token");
  };

  const isAuthenticated = !!token && !!authUser;

  return (
    <UserContext.Provider value={{ 
      userData, 
      setUserData, 
      authUser, 
      setAuthUser, 
      token, 
      setToken, 
      logout,
      isAuthenticated 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
