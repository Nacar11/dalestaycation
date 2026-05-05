'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import {
    Waves,
    Palmtree,
    Car,
    Wifi,
    ChefHat,
    Tv,
    Snowflake,
    Users,
    BedDouble,
    Maximize,
    ChevronLeft,
    ChevronRight,
    WashingMachine,
    Dumbbell,
    Monitor,
    Shield,
    Ticket,
    Camera,
    LucideIcon
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AIRBNB_LISTING_URL } from '@/lib/constants'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'

const STAGGER_DELAY = 0.1
const BASE_DELAY = 0.2

// Type definitions
interface FeaturedHighlight {
    image: string
    title: string
    description: string
    accentColor: string
    glowColor: string
}

interface Amenity {
    icon: LucideIcon
    title: string
    description: string
    size: 'normal' | 'featured'
    category: string
}

interface RoomSpec {
    icon: LucideIcon
    value: string
    numericValue?: number
    label: string
}

interface GalleryImage {
    src: string
    alt: string
}

interface GalleryCategory {
    id: string
    title: string
    description: string
    images: GalleryImage[]
}

interface GalleryGroup {
    id: string
    title: string
    categories: GalleryCategory[]
}

// Featured highlights - the "wow" factors with premium styling
const featuredHighlights: FeaturedHighlight[] = [
    {
        image: '/images/experience/pool-beach-access.jpg',
        title: 'Pool & Beach Access',
        description: 'Multiple resort pools and private beach',
        accentColor: '#1E4D5C',
        glowColor: 'rgba(30, 77, 92, 0.4)'
    },
    {
        image: '/images/experience/luxury-amneties.jpg',
        title: 'Luxury Amenities',
        description: 'Fully equipped modern studio',
        accentColor: '#E07A5F',
        glowColor: 'rgba(224, 122, 95, 0.4)'
    },
    {
        image: '/images/experience/resort-living.jpg',
        title: 'Resort Living',
        description: '11-hectare seaside community',
        accentColor: '#1E4D5C',
        glowColor: 'rgba(30, 77, 92, 0.4)'
    },
    {
        image: '/images/experience/gym-access.jpg',
        title: 'Gym & Fitness',
        description: 'State-of-the-art fitness facilities',
        accentColor: '#E07A5F',
        glowColor: 'rgba(224, 122, 95, 0.4)'
    }
]

// All amenities for bento grid
const allAmenities: Amenity[] = [
    { icon: Wifi, title: 'High-Speed WiFi', description: 'Work-ready internet', size: 'normal', category: 'essential' },
    { icon: Waves, title: 'Pool Access', description: 'Multiple resort pools', size: 'normal', category: 'resort' },
    { icon: Snowflake, title: 'Air Conditioning', description: 'Climate-controlled', size: 'normal', category: 'essential' },
    { icon: Palmtree, title: 'Beach Access', description: 'Private beach nearby', size: 'normal', category: 'resort' },
    { icon: ChefHat, title: 'Full Kitchen', description: 'Cook your own meals', size: 'normal', category: 'essential' },
    { icon: Tv, title: 'Smart TV', description: 'Netflix & streaming', size: 'normal', category: 'entertainment' },
    { icon: Car, title: 'Free Parking', description: 'Secure on-site', size: 'normal', category: 'essential' },
    { icon: Monitor, title: 'Workspace', description: 'Dedicated desk area', size: 'normal', category: 'work' },
    { icon: WashingMachine, title: 'Washer', description: 'In-unit laundry', size: 'normal', category: 'essential' },
    { icon: Dumbbell, title: 'Fitness Gym', description: 'Stay active', size: 'normal', category: 'wellness' },
]

// Safety features
const safetyFeatures: string[] = [
    'Lock on bedroom door',
    'Security cameras (exterior)',
    'Smoke alarm',
    'Fire extinguisher',
    'First aid kit',
    'Noise monitors'
]

// Room specifications
const roomSpecs: RoomSpec[] = [
    { icon: Users, value: '3', numericValue: 3, label: 'Guests Max' },
    { icon: BedDouble, value: '1', numericValue: 1, label: 'Queen Bed' },
    { icon: Maximize, value: '35', numericValue: 35, label: 'sqm Space' },
]

