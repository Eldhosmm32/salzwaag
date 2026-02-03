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

const isDropdown = (item: NavItem): item is { label: string; children: NavLink[] } =>
    'children' in item;

const ChevronDown = ({ className, open }: { className?: string; open?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} ${className ?? ''}`}
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

/** Show white navbar when scrolled past this (px) */
const SCROLL_DOWN_THRESHOLD = 50;
/** Switch back to transparent when scroll is above this (px) */
const SCROLL_UP_THRESHOLD = 20;

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => {
        setIsMenuOpen(false);
        setOpenMobileDropdown(null);
    };

    const toggleMobileDropdown = (label: string) =>
        setOpenMobileDropdown((prev) => (prev === label ? null : label));

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setIsScrolled((prev) => {
                if (Math.abs(y) > SCROLL_DOWN_THRESHOLD) return true;
                if (Math.abs(y) < SCROLL_UP_THRESHOLD) return false;
                return prev;
            });
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                popoverRef.current &&
                buttonRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background shadow-sm' : 'transparent'
                }`}
        >
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
                <motion.div
                    className="flex items-center justify-between gap-4"
                    initial={{ opacity: 0, y: '-1rem' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image
                        src={isScrolled ? '/wzs-logo.png' : '/wzs-logo-w.png'}
                        alt="Logo"
                        width={100}
                        height={100}
                    />

                    {/* Desktop nav links - hidden on mobile/tablet */}
                    <ul
                        className={`hidden lg:flex items-center gap-6 xl:gap-10 font-light transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-white'
                            }`}
                    >
                        {navItems.map((item) => (
                            <li
                                key={isDropdown(item) ? item.label : item.href}
                                className="relative"
                                onMouseEnter={() => isDropdown(item) && setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {isDropdown(item) ? (
                                    <>
                                        <span className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity whitespace-nowrap cursor-default">
                                            {item.label}
                                            <ChevronDown open={openDropdown === item.label} />
                                        </span>
                                        <div
                                            className={`absolute left-0 top-full pt-2 min-w-48 z-100 transition-all duration-200 ${openDropdown === item.label
                                                ? 'opacity-100 pointer-events-auto'
                                                : 'opacity-0 pointer-events-none'
                                                }`}
                                        >
                                            <ul className="rounded-xl border border-white/10 bg-white/90 text-foreground shadow-lg backdrop-blur-lg py-2">
                                                {item.children.map((child) => (
                                                    <li key={child.href}>
                                                        <Link
                                                            href={child.href}
                                                            className="block px-4 py-2.5 hover:bg-white/50 transition-colors first:rounded-t-[0.6875rem] last:rounded-b-[0.6875rem]"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                                        <Link
                                            href={item.href}
                                            className="hover:opacity-80 transition-opacity whitespace-nowrap block"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                )}
                            </li>
                        ))}
                    </ul>

                    <Button className={`${isScrolled ? 'salz-btn-white' : 'salz-btn'}`}>Reservationen</Button>

                    {/* Hamburger button + popover - visible on mobile/tablet */}
                    <div className="relative lg:hidden">
                        <button
                            ref={buttonRef}
                            type="button"
                            onClick={toggleMenu}
                            className={`flex flex-col justify-center items-center w-10 h-10 rounded-lg transition-colors aria-expanded:bg-white/5 ${isScrolled ? 'text-foreground hover:bg-black/5' : 'text-white hover:bg-white/5'
                                }`}
                            aria-expanded={isMenuOpen}
                            aria-haspopup="true"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            <span
                                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen
                                    ? 'rotate-45 translate-y-1'
                                    : '-translate-y-1.5'
                                    }`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                                    }`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen
                                    ? '-rotate-45 -translate-y-1'
                                    : 'translate-y-1.5'
                                    }`}
                            />
                        </button>

                        {/* Popover menu */}
                        <div
                            ref={popoverRef}
                            role="menu"
                            aria-orientation="vertical"
                            className={`absolute right-0 top-full z-100 mt-2 min-w-48 rounded-xl border border-white/10 bg-white/90 text-foreground shadow-lg backdrop-blur-lg transition-all duration-200 ease-out ${isMenuOpen
                                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible'
                                : 'opacity-0 scale-95 -translate-y-1 pointer-events-none invisible'
                                }`}
                        >
                            <ul className="py-2">
                                {navItems.map((item) =>
                                    isDropdown(item) ? (
                                        <li key={item.label} role="none">
                                            <button
                                                type="button"
                                                onClick={() => toggleMobileDropdown(item.label)}
                                                className="flex w-full items-center justify-between px-4 py-2.5 font-light text-foreground hover:bg-accent/50 transition-colors"
                                                aria-expanded={openMobileDropdown === item.label}
                                            >
                                                {item.label}
                                                <ChevronDown open={openMobileDropdown === item.label} className="shrink-0" />
                                            </button>
                                            {openMobileDropdown === item.label && (
                                                <ul className="bg-white/50 pl-4">
                                                    {item.children.map((child) => (
                                                        <li key={child.href} role="none">
                                                            <Link
                                                                href={child.href}
                                                                onClick={closeMenu}
                                                                role="menuitem"
                                                                className="block px-4 py-2 font-light text-foreground hover:bg-accent/50 transition-colors"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ) : (
                                        <li key={item.href} role="none">
                                            <Link
                                                href={item.href}
                                                onClick={closeMenu}
                                                role="menuitem"
                                                className="block px-4 py-2.5 font-light text-foreground hover:bg-accent/50 transition-colors first:rounded-t-[0.6875rem] last:rounded-b-[0.6875rem]"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;