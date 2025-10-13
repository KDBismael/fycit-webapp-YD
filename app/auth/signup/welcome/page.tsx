'use client';

import { useRouter } from 'next/navigation';
import { WelcomeModal } from '../../../../components/auth/WelcomeModal';

export default function WelcomePage() {
  const router = useRouter();

  const handleWelcomeStart = () => {
    // Redirect to the unified workflow
    router.push('/auth/signup/workflow');
  };

  const handleWelcomeSkip = () => {
    // Skip verification and go to dashboard
    router.push('/dashboard');
  };

  const handleModalClose = () => {
    // If user closes modal, redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <WelcomeModal
      opened
      onClose={handleModalClose}
      onStartVerification={handleWelcomeStart}
      onSkip={handleWelcomeSkip}
    />
  );
}