// Gallery groups
const galleryGroups: GalleryGroup[] = [
    {
        id: 'the-suite',
        title: 'The Suite',
        categories: [
            {
                id: 'studio',
                title: 'The Studio',
                description: 'Your luxury one-bedroom sanctuary',
                images: [
                    { src: '/images/studio/photo-gallery-studio-1.jpg', alt: 'Spacious studio with floor-to-ceiling curtains' },
                    { src: '/images/studio/photo-gallery-studio-2.jpg', alt: 'Cozy queen bed with wooden headboard' },
                    { src: '/images/studio/photo-gallery-studio-3.jpg', alt: 'Studio living area with elegant decor' },
                    { src: '/images/studio/photo-gallery-studio-4.jpg', alt: 'Studio interior with natural lighting' },
                    { src: '/images/studio/photo-gallery-studio-5.jpg', alt: 'Studio sleeping area with queen bed' },
                    { src: '/images/studio/photo-gallery-studio-6.jpg', alt: 'Studio entertainment and relaxation space' },
                    { src: '/images/studio/photo-gallery-studio-7.jpg', alt: 'Studio workspace and desk area' },
                    { src: '/images/studio/photo-gallery-studio-8.jpg', alt: 'Studio ambient evening lighting' },
                ],
            },
            {
                id: 'kitchen-dining',
                title: 'Kitchen & Dining',
                description: 'Fully equipped for your culinary needs',
                images: [
                    { src: '/images/kitchen/photo-gallery-kitchen-1.jpg', alt: 'Modern kitchen with full appliances' },
                    { src: '/images/kitchen/photo-gallery-kitchen-2.jpg', alt: 'Kitchen dining area setup' },
                ],
            },
            {
                id: 'bathroom',
                title: 'Bathroom',
                description: 'Modern and well-appointed',
                images: [
                    { src: '/images/bathroom/photo-gallery-bathroom-1.jpg', alt: 'Modern bathroom with rain shower' },
                    { src: '/images/bathroom/photo-gallery-bathroom-2.jpg', alt: 'Bathroom vanity and mirror area' },
                    { src: '/images/bathroom/photo-gallery-bathroom-3.jpg', alt: 'Bathroom amenities and fixtures' },
                ],
            },
            {
                id: 'balcony',
                title: 'Balcony',
                description: 'Private outdoor space with views',
                images: [
                    { src: '/images/balcony/photo-gallery-balcony-1.jpg', alt: 'Balcony with resort view' },
                    { src: '/images/balcony/photo-gallery-balcony-2.jpg', alt: 'Private balcony seating area' },
                    { src: '/images/balcony/photo-gallery-balcony-3.jpg', alt: 'Balcony sunset view' },
                ],
            },
        ],
    },
    {
        id: 'the-resort',
        title: 'The Resort',
        categories: [
            {
                id: 'frontdesk',
                title: 'Lobby & Reception',
                description: 'Professional reception and concierge service',
                images: [
                    { src: '/images/frontdesk/photo-gallery-frontdesk-1.jpg', alt: 'Front desk lobby seating' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-2.jpg', alt: 'Reception concierge counter' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-3.jpg', alt: 'Lobby lounge area' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-4.jpg', alt: 'Front desk information board' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-5.jpg', alt: 'Resort entrance and reception' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-6.jpg', alt: 'Front desk service area' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-7.jpg', alt: 'Resort welcome signage' },
                ],
            },
            {
                id: 'lounge',
                title: 'Lounge',
                description: 'Relax and unwind in style',
                images: [
                    { src: '/images/lounge/photo-gallery-lounge-1.jpg', alt: 'Resort lounge seating area' },
                    { src: '/images/lounge/photo-gallery-lounge-2.jpg', alt: 'Lounge relaxation space' },
                    { src: '/images/lounge/photo-gallery-lounge-3.jpg', alt: 'Lounge ambient lighting and seating' },
                    { src: '/images/lounge/photo-gallery-lounge-4.jpg', alt: 'Lounge panoramic view' },
                    { src: '/images/lounge/photo-gallery-lounge-5.jpg', alt: 'Lounge evening atmosphere' },
                ],
            },
            {
                id: 'pool',
                title: 'Pool',
                description: 'Multiple pools for your enjoyment',
                images: [
                    { src: '/images/pool/photo-gallery-pool-1.jpg', alt: 'Resort main swimming pool' },
                    { src: '/images/pool/photo-gallery-pool-2.jpg', alt: 'Pool lounge chairs and cabana' },
                    { src: '/images/pool/photo-gallery-pool-3.jpg', alt: 'Infinity pool with ocean view' },
                    { src: '/images/pool/photo-gallery-pool-4.jpg', alt: 'Pool area with tropical landscaping' },
                    { src: '/images/pool/photo-gallery-pool-5.jpg', alt: 'Evening pool with ambient lighting' },
                    { src: '/images/pool/photo-gallery-pool-6.jpg', alt: 'Lap pool for fitness swimming' },
                    { src: '/images/pool/photo-gallery-pool-7.jpg', alt: 'Pool deck and seating area' },
                ],
            },
            {
                id: 'beach',
                title: 'Beach',
                description: 'Private beach access steps away',
                images: [
                    { src: '/images/beach/photo-gallery-beach-1.jpg', alt: 'Beach shoreline and crystal waters' },
                    { src: '/images/beach/photo-gallery-beach-2.jpg', alt: 'Beach lounge area with umbrellas' },
                    { src: '/images/beach/photo-gallery-beach-3.jpg', alt: 'Seaside walking path' },
                    { src: '/images/beach/photo-gallery-beach-4.jpg', alt: 'Beach sunset panoramic view' },
                    { src: '/images/beach/photo-gallery-beach-5.jpg', alt: 'Beach palm trees and coastline' },
                    { src: '/images/beach/photo-gallery-beach-6.jpg', alt: 'Beachfront relaxation spot' },
                ],
            },
            {
                id: 'gym',
                title: 'Gym',
                description: 'State-of-the-art fitness facilities',
                images: [
                    { src: '/images/gym/photo-gallery-gym-1.jpg', alt: 'Fitness center main floor' },
                    { src: '/images/gym/photo-gallery-gym-2.jpg', alt: 'Cardio equipment area' },
                    { src: '/images/gym/photo-gallery-gym-4.jpg', alt: 'Gym stretching and yoga space' },
                    { src: '/images/gym/photo-gallery-gym-5.jpg', alt: 'Exercise machines row' },
                    { src: '/images/gym/photo-gallery-gym-6.jpg', alt: 'Gym locker and towel area' },
                    { src: '/images/gym/photo-gallery-gym-7.jpg', alt: 'Training equipment closeup' },
                ],
            },
        ],
    },
]

