'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconInfoCircle, IconPhone } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Anchor,
  Box,
  Button,
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
import { TwoFactorAuthFormData, twoFactorAuthSchema } from '../../../validation/2fa.validation';
import { CountryPicker } from '../../../components/CountryPicker/CountryPicker';

const IMAGE_SIZE = 40;
const ICON_SIZE = 18;


export default function TwoFactorAuth() {
  const [countryCode, setCountryCode] = useState('+1');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TwoFactorAuthFormData>({
    resolver: zodResolver(twoFactorAuthSchema),
  });

  const onSubmit = async (data: TwoFactorAuthFormData) => {
    try {
      console.log('2FA data:', data);
    } catch (error) {
      console.error('2FA error:', error);
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
          <Box
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <Stack gap="md" style={{ maxWidth: '400px', width: '100%' }}>
              <Stack gap="sm" align="center">
                <Group gap="sm">
                  <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
                </Group>
              </Stack>

              <Stack gap="sm">
                <Stack gap="xs" align="center">
                  <Title order={2} size="h3" ta="center" c="gray.9">
                    Two Factor Authentication
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Please provide your phone number for 2FA authentication. It will help you to get
                    guild verification benefits.
                  </Text>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap="sm">
                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        Phone no
                      </Text>
                      <Box
                        style={{
                          display: 'flex',
                          border: '1px solid var(--mantine-color-gray-4)',
                          borderRadius: 'var(--mantine-radius-md)',
                          overflow: 'hidden',
                        }}
                      >
                        <CountryPicker
                          value={countryCode}
                          onChange={setCountryCode}
                        />
                        <Box style={{ width: '1px', backgroundColor: '#E0E0E0' }} />
                        <TextInput
                          {...register('phoneNumber')}
                          placeholder="Phone no"
                        //   leftSection={<IconPhone size={ICON_SIZE} />}
                          error={errors.phoneNumber?.message}
                          radius="md"
                          size="sm"
                          styles={{
                            input: {
                              border: 'none',
                              borderRadius: 0,
                            },
                          }}
                        />
                      </Box>
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
                      Next
                    </Button>

                    <Text size="sm" ta="center" c="gray.6">
                      <Anchor c="brand.8" fw={500} td="underline">
                        Continue without 2FA
                      </Anchor>
                    </Text>

                    <Alert
                      icon={<IconInfoCircle size={16} />}
                      title="Disclaimer :"
                      color="yellow"
                      variant="light"
                      radius="md"
                      p="sm"
                    >
                      <Text size="xs" c="gray.7">
                        2FA is required to unlock guild verification benefits. You can add this
                        later in Settings.
                      </Text>
                    </Alert>
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
