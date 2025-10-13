import React from 'react';
import { Timeline, TimelineStep } from './Timeline';

interface VerificationTimelineProps {
  currentStep: number;
  brandColor?: string;
  stepActiveColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VerificationTimeline: React.FC<VerificationTimelineProps> = ({
  currentStep,
  brandColor = '#A98D34',
  stepActiveColor = '#D4B75C',
  size = 'md',
}) => {
  const steps: TimelineStep[] = [
    { id: 1, title: 'Welcome', description: 'Profile Setup' },
    { id: 2, title: 'Verification', description: 'Guild Verify' },
    { id: 3, title: 'Complete', description: 'Dashboard' },
  ];

  return (
    <Timeline
      steps={steps}
      currentStep={currentStep}
      brandColor={brandColor}
      stepActiveColor={stepActiveColor}
      size={size}
      showLabels={false}
    />
  );
};
