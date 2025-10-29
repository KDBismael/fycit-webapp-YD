'use client';

import { useNewsStore } from '@/stores/news';
import { useUserStore } from '@/stores/userStore';
import { Box, Button, Container, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
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
  const { user } = useUserStore()
  const { fetchNews, news } = useNewsStore()
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterOpened, { open: openNewsletter, close: closeNewsletter }] = useDisclosure(false);

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

      <NewsletterModal
        opened={newsletterOpened}
        onClose={closeNewsletter}
      />
    </Container>
  );
}

