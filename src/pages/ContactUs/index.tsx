import {Button, Card, Divider, Group, Textarea, TextInput, Title,} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";

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
        console.log(values);
        form.reset();
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-r from-sky-50 to-indigo-100 flex items-center justify-center py-16 px-4">
            <Card
                shadow="lg"
                padding="2rem"
                radius="lg"
                className="w-full max-w-2xl bg-white/90 backdrop-blur-md border border-gray-200"
            >
                <Title order={2} className="mb-2 text-center text-gray-800">
                    Contact Us
                </Title>
                <p className="text-center text-gray-600 mb-6">
                    We'd love to hear from you! Reach out with questions, ideas or feedback.
                </p>

                <Divider my="md"/>

                <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-5">
                    <TextInput
                        label="Full Name"
                        placeholder="John Doe"
                        radius="md"
                        size="md"
                        withAsterisk
                        classNames={{
                            input: "bg-white",
                            label: "text-gray-700 font-medium mb-1",
                        }}
                        {...form.getInputProps("name")}
                    />

                    <TextInput
                        label="Email Address"
                        placeholder="you@example.com"
                        radius="md"
                        size="md"
                        withAsterisk
                        classNames={{
                            input: "bg-white",
                            label: "text-gray-700 font-medium mb-1",
                        }}
                        {...form.getInputProps("email")}
                    />

                    <Textarea
                        label="Your Message"
                        placeholder="Type your message here..."
                        radius="md"
                        size="md"
                        autosize
                        minRows={4}
                        withAsterisk
                        classNames={{
                            input: "bg-white",
                            label: "text-gray-700 font-medium mb-1",
                        }}
                        {...form.getInputProps("message")}
                    />

                    <Group mt="md">
                        <Button
                            type="submit"
                            radius="xl"
                            size="md"
                            color="indigo"
                            className="transition-all duration-200 hover:scale-105"
                        >
                            Send Message
                        </Button>
                    </Group>
                </form>
            </Card>
        </div>
    );
};

export default ContactUs;
