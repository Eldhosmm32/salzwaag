"use client";
import Maps from "@/components/Maps";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { menuDataByRestaurant, OPENING_HOURS_SIMPLE, type MenuItem } from "@/lib/menu-data";
import { RESTAURANTS, getRestoIdBySlug } from "@/lib/restaurants";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

const restoTween = { type: "tween" as const, duration: 0.5, ease: "easeOut" as const };
const restoStagger = 0.06;

function RestoPageContent() {
  const params = useParams();
  const router = useRouter();
  const restoSlug = (params?.restoSlug as string) ?? "";
  const safeRestoId = getRestoIdBySlug(restoSlug);
  const restaurant = RESTAURANTS[safeRestoId];

  useEffect(() => {
    if (restoSlug === "resto") {
      router.replace("/restaurant-stafa");
    }
  }, [restoSlug, router]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  if (restoSlug === "resto") {
    return null;
  }

  return (
    <motion.div
      className="w-full flex flex-col gap-2 items-center z-10 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="w-full h-screen relative flex flex-col gap-6 md:gap-8 pt-35">
        <motion.div
          className="absolute inset-0 z-0 p-2 md:p-3"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image src={restaurant.image} alt="Chef" fill className="object-cover brightness-35 rounded-2xl md:rounded-3xl p-2 md:p-3" sizes="100vw" />
        </motion.div>

        <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl h-[calc(100vh-12rem)] mx-auto flex flex-row md:flex-col lg:flex-row justify-between md:justify-start lg:justify-between gap-4 md:gap-6 z-10 pt-20 relative px-3 md:px-10 lg:px-0">
          <motion.div
            className="flex flex-col text-white gap-3 md:gap-4 font-(family-name:--font-lora)"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...restoTween, delay: 0.15 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">{restaurant.title}</h2>
            <motion.h3
              className="text-lg md:text-xl font-normal"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...restoTween, delay: 0.25 }}
            >
              {restaurant.desc}
            </motion.h3>
            <motion.div
              className="flex gap-3 md:gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...restoTween, delay: 0.35 }}
            >
              <Dialog>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <DialogTrigger className="salz-btn w-fit text-white font-(family-name:--font-poppins)">Reservationen & Take-Away</DialogTrigger>
                </motion.div>
                <DialogContent className="main-bg">
                  <DialogHeader>
                    <DialogTitle className="hidden"></DialogTitle>
                    <DialogDescription>
                      <span className="text-xl font-bold py-5">
                        {" "}
                        Wir freuen uns Ihre Reservationen telefonisch unter
                        <span className="text-(--salz-color) text-3xl">&nbsp;{restaurant.mob}&nbsp;</span> <br /> entgegen zu nehmen. Ihr Wirtschaft zur Salzwaag Team{" "}
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col items-start h-fit w-fit min-w-52 md:min-w-60 p-2 md:p-2.5 rounded-md gap-1.5 md:gap-2 z-10 bg-white/5 backdrop-blur-xs shrink-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...restoTween, delay: 0.3 }}
          >
            <div className="text-sm md:text-base font-normal text-white">Öffnungszeiten</div>
            <div className="flex flex-col gap-1 w-full bg-white/10 p-2 rounded-md backdrop-blur-lg">
              {OPENING_HOURS_SIMPLE[safeRestoId]?.map((item: string, index: number) => (
                <div key={index} className="text-xs md:text-sm text-white">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-fit md:absolute md:bottom-0 md:right-10 lg:right-0 flex flex-col gap-1 border border-white/5 p-2 rounded-md backdrop-blur-xs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...restoTween, delay: 0.4 }}
          >
            <h2 className="text-sm md:text-base font-normal text-white">Unsere Restaurants</h2>
            <div className="flex flex-wrap md:flex-nowrap gap-2">
              {RESTAURANTS.filter((item) => item.id !== safeRestoId).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...restoTween, delay: 0.5 + i * 0.08 }}
                >
                  <Link href={`/${item.slug}`}>
                    <motion.div
                      className="flex w-full items-center gap-2 bg-white/10 p-2 rounded-md backdrop-blur-lg hover:scale-102 transition-all duration-300 min-w-0"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-14 h-14 md:w-18 md:h-18 gap-2 z-10 rounded-md overflow-hidden bg-muted relative shrink-0">
                        <Image src={item.image} alt="Chef" fill className="object-cover z-0 brightness-95 " sizes="100vw" />
                      </div>
                      <div className="flex flex-col gap-0.5 md:gap-2 text-white min-w-0">
                        <h2 className="text-sm md:text-base font-normal w-28 md:w-35 text-ellipsis overflow-hidden whitespace-nowrap">{item.title}</h2>
                        <h3 className="text-xs font-normal w-28 md:w-35 text-ellipsis overflow-hidden whitespace-nowrap">{item.location}</h3>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl h-fit flex flex-col lg:flex-row gap-6 md:gap-8 pt-4 md:pt-5 px-3 md:px-5 lg:px-0">
        <div className="w-full lg:w-[75%] relative flex flex-col gap-2 p-3 md:p-0 lg:p-0">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--salz-color)"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={restoTween}
          >
            Menu
          </motion.h1>
          <div className="flex flex-col gap-2">
            {(menuDataByRestaurant[safeRestoId] ?? menuDataByRestaurant[1]).map((sect, sectIndex) => (
              <motion.div
                key={sect.section}
                className="flex flex-col gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...restoTween, delay: 0.05 }}
              >
                <div className="w-full py-4 md:py-5">
                  <motion.h1
                    className="text-xl md:text-2xl font-bold"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...restoTween, delay: sectIndex * 0.02 }}
                  >
                    {sect.section}
                  </motion.h1>
                  {sect.description && <h4 className="text-sm md:text-base text-gray-400 font-normal">{sect.description}</h4>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {sect.items.map((item, index) => (
                    <motion.div
                      key={`${sect.section}-${index}`}
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedItem(item);
                      }}
                      className="cursor-pointer bg-white h-auto min-h-28 md:h-30 border border-grey rounded-md overflow-hidden gap-2 flex w-full relative hover:border-(--salz-color)/80 hover:scale-102 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ ...restoTween, delay: index * restoStagger }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="relative h-24 w-24 md:h-30 md:w-30 shrink-0">
                        <Image src={item.image || "/images/def-food.png"} alt={item.name} fill className="p-1 object-cover brightness-90 group-hover:brightness-100 transition-all duration-300 rounded-md" sizes="100vw" />
                      </div>
                      <div className="min-w-0 flex-1 pt-2 overflow-hidden text-black flex flex-col gap-1 p-2 bg-white/30 group-hover:bg-white/80 transition-all duration-300 backdrop-blur-xs">
                        <h3 className="text-sm md:text-base font-semibold w-full text-ellipsis overflow-hidden">{item.name}</h3>
                        {item.description && <h4 className="w-full max-w-48 md:max-w-60 text-xs text-normal text-gray-600 line-clamp-2">{item.description}</h4>}
                      </div>
                      <div className="absolute bottom-0 right-0 p-1.5 md:p-2 bg-white/50 group-hover:bg-white transition-all duration-300 text-(--salz-color) font-bold backdrop-blur-xs rounded-md shrink-0">
                        {"priceVariants" in item ? (
                          <div className="flex flex-col items-end gap-0.5">
                            {Object.entries(item.priceVariants).map(([variant, priceVal]) => (
                              <h4 key={variant} className="text-xs md:text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden">
                                {variant} {priceVal}
                              </h4>
                            ))}
                          </div>
                        ) : (
                          <h4 className="text-xs md:text-sm text-normal whitespace-nowrap text-ellipsis overflow-hidden">{item.price}</h4>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
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
                        {"priceVariants" in selectedItem ? (
                          Object.entries(selectedItem.priceVariants).map(([variant, priceVal]: [string, string]) => (
                            <span key={variant} className="text-sm font-semibold text-gray-700 capitalize">{variant}: {priceVal}</span>
                          ))
                        ) : (
                          <span className="text-sm font-semibold text-(--salz-color)">{selectedItem.price}</span>
                        )}
                      </div>
                    </DialogHeader>
                    {selectedItem.description && <DialogDescription className="text-gray-600 text-sm">{selectedItem.description}</DialogDescription>}
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
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="w-fit mt-2" onClick={handleClose}>
                        Schliessen
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <motion.div
          className="w-full lg:w-[25%] lg:sticky lg:top-28 lg:self-start flex flex-col gap-3 md:gap-4"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ...restoTween, delay: 0.15 }}
        >
          <div className="p-3 md:p-4 main-bg border border-gray-200 shadow rounded-md">
            <div className="text-black text-xs md:text-sm">Take-Away nach Vorbestellung</div>
          </div>
          <div className="p-3 md:p-4 rounded-md border border-gray-200 shadow text-black text-xs md:text-sm font-light">
            <span className="font-semibold">Note:</span>
            <br />
            <span className="text-(--salz-color)">●</span> Fleisch und Fisch Herkunft Schweiz
            <br />
            <span className="text-(--salz-color)">●</span> Preise in CHF inkl.
            <br />
            <span className="text-(--salz-color)">●</span> Mehrwertsteuer  Änderungen vorbehalten
            <br />
            <span className="text-(--salz-color)">●</span> Für Informationen zu Allergenen wenden Sie sich bitte an unser Personal.
          </div>
          <motion.div
            className="w-full h-52 gap-2 z-10 rounded-md overflow-hidden bg-muted relative hidden md:hidden lg:block"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...restoTween, delay: 0.2 }}
          >
            <Maps Id={safeRestoId} Height={240} Width={300}></Maps>
          </motion.div>
          <motion.div
            className="w-full h-52 gap-2 z-10 rounded-md overflow-hidden bg-muted relative hidden md:block lg:hidden"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...restoTween, delay: 0.2 }}
          >
            <Maps Id={safeRestoId} Height={240} Width={800}></Maps>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
}

export default function RestoSlugPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center">Loading...</div>}>
      <RestoPageContent />
    </Suspense>
  );
}
