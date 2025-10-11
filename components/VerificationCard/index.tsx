'use client';

import React from 'react';
import { IconCheck, IconClock, IconEdit, IconX } from '@tabler/icons-react';
import { Box, Button, Group, Image, Stack, Text } from '@mantine/core';

export interface VerificationCardProps {
  title: string;
  status: 'verified' | 'pending' | 'rejected' | 'inactive';
  memberId?: string;
  websiteLink?: string;
  validUntil?: string;
  onAction: () => void;
  actionLabel: string;
  actionType?: 'primary' | 'danger';
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'verified':
      return <IconCheck size={16} color="white" />;
    case 'pending':
      return <IconClock size={16} color="white" />;
    case 'rejected':
      return <IconX size={16} color="white" />;
    case 'inactive':
      return <IconEdit size={16} color="white" />;
    default:
      return <IconClock size={16} color="white" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified':
      return '#22C55E';
    case 'pending':
      return '#6B7280';
    case 'rejected':
      return '#EF4444';
    case 'inactive':
      return '#6B7280';
    default:
      return '#6B7280';
  }
};

export default function VerificationCard({
  title,
  status,
  memberId,
  websiteLink,
  validUntil,
  onAction,
  actionLabel,
}: VerificationCardProps) {
  const statusIcon = getStatusIcon(status);
  const statusColor = getStatusColor(status);

  return (
    <Box style={{ display: 'flex', alignItems: 'flex-start' }}>
      {/* Verification Details with ID Card Image */}
      <Box
        style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          flex: '1',
          minWidth: '600px',
          height: 'fit-content',
        }}
      >
        <Group gap="lg" align="flex-start">
          {/* ID Card Image - Left Side */}
          <Box
            style={{
              flex: '0 0 auto',
              maxWidth: '300px',
            }}
          >
            <Box
              style={
                {
                  //   transform: 'rotate(-2deg)',
                }
              }
            >
              <Image
                src="/images/ProfileCard.png"
                alt="ID Card"
                width="100%"
                height={180}
                radius="md"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>

          {/* Verification Details - Right Side */}
          <Box
            style={{
              flex: '1',
              minWidth: '250px',
            }}
          >
            {/* Header with Status */}
            <Group justify="space-between" align="center" mb="md">
              <Text size="lg" fw={700} c="black">
                {title}
              </Text>
              <Box
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: statusColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {statusIcon}
              </Box>
            </Group>

            {/* Details List */}
            <Stack gap="sm" mb="lg">
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
                Website link :{' '}
                <Text component="span" style={{ textDecoration: 'underline', color: '#3B82F6' }}>
                  {websiteLink || '----------'}
                </Text>
              </Text>
              <Text size="sm" c="black">
                Status :{' '}
                <Text component="span" fw={600}>
                  Active
                </Text>
              </Text>
              <Text size="sm" c="black">
                Valid until : <Text component="span">{validUntil || '----------'}</Text>
              </Text>
            </Stack>
          </Box>
        </Group>
        {/* Action Button */}
        <Button
          size="md"
          radius="md"
          onClick={onAction}
          variant="outline"
          style={{
            borderColor: '#BAAD3E',
            color: '#BAAD3E',
            backgroundColor: 'white',
            width: '100%',
            '&:hover': {
              backgroundColor: '#BAAD3E',
              color: 'white',
            },
          }}
        >
          {actionLabel}
        </Button>
      </Box>
    </Box>
  );
}
