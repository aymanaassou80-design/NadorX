import { useState, useMemo } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  Compass,
  MapPin,
  ShieldCheck,
  Waves,
  Search,
  X,
  Sparkles,
  ExternalLink,
  Navigation,
  UtensilsCrossed,
  Trees,
} from 'lucide-react'
import SafeImage from '@/components/SafeImage'
import Navbar from '@/components/Navbar'
import MapExplorer from '@/components/MapExplorer'
import ImageGallery from '@/components/ImageGallery'
import { MotionItem, MotionReveal } from '@/components/MotionReveal'
import { activities, culture, dining, itineraries, places, services } from '@/data/nador'
import { useTranslation } from 'react-i18next'

const SectionTitle = ({ number, title, intro }: { number: string; title: string; intro: string }) => {
  const { t } = useTranslation()
  return (
    <div className="mb-9 grid gap-4 border-b border-border pb-5 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-8">
      <span className="font-display text-sm font-bold text-accent">
        {number} {t('/ دليل الناظور')}
      </span>
      <h2 className="text-3xl font-bold leading-tight md:text-4xl text-foreground">{title}</h2>
      <p className="max-w-sm text-sm leading-7 text-muted-foreground">{intro}</p>
    </div>
  )
}

interface PlaceItem {
  name: string
  area: string
  note: string
  image: string
}

