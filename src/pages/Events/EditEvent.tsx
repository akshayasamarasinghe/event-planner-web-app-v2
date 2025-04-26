import {useEffect, useRef, useState} from 'react';
import {ActionIcon, Button, Card, FileInput, Image, MultiSelect, Text, Textarea, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from "@mantine/form";
import {DatePickerInput, TimeInput} from '@mantine/dates';
import imagePlaceHolder from '../../assets/images/image-placeholder.jpg';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {createEvent, eventUploadImage, getEvent, updateEvent} from "../../state/event/eventSlice.ts";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/Loading.tsx";
import CategoryTags from "../../components/CategoryTags.tsx";
import {LOGGED_IN_USER_ID} from "../../constants/constants.ts";
import {IconClock, IconTrash} from "@tabler/icons-react";
import {modals} from "@mantine/modals";
import ActionMessage from "../../components/ActionMessages.tsx";

const EditEvent = () => {
    let {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch | any>();
    const selectedEvent: any = useSelector((state: RootState) => state.event.event);
    const [loading, setLoading] = useState<boolean>(false);
    const [image_url, setImage_url] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [event, setEvent] = useState<any>({
        title: "",
        description: "",
        image_url: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        category: [],
    });
    const startRef = useRef<HTMLInputElement>(null);
    const endRef = useRef<HTMLInputElement>(null);

    const [modalOpened, setModalOpened] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');


    const startTimePickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => startRef.current?.showPicker()}>
            <IconClock size={16} stroke={1.5}/>
        </ActionIcon>
    );

    const endTimePickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => endRef.current?.showPicker()}>
            <IconClock size={16} stroke={1.5}/>
        </ActionIcon>
    );

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
        if (file) {
            openUploadImageConfirmation();
        }
    }, [file]);

    useEffect(() => {
        if (selectedEvent) {
            setEvent(selectedEvent);
            setImage_url(selectedEvent?.image_url);
            eventForm.setValues({
                title: selectedEvent?.title,
                description: selectedEvent?.description,
                start_date: selectedEvent?.start_date ? new Date(selectedEvent.start_date) : null,
                start_time: selectedEvent.start_time,
                end_date: selectedEvent?.end_date ? new Date(selectedEvent.end_date) : null,
                end_time: selectedEvent.end_time,
                category: selectedEvent?.category,
            });
        }

    }, [selectedEvent]);

    const openUploadImageConfirmation = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <Text size="sm">
                Are you sure want to upload this image?
            </Text>
        ),
        labels: {confirm: 'Confirm', cancel: 'Cancel'},
        onCancel: () => setFile(null),
        onConfirm: () => uploadImage(),
    });

    const uploadImage = async () => {
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('file', file);
            setLoading(true);
            const res = await dispatch(eventUploadImage(formData));
            setLoading(false);
            switch (res?.type) {
                case "event/upload/rejected":
                    setModalType('error');
                    setModalMessage('Image upload failed!');
                    setModalOpened(true);
                    setTimeout(() => {
                        setModalOpened(false);
                    }, 1500);
                    break;
                case "event/upload/fulfilled":
                    setModalType('success');
                    setModalMessage('Image uploaded successfully!');
                    setModalOpened(true);
                    setTimeout(() => {
                        setModalOpened(false);
                    }, 1500);
                    setImage_url(res?.payload);
                    setEvent({...event, image_url: res?.payload});
                    break;
            }
        } catch (e) {
            throw e;
        }

    }

    const eventForm = useForm({
        initialValues: {
            title: "",
            description: "",
            start_date: null as Date | null,
            start_time: "",
            end_date: null as Date | null,
            end_time: "",
            category: [],
        },

        validate: {
            title: isNotEmpty("Title is required"),
            description: isNotEmpty("Description is required"),
            start_date: isNotEmpty("Start date is required"),
            start_time: isNotEmpty("Start time is required"),
            end_date: isNotEmpty("End date is required"),
            end_time: isNotEmpty("End time is required"),
            category: isNotEmpty("Category is required"),
        },
        validateInputOnChange: true
    });

    const formOnSubmit = eventForm.onSubmit(async (values) => {
        if (!image_url) {
            return;
        }
        setLoading(true);
        try {
            if (id) {
                const payload = await dispatch(updateEvent({...values, image_url, _id: id}));
                setLoading(false);
                switch (payload.type) {
                    case "event/update/rejected":
                        setModalType('error');
                        setModalMessage('Event update failed!');
                        setModalOpened(true);
                        setTimeout(() => {
                            setModalOpened(false);
                        }, 1500);
                        break;
                    case "event/update/fulfilled":
                        setModalType('success');
                        setModalMessage('Event updated successfully!');
                        setModalOpened(true);
                        setTimeout(() => {
                            setModalOpened(false);
                            navigate("/app/events");
                        }, 1500);
                        break;
                }
            } else {
                const payload = await dispatch(createEvent({
                    ...values,
                    image_url,
                    user: localStorage?.getItem(LOGGED_IN_USER_ID)
                }));
                setLoading(false);
                switch (payload.type) {
                    case "event/create/rejected":
                        setModalType('error');
                        setModalMessage('Event create failed!');
                        setModalOpened(true);
                        setTimeout(() => {
                            setModalOpened(false);
                        }, 1500);
                        break;
                    case "event/create/fulfilled":
                        setModalType('error');
                        setModalMessage('Event created successfully!');
                        setModalOpened(true);
                        setTimeout(() => {
                            setModalOpened(false);
                            navigate("/app/events");
                        }, 1500);
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
        const values = eventForm?.values;
        setEvent({
            title: values?.title,
            description: values?.description,
            start_date: values?.start_date !== null ? moment(values?.start_date).format("YYYY-MM-DD") : "",
            start_time: values?.start_time !== null ? moment(values?.start_time, "HH:mm").format("hh:mm A") : "",
            end_date: values?.end_date !== null ? moment(values?.end_date).format("YYYY-MM-DD") : "",
            end_time: values?.end_time !== null ? moment(values?.end_time, "HH:mm").format("hh:mm A") : "",
            image_url: image_url,
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
                        <Card shadow="sm" padding="lg" radius="md" className="h-full">
                            <Card.Section>
                                <Image
                                    src={event?.image_url || imagePlaceHolder}
                                    alt={event?.title || 'Event Preview'}
                                    h={380}
                                    radius="md"
                                />
                            </Card.Section>
                            <div className="flex flex-col gap-2 mt-3 h-[250px]">
                                <p className="font-bold">{event?.title || "Title"}</p>
                                <p className="text-gray-400 text-sm">{event?.start_date || "Start date"} {"|"} {event?.start_time || "Start time"} {event?.end_date ? `- ${event?.end_date}` : " - End date"} {"|"} {event?.end_time || "End time"}</p>
                                <CategoryTags categories={eventForm?.values?.category}></CategoryTags>
                                <div className=" text-sm">{event?.description || "Description"}</div>
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
                            <TimeInput
                                label="Start Time"
                                placeholder="Pick time"
                                ref={startRef} rightSection={startTimePickerControl}
                                {...eventForm.getInputProps('start_time')}
                            />
                            <DatePickerInput
                                size="md"
                                radius="md"
                                label="End Date"
                                placeholder="Pick date"
                                {...eventForm.getInputProps('end_date')}
                            />
                            <TimeInput
                                label="End Time"
                                placeholder="Pick time"
                                ref={endRef} rightSection={endTimePickerControl}
                                {...eventForm.getInputProps('end_time')}
                            />
                            {!image_url && <FileInput
                                label="Image"
                                placeholder="Upload image"
                                value={file} onChange={setFile}
                            />}
                            {image_url &&
                                <Card>
                                    <div>
                                        <a className="text-blue-800" href={image_url} target="_blank">{image_url}</a>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <span className="p-2 hover:cursor-pointer hover:bg-gray-100 rounded-md"
                                              onClick={() => {
                                                  setImage_url("");
                                                  setEvent({...event, image_url: undefined});
                                                  setFile(null)
                                              }}><IconTrash color="red" stroke={1.5} size={20}/></span>
                                    </div>
                                </Card>
                            }
                            <Textarea
                                size="md"
                                radius="md"
                                label="Description"
                                rows={5}
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
                                        radius="md" onClick={() => {
                                    eventForm?.reset();
                                    id = ""
                                }}>Cancel</Button>
                                <Button size="md" className="my-5 w-full" variant="filled" color="#63378F" radius="md"
                                        type="submit">Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <ActionMessage opened={modalOpened}
                           onClose={() => setModalOpened(false)}
                           type={modalType}
                           message={modalMessage}/>
        </div>
    );
};

export default EditEvent;
