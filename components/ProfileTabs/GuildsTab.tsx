'use client';

import React, { useState } from 'react';
import { SquarePen } from "lucide-react";
import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
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
  const [showEditContainer, setShowEditContainer] = useState(true);
  const [selectedGuilds, setSelectedGuilds] = useState<string[]>(
    verificationBadges.map(badge => badge.name)
  );

  return (
    <Stack gap="lg">
      {/* Guild Badges Section */}
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text size="lg" fw={600} c="gray.9">
            Guilds
          </Text>
          <Button
            color="violet.8"
            leftSection={<SquarePen size={16} />}
            variant="outline"
            size="sm"
            radius="xl"
            onClick={() => setShowEditContainer(!showEditContainer)}
          >
            {showEditContainer ? 'Done editing' : 'Edit guilds'}
          </Button>
        </Group>

        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--mantine-spacing-md)' }}>
          {verificationBadges.map((badge) => (
            <GuildBadge key={badge.name} name={badge.name} status={badge.status} />
          ))}
        </Box>
      </Stack>

      {/* Container d'édition - conditionnellement visible */}
      {showEditContainer && (
        <Stack gap="md">
          <Title order={4} fw={700} c="gray.9">
            Choose your guilds
          </Title>
          <Text size="sm" c="gray.7">
            Choose the guilds or organizations you are a member of:
          </Text>
          <GuildEditor
            value={selectedGuilds}
            onChange={setSelectedGuilds}
            mode="list"
          />
          <Group justify="flex-end" gap="sm">
            <Button 
              onClick={() => setShowEditContainer(false)}
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
        </Stack>
      )}
    </Stack>
  );
}
