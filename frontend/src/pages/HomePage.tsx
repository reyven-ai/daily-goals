// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/providers/AuthContext";
import { SignOutButton, UserButton } from "@clerk/clerk-react";

export default function HomePage() {
  return (
    <div>
      {/* <Button onClick={logOut}>Custom Sign Out</Button> */}
      <UserButton />
      <SignOutButton />
      <p>Welcome to the Real World!</p>
    </div>
  );
}
