'use client';

import { useAuthStore } from '@/stores/authStore';
import { GuildsType, VerificationStatus } from '@/types/collections';
import {
  Alert,
  Box,
  Button,
  Group,
  Image,
  Modal,
  Paper,
  rem,
  Select,
  Stack,
  Tabs,
  Text,
  Title
} from '@mantine/core';
import { IconAlertTriangleFilled, IconRosette, IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
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


interface GuildVerificationModalProps {
  opened: boolean;
  onClose: () => void;
  onNext: () => void;
  verifiableGuilds: GuildsType[];
  notVerifiableGuilds: GuildsType[];
  currentStep: number;
  selectedGuildForVerification: string
  setSelectedGuildForVerification: (guild: string) => void;

}

const IMAGE_SIZE = 48;

export const GuildVerificationModal: React.FC<GuildVerificationModalProps> = ({
  opened,
  onClose,
  onNext,
  verifiableGuilds,
  notVerifiableGuilds,
  currentStep,
  selectedGuildForVerification,
  setSelectedGuildForVerification
}) => {
  const { userVerificationGuilds } = useAuthStore();
  const [activeTab, setActiveTab] = useState<string | null>('verifiable');
  const getGuildsByStatus = (status: VerificationStatus) => userVerificationGuilds.filter((v) => v.tag == status).map((v) => v.guilds[0]);
  const { pendingGuilds, verifiedGuilds } = { pendingGuilds: getGuildsByStatus('pending'), verifiedGuilds: getGuildsByStatus('approved') }
  const verifiableGuildsNoPendingOrApproved = verifiableGuilds.filter((v) => !pendingGuilds.includes(v.longName) && !verifiedGuilds.includes(v.longName))

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
            {`${verifiableGuildsNoPendingOrApproved.length} of your selected guilds are verifiable.`}
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
              '&[dataActive]': {
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
                    {guild.longName}
                  </Text>
                  {verifiedGuilds.includes(guild.longName) && (
                    <Group gap="xs">
                      <IconRosetteDiscountCheckFilled
                        size={14}
                        color="#22C55E"
                      />
                    </Group>
                  )}
                  {pendingGuilds.includes(guild.longName) && (
                    <Group gap="xs">
                      <IconRosette
                        size={14}
                        color="#F59E0B"
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
                  data={verifiableGuildsNoPendingOrApproved.map((guild) => ({
                    value: guild.longName,
                    label: guild.longName,
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
              <Stack>
                <Paper
                  p="lg"
                  radius="md"
                  style={{
                    flex: 1,
                    backgroundColor: '#FDFBEF', // Fond très clair, proche du design
                    border: '1px solid #EDE6D2',
                  }}
                >
                  <ReactMarkdown>{verifiableGuilds.find((g) => g.longName == selectedGuildForVerification)?.instructionsMarkdown?.replace(/\\n/g, "\n")}</ReactMarkdown>
                </Paper>

              </Stack>

            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="not-verifiable" pt="sm">
            <Stack w="100%" gap="md" align="flex-start">
              {/* Not Verifiable Guilds List */}
              {notVerifiableGuilds.map((guild) => (
                <Text key={guild.id} size="sm">
                  {guild.longName}
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
