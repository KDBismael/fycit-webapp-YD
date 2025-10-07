'use client';

import React from 'react';
import {
  Title,
  Card,
  Group,
  Text,
  Image,
  Badge,
  Stack,
  Button,
  Box,
  Avatar,
  List,
  ThemeIcon,
  Grid,
} from '@mantine/core';
import {
  IconCheck,
  IconCircle,
  IconCircleCheck,
  IconX,
} from '@tabler/icons-react';

const verificationBadges = [
  {
    name: 'AMPAS',
    status: 'verified',
    color: 'green',
    icon: IconCheck,
  },
  {
    name: 'ADG',
    status: 'pending',
    color: 'gray',
    icon: IconCircle,
  },
  {
    name: 'ASIFA',
    status: 'pending',
    color: 'yellow',
    icon: IconCircle,
  },
  {
    name: 'ASC',
    status: 'rejected',
    color: 'red',
    icon: IconX,
  },
];

export default function DashboardPage() {
  return (
    <Stack gap="lg">
      <Title order={1} size="h2" c="gray.9">
        Dashboard
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          {/* User Profile Card */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Group gap="md">
                <Avatar size="xl" src="/profile-jane.jpg" alt="Jane Cooper" />
                <Stack gap="xs">
                  <Text size="xl" fw={700} c="gray.9">
                    Jane Cooper
                  </Text>
                  <Text size="sm" c="gray.6">
                    23 Main Street, Los Angeles, California 90001, United States
                  </Text>
                  <Group gap="xs">
                    {verificationBadges.map((badge) => (
                      <Badge
                        key={badge.name}
                        leftSection={<badge.icon size={12} />}
                        color={badge.color}
                        variant="light"
                        size="sm"
                      >
                        {badge.name}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              </Group>
              <Image src="/logo.svg" alt="FYCit Logo" width={24} height={24} />
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            {/* Key Benefits Card */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Text size="lg" fw={600} c="gray.9">
                  Key benefits of profile verification
                </Text>
                <Button
                  size="sm"
                  bg="brand.8"
                  style={{
                    backgroundColor: '#BAAD3E',
                    '&:hover': {
                      backgroundColor: '#A98A13',
                    },
                  }}
                >
                  Start verification
                </Button>
              </Group>
              <List spacing="sm" size="sm">
                <List.Item
                  icon={
                    <ThemeIcon color="brand" size={20} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  Gain Credibility Within the Community
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="brand" size={20} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  Access Guild or Organization Features
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="brand" size={20} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  Ensure Secure and Authentic Interactions
                </List.Item>
              </List>
            </Card>

            {/* Verified Member Benefits Card */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="lg" fw={600} c="gray.9" mb="md">
                Verified member benefits
              </Text>
              <Box mb="md">
                <Image
                  src="/magazine-cover.jpg"
                  alt="MovieMaker Magazine"
                  radius="md"
                  style={{ maxWidth: '200px' }}
                />
              </Box>
              <Text size="sm" fw={500} c="gray.8" mb="sm">
                50% Discount on FYCit
              </Text>
              <List spacing="xs" size="sm">
                <List.Item
                  icon={
                    <ThemeIcon color="green" size={16} radius="xl">
                      <IconCheck size={10} />
                    </ThemeIcon>
                  }
                >
                  Lorem Ipsum is simply dummy text of the print.
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="green" size={16} radius="xl">
                      <IconCheck size={10} />
                    </ThemeIcon>
                  }
                >
                  Lorem Ipsum is simply dummy text of the print.
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="green" size={16} radius="xl">
                      <IconCheck size={10} />
                    </ThemeIcon>
                  }
                >
                  Lorem Ipsum is simply dummy text of the print.
                </List.Item>
              </List>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
