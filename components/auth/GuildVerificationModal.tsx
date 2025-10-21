'use client';

import React, { useState } from 'react';
import { IconAlertTriangleFilled, IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import {
  Alert,
  Box,
  Button,
  Group,
  Image,
  List,
  Modal,
  rem,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { VerificationTimeline } from '../../components/Timeline';

export const AlertIcon = () => {
  return (
    <Box
      bd="1px solid var(--mantine-color-brand-8)"
      p="xs"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        width: rem(80),
        height: rem(80),
      }}
    >
      <IconAlertTriangleFilled size={32} color="#A98D34" />
    </Box>
  );
};
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

const IMAGE_SIZE = 48;

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
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
      size={{ base: 'full', sm: 'lg', md: 'xl' }}
      padding={{ base: 'md', sm: 'lg', md: 'xl' }}
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="md">
        {/* Header   with Logo */}
        <Group justify="center" w="100%">
          <Group gap="sm" align="center">
            <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
          </Group>
        </Group>

        {/* Title and Subtitle */}
        <Stack gap="xs" align="center">
          <Title order={3} fw={700} c="gray.9">
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
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          mt="md"
          mb="sm"
          styles={{
            tab: {
              '&[data-active]': {
                borderBottomColor: '#BAAD3E',
                fontWeight: 700,
              },
            },
            tabLabel: {
              fontWeight: 500,
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="verifiable">Verifiable Guilds</Tabs.Tab>
            <Tabs.Tab value="not-verifiable">Not Verifiable Guilds</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="verifiable" pt="sm">
            <Stack w="100%" gap="sm">
              {/* Verifiable Guilds List */}
              {verifiableGuilds.map((guild) => (
                <Group key={guild.id} justify="flex-start" p="sm">
                  <Text size="sm" fw={500}>
                    {guild.fullName}
                  </Text>
                  {guild.isVerified && (
                    <Group gap="xs">
                      <IconRosetteDiscountCheckFilled
                        size={14}
                        color="var(--mantine-color-success-6)"
                      />
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
                color="yellow"
                variant="light"
                radius="md"
                styles={{
                  root: {
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #FDE68A',
                  },
                }}
              >
                <Stack gap="sm">
                  <Text fw={700} c="#A98D34" size="sm">
                    To Validate{' '}
                    {verifiableGuilds.find((g) => g.id === selectedGuildForVerification)?.name ||
                      'AMPAS'}
                    , we will take you through the following steps.
                  </Text>
                  <List size="xs" spacing="xs">
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
                </Stack>
              </Alert>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="not-verifiable" pt="sm">
            <Stack w="100%" gap="md" align="flex-start">
              {/* Not Verifiable Guilds List */}
              {notVerifiableGuilds.map((guild) => (
                <Text key={guild.id} size="sm">
                  {guild.fullName}
                </Text>
              ))}

              {/* Centered Alert */}
              <Alert variant="light" radius="md" color="#A98D34" styles={{
                root: {
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                },
              }}>
                <Stack gap="xs" align="center">
                  <AlertIcon />
                  <Title order={4} fw={700} ta="center">
                    We are actively adding new partners
                  </Title>
                  <Text size="sm" c="gray.7" ta="center">
                    At this time, the guilds you have selected are not yet part of our verification
                    program. We are actively working to include these guilds in a future update.
                  </Text>
                </Stack>
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
