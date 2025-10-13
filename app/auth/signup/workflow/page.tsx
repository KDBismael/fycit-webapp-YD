'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AwardsSeasonModal } from '../../../../components/auth/AwardsSeasonModal';
import { GuildVerificationForm } from '../../../../components/auth/GuildVerificationForm';
import { GuildVerificationModal } from '../../../../components/auth/GuildVerificationModal';
import { WelcomeModal } from '../../../../components/auth/WelcomeModal';
import { ProfileCompletionFormData } from '../../../../validation/profile-completion.validation';

interface Guild {
  id: string;
  name: string;
  fullName: string;
  isVerifiable: boolean;
  isVerified?: boolean;
}

// Mock data - replace with actual data from context/API
const mockGuilds: Guild[] = [
  {
    id: 'AMPAS',
    name: 'AMPAS',
    fullName: 'AMPAS - Motion Picture Academy',
    isVerifiable: true,
    isVerified: false,
  },
  {
    id: 'ADG',
    name: 'ADG',
    fullName: 'ADG - Art Directors Guild',
    isVerifiable: true,
    isVerified: true,
  },
  {
    id: 'ASC',
    name: 'ASC',
    fullName: 'ASC - American Society of Cinematographers',
    isVerifiable: false,
  },
];

export default function SignupWorkflowPage() {
  const router = useRouter();

  // Modal states
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showAwardsSeasonModal, setShowAwardsSeasonModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  // Workflow state
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileCompletionFormData | null>(null);
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);

  const verifiableGuilds = mockGuilds.filter((guild) => guild.isVerifiable);
  const notVerifiableGuilds = mockGuilds.filter((guild) => !guild.isVerifiable);

  // Welcome Modal Handlers
  const handleWelcomeStart = () => {
    setShowWelcomeModal(false);
    setShowAwardsSeasonModal(true);
  };

  const handleWelcomeSkip = () => {
    setShowWelcomeModal(false);
    // Skip to dashboard or next step
    router.push('/dashboard');
  };

  // Awards Season Modal Handlers
  const handleAwardsSeasonNext = (data: ProfileCompletionFormData) => {
    setProfileData(data);
    setShowAwardsSeasonModal(false);

    // Check if user has verifiable guilds
    const selectedGuild = data.selectedGuild;
    const verifiableGuildIds = ['AMPAS', 'ADG', 'WGA', 'SAG', 'DGA'];
    const hasVerifiableGuilds = verifiableGuildIds.includes(selectedGuild);

    if (hasVerifiableGuilds) {
      // User has verifiable guilds, proceed to verification
      setShowVerificationModal(true);
    } else {
      // User has no verifiable guilds, redirect to no verifiable guilds page
      router.push('/auth/signup/no-verifiable-guilds');
    }
  };

  // Guild Verification Modal Handlers
  const handleVerificationModalNext = () => {
    if (verifiableGuilds.length > 0 && !verifiableGuilds.every((g) => g.isVerified)) {
      // If there are verifiable guilds that aren't verified yet, proceed to verification form
      setShowVerificationModal(false);
      setShowVerificationForm(true);
      // Select the first unverified guild
      const firstUnverifiedGuild = verifiableGuilds.find((g) => !g.isVerified);
      if (firstUnverifiedGuild) {
        setSelectedGuild(firstUnverifiedGuild);
      }
    } else {
      // All verifiable guilds are verified, proceed to next step
      setCurrentStep(2);
      handleCompleteVerification();
    }
  };

  const handleVerificationFormNext = (data: any) => {
    console.log('Verification data submitted:', data);

    // Mark guild as verified
    if (selectedGuild) {
      const updatedGuilds = mockGuilds.map((guild) =>
        guild.id === selectedGuild.id ? { ...guild, isVerified: true } : guild
      );
      console.log('Updated guilds:', updatedGuilds);
    }

    // Check if there are more guilds to verify
    const remainingUnverifiedGuilds = verifiableGuilds.filter((g) => !g.isVerified);

    if (remainingUnverifiedGuilds.length > 1) {
      // More guilds to verify, go back to modal
      setShowVerificationForm(false);
      setShowVerificationModal(true);
    } else {
      // All guilds verified, proceed to step 3
      setCurrentStep(3);
      handleCompleteVerification();
    }
  };

  const handleVerificationFormBack = () => {
    setShowVerificationForm(false);
    setShowVerificationModal(true);
  };

  const handleCompleteVerification = () => {
    // All verification steps completed, redirect to dashboard
    console.log('All verification completed!');
    router.push('/dashboard');
  };

  const handleModalClose = () => {
    // If user closes modal, redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <>
      {/* Welcome Modal */}
      <WelcomeModal
        opened={showWelcomeModal}
        onClose={handleModalClose}
        onStartVerification={handleWelcomeStart}
        onSkip={handleWelcomeSkip}
      />

      {/* Awards Season Modal */}
      <AwardsSeasonModal
        opened={showAwardsSeasonModal}
        onClose={handleModalClose}
        onNext={handleAwardsSeasonNext}
      />

      {/* Guild Verification Modal */}
      <GuildVerificationModal
        opened={showVerificationModal}
        onClose={handleModalClose}
        onNext={handleVerificationModalNext}
        verifiableGuilds={verifiableGuilds}
        notVerifiableGuilds={notVerifiableGuilds}
        currentStep={currentStep}
        totalSteps={3}
      />

      {/* Guild Verification Form */}
      {showVerificationForm && selectedGuild && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--mantine-radius-md)',
              padding: '2rem',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <GuildVerificationForm
              selectedGuild={selectedGuild}
              currentStep={currentStep}
              totalSteps={3}
              onNext={handleVerificationFormNext}
              onBack={handleVerificationFormBack}
            />
          </div>
        </div>
      )}
    </>
  );
}
