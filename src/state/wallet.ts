import { atom, selector } from "recoil";

interface WalletState{
    connected: boolean;
    publicKey: string | null;
}

export const walletState = atom<WalletState>({
  key: "walletState",
  default: {
    connected: false,
    publicKey: null
  }
});

export const balanceSelector = selector({
  key: "balanceSelector",
  get: async ({ get }) => {
    const wallet = get(walletState);
    if (!wallet.connected) {
      return 0;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Math.random() * 1000;
  }
})