import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Phone,
  ShieldAlert,
  Plane,
  Ship,
  Train,
  Car,
  HeartPulse,
  Compass,
  MapPin,
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const emergencyNumbers = [
  {
    name: 'الشرطة والأمن الوطني (Police)',
    number: '19',
    desc: 'داخل المجال الحضري لمدينة الناظور وبني أنصار والعروي',
  },
  {
    name: 'الدرك الملكي (Gendarmerie)',
    number: '177',
    desc: 'خارج المدار الحضري، الطرق الوطنية، جبل كوروكو، والشواطئ',
  },
  {
    name: 'الوقاية المدنية والإسعاف (Ambulance)',
    number: '15',
    desc: 'للحالات الطبية الطارئة والإنقاذ',
  },
  {
    name: 'المستشفى الإقليمي الحسني بالناظور',
    number: '+212 536 60 62 12',
    desc: 'المستشفى المركزي بالناظور، قسم المستعجلات 24/7',
  },
]

const transportHubs = [
  {
    title: 'مطار الناظور العروي الدولي (NDD)',
    desc: 'يبعد حوالي 28 كم عن وسط المدينة. يربط الناظور برحلات يومية مباشرة مع مدن أوروبية كبرى (بروكسيل، فرانكفورت، باريس، برشلونة، أمستردام، دوسلدورف) ورحلات الربط الوطنية مع مطار محمد الخامس بالدار البيضاء.',
    tips: 'تتوفر سيارات الأجرة الكبيرة (Grand Taxi) عند المخرج بتسعيرة محددة نحو الناظور أو العروي أو الدريوش، بالإضافة لمكاتب تأجير السيارات العالمية والمحلية.',
    icon: Plane,
  },
  {
    title: 'ميناء بني أنصار للمسافرين (Port de Beni Ensar)',
    desc: 'بوابة النقل البحري الرئيسية في الشرق المغربي. يستقبل العبّارات الدولية المنتظمة للمسافرين والسيارات القادمة من موانئ ألميريا وموتريل وبرشلونة (إسبانيا) وسيت (فرنسا).',
    tips: 'توجد محطة قطار بني أنصار الميناء مباشرة بجانب المحطة البحرية، مما يسهل ركوب القطار فور الخروج من الميناء.',
    icon: Ship,
  },
  {
    title: 'محطة قطار الناظور المدينة (Gare ONCF)',
    desc: 'تقع بشارع الجيش الملكي بقلب المدينة. تتيح قطارات يومية مريحة ومكيفة تصل الناظور بكل من تاوريرت، فاس، مكناس، الرباط، الدار البيضاء، ومراكش.',
    tips: 'يمكن حجز التذاكر مسبقاً عبر موقع ONCF أو شبابيك المحطة. توجد سيارات الأجرة الصغيرة أمام المدخل مباشرة.',
    icon: Train,
  },
  {
    title: 'سيارات الأجرة والتنقل المحلي (Taxis)',
    desc: 'التاكسي الصغير (Petit Taxi): سيارات حمراء مخصصة للتنقل داخل مدينة الناظور وتعمل بالعداد.\nالتاكسي الكبير (Grand Taxi): يربط الناظور بالمناطق المجاورة (بني أنصار، رأس الماء، سلوان، أزغنغان، قرية أركمان).',
    tips: 'المحطة الرئيسية لسيارات الأجرة الكبيرة تقع بالقرب من المحطة الطرقية بوسط المدينة.',
    icon: Car,
  },
]

