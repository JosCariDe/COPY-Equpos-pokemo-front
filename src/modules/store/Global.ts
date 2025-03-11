import { create } from "zustand";
import { Trainer } from "../types/Coach";

interface GlobalState {
    Trainer: Trainer;
    setTrainer: (Trainer: Trainer) => void;
}

export const usePokemonStore = create<GlobalState>((set) => ({
    Trainer: {} as Trainer,
    setTrainer: (Trainer: Trainer) => set({ Trainer }),
}));
