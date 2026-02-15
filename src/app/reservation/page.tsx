import { RestoTabs, RestoTabsContent, RestoTabsList, RestoTabsTrigger } from "@/components/ui/resto-tabs";

import ReservationPage from "./[restoId]";
import Image from "next/image";


const RestaurantItems = [
    {
        id: 0,
        image: '/images/rest-1.jpg',
        title: "Restaurant Stäfa",
        location: "Stäfa, Switzerland",
        baseColor: "purple-500"
    },
    {
        id: 1,
        image: '/images/rest-2.jpg',
        title: "Badi Uetikon am See",
        location: "Uetikon am See, Switzerland",
        baseColor: "rose-100"
    },
    {
        id: 2,
        image: '/images/rest-3.jpg',
        title: "Bistro Schiffsteg Stäfa",
        location: "Stäfa, Switzerland",
        baseColor: "amber-100"
    },
];

const Reservation = () => (
    <div className="flex flex-col items-center h-screen relative overflow-hidden main-bg">
        <div className="flex flex-col items-center gap-2 w-full p-5 ">
            {/* <h3 className="text-3xl font-bold">Find your Perfect <br /> Restorent</h3> */}
            <Image
                src={'/wzs-logo.png'}
                alt="Logo"
                width={150}
                height={150}
            />
            <RestoTabs defaultValue="restaurant-0" className="w-full">
                <RestoTabsList variant="card" className="w-full justify-start overflow-auto">
                    {RestaurantItems.map((item, index) => (
                        <RestoTabsTrigger
                            key={index}
                            value={`restaurant-${index}`}
                            image={item.image}
                            description={item.location}
                            descriptionIcon="/icons/location.png"
                            className="border-4 border-red-500"
                        >
                            {item.title}
                        </RestoTabsTrigger>
                    ))}
                </RestoTabsList>
                {RestaurantItems.map((item, index) => (
                    <RestoTabsContent key={index} value={`restaurant-${index}`} className="mt-2">
                        <div className="h-[calc(100vh-10rem)] overflow-scroll rounded-md  text-card-foreground">
                            <ReservationPage restoId={index} />
                        </div>
                    </RestoTabsContent>
                ))}
            </RestoTabs>
        </div>
    </div>
)

export default Reservation;