import { create } from 'zustand';

interface HarnessSettingsState {
  globalServiceLoopLength: number;
  globalTwistPitch: number;
  setGlobalServiceLoopLength: (length: number) => void;
  setGlobalTwistPitch: (pitch: number) => void;
}

const useHarnessSettingsStore = create<HarnessSettingsState>((set) => ({
  globalServiceLoopLength: 0,
  globalTwistPitch: 0,
  setGlobalServiceLoopLength: (length) => set({ globalServiceLoopLength: length }),
  setGlobalTwistPitch: (pitch) => set({ globalTwistPitch: pitch }),
}));

export default useHarnessSettingsStore;
