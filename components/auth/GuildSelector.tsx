'use client';

import React from 'react';
import { MultiSelect } from '@mantine/core';

export interface Guild {
  id: string;
  name: string;
  fullName: string;
  isVerifiable: boolean;
}

interface GuildOption {
  value: string;
  label: string;
}

interface GuildSelectorProps {
  value?: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
  data?: GuildOption[];
}

const guildOptions: GuildOption[] = [
  { value: 'AMPAS', label: 'AMPAS - Motion Picture Academy' },
  { value: 'ADG', label: 'ADG - Art Directors Guild' },
  { value: 'ASC', label: 'ASC - American Society of Cinematographers' },
  { value: 'ASIFA', label: 'ASIFA - International Animated Film Association' },
  { value: 'WGA', label: 'WGA - Writers Guild of America' },
  { value: 'SAG', label: 'SAG - Screen Actors Guild' },
  { value: 'DGA', label: 'DGA - Directors Guild of America' },
  { value: 'ACE', label: 'ACE - American Cinema Editors' },
  { value: 'CDG', label: 'CDG - Costume Designers Guild' },
  { value: 'MPEG', label: 'MPEG - Motion Picture Editors Guild' },
  { value: 'PGA', label: 'PGA - Producers Guild of America' },
  { value: 'CAS', label: 'CAS - Cinema Audio Society' },
];

export const GuildSelector: React.FC<GuildSelectorProps> = ({
  value = [],
  onChange,
  error,
  placeholder = 'Select guilds',
  data = guildOptions,
}) => {
  return (
    <MultiSelect
      value={value}
      onChange={onChange}
      data={data}
      placeholder={placeholder}
      error={error}
      radius="md"
      size="md"
      searchable
      clearable
      checkIconPosition="left"
      withCheckIcon
      hidePickedOptions={false}
      nothingFoundMessage="No guild found"
      styles={{
        input: {
          borderColor: 'var(--mantine-color-gray-3)',
          '&:focus': {
            borderColor: '#A98D34',
          },
        },
        option: {
          '&[data-checked]': {
            backgroundColor: '#D4B75C',
            color: 'white',
            '&:hover': {
              backgroundColor: '#A98D34',
            },
          },
          '&[data-selected]': {
            backgroundColor: '#D4B75C',
            color: 'white',
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
