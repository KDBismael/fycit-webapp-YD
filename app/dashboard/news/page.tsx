'use client';

import React, { useState } from 'react';
import { Box, Card, Group, Image, Stack, Text, Badge, Button, TextInput, Grid, Avatar } from '@mantine/core';
import { IconSearch, IconCalendar } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import NewsletterModal from '../../../components/NewsletterModal';

const articles = [
  {
    id: 1,
    title: 'FYCit Expands to New Cities: London and Paris Now Available',
    excerpt: 'We are excited to announce that FYCit is now available in two new major cities. Members can now access exclusive screenings and events in London and Paris.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Announcement',
    date: '2 days ago',
    author: 'Thomas Dubois',
    authorAvatar: '/images/profile-pic.png',
  },
  {
    id: 2,
    title: 'New Guild Verification Process: Faster and More Secure',
    excerpt: 'We have streamlined our guild verification process to make it faster and more secure. Learn about the new features and improvements.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Update',
    date: '5 days ago',
    author: 'Marie Laurent',
    authorAvatar: '/images/profile-pic.png',
  },
  {
    id: 3,
    title: 'Upcoming Awards Season: Exclusive Screenings Schedule Released',
    excerpt: 'Get ready for the awards season! Check out our exclusive screening schedule for the most anticipated films of the year.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Events',
    date: '1 week ago',
    author: 'Albert Orion',
    authorAvatar: '/images/profile-pic.png',
  },
  {
    id: 4,
    title: 'Member Spotlight: How FYCit Changed My Career',
    excerpt: 'Read inspiring stories from our community members about how FYCit has impacted their careers in the entertainment industry.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Community',
    date: '2 weeks ago',
    author: 'Sarah Chen',
    authorAvatar: '/images/profile-pic.png',
  },
  {
    id: 5,
    title: 'Industry Trends: The Future of Entertainment Technology',
    excerpt: 'Explore the latest trends and innovations shaping the future of entertainment technology and how they impact our industry.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Technology',
    date: '3 weeks ago',
    author: 'David Miller',
    authorAvatar: '/images/profile-pic.png',
  },
  {
    id: 6,
    title: 'Behind the Scenes: Creating Memorable Event Experiences',
    excerpt: 'Discover the secrets behind creating unforgettable event experiences that keep our community coming back for more.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Behind the Scenes',
    date: '1 month ago',
    author: 'Emma Wilson',
    authorAvatar: '/images/profile-pic.png',
  },
  {
    id: 7,
    title: 'Community Guidelines: Building a Safe and Inclusive Space',
    excerpt: 'Learn about our updated community guidelines and how we work together to maintain a welcoming environment for all members.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Community',
    date: '1 month ago',
    author: 'Michael Brown',
    authorAvatar: '/images/profile-pic.png',
  },
  {
    id: 8,
    title: 'Partnership Announcement: New Collaborations in 2024',
    excerpt: 'We are thrilled to announce new partnerships that will bring even more exclusive content and opportunities to our members.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Partnerships',
    date: '1 month ago',
    author: 'Lisa Garcia',
    authorAvatar: '/images/profile-pic.png',
  },
  {
    id: 9,
    title: 'Success Stories: Members Making Their Mark in the Industry',
    excerpt: 'Celebrate the achievements of our community members who are making significant contributions to the entertainment industry.',
    image: 'https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg',
    category: 'Success Stories',
    date: '2 months ago',
    author: 'Alex Johnson',
    authorAvatar: '/images/profile-pic.png',
  },
];

const categories = ['All', 'Announcement', 'Update', 'Events', 'Community', 'Technology', 'Behind the Scenes', 'Partnerships', 'Success Stories'];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Announcement: 'blue',
    Update: 'green',
    Events: 'yellow',
    Community: 'pink',
    Technology: 'cyan',
    'Behind the Scenes': 'orange',
    Partnerships: 'purple',
    'Success Stories': 'teal',
  };
  return colors[category] || 'gray';
};

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterOpened, { open: openNewsletter, close: closeNewsletter }] = useDisclosure(false);

  return (
    <Stack gap="xl">
      {/* Header with Newsletter Button */}
      <Group justify="space-between" align="center">
        <Box>
          <Text size="xl" fw={700} c="gray.9" mb="xs">
            FYCit News & Updates
          </Text>
          <Text size="sm" c="gray.6">
            Stay up to date with the latest news, announcements, and updates from FYCit
          </Text>
        </Box>
        <Button
          onClick={openNewsletter}
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

      {/* Search and Filters */}
      <Stack gap="md">
        <TextInput
          placeholder="Search articles..."
          leftSection={<IconSearch size={16} />}
          size="md"
          radius="md"
          styles={{
            input: {
              border: '1px solid #E5E7EB',
              backgroundColor: 'white',
            },
          }}
        />

        <Group gap="xs" wrap="wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "filled" : "outline"}
              size="sm"
              radius="xl"
              onClick={() => setSelectedCategory(category)}
              style={{
                backgroundColor: selectedCategory === category ? '#BAAD3E' : 'transparent',
                borderColor: '#BAAD3E',
                color: selectedCategory === category ? 'white' : '#BAAD3E',
              }}
            >
              {category}
            </Button>
          ))}
        </Group>
      </Stack>

      {/* Articles Grid - 3 per row */}
      <Grid gutter="lg">
        {articles.map((article) => (
          <Grid.Col key={article.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              style={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.transform = '';
              }}
            >
              <Stack gap="md">
                <Image
                  src={article.image}
                  alt={article.title}
                  height={200}
                  radius="md"
                  style={{ objectFit: 'cover' }}
                  fallbackSrc="https://cdn-cojjl.nitrocdn.com/LMhaNIhdrkvISQIQPzJrudLLcnbTMRZA/assets/images/optimized/rev-ac36b58/www.cornucopia-events.co.uk/wp-content/uploads/2025/01/o-OSCAR-STAGE-ELLEN-facebook.jpg"
                />
                
                <Badge color={getCategoryColor(article.category)} variant="light" size="sm">
                  {article.category}
                </Badge>

                <Text size="lg" fw={700} c="gray.9" lineClamp={2}>
                  {article.title}
                </Text>

                <Text size="sm" c="gray.7" lineClamp={3}>
                  {article.excerpt}
                </Text>

                <Group gap="xs" mt="auto">
                  <IconCalendar size={14} color="#6B7280" />
                  <Text size="xs" c="gray.6">
                    {article.date}
                  </Text>
                  <Avatar size="sm" src={article.authorAvatar} />
                  <Text size="xs" c="gray.6">
                    {article.author}
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <NewsletterModal
        opened={newsletterOpened}
        onClose={closeNewsletter}
      />
    </Stack>
  );
}

