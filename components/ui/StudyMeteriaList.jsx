'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

const StudyMeteriaList = ({ courseId }) => {
  useEffect(() => {
    getStudyMeterial();
  }, []);

  const meterialList = [
    {
      id: 0,
      title: "Notes/Chapters",
      description: "Detailed notes and chapters for in-depth understanding.",
      path: "notes",
    },
    {
      id: 1,
      title: "Flashcards",
      description: "Key terms and definitions for quick review.",
      path: "flashcard",
    },
    {
      id: 2,
      title: "Quizzes",
      description: "Short quizzes to test your knowledge.",
      path: "quize",
    },
    {
      id: 3,
      title: "Question/Answers",
      description: "Common questions and answers for clarification.",
      path: "qa",
    },
  ];

  const getStudyMeterial = async () => {

    const result = await axios.post("/api/study-type", {
      courseId,
      studyType: "notes",
    }); 


  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Study Materials</h2>
      <Card className="divide-y">
        {meterialList.map((item, ind) => {
          const isNotes = item.path === "notes";
          return (
            <div key={ind}>
              {isNotes ? (
                <Link href={`/course/${courseId}/${item.path}`}>
                  <CardContent className="p-4 hover:bg-gray-100 transition cursor-pointer">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Link>
              ) : (
                <CardContent className="p-4 opacity-70">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <Badge variant="secondary" className="ml-2">
                      Coming Soon
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default StudyMeteriaList;
