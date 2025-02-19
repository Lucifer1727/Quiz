"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface QuizAttempt {
  date: string;
  score: number;
  totalQuestions: number;
}

const ITEMS_PER_PAGE = 5;

export default function History() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Helper: Open IndexedDB and return the database instance
  const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuizDatabase", 1);
      request.onerror = () => reject("Error opening database");
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("attempts")) {
          db.createObjectStore("attempts", { keyPath: "date" });
        }
      };
    });
  };

  // Helper: Retrieve all attempts from IndexedDB as a promise
  const getAttemptsFromIndexedDB = async (): Promise<QuizAttempt[]> => {
    try {
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(["attempts"], "readonly");
        const objectStore = transaction.objectStore("attempts");
        const request = objectStore.getAll();
        request.onsuccess = (event) => {
          resolve((event.target as IDBRequest).result || []);
        };
        request.onerror = () => reject("Error retrieving attempts");
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAttempts = async () => {
      // First, try to get attempts from IndexedDB
      const localAttempts = await getAttemptsFromIndexedDB();
      if (localAttempts && localAttempts.length > 0) {
        setAttempts(localAttempts);
      } else {
        // If no data in IndexedDB, fetch from the server (database)
        try {
          const res = await fetch('/api/fetchScores');
          if (res.ok) {
            const data = await res.json();
            setAttempts(data);
          } else {
            console.error("Error fetching scores from database");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchAttempts();
  }, []);

  const totalPages = Math.ceil(attempts.length / ITEMS_PER_PAGE);
  const currentAttempts = attempts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">
          Quiz Attempt History
        </h1>
        <Button
          onClick={() => router.push("/")}
          className="mb-4 bg-blue-500 text-white hover:bg-blue-600"
        >
          Back to Quiz
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center p-2 h-[40rem] overflow-auto">
        {currentAttempts.length > 0 ? (
          currentAttempts.map((attempt, index) => (
            <Card key={index} className="mb-4 bg-blue-50 shadow-lg rounded-lg">
              <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
                <CardTitle className="text-blue-800">
                  Attempt on {new Date(attempt.date).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-blue-700">
                  Score: {attempt.score} / {attempt.totalQuestions}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-blue-700 text-center w-full">
            You have not given any quiz yet!
          </p>
        )}
      </div>
      {attempts.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Previous
          </Button>
          <span className="text-blue-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
