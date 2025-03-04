import {Button} from "@mantine/core";

const Home = () => {
    return (
        <div className="container mx-auto">
            <section>
                <div className="flex flex-col mx-32 items-center my-36">
                    <div><p className="font-bold text-[40px] mb-6">Get to know Who We are - What do we do</p></div>
                    <p className="mx-50 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                        fringilla nunc in molestie feugiat.
                        Nunc auctor consectetur elit, quis pulvina. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                        Nulla fringilla nunc in molestie feugiat</p>
                </div>
            </section>

            <section>
                <div className="grid grid-cols-2 gap-20 mx-4 mb-24">
                    <div className="my-10">
                        <p className="font-medium text-[40px] mb-4">Learn About Us and What Sets Us Apart</p>
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie
                            feugiat. Nunc auctor consectetur elit, quis pulvina. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Nulla fringilla nunc in molestie feugiat. Nunc auctor consectetur elit,
                            quis pulvina.
                        </p>
                        <Button variant="filled" color="black" radius="xl">Read Our Blog</Button>
                    </div>
                    <div>
                        <div className="w-full h-120 grid grid-flow-col grid-rows-2 gap-x-4 gap-y-6">
                            <div className="rounded-lg bg-gray-200 border-1 border-gray-300 col-span-1"></div>
                            <div
                                className="rounded-lg bg-gray-200 border-1 border-gray-300 col-span-1 row-span-2"></div>
                            <div className="rounded-lg bg-gray-200 border-1 border-gray-300 row-span-3"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-300">
                <div className="grid grid-cols-2 gap-20 mx-4">
                    <div className="mt-10 mb-6">
                        <p className="font-medium text-[40px] mb-4">Learn About Us and What Sets Us Apart</p>
                        <Button variant="filled" color="black" radius="xl">Read Our Blog</Button>
                    </div>
                    <div className="mb-10">
                        <div className="my-10 mx-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                                commodo diam libero vitae erat.</p>
                        </div>
                        <div className="grid grid-cols-2 mx-4">
                            <div>
                                <p className="text-[50px]">100%</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                    eros
                                    elementum tristique. Duis cursus, mi quis viverra ornare</p>
                            </div>
                            <div>
                                <p className="text-[50px]">90%</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                    eros
                                    elementum tristique. Duis cursus, mi quis viverra ornare</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home;
