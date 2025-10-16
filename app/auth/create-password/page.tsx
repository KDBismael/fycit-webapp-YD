'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLock } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import successAnimation from '../../../public/lotties/success.json';
import {
  CreatePasswordFormData,
  createPasswordSchema,
} from '../../../validation/create-password.validation';
import { useAuthStore } from '../../../stores/authStore';

const IMAGE_SIZE = 60;
const ICON_SIZE = 18;

export default function CreatePassword() {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { authContext, resetAuthStore } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePasswordFormData>({
    resolver: zodResolver(createPasswordSchema),
  });

  const password = watch('password', '');

  const passwordRequirements = [
    {
      label: 'At least 8 characters long.',
      met: password.length >= 8,
    },
    {
      label: '0-9 and special character.',
      met: /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password),
    },
  ];

  // Route protection: redirect if not password-reset context
  useEffect(() => {
    if (authContext !== 'password-reset') {
      router.push('/auth/login');
    }
  }, [authContext, router]);

  const onSubmit = async (data: CreatePasswordFormData) => {
    try {
      // eslint-disable-next-line no-console
      console.log('Create password data:', data);
      setOpened(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Create password error:', error);
    }
  };

  const handleModalContinue = () => {
    setOpened(false);
    // Reset auth store and navigate to login
    resetAuthStore();
    router.push('/auth/login');
  };

  return (
    <>
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
                  Sed ut cursus magna eu varius nunc adipiscing. Elementum justo, laoreet id pars
                  semper perferendis.
                </Text>
              </Paper>
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Center style={{ height: '100vh', padding: '2rem' }}>
              <Stack gap="xl" style={{ maxWidth: '400px', width: '100%' }}>
                <Stack gap="md" align="center">
                  <Group gap="sm">
                    <Image
                      src="/logo.svg"
                      alt="FYCit Logo"
                      width={IMAGE_SIZE}
                      height={IMAGE_SIZE}
                    />
                  </Group>
                </Stack>

                <Stack gap="lg">
                  <Stack gap="xs" align="center">
                    <Title order={1} size="h2" ta="center" c="gray.9">
                      Create New Password
                    </Title>
                    <Text size="sm" c="gray.6" ta="center">
                      Enter your new password
                    </Text>
                  </Stack>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap="md">
                      <Stack gap="xs">
                        <Text size="sm" fw={500} c="gray.8">
                          New password
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

                      <Stack gap="xs">
                        <Text size="sm" fw={500} c="gray.8">
                          Confirm new password
                        </Text>
                        <PasswordInput
                          {...register('confirmPassword')}
                          placeholder="Enter your password"
                          leftSection={<IconLock size={ICON_SIZE} />}
                          error={errors.confirmPassword?.message}
                          radius="md"
                          size="md"
                        />
                      </Stack>

                      <Stack gap="xs">
                        <Text size="sm" fw={500} c="gray.8">
                          Password Requirements
                        </Text>
                        <Stack gap="xs">
                          {passwordRequirements.map((requirement, index) => (
                            <Checkbox
                              key={index}
                              checked={requirement.met}
                              readOnly
                              label={
                                <Text size="sm" c={requirement.met ? 'green.6' : 'gray.6'}>
                                  {requirement.label}
                                </Text>
                              }
                              styles={{
                                input: {
                                  borderColor: requirement.met
                                    ? 'var(--mantine-color-green-6)'
                                    : 'var(--mantine-color-gray-4)',
                                  backgroundColor: requirement.met
                                    ? 'var(--mantine-color-green-6)'
                                    : 'transparent',
                                },
                                icon: {
                                  color: 'white',
                                },
                              }}
                            />
                          ))}
                        </Stack>
                      </Stack>

                      <Button
                        type="submit"
                        fullWidth
                        size="md"
                        radius="md"
                        bg="brand.8"
                        loading={isSubmitting}
                        style={{
                          backgroundColor: '#BAAD3E',
                          '&:hover': {
                            backgroundColor: '#A98A13',
                          },
                        }}
                      >
                        Update
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </Stack>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        withCloseButton={false}
        size="lg"
        radius="md"
      >
        <Stack gap="lg" align="center" p="xl">
          <Box style={{ width: 120, height: 120 }}>
            <Lottie
              animationData={successAnimation}
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </Box>

          <Stack gap="xs" align="center">
            <Title order={3} ta="center" c="gray.9">
              Your password has been updated
            </Title>
            <Text size="sm" c="gray.6" ta="center">
              You can now log in using your new password. Stay secure!
            </Text>
          </Stack>

          <Button
            fullWidth
            size="md"
            radius="md"
            style={{
              backgroundColor: '#A98A13',
              '&:hover': {
                backgroundColor: '#B89A1A',
              },
            }}
            onClick={handleModalContinue}
          >
            Continue
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
