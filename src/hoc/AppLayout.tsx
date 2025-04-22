import {AppShell, Menu, NavLink} from '@mantine/core';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Events from '../pages/Events';
import AdminEvents from '../pages/Admin/Events/index.tsx';
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
import PublicView from "../pages/Events/PublicView.tsx";
import AdminProtectedRoute from "../ProtectedRoutes/AdminProtectedRoute.tsx";
import Dashboard from "../pages/Admin/Dashboard";
import {useEffect, useState} from "react";
import ContactUs from "../pages/ContactUs";
import Logo from "../../src/assets/images/logo.png";

export const AppLayout = () => {
    const userFirstname = localStorage.getItem(LOGGED_IN_USER);
    const userType = localStorage.getItem(LOGGED_IN_USER_TYPE);
    const dispatch = useDispatch<AppDispatch | any>();
    const [activePath, setActivePath] = useState(window.location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    const logout = async () => {
        const payload = dispatch(logOutFromServer());
        switch (payload.type) {
            case "auth/logout/rejected":
                notifications.show({
                    color: "red",
                    title: 'Error',
                    message: 'System Error!',
                    position: "top-right"
                })
                break;
            case "auth/logout/fulfilled":
                notifications.show({
                    color: "green",
                    title: 'Success',
                    message: 'Successful!',
                    position: "top-right"
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
                    className="bg-[#D9D4E9]"
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
                                <div className="h-10">
                                    <img className="py-3" src={Logo} height={20} width={130}
                                         alt="logo-image"/>
                                </div>
                                <div className="flex w-[500px] pt-2">
                                    {userType === "ADMIN" && <NavLink
                                        active={activePath.startsWith("/admin/dashboard")}
                                        href="/admin/dashboard"
                                        label="Dashboard">
                                    </NavLink>}
                                    {userType === "ADMIN" && <NavLink
                                        active={activePath.startsWith("/admin/events")}
                                        href="/admin/events"
                                        label="Events">
                                    </NavLink>}
                                    {userType === "ADMIN" && <NavLink
                                        label="Payments">
                                    </NavLink>}
                                    {userType !== "ADMIN" && <NavLink
                                        active={activePath.startsWith("/home")}
                                        className="justify-self-center"
                                        href="/home"
                                        label="Home"
                                    />}
                                    {userType === "USER" && <NavLink
                                        active={activePath.startsWith("/app/events")}
                                        href="/app/events"
                                        label="Events">
                                    </NavLink>}
                                    {!userFirstname && <NavLink
                                        active={activePath.startsWith("/contact-us")}
                                        href="/contact-us"
                                        label="Contact Us"
                                    />}
                                    {userType === "USER" && <NavLink
                                        active={activePath.startsWith("/blog")}
                                        href="/blog"
                                        label="Blog"
                                    />}
                                    {!userFirstname && <NavLink
                                        active={activePath.startsWith("/signup")}
                                        href="/signup"
                                        label="Signup"
                                    />}
                                    {!userFirstname && <NavLink
                                        active={activePath.startsWith("/login")}
                                        href="/login"
                                        label="Login"
                                    />}
                                </div>
                                <div className="flex items-center">
                                    {
                                        userFirstname ? (
                                            <Menu>
                                                <Menu.Target>
                                                    <div
                                                        className="flex items-center border-1 border-gray-300 rounded-lg m-1 hover:cursor-pointer">
                                                        <div className="m-2">
                                                            <p className="text-[16px]">{userFirstname}</p>
                                                            <p className="text-[10px]">{userType}</p>
                                                        </div>
                                                        <img className="m-2 w-8 h-8"
                                                             src={`https://api.dicebear.com/7.x/initials/svg?backgroundColor=d1d4f9,c0aede,ffd5dc&radius=50&seed=${userFirstname}`}
                                                             alt=""/>
                                                    </div>
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
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/contact-us" element={<ContactUs/>}/>
                            <Route path="/invitation/:id" element={<PublicView/>}/>

                            <Route path="/app/events" element={<UserProtectedRoute><Events/></UserProtectedRoute>}/>
                            <Route path="/app/events/:id"
                                   element={<UserProtectedRoute><EventDetailsPage/></UserProtectedRoute>}/>
                            <Route path="/app/events/add-edit"
                                   element={<UserProtectedRoute><EventEditPage/></UserProtectedRoute>}/>
                            <Route path="/app/events/add-edit/:id"
                                   element={<UserProtectedRoute><EventEditPage/></UserProtectedRoute>}/>
                            <Route path="/admin/events"
                                   element={<AdminProtectedRoute><AdminEvents/></AdminProtectedRoute>}/>
                            <Route path="/admin/dashboard"
                                   element={<AdminProtectedRoute><Dashboard/></AdminProtectedRoute>}/>
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
