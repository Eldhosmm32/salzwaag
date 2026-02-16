"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogTitle, DialogHeader, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
        location: "Stäfa, Switzerland",
        mob: "043 477 05 04"
    },
    {
        id: 1,
        image: '/images/rest-2.jpg',
        title: "Badi Uetikon am See",
        location: "Uetikon am See, Switzerland",
        mob: "044 920 22 33"
    },
    {
        id: 2,
        image: '/images/rest-3.jpg',
        title: "Bistro Schiffsteg Stäfa",
        location: "Stäfa, Switzerland",
        mob: "043 818 05 00"
    },
];

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
        section: "Beilagen",
        items: [
            { name: "Salat", price: "CHF 4.00" },
            { name: "Pommes", price: "CHF 3.00" }
        ]
    }
];

const menuDataRestaurantStafa: MenuData = [
    {
        section: "Vorspeisen",
        items: [
            { name: "Asia-Platte", price: "CHF 17.30", description: "2 Sesamstengeli, 2 Samosa, 1 Spiessli, 2 Frühlingsrollen, 2 panierte Crevetten, Sweet Chili Dip" },
            { name: "Blattsalat an Honig-Senf-Sauce mit grillierter Ente", price: "CHF 20.30" },
            { name: "Grüner Blattsalat", price: "CHF 10.50" },
            { name: "Gemischter Salat", price: "CHF 13.30" },
            { name: "Blattsalat mit feinen, grillierten Scampi", price: "CHF 18.30" },
            { name: "Blattsalat mit süss-saurem Fisch", price: "CHF 17.30" },
            { name: "Blattsalat nach Wahl", price: "CHF 17.30", description: "Frühlingsrolle oder panierte Crevetten, Samosa oder Sesamstengeli" },
            { name: "Salatteller Salzwaag", priceVariants: { Vorspeise: "CHF 18.30", Hauptgang: "CHF 28.30" }, description: "mit Pouletstreifen und lauwarmen Pilzen" },
            { name: "Tomatensuppe mit Rahmkrone", price: "CHF 12.80" },
            { name: "Französische Zwiebelsuppe", price: "CHF 12.80" },
            { name: "Asiatische Suppen (auf Anfrage)", price: "CHF 13.80", description: "mit Poulet, Crevetten, Fisch oder Gemüse" }
        ]
    },
    {
        section: "Fisch und Crevetten", description: "WIE FERIEN AM MEER",
        items: [
            { name: "Seafood-Curry", price: "CHF 38.30", description: "mit Langusten, Bärenkrebsen, Jakobsmuscheln, Tilapia, Red Snapper, Garnelen, Mango und Basmati-Reis" },
            { name: "Black Tiger", price: "CHF 34.30", description: "Riesencrevetten nach Szechuan-Art mit Basmati-Reis" },
            { name: "Riesencrevetten an Curry-Sauce", price: "CHF 34.30", description: "mit Tomaten, Kefen und Basmati-Reis" },
            { name: "Gebratener Red Snapper an feiner Sambal-Sauce", price: "CHF 34.80", description: "mit Gemüse und Basmati-Reis" },
            { name: "Gebratene Riesencrevetten", price: "CHF 34.30", description: "mit Reisnudeln, Gemüse, Ei" }
        ]
    },
    {
        section: "Hauptspeisen", description: "MALAYSISCHE SPEZIALITÄTEN UND SCHWEIZER KLASSIKER",
        items: [
            { name: "Kalbsschnitzel", price: "CHF 36.30", description: "mit Kräuterbutter, Pommes Frites oder Butternudeln" },
            { name: "Rindsfilet mit Pfeffersauce oder Kräuterbutter", priceVariants: { "normale Portion": "CHF 46.30", "kleine Portion": "CHF 36.30" }, description: "mit Pommes Frites oder Butternudeln" },
            { name: "Pouletbrust Alibaba", price: "CHF 27.30", description: "Pouletbrust mit Speck, Tomaten und Käse überbacken, Röstikroketten" },
            { name: "Cordon bleu vom Schwein", price: "CHF 30.30", description: "Hausgemacht, mit Pommes Frites" },
            { name: "Scaloppine al limone", price: "CHF 36.30", description: "Kalbfleischschnitzel an Zitronensauce, Pommes Frites oder Butternudeln" },
            { name: "Steak Poivre", price: "CHF 32.30", description: "Schweinssteak (ca. 300 Gramm) an Pfeffersauce, Butternudeln" },
            { name: "Wienerschnitzel", priceVariants: { "normale Portion": "CHF 36.30", "kleine Portion": "CHF 29.30" }, description: "Paniertes Kalbfleischschnitzel mit Pommes Frites" },
            { name: "Lammfilet", price: "CHF 34.30", description: "mit Kräuterbutter und Pommes Frites" }
        ]
    },
    {
        section: "Poulet", description: "ASIATISCH INTERPRETIERT",
        items: [
            { name: "Ayamhijan", price: "CHF 29.30", description: "Poulet mit Ananas, Kokosnuss, Blumenkohl und Basmati-Reis" },
            { name: "Lemon", price: "CHF 29.30", description: "Poulet an feiner Lemongras-Sauce mit Basmati-Reis" },
            { name: "Rendang", price: "CHF 29.30", description: "Poulet an würziger Malaysischer Curry-Sauce mit Basmati-Reis" },
            { name: "Satay-Spiessli", price: "CHF 29.30", description: "Poulet-Satay-Spiessli an feiner Erdnuss-Sauce mit Basmati-Reis" },
            { name: "Ayam", price: "CHF 29.30", description: "Gebratenes Poulet an grünem Curry mit Chinakohl, Nüssen, Mango und Basmati-Reis" }
        ]
    },
    {
        section: "Rind", description: "KLASSISCH UND EXOTISCH",
        items: [
            { name: "Beef-Curry", price: "CHF 34.30", description: "Rindfiletwürfel mit Bohnen und Pilzen, Basmati-Reis" },
            { name: "Pikantes Rindfleisch", price: "CHF 34.30", description: "Rindfleisch mit Gemüse und Nudeln" },
            { name: "Beef Rendang", price: "CHF 34.30", description: "an würziger malaysischer Curry-Sauce mit Lemongras und Basmati-Reis" },
            { name: "Chili Beef", price: "CHF 34.30", description: "an pikanter Chili-Sauce mit Gemüse, Pilzen, Nüssen und Nudeln" },
            { name: "Rind Orange", price: "CHF 32.30", description: "mit Peperoni, Zwiebeln, Cashew-Nüssen und Basmati-Reis" },
            { name: "Rind-Satay-Spiessli", price: "CHF 34.30", description: "an feiner Erdnuss-Sauce mit Lauch und Basmati-Reis" },
            { name: "Rindsfiletwürfel", price: "CHF 34.30", description: "an Curry-Sauce mit Ananas, Zwiebeln, Peperoni und Basmati-Reis" }
        ]
    },
    {
        section: "Lamm", description: "HARMONISCH KOMBINIERT",
        items: [
            { name: "Lammfilet Malai", price: "CHF 34.30", description: "an Satay-Sauce mit Lauch und Basmati-Reis" },
            { name: "Lammfilet an saurer Sauce", price: "CHF 34.30", description: "mit Peperoni, Zwiebeln, Karotten und Nudeln" },
            { name: "Gebratenes Lammfilet an Sambal-Sauce", price: "CHF 34.30", description: "mit Gemüse, Nüssen und Basmati-Reis" },
            { name: "Lamm Rendang", price: "CHF 34.30", description: "an würziger malaysischer Curry-Sauce mit Basmati-Reis" },
            { name: "Gebratenes Lammfilet an Curry-Sauce", price: "CHF 34.30", description: "mit Chinakohl, Mango und Basmati-Reis" }
        ]
    },
    {
        section: "Ente", description: "SPEZIELL FEIN",
        items: [
            { name: "Grillierte Ente an Orangen-Sauce", price: "CHF 34.30", description: "mit Basmati-Reis" },
            { name: "Grillierte Ente an Curry-Sauce", price: "CHF 34.30", description: "mit Ananas, Gemüse und Basmati-Reis" },
            { name: "Grillierte Ente mit Blattsalat", price: "CHF 34.30", description: "an Honig-Senf-Sauce" },
            { name: "Grillierte Ente an Honig-Senf-Sauce", price: "CHF 34.30", description: "mit Glasnudeln und Gemüse" }
        ]
    },
    {
        section: "Vegi", description: "ÜBERRASCHEND UND GESUND",
        items: [
            { name: "Gemüse an grünem Curry", price: "CHF 26.30", description: "mit saisonalem Gemüse und Basmati-Reis" },
            { name: "Gebratene Nudeln", price: "CHF 26.30", description: "mit Gemüse" }
        ]
    },
    {
        section: "Nasi Goreng", description: "SPEZIALITÄTEN",
        items: [
            { name: "Reispfanne mit Gemüse (Art Nasi Goreng)", price: "CHF 26.30" },
            { name: "Gebratenes Gemüse an Satay-Sauce", price: "CHF 25.30", description: "und Basmati-Reis" }
        ]
    },
    {
        section: "Beilagen", description: "LECKERE NEBENSACHE",
        items: [
            { name: "Nature Nudeln", price: "CHF 6.00" },
            { name: "Fried Reis", price: "CHF 7.00" },
            { name: "Fried Nudeln", price: "CHF 7.00" },
            { name: "Gemüse", price: "CHF 7.00" },
            { name: "Gebratene Vegi-Nudeln", price: "CHF 7.00" },
            { name: "Tofu", price: "CHF 7.00", description: "auf Vorbestellung" }
        ]
    }
];

