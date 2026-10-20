import { type ReactNode } from "react"
import { Link } from "react-router-dom"
import { Compass, MapPin, Mail, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from 'react-i18next'

interface FooterLink {
  label: string
  to: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface Props {
  brand?: ReactNode
  description?: string
  columns?: FooterColumn[]
  copyright?: string
  className?: string
}

export function Footer({
  brand,
  description,
  columns,
  copyright,
  className,
}: Props) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const defaultColumns: FooterColumn[] = [
    {
      title: 'أقسام الدليل',
      links: [
        { label: 'استكشف الأماكن', to: '/places' },
        { label: 'المعالم السياحية', to: '/category/tourism' },
        { label: 'الشواطئ والساحل', to: '/category/beaches' },
        { label: 'الطبيعة والجبال', to: '/category/nature' },
        { label: 'المطاعم والمأكولات', to: '/category/restaurants' },
      ],
    },
    {
      title: 'استكشف المزيد',
      links: [
        { label: 'المقاهي والاستراحة', to: '/category/cafes' },
        { label: 'الأنشطة والترفيه', to: '/category/activities' },
        { label: 'الفنادق والإقامة', to: '/category/hotels' },
        { label: 'الثقافة والتراث الريفي', to: '/category/culture' },
        { label: 'الخدمات والمحلات المحلية', to: '/category/services' },
      ],
    },
    {
      title: 'عن Nador X',
      links: [
        { label: 'رسالة المنصة', to: '/about' },
        { label: 'الأسئلة الشائعة', to: '/about' },
        { label: 'تواصل معنا واقترح مكاناً', to: '/about' },
      ],
    },
  ]

  const activeColumns = columns && columns.length > 0 ? columns : defaultColumns

  return (
    <footer className={cn("w-full border-t border-border/80 bg-card text-foreground py-12 md:py-16", className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 text-2xl font-black text-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent text-white shadow-xs">
                <Compass className="h-5 w-5" />
              </div>
              <span>
                Nador <span className="text-accent">X</span>
              </span>
            </Link>

            <p className="text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed">
              {description ||
                t(
                  'دليل رقمي محلي متكامل ومستقل لاكتشاف مدينة الناظور، بحيرة مارشيكا، شواطئ البحر الأبيض المتوسط، وقمم جبال الريف.'
                )}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
              <span>{t('إقليم الناظور، جهة الشرق، المغرب')}</span>
            </div>
          </div>

          {/* Nav columns */}
          {activeColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs md:text-sm font-bold text-foreground uppercase tracking-wider mb-3.5">
                {t(col.title)}
              </h3>
              <ul className="space-y-2 text-xs md:text-sm">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-accent transition-colors font-medium"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            {copyright || `© ${year} Nador X — ${t('دليل سياحي وجغرافي محلي مستقل.')}`}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@nadorx.ma"
              className="hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Mail className="h-3.5 w-3.5 text-accent" />
              <span>contact@nadorx.ma</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
