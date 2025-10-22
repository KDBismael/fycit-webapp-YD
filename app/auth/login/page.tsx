'use client';

import { signInWithEmailPassword } from '@/firebase/auth';
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
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconLock, IconMail } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AwardsSeasonModal } from '../../../components/auth/AwardsSeasonModal';
import { GuildConfirmationModal } from '../../../components/auth/GuildConfirmationModal';
import { GuildVerificationForm } from '../../../components/auth/GuildVerificationForm';
import { GuildVerificationModal } from '../../../components/auth/GuildVerificationModal';
import { useUserStore } from '../../../stores/userStore';
import { LoginFormData, loginSchema } from '../../../validation/login.validation';
import { ProfileCompletionFormData } from '../../../validation/profile-completion.validation';

const IMAGE_SIZE = 60;
const ICON_SIZE = 18;

export default function Login() {
  const router = useRouter();
  const { setAwards26Viewed, setUserGuilds, setAutoViewNewLocales, fetchUser, user } = useUserStore();

  // Modal states
  const [showAwardsModal, setShowAwardsModal] = useState(false);
  const [showGuildConfirmation, setShowGuildConfirmation] = useState(false);
  const [showGoodNewsModal, setShowGoodNewsModal] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [profileData, setProfileData] = useState<ProfileCompletionFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signInWithEmailPassword(data.email, data.password);
    if (result.error) {
      alert(`Login failed: ${result.error.message}`);
      return;
    }
    await fetchUser();
    console.log('Logged in user:', user);
    user?.isAward26Viewed ? router.push('/dashboard') : setShowAwardsModal(true);
  };

  const handleAwardsNext = (data: ProfileCompletionFormData) => {
    setProfileData(data);
    setUserGuilds(data.selectedGuild);
    setAutoViewNewLocales(data.autoViewNewLocales || false);
    setShowAwardsModal(false);
    setShowGuildConfirmation(true);
  };

  const handleGuildConfirmationContinue = () => {
    setShowGuildConfirmation(false);
    // Check if user has verifiable guilds
    const verifiableGuildIds = ['AMPAS', 'ADG', 'WGA', 'SAG', 'DGA'];
    const hasVerifiableGuilds = profileData?.selectedGuild.some((guildId) =>
      verifiableGuildIds.includes(guildId)
    );

    if (hasVerifiableGuilds) {
      // For Sign In flow: Skip Welcome Modal, show Good News Modal directly
      setShowGoodNewsModal(true);
    } else {
      completeOnboarding();
    }
  };

  const handleGoodNewsModalNext = () => {
    setShowGoodNewsModal(false);
    setShowVerificationForm(true);
  };

  const completeOnboarding = () => {
    setAwards26Viewed(true);
    router.push('/dashboard');
  };

  // Helper functions

  const getVerifiableGuilds = (data: ProfileCompletionFormData | null) => {
    if (!data) return [];

    const guildOptions = [
      { id: 'AMPAS', name: 'AMPAS', fullName: 'AMPAS - Motion Picture Academy', isVerifiable: true, isVerified: false },
      { id: 'ADG', name: 'ADG', fullName: 'ADG - Art Directors Guild', isVerifiable: true, isVerified: false },
      { id: 'WGA', name: 'WGA', fullName: 'WGA - Writers Guild of America', isVerifiable: true, isVerified: false },
      { id: 'SAG', name: 'SAG', fullName: 'SAG - Screen Actors Guild', isVerifiable: true, isVerified: false },
      { id: 'DGA', name: 'DGA', fullName: 'DGA - Directors Guild of America', isVerifiable: true, isVerified: false },
    ];

    return guildOptions.filter(guild => data.selectedGuild.includes(guild.id));
  };

  const getNotVerifiableGuilds = (data: ProfileCompletionFormData | null) => {
    if (!data) return [];

    const guildOptions = [
      { id: 'ASC', name: 'ASC', fullName: 'ASC - American Society of Cinematographers', isVerifiable: false },
      { id: 'ASIFA', name: 'ASIFA', fullName: 'ASIFA - International Animated Film Association', isVerifiable: false },
    ];

    return guildOptions.filter(guild => data.selectedGuild.includes(guild.id));
  };

  const getFirstVerifiableGuild = (data: ProfileCompletionFormData | null) => {
    if (!data) return null;

    const verifiableGuildIds = ['AMPAS', 'ADG', 'WGA', 'SAG', 'DGA'];
    const firstVerifiable = data.selectedGuild.find(guildId => verifiableGuildIds.includes(guildId));

    if (firstVerifiable) {
      return {
        id: firstVerifiable,
        name: firstVerifiable,
        fullName: `${firstVerifiable} - Guild Name`,
        isVerifiable: true,
      };
    }

    return null;
  };

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
                    Welcome Back to FYCit
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Log in to manage your profile, connect with your guilds, and access all your
                    tools.
                  </Text>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap="md">
                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        Email address
                      </Text>
                      <TextInput
                        {...register('email')}
                        placeholder="Enter your email"
                        leftSection={<IconMail size={ICON_SIZE} />}
                        error={errors.email?.message}
                        radius="md"
                        size="md"
                      />
                    </Stack>

                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        Enter password
                      </Text>
                      <PasswordInput
                        {...register('password')}
                        placeholder="Enter your password"
                        leftSection={<IconLock size={ICON_SIZE} />}
                        error={errors.password?.message}
                        radius="md"
                        size="md"
                      />
                    </Stack>

                    <Group justify="flex-end">
                      <Anchor size="sm" c="brand.8" href="/auth/forgot-password">
                        Forgot Password
                      </Anchor>
                    </Group>

                    <Button
                      type="submit"
                      fullWidth
                      size="md"
                      radius="md"
                      bg="brand.8"
                      loading={isSubmitting}
                    >
                      Login
                    </Button>

                    <Text size="sm" ta="center" c="gray.6">
                      Don't have an account?{' '}
                      <Anchor href="/auth/signup" c="brand.8" fw={500}>
                        Register
                      </Anchor>
                    </Text>
                  </Stack>
                </form>
              </Stack>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>

      {/* Awards Season Modal */}
      <AwardsSeasonModal
        opened={showAwardsModal}
        onClose={() => setShowAwardsModal(false)}
        onNext={handleAwardsNext}
      />

      {/* Guild Confirmation Modal */}
      <GuildConfirmationModal
        opened={showGuildConfirmation}
        onClose={() => setShowGuildConfirmation(false)}
        onContinue={handleGuildConfirmationContinue}
      />

      {/* Good News Modal (Guild Verification Modal) - Skip Welcome Modal for Sign In */}
      <GuildVerificationModal
        opened={showGoodNewsModal}
        onClose={() => setShowGoodNewsModal(false)}
        onNext={handleGoodNewsModalNext}
        verifiableGuilds={getVerifiableGuilds(profileData)}
        notVerifiableGuilds={getNotVerifiableGuilds(profileData)}
        currentStep={1}
      />

      {/* Guild Verification Form */}
      {showVerificationForm && getFirstVerifiableGuild(profileData) && (
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
              selectedGuild={getFirstVerifiableGuild(profileData)!}
              onNext={completeOnboarding}
              onBack={() => setShowVerificationForm(false)}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