const menuDataBistroSchiffsteg: MenuData = [
    {
        section: "Güggeli", description: "VOM GRILL",
        items: [
            { name: "Halbes Güggeli", price: "CHF 18.80", description: "mit Salat" },
            { name: "Halbes Güggeli", price: "CHF 23.80", description: "mit Salat und Pommes" },
            { name: "Ganzes Güggeli", price: "CHF 22.80", description: "Take away" },
            { name: "Halbes Güggeli", price: "CHF 12.50", description: "Take away" }
        ]
    },
    {
        section: "Schnitzel", description: "DER KLASSIKER",
        items: [
            { name: "Portion Pommes frites", price: "CHF 8.50" },
            { name: "Paniertes Schweinsschnitzel", price: "CHF 26.50", description: "mit Pommes und Salat" }
        ]
    },
    {
        section: "Fisch", description: "FÜR LIEBHABER",
        items: [
            { name: "Egli gebacken", price: "CHF 22.50", description: "mit Zitrone und Tartarsauce" },
            { name: "Egli gebacken", price: "CHF 29.80", description: "mit Pommes oder Salat, Zitrone und Tartarsauce" }
        ]
    },
    {
        section: "Warme und kalte Gerichte", description: "FÜR JEDEN GESCHMACK",
        items: [
            { name: "Schiffstegsalat mit grillierter Ente", price: "CHF 24.80" },
            { name: "Salatschüssel mit Frühlingsrollen", price: "CHF 22.00", description: "Tomaten und Früchten, Sweet-and-sour-Sauce" },
            { name: "Salatschüssel mit panierten Crevetten", price: "CHF 22.00", description: "Tomaten und Früchten, Sweet-and-sour-Sauce" },
            { name: "Salatschüssel mit Samosa", price: "CHF 22.00", description: "Tomaten und Früchten, Sweet-and-sour-Sauce" },
            { name: "Salatschüssel mit Blätterteig", price: "CHF 22.00", description: "Gefüllt mit Poulet und Lemon Gras, Tomaten und Früchten, Sweet-and-sour-Sauce" },
            { name: "Siedfleischsalat garniert", price: "CHF 24.00", description: "(Es hät solangs hät)" },
            { name: "Cäsarsalat mit Poulet und Speck", price: "CHF 22.80", description: "Parmesan-Käse und Knoblauch-Croutons" },
            { name: "Wurstsalat garniert", price: "CHF 18.50" },
            { name: "Wurst-Käse-Salat garniert", price: "CHF 22.00" },
            { name: "Beefsteak Tartar", priceVariants: { gross: "CHF 28.50", klein: "CHF 21.50" }, description: "Toast, Butter, Zwiebelringe" }
        ]
    }
];

