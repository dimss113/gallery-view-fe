import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors"
              >
                Picture Gallery
              </Link>
              <Link
                href="/"
                className="flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className="flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 transition-colors"
              >
                Pictures
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slide-up">Welcome to Picture Gallery</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
              Discover and explore beautiful images from around the world. Browse our curated collection of stunning
              photographs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
              <Link href="/gallery">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                >
                  View Gallery
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
