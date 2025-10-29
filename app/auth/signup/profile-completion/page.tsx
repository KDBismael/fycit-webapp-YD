'use client';

import { EventLocalesSelector } from '@/components/auth/EventLocalesSelector';
import NotVerifiableModal from '@/components/auth/NotVerifiableModal';
import { updateUserInfo } from '@/firebase/user';
import { sendGuildVerificationRequestNew } from '@/firebase/verifications';
import { useGuildsStore } from '@/stores/guildsStore';
import { useLocalesStore } from '@/stores/localesStore';
import { useUserStore } from '@/stores/userStore';
import { useVerificationStore } from '@/stores/verificationStore';
import { GuildsType, UsersType } from '@/types/collections';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GuildSelector } from '../../../../components/auth/GuildSelector';
import { GuildVerificationForm } from '../../../../components/auth/GuildVerificationForm';
import { GuildVerificationModal } from '../../../../components/auth/GuildVerificationModal';
import { MembershipSummaryModal } from '../../../../components/auth/MembershipSummaryModal';
import { useAuthStore } from '../../../../stores/authStore';
import {
  ProfileCompletionFormData,
  profileCompletionSchema,
} from '../../../../validation/profile-completion.validation';

const IMAGE_SIZE = 60;

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
  const { guilds } = useGuildsStore();
  const { locales } = useLocalesStore();
  const { fetchUserVerificationGuilds } = useAuthStore();
  const { userGuilds, setUserGuilds, setAutoViewNewLocales, user, setUser } = useUserStore();
  const { updateVerificationData, verificationData, } = useVerificationStore();
  const { resetAuthStore } = useAuthStore();

  const [activeModal, setActiveModal] = useState<
    | 'welcome'
    | 'awards'
    | 'guildConfirmation'
    | 'guildVerification'
    | 'verificationForm'
    | 'verificationSummary'
    | 'notVerifiable'
    | null
  >(null);
  const openModal = (key: typeof activeModal) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  // Workflow state
  const [currentStep, setCurrentStep] = useState(1);
  const [_profileData, setProfileData] = useState<ProfileCompletionFormData | null>(null);
  const [selectedGuild, setSelectedGuild] = useState<GuildsType | null>(null);
  const [submittedMembershipData, setSubmittedMembershipData] = useState(false);


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
      viewEventsInLocals: [],
      country: 'usa',
      zipPostalCode: '',
    },
  });

  const selectedGuildsForm = watch('selectedGuild');

  const onSubmit = async (data: ProfileCompletionFormData) => {
    try {
      console.log('Profile completion data:', data);
      const userData: Partial<UsersType> = {
        country: data.country,
        guild: data.selectedGuild,
        locale: data.viewEventsInLocals,
        zipCode: data.zipPostalCode,
        userSettings: {
          ...user!.userSettings,
          automaticallyViewNewLocales: data.autoViewNewLocales ?? false,
        }
      }
      await updateUserInfo(userData);
      setUser({ ...user, ...userData } as UsersType);
      setUserGuilds(data.selectedGuild);
      setAutoViewNewLocales(data.autoViewNewLocales || false);
      const isVerifiable = guilds.filter((g) => data.selectedGuild.includes(g.longName)).some((g) => g.isVerifiable)

      if (isVerifiable) {
        setSelectedGuild(getVerifiableGuilds()[0]);
        openModal('guildVerification');
      } else {
        openModal('notVerifiable');
      }
    } catch (error) {
      console.error('Profile completion error:', error);
    }
  };

  // Guild Verification Modal Handlers
  const handleVerificationModalNext = () => {
    openModal("verificationForm");
  };

  const handleVerificationFormNext = async (data: any) => {
    console.log('Verification data submitted:', data);
    await sendGuildVerificationRequestNew([selectedGuild?.longName ?? ''], verificationData, user!);
    await fetchUserVerificationGuilds();
    setSubmittedMembershipData(true);
    // eslint-disable-next-line no-console
    const verifiableGuilds = getVerifiableGuilds();
    const pendingOrApproved = useAuthStore.getState().userVerificationGuilds.filter((v) => v.tag == 'pending' || v.tag == 'approved').map((v) => v.guilds[0]);
    const verifiable = verifiableGuilds.map((v) => v.longName).filter((v) => !pendingOrApproved.includes(v));

    if (verifiable.length > 0) {
      updateVerificationData(null);
      setSelectedGuild(verifiableGuilds.find((v) => v.longName == verifiable[0]) ?? null)
      //set the right guild
      setSubmittedMembershipData(false);
      console.log("guildVerification")
      openModal('guildVerification');
    } else {
      console.log("verificationSummary")
      openModal('verificationSummary');
    }
  };

  const handleVerificationFormBack = () => {

  };

  // Summary Modal Handlers
  const handleSummaryGoToDashboard = () => {
    resetAuthStore();
    router.push('/dashboard');
    closeModal();
  };

  const handleCompleteVerification = () => {
    // eslint-disable-next-line no-console
    console.log('All verification completed!');
    resetAuthStore();
    router.push('/dashboard');
  };

  const handleModalClose = () => {
    closeModal();
    resetAuthStore();
    router.push('/dashboard');
  };

  function handleSelectedGuild(data: string) {
    setSelectedGuild(guilds.find((g) => g.longName == data) ?? null);
  }

  const getVerifiableGuilds = () => {
    if (!userGuilds) return [];
    return guilds.filter((g) => userGuilds.includes(g.longName) && g.isVerifiable);
  };

  const getNotVerifiableGuilds = () => {
    if (!userGuilds) return [];
    return guilds.filter((g) => userGuilds.includes(g.longName) && !g.isVerifiable);
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
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '2rem',
              overflowY: 'auto',
            }}
          >
            <Stack gap="xl" style={{ maxWidth: '500px', width: '100%' }}>
              {/* Header */}
              <Stack gap="md" align="center">
                <Group gap="sm">
                  <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
                </Group>
                <Stack gap="xs" align="center">
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
                      data={guilds}
                      value={selectedGuildsForm}
                      onChange={(value) => setValue('selectedGuild', value)}
                      error={errors.selectedGuild?.message}
                    />
                  </Stack>

                  {/* Warning Alert */}
                  <Alert
                    title="Careful:"
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

                  View events in these locals
                  <Stack gap="xs">
                    <Text size="sm" fw={500} c="gray.8">
                      View events in these locals
                    </Text>
                    <EventLocalesSelector
                      data={locales}
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
                      value={watch('country')}
                      onChange={(value) => setValue('country', value || '')}
                      data={countries}
                      placeholder="Select your country"
                      error={errors.country?.message}
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

      {/* Guild Verification Modal */}
      <GuildVerificationModal
        opened={activeModal === 'guildVerification'}
        onClose={closeModal}
        onNext={handleVerificationModalNext}
        verifiableGuilds={getVerifiableGuilds()}
        notVerifiableGuilds={getNotVerifiableGuilds()}
        currentStep={currentStep}
        selectedGuildForVerification={selectedGuild?.longName ?? ''}
        setSelectedGuildForVerification={handleSelectedGuild}
      />

      {/* Guild Verification Form */}
      {activeModal === 'verificationForm' && selectedGuild && (
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
      {activeModal === 'verificationSummary' && submittedMembershipData && (
        <MembershipSummaryModal
          opened={activeModal === 'verificationSummary'}
          onClose={handleModalClose}
          onGoToDashboard={handleSummaryGoToDashboard}
          onContinue={() => { }}
          selectedGuild={selectedGuild}
        />
      )}

      {/* Not verifiable guild modal */}
      <NotVerifiableModal
        onNext={() => {
          resetAuthStore();
          router.push('/dashboard');
        }}
        onClose={() => { }}
        opened={activeModal == 'notVerifiable'}
      />
    </Container>
  );
}
