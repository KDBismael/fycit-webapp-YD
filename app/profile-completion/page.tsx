'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconInfoCircle } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { EventLocalesSelector } from '../../components/auth/EventLocalesSelector';
import { GuildSelector } from '../../components/auth/GuildSelector';
import {
  ProfileCompletionFormData,
  profileCompletionSchema,
} from '../../validation/profile-completion.validation';

const IMAGE_SIZE = 40;

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
      selectedGuild: [],
      viewEventsInLocals: ['los-angeles'],
      myCountry: 'usa',
      zipPostalCode: '90210',
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam.
              </Text>
            </Paper>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Box
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
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
                      <GuildSelector
                        value={watch('selectedGuild')}
                        onChange={(value) => setValue('selectedGuild', value)}
                        error={errors.selectedGuild?.message}
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
                        Selecting organizations you are not a member of may prevent you from seeing
                        some events.
                      </Text>
                    </Alert>

                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        View events in these locale
                      </Text>
                      <EventLocalesSelector
                        value={watch('viewEventsInLocals')}
                        onChange={(value) => setValue('viewEventsInLocals', value)}
                        error={errors.viewEventsInLocals?.message}
                      />
                    </Stack>

                    <Stack gap="xs">
                      <Text size="sm" fw={500} c="gray.8">
                        My Country
                      </Text>
                      <Select
                        data={countryOptions}
                        value={watch('myCountry')}
                        onChange={(value) => setValue('myCountry', value || '')}
                        placeholder="Select your country"
                        error={errors.myCountry?.message}
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
                        {...register('zipPostalCode')}
                        placeholder="Enter your zip code"
                        error={errors.zipPostalCode?.message}
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
