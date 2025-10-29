'use client';

import { GuildsType } from '@/types/collections';
import { Checkbox, Group, MultiSelect, Text } from '@mantine/core';
import React from 'react';

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
  data: GuildsType[];
}


export const GuildSelector: React.FC<GuildSelectorProps> = ({
  value = [],
  onChange,
  error,
  placeholder = 'Select guilds',
  data,
}) => {
  return (
    <MultiSelect
      value={value}
      onChange={onChange}
      data={data?.map((g) => ({
        value: g.longName,
        label: g.longName,
      }))}
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
              onChange={() => { }}
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
          '&[dataChecked]': {
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
