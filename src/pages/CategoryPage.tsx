import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Compass,
  MapPin,
  ArrowLeft,
  Navigation,
  CheckCircle2,
  ChevronRight,
  Waves,
  Trees,
  Utensils,
  Coffee,
  Bed,
  ShoppingBag,
  Train,
  Landmark,
  Briefcase,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SafeImage from '@/components/SafeImage'
import { allPlaces, categories, PlaceItem, CategoryItem } from '@/data/nador'

const iconMap: Record<string, React.ElementType> = {
  Compass,
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
}

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { t, i18n } = useTranslation()
  const [selectedArea, setSelectedArea] = useState('all')

  // Find active category or mapped alias
  const activeCategory = useMemo(() => {
    let targetId = categoryId || 'tourism'
    if (targetId === 'dining') targetId = 'restaurants'
    return (
      categories.find((c) => c.id === targetId) ||
      categories.find((c) => c.id === 'tourism') ||
      categories[0]
    )
  }, [categoryId])

  const categoryPlaces = useMemo(() => {
    return allPlaces.filter((p) => {
      let matchesCat = p.categoryId === activeCategory.id
      if (activeCategory.id === 'restaurants' && (p.categoryId === 'cafes' || p.categoryId === 'restaurants')) {
        matchesCat = true
      }
      const matchesArea = selectedArea === 'all' || p.area.includes(selectedArea)
      return matchesCat && matchesArea
    })
  }, [activeCategory, selectedArea])

  const availableAreas = useMemo(() => {
    const set = new Set<string>()
    allPlaces
      .filter((p) => p.categoryId === activeCategory.id || (activeCategory.id === 'restaurants' && p.categoryId === 'cafes'))
      .forEach((p) => set.add(p.area))
    return Array.from(set)
  }, [activeCategory])

  const IconComponent = iconMap[activeCategory.icon] || Compass

  const getCategoryName = () => {
    if (i18n.language === 'fr') return activeCategory.nameFr
    if (i18n.language === 'en') return activeCategory.nameEn
    return activeCategory.name
  }

  const getCategoryDesc = () => {
    if (i18n.language === 'fr') return activeCategory.descriptionFr
    if (i18n.language === 'en') return activeCategory.descriptionEn
    return activeCategory.description
  }

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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/20">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Category Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-b from-primary/15 via-background to-background border-b border-border/60 py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-foreground transition-colors">{t('الرئيسية')}</Link>
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              <Link to="/places" className="hover:text-foreground transition-colors">{t('الأماكن')}</Link>
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              <span className="text-foreground font-bold">{getCategoryName()}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-card border border-border/80 px-3.5 py-1.5 text-xs font-bold text-primary shadow-xs mb-3">
                  <IconComponent className="h-4 w-4 text-accent" />
                  <span>{t('فئة موثقة في دليل Nador X')}</span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-black text-foreground tracking-tight">
                  {getCategoryName()}
                </h1>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {getCategoryDesc()}
                </p>
              </div>

              {/* Other Categories Fast Links */}
              <div className="flex flex-col gap-2 shrink-0">
                <span className="text-xs font-bold text-muted-foreground">{t('فئات أخرى ذات صلة')}:</span>
                <div className="flex flex-wrap gap-1.5 max-w-md">
                  {categories
                    .filter((c) => c.id !== activeCategory.id)
                    .slice(0, 5)
                    .map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.id}`}
                        className="rounded-lg border border-border/70 bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
                      >
                        {i18n.language === 'ar' ? cat.name : i18n.language === 'fr' ? cat.nameFr : cat.nameEn}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Area Filters */}
        <div className="mx-auto max-w-7xl px-5 md:px-8 mt-8">
          {availableAreas.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none [scrollbar-width:none]">
              <span className="text-xs font-bold text-muted-foreground shrink-0">{t('تصفية حسب المنطقة')}:</span>
              <button
                onClick={() => setSelectedArea('all')}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all shrink-0 ${
                  selectedArea === 'all'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'border border-border/80 bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                {t('كل المناطق')}
              </button>
              {availableAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all shrink-0 ${
                    selectedArea === area
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'border border-border/80 bg-card text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          )}

          {categoryPlaces.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border/80 p-12 text-center my-10 bg-card/40">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground">
                {t('لا توجد أماكن مسجلة في هذه المنطقة حالياً')}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('يمكنك إلغاء التصفية للاطلاع على جميع معالم هذه الفئة في الناظور.')}
              </p>
              <button
                onClick={() => setSelectedArea('all')}
                className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
              >
                {t('عرض كل الأماكن')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 mt-6">
              {categoryPlaces.map((place) => (
                <article
                  key={place.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                    <SafeImage
                      src={place.image}
                      alt={getLocalizedName(place)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white">
                      <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {getLocalizedArea(place)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      <Link to={`/place/${place.id}`}>
                        {getLocalizedName(place)}
                      </Link>
                    </h2>

                    <p className="mt-2 text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {getLocalizedDesc(place)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {place.features.slice(0, 3).map((feat, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/60">
                      <Link
                        to={`/place/${place.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors"
                      >
                        <span>{t('عرض التفاصيل الكاملة')}</span>
                        <span className="rtl:rotate-180">→</span>
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
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
