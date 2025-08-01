"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: ("admin" | "editor" | "viewer")[];
}

export function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="animate-pulse text-gray-500">Verificando sessão...</p>
      </div>
    );
  }

  if (status === "authenticated" && session?.user) {
    const userRole = session.user.role ?? "viewer";

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return (
        <div className="flex h-screen w-screen items-center justify-center">
          <p className="text-red-500 font-semibold">
            Acesso negado ❌ — você não tem permissão para acessar esta seção.
          </p>
        </div>
      );
    }

    return <>{children}</>;
  }

  return null;
}
