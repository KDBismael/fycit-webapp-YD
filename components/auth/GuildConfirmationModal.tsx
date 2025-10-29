'use client';

import {
  Button,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title
} from '@mantine/core';
import React, { useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { GuildEditor } from '../GuildEditor';

interface GuildConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onContinue: () => Promise<void>;
}

const IMAGE_SIZE = 48;

export const GuildConfirmationModal: React.FC<GuildConfirmationModalProps> = ({
  opened,
  onClose,
  onContinue,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userGuilds, setUserGuilds } = useUserStore();

  const handleGuildChange = (newGuilds: string[]) => {
    setUserGuilds(newGuilds);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onContinue();
    setIsSubmitting(false);
  }

  return (
    <Modal
      opened={opened}
      onClose={() => { }}
      closeOnEscape={false}
      closeOnClickOutside={false}
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
        {/* <Box style={{ position: 'absolute', top: '0', right: '0', zIndex: 10 }}>
          <Button variant="subtle" color="gray" onClick={onClose} style={{ padding: 0 }}>
            <Text size="lg" fw={400}>×</Text>
          </Button>
        </Box> */}

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

        {/* GuildEditor Component */}
        <GuildEditor
          value={userGuilds}
          onChange={handleGuildChange}
          mode={isEditing ? 'list' : 'summary'}
          onEditClick={handleEditClick}
          showSelectedGuild
        />

        {/* Confirm Button - Only show when editing */}
        {isEditing && (
          <Group justify="flex-end" gap="sm">
            <Button
              onClick={() => setIsEditing(false)}
              style={{
                backgroundColor: '#BAAD3E',
                '&:hover': {
                  backgroundColor: '#A98A13',
                },
              }}
            >
              Confirm
            </Button>
          </Group>
        )}

        {/* Continue Button - Only show when not editing */}
        {!isEditing && (
          <Group justify="center">
            <Button
              loading={isSubmitting}
              onClick={handleSubmit}
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
        )}
      </Stack>
    </Modal>
  );
};
