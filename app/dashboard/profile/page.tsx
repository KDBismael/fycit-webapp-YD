'use client';

import React from 'react';
import { Box, Tabs } from '@mantine/core';
import GuildsTab from '@/components/ProfileTabs/GuildsTab';
import MyInfoTab from '@/components/ProfileTabs/MyInfoTab';
import EventLocalesTab from '../../../components/ProfileTabs/EventLocalesTab';

export default function ProfilePage() {
  return (
    <Tabs defaultValue="event-locales" color="brand">
      <Tabs.List>
        <Tabs.Tab value="event-locales">Event locales</Tabs.Tab>
        <Tabs.Tab value="guilds">Guilds</Tabs.Tab>
        <Tabs.Tab value="my-info">My info</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="event-locales" pt="lg">
        <Box style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
          <EventLocalesTab />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="guilds" pt="lg">
        <Box style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
          <GuildsTab />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="my-info" pt="lg">
        <Box style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
          <MyInfoTab />
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
}
