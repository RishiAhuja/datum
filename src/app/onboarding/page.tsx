"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Onboarding() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<"welcome" | "create-wallet" | "import-wallet">("welcome");
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);
  
  // Handle loading state
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        {step === "welcome" && (
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg 
                  className="h-8 w-8 text-blue-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Welcome to Your Wallet!</h1>
              <p className="mt-2 text-sm text-slate-600">
                Hi {session?.user?.name || "there"}! Let's get your wallet set up.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => setStep("create-wallet")}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Create a new wallet
              </Button>
              
              <Button
                onClick={() => setStep("import-wallet")}
                variant="outline"
                className="w-full"
              >
                Import existing wallet
              </Button>
            </div>
          </div>
        )}

        {step === "create-wallet" && (
          <div className="w-full max-w-md">
            {/* Replace this with your CreateWallet component */}
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-800">Create New Wallet</h2>
              <p className="mb-4 text-sm text-slate-600">
                This is where your CreateWallet component will go
              </p>
              <Button onClick={() => setStep("welcome")}>Back</Button>
            </div>
          </div>
        )}

        {step === "import-wallet" && (
          <div className="w-full max-w-md">
            {/* Replace this with your ImportWallet component */}
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-800">Import Existing Wallet</h2>
              <p className="mb-4 text-sm text-slate-600">
                This is where your ImportWallet component will go
              </p>
              <Button onClick={() => setStep("welcome")}>Back</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}