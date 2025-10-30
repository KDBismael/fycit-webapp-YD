'use client';

import { updateUserInfo } from '@/firebase/user';
import { useGuildsStore } from '@/stores/guildsStore';
import { useUserStore } from '@/stores/userStore';
import { UsersType } from '@/types/collections';
import { Box, Button, Group, Stack, Text } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import GuildBadge from '../GuildBadge';
import { GuildEditor } from '../GuildEditor';



export default function GuildsTab() {
  const { user, setUser } = useUserStore()
  const { guilds } = useGuildsStore();
  const userGuilds = guilds.filter((g) => user?.guild.includes(g.longName))
  const [showEditContainer, setShowEditContainer] = useState(false);
  const [selectedGuilds, setSelectedGuilds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    if (user?.guild == selectedGuilds) {
      setShowEditContainer(false)
      return;
    }
    setIsLoading(true)
    const userData: Partial<UsersType> = {
      guild: selectedGuilds,
    }
    await updateUserInfo(userData);
    setUser({ ...user, ...userData } as UsersType);
    setShowEditContainer(false)
    setIsLoading(false)
  }

  useEffect(() => {
    if (user)
      setSelectedGuilds(user?.guild ?? [])
  }, [user])

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
            loading={isLoading}
            disabled={!showEditContainer}
            onClick={onSave}
            style={{
              backgroundColor: '#BAAD3E',
              '&:hover': {
                backgroundColor: '#A98A13',
              },
            }}
          >
            save
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}
