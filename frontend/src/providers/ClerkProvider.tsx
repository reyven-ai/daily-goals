import { ClerkProvider } from "@clerk/clerk-react";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export const ClerkProviderWrapper = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: "#000",
          borderRadius: "8px",
        },
        layout: {},
        elements: {
          rootBox: {
            display: "flex",
            height: "100vh",
            alignItems: "center",
            width: "700px",
            borderTop: "none",
            borderRight: "1px solid rgba(0, 0, 0, 0.11)",
          },
          cardBox: {
            boxShadow: "none",
            width: "500px",
            border: "none",
            margin: "auto",
          },
          card: {
            boxShadow: "none",
          },
          headerTitle: {
            fontSize: "28px",
            textAlign: "left",
            marginBottom: "0.2rem",
          },
          headerSubtitle: {
            textAlign: "left",
            fontSize: "15px",
          },
          formFieldInput: {
            height: "42px",
            padding: "22px",
          },
          socialButtons: {
            fontSize: 14,
            height: "42px",
          },
          dividerRow: {
            width: "90%",
            margin: "auto",
          },
          formButtonPrimary: {
            fontSize: 14,
            textTransform: "none",
            height: "42px",
            backgroundColor: "#000",
            "&:hover, &:focus, &:active": {
              backgroundColor: "",
            },
          },
          footer: {
            background: "transparent",
          },
          footerAction: {},
          identityPreview: {
            justifyContent: "flex-start",
            alignItems: "left",
            textAlign: "left",
            marginTop: "1rem",
          },
          identityPreviewText: {
            color: "black",
            lineHeight: "2",
          },
          form: {
            alignItems: "left",
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};
