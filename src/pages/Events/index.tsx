import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Group, SimpleGrid, Stack, Text, TextInput} from '@mantine/core';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {getEvents} from "../../state/event/eventSlice.ts";
import moment from "moment";
import Loading from "../../components/Loading.tsx";
import CategoryTags from "../../components/CategoryTags.tsx";
import NoData from "../../components/NoData.tsx";

const categories = [
    {label: 'Technology', value: "TECHNOLOGY"},
    {label: 'Music', value: "MUSIC"},
    {label: 'Sport', value: "SPORT"},
    {label: 'Business', value: "BUSINESS"},
    {label: 'Art', value: "ART"},
    {label: 'Other', value: "OTHER"}
];

const Events = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    // const [filteredEvents, setFilteredEvents] = useState(eventsData);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch | any>();
    const events: any[] = useSelector((state: RootState) => state.event.events);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await dispatch(getEvents({}));
            setLoading(false);
        })();
    }, []);
    console.log(events);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await dispatch(getEvents({
                categories: selectedCategories,
                search
            }));
            setLoading(false);
        })();
    }, [selectedCategories, search]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        // filterEvents(value, selectedCategories);
    };

    const handleCategoryChange = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category) // Remove category if already selected
            : [...selectedCategories, category]; // Add category if not selected
        setSelectedCategories(updatedCategories);
    };

    // const filterEvents = (searchTerm: string, categories: string[]) => {
    //     const filtered = eventsData.filter((event) => {
    //         const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    //         const matchesCategory = categories.length === 0 || categories.includes(event.category);
    //         return matchesSearch && matchesCategory;
    //     });
    //     setFilteredEvents(filtered);
    // };

    const handleCreateEvent = () => {
        navigate('/app/events/add-edit'); // Navigate to the event creation page
    };

    console.log(selectedCategories, "selected");

    return (
        <div className="container mx-auto">
            {loading && <Loading/>}
            <section>
                <div style={{display: 'flex', gap: '20px'}}>
                    {/* Category List on the Left */}
                    <div style={{width: '200px'}}>
                        <Stack>
                            <Text fw="500">Categories</Text>
                            {categories.map((category) => (
                                <Checkbox
                                    color="black"
                                    key={category.value}
                                    label={category.label}
                                    onChange={() => handleCategoryChange(category.value)}
                                />
                            ))}
                        </Stack>
                    </div>

                    {/* Event List on the Right */}
                    <div style={{flex: 1}}>
                        {/* "Create Your Own Event" Button */}
                        <Group justify="space-between" mb="md">
                            <TextInput
                                placeholder="Search events..."
                                value={search}
                                onChange={handleSearch}
                                style={{flex: 1}}
                            />
                            <Button color="teal" onClick={handleCreateEvent}>
                                Create Your Own Event
                            </Button>
                        </Group>

                        {/* Event Cards */}
                        {!events?.length && (
                            <NoData text={"No Data to Show!"}/>
                        )}
                        <SimpleGrid cols={3}>
                            {events?.length > 0 && events?.map((event: any) => (
                                <Card key={event?._id} shadow="sm" padding="lg">
                                    <Card.Section>
                                        <img src={event?.image_url} alt={event?.title}
                                             style={{width: '100%', height: '150px', objectFit: 'cover'}}/>
                                    </Card.Section>
                                    <Text fw="500" mt="md">{event?.title}</Text>
                                    <Text size="sm"
                                          color="dimmed">{moment(event?.start_date).format("YYYY-MM-DD")} {event?.end_date ? ` - ${moment(event?.end_date).format("YYYY-MM-DD")}` : ""}</Text>
                                    <Text size="sm" mt="sm">{event?.description}</Text>
                                    <CategoryTags categories={event?.category}></CategoryTags>
                                    <Button variant="light" fullWidth mt="md" color="black"
                                            onClick={() => navigate(`/app/events/${event?._id}`)}>
                                        View Details
                                    </Button>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
