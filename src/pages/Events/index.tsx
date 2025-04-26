import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Group, Stack, Text, TextInput} from '@mantine/core';
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

    return (
        <div className="container mx-auto">
            {loading && <Loading/>}
            <section>
                <div className="grid grid-cols-12 gap-2">
                    {/* Category List on the Left */}
                    <div className="col-span-12 lg:col-span-2">
                        <Stack>
                            <Text fw="500">Categories</Text>
                            {categories.map((category) => (
                                <Checkbox
                                    color="#63378F"
                                    key={category.value}
                                    label={category.label}
                                    onChange={() => handleCategoryChange(category.value)}
                                />
                            ))}
                        </Stack>
                    </div>

                    {/* Event List on the Right */}
                    <div className="col-span-12 lg:col-span-10">
                        {/* "Create Your Own Event" Button */}
                        <Group justify="space-between" mb="md">
                            <TextInput
                                placeholder="Search events..."
                                value={search}
                                onChange={handleSearch}
                                style={{flex: 1}}
                            />
                            <Button color="#63378F" onClick={handleCreateEvent}>
                                Create Your Own Event
                            </Button>
                        </Group>

                        {/* Event Cards */}
                        {!events?.length && (
                            <NoData text={"No Data to Show!"}/>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                            {events?.length > 0 && events?.map((event: any) => (
                                <Card
                                    key={event?._id}
                                    shadow="sm"
                                    padding="lg"
                                    style={{
                                        height: '500px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Card.Section>
                                        <img
                                            src={event?.image_url}
                                            alt={event?.title}
                                            className="w-full"
                                            style={{
                                                // width: '100%',
                                                height: '150px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Card.Section>
                                    <Text fw="500" mt="md">{event?.title}</Text>
                                    <Text size="sm" color="dimmed" className="">
                                        {moment(event?.start_date).format("YYYY-MM-DD")} {"|"}
                                        {moment(event?.start_time, "HH:mm").format("hh:mm A") || ""}
                                        {event?.end_date ? ` - ${moment(event?.end_date).format("YYYY-MM-DD")}` : ""} {"|"}
                                        {moment(event?.end_time, "HH:mm").format("hh:mm A") || ""}
                                    </Text>
                                    <CategoryTags categories={event?.category}/>
                                    <div
                                        style={{
                                            marginTop: '12px',
                                            marginBottom: '8px',
                                            flex: '0 0 auto',
                                            height: '180px',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <Text size="sm">{event?.description}</Text>
                                    </div>
                                    <div style={{position: "static"}}>
                                        <Button
                                            color="#63378F"
                                            variant="light"
                                            fullWidth
                                            mt="md"
                                            onClick={() => navigate(`/app/events/${event?._id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </Card>


                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
