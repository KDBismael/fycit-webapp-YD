'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconExclamationMark } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { EventLocalesSelector } from '../../../../components/auth/EventLocalesSelector';
import { GuildSelector } from '../../../../components/auth/GuildSelector';
import {
  ProfileCompletionFormData,
  profileCompletionSchema,
} from '../../../../validation/profile-completion.validation';
import { useAuthStore } from '../../../../stores/authStore';
import { WelcomeModal } from '../../../../components/auth/WelcomeModal';
import { GuildVerificationModal } from '../../../../components/auth/GuildVerificationModal';
import { GuildVerificationForm } from '../../../../components/auth/GuildVerificationForm';
import { MembershipSummaryModal } from '../../../../components/auth/MembershipSummaryModal';

const IMAGE_SIZE = 60;

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

// Mock data for dropdowns
const countries = [
  { value: 'usa', label: 'USA' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Germany' },
  { value: 'australia', label: 'Australia' },
];

export default function ProfileCompletion() {
  const router = useRouter();
  const { authContext, isEmailVerified, resetAuthStore } = useAuthStore();

  // Modal states
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Workflow state
  const [currentStep, setCurrentStep] = useState(1);
  const [_profileData, setProfileData] = useState<ProfileCompletionFormData | null>(null);
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);
  const [submittedMembershipData, setSubmittedMembershipData] = useState<any>(null);

  const verifiableGuilds = mockGuilds.filter((guild) => guild.isVerifiable);
  const notVerifiableGuilds = mockGuilds.filter((guild) => !guild.isVerifiable);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileCompletionFormData>({
    resolver: zodResolver(profileCompletionSchema),
    defaultValues: {
      selectedGuild: [],
      viewEventsInLocals: ['los-angeles'],
      myCountry: 'usa',
      zipPostalCode: '',
    },
  });

  const selectedGuildsForm = watch('selectedGuild');

  // Route protection: redirect if not signup context or email not verified
  useEffect(() => {
    if (authContext !== 'signup' || !isEmailVerified) {
      router.push('/auth/login');
    }
  }, [authContext, isEmailVerified, router]);

  const onSubmit = async (data: ProfileCompletionFormData) => {
    try {
      // eslint-disable-next-line no-console
      console.log('Profile completion data:', data);

      // Store profile data
      setProfileData(data);

      // Check if user has verifiable guilds
      const selectedGuilds = data.selectedGuild;
      const verifiableGuildIds = ['AMPAS', 'ADG', 'WGA', 'SAG', 'DGA'];
      const hasVerifiableGuilds = selectedGuilds.some((guildId) =>
        verifiableGuildIds.includes(guildId)
      );

      if (hasVerifiableGuilds) {
        // User has verifiable guilds, show welcome modal first
        setShowWelcomeModal(true);
      } else {
        // No verifiable guilds, go directly to dashboard
        resetAuthStore();
        router.push('/dashboard');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Profile completion error:', error);
    }
  };

  // Welcome Modal Handlers
  const handleWelcomeStart = () => {
    setShowWelcomeModal(false);
    setShowVerificationModal(true);
  };

  const handleWelcomeSkip = () => {
    setShowWelcomeModal(false);
    resetAuthStore();
    router.push('/dashboard');
  };

  // Guild Verification Modal Handlers
  const handleVerificationModalNext = () => {
    if (verifiableGuilds.length > 0 && !verifiableGuilds.every((g) => g.isVerified)) {
      setShowVerificationModal(false);
      setShowVerificationForm(true);
      const firstUnverifiedGuild = verifiableGuilds.find((g) => !g.isVerified);
      if (firstUnverifiedGuild) {
        setSelectedGuild(firstUnverifiedGuild);
      }
    } else {
      setCurrentStep(2);
      handleCompleteVerification();
    }
  };

  const handleVerificationFormNext = (data: any) => {
    // eslint-disable-next-line no-console
    console.log('Verification data submitted:', data);

    const membershipData = {
      guild: selectedGuild?.fullName || '',
      memberId: data.memberId || '',
      validThrough: data.validThrough
        ? new Date(data.validThrough).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
      memberCardImage: data.memberCardFile
        ? URL.createObjectURL(data.memberCardFile)
        : '/images/ProfileCard.png',
    };
    setSubmittedMembershipData(membershipData);

    if (selectedGuild) {
      const updatedGuilds = mockGuilds.map((guild) =>
        guild.id === selectedGuild.id ? { ...guild, isVerified: true } : guild
      );
      // eslint-disable-next-line no-console
      console.log('Updated guilds:', updatedGuilds);
    }

    setShowVerificationForm(false);
    setShowSummaryModal(true);
  };

  const handleVerificationFormBack = () => {
    setShowVerificationForm(false);
    setShowVerificationModal(true);
  };

  // Summary Modal Handlers
  const handleSummaryGoToDashboard = () => {
    setShowSummaryModal(false);
    resetAuthStore();
    router.push('/dashboard');
  };

  const handleSummaryContinue = () => {
    setShowSummaryModal(false);

    const remainingUnverifiedGuilds = verifiableGuilds.filter((g) => !g.isVerified);

    if (remainingUnverifiedGuilds.length > 0) {
      setShowVerificationModal(true);
    } else {
      handleCompleteVerification();
    }
  };

  const handleCompleteVerification = () => {
    // eslint-disable-next-line no-console
    console.log('All verification completed!');
    resetAuthStore();
    router.push('/dashboard');
  };

  const handleModalClose = () => {
    resetAuthStore();
    router.push('/dashboard');
  };

  return (
    <Container fluid p={0} style={{ height: '100vh' }}>
      <Grid gutter={0} style={{ height: '100vh' }}>
        {/* Left Panel - Golden Background */}
        <Grid.Col span={{ base: 0, md: 5 }} visibleFrom="md">
          <Box
            style={{
              height: '100vh',
              background: 'linear-gradient(135deg, #BAAD3E 0%, #A98A13 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '2rem',
            }}
          >
            <Paper
              p="xl"
              radius="md"
              style={{
                backgroundColor: '#A98A13',
                color: 'white',
                maxWidth: '400px',
              }}
            >
              <Title order={2} fw={700} mb="md">
                Lorem ipsum dolor sit amet, consectetur.
              </Title>
              <Text size="sm" c="gray.2">
                Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem
                semper parturient.
              </Text>
            </Paper>
          </Box>
        </Grid.Col>

        {/* Right Panel - Profile Completion Form */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Box
            style={{
              height: '100vh',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <Stack gap="xl" style={{ maxWidth: '500px', width: '100%' }}>
              {/* Header */}
              <Stack gap="md" align="center">
                <Group gap="sm">
                  <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
                </Group>
                <Stack gap="xs" align="center">
                  <Text size="sm" c="gray.6" ta="center" fw={500}>
                    AWARDS SEASON STARTS HERE
                  </Text>
                  <Title order={1} size="h2" ta="center" c="gray.9" fw={700}>
                    Profile Completion
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Input some additional information here.
                  </Text>
                </Stack>
              </Stack>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="lg">
                  {/* Select Guild */}
                  <Stack gap="xs">
                    <Text size="sm" fw={500} c="gray.8">
                      Select Guilds
                    </Text>
                    <GuildSelector
                      value={selectedGuildsForm}
                      onChange={(value) => setValue('selectedGuild', value)}
                      error={errors.selectedGuild?.message}
                    />
                  </Stack>

                  {/* Warning Alert */}
                  <Alert
                    icon={<IconExclamationMark size={16} />}
                    title="Careful"
                    color="warning"
                    variant="light"
                    radius="md"
                    styles={{
                      root: {
                        backgroundColor: '#FEF3C7',
                        border: '1px solid #FDE68A',
                      },
                    }}
                  >
                    <Text size="sm" c="gray.7">
                      Selecting guilds you are not a member of may prevent you from seeing some
                      events
                    </Text>
                  </Alert>

                  {/* View events in these locals */}
                  <Stack gap="xs">
                    <Text size="sm" fw={500} c="gray.8">
                      View events in these locals
                    </Text>
                    <EventLocalesSelector
                      value={watch('viewEventsInLocals')}
                      onChange={(value) => setValue('viewEventsInLocals', value)}
                      error={errors.viewEventsInLocals?.message}
                    />
                  </Stack>

                  {/* My Country */}
                  <Stack gap="xs">
                    <Text size="sm" fw={500} c="gray.8">
                      My Country
                    </Text>
                    <Select
                      value={watch('myCountry')}
                      onChange={(value) => setValue('myCountry', value || '')}
                      data={countries}
                      placeholder="Select your country"
                      error={errors.myCountry?.message}
                      radius="md"
                      size="md"
                      styles={{
                        input: {
                          borderColor: 'var(--mantine-color-gray-3)',
                          '&:focus': {
                            borderColor: 'var(--mantine-color-brand-8)',
                          },
                        },
                      }}
                    />
                  </Stack>

                  {/* Zip/Postal Code (Optional) */}
                  <Stack gap="xs">
                    <Text size="sm" fw={500} c="gray.8">
                      Zip/Postal Code (Optional)
                    </Text>
                    <TextInput
                      {...register('zipPostalCode')}
                      placeholder="Enter your zip code"
                      error={errors.zipPostalCode?.message}
                      radius="md"
                      size="md"
                      styles={{
                        input: {
                          borderColor: 'var(--mantine-color-gray-3)',
                          '&:focus': {
                            borderColor: 'var(--mantine-color-brand-8)',
                          },
                        },
                      }}
                    />
                  </Stack>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    size="md"
                    radius="md"
                    bg="brand.8"
                    loading={isSubmitting}
                    style={{
                      marginTop: 'var(--mantine-spacing-lg)',
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>

      {/* Welcome Modal */}
      <WelcomeModal
        opened={showWelcomeModal}
        onClose={handleModalClose}
        onStartVerification={handleWelcomeStart}
        onSkip={handleWelcomeSkip}
      />

      {/* Guild Verification Modal */}
      <GuildVerificationModal
        opened={showVerificationModal}
        onClose={handleModalClose}
        onNext={handleVerificationModalNext}
        verifiableGuilds={verifiableGuilds}
        notVerifiableGuilds={notVerifiableGuilds}
        currentStep={currentStep}
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
              onNext={handleVerificationFormNext}
              onBack={handleVerificationFormBack}
            />
          </div>
        </div>
      )}

      {/* Membership Summary Modal */}
      {showSummaryModal && submittedMembershipData && (
        <MembershipSummaryModal
          opened={showSummaryModal}
          onClose={handleModalClose}
          onGoToDashboard={handleSummaryGoToDashboard}
          onContinue={handleSummaryContinue}
          membershipData={submittedMembershipData}
        />
      )}
    </Container>
  );
}
