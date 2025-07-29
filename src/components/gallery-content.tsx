"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Picture {
  id: string
  title: string
  url: string
  thumbnailUrl: string
}

// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
//   message: string;
// }

interface data {
  images: Picture[]
  total: number
  currentPage: number
  // limit: number
  totalPages: number
}


interface ApiResponse {
  data: data

}

export default function GalleryContent() {
  const [pictures, setPictures] = useState<Picture[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    // limit: 10,
    totalPages: 0,
  })

  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = Number.parseInt(searchParams.get("page") || "1")
  const currentLimit = Number.parseInt(searchParams.get("limit") || "10")

  useEffect(() => {
    fetchPictures(currentPage, currentLimit)
  }, [currentPage, currentLimit])

  const fetchPictures = async (page: number, limit: number) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`http://localhost:8000/api/v1/images/paginated?page=${page}&limit=${limit}`)

      if (!response.ok) {
        throw new Error("Failed to fetch pictures")
      }

      const data: ApiResponse = await response.json()


      console.log(data.data.images)
      console.log(data);
      console.log(data.data.total, data.data.currentPage, data.data.totalPages)
      setPagination({
        total: data.data.total,
        page: data.data.currentPage,
        // limit: data.limit,
        totalPages: data.data.totalPages,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    params.set("limit", currentLimit.toString())
    router.push(`/gallery?${params.toString()}`)
  }

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")
    params.set("limit", newLimit.toString())
    router.push(`/gallery?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: currentLimit }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg mb-4">Error: {error}</p>
        <Button onClick={() => fetchPictures(currentPage, currentLimit)}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Items per page selector */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={currentLimit}
            onChange={(e) => handleLimitChange(Number.parseInt(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">per page</span>
        </div>

        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * currentLimit + 1} to {Math.min(currentPage * currentLimit, pagination.total)} of{" "}
          {pagination.total} results
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pictures.map((picture, index) => (
          <div
            key={picture.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={"https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww"}
                alt={picture.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 truncate">{picture.title}</h3>
              <p className="text-sm text-gray-500 mt-1">sample{picture.id}.jpg</p>
              <p className="text-xs text-gray-400 mt-1">{picture.url}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 py-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center space-x-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum
              if (pagination.totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="flex items-center space-x-1"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
