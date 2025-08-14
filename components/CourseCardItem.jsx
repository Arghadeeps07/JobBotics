"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { RefreshCcwDotIcon } from "lucide-react";

const difficultyColors = {
  easy: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-rose-100 text-rose-700",
};

const CourseCardItem = ({ course }) => {
  const { topic, difficultyLevel, courseLayout, status } = course;

  return (
    <Card className="w-full h-full flex flex-col border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 rounded-xl overflow-hidden">
      {/* Header */}
      <CardHeader className="pb-3 bg-blue-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <CardTitle className="capitalize text-lg font-semibold">
              {topic}
            </CardTitle>
          </div>
          <Badge
            className={`capitalize ${
              difficultyColors[difficultyLevel] || "bg-gray-100 text-gray-700"
            }`}
          >
            {difficultyLevel}
          </Badge>
        </div>
        <CardDescription className="text-sm font-bold text-black mt-2">
          {courseLayout?.summary_of_course?.slice(0, 110)+"..."}
        </CardDescription>
      </CardHeader>

      {/* Chapters Preview */}
      <CardContent className="flex-1 py-4 space-y-3">
        {courseLayout?.chapters?.slice(0, 3).map((chapter, index) => (
          <div
            key={index}
            className="p-3 border border-gray-100 rounded-lg bg-white hover:border-blue-200 hover:bg-blue-50 transition"
          >
            <h4 className="font-medium text-gray-800 text-sm">
              {chapter.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {chapter.summary}
            </p>
          </div>
        ))}
      </CardContent>

      {/* Footer */}
      <CardFooter className="bg-gray-50 border-t">
        { (status=="Generating") ? 
        
         <Button
          variant="default"
          className="flex gap-2 w-full bg-blue-500 hover:bg-blue-400 text-white"
        >
           <RefreshCcwDotIcon className="animate-spin" />
          Generating...
        </Button>
        
        : 
        
        <Button
          variant="default"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          View Full Course
        </Button>
        
        }
      </CardFooter>
    </Card>
  );
};

export default CourseCardItem;
