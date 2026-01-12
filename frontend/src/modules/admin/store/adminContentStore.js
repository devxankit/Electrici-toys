import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultContent = {
    homePage: {
        hero: {
            image: '/hero.png',
            heading: 'UNLEASH THE POWER OF PLAY.',
            subheading: '',
            ctaText: 'SHOP COLLECTION',
            ctaLink: '/products'
        },
        trustMarkers: [
            {
                id: 1,
                icon: 'Shield',
                title: '1-YEAR WARRANTY',
                description: 'Full peace of mind'
            },
            {
                id: 2,
                icon: 'Truck',
                title: 'EXPRESS SHIPPING',
                description: 'Same day dispatch'
            },
            {
                id: 3,
                icon: 'CreditCard',
                title: 'GST INVOICE',
                description: 'Business ready'
            },
            {
                id: 4,
                icon: 'RotateCcw',
                title: 'EASY RETURNS',
                description: '7-day policy'
            }
        ],
        featuredSection: {
            title: 'THE HIT LIST',
            subtitle: 'Our most-wanted electric wonders.',
            ctaText: 'All Products',
            ctaLink: '/products'
        },
        categories: [
            {
                id: 1,
                name: 'Hoverboards',
                title: 'Hover\nBoards',
                description: 'Self-balancing tech with precision engineering.',
                image: '/assets/products/Ha1214f3bb2bb47c0b55e98d0143b90455.jpg_720x720q50.jpg',
                ctaText: 'DISCOVER NOW',
                ctaLink: '/products?category=hoverboards',
                bgColor: 'accent/20',
                borderColor: 'accent/30'
            },
            {
                id: 2,
                name: 'Drift Pro',
                title: 'Drift Pro',
                description: 'Maximum Slide. Zero Friction.',
                image: '/assets/products/WhatsApp Image 2026-01-10 at 16.10.54.jpeg',
                ctaText: 'EXPLORE',
                ctaLink: '/products?category=drift',
                bgColor: 'primary/10',
                borderColor: 'primary/30'
            },
            {
                id: 3,
                name: 'Robotics',
                title: 'Robotics',
                description: 'Smart toys, smarter interaction.',
                image: '/assets/products/WhatsApp Image 2026-01-10 at 16.11.05.jpeg',
                ctaText: 'EXPLORE',
                ctaLink: '/products?category=robotics',
                bgColor: 'indigo-500/10',
                borderColor: 'indigo-500/30'
            }
        ]
    },
    aboutPage: {
        hero: {
            heading: 'OUR MISSION',
            mission: 'We started ELECTRICI-TOYS with a simple goal: to make professional-grade electric mobility and robotics accessible through play. We believe that the toys of today are the tools of tomorrow.'
        },
        values: [
            {
                id: 1,
                icon: 'Zap',
                title: 'INNOVATION',
                description: 'We focus on the latest tech in toy engineering.'
            },
            {
                id: 2,
                icon: 'Target',
                title: 'PRECISION',
                description: 'Every component is tested for maximum performance.'
            },
            {
                id: 3,
                icon: 'Heart',
                title: 'SAFETY',
                description: 'Fun is only possible when it\'s safe for everyone.'
            },
            {
                id: 4,
                icon: 'Rocket',
                title: 'SPEED',
                description: 'We push the boundaries of what toys can do.'
            }
        ],
        content: {
            heading: 'ENGINEERED FOR THRILLS.',
            paragraphs: [
                'From the first hoverboard we tested in our garage to the advanced AI-powered tanks we sell today, quality has been our north star.',
                'Every Electrici-Toy is engineered to provide a seamless interaction between human and machine. We don\'t just sell gadgets; we sell the spark of curiosity.'
            ],
            emoji: '🛹'
        }
    },
    contactPage: {
        header: {
            title: 'GET IN TOUCH',
            subtitle: 'Have questions about our electric wonders? Our team is here to help you gear up.'
        },
        contactInfo: {
            email: 'support@electricitoys.com',
            phone: '+91 98765 43210',
            address: '123 Electric Avenue, Cyber City, Bangalore - 560001'
        },
        supportHours: {
            schedule: 'Monday — Friday: 9am — 6pm\nSaturday: 10am — 4pm',
            liveStatus: true,
            liveText: 'LIVE SUPPORT ACTIVE NOW'
        },
        formLabels: {
            nameLabel: 'Full Name',
            namePlaceholder: 'JOHNNY DRIFT',
            emailLabel: 'Email Address',
            emailPlaceholder: 'HELLO@SPEED.COM',
            messageLabel: 'Message',
            messagePlaceholder: 'TELL US ABOUT YOUR QUERY...',
            submitText: 'SEND TRANSMISSION'
        }
    },
    experiencePage: {
        // Mobile scroll overlays
        mobileScrolls: [
            {
                id: 1,
                start: 0,
                end: 0.15,
                align: 'center',
                heading: 'Electrici-Toys.',
                description: ''
            },
            {
                id: 2,
                start: 0.18,
                end: 0.32,
                align: 'center',
                heading: 'Precision Engineering.',
                description: 'Maximum performance and durability.'
            },
            {
                id: 3,
                start: 0.35,
                end: 0.5,
                align: 'center',
                heading: 'Ultra-High Quality.',
                description: 'Built to last a lifetime.'
            },
            {
                id: 4,
                start: 0.55,
                end: 0.65,
                align: 'center',
                heading: 'Exciting Toys.',
                description: '',
                ctaText: 'SHOP NOW',
                ctaLink: '/products'
            }
        ],
        // Desktop scroll overlays
        desktopScrolls: [
            {
                id: 1,
                start: 0,
                end: 0.2,
                align: 'center',
                heading: 'Electrici-Toys.',
                description: ''
            },
            {
                id: 2,
                start: 0.25,
                end: 0.5,
                align: 'start',
                heading: 'Precision Engineering.',
                description: 'Every component designed for maximum performance and durability.'
            },
            {
                id: 3,
                start: 0.55,
                end: 0.8,
                align: 'end',
                heading: 'Ultra-High Quality.',
                description: 'Materials sourced from the future. Built to last a lifetime.'
            },
            {
                id: 4,
                start: 0.85,
                end: 1.0,
                align: 'center',
                heading: 'Exciting Toys.',
                description: '',
                ctaText: 'SHOP COLLECTION',
                ctaLink: '/products'
            }
        ],
        // Mobile overlay branding
        mobileOverlay: {
            top: {
                line1: 'URBAN',
                line2: 'REVOLUTION',
                subtitle: 'Series One • 2026'
            },
            bottom: {
                stats: [
                    { value: '80', unit: 'KM/H', label: 'Speed' },
                    { value: '120', unit: 'KM', label: 'Range' },
                    { value: '3.2', unit: 'S', label: '0-60' }
                ],
                heading: 'ENGINEERED FOR THRILLS',
                description: 'Precision crafted for the ultimate urban commute.'
            }
        },
        footer: {
            tagline: 'The Future is Here',
            heading: 'READY TO\nPLAY?',
            buttons: [
                { text: 'ENTER STORE', link: '/products', variant: 'primary' },
                { text: 'Go To Dashboard', link: '/home', variant: 'outline' }
            ],
            copyright: 'Electrici-Toys © 2026. Engineered for Thrills.'
        }
    },
    globalSettings: {
        siteName: 'ELECTRICI-TOYS',
        brandColor: '#3b82f6', // primary blue
        logo: '/logo.png',
        socialLinks: {
            instagram: '',
            facebook: '',
            twitter: ''
        }
    }
};

export const useContentStore = create(
    persist(
        (set) => ({
            content: defaultContent,

            // Update entire page content
            updatePageContent: (page, data) => set((state) => ({
                content: {
                    ...state.content,
                    [page]: data
                }
            })),

            // Update specific section of a page
            updateSection: (page, section, data) => set((state) => ({
                content: {
                    ...state.content,
                    [page]: {
                        ...state.content[page],
                        [section]: data
                    }
                }
            })),

            // Reset to defaults
            resetToDefaults: () => set({ content: defaultContent }),

            // Get specific page content
            getPageContent: (page) => (state) => state.content[page]
        }),
        {
            name: 'electrici-content-storage',
            version: 1
        }
    )
);
