"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock, User, CheckCircle } from "lucide-react";
import StudyMeteriaList from "./ui/StudyMeteriaList";
import ChapterList from "./ChapterList";

const CourseIntroCard = ({ course }) => {
  if (!course) {
    return (
      <div className="text-center text-gray-500 p-6">
        Loading course details...
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <BookOpen className="w-6 h-6 text-blue-600" />
          {course.topic}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Badges */}
        <div className="flex gap-3 flex-wrap">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Difficulty: {course.difficultyLevel}
          </Badge>
          <Badge
            variant="secondary"
            className={
              course.status === "Ready"
                ? "bg-green-50 text-green-700"
                : "bg-yellow-50 text-yellow-700"
            }
          >
            <CheckCircle className="w-4 h-4 mr-1" /> {course.status}
          </Badge>
        </div>

        {/* Summary */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          {course.courseLayout?.summary_of_course}
        </p>

        {/* Extra Info */}
        <Separator />
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" /> {course.createdBy}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {new Date(course.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>

      {/* Sections */}
      <div className="border-t p-6">
        <StudyMeteriaList courseId={course.courseId} />
      </div>
      <div className="border-t p-6">
        <ChapterList course={course} />
      </div>
    </Card>
  );
};

export default CourseIntroCard;
