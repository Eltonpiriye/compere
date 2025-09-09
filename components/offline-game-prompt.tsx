'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import Link from 'next/link'

interface Props {
  idleMinutes?: number
}

export default function OfflineGamePrompt({ idleMinutes = 10 }: Props) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [showPrompt, setShowPrompt] = useState(false)
  const [idleTimer, setIdleTimer] = useState<number | null>(null)

  useEffect(() => {
    function handleOnline() {
      setIsOffline(false)
      setShowPrompt(false)
    }
    function handleOffline() {
      setIsOffline(true)
  // show prompt immediately when the network goes offline
  setShowPrompt(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

  // show immediately when component mounts and we're already offline
  if (!navigator.onLine) setShowPrompt(true)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (idleTimer) clearTimeout(idleTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function startIdleCountdown() {
    // idleMinutes to ms
    const ms = idleMinutes * 2 * 1000
    if (idleTimer) clearTimeout(idleTimer)
    const t = window.setTimeout(() => {
      setShowPrompt(true)
    }, ms)
    setIdleTimer(t)
  }

  return (
    <>
      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You appear to be offline</DialogTitle>
          </DialogHeader>
          <p className="py-4">You're disconnected from the internet. Would you like to play our offline mini-game while you reconnect?</p>
          <DialogFooter>
            <Button asChild>
              <Link href="/not-found">Play Game</Link>
            </Button>
            <Button variant="outline" onClick={() => setShowPrompt(false)}>Not now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
