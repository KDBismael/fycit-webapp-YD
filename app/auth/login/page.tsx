'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {  IconLock, IconMail } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
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
import { LoginFormData, loginSchema } from '../../../validation/login.validation';
import { useUserStore } from '../../../stores/userStore';
import { AwardsSeasonModal } from '../../../components/auth/AwardsSeasonModal';
import { GuildConfirmationModal } from '../../../components/auth/GuildConfirmationModal';
import { GuildVerificationForm } from '../../../components/auth/GuildVerificationForm';
import { ProfileCompletionFormData } from '../../../validation/profile-completion.validation';

const IMAGE_SIZE = 60;
const ICON_SIZE = 18;

export default function Login() {
  const router = useRouter();
  const { setAwards26Viewed, setUserGuilds, setAutoViewNewLocales } = useUserStore();
  
  // Modal states
  const [showAwardsModal, setShowAwardsModal] = useState(false);
  const [showGuildConfirmation, setShowGuildConfirmation] = useState(false);
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
    try {
      // Simulate login API call
      console.log('Login data:', data);
      
      // FOR TESTING: Randomly assign IsAwards26Viewed (50% chance)
      const randomIsAwards26Viewed = Math.random() > 0.5;
      
      // Check if user has viewed Awards 2026
      if (randomIsAwards26Viewed) {
        // User has already seen Awards 2026 flow
        setAwards26Viewed(true);
        router.push('/dashboard');
      } else {
        // User needs to go through Awards 2026 flow
        setShowAwardsModal(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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
      setShowVerificationForm(true);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    setAwards26Viewed(true);
    router.push('/dashboard');
  };

  // Helper functions
  const getSelectedGuilds = (data: ProfileCompletionFormData | null) => {
    if (!data) return [];
    
    const guildOptions = [
      { id: 'AMPAS', name: 'AMPAS', fullName: 'AMPAS - Motion Picture Academy', isVerifiable: true },
      { id: 'ADG', name: 'ADG', fullName: 'ADG - Art Directors Guild', isVerifiable: true },
      { id: 'ASC', name: 'ASC', fullName: 'ASC - American Society of Cinematographers', isVerifiable: false },
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
        onEditGuilds={() => {
          setShowGuildConfirmation(false);
          setShowAwardsModal(true);
        }}
        selectedGuilds={getSelectedGuilds(profileData)}
      />
      
      {/* Guild Verification Form (skip Good News modal) */}
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
