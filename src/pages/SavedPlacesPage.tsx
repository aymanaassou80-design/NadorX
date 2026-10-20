import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Heart,
  MapPin,
  Trash2,
  Compass,
  ArrowLeft,
  Navigation,
  ExternalLink,
  Share2,
} from 'lucide-react'
import { toast } from 'sonner'
import { allPlaces } from '@/data/nador'
import { useFavorites } from '@/utils/favorites'
import SafeImage from '@/components/SafeImage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SavedPlacesPage() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const { favorites, toggle, clearAll, count } = useFavorites()

  const savedPlacesList = useMemo(() => {
    return allPlaces.filter((p) => favorites.includes(p.id))
  }, [favorites])

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'أماكني المفضلة في الناظور — Nador X',
          text: `قائمتي المختارة لأفضل الأماكن في الناظور (${count} مكان): ${savedPlacesList.map((p) => p.name).join('، ')}`,
          url: window.location.href,
        })
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success(t('تم نسخ رابط قائمتك المفضلة'))
    }
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRtl ? 'rtl' : 'ltr'}`}>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-2">
                <Link to="/" className="hover:text-primary transition-colors">
                  {t('الرئيسية')}
                </Link>
                <span>/</span>
                <Link to="/places" className="hover:text-primary transition-colors">
                  {t('استكشف الأماكن')}
                </Link>
                <span>/</span>
                <span className="text-primary">{t('المفضلة')}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-foreground flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                  <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                </span>
                <span>{t('أماكني المفضلة في الناظور')}</span>
              </h1>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
                {t(
                  'قائمتك الشخصية المحفوظة للأماكن والشواطئ والمطاعم لزيارتها أثناء رحلتك، مخزنة ومتاحة حتى عند انقطاع الإنترنت.'
                )}
              </p>
            </div>

            {count > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted"
                >
                  <Share2 className="h-4 w-4" />
                  <span>{t('مشاركة القائمة')}</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(t('هل تريد بالتأكيد مسح جميع الأماكن المحفوظة؟'))) {
                      clearAll()
                      toast.info(t('تم تفريغ قائمة المفضلة'))
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 transition-colors hover:bg-rose-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{t('تفريغ القائمة')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {count === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center max-w-xl mx-auto my-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                <Heart className="h-8 w-8 text-rose-500" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                {t('لا توجد أماكن محفوظة بعد')}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t(
                  'استكشف شواطئ الناظور، بحيرة مارشيكا، قمم كوروكو والمطاعم، واضغط على رمز القلب لحفظها هنا لرحلتك القادمة.'
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/places"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                >
                  <Compass className="h-4 w-4" />
                  <span>{t('تصفح دليل الأماكن')}</span>
                </Link>
                <Link
                  to="/itineraries"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors"
                >
                  <Navigation className="h-4 w-4" />
                  <span>{t('شاهد المسارات المقترحة')}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span>
                  {count} {t('مكان محفوظ في رحلتك')}
                </span>
                <span>{t('اضغط على أي بطاقة لعرض التفاصيل الكاملة والاتجاهات')}</span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedPlacesList.map((place) => {
                  const placeName =
                    i18n.language === 'en'
                      ? place.nameEn
                      : i18n.language === 'fr'
                      ? place.nameFr
                      : place.name
                  const placeArea =
                    i18n.language === 'en'
                      ? place.areaEn
                      : i18n.language === 'fr'
                      ? place.areaFr
                      : place.area
                  const placeDesc =
                    i18n.language === 'en'
                      ? place.descriptionEn
                      : i18n.language === 'fr'
                      ? place.descriptionFr
                      : place.description

                  return (
                    <article
                      key={place.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:shadow-lg hover:border-primary/40"
                    >
                      {/* Image container */}
                      <div className="relative aspect-16/10 overflow-hidden bg-muted">
                        <SafeImage
                          src={place.image}
                          alt={placeName}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Remove favorite button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggle(place.id)
                            toast.info(t('تمت إزالة المكان من المفضلة'))
                          }}
                          aria-label={t('إزالة من المفضلة')}
                          className="absolute top-3 end-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-rose-500 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80"
                        >
                          <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                        </button>

                        <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-white">
                          <span className="flex items-center gap-1 text-xs font-bold drop-shadow-sm">
                            <MapPin className="h-3.5 w-3.5 text-accent" />
                            {placeArea}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-5">
                        <h2 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                          <Link to={`/place/${place.id}`}>{placeName}</Link>
                        </h2>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground flex-1">
                          {placeDesc || place.note}
                        </p>

                        {/* Features pill preview */}
                        {place.features && place.features.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {place.features.slice(0, 2).map((feat, idx) => (
                              <span
                                key={idx}
                                className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between gap-2">
                          <Link
                            to={`/place/${place.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent transition-colors"
                          >
                            <span>{t('عرض التفاصيل')}</span>
                            <ArrowLeft className={`h-3.5 w-3.5 ${isRtl ? '' : 'rotate-180'}`} />
                          </Link>

                          <a
                            href={place.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>{t('الخريطة')}</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
