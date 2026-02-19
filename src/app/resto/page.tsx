"use client"
import Maps from "@/components/Maps";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

type MenuItem =
    | {
        name: string;
        price: string;
        description?: string;
        ingredients?: string;
        cookingProcess?: string;
        image?: string
    }
    | {
        name: string;
        priceVariants: Record<string, string>;
        description?: string;
        ingredients?: string;
        cookingProcess?: string;
        image?: string
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
        mob: "043 477 05 04"
    },
    {
        id: 1,
        image: '/images/rest-2.jpg',
        title: "Badi Uetikon am See",
        desc: 'Swimming and feasting at the Uetikon public swimming pool',
        location: "Uetikon am See, Switzerland",
        mob: "044 920 22 33"
    },
    {
        id: 2,
        image: '/images/rest-3.jpg',
        title: "Bistro Schiffsteg Stäfa",
        desc: 'Malaysian and Swiss cuisine under one roof',
        location: "Stäfa, Switzerland",
        mob: "043 818 05 00"
    },
];

const OpeningHours: any = {
    0: ["Montag Closed", "Dienstag bis Sonntag", "- 08:30 Uhr bis 23:30 Uhr"],
    1: ["Montag 11.00 Uhr bis 20.00 Uhr", "Dienstag bis Samstag 10.00 Uhr bis 20.00 Uhr", "Sonntag 09.00 Uhr bis 19.00 Uhr"],
    2: ["Montag bis Sonntag", "- 09:00 Uhr – 24:00 Uhr"]
}

