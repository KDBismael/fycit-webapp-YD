'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconRosetteDiscountCheck } from '@tabler/icons-react';
import GuildBadge from '../../components/GuildBadge';
import { StartVerificationCard } from '../../components/StartVerificationCard';
// J'ai renommé le fichier CSS en ProfileCard.module.css pour la cohérence
import { useGuildsStore } from '@/stores/guildsStore';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import classes from './Dashboard.module.css';

export function ProfileCardComponent() {
  const Navigation = useRouter()
  const { user } = useUserStore();
  const { guilds } = useGuildsStore()
  const userGuilds = guilds.filter((g) => user?.guild.includes(g.longName))
  const onEdit = () => {
    Navigation.push('/dashboard/profile')
  }
  return (
    <Card
      shadow="sm"
      radius="md"
      className={classes.profileCard} // Utilisation de la classe principale
      // Les styles statiques Mantine sont conservés, les styles dynamiques vont dans CSS
      p="xl"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #F0F0F0',
        overflow: 'hidden',
      }}
    >
      {/* Logo Desktop - Position absolue en haut à droite */}
      <Box className={classes.logoDesktop}>
        <Button onClick={onEdit}>Edit</Button>
      </Box>

      {/* Logo Mobile - Position absolue en haut à droite */}
      <Box className={classes.logoMobile}>
        <Button onClick={onEdit}>Edit</Button>
      </Box>

      {/* SECTION DU PROFIL (Avatar, Nom, Adresse) */}
      <Group
        className={classes.profileGroup}
        align="flex-start"
        wrap="nowrap"
      >
        {/* 1. Image Container */}
        <Box className={classes.avatarContainer}>
          <Avatar
            src={user?.profilePhotoURL ?? ''}
            alt={user?.firstName}
            radius="md"
            size="xl"
            className={classes.profileAvatar}
          />
        </Box>

        {/* 2. Content Container (Nom, Adresse) */}
        <Stack className={classes.profileContent} gap={4}>
          <Title
            order={2}
            className={classes.profileTitle}
          >
            {`${user?.firstName} ${user?.lastName}`}
          </Title>
          <Text
            c="gray.7"
            className={classes.profileAddress}
          >
            {`${user?.zipCode}`}
            {user?.zipCode && <br />}
            {`${user?.country}`}
          </Text>
        </Stack>
      </Group>

      {/* SECTION DES BADGES */}
      <Box className={classes.separator} />

      <Group
        gap="lg"
        wrap="wrap"
        className={classes.guildBadgesContainer}
      >
        <GuildBadge guilds={userGuilds} />
      </Group>

      {/* SECTION DES Locales */}
      <Box className={classes.separator} />
      <Group
        gap="lg"
        wrap="wrap"
        className={classes.guildBadgesContainer}
      >
        <Text size='lg'>
          {(user?.locale as string[]).join(", ")}
        </Text>
      </Group>

    </Card>
  );
}

// ... (le reste du composant DashboardPage est inchangé)
export default function DashboardPage() {

  return (
    <Box
      style={{
        minHeight: '100vh',
        padding: '2rem 0',
        position: 'relative',
      }}
    >
      <Container size="lg" px={{ base: 'md', sm: 'xl' }}>
        <Stack gap="xl">
          {/* User Profile Card */}
          <ProfileCardComponent />

          {/* Key Benefits Card */}
          <StartVerificationCard onStartVerification={() => { }} />

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
                    height: '100%',
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
                        objectFit: 'cover',
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
                      backgroundColor: 'white',
                    }}
                  >
                    <Text size="lg" fw={700} c="gray.9">
                      50% Discount on FYCit
                    </Text>
                    <Stack gap="xs">
                      <Group gap="sm" align="flex-start">
                        <ThemeIcon
                          color="gray.4"
                          size={16}
                          radius="xl"
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                        </ThemeIcon>
                        <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                          Lorem Ipsum is simply dummy text of the print.
                        </Text>
                      </Group>
                      <Group gap="sm" align="flex-start">
                        <ThemeIcon
                          color="gray.4"
                          size={16}
                          radius="xl"
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <IconRosetteDiscountCheck size={12} color="var(--mantine-color-gray-6)" />
                        </ThemeIcon>
                        <Text size="sm" c="gray.7" style={{ flex: 1 }}>
                          Lorem Ipsum is simply dummy text.
                        </Text>
                      </Group>
                      <Group gap="sm" align="flex-start">
                        <ThemeIcon
                          color="gray.4"
                          size={16}
                          radius="xl"
                          style={{ backgroundColor: 'transparent' }}
                        >
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
        </Stack>
      </Container>

      {/* <GuildVerificationModal
        opened={verificationModalOpened}
        onClose={closeVerificationModal}
        onNext={closeVerificationModal}
        verifiableGuilds={verifiableGuilds.map((badge) => ({
          id: badge.name,
          name: badge.name,
          fullName: `${badge.name} - Guild Name`,
          isVerifiable: true,
          isVerified: badge.status === 'verified',
        }))}
        notVerifiableGuilds={notVerifiableGuilds.map((badge) => ({
          id: badge.name,
          name: badge.name,
          fullName: `${badge.name} - Guild Name`,
          isVerifiable: false,
        }))}
        currentStep={1}
      /> */}
    </Box>
  );
}