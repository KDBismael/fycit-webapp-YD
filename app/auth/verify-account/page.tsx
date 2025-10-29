'use client';

import { AwardsSeasonModal } from '@/components/auth/AwardsSeasonModal';
import { GuildConfirmationModal } from '@/components/auth/GuildConfirmationModal';
import { GuildVerificationForm } from '@/components/auth/GuildVerificationForm';
import { GuildVerificationModal } from '@/components/auth/GuildVerificationModal';
import { MembershipSummaryModal } from '@/components/auth/MembershipSummaryModal';
import NotVerifiableModal from '@/components/auth/NotVerifiableModal';
import { WelcomeModal } from '@/components/auth/WelcomeModal';
import { verifyOtpEmail } from '@/firebase/functions';
import { updateUserInfo } from '@/firebase/user';
import { sendGuildVerificationRequestNew } from '@/firebase/verifications';
import { useGuildsStore } from '@/stores/guildsStore';
import { useUserStore } from '@/stores/userStore';
import { useVerificationStore } from '@/stores/verificationStore';
import { GuildsType, GuildVerificationsType, UsersType, VerificationStatus } from '@/types/collections';
import { ProfileCompletionFormData } from '@/validation/profile-completion.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  PinInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../stores/authStore';
import {
  VerifyAccountFormData,
  verifyAccountSchema,
} from '../../../validation/verify-account.validation';

const IMAGE_SIZE = 60;

