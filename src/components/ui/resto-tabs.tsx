"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import Image from "next/image"

import { cn } from "@/lib/utils"

const TabsListRefContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

function RestoTabs({
  className,
  orientation = "horizontal",
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const listRef = React.useRef<HTMLDivElement>(null)

  const handleValueChange = React.useCallback(
    (value: string) => {
      onValueChange?.(value)
      // Scroll the selected trigger into view after Radix updates the DOM
      requestAnimationFrame(() => {
        const activeTrigger = listRef.current?.querySelector<HTMLElement>("[data-state=active]")
        activeTrigger?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      })
    },
    [onValueChange]
  )

  return (
    <TabsListRefContext.Provider value={listRef}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        orientation={orientation}
        className={cn(
          "group/tabs flex gap-1 data-[orientation=horizontal]:flex-col",
          className
        )}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsListRefContext.Provider>
  )
}

const tabsListVariants = cva(
  "rounded-lg p-[3px] group-data-[orientation=horizontal]/tabs:h-9 data-[variant=line]:rounded-none data-[variant=card]:h-auto data-[variant=card]:p-0 data-[variant=card]:gap-2 group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=card]:flex-row data-[variant=card]:w-full data-[variant=card]:overflow-auto pb-3!",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
        card: "bg-transparent gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function RestoTabsList({
  className,
  variant = "default",
  ref: _ref,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const listRef = React.useContext(TabsListRefContext)
  return (
    <TabsPrimitive.List
      ref={listRef ?? undefined}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

interface RestoTabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  /** Image src for card-style trigger (reservation-card layout) */
  image?: string
  /** Optional description/subtitle shown below the trigger label in card style */
  description?: string
  /** Optional icon src for description row (e.g. location or clock icon) */
  descriptionIcon?: string
}

function RestoTabsTrigger({
  className,
  image,
  description,
  descriptionIcon,
  children,
  ...props
}: RestoTabsTriggerProps) {
  const isCardStyle = image != null

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-card={isCardStyle ? "true" : undefined}
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:text-foreground data-[state=active]:border-3 data-[state=active]:border-(--salz-color)",
        "group-data-[variant=card]/tabs-list:data-[card=true]:data-[state=active]:border-3 group-data-[variant=card]/tabs-list:data-[card=true]:data-[state=active]:border-(--salz-color)",
        "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        "group-data-[variant=card]/tabs-list:data-[card=true]:min-w-50 group-data-[variant=card]/tabs-list:data-[card=true]:w-50 group-data-[variant=card]/tabs-list:data-[card=true]:h-40 group-data-[variant=card]/tabs-list:data-[card=true]:flex-none group-data-[variant=card]/tabs-list:data-[card=true]:p-0  group-data-[variant=card]/tabs-list:data-[card=true]:overflow-hidden group-data-[variant=card]/tabs-list:data-[card=true]:border-0 group-data-[variant=card]/tabs-list:data-[card=true]:after:opacity-0",
        className
      )}
      {...props}
    >
      {isCardStyle ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            className="object-cover rounded-sm"
            sizes="(max-width: 400px) 100vw, 12.5rem"
          />
          <div className="absolute bottom-0 left-0 w-full p-2">
            <div className="bg-card backdrop-blur-sm p-2 rounded-md text-card-foreground">
              <h3 className="text-xl font-bold whitespace-nowrap text-ellipsis overflow-hidden w-full">
                {children}
              </h3>
              {(description ?? descriptionIcon) && (
                <div className="flex gap-1 items-center">
                  {descriptionIcon && (
                    <Image
                      src={descriptionIcon}
                      alt=""
                      className="size-5 shrink-0"
                      width={20}
                      height={20}
                    />
                  )}
                  {description && (
                    <span className="text-sm text-muted-foreground font-medium whitespace-nowrap text-ellipsis overflow-hidden min-w-0">
                      {description}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        children
      )}
    </TabsPrimitive.Trigger>
  )
}

function RestoTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { RestoTabs, RestoTabsList, RestoTabsTrigger, RestoTabsContent, tabsListVariants }
