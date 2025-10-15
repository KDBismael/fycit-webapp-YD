'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconExclamationMark } from '@tabler/icons-react';
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
import { EventLocalesSelector } from '../../../../components/auth/EventLocalesSelector';
import { GuildSelector } from '../../../../components/auth/GuildSelector';
import {
  ProfileCompletionFormData,
  profileCompletionSchema,
} from '../../../../validation/profile-completion.validation';

const IMAGE_SIZE = 60;

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

export default function ProfileCompletion() {
  const router = useRouter();

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
      zipPostalCode: '',
    },
  });

  const selectedGuilds = watch('selectedGuild');

  const onSubmit = async (data: ProfileCompletionFormData) => {
    try {
      console.log('Profile completion data:', data);

      // Redirect to the new unified workflow
      router.push('/auth/signup/workflow');
    } catch (error) {
      console.error('Profile completion error:', error);
    }
  };

  return (
    <Container fluid p={0} style={{ height: '100vh' }}>
      <Grid gutter={0} style={{ height: '100vh' }}>
        {/* Left Panel - Golden Background */}
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
                Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem
                semper parturient.
              </Text>
            </Paper>
          </Box>
        </Grid.Col>

        {/* Right Panel - Profile Completion Form */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Box
            style={{
              height: '100vh',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <Stack gap="xl" style={{ maxWidth: '500px', width: '100%' }}>
              {/* Header */}
              <Stack gap="md" align="center">
                <Group gap="sm">
                  <Image src="/logo.svg" alt="FYCit Logo" width={IMAGE_SIZE} height={IMAGE_SIZE} />
                </Group>
                <Stack gap="xs" align="center">
                  <Text size="sm" c="gray.6" ta="center" fw={500}>
                    AWARDS SEASON STARTS HERE
                  </Text>
                  <Title order={1} size="h2" ta="center" c="gray.9" fw={700}>
                    Profile Completion
                  </Title>
                  <Text size="sm" c="gray.6" ta="center">
                    Input some additional information here.
                  </Text>
                </Stack>
              </Stack>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="lg">
                  {/* Select Guild */}
                  <Stack gap="xs">
                    <Text size="sm" fw={500} c="gray.8">
                      Select Guilds
                    </Text>
                    <GuildSelector
                      value={selectedGuilds}
                      onChange={(value) => setValue('selectedGuild', value)}
                      error={errors.selectedGuild?.message}
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
                      Selecting guilds you are not a member of may prevent you from seeing some
                      events
                    </Text>
                  </Alert>

                  {/* View events in these locals */}
                  <Stack gap="xs">
                    <Text size="sm" fw={500} c="gray.8">
                      View events in these locals
                    </Text>
                    <EventLocalesSelector
                      value={watch('viewEventsInLocals')}
                      onChange={(value) => setValue('viewEventsInLocals', value)}
                      error={errors.viewEventsInLocals?.message}
                    />
                  </Stack>

                  {/* My Country */}
                  <Stack gap="xs">
                    <Text size="sm" fw={500} c="gray.8">
                      My Country
                    </Text>
                    <Select
                      value={watch('myCountry')}
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    size="md"
                    radius="md"
                    bg="brand.8"
                    loading={isSubmitting}
                    style={{
                      marginTop: 'var(--mantine-spacing-lg)',
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