export default function Index() {
  const { t, i18n } = useTranslation()
  const reducedMotion = useReducedMotion()

  // Search & Categories State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null)

  // Dining Filters State
  const [typeFilter, setTypeFilter] = useState('all')
  const [areaFilter, setAreaFilter] = useState('all')

  const areas = [
    { value: 'corniche', label: 'الكورنيش' },
    { value: 'center', label: 'وسط الناظور' },
    { value: 'marchica', label: 'مارشيكا' },
    { value: 'ras-el-ma', label: 'رأس الماء' },
  ]

  // Category definitions for instant hero pills with icons
  const categoryPills = [
    { id: 'all', label: t('الكل'), icon: Sparkles },
    { id: 'marchica', label: t('بحيرة مارشيكا'), icon: Waves },
    { id: 'gourougou', label: t('جبل كوروكو'), icon: Trees },
    { id: 'beaches', label: t('الشواطئ'), icon: Compass },
    { id: 'dining', label: t('المطاعم والمقاهي'), icon: UtensilsCrossed },
    { id: 'activities', label: t('الأنشطة والمسارات'), icon: Navigation },
  ]

  // Combined places filtering
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      // Category match
      let matchesCategory = true
      if (selectedCategory === 'marchica') {
        matchesCategory = place.name.includes('مارشيكا') || place.area.includes('الناظور')
      } else if (selectedCategory === 'gourougou') {
        matchesCategory = place.name.includes('كوروكو') || place.area.includes('كوروكو')
      } else if (selectedCategory === 'beaches') {
        matchesCategory =
          place.name.includes('شاطئ') ||
          place.name.includes('شعرانة') ||
          place.name.includes('بوكانة') ||
          place.name.includes('رأس الماء')
      }

      // Search match
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        t(place.name).toLowerCase().includes(q) ||
        t(place.area).toLowerCase().includes(q) ||
        t(place.note).toLowerCase().includes(q)

      return matchesCategory && matchesSearch
    })
  }, [places, selectedCategory, searchQuery, t])

  const visibleDining = dining.filter(
    (item) =>
      (typeFilter === 'all' || item.type === (typeFilter === 'restaurant' ? 'مطعم' : 'مقهى')) &&
      (areaFilter === 'all' || t(item.area) === t(areas.find((area) => area.value === areaFilter)?.label || ''))
  )

  const handleHeroCategoryClick = (catId: string) => {
    setSelectedCategory(catId)
    // Smoothly scroll down to places or relevant section
    if (catId === 'dining') {
      const el = document.getElementById('dining')
      el?.scrollIntoView({ behavior: 'smooth' })
    } else if (catId === 'activities') {
      const el = document.getElementById('activities')
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      const el = document.getElementById('places')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/20 selection:text-foreground">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden pt-20">
          <SafeImage
            src="/assets/nador-coast-hero.webp"
            alt={t('ساحل الناظور والبحر الأبيض المتوسط')}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Deep Navy/Black Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08182b]/80 via-[#08182b]/55 to-[#08182b]/85" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              {/* Left Column: Hero Text & Search */}
              <MotionReveal delay={0} className="max-w-2xl text-white">
                <MotionItem>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-accent backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{t('الدليل الرقمي الأول لإقليم الناظور')}</span>
                  </div>
                </MotionItem>

                <motion.h1
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.04 }}
                  className="font-display text-3xl font-black leading-[1.2] md:text-5xl lg:text-6xl tracking-tight text-white"
                >
                  Nador <span className="text-accent">X</span>
                  <span className="block mt-2 text-2xl md:text-4xl font-bold text-white/95">
                    {t('دليلك الذكي لاكتشاف الناظور والريف')}
                  </span>
                </motion.h1>

                <motion.p
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
                  className="mt-4 text-sm leading-7 text-white/85 md:text-base max-w-xl"
                >
                  {t(
                    'منصة محلية متكاملة تجمع شواطئ المتوسط العذراء، سحر بحيرة مارشيكا، قمم جبل كوروكو، وأفضل المطاعم والأنشطة في مكان واحد.'
                  )}
                </motion.p>

                {/* Live Instant Search Bar */}
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
                  className="mt-8 max-w-xl"
                >
                  <div className="relative flex items-center rounded-2xl border border-white/25 bg-black/40 p-1.5 shadow-2xl backdrop-blur-xl transition-all focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30">
                    <div className="ps-3.5 text-white/70">
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('ابحث عن شاطئ، بحيرة مارشيكا، جبل كوروكو، مطعم…')}
                      className="w-full bg-transparent px-3 py-2.5 text-sm md:text-base text-white placeholder-white/60 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="me-2 rounded-full p-1 text-white/70 hover:bg-white/20 hover:text-white"
                        aria-label={t('مسح البحث')}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <a
                      href="#places"
                      className="shrink-0 rounded-xl bg-accent px-4 py-2.5 text-xs md:text-sm font-bold text-accent-foreground shadow-md transition-all hover:bg-accent/90"
                    >
                      {t('بحث')}
                    </a>
                  </div>

                  {/* Category Pills with Icons */}
                  <div className="mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
                    {categoryPills.map((pill) => {
                      const Icon = pill.icon
                      const isSelected = selectedCategory === pill.id
                      return (
                        <button
                          key={pill.id}
                          onClick={() => handleHeroCategoryClick(pill.id)}
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-accent text-accent-foreground shadow-sm scale-105'
                              : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/15 backdrop-blur-sm'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{pill.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Call to action buttons */}
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.22 }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  <a
                    href="#places"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
                  >
                    <span>{t('اكتشف الناظور')}</span>
                    <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
                  </a>
                  <a
                    href="#places"
                    onClick={() => {
                      const el = document.getElementById('places')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
                  >
                    <Compass className="h-4 w-4 text-accent" />
                    <span>{t('استكشف الأماكن')}</span>
                  </a>
                </motion.div>

                {/* Mobile/Tablet Highlights Bar */}
                <div className="mt-7 flex md:hidden items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md text-white text-xs">
                  <div className="text-center flex-1 border-e border-white/15">
                    <span className="block font-black text-accent text-sm">115+ {t('كم')}</span>
                    <span className="text-[10px] text-white/80">{t('ساحل متوسطي')}</span>
                  </div>
                  <div className="text-center flex-1 border-e border-white/15">
                    <span className="block font-black text-accent text-sm">1155م</span>
                    <span className="text-[10px] text-white/80">{t('قمة كوروكو')}</span>
                  </div>
                  <div className="text-center flex-1">
                    <span className="block font-black text-gold text-sm">مارشيكا</span>
                    <span className="text-[10px] text-white/80">{t('بحيرة ساحرة')}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Right Column: 3 Horizons Quick Highlights */}
              <div className="hidden md:flex flex-col gap-4 text-white">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-display text-4xl font-black text-accent">٣</span>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                      {t('التنوع الطبيعي')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {t('آفاق تلتقي هنا: البحر والبحيرة والريف')}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-white/80">
                    {t(
                      'الموقع الجغرافي الفريد للناظور يجمع بين شواطئ البحر الأبيض المتوسط المفتوحة، وبحيرة مارشيكا الهادئة، ومرتفعات جبل كوروكو الخضراء.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <span className="block text-2xl font-black text-accent">115+</span>
                    <span className="text-xs text-white/80 font-medium">{t('كم ساحل متوسطي')}</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <span className="block text-2xl font-black text-accent">1155م</span>
                    <span className="text-xs text-white/80 font-medium">{t('قمة جبل كوروكو')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="#places"
            className="absolute bottom-4 start-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            <span>{t('تابع الدليل')}</span>
          </a>
        </section>

        {/* Places & Key Locations Section */}
        <section id="places" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal>
              <MotionItem>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9 border-b border-border pb-5">
                  <div>
                    <span className="font-display text-sm font-bold text-accent">
                      01 / {t('دليل الأماكن')}
                    </span>
                    <h2 className="text-3xl font-bold leading-tight md:text-4xl text-foreground mt-1">
                      {t('أبرز المعالم والوجهات الرئيسية')}
                    </h2>
                    <p className="max-w-xl text-sm leading-7 text-muted-foreground mt-2">
                      {t(
                        'استكشف أهم معالم الناظور مثل بحيرة مارشيكا وجبل كوروكو والشواطئ الساحرة. لكلّ وجهة إيقاعها وجمالها الطبيعي.'
                      )}
                    </p>
                  </div>

                  {/* Search query tag indicator if active */}
                  {searchQuery && (
                    <div className="flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/30 px-3.5 py-1.5 text-xs font-bold text-accent">
                      <span>
                        {t('نتائج البحث عن:')} &ldquo;{searchQuery}&rdquo; ({filteredPlaces.length})
                      </span>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ms-1 hover:text-foreground"
                        aria-label={t('إلغاء التصفية')}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </MotionItem>

              <MotionItem>
                {filteredPlaces.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                    <p className="text-base font-bold text-foreground">
                      {t('لم نتمكن من العثور على نتائج تطابق بحثك.')}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t('جرّب البحث باسم آخر مثل: مارشيكا، كوروكو، شعرانة، أو اختر تصنيفاً آخر.')}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory('all')
                      }}
                      className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                    >
                      {t('إعادة تعيين البحث')}
                    </button>
                  </div>
                ) : (
                  <div
                    className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    data-testid="key-locations-grid"
                  >
                    {filteredPlaces.map((place, i) => {
                      const isMainLandmark = place.name.includes('مارشيكا') || place.name.includes('كوروكو')
                      return (
                        <article
                          key={place.name}
                          onClick={() => setSelectedPlace(place)}
                          className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-xl"
                        >
                          <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                            <SafeImage
                              src={place.image}
                              alt={t(place.name)}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <span className="absolute start-3.5 top-3.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-bold text-foreground backdrop-blur-md shadow-sm">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {isMainLandmark ? (
                              <span className="absolute end-3.5 top-3.5 rounded-full bg-gold/90 text-white px-3 py-1 text-xs font-bold shadow-md backdrop-blur-sm">
                                {t('معلم رئيسي')}
                              </span>
                            ) : null}
                          </div>
                          <div className="p-5">
                            {place.area && (
                              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-accent">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{t(place.area)}</span>
                              </div>
                            )}
                            <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                              {t(place.name)}
                            </h3>
                            <p className="text-xs leading-6 text-muted-foreground line-clamp-3">
                              {t(place.note)}
                            </p>
                            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedPlace(place)
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent/80 transition-colors"
                              >
                                <span>{t('تفاصيل المعلم')}</span>
                                <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-0 ltr:rotate-180" />
                              </button>
                              <a
                                href="#maps"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Navigation className="h-3.5 w-3.5 text-primary" />
                                <span>{t('الخريطة')}</span>
                              </a>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )}
              </MotionItem>
            </MotionReveal>
          </div>
        </section>

        {/* Interactive Image Gallery Section */}
        <ImageGallery />

        {/* Interactive Map Explorer Section */}
        <div id="maps" className="scroll-mt-20">
          <MapExplorer />
        </div>

        {/* Activities Section */}
        <section id="activities" className="scroll-mt-20 bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal>
              <MotionItem>
                <SectionTitle
                  number="02"
                  title={t('اختر إيقاع يومك')}
                  intro={t(
                    'تجارب على الماء وبين المسارات؛ المواعيد والأسعار تُحدّد بعد التحقق من المزوّدين المحليين.'
                  )}
                />
              </MotionItem>
              <MotionItem>
                <div className="grid gap-6 md:grid-cols-3">
                  {activities.map((item) => (
                    <article
                      key={item.name}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
                    >
                      <div className="aspect-[16/11] overflow-hidden bg-muted">
                        <SafeImage
                          src={item.image}
                          alt={t(item.name)}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <span className="inline-block rounded-md bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">
                          {t(item.suitable)}
                        </span>
                        <h3 className="my-2 text-xl font-bold text-foreground">{t(item.name)}</h3>
                        <p className="text-xs leading-6 text-muted-foreground">{t(item.note)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </MotionItem>
              <MotionItem>
                <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-accent/30 bg-accent/10 p-3.5 text-xs leading-6 text-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {t('تحقّق من الطقس وحالة البحر وتعليمات السلامة مباشرةً قبل بدء أي نشاط.')}
                  </span>
                </p>
              </MotionItem>
            </MotionReveal>
          </div>
        </section>

        {/* Day Itineraries Section */}
        <section id="itineraries" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal>
              <MotionItem>
                <SectionTitle
                  number="03"
                  title={t('يومان، بطريقتين مختلفتين')}
                  intro={t(
                    'مسارات مرنة تجمع بين التوقفات القريبة. عدّل الترتيب بحسب الطقس ووسائل النقل.'
                  )}
                />
              </MotionItem>
              <MotionItem>
                <div className="grid gap-6 lg:grid-cols-2">
                  {itineraries.map((trip, i) => (
                    <article
                      key={trip.name}
                      className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-[0.9fr_1.1fr]"
                    >
                      <div className="min-h-64 bg-muted overflow-hidden">
                        <SafeImage
                          src={trip.image}
                          alt={t(trip.name)}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <span className="rounded-md bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">
                            {t(trip.audience)}
                          </span>
                          <h3 className="mt-2.5 text-2xl font-bold text-foreground">
                            {t(trip.name)}
                          </h3>
                          <ol className="mt-5 space-y-3.5">
                            {trip.steps.map((step, j) => (
                              <li
                                key={step}
                                className="flex gap-3 border-t border-border pt-3 text-xs leading-6 text-muted-foreground"
                              >
                                <span className="font-display font-bold text-accent">
                                  0{i + 1}.{j + 1}
                                </span>
                                <span className="font-medium text-foreground">{t(step)}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </MotionItem>
            </MotionReveal>
          </div>
        </section>

        {/* Dining & Cafés Section */}
        <section id="dining" className="scroll-mt-20 bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal>
              <MotionItem>
                <SectionTitle
                  number="04"
                  title={t('دليل الطعام والاستراحة')}
                  intro={t(
                    'اقتراحات تصف أنواع الأماكن والمناطق؛ الأسماء التجارية والعناوين وساعات العمل تحتاج إلى تأكيد.'
                  )}
                />
              </MotionItem>
              <MotionItem>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <div className="flex gap-2" aria-label={t('التصفية حسب النوع')}>
                    {[
                      { value: 'all', label: t('الكل') },
                      { value: 'restaurant', label: t('مطعم') },
                      { value: 'cafe', label: t('مقهى') },
                    ].map((kind) => (
                      <button
                        key={kind.value}
                        onClick={() => setTypeFilter(kind.value)}
                        className={`rounded-lg border px-4 py-2 text-xs font-bold transition-all ${
                          typeFilter === kind.value
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground'
                        }`}
                      >
                        {kind.label}
                      </button>
                    ))}
                  </div>

                  <select
                    aria-label={t('التصفية حسب المنطقة')}
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    className="min-h-10 rounded-lg border border-border bg-card px-3 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="all">{t('كل المناطق')}</option>
                    {areas.map((area) => (
                      <option key={area.value} value={area.value}>
                        {t(area.label)}
                      </option>
                    ))}
                  </select>

                  <span className="text-[11px] text-muted-foreground bg-background/80 px-2.5 py-1 rounded-md border border-border">
                    {t('إدراجات توضيحية غير مؤكّدة')}
                  </span>
                </div>
              </MotionItem>

              <MotionItem>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleDining.map((item) => (
                    <article
                      key={item.name}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                        <SafeImage
                          src={item.image}
                          alt={t(item.name)}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute start-3.5 top-3.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">
                          {t(item.type)}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-accent">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{t(item.area)}</span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-foreground">{t(item.name)}</h3>
                        <p className="text-xs leading-6 text-muted-foreground">{t(item.note)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </MotionItem>
            </MotionReveal>
          </div>
        </section>

        {/* Culture Section */}
        <section id="culture" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal>
              <MotionItem>
                <SectionTitle
                  number="05"
                  title={t('محطات من ذاكرة الريف')}
                  intro={t('اكتشاف المكان يبدأ بالفضول والاحترام، لا بالافتراضات.')}
                />
              </MotionItem>
              <MotionItem>
                <div className="grid gap-6 md:grid-cols-2">
                  {culture.map((item) => (
                    <article
                      key={item.name}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <SafeImage
                          src={item.image}
                          alt={t(item.name)}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2.5 text-2xl font-bold text-foreground">{t(item.name)}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">{t(item.note)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </MotionItem>
            </MotionReveal>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="scroll-mt-20 bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal>
              <MotionItem>
                <SectionTitle
                  number="06"
                  title={t('خدمات تساعدك على الانطلاق')}
                  intro={t(
                    'فئات للبحث فقط، وليست توصيات لمزوّدين محدّدين أو تأكيداً لتوفّر الخدمة.'
                  )}
                />
              </MotionItem>
              <MotionItem>
                <div className="grid gap-6 md:grid-cols-2">
                  {services.map((item) => (
                    <article
                      key={item.name}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <SafeImage
                          src={item.image}
                          alt={t(item.name)}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2.5 text-2xl font-bold text-foreground">{t(item.name)}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">{t(item.note)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </MotionItem>
            </MotionReveal>
          </div>
        </section>

        {/* Spirit of the Place Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1fr_1fr] md:items-center md:px-8">
            <MotionReveal>
              <MotionItem>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-accent">
                  <Compass className="h-4 w-4" /> <span>{t('روح المكان')}</span>
                </p>
                <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl text-foreground">
                  {t('بين الساحل ومرتفعات الريف، تتعدّد الطرق لاكتشاف المكان على مهل.')}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-8 text-muted-foreground">
                  {t(
                    'في الناظور، يمكن أن يبدأ اليوم بهدوء البحيرة وينتهي بإطلالة على المتوسط. مساحة للقاء العائلة، أو للمشي واكتشاف مشهد جديد.'
                  )}
                </p>
              </MotionItem>
            </MotionReveal>
            <MotionReveal>
              <MotionItem>
                <div className="relative overflow-hidden rounded-2xl border border-border p-2 bg-card shadow-md">
                  <SafeImage
                    src="/assets/nador-landscape-story.webp"
                    alt={t('مشهد يجمع بحيرة مارشيكا وساحل الناظور ومرتفعات الريف')}
                    loading="lazy"
                    className="aspect-[5/4] w-full rounded-xl object-cover"
                  />
                  <span className="absolute bottom-5 start-5 rounded-lg bg-background/90 px-3.5 py-2 text-xs font-bold text-foreground backdrop-blur-md shadow-sm">
                    {t('بحر، بحيرة، وأفق ريفي')}
                  </span>
                </div>
              </MotionItem>
            </MotionReveal>
          </div>
        </section>

        {/* Plan Section */}
        <section id="plan" className="scroll-mt-20 border-t border-border bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal>
              <MotionItem>
                <SectionTitle
                  number="07"
                  title={t('قبل أن تبدأ رحلتك')}
                  intro={t('خطوات بسيطة تساعد على زيارة أكثر راحة واستعداداً.')}
                />
              </MotionItem>
              <MotionItem>
                <div className="grid gap-6 md:grid-cols-[1fr_0.85fr]">
                  <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-foreground">{t('قائمة سريعة قبل الانطلاق')}</h3>
                    <ul className="mt-5 space-y-4 text-xs leading-7">
                      {[
                        'راجع الطقس وحالة البحر قبل الانطلاق.',
                        'تحقّق مباشرةً من مواعيد الأماكن ووسائل النقل.',
                        'للعائلات: ماء ووسائل حماية من الشمس.',
                        'لمحبي المشي: حذاء مناسب وخطة عودة.',
                      ].map((tip) => (
                        <li key={tip} className="flex gap-3 border-t border-border pt-3 text-muted-foreground">
                          <Waves className="mt-1 h-4 w-4 shrink-0 text-accent" />
                          <span className="text-foreground font-medium">{t(tip)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{t('ابدأ بالاستكشاف')}</h3>
                      <p className="mt-3 text-xs leading-7 text-muted-foreground">
                        {t('اختر وجهتك، ثم راجع المعلومات العملية مباشرةً قبل الزيارة.')}
                      </p>
                    </div>
                    <a
                      href="#places"
                      className="mt-8 inline-flex items-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
                    >
                      <span>{t('تصفّح الأماكن')}</span>
                      <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
                    </a>
                  </div>
                </div>
              </MotionItem>

              <MotionItem>
                <p className="mt-7 flex items-start gap-2.5 rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs leading-7 text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {t('للتواصل أو تصحيح بيانات الدليل:')}{' '}
                    <a
                      href="mailto:contact@nadorx.ma"
                      className="font-bold text-foreground underline underline-offset-4"
                    >
                      contact@nadorx.ma
                    </a>
                    {t('. أرقام الجهات المدرجة تُنشر بعد التحقّق. الصور والتصنيفات لا تعني اعتماد أي نشاط تجاري.')}
                  </span>
                </p>
              </MotionItem>
            </MotionReveal>
          </div>
        </section>
      </main>

      {/* Place Detail Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-0 shadow-2xl text-foreground"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 end-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                aria-label={t('إغلاق')}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <SafeImage
                  src={selectedPlace.image}
                  alt={t(selectedPlace.name)}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 start-5 end-5 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-sm">
                      <MapPin className="h-3 w-3" />
                      {t(selectedPlace.area)}
                    </span>
                    {(selectedPlace.name.includes('مارشيكا') || selectedPlace.name.includes('كوروكو')) && (
                      <span className="rounded-full bg-gold/90 text-white px-2.5 py-0.5 text-xs font-bold shadow-sm">
                        {t('معلم رئيسي')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-white">{t(selectedPlace.name)}</h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6">
                <div className="rounded-xl bg-muted/60 p-4 border border-border/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-1.5">
                    {t('وصف وتوجيهات الزيارة')}
                  </h4>
                  <p className="text-sm leading-7 text-foreground/90">
                    {t(selectedPlace.note)}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-lg bg-card border border-border px-3 py-1.5">
                    📍 {t('المنطقة:')} {t(selectedPlace.area)}
                  </span>
                  <span className="rounded-lg bg-card border border-border px-3 py-1.5">
                    🌊 {t('ساحل إقليم الناظور')}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name + ' الناظور')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{t('الاتجاهات على خرائط Google')}</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <a
                      href="#maps"
                      onClick={() => setSelectedPlace(null)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-all"
                    >
                      <Navigation className="h-3.5 w-3.5 text-accent" />
                      <span>{t('عرض على الخريطة')}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedPlace(null)}
                      className="rounded-xl border border-border px-3.5 py-2.5 text-xs font-bold text-muted-foreground hover:bg-muted transition-all"
                    >
                      {t('إغلاق')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upgraded Footer */}
      <footer className="border-t border-border bg-card py-12 text-foreground">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
            <div>
              <a href="#home" className="inline-flex items-center gap-2 text-2xl font-black">
                <Compass className="h-6 w-6 text-accent" />
                <span>Nador <span className="text-accent">X</span></span>
              </a>
              <p className="mt-3 max-w-sm text-xs leading-6 text-muted-foreground">
                {t('دليل رقمي محلي مستقل لاكتشاف المعالم الطبيعية، الشواطئ، بحيرة مارشيكا، والأنشطة في الناظور والريف.')}
              </p>
            </div>

            <div>
              <span className="block text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                {t('روابط سريعة')}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2.5 gap-x-4 text-xs">
                {[
                  { href: '#places', label: t('الأماكن') },
                  { href: '#gallery', label: t('المعرض') },
                  { href: '#maps', label: t('الخريطة') },
                  { href: '#activities', label: t('الأنشطة') },
                  { href: '#itineraries', label: t('المسارات') },
                  { href: '#dining', label: t('المطاعم') },
                  { href: '#culture', label: t('الثقافة') },
                  { href: '#services', label: t('الخدمات') },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-accent font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Nador X — {t('دليل سياحي محلي مستقل.')}
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:contact@nadorx.ma" className="underline underline-offset-4 hover:text-foreground">
                contact@nadorx.ma
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
