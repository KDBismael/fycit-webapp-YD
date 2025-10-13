'use client';

import React from 'react';
import { Box, Button, Group, Image, List, Modal, Stack, Text, Title } from '@mantine/core';

interface WelcomeModalProps {
  opened: boolean;
  onClose: () => void;
  onStartVerification: () => void;
  onSkip: () => void;
}

const IMAGE_SIZE = 48;
export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  opened,
  onClose,
  onStartVerification,
  onSkip,
}) => {
  const benefits = [
    'Gain Credibility Within the Community',
    'Access Guild or Organization Features',
    'Ensure Secure and Authentic Interactions',
  ];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="xl"
      padding="lg"
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="md" align="center">
        {/* Header with Logo and Close Button */}
        <Group justify="center" w="100%">
          {/* Logo Section */}
          <Group gap="sm" align="center">
            <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
          </Group>
        </Group>

        {/* Welcome Message */}
        <Stack gap="sm" align="center">
          <Title order={3} fw={700} c="gray.9" ta="center" size="h3">
            Welcome to our new web platform
          </Title>
          <Text size="sm" c="gray.7" ta="center" maw={350}>
            Complete the verification steps to ensure your profile is trusted and eligible for guild
            interactions.
          </Text>
        </Stack>

        {/* Profile Verification Image */}
        <Box
          style={{
            width: '100%',
            maxWidth: '300px',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            margin: '0.5rem 0',
          }}
        >
          <Image
            src="/images/ProfileVerification Image.png"
            alt="Profile Verification"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Benefits Section */}
        <Stack gap="md" w="100%">
          <Text size="lg" fw={600} c="gray.8">
            Key benefits of profile verification
          </Text>
          <List
            spacing="sm"
            size="md"
            styles={{
              item: {
                paddingLeft: '8px',
              },
            }}
          >
            {benefits.map((benefit, index) => (
              <List.Item key={index}>
                <Text size="md" c="gray.7">
                  {index + 1}. {benefit}
                </Text>
              </List.Item>
            ))}
          </List>
        </Stack>

        {/* Action Buttons */}
        <Stack gap="sm" mt="md">
          <Button onClick={onStartVerification} fullWidth size="md" radius="md">
            Start verification
          </Button>

          <Text
            size="sm"
            c="gray.7"
            ta="center"
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 400,
            }}
            onClick={onSkip}
          >
            Skip now
          </Text>
        </Stack>
      </Stack>
    </Modal>
  );
};
