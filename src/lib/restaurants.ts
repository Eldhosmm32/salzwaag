/**
 * Shared restaurant config with URL slugs for name-based navigation.
 * Use these slugs in routes: /restaurant-stafa, /menu/badi-uetikon-am-see, etc.
 */

export const RESTAURANT_SLUGS = [
  'restaurant-stafa',
  'badi-uetikon-am-see',
  'bistro-schiffsteg-stafa',
] as const;

export type RestaurantSlug = (typeof RESTAURANT_SLUGS)[number];

export interface RestaurantItem {
  id: number;
  slug: RestaurantSlug;
  image: string;
  title: string;
  desc?: string;
  location: string;
  mob?: string;
  baseColor?: string;
}

export const RESTAURANTS: RestaurantItem[] = [
  {
    id: 0,
    slug: 'restaurant-stafa',
    image: '/images/rest-1.jpg',
    title: 'Restaurant Stäfa',
    desc: 'Malaysian and Swiss cuisine under one roof',
    location: 'Stäfa, Switzerland',
    mob: '043 477 05 04',
  },
  {
    id: 1,
    slug: 'badi-uetikon-am-see',
    image: '/images/rest-2.jpg',
    title: 'Badi Uetikon am See',
    desc: 'Swimming and feasting at the Uetikon public swimming pool',
    location: 'Uetikon am See, Switzerland',
    mob: '044 920 22 33',
  },
  {
    id: 2,
    slug: 'bistro-schiffsteg-stafa',
    image: '/images/rest-3.jpg',
    title: 'Bistro Schiffsteg Stäfa',
    desc: 'Malaysian and Swiss cuisine under one roof',
    location: 'Stäfa, Switzerland',
    mob: '043 818 05 00',
  },
];

export function getRestoIdBySlug(slug: string): number {
  const index = RESTAURANT_SLUGS.indexOf(slug as RestaurantSlug);
  if (index >= 0) return index;
  return 0;
}

export function getRestoSlugById(id: number): RestaurantSlug {
  if (id >= 0 && id < RESTAURANTS.length) return RESTAURANTS[id].slug;
  return RESTAURANT_SLUGS[0];
}

export function isValidRestoSlug(slug: string): slug is RestaurantSlug {
  return (RESTAURANT_SLUGS as readonly string[]).includes(slug);
}
