import type React from "react"

type StepLayoutProps = {
  children: React.ReactNode
  title: string
}

export function StepLayout({ children, title }: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  )
}

