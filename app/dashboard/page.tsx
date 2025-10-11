'use client';

import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  List,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import GuildBadge from '../../components/GuildBadge';
import EventCard from '../../components/EventCard';
import { IconRosetteDiscountCheck } from '@tabler/icons-react';

const verificationBadges = [
  {
    name: 'AMPAS',
    status: 'verified' as const,
  },
  {
    name: 'ADG',
    status: 'pending' as const,
  },
  {
    name: 'ASIFA',
    status: 'pending' as const,
  },
  {
    name: 'ASC',
    status: 'rejected' as const,
  },
];

const recentEvents = [
  {
    title: 'Awards season starts here',
    description: 'FYCit is the number one smartphone app for awards voters and guild',
    location: 'San-francisco theater.',
    date: '12th July 2025.',
    time: '10.30 AM.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    imageAlt: 'Film Festival Awards Nomination'
  },
  {
    title: 'Awards season starts here',
    description: 'FYCit is the number one smartphone app for awards voters and guild',
    location: 'San-francisco theater.',
    date: '12th July 2025.',
    time: '10.30 AM.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    imageAlt: 'Film Awards Lorem Ipsum Dolor'
  },
  {
    title: 'Awards season starts here',
    description: 'FYCit is the number one smartphone app for awards voters and guild',
    location: 'San-francisco theater.',
    date: '12th July 2025.',
    time: '10.30 AM.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    imageAlt: 'Film Awards Nominations'
  }
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
              {/* Image Container */}
              <Box style={{ height: '100%', display: 'flex', alignItems: 'flex-start' }}>
                <Avatar
                  src="/images/profile-pic.png"
                  alt="Jane Cooper"
                  radius="md"
                  style={{
                    height: '100%',
                    width: 'auto',
                    aspectRatio: '1/1',
                    minHeight: '120px',
                  }}
                />
              </Box>

              {/* Content Container */}
              <Stack gap="md" style={{ flex: 1 }}>
                <Title order={2} size="h3" fw={700} c="gray.9">
                  Jane Cooper
                </Title>
                <Text size="md" c="gray.6" style={{ lineHeight: 1.4 }}>
                  23 Main Street
                  <br />
                  Los Angeles, California 90001
                  <br />
                  United States
                </Text>
                <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--mantine-spacing-md)', marginTop: 'var(--mantine-spacing-md)' }}>
                  {verificationBadges.map((badge) => (
                    <GuildBadge
                      key={badge.name}
                      name={badge.name}
                      status={badge.status}
                    />
                  ))}
                </Box>
              </Stack>
            </Group>
          </Card>

          {/* Key Benefits Card */}
          <Paper
            shadow="lg"
            withBorder
            radius="lg"
            p="xl"
            style={{
              backgroundColor: '#FFFFF8',
              position: 'relative',
              border: '1px solid #FDE68A',
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
            <List type="ordered" spacing="md" size="md">
              <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
                Gain Credibility Within the Community
              </List.Item>
              <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
                Access Guild or Organization Features
              </List.Item>
              <List.Item style={{ fontSize: '16px', fontWeight: 500 }}>
                Ensure Secure and Authentic Interactions
              </List.Item>
            </List>
          </Paper>

          {/* Verified Member Benefits Section */}
          <Box>
            <Text size="xl" fw={700} c="gray.9" mb="lg">
              Verified member benefits
            </Text>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
                  {/* Image Section - Same height as EventCard images */}
                  <Box style={{ position: 'relative', height: '200px' }}>
                    <Image
                      src="https://img7.yna.co.kr/mpic/YH/2022/03/31/MYH20220331019600038_P4.jpg"
                      alt="MovieMaker Magazine"
                      radius="lg"
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  
                  {/* Content Section */}
                  <Stack 
                    gap="md" 
                    p="lg" 
                    style={{ 
                      flex: 1,
                      justifyContent: 'center',
                      backgroundColor: 'white'
                    }}
                  >
                    <Text size="lg" fw={700} c="gray.9">
                      50% Discount on FYCit
                    </Text>
                    <Stack gap="xs">
                      <Group gap="sm" align="flex-start">
                        <ThemeIcon color="gray.4" size={16} radius="xl" style={{ backgroundColor: 'transparent' }}>
                          <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                        </ThemeIcon>
                        <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                          Lorem Ipsum is simply dummy text of the print.
                        </Text>
                      </Group>
                      <Group gap="sm" align="flex-start">
                        <ThemeIcon color="gray.4" size={16} radius="xl" style={{ backgroundColor: 'transparent' }}>
                          <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                        </ThemeIcon>
                        <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                          Lorem Ipsum is simply dummy text.
                        </Text>
                      </Group>
                      <Group gap="sm" align="flex-start">
                        <ThemeIcon color="gray.4" size={16} radius="xl" style={{ backgroundColor: 'transparent' }}>
                          <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                        </ThemeIcon>
                        <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                          Lorem Ipsum is simply dummy text of the print.
                        </Text>
                      </Group>
                    </Stack>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Recent Events Section */}
          <Box>
            <Text size="xl" fw={700} c="gray.9" mb="lg">
              Recent events
            </Text>
            <Grid>
              {recentEvents.map((event, index) => (
                <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
                  <EventCard
                    title={event.title}
                    description={event.description}
                    location={event.location}
                    date={event.date}
                    time={event.time}
                    image={event.image}
                    imageAlt={event.imageAlt}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