// Flatten all categories for state initialization
const allCategories = galleryGroups.flatMap((group) => group.categories)

// Premium Icon Component - Elegant outlined design with gradient glow
const PremiumIcon = ({
    icon: Icon,
    accentColor,
    glowColor,
    size = 'large'
}: {
    icon: LucideIcon
    accentColor: string
    glowColor: string
    size?: 'small' | 'large'
}) => {
    const sizeClasses = size === 'large'
        ? 'w-20 h-20'
        : 'w-14 h-14'
    const iconSize = size === 'large' ? 'w-9 h-9' : 'w-6 h-6'

    return (
        <div
            className={cn(
                sizeClasses,
                "relative flex items-center justify-center rounded-2xl",
                "bg-gradient-to-br from-white to-sand-light",
                "border-2 transition-all duration-300",
                "group-hover:scale-105"
            )}
            style={{
                borderColor: accentColor,
                boxShadow: `0 8px 32px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.5)`
            }}
        >
            {/* Inner glow */}
            <div
                className="absolute inset-2 rounded-xl opacity-20"
                style={{ backgroundColor: accentColor }}
            />
            <Icon
                className={cn(iconSize, "relative z-10")}
                style={{ color: accentColor }}
                strokeWidth={1.5}
                aria-hidden="true"
            />
        </div>
    )
}

const resortAccessImages = [
    { src: '/images/pool/photo-gallery-pool-1.jpg', alt: 'Resort swimming pool at Tambuli Seaside Living' },
    { src: '/images/beach/photo-gallery-beach-1.jpg', alt: 'Private beach access at Tambuli Seaside Living' },
    { src: '/images/pool/photo-gallery-pool-3.jpg', alt: 'Outdoor pool with sea view' },
    { src: '/images/beach/photo-gallery-beach-3.jpg', alt: 'Beachfront shoreline at Tambuli' },
    { src: '/images/gym/photo-gallery-gym-1.jpg', alt: 'Fully equipped fitness gym' },
    { src: '/images/pool/photo-gallery-pool-5.jpg', alt: 'Pool lounge area at the resort' },
    { src: '/images/beach/photo-gallery-beach-5.jpg', alt: 'Beach view from Tambuli Seaside Living' },
    { src: '/images/gym/photo-gallery-gym-2.jpg', alt: 'Gym facilities and equipment' },
]

const aboutCarouselImages = [
    '/images/about/about-kitchen.jpg',
    '/images/studio/photo-gallery-studio-1.jpg',
    '/images/studio/photo-gallery-studio-4.jpg',
    '/images/kitchen/photo-gallery-kitchen-1.jpg',
    '/images/balcony/photo-gallery-balcony-1.jpg',
]

