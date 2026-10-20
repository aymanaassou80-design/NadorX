import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Search,
  X,
  MapPin,
  Compass,
  ArrowLeft,
  Navigation,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Heart,
  LocateFixed,
} from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SafeImage from '@/components/SafeImage'
import { allPlaces, categories, PlaceItem } from '@/data/nador'
import { useFavorites } from '@/utils/favorites'

// Haversine formula to compute distance in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function PlacesPage() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const { isFav, toggle } = useFavorites()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArea, setSelectedArea] = useState('all')

  // Geolocation state
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [sortByDistance, setSortByDistance] = useState(false)

  const areas = [
    { id: 'all', label: t('كل المناطق') },
    { id: 'الناظور', label: t('الناظور ومارشيكا') },
    { id: 'وسط الناظور', label: t('وسط الناظور') },
    { id: 'كوروكو', label: t('جبل كوروكو') },
    { id: 'شعرانة', label: t('شعرانة وبني شيكر') },
    { id: 'بوكانة', label: t('بوكانة') },
    { id: 'رأس الماء', label: t('رأس الماء') },
    { id: 'بني أنصار', label: t('بني أنصار') },
    { id: 'سلوان', label: t('سلوان') },
    { id: 'أركمان', label: t('قرية أركمان') },
    { id: 'العروي', label: t('العروي والمطار') },
  ]

  const handleToggleGeolocation = () => {
    if (sortByDistance) {
      setSortByDistance(false)
      toast.info(t('تم إلغاء الترتيب حسب المسافة'))
      return
    }

    if (!navigator.geolocation) {
      toast.error(t('تحديد الموقع الجغرافي غير مدعوم في متصفحك'))
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false)
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setSortByDistance(true)
        toast.success(t('تم تحديد موقعك وترتيب الأماكن من الأقرب إليك!'))
      },
      (error) => {
        setIsLocating(false)
        console.warn('Geolocation error:', error)
        // If denied or failed, we can use default downtown Nador coordinates for demonstration
        setUserCoords({ lat: 35.174, lng: -2.928 })
        setSortByDistance(true)
        toast.info(t('تم استخدام موقع وسط مدينة الناظور كمرجع لحساب المسافات'))
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  const filteredPlaces = useMemo(() => {
    const list = allPlaces.filter((place) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || place.categoryId === selectedCategory

      // Area filter
      const matchesArea =
        selectedArea === 'all' || place.area.includes(selectedArea)

      // Search query filter (matches ar, en, fr)
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        place.name.toLowerCase().includes(q) ||
        place.nameEn.toLowerCase().includes(q) ||
        place.nameFr.toLowerCase().includes(q) ||
        place.area.toLowerCase().includes(q) ||
        place.description.toLowerCase().includes(q) ||
        place.descriptionEn.toLowerCase().includes(q) ||
        place.descriptionFr.toLowerCase().includes(q) ||
        place.features.some((f) => f.toLowerCase().includes(q))

      return matchesCategory && matchesArea && matchesSearch
    })

    if (sortByDistance && userCoords) {
      return [...list].sort((a, b) => {
        const distA = calculateDistanceKm(
          userCoords.lat,
          userCoords.lng,
          a.coordinates[0],
          a.coordinates[1]
        )
        const distB = calculateDistanceKm(
          userCoords.lat,
          userCoords.lng,
          b.coordinates[0],
          b.coordinates[1]
        )
        return distA - distB
      })
    }

    return list
  }, [searchQuery, selectedCategory, selectedArea, sortByDistance, userCoords])

  const getLocalizedName = (place: PlaceItem) => {
    if (i18n.language === 'fr') return place.nameFr || place.name
    if (i18n.language === 'en') return place.nameEn || place.name
    return place.name
  }

  const getLocalizedArea = (place: PlaceItem) => {
    if (i18n.language === 'fr') return place.areaFr || place.area
    if (i18n.language === 'en') return place.areaEn || place.area
    return place.area
  }

  const getLocalizedDesc = (place: PlaceItem) => {
    if (i18n.language === 'fr') return place.note || place.descriptionFr
    if (i18n.language === 'en') return place.note || place.descriptionEn
    return place.note || place.description
  }

  return (
    <div className={`min-h-screen bg-background text-foreground font-sans ${isRtl ? 'rtl' : 'ltr'}`}>
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Header Hero */}
        <div className="border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-3">
                  <Compass className="h-3.5 w-3.5" />
                  <span>{t('دليل الأماكن والمعالم')}</span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-black text-foreground tracking-tight">
                  {t('استكشف جميع أماكن الناظور')}
                </h1>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t(
                    'تصفح الدليل الشامل لمعالم الناظور، بحيرة مارشيكا، شواطئ البحر الأبيض المتوسط، قمم كوروكو، والمطاعم والخدمات المحلية.'
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
                {/* Geolocation Near Me button */}
                <button
                  onClick={handleToggleGeolocation}
                  disabled={isLocating}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-sm ${
                    sortByDistance
                      ? 'bg-emerald-600 text-white'
                      : 'border border-border bg-card text-foreground hover:bg-muted'
                  }`}
                  title={t('ترتيب الأماكن حسب الأقرب إليك')}
                >
                  <LocateFixed className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>
                    {isLocating
                      ? t('جارٍ تحديد موقعك...')
                      : sortByDistance
                      ? t('مرتب حسب الأقرب إليك')
                      : t('الأقرب إليك (GPS)')}
                  </span>
                </button>

                <div className="text-xs text-muted-foreground bg-card border border-border/80 rounded-xl px-4 py-2.5 shadow-sm">
                  <span className="font-bold text-primary">{filteredPlaces.length}</span>{' '}
                  {t('مكان متوفر')}
                </div>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="mt-8 max-w-3xl">
              <div className="relative flex items-center rounded-2xl border border-border bg-card/90 shadow-sm backdrop-blur-md focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search className="h-5 w-5 text-muted-foreground mx-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('ابحث عن معالم، شواطئ، مطاعم، أو مناطق في الناظور...')}
                  className="w-full bg-transparent py-3.5 pr-2 pl-4 text-sm md:text-base outline-none text-foreground placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 text-muted-foreground hover:text-foreground mr-2"
                    aria-label={t('مسح البحث')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="sticky top-[69px] z-30 border-b border-border/80 bg-background/95 backdrop-blur-md py-3 shadow-xs">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none [scrollbar-width:none]">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'border border-border/80 bg-card text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {t('كل الفئات')} ({allPlaces.length})
                </button>
                {categories.map((cat) => {
                  const count = allPlaces.filter((p) => p.categoryId === cat.id).length
                  const isSelected = selectedCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'border border-border/80 bg-card text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {i18n.language === 'ar' ? cat.name : i18n.language === 'fr' ? cat.nameFr : cat.nameEn}
                      {count > 0 && <span className="opacity-75 text-[11px] ms-1">({count})</span>}
                    </button>
                  )
                })}
              </div>

              {/* Area Filter Tags */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 scrollbar-none [scrollbar-width:none]">
                <span className="text-muted-foreground flex items-center gap-1 shrink-0 font-medium">
                  <MapPin className="h-3.5 w-3.5" />
                  {t('المنطقة')}:
                </span>
                {areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`rounded-md px-2.5 py-1 transition-colors shrink-0 ${
                      selectedArea === area.id
                        ? 'bg-accent/15 text-accent font-bold border border-accent/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Places Grid */}
        <div className="mx-auto max-w-7xl px-5 md:px-8 mt-10">
          {filteredPlaces.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border/80 p-12 text-center my-12 bg-card/50">
              <Compass className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground">
                {t('لا توجد نتائج مطابقة لبحثك')}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                {t('جرّب تغيير كلمات البحث أو إعادة ضبط فلاتر الفئات والمناطق للاطلاع على الأماكن المتوفرة.')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedArea('all')
                  setSortByDistance(false)
                }}
                className="mt-5 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
              >
                {t('إعادة ضبط جميع الفلاتر')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {filteredPlaces.map((place) => {
                const categoryObj = categories.find((c) => c.id === place.categoryId)
                const isFavorite = isFav(place.id)

                // Calculate distance if user coords available
                let distanceText: string | null = null
                if (userCoords) {
                  const dist = calculateDistanceKm(
                    userCoords.lat,
                    userCoords.lng,
                    place.coordinates[0],
                    place.coordinates[1]
                  )
                  distanceText = dist < 1 ? `${Math.round(dist * 1000)} م` : `${dist.toFixed(1)} كم`
                }

                return (
                  <article
                    key={place.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Header */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                      <SafeImage
                        src={place.image}
                        alt={getLocalizedName(place)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          const nowFav = toggle(place.id)
                          if (nowFav) {
                            toast.success(t('تمت إضافة المكان إلى المفضلة ❤️'))
                          } else {
                            toast.info(t('تمت إزالة المكان من المفضلة'))
                          }
                        }}
                        aria-label={isFavorite ? t('إزالة من المفضلة') : t('إضافة إلى المفضلة')}
                        className="absolute top-3 end-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            isFavorite
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-white hover:text-rose-400'
                          }`}
                        />
                      </button>

                      {/* Area & Distance Badges */}
                      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white">
                        <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                          {getLocalizedArea(place)}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {distanceText && (
                            <span className="rounded-full bg-emerald-600/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                              {distanceText}
                            </span>
                          )}

                          {categoryObj && (
                            <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-white border border-white/20">
                              {i18n.language === 'ar' ? categoryObj.name : i18n.language === 'fr' ? categoryObj.nameFr : categoryObj.nameEn}
                            </span>
                          )}
                        </div>
                      </div>

                      {place.isFeatured && (
                        <div className="absolute top-3 start-3">
                          <span className="flex items-center gap-1 rounded-full bg-gold/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-black text-black shadow-sm">
                            <Sparkles className="h-3 w-3" />
                            {t('معلم رئيسي')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        <Link to={`/place/${place.id}`}>
                          {getLocalizedName(place)}
                        </Link>
                      </h2>

                      <p className="mt-2 text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {getLocalizedDesc(place)}
                      </p>

                      {/* Features tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {place.features.slice(0, 2).map((feat, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/60">
                        <Link
                          to={`/place/${place.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors"
                        >
                          <span>{t('عرض التفاصيل الكاملة')}</span>
                          <ArrowLeft className={`h-3.5 w-3.5 ${isRtl ? '' : 'rotate-180'}`} />
                        </Link>

                        <a
                          href={place.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          title={t('عرض الموقع في Google Maps')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
