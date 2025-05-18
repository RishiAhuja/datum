"use client";

import { CreateWallet } from "@/components/wallet/create-wallet";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <div className="min-h-screen p-8 flex items-center justify-center">
        <CreateWallet />
      </div>
    </RecoilRoot>
  );
}