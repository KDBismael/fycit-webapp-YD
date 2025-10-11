'use client';

import React from 'react';
import { Box, Button, Grid, Group, Paper, Select, Stack, Text, TextInput } from '@mantine/core';
import { IconUpload, IconMail } from '@tabler/icons-react';
import { CountryPicker } from '../CountryPicker/CountryPicker';

export default function MyInfoTab() {
  return (
    <Stack gap="xl">
      {/* Profile Picture Section */}
      <Stack gap="md">
        <Text size="lg" fw={600} c="gray.9">
          Profile picture
        </Text>
        
        <Paper
          withBorder
          radius="md"
          p="xl"
          style={{
            border: '2px dashed #D1D5DB',
            backgroundColor: '#F9FAFB',
            borderStyle: 'dashed',
          }}
        >
          <Stack align="center" gap="md">
            <Box
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <IconUpload size={32} color="#6B7280" />
            </Box>
            <Text size="sm" c="gray.6" ta="center">
              Click to upload or drag and drop
            </Text>
          </Stack>
        </Paper>
      </Stack>

      {/* Form Fields */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack gap="md">
            <TextInput
              label="First name"
              placeholder="Enter your first name"
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                  },
                },
              }}
            />
            
            <TextInput
              label="Email address"
              placeholder="Enter your email"
              leftSection={<IconMail size={16} color="#6B7280" />}
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                  },
                },
              }}
            />
            
            <Box>
              <Text size="sm" fw={500} c="gray.9" mb="xs">
                My Country
              </Text>
              <Box
                style={{
                  display: 'flex',
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                }}
              >
                <Select
                  placeholder="Select country"
                  data={[
                    { value: 'usa', label: '🇺🇸 USA' },
                    { value: 'canada', label: '🇨🇦 Canada' },
                    { value: 'france', label: '🇫🇷 France' },
                    { value: 'uk', label: '🇬🇧 United Kingdom' },
                    { value: 'germany', label: '🇩🇪 Germany' },
                  ]}
                  defaultValue="usa"
                  size="md"
                  styles={{
                    input: {
                      border: 'none',
                      borderRadius: 0,
                    },
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack gap="md">
            <TextInput
              label="Last name"
              placeholder="Enter your last name"
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                  },
                },
              }}
            />
            
            <Box>
              <Text size="sm" fw={500} c="gray.9" mb="xs">
                Phone no (optional)
              </Text>
              <Box
                style={{
                  display: 'flex',
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                }}
              >
                <CountryPicker
                  value="+1"
                  onChange={() => {}}
                />
                <Box style={{ width: '1px', backgroundColor: '#E5E7EB' }} />
                <TextInput
                  placeholder="Phone no"
                  radius="md"
                  size="md"
                  styles={{
                    input: {
                      border: 'none',
                      borderRadius: 0,
                    },
                  }}
                />
              </Box>
            </Box>
            
            <TextInput
              label="Zip/Postal Code (Optional)"
              placeholder="Enter postal code"
              defaultValue="95624"
              size="md"
              radius="md"
              styles={{
                input: {
                  border: '1px solid #E5E7EB',
                  '&:focus': {
                    borderColor: 'var(--mantine-color-brand-8)',
                  },
                },
              }}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Save Button */}
      <Group justify="flex-end">
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
          Save
        </Button>
      </Group>
    </Stack>
  );
}
