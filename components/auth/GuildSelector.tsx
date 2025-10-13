'use client';

import { Select } from '@mantine/core';
import React from 'react';

interface GuildOption {
  value: string;
  label: string;
}

interface GuildSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  data: GuildOption[];
}

const guildOptions: GuildOption[] = [
  { value: 'AMPAS', label: 'AMPAS - Motion Picture Academy' },
  { value: 'ADG', label: 'ADG - Art Directors Guild' },
  { value: 'ASC', label: 'ASC - American Society of Cinematographers' },
  { value: 'ASIFA', label: 'ASIFA - International Animated Film Association' },
  { value: 'WGA', label: 'WGA - Writers Guild of America' },
  { value: 'SAG', label: 'SAG - Screen Actors Guild' },
  { value: 'DGA', label: 'DGA - Directors Guild of America' },
];

export const GuildSelector: React.FC<GuildSelectorProps> = ({
  value,
  onChange,
  error,
  placeholder = 'Select a guild',
  data = guildOptions,
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      data={data}
      placeholder={placeholder}
      error={error}
      radius="md"
      size="md"
      searchable
      nothingFoundMessage="No guild found"
      styles={{
        input: {
          borderColor: 'var(--mantine-color-gray-3)',
          '&:focus': {
            borderColor: 'var(--mantine-color-brand-8)',
          },
        },
      }}
    />
  );
};
