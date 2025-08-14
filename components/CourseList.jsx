'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem'

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
      console.log(result.data.result);
      
      setCourseList(result.data.result || []);
    } catch (err) {
      console.error("Error fetching course list:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
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
