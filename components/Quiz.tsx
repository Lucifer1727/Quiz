"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthGuard from "./signin-Dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import quizData from "@/data/quizData";

// Import the server action (if supported in your setup)
import { saveScore } from "@/lib/queries";

const SECONDS_PER_QUESTION = 30;

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return SECONDS_PER_QUESTION;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Removed unnecessary dependency: currentQuestionIndex

  // This function still saves the attempt to IndexedDB if needed.
  const saveAttemptToIndexedDB = async (score: number) => {
    if ("indexedDB" in window) {
      const db: any = await openDatabase();
      const transaction = db.transaction(["attempts"], "readwrite");
      const objectStore = transaction.objectStore("attempts");
      const attempt = {
        date: new Date().toISOString(),
        score,
        totalQuestions: quizData.length,
      };
      objectStore.add(attempt);
    }
  };

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuizDatabase", 1);

      request.onerror = () => reject("Error opening database");

      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as any).result;
        db.createObjectStore("attempts", { keyPath: "date" });
      };
    });
  };

  const handleAnswer = (answer: any) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
      setTimeLeft(SECONDS_PER_QUESTION);
    } else {
      setQuizCompleted(true);
      // Save locally
      saveAttemptToIndexedDB(score);
      // Save in database via server action
      try {
        await saveScore(score);
      } catch (error) {
        console.error("Error saving score:", error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setShowFeedback(false);
    setTimeLeft(SECONDS_PER_QUESTION);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-blue-50 shadow-lg rounded-lg">
        <CardHeader className="bg-blue-100 p-6 rounded-t-lg">
          <CardTitle className="text-blue-800 text-3xl font-semibold font-montserrat">
            Quiz Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 font-inter">
          <p className="text-2xl font-bold mb-4 text-blue-700">
            Your Score: {score} / {quizData.length}
          </p>
          <Progress
            value={(score / quizData.length) * 100}
            className="w-full h-4 bg-blue-200"
            style={{ borderRadius: "8px" }}
          />
        </CardContent>
        <CardFooter className="bg-blue-100 p-6 rounded-b-lg flex justify-end">
          <Button
            onClick={restartQuiz}
            className="mr-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            Restart Quiz
          </Button>
          <Button
            onClick={() => router.push("/history")}
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-100"
          >
            View History
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    // <AuthGuard>
    <Card className="w-full max-w-4xl mx-auto bg-blue-50 shadow-lg rounded-lg">
      <CardHeader className="bg-blue-100 p-6 rounded-t-lg">
        <CardTitle className="text-blue-800 text-3xl font-semibold font-montserrat">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </CardTitle>
        <Progress
          value={(timeLeft / SECONDS_PER_QUESTION) * 100}
          className="w-full h-4 bg-blue-200"
          style={{ borderRadius: "8px" }}
        />
        <p className="text-blue-700 mt-2 font-inter">
          Time left: {timeLeft} seconds
        </p>
      </CardHeader>
      <CardContent className="p-8 font-inter">
        <p className="text-lg mb-6 text-blue-700">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.answers.map((answer, index) => {
            // Determine background based on feedback and selection
            const isSelected = selectedAnswer === answer;
            let optionBg = "bg-white";
            if (showFeedback && isSelected) {
              optionBg =
                answer === currentQuestion.correctAnswer
                  ? "bg-green-200"
                  : "bg-red-200";
            }
            return (
              <div
                key={index}
                onClick={() => handleAnswer(answer)}
                className={`flex items-center space-x-3 p-4 rounded-md cursor-pointer border border-gray-300 hover:bg-blue-50 ${optionBg}`}
              >
                {/* The radio element is kept for accessibility */}
                <input
                  type="radio"
                  name="answer"
                  checked={isSelected}
                  readOnly
                  className="form-radio text-blue-500"
                />
                <label className="cursor-pointer text-blue-700">{answer}</label>
              </div>
            );
          })}
        </div>
        {showFeedback && (
          <p
            className={`mt-6 font-inter text-xl ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selectedAnswer === currentQuestion.correctAnswer
              ? "Correct!"
              : "Incorrect. The correct answer is: " +
                currentQuestion.correctAnswer}
          </p>
        )}
      </CardContent>
      <CardFooter className="bg-blue-100 p-6 rounded-b-lg flex justify-end">
        {!showFeedback ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
