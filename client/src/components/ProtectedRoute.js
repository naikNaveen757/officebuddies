import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!authToken) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
