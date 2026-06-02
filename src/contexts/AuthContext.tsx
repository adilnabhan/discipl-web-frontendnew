// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, db, hasFirebaseKeys } from "../firebase/firebase";
import { onAuthStateChanged, User as FirebaseUser, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignout } from "../firebase/auth";

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "editor";
}

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  userLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (!hasFirebaseKeys) {
      // Mock loading logic
      const saved = localStorage.getItem("user");
      if (saved) {
        try {
          const u = JSON.parse(saved);
          setUser(u);
          setUserLoggedIn(true);
        } catch {
          setUser(null);
          setUserLoggedIn(false);
        }
      }
      setIsLoading(false);
      return;
    }

    // The onAuthStateChanged listener is the single source of truth for the user's state.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        let userRole: "user" | "admin" | "editor" = "user";
        try {
          // Look up the user's role in Firestore.
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const role = userDocSnap.data().role;
            if (role === 'admin') userRole = "admin";
            else if (role === 'editor') userRole = "editor";
          }
        } catch (e) {
          console.warn("Could not load role from Firestore: ", e);
        }
        
        const appUser: AppUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "No Name",
          email: firebaseUser.email || "",
          role: userRole,
        };

        setUser(appUser);
        setUserLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(appUser));
      } else {
        setUser(null);
        setUserLoggedIn(false);
        localStorage.removeItem("user");
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);
  
  // **SIMPLIFIED LOGIN FUNCTION**
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    if (!hasFirebaseKeys) {
      // Mock Login credentials check
      // Admin: admin / Password@123
      // Gym Editor: gym_editor1 / Editor@123
      // User: discipl863@gmail.com / discipl123@
      let mockUser: AppUser | null = null;
      if (email === "admin" && password === "Password@123") {
        mockUser = { id: "mock-admin", name: "Gym Admin", email: "admin@discipl.com", role: "admin" };
      } else if (email === "gym_editor1" && password === "Editor@123") {
        mockUser = { id: "mock-editor", name: "Gym Editor 1", email: "editor1@discipl.com", role: "editor" };
      } else if (email === "discipl863@gmail.com" && password === "discipl123@") {
        mockUser = { id: "mock-customer", name: "Discipl Friend", email: "discipl863@gmail.com", role: "user" };
      } else {
        // Generic fallback login for testing
        mockUser = { id: "mock-test", name: email.split('@')[0], email: email, role: "user" };
      }

      setUser(mockUser);
      setUserLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }

    try {
      await doSignInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  // **SIMPLIFIED REGISTER FUNCTION**
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    if (!hasFirebaseKeys) {
      const mockUser: AppUser = {
        id: "mock-reg-" + Date.now(),
        name,
        email,
        role: "user"
      };
      setUser(mockUser);
      setUserLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }

    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      await updateProfile(userCredential.user, { displayName: name });
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    if (!hasFirebaseKeys) {
      setUser(null);
      setUserLoggedIn(false);
      localStorage.removeItem("user");
      setIsLoading(false);
      return;
    }

    try {
      await doSignout();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    userLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};