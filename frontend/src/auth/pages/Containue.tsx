import { SignUp } from "@clerk/clerk-react";

export default function Containue() {
  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      afterSignUpUrl="/"
    />
  );
}
