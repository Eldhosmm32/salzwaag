"use client"

import Maps from "@/components/Maps";
import Navbar from "@/components/Navbar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CarouselItems = [
    {
        id: 0,
        image: '/images/rest-1.jpg',
        title: "Restaurant Stäfa",
        location: "Stäfa"
    },
    {
        id: 1,
        image: '/images/rest-2.jpg',
        title: "Badi Uetikon am See",
        location: "Uetikon am See"
    },
    {
        id: 2,
        image: '/images/rest-3.jpg',
        title: "Bistro Schiffsteg Stäfa",
        location: "Stäfa"
    },

];

const MenuItems = [
    {
        id: 1,
        restaurantId: 0,
        image: '/images/food-1.jpg',
        title: "Asia-Platte",
        price: "CHF 17.30"
    },
    {
        id: 2,
        restaurantId: 0,
        image: '/images/food-2.jpg',
        title: "Blattsalat an Honig-Senf-Sauce mit grillierter Ente",
        price: "CHF 20.30"
    },
    {
        id: 3,
        restaurantId: 0,
        image: '/images/food-3.jpg',
        title: "Grüner Blattsalat",
        price: "CHF 14.30"
    },
    {
        id: 4,
        restaurantId: 1,
        image: '/images/food-4.jpg',
        title: "Mixed olives",
        price: "CHF 5.50"
    },
    {
        id: 5,
        restaurantId: 1,
        image: '/images/food-5.jpg',
        title: "Parmesan cheese, piece ",
        price: "CHF 5.50"
    },
    {
        id: 6,
        restaurantId: 1,
        image: '/images/food-6.jpg',
        title: "Sandwiches of your choice ",
        price: "CHF 7.00"
    },

];

const OpeningHours: any = {
    0: [
        {
            day: 0,
            hours: {
                open: "8:30",
                close: "23:30"
            }
        }, {
            day: 1,
            hours: null
        },
        {
            day: 2,
            hours: {
                open: "8:30",
                close: "23:30"
            }
        },
        {
            day: 3,
            hours: {
                open: "8:30",
                close: "23:30"
            }
        },
        {
            day: 4,
            hours: {
                open: "8:30",
                close: "23:30"
            }
        },
        {
            day: 5,
            hours: {
                open: "8:30",
                close: "23:30"
            }
        },
        {
            day: 6,
            hours: {
                open: "8:30",
                close: "23:30"
            }
        },

    ],

    1: [
        {
            day: 0,
            hours: {
                open: "09:00",
                close: "19:00"
            }
        },
        {
            day: 1,
            hours: {
                open: "11:00",
                close: "20:00"
            }
        },
        {
            day: 2,
            hours: {
                open: "10:00",
                close: "20:00"
            }
        },
        {
            day: 3,
            hours: {
                open: "10:00",
                close: "20:00"
            }
        },
        {
            day: 4,
            hours: {
                open: "10:00",
                close: "20:00"
            }
        },
        {
            day: 5,
            hours: {
                open: "10:00",
                close: "20:00"
            }
        },
        {
            day: 6,
            hours: {
                open: "10:00",
                close: "20:00"
            }
        },

    ],

    2: [
        {
            day: 0,
            hours: {
                open: "09:00",
                close: "23:59"
            }
        },
        {
            day: 1,
            hours: {
                open: "09:00",
                close: "23:59"
            }
        },
        {
            day: 2,
            hours: {
                open: "09:00",
                close: "23:59"
            }
        },
        {
            day: 3,
            hours: {
                open: "09:00",
                close: "23:59"
            }
        },
        {
            day: 4,
            hours: {
                open: "09:00",
                close: "23:59"
            }
        },
        {
            day: 5,
            hours: {
                open: "09:00",
                close: "23:59"
            }
        },
        {
            day: 6,
            hours: {
                open: "09:00",
                close: "23:59"
            }
        },

    ]
}

const getOpenOrNot = (index: number) => {
    const today = new Date().getDay();
    const hours = OpeningHours[index][today]?.hours;
    if (!hours) {
        return "Closed";
    }
    let definedOpen = new Date()
    let definedClose = new Date()
    definedOpen.setHours(parseInt(hours?.open.split(':')[0]), parseInt(hours?.open.split(':')[1]), 0, 0);
    definedClose.setHours(parseInt(hours?.close.split(':')[0]), parseInt(hours?.close.split(':')[1]), 0, 0);
    if (definedClose < new Date()) {
        return "Open at " + hours?.open;
    }
    return definedOpen > new Date() && definedClose < new Date() ? "Open at " + hours?.open : "Closed by " + hours?.close;
}

