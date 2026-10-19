import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from "./LanguageToggle"

const links = [
  { href: '#places', label: 'الأماكن' },
  { href: '#gallery', label: 'المعرض' },
  { href: '#activities', label: 'الأنشطة' },
  { href: '#itineraries', label: 'المسارات' },
  { href: '#dining', label: 'المطاعم والمقاهي' },
  { href: '#culture', label: 'الثقافة' },
  { href: '#services', label: 'الخدمات' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'border-b border-border/70 bg-background/95 text-foreground backdrop-blur-md' : 'on-media'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
        <a href="#home" className="shrink-0 text-xl font-bold tracking-tight md:text-2xl" aria-label={t("اكتشف الناظور — الرئيسية")}>{t("اكتشف الناظور")}</a>
        <nav className="hidden items-center gap-5 text-sm lg:flex" aria-label={t("التنقل الرئيسي")}>
          {links.map((link) => <a key={link.href} href={link.href} className="whitespace-nowrap transition-opacity hover:opacity-70">{t(link.label)}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a className="hidden border border-current px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex" href="#plan">{t("خطّط لزيارتك")}</a>
        </div>
      </div>
    </header>
  )
}
