import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={32} className="text-accent animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
