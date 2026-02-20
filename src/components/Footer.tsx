import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {

    const restoTween = { type: "tween" as const, duration: 0.5, ease: "easeOut" as const };

    return (
        <motion.div
            className="w-full flex gap-4 flex-col  z-10 relative p-5 footer-bg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...restoTween, duration: 0.5 }}
        >
            <div className="w-6xl mx-auto p-3 py-5 bg-white rounded-md z-10 ">

                <motion.div
                    className="p-2  flex justify-center items-center gap-3"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={restoTween}
                >

                </motion.div>
                <footer className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-b border-border">
                        <div className="flex flex-col gap-4 items-center justify-center py-5">
                            <Link href="/" className="text-2xl font-bold text-(--salz-color) hover:opacity-90 transition-opacity">
                                <Image
                                    src={'/wzs-logo.png'}
                                    alt="Logo"
                                    width={160}
                                    height={160}
                                    className="object-contain z-10"
                                />
                            </Link>
                            <p className="text-xs text-muted-foreground text-center max-w-xl">
                                Spice up your everyday life with an exotic sensory experience or enjoy Swiss favorites – in a restaurant, at your event or at your home.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="text-black text-center">
                                <span className="text-md font-light text-md">Hat es Ihnen geschmeckt?</span>
                                <br /><span className="text-black">
                                    Wir freuen uns auf Ihr Feedback
                                </span>
                            </div>
                            <Button className="salz-btn w-fit h-9!">Feedback bei Google</Button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-md font-semibold text-foreground uppercase tracking-wider">Reservations & Take-Away</h3>
                            <p className="text-xs text-muted-foreground">
                                Reservations and take-away orders by phone.<br /> We look forward to your call.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Restaurant Stäfa:</span>{' '}
                                <a href="tel:0434770504" className="text-(--salz-color) hover:underline">043 477 05 04</a>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Badi Uetikon:</span>{' '}
                                <a href="tel:0449202233" className="text-(--salz-color) hover:underline">044 920 22 33</a>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Bistro Schiffsteg:</span>{' '}
                                <a href="tel:0438180500" className="text-(--salz-color) hover:underline">043 818 05 00</a>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span>© {new Date().getFullYear()} Salzwaag. All rights reserved.</span>
                    </div>
                </footer>
            </div>
        </motion.div>
    )
}

export default Footer;