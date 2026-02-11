"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const RestaurantItems = [
    {
        id: 0,
        image: '/images/food-1.jpg',
        title: "Restaurant Stäfa",
        location: "Stäfa, Switzerland",
        baseColor: "purple-500"
    },
    {
        id: 1,
        image: '/images/food-2.jpg',
        title: "Badi Uetikon am See",
        location: "Uetikon am See, Switzerland",
        baseColor: "rose-100"
    },
    {
        id: 2,
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

const MenuPage = () => {
    const searchParams = useSearchParams();
    const restoId = Number(searchParams.get('restoId'));

    return (
        <div className="flex flex-col gap-2 w-full h-screen main-bg  p-2">
            <div className="flex justify-start items-center gap-2 w-full p-2 bg-white rounded-md">
                <Link href="/reservation" className="flex items-center justify-center gap-1 rounded-full bg-gray-100 w-10 h-10">
                    <Image src="/icons/back.png" alt="Back" width={25} height={25} />
                </Link>
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">{RestaurantItems[restoId].title}</h3>
                    <p className="text-sm ">{RestaurantItems[restoId].location}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full h-50  relative">
                <Image src={RestaurantItems[restoId].image} alt="Menu" fill className="object-cover rounded-md overflow-hidden" />
                <div className="flex flex-col gap-2 w-full z-10 absolute bottom-0 left-0 p-4 text-white bg-white/20 backdrop-blur-sm rounded-b-md">
                    <h3 className="text-3xl font-bold">Menu</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 h-[calc(100vh-10rem)] overflow-scroll">
                {MenuItems.map((item, index) => (
                    <div key={index} className="p-2 bg-white border border-gray-200 rounded-md gap-2 flex w-full">
                        <Image src={item.image} alt="Reservation" width={120} height={120} className="object-cover rounded-sm" />
                        <div className=" w-full pt-2">
                            <h3 className="text-sm font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.title}</h3>

                            <div className="flex gap-0.5">
                                <Image src={'/icons/clock.png'} alt="Reservation" className="" width={20} height={20} />
                                <h4 className="text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.time}</h4>
                            </div>
                        </div>
                    </div>
                ))}
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

export default MenuPage;