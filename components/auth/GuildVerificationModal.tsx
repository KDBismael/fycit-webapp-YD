'use client';

import React, { useState } from 'react';
import { IconCheck, IconExclamationMark } from '@tabler/icons-react';
import {
  Alert,
  Box,
  Button,
  Group,
  Image,
  List,
  Modal,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';

interface Guild {
  id: string;
  name: string;
  fullName: string;
  isVerifiable: boolean;
  isVerified?: boolean;
}

interface GuildVerificationModalProps {
  opened: boolean;
  onClose: () => void;
  onNext: () => void;
  verifiableGuilds: Guild[];
  notVerifiableGuilds: Guild[];
  currentStep: number;
  totalSteps: number;
}

export const GuildVerificationModal: React.FC<GuildVerificationModalProps> = ({
  opened,
  onClose,
  onNext,
  verifiableGuilds,
  notVerifiableGuilds,
  currentStep,
  totalSteps,
}) => {
  const [activeTab, setActiveTab] = useState<'verifiable' | 'not-verifiable'>('verifiable');
  const [selectedGuildForVerification, setSelectedGuildForVerification] = useState<string>('');

  const verifiableGuildCount = verifiableGuilds.length;

  const verificationSteps = [
    'Browse to AMPAS.com',
    'Click profile button and sign in to your account',
    'Click profile and then click visit member dashboard',
    'Click member card under or next to your name',
    'Take a screenshot with your member id, name and valid through visible.',
    'Enter the information in the form and upload this screenshot.',
  ];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="xl"
      padding="xl"
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" w="100%">
          <Group gap="sm">
            <Image src="/logo.svg" alt="FYCit Logo" width={40} height={40} />
          </Group>
          <Button variant="subtle" color="gray" onClick={onClose} style={{ padding: 0 }}>
            <Text size="lg" fw={500}>
              ×
            </Text>
          </Button>
        </Group>

        {/* Title and Subtitle */}
        <Stack gap="xs" align="center">
          <Title order={2} fw={700} c="gray.9">
            Good News!
          </Title>
          <Text size="md" c="gray.7" ta="center">
            {verifiableGuildCount} of your selected guilds are verifiable.
          </Text>
        </Stack>

        {/* Progress Indicator */}
        <Group gap="xs" justify="center" mt="md">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor:
                    index + 1 === currentStep
                      ? 'var(--mantine-color-brand-8)'
                      : index + 1 < currentStep
                        ? 'var(--mantine-color-brand-8)'
                        : 'var(--mantine-color-gray-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border:
                    index + 1 === currentStep ? '2px solid var(--mantine-color-brand-8)' : 'none',
                }}
              >
                <Text size="sm" c={index + 1 <= currentStep ? 'white' : 'gray.7'} fw={700}>
                  {index + 1}
                </Text>
              </Box>
              {index < totalSteps - 1 && (
                <Box
                  style={{
                    width: 40,
                    height: 2,
                    backgroundColor:
                      index + 1 < currentStep
                        ? 'var(--mantine-color-brand-8)'
                        : 'var(--mantine-color-gray-3)',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Group>

        {/* Guild Tabs */}
        <SegmentedControl
          value={activeTab}
          onChange={(value) => setActiveTab(value as 'verifiable' | 'not-verifiable')}
          data={[
            { label: 'Verifiable Guilds', value: 'verifiable' },
            { label: 'Not Verifiable Guild', value: 'not-verifiable' },
          ]}
          color="brand"
          fullWidth
          mt="xl"
          mb="md"
          styles={{
            root: {
              backgroundColor: 'var(--mantine-color-gray-1)',
            },
            control: {
              border: 'none',
            },
          }}
        />

        {/* Tab Content */}
        {activeTab === 'verifiable' && (
          <Stack w="100%" gap="md">
            {/* Verifiable Guilds List */}
            {verifiableGuilds.map((guild) => (
              <Group
                key={guild.id}
                justify="space-between"
                p="md"
                style={{
                  border: '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Text size="md" fw={500}>
                  {guild.fullName}
                </Text>
                {guild.isVerified && (
                  <Group gap="xs">
                    <IconCheck size={16} color="var(--mantine-color-success-6)" />
                    <Text size="sm" c="success.6" fw={500}>
                      Verified
                    </Text>
                  </Group>
                )}
              </Group>
            ))}

            {/* Guild Selection for Verification */}
            <Stack gap="xs">
              <Text size="sm" fw={500} c="gray.8">
                Start verification for
              </Text>
              <Select
                value={selectedGuildForVerification}
                onChange={(value) => setSelectedGuildForVerification(value || '')}
                data={verifiableGuilds
                  .filter((guild) => !guild.isVerified)
                  .map((guild) => ({ value: guild.id, label: guild.fullName }))}
                placeholder="Select a guild to verify"
                radius="md"
                size="md"
                styles={{
                  input: {
                    borderColor: 'var(--mantine-color-gray-3)',
                    '&:focus': {
                      borderColor: 'var(--mantine-color-brand-8)',
                    },
                  },
                }}
              />
            </Stack>

            {/* Verification Instructions */}
            {selectedGuildForVerification && (
              <Alert
                icon={<IconExclamationMark size="1.2rem" />}
                title={`To Validate ${verifiableGuilds.find((g) => g.id === selectedGuildForVerification)?.name}, we will take you through the following steps.`}
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
                <List size="sm" spacing="xs" mt="md">
                  {verificationSteps.map((step, index) => (
                    <List.Item key={index}>
                      {step.includes('AMPAS.com') ? (
                        <Text size="sm">
                          {step.split('AMPAS.com')[0]}
                          <Text component="span" td="underline" c="brand.8">
                            AMPAS.com
                          </Text>
                          {step.split('AMPAS.com')[1]}
                        </Text>
                      ) : (
                        <Text size="sm">{step}</Text>
                      )}
                    </List.Item>
                  ))}
                </List>
              </Alert>
            )}
          </Stack>
        )}

        {activeTab === 'not-verifiable' && (
          <Stack w="100%" gap="md">
            {/* Not Verifiable Guilds List */}
            {notVerifiableGuilds.map((guild) => (
              <Text
                key={guild.id}
                size="md"
                p="md"
                style={{
                  border: '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                {guild.fullName}
              </Text>
            ))}

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
        )}

        {/* Action Button */}
        <Button
          onClick={onNext}
          size="lg"
          radius="md"
          fullWidth
          mt="xl"
          bg="brand.8"
          disabled={activeTab === 'verifiable' && !selectedGuildForVerification}
          styles={{
            root: {
              '&:hover': {
                backgroundColor: 'var(--mantine-color-brand-7)',
              },
            },
          }}
        >
          Next
        </Button>
      </Stack>
    </Modal>
  );
};
