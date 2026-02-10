import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
       <div className="absolute top-8 left-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" width={200} height={46} alt="Medpass Logo" className="h-12 w-auto" />
            </Link>
        </div>
      <main className="w-full max-w-2xl">
        {children}
      </main>
    </div>
  )
}
