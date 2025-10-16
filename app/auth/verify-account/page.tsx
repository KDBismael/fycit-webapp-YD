'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
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
  PinInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  VerifyAccountFormData,
  verifyAccountSchema,
} from '../../../validation/verify-account.validation';
import { useAuthStore } from '../../../stores/authStore';

const IMAGE_SIZE = 60;

export default function VerifyAccount() {
  const [otpValue, setOtpValue] = useState('');
  const router = useRouter();
  const { authContext, verificationEmail, setEmailVerified, setOtpCode } = useAuthStore();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
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
    try {
      // eslint-disable-next-line no-console
      console.log('Verify account data:', data);
      
      // Store OTP and mark email as verified
      setOtpCode(data.code);
      setEmailVerified(true);

      // Route based on context
      if (authContext === 'signup') {
        router.push('/auth/signup/profile-completion');
      } else if (authContext === 'password-reset') {
        router.push('/auth/create-password');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Verify account error:', error);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue('code', value);
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
                    {authContext === 'signup' ? 'Verifying Your Account' : 'Verify Your Email'}
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Enter the 4 digit code that we have sent to{' '}
                    <Text component="span" fw={600}>
                      {verificationEmail}
                    </Text>
                  </Text>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap="md">
                    <Stack gap="xs" align="center">
                      <PinInput
                        length={4}
                        value={otpValue}
                        onChange={handleOtpChange}
                        size="lg"
                        radius="md"
                        type="number"
                        gap="md"
                        placeholder="
                        "
                        error={!!errors.code}
                      />
                      {errors.code && (
                        <Text size="sm" c="red.6" ta="center">
                          {errors.code.message}
                        </Text>
                      )}
                    </Stack>

                    <Group justify="center">
                      <Anchor size="sm" c="gray.6" td="underline">
                        Resend code
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
                        backgroundColor: '#A98A13',
                        '&:hover': {
                          backgroundColor: '#B89A1A',
                        },
                      }}
                    >
                      Next
                    </Button>
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
