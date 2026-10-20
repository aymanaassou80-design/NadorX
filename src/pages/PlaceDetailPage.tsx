import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  MapPin,
  ChevronRight,
  ExternalLink,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Compass,
  ArrowLeft,
  Navigation,
  Sparkles,
  Info,
  Calendar,
  Waves,
} from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SafeImage from '@/components/SafeImage'
import { allPlaces, categories, PlaceItem } from '@/data/nador'

export default function PlaceDetailPage() {
  const { placeId } = useParams<{ placeId: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  // Find place
  const place = useMemo(() => {
    return allPlaces.find((p) => p.id === placeId) || allPlaces[0]
  }, [placeId])

  const category = useMemo(() => {
    return categories.find((c) => c.id === place.categoryId)
  }, [place])

  // Related places in same category or area
  const relatedPlaces = useMemo(() => {
    return allPlaces
      .filter((p) => p.id !== place.id && (p.categoryId === place.categoryId || p.area === place.area))
      .slice(0, 3)
  }, [place])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Nador X — ${place.name}`,
          text: place.description,
          url,
        })
      } catch (e) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(url)
      toast.success(t('تم نسخ رابط المكان إلى الحافظة!'))
    }
  }

  const getLocalizedName = (p: PlaceItem) => {
    if (i18n.language === 'fr') return p.nameFr || p.name
    if (i18n.language === 'en') return p.nameEn || p.name
    return p.name
  }

  const getLocalizedArea = (p: PlaceItem) => {
    if (i18n.language === 'fr') return p.areaFr || p.area
    if (i18n.language === 'en') return p.areaEn || p.area
    return p.area
  }

  const getLocalizedDescription = (p: PlaceItem) => {
    if (i18n.language === 'fr') return p.descriptionFr || p.description
    if (i18n.language === 'en') return p.descriptionEn || p.description
    return p.description
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/20">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          {/* Breadcrumbs & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-foreground transition-colors">{t('الرئيسية')}</Link>
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              <Link to="/places" className="hover:text-foreground transition-colors">{t('الأماكن')}</Link>
              {category && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  <Link to={`/category/${category.id}`} className="hover:text-foreground transition-colors">
                    {i18n.language === 'ar' ? category.name : i18n.language === 'fr' ? category.nameFr : category.nameEn}
                  </Link>
                </>
              )}
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              <span className="text-foreground font-bold truncate max-w-[180px] sm:max-w-xs">{getLocalizedName(place)}</span>
            </nav>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3.5 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              <span>{t('رجوع')}</span>
            </button>
          </div>

          {/* Main Visual Banner */}
          <div className="relative aspect-16/9 md:aspect-21/9 w-full overflow-hidden rounded-3xl border border-border shadow-md bg-muted">
            <SafeImage
              src={place.image}
              alt={getLocalizedName(place)}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Overlaid Badges */}
            <div className="absolute top-4 start-4 flex flex-wrap gap-2">
              {category && (
                <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                  {i18n.language === 'ar' ? category.name : i18n.language === 'fr' ? category.nameFr : category.nameEn}
                </span>
              )}
              {place.verified && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t('بيانات متحقّق منها')}
                </span>
              )}
            </div>

            {/* Share action */}
            <div className="absolute top-4 end-4">
              <button
                onClick={handleShare}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 transition-all border border-white/20 shadow-xs"
                title={t('مشاركة رابط المكان')}
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Bottom title in banner */}
            <div className="absolute bottom-5 inset-x-5 md:inset-x-8 text-white">
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-accent mb-1 drop-shadow-sm">
                <MapPin className="h-4 w-4" />
                <span>{getLocalizedArea(place)}</span>
              </div>
              <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-black drop-shadow-md">
                {getLocalizedName(place)}
              </h1>
            </div>
          </div>

          {/* Place Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Left 2 Cols: Description, Features & Guidance */}
            <div className="md:col-span-2 space-y-6">
              {/* Highlight summary card */}
              <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-xs">
                <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>{t('نظرة عامة على المكان')}</span>
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {getLocalizedDescription(place)}
                </p>
              </div>

              {/* Note / Safety recommendation */}
              {place.note && (
                <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 md:p-5 flex items-start gap-3.5">
                  <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                      {t('إرشادات وتنبيهات الزيارة')}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {place.note}
                    </p>
                  </div>
                </div>
              )}

              {/* Place Features & Amenities */}
              {place.features && place.features.length > 0 && (
                <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-xs">
                  <h2 className="font-display text-base font-bold text-foreground mb-4">
                    {t('خصائص ومميزات المكان')}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {place.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 1 Col: Practical Information & Action Buttons */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs sticky top-28">
                <h3 className="font-display text-sm font-bold text-foreground mb-4">
                  {t('المعلومات العملية')}
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-muted-foreground block mb-0.5">{t('العنوان الجغرافي')}:</span>
                    <span className="font-semibold text-foreground">{place.address}</span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block mb-0.5">{t('المنطقة الإقليمية')}:</span>
                    <span className="font-semibold text-foreground">{getLocalizedArea(place)}</span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block mb-0.5">{t('الإحداثيات الجغرافية')}:</span>
                    <span className="font-mono text-[11px] text-foreground bg-muted px-2 py-1 rounded inline-block">
                      {place.coordinates[0].toFixed(3)}° N, {place.coordinates[1].toFixed(3)}° W
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-border/80 flex flex-col gap-2.5">
                  <a
                    href={place.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs md:text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>{t('الاتجاهات عبر Google Maps')}</span>
                    <ExternalLink className="h-3.5 w-3.5 ms-1" />
                  </a>

                  <Link
                    to="/places"
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-muted/40 hover:bg-muted px-4 py-2.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-all"
                  >
                    <span>{t('تصفح المزيد من الأماكن')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Places */}
          {relatedPlaces.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border/80">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {t('أماكن أخرى قد تهمك في الناظور')}
                  </h2>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {t('استكشف وجهات قريبة في نفس المنطقة أو الفئة')}
                  </p>
                </div>
                <Link to="/places" className="text-xs font-bold text-primary hover:text-accent transition-colors">
                  {t('عرض الكل')} →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedPlaces.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/place/${rel.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                      <SafeImage
                        src={rel.image}
                        alt={getLocalizedName(rel)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[11px] font-semibold text-accent block mb-1">
                        {getLocalizedArea(rel)}
                      </span>
                      <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {getLocalizedName(rel)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
