import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// The shape of User
type User = {
  username: string;
  region: string;
};

// What the context provides
type UserContextType = {
  user: User | null;
  signup: (username: string, region: string) => void;
  signout: () => void;
};

// create the context (will be by default undefined)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component - wraps the app and holds the state
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  //load user from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const signup = (username: string, region: string) => {
    const newUser = { username, region };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, signup, signout }}>
      {children}
    </UserContext.Provider>
  );
}

// custom hook for consuming the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used inside the Userprovider");
  }
  return context;
}
