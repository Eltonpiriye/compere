// components/event-card.tsx
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function EventCard({ eventName, eventLogo, href }: { eventName: string; eventLogo: string; href: string; }) {
  return (
    <Link href={href} className="block group">
      <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center flex-grow">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={eventLogo || "/placeholder.svg"}
              alt={`${eventName} Logo`}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
            {eventName}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}
