import {Button, Image, PasswordInput, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {validateEmail} from "../../../utils.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../state/store.ts";
import {notifications} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";
import {login} from "../../../state/auth/authSlice.ts";

const Login = () => {
    const dispatch = useDispatch<AppDispatch | any>();
    const navigate = useNavigate();


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
                        message: 'System Error! 🌟',
                    })
                    break;
                case "auth/login/fulfilled":
                    notifications.show({
                        color: "green",
                        title: 'Success',
                        message: 'Successful! 🌟',
                    })
                    console.log("success");
                    if (payload?.payload?.user?.type === "ADMIN") {
                        location.reload();
                        navigate("/");
                    }
                    if (payload?.payload?.user?.type === "USER"){
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
                    <div className="m-16">
                        <p className="font-bold text-[40px] mb-2">Login</p>
                        <p className="mb-10">If you don't have an account, <a className="underline" href="/signup">Signup</a>
                        </p>

                        <form className="flex flex-col gap-4 mr-4" onSubmit={
                            onSubmit}>
                            <TextInput
                                size="md"
                                radius="xl"
                                withAsterisk
                                label="Email"
                                placeholder="your@email.com"
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                            <div>
                                <PasswordInput
                                    size="md"
                                    radius="xl"
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
                            <Button size="md" className="my-5 w-full" variant="filled" color="black" radius="xl"
                                    type="submit">Login</Button>
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

export default Login;
