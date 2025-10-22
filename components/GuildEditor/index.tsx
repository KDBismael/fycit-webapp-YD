'use client';

import React from 'react';
import { Box, Checkbox, Group, Paper, Stack, Text } from '@mantine/core';
import classes from './GuildEditor.module.css'; // Assurez-vous d'avoir ce fichier CSS/module

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
  showSelectedGuild?: boolean;
  // isEditing n'est plus utilisé de manière complexe dans le mode summary
}

const guildOptions = [
  // J'ai mis à jour la liste pour inclure AMPAS et ACE (American Cinema Editors)
  { value: 'AMPAS', label: 'AMPAS - Motion Picture Academy' },
  { value: 'ACE', label: 'AMPAS - American Cinema Editors' }, // Basé sur l'image 1
  { value: 'ADG', label: 'ADG - Art Directors Guild' },
  { value: 'ASC', label: 'ASC - American Society of Cinematographers' },
  { value: 'ASIFA', label: 'ASIFA - International Animated Film Association' },
  { value: 'AG', label: 'Animation Guild' }, // Ajouté comme option basée sur l'image 1
  { value: 'WGA', label: 'WGA - Writers Guild of America' },
  { value: 'SAG', label: 'SAG - Screen Actors Guild' },
  { value: 'DGA', label: 'DGA - Directors Guild of America' },
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
  showSelectedGuild = true,
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

  // Mode 1: Liste scrollable ("Choose your guilds") - Basé sur l'Image 1
  if (mode === 'list') {
    return (
      <Box
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          // Fond crème doux et coins arrondis, similaire à l'image 1
          backgroundColor: '#FFFBF5', // Couleur légèrement plus pâle pour le fond
          borderRadius: '16px',
          padding: '24px 20px',
          border: '1px solid #E5E7EB', // Bordure légère
        }}
        className={classes.guildEditorScroll}
      >
        <Text size="xl" fw={700} ta="center" mb="xs">
          Choose your guilds
        </Text>
        <Text size="sm" ta="center" mb="lg" c="gray.6">
          Choose the guilds or organizations you are a member of:
        </Text>

        {/* L'interface dans l'image 1 suggère une barre de défilement stylisée pour le contenu */}
        <Box
          style={{
            maxHeight: 'calc(400px - 90px)', // Ajustez la hauteur max pour le contenu
            overflowY: 'auto',
            paddingRight: '10px', // Espace pour la barre de défilement
          }}
          className={classes.customScrollbar} // Utilisez une classe pour styliser la scrollbar si nécessaire
        >
          <Stack gap="xs">
            {guildOptions.map((guild) => {
              const isSelected = value.includes(guild.value);
              return (
                <Group
                  key={guild.value}
                  gap="md"
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <Checkbox
                    onChange={() => handleToggleGuild(guild.value)}
                    checked={isSelected}
                    label={guild.label}
                    color="green"
                  />
                </Group>
              );
            })}
          </Stack>
        </Box>
      </Box>
    );
  }

  // Mode 2: Card de résumé ("Your selected guilds") - Basé sur l'Image 2
  return (
    <Paper
      radius="md"
      p="md"
      // Style de la carte basé sur l'Image 2 (fond très clair, bordure jaune-doré)
      style={{
        backgroundColor: '#FFFFF8', // Très blanc/crème
        border: '1px solid #FDE68A', // Bordure jaune-doré
      }}
    >
      <Stack gap="sm">
        <Text size="lg" ta="center" fw={700} c="dark">
          Your selected guilds
        </Text>
        {/* Séparateur basé sur l'Image 2 */}
        <Box
          style={{
            height: '1px',
            backgroundColor: '#FFEB8E', // Couleur de ligne plus jaune/pâle
            width: '100%',
          }}
        />
        {showSelectedGuild && (
          <>
            {value.length > 0 ? (
              <Stack gap="xs">
                {value.map((guildValue) => (
                  // Affichage des noms complets des guildes sélectionnées
                  <Text key={guildValue} size="md" c="dark" fw={400}>
                    {getGuildLabel(guildValue)}
                  </Text>
                ))}
              </Stack>
            ) : (
              <Text size="md" c="gray.5">
                No guilds selected
              </Text>
            )}
          </>
        )}
        {/* Lien pour éditer, basé sur l'Image 2 */}
        <Text
          size="sm"
          c="dark" // Couleur de texte par défaut, ou une couleur de lien si vous préférez
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            alignSelf: 'center',
            paddingTop: '5px', // Espace au-dessus du lien
          }}
          onClick={onEditClick}
        >
          Edit guild
        </Text>
      </Stack>
    </Paper>
  );
};
