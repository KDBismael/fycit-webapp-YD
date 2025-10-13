'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconExclamationMark } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Group,
  Image,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  ProfileCompletionFormData,
  profileCompletionSchema,
} from '../../validation/profile-completion.validation';

interface AwardsSeasonModalProps {
  opened: boolean;
  onClose: () => void;
  onNext: (data: ProfileCompletionFormData) => void;
}

// Mock data for dropdowns
const localAreas = [
  { value: 'los-angeles', label: 'Los Angeles, CA' },
  { value: 'new-york', label: 'New York, NY' },
  { value: 'chicago', label: 'Chicago, IL' },
  { value: 'atlanta', label: 'Atlanta, GA' },
  { value: 'miami', label: 'Miami, FL' },
  { value: 'san-francisco', label: 'San Francisco, CA' },
];

const countries = [
  { value: 'usa', label: 'USA' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Germany' },
  { value: 'australia', label: 'Australia' },
];

export const AwardsSeasonModal: React.FC<AwardsSeasonModalProps> = ({
  opened,
  onClose,
  onNext,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileCompletionFormData>({
    resolver: zodResolver(profileCompletionSchema),
    defaultValues: {
      selectedGuild: 'AMPAS',
      viewEventsInLocals: 'los-angeles',
      myCountry: 'usa',
      zipPostalCode: '',
    },
  });

  const selectedGuild = watch('selectedGuild');
  const viewEventsInLocals = watch('viewEventsInLocals');
  const myCountry = watch('myCountry');

  const onSubmit = async (data: ProfileCompletionFormData) => {
    try {
      onNext(data);
    } catch (error) {
      console.error('Awards season modal error:', error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="lg"
      padding="xl"
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="xl">
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

          {/* Title and Description */}
          <Stack gap="md">
            <Title order={2} fw={700} c="gray.9">
              We've added some exciting new features for Awards Season 2025/26
            </Title>
            <Text size="md" c="gray.7" style={{ lineHeight: 1.6 }}>
              FYCit has gone global! We will now list any publicly available screenings in any city.
              New locales will roll out throughout the season as they are scheduled. Please choose
              your preferred locale(s) and decide if you'd like to Automatically View Events in New
              Locales when they are added. You can always change this later in Settings.
            </Text>
          </Stack>

          {/* Form Fields */}
          <Stack gap="lg">
            {/* Select Guild */}
            <Stack gap="xs">
              <Text size="sm" fw={500} c="gray.8">
                Select Guild
              </Text>
              <Select
                value={selectedGuild}
                onChange={(value) => setValue('selectedGuild', value || '')}
                data={[
                  { value: 'AMPAS', label: 'AMPAS - Motion Picture Academy' },
                  { value: 'ADG', label: 'ADG - Art Directors Guild' },
                  { value: 'ASC', label: 'ASC - American Society of Cinematographers' },
                  { value: 'ASIFA', label: 'ASIFA - International Animated Film Association' },
                  { value: 'WGA', label: 'WGA - Writers Guild of America' },
                  { value: 'SAG', label: 'SAG - Screen Actors Guild' },
                  { value: 'DGA', label: 'DGA - Directors Guild of America' },
                ]}
                placeholder="Select a guild"
                error={errors.selectedGuild?.message}
                radius="md"
                size="md"
                styles={{
                  input: {
                    borderColor: 'var(--mantine-color-gray-3)',
                    '&:focus': {
                      borderColor: 'var(--mantine-color-brand-8)',
                    },
                  },
                }}
              />
            </Stack>

            {/* Warning Alert */}
            <Alert
              icon={<IconExclamationMark size={16} />}
              title="Careful"
              color="warning"
              variant="light"
              radius="md"
              styles={{
                root: {
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                },
              }}
            >
              <Text size="sm" c="gray.7">
                Selecting organizations you are not a member of may prevent you from seeing some
                events
              </Text>
            </Alert>

            {/* View events in these locals */}
            <Stack gap="xs">
              <Text size="sm" fw={500} c="gray.8">
                View events in these locals
              </Text>
              <Select
                value={viewEventsInLocals}
                onChange={(value) => setValue('viewEventsInLocals', value || '')}
                data={localAreas}
                placeholder="Select your local area"
                error={errors.viewEventsInLocals?.message}
                radius="md"
                size="md"
                styles={{
                  input: {
                    borderColor: 'var(--mantine-color-gray-3)',
                    '&:focus': {
                      borderColor: 'var(--mantine-color-brand-8)',
                    },
                  },
                }}
              />
            </Stack>

            {/* My Country */}
            <Stack gap="xs">
              <Text size="sm" fw={500} c="gray.8">
                My Country
              </Text>
              <Select
                value={myCountry}
                onChange={(value) => setValue('myCountry', value || '')}
                data={countries}
                placeholder="Select your country"
                error={errors.myCountry?.message}
                radius="md"
                size="md"
                styles={{
                  input: {
                    borderColor: 'var(--mantine-color-gray-3)',
                    '&:focus': {
                      borderColor: 'var(--mantine-color-brand-8)',
                    },
                  },
                }}
              />
            </Stack>

            {/* Zip/Postal Code (Optional) */}
            <Stack gap="xs">
              <Text size="sm" fw={500} c="gray.8">
                Zip/Postal Code (Optional)
              </Text>
              <TextInput
                {...register('zipPostalCode')}
                placeholder="Enter your zip code"
                error={errors.zipPostalCode?.message}
                radius="md"
                size="md"
                styles={{
                  input: {
                    borderColor: 'var(--mantine-color-gray-3)',
                    '&:focus': {
                      borderColor: 'var(--mantine-color-brand-8)',
                    },
                  },
                }}
              />
            </Stack>
          </Stack>

          {/* Action Button */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            radius="md"
            bg="brand.8"
            loading={isSubmitting}
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: 'var(--mantine-color-brand-7)',
                },
              },
            }}
          >
            Next
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
