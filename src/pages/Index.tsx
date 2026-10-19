import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, Compass, MapPin, ShieldCheck, Waves } from 'lucide-react'
import SafeImage from '@/components/SafeImage'
import Navbar from '@/components/Navbar'
import MapExplorer from '@/components/MapExplorer'
import ImageGallery from '@/components/ImageGallery'
import WeatherWidget from '@/components/WeatherWidget'
import { MotionItem, MotionReveal } from '@/components/MotionReveal'
import { activities, culture, dining, itineraries, places, services } from '@/data/nador'
import { useTranslation } from 'react-i18next'

const SectionTitle = ({ number, title, intro }: { number: string; title: string; intro: string }) => { const { t } = useTranslation(); return (
  <div className="mb-9 grid gap-4 border-b border-border pb-5 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-8">
    <span className="font-display text-sm font-bold text-accent">{number} {t("/ دليل الناظور")}</span>
    <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
    <p className="max-w-sm text-sm leading-7 text-muted-foreground">{intro}</p>
  </div>
) }

const ImageCard = ({ image, name, note, area, index }: { image: string; name: string; note: string; area?: string; index?: string }) => { const { t } = useTranslation(); return (
  <article className="group overflow-hidden border-[1.5px] border-border bg-card transition-colors duration-300 hover:border-primary">
    <div className="relative aspect-[4/3] overflow-hidden">
      <SafeImage src={image} alt={t(name)} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.035]" />
      {index && <span className="absolute start-4 top-4 bg-background/90 px-2 py-1 text-xs font-bold text-foreground">{index}</span>}
    </div>
    <div className="p-5">
      {area && <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{t(area)}</div>}
      <h3 className="mb-2 text-xl font-bold">{t(name)}</h3>
      <p className="text-sm leading-7 text-muted-foreground">{t(note)}</p>
    </div>
  </article>
) }

