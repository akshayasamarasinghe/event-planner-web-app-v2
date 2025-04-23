import {Card, Grid, Group, Text} from '@mantine/core';
import {IconCalendarEvent, IconCalendarTime, IconCurrencyDollar, IconUsers} from '@tabler/icons-react';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function StatCard({icon, label, value}: StatCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group p="apart">
                {icon}
                <Text size="xl" w={700}>
                    {value}
                </Text>
            </Group>
            <Text size="sm" color="dimmed" mt="sm">
                {label}
            </Text>
        </Card>
    );
}

export default function Dashboard() {
    return (
        <div className="container mx-auto">
            <Grid>
                <Grid.Col span={{base: 12, sm: 6, md: 3}}>
                    <StatCard
                        icon={<IconCalendarEvent size={32}/>}
                        label="Total Events"
                        value="34"
                    />
                </Grid.Col>
                <Grid.Col span={{base: 12, sm: 6, md: 3}}>
                    <StatCard
                        icon={<IconCalendarTime size={32}/>}
                        label="Upcoming Events"
                        value="5"
                    />
                </Grid.Col>
                <Grid.Col span={{base: 12, sm: 6, md: 3}}>
                    <StatCard
                        icon={<IconUsers size={32}/>}
                        label="Attendees"
                        value="892"
                    />
                </Grid.Col>
                <Grid.Col span={{base: 12, sm: 6, md: 3}}>
                    <StatCard
                        icon={<IconCurrencyDollar size={32}/>}
                        label="Revenue"
                        value="$12,340"
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
}
