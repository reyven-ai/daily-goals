import { SignUp } from "@clerk/clerk-react";

export default function Verify() {
  return <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />;
}