export default function Index() {
  const { t } = useTranslation()
  const [typeFilter, setTypeFilter] = useState('all')
  const [areaFilter, setAreaFilter] = useState('all')
  const reducedMotion = useReducedMotion()
  const areas = [{ value: 'corniche', label: 'الكورنيش' }, { value: 'center', label: 'وسط الناظور' }, { value: 'marchica', label: 'مارشيكا' }, { value: 'ras-el-ma', label: 'رأس الماء' }]
  const visibleDining = dining.filter((item) => (typeFilter === 'all' || item.type === (typeFilter === 'restaurant' ? 'مطعم' : 'مقهى')) && (areaFilter === 'all' || t(item.area) === t(areas.find((area) => area.value === areaFilter)?.label || '')))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section id="home" className="on-media relative flex min-h-screen items-center overflow-hidden">
          <SafeImage src="/assets/nador-coast-hero.webp" alt={t("ساحل الناظور والبحر الأبيض المتوسط")} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 pb-20 pt-32 md:grid-cols-[1fr_auto] md:items-end md:px-10">
            <MotionReveal delay={0} className="max-w-3xl">
              <MotionItem><p className="mb-5 text-sm tracking-wide text-foreground/80">{t("دليل الزائر إلى الساحل والريف")}</p></MotionItem>
              <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut', delay: 0.04 }} className="max-w-3xl text-[clamp(2.4rem,4vw,3.5rem)] font-bold leading-[1.18]">{t("اكتشف الناظور: بين زرقة المتوسط وهدوء مارشيكا")}</motion.h1>
              <motion.p initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut', delay: 0.11 }} className="mt-5 max-w-xl text-base leading-8 text-foreground/85 md:text-lg">{t("خطّط لنزهة عائلية أو يوم مليء بالمغامرة؛ ابدأ باستكشاف الأماكن والأنشطة.")}</motion.p>
              <motion.div initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }} className="mt-8 flex flex-wrap gap-3">
                <a href="#places" className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-85">{t("استكشف الأماكن")} <ArrowLeft className="h-4 w-4" /></a>
                <a href="#activities" className="inline-flex items-center gap-2 border border-border px-5 py-3 font-bold text-foreground transition-colors hover:bg-background/15">{t("اختر نشاطاً")} <ArrowLeft className="h-4 w-4" /></a>
              </motion.div>
            </MotionReveal>
            <MotionReveal delay={0} className="hidden border-s border-border/60 ps-8 text-start md:block">
              <MotionItem><span className="font-display text-[clamp(5rem,11vw,9rem)] font-bold leading-none">٣</span></MotionItem>
              <MotionItem><span className="mt-2 block max-w-28 text-sm leading-6 text-foreground/80">{t("آفاق تلتقي هنا: البحر والبحيرة والريف")}</span></MotionItem>
            </MotionReveal>
          </div>
          <a href="#places" className="absolute bottom-7 start-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-sm text-foreground/85"><ArrowDown className="h-4 w-4" /> {t("تابع الدليل")}</a>
        </section>

        {/* Live Weather Forecast Section */}
        <section id="weather" className="relative z-20 -mt-12 mx-auto max-w-7xl px-5 md:px-8">
          <WeatherWidget />
        </section>

        <section id="places" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal>
              <MotionItem>
                <SectionTitle
                  number="01"
                  title={t("أبرز المعالم والوجهات الرئيسية")}
                  intro={t("استكشف أهم معالم الناظور مثل بحيرة مارشيكا وجبل كوروكو والشواطئ الساحرة. لكلّ وجهة إيقاعها وجمالها الطبيعي.")}
                />
              </MotionItem>
              <MotionItem>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" data-testid="key-locations-grid">
                  {places.map((place, i) => (
                    <article
                      key={place.name}
                      className="group overflow-hidden rounded-lg border-[1.5px] border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-md"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <SafeImage
                          src={place.image}
                          alt={t(place.name)}
                          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                        <span className="absolute start-4 top-4 rounded bg-background/90 px-2.5 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {place.name.includes('مارشيكا') || place.name.includes('كوروكو') ? (
                          <span className="absolute end-4 top-4 rounded bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                            {t("معلم رئيسي")}
                          </span>
                        ) : null}
                      </div>
                      <div className="p-5">
                        {place.area && (
                          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-accent">
                            <MapPin className="h-3.5 w-3.5" />
                            {t(place.area)}
                          </div>
                        )}
                        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">{t(place.name)}</h3>
                        <p className="text-sm leading-6 text-muted-foreground">{t(place.note)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </MotionItem>
            </MotionReveal>
          </div>
        </section>

        <ImageGallery />

        <MapExplorer />

        <section id="activities" className="scroll-mt-20 bg-muted/60 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal><MotionItem><SectionTitle number="02" title={t("اختر إيقاع يومك")} intro={t("تجارب على الماء وبين المسارات؛ المواعيد والأسعار تُحدّد بعد التحقق من المزوّدين المحليين.")} /></MotionItem>
              <MotionItem><div className="grid gap-5 md:grid-cols-3">{activities.map((item) => <article key={item.name} className="group overflow-hidden border-[1.5px] border-border bg-card transition-colors hover:border-primary"><div className="aspect-[4/3] overflow-hidden"><SafeImage src={item.image} alt={t(item.name)} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.035]" /></div><div className="p-5"><span className="text-xs font-bold text-accent">{t(item.suitable)}</span><h3 className="my-2 text-xl font-bold">{t(item.name)}</h3><p className="text-sm leading-7 text-muted-foreground">{t(item.note)}</p></div></article>)}</div></MotionItem>
              <MotionItem><p className="mt-6 flex items-start gap-2 border-s-2 border-accent ps-4 text-sm leading-7 text-muted-foreground"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />{t("تحقّق من الطقس وحالة البحر وتعليمات السلامة مباشرةً قبل النشاط.")}</p></MotionItem>
            </MotionReveal>
          </div>
        </section>

        <section id="itineraries" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal><MotionItem><SectionTitle number="03" title={t("يومان، بطريقتين مختلفتين")} intro={t("مسارات مرنة تجمع بين التوقفات القريبة. عدّل الترتيب بحسب الطقس ووسائل النقل.")} /></MotionItem>
              <MotionItem><div className="grid gap-6 lg:grid-cols-2">{itineraries.map((trip, i) => <article key={trip.name} className="grid overflow-hidden border-[1.5px] border-border md:grid-cols-[0.9fr_1.1fr]"><div className="min-h-64"><SafeImage src={trip.image} alt={t(trip.name)} className="h-full w-full" /></div><div className="p-6 md:p-8"><span className="text-xs font-bold text-accent">{t(trip.audience)}</span><h3 className="mt-2 text-2xl font-bold">{t(trip.name)}</h3><ol className="mt-5 space-y-4">{trip.steps.map((step, j) => <li key={step} className="flex gap-3 border-t border-border pt-3 text-sm leading-6"><span className="font-display font-bold text-muted-foreground">0{i + 1}.{j + 1}</span>{t(step)}</li>)}</ol></div></article>)}</div></MotionItem>
            </MotionReveal>
          </div>
        </section>

        <section id="dining" className="scroll-mt-20 bg-muted/60 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal><MotionItem><SectionTitle number="04" title={t("دليل الطعام والاستراحة")} intro={t("اقتراحات تصف أنواع الأماكن والمناطق؛ الأسماء التجارية والعناوين وساعات العمل تحتاج إلى تأكيد.")} /></MotionItem>
              <MotionItem><div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="flex gap-2" aria-label={t("التصفية حسب النوع")}>{[{ value: 'all', label: t('الكل') }, { value: 'restaurant', label: t('مطعم') }, { value: 'cafe', label: t('مقهى') }].map((kind) => <button key={kind.value} onClick={() => setTypeFilter(kind.value)} className={`border px-4 py-2 text-sm transition-colors ${typeFilter === kind.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:border-primary'}`}>{t(kind.label)}</button>)}</div>
                <select aria-label={t("التصفية حسب المنطقة")} value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} className="min-h-10 border border-border bg-background px-3 text-sm text-foreground"><option value="all">{t("كل المناطق")}</option>{areas.map((area) => <option key={area.value} value={area.value}>{t(area.label)}</option>)}</select>
                <span className="text-xs text-muted-foreground">{t("إدراجات توضيحية غير مؤكّدة")}</span>
              </div></MotionItem>
              <MotionItem><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleDining.map((item) => <ImageCard key={item.name} {...item} />)}</div></MotionItem>
            </MotionReveal>
          </div>
        </section>

        <section id="culture" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal><MotionItem><SectionTitle number="05" title={t("محطات من ذاكرة الريف")} intro={t("اكتشاف المكان يبدأ بالفضول والاحترام، لا بالافتراضات.")} /></MotionItem>
              <MotionItem><div className="grid gap-5 md:grid-cols-2">{culture.map((item) => <ImageCard key={item.name} {...item} />)}</div></MotionItem>
            </MotionReveal>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-muted/60 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal><MotionItem><SectionTitle number="06" title={t("خدمات تساعدك على الانطلاق")} intro={t("فئات للبحث فقط، وليست توصيات لمزوّدين محدّدين أو تأكيداً لتوفّر الخدمة.")} /></MotionItem>
              <MotionItem><div className="grid gap-5 md:grid-cols-2">{services.map((item) => <ImageCard key={item.name} {...item} />)}</div></MotionItem>
            </MotionReveal>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1fr_1fr] md:items-center md:px-8">
            <MotionReveal><MotionItem><p className="mb-4 flex items-center gap-2 text-sm font-bold text-accent"><Compass className="h-4 w-4" /> {t("روح المكان")}</p><h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl">{t("بين الساحل ومرتفعات الريف، تتعدّد الطرق لاكتشاف المكان على مهل.")}</h2><p className="mt-5 max-w-lg leading-8 text-muted-foreground">{t("في الناظور، يمكن أن يبدأ اليوم بهدوء البحيرة وينتهي بإطلالة على المتوسط. مساحة للقاء العائلة، أو للمشي واكتشاف مشهد جديد.")}</p></MotionItem></MotionReveal>
            <MotionReveal><MotionItem><div className="relative border-[1.5px] border-border p-2"><SafeImage src="/assets/nador-landscape-story.webp" alt={t("مشهد يجمع بحيرة مارشيكا وساحل الناظور ومرتفعات الريف")} className="aspect-[5/4] w-full" /><span className="absolute bottom-5 start-5 bg-background px-3 py-2 text-xs">{t("بحر، بحيرة، وأفق ريفي")}</span></div></MotionItem></MotionReveal>
          </div>
        </section>

        <section id="plan" className="scroll-mt-20 border-t border-border bg-muted/60 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <MotionReveal><MotionItem><SectionTitle number="07" title={t("قبل أن تبدأ رحلتك")} intro={t("خطوات بسيطة تساعد على زيارة أكثر راحة واستعداداً.")} /></MotionItem>
              <MotionItem><div className="grid gap-8 md:grid-cols-[1fr_0.8fr]">
                <div className="border-[1.5px] border-border bg-background p-6 md:p-8"><h3 className="text-xl font-bold">{t("قائمة سريعة")}</h3><ul className="mt-5 space-y-4 text-sm leading-7">{['راجع الطقس وحالة البحر قبل الانطلاق.', 'تحقّق مباشرةً من مواعيد الأماكن ووسائل النقل.', 'للعائلات: ماء ووسائل حماية من الشمس.', 'لمحبي المشي: حذاء مناسب وخطة عودة.'].map((tip) => <li key={tip} className="flex gap-3 border-t border-border pt-3"><Waves className="mt-1 h-4 w-4 shrink-0 text-accent" />{t(tip)}</li>)}</ul></div>
                <div className="flex flex-col justify-between border-[1.5px] border-border bg-background p-6 md:p-8"><div><h3 className="text-xl font-bold">{t("ابدأ بالاستكشاف")}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{t("اختر وجهتك، ثم راجع المعلومات العملية مباشرةً قبل الزيارة.")}</p></div><a href="#places" className="mt-8 inline-flex items-center gap-2 self-start bg-primary px-5 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-85">{t("تصفّح الأماكن")} <ArrowLeft className="h-4 w-4" /></a></div>
              </div></MotionItem>
              <MotionItem><p className="mt-7 border-s-2 border-accent ps-4 text-sm leading-7 text-muted-foreground">{t("للتواصل أو تصحيح بيانات الدليل:")} <a href="mailto:[البريد الإلكتروني]" className="font-bold text-foreground underline underline-offset-4">{t("[البريد الإلكتروني]")}</a>{t(". أرقام الجهات المدرجة تُنشر بعد التحقّق. الصور والتصنيفات لا تعني اعتماد أي نشاط تجاري.")}</p></MotionItem>
            </MotionReveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1fr_2fr] md:px-8">
          <div><a href="#home" className="text-xl font-bold">{t("اكتشف الناظور")}</a><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{t("دليل زائر إلى الطبيعة والثقافة والأنشطة في الناظور ومحيطها.")}</p></div>
          <div className="flex flex-wrap items-start gap-x-6 gap-y-3 text-sm">{[{ href: '#places', label: t('الأماكن') }, { href: '#gallery', label: t('المعرض') }, { href: '#activities', label: t('الأنشطة') }, { href: '#itineraries', label: t('المسارات') }, { href: '#dining', label: t('المطاعم والمقاهي') }, { href: '#culture', label: t('الثقافة') }, { href: '#services', label: t('الخدمات') }, { href: '#plan', label: t('التخطيط') }].map((link) => <a key={link.href} href={link.href} className="transition-colors hover:text-accent">{t(link.label)}</a>)}</div>
          <p className="border-t border-border pt-5 text-xs text-muted-foreground md:col-span-2">{t("دليل سياحي مستقل. بيانات المطاعم والخدمات الواردة أمثلة توضيحية وليست جهات مؤكّدة. للاستفسار أو تصحيح البيانات:")} <a href="mailto:[البريد الإلكتروني]" className="underline underline-offset-4">{t("[البريد الإلكتروني]")}</a>.</p>
        </div>
      </footer>
    </div>
  )
}
