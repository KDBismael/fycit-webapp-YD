'use client';

import React, { useState } from 'react';
import { IconInfoCircle, IconPlus, IconX } from '@tabler/icons-react';
import { ActionIcon, Alert, Box, Checkbox, Group, Select, Stack, Text } from '@mantine/core';

export default function EventLocalesTab() {
  const [selectedLocales, setSelectedLocales] = useState<string[]>(['los-angeles']);
  const [autoViewNewLocales, setAutoViewNewLocales] = useState(false);

  const availableLocales = [
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'london', label: 'London, UK' },
    { value: 'paris', label: 'Paris, France' },
    { value: 'tokyo', label: 'Tokyo, Japan' },
    { value: 'berlin', label: 'Berlin, Germany' },
    { value: 'sydney', label: 'Sydney, Australia' },
    { value: 'toronto', label: 'Toronto, Canada' },
  ];

  const handleAddLocale = (localeValue: string | null) => {
    if (localeValue && !selectedLocales.includes(localeValue)) {
      setSelectedLocales([...selectedLocales, localeValue]);
    }
  };

  const handleRemoveLocale = (localeValue: string) => {
    setSelectedLocales(selectedLocales.filter((locale) => locale !== localeValue));
  };

  const getLocaleLabel = (value: string) => {
    const locale = availableLocales.find((l) => l.value === value);
    return locale ? locale.label : value;
  };

  const remainingLocales = availableLocales.filter(
    (locale) => !selectedLocales.includes(locale.value)
  );

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

        {/* Selected Locales Pills */}
        <Box>
          <Group gap="sm" wrap="wrap">
            {selectedLocales.map((locale) => (
              <Box
                key={locale}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#BAAD3E',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '8px 12px 8px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: 'none',
                }}
              >
                <Text size="sm" c="white" fw={500}>
                  {getLocaleLabel(locale)}
                </Text>
                <ActionIcon
                  size="xs"
                  color="white"
                  variant="transparent"
                  onClick={() => handleRemoveLocale(locale)}
                  style={{ marginLeft: '8px' }}
                >
                  <IconX size={12} />
                </ActionIcon>
              </Box>
            ))}

            {/* Add Locale Select */}
            {remainingLocales.length > 0 && (
              <Select
                placeholder="Add locale"
                data={remainingLocales}
                value={null}
                onChange={handleAddLocale}
                size="md"
                radius="md"
                styles={{
                  input: {
                    border: '2px dashed #D1D5DB',
                    backgroundColor: 'transparent',
                    color: '#6B7280',
                    minWidth: '120px',
                    '&:focus': {
                      borderColor: '#BAAD3E',
                      backgroundColor: '#F9FAFB',
                    },
                  },
                  dropdown: {
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  },
                  option: {
                    fontSize: '14px',
                    color: '#374151',
                    padding: '8px 12px',
                    '&:hover': {
                      backgroundColor: '#F9FAFB',
                    },
                  },
                }}
                leftSection={<IconPlus size={16} />}
              />
            )}
          </Group>
        </Box>

        {/* Auto View New Locales Checkbox */}
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
