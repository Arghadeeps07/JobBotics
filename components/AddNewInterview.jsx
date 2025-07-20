'use client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';




const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobrole, setJobRole] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState("")
    const router = useRouter();



    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault(); // Prevent default form submission
        // Handle form submission logic here
        console.log({
            jobrole,
            jobDescription,
            yearsOfExperience
        });

        const InputPrompt = `Generate five  ${jobrole} interview questions and answers for a ${jobDescription} with ${yearsOfExperience} years of experience. The output should be in JSON format with the fields "question" and "answer".`;
        console.log(InputPrompt);
        try {
            const res = await axios.post('/api/generate', {
                prompt: InputPrompt,
                jobrole,
                jobDescription,
                yearsOfExperience
            });
            const response = res.data.output;
            const mockId = res.data.mockId
            setJsonResponse(response);
            console.log(mockId);

            if (response) {
                setLoading(false)
                setOpenDialog(false);
                router.push(`/dashboard/interview/${mockId}`)
            }


        } catch (error) {
            console.error("Error in inderting the docucent in the database", error);

        }

        // Close dialog after submission
    }

    const cancelButton = () => {
        setLoading(false);
        setOpenDialog(false);
    }

    return (
        <div>
            <div
                className='p-6 border border-dashed border-gray-400 bg-secondary hover:shadow-lg transition-all duration-200 rounded-xl text-center cursor-pointer'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-xl font-medium text-primary'>+ Add New Interview</h2>
                <p className='text-sm text-muted-foreground'>Share your interview experience</p>
            </div>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold text-3xl text-primary mb-2">
                            Tell us about your Interview
                        </AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <form className="space-y-5 mt-4" onSubmit={onSubmit}>
                                <div className='text-black'>
                                    <label className="block font-medium mb-1">Job Role / Position</label>
                                    <Input placeholder='e.g. Software Engineer' required
                                        onChange={(e) => setJobRole(e.target.value)} />
                                </div>

                                <div className='text-black'>
                                    <label className="block font-medium mb-1">Job Description / Tech Stack</label>
                                    <Textarea placeholder='e.g. React, Node.js, Angular' rows={4} required
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                </div>

                                <div className='text-black'>
                                    <label className="block font-medium mb-1">Years of Experience</label>
                                    <Input placeholder='e.g. 3' type="number" min={0} max={50} required
                                        onChange={(e) => setYearsOfExperience(e.target.value)} />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">

                                    <Button className="gap-6" variant="outline" onClick={() => cancelButton
                                    }>Cancel</Button>
                                    <Button className="gap-6" type="submit" disabled={loading}>
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <LoaderCircle className="animate-spin h-4 w-4" />
                                                Generating
                                            </span>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default AddNewInterview;
