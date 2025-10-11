'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  List,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import VerificationCard from '../../../components/VerificationCard';

const verificationData = [
  {
    id: 'ampas',
    title: 'AMPAS',
    status: 'verified' as const,
    memberId: '986545',
    websiteLink: 'Television academy',
    validUntil: '25/12/25',
    actionLabel: 'Resubmit',
    actionType: 'primary' as const,
  },
  {
    id: 'asifa',
    title: 'ASIFA',
    status: 'pending' as const,
    memberId: '986545',
    websiteLink: 'Television academy',
    validUntil: '25/12/25',
    actionLabel: 'Resubmit',
    actionType: 'primary' as const,
  },
  {
    id: 'adg',
    title: 'ADG',
    status: 'inactive' as const,
    memberId: undefined,
    websiteLink: undefined,
    validUntil: undefined,
    actionLabel: 'Complete',
    actionType: 'primary' as const,
  },
  {
    id: 'asc',
    title: 'ASC',
    status: 'rejected' as const,
    memberId: '986545',
    websiteLink: 'Television academy',
    validUntil: '25/12/25',
    actionLabel: 'Delete',
    actionType: 'danger' as const,
  },
];

export default function VerificationPage() {
  const [selectedAll, setSelectedAll] = useState(true);

  const handleAction = (id: string, action: string) => {
    // eslint-disable-next-line no-console
    console.log(`${action} clicked for ${id}`);
  };

  return (
    <Stack gap="xl">
      {/* Header */}
      <Group justify="space-between" align="center">
        <Title order={1} c="gray.9">
          Verification
        </Title>
        <Button
          size="md"
          radius="md"
          style={{
            backgroundColor: '#BAAD3E',
            '&:hover': {
              backgroundColor: '#A98A13',
            },
          }}
        >
          Add
        </Button>
      </Group>

      {/* All Checkbox */}
      <Checkbox
        label="All"
        checked={selectedAll}
        onChange={(event) => setSelectedAll(event.currentTarget.checked)}
        styles={{
          label: {
            fontSize: '16px',
            fontWeight: 500,
            color: '#374151',
          },
          input: {
            backgroundColor: '#F9FAFB',
            borderColor: '#D1D5DB',
          },
        }}
      />

      {/* Verification Cards Grid */}
      <Grid gutter="lg">
        {verificationData.map((item) => (
          <Grid.Col key={item.id} span={{ base: 12, sm: 6 }}>
            <VerificationCard
              title={item.title}
              status={item.status}
              memberId={item.memberId}
              websiteLink={item.websiteLink}
              validUntil={item.validUntil}
              actionLabel={item.actionLabel}
              actionType={item.actionType}
              onAction={() => handleAction(item.id, item.actionLabel)}
            />
          </Grid.Col>
        ))}
      </Grid>

      {/* Key Benefits Section */}
      <Paper
        shadow="sm"
        radius="md"
        style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          padding: '1.5rem',
        }}
      >
        <Group justify="space-between" align="flex-start">
          <Box style={{ flex: 1 }}>
            <Text size="lg" fw={600} c="gray.9" mb="md">
              Key benefits of profile verification
            </Text>
            <List
              type="ordered"
              spacing="xs"
              size="md"
              styles={{
                itemWrapper: {
                  marginBottom: 'var(--mantine-spacing-xs)',
                },
              }}
            >
              <List.Item>Gain Credibility Within the Community</List.Item>
              <List.Item>Access Guild or Organization Features</List.Item>
              <List.Item>Ensure Secure and Authentic Interactions</List.Item>
            </List>
          </Box>
          <Button
            size="md"
            radius="md"
            style={{
              backgroundColor: '#BAAD3E',
              '&:hover': {
                backgroundColor: '#A98A13',
              },
            }}
          >
            Start verification
          </Button>
        </Group>
      </Paper>
    </Stack>
  );
}
