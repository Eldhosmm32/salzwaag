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
            { href: '/menu/restaurant-stafa', label: 'Menu Restaurant' },
            { href: '/reservation', label: 'Reservation' },
            { href: '/restaurant-stafa', label: 'Öffnungszeiten Restaurant' },
        ],
    },
    { href: '/ueber-uns', label: 'Über uns' },
    {
        label: 'Badi Uetikon am See',
        children: [
            { href: '/menu/badi-uetikon-am-see', label: 'Essen in der Badi' },
            { href: '/badi-uetikon-am-see', label: 'Öffnungszeiten Badi Uetikon' },
        ],
    },
    {
        label: 'Bistro Schiffsteg Stäfa',
        children: [
            { href: '/menu/bistro-schiffsteg-stafa', label: 'Karte Bistro' },
            { href: '/bistro-schiffsteg-stafa', label: 'Öffnungszeiten Bistro Schiffsteg Stäfa' },
        ],
    },
    { href: '/kontakt', label: 'Kontakt' },
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

const items = [
    {
        label: "Wirtschaft zur Salzwaag Stäfa",
        bgColor: "#09203f",
        textColor: "#fff",
        links: [
            { label: "Menu", href: "/restaurant-stafa", ariaLabel: "Menu" },
            { label: "Reservation", href: "/reservation", ariaLabel: "Reservation" },
            { label: getOpenOrNot(0), href: "/restaurant-stafa", ariaLabel: "Öffnungszeiten" }
        ]
    },
    {
        label: "Badi Uetikon",
        bgColor: "#170D27",
        textColor: "#fff",
        links: [
            { label: "Menu", href: "/badi-uetikon-am-see", ariaLabel: "Menu" },
            { label: "Reservation", href: "/reservation", ariaLabel: "Reservation" },
            { label: getOpenOrNot(1), href: "/badi-uetikon-am-see", ariaLabel: "Öffnungszeiten" }
        ]
    },
    {
        label: "Bistro Schiffsteg Stäfa",
        bgColor: "#243949",
        textColor: "#fff",
        links: [
            { label: "Menu", href: "/bistro-schiffsteg-stafa", ariaLabel: "Menu" },
            { label: "Reservation", href: "/reservation", ariaLabel: "Reservation" },
            { label: getOpenOrNot(2), href: "/bistro-schiffsteg-stafa", ariaLabel: "Öffnungszeiten" }
        ]
    }
];

const Navbar = () => {

    return (
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

export default Navbar;