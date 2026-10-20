import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Compass,
  Mail,
  Send,
  ShieldCheck,
  Heart,
  Sparkles,
  MapPin,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const { t, i18n } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(t('يرجى ملء جميع الحقول المطلوبة.'))
      return
    }
    setSubmitted(true)
    toast.success(t('شكراً لتواصلك! تم استلام رسالتك وسنرد في أقرب وقت.'))
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  const faqs = [
    {
      q: 'ما هي منصة Nador X؟',
      a: 'Nador X هي منصة ودليل رقمي محلي مستقل مكرس للتعريف بإقليم الناظور ومحيط بحيرة مارشيكا وجبال الريف، يهدف إلى تزويد السكان والزوار بمعلومات جغرافية وسياحية موثوقة ومتحقّق منها.',
    },
    {
      q: 'كيف نصل إلى الناظور؟',
      a: 'يمكن الوصول إلى الناظور جواً عبر مطار الناظور العروي الدولي (NDR)، أو بحراً عبر ميناء بني أنصار المرتبط بموانئ إسبانيا وفرنسا، أو براً عبر القطار (محطة الناظور المدينة) وشبكة الطرق السريعة.',
    },
    {
      q: 'ما هي أفضل الأوقات لزيارة بحيرة مارشيكا وشواطئ الإقليم؟',
      a: 'تعد الفترة من أبريل إلى أكتوبر مثالية للأنشطة الشاطئية والبحرية والسباحة، بينما يعد فصلا الخريف والربيع والشتاء الأفضل للمشي في مسارات جبل كوروكو ومراقبة الطيور المهاجرة.',
    },
    {
      q: 'كيف يمكنني اقتراح مكان أو تصحيح معلومة؟',
      a: 'يمكنكم التواصل المباشر مع فريق التحرير عبر البريد الإلكتروني contact@nadorx.ma أو ملء نموذج الاتصال أدناه لإرسال المقترحات والتصحيحات.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/20">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Header */}
        <div className="border-b border-border/60 bg-gradient-to-b from-primary/15 via-background to-background py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-4">
              <Compass className="h-3.5 w-3.5" />
              <span>{t('عن المنصة ورسالتها')}</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-black text-foreground tracking-tight">
              {t('دليل الناظور الرقمي الشامل')}
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('منصة Nador X مبادرة محلية تهدف إلى توثيق وإبراز جمال إقليم الناظور، بحيرة مارشيكا، وسواحل المتوسط، وتسهيل الوصول إلى أفضل الأماكن والخدمات.')}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-5 md:px-8 mt-12 space-y-14">
          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs text-center md:text-start">
              <div className="mx-auto md:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">
                {t('بيانات دقيقة ومتحقّق منها')}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {t('نعتمد فقط على إحداثيات جغرافية ومعالم حقيقية في الناظور دون تضليل أو اختلاق صور.')}
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs text-center md:text-start">
              <div className="mx-auto md:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">
                {t('اعتزاز بالتراث والبيئة')}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {t('تسليط الضوء على فرادة الثقافة الأمازيغية الريفية وأهمية الحفاظ على بيئة بحيرة مارشيكا.')}
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs text-center md:text-start">
              <div className="mx-auto md:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">
                {t('تجربة ثلاثية اللغات')}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {t('خدمة متكاملة بالعربية والفرنسية والإنجليزية لدعم السكان، وأبناء الجالية، والزوار الدوليين.')}
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">
                {t('الأسئلة الشائعة حول زيارة الناظور')}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-border/60 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-display text-sm md:text-base font-bold text-foreground mb-1.5">
                    {faq.q}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-accent" />
              <h2 className="font-display text-xl font-bold text-foreground">
                {t('تواصل معنا أو اقترح مكاناً')}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-6">
              {t('هل لديك استفسار، ملاحظة، أو ترغب في إضافة نشاطك المحلي أو تصحيح معلومة؟ نحن نسعد برسالتك.')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    {t('الاسم الكامل')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('مثال: محمد الريفي')}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs md:text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    {t('البريد الإلكتروني')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs md:text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {t('الموضوع')}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t('مثال: اقتراح مكان جديد في مارشيكا')}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs md:text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {t('نص الرسالة')} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('اكتب تفاصيل استفسارك أو اقتراحك هنا...')}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs md:text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs md:text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
              >
                <Send className="h-4 w-4" />
                <span>{t('إرسال الرسالة')}</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
