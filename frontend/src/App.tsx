import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./auth/pages/Signup";
import SignInPage from "./auth/pages/Signin";
import RootLayout from "./layouts/root-layout";
import PrivateRoutes from "./routes/private.routes";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Containue from "./auth/pages/Continue";
import Verify from "./auth/pages/Verify";
import { ClerkProviderWrapper } from "./providers/ClerkProvider";
import { ApolloProviderWrapper } from "./providers/ApolloProvider";
import { AuthProvider } from "./auth/context/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWrapper>
        <ApolloProviderWrapper>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route
                  index
                  element={
                    <PrivateRoutes>
                      <HomePage />
                    </PrivateRoutes>
                  }
                />
                <Route path="sign-in" element={<SignInPage />} />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route
                  path="sign-up/verify-email-address"
                  element={<Verify />}
                />
                <Route path="sign-up/continue" element={<Containue />} />
                <Route
                  path="sign-up/sso-callback"
                  element={<AuthenticateWithRedirectCallback />}
                />
                <Route path="*" element={<SignInPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ApolloProviderWrapper>
      </ClerkProviderWrapper>
    </BrowserRouter>
  );
}
