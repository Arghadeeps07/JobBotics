'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem'
import { RefreshCcwIcon } from 'lucide-react'

// Better Skeleton component
const CourseCardSkeleton = () => (
  <div className="animate-pulse border rounded-xl p-4 shadow-sm bg-white">
    {/* Image placeholder */}
    <div className="h-32 w-full bg-gray-200 rounded-lg mb-4"></div>
    {/* Title */}
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    {/* Subtitle */}
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
    {/* Button placeholder */}
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
  </div>
)

const CourseList = () => {
  const { user, isLoaded } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      getCourseList();
    }
  }, [isLoaded, user]);

  const getCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/courses', { 
        createdBy: user?.primaryEmailAddress?.emailAddress 
      });
      setCourseList(result.data.result || []);
    } catch (err) {
      console.error("Error fetching course list:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <button
          onClick={getCourseList}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <RefreshCcwIcon className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        // Multiple skeletons
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : courseList.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course, ind) => (
            <CourseCardItem course={course} key={ind} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseList
