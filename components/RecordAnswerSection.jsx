'use client'

import { WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'

const RecordAnswerSection = ({ questions, activeIndex, interviewDetails }) => {
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(false);
    const [transcript, setTranscript] = useState('')
    const [recordingKey, setRecordingKey] = useState(0);

    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    })

    const handleStartRecording = () => {
        setStatus(true)
        setTranscript(' ')
        startSpeechToText()
    }

    const handleStopRecording = () => {
        setStatus(false)
        stopSpeechToText()
    }

    useEffect(() => {
        if (results.length > 0) {
            const fullText = results.map(res => res.transcript).join(' ')
            setTranscript(fullText)
        }
    }, [results])

    const saveUserAnswer = async () => {
        setLoading(true);
        stopSpeechToText();

        if (transcript?.length < 7) {
            toast.error("Error while saving the answer. Please try again");
            setLoading(false);
            return;
        }

        const mockId = interviewDetails?.mockId;
        const question = questions[activeIndex]?.question;
        const answer = questions[activeIndex]?.answer;

        try {
            const res = await axios.post('/api/save', {
                question,
                answer,
                transcript,
                mockId,
            });

            if (res?.status === 200) {
                toast.success("Your answer has been saved");
                setTranscript("");
                setResults([])
                setRecordingKey(prev => prev + 1); 
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-xl w-full mx-auto mt-10 px-6 py-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg transition-all space-y-6 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
                Record Your Answer
            </h2>

            <div className="flex flex-col items-center space-y-4">
                {status ? (
                    <>
                        <Webcam
                            className="rounded-lg shadow-md"
                            mirrored={true}
                            width={320}
                            height={240}
                        />
                        <Button variant="destructive" onClick={handleStopRecording}>
                            Stop Recording
                        </Button>
                        {interimResult && (
                            <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
                                Listening: {interimResult}
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <WebcamIcon className="w-12 h-12 text-zinc-600 dark:text-zinc-400" />
                        </div>
                        <Button onClick={handleStartRecording}>
                            Start Recording
                        </Button>
                        {transcript && (
                            <div className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-sm border border-zinc-200 dark:border-zinc-700">
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                                    Your Answer:
                                </p>
                                <p className="text-zinc-800 dark:text-zinc-100">{transcript}</p>
                                <div className="mt-4 text-right">
                                    <Button variant="outline" size="sm" onClick={() => setTranscript("")}>
                                        <Trash2 className="w-4 h-4 mr-2" /> Clear Answer
                                    </Button>
                                </div>
                                {loading ? <> <LoaderCircle className='animate-spin' /> </> : <>
                                    <Button onClick={saveUserAnswer} >Save Answer</Button>
                                </>
                                }
                            </div>

                        )}
                    </>
                )}
            </div>



            {error && (
                <p className="text-sm text-red-600 text-center">
                    Error: {error}
                </p>
            )}
        </div>
    )
}

export default RecordAnswerSection
