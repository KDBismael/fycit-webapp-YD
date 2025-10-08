'use client';

import React from 'react';
import { Badge, Group, Text } from '@mantine/core';
import { IconRosette, IconRosetteDiscountCheckFilled } from '@tabler/icons-react';

export interface GuildBadgeProps {
  name: string;
  status: 'verified' | 'pending' | 'rejected';
  className?: string;
}

const getIcon = (status: string) => {
  if (status === 'verified') {
    return IconRosetteDiscountCheckFilled;
  }
  return IconRosette;
};

const getColorValue = (status: string) => {
  const colors = {
    verified: 'var(--mantine-color-success-6)',
    pending: 'var(--mantine-color-gray-6)',
    rejected: 'var(--mantine-color-error-6)'
  };
  return colors[status as keyof typeof colors] || 'var(--mantine-color-gray-6)';
};

export default function GuildBadge({ 
  name, 
  status,
  className 
}: GuildBadgeProps) {
  const IconComponent = getIcon(status);
  const colorValue = getColorValue(status);

  return (
    <Badge
      variant="outline"
      size="xl"
      c="dark"
      bg="#FFFFF8"
      style={{
        border: '1px solid #FDE68A',
        flex: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        minWidth: 0,
        gap: 'var(--mantine-spacing-xs)',
        padding: 'var(--mantine-spacing-lg) var(--mantine-spacing-md)',
      }}
      className={className}
    >
      <Group gap="xs" align="center">
        <Text size="sm" fw={600} c={colorValue}>
          {name}
        </Text>
        <IconComponent size={22} color={colorValue} />
      </Group>
    </Badge>
  );
}
