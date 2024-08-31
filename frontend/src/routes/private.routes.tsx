import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <>{children}</> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
