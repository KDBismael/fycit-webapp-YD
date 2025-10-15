'use client';

import React from 'react';
import { Checkbox, Group, MultiSelect, Text } from '@mantine/core';

interface LocaleItem {
  value: string;
  label: string;
  level: number; // 0: grand group, 1: sub-group, 2: sub-sub-group
  group?: string; // parent group name for grouping
}

interface EventLocalesSelectorProps {
  value?: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
}

const localesData: LocaleItem[] = [
  // Grand Group: North America (header)
  { value: 'north-america', label: 'North America', level: 0 },

  // Sub-group: LA Area (header)
  { value: 'la-area', label: 'LA Area', level: 1, group: 'north-america' },
  { value: 'los-angeles', label: 'Los Angeles', level: 2, group: 'la-area' },
  { value: 'orange-county', label: 'Orange County', level: 2, group: 'la-area' },
  { value: 'palm-springs', label: 'Palm Springs', level: 2, group: 'la-area' },
  { value: 'santa-barbara-ojai', label: 'Santa Barbara & Ojai', level: 2, group: 'la-area' },

  // Sub-group: San Francisco (no children - displayed as selectable)
  { value: 'san-francisco', label: 'San Francisco', level: 1, group: 'north-america' },

  // Sub-group: NY Area (header)
  { value: 'ny-area', label: 'NY Area', level: 1, group: 'north-america' },
  { value: 'new-york-city', label: 'New York City', level: 2, group: 'ny-area' },
  { value: 'hamptons-long-island', label: 'Hamptons & Long Island', level: 2, group: 'ny-area' },
  { value: 'hudson-valley', label: 'Hudson Valley', level: 2, group: 'ny-area' },
  { value: 'new-jersey', label: 'New Jersey', level: 2, group: 'ny-area' },

  // Other cities (level 1 - no children)
  { value: 'aspen', label: 'Aspen', level: 1, group: 'north-america' },
  { value: 'atlanta', label: 'Atlanta', level: 1, group: 'north-america' },
  { value: 'austin', label: 'Austin', level: 1, group: 'north-america' },
  { value: 'boston', label: 'Boston', level: 1, group: 'north-america' },
];

// Convert to MultiSelect data format
const multiSelectData = localesData.map((locale) => ({
  value: locale.value,
  label: locale.label,
}));

export const EventLocalesSelector: React.FC<EventLocalesSelectorProps> = ({
  value = [],
  onChange,
  error,
  placeholder = 'Select locales',
}) => {
  // Helper function to get all children recursively
  const getAllChildren = (parentValue: string): string[] => {
    const directChildren = localesData
      .filter((item) => item.group === parentValue)
      .map((item) => item.value);

    const allDescendants = directChildren.flatMap((child) => [child, ...getAllChildren(child)]);

    return allDescendants;
  };

  // Custom onChange handler with cascading selection logic
  const handleChange = (selectedValues: string[]) => {
    const newValues = new Set(selectedValues);
    const previousValues = new Set(value);

    // Find what was added or removed
    const added = selectedValues.find((v) => !previousValues.has(v));
    const removed = Array.from(previousValues).find((v) => !newValues.has(v));

    if (added) {
      // If a parent was selected, select all its children recursively
      const children = getAllChildren(added);
      children.forEach((child) => newValues.add(child));
    }

    if (removed) {
      // If a parent was deselected, deselect all its children recursively
      const children = getAllChildren(removed);
      children.forEach((child) => newValues.delete(child));
    }

    onChange(Array.from(newValues));
  };

  return (
    <MultiSelect
      value={value}
      onChange={handleChange}
      data={multiSelectData}
      placeholder={placeholder}
      error={error}
      radius="md"
      size="md"
      searchable
      clearable
      withCheckIcon={false}
      hidePickedOptions={false}
      nothingFoundMessage="No locale found"
      renderOption={({ option, checked }) => {
        const locale = localesData.find((l) => l.value === option.value);

        return (
          <Group
            gap="sm"
            wrap="nowrap"
            style={{
              paddingLeft: `${(locale?.level || 0) * 20}px`,
            }}
          >
            <Checkbox checked={checked} onChange={() => {}} tabIndex={-1} color="green" />
            <Text>{option.label}</Text>
          </Group>
        );
      }}
      styles={{
        input: {
          borderColor: 'var(--mantine-color-gray-3)',
          '&:focus': {
            borderColor: '#A98D34',
          },
        },
        dropdown: {
          backgroundColor: '#ECECB8',
        },
        option: {
          backgroundColor: 'transparent',
          '&[data-checked]': {
            backgroundColor: 'rgba(169, 141, 52, 0.1)',
          },
          '&:hover': {
            backgroundColor: 'rgba(169, 141, 52, 0.15)',
          },
        },
        pill: {
          backgroundColor: '#A98D34',
          color: 'white',
          border: 'none',
          '&:hover': {
            backgroundColor: '#A98D34',
          },
        },
      }}
    />
  );
};
