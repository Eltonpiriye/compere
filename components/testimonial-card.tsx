import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react" // Using Lucide React for the placeholder icon

interface TestimonialCardProps {
  avatarSrc?: string
  name: string
  title: string
  quote: string
}

export default function TestimonialCard({ avatarSrc, name, title, quote }: TestimonialCardProps) {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4 bg-blue-100">
            {avatarSrc ? (
              <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
            ) : (
              <AvatarFallback className="bg-blue-200 text-blue-700">
                <User className="h-6 w-6" />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {'"'}
          {quote}
          {'"'}
        </p>
      </CardContent>
    </Card>
  )
}
