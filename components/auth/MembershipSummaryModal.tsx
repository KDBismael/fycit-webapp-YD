'use client';

import { formatToOrdinalDate } from '@/helpers';
import { useVerificationStore } from '@/stores/verificationStore';
import { GuildsType } from '@/types/collections';
import { Box, Button, Group, Image, Modal, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { VerificationTimeline } from '../Timeline';

interface MembershipSummaryModalProps {
  opened: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
  onContinue: () => void;
  selectedGuild: GuildsType | null
}

export const MembershipSummaryModal: React.FC<MembershipSummaryModalProps> = ({
  opened,
  onClose,
  onGoToDashboard,
  onContinue,
  selectedGuild
}) => {
  const { verificationData } = useVerificationStore();
  const brandColor = '#A8B04D';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
      size={{ base: 'full', sm: 'md', md: 'lg' }}
      padding={{ base: 'md', sm: 'lg' }}
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="md" align="center">
        {/* Header with Logo */}
        <Group justify="center" w="100%">
          <Group gap="sm" align="center">
            <Image src="/logo.svg" alt="FYCit Logo" width={32} height={32} />
          </Group>
        </Group>

        {/* Success Message */}
        <Stack gap="xs" align="center">
          <Title order={4} fw={700} c="gray.9" ta="center" size="h4">
            Your membership details have been successfully submitted.
          </Title>
          <Text size="sm" fw={600} c="gray.8" ta="center">
            Your verification is pending for 48 hours.
          </Text>
          <Text size="xs" c="gray.7" ta="center" maw={350}>
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
            size="sm"
          />
        </Box>

        {/* Membership Details */}
        <Box
          w="100%"
          style={{
            border: `2px solid ${brandColor}`,
            borderRadius: 'var(--mantine-radius-md)',
            padding: '1rem',
            backgroundColor: '#FFFBEB',
          }}
        >
          <Stack gap="sm">
            {/* Membership Information - Horizontal Layout */}
            <Group gap="sm" wrap="wrap" justify="space-between">

              <Stack gap="xs">
                <Text size="xs" c="gray.6" fw={400}>
                  Guilds:
                </Text>
                <Text size="xs" c="gray.9" fw={600}>
                  {selectedGuild?.longName}
                </Text>
              </Stack>
              {selectedGuild?.fields?.map((f) => (<>
                <Stack gap="xs">
                  <Text size="xs" c="gray.6" fw={400}>
                    {f.label} :
                  </Text>
                  {f.type == 'number' || f.type == 'text' &&
                    <Text size="xs" c="gray.9" fw={600}>
                      {`${verificationData[f.id] ?? ''}`}
                    </Text>
                  }
                  {f.type == 'date' &&
                    <Text size="xs" c="gray.9" fw={600}>
                      {formatToOrdinalDate(verificationData[f.id] as Date)}
                    </Text>
                  }
                </Stack>
                {/* Member Image */}
                {f.type == 'image' &&
                  <Stack gap="xs" mt="sm">
                    <Text size="xs" c="gray.6" fw={400} ta="center">
                      Your member card:
                    </Text>
                    <Box
                      style={{
                        border: '1px solid #E5E7EB',
                        borderRadius: 'var(--mantine-radius-md)',
                        overflow: 'hidden',
                        maxWidth: '200px',
                        margin: '0 auto',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Image
                        src={URL.createObjectURL(verificationData[f.id] as File)}
                        alt="Member Card"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: 'var(--mantine-radius-md)',
                        }}
                      // onLoad={() => URL.revokeObjectURL()}
                      />
                    </Box>
                  </Stack>
                }
              </>
              ))}
            </Group>
          </Stack>
        </Box>

        {/* Continue Message */}
        {/* <Text size="sm" c="gray.7" ta="center">
          You have more guilds to verify. Click continue to proceed.
        </Text> */}

        {/* Action Buttons */}
        <Group gap="sm" justify='center' w="100%">
          <Button
            onClick={onGoToDashboard}
            size="sm"
            radius="md"
            style={{
              width: '100%',
              backgroundColor: '#BAAD3E',
              '&:hover': {
                backgroundColor: '#A98A13',
              },
            }}
          >
            Go to dashboard
          </Button>
          {/* <Button
            onClick={onContinue}
            size="sm"
            radius="md"
            style={{
              backgroundColor: '#BAAD3E',
              '&:hover': {
                backgroundColor: '#A98A13',
              },
            }}
          >
            Continue
          </Button> */}
        </Group>
      </Stack>
    </Modal>
  );
};
