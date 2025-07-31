"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-3">
        {status === "loading" && (
          <span className="text-sm text-gray-400 animate-pulse">
            Verificando sessão...
          </span>
        )}
        {status === "unauthenticated" && (
          <span className="text-sm text-gray-500">Não autenticado</span>
        )}
        {status === "authenticated" && session?.user && (
          <>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="text-sm">{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="text-red-500 text-sm hover:underline"
            >
              Sair
            </button>
          </>
        )}
      </div>
    </header>
  );
}
