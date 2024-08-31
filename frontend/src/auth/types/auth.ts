export interface AuthContextType {
  isSignedIn?: boolean;
  session: unknown;
  logIn: () => void;
  logOut: () => void;
}
