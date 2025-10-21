'use client';

import React, { useState } from 'react';
import {SquarePen} from "lucide-react"
import { Box, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import GuildBadge from '../GuildBadge';
import { GuildEditor } from '../GuildEditor';

const verificationBadges = [
  {
    name: 'AMPAS',
    status: 'verified' as const,
  },
  {
    name: 'ASIFA',
    status: 'pending' as const,
  },
  {
    name: 'ASC',
    status: 'verifiable' as const,
  },
  {
    name: 'ADG',
    status: 'pending' as const,
  },
];

export default function GuildsTab() {
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [selectedGuilds, setSelectedGuilds] = useState<string[]>(
    verificationBadges.map(badge => badge.name)
  );

  return (
    <Stack gap="lg">
      {/* Guild Badges Section */}
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text size="lg" fw={600} c="gray.9">
            Guild Verification
          </Text>
          <Button
            color="violet.8"
            leftSection={<SquarePen size={16} />}
            variant="outline"
            size="sm"
            radius="xl"
            onClick={openEditModal}
          >
            Add/Edit guilds
          </Button>
        </Group>

        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--mantine-spacing-md)' }}>
          {verificationBadges.map((badge) => (
            <GuildBadge key={badge.name} name={badge.name} status={badge.status} />
          ))}
        </Box>
      </Stack>

      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title="Edit Guilds"
        size="lg"
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="gray.7">
            Select the guilds you want to associate with your profile. You can add or remove guilds at any time.
          </Text>
          <GuildEditor
            value={selectedGuilds}
            onChange={setSelectedGuilds}
            placeholder="Add a guild"
          />
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button
              onClick={closeEditModal}
              style={{
                backgroundColor: '#BAAD3E',
                '&:hover': {
                  backgroundColor: '#A98A13',
                },
              }}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
