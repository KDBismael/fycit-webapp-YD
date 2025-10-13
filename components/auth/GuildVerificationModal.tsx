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
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between" w="100%">
          <Group gap="sm">
            <Image src="/logo.svg" alt="FYCit Logo" width={32} height={32} />
          </Group>
          <Button variant="subtle" color="gray" onClick={onClose} style={{ padding: 0 }}>
            <Text size="md" fw={400}>
              ×
            </Text>
          </Button>
        </Group>

        {/* Title and Subtitle */}
        <Stack gap="xs" align="center">
          <Title order={3} fw={700} c="gray.9" size="h3">
            Good News!
          </Title>
          <Text size="sm" c="gray.7" ta="center">
            Two of your selected guilds are verifiable.
          </Text>
        </Stack>

        {/* Progress Timeline */}
        <Box mb="md">
          <VerificationTimeline
            currentStep={currentStep}
            brandColor="#A98D34"
            stepActiveColor="#D4B75C"
            size="sm"
          />
        </Box>

        {/* Guild Tabs */}
        <Tabs value={activeTab} onChange={setActiveTab} mt="md" mb="sm">
          <Tabs.List>
            <Tabs.Tab value="verifiable">Verifiable Guilds</Tabs.Tab>
            <Tabs.Tab value="not-verifiable">Not Verifiable Guilds</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="verifiable" pt="sm">
            <Stack w="100%" gap="sm">
              {/* Verifiable Guilds List */}
              {verifiableGuilds.map((guild) => (
                <Group
                  key={guild.id}
                  justify="space-between"
                  p="sm"
                  style={{
                    border: '1px solid var(--mantine-color-gray-3)',
                    borderRadius: 'var(--mantine-radius-md)',
                  }}
                >
                  <Text size="sm" fw={500}>
                    {guild.fullName}
                  </Text>
                  {guild.isVerified && (
                    <Group gap="xs">
                      <IconCheck size={14} color="var(--mantine-color-success-6)" />
                      <Text size="xs" c="success.6" fw={500}>
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
                  size="sm"
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
                icon={<IconExclamationMark size="1rem" />}
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
                <List size="xs" spacing="xs" mt="sm">
                  {verificationSteps.map((step, index) => (
                    <List.Item key={index}>
                      {step.includes(`${selectedGuildName}.com`) ? (
                        <Text size="xs">
                          {step.split(`${selectedGuildName}.com`)[0]}
                          <Text component="span" td="underline" c="brand.8">
                            {selectedGuildName}.com
                          </Text>
                          {step.split(`${selectedGuildName}.com`)[1]}
                        </Text>
                      ) : (
                        <Text size="xs">{step}</Text>
                      )}
                    </List.Item>
                  ))}
                </List>
              </Alert>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="not-verifiable" pt="sm">
            <Stack w="100%" gap="sm">
              {/* Not Verifiable Guilds List */}
              {notVerifiableGuilds.map((guild) => (
                <Text
                  key={guild.id}
                  size="sm"
                  p="sm"
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
                icon={<IconExclamationMark size="1rem" />}
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
        <Group justify="flex-end" mt="md">
          <Button
            onClick={onNext}
            size="md"
            radius="md"
            styles={{
              root: {
                backgroundColor: '#BAAD3E',
                '&:hover': {
                  backgroundColor: '#A98A13',
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
