import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold mb-8 text-center">Welcome back, {session.user?.name}!</h1>
          <p className="text-xl mb-8 text-center">
            Your social media dashboard is ready
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to ChatterBox</h1>
        <p className="text-xl mb-8 text-center">
          Your all-in-one social media management platform
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/auth/signin">
            <Button size="lg" variant="default" className="bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
