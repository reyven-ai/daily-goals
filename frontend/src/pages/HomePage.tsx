import { SignOutButton, UserButton } from "@clerk/clerk-react";

export default function HomePage() {
  return (
    <div>
      <UserButton />
      <SignOutButton />
      <p>Welcome to the Real World!</p>
    </div>
  );
}