export default function EssentialsPage() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRtl ? 'rtl' : 'ltr'}`}>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              {t('الرئيسية')}
            </Link>
            <span>/</span>
            <span className="text-primary">{t('دليل الطوارئ والتنقل والخدمات')}</span>
          </div>

          {/* Hero */}
          <div className="relative mb-12 overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-primary/15 via-background to-amber-500/10 p-6 md:p-10 shadow-sm">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary mb-3">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>{t('معلومات عملية موثوقة للزائر والمقيم')}</span>
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                {t('دليل الطوارئ والتنقل والخدمات الحيوية بالناظور')}
              </h1>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(
                  'كل ما تحتاجه لإقامة آمنة ومريحة في إقليم الناظور: أرقام النجدة المباشرة، بوابات السفر الجوي والبحري والسككي، صيدليات الحراسة، ونصائح التنقل المحلي.'
                )}
              </p>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {t('أرقام الطوارئ والنجدة المباشرة')}
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t('أرقام اتصال مجانية وسريعة تعمل على مدار الساعة طوال أيام الأسبوع')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyNumbers.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-5 shadow-2xs hover:border-rose-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground block mb-1">
                      {t(item.name)}
                    </span>
                    <a
                      href={`tel:${item.number.replace(/\s+/g, '')}`}
                      className="font-display text-3xl font-black text-rose-600 dark:text-rose-400 hover:underline block my-2"
                    >
                      {item.number}
                    </a>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t(item.desc)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/70">
                    <a
                      href={`tel:${item.number.replace(/\s+/g, '')}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/10 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>{t('اتصال مباشر')}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Health & Pharmacies */}
          <section className="mb-14 rounded-3xl border border-border bg-card/60 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t('صيدليات الحراسة والرعاية الصحية بالناظور')}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t('إرشادات الحصول على الأدوية والمستعجلات الطبية في أي وقت')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:text-sm text-muted-foreground leading-relaxed">
              <div className="rounded-2xl border border-border bg-background p-4">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  <span>{t('صيدليات الحراسة الليلية')}</span>
                </h4>
                <p>
                  {t(
                    'تعمل صيدليات الحراسة بنظام المداومة الدورية الليلية وأيام العطل. يتم تعليق قائمة صيدلية الحراسة الأسبوعية المحدثة على واجهة جميع صيدليات المدينة.'
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-emerald-500" />
                  <span>{t('المستشفى الإقليمي الحسني')}</span>
                </h4>
                <p>
                  {t(
                    'يقع في وسط الناظور، ويحتوي على قسم المستعجلات العام 24/7 ومختبرات التحاليل والأشعة الطبية للحالات الطارئة.'
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-500" />
                  <span>{t('المصحات الخاصة')}</span>
                </h4>
                <p>
                  {t(
                    'تتوفر بالناظور مصحات طبية خاصة متطورة (جراحة، ولادة، أمراض القلب) على طول الشوارع الرئيسية مثل شارع تاويمة وشارع حسن الثاني.'
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Transport Hubs */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {t('بوابات السفر ووسائل النقل')}
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t('كيف تصل إلى الناظور وكيف تتنقل بين شواطئها ومعالمها')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {transportHubs.map((hub, idx) => {
                const IconComponent = hub.icon
                return (
                  <div
                    key={idx}
                    className="rounded-3xl border border-border bg-card p-6 md:p-7 shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {t(hub.title)}
                        </h3>
                      </div>
                      <p className="text-xs md:text-sm leading-relaxed text-muted-foreground whitespace-pre-line mb-4">
                        {t(hub.desc)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-muted/60 p-3.5 border border-border/70 text-xs text-foreground font-medium">
                      <strong className="text-primary">{t('نصيحة التنقل')}: </strong>
                      {t(hub.tips)}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Practical Tips */}
          <section className="rounded-3xl border border-border bg-gradient-to-r from-card via-card to-primary/5 p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span>{t('نصائح ومعلومات مفيدة لرحلتك بالناظور')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs text-muted-foreground">
              <div className="p-4 rounded-2xl bg-background/80 border border-border">
                <h4 className="font-bold text-foreground text-sm mb-1">{t('العملة والصرف')}</h4>
                <p>
                  {t(
                    'العملة الرسمية هي الدرهم المغربي (MAD). تتوفر وكالات الصرف والبنوك والصرافات الآلية بوفرة بشارع محمد الخامس والكورنيش وبني أنصار.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-background/80 border border-border">
                <h4 className="font-bold text-foreground text-sm mb-1">{t('الاتصال والإنترنت 4G/5G')}</h4>
                <p>
                  {t(
                    'تتوفر شرائح الاتصال لشبكات (Maroc Telecom, Inwi, Orange) بمطار العروي وميناء بني أنصار ودكاكين المدينة بتغطية ممتازة.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-background/80 border border-border">
                <h4 className="font-bold text-foreground text-sm mb-1">{t('اللغات المستخدمة')}</h4>
                <p>
                  {t(
                    'اللغة الأمازيغية الريفية (تاريفيت) والعربية الدارجة هما الأكثر تداولاً، مع انتشار واسع للإسبانية والفرنسية والهولندية والألمانية بفضل مغاربة العالم.'
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
