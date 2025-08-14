'use client'
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [title, setTitle] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [loading, setIsLoading] = useState(false)
  const { user } = useUser();
  const router = useRouter();

  const handelClick = async () => {
    setIsLoading(true)
    const courseId = uuidv4();
    const result = await axios.post('/api/generate-course-outline', {
      courseId,
      title,
      difficultyLevel,
      createdBy: user?.primaryEmailAddress?.emailAddress || "unknown"
    });

    if (result) {
      setIsLoading(false);
      router.push('/dashboard/notes')
      return;
    }

    toast.error("Unexpected Error occured!!")

  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Create Study Material
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-center">
            Fill all the details to generate your study material
          </p>

          {/* Topic Input */}
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-gray-700 font-medium" >
              Topic Name
            </Label>
            <Input
              id="topic"
              placeholder="Enter the topic name..."
              className="focus-visible:ring-blue-500"
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-gray-700 font-medium">
              Difficulty Level
            </Label>
            <Select onValueChange={(value) => setDifficultyLevel(value)} >
              <SelectTrigger id="difficulty" className="focus-visible:ring-blue-500">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          {loading ? <Button className="w-full bg-blue-400 text-white font-medium rounded-lg" >
            <Loader2Icon className="animate-spin" />
          </Button> :

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg" onClick={handelClick}>
              Generate Material
            </Button>

          }
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
