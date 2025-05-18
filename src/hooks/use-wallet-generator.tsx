// src/hooks/use-wallet-generator.ts
"use client";

import { useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';

interface GeneratedWallet {
  mnemonic: string;
  publicKey: string;
  privateKey: string; // TODO: protect this
}

export function useWalletGenerator() {
  const [generating, setGenerating] = useState(false);
  const [generatedWallet, setGeneratedWallet] = useState<GeneratedWallet | null>(null);
  
  async function generateWallet(): Promise<GeneratedWallet> {
    try {
      setGenerating(true);
      
      const mnemonic = generateMnemonic(wordlist, 128);
      const seed = mnemonicToSeedSync(mnemonic);
      const derivedSeed = derivePath("m/44'/501'/0'/0'", 
                  new TextDecoder().decode(seed.slice(0, 32))).key;

      const keypair = Keypair.fromSeed(derivedSeed);
      
      const wallet = {
        mnemonic,
        publicKey: keypair.publicKey.toString(),
        privateKey: Buffer.from(keypair.secretKey).toString('hex')
      };
      
      setGeneratedWallet(wallet);
      return wallet;
    } finally {
      setGenerating(false);
    }
  }
  
  function reset() {
    setGeneratedWallet(null);
  }
  
  return {
    generateWallet,
    reset,
    generating,
    generatedWallet
  };
}