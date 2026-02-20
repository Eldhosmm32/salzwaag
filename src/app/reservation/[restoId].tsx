"use client"

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { menuDataByRestaurant } from "@/lib/menu-data";
import { RESTAURANTS, getRestoSlugById } from "@/lib/restaurants";
import Image from "next/image";
import Link from "next/link";

const OpeningHours = {
    0: [
        {
            day: "Monday",
            hours: "Closed"
        },
        {
            day: "Tuesday",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "Wednesday",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "Thursday",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "Friday",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "Saturday",
            hours: "8:30 AM - 11:30 PM"
        },
        {
            day: "Sunday",
            hours: "8:30 AM - 11:30 PM"
        }
    ],

    1: [
        {
            day: "Monday",
            hours: "11:00 AM - 8:00 PM"
        },
        {
            day: "Tuesday",
            hours: "10:00 AM - 8:00 PM"
        },
        {
            day: "Wednesday",
            hours: "10:00 AM - 8:00 PM"
        },
        {
            day: "Thursday",
            hours: "10:00 AM - 8:00 PM"
        },
        {
            day: "Friday",
            hours: "10:00 AM - 8:00 PM"
        },
        {
            day: "Saturday",
            hours: "10:00 AM - 8:00 PM"
        },
        {
            day: "Sunday",
            hours: "9:00 AM - 7:00 PM"
        }
    ],

    2: [
        {
            day: "Monday",
            hours: "9:00 AM - 12:00 AM"
        },
        {
            day: "Tuesday",
            hours: "9:00 AM - 12:00 AM"
        },
        {
            day: "Wednesday",
            hours: "9:00 AM - 12:00 AM"
        },
        {
            day: "Thursday",
            hours: "9:00 AM - 12:00 AM"
        },
        {
            day: "Friday",
            hours: "9:00 AM - 12:00 AM"
        },
        {
            day: "Saturday",
            hours: "9:00 AM - 12:00 AM"
        },
        {
            day: "Sunday",
            hours: "9:00 AM - 12:00 AM"
        }
    ]
}
const ReservationPage = ({ restoId }: { restoId: number }) => {

    return (
        <div>
            <div className="flex gap-5 flex-col w-full h-screen overflow-scroll">
                <div className="flex flex-col gap-2 w-full ">
                    <div className="flex flex-col gap-2 w-full min-h-50 bg-white rounded-md p-4 ">
                        <h3 className="text-xl font-semibold">Menu</h3>
                        <Carousel
                            opts={{
                                align: "center",
                            }}
                            className="w-full sm:max-w-xs md:max-w-sm"
                        >
                            <CarouselContent>
                                {(menuDataByRestaurant[restoId] ?? []).flatMap((sect) =>
                                    sect.items.map((item, index) => (
                                        <CarouselItem key={`${sect.section}-${index}`} className="basis-1/2">
                                            <div className="p-1 bg-white border border-gray-200 rounded-md w-40">
                                                <div className="relative h-25 w-full">
                                                    <Image src="/images/def-food.png" alt={item.name} fill className="object-cover rounded-sm" sizes="100vw" />
                                                </div>
                                                <div className=" w-full pt-2">
                                                    <h3 className="text-sm font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.name}</h3>
                                                    <div className="flex gap-0.5">
                                                        <h4 className="text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden w-full">
                                                            {'priceVariants' in item
                                                                ? Object.values(item.priceVariants)[0]
                                                                : item.price}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))
                                )}
                            </CarouselContent>
                        </Carousel>
                        <Button className="border border-orange-400 w-full" variant="outline">
                            <Link href={`/menu/${getRestoSlugById(restoId)}`}> View All</Link>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-2 w-full min-h-50 bg-white rounded-md p-4 ">
                        <h3 className="text-xl font-semibold">Opening Hours</h3>

                        <Table className="text-md font-normal">
                            <TableBody>
                                {OpeningHours[restoId as keyof typeof OpeningHours].map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.day}</TableCell>
                                        <TableCell>{item.hours}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <div className="w-full p-5 fixed bottom-0 left-0">
                <div className="flex justify-between gap-2 bg-amber-200/10 rounded-full p-2 backdrop-blur-lg border-3 ">
                    <div className="flex flex-col gap-0.5 pl-2 w-1/2">
                        <Link href={`/${getRestoSlugById(restoId)}`} className="font-semibold text-ellipsis overflow-hidden w-full whitespace-nowrap hover:underline">{RESTAURANTS[restoId]?.title}</Link>
                        <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden w-full whitespace-nowrap">{RESTAURANTS[restoId]?.location}</p>
                    </div>
                    <h3 className="text-lg font-bold h-fit p-2 w-1/2 bg-amber-200 rounded-full text-center">Reservationen</h3>
                </div>
            </div>
        </div>



    )
}

export default ReservationPage;