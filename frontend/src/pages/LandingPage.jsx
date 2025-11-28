import React from "react";
import { useUser } from "@clerk/clerk-react";
import PublicLanding from "./PublicLanding";
import HomeFeed from "./HomeFeed";

const LandingPage = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return <>{isSignedIn ? <HomeFeed /> : <PublicLanding />}</>;
};

export default LandingPage;
