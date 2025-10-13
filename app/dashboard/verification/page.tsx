'use client';

import React, { useState } from 'react';
import { Box, Button, Group, List, Paper, Select, Stack, Text } from '@mantine/core';
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
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleAction = (id: string, action: string) => {
    // eslint-disable-next-line no-console
    console.log(`${action} clicked for ${id}`);
  };

  return (
    <Stack gap="xl">
      {/* Header */}
      <Group justify="space-between" align="center">
        {/* Filter Select */}
        <Select
          placeholder="Select filter"
          data={[
            { value: 'all', label: 'All' },
            { value: 'verified', label: 'Verified' },
            { value: 'available', label: 'Available for verification' },
            { value: 'pending', label: 'Pending' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'not-available', label: 'Verification not available' },
          ]}
          value={selectedFilter}
          onChange={(value) => setSelectedFilter(value || 'all')}
          size="md"
          radius="md"
          styles={{
            input: {
              backgroundColor: '#F9FAFB',
              borderColor: '#D1D5DB',
              fontSize: '16px',
              fontWeight: 500,
              color: '#374151',
            },
            dropdown: {
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
            },
            option: {
              fontSize: '14px',
              color: '#374151',
              padding: '12px 16px',
            },
          }}
        />
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
          Add guild
        </Button>
      </Group>

      {/* Verification Cards Grid */}
      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--mantine-spacing-md)' }}>
        {verificationData.map((item) => (
          <VerificationCard
            key={item.id}
            title={item.title}
            status={item.status}
            memberId={item.memberId}
            websiteLink={item.websiteLink}
            validUntil={item.validUntil}
            actionLabel={item.actionLabel}
            actionType={item.actionType}
            onAction={() => handleAction(item.id, item.actionLabel)}
          />
        ))}
      </Box>

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
