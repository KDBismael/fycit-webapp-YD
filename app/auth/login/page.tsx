'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconEye, IconEyeOff, IconLock, IconMail } from '@tabler/icons-react';
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

const IMAGE_SIZE = 60;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login data:', data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container fluid p={0} style={{ height: '100vh' }}>
      <Grid gutter={0} style={{ height: '100vh' }}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Box
            style={{
              height: '100vh',
              background: 'linear-gradient(135deg, #BAAD3E 0%, #768820 100%)',
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
                backgroundColor: '#464716',
                color: 'white',
                maxWidth: '400px',
              }}
            >
              <Title order={2} fw={700} mb="md">
                Lorem ipsum dolor sit amet, consectetur.
              </Title>
              <Text size="sm" c="gray.3">
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
                        leftSection={<IconMail size={16} />}
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
                        leftSection={<IconLock size={16} />}
                        rightSection={
                          <Button
                            variant="transparent"
                            size="xs"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ border: 'none', background: 'transparent' }}
                          >
                            {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                          </Button>
                        }
                        error={errors.password?.message}
                        radius="md"
                        size="md"
                      />
                    </Stack>

                    <Group justify="flex-end">
                      <Anchor size="sm" c="brand.8">
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
                      style={{
                        backgroundColor: '#464716',
                        '&:hover': {
                          backgroundColor: '#5A5A2A',
                        },
                      }}
                    >
                      Login
                    </Button>

                    <Text size="sm" ta="center" c="gray.6">
                      Don't have an account?{' '}
                      <Anchor c="brand.8" fw={500}>
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
    </Container>
  );
}
