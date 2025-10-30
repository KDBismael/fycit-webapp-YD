'use client';

import { VerificationStatus } from '@/types/collections';
import { Box, Button, Image, Stack, Text } from '@mantine/core';
import { IconCheck, IconClock, IconEdit, IconX } from '@tabler/icons-react';
import classes from './VerificationCard.module.css';

export interface VerificationCardProps {
  title: string;
  image: string;
  status: VerificationStatus;
  memberId: string;
  validThrough: string;
  onAction: () => void;
  onClick?: () => void;
}

const getStatusIcon = (status: VerificationStatus) => {
  switch (status) {
    case 'approved':
      return <IconCheck size={16} color="white" />;
    case 'pending':
      return <IconClock size={16} color="white" />;
    case 'rejected':
      return <IconX size={16} color="white" />;
    case 'empty':
      return <IconEdit size={16} color="white" />;
    default:
      return <IconClock size={16} color="white" />;
  }
};

const getStatusColor = (status: VerificationStatus) => {
  switch (status) {
    case 'approved':
      return '#22C55E';
    case 'pending':
      return '#6B7280';
    case 'rejected':
      return '#EF4444';
    case 'empty':
      return '#6B7280';
    default:
      return '#6B7280';
  }
};

export default function VerificationCard({
  title,
  status,
  image,
  memberId,
  validThrough,
  onAction,
  onClick,
}: VerificationCardProps) {
  const statusIcon = getStatusIcon(status);
  const statusColor = getStatusColor(status);

  return (
    <Box className={classes.verificationCard} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <Box className={classes.verificationCardContainer}>
        <div className={classes.cardContent}>
          {/* ID Card Image - Left Side */}
          <Box className={classes.idCardSection}>
            <Image
              src={image}
              alt="verification image"
              className={classes.idCardImage}
              radius="md"
            />
          </Box>

          {/* Verification Details - Right Side */}
          <Box className={classes.detailsSection}>
            {/* Header with Status */}
            <div className={classes.headerSection}>
              <Text className={classes.title}>
                {title}
              </Text>
              <Box
                className={classes.statusIcon}
                style={{ backgroundColor: statusColor }}
              >
                {statusIcon}
              </Box>
            </div>

            {/* Details List */}
            <Stack gap="sm" className={classes.detailsList}>
              <Text size="sm" c="black">
                Member ID :{' '}
                <Text component="span" fw={600}>
                  {memberId || '----------'}
                </Text>
              </Text>
              <Text size="sm" c="black">
                Verification status :{' '}
                <Text component="span" fw={600} c={statusColor}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </Text>
              <Text size="sm" c="black">
                Status :{' '}
                <Text component="span" fw={600}>
                  Active
                </Text>
              </Text>
              <Text size="sm" c="black">
                Valid until : <Text component="span">{validThrough || '----------'}</Text>
              </Text>
            </Stack>
          </Box>
        </div>

        {/* Action Button */}
        <Button
          size="md"
          radius="md"
          onClick={onAction}
          variant="subtle"
          className={classes.actionButton}
        >
          restart verification
        </Button>
      </Box>
    </Box>
  );
}
