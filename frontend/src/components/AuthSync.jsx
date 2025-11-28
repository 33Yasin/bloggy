import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const AuthSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          await fetch("http://localhost:5000/api/users/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
              email_addresses: user.emailAddresses,
              first_name: user.firstName,
              last_name: user.lastName,
            }),
          });
          console.log("User synced with backend");
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);

  return null;
};

export default AuthSync;
