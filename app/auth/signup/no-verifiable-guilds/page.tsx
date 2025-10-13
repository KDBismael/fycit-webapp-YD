'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IconExclamationMark } from '@tabler/icons-react';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';

export default function NoVerifiableGuildsPage() {
  const router = useRouter();

  const handleDone = () => {
    // Redirect to dashboard since no guilds are verifiable
    router.push('/dashboard');
  };

  const handleBack = () => {
    // Go back to profile completion to select different guilds
    router.push('/auth/signup/profile-completion');
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

        {/* Right Panel - No Verifiable Guilds Content */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Box
            style={{
              height: '100vh',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <Stack gap="xl" style={{ maxWidth: '500px', width: '100%' }}>
              {/* Header */}
              <Stack gap="md" align="center">
                <Group gap="sm">
                  <Image src="/logo.svg" alt="FYCit Logo" width={60} height={60} />
                </Group>
                <Stack gap="xs" align="center">
                  <Title order={1} size="h2" ta="center" c="gray.9" fw={700}>
                    Good News!
                  </Title>
                  <Text size="md" c="gray.7" ta="center">
                    We're working on adding more verification options.
                  </Text>
                </Stack>
              </Stack>

              {/* Progress Indicator */}
              <Group gap="xs" justify="center" mt="md">
                {[1, 2, 3].map((step, index) => (
                  <React.Fragment key={step}>
                    <Box
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor:
                          step === 1
                            ? 'var(--mantine-color-brand-8)'
                            : 'var(--mantine-color-gray-3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text size="sm" c={step === 1 ? 'white' : 'gray.7'} fw={700}>
                        {step}
                      </Text>
                    </Box>
                    {index < 2 && (
                      <Box
                        style={{
                          width: 40,
                          height: 2,
                          backgroundColor: 'var(--mantine-color-gray-3)',
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Group>

              {/* Selected Guilds List */}
              <Stack gap="md">
                <Text size="lg" fw={600} c="gray.8" ta="center">
                  Your selected guilds
                </Text>

                {/* Example of selected but not verifiable guilds */}
                <Stack gap="xs">
                  <Group
                    justify="space-between"
                    p="md"
                    style={{
                      border: '1px solid var(--mantine-color-gray-3)',
                      borderRadius: 'var(--mantine-radius-md)',
                    }}
                  >
                    <Text size="md" fw={500}>
                      ASC - American Society of Cinematographers
                    </Text>
                  </Group>

                  <Group
                    justify="space-between"
                    p="md"
                    style={{
                      border: '1px solid var(--mantine-color-gray-3)',
                      borderRadius: 'var(--mantine-radius-md)',
                    }}
                  >
                    <Text size="md" fw={500}>
                      ASIFA - International Animated Film Association
                    </Text>
                  </Group>
                </Stack>

                {/* Information Alert */}
                <Alert
                  icon={<IconExclamationMark size="1.2rem" />}
                  title="We are actively adding new partners"
                  color="yellow"
                  variant="light"
                  radius="md"
                  styles={{
                    root: {
                      backgroundColor: 'var(--mantine-color-yellow-0)',
                      border: '1px solid var(--mantine-color-yellow-3)',
                    },
                    icon: {
                      color: 'var(--mantine-color-brand-8)',
                    },
                    title: {
                      color: 'var(--mantine-color-brand-8)',
                      fontWeight: 700,
                    },
                    message: {
                      color: 'var(--mantine-color-gray-7)',
                    },
                  }}
                >
                  At this time, the guilds you have selected are not yet part of our verification
                  program. We are actively working to include these guilds in a future update.
                </Alert>
              </Stack>

              {/* Action Buttons */}
              <Stack gap="md" mt="xl">
                <Button
                  onClick={handleDone}
                  fullWidth
                  size="lg"
                  radius="md"
                  bg="brand.8"
                  styles={{
                    root: {
                      '&:hover': {
                        backgroundColor: 'var(--mantine-color-brand-7)',
                      },
                    },
                  }}
                >
                  Done
                </Button>

                <Button
                  onClick={handleBack}
                  variant="outline"
                  fullWidth
                  size="md"
                  radius="md"
                  color="brand"
                >
                  Edit Guild Selection
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
