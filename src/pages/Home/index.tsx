import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import EventPlanning from "../../assets/images/event-planning.jpeg";
import EventBudgeting from "../../assets/images/event-budgeting.jpeg";
import EventPortrait from "../../assets/images/event-portrait.jpeg";

const Home = () => {
    const navigate = useNavigate();


    return (
        <div className="container mx-auto">
            <section>
                <div className="flex flex-col lg:mx-32 lg:items-center my-36">
                    <div><p className="font-bold text-[48px] mb-6">Effortless Event Planning, Tailored for You</p></div>
                    <p className="lg:mx-50 text-center text-[18px]">Whether you're hosting a corporate meetup, a
                        wedding, or a music festival, we help you plan every detail with ease.
                        Discover tools to manage invites, vendors, and schedules — all in one place.</p>
                    <Button size="md" onClick={() => {
                        navigate("/signup");
                    }} className="my-5" variant="filled" color="black" radius="md">Plan Your First Event</Button>
                </div>
            </section>

            <section>
                <div className="grid grid-cols-2 gap-20 mx-4 mb-24">
                    <div className="my-10 col-span-2 lg:col-span-1">
                        <p className="font-medium text-[48px] mb-4">Why Choose Our Event Platform?</p>
                        <p className="mb-4 text-[18px]">
                            From real-time guest tracking to automated vendor coordination, we provide powerful tools to
                            help you create
                            memorable, stress-free events. Join thousands of planners who trust us every day.
                        </p>
                        <Button size="md" variant="outline" color="black" radius="md">Explore Features</Button>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <div className="w-full h-120 grid grid-flow-col grid-rows-2 gap-x-4 gap-y-6">
                            <div className="rounded-lg border-1 border-black col-span-1 w-5/5 flex justify-center">
                                <img className="rounded-lg object-fill w-full h-full"
                                     src={EventPlanning} alt="cover photo"
                                />
                            </div>
                            <div
                                className="rounded-lg border-1 border-black w-5/5 col-span-1">
                                <img className="rounded-lg object-fill w-full h-full"
                                     src={EventBudgeting} alt="cover photo"
                                />
                            </div>
                            <div className="rounded-lg bg-gray-200 border-1 border-black col-span-1 row-span-2">
                                <img className="rounded-lg object-fill w-full h-full"
                                     src={EventPortrait} alt="cover photo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-400">
            <div className="grid grid-cols-2 gap-20 mx-7">
                    <div className="mt-10 mb-6 col-span-2 lg:col-span-1">
                        <p className="font-medium text-[48px] mb-4">Trusted by Event Planners Worldwide</p>
                        <Button size="md" variant="filled" color="black" radius="md">View Success Stories</Button>
                    </div>
                    <div className="mb-10 col-span-2 lg:col-span-1">
                        <div className="my-10 mx-4 text-[18px]">
                            <p>Join a growing community of professionals who have planned over 10,000 successful events
                                using our platform.
                                From small private parties to large-scale corporate summits - we power them all.</p>
                        </div>
                        <div className="grid grid-cols-2 mx-6">
                            <div>
                                <p className="text-[50px]">98%</p>
                                <p className="text-[18px]">User satisfaction based on post-event feedback across all
                                    industries.</p>
                            </div>
                            <div>
                                <p className="text-[50px]">+1000</p>
                                <p className="text-[18px]">Events planned using our tools - and counting!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home;
