'use client';

import React from 'react';
import { Box, Card, Group, Image, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconMapPin, IconCalendar, IconClock } from '@tabler/icons-react';

export interface EventCardProps {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  image: string;
  imageAlt: string;
}

export default function EventCard({
  title,
  description,
  location,
  date,
  time,
  image,
  imageAlt
}: EventCardProps) {
  return (
    <Card
      shadow="sm"
      padding={0}
      radius="lg"
      style={{
        backgroundColor: 'white',
        border: 'none',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      {/* Image Section */}
      <Box style={{ position: 'relative', height: '200px' }}>
        <Image
          src={image}
          alt={imageAlt}
          radius="lg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>

      {/* Content Section */}
      <Stack gap="md" p="lg" style={{ flex: 1 }}>
        <Text size="lg" fw={700} c="gray.9">
          {title}
        </Text>
        <Text size="sm" c="gray.6" style={{ lineHeight: 1.4 }}>
          {description}
        </Text>
        
        <Stack gap="xs">
          <Group gap="sm" align="center">
            <ThemeIcon size={16} color="gray.6" variant="transparent">
              <IconMapPin size={12} />
            </ThemeIcon>
            <Text size="sm" c="gray.7">
              {location}
            </Text>
          </Group>
          
          <Group gap="sm" align="center">
            <ThemeIcon size={16} color="gray.6" variant="transparent">
              <IconCalendar size={12} />
            </ThemeIcon>
            <Text size="sm" c="gray.7">
              {date}
            </Text>
          </Group>
          
          <Group gap="sm" align="center">
            <ThemeIcon size={16} color="gray.6" variant="transparent">
              <IconClock size={12} />
            </ThemeIcon>
            <Text size="sm" c="gray.7">
              {time}
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
