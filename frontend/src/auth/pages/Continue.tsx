import { SignUp } from "@clerk/clerk-react";

export default function Continue() {
  return <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />;
}
