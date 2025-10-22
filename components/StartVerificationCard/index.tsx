'use client';

import React from 'react';
import { Button, Group, List, Paper, Text } from '@mantine/core';

interface StartVerificationCardProps {
  onStartVerification?: () => void;
}

export const StartVerificationCard: React.FC<StartVerificationCardProps> = ({
  onStartVerification,
}) => {
  return (
    <Paper
      shadow="lg"
      withBorder
      radius="lg"
      p="xl"
      style={{
        backgroundColor: '#FFFFF8',
        border: '1px solid #FDE68A',
      }}
    >
      <Group justify="space-between" mb="lg">
        <Text size="xl" fw={700} c="gray.9">
          Key benefits of profile verification
        </Text>
        <Button
          size="md"
          onClick={onStartVerification}
          style={{
            backgroundColor: '#BAAD3E',
            borderRadius: '8px',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#A98A13',
            },
          }}
        >
          Start verification
        </Button>
      </Group>
      <List type="ordered" spacing="md" size="md">
        <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
          Gain Credibility Within the Community
        </List.Item>
        <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
          Access Guild or Organization Features
        </List.Item>
        <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
          Ensure Secure and Authentic Interactions
        </List.Item>
      </List>
    </Paper>
  );
};
