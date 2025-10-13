'use client';

import React from 'react';
import { IconCheck, IconClock, IconEdit, IconRotateClockwise, IconX } from '@tabler/icons-react';
import { Box, Button, Group, Image, Modal, Stack, Text, Textarea, TextInput } from '@mantine/core';
import classes from './VerificationModal.module.css';

export interface VerificationModalProps {
  opened: boolean;
  onClose: () => void;
  guild: {
    id: string;
    title: string;
    status: 'verified' | 'pending' | 'rejected' | 'inactive';
    memberId?: string;
    websiteLink?: string;
    validUntil?: string;
  } | null;
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

export default function VerificationModal({ opened, onClose, guild }: VerificationModalProps) {
  if (!guild) {
    return null;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Guild Verification" size="lg" centered>
      <Stack gap="lg">
        <Box className={classes.container}>
          <div className={classes.content}>
            <Box className={classes.imageSection}>
              <Image
                src="/images/ProfileCard.png"
                alt="ID Card"
                className={classes.image}
                radius="md"
              />
            </Box>

            <Box className={classes.detailsSection}>
              <div className={classes.header}>
                <Text className={classes.title}>{guild.title}</Text>
                <Box
                  className={classes.statusIcon}
                  style={{ backgroundColor: getStatusColor(guild.status) }}
                >
                  {getStatusIcon(guild.status)}
                </Box>
              </div>

              <Stack gap="sm">
                <Text size="sm" c="black">
                  Member ID :{' '}
                  <TextInput
                    placeholder="Enter member ID"
                    defaultValue={guild.memberId || ''}
                    size="xs"
                    style={{ display: 'inline-block', width: '120px', marginLeft: '8px' }}
                  />
                </Text>
                <Text size="sm" c="black">
                  Verification status :{' '}
                  <Text component="span" fw={600} c={getStatusColor(guild.status)}>
                    {guild.status.charAt(0).toUpperCase() + guild.status.slice(1)}
                  </Text>
                </Text>
                <Text size="sm" c="black">
                  Website link :{' '}
                  <TextInput
                    placeholder="Enter website link"
                    defaultValue={guild.websiteLink || ''}
                    size="xs"
                    style={{ display: 'inline-block', width: '150px', marginLeft: '8px' }}
                  />
                </Text>
                <Text size="sm" c="black">
                  Full Name :{' '}
                  <TextInput
                    placeholder="Enter full name"
                    size="xs"
                    style={{ display: 'inline-block', width: '150px', marginLeft: '8px' }}
                  />
                </Text>
                <Text size="sm" c="black">
                  Email :{' '}
                  <TextInput
                    placeholder="Enter email"
                    type="email"
                    size="xs"
                    style={{ display: 'inline-block', width: '150px', marginLeft: '8px' }}
                  />
                </Text>
                <Text size="sm" c="black">
                  Phone :{' '}
                  <TextInput
                    placeholder="Enter phone"
                    size="xs"
                    style={{ display: 'inline-block', width: '150px', marginLeft: '8px' }}
                  />
                </Text>
                <Text size="sm" c="black">
                  Valid until : <Text component="span">{guild.validUntil || '----------'}</Text>
                </Text>
              </Stack>
            </Box>
          </div>

          <Box>
            <Text size="sm" fw={500} c="gray.9" mb="xs">
              Additional Information
            </Text>
            <Textarea
              placeholder="Any additional information or notes"
              size="sm"
              radius="md"
              minRows={2}
            />
          </Box>

          <Group justify="space-between">
            <Group gap="sm">
              <Button variant="outline" color="red" size="sm" leftSection={<IconX size={16} />}>
                Remove
              </Button>
              <Button variant="outline" size="sm" leftSection={<IconRotateClockwise size={16} />}>
                Restart
              </Button>
            </Group>

            <Button
              size="md"
              radius="md"
              style={{
                backgroundColor: '#BAAD3E',
              }}
            >
              Start Verification
            </Button>
          </Group>
        </Box>
      </Stack>
    </Modal>
  );
}