const menuDataBadi: MenuData = [
    {
        section: "Kalte Speisen",
        items: [
            { name: "Gemischte Oliven", image: "https://images.pexels.com/photos/5931/food-salad-healthy-black.jpg", price: "CHF 5.50", description: "Eine Auswahl erlesener Oliven mit mediteranen Aromen", ingredients: "Grüne und schwarze Oliven, Kräuter, Olivenöl", cookingProcess: "Kalt mariniert und serviert" },
            { name: "Parmesan Stk.", image: "https://images.pexels.com/photos/3693280/pexels-photo-3693280.jpeg", price: "CHF 5.50", description: "fein gereifter Parmesan nussig im Geschmack", ingredients: "Parmesan, Balsamico", cookingProcess: "Am Stück geschnitten und angerichtet" },
            { name: "Sandwiches nach Wahl", image: "https://images.pexels.com/photos/28681955/pexels-photo-28681955.jpeg", price: "CHF 7.00", description: "belegt mit den Lieblingszutaten - ein Genuss für jeden Geschmack", ingredients: "Brot, Aufschnitt, Käse, Gemüse nach Wahl", cookingProcess: "Frisch belegt und serviert" },
            { name: "Wurstsalat garniert", price: "CHF 13.00", description: "liebevoll garniert - perfekt für den kleinen Hunger", ingredients: "Wurst, Essig, Öl, Zwiebeln, Paprika", cookingProcess: "Wurst geschnitten, mit Dressing angemacht und garniert" },
            { name: "Wurst-Käsesalat garniert", price: "CHF 14.50", description: "liebevoll garniert - perfekt für den grösseren Hunger", ingredients: "Wurst, Käse, Essig, Öl, Zwiebeln", cookingProcess: "Wurst und Käse geschnitten, mit Dressing und Garnitur angerichtet" },
            { name: "Cesarsalat", priceVariants: { klein: "CHF 15.00", gross: "CHF 22.00" }, description: "mit gebratener Pouletbrust einfach lecker", ingredients: "Römersalat, Pouletbrust, Parmesan, Cesarsauce, Croutons", cookingProcess: "Poulet gebraten, Salat mit Sauce gemischt und mit Croutons serviert" },
            { name: "Tagessalat", price: "CHF 9.50", description: "bunter Mix aus Saisonalen Zutaten", ingredients: "Saisonales Gemüse, Blattsalat, Dressing", cookingProcess: "Frisch geschnitten und mit Dressing angerichtet" },
            { name: "Blattsalat", price: "CHF 9.00", description: "knackiger Blattsalat an feinem Dressing", ingredients: "Blattsalat-Mix, Dressing", cookingProcess: "Gewaschen, gemischt und mit Dressing serviert" },
            { name: "Gemischter Salat", price: "CHF 11.00", description: "harmonische Kombination, frisch und knackig", ingredients: "Blattsalat, Tomaten, Gurken, Paprika, Dressing", cookingProcess: "Gemüse geschnitten, gemischt und mit Dressing angerichtet" },
            { name: "Blattsalat nach Wahl", price: "CHF 16.50", description: "mit Frühlingsrollen, Samosa, Sesamstängeli oder pan. Crevetten serviert mit süsser Chilisauce", ingredients: "Blattsalat, Wahl: Frühlingsrollen/Samosa/Sesamstängeli/Crevetten, Chilisauce", cookingProcess: "Salat angerichtet, gewählte Beilage frittiert bzw. erwärmt, mit Sauce serviert" },
            { name: "Kartoffelsalat", price: "CHF 8.00", description: "herzhaft und lecker", ingredients: "Kartoffeln, Essig, Öl, Zwiebeln, Kräuter", cookingProcess: "Kartoffeln gekocht, geschnitten und mit Marinade angemacht" },
            { name: "Siedfleischsalat", priceVariants: { klein: "CHF 14.50", gross: "CHF 21.50" }, description: "es hät solang`s hät", ingredients: "Siedfleisch, Essig, Öl, Zwiebeln, Kräuter", cookingProcess: "Fleisch gekocht, in Streifen geschnitten, mit Dressing und Garnitur angerichtet" },
            { name: "Thonsalat einfach", price: "CHF 13.00", description: "perfekt für den kleinen Hunger", ingredients: "Thunfisch, Blattsalat, Mais, Bohnen, Dressing", cookingProcess: "Thunfisch mit Salat und Dressing gemischt" },
            { name: "Thonsalat garniert", price: "CHF 15.50", description: "liebevoll garniert - perfekt für den kleinen Hunger", ingredients: "Thunfisch, Blattsalat, Mais, Ei, Oliven, Dressing", cookingProcess: "Thunfischsalat angerichtet und liebevoll garniert" }
        ]
    },
    {
        section: "Warme Speisen",
        items: [
            { name: "Pommes Frites", price: "CHF 9.00", description: "Goldbraun und knusprig", ingredients: "Kartoffeln, Salz, Frittieröl", cookingProcess: "In Streifen geschnitten und in heissem Öl goldbraun frittiert" },
            { name: "Trüffel Pommes Frites", price: "CHF 11.00", description: "verfeinert mit edlem Trüffelöl", ingredients: "Kartoffeln, Trüffelöl, Parmesan, Salz", cookingProcess: "Pommes frittiert und mit Trüffelöl und Parmesan verfeinert" },
            { name: "Black Angus Burger *", price: "CHF 14.50", description: "ein Genuss aus hochwertigem Rindfleisch und frischen Zutaten", ingredients: "Black-Angus-Rindfleisch, Brötchen, Salat, Tomate, Zwiebel", cookingProcess: "Patty gebraten, mit frischem Gemüse belegt und serviert" },
            { name: "Black Angus Cheeseburger *", price: "CHF 15.50", description: "ein Genuss aus hochwertigem Rindfleisch und frischen Zutaten", ingredients: "Black-Angus-Rindfleisch, Käse, Brötchen, Salat, Tomate", cookingProcess: "Patty gebraten, mit Käse überbacken und mit Gemüse serviert" },
            { name: "Vegi Burger *", price: "CHF 11.50", description: "herzhaftes Gemüsepatty, das auch Fleischliebhaber überzeugt", ingredients: "Gemüsepatty, Brötchen, Salat, Tomate, Sauce", cookingProcess: "Gemüsepatty gebraten und mit frischen Beilagen serviert" },
            { name: "Schweineschnitzel paniert *", price: "CHF 18.50", description: "knusprig und goldbraun gebraten", ingredients: "Schweinsschnitzel, Panade, Ei, Mehl, Butter", cookingProcess: "Schnitzel paniert und in Butter goldbraun gebraten" },
            { name: "Schnitzel im Pitabrot *", price: "CHF 14.00", description: "knusprig und lecker", ingredients: "Panierte Schnitzelstreifen, Pitabrot, Salat, Sauce", cookingProcess: "Schnitzel gebraten, in Streifen geschnitten und im Pitabrot serviert" },
            { name: "Paar Wienerli", price: "CHF 6.00", description: "serviert mit Brot", ingredients: "Wienerli, Brot, Senf", cookingProcess: "Wienerli in heissem Wasser erwärmt, mit Brot serviert" },
            { name: "Chicken Nuggets *", price: "CHF 9.00", description: "perfekt für den kleinen Hunger", ingredients: "Pouletbrust, Panade, Gewürze", cookingProcess: "Pouletstücke paniert und knusprig frittiert" },
            { name: "Fisch Chnusperli *", price: "CHF 19.50", description: "serviert mit cremiger Tartarsauce", ingredients: "Fischfilet, Panade, Tartarsauce, Zitrone", cookingProcess: "Fisch paniert und frittiert, mit Tartarsauce serviert" },
            { name: "Pinsa Margherita", price: "CHF 15.00", description: "luftig und lecker", ingredients: "Pinsateig, Tomatensauce, Mozzarella, Basilikum", cookingProcess: "Teig belegt und im Ofen gebacken" },
            { name: "Pinsa mit Fleisch", price: "CHF 16.50", description: "luftig und lecker", ingredients: "Pinsateig, Tomatensauce, Mozzarella, Fleischbelag", cookingProcess: "Teig mit Sauce und Belag belegt und gebacken" },
            { name: "Frühlingsrollen", price: "CHF 8.50", description: "gefüllt mit Gemüse und serviert mit süsser Chilisauce", ingredients: "Reisteig, Gemüse, Glasnudeln, Chilisauce", cookingProcess: "Gemüsefüllung eingewickelt und frittiert, mit Sauce serviert" },
            { name: "Sesamstängeli", price: "CHF 8.50", description: "gefüllt mit würzigem Pouletfleisch und serviert mit süsser Chilisauce", ingredients: "Teighülle, Poulet, Sesam, Chilisauce", cookingProcess: "Pouletfüllung in Teig gewickelt, mit Sesam bestreut und frittiert" },
            { name: "Samosa", price: "CHF 8.50", description: "gefüllt mit würzigem Gemüse und serviert mit süsser Chilisauce", ingredients: "Teigtaschen, Gemüse, Currygewürze, Chilisauce", cookingProcess: "Gemüsefüllung in Teigtaschen gefüllt und frittiert" },
            { name: "Panierte Crevetten", price: "CHF 8.50", description: "gefüllt mit Gemüse und serviert mit süsser Chilisauce", ingredients: "Crevetten, Panade, Chilisauce", cookingProcess: "Crevetten paniert und frittiert, mit Chilisauce serviert" },
            { name: "Asia Platte", price: "CHF 17.00", description: "Frühlingsrollen, Samosa, Sesamstängeli und pan. Crevetten serviert mit süsser Chilisauce", ingredients: "Frühlingsrollen, Samosa, Sesamstängeli, panierte Crevetten, Chilisauce", cookingProcess: "Alle Komponenten frittiert und gemeinsam mit Sauce angerichtet" }
        ]
    },
    {
        section: "Beilagen",
        items: [
            { name: "Salat", price: "CHF 4.00", description: "frischer Blattsalat an feinem Dressing", ingredients: "Blattsalat, Dressing", cookingProcess: "Frisch angerichtet" },
            { name: "Pommes", price: "CHF 3.00", description: "goldbraune Pommes Frites als Beilage", ingredients: "Kartoffeln, Salz, Öl", cookingProcess: "Frittiert und warm serviert" }
        ]
    }
];

