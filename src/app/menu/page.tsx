"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { menuDataByRestaurant, type MenuItem } from "@/lib/menu-data";
import { RESTAURANTS } from "@/lib/restaurants";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
const menuTween = { type: "tween" as const, duration: 0.4, ease: "easeOut" as const };
const menuStagger = 0.05;

const OpeningHours: any = {
    0: [
        {
            day: "1",
            hours: "Closed"
        },
        {
            day: "2",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "3",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "4",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "5",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "6",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "0",
            hours: "8:30 AM - 11:30 PM"
        }
    ],

    1: [
        {
            day: "1",
            hours: "11.00 Uhr bis 20.00 Uhr"
        },
        {
            day: "2",
            hours: "10.00 Uhr bis 20.00 Uhr"
        },
        {
            day: "3",
            hours: "10.00 Uhr bis 20.00 Uhr"
        },
        {
            day: "4",
            hours: "10.00 Uhr bis 20.00 Uhr"
        },
        {
            day: "5",
            hours: "10.00 Uhr bis 20.00 Uhr"
        },
        {
            day: "6",
            hours: "10.00 Uhr bis 20.00 Uhr"
        },
        {
            day: "0",
            hours: "09.00 Uhr bis 19.00 Uhr"
        }
    ],

    2: [
        {
            day: "1",
            hours: "09:00 Uhr – 24:00 Uhr"
        },
        {
            day: "2",
            hours: "09:00 Uhr – 24:00 Uhr"
        },
        {
            day: "3",
            hours: "09:00 Uhr – 24:00 Uhr"
        },
        {
            day: "4",
            hours: "09:00 Uhr – 24:00 Uhr"
        },
        {
            day: "5",
            hours: "09:00 Uhr – 24:00 Uhr"
        },
        {
            day: "6",
            hours: "09:00 Uhr – 24:00 Uhr"
        },
        {
            day: "0",
            hours: "09:00 Uhr – 24:00 Uhr"
        }
    ]
}

