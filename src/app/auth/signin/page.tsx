"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Bem-vindo 🚀
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Faça login para acessar seu dashboard
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
        >
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Login
          </h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 w-full rounded-lg border p-3"
            suppressHydrationWarning
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="mb-6 w-full rounded-lg border p-3"
            suppressHydrationWarning
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition hover:bg-gray-100"
          >
            <FcGoogle className="text-xl" />
            Entrar com Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-white shadow-sm transition hover:bg-gray-800"
          >
            <FaGithub className="text-xl" />
            Entrar com GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="underline hover:text-gray-700">
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a href="#" className="underline hover:text-gray-700">
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
