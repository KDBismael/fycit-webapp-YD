import { create } from 'zustand';

export interface VerificationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export interface VerificationData {
  [key: string]: string | File | number | Date | undefined | null;
}

interface VerificationStore {
  // Timeline state
  currentStep: number;
  steps: VerificationStep[];

  // Form data
  verificationData: VerificationData;

  // Actions
  setCurrentStep: (step: number) => void;
  completeStep: (stepId: number) => void;
  updateVerificationData: (data: VerificationData | null) => void;
  resetStore: () => void;
}

const initialSteps: VerificationStep[] = [
  {
    id: 1,
    title: 'Welcome',
    description: 'Complete your profile setup',
    completed: false,
    active: true,
  },
  {
    id: 2,
    title: 'Verification',
    description: 'Verify your guild membership',
    completed: false,
    active: false,
  },
  {
    id: 3,
    title: 'Complete',
    description: 'Finish setup and access dashboard',
    completed: false,
    active: false,
  },
];

const initialVerificationData: VerificationData = {};

export const useVerificationStore = create<VerificationStore>((set, get) => ({
  currentStep: 1,
  steps: initialSteps,
  verificationData: initialVerificationData,

  setCurrentStep: (step: number) => {
    set((state) => ({
      currentStep: step,
      steps: state.steps.map((s, index) => ({
        ...s,
        active: index + 1 === step,
        completed: index + 1 < step,
      })),
    }));
  },

  completeStep: (stepId: number) => {
    set((state) => ({
      steps: state.steps.map((step) => (step.id === stepId ? { ...step, completed: true } : step)),
    }));
  },

  updateVerificationData: (data: VerificationData | null) => {
    set((state) => ({
      verificationData: data ? { ...state.verificationData, ...data } : {},
    }));
  },

  resetStore: () => {
    set({
      currentStep: 1,
      steps: initialSteps,
      verificationData: initialVerificationData,
    });
  },
}));
