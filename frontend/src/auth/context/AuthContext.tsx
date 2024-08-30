import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useAuthUserMutation } from "@/graphql/generated";
import { useSession, useAuth as useAuthClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthInit, setIsAuthInit] = useState<boolean>(false);
  const clerkAuth = useAuthClerk();
  const clerkSession = useSession();
  const navigate = useNavigate();
  const [authUser] = useAuthUserMutation();
  const logInInProgress = useRef(false);

  const logIn = useCallback(async () => {
    if (isAuthInit || logInInProgress.current) return;

    logInInProgress.current = true;
    try {
      const token = await clerkAuth.getToken();
      if (!token) {
        return;
      }

      const email =
        clerkSession.session?.user?.primaryEmailAddress?.emailAddress;
      const name = clerkSession.session?.user?.fullName;

      if (!email || !name) {
        return;
      }
      await authUser({ variables: { token, email, name } });
      navigate("/");
    } catch (error) {
      console.error("Failed to log in", error);
    } finally {
      setIsAuthInit(true);
      logInInProgress.current = false;
    }
  }, [authUser, clerkAuth, navigate, isAuthInit, clerkSession]);

  const logOut = useCallback(async () => {
    try {
      await clerkAuth.signOut({ sessionId: clerkAuth.sessionId ?? undefined });
      navigate("/");
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  }, [clerkAuth, navigate]);

  useEffect(() => {
    if (!isAuthInit && clerkSession.isSignedIn) {
      logIn();
    }
  }, [logIn, clerkSession.isSignedIn, isAuthInit]);

  const contextValue = useMemo(
    () => ({
      isSignedIn: clerkSession.isSignedIn,
      session: clerkSession.session,
      logIn,
      logOut,
    }),
    [clerkSession.isSignedIn, clerkSession.session, logIn, logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
