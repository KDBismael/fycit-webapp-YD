'use client';

import { useGuildsStore } from '@/stores/guildsStore';
import { useUserStore } from '@/stores/userStore';
import { Box, Button, Group, Stack, Text } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import GuildBadge from '../GuildBadge';
import { GuildEditor } from '../GuildEditor';



export default function GuildsTab() {
  const { user } = useUserStore()
  const { guilds } = useGuildsStore();
  const userGuilds = guilds.filter((g) => user?.guild.includes(g.longName))
  const [showEditContainer, setShowEditContainer] = useState(false);
  const [selectedGuilds, setSelectedGuilds] = useState<string[]>(user?.guild ?? []);

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

        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--mantine-spacing-lg)' }}>
          <GuildBadge guilds={userGuilds} />
        </Box>
      </Stack>

      <Stack gap="md">
        <GuildEditor
          value={selectedGuilds}
          onChange={setSelectedGuilds}
          onEditClick={() => setShowEditContainer(!showEditContainer)}
          mode={showEditContainer ? 'list' : 'summary'}
          showSelectedGuild
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
    </Stack>
  );
}
