'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

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


const NavbarMobile = () => {

    return (
        <div className="flex items-center justify-center gap-2 fixed bottom-0 left-0 w-full h-auto p-3 z-50">
            <div className="flex gap-2 bg-(--salz-color)/70 shadow-2xl p-2 rounded-full">
                <Button className="rounded-full">Reservationen</Button>
                <Button className="rounded-full" variant="ghost">Menü</Button>
            </div>
        </div>
    );
};

export default NavbarMobile;