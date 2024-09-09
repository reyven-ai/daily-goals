import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./auth/pages/Signup";
import SignInPage from "./auth/pages/Signin";
import RootLayout from "./layouts/root-layout";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Verify from "./auth/pages/Verify";
import { ClerkProviderWrapper } from "./providers/ClerkProvider";
import { ApolloProviderWrapper } from "./providers/ApolloProvider";
import { AuthProvider } from "./auth/context/AuthContext";
import JournalDetails from "./journal/pages/JournalsDetails";
import RootJournal from "./journal/layouts/root-journal";
import Continue from "./auth/pages/Continue";

export default function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWrapper>
        <ApolloProviderWrapper>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route path="journals" element={<RootJournal />}>
                  <Route path=":id" element={<JournalDetails />} />
                </Route>
                <Route path="sign-in" element={<SignInPage />} />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route
                  path="sign-up/verify-email-address"
                  element={<Verify />}
                />
                <Route path="sign-up/continue" element={<Continue />} />
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
