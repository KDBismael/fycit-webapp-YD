'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLock, IconMail, IconUser } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import {
  Anchor,
  Box,
  Button,
  Center,
  Checkbox,
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
import { SignupFormData, signupSchema } from '../../../validation/signup.validation';

const IMAGE_SIZE = 60;
const ICON_SIZE = 18;

export default function Signup() {
  const [opened, setOpened] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: 'Sean',
      lastName: 'Napier',
      email: 'Sean123@domain.com',
    },
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

  const onSubmit = async (data: SignupFormData) => {
    try {
      console.log('Signup data:', data);
    } catch (error) {
      console.error('Signup error:', error);
    }
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
          <Box style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <Stack gap="md" style={{ maxWidth: '400px', width: '100%' }}>
              <Stack gap="sm" align="center">
                <Group gap="sm">
                  <Image src="/logo.svg" alt="FYCit Logo" width={40} height={40} />
                </Group>
              </Stack>

              <Stack gap="sm">
                <Stack gap="xs" align="center">
                  <Title order={2} size="h3" ta="center" c="gray.9">
                    Create Your FYCit Account
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Sign up to manage your profile, join guilds, and access all platform features.
                  </Text>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap="sm">
                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        First name
                      </Text>
                      <TextInput
                        {...register('firstName')}
                        placeholder="Enter your first name"
                        leftSection={<IconUser size={ICON_SIZE} />}
                        error={errors.firstName?.message}
                        radius="md"
                        size="sm"
                      />
                    </Stack>
                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        Last name
                      </Text>
                      <TextInput
                        {...register('lastName')}
                        placeholder="Enter your last name"
                        leftSection={<IconUser size={ICON_SIZE} />}
                        error={errors.lastName?.message}
                        radius="md"
                        size="sm"
                      />
                    </Stack>

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
                        size="sm"
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
                        size="sm"
                      />
                    </Stack>

                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        Confirm password
                      </Text>
                      <PasswordInput
                        {...register('confirmPassword')}
                        placeholder="Enter your password"
                        leftSection={<IconLock size={ICON_SIZE} />}
                        error={errors.confirmPassword?.message}
                        radius="md"
                        size="sm"
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
                      size="sm"
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
                      Create account
                    </Button>

                    <Text size="sm" ta="center" c="gray.6">
                      Already have an account?{' '}
                      <Anchor c="brand.8" fw={500} href="/auth/login">
                        Login
                      </Anchor>
                    </Text>

                    <Text size="xs" ta="center" c="gray.5">
                      By clicking create account you are agreeing to the terms and conditions &
                      privacy policy
                    </Text>
                  </Stack>
                </form>
              </Stack>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
