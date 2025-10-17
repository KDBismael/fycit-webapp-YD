'use client';

import React from 'react';
import {
  Box,
  Button,
  Group,
  Image,
  Modal,
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

interface GuildConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onContinue: () => void;
  onEditGuilds: () => void;
  selectedGuilds: Guild[];
}

const IMAGE_SIZE = 48;

export const GuildConfirmationModal: React.FC<GuildConfirmationModalProps> = ({
  opened,
  onClose,
  onContinue,
  onEditGuilds,
  selectedGuilds,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="md"
      padding="xl"
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="lg" style={{ position: 'relative' }}>
        {/* Close Button - Absolute Position */}
        <Box style={{ position: 'absolute', top: '0', right: '0', zIndex: 10 }}>
          <Button variant="subtle" color="gray" onClick={onClose} style={{ padding: 0 }}>
            <Text size="lg" fw={400}>×</Text>
          </Button>
        </Box>

        {/* Header with Logo */}
        <Group justify="center" w="100%">
          <Group gap="sm" align="center">
            <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
          </Group>
        </Group>

        {/* Title and Subtitle */}
        <Stack gap="md" align="center">
          <Title order={2} fw={700} c="gray.9" ta="center">
            Let's confirm your guild affiliation
          </Title>
          <Text size="sm" c="gray.7" ta="center">
            Before we get started with the verification process, please confirm the guilds or organizations you are a member of:
          </Text>
        </Stack>

        {/* Guild Selection Box */}
        <Box
          p="lg"
          style={{
            backgroundColor: '#FEF3C7',
            borderRadius: 'var(--mantine-radius-md)',
            border: '1px solid #FDE68A',
          }}
        >
          <Stack gap="md">
            {/* Heading */}
            <Text fw={700} c="gray.9" size="md">
              Your selected guilds
            </Text>
            
            {/* Divider */}
            <Box
              style={{
                height: '1px',
                backgroundColor: '#FDE68A',
                width: '100%',
              }}
            />
            
            {/* Guild List */}
            <Stack gap="sm">
              {selectedGuilds.map((guild) => (
                <Text key={guild.id} size="sm" c="gray.8">
                  {guild.fullName}
                </Text>
              ))}
            </Stack>
            
            {/* Edit Guild Link */}
            <Group justify="center" mt="md">
              <Button
                variant="subtle"
                color="gray"
                onClick={onEditGuilds}
                style={{ textDecoration: 'underline' }}
                p={0}
              >
                <Text size="sm" c="gray.8" td="underline">
                  Edit guild
                </Text>
              </Button>
            </Group>
          </Stack>
        </Box>

        {/* Continue Button */}
        <Group justify="center">
          <Button
            onClick={onContinue}
            size="lg"
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
            Continue
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
