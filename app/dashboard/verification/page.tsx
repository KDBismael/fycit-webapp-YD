'use client';

import React, { useState } from 'react';
import { IconRosetteDiscountCheck } from '@tabler/icons-react';
import { Box, Card, Checkbox, Grid, Group, Image, Select, Stack, Text, ThemeIcon } from '@mantine/core';
import { StartVerificationCard } from '../../../components/StartVerificationCard';
import VerificationCard from '../../../components/VerificationCard';
import { GuildVerificationForm } from '../../../components/auth/GuildVerificationForm';
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
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const handleAction = (id: string, action: string) => {
    // eslint-disable-next-line no-console
    console.log(`${action} clicked for ${id}`);
  };

  const handleGuildClick = (guild: any) => {
    setSelectedGuild(guild);
    setShowVerificationForm(true);
  };

  const handleVerificationComplete = () => {
    setShowVerificationForm(false);
    setSelectedGuild(null);
    // Optionnel: Rafraîchir les données ou afficher un message de succès
  };

  const handleVerificationClose = () => {
    setShowVerificationForm(false);
    setSelectedGuild(null);
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
      <StartVerificationCard />

      {/* Verified Member Benefits Section */}
      <Box>
        <Text size="xl" fw={700} c="gray.9" mb="lg">
          Verified member benefits
        </Text>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="sm"
              padding={0}
              radius="lg"
              style={{
                backgroundColor: 'white',
                border: 'none',
                overflow: 'hidden',
                height: '100%',
              }}
            >
               {/* Image Section - Same height as EventCard images */}
               <Box style={{ position: 'relative', height: '200px' }}>
                 <Image
                   src="https://img7.yna.co.kr/mpic/YH/2022/03/31/MYH20220331019600038_P4.jpg"
                   alt="MovieMaker Magazine"
                   radius="lg"
                   style={{
                     width: '100%',
                     height: '100%',
                     objectFit: 'cover',
                     borderRadius: 'var(--mantine-radius-lg)',
                   }}
                 />
               </Box>

              {/* Content Section */}
              <Stack
                gap="md"
                p="lg"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Text size="lg" fw={700} c="gray.9">
                  50% Discount on FYCit
                </Text>
                <Stack gap="xs">
                  <Group gap="sm" align="flex-start">
                    <ThemeIcon
                      color="gray.4"
                      size={16}
                      radius="xl"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                    </ThemeIcon>
                    <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                      Lorem Ipsum is simply dummy text of the print.
                    </Text>
                  </Group>
                  <Group gap="sm" align="flex-start">
                    <ThemeIcon
                      color="gray.4"
                      size={16}
                      radius="xl"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                    </ThemeIcon>
                    <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                      Lorem Ipsum is simply dummy text.
                    </Text>
                  </Group>
                  <Group gap="sm" align="flex-start">
                    <ThemeIcon
                      color="gray.4"
                      size={16}
                      radius="xl"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                    </ThemeIcon>
                    <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                      Lorem Ipsum is simply dummy text of the print.
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Guild Verification Form Overlay */}
      {showVerificationForm && selectedGuild && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--mantine-radius-md)',
              padding: '2rem',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <GuildVerificationForm
              selectedGuild={{
                id: selectedGuild.id,
                name: selectedGuild.title,
                fullName: `${selectedGuild.title} - Guild Name`,
              }}
              onNext={handleVerificationComplete}
              onBack={handleVerificationClose}
            />
          </div>
        </div>
      )}
    </Stack>
  );
}
