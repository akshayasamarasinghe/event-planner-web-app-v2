import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";
import {useEffect, useState} from "react";
import {getInvitation, invitationRsvp} from "../../state/event/eventSlice.ts";
import Loading from "../../components/Loading.tsx";
import NoData from "../../components/NoData.tsx";
import {Button, Card, Divider, Group, Image, Text, TextInput} from "@mantine/core";
import moment from "moment/moment";
import CategoryTags from "../../components/CategoryTags.tsx";
import {isNotEmpty, useForm} from "@mantine/form";
import {validateEmail} from "../../utils.ts";
import ActionMessage from "../../components/ActionMessages.tsx";

const PublicView = () => {
    const {id}: any = useParams<{ id: string }>(); // Get the event ID from the URL
    const dispatch = useDispatch<AppDispatch | any>();
    // const event: any = useSelector((state: RootState) => state.event.event);
    const [loading, setLoading] = useState<boolean>(false);// Find the event by ID
    const [goBack, setGoBack] = useState<boolean>(false);// Find the event by ID
    const [event, setEvent] = useState<any>({});

    const [modalOpened, setModalOpened] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const resp = await dispatch(getInvitation(id));
            setEvent(resp?.payload);
            setLoading(false);
        })();
    }, [id]);

    const invitationForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: "",
            phone_no: "",
            email: '',
        },

        validate: {
            name: isNotEmpty("Name is required"),
            email: (_, values) => validateEmail(values),
            phone_no: (value) => {
                if (!value) {
                    return "Phone Number is Required";
                }
                return /^\+?\d{10,15}$/.test(value) ? null : "Invalid Phone Number"
            },
        },
        validateInputOnChange: true
    });

    const onSubmit = invitationForm.onSubmit(async (values: any) => {
        try {
            setLoading(true);
            const payload = values;
            const data = {payload, id};
            const response = await dispatch(invitationRsvp(data));
            setLoading(false);
            switch (response.type) {
                case "event/invitation/rsvp/rejected":
                    setModalType('error');
                    setModalMessage('Rsvp add failed!');
                    setModalOpened(true);
                    setTimeout(() => {
                        setModalOpened(false);
                    }, 1500);
                    break;
                case "event/invitation/rsvp/fulfilled":
                    setModalType('success');
                    setModalMessage(response?.payload?.message ? response?.payload?.message : 'Rsvp added successfully!');
                    setModalOpened(true);
                    setTimeout(() => {
                        invitationForm.reset();
                        setGoBack(true);
                        setModalOpened(false);
                    }, 1500);
                    break;
            }
        } catch (e) {
            throw e;
        }
    });


    const declineInvitation = () => {
        location.replace("/");
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading && <Loading/>}
            <section className="py-8">
                {!event?._id && <NoData text="Event Not Found!"/>}

                {event?._id && (
                    <Card shadow="sm" className="p-4 sm:p-6 lg:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: Event Image */}
                            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-full overflow-hidden rounded-md">
                                <Image
                                    src={event?.image_url}
                                    alt={event?.title}
                                    radius="md"
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                            </div>

                            {/* Right Column: Event Details */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <Text fw={700} size="xl" mb="sm">
                                        {event?.title}
                                    </Text>
                                    <Text size="sm" color="dimmed" className="mb-2">
                                        {moment(event?.start_date).format('YYYY-MM-DD')}
                                        {event?.end_date ? ` - ${moment(event?.end_date).format('YYYY-MM-DD')}` : ''}
                                    </Text>

                                    <CategoryTags categories={event?.category}/>
                                    <Text size="md" className="mb-6">
                                        {event?.description}
                                    </Text>

                                    <Divider className="my-8"/>
                                </div>

                                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                                    <TextInput
                                        size="md"
                                        radius="xl"
                                        label="Name"
                                        placeholder="Name"
                                        key={invitationForm.key('name')}
                                        {...invitationForm.getInputProps('name')}
                                    />
                                    <TextInput
                                        size="md"
                                        radius="xl"
                                        label="Email"
                                        placeholder="your@email.com"
                                        key={invitationForm.key('email')}
                                        {...invitationForm.getInputProps('email')}
                                    />
                                    <TextInput
                                        size="md"
                                        radius="xl"
                                        withAsterisk
                                        label="Phone Number"
                                        placeholder="Phone Number"
                                        key={invitationForm.key('phone_no')}
                                        {...invitationForm.getInputProps('phone_no')}
                                    />

                                    <Group className="gap-4 mt-6">
                                        <Button color="red" fullWidth onClick={declineInvitation}>
                                            {goBack ? "Home" : "Decline"}
                                        </Button>
                                        <Button type="submit" className="bg-[#63378F] hover:bg-[#552f7a]" fullWidth>
                                            Accept
                                        </Button>
                                    </Group>
                                </form>
                            </div>
                        </div>
                    </Card>
                )}
            </section>

            <ActionMessage
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                type={modalType}
                message={modalMessage}
            />
        </div>

    );
}

export default PublicView;
