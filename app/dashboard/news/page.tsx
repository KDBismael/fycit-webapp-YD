'use client';

import { useNewsStore } from '@/stores/news';
import { useUserStore } from '@/stores/userStore';
import { Box, Button, Container, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


export default function NewsPage() {
  const { user } = useUserStore();
  const { fetchNews, news } = useNewsStore();
  const [isSubscribing, setIsSubscribing] = useState(false);

  type MailChimpDataType = {
    firstName: string;
    lastName: string;
    email: string;
    locales: string[];
    guilds: string[];
    zipCode?: string;
    country?: string;
  };

  const handleSubscribe = async () => {
    if (!user) {
      notifications.show({
        color: 'red',
        message: 'Please sign in to subscribe to the newsletter.',
      });
      return;
    }

    const locales = Array.isArray(user.locale)
      ? user.locale
      : user.locale
        ? [user.locale]
        : [];

    const payload: MailChimpDataType = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      locales,
      guilds: user.guild ?? [],
      zipCode: user.zipCode || undefined,
      country: user.country || undefined,
    };

    setIsSubscribing(true);
    try {
      await axios.post('https://us-central1-fyc-dev-385a0.cloudfunctions.net/mailchimpSubscriptions', {
        data: payload,
      });
      notifications.show({
        color: 'green',
        message: 'Newsletter subscription updated.',
      });
    } catch (error) {
      notifications.show({
        color: 'red',
        message: 'Unable to subscribe right now. Please try again later.',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [])

  if (news.length < 1) return <Stack flex={1} style={{ height: '100%' }} justify='center' align='center'> <Loader /></Stack>
  return (
    <Container strategy='grid' >
      {/* Header with Newsletter Button */}
      <Group justify="space-between" align="center" mb={'xl'}>
        <Box>
          <Text size="xl" fw={700} c="gray.9" mb="xs">
            FYCit News
          </Text>
          <Text size="sm" c="gray.6">
            Stay up to date with the latest news from FYCit
          </Text>
        </Box>
        <Button
          onClick={handleSubscribe}
          loading={isSubscribing}
          style={{
            backgroundColor: '#BAAD3E',
            '&:hover': {
              backgroundColor: '#A98A13',
            },
          }}
        >
          Subscribe to Newsletter
        </Button>
      </Group>


      {/* News Grid - 3 per row */}
      <Container style={{ justifyContent: 'center', maxHeight: '95%', overflowY: 'auto' }}>
        {news.filter((n) => n.tag == 'published' && n.dataGroup.includes(user?.dataGroup ?? 'production')).sort((a, b) => b.dateAdded.seconds - a.dateAdded.seconds).map((n) => (
          <Stack key={n.id} style={{ backgroundColor: '#E4E0A2', borderRadius: '12px', padding: '10px 20px' }} mb={'md'}>
            <Title size={'27px'} ta={'center'}>{n.newsTitle}</Title>
            <ReactMarkdown
              components={{
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "contain",
                      display: "block",
                      margin: "10px auto"
                    }}
                    alt={props.alt || ""}
                  />
                ),
              }}
            >
              {n.newsContent?.replace(/\\n/g, "\n")}
            </ReactMarkdown>
          </Stack>
        ))}
      </Container>
    </Container>
  );
}
