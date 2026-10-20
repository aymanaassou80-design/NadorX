import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Compass,
  CalendarCheck,
  MapPin,
  Waves,
  Trees,
  Utensils,
  Coffee,
  Bed,
  Navigation,
  ShoppingBag,
  Train,
  Landmark,
  Briefcase,
  Info,
  Layers,
} from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

const desktopLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/places', label: 'استكشف الأماكن' },
  { to: '/category/tourism', label: 'المعالم' },
  { to: '/category/beaches', label: 'الشواطئ' },
  { to: '/category/nature', label: 'الطبيعة' },
  { to: '/category/restaurants', label: 'المطاعم' },
  { to: '/about', label: 'عن المنصة' },
]

const mobileDrawerCategories = [
  { to: '/places', label: 'جميع الأماكن', icon: MapPin },
  { to: '/category/tourism', label: 'المعالم السياحية', icon: Compass },
  { to: '/category/beaches', label: 'الشواطئ والساحل', icon: Waves },
  { to: '/category/nature', label: 'الطبيعة والجبال', icon: Trees },
  { to: '/category/restaurants', label: 'المطاعم والمأكولات', icon: Utensils },
  { to: '/category/cafes', label: 'المقاهي والاستراحة', icon: Coffee },
  { to: '/category/hotels', label: 'الفنادق والإقامة', icon: Bed },
  { to: '/category/activities', label: 'الأنشطة والترفيه', icon: Navigation },
  { to: '/category/shopping', label: 'التسوق والأسواق', icon: ShoppingBag },
  { to: '/category/transport', label: 'النقل والمواصلات', icon: Train },
  { to: '/category/culture', label: 'الثقافة والتراث', icon: Landmark },
  { to: '/category/services', label: 'الخدمات والمحلات', icon: Briefcase },
  { to: '/about', label: 'عن Nador X والتواصل', icon: Info },
]

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen || !isHomePage
          ? 'border-b border-border/70 bg-background/95 text-foreground shadow-xs backdrop-blur-md'
          : 'bg-gradient-to-b from-black/80 via-black/50 to-transparent text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        {/* Brand Logo with Nador X */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 shrink-0"
          aria-label={t('Nador X — الصفحة الرئيسية')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary via-[#028090] to-accent text-white shadow-md transition-transform group-hover:scale-105">
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
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-3.5 xl:gap-5 text-xs xl:text-sm font-bold lg:flex"
          aria-label={t('التنقل الرئيسي')}
        >
          {desktopLinks.map((link) => {
            const isActive =
              link.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-1 transition-colors hover:text-accent ${
                  isActive ? 'text-accent font-extrabold' : 'opacity-90'
                }`}
              >
                {t(link.label)}
              </Link>
            )
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          <LanguageToggle />

          <Link
            to="/places"
            className="hidden items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 hover:shadow-md sm:inline-flex"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>{t('استكشف الأماكن')}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors lg:hidden ${
              scrolled || mobileMenuOpen || !isHomePage
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

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="max-h-[85vh] overflow-y-auto border-b border-border bg-background/98 px-5 py-5 text-foreground backdrop-blur-xl shadow-xl lg:hidden"
          >
            {/* Quick links header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/70 text-xs text-muted-foreground font-bold">
              <span>{t('أقسام ودليل Nador X')}</span>
              <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {mobileDrawerCategories.length} {t('قسم')}
              </span>
            </div>

            <nav className="grid grid-cols-2 gap-2 pb-3">
              {mobileDrawerCategories.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition-all active:scale-95 ${
                      isActive
                        ? 'border-accent bg-accent/15 text-accent shadow-xs'
                        : 'border-border/60 bg-card/60 hover:border-accent/50 hover:bg-accent/10 hover:text-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-accent shrink-0" />
                    <span className="truncate">{t(item.label)}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link
                to="/places"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-primary-foreground shadow-sm transition-transform active:scale-98"
              >
                <Compass className="h-4 w-4" />
                <span>{t('تصفح الدليل الكامل للأماكن')}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
