"use client"

import Footer from "@/components/Footer";
import Maps from "@/components/Maps";
import Navbar from "@/components/Navbar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RESTAURANTS } from "@/lib/restaurants";

const fadeUp = { opacity: 0, y: 24 };
const fadeUpEnd = { opacity: 1, y: 0 };
const fadeIn = { opacity: 0 };
const fadeInEnd = { opacity: 1 };
const tween = { type: "tween" as const, duration: 0.5, ease: "easeOut" as const };
const stagger = 0.08;

const CarouselItems = RESTAURANTS.map((r) => ({
    id: r.id,
    image: r.image,
    title: r.title,
    location: r.location.split(",")[0] ?? r.location,
}));

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
                    <motion.div
                        className="absolute inset-0 z-0"
                        initial={{ scale: 1.05 }}
                        animate={isMounted ? { scale: 1 } : { scale: 1.05 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <Image src="/images/saal.webp" alt="Chef" fill className="object-cover brightness-75" sizes="100vw" />
                    </motion.div>

                    <div className="flex flex-col gap-6 md:gap-8 justify-center h-[calc(100vh-12rem)] z-10 absolute top-35 left-0 w-full p-4 md:p-6 lg:p-10">

                        <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto px-2">
                            <motion.div
                                className=" text-white rounded-xl flex flex-col items-center justify-center gap-3 px-2 py-4"
                                initial={fadeUp}
                                animate={isMounted ? fadeUpEnd : fadeUp}
                                transition={{ ...tween, delay: 0.15 }}
                            >
                                <div className="w-full flex gap-2">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold ">Willkommen bei <span className="text-(--salz-color)">Salzwaag</span></h1>
                                </div>
                                <motion.div
                                    className="w-full"
                                    initial={fadeUp}
                                    animate={isMounted ? fadeUpEnd : fadeUp}
                                    transition={{ ...tween, delay: 0.3 }}
                                >
                                    <h3 className="text-base md:text-lg lg:text-xl font-normal">Den Alltag mit einem exotischen Sinnesrausch aufpeppen oder wohliges Heimatgefühl mit Schweizer Leibspeisen geniessen - im Restaurant, auf Ihrem Event oder bei Ihnen zu Hause.</h3>
                                </motion.div>
                            </motion.div>
                        </div>

                        <Carousel className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto h-full px-2" opts={
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
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ ...tween, delay: 0.4 + index * stagger }}
                                        >
                                            <Link href={`/${RESTAURANTS[index].slug}`}>
                                                <div className="relative h-56 md:h-64 lg:h-75 rounded-lg overflow-hidden  ">
                                                    <Image src={item.image} alt="Food" fill className="object-cover" sizes="100vw" />
                                                    <div className="absolute bottom-0 left-0 w-full h-auto p-2">
                                                        <div className="bg-black/15 carousel-text-section rounded-2xl px-3 md:px-4 py-2">
                                                            <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold">{item.title}</h3>
                                                            <h5 className="text-white text-sm md:text-md font-normal">{item.location}</h5>
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
                                        </motion.div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>

                {/* Hosts */}

                <motion.div
                    className="w-full flex flex-col justify-center min-h-screen md:h-screen z-10"
                    initial={fadeIn}
                    whileInView={fadeInEnd}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ ...tween, duration: 0.6 }}
                >
                    <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto py-5 px-4 md:px-6 lg:px-0">
                        <motion.h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--salz-color) py-4 md:py-5"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...tween, delay: 0.1 }}
                        >
                            Unsere Gastgeber
                        </motion.h1>
                        <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center gap-6 md:gap-8">
                            <motion.div
                                className="w-full lg:w-1/2 relative h-72 md:h-96 lg:h-120 rounded-2xl overflow-hidden shrink-0"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...tween, delay: 0.2 }}
                            >
                                <Image src="/images/chef.jpg" fill className="object-cover hover:scale-105 transition-all duration-300" alt="Chef" sizes="100vw" />
                                <div className="absolute bottom-0 right-0 w-fit h-auto p-2">
                                    <div className="bg-black/15 carousel-text-section rounded-2xl px-3 md:px-4 py-2">
                                        <h3 className="text-white text-xl md:text-2xl font-bold">{'Rosanna Artico &'} <br /> {'Koki Sivapatham'}</h3>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...tween, delay: 0.25 }}
                            >

                                <div className="flex flex-col">
                                    <h1 className="text-2xl md:text-3xl font-bold text-(--salz-color)">Gastgeber mit Leib und Seele</h1>
                                    <h1 className="text-sm md:text-md font-normal text-black italic">Seit über 20 Jahren kulinarisch kreativ</h1>
                                </div>

                                <div className="h-80 md:h-112 lg:h-[calc(100vh-18rem)] overflow-y-scroll">
                                    <p className="text-sm md:text-md font-normal text-black">
                                        Rosanna Artico und Koki Sivapatham sind ein eingespieltes Team. Die Servicefachfrau mit Wirtepatent und Erfahrung in verschiedensten Häusern von gemütlichen Beizen bis ausgezeichneten Gourmet-Tempeln und der Koch mit autodidaktischem Talent und unerschöpflicher Kreativität gehen seit 20 Jahren privat und beruflich gemeinsam durchs Leben.
                                        <br />
                                        <br />
                                        Mit der Pacht der Salzwaag 2005 haben sie ihre persönliche Vision verwirklicht. Hier wird kein Gericht serviert, ohne dass der Küchenchef persönlich von dessen Qualität überzeugt ist. Ob Cordon bleu oder Satay-Spiess, ob Rindsfilet mit Kräuterbutter oder Red Snapper an Sambal-Sauce – das komplette Angebot aus malaysischen Spezialitäten und Schweizer Klassikern wird frisch gekocht und wenn möglich aus regionalen Produkten zubereitet.
                                        <br />
                                        <br />
                                        Rosanna und Koki erneuern die Speisekarte regelmässig und immer in enger Zusammenarbeit. Dazu lassen sie sich von ihren eigenen kulinarischen Erlebnissen und den Wünschen ihrer Gäste inspirieren, hecken Ideen aus, tüfteln an Details und entwickeln so überraschende und überzeugende Kombinationen. Unangetastet bleiben dabei die Lieblingsgerichte der Gäste.
                                        <br />
                                        <br />
                                        Deren Bedürfnisse stehen immer an oberster Stelle. Sonderwünsche dürfen bei der Reservation angegeben werden und sind für den leidenschaftlichen Koch eine willkommene Herausforderung. Wer also gerne vegan, laktose- oder glutenfrei isst, an Allergien oder Unverträglichkeiten leidet, darf sich auf ein eigens angepasstes Menü freuen.
                                        <br />
                                        <br />
                                        Seit 2017 ist Rosanna Inhaberin der Salzwaag. Heute steht der malaysisch-schweizerische Gaumenschmaus nicht mehr nur am Stäfner Hang zur Verfügung, sondern auch direkt am Zürichsee. Im Stäfner Bistro Schiffsteg serviert Rosanna Güggeli vom Grill sowie ausgewählte Schweizer und asiatische Gerichte, und in der Badi Uetikon geniessen die Gäste typische Strandbad-Speisen in gehobener Qualität und malaysische Highlights.
                                    </p>
                                </div>

                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Specials */}

                <motion.div
                    className="w-full flex flex-col justify-center min-h-screen z-10"
                    initial={fadeIn}
                    whileInView={fadeInEnd}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ ...tween, duration: 0.6 }}
                >
                    <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto py-5 px-4 md:px-6  lg:px-0">
                        <motion.h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--salz-color) py-4 md:py-5"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={tween}
                        >
                            Unsere Specials
                        </motion.h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                            {MenuItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-2 cursor-pointer bg-white border-3 h-44 md:h-48 lg:h-50 border-gray-200 rounded-md overflow-hidden gap-2 flex w-full relative hover:border-(--salz-color)/80 hover:scale-102 transition-all duration-300 group`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-24px" }}
                                    transition={{ ...tween, delay: index * stagger }}
                                >
                                    <Image src={item.image} alt="Reservation" fill className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-300" sizes="100vw" />
                                    <div className="w-full pt-2 overflow-hidden text-black flex flex-col gap-1 absolute bottom-0 left-0 p-2 bg-white/30 group-hover:bg-white/80 transition-all duration-300 backdrop-blur-xs">
                                        <h3 className="text-base md:text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden ">{item.title}</h3>

                                        <div className="flex gap-0.5">
                                            <h4 className="text-sm md:text-md text-normal whitespace-nowrap text-ellipsis overflow-hidden ">available At: {CarouselItems[item.restaurantId].title}</h4>
                                        </div>
                                    </div>

                                    <div className="absolute top-2 right-2 p-2 bg-white/50 group-hover:bg-white transition-all duration-300 text-(--salz-color) font-bold backdrop-blur-xs rounded-md">
                                        <h4 className="text-xs md:text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden ">{item.price}</h4>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>


                {/* About Us */}

                <motion.div
                    className="w-full flex gap-4 flex-col  z-10 relative"
                    initial={fadeIn}
                    whileInView={fadeInEnd}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ ...tween, duration: 0.5 }}
                >

                    <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto py-5 px-4 md:px-6  lg:px-0 bg-white rounded-md z-10 ">
                        <motion.h1
                            className="text-3xl md:text-4xl font-bold text-(--salz-color)"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={tween}
                        >
                            Kontaktieren Sie uns
                        </motion.h1>
                        <h1 className="text-sm md:text-md font-normal text-black italic">Kulinarisch verwöhnt an drei Standorten</h1>

                        <div className="flex flex-col md:flex-row gap-4 justify-around p-4 md:p-5 lg:p-0 pt-4 md:pt-5 lg:pt-5">
                            {[0, 1, 2].map((id, i) => (
                                <motion.div
                                    key={id}
                                    className="w-full md:w-1/3 h-56 md:h-64 lg:h-70 rounded-md overflow-hidden bg-muted relative min-h-56"
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ ...tween, delay: i * 0.1 }}
                                >
                                    <Maps Id={id}></Maps>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    {/* Footer */}
                    <Footer />
                </motion.div>

            </div >

            <motion.div
                className="flex md:hidden flex-col items-center min-h-screen w-full relative overflow-auto pt-4 main-bg"
                initial={fadeIn}
                animate={fadeInEnd}
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ ...tween, delay: 0.1 }}
                >
                    <Image
                        src={'/wzs-logo.png'}
                        alt="Logo"
                        width={150}
                        height={150}
                    />
                </motion.div>
                <div className="flex flex-col gap-4 w-full pt-8 px-4 pb-8">
                    {CarouselItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ ...tween, delay: 0.2 + index * 0.1 }}
                        >
                            <Link href={`/menu/${RESTAURANTS[index].slug}`} className="block w-full">
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
                                        {getOpenOrNot(index)}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default HomePage;