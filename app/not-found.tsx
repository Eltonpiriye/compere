'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function NotFound() {
  const [foundMicrophone, setFoundMicrophone] = useState(false)
  const [gameScore, setGameScore] = useState(0)

  const handleMicrophoneClick = () => {
    if (!foundMicrophone) {
      setFoundMicrophone(true)
      setGameScore(gameScore + 100)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-9xl font-black text-foreground">404</div>
          <h1 className="text-4xl font-bold text-foreground">
            The Stage is Empty!
          </h1>
          <p className="text-xl text-muted-foreground">
            Oops! Looks like this gig is a no-show!
          </p>
        </div>

        {/* Interactive MC Illustration */}
        <Card className="p-8 bg-card border-2 border-border">
          <div className="relative">
            {/* MC Character */}
            <div className="text-6xl mb-4">🎤</div>
            <div className="speech-bubble bg-secondary p-4 rounded-lg relative mb-6">
              <p className="text-secondary-foreground font-medium">
                "The page you're looking for seems to have missed its cue!"
              </p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-secondary"></div>
              </div>
            </div>

            {/* Gamification Element */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                🎮 Mini Game: Find the Hidden Microphone!
              </h3>
              <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                {[...Array(9)].map((_, index) => (
                  <button
                    key={index}
                    onClick={index === 4 ? handleMicrophoneClick : undefined}
                    className="w-16 h-16 bg-muted hover:bg-accent border-2 border-border rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center text-2xl"
                  >
                    {index === 4 && foundMicrophone ? '🎤' : '❓'}
                  </button>
                ))}
              </div>

              {foundMicrophone && (
                <div className="animate-bounce">
                  <p className="text-lg font-bold text-foreground">
                    🎉 Found it! Score: {gameScore} points!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Great job! Now let's get you back to the main show.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/">
              🏠 Back to Home Stage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-semibold">
            <Link href="/contact">
              📞 Contact the MC
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Don't worry, even the best MCs sometimes lose their script!
            <br />
            Let's get you back to where the real entertainment happens.
          </p>
        </div>
      </div>
    </div>
  )
}