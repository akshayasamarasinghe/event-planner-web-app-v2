import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Button, Group, Grid, Image, Textarea } from '@mantine/core';

interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

const eventsData: Event[] = [
  // Technology Events
  { id: '1', title: 'AI Summit', date: '2024-06-10', image: 'https://th.bing.com/th/id/OIP.wu1S3Xlj1hAO9O3Yj_nj4AAAAA?rs=1&pid=ImgDetMain', description: 'Discover the latest advancements in artificial intelligence.', category: 'Technology' },
  { id: '2', title: 'Cyber Security Expo', date: '2024-08-22', image: 'https://th.bing.com/th/id/OIP.wu1S3Xlj1hAO9O3Yj_nj4AAAAA?rs=1&pid=ImgDetMain', description: 'Protecting businesses from cyber threats.', category: 'Technology' },
  { id: '3', title: 'Blockchain Forum', date: '2024-07-05', image: 'https://th.bing.com/th/id/OIP.wu1S3Xlj1hAO9O3Yj_nj4AAAAA?rs=1&pid=ImgDetMain', description: 'Exploring blockchain innovations and cryptocurrency.', category: 'Technology' },
  { id: '4', title: 'Gadget Expo', date: '2024-09-18', image: 'https://th.bing.com/th/id/OIP.wu1S3Xlj1hAO9O3Yj_nj4AAAAA?rs=1&pid=ImgDetMain', description: 'Showcasing the newest tech gadgets.', category: 'Technology' },

  // Music Events
  { id: '5', title: 'Rock Music Festival', date: '2024-05-30', image: 'https://img.theepochtimes.com/assets/uploads/2022/05/26/MusicConcerts-2800x1340-Category.jpg', description: 'Experience an electrifying rock music festival.', category: 'Music' },
  { id: '6', title: 'Jazz Nights', date: '2024-06-12', image: 'https://img.theepochtimes.com/assets/uploads/2022/05/26/MusicConcerts-2800x1340-Category.jpg', description: 'Smooth jazz performances in a cozy atmosphere.', category: 'Music' },
  { id: '7', title: 'EDM Party', date: '2024-08-01', image: 'https://img.theepochtimes.com/assets/uploads/2022/05/26/MusicConcerts-2800x1340-Category.jpg', description: 'An unforgettable night of electronic dance music.', category: 'Music' },
  { id: '8', title: 'Classical Orchestra', date: '2024-10-14', image: 'https://img.theepochtimes.com/assets/uploads/2022/05/26/MusicConcerts-2800x1340-Category.jpg', description: 'A night of classical masterpieces.', category: 'Music' },

  // Art Events
  { id: '9', title: 'Modern Art Showcase', date: '2024-07-10', image: 'https://www.re-thinkingthefuture.com/wp-content/uploads/2022/10/A8291-What-is-the-purpose-and-importance-of-an-art-exhibition.jpg', description: 'Discover contemporary art by talented artists.', category: 'Art' },
  { id: '10', title: 'Sculpture Exhibition', date: '2024-06-25', image: 'https://www.re-thinkingthefuture.com/wp-content/uploads/2022/10/A8291-What-is-the-purpose-and-importance-of-an-art-exhibition.jpg', description: 'Marvel at incredible sculptures from around the world.', category: 'Art' },
  { id: '11', title: 'Street Art Festival', date: '2024-09-15', image: 'https://www.re-thinkingthefuture.com/wp-content/uploads/2022/10/A8291-What-is-the-purpose-and-importance-of-an-art-exhibition.jpg', description: 'Urban art and graffiti showcase.', category: 'Art' },
  { id: '12', title: 'Photography Expo', date: '2024-10-05', image: 'https://www.re-thinkingthefuture.com/wp-content/uploads/2022/10/A8291-What-is-the-purpose-and-importance-of-an-art-exhibition.jpg', description: 'The best of photography from global artists.', category: 'Art' },

  // Sports Events
  { id: '13', title: 'Marathon Championship', date: '2024-07-22', image: 'https://preview.thenewsmarket.com/Previews/INTE/StillAssets/960x540/638759_v3.jpg', description: 'Run for glory in the city’s biggest marathon.', category: 'Sports' },
  { id: '14', title: 'Football Cup', date: '2024-08-11', image: 'https://preview.thenewsmarket.com/Previews/INTE/StillAssets/960x540/638759_v3.jpg', description: 'Watch teams battle for the championship.', category: 'Sports' },
  { id: '15', title: 'Tennis Open', date: '2024-09-02', image: 'https://preview.thenewsmarket.com/Previews/INTE/StillAssets/960x540/638759_v3.jpg', description: 'Top players compete in this grand slam.', category: 'Sports' },
  { id: '16', title: 'Basketball Showdown', date: '2024-10-20', image: 'https://preview.thenewsmarket.com/Previews/INTE/StillAssets/960x540/638759_v3.jpg', description: 'Experience an intense basketball tournament.', category: 'Sports' },

  // Business Events
  { id: '17', title: 'Startup Summit', date: '2024-06-05', image: 'https://www.arabianbusiness.com/cloud/2024/03/29/Arabian-Business-Leadership-Summit-2023.jpg', description: 'Network with top startups and investors.', category: 'Business' },
  { id: '18', title: 'Entrepreneur Workshop', date: '2024-08-30', image: 'https://www.arabianbusiness.com/cloud/2024/03/29/Arabian-Business-Leadership-Summit-2023.jpg', description: 'Learn business strategies from successful entrepreneurs.', category: 'Business' },
  { id: '19', title: 'Finance Expo', date: '2024-09-10', image: 'https://www.arabianbusiness.com/cloud/2024/03/29/Arabian-Business-Leadership-Summit-2023.jpg', description: 'The latest trends in finance and investment.', category: 'Business' },
  { id: '20', title: 'Marketing Conference', date: '2024-10-22', image: 'https://www.arabianbusiness.com/cloud/2024/03/29/Arabian-Business-Leadership-Summit-2023.jpg', description: 'Experts discuss marketing strategies for success.', category: 'Business' },
];

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the event ID from the URL
  const event = eventsData.find((event) => event.id === id); // Find the event by ID

  if (!event) {
    return <Text>Event not found!</Text>; // Handle case where event is not found
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      alert('Event deleted!');
      // Perform delete operation here
    }
  };

  const handleEdit = () => {
    window.location.href = `/event/edit/${event.id}`;
  };

  const handleShare = () => {
    alert('Event shared!');
    // Perform share operation here
  };

  const handleReview = () => {
    alert('Review submitted!');
    // Perform review operation here
  };

  return (
    <Card shadow="sm" padding="lg">
      <Grid>
        {/* Left Column: Event Image */}
        <Grid.Col span={6}>
          <Image
            src={event.image}
            alt={event.title}
            radius="md"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid.Col>

        {/* Right Column: Event Details */}
        <Grid.Col span={6}>
          <Text weight={700} size="xl" mb="sm">
            {event.title}
          </Text>
          <Text size="sm" color="dimmed" mb="md">
            {event.date}
          </Text>
          <Text size="md" mb="xl">
            {event.description}
          </Text>

          {/* Buttons: Edit, Delete, Share, Review */}
          <Group spacing="md" mb="xl">
            <Button variant="light" onClick={handleEdit}>
              Edit
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button color="blue" onClick={handleShare}>
              Share
            </Button>
          </Group>

          {/* Review Section */}
          <Text weight={600} size="lg" mb="sm">
            Reviews
          </Text>
          <Textarea
            placeholder="Write your review..."
            mb="md"
          />
          <Button onClick={handleReview}>Submit Review</Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default EventDetailsPage;