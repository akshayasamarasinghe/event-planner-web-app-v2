import {Button, Checkbox, Group, PasswordInput, Progress, Select, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {useState} from "react";
import {validateEmail} from "../../../utils.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store.ts";
import {register} from "../../../state/auth/authSlice.ts";
import signup1 from "../../../assets/images/sign-up.jpg"
import ActionMessage from "../../../components/ActionMessages.tsx";

const Signup = () => {
    const [value, setValue] = useState("");
    const [strength, setStrength] = useState(0);
    const dispatch = useDispatch<AppDispatch | any>();

    const [modalOpened, setModalOpened] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');

    const handlePasswordChange = (event: any) => {
        const password = event.currentTarget.value;
        setValue(password);
        form.setFieldValue("password", password);
        setStrength(getStrength(password));
    };

    const requirements = [
        {re: /[0-9]/, label: "Includes number"},
        {re: /[a-z]/, label: "Includes lowercase letter"},
        {re: /[A-Z]/, label: "Includes uppercase letter"},
        {re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol"},
    ];

    const getStrength = (password: string) => {
        let multiplier = password.length > 5 ? 0 : 1;
        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });
        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
    };

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            first_name: "",
            last_name: "",
            phone_no: "",
            email: "",
            password: "",
            confirm_password: "",
            type: "",
            termsOfService: false,
        },

        validate: {
            first_name: isNotEmpty("First Name is required"),
            last_name: isNotEmpty("Last Name is required"),
            email: (_, values) => validateEmail(values),
            phone_no: (value) => {
                if (!value) {
                    return "Phone Number is Required";
                }
                return /^\+?\d{10,15}$/.test(value) ? null : "Invalid Phone Number";
            },
            password: isNotEmpty("Password is required"),
            confirm_password: isNotEmpty("Confirm Password is required"),
            termsOfService: isNotEmpty("Required"),
        },
        validateInputOnChange: true,
    });

    const onSubmit = form.onSubmit(async (values: any) => {
        try {
            const payload = await dispatch(register(values));
            switch (payload.type) {
                case "auth/register/rejected":
                    setModalType('error');
                    setModalMessage('User registration failed!');
                    setModalOpened(true);
                    setTimeout(() => {
                        setModalOpened(false);
                    }, 1000);
                    break;
                case "auth/register/fulfilled":
                    setModalType('success');
                    setModalMessage('User registered in successfully!');
                    setModalOpened(true);
                    setTimeout(() => {
                        setModalOpened(false);
                        location.replace("/login");
                    }, 1000);
                    break;
            }
        } catch (e) {
            throw e;
        }
    });

    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                value={
                    value.length > 0 && index === 0
                        ? 100
                        : strength >= ((index + 1) / 4) * 100
                            ? 100
                            : 0
                }
                color={strength > 80 ? "green" : strength > 50 ? "orange" : "red"}
                key={index}
                size={4}
            />
        ));

    return (
        <div
            className="min-h-[700px] bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center px-4 py-12">
            <section
                className="h-screen bg-white/60 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Left Form Side */}
                    <div className="p-10 lg:p-16 overflow-y-auto h-full">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                            Create an Account
                        </h1>
                        <p className="text-sm text-gray-500 mb-8">
                            Already registered?{" "}
                            <a
                                className="underline text-blue-600 hover:text-blue-800"
                                href="/login"
                            >
                                Login here
                            </a>
                        </p>

                        <form className="space-y-5" onSubmit={onSubmit}>
                            <Select
                                size="md"
                                radius="md"
                                label="User Type"
                                placeholder="Select Type"
                                data={[
                                    {value: "ADMIN", label: "Admin"},
                                    {value: "USER", label: "User"},
                                ]}
                                {...form.getInputProps("type")}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextInput
                                    size="md"
                                    radius="md"
                                    withAsterisk
                                    label="First Name"
                                    placeholder="First Name"
                                    key={form.key("first_name")}
                                    {...form.getInputProps("first_name")}
                                />
                                <TextInput
                                    size="md"
                                    radius="md"
                                    withAsterisk
                                    label="Last Name"
                                    placeholder="Last Name"
                                    key={form.key("last_name")}
                                    {...form.getInputProps("last_name")}
                                />
                            </div>

                            <TextInput
                                size="md"
                                radius="md"
                                withAsterisk
                                label="Email"
                                placeholder="your@email.com"
                                key={form.key("email")}
                                {...form.getInputProps("email")}
                            />
                            <TextInput
                                size="md"
                                radius="md"
                                withAsterisk
                                label="Phone Number"
                                placeholder="+94xxxxxxxxx"
                                key={form.key("phone_no")}
                                {...form.getInputProps("phone_no")}
                            />

                            <div>
                                <PasswordInput
                                    size="md"
                                    radius="md"
                                    label="Password"
                                    placeholder="Password"
                                    data-testid="password"
                                    {...form.getInputProps("password")}
                                    value={value}
                                    onChange={handlePasswordChange}
                                />
                                <Group grow mt="xs" ml="xl" mr="xl">
                                    {bars}
                                </Group>
                            </div>

                            <PasswordInput
                                size="md"
                                radius="md"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                data-testid="confirmPassword"
                                {...form.getInputProps("confirm_password")}
                            />

                            <Checkbox
                                mt="md"
                                color="blue"
                                label="I agree to the Terms and Privacy Policy"
                                key={form.key("termsOfService")}
                                {...form.getInputProps("termsOfService", {type: "checkbox"})}
                            />

                            <Button
                                size="lg"
                                className="w-full"
                                variant="gradient"
                                gradient={{from: "blue", to: "#63378F"}}
                                radius="xl"
                                type="submit"
                            >
                                Create Account
                            </Button>
                        </form>
                    </div>

                    {/* Right Image Side */}
                    <div className="hidden lg:block h-full">
                        <img
                            className="object-cover h-full w-full"
                            src={signup1}
                            alt="Event sign up"
                        />
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

export default Signup;