export function MenuPageInner({ safeRestoId }: { safeRestoId: number }) {

    const [menuDialogOpen, setMenuDialogOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

    const openMenuItemDialog = (item: MenuItem) => {
        setSelectedMenuItem(item);
        setMenuDialogOpen(true);
    };

    const closeMenuItemDialog = () => {
        setMenuDialogOpen(false);
        setSelectedMenuItem(null);
    };

    return (
        <motion.div
            className="flex flex-col gap-2 w-full h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
        >

            <motion.div
                className="flex flex-col gap-2 w-full h-50 p-2 relative"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...menuTween, delay: 0.1 }}
            >

                <div className=" z-10 flex justify-start items-center gap-2 w-fit p-2 bg-white/35 rounded-full overflow-hidden backdrop-blur-md">
                    <Link href={'/'} className="flex items-center justify-center gap-1 rounded-full bg-gray-100 w-10 h-10">
                        <Image src="/icons/back.png" alt="Back" width={20} height={20} />
                    </Link>
                    <div className="flex flex-col gap-0">
                        <h3 className="text-lg font-semibold">{RESTAURANTS[safeRestoId].title}</h3>
                        <p className="text-xs ">{RESTAURANTS[safeRestoId].location}</p>
                    </div>
                </div>
                <Image src={RESTAURANTS[safeRestoId].image} alt="Menu" fill className="object-cover brightness-75 rounded-b-lg overflow-hidden" />
                <motion.div
                    className="flex flex-col gap-2 w-full z-10 absolute bottom-0 left-0 p-4 text-white  rounded-b-md"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...menuTween, delay: 0.25 }}
                >
                    <h3 className="text-3xl font-bold">Menu</h3>
                </motion.div>
            </motion.div>

            <div className="flex flex-col gap-2 h-[calc(100vh-10rem)] pb-40 overflow-scroll">
                {(menuDataByRestaurant[safeRestoId] ?? menuDataByRestaurant[1]).map((sect, sectIndex) => (
                    <motion.div
                        key={sect.section}
                        className="flex flex-col gap-2 "
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ ...menuTween, delay: 0.05 }}
                    >
                        <div className="w-full pt-4 pb-2 px-2">
                            <motion.h1
                                className="text-xl font-bold"
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...menuTween, delay: sectIndex * 0.03 }}
                            >
                                {sect.section}
                            </motion.h1>
                            {sect.description && <h4 className="text-sm text-gray-500 font-normal">{sect.description}</h4>}
                        </div>
                        {sect.items.map((item, index) => (
                            <motion.div
                                key={`${sect.section}-${index}`}
                                role="button"
                                tabIndex={0}
                                onClick={() => openMenuItemDialog(item)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openMenuItemDialog(item); }}
                                className="p-2 main-bg border border-gray-200 rounded-md gap-2 flex w-full h-fit cursor-pointer active:opacity-90 touch-manipulation"
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-20px" }}
                                transition={{ ...menuTween, delay: index * menuStagger }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="relative h-30 w-30 shrink-0">
                                    <Image src={item.image ?? '/images/def-food.png'} alt={item.name} fill className="object-cover rounded-sm" sizes="100vw" unoptimized={Boolean(item.image?.startsWith('http'))} />
                                </div>
                                <div className="w-full pt-2 overflow-hidden flex flex-col gap-1">
                                    <h3 className="text-sm font-semibold">{item.name}</h3>
                                    {item.description && (
                                        <h4 className="text-xs text-gray-600 line-clamp-2">{item.description}</h4>
                                    )}
                                    <div className="flex gap-0.5 mt-auto">
                                        {'priceVariants' in item ? (
                                            <div className="flex flex-col gap-0.5">
                                                {Object.entries(item.priceVariants).map(([variant, priceVal]) => (
                                                    <h4 key={variant} className="text-sm text-normal capitalize font-semibold">{variant} {priceVal}</h4>
                                                ))}
                                            </div>
                                        ) : (
                                            <h4 className="text-sm text-normal font-semibold">{item.price}</h4>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ))}

                <Dialog open={menuDialogOpen} onOpenChange={(open) => { if (!open) closeMenuItemDialog(); }}>
                    <DialogContent className="max-w-[min(24rem,90vw)] max-h-[85vh] overflow-y-auto p-0 gap-0">
                        {selectedMenuItem && (
                            <>
                                <div className="relative w-full h-40 rounded-t-md overflow-hidden shrink-0">
                                    <Image
                                        src={selectedMenuItem.image ?? '/images/def-food.png'}
                                        alt={selectedMenuItem.name}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                        unoptimized={Boolean(selectedMenuItem.image?.startsWith?.('http'))}
                                    />
                                </div>
                                <div className="p-4 flex flex-col gap-3">
                                    <DialogHeader className="p-0 gap-1">
                                        <DialogTitle className="text-lg text-(--salz-color)">{selectedMenuItem.name}</DialogTitle>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                                            {'priceVariants' in selectedMenuItem ? (
                                                Object.entries(selectedMenuItem.priceVariants).map(([variant, priceVal]: [string, string]) => (
                                                    <span key={variant} className="text-sm font-semibold text-gray-700 capitalize">{variant}: {priceVal}</span>
                                                ))
                                            ) : (
                                                <span className="text-sm font-semibold text-(--salz-color)">{selectedMenuItem.price}</span>
                                            )}
                                        </div>
                                    </DialogHeader>
                                    {selectedMenuItem.description && (
                                        <DialogDescription className="text-gray-600 text-sm">{selectedMenuItem.description}</DialogDescription>
                                    )}
                                    {selectedMenuItem.ingredients && (
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-800">Zutaten:</span>
                                            <p className="text-gray-600 mt-0.5">{selectedMenuItem.ingredients}</p>
                                        </div>
                                    )}
                                    {selectedMenuItem.cookingProcess && (
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-800">Zubereitung:</span>
                                            <p className="text-gray-600 mt-0.5">{selectedMenuItem.cookingProcess}</p>
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <Button variant="outline" size="sm" className="w-fit mt-2" onClick={closeMenuItemDialog}>
                                            Schliessen
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                <motion.div
                    className="p-4 main-bg border border-gray-200 shadow rounded-md"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={menuTween}
                >
                    <div className="text-black text-sm">
                        Take-Away nach Vorbestellung
                    </div>
                </motion.div>


                <motion.div
                    className="p-4 rounded-md border border-gray-200 shadow text-black text-sm font-light"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...menuTween, delay: 0.05 }}
                >
                    <span className="font-semibold">Note:</span>
                    <br />
                    <span className="text-(--salz-color)">●</span> Fleisch und Fisch Herkunft Schweiz
                    <br />
                    <span className="text-(--salz-color)">●</span> Preise in CHF inkl.
                    <br />
                    <span className="text-(--salz-color)">●</span> Mehrwertsteuer  Änderungen vorbehalten
                    <br />
                    <span className="text-(--salz-color)">●</span> Für Informationen zu Allergenen wenden Sie sich bitte
                    an unser Personal.
                </motion.div>


                <motion.div
                    className="p-4 border border-gray-200 rounded-md shadow flex flex-col gap-3"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...menuTween, delay: 0.1 }}
                >
                    <div className="text-black ">
                        <span className="text-md font-light text-md">Hat es Ihnen geschmeckt?</span>
                        <br /><span className="text-black">
                            Wir freuen uns auf Ihr Feedback
                        </span>
                    </div>

                    <Button className="salz-btn w-fit h-9!">Feedback bei Google</Button>
                </motion.div>
            </div>

            <motion.div
                className="w-full p-5 fixed bottom-0 left-0"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...menuTween, delay: 0.4 }}
            >
                <Dialog>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <DialogTrigger className="text-lg font-bold h-fit p-2 w-full bg-amber-200 rounded-full border-4  border-amber-100 shadow-lg text-center">Reservationen & Take-Away</DialogTrigger>
                    </motion.div>
                    <DialogContent className="main-bg">
                        <DialogHeader>
                            <DialogTitle className="hidden"></DialogTitle>
                            <DialogDescription>
                                <span className="text-lg font-bold py-5"> Wir freuen uns Ihre Reservationen telefonisch unter
                                    <span className="text-(--salz-color) text-xl">&nbsp;{RESTAURANTS[safeRestoId].mob}&nbsp;</span> <br /> entgegen zu nehmen.
                                    Ihr Wirtschaft zur Salzwaag Team </span>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </motion.div>
    )
}

function MenuPageFallback() {
    return (
        <div className="flex flex-col gap-2 w-full h-screen main-bg p-2 animate-pulse">
            <div className="h-20 bg-white rounded-md" />
            <div className="h-50 bg-white rounded-md" />
        </div>
    )
}

export default function MenuPage() {
    redirect("/menu/restaurant-stafa");
}