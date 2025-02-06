"use client"

import Image from 'next/image'
import { TurmerikDashboard } from '../components/turmerik-dashboard'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <header className="flex items-center gap-4 mb-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.fd8cf1f77cece7bdb914-beOhhDaYsQsAZpP7YUp4ShWLPKAlrc.png"
          alt="TurmerikTerminal Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold">TurmerikTerminal: Investment Decision Support</h1>
      </header>
      <TurmerikDashboard />
    </main>
  )
}