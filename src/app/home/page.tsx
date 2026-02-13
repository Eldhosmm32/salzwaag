"use client"

import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/Navbar-Mobile";
import { Button } from "@/components/ui/button";
import { MainCarousel, MainCarouselContent, MainCarouselItem } from "@/components/ui/main-carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const CarouselItems = [
    {
        image: '/images/rest-1.jpg',
        title: "Restaurant Stäfa",
        location: "Stäfa"
    },
    {
        image: '/images/rest-2.jpg',
        title: "Badi Uetikon am See",
        location: "Uetikon am See"
    },
    {
        image: '/images/rest-3.jpg',
        title: "Bistro Schiffsteg Stäfa",
        location: "Stäfa"
    },

];

const HomePage = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <div className="hidden md:block h-screen w-full bg-black relative" >

                <div className="fixed top-0 left-0 w-full z-50">
                    <NavbarMobile />
                </div>

                <div className="w-full flex flex-col items-center justify-center h-screen z-10 relative">
                    <Image src="/images/saal.webp" alt="Chef" fill className="object-cover z-0 brightness-75" sizes="100vw" />

                    <div className="flex flex-col justify-center h-[calc(100vh-12rem)] z-10 absolute top-35 left-0 w-full p-10">

                        <div className="w-6xl mx-auto p-3">
                            <div className=" text-white rounded-xl flex flex-col items-center justify-center gap-3 px-2 py-4">
                                <div className="w-full flex gap-2">
                                    <h1 className="text-5xl font-bold ">Welcome to <span className="text-(--salz-color)">Salzwaag</span></h1>
                                </div>
                                <div className="w-full">
                                    <h3 className="text-xl">Spice up your everyday life with an exotic sensory experience or enjoy a cozy feeling of home with Swiss favorites - in a restaurant, at your event or at your home.</h3>
                                </div>
                            </div>
                        </div>

                        <Carousel className="w-6xl mx-auto h-full p-3" opts={
                            {
                                loop: true,
                                duration: 50,
                                align: 'start',
                                containScroll: 'trimSnaps',
                                dragFree: false,
                            }}
                            plugins={[Autoplay({ delay: 6000 })]}
                        >

                            <CarouselContent>
                                {CarouselItems.map((item, index) => (
                                    <CarouselItem key={index} className="basis-1/2 lg:basis-1/3 resto-carousel-section">
                                        <div className="relative h-75 rounded-2xl overflow-hidden  ">
                                            <Image src={item.image} alt="Food" fill className="object-cover" sizes="100vw" />

                                            <div className="absolute bottom-0 left-0 w-full h-auto p-2">
                                                <div className="bg-black/15 carousel-text-section rounded-2xl px-4 py-2">
                                                    <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                                                    <h5 className="text-white text-md font-normal">{item.location}</h5>
                                                </div>
                                            </div>

                                            <div className="arrow-section absolute right-2 top-2 w-10 h-10 p-2 rounded-full bg-black/15 backdrop-blur-xs flex align-center justify-center">
                                                <Image src={'/icons/arrow-right.svg'} alt="Food" width={18} height={18} sizes="100vw" />
                                            </div>

                                            <div className="carousel-text-section absolute left-2 top-2 w-fit h-fit text-sm p-2 rounded-3xl bg-black/25 ">
                                                Open Now
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>

                {/* Hosts */}

                <div className="w-full flex flex-col h-screen z-10">
                    <div className="w-6xl mx-auto p-3 py-5">
                        <h1 className="text-5xl font-bold text-(--salz-color) py-5">Our Hosts</h1>
                        <div className="w-full flex items-center gap-8">
                            <div className="w-1/2 relative h-120 rounded-2xl overflow-hidden">
                                <Image src="/images/chef.jpg" fill className="object-cover hover:scale-105 transition-all duration-300" alt="Chef" sizes="100vw" />
                                <div className="absolute bottom-0 right-0 w-fit h-auto p-2">
                                    <div className="bg-black/15 carousel-text-section rounded-2xl px-4 py-2">
                                        <h3 className="text-white text-2xl font-bold">{'Rosanna Artico &'} <br /> {'Koki Sivapatham'}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-col gap-6">

                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-bold text-(--salz-color)">Hosts with heart and soul</h1>
                                    <h1 className="text-md font-normal text-black italic">Culinary creativity for over 20 years</h1>
                                </div>

                                <div className="h-[calc(100vh-18rem)] overflow-y-scroll">
                                    <p className="text-md font-normal text-black">
                                        Rosanna Artico and Koki Sivapatham are a well-coordinated team. The service professional with a restaurant license and experience in a wide variety of establishments, from cozy pubs to excellent gourmet restaurants, and the chef with self-taught talent and inexhaustible creativity have been going through life and work together for 20 years.
                                        <br />
                                        <br />
                                        With the lease of Salzwaag in 2005, they realized their personal vision. No dish is served here unless the chef is personally convinced of its quality. Whether cordon bleu or satay skewers, beef fillet with herb butter or red snapper with sambal sauce – the entire menu of Malaysian specialties and Swiss classics is freshly cooked and, whenever possible, prepared with regional products.
                                        <br />
                                        <br />
                                        Rosanna and Koki regularly update the menu, always in close collaboration. They draw inspiration from their own culinary experiences and their guests' wishes, brainstorming ideas, meticulously working on details, and developing surprising and compelling combinations. Guests' favorite dishes, however, remain untouched.
                                        <br />
                                        <br />
                                        Their needs are always the top priority. Special requests can be specified when making a reservation and are a welcome challenge for the passionate chef. So, anyone who prefers vegan, lactose-free, or gluten-free meals, or who suffers from allergies or intolerances, can look forward to a specially tailored menu.
                                        <br />
                                        <br />
                                        Rosanna has owned Salzwaag since 2017. Today, her Malaysian-Swiss culinary delights are no longer only available on the hillside in Stäfa, but also directly on Lake Zurich. At the Schiffsteg bistro in Stäfa, Rosanna serves grilled chicken as well as select Swiss and Asian dishes, and at the Uetikon lido, guests enjoy typical beach fare of a high standard and Malaysian specialties.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts */}

                <div className="w-full flex gap-4 flex-col  z-10 relative p-5">

                    <div className="w-6xl mx-auto p-3 py-5 bg-white rounded-md z-10 shadow-2xl">
                        <h1 className="text-3xl font-bold text-(--salz-color)">Contact Us</h1>
                        <h1 className="text-md font-normal text-black italic">Culinary delights at three locations</h1>

                        <div className="flex gap-4 p-2 pt-5">
                            <div className="w-1/3 h-80 rounded-md overflow-hidden bg-muted relative">
                                {isMounted && (
                                    <>
                                        <iframe width="400" height="400" scrolling="no" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Wirtschaft%20zur%20Salzwaag%20Allenbergstrasse%2047,%208712%20St%C3%A4fa%20Allenbergstrasse%20+(Wirtschaft%20zur%20Salzwaag)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/auslandsversicherung-rechner/'>Ausland Kranken/Unfall-Versicherung</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=3daa432b640b69b3ae04c4b0a528da51c2645af3'></script>
                                    </>
                                )}

                                <div className="absolute bottom-0 left-0 w-full h-auto">
                                    <div className="bg-black/15 carousel-text-section px-4 py-2">
                                        <h3 className="text-white text-lg font-bold">Call: 043 477 05 04</h3>
                                    </div>
                                </div>

                            </div>

                            <div className="w-1/3 h-80 rounded-md overflow-hidden bg-muted relative">
                                {isMounted && (
                                    <>
                                        <iframe width="400" height="400" scrolling="no" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Strandbad%20Uetikon,%20Seestrasse%20144,%208707%20Uetikon%20am%20See%20Uetikon%20am%20See+(Strandbad%20Uetikon)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/auslandsversicherung-rechner/'>Ausland Kranken/Unfall-Versicherung</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=72c9bfb1e052c13abe687e2386b9b5f372b95d11'></script>
                                    </>
                                )}

                                <div className="absolute bottom-0 left-0 w-full h-auto">
                                    <div className="bg-black/15 carousel-text-section px-4 py-2">
                                        <h3 className="text-white text-lg font-bold">Call: 044 920 22 33</h3>
                                    </div>
                                </div>

                            </div>

                            <div className="w-1/3 h-80 rounded-md overflow-hidden bg-muted relative">
                                {isMounted && (
                                    <>
                                        <iframe width="400" height="400" scrolling="no" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Schiffsteg%20Bistro,%20Seestrasse%20St%C3%A4fa+(Bistro%20Schiffsteg)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/auslandsversicherung-rechner/'>Ausland Kranken/Unfall-Versicherung</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=07d88cf37b9384bd31fb0525f3f1451107115173'></script>
                                    </>
                                )}

                                <div className="absolute bottom-0 left-0 w-full h-auto">
                                    <div className="bg-black/15 carousel-text-section px-4 py-2">
                                        <h3 className="text-white text-lg font-bold">Call: 043 818 05 00</h3>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Footer */}

                        <footer className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4 items-center justify-center border-b border-border py-5">
                                <Link href="/" className="text-2xl font-bold text-(--salz-color) hover:opacity-90 transition-opacity">
                                    <Image
                                        src={'/wzs-logo.png'}
                                        alt="Logo"
                                        width={200}
                                        height={200}
                                        className="object-contain z-10"
                                    />
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                    Spice up your everyday life with an exotic sensory experience or enjoy Swiss favorites – in a restaurant, at your event or at your home.
                                </p>
                            </div>

                            <div className="text-center w-full justify-between gap-4 text-sm text-muted-foreground">
                                <span>© {new Date().getFullYear()} Salzwaag. All rights reserved.</span>
                            </div>
                        </footer>
                    </div>


                </div>

            </div>

            <div className="flex md:hidden flex-col items-center h-screen relative overflow-hidden">
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
                        <MainCarouselContent className="ml-0 ">
                            {CarouselItems.map((item, index) => (
                                <MainCarouselItem key={index} className="basis-full pl-0 ">
                                    <div className="relative h-screen ">
                                        <Image src={item.image} alt="Carousel" fill className="object-cover" sizes="100vw" />
                                    </div>
                                </MainCarouselItem>
                            ))}
                        </MainCarouselContent>
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