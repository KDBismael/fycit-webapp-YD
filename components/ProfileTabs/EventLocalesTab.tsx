'use client';

import React, { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { Alert, Checkbox, Stack, Text } from '@mantine/core';
import { EventLocalesSelector } from '../auth/EventLocalesSelector';

export default function EventLocalesTab() {
  const [selectedLocales, setSelectedLocales] = useState<string[]>(['los-angeles']);
  const [autoViewNewLocales, setAutoViewNewLocales] = useState(false);

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
        Please choose your preferred locale(s) and decide if you'd like to Automatically View Events
        in New Locales when they are added.
      </Alert>

      <Stack gap="md">
        <Text size="lg" fw={600} c="gray.9">
          Select the cities you want to follow to see screenings and events happening there. You'll
          only see events that take place in or near these locales.
        </Text>

        <EventLocalesSelector
          value={selectedLocales}
          onChange={setSelectedLocales}
          placeholder="Select locales"
        />

        <Checkbox
          label="Automatically View Events in Newly Added Locales"
          checked={autoViewNewLocales}
          onChange={(event) => setAutoViewNewLocales(event.currentTarget.checked)}
          size="md"
          styles={{
            label: {
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
            },
            input: {
              backgroundColor: '#F9FAFB',
              borderColor: '#D1D5DB',
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
