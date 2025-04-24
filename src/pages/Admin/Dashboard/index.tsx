import { Card, Grid, Group,Text, Title, Badge, Progress, Avatar, ScrollArea, Divider, Paper,
  } from '@mantine/core';
  import {
    IconCalendarEvent,
    IconCalendarTime,
    IconCurrencyDollar,
    IconUsers,
    IconSparkles,
  } from '@tabler/icons-react';
  
  import { useEffect, useState } from 'react';
  
  // StatCard Component
  interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    color?: string;
  }
  
  function StatCard({ icon, label, value, color = 'blue' }: StatCardProps) {
    return (
      <Card shadow="md" radius="md" padding="lg" withBorder className="hover:scale-105 transition-transform duration-300">
        <Group justify="space-between" mb="xs">
          <Badge color={color} variant="light" size="lg">
            {icon}
          </Badge>
          <Text fw={700} size="xl">{value}</Text>
        </Group>
        <Text size="sm" c="dimmed">{label}</Text>
      </Card>
    );
  }
  
  // Dashboard Component
  export default function Dashboard() {
    const [date, setDate] = useState<string>("");
  
    useEffect(() => {
      const today = new Date();
      setDate(today.toLocaleDateString());
    }, []);
  
    return (
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <Paper radius="md" p="lg" withBorder mb="lg" className="bg-blue-50">
          <Group justify="space-between">
            <div>
              <Title order={2}>Welcome back, Event Pro!</Title>
              <Text c="dimmed" size="sm">Today is {date}. You’ve got a busy day ahead ✨</Text>
            </div>
            <IconSparkles size={40} stroke={1.5} color="#3b82f6" />
          </Group>
        </Paper>
  
        {/* Stats Section */}
        <Grid gutter="xl" mb="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard icon={<IconCalendarEvent />} label="Total Events" value="34" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard icon={<IconCalendarTime />} label="Upcoming Events" value="5" color="green" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard icon={<IconUsers />} label="Attendees" value="892" color="orange" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard icon={<IconCurrencyDollar />} label="Revenue" value="$12,340" color="teal" />
        </Grid.Col>
        </Grid>
  
        {/* Dashboard Lower Panels */}
        <Grid gutter="xl">
          {/* Upcoming Events */}
          <Grid.Col span={12} md={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">📅 Upcoming Events</Title>
              <ScrollArea h={200}>
                <Group justify="space-between" mb="xs">
                  <Text>Wedding - Galle</Text>
                  <Badge color="green">Apr 28</Badge>
                </Group>
                <Divider />
                <Group justify="space-between" my="xs">
                  <Text>Corporate Meetup</Text>
                  <Badge color="blue">May 2</Badge>
                </Group>
                <Divider />
                <Group justify="space-between" my="xs">
                  <Text>Fashion Week Afterparty</Text>
                  <Badge color="pink">May 6</Badge>
                </Group>
                <Divider />
                <Group justify="space-between" mt="xs">
                  <Text>Birthday - Colombo 7</Text>
                  <Badge color="yellow">May 10</Badge>
                </Group>
              </ScrollArea>
            </Card>
          </Grid.Col>
  
          {/* Progress / Task Panel */}
          <Grid.Col span={12} md={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">✅ Team Task Progress</Title>
              <Group mb="sm">
                <Avatar radius="xl" color="blue">D</Avatar>
                <Text size="sm">Decorations - 80%</Text>
              </Group>
              <Progress value={80} color="blue" radius="xl" size="md" mb="md" />
  
              <Group mb="sm">
                <Avatar radius="xl" color="green">V</Avatar>
                <Text size="sm">Vendor Coordination - 50%</Text>
              </Group>
              <Progress value={50} color="green" radius="xl" size="md" mb="md" />
  
              <Group mb="sm">
                <Avatar radius="xl" color="teal">S</Avatar>
                <Text size="sm">Scheduling - 90%</Text>
              </Group>
              <Progress value={90} color="teal" radius="xl" size="md" />
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    );
  }
  