const menuDataByRestaurant: Record<number, MenuData> = {
    0: menuDataRestaurantStafa,
    1: menuDataBadi,
    2: menuDataBistroSchiffsteg
};

const MenuPageContent = () => {
    const searchParams = useSearchParams();
    const restoId = Number(searchParams.get("restoId"));
    const safeRestoId =
        Number.isNaN(restoId) || restoId < 0 || restoId >= RestaurantItems.length ? 0 : restoId;

    return (
        <div className="flex flex-col gap-2 w-full h-screen">

            <div className="flex flex-col gap-2 w-full h-50 p-2 relative">

                <div className=" z-10 flex justify-start items-center gap-2 w-fit p-2 bg-white/35 rounded-full overflow-hidden backdrop-blur-md">
                    <Link href="/" className="flex items-center justify-center gap-1 rounded-full bg-gray-100 w-10 h-10">
                        <Image src="/icons/back.png" alt="Back" width={20} height={20} />
                    </Link>
                    <div className="flex flex-col gap-0">
                        <h3 className="text-lg font-semibold">{RestaurantItems[safeRestoId].title}</h3>
                        <p className="text-xs ">{RestaurantItems[safeRestoId].location}</p>
                    </div>
                </div>
                <Image src={RestaurantItems[safeRestoId].image} alt="Menu" fill className="object-cover brightness-75 rounded-b-lg overflow-hidden" />
                <div className="flex flex-col gap-2 w-full z-10 absolute bottom-0 left-0 p-4 text-white  rounded-b-md">
                    <h3 className="text-3xl font-bold">Menu</h3>
                </div>
            </div>

            <div className="flex flex-col gap-2 h-[calc(100vh-10rem)] pb-40 overflow-scroll">
                {(menuDataByRestaurant[safeRestoId] ?? menuDataBadi).map((sect) => (
                    <div key={sect.section} className="flex flex-col gap-2 ">
                        <div className="w-full pt-4 pb-2 px-2">
                            <h1 className="text-xl font-bold">{sect.section}</h1>
                            {sect.description && <h4 className="text-sm text-gray-500 font-normal">{sect.description}</h4>}
                        </div>
                        {sect.items.map((item, index) => (
                            <div key={`${sect.section}-${index}`} className="p-2  main-bg border border-gray-200 rounded-md gap-2 flex w-full h-fit">
                                <div className="relative h-30 w-30 shrink-0">
                                    <Image src="/images/def-food.png" alt={item.name} fill className="object-cover rounded-sm" sizes="100vw" />
                                </div>
                                <div className="w-full pt-2 overflow-hidden flex flex-col gap-1">
                                    <h3 className="text-sm font-semibold">{item.name}</h3>
                                    {item.description && (
                                        <h4 className="text-xs text-gray-600">{item.description}</h4>
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
                            </div>
                        ))}
                    </div>
                ))}

                <div className="p-4 main-bg border border-gray-200 shadow rounded-md">
                    <div className="text-black text-sm">
                        Take-Away nach Vorbestellung
                    </div>
                </div>


                <div className="p-4 rounded-md border border-gray-200 shadow text-black text-sm font-light">
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
                </div>


                <div className="p-4 border border-gray-200 rounded-md shadow flex flex-col gap-3">
                    <div className="text-black ">
                        <span className="text-md font-light text-md">Hat es Ihnen geschmeckt?</span>
                        <br /><span className="text-black">
                            Wir freuen uns auf Ihr Feedback
                        </span>
                    </div>

                    <Button className="salz-btn w-fit h-9!">Feedback bei Google</Button>
                </div>
            </div>

            <div className="w-full p-5 fixed bottom-0 left-0">
                <Dialog>
                    <DialogTrigger className="text-lg font-bold h-fit p-2 w-full bg-amber-200 rounded-full border-4  border-amber-100 shadow-lg text-center">Reservationen & Take-Away</DialogTrigger>
                    <DialogContent className="main-bg">
                        <DialogHeader>
                            <DialogTitle className="hidden"></DialogTitle>
                            <DialogDescription>
                                <span className="text-lg font-bold py-5"> Wir freuen uns Ihre Reservationen telefonisch unter
                                    <span className="text-(--salz-color) text-xl">&nbsp;{RestaurantItems[safeRestoId].mob}&nbsp;</span> <br /> entgegen zu nehmen.
                                    Ihr Wirtschaft zur Salzwaag Team </span>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
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
    return (
        <Suspense fallback={<MenuPageFallback />}>
            <MenuPageContent />
        </Suspense>
    )
}