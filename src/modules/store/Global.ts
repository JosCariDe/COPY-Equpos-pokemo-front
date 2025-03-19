import { create } from "zustand";
import { Entrenador } from "../types/Coach";

interface GlobalState {
    Trainer: Entrenador;
    setTrainer: (Trainer: Entrenador) => void;
}

export const usePokemonStore = create<GlobalState>((set) => ({
    Trainer: {} as Entrenador,
    setTrainer: (Trainer: Entrenador) => set({ Trainer }),
}));
