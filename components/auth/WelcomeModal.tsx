'use client';

import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import { Box, Button, Group, Image, List, Modal, Stack, Text, Title } from '@mantine/core';

interface WelcomeModalProps {
  opened: boolean;
  onClose: () => void;
  onStartVerification: () => void;
  onSkip: () => void;
}

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
      withCloseButton={false}
      centered
      size="md"
      padding="xl"
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="xl" align="center">
        {/* Header */}
        <Group justify="space-between" w="100%">
          <Group gap="sm">
            <Image src="/logo.svg" alt="FYCit Logo" width={40} height={40} />
          </Group>
          <Button variant="subtle" color="gray" onClick={onClose} style={{ padding: 0 }}>
            <Text size="lg" fw={500}>
              ×
            </Text>
          </Button>
        </Group>

        {/* Title */}
        <Stack gap="xs" align="center">
          <Title order={2} fw={700} c="gray.9" ta="center">
            Welcome to our new web platform
          </Title>
          <Text size="md" c="gray.7" ta="center">
            Complete the verification steps to ensure your profile is trusted and eligible for guild
            interactions.
          </Text>
        </Stack>

        {/* Illustration */}
        <Box
          style={{
            width: '100%',
            height: '120px',
            backgroundColor: 'var(--mantine-color-gray-1)',
            borderRadius: 'var(--mantine-radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '1px solid var(--mantine-color-gray-3)',
            margin: '1rem 0',
          }}
        >
          {/* Network illustration placeholder */}
          <Group gap="sm">
            <Box
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--mantine-color-brand-8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconCheck size={24} color="white" />
            </Box>
            <Stack gap="xs">
              <Group gap="xs">
                <Box
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--mantine-color-gray-4)',
                    borderRadius: '4px',
                  }}
                />
                <Box
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--mantine-color-gray-4)',
                    borderRadius: '4px',
                  }}
                />
                <Box
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--mantine-color-gray-4)',
                    borderRadius: '4px',
                  }}
                />
              </Group>
              <Group gap="xs">
                <Box
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--mantine-color-gray-4)',
                    borderRadius: '4px',
                  }}
                />
                <Box
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--mantine-color-gray-4)',
                    borderRadius: '4px',
                  }}
                />
                <Box
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--mantine-color-gray-4)',
                    borderRadius: '4px',
                  }}
                />
              </Group>
            </Stack>
          </Group>
        </Box>

        {/* Benefits Section */}
        <Stack gap="md" w="100%">
          <Text size="lg" fw={600} c="gray.8">
            Key benefits of profile verification
          </Text>
          <List
            spacing="sm"
            size="md"
            center
            icon={
              <Box
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--mantine-color-brand-8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconCheck size={10} color="white" />
              </Box>
            }
          >
            {benefits.map((benefit, index) => (
              <List.Item key={index}>
                <Text size="md" c="gray.7">
                  {benefit}
                </Text>
              </List.Item>
            ))}
          </List>
        </Stack>

        {/* Action Buttons */}
        <Stack gap="md" w="100%" mt="xl">
          <Button
            onClick={onStartVerification}
            fullWidth
            size="lg"
            radius="md"
            bg="brand.8"
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: 'var(--mantine-color-brand-7)',
                },
              },
            }}
          >
            Start verification
          </Button>

          <Text
            size="sm"
            c="brand.8"
            ta="center"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={onSkip}
          >
            Skip now
          </Text>
        </Stack>
      </Stack>
    </Modal>
  );
};
