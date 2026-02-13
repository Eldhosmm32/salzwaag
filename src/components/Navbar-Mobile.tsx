'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import CardNav from './CardNav';
import { CardNavItem } from './CardNav';

type NavLink = { href: string; label: string };
type NavItem = NavLink | { label: string; children: NavLink[] };

const navItems: NavItem[] = [
    {
        label: 'Restaurant Stäfa',
        children: [
            { href: '/restaurant-stafa/menu', label: 'Menu Restaurant' },
            { href: '/restaurant-stafa/reservation', label: 'Reservation' },
            { href: '/restaurant-stafa/oeffnungszeiten', label: 'Öffnungszeiten Restaurant' },
        ],
    },
    { href: '/ueber-uns', label: 'Über uns' },
    {
        label: 'Badi Uetikon am See',
        children: [
            { href: '/badi-uetikon/essen', label: 'Essen in der Badi' },
            { href: '/badi-uetikon/oeffnungszeiten', label: 'Öffnungszeiten Badi Uetikon' },
        ],
    },
    {
        label: 'Bistro Schiffsteg Stäfa',
        children: [
            { href: '/bistro-schiffsteg/karte', label: 'Karte Bistro' },
            { href: '/bistro-schiffsteg/oeffnungszeiten', label: 'Öffnungszeiten Bistro Schiffsteg Stäfa' },
        ],
    },
    { href: '/kontakt', label: 'Kontakt' },
];


const items = [
    {
        label: "Wirtschaft zur Salzwaag Stäfa",
        bgColor: "#09203f",
        textColor: "#fff",
        links: [
            { label: "Menu", ariaLabel: "Menu" },
            { label: "Reservation", ariaLabel: "Reservation" },
            { label: "Öffnungszeiten", ariaLabel: "Öffnungszeiten" }
        ]
    },
    {
        label: "Badi Uetikon",
        bgColor: "#170D27",
        textColor: "#fff",
        links: [
            { label: "Menu", ariaLabel: "Menu" },
            { label: "Reservation", ariaLabel: "Reservation" },
            { label: "Öffnungszeiten", ariaLabel: "Öffnungszeiten" }
        ]
    },
    {
        label: "Bistro Schiffsteg Stäfa",
        bgColor: "#243949",
        textColor: "#fff",
        links: [
            { label: "Menu", ariaLabel: "Menu" },
            { label: "Reservation", ariaLabel: "Reservation" },
            { label: "Öffnungszeiten", ariaLabel: "Öffnungszeiten" }
        ]
    }
];

const NavbarMobile = () => {

    return (
        // <div className="flex items-center justify-center gap-2 fixed top-0 left-0 w-full h-auto p-3 z-50">
        //     <div className="flex gap-2 bg-(--salz-color)/70 shadow-2xl p-2 rounded-full">
        //         <Button className="rounded-full">Reservationen</Button>

        //         <Image src="/wzs-logo.png" alt="Chef" width={100} height={100} className="object-cover" />

        //         <Button className="rounded-full" variant="ghost">Menü</Button>
        //     </div>
        // </div>

        <CardNav
            logo={"/wzs-logo.png"}
            logoAlt="Company Logo"
            items={items as CardNavItem[]}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="var(--salz-color)"
            buttonTextColor="#fff"
            ease="power3.out"
            buttonLink="/reservation"
            buttonText="Reservationen"
        />
    );
};

export default NavbarMobile;