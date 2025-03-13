import React, { useState } from 'react';
import { Card, Text, TextInput, Group, Button, SimpleGrid, Stack, Checkbox } from '@mantine/core';

interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  category: string;
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
const categories = ['Technology', 'Music', 'Art', 'Sports', 'Business'];

const Events: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    filterEvents(value, selectedCategories);
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category) // Remove category if already selected
      : [...selectedCategories, category]; // Add category if not selected
    setSelectedCategories(updatedCategories);
    filterEvents(search, updatedCategories);
  };

  const filterEvents = (searchTerm: string, categories: string[]) => {
    const filtered = eventsData.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categories.length === 0 || categories.includes(event.category);
      return matchesSearch && matchesCategory;
    });
    setFilteredEvents(filtered);
  };

  const handleCreateEvent = () => {
    window.location.href = '/event/create'; // Navigate to the event creation page
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Category List on the Left */}
      <div style={{ width: '200px' }}>
        <Stack>
          <Text weight={500}>Categories</Text>
          {categories.map((category) => (
            <Checkbox
              key={category}
              label={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
          ))}
        </Stack>
      </div>

      {/* Event List on the Right */}
      <div style={{ flex: 1 }}>
        {/* "Create Your Own Event" Button */}
        <Group position="apart" mb="md">
          <TextInput
            placeholder="Search events..."
            value={search}
            onChange={handleSearch}
            style={{ flex: 1 }}
          />
          <Button color="teal" onClick={handleCreateEvent}>
            Create Your Own Event
          </Button>
        </Group>

        {/* Event Cards */}
        <SimpleGrid cols={3}>
          {filteredEvents.map((event) => (
            <Card key={event.id} shadow="sm" padding="lg">
              <Card.Section>
                <img src={event.image} alt={event.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              </Card.Section>
              <Text weight={500} mt="md">{event.title}</Text>
              <Text size="sm" color="dimmed">{event.date}</Text>
              <Text size="sm" mt="sm">{event.description}</Text>
              <Button variant="light" fullWidth mt="md" onClick={() => (window.location.href = `/event/${event.id}`)}>
                View Details
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default Events;