import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Compass,
  Clock,
  MapPin,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowLeft,
  Navigation,
  CheckCircle2,
  Info,
  ExternalLink,
} from 'lucide-react'
import { detailedItineraries, getPlaceById } from '@/data/nador'
import SafeImage from '@/components/SafeImage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ItinerariesPage() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [expandedItinerary, setExpandedItinerary] = useState<string>(
    detailedItineraries[0]?.id || ''
  )

  const filtered =
    activeCategory === 'all'
      ? detailedItineraries
      : detailedItineraries.filter((it) => it.category === activeCategory)

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRtl ? 'rtl' : 'ltr'}`}>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Breadcrumbs */}
          <div className="mb-4 flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              {t('الرئيسية')}
            </Link>
            <span>/</span>
            <span className="text-primary">{t('المسارات والجولات السياحية')}</span>
          </div>

          {/* Hero Banner */}
          <div className="relative mb-10 overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-primary/15 via-background to-accent/15 p-6 md:p-10 shadow-sm">
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t('برامج وجولات معدة بعناية')}</span>
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                {t('مسارات سياحية مقترحة لاستكشاف الناظور والريف')}
              </h1>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(
                  'سواء كانت زيارتك ليوم واحد أو عطلة نهاية أسبوع، اختر المسار الأنسب لك مع تفاصيل المحطات، التوقيت، وأفضل النصائح الميدانية لتجربة لا تُنسى.'
                )}
              </p>

              {/* Filter tabs */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'جميع المسارات' },
                  { id: 'family', label: 'عائلي ومارشيكا' },
                  { id: 'nature', label: 'طبيعة وجبال' },
                  { id: 'coastal', label: 'شواطئ وجروف' },
                  { id: 'cultural', label: 'ثقافة وأسواق' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {t(cat.label)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Itinerary Cards List */}
          <div className="space-y-8">
            {filtered.map((itinerary) => {
              const isExpanded = expandedItinerary === itinerary.id
              const title =
                i18n.language === 'en'
                  ? itinerary.titleEn
                  : i18n.language === 'fr'
                  ? itinerary.titleFr
                  : itinerary.title
              const subtitle =
                i18n.language === 'en'
                  ? itinerary.subtitleEn
                  : i18n.language === 'fr'
                  ? itinerary.subtitleFr
                  : itinerary.subtitle
              const duration =
                i18n.language === 'en'
                  ? itinerary.durationEn
                  : i18n.language === 'fr'
                  ? itinerary.durationFr
                  : itinerary.duration
              const summary =
                i18n.language === 'en'
                  ? itinerary.summaryEn
                  : i18n.language === 'fr'
                  ? itinerary.summaryFr
                  : itinerary.summary

              return (
                <div
                  key={itinerary.id}
                  className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xs transition-all hover:border-primary/40"
                >
                  {/* Card Header Top */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8">
                    {/* Thumbnail */}
                    <div className="md:col-span-4 lg:col-span-3">
                      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted shadow-xs">
                        <SafeImage
                          src={itinerary.image}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute top-3 start-3 rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-extrabold text-accent backdrop-blur-xs">
                          {t(itinerary.badge)}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Summary */}
                    <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-bold mb-2">
                          <span className="inline-flex items-center gap-1.5 text-primary">
                            <Clock className="h-4 w-4" />
                            {duration}
                          </span>
                          <span>•</span>
                          <span>
                            {itinerary.stops.length} {t('محطات رئيسية')}
                          </span>
                        </div>

                        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                          {title}
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-accent">{subtitle}</p>
                        <p className="mt-3 text-xs md:text-sm leading-relaxed text-muted-foreground">
                          {summary}
                        </p>
                      </div>

                      {/* Expand Button */}
                      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                        <button
                          onClick={() => setExpandedItinerary(isExpanded ? '' : itinerary.id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
                        >
                          <span>{isExpanded ? t('إخفاء تفاصيل المسار') : t('عرض جدول المحطات')}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>

                        <div className="text-xs text-muted-foreground font-semibold">
                          <span>{itinerary.stops.length} {t('محطة مخططة')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Timeline Steps */}
                  {isExpanded && (
                    <div className="border-t border-border/80 bg-muted/30 p-6 md:p-8">
                      <h3 className="font-display text-base font-bold text-foreground mb-6 flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-primary" />
                        <span>{t('الجدول الزمني ومحطات المسار بالتفصيل')}</span>
                      </h3>

                      <div className="relative ps-6 md:ps-8 space-y-6 before:absolute before:top-2 before:bottom-2 before:start-2.5 md:before:start-3.5 before:w-0.5 before:bg-primary/30">
                        {itinerary.stops.map((stop, idx) => {
                          const stopTitle =
                            i18n.language === 'en'
                              ? stop.titleEn
                              : i18n.language === 'fr'
                              ? stop.titleFr
                              : stop.title
                          const stopDesc =
                            i18n.language === 'en'
                              ? stop.descriptionEn
                              : i18n.language === 'fr'
                              ? stop.descriptionFr
                              : stop.description
                          const linkedPlace = stop.placeId ? getPlaceById(stop.placeId) : null

                          return (
                            <div key={idx} className="relative group">
                              {/* Step dot */}
                              <div className="absolute -start-[25px] md:-start-[29px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-black text-primary-foreground shadow-xs">
                                {idx + 1}
                              </div>

                              <div className="rounded-2xl border border-border/70 bg-card p-4 md:p-5 shadow-2xs">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-black text-primary">
                                    {stop.time}
                                  </span>
                                  {linkedPlace && (
                                    <Link
                                      to={`/place/${linkedPlace.id}`}
                                      className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline"
                                    >
                                      <span>{t('صفحة المكان في Nador X')}</span>
                                      <ExternalLink className="h-3 w-3" />
                                    </Link>
                                  )}
                                </div>

                                <h4 className="font-display text-base font-bold text-foreground">
                                  {stopTitle}
                                </h4>
                                <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-relaxed">
                                  {stopDesc}
                                </p>

                                {stop.tip && (
                                  <div className="mt-3 flex items-start gap-2 rounded-xl bg-accent/10 border border-accent/20 p-2.5 text-xs text-foreground font-medium">
                                    <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                    <span>
                                      <strong>{t('نصيحة عملية')}:</strong> {stop.tip}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Practical tips footer */}
                      {itinerary.practicalTips && itinerary.practicalTips.length > 0 && (
                        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
                          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>{t('إرشادات عامة لهذا المسار')}</span>
                          </h4>
                          <ul className="space-y-1.5 text-xs text-muted-foreground">
                            {itinerary.practicalTips.map((tip, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2">
                                <span className="text-primary font-bold">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
