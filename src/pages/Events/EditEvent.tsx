import {useEffect, useState} from 'react';
import {Button, Card, Image, MultiSelect, Textarea, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from "@mantine/form";
import {DatePickerInput} from '@mantine/dates';
import imagePlaceHolder from '../../assets/images/image-placeholder.jpg';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {createEvent, getEvent, updateEvent} from "../../state/event/eventSlice.ts";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/Loading.tsx";
import CategoryTags from "../../components/CategoryTags.tsx";
import {LOGGED_IN_USER_ID} from "../../constants/constants.ts";
import {notifications} from "@mantine/notifications";

const imageUrlRegex = /^(https?:\/\/)([\w.-]+)([\/\w.-]*)*$/;

const EditEvent = () => {
    let {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch | any>();
    const selectedEvent: any = useSelector((state: RootState) => state.event.event);
    const [loading, setLoading] = useState<boolean>(false);
    const [event, setEvent] = useState<any>({
        title: "",
        description: "",
        image_url: "",
        start_date: "",
        end_date: "",
        category: [],
    });

    useEffect(() => {
        if (id) {
            (async () => {
                setLoading(true);
                await dispatch(getEvent({_id: id}));
                setLoading(false);
            })();
        }
    }, [id]);

    useEffect(() => {
        if (selectedEvent) {
            setEvent(selectedEvent);
            eventForm.setValues({
                title: selectedEvent?.title,
                description: selectedEvent?.description,
                image_url: selectedEvent?.image_url,
                start_date: selectedEvent?.start_date ? new Date(selectedEvent.start_date) : null,
                end_date: selectedEvent?.end_date ? new Date(selectedEvent.end_date) : null,
                category: selectedEvent?.category,
            });
        }

    }, [selectedEvent]);

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
        console.log(values);
        setLoading(true);
        try {
            if (id) {
                const payload = await dispatch(updateEvent({...values, _id: id}));
                setLoading(false);
                switch (payload.type) {
                    case "event/update/rejected":
                        notifications.show({
                            color: "red",
                            title: 'Error',
                            message: 'System Error!',
                            position: 'top-right'
                        })
                        break;
                    case "event/update/fulfilled":
                        notifications.show({
                            color: "green",
                            title: 'Success',
                            message: 'Successful!',
                            position: 'top-right'
                        })
                        console.log("success");
                        navigate("/app/events");
                        break;
                }
            } else {
                const payload = await dispatch(createEvent({
                    ...values,
                    user: localStorage?.getItem(LOGGED_IN_USER_ID)
                }));
                setLoading(false);
                switch (payload.type) {
                    case "event/create/rejected":
                        notifications.show({
                            color: "red",
                            title: 'Error',
                            message: 'System Error!',
                            position: 'top-right'
                        })
                        break;
                    case "event/create/fulfilled":
                        notifications.show({
                            color: "green",
                            title: 'Success',
                            message: 'Successful!',
                            position: 'top-right'
                        })
                        console.log("success");
                        navigate("/app/events");
                        break;
                }
            }
            eventForm.reset();
            setEvent({});
        } catch (e) {
            setLoading(false);
            throw e;
        }
    })

    useEffect(() => {
        console.log(eventForm.values);
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
                <p className="mb-4 text-xl font-semibold">{id ? "Edit" : "Add"} Event</p>
                <div className="grid grid-cols-12 gap-8 p-md">
                    {/* Left Column:Event Preview Card */}
                    <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
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
                    </div>

                    {/* Right Column: Event Form */}
                    <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
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
                                <Button size="md" className="my-5 w-full" variant="outline" color="black"
                                        radius="md" onClick={() => {
                                    eventForm?.reset();
                                    id = ""
                                }}>Cancel</Button>
                                <Button size="md" className="my-5 w-full" variant="filled" color="black" radius="md"
                                        type="submit">Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditEvent;
