'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  Grid,
  Paper,
  Text,
  TextInput,
  Button,
  Stack,
  Image,
  Box,
  Title,
  Group,
  Select,
  Alert,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { profileCompletionSchema, ProfileCompletionFormData } from '../../validation/profile-completion.validation';

const IMAGE_SIZE = 40;

const guildOptions = [
  { value: 'ampas', label: 'AMPAS - Motion Picture Academy' },
  { value: 'ace', label: 'ACE - American Cinema Editors' },
  { value: 'adg', label: 'ADG - Art Directors Guild' },
  { value: 'animation', label: 'Animation Guild' },
  { value: 'asc', label: 'ASC - American Society of Cinematographers' },
  { value: 'asifa', label: 'ASIFA - International animated film society' },
];

const localeOptions = [
  { value: 'los-angeles', label: 'Los Angeles, CA' },
  { value: 'new-york', label: 'New York, NY' },
  { value: 'london', label: 'London, UK' },
  { value: 'paris', label: 'Paris, France' },
  { value: 'toronto', label: 'Toronto, Canada' },
];

const countryOptions = [
  { value: 'usa', label: 'USA' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Germany' },
  { value: 'australia', label: 'Australia' },
];

export default function ProfileCompletion() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileCompletionFormData>({
    resolver: zodResolver(profileCompletionSchema),
    defaultValues: {
      guild: 'ampas',
      locale: 'los-angeles',
      country: 'usa',
      zipCode: '90210',
    },
  });

  const onSubmit = async (data: ProfileCompletionFormData) => {
    try {
      console.log('Profile completion data:', data);
    } catch (error) {
      console.error('Profile completion error:', error);
    }
  };

  return (
    <Container fluid p={0} style={{ height: '100vh' }}>
      <Grid gutter={0} style={{ height: '100vh' }}>
        <Grid.Col span={{ base: 0, md: 5 }} visibleFrom="md">
          <Box
            style={{
              height: '100vh',
              background: 'linear-gradient(135deg, #BAAD3E 0%, #A98A13 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '2rem',
            }}
          >
            <Paper
              p="xl"
              radius="md"
              style={{
                backgroundColor: '#A98A13',
                color: 'white',
                maxWidth: '400px',
              }}
            >
              <Title order={2} fw={700} mb="md">
                Lorem ipsum dolor sit amet, consectetur.
              </Title>
              <Text size="sm" c="gray.2">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </Text>
            </Paper>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Box style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem',
          }}>
            <Stack gap="md" style={{ maxWidth: '400px', width: '100%' }}>
              <Stack gap="sm" align="center">
                <Group gap="sm">
                  <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
                  <Text size="xl" fw={700} c="brand.8">
                    FYCIT
                  </Text>
                </Group>
                <Text size="xs" c="gray.6" ta="center">
                  FIND YOUR COMMUNITY IN THEATRE.
                </Text>
              </Stack>

              <Stack gap="sm">
                <Stack gap="xs" align="center">
                  <Title order={2} size="h3" ta="center" c="gray.9">
                    Profile Completion
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Input some additional information here.
                  </Text>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap="sm">
                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        Select Guild
                      </Text>
                      <Select
                        data={guildOptions}
                        value={watch('guild')}
                        onChange={(value) => setValue('guild', value || '')}
                        placeholder="Select a guild"
                        error={errors.guild?.message}
                        radius="md"
                        size="sm"
                        styles={{
                          input: {
                            borderColor: 'var(--mantine-color-gray-4)',
                          },
                        }}
                      />
                    </Stack>

                    <Alert
                      icon={<IconInfoCircle size={16} />}
                      title="Careful:"
                      color="yellow"
                      variant="light"
                      radius="md"
                      p="sm"
                    >
                      <Text size="xs" c="gray.7">
                        Selecting organizations you are not a member of may prevent you from seeing some events.
                      </Text>
                    </Alert>

                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        View events in these locale
                      </Text>
                      <Select
                        data={localeOptions}
                        value={watch('locale')}
                        onChange={(value) => setValue('locale', value || '')}
                        placeholder="Select a locale"
                        error={errors.locale?.message}
                        radius="md"
                        size="sm"
                        styles={{
                          input: {
                            borderColor: 'var(--mantine-color-gray-4)',
                          },
                        }}
                      />
                    </Stack>

                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        My Country
                      </Text>
                      <Select
                        data={countryOptions}
                        value={watch('country')}
                        onChange={(value) => setValue('country', value || '')}
                        placeholder="Select your country"
                        error={errors.country?.message}
                        radius="md"
                        size="sm"
                        styles={{
                          input: {
                            borderColor: 'var(--mantine-color-gray-4)',
                          },
                        }}
                      />
                    </Stack>

                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        Zip/Postal Code (Optional)
                      </Text>
                      <TextInput
                        {...register('zipCode')}
                        placeholder="Enter your zip code"
                        error={errors.zipCode?.message}
                        radius="md"
                        size="sm"
                        styles={{
                          input: {
                            borderColor: 'var(--mantine-color-gray-4)',
                          },
                        }}
                      />
                    </Stack>

                    <Button
                      type="submit"
                      fullWidth
                      size="sm"
                      radius="md"
                      bg="brand.8"
                      loading={isSubmitting}
                      style={{
                        backgroundColor: '#BAAD3E',
                        '&:hover': {
                          backgroundColor: '#A98A13',
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
