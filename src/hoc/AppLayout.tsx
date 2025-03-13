import {AppShell, NavLink} from '@mantine/core';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import EventPage from '../pages/Eventi/eventpage';

export const AppLayout = () => {

    return (
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
                            <div className="flex w-[400px] pt-2">
                                <NavLink
                                    className="justify-self-center"
                                    href="/"
                                    label="Home"
                                />
                                <NavLink
                                    href="/eventpage"
                                    label="Events">
                                </NavLink>
                                <NavLink
                                    href="/contact-us"
                                    label="Contact Us"
                                />
                                <NavLink
                                    href="/blog"
                                    label="Blog"
                                />
                            </div>
                            <div className="my-4">User</div>
                        </div>
                    </div>
                </AppShell.Header>

                {/*<AppShell.Navbar p="md">Navbar</AppShell.Navbar>*/}

                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </AppShell.Main>
                {/*<AppShell.Footer>*/}
                {/*    This is footer*/}
                {/*</AppShell.Footer>*/}
            </AppShell>
        </BrowserRouter>
    );
}
