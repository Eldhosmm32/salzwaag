"use client"

import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/Navbar-Mobile";
import { Button } from "@/components/ui/button";
import { MainCarousel, CarouselContent, CarouselItem } from "@/components/ui/main-carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const CarouselItems = [
    {
        image: '/images/chef.jpg',
        title: "Restaurant Stäfa"
    },
    {
        image: '/images/chef-2.jpg',
        title: "Badi Uetikon am See"
    },
    {
        image: '/images/chef-3.jpg',
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
            <div className="flex flex-col items-center h-screen relative overflow-hidden">
                <div className="w-full h-screen max-w-4xl mx-auto z-10 ">
                    <MainCarousel
                        opts={{
                            align: 'start',
                            containScroll: 'trimSnaps',
                            dragFree: false,
                            loop: true,
                            duration: 45,
                        }}
                        plugins={[Autoplay({ delay: 4000, })]}
                        className="bg-black/20 overflow-hidden"
                    >
                        <CarouselContent className="ml-0 ">
                            {CarouselItems.map((item, index) => (
                                <CarouselItem key={index} className="basis-full pl-0 ">
                                    <div className="relative h-screen ">
                                        <Image src={item.image} alt="Carousel" fill className="object-cover" sizes="100vw" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </MainCarousel>
                </div>
                <div className="p-4 absolute bottom-20 left-0 w-full z-10 overflow-hidden">

                    <div className="bg-white/20 backdrop-blur-sm p-8 rounded-md flex flex-col items-center gap-4 ">
                        <h2 className="text-black text-2xl font-bold">Welcome to</h2>

                        <Image
                            src={'/wzs-logo.png'}
                            alt="Logo"
                            width={200}
                            height={200}
                            className="object-contain z-10"
                        />

                        <div className="flex gap-2 mt-4">
                            <Button className="salz-btn" asChild>
                                <Link href="/reservation">Reservationen</Link>
                            </Button>
                            <Button className="salz-btn" asChild>
                                <Link href="/menu">Menu</Link>
                            </Button>
                        </div>

                    </div>

                </div>
            </div >
        </>
    );
};

export default HomePage;