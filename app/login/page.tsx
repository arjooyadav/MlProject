"use client"

import { useRouter } from "next/navigation"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Store login state (in a real app, you'd use proper auth)
    localStorage.setItem(
      "stocKera_user",
      JSON.stringify({
        email: credentials.email,
        loginTime: new Date().toISOString(),
      }),
    )

    // Redirect to dashboard
    router.push("/")
  }

  return <LoginForm onLogin={handleLogin} />
}
