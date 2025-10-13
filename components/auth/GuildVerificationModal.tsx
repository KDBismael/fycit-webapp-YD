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
  Select,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { VerificationTimeline } from '../../components/Timeline';

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
}

export const GuildVerificationModal: React.FC<GuildVerificationModalProps> = ({
  opened,
  onClose,
  onNext,
  verifiableGuilds,
  notVerifiableGuilds,
  currentStep,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>('verifiable');
  const [selectedGuildForVerification, setSelectedGuildForVerification] = useState<string>('AMPAS');

  const selectedGuildName =
    verifiableGuilds.find((g) => g.id === selectedGuildForVerification)?.name || 'AMPAS';

  const verificationSteps = [
    `Browse to ${selectedGuildName}.com`,
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
            Two of your selected guilds are verifiable.
          </Text>
        </Stack>

        {/* Progress Timeline */}
        <Box mb="xl">
          <VerificationTimeline
            currentStep={currentStep}
            brandColor="#A98D34"
            stepActiveColor="#D4B75C"
            size="md"
          />
        </Box>

        {/* Guild Tabs */}
        <Tabs value={activeTab} onChange={setActiveTab} mt="xl" mb="md">
          <Tabs.List>
            <Tabs.Tab value="verifiable">Verifiable Guilds</Tabs.Tab>
            <Tabs.Tab value="not-verifiable">Not Verifiable Guilds</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="verifiable" pt="md">
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
                  data={verifiableGuilds.map((guild) => ({
                    value: guild.id,
                    label: guild.fullName,
                  }))}
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
              <Alert
                icon={<IconExclamationMark size="1.2rem" />}
                title={`To Validate ${verifiableGuilds.find((g) => g.id === selectedGuildForVerification)?.name || 'AMPAS'}, we will take you through the following steps.`}
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
                      {step.includes(`${selectedGuildName}.com`) ? (
                        <Text size="sm">
                          {step.split(`${selectedGuildName}.com`)[0]}
                          <Text component="span" td="underline" c="brand.8">
                            {selectedGuildName}.com
                          </Text>
                          {step.split(`${selectedGuildName}.com`)[1]}
                        </Text>
                      ) : (
                        <Text size="sm">{step}</Text>
                      )}
                    </List.Item>
                  ))}
                </List>
              </Alert>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="not-verifiable" pt="md">
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
          </Tabs.Panel>
        </Tabs>

        {/* Action Button */}
        <Group justify="flex-end" mt="xl">
          <Button
            onClick={onNext}
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
            Next
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