const menuDataRestaurantStafa: MenuData = [
    {
        section: "Vorspeisen",
        items: [
            { name: "Asia-Platte", image: "https://images.pexels.com/photos/8935309/pexels-photo-8935309.jpeg", price: "CHF 17.30", description: "2 Sesamstengeli, 2 Samosa, 1 Spiessli, 2 Frühlingsrollen, 2 panierte Crevetten, Sweet Chili Dip", ingredients: "Sesamstengeli, Samosa, Spiessli, Frühlingsrollen, Crevetten, Sweet Chili Dip", cookingProcess: "Komponenten frittiert bzw. gegrillt und gemeinsam angerichtet" },
            { name: "Blattsalat an Honig-Senf-Sauce mit grillierter Ente", image: "https://images.pexels.com/photos/5848595/pexels-photo-5848595.jpeg", price: "CHF 20.30", description: "knackiger Blattsalat mit zarter Entenbrust und Honig- Senf - Dressing", ingredients: "Blattsalat, Entenbrust, Honig, Senf, Öl, Essig", cookingProcess: "Ente grilliert, Salat mit Honig - Senf - Dressing angerichtet" },
            { name: "Grüner Blattsalat", image: "https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg", price: "CHF 10.50", description: "frischer Blattsalat an feinem Dressing", ingredients: "Blattsalat-Mix, Dressing", cookingProcess: "Salat gewaschen, gemischt und mit Dressing serviert" },
            { name: "Gemischter Salat", price: "CHF 13.30", description: "harmonische Kombination aus frischem Gemüse und Blattsalat", ingredients: "Blattsalat, Tomaten, Gurken, Paprika, Dressing", cookingProcess: "Gemüse geschnitten, gemischt und mit Dressing angerichtet" },
            { name: "Blattsalat mit feinen, grillierten Scampi", price: "CHF 18.30", description: "Blattsalat mit feinen grillierten Scampi und Dressing", ingredients: "Blattsalat, Scampi, Dressing, Zitrone", cookingProcess: "Scampi grilliert, mit Salat und Dressing serviert" },
            { name: "Blattsalat mit süss-saurem Fisch", price: "CHF 17.30", description: "Blattsalat mit süss-saurem Fisch und asiatischem Touch", ingredients: "Blattsalat, Fisch, süss-saure Sauce, Gemüse", cookingProcess: "Fisch in süss-saurer Sauce zubereitet, mit Salat angerichtet" },
            { name: "Blattsalat nach Wahl", price: "CHF 17.30", description: "Frühlingsrolle oder panierte Crevetten, Samosa oder Sesamstengeli", ingredients: "Blattsalat, Wahl: Frühlingsrolle/Crevetten/Samosa/Sesamstengeli", cookingProcess: "Salat angerichtet, gewählte Komponente frittiert und dazu serviert" },
            { name: "Salatteller Salzwaag", priceVariants: { Vorspeise: "CHF 18.30", Hauptgang: "CHF 28.30" }, description: "mit Pouletstreifen und lauwarmen Pilzen", ingredients: "Blattsalat, Pouletstreifen, Pilze, Dressing", cookingProcess: "Poulet gebraten, Pilze angebraten, mit Salat lauwarm angerichtet" },
            { name: "Tomatensuppe mit Rahmkrone", price: "CHF 12.80", description: "cremige Tomatensuppe mit hausgemachter Rahmkrone", ingredients: "Tomaten, Zwiebeln, Rahm, Basilikum, Crème fraîche", cookingProcess: "Suppe gekocht und püriert, mit Rahmkrone und Basilikum serviert" },
            { name: "Französische Zwiebelsuppe", price: "CHF 12.80", description: "klassische Zwiebelsuppe mit Käse überbacken", ingredients: "Zwiebeln, Brühe, Weisswein, Käse, Brot", cookingProcess: "Zwiebeln karamellisiert, mit Brühe aufgegossen, mit Käse überbacken" },
            { name: "Asiatische Suppen (auf Anfrage)", price: "CHF 13.80", description: "mit Poulet, Crevetten, Fisch oder Gemüse", ingredients: "Brühe, Gewürze, Wahl: Poulet/Crevetten/Fisch/Gemüse", cookingProcess: "Brühe gewürzt, gewählte Zutat gekocht und serviert" }
        ]
    },
    {
        section: "Fisch und Crevetten", description: "WIE FERIEN AM MEER",
        items: [
            { name: "Seafood-Curry", image: "https://images.pexels.com/photos/9809033/pexels-photo-9809033.jpeg", price: "CHF 38.30", description: "mit Langusten, Bärenkrebsen, Jakobsmuscheln, Tilapia, Red Snapper, Garnelen, Mango und Basmati-Reis", ingredients: "Langusten, Bärenkrebse, Jakobsmuscheln, Tilapia, Red Snapper, Garnelen, Mango, Curry, Basmati-Reis", cookingProcess: "Meeresfrüchte und Fisch in Curry-Sauce geschmort, mit Reis serviert" },
            { name: "Black Tiger", price: "CHF 34.30", description: "Riesencrevetten nach Szechuan-Art mit Basmati-Reis", ingredients: "Riesencrevetten, Szechuan-Gewürze, Sojasauce, Basmati-Reis", cookingProcess: "Crevetten in der Pfanne mit Szechuan-Sauce gebraten, mit Reis serviert" },
            { name: "Riesencrevetten an Curry-Sauce", price: "CHF 34.30", description: "mit Tomaten, Kefen und Basmati-Reis", ingredients: "Riesencrevetten, Curry, Tomaten, Kefen, Basmati-Reis", cookingProcess: "Crevetten in Curry-Sauce mit Gemüse geschmort, mit Reis serviert" },
            { name: "Gebratener Red Snapper an feiner Sambal-Sauce", price: "CHF 34.80", description: "mit Gemüse und Basmati-Reis", ingredients: "Red Snapper, Sambal, Gemüse, Basmati-Reis", cookingProcess: "Fisch gebraten, mit Sambal-Sauce und Gemüse serviert, Reis dazu" },
            { name: "Gebratene Riesencrevetten", price: "CHF 34.30", description: "mit Reisnudeln, Gemüse, Ei", ingredients: "Riesencrevetten, Reisnudeln, Gemüse, Ei, Sojasauce", cookingProcess: "Crevetten und Gemüse gebraten, mit Nudeln und Ei vermengt" }
        ]
    },
    {
        section: "Hauptspeisen", description: "MALAYSISCHE SPEZIALITÄTEN UND SCHWEIZER KLASSIKER",
        items: [
            { name: "Kalbsschnitzel", price: "CHF 36.30", description: "mit Kräuterbutter, Pommes Frites oder Butternudeln", ingredients: "Kalbfleisch, Panade, Kräuterbutter, Pommes oder Butternudeln", cookingProcess: "Schnitzel paniert und in Butter gebraten, mit Kräuterbutter und Beilage serviert" },
            { name: "Rindsfilet mit Pfeffersauce oder Kräuterbutter", priceVariants: { "normale Portion": "CHF 46.30", "kleine Portion": "CHF 36.30" }, description: "mit Pommes Frites oder Butternudeln", ingredients: "Rindsfilet, Pfeffersauce oder Kräuterbutter, Pommes oder Butternudeln", cookingProcess: "Filet nach Wahl gebraten oder grilliert, mit Sauce und Beilage serviert" },
            { name: "Pouletbrust Alibaba", price: "CHF 27.30", description: "Pouletbrust mit Speck, Tomaten und Käse überbacken, Röstikroketten", ingredients: "Pouletbrust, Speck, Tomaten, Käse, Röstikroketten", cookingProcess: "Poulet mit Speck, Tomaten und Käse überbacken, mit Röstikroketten serviert" },
            { name: "Cordon bleu vom Schwein", price: "CHF 30.30", description: "Hausgemacht, mit Pommes Frites", ingredients: "Schweinsschnitzel, Schinken, Käse, Panade, Pommes", cookingProcess: "Schnitzel mit Schinken und Käse gefüllt, paniert, gebraten, mit Pommes serviert" },
            { name: "Scaloppine al limone", price: "CHF 36.30", description: "Kalbfleischschnitzel an Zitronensauce, Pommes Frites oder Butternudeln", ingredients: "Kalbfleischschnitzel, Zitrone, Weisswein, Butter, Pommes oder Butternudeln", cookingProcess: "Schnitzel gebraten, mit Zitronensauce abgelöscht, mit Beilage serviert" },
            { name: "Steak Poivre", price: "CHF 32.30", description: "Schweinssteak (ca. 300 Gramm) an Pfeffersauce, Butternudeln", ingredients: "Schweinssteak, Pfeffer, Rahm, Cognac, Butternudeln", cookingProcess: "Steak mit Pfeffer gebraten, mit Pfeffersauce und Butternudeln serviert" },
            { name: "Wienerschnitzel", priceVariants: { "normale Portion": "CHF 36.30", "kleine Portion": "CHF 29.30" }, description: "Paniertes Kalbfleischschnitzel mit Pommes Frites", ingredients: "Kalbfleisch, Panade, Butter, Pommes Frites, Zitrone", cookingProcess: "Schnitzel paniert und in Butter goldbraun gebraten, mit Pommes serviert" },
            { name: "Lammfilet", price: "CHF 34.30", description: "mit Kräuterbutter und Pommes Frites", ingredients: "Lammfilet, Kräuterbutter, Pommes Frites", cookingProcess: "Lammfilet grilliert oder gebraten, mit Kräuterbutter und Pommes serviert" }
        ]
    },
    {
        section: "Poulet", description: "ASIATISCH INTERPRETIERT",
        items: [
            { name: "Ayamhijan", price: "CHF 29.30", description: "Poulet mit Ananas, Kokosnuss, Blumenkohl und Basmati-Reis", ingredients: "Poulet, Ananas, Kokosmilch, Blumenkohl, Basmati-Reis, Curry", cookingProcess: "Poulet in Kokos-Curry mit Ananas und Blumenkohl geschmort, mit Reis serviert" },
            { name: "Lemon", price: "CHF 29.30", description: "Poulet an feiner Lemongras-Sauce mit Basmati-Reis", ingredients: "Poulet, Lemongras, Kokosmilch, Basmati-Reis", cookingProcess: "Poulet in Lemongras-Sauce geschmort, mit Reis serviert" },
            { name: "Rendang", price: "CHF 29.30", description: "Poulet an würziger Malaysischer Curry-Sauce mit Basmati-Reis", ingredients: "Poulet, Rendang-Curry, Kokosmilch, Lemongras, Basmati-Reis", cookingProcess: "Poulet langsam in Rendang-Curry geschmort, mit Reis serviert" },
            { name: "Satay-Spiessli", price: "CHF 29.30", description: "Poulet-Satay-Spiessli an feiner Erdnuss-Sauce mit Basmati-Reis", ingredients: "Poulet, Erdnuss-Sauce, Sojasauce, Basmati-Reis", cookingProcess: "Poulet am Spiess grilliert, mit Erdnuss-Sauce und Reis serviert" },
            { name: "Ayam", price: "CHF 29.30", description: "Gebratenes Poulet an grünem Curry mit Chinakohl, Nüssen, Mango und Basmati-Reis", ingredients: "Poulet, grünes Curry, Chinakohl, Nüsse, Mango, Basmati-Reis", cookingProcess: "Poulet gebraten, in grünem Curry mit Gemüse und Mango geschmort, mit Reis serviert" }
        ]
    },
    {
        section: "Rind", description: "KLASSISCH UND EXOTISCH",
        items: [
            { name: "Beef-Curry", price: "CHF 34.30", description: "Rindfiletwürfel mit Bohnen und Pilzen, Basmati-Reis", ingredients: "Rindfilet, Curry, Bohnen, Pilze, Basmati-Reis", cookingProcess: "Filetwürfel in Curry-Sauce mit Bohnen und Pilzen geschmort, mit Reis serviert" },
            { name: "Pikantes Rindfleisch", price: "CHF 34.30", description: "Rindfleisch mit Gemüse und Nudeln", ingredients: "Rindfleisch, Gemüse, Nudeln, Chili, Sojasauce", cookingProcess: "Rindfleisch mit Gemüse scharf angebraten, mit Nudeln serviert" },
            { name: "Beef Rendang", price: "CHF 34.30", description: "an würziger malaysischer Curry-Sauce mit Lemongras und Basmati-Reis", ingredients: "Rindfleisch, Rendang-Curry, Kokosmilch, Lemongras, Basmati-Reis", cookingProcess: "Rindfleisch langsam in Rendang-Curry geschmort, mit Reis serviert" },
            { name: "Chili Beef", price: "CHF 34.30", description: "an pikanter Chili-Sauce mit Gemüse, Pilzen, Nüssen und Nudeln", ingredients: "Rindfleisch, Chili-Sauce, Gemüse, Pilze, Nüsse, Nudeln", cookingProcess: "Rindfleisch in Chili-Sauce mit Gemüse und Nüssen gebraten, mit Nudeln serviert" },
            { name: "Rind Orange", price: "CHF 32.30", description: "mit Peperoni, Zwiebeln, Cashew-Nüssen und Basmati-Reis", ingredients: "Rindfleisch, Orangen-Sauce, Peperoni, Zwiebeln, Cashew, Basmati-Reis", cookingProcess: "Rindfleisch in Orangen-Sauce mit Peperoni und Cashew gebraten, mit Reis serviert" },
            { name: "Rind-Satay-Spiessli", price: "CHF 34.30", description: "an feiner Erdnuss-Sauce mit Lauch und Basmati-Reis", ingredients: "Rindfleisch, Erdnuss-Sauce, Lauch, Basmati-Reis", cookingProcess: "Rind am Spiess grilliert, mit Erdnuss-Sauce und Reis serviert" },
            { name: "Rindsfiletwürfel", price: "CHF 34.30", description: "an Curry-Sauce mit Ananas, Zwiebeln, Peperoni und Basmati-Reis", ingredients: "Rindfilet, Curry, Ananas, Zwiebeln, Peperoni, Basmati-Reis", cookingProcess: "Filetwürfel in Curry mit Ananas und Gemüse geschmort, mit Reis serviert" }
        ]
    },
    {
        section: "Lamm", description: "HARMONISCH KOMBINIERT",
        items: [
            { name: "Lammfilet Malai", price: "CHF 34.30", description: "an Satay-Sauce mit Lauch und Basmati-Reis", ingredients: "Lammfilet, Satay-Sauce, Lauch, Basmati-Reis", cookingProcess: "Lammfilet gebraten, mit Satay-Sauce und Lauch serviert, Reis dazu" },
            { name: "Lammfilet an saurer Sauce", price: "CHF 34.30", description: "mit Peperoni, Zwiebeln, Karotten und Nudeln", ingredients: "Lammfilet, saure Sauce, Peperoni, Zwiebeln, Karotten, Nudeln", cookingProcess: "Lammfilet gebraten, mit saurer Sauce und Gemüse serviert, Nudeln dazu" },
            { name: "Gebratenes Lammfilet an Sambal-Sauce", price: "CHF 34.30", description: "mit Gemüse, Nüssen und Basmati-Reis", ingredients: "Lammfilet, Sambal, Gemüse, Nüsse, Basmati-Reis", cookingProcess: "Lammfilet gebraten, mit Sambal-Sauce, Gemüse und Nüssen serviert, Reis dazu" },
            { name: "Lamm Rendang", price: "CHF 34.30", description: "an würziger malaysischer Curry-Sauce mit Basmati-Reis", ingredients: "Lammfleisch, Rendang-Curry, Kokosmilch, Basmati-Reis", cookingProcess: "Lamm in Rendang-Curry geschmort, mit Reis serviert" },
            { name: "Gebratenes Lammfilet an Curry-Sauce", price: "CHF 34.30", description: "mit Chinakohl, Mango und Basmati-Reis", ingredients: "Lammfilet, Curry, Chinakohl, Mango, Basmati-Reis", cookingProcess: "Lammfilet gebraten, in Curry mit Chinakohl und Mango serviert, Reis dazu" }
        ]
    },
    {
        section: "Ente", description: "SPEZIELL FEIN",
        items: [
            { name: "Grillierte Ente an Orangen-Sauce", price: "CHF 34.30", description: "mit Basmati-Reis", ingredients: "Entenbrust, Orangen, Basmati-Reis", cookingProcess: "Ente grilliert, mit Orangen-Sauce und Reis serviert" },
            { name: "Grillierte Ente an Curry-Sauce", price: "CHF 34.30", description: "mit Ananas, Gemüse und Basmati-Reis", ingredients: "Entenbrust, Curry, Ananas, Gemüse, Basmati-Reis", cookingProcess: "Ente grilliert, mit Curry-Sauce, Ananas und Gemüse serviert, Reis dazu" },
            { name: "Grillierte Ente mit Blattsalat", price: "CHF 34.30", description: "an Honig-Senf-Sauce", ingredients: "Entenbrust, Blattsalat, Honig, Senf", cookingProcess: "Ente grilliert, mit Blattsalat und Honig-Senf-Sauce serviert" },
            { name: "Grillierte Ente an Honig-Senf-Sauce", price: "CHF 34.30", description: "mit Glasnudeln und Gemüse", ingredients: "Entenbrust, Honig, Senf, Glasnudeln, Gemüse", cookingProcess: "Ente grilliert, mit Honig-Senf-Sauce, Glasnudeln und Gemüse serviert" }
        ]
    },
    {
        section: "Vegi", description: "ÜBERRASCHEND UND GESUND",
        items: [
            { name: "Gemüse an grünem Curry", price: "CHF 26.30", description: "mit saisonalem Gemüse und Basmati-Reis", ingredients: "Saisonales Gemüse, grünes Curry, Kokosmilch, Basmati-Reis", cookingProcess: "Gemüse in grünem Curry geschmort, mit Reis serviert" },
            { name: "Gebratene Nudeln", price: "CHF 26.30", description: "mit Gemüse", ingredients: "Nudeln, Gemüse, Sojasauce, Öl", cookingProcess: "Nudeln mit Gemüse in der Pfanne gebraten" }
        ]
    },
    {
        section: "Nasi Goreng", description: "SPEZIALITÄTEN",
        items: [
            { name: "Reispfanne mit Gemüse (Art Nasi Goreng)", price: "CHF 26.30", description: "würzige Reispfanne mit saisonalem Gemüse nach indonesischer Art", ingredients: "Reis, Gemüse, Ei, Sojasauce, Gewürze", cookingProcess: "Reis mit Gemüse und Ei in der Pfanne gewürzt gebraten" },
            { name: "Gebratenes Gemüse an Satay-Sauce", price: "CHF 25.30", description: "und Basmati-Reis", ingredients: "Gemüse, Satay-Sauce, Erdnüsse, Basmati-Reis", cookingProcess: "Gemüse gebraten, mit Satay-Sauce und Reis serviert" }
        ]
    },
    {
        section: "Beilagen", description: "LECKERE NEBENSACHE",
        items: [
            { name: "Nature Nudeln", price: "CHF 6.00", description: "gedämpfte Nudeln als Beilage", ingredients: "Nudeln", cookingProcess: "Gedämpft und warm serviert" },
            { name: "Fried Reis", price: "CHF 7.00", description: "gebratener Reis als Beilage", ingredients: "Reis, Ei, Sojasauce", cookingProcess: "Reis in der Pfanne mit Ei gebraten" },
            { name: "Fried Nudeln", price: "CHF 7.00", description: "gebratene Nudeln als Beilage", ingredients: "Nudeln, Öl, Sojasauce", cookingProcess: "Nudeln in der Pfanne gebraten" },
            { name: "Gemüse", price: "CHF 7.00", description: "saisonal gebratenes Gemüse als Beilage", ingredients: "Saisonales Gemüse", cookingProcess: "Gemüse gebraten und warm serviert" },
            { name: "Gebratene Vegi-Nudeln", price: "CHF 7.00", description: "gebratene Nudeln mit Gemüse als Beilage", ingredients: "Nudeln, Gemüse", cookingProcess: "Nudeln mit Gemüse in der Pfanne gebraten" },
            { name: "Tofu", price: "CHF 7.00", description: "auf Vorbestellung", ingredients: "Tofu", cookingProcess: "Auf Vorbestellung zubereitet" }
        ]
    }
];

