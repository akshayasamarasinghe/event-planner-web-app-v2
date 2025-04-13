import {Button, Card, Group, Textarea, TextInput, Title} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";

const ContactUs = () => {
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validate: {
            name: isNotEmpty("Name is required"),
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            message: isNotEmpty("Message cannot be empty"),
        },
        validateInputOnChange: true,
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log("Form submitted:", values);
        notifications.show({
            title: "Message Sent",
            message: "We’ll get back to you soon!",
            color: "green",
        });
        form.reset();
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <Card shadow="sm" padding="xl" radius="md">
                <Title order={1} className="mb-4">
                    Contact Us
                </Title>
                <p className="mb-6">
                    Got questions, feedback, or need help? Fill out the form below and our team will respond as soon as
                    possible.
                </p>

                <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
                    <TextInput
                        label="Name"
                        placeholder="Your Name"
                        radius="xl"
                        size="md"
                        withAsterisk
                        {...form.getInputProps("name")}
                    />

                    <TextInput
                        label="Email"
                        placeholder="you@example.com"
                        radius="xl"
                        size="md"
                        withAsterisk
                        {...form.getInputProps("email")}
                    />

                    <Textarea
                        label="Message"
                        placeholder="Type your message here..."
                        radius="md"
                        size="md"
                        autosize
                        minRows={4}
                        withAsterisk
                        {...form.getInputProps("message")}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit" radius="xl" size="md" color="black">
                            Send Message
                        </Button>
                    </Group>
                </form>
            </Card>
        </div>
    );
};

export default ContactUs;
