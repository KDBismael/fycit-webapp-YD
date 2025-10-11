'use client';

import React from 'react';
import {SquarePen} from "lucide-react"
import { Button, Group, List, Paper, Stack, Text } from '@mantine/core';
import GuildBadge from '../GuildBadge';

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
    status: 'rejected' as const,
  },
  {
    name: 'ADG',
    status: 'pending' as const,
  },
];

export default function GuildsTab() {
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
          >
            Add/Edit guilds
          </Button>
        </Group>

        <Group gap="md" grow>
          {verificationBadges.map((badge) => (
            <GuildBadge key={badge.name} name={badge.name} status={badge.status} />
          ))}
        </Group>
      </Stack>

      {/* Key Benefits Card */}
      <Paper
        shadow="sm"
        withBorder
        radius="lg"
        p="xl"
        style={{
          backgroundColor: '#FFFFF8',
          border: '1px solid #FDE68A',
        }}
      >
        <Group justify="space-between" mb="lg">
          <Text size="xl" fw={700} c="gray.9">
            Key benefits of profile verification
          </Text>
          <Button
            size="md"
            style={{
              backgroundColor: '#BAAD3E',
              borderRadius: '8px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#A98A13',
              },
            }}
          >
            Start verification
          </Button>
        </Group>
        <List type="ordered" spacing="md" size="md">
          <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
            Gain Credibility Within the Community
          </List.Item>
          <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
            Access Guild or Organization Features
          </List.Item>
          <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
            Ensure Secure and Authentic Interactions
          </List.Item>
        </List>
      </Paper>
    </Stack>
  );
}