export default function ExperienceSection() {
    // About section carousel
    const [aboutIndex, setAboutIndex] = useState(0)

    const advanceAbout = useCallback(() => {
        setAboutIndex((prev) => (prev + 1) % aboutCarouselImages.length)
    }, [])

    useEffect(() => {
        const interval = setInterval(advanceAbout, 5000)
        return () => clearInterval(interval)
    }, [advanceAbout])

    // Resort access carousel
    const [resortIndex, setResortIndex] = useState(0)
    const [resortHovered, setResortHovered] = useState(false)

    const prevResort = useCallback(() => {
        setResortIndex((prev) => (prev - 1 + resortAccessImages.length) % resortAccessImages.length)
    }, [])

    const nextResort = useCallback(() => {
        setResortIndex((prev) => (prev + 1) % resortAccessImages.length)
    }, [])

    useEffect(() => {
        if (resortHovered) return
        const interval = setInterval(nextResort, 4000)
        return () => clearInterval(interval)
    }, [nextResort, resortHovered])

    const [activeGroupId, setActiveGroupId] = useState(galleryGroups[0].id)
    const [activeCategory, setActiveCategory] = useState(galleryGroups[0].categories[0].id)
    const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>(
        Object.fromEntries(allCategories.map((cat) => [cat.id, 0]))
    )

    const activeGroup = galleryGroups.find((g) => g.id === activeGroupId) || galleryGroups[0]
    const activeGallery = activeGroup.categories.find((cat) => cat.id === activeCategory) || activeGroup.categories[0]
    const currentImageIndex = currentImageIndexes[activeCategory] || 0

    const handleNextImage = () => {
        setCurrentImageIndexes((prev) => ({
            ...prev,
            [activeCategory]: (prev[activeCategory] + 1) % activeGallery.images.length,
        }))
    }

    const handlePrevImage = () => {
        setCurrentImageIndexes((prev) => ({
            ...prev,
            [activeCategory]:
                (prev[activeCategory] - 1 + activeGallery.images.length) % activeGallery.images.length,
        }))
    }

    const handleDotClick = (index: number) => {
        setCurrentImageIndexes((prev) => ({
            ...prev,
            [activeCategory]: index,
        }))
    }

    const handleGroupChange = (groupId: string) => {
        if (groupId === activeGroupId) return
        setActiveGroupId(groupId)
        const group = galleryGroups.find((g) => g.id === groupId)
        if (group) {
            setActiveCategory(group.categories[0].id)
        }
    }

    // Touch swipe for mobile gallery
    const touchStartX = useRef(0)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) handleNextImage()
            else handlePrevImage()
        }
    }

    return (
        <section id="experience" className="relative overflow-hidden" aria-label="Experience Section">
            {/* ================================ */}
            {/* EXPERIENCE INTRO + HIGHLIGHTS  */}
            {/* ================================ */}
            <div className="bg-white py-16 md:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="max-w-2xl mb-14">
                            <p className="text-ocean/35 text-[10px] uppercase tracking-[0.4em] mb-8 font-medium">
                                The Experience · Tambuli Seaside Living, Cebu
                            </p>
                            <div className="leading-none mb-6">
                                <span className="block font-display italic text-ocean-deep/20 text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-1 select-none">
                                    Your Luxury
                                </span>
                                <span className="block font-display text-ocean-deep text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-bold">
                                    Escape at Tambuli.
                                </span>
                            </div>
                            <div className="w-8 h-[2px] bg-coral mb-6" />
                            <p className="text-ocean/55 text-base leading-relaxed">
                                An 11-hectare residential resort community on the shores of Cebu — every amenity, every comfort, within reach.
                            </p>
                        </div>
                    </BlurFade>

                    {/* Featured Highlights - Full-Bleed Image Cards (2×2 grid) */}
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                        {featuredHighlights.map((highlight, index) => {
                            const isPersonalPhoto = index >= 2
                            return (
                                <BlurFade key={highlight.title} delay={BASE_DELAY + STAGGER_DELAY * (index + 2)} inView>
                                    <div
                                        className={cn(
                                            "group relative overflow-hidden rounded-3xl cursor-default",
                                            "shadow-xl hover:shadow-2xl transition-shadow duration-500",
                                            isPersonalPhoto
                                                ? "h-[380px] md:h-[500px]"
                                                : "h-[300px] md:h-[400px]"
                                        )}
                                    >
                                        {/* Full-bleed image */}
                                        <Image
                                            src={highlight.image}
                                            alt={highlight.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority={index < 2}
                                        />

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 group-hover:from-black/70 transition-all duration-500" />

                                        {/* Personal collection badge */}
                                        {isPersonalPhoto && (
                                            <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/25">
                                                <Camera className="w-3.5 h-3.5 text-white" strokeWidth={2} aria-hidden="true" />
                                                <span className="text-white text-xs font-medium tracking-wide">Personal Collection</span>
                                            </div>
                                        )}

                                        {/* Accent underline */}
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-[3px]"
                                            style={{ backgroundColor: highlight.accentColor }}
                                        />

                                        {/* Text content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                                            <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-2 drop-shadow-lg leading-tight">
                                                {highlight.title}
                                            </h3>
                                            <p className="text-white/75 text-sm md:text-base leading-relaxed">
                                                {highlight.description}
                                            </p>
                                        </div>
                                    </div>
                                </BlurFade>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ================================ */}
            {/* ABOUT SECTION — The Cebu Edit */}
            {/* ================================ */}
            <div className="relative bg-sand-light overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="grid lg:grid-cols-2 min-h-[680px] lg:gap-6">

                            {/* ── Left: Editorial Content ── */}
                            <div className="px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 flex flex-col justify-center">

                                {/* Location chain — ultra-fine tracking */}
                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 0.5} inView>
                                    <p className="text-ocean/40 text-[10px] uppercase tracking-[0.4em] mb-10 font-medium">
                                        Dita Building&nbsp;·&nbsp;Tambuli Seaside Living&nbsp;·&nbsp;Lapu&#8209;Lapu City, Cebu
                                    </p>
                                </BlurFade>

                                {/* Split heading: italic ghost + solid bold */}
                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                                    <div className="mb-8 leading-none">
                                        <span className="block font-display italic text-ocean-deep/20 text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] mb-1 select-none">
                                            Welcome to
                                        </span>
                                        <span className="block font-display text-ocean-deep text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] font-bold">
                                            Adam&apos;s Staycation
                                        </span>
                                    </div>
                                </BlurFade>

                                {/* Coral rule */}
                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 1.5} inView>
                                    <div className="w-10 h-[2px] bg-coral mb-8" />
                                </BlurFade>

                                {/* Description */}
                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                                    <p className="text-ocean/60 text-[15px] leading-relaxed max-w-sm mb-14">
                                        A fully-furnished studio in Cebu&apos;s premier 11-hectare seaside resort
                                        community. Resort-style amenities, personal touches, everything you need.
                                    </p>
                                </BlurFade>

                                {/* Editorial steps — large watermark numbers, no circles */}
                                <div className="space-y-9">
                                    {[
                                        {
                                            title: "Arrive at Tambuli",
                                            body: "Head to the Dita Building entrance. Let the security guard know you're a booked guest for your scheduled stay.",
                                        },
                                        {
                                            title: "Check In at the Lobby",
                                            body: "Proceed to the front desk and sign in the log book. The host will verify your reservation details.",
                                        },
                                        {
                                            title: "Settle Into Your Suite",
                                            body: "Head up to your fully-furnished studio — it's open and ready for you. Make yourself at home!",
                                        },
                                    ].map((step, i) => (
                                        <BlurFade key={step.title} delay={BASE_DELAY + STAGGER_DELAY * (3 + i)} inView>
                                            <div className="relative flex gap-6 group">
                                                {/* Number column */}
                                                <div className="relative flex-shrink-0 w-12 flex flex-col items-start">
                                                    {/* Giant watermark */}
                                                    <span className="absolute -top-4 -left-1 font-display text-[5rem] font-bold text-ocean-deep/[0.05] leading-none select-none pointer-events-none">
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    {/* Readable small number */}
                                                    <span className="relative z-10 text-coral text-xs font-semibold tracking-[0.25em] mt-1">
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    {/* Vertical connector */}
                                                    {i < 2 && (
                                                        <div className="absolute top-5 left-[5px] w-px bg-ocean/10" style={{ height: 'calc(100% + 2.25rem)' }} />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div>
                                                    <h4 className="text-ocean-deep font-semibold text-sm mb-1.5 group-hover:text-coral transition-colors duration-300">
                                                        {step.title}
                                                    </h4>
                                                    <p className="text-ocean/50 text-sm leading-relaxed">
                                                        {step.body}
                                                    </p>
                                                </div>
                                            </div>
                                        </BlurFade>
                                    ))}
                                </div>
                            </div>

                            {/* ── Right: Full-bleed Carousel ── */}
                            <div className="relative min-h-[460px] lg:min-h-0 overflow-hidden lg:rounded-l-2xl">
                                {/* Slide strip */}
                                <div
                                    className="flex h-full transition-transform duration-700 ease-out"
                                    style={{ transform: `translateX(-${aboutIndex * 100}%)` }}
                                >
                                    {aboutCarouselImages.map((src) => (
                                        <img
                                            key={src}
                                            src={src}
                                            alt=""
                                            className="w-full h-full object-cover flex-shrink-0"
                                        />
                                    ))}
                                </div>


                                {/* Room specs — dark gradient overlay over photo */}
                                <div className="absolute bottom-0 left-0 right-0 pt-20 pb-8 px-8 md:px-10 bg-gradient-to-t from-ocean-deep/95 via-ocean-deep/60 to-transparent pointer-events-none">
                                    <p className="text-white/25 text-[9px] uppercase tracking-[0.35em] mb-5">
                                        Room Specifications
                                    </p>
                                    <div className="flex items-center gap-8 md:gap-10">
                                        {roomSpecs.map((spec) => {
                                            const Icon = spec.icon
                                            return (
                                                <div key={spec.label} className="flex items-center gap-3">
                                                    <Icon className="w-4 h-4 text-coral flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                                                    <div>
                                                        <p className="font-display text-white text-2xl font-bold leading-none">
                                                            {spec.numericValue ? (
                                                                <NumberTicker value={spec.numericValue} className="text-white" />
                                                            ) : spec.value}
                                                        </p>
                                                        <p className="text-white/35 text-[11px] mt-0.5 tracking-wide">{spec.label}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Vertical pill dots — top-right, editorial style */}
                                <div className="absolute top-4 right-4 flex flex-col gap-0.5 pointer-events-auto">
                                    {aboutCarouselImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setAboutIndex(i)}
                                            aria-label={`View image ${i + 1}`}
                                            aria-current={i === aboutIndex ? 'true' : undefined}
                                            className="w-8 h-8 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-coral/70"
                                        >
                                            <span className={cn(
                                                "rounded-full transition-all duration-300 block",
                                                i === aboutIndex
                                                    ? "bg-coral w-1.5 h-5"
                                                    : "bg-ocean-deep/20 hover:bg-ocean-deep/40 w-1.5 h-1.5"
                                            )} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* ================================ */}
            {/* ESSENTIALS STRIP                */}
            {/* ================================ */}
            <div className="bg-white border-t border-sand-dark/10">
                <BlurFade delay={BASE_DELAY} inView>

                    {/* — Section label — */}
                    <div className="pt-8 pb-5 text-center">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-ocean/30 font-medium">Everything Included</span>
                    </div>

                    {/* — Amenities Marquee (single row) — */}
                    <div className="pb-7 relative overflow-hidden">
                        {/* Left/right fade masks */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                        <Marquee pauseOnHover repeat={4}>
                            {allAmenities.map((amenity) => {
                                const Icon = amenity.icon
                                return (
                                    <div
                                        key={amenity.title}
                                        className="flex items-center gap-2 mx-2.5 px-4 py-2 rounded-full bg-sand-light border border-sand-dark/20 hover:bg-sand hover:border-sand-dark/35 transition-all duration-200 cursor-default"
                                    >
                                        <Icon className="w-3.5 h-3.5 flex-shrink-0 text-coral/70" strokeWidth={1.5} aria-hidden="true" />
                                        <span className="text-xs font-medium tracking-wide whitespace-nowrap text-ocean/70">{amenity.title}</span>
                                    </div>
                                )
                            })}
                        </Marquee>
                    </div>

                    {/* — Safety row — */}
                    <div className="border-t border-sand-dark/10 py-4 px-5 md:px-10">
                        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                <Shield className="w-3.5 h-3.5 text-ocean/35" strokeWidth={1.5} aria-hidden="true" />
                                <span className="text-[10px] uppercase tracking-[0.25em] text-ocean/30 font-medium">Safety</span>
                            </div>
                            {safetyFeatures.map((feature, i) => (
                                <span key={feature} className="text-[11px] text-ocean/40 whitespace-nowrap">
                                    {feature}{i < safetyFeatures.length - 1 && (
                                        <span className="ml-6 text-ocean/20" aria-hidden="true">·</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                </BlurFade>
            </div>

            {/* ================================ */}
            {/* RESORT ACCESS                   */}
            {/* ================================ */}
            <div className="bg-sand-light overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 min-h-[580px] md:min-h-[620px] lg:gap-6">

                        {/* Left — Auto-play carousel */}
                        <div
                            className="lg:col-span-5 relative min-h-[360px] lg:min-h-0 order-2 lg:order-1 overflow-hidden lg:rounded-r-2xl"
                            onMouseEnter={() => setResortHovered(true)}
                            onMouseLeave={() => setResortHovered(false)}
                        >
                            {/* Slides track */}
                            <div
                                className="absolute inset-0 flex transition-transform duration-700 ease-out"
                                style={{ transform: `translateX(-${resortIndex * 100}%)` }}
                            >
                                {resortAccessImages.map((img) => (
                                    <div key={img.src} className="relative flex-shrink-0 w-full h-full">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 42vw"
                                        />
                                    </div>
                                ))}
                            </div>


                            {/* Bottom scrim */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent z-10 pointer-events-none" />

                            {/* Prev arrow */}
                            <button
                                onClick={prevResort}
                                aria-label="Previous image"
                                className={cn(
                                    "absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white transition-all duration-200 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40",
                                    resortHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
                                )}
                            >
                                <ChevronLeft className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                            </button>

                            {/* Next arrow */}
                            <button
                                onClick={nextResort}
                                aria-label="Next image"
                                className={cn(
                                    "absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white transition-all duration-200 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40",
                                    resortHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
                                )}
                            >
                                <ChevronRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                            </button>

                            {/* Floating badge */}
                            <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/25">
                                <Waves className="w-3.5 h-3.5 text-white" strokeWidth={1.5} aria-hidden="true" />
                                <span className="text-white text-xs font-medium tracking-wide">Pool · Beach · Gym</span>
                            </div>
                        </div>

                        {/* Right — Editorial content */}
                        <div className="lg:col-span-7 px-8 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-center order-1 lg:order-2">
                            <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>

                                {/* Label */}
                                <p className="text-ocean/35 text-[10px] uppercase tracking-[0.4em] mb-8 font-medium">
                                    Resort Amenities Access
                                </p>

                                {/* Heading — same editorial pattern as About */}
                                <div className="mb-6 leading-none">
                                    <span className="block font-display italic text-ocean-deep/20 text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] mb-1 select-none">
                                        Pool. Beach. Gym.
                                    </span>
                                    <span className="block font-display text-ocean-deep text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] font-bold">
                                        Access on Your Terms.
                                    </span>
                                </div>

                                {/* Coral rule */}
                                <div className="w-8 h-[2px] bg-coral mb-7" />

                                {/* Descriptor */}
                                <p className="text-ocean/55 text-sm leading-relaxed max-w-sm mb-10">
                                    Resort facilities are open to all guests. Pick the option that fits your stay — no hidden fees, no complications.
                                </p>

                                {/* Tier split — no cards, editorial columns */}
                                <div className="grid grid-cols-2 mb-10">

                                    {/* Short stay */}
                                    <div className="pr-8 border-r border-ocean/10">
                                        <p className="text-[9px] uppercase tracking-[0.35em] text-ocean/35 font-medium mb-4">Day Pass</p>
                                        <p className="font-display text-[2rem] text-ocean-deep font-bold leading-none mb-1">
                                            &#8369;900
                                        </p>
                                        <p className="text-[11px] text-ocean/40 mb-4">per person / per day</p>
                                        <p className="text-xs text-ocean/40 leading-relaxed">
                                            Vouchers available at check-in.<br />Ideal for 1–7 day bookings.
                                        </p>
                                    </div>

                                    {/* Long stay */}
                                    <div className="pl-8">
                                        <p className="text-[9px] uppercase tracking-[0.35em] text-ocean/35 font-medium mb-4">Long Stay</p>
                                        <p className="font-display italic text-[1.6rem] text-coral font-medium leading-none mb-1">
                                            Complimentary
                                        </p>
                                        <p className="text-[11px] text-ocean/40 mb-4">from 3 weeks onward</p>
                                        <p className="text-xs text-ocean/40 leading-relaxed">
                                            Full resort access included.<br />Terms negotiable.
                                        </p>
                                    </div>

                                </div>

                                {/* CTA */}
                                <a
                                    href={AIRBNB_LISTING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-ocean/20 text-ocean text-sm font-medium hover:bg-ocean hover:text-white hover:border-ocean transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ocean/40 w-fit"
                                    aria-label="Check availability on Airbnb"
                                >
                                    <Ticket className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                                    Check Availability
                                </a>

                            </BlurFade>
                        </div>

                    </div>
                </div>
            </div>

            {/* ================================ */}
            {/* PHOTO GALLERY                   */}
            {/* ================================ */}
            <div className="bg-white py-16 md:py-20 border-t border-sand-dark/10">
                <div className="max-w-7xl mx-auto px-5 md:px-10">

                    {/* Header row: editorial label + heading + group toggle */}
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="mb-10">
                            <p className="text-ocean/35 text-[10px] uppercase tracking-[0.4em] mb-8 font-medium">
                                Photo Gallery
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-6">
                                <div className="leading-none">
                                    <span className="block font-display italic text-ocean-deep/20 text-3xl md:text-[2.5rem] leading-[1.15] mb-1 select-none">
                                        Every Corner.
                                    </span>
                                    <span className="block font-display text-ocean-deep text-3xl md:text-[2.5rem] leading-[1.15] font-bold">
                                        Every Detail.
                                    </span>
                                </div>

                                {/* Group toggle — right-aligned */}
                                <div
                                    className="inline-flex self-start sm:self-auto bg-white border border-sand-dark/15 rounded-xl p-1 shadow-sm flex-shrink-0"
                                    role="tablist"
                                    aria-label="Gallery groups"
                                >
                                    {galleryGroups.map((group) => (
                                        <motion.button
                                            key={group.id}
                                            onClick={() => handleGroupChange(group.id)}
                                            role="tab"
                                            aria-selected={activeGroupId === group.id}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.1, ease: 'easeOut' }}
                                            className={cn(
                                                "px-5 py-2.5 min-h-[44px] flex items-center rounded-lg text-sm font-semibold transition-all duration-250 cursor-pointer",
                                                activeGroupId === group.id
                                                    ? "bg-ocean-deep text-white shadow-md"
                                                    : "text-ocean/50 hover:text-ocean"
                                            )}
                                        >
                                            {group.title}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            <div className="w-8 h-[2px] bg-coral" />
                        </div>
                    </BlurFade>

                    {/* Category pills — left-aligned, light style */}
                    <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                        <div
                            className="flex flex-wrap gap-2 mb-8"
                            role="tablist"
                            aria-label="Gallery categories"
                        >
                            <AnimatePresence mode="popLayout">
                                {activeGroup.categories.map((category) => (
                                    <motion.button
                                        key={category.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        whileTap={{ scale: 0.92 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        onClick={() => setActiveCategory(category.id)}
                                        role="tab"
                                        aria-selected={activeCategory === category.id}
                                        className={cn(
                                            "px-4 py-2.5 min-h-[44px] flex items-center rounded-full text-xs font-medium cursor-pointer transition-colors duration-200",
                                            activeCategory === category.id
                                                ? "bg-coral text-white shadow-sm shadow-coral/20"
                                                : "bg-white text-ocean/50 hover:text-ocean border border-sand-dark/15 hover:border-sand-dark/30"
                                        )}
                                    >
                                        {category.title}
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </BlurFade>

                    {/* Gallery — main image + thumbnail strip */}
                    <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 1.5} inView>
                        <div
                            className="grid grid-cols-1 lg:grid-cols-[1fr_185px] gap-3"
                            role="tabpanel"
                            id={`gallery-panel-${activeCategory}`}
                            aria-label={`${activeGallery.title} gallery`}
                        >
                            {/* Main image */}
                            <div
                                className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden group bg-sand shadow-lg shadow-ocean/8"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <AnimatePresence>
                                    <motion.img
                                        key={`${activeCategory}-${currentImageIndex}`}
                                        src={activeGallery.images[currentImageIndex].src}
                                        alt={activeGallery.images[currentImageIndex].alt}
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        whileHover={{ scale: 1.04 }}
                                        transition={{
                                            opacity: { duration: 0.4, ease: 'easeOut' },
                                            scale: { duration: 0.65, ease: 'easeOut', type: 'tween' },
                                        }}
                                        className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
                                    />
                                </AnimatePresence>

                                {/* Gradient scrim */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                                {/* Image caption + counter */}
                                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between pointer-events-none">
                                    <div>
                                        <h4 className="text-white font-semibold text-sm drop-shadow mb-0.5">
                                            {activeGallery.title}
                                        </h4>
                                        <p className="text-white/65 text-xs hidden md:block drop-shadow leading-snug">
                                            {activeGallery.description}
                                        </p>
                                    </div>
                                    <span className="text-white/75 text-[11px] font-medium bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full hidden md:block">
                                        {currentImageIndex + 1} / {activeGallery.images.length}
                                    </span>
                                </div>

                                {/* Prev / Next arrows */}
                                {activeGallery.images.length > 1 && (
                                    <>
                                        <motion.button
                                            onClick={handlePrevImage}
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.88 }}
                                            transition={{ duration: 0.15, ease: 'easeOut' }}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center text-ocean-deep opacity-0 group-hover:opacity-100 transition-opacity duration-250 shadow-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ocean/30 cursor-pointer"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                                        </motion.button>
                                        <motion.button
                                            onClick={handleNextImage}
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.88 }}
                                            transition={{ duration: 0.15, ease: 'easeOut' }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center text-ocean-deep opacity-0 group-hover:opacity-100 transition-opacity duration-250 shadow-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ocean/30 cursor-pointer"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-5 h-5" strokeWidth={2} />
                                        </motion.button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail strip — vertical on desktop, horizontal scroll on mobile */}
                            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto lg:max-h-[500px] [&::-webkit-scrollbar]:w-0 [scrollbar-width:none]">
                                {activeGallery.images.map((img, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => handleDotClick(i)}
                                        whileTap={{ scale: 0.94 }}
                                        transition={{ duration: 0.12, ease: 'easeOut' }}
                                        aria-label={`View image ${i + 1} of ${activeGallery.images.length}`}
                                        aria-current={i === currentImageIndex ? 'true' : undefined}
                                        className={cn(
                                            "relative flex-shrink-0 w-20 h-14 lg:w-full lg:h-auto lg:aspect-[4/3]",
                                            "rounded-xl overflow-hidden cursor-pointer transition-all duration-200",
                                            "focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 focus:ring-offset-white",
                                            i === currentImageIndex
                                                ? "ring-2 ring-coral ring-offset-2 ring-offset-white opacity-100"
                                                : "opacity-50 hover:opacity-85"
                                        )}
                                    >
                                        <img
                                            src={img.src}
                                            alt=""
                                            aria-hidden="true"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>

                        </div>
                    </BlurFade>

                </div>
            </div>
        </section>
    )
}