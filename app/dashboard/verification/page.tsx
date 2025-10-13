'use client';

import React, { useState } from 'react';
import { Box, Button, Checkbox, Group, List, Paper, Select, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import VerificationCard from '../../../components/VerificationCard';
import VerificationModal from '../../../components/VerificationModal';
import classes from './VerificationPage.module.css';

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
  const [selectedGuild, setSelectedGuild] = useState<any>(null);
  const [verificationModalOpened, { open: openVerificationModal, close: closeVerificationModal }] = useDisclosure(false);

  const handleAction = (id: string, action: string) => {
    // eslint-disable-next-line no-console
    console.log(`${action} clicked for ${id}`);
  };

  const handleGuildClick = (guild: any) => {
    setSelectedGuild(guild);
    openVerificationModal();
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
          rightSection={
            <Checkbox
              checked
              size="sm"
              classNames={{
                input: classes.checkboxInput,
                icon: classes.checkboxIcon,
              }}
            />
          }
          renderOption={({ option, checked }) => (
            <Group gap="sm" style={{ padding: '8px 12px' }}>
              <Checkbox
                checked={checked}
                size="sm"
                classNames={{
                  input: classes.checkboxInput,
                  icon: classes.checkboxIcon,
                }}
              />
              <Text size="sm" c={checked ? '#374151' : '#6B7280'} fw={checked ? 500 : 400}>
                {option.label}
              </Text>
            </Group>
          )}
          classNames={{
            wrapper: classes.filterSelect,
            input: classes.filterSelectInput,
            section: classes.filterSelectSection,
            dropdown: classes.filterSelectDropdown,
            options: classes.filterSelectOptions,
            option: classes.filterSelectOption,
          }}
        />
        <Button
          size="md"
          radius="md"
          className={classes.addGuildButton}
        >
          Add guild
        </Button>
      </Group>

      {/* Verification Cards Grid */}
      <Box className={classes.verificationGrid}>
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
            onClick={() => handleGuildClick(item)}
          />
        ))}
      </Box>

      {/* Key Benefits Section */}
      <Paper
        shadow="sm"
        radius="md"
        className={classes.keyBenefitsPaper}
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
            className={classes.startVerificationButton}
          >
            Start verification
          </Button>
        </Group>
      </Paper>

      <VerificationModal
        opened={verificationModalOpened}
        onClose={closeVerificationModal}
        guild={selectedGuild}
      />
    </Stack>
  );
}
