'use client';

import React from 'react';
import { Box, Button, Group, Image, Modal, Stack, Text, Title } from '@mantine/core';
import { VerificationTimeline } from '../Timeline';

interface MembershipSummaryModalProps {
  opened: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
  onContinue: () => void;
  membershipData: {
    guild: string;
    memberId: string;
    validThrough: string;
    memberCardImage: string;
  };
}

export const MembershipSummaryModal: React.FC<MembershipSummaryModalProps> = ({
  opened,
  onClose,
  onGoToDashboard,
  onContinue,
  membershipData,
}) => {
  const brandColor = '#A8B04D';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="xl"
      padding="xl"
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="xl" align="center">
        {/* Header with Logo */}
        <Group justify="center" w="100%">
          <Group gap="sm" align="center">
            <Image src="/logo.svg" alt="FYCit Logo" width={64} height={64} />
          </Group>
        </Group>

        {/* Success Message */}
        <Stack gap="md" align="center">
          <Title order={2} fw={700} c="gray.9" ta="center">
            Your membership details have been successfully submitted.
          </Title>
          <Text size="lg" fw={600} c="gray.8" ta="center">
            Your verification is pending for 48 hours.
          </Text>
          <Text size="md" c="gray.7" ta="center" maw={600}>
            It may take up to 48 hours to confirm your membership details. You'll receive an email
            once verification is completed. Please ensure you've uploaded a clear screenshot of your
            Member Card with all required details visible.
          </Text>
        </Stack>

        {/* Progress Timeline */}
        <Box w="100%">
          <VerificationTimeline
            currentStep={3}
            brandColor={brandColor}
            stepActiveColor={brandColor}
            size="lg"
          />
        </Box>

        {/* Membership Details */}
        <Box
          w="100%"
          style={{
            border: `2px solid ${brandColor}`,
            borderRadius: 'var(--mantine-radius-md)',
            padding: '1.5rem',
            backgroundColor: '#FFFBEB',
          }}
        >
          <Stack gap="lg">
            {/* Membership Information - Horizontal Layout */}
            <Group gap="sm" wrap="wrap" justify="space-between">
              <Stack gap="xs">
                <Text size="sm" c="gray.6" fw={400}>
                  Guilds:
                </Text>
                <Text size="sm" c="gray.9" fw={600}>
                  {membershipData.guild}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" c="gray.6" fw={400}>
                  Member ID:
                </Text>
                <Text size="sm" c="gray.9" fw={600}>
                  {membershipData.memberId}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" c="gray.6" fw={400}>
                  Valid Through:
                </Text>
                <Text size="sm" c="gray.9" fw={600}>
                  {membershipData.validThrough}
                </Text>
              </Stack>
            </Group>
            
            {/* Member Card */}
            <Stack gap="sm" mt="md">
              <Text size="sm" c="gray.6" fw={400} ta="center">
                Your member card:
              </Text>
              <Box
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                  maxWidth: '300px',
                  margin: '0 auto',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src={membershipData.memberCardImage}
                  alt="Member Card"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: 'var(--mantine-radius-md)',
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        {/* Continue Message */}
        <Text size="md" c="gray.7" ta="center">
          You have more guilds to verify. Click continue to proceed.
        </Text>

        {/* Action Buttons */}
        <Group gap="md" justify='center' w="100%">
          <Button onClick={onGoToDashboard} variant="outline" size="lg" radius="md">
            Go to dashboard
          </Button>
          <Button onClick={onContinue} size="lg" radius="md">
            Continue
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
