import Image from "next/image"

export default function EmergencyAccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
      <header className="w-full border-b py-4">
        <div className="container mx-auto flex items-center justify-center gap-2">
            <Image
                src="/logo.svg"
                width={102}
                height={24}
                alt="Medpass Logo"
              />
            <h1 className="text-xl font-bold"> - Emergency Access</h1>
        </div>
      </header>
      <main className="flex-1 w-full container mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="w-full py-4">
        <p className="text-center text-xs text-muted-foreground">
            This information is provided for emergency use only.
        </p>
      </footer>
    </div>
  )
}
