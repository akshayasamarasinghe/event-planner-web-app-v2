import {Button, PasswordInput, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {validateEmail} from "../../../utils.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store.ts";
import {login} from "../../../state/auth/authSlice.ts";
import {notifications} from "@mantine/notifications";
import CoverPhoto from "../../../../src/assets/images/cover-two.jpeg";

const Login = () => {
    const dispatch = useDispatch<AppDispatch | any>();


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: "",
        },

        validate: {
            email: (_, values) => validateEmail(values),
            password: isNotEmpty("Password is required"),
        },
        validateInputOnChange: true
    });

    const onSubmit = form.onSubmit(async (values: any) => {
        try {
            console.log(values);
            // setLoading(true);
            const payload = await dispatch(login(values));
            console.log(payload, "payload");
            // setLoading(false);
            switch (payload.type) {
                case "auth/login/rejected":
                    notifications.show({
                        color: "red",
                        title: 'Error',
                        message: 'System Error!',
                        position: 'top-right'
                    })
                    break;
                case "auth/login/fulfilled":
                    notifications.show({
                        color: "green",
                        title: 'Success',
                        message: 'Successful!',
                        position: 'top-right'
                    })
                    console.log("success");
                    if (payload?.payload?.user?.type === "ADMIN") {
                        location.replace("/admin/events");
                    }
                    if (payload?.payload?.user?.type === "USER") {
                        location.replace("/app/events");

                    }
                    break;
            }
        } catch (e) {
            throw e;
        }
    });

    return (
        <div className="container mx-auto">
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 border-1 border-gray-300 rounded-xl">
                    <div className="lg:mx-16">
                        <p className="text-center lg:text-start font-bold text-[40px] mb-2">Login</p>
                        <p className="text-center lg:text-start mb-10">If you don't have an account, <a
                            className="underline"
                            href="/signup">Signup</a>
                        </p>

                        <form className="flex flex-col gap-4 mr-4" onSubmit={
                            onSubmit}>
                            <TextInput
                                size="md"
                                radius="md"
                                withAsterisk
                                label="Email"
                                placeholder="your@email.com"
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                            <div>
                                <PasswordInput
                                    size="md"
                                    radius="md"
                                    label="Password"
                                    placeholder="Password"
                                    data-testid="password"
                                    {...form.getInputProps("password")}
                                    // onFocus={() => setPasswordValidPop(strength !== 100)}
                                />
                                {/*<Group grow mt="xs" ml="xl" mr="xl">*/}
                                {/*    {bars}*/}
                                {/*</Group>*/}
                            </div>

                            {/*<div className="flex">*/}
                            <Button size="md" className="my-5 w-full" variant="filled" color="black" radius="md"
                                    type="submit">Login</Button>
                            {/*</div>*/}
                        </form>
                    </div>
                    <div className="hidden lg:block h-[600px] border-1 border-black rounded-lg">
                        <img className="rounded-lg object-fill w-full h-full"
                             src={CoverPhoto} alt="cover photo"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