const HomePage = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <div className="hidden md:block h-screen w-full bg-black relative" >

                <div className="fixed top-0 left-0 w-full z-50">
                    <Navbar />
                </div>

                <div className="w-full flex flex-col items-center justify-center h-screen z-10 relative">
                    <Image src="/images/saal.webp" alt="Chef" fill className="object-cover z-0 brightness-75" sizes="100vw" />

                    <div className="flex flex-col gap-8 justify-center h-[calc(100vh-12rem)] z-10 absolute top-35 left-0 w-full p-10">

                        <div className="w-6xl mx-auto">
                            <div className=" text-white rounded-xl flex flex-col items-center justify-center gap-3 px-2 py-4">
                                <div className="w-full flex gap-2">
                                    <h1 className="text-5xl font-bold ">Welcome to <span className="text-(--salz-color)">Salzwaag</span></h1>
                                </div>
                                <div className="w-full">
                                    <h3 className="text-xl font-normal">Den Alltag mit einem exotischen Sinnesrausch aufpeppen oder wohliges Heimatgefühl mit Schweizer Leibspeisen geniessen - im Restaurant, auf Ihrem Event oder bei Ihnen zu Hause.</h3>
                                </div>
                            </div>
                        </div>

                        <Carousel className="w-6xl mx-auto h-full" opts={
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
                                        <Link href={`/resto?restoId=${index}`}>
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
                                                    {getOpenOrNot(index)}
                                                </div>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>

                {/* Hosts */}

                <div className="w-full flex flex-col justify-center h-screen z-10">
                    <div className="w-6xl mx-auto py-5">
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

                {/* Specials */}

                <div className="w-full flex flex-col justify-center min-h-screen z-10">
                    <div className="w-6xl mx-auto py-5">
                        <h1 className="text-5xl font-bold text-(--salz-color) py-5">Our Specials</h1>
                        <div className="grid grid-cols-3 gap-10">
                            {MenuItems.map((item, index) => (
                                <div key={index} className={`p-2 cursor-pointer bg-white border-3 h-50 border-gray-200 rounded-md overflow-hidden gap-2 flex w-full relative hover:border-(--salz-color)/80 hover:scale-102 transition-all duration-300 group`}>
                                    <Image src={item.image} alt="Reservation" fill className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-300" sizes="100vw" />
                                    <div className="w-full pt-2 overflow-hidden text-black flex flex-col gap-1 absolute bottom-0 left-0 p-2 bg-white/30 group-hover:bg-white/80 transition-all duration-300 backdrop-blur-xs">
                                        <h3 className="text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden ">{item.title}</h3>

                                        <div className="flex gap-0.5">
                                            <h4 className="text-md text-normal whitespace-nowrap text-ellipsis overflow-hidden ">available At: {CarouselItems[item.restaurantId].title}</h4>
                                        </div>
                                    </div>

                                    <div className="absolute top-2 right-2 p-2 bg-white/50 group-hover:bg-white transition-all duration-300 text-(--salz-color) font-bold backdrop-blur-xs rounded-md">
                                        <h4 className="text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden ">{item.price}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* About Us */}

                <div className="w-full flex gap-4 flex-col  z-10 relative p-5 footer-bg">

                    <div className="w-6xl mx-auto py-5 bg-white rounded-md z-10 ">
                        <h1 className="text-4xl font-bold text-(--salz-color)">Contact Us</h1>
                        <h1 className="text-md font-normal text-black italic">Culinary delights at three locations</h1>

                        <div className="flex gap-4 justify-around p-5 pt-5">
                            <div className="w-1/3 h-70 rounded-md overflow-hidden bg-muted relative">
                                <Maps Id={0}></Maps>
                            </div>

                            <div className="w-1/3 h-70 rounded-md overflow-hidden bg-muted relative">
                                <Maps Id={1}></Maps>
                            </div>

                            <div className="w-1/3 h-70 rounded-md overflow-hidden bg-muted relative">
                                <Maps Id={1}></Maps>
                            </div>
                        </div>

                        {/* Footer */}

                        <footer className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4 items-center justify-center border-b border-border py-5 px-15">
                                <Link href="/" className="text-2xl font-bold text-(--salz-color) hover:opacity-90 transition-opacity">
                                    <Image
                                        src={'/wzs-logo.png'}
                                        alt="Logo"
                                        width={200}
                                        height={200}
                                        className="object-contain z-10"
                                    />
                                </Link>
                                <p className="text-sm text-center text-muted-foreground">
                                    Den Alltag mit einem exotischen Sinnesrausch aufpeppen oder wohliges Heimatgefühl mit Schweizer Leibspeisen geniessen - im Restaurant, auf Ihrem Event oder bei Ihnen zu Hause.
                                </p>
                            </div>

                            <div className="text-center w-full justify-between gap-4 text-sm text-muted-foreground">
                                <span>© {new Date().getFullYear()} Salzwaag. All rights reserved.</span>
                            </div>
                        </footer>
                    </div>

                </div>

            </div >

            {/* <div className="flex md:hidden flex-col items-center h-screen relative overflow-hidden">
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
            </div > */}

            <div className="flex md:hidden flex-col items-center min-h-screen w-full relative overflow-auto pt-4 main-bg">
                <Image
                    src={'/wzs-logo.png'}
                    alt="Logo"
                    width={150}
                    height={150}
                />
                <div className="flex flex-col gap-4 w-full pt-8 px-4 pb-8">
                    {CarouselItems.map((item, index) => (
                        <Link key={index} href={`/menu?restoId=${index}`} className="block w-full">
                            <div className="relative h-75 rounded-2xl overflow-hidden w-full">
                                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="100vw" />
                                <div className="absolute bottom-0 left-0 w-full h-auto p-2">
                                    <div className="bg-black/15 carousel-text-section rounded-2xl px-4 py-2">
                                        <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                                        <h5 className="text-white text-md font-normal">{item.location}</h5>
                                    </div>
                                </div>
                                <div className="arrow-section absolute right-2 top-2 w-10 h-10 p-2 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center">
                                    <Image src="/icons/arrow-right.svg" alt="Arrow" width={18} height={18} sizes="100vw" />
                                </div>
                                <div className="carousel-text-section absolute left-2 top-2 w-fit h-fit text-sm p-2 rounded-3xl bg-black/25 text-white">
                                    Open Now
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomePage;