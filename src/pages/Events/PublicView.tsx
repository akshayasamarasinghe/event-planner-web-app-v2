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
                        setModalOpened(false);
                    }, 1500);
                    break;
            }
        } catch (e) {
            throw e;
        }
    });

    const declineInvitation = () => {
        alert('Invitation declined!');
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
                            <Text fw={700} size="xl" mb="sm">
                                {event?.title}
                            </Text>
                            <Text size="sm"
                                  color="dimmed">{moment(event?.start_date).format("YYYY-MM-DD")} {event?.end_date ? ` - ${moment(event?.end_date).format("YYYY-MM-DD")}` : ""}</Text>
                            <Text size="md" mb="xl">
                                {event.description}
                            </Text>
                            <CategoryTags categories={event?.category}></CategoryTags>

                            <Divider my="xl"/>


                            <form className="flex flex-col gap-4 mr-4" onSubmit={
                                onSubmit}>
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

                                <Group gap="md" mb="xl" mt="xl">
                                    <Button color="red" onClick={declineInvitation}>
                                        Decline
                                    </Button>
                                    <Button type="submit" color="#63378F">
                                        Accept
                                    </Button>
                                </Group>
                            </form>

                            {/* Buttons: Edit, Delete, Share, Review */}
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
}

export default PublicView;
