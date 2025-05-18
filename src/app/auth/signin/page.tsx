"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<{
    google: boolean;
    apple: boolean;
  }>({ google: false, apple: false });
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const error = searchParams?.get("error");
  
  const handleSignIn = async (provider: "google" | "apple") => {
    setIsLoading({ ...isLoading, [provider]: true });
    await signIn(provider, { callbackUrl });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Sign in to Wallet</h1>
          <p className="mt-2 text-sm text-slate-600">
            Connect with a social account to get started
          </p>
        </div>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error === "OAuthAccountNotLinked"
              ? "You already have an account with a different provider. Please sign in with the original provider."
              : "An error occurred during sign in. Please try again."}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => handleSignIn("google")}
            disabled={isLoading.google}
            className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            {isLoading.google ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <button
            onClick={() => handleSignIn("apple")}
            disabled={isLoading.apple}
            className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            {isLoading.apple ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.04-3.96-1.04-2.04 0-3.924 1.184-4.968 3.038-2.112 3.656-.546 9.072 1.5 12.054 1.008 1.456 2.208 3.084 3.792 3.032 1.5-.058 2.088-.96 3.912-.96 1.8 0 2.316.96 3.888.932 1.608-.024 2.628-1.456 3.612-2.932 1.132-1.652 1.596-3.244 1.626-3.328-.036-.012-3.132-1.2-3.156-4.768-.024-2.98 2.4-4.404 2.508-4.478-1.38-2.028-3.516-2.256-4.26-2.316-1.92-.072-3.552 1.044-4.494 1.044z" />
                  <path d="M15.588 2.136c.828-1.008 1.416-2.388 1.26-3.756-1.224.048-2.736.816-3.636 1.86-.78.906-1.476 2.376-1.296 3.744 1.368.108 2.76-.684 3.672-1.848z" />
                </svg>
                Continue with Apple
              </>
            )}
          </button>
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}