"use client";

import { useState, useRef, useEffect } from 'react';
import { useWalletGenerator } from '@/hooks/use-wallet-generator';
import { Button } from "@/components/ui/button";
import gsap from 'gsap';

interface AnimationRefs {
  card: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  content: HTMLParagraphElement | null;
  button: HTMLButtonElement | null;
  phraseContainer: HTMLDivElement | null;
}

export function CreateWallet() {
  const { generateWallet, generating, generatedWallet, reset } = useWalletGenerator();
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  
  const refs = useRef<AnimationRefs>({
    card: null,
    title: null,
    content: null,
    button: null,
    phraseContainer: null,
  });
  
  useEffect(() => {
    const { card, title, content, button } = refs.current;
    if (card && title && content && button) {
      const tl = gsap.timeline();
      
      button.style.opacity = "1";
      
      tl.from(card, { 
        y: 30, 
        opacity: 0, 
        duration: 0.6,
        ease: "power3.out"
      })
      .from(title, { 
        y: -20, 
        opacity: 0, 
        duration: 0.5,
        ease: "back.out(1.7)" 
      }, "-=0.3")
      .from(content, { 
        opacity: 0, 
        duration: 0.5 
      }, "-=0.2")
      .from(button, { 
        scale: 0.9, 
        opacity: 0, 
        duration: 0.5,
        ease: "elastic.out(1, 0.75)" 
      }, "-=0.2");
      
      return () => {tl.kill()};
    }
  }, []);
  
  useEffect(() => {
    if (generatedWallet) {
      gsap.fromTo(".result-item", 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.05, 
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }
  }, [generatedWallet]);
  
  useEffect(() => {
    const { phraseContainer } = refs.current;
    if (showSeedPhrase && phraseContainer) {
      gsap.fromTo(".phrase-word", 
        { scale: 0.5, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.03,
          duration: 0.4,
          ease: "back.out(2)" 
        }
      );
    }
  }, [showSeedPhrase]);
  
  async function handleCreateWallet() {
    const { button } = refs.current;
    if (button) {
      gsap.to(button, {
        scale: 0.97,
        duration: 0.1,
        onComplete: () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            onComplete: () => {
              generateWallet();
            }
          });
        }
      });
    } else {
      await generateWallet();
    }
  }
  
  function handleShowSeedPhrase() {
    setShowSeedPhrase(true);
  }
  
  function handleReset() {
    const { card } = refs.current;
    if (card) {
      gsap.to(card, {
        y: 10,
        opacity: 0.5,
        duration: 0.3,
        onComplete: () => {
          reset();
          setShowSeedPhrase(false);
          
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }
  }
  
  if (generatedWallet) {
    return (
      <div 
        ref={el => { refs.current.card = el; }}
        className="max-w-md w-full mx-auto p-8 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
      >
        <h2 
          ref={el => { refs.current.title = el; }}
          className="text-2xl font-semibold mb-6 text-slate-800 result-item"
        >
          Wallet Created!
        </h2>
        
        <div className="mb-6 result-item">
          <p className="font-medium text-slate-600 mb-2">Public Key</p>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-sm text-slate-700 break-all">
            {generatedWallet.publicKey}
          </div>
        </div>
        
        {!showSeedPhrase ? (
          <div className="mb-6 result-item">
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg mb-4">
              <p className="text-amber-800 text-sm">
                <strong>Important:</strong> Your recovery phrase allows you to restore your wallet if you lose access.
                Never share it with anyone.
              </p>
            </div>
            <Button 
              onClick={handleShowSeedPhrase}
              className="w-full bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 transition-all"
            >
              Reveal Recovery Phrase
            </Button>
          </div>
        ) : (
          <div className="mb-4 result-item">
            <p className="font-medium text-slate-600 mb-1.5">Recovery Phrase</p>
            
            <div 
              ref={el => { refs.current.phraseContainer = el; }}
              className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-3"
            >
              <p className="text-xs text-slate-500 mb-2 text-center">
                Write down these 12 words in exact order
              </p>
              
              <div className="grid grid-cols-3 gap-2">
                {generatedWallet.mnemonic.split(' ').map((word, index) => (
                  <div 
                    key={index} 
                    className="phrase-word flex items-center bg-white border border-slate-200 rounded px-1.5 py-1 text-sm"
                  >
                    <span className="text-slate-500 text-xs w-4 text-center">{index+1}</span>
                    <span className="font-medium text-slate-800 ml-1">{word}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-2.5 bg-red-50 border-l-3 border-red-500 rounded text-xs text-red-700">
              <strong>Security warning:</strong> Write down these words in order and keep them secure.
              Anyone with this phrase can access your wallet.
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleReset}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all"
        >
          Create Another Wallet
        </Button>
      </div>
    );
  }
  
  return (
    <div 
      ref={el => { refs.current.card = el; }}
      className="max-w-md w-full mx-auto p-8 bg-white border border-slate-200 rounded-xl shadow-lg"
    >
      <h2 
        ref={el => {refs.current.title = el}}
        className="text-2xl font-semibold mb-4 text-slate-800"
      >
        Create a New Wallet
      </h2>
      
      <p 
        ref={el => { refs.current.content = el; }}
        className="mb-8 text-slate-600"
      >
        Generate a new wallet with a secure recovery phrase. You'll need to safely 
        store this phrase to recover your wallet in the future.
      </p>
      
      <Button 
        ref={el => { refs.current.button = el; }}
        onClick={handleCreateWallet} 
        disabled={generating}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all"
      >
        {generating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : "Create Wallet"}
      </Button>
    </div>
  );
}