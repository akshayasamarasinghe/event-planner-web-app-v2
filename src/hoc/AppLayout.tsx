import {AppShell, Menu, NavLink} from '@mantine/core';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Events from '../pages/Events';
import EventDetailsPage from "../pages/Events/EventDetails.tsx";
import EventEditPage from "../pages/Events/EditEvent.tsx";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import UserProtectedRoute from "../ProtectedRoutes/UserProtectedRoute.tsx";
import {AuthProvider} from "../pages/Auth/AuthContext.tsx";
import {LOGGED_IN_USER, LOGGED_IN_USER_TYPE} from "../constants/constants.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../state/store.ts";
import {logOutFromServer} from "../state/auth/authSlice.ts";
import {notifications} from "@mantine/notifications";

export const AppLayout = () => {
    const userFirstname = localStorage.getItem(LOGGED_IN_USER);
    const userType = localStorage.getItem(LOGGED_IN_USER_TYPE);
    const dispatch = useDispatch<AppDispatch | any>();

    const logout = async () => {
        const payload = dispatch(logOutFromServer());
        switch (payload.type) {
            case "auth/logout/rejected":
                notifications.show({
                    color: "red",
                    title: 'Error',
                    message: 'System Error! 🌟',
                })
                break;
            case "auth/logout/fulfilled":
                notifications.show({
                    color: "green",
                    title: 'Success',
                    message: 'Successful! 🌟',
                })
                console.log("success");
                // if () {
                //
                // } else {
                //
                // }

                break;
        }
    }

    return (
        <AuthProvider>
            <BrowserRouter>
                <AppShell
                    header={{height: 70}}
                    // navbar={{
                    //     width: 300,
                    //     breakpoint: 'sm',
                    //     collapsed: { mobile: !opened },
                    // }}
                    padding="md"
                >
                    <AppShell.Header>
                        <div className="container mx-auto">
                            <div className="flex justify-between">
                                <div className="my-4 text-lg font-bold">Event Planner</div>
                                <div className="flex w-[500px] pt-2">
                                    <NavLink
                                        className="justify-self-center"
                                        href="/"
                                        label="Home"
                                    />
                                    {userType === "USER" && <NavLink
                                        href="/app/events"
                                        label="Events">
                                    </NavLink>}
                                    <NavLink
                                        href="/contact-us"
                                        label="Contact Us"
                                    />
                                    <NavLink
                                        href="/blog"
                                        label="Blog"
                                    />
                                    {!userFirstname && <NavLink
                                        href="/signup"
                                        label="Signup"
                                    />}
                                    {!userFirstname && <NavLink
                                        href="/login"
                                        label="Login"
                                    />}
                                </div>
                                <div className="flex items-center">
                                    {
                                        userFirstname ? (
                                            <Menu>
                                                <Menu.Target>
                                                    <img className="w-10 h-10 hover:cursor-pointer"
                                                         src={`https://api.dicebear.com/7.x/initials/svg?backgroundColor=d1d4f9,c0aede,ffd5dc&radius=50&seed=${userFirstname}`}
                                                         alt=""/>
                                                </Menu.Target>

                                                <Menu.Dropdown>
                                                    <Menu.Item>
                                                        Profile
                                                    </Menu.Item>
                                                    <Menu.Item color="red" onClick={() => {
                                                        logout()
                                                    }}>
                                                        Logout
                                                    </Menu.Item>

                                                    {/* Other items ... */}
                                                </Menu.Dropdown>
                                            </Menu>
                                        ) : (
                                            <div className="my-4">{""}</div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </AppShell.Header>

                    {/*<AppShell.Navbar p="md">Navbar</AppShell.Navbar>*/}

                    <AppShell.Main>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/login" element={<Login/>}/>

                            <Route path="/app/events" element={<UserProtectedRoute><Events/></UserProtectedRoute>}/>
                            <Route path="/app/events/:id"
                                   element={<UserProtectedRoute><EventDetailsPage/></UserProtectedRoute>}/>
                            <Route path="/app/events/add-edit"
                                   element={<UserProtectedRoute><EventEditPage/></UserProtectedRoute>}/>
                            <Route path="/app/events/add-edit/:id"
                                   element={<UserProtectedRoute><EventEditPage/></UserProtectedRoute>}/>
                        </Routes>
                    </AppShell.Main>
                    {/*<AppShell.Footer>*/}
                    {/*    This is footer*/}
                    {/*</AppShell.Footer>*/}
                </AppShell>
            </BrowserRouter>
        </AuthProvider>
    );
}
