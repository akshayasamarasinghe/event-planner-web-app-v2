import {Button, Checkbox, Group, Image, PasswordInput, Progress, Select, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {useState} from "react";
import {validateEmail} from "../../../utils.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store.ts";
import {notifications} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";
import {register} from "../../../state/auth/authSlice.ts";

const Signup = () => {
    const [value, setValue] = useState("");
    const [strength, setStrength] = useState(0);
    const dispatch = useDispatch<AppDispatch | any>();
    const navigate = useNavigate();

    const handlePasswordChange = (event: any) => {
        const password = event.currentTarget.value;
        setValue(password);
        form.setFieldValue("password", password);
        setStrength(getStrength(password));
        // setPasswordValidPop(getStrength(password) !== 100);
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
        mode: 'uncontrolled',
        initialValues: {
            first_name: "",
            last_name: "",
            phone_no: "",
            email: '',
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
                return /^\+?\d{10,15}$/.test(value) ? null : "Invalid Phone Number"
            },
            password: isNotEmpty("Password is required"),
            confirm_password: isNotEmpty("Confirm Password is required"),
            termsOfService: isNotEmpty("Required"),
        },
        validateInputOnChange: true
    });

    const onSubmit = form.onSubmit(async (values: any) => {
        try {
            const payload = await dispatch(register(values));
            switch (payload.type) {
                case "auth/register/rejected":
                    notifications.show({
                        color: "red",
                        title: 'Error',
                        message: 'System Error! 🌟',
                    })
                    break;
                case "auth/register/fulfilled":
                    notifications.show({
                        color: "green",
                        title: 'Success',
                        message: 'Successful! 🌟',
                    })
                    console.log("success");
                    navigate("/");
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
                // styles={{bar: {transitionDuration: "0ms"}}}
                value={value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0}
                color={strength > 80 ? "green" : strength > 50 ? "orange" : "red"}
                key={index}
                size={4}
            />
        ));
    return (
        <div className="container mx-auto">
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 border-1 border-gray-300 rounded-xl">
                    <div className="m-16">
                        <p className="font-bold text-[40px] mb-2">Signup</p>
                        <p className="mb-10">Already have an Account, <a className="underline" href="/login">Login</a>
                        </p>

                        <form className="flex flex-col gap-4 mr-4" onSubmit={
                            onSubmit}>
                            <Select
                                size="md"
                                radius="xl"
                                label="User Type"
                                placeholder="Select Type"
                                data={[
                                    {value: 'ADMIN', label: 'Admin'},
                                    {value: 'USER', label: 'User'},
                                ]}
                                {...form.getInputProps('type')}
                            />
                            <TextInput
                                size="md"
                                radius="xl"
                                withAsterisk
                                label="First Name"
                                placeholder="First Name"
                                key={form.key('first_name')}
                                {...form.getInputProps('first_name')}
                            />
                            <TextInput
                                size="md"
                                radius="xl"
                                withAsterisk
                                label="Last Name"
                                placeholder="Last Name"
                                key={form.key('last_name')}
                                {...form.getInputProps('last_name')}
                            />
                            <TextInput
                                size="md"
                                radius="xl"
                                withAsterisk
                                label="Email"
                                placeholder="your@email.com"
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                size="md"
                                radius="xl"
                                withAsterisk
                                label="Phone Number"
                                placeholder="Phone Number"
                                key={form.key('phone_no')}
                                {...form.getInputProps('phone_no')}
                            />
                            <div>
                                <PasswordInput
                                    size="md"
                                    radius="xl"
                                    label="Password"
                                    placeholder="Password"
                                    data-testid="password"
                                    {...form.getInputProps("password")}
                                    value={value}
                                    onChange={handlePasswordChange}
                                    // onFocus={() => setPasswordValidPop(strength !== 100)}
                                />
                                <Group grow mt="xs" ml="xl" mr="xl">
                                    {bars}
                                </Group>
                            </div>

                            <PasswordInput
                                size="md"
                                radius="xl"
                                label="Confirm Password"
                                data-testid="confirmPassword"
                                placeholder="Confirm Password"
                                {...form.getInputProps("confirm_password")}
                            />

                            <Checkbox
                                mt="md"
                                color="black"
                                label="I have read and agreed to the Terms of Service and Privacy Policy"
                                key={form.key('termsOfService')}
                                {...form.getInputProps('termsOfService', {type: 'checkbox'})}
                            />

                            {/*<div className="flex">*/}
                            <Button size="md" className="my-5 w-full" variant="filled" color="black" radius="xl"
                                    type="submit">Create Account</Button>
                            {/*</div>*/}
                        </form>
                    </div>
                    <div className="flex p-1">
                        <Image
                            radius="md"
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup;
