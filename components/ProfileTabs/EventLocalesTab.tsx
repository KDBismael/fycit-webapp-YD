'use client';

import { updateUserInfo } from '@/firebase/user';
import { useLocalesStore } from '@/stores/localesStore';
import { useUserStore } from '@/stores/userStore';
import { UsersType } from '@/types/collections';
import { Alert, Button, Checkbox, Group, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { EventLocalesSelector } from '../auth/EventLocalesSelector';

export default function EventLocalesTab() {
  const { user, setUser } = useUserStore()
  const { locales } = useLocalesStore();
  const [selectedLocales, setSelectedLocales] = useState<string[]>([]);
  const [autoViewNewLocales, setAutoViewNewLocales] = useState(user?.userSettings.automaticallyViewNewLocales ?? false);
  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    setIsLoading(true)
    const userData: Partial<UsersType> = {
      locale: selectedLocales,
      userSettings: {
        ...user!.userSettings,
        automaticallyViewNewLocales: autoViewNewLocales ?? false,
      }
    }
    await updateUserInfo(userData);
    setUser({ ...user, ...userData } as UsersType);
    setIsLoading(false)
  }

  useEffect(() => {
    if (user) {
      setSelectedLocales(user?.locale as [] ?? [])
      setAutoViewNewLocales(user.userSettings.automaticallyViewNewLocales)
    }
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

        <Group>
          <Button
            loading={isLoading}
            disabled={user?.locale == selectedLocales && autoViewNewLocales == (user?.userSettings.automaticallyViewNewLocales ?? false)}
            size="md"
            radius="md"
            onClick={onSave}
            style={{
              marginLeft: 'auto',
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
    </Stack>
  );
}
