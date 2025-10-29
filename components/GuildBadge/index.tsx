'use client';

import { buildGuildStatusIndex, makeStatusGetter, sortByVerificationStatus } from '@/helpers';
import { useAuthStore } from '@/stores/authStore';
import { GuildsType, VerificationStatus } from '@/types/collections';
import { Badge, Group, Text, Tooltip } from '@mantine/core';
import { IconRosette, IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import classes from './GuildBadge.module.css';

export interface GuildBadgeProps {
  guilds: GuildsType[];
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
    verified: '#22C55E',
    pending: '#F59E0B',
    empty: '#6B7280'
  };
  return colors[status as keyof typeof colors] || colors.empty;
};

const getTooltipText = (status: VerificationStatus) => {
  const tooltips = {
    verified: 'Verified',
    pending: 'Verification pending',
    empty: 'Verification available'
  };
  return tooltips[status as keyof typeof tooltips] || tooltips.empty;
};

export default function GuildBadge({
  guilds,
  className
}: GuildBadgeProps) {

  const { userVerificationGuilds } = useAuthStore();
  const statusIndex = buildGuildStatusIndex(userVerificationGuilds);

  return sortByVerificationStatus(guilds, statusIndex).map((guild) => {
    const status = (makeStatusGetter(statusIndex))(guild.longName);
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
              {guild.shortName}
            </Text>
            <IconComponent className={classes.icon} color={colorValue} />
          </Group>
        </Badge>
      </Tooltip>
    )
  });
}
