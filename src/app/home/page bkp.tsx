"use client"

import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/Navbar-Mobile";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/main-carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

const CarouselItems = [
    {
        image: '/images/food-1.jpg',
        title: "Restaurant Stäfa"
    },
    {
        image: '/images/food-2.jpg',
        title: "Badi Uetikon am See"
    },
    {
        image: '/images/food-3.jpg',
        title: "Bistro Schiffsteg Stäfa"
    },
];

const HomePage = () => {
    return (
        <>
            <div className="hidden lg:block" >
                < Navbar />
            </div>
            {/* <div className="block lg:hidden" >
                < NavbarMobile />
            </div> */}
            <div className="flex flex-col h-screen text-black bg-black relative overflow-hidden">

                {/* <div className=" absolute h-screen w-full bg-black/40 backdrop-blur-xs"></div> */}
                <div className="w-full  h-screen flex ">
                    <div className="max-w-220 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-5 z-10">

                        <div className="flex flex-col p-2 gap-4 bg-black/20 py-10 px-5 rounded-md z-10">
                            <h2 className="font-(family-name:--font-rubik) text-3xl font-normal text-white ">Welcome to</h2>
                            <Image
                                src={'/wzs-logo-w.png'}
                                alt="Logo"
                                width={400}
                                height={400}
                            />
                            <h2 className="font-(family-name:--font-rubik) text-xl font-normal text-white text-center ">Explore our unique dining experiences across the city</h2>
                          
                        </div>
                        {/* <video
                            src={'/videos/intro.mp4'}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="object-cover z-0 absolute top-0 left-0 h-full"
                        /> */}

                        {/* <div className="absolute bottom-0 top-35 w-full h-screen max-w-4xl mx-auto z-10 ">
                            <Carousel
                                opts={{
                                    align: 'start',
                                    containScroll: 'trimSnaps',
                                    dragFree: false,
                                    loop: true,
                                    duration: 45,
                                }}
                                plugins={[Autoplay({ delay: 5000, })]}
                                className="bg-black/20 backdrop-blur-sm rounded-sm overflow-hidden"
                            >
                                <CarouselContent className="ml-0 ">
                                    {CarouselItems.map((item, index) => (
                                        <CarouselItem key={index} className="basis-full pl-0 ">
                                            <div className="flex gap-2 p-2 font-(family-name:--font-rubik) ">
                                                <div className="w-1/2  items-center justify-center flex flex-col gap-4 p-4">
                                                    <h2 className="text-4xl text-white font-bold">{item.title}</h2>
                                                    <h3 className="text-sm text-white font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat veniam cupiditate beatae amet ducimus veritatis delectus magnam voluptates exercitationem totam? Quaerat sint iure dolor pariatur quasi architecto aliquid, temporibus voluptates.</h3>

                                                    <div className="flex gap-2 items-center justify-center">
                                                        <div className="salz-btn-white w-35 text-center">Reservationen</div>
                                                        <div className="salz-btn-white w-35 text-center">Menu</div>
                                                    </div>

                                                </div>
                                                <div className="w-1/2 h-100 relative">
                                                    <Image src={item.image} alt="Carousel" fill className="object-cover rounded-sm" sizes="100vw" />
                                                </div>
                                            </div>

                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div> */}
                    </div>
                </div>
            </div >


            {/* <div className="h-screen w-full flex gap-5">
                <h2></h2>

                <div className="w-1/2">
                    <Image src="/images/food-1.jpg" alt="Food" width={500} height={500} />
                </div>
                <div className="w-1/2">
                    <Image src="/images/food-2.jpg" alt="Food" width={500} height={500} />
                </div>
            </div>

            <div className="h-screen w-full flex gap-5">
                <div className="w-1/2">
                    <Image src="/images/food-1.jpg" alt="Food" width={500} height={500} />
                </div>
                <div className="w-1/2">
                    <Image src="/images/food-2.jpg" alt="Food" width={500} height={500} />
                </div>
            </div> */}

        </>
    );
};

export default HomePage;