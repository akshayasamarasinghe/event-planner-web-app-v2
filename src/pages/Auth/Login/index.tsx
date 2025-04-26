import {Button, Divider, PasswordInput, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {validateEmail} from "../../../utils.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store.ts";
import {login} from "../../../state/auth/authSlice.ts";
import login1 from "../../../assets/images/login.jpg"
import {useState} from "react";
import ActionMessage from "../../../components/ActionMessages.tsx";

const Login = () => {
    const dispatch = useDispatch<AppDispatch | any>();

    const [modalOpened, setModalOpened] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (_, values) => validateEmail(values),
            password: isNotEmpty("Password is required"),
        },
        validateInputOnChange: true,
    });

    const onSubmit = form.onSubmit(async (values: any) => {
        try {
            const payload = await dispatch(login(values));

            switch (payload.type) {
                case "auth/login/rejected":
                    setModalType('error');
                    setModalMessage('User logged in failed!');
                    setModalOpened(true);
                    setTimeout(() => {
                        setModalOpened(false);
                    }, 1000);
                    break;
                case "auth/login/fulfilled":
                    setModalType('success');
                    setModalMessage('User logged in successfully!');
                    setModalOpened(true);
                    setTimeout(() => {
                        setModalOpened(false);
                        if (payload?.payload?.user?.type === "ADMIN") {
                            location.replace("/admin/events");
                        } else {
                            location.replace("/app/events");
                        }
                    }, 1000);
                    break;
            }
        } catch (e) {
            console.error("Login error", e);
        }
    });

    return (
        <>
            <div
                className="min-h-[700px] bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center px-4 py-12">
                <div
                    className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                    {/* Form Side */}
                    <div className="p-10 lg:p-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
                        <p className="text-gray-600 mb-8">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-[#63378F] hover:underline">
                                Sign up here
                            </a>
                        </p>

                        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                            <TextInput
                                size="md"
                                radius="md"
                                withAsterisk
                                label="Email"
                                placeholder="your@email.com"
                                key={form.key("email")}
                                {...form.getInputProps("email")}
                            />

                            <PasswordInput
                                size="md"
                                radius="md"
                                label="Password"
                                placeholder="Password"
                                {...form.getInputProps("password")}
                            />

                            <Button
                                size="md"
                                className="mt-2"
                                variant="gradient"
                                gradient={{from: "blue", to: "#63378F"}}
                                radius="xl"
                                type="submit"
                                fullWidth
                            >
                                Login
                            </Button>
                        </form>

                        <Divider my="lg" label="Or continue with" labelPosition="center"/>

                        {/* Social Login Placeholder (Optional) */}
                        <div className="flex gap-4 justify-center mt-4">
                            <button className="border px-4 py-2 rounded-md hover:bg-gray-100">
                                <span>🌐 Google</span>
                            </button>
                            <button className="border px-4 py-2 rounded-md hover:bg-gray-100">
                                <span>📘 Facebook</span>
                            </button>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="hidden lg:block">
                        <img
                            src={login1}
                            alt="Cover"
                            className="object-cover w-full h-full rounded-r-3xl"
                        />
                    </div>
                </div>
            </div>
            <ActionMessage opened={modalOpened}
                           onClose={() => setModalOpened(false)}
                           type={modalType}
                           message={modalMessage}/>
        </>
    );
};

export default Login;
