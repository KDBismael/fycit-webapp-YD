'use client';

import { useLocalesStore } from '@/stores/localesStore';
import { useUserStore } from '@/stores/userStore';
import { Alert, Checkbox, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { EventLocalesSelector } from '../auth/EventLocalesSelector';

export default function EventLocalesTab() {
  const { user } = useUserStore()
  const { locales } = useLocalesStore();
  const [selectedLocales, setSelectedLocales] = useState<string[]>([]);
  const [autoViewNewLocales, setAutoViewNewLocales] = useState(user?.userSettings.automaticallyViewNewLocales ?? false);

  useEffect(() => {
    if (user)
      setSelectedLocales(user?.locale as [] ?? [])
  }, [user])

  return (
    <Stack gap="lg">
      <Alert
        title="FYCit has gone global!"
        color="yellow"
        variant="light"
        styles={{
          root: {
            backgroundColor: '#fef3c792',
            border: '1px solid #FCD34D',
          },
          title: {
            fontWeight: 700,
            color: 'black',
          },
          message: {
            color: 'black',
          },
        }}
      >
        Select the cities you want to follow to see screenings and events happening there. You’ll only see events that take place in or near these locales.
      </Alert>

      <Stack gap="md">
        <Text size="lg" fw={600} c="gray.9">
          View events in these locales
        </Text>

        <EventLocalesSelector
          value={selectedLocales}
          onChange={setSelectedLocales}
          data={locales}
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
          }}
        />
      </Stack>
    </Stack>
  );
}
