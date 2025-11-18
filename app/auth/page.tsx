"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAuth = async () => {
    setLoading(true)
    setMessage("")

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error

        setMessage("Erfolgreich eingeloggt!")
        router.push("/")
      } else {
        // 📝 REGISTRIEREN
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error

        setMessage("Registrierung erfolgreich! Bestätige deine Email.")
      }
    } catch (error: any) {
      setMessage(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold">
          {isLogin ? "Login" : "Registrierung"}
        </h1>

        <div className="mt-6">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border p-2"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-4 block text-sm font-medium">Passwort</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border p-2"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleAuth}
            disabled={loading}
            className="mt-6 w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-300"
          >
            {loading ? "Bitte warten..." : isLogin ? "Einloggen" : "Registrieren"}
          </button>

          {message && (
            <p className="mt-4 rounded-md bg-gray-200 p-2 text-center text-sm">
              {message}
            </p>
          )}

          <p className="mt-4 text-center text-sm">
            {isLogin ? "Noch kein Konto?" : "Du hast schon ein Konto?"}{" "}
            <button
              className="font-semibold text-blue-600 underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Registrieren" : "Einloggen"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
