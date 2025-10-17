'use client';

import React from 'react';
import { Checkbox, Group, MultiSelect, Text } from '@mantine/core';

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
        withCheckIcon={false}
        hidePickedOptions={false}
        nothingFoundMessage="No guild found"
        renderOption={({ option }) => {
          const isChecked = value.includes(option.value);
          return (
            <Group gap="sm" wrap="nowrap">
              <Checkbox
                checked={isChecked}
                onChange={() => {}}
                tabIndex={-1}
                color="green"
              />
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
          pillsList: {
            flexWrap: 'wrap',
            maxWidth: '100%',
          },
        }}
      />
  );
};
