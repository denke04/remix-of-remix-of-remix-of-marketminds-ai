import { createContext, useContext, useState, ReactNode } from "react";

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

interface UserContextType {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
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

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem("marketmind_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
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
