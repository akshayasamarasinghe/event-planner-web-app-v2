import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card, Divider, Group, Image, Text, Textarea} from '@mantine/core';
import Loading from "../../components/Loading.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store.ts";
import {eventRsvp, getEvent} from "../../state/event/eventSlice.ts";
import moment from "moment";
import CategoryTags from "../../components/CategoryTags.tsx";
import NoData from "../../components/NoData.tsx";
import {LOGGED_IN_USER_ID} from "../../constants/constants.ts";
import {ShareSocial} from "react-share-social";
import {modals} from "@mantine/modals";
import ActionMessage from "../../components/ActionMessages.tsx";

const EventDetails = () => {
    const {id} = useParams<{ id: string }>();
    const loggedInUserId = localStorage?.getItem(LOGGED_IN_USER_ID);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch | any>();
    const event: any = useSelector((state: RootState) => state.event.event);
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [modalOpened, setModalOpened] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            await dispatch(getEvent({_id: id, user: loggedInUserId}));
            setUrl(`https://event-planner-qa.vercel.app/invitation/${id}`);
            setLoading(false);
        })();
    }, [id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            alert('Event deleted!');
            // Perform delete operation here
        }
    };

    const handleEdit = () => {
        navigate(`/app/events/add-edit/${event._id}`);
    };

    const openRsvpConfirmModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <Text size="sm">
                Are you sure want to add rsvp to this event?
            </Text>
        ),
        labels: {confirm: 'Confirm', cancel: 'Cancel'},
        confirmProps: {style: {backgroundColor: "#63378F"}},
        onCancel: () => console.log('Cancel'),
        onConfirm: () => handleRsvp(),
    });

    const handleRsvp = async () => {
        setLoading(true);
        const payload = await dispatch(eventRsvp({event: id, user: loggedInUserId}));
        setLoading(false);
        switch (payload.type) {
            case "event/rsvp/rejected":
                setModalType('error');
                setModalMessage('Rsvp add failed!');
                setModalOpened(true);
                setTimeout(() => {
                    setModalOpened(false);
                }, 1500);
                break;
            case "event/rsvp/fulfilled":
                setModalType('success');
                setModalMessage(payload?.payload?.message ? payload?.payload?.message : 'Rsvp added successfully!');
                setModalOpened(true);
                setTimeout(() => {
                    setModalOpened(false);
                }, 1500);
                break;
        }
    };

    const handleReview = () => {
        alert('Review submitted!');
        // Perform review operation here
    };

    return (
        <div className="container mx-auto">
            {loading && <Loading/>}
            <section>
                {!event?._id && <NoData text={"Event Not Found!"}/>}
                {event?._id && <Card shadow="sm" padding="lg">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Left Column: Event Image */}
                        <div className="col-span-12 lg:col-span-6">
                            <Image
                                src={event?.image_url}
                                alt={event?.title}
                                radius="md"
                                style={{width: '100%', height: '100%'}}
                            />
                        </div>

                        {/* Right Column: Event Details */}
                        <div className="col-span-12 lg:col-span-6">
                            <Text fw="700" size="xl" mb="xs">
                                {event?.title}
                            </Text>
                            <Text size="sm" mb="xs"
                                  color="dimmed">{moment(event?.start_date).format("YYYY-MM-DD")} {"|"} {moment(event?.start_time, "HH:mm").format("hh:mm A") || ""} {event?.end_date ? ` - ${moment(event?.end_date).format("YYYY-MM-DD")}` : ""} {"|"} {moment(event?.end_time, "HH:mm").format("hh:mm A") || ""}</Text>
                            <CategoryTags categories={event?.category}></CategoryTags>
                            <Text size="md" mb="xl" mt="xs">
                                {event.description}
                            </Text>

                            {/* Buttons: Edit, Delete, Share, Review */}
                            <Group gap="md" mt="xl">
                                <Button variant="filled" color="#63378F" onClick={openRsvpConfirmModal}>
                                    RSVP
                                </Button>
                                {loggedInUserId === event?.user &&
                                    <Button variant="light" color="#63378F" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                }
                                {loggedInUserId === event?.user &&
                                    <Button color="red" onClick={handleDelete}>
                                        Delete
                                    </Button>}
                            </Group>
                            <Divider my="lg"/>
                            <p className="text-gray-600">Share with</p>
                            <ShareSocial
                                url={url}
                                socialTypes={['facebook', 'linkedin', 'whatsapp']}
                            />

                            {/* Review Section */}
                            {loggedInUserId !== event?.user && <div>
                                <Text fw="600" size="lg" mb="sm">
                                    Reviews
                                </Text>
                                <Textarea
                                    placeholder="Write your review..."
                                    mb="md"
                                />
                                <Button color="black" onClick={handleReview}>Submit Review</Button>
                            </div>}
                        </div>
                    </div>
                </Card>}
            </section>
            <ActionMessage opened={modalOpened}
                           onClose={() => setModalOpened(false)}
                           type={modalType}
                           message={modalMessage}/>
        </div>
    );
};

export default EventDetails;
