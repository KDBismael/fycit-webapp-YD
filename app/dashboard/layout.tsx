'use client';

import { signOutUser } from '@/firebase/auth';
import { useUserStore } from '@/stores/userStore';
import {
  AppShell,
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Group,
  Image,
  NavLink,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandApple,
  IconBrandGooglePlay,
  IconDashboard,
  // IconHeart,
  IconLogout,
  IconNews,
  IconShieldCheck,
  IconUser,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const getPageTitle = (pathname: string) => {
  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/verification': 'Verifications',
    '/dashboard/profile': 'Profile',
    '/dashboard/news': 'FYCit News',
    // '/dashboard/favorites': 'Favorites',
  };
  return titles[pathname] || 'Dashboard';
};

const navigationItems = [
  { label: 'Dashboard', icon: IconDashboard, href: '/dashboard' },
  { label: 'Profile', icon: IconUser, href: '/dashboard/profile' },
  { label: 'Verifications', icon: IconShieldCheck, href: '/dashboard/verification' },
  { label: 'FYCit News', icon: IconNews, href: '/dashboard/news' },
  // { label: 'Favorites', icon: IconHeart, href: '/dashboard/favorites' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOutUser();
    localStorage.clear();
    router.push('/auth/login');
  }
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="md">
            <Image
              src="/logo.svg"
              alt="FYCit Logo"
              h="100%"
              w="auto"
              fit="contain"
              style={{ maxHeight: '40px' }}
            />
            <Text size="xl" fw={700} c="gray.9">
              {getPageTitle(pathname)}
            </Text>
          </Group>
          <Group gap="sm">
            <Avatar size="sm" src={user?.profilePhotoURL ?? ''} alt="User profile" />
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="lg" h="100%">
          <Divider size="xs" color="gray.1" style={{ opacity: 0.3 }} />

          {/* Navigation */}
          <Stack gap="xs">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                leftSection={<item.icon size={20} stroke={1.5} />}
                onClick={() => router.push(item.href)}
                active={pathname === item.href}
                variant={pathname === item.href ? 'filled' : 'subtle'}
                color="brand"
                styles={{
                  root: {
                    borderRadius: 'var(--mantine-radius-md)',
                    padding: '12px 16px',
                    '&[dataActive]': {
                      fontWeight: 700,
                      '& .mantine-NavLink-label': {
                        fontWeight: 700,
                      },
                    },
                    '&:hover:not([dataActive])': {
                      backgroundColor: 'var(--mantine-color-gray-0)',
                    },
                  },
                }}
              />
            ))}
          </Stack>

          <Divider size="xs" color="gray.1" style={{ opacity: 0.3 }} />

          {/* Logout */}
          <NavLink
            href="/auth/login"
            label="Log out"
            leftSection={<IconLogout size={20} stroke={1.5} />}
            onClick={handleSignOut}
            styles={{
              root: {
                borderRadius: 'var(--mantine-radius-md)',
                padding: '12px 16px',
                color: 'var(--mantine-color-gray-7)',
                '&:hover': {
                  backgroundColor: 'var(--mantine-color-gray-0)',
                },
              },
            }}
          />

          {/* App download section */}
          <Box
            mt="auto"
            p="md"
            style={{
              backgroundColor: '#FEF3C7',
              borderRadius: 'var(--mantine-radius-md)',
              border: '1px solid #FDE68A',
            }}
          >
            <Text size="sm" fw={500} mb="sm" c="gray.8" ta="center">
              Get the FYCit app here
            </Text>
            <Stack gap="xs">
              <Button
                variant="outline"
                leftSection={<IconBrandGooglePlay size={16} />}
                size="sm"
                fullWidth
                styles={{
                  root: {
                    backgroundColor: 'white',
                    borderColor: 'var(--mantine-color-gray-3)',
                    color: 'var(--mantine-color-gray-7)',
                    '&:hover': {
                      backgroundColor: 'var(--mantine-color-gray-0)',
                    },
                  },
                }}
              >
                Google play
              </Button>
              <Button
                variant="outline"
                leftSection={<IconBrandApple size={16} />}
                size="sm"
                fullWidth
                styles={{
                  root: {
                    backgroundColor: 'white',
                    borderColor: 'var(--mantine-color-gray-3)',
                    color: 'var(--mantine-color-gray-7)',
                    '&:hover': {
                      backgroundColor: 'var(--mantine-color-gray-0)',
                    },
                  },
                }}
              >
                Apple store
              </Button>
            </Stack>
          </Box>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">{children}</AppShell.Main>
    </AppShell>
  );
}
