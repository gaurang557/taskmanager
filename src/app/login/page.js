"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/employees"
    });
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin}>
        <input
          className="border p-2 w-full mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
