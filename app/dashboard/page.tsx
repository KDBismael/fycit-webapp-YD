'use client';

import React from 'react';
import { IconCheck, IconCircle, IconX } from '@tabler/icons-react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Image,
  List,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';

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
    <Box
      style={{
        minHeight: '100vh',
        padding: '2rem 0',
        position: 'relative',
      }}
    >
      <Container size="lg">
        <Stack gap="xl">

          {/* User Profile Card */}
          <Card
            shadow="sm"
            padding="xl"
            radius="md"
            style={{
              backgroundColor: 'white',
              border: 'none',
              position: 'relative',
            }}
          >
            {/* Logo positioned absolutely in top right */}
            <Box
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
              }}
            >
              <Image src="/logo.svg" alt="FYCit Logo" width={40} height={40} fit="contain" />
            </Box>

            <Group gap="xl" align="flex-start">
              <Avatar size={120} src="/images/profile-pic.png" alt="Jane Cooper" radius="md" />
              <Stack gap="md" style={{ flex: 1 }}>
                <Text size="2xl" fw={700} c="gray.9">
                  Jane Cooper
                </Text>
                <Text size="md" c="gray.6" style={{ lineHeight: 1.4 }}>
                  23 Main Street
                  <br />
                  Los Angeles, California 90001
                  <br />
                  United States
                </Text>
                <Group gap="md" mt="md">
                  {verificationBadges.map((badge) => (
                    <Badge
                      key={badge.name}
                      leftSection={<badge.icon size={18} />}
                      color={badge.color}
                      variant="light"
                      size="xl"
                      style={{
                        borderRadius: '25px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      {badge.name}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            </Group>
          </Card>

          {/* Key Benefits Card */}
          <Card
            shadow="lg"
            padding="xl"
            radius="lg"
            style={{
              backgroundColor: '#f5f5f0',
              border: 'none',
            }}
          >
            <Group justify="space-between" mb="lg">
              <Text size="xl" fw={700} c="gray.9">
                Key benefits of profile verification
              </Text>
              <Button
                size="md"
                style={{
                  backgroundColor: '#BAAD3E',
                  borderRadius: '8px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#A98A13',
                  },
                }}
              >
                Start verification
              </Button>
            </Group>
            <List spacing="md" size="md">
              <List.Item
                icon={
                  <ThemeIcon color="brand" size={28} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
                style={{ fontSize: '16px', fontWeight: 500 }}
              >
                Gain Credibility Within the Community
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon color="brand" size={28} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
                style={{ fontSize: '16px', fontWeight: 500 }}
              >
                Access Guild or Organization Features
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon color="brand" size={28} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
                style={{ fontSize: '16px', fontWeight: 500 }}
              >
                Ensure Secure and Authentic Interactions
              </List.Item>
            </List>
          </Card>

          {/* Verified Member Benefits Section */}
          {/* <Box>
            <Text size="xl" fw={700} c="gray.9" mb="lg">
              Verified member benefits
            </Text>
            <Card 
              shadow="lg" 
              padding="xl" 
              radius="lg" 
              style={{ 
                backgroundColor: '#f5f5f0',
                border: 'none'
              }}
            >
              <Group gap="lg" align="flex-start">
                <Box>
                  <Image
                    src="/images/magazine-cover.jpg"
                    alt="MovieMaker Magazine"
                    radius="md"
                    style={{ 
                      maxWidth: '200px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                </Box>
                <Stack gap="md" style={{ flex: 1 }}>
                  <Text size="lg" fw={700} c="gray.9">
                    50% Discount on FYCit
                  </Text>
                  <List spacing="sm" size="sm">
                    <List.Item
                      icon={
                        <ThemeIcon color="green" size={24} radius="xl">
                          <IconCheck size={14} />
                        </ThemeIcon>
                      }
                    >
                      Lorem Ipsum is simply dummy text of the print.
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="green" size={24} radius="xl">
                          <IconCheck size={14} />
                        </ThemeIcon>
                      }
                    >
                      Lorem Ipsum is simply dummy text.
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="green" size={24} radius="xl">
                          <IconCheck size={14} />
                        </ThemeIcon>
                      }
                    >
                      Lorem Ipsum is simply dummy text of the print.
                    </List.Item>
                  </List>
                </Stack>
              </Group>
            </Card>
          </Box> */}
        </Stack>
      </Container>
    </Box>
  );
}
