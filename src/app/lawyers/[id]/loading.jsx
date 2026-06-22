const LawyerDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-950 p-6 animate-pulse">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden md:flex">
        <div className="bg-gray-800 h-72 w-full md:w-72 shrink-0" />
        <div className="p-8 w-full space-y-6">
          <div className="h-6 bg-gray-800 rounded w-1/3" />
          <div className="h-10 bg-gray-800 rounded w-2/3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LawyerDetailsSkeleton;