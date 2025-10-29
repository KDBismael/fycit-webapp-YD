'use client';

import GuildsTab from '@/components/ProfileTabs/GuildsTab';
import MyInfoTab from '@/components/ProfileTabs/MyInfoTab';
import { Box, Tabs } from '@mantine/core';
import EventLocalesTab from '../../../components/ProfileTabs/EventLocalesTab';
import classes from './ProfileTabs.module.css';

export default function ProfilePage() {
  return (
    <Tabs
      defaultValue="my-info"
      color="brand"
      classNames={{
        root: classes.root,
        list: classes.list,
        tab: classes.tab,
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="my-info">My info</Tabs.Tab>
        <Tabs.Tab value="event-locales">Event locales</Tabs.Tab>
        <Tabs.Tab value="guilds">Voting Groups</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="event-locales" pt="lg">
        <Box style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          <EventLocalesTab />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="guilds" pt="lg">
        <Box style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          <GuildsTab />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="my-info" pt="lg">
        <Box style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          <MyInfoTab />
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
}
