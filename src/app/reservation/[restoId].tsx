import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";

const RestaurantItems = [
    {
        image: '/images/food-1.jpg',
        title: "Restaurant Stäfa",
        location: "Stäfa, Switzerland",
        baseColor: "purple-500"
    },
    {
        image: '/images/food-2.jpg',
        title: "Badi Uetikon am See",
        location: "Uetikon am See, Switzerland",
        baseColor: "rose-100"
    },
    {
        image: '/images/food-3.jpg',
        title: "Bistro Schiffsteg Stäfa",
        location: "Stäfa, Switzerland",
        baseColor: "amber-100"
    },
];

const MenuItems = [
    {
        id: 1,
        restaurantId: 0,
        image: '/images/food-1.jpg',
        title: "Asia-Platte",
        time: "17.30"
    },
    {
        id: 2,
        restaurantId: 0,
        image: '/images/food-2.jpg',
        title: "Blattsalat an Honig-Senf-Sauce mit grillierter Ente",
        time: "20.30"
    },
    {
        id: 3,
        restaurantId: 0,
        image: '/images/food-3.jpg',
        title: "Grüner Blattsalat",
        time: "14.30"
    },
    {
        id: 4,
        restaurantId: 1,
        image: '/images/food-4.jpg',
        title: "Mixed olives CHF 5.50",
        time: "09.30"
    },
    {
        id: 5,
        restaurantId: 1,
        image: '/images/food-5.jpg',
        title: "Parmesan cheese, piece CHF 5.50",
        time: "11.30"
    },
    {
        id: 6,
        restaurantId: 1,
        image: '/images/food-6.jpg',
        title: "Sandwiches of your choice CHF 7.00",
        time: "10.30"
    },
    {
        id: 7,
        restaurantId: 2,
        image: '/images/food-3.jpg',
        title: "Half a chicken with salad",
        time: "12.30"
    },
    {
        id: 8,
        restaurantId: 2,
        image: '/images/food-6.jpg',
        title: "Half a chicken with salad and fries",
        time: "3.30"
    },
    {
        id: 9,
        restaurantId: 2,
        image: '/images/food-2.jpg',
        title: "Dockside salad with grilled duck",
        time: "24.30"
    }
];

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
                                {MenuItems.map((item, index) => (
                                    <CarouselItem key={index} className={`basis-1/2 ${item.restaurantId === restoId ? 'block' : 'hidden'}`}>
                                        <div className="p-1 bg-white border border-gray-200 rounded-md w-40">
                                            <div className="relative h-25 w-full">
                                                <Image src={item.image} alt="Reservation" fill className="object-cover rounded-sm" sizes="100vw" />
                                            </div>
                                            <div className=" w-full pt-2">
                                                <h3 className="text-sm font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.title}</h3>

                                                <div className="flex gap-0.5">
                                                    <Image src={'/icons/clock.png'} alt="Reservation" className="" width={20} height={20} />
                                                    <h4 className="text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.time}</h4>
                                                </div>
                                            </div>
                                        </div>

                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                        <Button className="border border-orange-400 w-full" variant="outline">
                            <Link href={`/menu?restoId=${restoId}`}> View All</Link>
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

            <div className="w-full p-5 absolute bottom-0 left-0">
                <div className="flex justify-between gap-2 bg-amber-200/10 rounded-full p-2 backdrop-blur-lg border-3 ">
                    <div className="flex flex-col gap-0.5 pl-2 w-1/2">
                        <p className="font-semibold text-ellipsis overflow-hidden w-full whitespace-nowrap">{RestaurantItems[restoId].title}</p>
                        <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden w-full whitespace-nowrap">{RestaurantItems[restoId].location}</p>
                    </div>
                    <h3 className="text-lg font-bold h-fit p-2 w-1/2 bg-amber-200 rounded-full text-center">Reservationen</h3>
                </div>
            </div>
        </div>



    )
}

export default ReservationPage;