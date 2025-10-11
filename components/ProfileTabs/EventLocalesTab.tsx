'use client';

import React from 'react';
import { Alert, Select, Stack, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export default function EventLocalesTab() {
  return (
    <Stack gap="lg">
      <Alert
        icon={<IconInfoCircle size={16} />}
        title="FYCit has gone global!"
        color="yellow"
        variant="light"
        styles={{
          root: {
            backgroundColor: '#FEF3C7',
            border: '1px solid #FCD34D',
          },
          title: {
            fontWeight: 700,
            color: '#92400E',
          },
          message: {
            color: '#92400E',
          },
        }}
      >
        Please choose your preferred locale(s) and decide if you'd like to Automatically View Events in New Locales when they are added.
      </Alert>

      <Stack gap="md">
        <Text size="lg" fw={600} c="gray.9">
          View events in these locals
        </Text>
        
        <Select
          placeholder="Select a locale"
          data={[
            { value: 'los-angeles', label: 'Los Angeles, CA' },
            { value: 'new-york', label: 'New York, NY' },
            { value: 'london', label: 'London, UK' },
            { value: 'paris', label: 'Paris, France' },
            { value: 'tokyo', label: 'Tokyo, Japan' },
          ]}
          defaultValue="los-angeles"
          size="md"
          radius="md"
          rightSection={<Text size="sm" c="gray.5">▼</Text>}
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
    </Stack>
  );
}
