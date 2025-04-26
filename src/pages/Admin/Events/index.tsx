import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    Checkbox,
    Divider,
    Grid,
    Group,
    Image,
    Modal,
    MultiSelect,
    Stack,
    Table,
    Text,
    Textarea,
    TextInput
} from '@mantine/core';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../state/store.ts";
import {createEvent, getEvents, updateEvent} from "../../../state/event/eventSlice.ts";
import moment from "moment";
import Loading from "../../../components/Loading.tsx";
import NoData from "../../../components/NoData.tsx";
import CategoryTags from "../../../components/CategoryTags.tsx";
import imagePlaceHolder from "../../../assets/images/image-placeholder.jpg";
import {DatePickerInput} from "@mantine/dates";
import {useDisclosure} from "@mantine/hooks";
import {isNotEmpty, useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";

const imageUrlRegex = /^(https?:\/\/)([\w.-]+)([\/\w.-]*)*$/;

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
    const [selectedId, setSelectedId] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    // const [filteredEvents, setFilteredEvents] = useState(eventsData);
    const dispatch = useDispatch<AppDispatch | any>();
    const events: any[] = useSelector((state: RootState) => state.event.events);
    const [opened, {open, close}] = useDisclosure(false);
    const [openedViewEvent, handlerViewEvent] = useDisclosure(false);
    const [event, setEvent] = useState<any>({
        title: "",
        description: "",
        image_url: "",
        start_date: "",
        end_date: "",
        category: [],
    });

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

    useEffect(() => {
        if (!opened) {
            setEvent({});
            setSelectedId("");
            eventForm?.reset();
        }
    }, [opened]);

    useEffect(() => {
        if (!openedViewEvent) {
            setEvent({});
            setSelectedId("");
        }
    }, [openedViewEvent]);

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

    const rows = events?.map((e: any) => (
        <Table.Tr key={e?.title}>
            <Table.Td className="w-[200px]">{e?.title}</Table.Td>
            <Table.Td
                className="w-[200px]">{moment(e?.start_date).format("YYYY-MM-DD")} {e?.end_date ? ` - ${moment(e?.end_date).format("YYYY-MM-DD")}` : ""}</Table.Td>
            <Table.Td className="max-w-[200px] truncate">{e?.description}</Table.Td>
            <Table.Td><CategoryTags categories={e?.category}></CategoryTags></Table.Td>
            <Table.Td className="flex gap-2">
                <Button variant="outline" color="#63378F" onClick={() => {
                    open();
                    setEvent(e);
                    setSelectedId(e?._id);
                    eventForm.setValues({
                        title: e?.title,
                        description: e?.description,
                        image_url: e?.image_url,
                        start_date: e?.start_date ? new Date(e.start_date) : null,
                        end_date: e?.end_date ? new Date(e.end_date) : null,
                        category: e?.category,
                    });
                }}>
                    Edit
                </Button>
                <Button variant="filled" color="#63378F" onClick={() => {
                    handlerViewEvent.open();
                    setEvent(e);
                }}>View</Button>
            </Table.Td>
        </Table.Tr>
    ));

    const handleCreateEvent = () => {
        open();
    };

    const eventForm = useForm({
        initialValues: {
            title: "",
            description: "",
            image_url: "",
            start_date: null as Date | null,
            end_date: null as Date | null,
            category: [],
        },

        validate: {
            title: isNotEmpty("Title is required"),
            description: isNotEmpty("Description is required"),
            start_date: isNotEmpty("Start date is required"),
            end_date: isNotEmpty("End date is required"),
            category: isNotEmpty("Category is required"),
            image_url: (value) => {
                if (!value) {
                    return "Image URL is required"
                }
                return imageUrlRegex.test(value) ? null : 'Invalid image URL'
            },
        },
        validateInputOnChange: true
    });

    const formOnSubmit = eventForm.onSubmit(async (values) => {
        setLoading(true);
        try {
            if (selectedId) {
                const payload = await dispatch(updateEvent({...values, _id: selectedId}));
                setLoading(false);
                switch (payload.type) {
                    case "event/update/rejected":
                        notifications.show({
                            color: "red",
                            title: 'Error',
                            message: 'System Error! 🌟',
                        })
                        break;
                    case "event/update/fulfilled":
                        notifications.show({
                            color: "green",
                            title: 'Success',
                            message: 'Successful! 🌟',
                        })
                        break;
                }
            } else {
                const payload = await dispatch(createEvent(values));
                setLoading(false);
                switch (payload.type) {
                    case "event/create/rejected":
                        notifications.show({
                            color: "red",
                            title: 'Error',
                            message: 'System Error! 🌟',
                        })
                        break;
                    case "event/create/fulfilled":
                        notifications.show({
                            color: "green",
                            title: 'Success',
                            message: 'Successful! 🌟',
                        })
                        break;
                }
            }
            setEvent({});
            setSelectedId("");
            eventForm?.reset();
            await dispatch(getEvents({
                categories: selectedCategories,
                search
            }));
            close();
        } catch (e) {
            setLoading(false);
            throw e;
        }
    })

    useEffect(() => {
        const values = eventForm?.values;
        setEvent({
            title: values?.title,
            description: values?.description,
            start_date: values?.start_date !== null ? moment(values?.start_date).format("YYYY-MM-DD") : "",
            end_date: values?.end_date !== null ? moment(values?.end_date).format("YYYY-MM-DD") : "",
            image_url: values?.image_url,
        })
    }, [eventForm?.values]);

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
                                Create Event
                            </Button>
                        </Group>

                        <Card shadow="sm" padding="sm" radius="md" withBorder>
                            <div className="w-full overflow-x-auto">
                                <Table
                                    className="min-w-[800px] w-full"
                                    horizontalSpacing="sm"
                                    verticalSpacing="sm"
                                    striped
                                >
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th className="w-[200px]">Title</Table.Th>
                                            <Table.Th className="w-[200px]">Start Date - End Date</Table.Th>
                                            <Table.Th className="w-[200px]">Description</Table.Th>
                                            <Table.Th className="w-[200px]">Category</Table.Th>
                                            <Table.Th className="w-[200px]">Actions</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    {events?.length > 0 && <Table.Tbody>{rows}</Table.Tbody>}
                                    {!events?.length && (
                                        <Table.Tbody>
                                            <Table.Tr>
                                                <Table.Td colSpan={5}>
                                                    <NoData text={"No Data to Show!"}/>
                                                </Table.Td>
                                            </Table.Tr>
                                        </Table.Tbody>
                                    )}
                                </Table>
                            </div>
                        </Card>


                    </div>
                </div>
            </section>

            <Modal opened={opened} onClose={close} size="90%" title={<p
                className="mb-4 text-xl font-semibold">{selectedId ? "Edit" : "Add"} Event</p>}>
                <div>
                    <Grid gutter="xl" p="md">
                        {/* Left Column:Event Preview Card */}
                        <Grid.Col span={6}>
                            <Card shadow="sm" padding="lg" radius="md">
                                <Card.Section>
                                    <Image
                                        src={event?.image_url || imagePlaceHolder}
                                        alt={event?.title || 'Event Preview'}
                                        h={400}
                                        radius="md"
                                    />
                                </Card.Section>
                                <div className="flex flex-col gap-2 mt-3">
                                    <p className="font-bold">{event?.title || "Title"}</p>
                                    <p className="text-gray-400 text-sm">{event?.start_date || "Start date"} {event?.end_date ? `- ${event?.end_date}` : " - End date"}</p>
                                    <p className=" text-sm">{event?.description || "Description"}</p>
                                    <CategoryTags categories={eventForm?.values?.category}></CategoryTags>
                                </div>
                            </Card>
                        </Grid.Col>

                        {/* Right Column: Event Form */}
                        <Grid.Col span={6}>
                            <form className="flex flex-col gap-5" onSubmit={formOnSubmit}>
                                <TextInput
                                    size="md"
                                    radius="md"
                                    label="Title"
                                    placeholder="Enter title"
                                    {...eventForm.getInputProps('title')}
                                />
                                <DatePickerInput
                                    size="md"
                                    radius="md"
                                    label="Start Date"
                                    placeholder="Pick date"
                                    {...eventForm.getInputProps('start_date')}
                                />
                                <DatePickerInput
                                    size="md"
                                    radius="md"
                                    label="End Date"
                                    placeholder="Pick date"
                                    {...eventForm.getInputProps('end_date')}
                                />
                                <TextInput
                                    size="md"
                                    radius="md"
                                    label="Image Url"
                                    placeholder="Enter image url"
                                    {...eventForm.getInputProps('image_url')}
                                />
                                <Textarea
                                    size="md"
                                    radius="md"
                                    label="Description"
                                    placeholder="Enter description"
                                    {...eventForm.getInputProps('description')}
                                />
                                <MultiSelect
                                    size="md"
                                    radius="md"
                                    label="Category"
                                    placeholder="Select category"
                                    data={[
                                        {value: 'TECHNOLOGY', label: 'Technology'},
                                        {value: 'MUSIC', label: 'Music'},
                                        {value: 'ART', label: 'Art'},
                                        {value: 'BUSINESS', label: 'Business'},
                                        {value: 'SPORT', label: 'Sport'},
                                        {value: 'OTHER', label: 'Other'},
                                    ]}
                                    {...eventForm.getInputProps('category')}
                                />
                                <div className="flex justify-end gap-3 mt-3">
                                    <Button size="md" className="my-5 w-full" variant="outline" color="#63378F"
                                            onClick={() => {
                                                close();
                                                setEvent({});
                                                eventForm?.reset();
                                            }}
                                            radius="md">Cancel</Button>
                                    <Button size="md" className="my-5 w-full" variant="filled" color="#63378F" radius="md"
                                            type="submit">Save</Button>
                                </div>
                            </form>
                        </Grid.Col>
                    </Grid>
                </div>
            </Modal>

            <Modal opened={openedViewEvent} onClose={handlerViewEvent.close} size="90%" title={<p
                className="mb-4 text-xl font-semibold">{event?.title}</p>}>
                <div>
                    <Grid gutter="xl" p="md">
                        {/* Left Column:Event Preview Card */}
                        <Grid.Col span={12}>
                            <Card shadow="sm" padding="lg" radius="md">
                                <Card.Section>
                                    <Image
                                        src={event?.image_url || imagePlaceHolder}
                                        alt={event?.title || 'Event Preview'}
                                        h={400}
                                        radius="md"
                                    />
                                </Card.Section>
                                <div className="flex flex-col gap-2 mt-3">
                                    <p className="font-bold">{event?.title || "Title"}</p>
                                    <Text size="sm" mb="xs"
                                          color="dimmed">{moment(event?.start_date).format("YYYY-MM-DD")} {"|"} {moment(event?.start_time, "HH:mm").format("hh:mm A") || ""} {event?.end_date ? ` - ${moment(event?.end_date).format("YYYY-MM-DD")}` : ""} {"|"} {moment(event?.end_time, "HH:mm").format("hh:mm A") || ""}</Text>
                                    <CategoryTags categories={event?.category}></CategoryTags>
                                    <p className=" text-sm">{event?.description || "Description"}</p>
                                    <CategoryTags categories={eventForm?.values?.category}></CategoryTags>
                                </div>
                                <Divider my="md"/>
                                <p className="font-bold mb-3">RSVPS</p>
                                <Card className="border-1 border-gray-400" shadow="sm" padding="lg" radius="md">
                                    <div>
                                        <Table horizontalSpacing="md" verticalSpacing="md" striped>
                                            <Table.Thead>
                                                <Table.Tr>
                                                    <Table.Th>Name</Table.Th>
                                                    <Table.Th>Email</Table.Th>
                                                    <Table.Th>Phone No</Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                            {event?.rsvps?.length > 0 && (
                                                <Table.Tbody>
                                                    {event?.rsvps?.map((r: any) => (
                                                        <Table.Tr key={r?.name}>
                                                            <Table.Td>{r?.name}</Table.Td>
                                                            <Table.Td>{r?.email}</Table.Td>
                                                            <Table.Td>{r?.phone_no}</Table.Td>
                                                        </Table.Tr>
                                                    ))}
                                                </Table.Tbody>
                                            )}
                                            {!event?.rsvps?.length && (
                                                <Table.Tbody>
                                                    <Table.Tr>
                                                        <Table.Td colSpan={5}>
                                                            {<NoData text={"No Data to Show!"}/>}
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            )}
                                        </Table>
                                    </div>

                                </Card>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </div>
            </Modal>
        </div>
    );
};

export default Events;
