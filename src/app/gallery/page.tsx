import { Suspense } from "react"
import GalleryContent from "@/components/gallery-content"
import GalleryLoading from "@/components/gallery-loading"
import Link from "next/link"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 transition-colors"
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
                className="flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-gray-900 transition-colors"
              >
                Pictures
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Gallery Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in">Picture Gallery</h1>

        <Suspense fallback={<GalleryLoading />}>
          <GalleryContent />
        </Suspense>
      </main>
    </div>
  )
}
