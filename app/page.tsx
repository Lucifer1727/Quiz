"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { fetchScoresFromDB } from "@/lib/queries";
import AuthGuard from "@/components/signin-Dialog";

interface QuizAttempt {
  id: string;
  userId: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 5;

export default function History() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

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
      const localAttempts = await getAttemptsFromIndexedDB();
      if (localAttempts && localAttempts.length > 0) {
        setAttempts(localAttempts);
      } else {
        try {
          const res = await fetchScoresFromDB();
          if (!res.success) {
            throw new Error("Error fetching scores from database");
          }
          const data = await res.data;
          setAttempts(
            data.map((item) => ({
              ...item,
              createdAt: item.createdAt.toString(),
              updatedAt: item.updatedAt.toString(),
            }))
          );
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
    <AuthGuard>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">
            Quiz History
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-center p-2 h-[40rem] overflow-auto">
          {currentAttempts.length > 0 ? (
            currentAttempts.map((attempt) => (
              <Card
                key={attempt.id}
                className="mb-4 bg-blue-50 shadow-lg rounded-lg"
              >
                <CardHeader className="bg-blue-100 p-4 rounded-t-lg">
                  <CardTitle className="text-blue-800">
                    Attempt by User {attempt.userId}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-blue-700">Score: {attempt.score}</p>
                  <p className="text-gray-600">
                    Created At: {new Date(attempt.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Updated At: {new Date(attempt.updatedAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center w-full">
              <p className="text-blue-700 text-center w-full mb-4">
                No quiz attempts found.
              </p>
              <Button
                onClick={() => router.push("/quiz")}
                className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-6 py-3"
              >
                Take a Quiz
              </Button>
            </div>
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
    </AuthGuard>
  );
}
