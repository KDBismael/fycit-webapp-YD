'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconMail } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from '../../../validation/forgot-password.validation';

const IMAGE_SIZE = 60;
const ICON_SIZE = 18;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log('Forgot password data:', data);
      router.push('/auth/verify-account');
    } catch (error) {
      console.error('Forgot password error:', error);
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
                    Forgot Your Password?
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Enter your email address and we'll send you a code to reset your password.
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