const menuDataBistroSchiffsteg: MenuData = [
    {
        section: "Güggeli", description: "VOM GRILL",
        items: [
            { name: "Halbes Güggeli", image: "https://images.pexels.com/photos/33683051/pexels-photo-33683051.jpeg", price: "CHF 18.80", description: "mit Salat", ingredients: "Halbhuhn, Gewürze, Salat", cookingProcess: "Huhn am Grill gebraten, mit Salat serviert" },
            { name: "Halbes Güggeli", image: "https://images.pexels.com/photos/27643043/pexels-photo-27643043.jpeg", price: "CHF 23.80", description: "mit Salat und Pommes", ingredients: "Halbhuhn, Gewürze, Salat, Pommes", cookingProcess: "Huhn am Grill gebraten, mit Salat und Pommes serviert" },
            { name: "Ganzes Güggeli", image: "https://images.pexels.com/photos/34110277/pexels-photo-34110277.jpeg", price: "CHF 22.80", description: "Take away", ingredients: "Ganzes Huhn, Gewürze", cookingProcess: "Huhn am Grill gebraten, zum Mitnehmen verpackt" },
            { name: "Halbes Güggeli", image: "https://images.pexels.com/photos/33683051/pexels-photo-33683051.jpeg", price: "CHF 12.50", description: "Take away", ingredients: "Halbhuhn, Gewürze", cookingProcess: "Huhn am Grill gebraten, zum Mitnehmen verpackt" }
        ]
    },
    {
        section: "Schnitzel", description: "DER KLASSIKER",
        items: [
            { name: "Portion Pommes frites", price: "CHF 8.50", description: "goldbraune Pommes Frites als Beilage oder Solo", ingredients: "Kartoffeln, Salz, Frittieröl", cookingProcess: "Frittiert und goldbraun serviert" },
            { name: "Paniertes Schweinsschnitzel", price: "CHF 26.50", description: "mit Pommes und Salat", ingredients: "Schweinsschnitzel, Panade, Pommes, Salat", cookingProcess: "Schnitzel paniert und gebraten, mit Pommes und Salat serviert" }
        ]
    },
    {
        section: "Fisch", description: "FÜR LIEBHABER",
        items: [
            { name: "Egli gebacken", price: "CHF 22.50", description: "mit Zitrone und Tartarsauce", ingredients: "Egli, Panade, Zitrone, Tartarsauce", cookingProcess: "Egli paniert und in Öl ausgebacken, mit Zitrone und Tartarsauce serviert" },
            { name: "Egli gebacken", price: "CHF 29.80", description: "mit Pommes oder Salat, Zitrone und Tartarsauce", ingredients: "Egli, Panade, Pommes oder Salat, Zitrone, Tartarsauce", cookingProcess: "Egli paniert und ausgebacken, mit Beilage, Zitrone und Tartarsauce serviert" }
        ]
    },
    {
        section: "Warme und kalte Gerichte", description: "FÜR JEDEN GESCHMACK",
        items: [
            { name: "Schiffstegsalat mit grillierter Ente", price: "CHF 24.80", description: "Haussalat mit zarter grillierter Entenbrust", ingredients: "Blattsalat, Entenbrust, Dressing", cookingProcess: "Ente grilliert, mit Haussalat angerichtet" },
            { name: "Salatschüssel mit Frühlingsrollen", price: "CHF 22.00", description: "Tomaten und Früchten, Sweet-and-sour-Sauce", ingredients: "Blattsalat, Frühlingsrollen, Tomaten, Früchte, Sweet-and-sour-Sauce", cookingProcess: "Salat angerichtet, Frühlingsrollen frittiert, mit Sauce serviert" },
            { name: "Salatschüssel mit panierten Crevetten", price: "CHF 22.00", description: "Tomaten und Früchten, Sweet-and-sour-Sauce", ingredients: "Blattsalat, Crevetten, Tomaten, Früchte, Sweet-and-sour-Sauce", cookingProcess: "Salat angerichtet, Crevetten paniert und frittiert, mit Sauce serviert" },
            { name: "Salatschüssel mit Samosa", price: "CHF 22.00", description: "Tomaten und Früchten, Sweet-and-sour-Sauce", ingredients: "Blattsalat, Samosa, Tomaten, Früchte, Sweet-and-sour-Sauce", cookingProcess: "Salat angerichtet, Samosa frittiert, mit Sauce serviert" },
            { name: "Salatschüssel mit Blätterteig", price: "CHF 22.00", description: "Gefüllt mit Poulet und Lemon Gras, Tomaten und Früchten, Sweet-and-sour-Sauce", ingredients: "Blattsalat, Blätterteig mit Poulet und Lemongras, Tomaten, Früchte, Sauce", cookingProcess: "Salat angerichtet, Blätterteig gebacken, mit Sauce serviert" },
            { name: "Siedfleischsalat garniert", price: "CHF 24.00", description: "(Es hät solangs hät)", ingredients: "Siedfleisch, Essig, Öl, Zwiebeln, Garnitur", cookingProcess: "Fleisch gekocht, in Streifen geschnitten, mit Dressing und Garnitur angerichtet" },
            { name: "Cäsarsalat mit Poulet und Speck", price: "CHF 22.80", description: "Parmesan-Käse und Knoblauch-Croutons", ingredients: "Römersalat, Poulet, Speck, Parmesan, Cesarsauce, Croutons", cookingProcess: "Poulet und Speck gebraten, mit Salat, Sauce und Croutons serviert" },
            { name: "Wurstsalat garniert", price: "CHF 18.50", description: "liebevoll garniert - perfekt für den kleinen Hunger", ingredients: "Wurst, Essig, Öl, Zwiebeln, Garnitur", cookingProcess: "Wurst geschnitten, mit Dressing angemacht und garniert" },
            { name: "Wurst-Käse-Salat garniert", price: "CHF 22.00", description: "Wurst und Käse mit Salat liebevoll garniert", ingredients: "Wurst, Käse, Essig, Öl, Salat, Garnitur", cookingProcess: "Wurst und Käse geschnitten, mit Salat und Dressing garniert" },
            { name: "Beefsteak Tartar", priceVariants: { gross: "CHF 28.50", klein: "CHF 21.50" }, description: "Toast, Butter, Zwiebelringe", ingredients: "Rindfleisch (roh), Zwiebeln, Kapern, Ei, Toast, Butter", cookingProcess: "Tartar von Hand gehackt, mit Toast und Zwiebelringen serviert" }
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

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const handleClose = () => {
        setIsOpen(false);
        setSelectedItem(null);
    }

    return (
        <div className="w-full flex flex-col gap-2 items-center z-10 ">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            <div className="w-full h-screen relative flex flex-col gap-8 pt-35">
                <Image src={RestaurantItems[safeRestoId].image} alt="Chef" fill className="object-cover z-0 brightness-35 p-2 rounded-3xl" sizes="100vw" />

                <div className="w-6xl h-[calc(100vh-12rem)] mx-auto flex justify-between gap-4 z-10 pt-30 relative">
                    <div className="flex flex-col text-white gap-4 font-(family-name:--font-lora)">
                        <h2 className="text-6xl font-bold">{RestaurantItems[safeRestoId].title}</h2>
                        <h3 className="text-xl font-normal">{RestaurantItems[safeRestoId].desc}</h3>
                        <div className="flex gap-4">
                            <Dialog >
                                <DialogTrigger className="salz-btn w-fit text-white font-(family-name:--font-poppins)">Reservationen & Take-Away</DialogTrigger>
                                <DialogContent className="main-bg">
                                    <DialogHeader>
                                        <DialogTitle className="hidden"></DialogTitle>
                                        <DialogDescription>
                                            <span className="text-xl font-bold py-5"> Wir freuen uns Ihre Reservationen telefonisch unter
                                                <span className="text-(--salz-color) text-3xl">&nbsp;{RestaurantItems[safeRestoId].mob}&nbsp;</span> <br /> entgegen zu nehmen.
                                                Ihr Wirtschaft zur Salzwaag Team </span>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <div className="flex flex-col items-start h-fit min-w-60 p-4 rounded-md gap-2 z-10 bg-white/15 backdrop-blur-md">
                        <div className="text-md font-semibold text-white">
                            Öffnungszeiten
                        </div>
                        {OpeningHours && OpeningHours[restoId].map((item: any, index: any) => {
                            return (<div key={index} className="text-md text-white" >
                                {item}
                            </div>)
                        })}
                    </div>

                    <div className="w-fit absolute bottom-0 right-0 flex gap-4">
                        {
                            RestaurantItems.filter((item) => item.id !== safeRestoId).map((item) => (
                                <div className="flex w-full items-center gap-2 bg-white/10 p-2 rounded-md backdrop-blur-lg">
                                    <div className="w-18 h-18 gap-2 z-10 rounded-md overflow-hidden bg-muted relative">
                                        <Image src={item.image} alt="Chef" fill className="object-cover z-0 brightness-95 hover:scale-105 transition-all duration-300" sizes="100vw" />
                                    </div>
                                    <div className="flex flex-col gap-2 text-white">
                                        <h2 className="text-md font-normal w-35 text-ellipsis overflow-hidden whitespace-nowrap">{item.title}</h2>
                                        <h3 className="text-xs font-normal w-35 text-ellipsis overflow-hidden whitespace-nowrap">{item.location}</h3>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>


            </div>

            <div className="w-6xl h-fit flex gap-8 pt-5">
                <div className="w-[75%] relative flex flex-col gap-2 p-5">
                    <h1 className="text-5xl font-bold text-(--salz-color)">Menu</h1>
                    <div className="flex flex-col gap-2">
                        {(menuDataByRestaurant[safeRestoId] ?? menuDataBadi).map((sect) => (
                            <div key={sect.section} className="flex flex-col gap-2">
                                <div className="w-full py-5">
                                    <h1 className="text-2xl font-bold">{sect.section}</h1>
                                    {sect.description && <h4 className="text-md text-gray-400 font-normal">{sect.description}</h4>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {sect.items.map((item, index) => (
                                        <div key={`${sect.section}-${index}`}
                                            onClick={() => {
                                                setIsOpen(true);
                                                setSelectedItem(item);
                                            }}
                                            className="cursor-pointer bg-white h-30 border border-grey rounded-md overflow-hidden gap-2 flex w-full relative hover:border-(--salz-color)/80 hover:scale-102 transition-all duration-300 group">
                                            <div className="relative h-30 w-30">
                                                <Image src={item.image || "/images/def-food.png"} alt={item.name} fill className="p-1 object-cover brightness-90 group-hover:brightness-100 transition-all duration-300 rounded-md" sizes="100vw" />
                                            </div>
                                            <div className="w-70 pt-2 overflow-hidden text-black flex flex-col gap-1 p-2 bg-white/30 group-hover:bg-white/80 transition-all duration-300 backdrop-blur-xs">
                                                <h3 className="text-md font-semibold w-full">{item.name}</h3>
                                                {item.description && (
                                                    <h4 className="w-60 text-xs text-normal text-gray-600">{item.description}</h4>
                                                )}

                                            </div>

                                            <div className="absolute bottom-0 right-0 p-2 bg-white/50 group-hover:bg-white transition-all duration-300 text-(--salz-color) font-bold backdrop-blur-xs rounded-md">
                                                {'priceVariants' in item ? (
                                                    <div className="flex flex-col items-end gap-0.5">
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
                    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
                        <DialogContent className="max-w-[min(24rem,90vw)] max-h-[85vh] overflow-y-auto p-0 gap-0">
                            {selectedItem && (
                                <>
                                    <div className="relative w-full h-50 rounded-t-md overflow-hidden shrink-0">
                                        <Image src={selectedItem.image || "/images/def-food.png"} alt={selectedItem.name} fill className="object-cover" sizes="100vw" />
                                    </div>
                                    <div className="p-4 flex flex-col gap-3">
                                        <DialogHeader className="p-0 gap-1">
                                            <DialogTitle className="text-lg text-(--salz-color)">{selectedItem.name}</DialogTitle>
                                            <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                                                {'priceVariants' in selectedItem ? (
                                                    Object.entries(selectedItem.priceVariants).map(([variant, priceVal]: [string, string]) => (
                                                        <span key={variant} className="text-sm font-semibold text-gray-700 capitalize">{variant}: {priceVal}</span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm font-semibold text-(--salz-color)">{selectedItem.price}</span>
                                                )}
                                            </div>
                                        </DialogHeader>
                                        {selectedItem.description && (
                                            <DialogDescription className="text-gray-600 text-sm">{selectedItem.description}</DialogDescription>
                                        )}
                                        {selectedItem.ingredients && (
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-800">Zutaten:</span>
                                                <p className="text-gray-600 mt-0.5">{selectedItem.ingredients}</p>
                                            </div>
                                        )}
                                        {selectedItem.cookingProcess && (
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-800">Zubereitung:</span>
                                                <p className="text-gray-600 mt-0.5">{selectedItem.cookingProcess}</p>
                                            </div>
                                        )}
                                        <Button variant="outline" size="sm" className="w-fit mt-2" onClick={handleClose}>
                                            Schliessen
                                        </Button>
                                    </div>
                                </>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="w-[25%] sticky top-28 self-start flex flex-col gap-4 ">

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

                    <div className="w-full gap-2 z-10 rounded-md overflow-hidden bg-muted relative">
                        <Maps Id={restoId} Height={240} Width={300} ></Maps>
                    </div>

                </div>

            </div>

            {/* Contacts */}
            <div className="w-full flex gap-4 flex-col  z-10 relative p-5 footer-bg">
                <div className="w-6xl mx-auto p-3 py-5 bg-white rounded-md z-10 ">

                    <div className="p-2 border border-gray-200 rounded-xs shadow flex justify-center items-center gap-3">
                        <div className="text-black ">
                            <span className="text-md font-light text-md">Hat es Ihnen geschmeckt?</span>
                            &nbsp;<span className="text-black">
                                Wir freuen uns auf Ihr Feedback
                            </span>
                        </div>

                        <Button className="salz-btn w-fit h-9!">Feedback bei Google</Button>
                    </div>
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

export default function RestoPageWithSuspense() {
    return (
        <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center">Loading...</div>}>
            <RestoPage />
        </Suspense>
    );
}