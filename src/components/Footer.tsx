import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'Watch Kits',         href: '/shop?category=kit'      },
    { label: 'Assembled Watches',  href: '/shop?category=assembled'},
    { label: 'Gift Cards',         href: '/shop?tag=gift'          },
  ],
  Company: [
    { label: 'About Us',           href: '/about'          },
    { label: 'Our Process',        href: '/about#process'  },
    { label: 'Press',              href: '/press'          },
    { label: 'Careers',            href: '/careers'        },
  ],
  Support: [
    { label: 'Assembly Guide',     href: '/support/assembly' },
    { label: 'Warranty',           href: '/support/warranty' },
    { label: 'Returns',            href: '/support/returns'  },
    { label: 'Contact',            href: '/support/contact'  },
  ],
}

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter,   href: '#', label: 'Twitter'   },
  { icon: Youtube,   href: '#', label: 'YouTube'   },
  { icon: Mail,      href: '#', label: 'Newsletter' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Top */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-2 space-y-5">
            <Image
              src="/images/Picture1-removebg-preview.png"
              alt="Foundry"
              width={130}
              height={52}
              className="object-contain"
            />
            <p className="text-sm font-sans text-brand-muted leading-relaxed max-w-xs">
              Precision components, curated kits, and fully assembled timepieces for the modern horologist. Crafted with intent. Built by you.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-gold hover:border-brand-gold transition-all duration-300"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="space-y-4">
              <h4 className="font-sans text-xs tracking-widest uppercase text-brand-ivory font-medium">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-sans text-brand-muted hover:text-brand-ivory transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="gold-divider" />

        {/* Bottom */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans text-brand-muted">
            © {new Date().getFullYear()} Foundry. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <Link
                key={item}
                href="#"
                className="text-xs font-sans text-brand-muted hover:text-brand-ivory transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
