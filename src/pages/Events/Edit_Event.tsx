import React, { useState } from 'react';
import { Card, TextInput, Textarea, Button, Grid, Image, Text, Group } from '@mantine/core';

interface Event {
  id?: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

const EventEditPage: React.FC = () => {
  // State for form fields
  const [event, setEvent] = useState<Event>({
    title: '',
    date: '',
    image: '',
    description: '',
  });

  // Handle form input changes
  const handleInputChange = (field: keyof Event, value: string) => {
    setEvent((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    alert('Event saved!');
    // Perform save operation here (e.g., API call)
  };

  // Handle form cancellation
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      window.location.href = '/events'; // Navigate back to the events page
    }
  };

  return (
    <Grid gutter="xl" p="md">
      {/* Left Column: Event Preview Card */}
      <Grid.Col span={6}>
        <Card shadow="sm" padding="lg" radius="md">
          <Card.Section>
            <Image
              src={event.image || 'https://via.placeholder.com/300'}
              alt={event.title || 'Event Preview'}
              height={200}
              radius="md"
              withPlaceholder
            />
          </Card.Section>
          <Text weight={700} size="xl" mt="md">
            {event.title || 'Event Title'}
          </Text>
          <Text size="sm" color="dimmed" mt="xs">
            {event.date || 'Event Date'}
          </Text>
          <Text size="md" mt="sm">
            {event.description || 'Event Description'}
          </Text>
        </Card>
      </Grid.Col>

      {/* Right Column: Event Form */}
      <Grid.Col span={6}>
        <TextInput
          label="Event Title"
          placeholder="Enter event title"
          value={event.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
          mb="md"
        />
        <TextInput
          label="Event Date"
          type="date"
          placeholder="Select event date"
          value={event.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          required
          mb="md"
        />
        <TextInput
          label="Event Image URL"
          placeholder="Enter image URL"
          value={event.image}
          onChange={(e) => handleInputChange('image', e.target.value)}
          required
          mb="md"
        />
        <Textarea
          label="Event Description"
          placeholder="Enter event description"
          value={event.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          required
          minRows={4}
          mb="md"
        />
        <Group position="right">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Event
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default EventEditPage;