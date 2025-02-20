"use client";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null; // Or a loading spinner
  }

  if (!session) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-blue-600">
              Welcome to Quiz Master
            </DialogTitle>
            <DialogDescription className="text-center ">
              Test your knowledge with exciting quizzes!
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-6 py-4">
            {/* Add your quiz logo or illustration here */}
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/puzzle.png" // Change this to your quiz logo image path
                alt="Quiz Master Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-lg text-blue-600">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground ">
                <li>🧠 Challenge yourself with diverse topics</li>
                <li>⏱️ Beat the clock in timed quizzes</li>
                <li>🏆 Track your progress and scores</li>
                <li>🎯 Learn new facts every day</li>
              </ul>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 bg-blue-600 font-extrabold text-white border-none"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our{" "}
              <a href="/terms" className="underline hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{children}</>;
}
