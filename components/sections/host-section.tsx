'use client'

import Image from 'next/image'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { AIRBNB_LISTING_URL, CONTACT_EMAIL } from '@/lib/constants'
import { BlurFade } from '@/components/ui/blur-fade'
import { ShimmerButton } from '@/components/ui/shimmer-button'

const STAGGER_DELAY = 0.1
const BASE_DELAY = 0.2

const contactInfo = [
    {
        icon: Mail,
        label: 'Email',
        value: 'nacariodale@gmail.com',
        href: 'mailto:nacariodale@gmail.com',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '0926-003-2484',
        href: 'tel:09260032484',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Tambuli Seaside Living, Lapu-Lapu City, Cebu',
        href: 'https://www.google.com/maps/place/Tambuli+Seaside+Resort+and+Spa/@10.2899858,124.0020002,17z/data=!3m1!4b1!4m9!3m8!1s0x33a99732246dcbc5:0x61ef43a187a2080a!5m2!4m1!1i2!8m2!3d10.2899858!4d124.0068711!16s%2Fg%2F11h_3t257r?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D',
    },
]

export default function HostSection() {
    return (
        <section
            id="host"
            className="relative bg-sand-light overflow-hidden"
            aria-label="Meet the Owner"
        >
            <div className="max-w-4xl mx-auto px-4 md:px-10 py-14 md:py-24">
                <BlurFade delay={BASE_DELAY} inView>
                    <p className="text-ocean/35 text-[10px] uppercase tracking-[0.4em] mb-8 font-medium">
                        Meet the Owner&nbsp;·&nbsp;Adam&apos;s Staycation
                    </p>
                </BlurFade>

                {/* Card */}
                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 0.3} inView>
                <div className="bg-white rounded-3xl shadow-lg shadow-ocean/8 border border-sand-dark/10 px-6 md:px-12 py-10 md:py-12">

                {/* Horizontal profile layout — image left, content right */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                    {/* Profile image — compact, grounded */}
                    <div className="flex-shrink-0 mx-auto lg:mx-0">
                            <div className="relative w-44 h-56 lg:w-48 lg:h-60 rounded-2xl overflow-hidden shadow-md shadow-ocean/10">
                                <Image
                                    src="/images/studio/owner.jpg"
                                    alt="Dale Nacario — Property Owner"
                                    fill
                                    className="object-cover scale-150"
                                    style={{ objectPosition: 'center 100%' }}
                                    priority
                                    quality={100}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/55 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                                    <p className="font-display text-white text-sm font-semibold leading-tight">
                                        Dale Nacario
                                    </p>
                                    <p className="text-white/45 text-[11px] mt-0.5">Cebu, Philippines</p>
                                </div>
                            </div>
                        </div>

                    {/* Editorial content */}
                    <div className="flex-1 min-w-0">

                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                            <div className="mb-6 leading-none">
                                <span className="block font-display italic text-ocean-deep/20 text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] mb-1 select-none">
                                    Your Host,
                                </span>
                                <span className="block font-display text-ocean-deep text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] font-bold">
                                    Dale Nacario.
                                </span>
                            </div>
                        </BlurFade>

                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 1.5} inView>
                            <div className="w-8 h-[2px] bg-coral mb-6" />
                        </BlurFade>

                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                            <p className="text-ocean/60 text-[15px] leading-relaxed max-w-md mb-10">
                                Property owner and web designer, based in Cebu. Every detail of your stay has been personally curated for your comfort and relaxation. For rental inquiries or business proposals, reach out directly.
                            </p>
                        </BlurFade>

                        {/* Contact info — editorial list */}
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 3} inView>
                            <div className="space-y-5 mb-10">
                                {contactInfo.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            target={item.label === 'Location' ? '_blank' : undefined}
                                            rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
                                            className="flex items-start gap-4 group focus:outline-none"
                                            aria-label={`Contact via ${item.label}`}
                                        >
                                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-ocean-light mt-0.5 transition-colors duration-200 group-hover:bg-ocean">
                                                <Icon
                                                    className="w-3.5 h-3.5 text-ocean transition-colors duration-200 group-hover:text-white"
                                                    strokeWidth={1.5}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-[0.3em] text-ocean/30 font-medium mb-0.5">
                                                    {item.label}
                                                </p>
                                                <p className="text-ocean-deep/65 text-sm leading-snug group-hover:text-coral transition-colors duration-200">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </BlurFade>

                        {/* CTAs */}
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 4} inView>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={AIRBNB_LISTING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Book your stay on Airbnb (opens in new tab)"
                                >
                                    <ShimmerButton
                                        className="h-14 px-8 text-base font-medium"
                                        shimmerColor="rgba(255, 255, 255, 0.2)"
                                        shimmerSize="0.1em"
                                        background="linear-gradient(135deg, #E07A5F 0%, #c96a52 100%)"
                                    >
                                        <span className="flex items-center gap-2 whitespace-pre-wrap text-center leading-none tracking-tight text-white">
                                            Book on Airbnb
                                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                        </span>
                                    </ShimmerButton>
                                </a>

                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-ocean-light text-ocean font-medium rounded-full transition-all duration-300 hover:bg-ocean hover:text-white focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-sand-light"
                                    aria-label="Send email to property owner"
                                >
                                    <Mail className="w-4 h-4" aria-hidden="true" />
                                    <span>Email Me</span>
                                </a>
                            </div>
                        </BlurFade>
                    </div>

                </div>

                </div>{/* end card */}
                </BlurFade>
            </div>

            {/* Footer */}
            <footer className="border-t border-sand-dark/20 py-6 px-4 md:px-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="font-display text-xl text-ocean-deep">
                        Adam&apos;s Staycation
                    </span>
                    <p className="text-ocean/50 text-sm">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </footer>
        </section>
    )
}
