import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Compass,
  CalendarCheck,
  MapPin,
  Camera,
  Map,
  Waves,
  Utensils,
  BookOpen,
  Briefcase,
  Route,
} from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

const links = [
  { href: '#places', label: 'الأماكن', icon: MapPin },
  { href: '#gallery', label: 'المعرض', icon: Camera },
  { href: '#maps', label: 'الخريطة', icon: Map },
  { href: '#activities', label: 'الأنشطة', icon: Waves },
  { href: '#itineraries', label: 'المسارات', icon: Route },
  { href: '#dining', label: 'المطاعم', icon: Utensils },
  { href: '#culture', label: 'الثقافة', icon: BookOpen },
  { href: '#services', label: 'الخدمات', icon: Briefcase },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'border-b border-border/70 bg-background/95 text-foreground shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-black/75 via-black/45 to-transparent text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        {/* Brand Logo with Nador X */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 shrink-0"
          aria-label={t('Nador X — الصفحة الرئيسية')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-[#028090] to-accent text-white shadow-md transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display text-xl font-black tracking-tight text-current">
                Nador <span className="text-accent font-extrabold">X</span>
              </span>
              <span className="hidden sm:inline-block rounded px-1.5 py-0.5 text-[9px] font-bold bg-gold/15 text-gold border border-gold/30">
                الناظور
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-wide opacity-80 leading-tight">
              {t('دليل الناظور والريف')}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-4 text-sm font-bold xl:gap-6 lg:flex"
          aria-label={t('التنقل الرئيسي')}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-accent after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {t(link.label)}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          <LanguageToggle />

          <a
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:inline-flex"
            href="#plan"
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>{t('خطّط لزيارتك')}</span>
          </a>

          {/* Mobile Menu Button (Accessible 44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors lg:hidden ${
              scrolled || mobileMenuOpen
                ? 'border-border bg-muted/60 text-foreground hover:bg-muted'
                : 'border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'
            }`}
            aria-label={mobileMenuOpen ? t('إغلاق القائمة') : t('فتح القائمة')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with smooth animated collapse */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border bg-background/98 px-5 py-4 text-foreground backdrop-blur-xl shadow-xl lg:hidden"
          >
            <nav className="grid grid-cols-2 gap-2 pb-2">
              {links.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/60 p-2.5 text-xs font-bold transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent active:scale-95"
                  >
                    <Icon className="h-4 w-4 text-accent shrink-0" />
                    <span className="truncate">{t(link.label)}</span>
                  </a>
                )
              })}
            </nav>
            <div className="pt-3 border-t border-border">
              <a
                href="#plan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-primary-foreground shadow-sm transition-transform active:scale-98"
              >
                <CalendarCheck className="h-4 w-4" />
                <span>{t('خطّط لزيارتك')}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