export default function VerifyAccount() {
  const [otpValue, setOtpValue] = useState('');
  const router = useRouter();
  const { authContext, verificationEmail, resetAuthStore, userVerificationGuilds, fetchUserVerificationGuilds } = useAuthStore();
  const { guilds } = useGuildsStore();
  const { setAwards26Viewed, userGuilds, setUserGuilds, setAutoViewNewLocales, user, setUser } = useUserStore();
  const { updateVerificationData, verificationData } = useVerificationStore();
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
  const [submittedMembershipData, setSubmittedMembershipData] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState<GuildsType | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<VerifyAccountFormData>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      code: '',
    },
  });

  // Route protection: redirect if no auth context
  useEffect(() => {
    if (!authContext || !verificationEmail) {
      router.push('/auth/login');
    }
  }, [authContext, verificationEmail, router]);

  const onSubmit = async (data: VerifyAccountFormData) => {
    const res = await verifyOtpEmail(verificationEmail!, data.code);
    if (res.success) {
      await updateUserInfo({ verified: true });
      onNext();
    }
    else setError('code', { message: 'Invalid code. Please try again.' });
  };

  const onNext = () => {
    if (authContext === 'login') {
      openModal("welcome")
    }
    else if (authContext === 'signup') {
      router.push('/auth/signup/profile-completion');
    } else if (authContext === 'password-reset') {
      router.push('/auth/create-password');
    }
  }

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue('code', value);
  };

  const handleAwardsNext = async (data: ProfileCompletionFormData) => {
    try {
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
      // setProfileData(data);
      setUserGuilds(data.selectedGuild);
      setAutoViewNewLocales(data.autoViewNewLocales || false);
      openModal("guildConfirmation")
    } catch (error) {
      console.log(error)
    }
  };

  const handleGuildConfirmationContinue = async () => {
    try {
      const userData: Partial<UsersType> = {
        guild: userGuilds,
      }
      await updateUserInfo(userData);
      setUser({ ...user, ...userData } as UsersType);
      verificationInitialization({ allGuilds: guilds, userGuilds, guildVerifications: userVerificationGuilds })
      // openModal("guildVerification")
    } catch (error) {
      console.log(error);
    }
  };

  const handleWelcomeStart = () => {
    openModal("awards")
  }

  const getVerifiableGuilds = () => {
    if (!userGuilds) return [];
    return guilds.filter((g) => userGuilds.includes(g.longName) && g.isVerifiable);
  };

  const getNotVerifiableGuilds = () => {
    if (!userGuilds) return [];
    return guilds.filter((g) => userGuilds.includes(g.longName) && !g.isVerifiable);
  };

  const handleGuildVerificationModalNext = () => {
    openModal("verificationForm")
  };

  const completeOnboarding = () => {
    setAwards26Viewed(true);
    router.push('/dashboard');
  };

  const reSendCode = async () => {
    // await sendOtpEmail(verificationEmail!);
    setError("code", { message: undefined })
  }

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
      updateVerificationData(null)
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
    openModal("guildVerification")
  };

  function handleSelectedGuild(data: string) {
    setSelectedGuild(guilds.find((g) => g.longName == data) ?? null);
  }

  // Summary Modal Handlers
  const handleSummaryGoToDashboard = () => {
    resetAuthStore();
    router.push('/dashboard');
    closeModal();
  };

  const handleSummaryContinue = () => {
    // setShowSummaryModal(false);

    // const remainingUnverifiedGuilds = verifiableGuilds.filter((g) => !g.isVerified);

    // if (remainingUnverifiedGuilds.length > 0) {
    //   setShowVerificationModal(true);
    // } else {
    //   handleCompleteVerification();
    // }
  };

  useEffect(() => {
    setSelectedGuild(getVerifiableGuilds()[0])
  }, [userGuilds.length])

  return (
    <Container fluid p={0} style={{ height: '100vh' }}>
      <Grid gutter={0} style={{ height: '100vh' }}>
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

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Center style={{ height: '100vh', padding: '2rem' }}>
            <Stack gap="xl" style={{ maxWidth: '400px', width: '100%' }}>
              <Stack gap="md" align="center">
                <Group gap="sm">
                  <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
                </Group>
              </Stack>

              <Stack gap="lg">
                <Stack gap="xs" align="center">
                  <Title order={1} size="h2" ta="center" c="gray.9">
                    {authContext === 'signup' ? 'Verifying Your Account' : 'Verify Your Email'}
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Enter the 6 digit code that we have sent to{' '}
                    <Text component="span" fw={600}>
                      {verificationEmail}
                    </Text>
                  </Text>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap="md">
                    <Stack gap="xs" align="center">
                      <PinInput
                        inputMode='numeric'
                        length={6}
                        value={otpValue}
                        onChange={handleOtpChange}
                        onComplete={(v) => { console.log('Completed with value:', v); handleSubmit(onSubmit)(); }}
                        size="lg"
                        radius="md"
                        type="number"
                        gap="md"
                        placeholder=""
                        error={!!errors.code}
                      />
                      {errors.code && (
                        <Text size="sm" c="red.6" ta="center">
                          {errors.code.message}
                        </Text>
                      )}
                    </Stack>

                    {errors.code && (
                      <Group justify="center">
                        <Anchor size="sm" c="gray.6" td="underline" onClick={reSendCode}>
                          Resend code
                        </Anchor>
                      </Group>
                    )}

                    {/* <Button hidden={true} type="submit" fullWidth disabled={isSubmitting}>
                      {isSubmitting ? 'Verifying...' : 'Verify Account'}
                    </Button> */}
                  </Stack>
                </form>
                <Button
                  fullWidth
                  size="md"
                  radius="md"
                  bg="brand.8"
                  loading={isSubmitting}
                  disabled={otpValue.length < 6 || isSubmitting || errors.code == undefined}
                  onClick={onNext}
                  style={{
                    backgroundColor: '#A98A13',
                    '&:hover': {
                      backgroundColor: '#B89A1A',
                    },
                  }}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>

      {/* Welcome Modal */}
      <WelcomeModal
        onStartVerification={handleWelcomeStart}
        onSkip={() => { }}
        opened={activeModal === 'welcome'}
        onClose={closeModal}
      />

      {/* Awards Season Modal */}
      <AwardsSeasonModal
        onClose={() => { }}
        onNext={handleAwardsNext}
        opened={activeModal === 'awards'}
      />

      {/* Guild Confirmation Modal */}
      <GuildConfirmationModal
        onContinue={handleGuildConfirmationContinue}
        opened={activeModal === 'guildConfirmation'}
        onClose={closeModal}
      />

      {/* Guild Verification Modal */}
      <GuildVerificationModal
        onNext={handleGuildVerificationModalNext}
        opened={activeModal === 'guildVerification'}
        onClose={closeModal}
        verifiableGuilds={getVerifiableGuilds()}
        notVerifiableGuilds={getNotVerifiableGuilds()}
        currentStep={1}
        selectedGuildForVerification={selectedGuild?.longName ?? ''}
        setSelectedGuildForVerification={function (value: string): void {
          handleSelectedGuild(value);
        }} />

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
          onClose={closeModal}
          onGoToDashboard={handleSummaryGoToDashboard}
          onContinue={handleSummaryContinue}
          selectedGuild={selectedGuild}
        />
      )}

      {/* Not verifiable guild modal */}
      <NotVerifiableModal
        onNext={() => { }}
        onClose={() => { }}
        opened={activeModal == 'notVerifiable'}
      />

    </Container>
  );

  function verificationInitialization(
    {
      allGuilds,
      userGuilds,
      guildVerifications,
    }: {
      allGuilds: GuildsType[];
      userGuilds: string[];
      guildVerifications: GuildVerificationsType[];
      // is2FAComplete: boolean;
    }
  ) {
    // Shortcut: "Other Org that allows access to FYC Screenings" → Non-verifiable
    if (userGuilds.includes("Other Org that allows access to FYC Screenings")) {
      openModal("notVerifiable")
      // navigate("/award26/step6"); // NonVerifiable
      return;
    }

    // Consider only records with these tags
    const relevant = new Set<VerificationStatus>([
      "approved",
      "pending",
      "rejected",
      "expired",
    ]);

    // Map guild name → latest tag found (last one wins; adjust if you want otherwise)
    const guildVerificationMap = new Map<string, VerificationStatus>();
    for (const v of guildVerifications) {
      if (!relevant.has(v.tag)) continue;
      for (const name of v.guilds) {
        guildVerificationMap.set(name, v.tag);
      }
    }

    const verifiableAndVerified: GuildsType[] = [];
    const verifiableAndAvailable: GuildsType[] = [];
    const nonVerifiable: GuildsType[] = [];

    for (const guild of allGuilds) {
      if (!userGuilds.includes(guild.longName)) continue;

      if (guild.isVerifiable) {
        const status = guildVerificationMap.get(guild.longName);
        if (status === "approved" || status === "pending") {
          verifiableAndVerified.push(guild);
        } else {
          verifiableAndAvailable.push(guild);
        }
      } else {
        nonVerifiable.push(guild);
      }
    }

    const anyVerified = verifiableAndVerified.length > 0;
    const anyAvailable = verifiableAndAvailable.length > 0;

    if (!anyVerified && anyAvailable) {
      // navigate("/award26/step7"); // Verifiable flow
      openModal('guildVerification')

    } else if (anyVerified && anyAvailable) {
      // navigate("/award26/step7");
      openModal('guildVerification')
    } else if (anyVerified && !anyAvailable) {
      // hasNoMoreGuildsToVerify=true
      // navigate("/award26/step7?noMore=1");
      // not verifiable screen with all ready verified
    } else if (!anyVerified && !anyAvailable) {
      // navigate("/award26/step6"); // NonVerifiable
      openModal("notVerifiable")
    }
  }
}
