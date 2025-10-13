'use client';

import React, { useState } from 'react';
import { IconMail } from '@tabler/icons-react';
import { Box, Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';

export interface NewsletterModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ opened, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call to Mailchimp
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would integrate with your Mailchimp API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Newsletter signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Subscribe to FYCit Newsletter"
      size="md"
      centered
    >
      {isSuccess ? (
        <Stack gap="lg" align="center" py="xl">
          <Box
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#22C55E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconMail size={30} color="white" />
          </Box>
          <Text size="lg" fw={600} c="gray.9" ta="center">
            Thank you for subscribing!
          </Text>
          <Text size="sm" c="gray.6" ta="center">
            You will receive our latest news and updates directly in your inbox.
          </Text>
          <Button
            onClick={handleClose}
            style={{
              backgroundColor: '#BAAD3E',
              '&:hover': {
                backgroundColor: '#A98A13',
              },
            }}
          >
            Close
          </Button>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack gap="lg">
            <Text size="sm" c="gray.6">
              Stay up to date with the latest news, announcements, and exclusive content from FYCit.
            </Text>

            <TextInput
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              leftSection={<IconMail size={16} color="#6B7280" />}
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F5F5F5',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                    backgroundColor: 'white',
                  },
                },
              }}
            />

            <Group justify="flex-end" gap="sm">
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isLoading}
                style={{
                  backgroundColor: '#BAAD3E',
                  '&:hover': {
                    backgroundColor: '#A98A13',
                  },
                }}
              >
                Subscribe
              </Button>
            </Group>
          </Stack>
        </form>
      )}
    </Modal>
  );
}
