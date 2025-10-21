'use client';

import React, { useState } from 'react';
import { Box, Checkbox, Group, Paper, Stack, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export interface Guild {
  id: string;
  name: string;
  fullName: string;
}

interface GuildEditorProps {
  value?: string[];
  onChange: (value: string[]) => void;
  mode?: 'list' | 'summary';
  onEditClick?: () => void;
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
  mode = 'list',
  onEditClick,
}) => {
  const handleToggleGuild = (guildValue: string) => {
    if (value.includes(guildValue)) {
      onChange(value.filter((v) => v !== guildValue));
    } else {
      onChange([...value, guildValue]);
    }
  };

  const getGuildLabel = (guildValue: string) => {
    const guild = guildOptions.find((g) => g.value === guildValue);
    return guild ? guild.label : guildValue;
  };

  // Mode 1: Liste scrollable (pour le modal "Choose your guilds")
  if (mode === 'list') {
    return (
      <Box
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          backgroundColor: '#FEFBF3',
          borderRadius: '8px',
          padding: '16px',
        }}
      >
        <Stack gap="sm">
          {guildOptions.map((guild) => {
            const isSelected = value.includes(guild.value);
            return (
              <Group
                key={guild.value}
                gap="sm"
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(169, 141, 52, 0.1)',
                  },
                }}
                onClick={() => handleToggleGuild(guild.value)}
              >
                <Box
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #D1D5DB',
                    backgroundColor: isSelected ? '#22C55E' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isSelected && <IconCheck size={12} color="white" />}
                </Box>
                <Text
                  size="sm"
                  c={isSelected ? 'dark' : 'gray.6'}
                  fw={isSelected ? 500 : 400}
                  style={{ flex: 1 }}
                >
                  {guild.label}
                </Text>
              </Group>
            );
          })}
        </Stack>
      </Box>
    );
  }

  // Mode 2: Card de résumé (pour affichage)
  return (
    <Paper
      shadow="sm"
      radius="md"
      p="md"
      style={{
        backgroundColor: '#FFFFF8',
        border: '1px solid #FDE68A',
      }}
    >
      <Stack gap="sm">
        <Text size="lg" fw={700} c="gray.9">
          Your selected guilds
        </Text>
        <Box
          style={{
            height: '1px',
            backgroundColor: '#E5E7EB',
            width: '100%',
          }}
        />
        {value.length > 0 ? (
          <Stack gap="xs">
            {value.map((guildValue) => (
              <Text key={guildValue} size="sm" c="gray.7">
                {getGuildLabel(guildValue)}
              </Text>
            ))}
          </Stack>
        ) : (
          <Text size="sm" c="gray.5">
            No guilds selected
          </Text>
        )}
        <Text
          size="sm"
          c="blue.6"
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            alignSelf: 'flex-start',
          }}
          onClick={onEditClick}
        >
          Edit guild
        </Text>
      </Stack>
    </Paper>
  );
};

