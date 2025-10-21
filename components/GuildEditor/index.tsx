'use client';

import React, { useState } from 'react';
import { ActionIcon, Box, Checkbox, Group, Select, Stack, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export interface Guild {
  id: string;
  name: string;
  fullName: string;
}

interface GuildEditorProps {
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

const guildOptions = [
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

export const GuildEditor: React.FC<GuildEditorProps> = ({
  value = [],
  onChange,
  placeholder = 'Select guild',
}) => {
  const [selectValue, setSelectValue] = useState<string | null>(null);

  const handleAddGuild = (guildValue: string | null) => {
    if (guildValue && !value.includes(guildValue)) {
      onChange([...value, guildValue]);
      setSelectValue(null);
    }
  };

  const handleRemoveGuild = (guildValue: string) => {
    onChange(value.filter((v) => v !== guildValue));
  };

  const getGuildLabel = (guildValue: string) => {
    const guild = guildOptions.find((g) => g.value === guildValue);
    return guild ? guild.label : guildValue;
  };

  const availableGuilds = guildOptions.filter((guild) => !value.includes(guild.value));

  return (
    <Stack gap="md">
      {value.length > 0 && (
        <Box>
          <Group gap="sm" style={{ flexWrap: 'wrap' }}>
            {value.map((guildValue) => (
              <Box
                key={guildValue}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#A98D34',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '8px 12px 8px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                <Text size="sm" c="white" fw={500}>
                  {getGuildLabel(guildValue)}
                </Text>
                <ActionIcon
                  size="xs"
                  color="white"
                  variant="transparent"
                  onClick={() => handleRemoveGuild(guildValue)}
                  style={{ marginLeft: '8px' }}
                >
                  <IconX size={12} />
                </ActionIcon>
              </Box>
            ))}
          </Group>
        </Box>
      )}

      {availableGuilds.length > 0 && (
        <Select
          placeholder={placeholder}
          data={availableGuilds}
          value={selectValue}
          onChange={handleAddGuild}
          radius="md"
          size="md"
          searchable
          clearable
          nothingFoundMessage="No guild found"
          renderOption={({ option }) => {
            return (
              <Group gap="sm" wrap="nowrap">
                <Checkbox
                  checked={false}
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
              '&:hover': {
                backgroundColor: 'rgba(169, 141, 52, 0.15)',
              },
              '&[data-combobox-selected]': {
                backgroundColor: 'rgba(169, 141, 52, 0.1)',
              },
            },
          }}
        />
      )}
    </Stack>
  );
};

