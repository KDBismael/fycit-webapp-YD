'use client';

import React from 'react';
import { Badge, Group, Text, Tooltip } from '@mantine/core';
import { IconRosette, IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import classes from './GuildBadge.module.css';

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

const getTooltipText = (status: string) => {
  const tooltips = {
    verified: 'Verified',
    pending: 'Verification pending',
    rejected: 'Verification failed'
  };
  return tooltips[status as keyof typeof tooltips] || 'Verification available';
};

export default function GuildBadge({ 
  name, 
  status,
  className 
}: GuildBadgeProps) {
  const IconComponent = getIcon(status);
  const colorValue = getColorValue(status);
  const tooltipText = getTooltipText(status);

  return (
    <Tooltip label={tooltipText} position="top" withArrow>
      <Badge
        variant="outline"
        size="xl"
        c="dark"
        bg="#FFFFF8"
        className={`${classes.badge} ${className || ''}`}
      >
        <Group gap="xs" align="center" className={classes.content}>
          <Text className={classes.text} fw={600} c={colorValue}>
            {name}
          </Text>
          <IconComponent className={classes.icon} color={colorValue} />
        </Group>
      </Badge>
    </Tooltip>
  );
}
