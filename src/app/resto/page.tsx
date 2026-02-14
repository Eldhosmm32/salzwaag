"use client"
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableBody, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type MenuItem =
    | {
        name: string;
        price: string;
        description?: string;
    }
    | {
        name: string;
        priceVariants: Record<string, string>;
        description?: string;
    };

type MenuSection = {
    section: string;
    description?: string;
    items: MenuItem[];
};

type MenuData = MenuSection[];

const RestaurantItems = [
    {
        id: 0,
        image: '/images/rest-1.jpg',
        title: "Restaurant Stäfa",
        desc: 'Malaysian and Swiss cuisine under one roof',
        location: "Stäfa, Switzerland",
        baseColor: "purple-500"
    },
    {
        id: 1,
        image: '/images/rest-2.jpg',
        title: "Badi Uetikon am See",
        desc: 'Swimming and feasting at the Uetikon public swimming pool',
        location: "Uetikon am See, Switzerland",
        baseColor: "rose-100"
    },
    {
        id: 2,
        image: '/images/rest-3.jpg',
        title: "Bistro Schiffsteg Stäfa",
        desc: 'Malaysian and Swiss cuisine under one roof',
        location: "Stäfa, Switzerland",
        baseColor: "amber-100"
    },
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


const menuDataBadi: MenuData = [
    {
        section: "Kalte Speisen",
        items: [
            { name: "Gemischte Oliven", price: "CHF 5.50", description: "Eine Auswahl erlesener Oliven mit mediteranen Aromen" },
            { name: "Parmesan Stk.", price: "CHF 5.50", description: "fein gereifter Parmesan nussig im Geschmack" },
            { name: "Sandwiches nach Wahl", price: "CHF 7.00", description: "belegt mit den Lieblingszutaten - ein Genuss für jeden Geschmack" },
            { name: "Wurstsalat garniert", price: "CHF 13.00", description: "liebevoll garniert - perfekt für den kleinen Hunger" },
            { name: "Wurst-Käsesalat garniert", price: "CHF 14.50", description: "liebevoll garniert - perfekt für den grösseren Hunger" },
            { name: "Cesarsalat", priceVariants: { klein: "CHF 15.00", gross: "CHF 22.00" }, description: "mit gebratener Pouletbrust einfach lecker" },
            { name: "Tagessalat", price: "CHF 9.50", description: "bunter Mix aus Saisonalen Zutaten" },
            { name: "Blattsalat", price: "CHF 9.00", description: "knackiger Blattsalat an feinem Dressing" },
            { name: "Gemischter Salat", price: "CHF 11.00", description: "harmonische Kombination, frisch und knackig" },
            { name: "Blattsalat nach Wahl", price: "CHF 16.50", description: "mit Frühlingsrollen, Samosa, Sesamstängeli oder pan. Crevetten serviert mit süsser Chilisauce" },
            { name: "Kartoffelsalat", price: "CHF 8.00", description: "herzhaft und lecker" },
            { name: "Siedfleischsalat", priceVariants: { klein: "CHF 14.50", gross: "CHF 21.50" }, description: "es hät solang`s hät" },
            { name: "Thonsalat einfach", price: "CHF 13.00", description: "perfekt für den kleinen Hunger" },
            { name: "Thonsalat garniert", price: "CHF 15.50", description: "liebevoll garniert - perfekt für den kleinen Hunger" }
        ]
    },
    {
        section: "Warme Speisen",
        items: [
            { name: "Pommes Frites", price: "CHF 9.00", description: "Goldbraun und knusprig" },
            { name: "Trüffel Pommes Frites", price: "CHF 11.00", description: "verfeinert mit edlem Trüffelöl" },
            { name: "Black Angus Burger *", price: "CHF 14.50", description: "ein Genuss aus hochwertigem Rindfleisch und frischen Zutaten" },
            { name: "Black Angus Cheeseburger *", price: "CHF 15.50", description: "ein Genuss aus hochwertigem Rindfleisch und frischen Zutaten" },
            { name: "Vegi Burger *", price: "CHF 11.50", description: "herzhaftes Gemüsepatty, das auch Fleischliebhaber überzeugt" },
            { name: "Schweineschnitzel paniert *", price: "CHF 18.50", description: "knusprig und goldbraun gebraten" },
            { name: "Schnitzel im Pitabrot *", price: "CHF 14.00", description: "knusprig und lecker" },
            { name: "Paar Wienerli", price: "CHF 6.00", description: "serviert mit Brot" },
            { name: "Chicken Nuggets *", price: "CHF 9.00", description: "perfekt für den kleinen Hunger" },
            { name: "Fisch Chnusperli *", price: "CHF 19.50", description: "serviert mit cremiger Tartarsauce" },
            { name: "Pinsa Margherita", price: "CHF 15.00", description: "luftig und lecker" },
            { name: "Pinsa mit Fleisch", price: "CHF 16.50", description: "luftig und lecker" },
            { name: "Frühlingsrollen", price: "CHF 8.50", description: "gefüllt mit Gemüse und serviert mit süsser Chilisauce" },
            { name: "Sesamstängeli", price: "CHF 8.50", description: "gefüllt mit würzigem Pouletfleisch und serviert mit süsser Chilisauce" },
            { name: "Samosa", price: "CHF 8.50", description: "gefüllt mit würzigem Gemüse und serviert mit süsser Chilisauce" },
            { name: "Panierte Crevetten", price: "CHF 8.50", description: "gefüllt mit Gemüse und serviert mit süsser Chilisauce" },
            { name: "Asia Platte", price: "CHF 17.00", description: "Frühlingsrollen, Samosa, Sesamstängeli und pan. Crevetten serviert mit süsser Chilisauce" }
        ]
    },
    {
        section: "*Beilagen",
        items: [
            { name: "Salat", price: "CHF 4.00" },
            { name: "Pommes", price: "CHF 3.00" }
        ]
    }
];

const menuDataRestaurantStafa: MenuData = [
    {
        section: "Appetizers",
        items: [
            { name: "Asian Platter", price: "CHF 17.30", description: "2 sesame sticks, 2 samosas, 1 skewer, 2 spring rolls, 2 breaded prawns, sweet chili dip" },
            { name: "Leaf salad with honey and mustard sauce and grilled duck", price: "CHF 20.30" },
            { name: "Green leaf salad", price: "CHF 10.50" },
            { name: "Mixed salad", price: "CHF 13.30" },
            { name: "Leaf salad with delicate, grilled scampi", price: "CHF 18.30" },
            { name: "Leaf salad with sweet and sour fish", price: "CHF 17.30" },
            { name: "Leaf salad of your choice", price: "CHF 17.30", description: "Spring roll or breaded prawns, samosa or sesame sticks" },
            { name: "Salad plate salt scales", priceVariants: { starter: "CHF 18.30", mainCourse: "CHF 28.30" }, description: "with chicken strips and lukewarm mushrooms" },
            { name: "Tomato soup with cream topping", price: "CHF 12.80" },
            { name: "French onion soup", price: "CHF 12.80" },
            { name: "Asian soups (on request)", price: "CHF 13.80", description: "with chicken, shrimp, fish or vegetables" }
        ]
    },
    {
        section: "Fish and shrimp - LIKE A HOLIDAY BY THE SEA",
        items: [
            { name: "Seafood curry", price: "CHF 38.30", description: "with lobsters, slipper lobsters, scallops, tilapia, red snapper, prawns, mango and basmati rice" },
            { name: "Black Tiger", price: "CHF 34.30", description: "King prawns Szechuan style with basmati rice" },
            { name: "Giant prawns in curry sauce", price: "CHF 34.30", description: "with tomatoes, snow peas and basmati rice" },
            { name: "Fried red snapper in a delicate sambal sauce", price: "CHF 34.80", description: "with vegetables and basmati rice" },
            { name: "Fried king prawns", price: "CHF 34.30", description: "with rice noodles, vegetables, egg" }
        ]
    },
    {
        section: "Main courses - MALAYSIAN SPECIALTIES AND SWISS CLASSICS",
        items: [
            { name: "Veal schnitzel", price: "CHF 36.30", description: "with herb butter, French fries or buttered noodles" },
            { name: "Beef fillet with pepper sauce or herb butter", priceVariants: { regular: "CHF 46.30", smallPortion: "CHF 36.30" }, description: "with French fries or buttered noodles" },
            { name: "Chicken breast Alibaba", price: "CHF 27.30", description: "Chicken breast topped with bacon, tomatoes and cheese, with hash browns" },
            { name: "Pork cordon bleu", price: "CHF 30.30", description: "Homemade, with French fries" },
            { name: "Scaloppine al limone", price: "CHF 36.30", description: "Veal schnitzel with lemon sauce, French fries or buttered noodles" },
            { name: "Steak Poivre", price: "CHF 32.30", description: "Pork steak (approx. 300 grams) with pepper sauce and buttered noodles" },
            { name: "Wiener Schnitzel", priceVariants: { regular: "CHF 36.30", smallPortion: "CHF 29.30" }, description: "Breaded veal schnitzel with French fries" },
            { name: "Lamb fillet", price: "CHF 34.30", description: "with herb butter and French fries" }
        ]
    },
    {
        section: "Chicken - ASIAN INTERPRETATION",
        items: [
            { name: "Ayamhijan", price: "CHF 29.30", description: "Chicken with pineapple, coconut, cauliflower and basmati rice" },
            { name: "Lemon", price: "CHF 29.30", description: "Chicken in a delicate lemongrass sauce with basmati rice" },
            { name: "Rendang", price: "CHF 29.30", description: "Chicken in spicy Malaysian curry sauce with basmati rice" },
            { name: "Satay skewers", price: "CHF 29.30", description: "Chicken satay skewers in a delicate peanut sauce with basmati rice" },
            { name: "Ayam", price: "CHF 29.30", description: "Fried chicken in green curry with Chinese cabbage, nuts, mango and basmati rice" }
        ]
    },
    {
        section: "Beef - CLASSIC AND EXOTIC",
        items: [
            { name: "Beef curry", price: "CHF 34.30", description: "Beef fillet cubes with beans and mushrooms, basmati rice" },
            { name: "Spicy beef", price: "CHF 34.30", description: "Beef with vegetables and noodles" },
            { name: "Beef Rendang", price: "CHF 34.30", description: "with spicy Malaysian curry sauce with lemongrass and basmati rice" },
            { name: "Chili Beef", price: "CHF 34.30", description: "Spicy chili sauce with vegetables, mushrooms, nuts and pasta" },
            { name: "Beef Orange", price: "CHF 32.30", description: "with pepperoni, onions, cashew nuts and basmati rice" },
            { name: "Beef satay skewers", price: "CHF 34.30", description: "with a delicate peanut sauce, leeks, and basmati rice" },
            { name: "Beef fillet cubes", price: "CHF 34.30", description: "Curry sauce with pineapple, onions, pepperoni and basmati rice" }
        ]
    },
    {
        section: "Lamb - HARMONIOUSLY COMBINED",
        items: [
            { name: "Lamb fillet Malai", price: "CHF 34.30", description: "Satay sauce with leeks and basmati rice" },
            { name: "Lamb fillet in sour sauce", price: "CHF 34.30", description: "with pepperoni, onions, carrots and pasta" },
            { name: "Roast lamb fillet with sambal sauce", price: "CHF 34.30", description: "with vegetables, nuts and basmati rice" },
            { name: "Lamb Rendang", price: "CHF 34.30", description: "with spicy Malaysian curry sauce and basmati rice" },
            { name: "Roasted lamb fillet with curry sauce", price: "CHF 34.30", description: "with Chinese cabbage, mango and basmati rice" }
        ]
    },
    {
        section: "Duck - ESPECIALLY FINE",
        items: [
            { name: "Grilled duck with orange sauce", price: "CHF 34.30", description: "with basmati rice" },
            { name: "Grilled duck with curry sauce", price: "CHF 34.30", description: "with pineapple, vegetables and basmati rice" },
            { name: "Grilled duck with mixed greens", price: "CHF 34.30", description: "with honey mustard sauce" },
            { name: "Grilled duck with honey-mustard sauce", price: "CHF 34.30", description: "with glass noodles and vegetables" }
        ]
    },
    {
        section: "Vegetarian - SURPRISING AND HEALTHY",
        items: [
            { name: "Vegetables in green curry", price: "CHF 26.30", description: "with seasonal vegetables and basmati rice" },
            { name: "Fried noodles", price: "CHF 26.30", description: "with vegetables" }
        ]
    },
    {
        section: "Nasi Goreng - SPECIALTIES",
        items: [
            { name: "Rice pan with vegetables (Nasi Goreng style)", price: "CHF 26.30" },
            { name: "Fried vegetables in satay sauce", price: "CHF 25.30", description: "and Basmati rice" }
        ]
    },
    {
        section: "Side dishes - DELICIOUS SIDE ITEM",
        items: [
            { name: "Plain noodles", price: "CHF 6.00" },
            { name: "Fried rice", price: "CHF 7.00" },
            { name: "Fried noodles", price: "CHF 7.00" },
            { name: "Vegetables", price: "CHF 7.00" },
            { name: "Fried vegetarian noodles", price: "CHF 7.00" },
            { name: "Tofu", price: "CHF 7.00", description: "pre-order required" }
        ]
    }
];

const menuDataBistroSchiffsteg: MenuData = [
    {
        section: "Chicken - FROM THE GRILL",
        items: [
            { name: "Half a chicken", price: "CHF 18.80", description: "with salad" },
            { name: "Half a chicken", price: "CHF 23.80", description: "with salad and fries" },
            { name: "Whole chicken", price: "CHF 22.80", description: "Takeaway" },
            { name: "Half a chicken", price: "CHF 12.50", description: "Takeaway" }
        ]
    },
    {
        section: "Schnitzel - THE CLASSIC",
        items: [
            { name: "Portion of French fries", price: "CHF 8.50" },
            { name: "Breaded pork schnitzel", price: "CHF 26.50", description: "with fries and salad" }
        ]
    },
    {
        section: "Fish - FOR LOVERS",
        items: [
            { name: "Baked perch", price: "CHF 22.50", description: "with lemon and tartar sauce" },
            { name: "Baked perch", price: "CHF 29.80", description: "with fries or salad, lemon and tartar sauce" }
        ]
    },
    {
        section: "Hot and cold dishes - FOR EVERY TASTE",
        items: [
            { name: "Dockside salad with grilled duck", price: "CHF 24.80" },
            { name: "Salad bowl with spring rolls", price: "CHF 22.00", description: "Tomatoes and fruit, sweet and sour sauce" },
            { name: "Salad bowl with breaded shrimp", price: "CHF 22.00", description: "Tomatoes and fruit, sweet and sour sauce" },
            { name: "Salad bowl with samosa", price: "CHF 22.00", description: "Tomatoes and fruit, sweet and sour sauce" },
            { name: "Salad bowl with puff pastry", price: "CHF 22.00", description: "Filled with chicken and lemongrass, tomatoes and fruit, sweet and sour sauce" },
            { name: "Boiled beef salad garnished", price: "CHF 24.00", description: "It lasts as long as it lasts" },
            { name: "Caesar salad with chicken and bacon", price: "CHF 22.80", description: "Parmesan cheese and garlic croutons" },
            { name: "Sausage salad garnished", price: "CHF 18.50" },
            { name: "Sausage and cheese salad garnished", price: "CHF 22.00" },
            { name: "Beefsteak Tartar", priceVariants: { large: "CHF 28.50", small: "CHF 21.50" }, description: "Toast, butter, onion rings" }
        ]
    }
];

const menuDataByRestaurant: Record<number, MenuData> = {
    0: menuDataRestaurantStafa,
    1: menuDataBadi,
    2: menuDataBistroSchiffsteg
};

const RestoPage = () => {
    const searchParams = useSearchParams();
    const restoId = Number(searchParams.get("restoId"));
    const safeRestoId =
        Number.isNaN(restoId) || restoId < 0 || restoId >= RestaurantItems.length ? 0 : restoId;


    return (
        <div className="w-full flex flex-col gap-2 items-center h-screen z-10 ">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            <div className="w-full h-full relative resto-bg">

                <div className="mx-auto h-120 flex">
                    <div className="w-1/2 pl-45 pr-10 flex flex-col justify-center gap-4">
                        <div className="flex flex-col text-black gap-4 font-(family-name:--font-lora)">
                            <h2 className="text-6xl font-bold">{RestaurantItems[safeRestoId].title}</h2>
                            <h3 className="text-xl font-normal">{RestaurantItems[safeRestoId].desc}</h3>
                        </div>
                        <div className="flex gap-4">
                            <Button className="salz-btn w-fit" asChild>
                                <Link href="/reservation">Reservationen</Link>
                            </Button>

                        </div>
                    </div>

                    <div className="w-1/2 h-full relative overflow-hidden">
                        <div className="flex gap-2 absolute left-2 bottom-2">
                            <div className="carousel-text-section w-fit h-fit text-sm p-2 px-3 rounded-3xl bg-red-500/50 text-white z-10">
                                Monday Closed
                            </div>
                            <div className="carousel-text-section w-fit h-fit text-sm p-2  px-3 rounded-3xl bg-green-500/50 text-white z-10">
                                Open from Tuesday to Sunday 08:30 AM - 11:3 0 PM
                            </div>
                        </div>
                        <Image src={RestaurantItems[safeRestoId].image} alt="Chef" fill className="object-cover z-0 brightness-75 hover:scale-105 transition-all duration-300" sizes="100vw" />
                    </div>

                </div>
            </div>

            <div className="w-6xl h-fit flex gap-2">
                <div className="w-full bg-white relative flex flex-col gap-2 p-5">
                    <h1 className="text-5xl font-bold text-(--salz-color) pt-5">Menu</h1>
                    <div className="flex flex-col gap-2">
                        {(menuDataByRestaurant[safeRestoId] ?? menuDataBadi).map((sect) => (
                            <div key={sect.section} className="flex flex-col gap-2">
                                <div className="w-full pt-10 pb-5">
                                    <h1 className="text-2xl font-bold">{sect.section}</h1>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {sect.items.map((item, index) => (
                                        <div key={`${sect.section}-${index}`} className="cursor-pointer bg-white border-3 h-50 border-gray-200 rounded-md overflow-hidden gap-2 flex w-full relative hover:border-(--salz-color)/80 hover:scale-102 transition-all duration-300 group">
                                            <div className="relative w-full min-h-50">
                                                <Image src="/images/def-food.png" alt={item.name} fill className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-300 rounded-md" sizes="100vw" />
                                            </div>
                                            <div className="w-full pt-2 overflow-hidden text-black flex flex-col gap-1 absolute bottom-0 left-0 p-2 bg-white/30 group-hover:bg-white/80 transition-all duration-300 backdrop-blur-xs">
                                                <h3 className="text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden ">{item.name}</h3>
                                                {item.description && (
                                                    <h4 className="text-xs text-normal w">{item.description}</h4>
                                                )}
                                            </div>

                                            <div className="absolute top-2 right-2 p-2 bg-white/50 group-hover:bg-white transition-all duration-300 text-(--salz-color) font-bold backdrop-blur-xs rounded-md">
                                                {'priceVariants' in item ? (
                                                    <div className="flex flex-col gap-0.5">
                                                        {Object.entries(item.priceVariants).map(([variant, priceVal]) => (
                                                            <h4 key={variant} className="text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden">{variant} {priceVal}</h4>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <h4 className="text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden ">{item.price}</h4>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Contacts */}
            <div className="w-full flex gap-4 flex-col  z-10 relative p-5 footer-bg">
                <div className="w-6xl mx-auto p-3 py-5 bg-white rounded-md z-10 ">
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
    );

}

export default RestoPage;