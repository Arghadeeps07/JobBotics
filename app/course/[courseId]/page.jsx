'use client'

import CourseIntroCard from '@/components/CourseIntroCard';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Course = () => {
  const { courseId } = useParams(); 
  const [course, setCourse] = useState();
  useEffect(() => {
    if (courseId) {
      GetCourse();
    }
  }, [courseId]);

  const GetCourse = async () => {
    try {
      const result = await axios.get(`/api/courses?courseId=${courseId}`);
      setCourse(result.data.result)
    } catch (error) {
      console.error(error);
    }
  };

  return (


  <div>
    <CourseIntroCard course={course} />
  </div>



);
};

export default Course;
