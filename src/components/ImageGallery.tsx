import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, MapPin, X, Sparkles, Filter } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SafeImage from './SafeImage'

export interface GalleryItem {
  id: string
  title: string
  area: string
  category: 'all' | 'beaches' | 'lagoon' | 'mountains' | 'culture'
  description: string
  image: string
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'marchica',
    title: 'بحيرة مارشيكا',
    area: 'الناظور',
    category: 'lagoon',
    description: 'واحدة من أهم البحيرات الشاطئية في البحر الأبيض المتوسط، بممشى عصري وإطلالات خلابة على مياه هادئة.',
    image: '/assets/place-marchica.webp',
  },
  {
    id: 'gourougou_mountain',
    title: 'جبل كوروكو',
    area: 'كوروكو',
    category: 'mountains',
    description: 'قمة جبلية شاهقة تطل على كامل خليج الناظور ومارشيكا، وجهة مفضلة لعشاق الهواء النقي والإطلالات البانورامية.',
    image: '/assets/place-gourougou-mountain.webp',
  },
  {
    id: 'charrana',
    title: 'شاطئ شعرانة',
    area: 'شعرانة',
    category: 'beaches',
    description: 'سحر الطبيعة العذراء والمنحدرات الصخرية الممتدة على مياه المتوسط الفيروزية.',
    image: '/assets/place-charrana.webp',
  },
  {
    id: 'gourougou_forest',
    title: 'غابة كوروكو',
    area: 'كوروكو',
    category: 'mountains',
    description: 'مساحات خضراء غنية بأشجار الصنوبر ومسارات المشي والتنزه العائلي المظلل.',
    image: '/assets/place-gourougou-forest.webp',
  },
  {
    id: 'bocana',
    title: 'بوكانة واللسان الرملي',
    area: 'بوكانة',
    category: 'beaches',
    description: 'شريط رملي فريد يفصل بين هدوء بحيرة مارشيكا وأمواج البحر الأبيض المتوسط.',
    image: '/assets/place-bocana.webp',
  },
  {
    id: 'ras_el_ma',
    title: 'رأس الماء (قابوياوا)',
    area: 'رأس الماء',
    category: 'beaches',
    description: 'جروف ساحلية ساحرة وميناء صيد تقليدي مع شواطئ رملية ممتدة.',
    image: '/assets/place-ras-el-ma.webp',
  },
  {
    id: 'boat_tour',
    title: 'جولة القوارب في مارشيكا',
    area: 'مارشيكا',
    category: 'lagoon',
    description: 'تجربة بحرية ممتعة بين ضفاف البحيرة لاستكشاف الحياة الفطرية والطيور المهاجرة.',
    image: '/assets/activity-marchica-boat.webp',
  },
  {
    id: 'kasbah_selouane',
    title: 'قصبة سلوان التاريخية',
    area: 'سلوان',
    category: 'culture',
    description: 'معلم تاريخي أثري يشهد على عمق الحضارة والدفاع العريق في منطقة الريف.',
    image: '/assets/culture-selouane-kasbah.webp',
  },
  {
    id: 'amazigh_heritage',
    title: 'أصالة التراث الريفي الأمازيغي',
    area: 'الريف',
    category: 'culture',
    description: 'عراقة الفخار والنسيج والتقاليد الشعبية النابعة من هوية الريف الأصيلة.',
    image: '/assets/culture-rif-amazigh.webp',
  },
]

export default function ImageGallery() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const categories = [
    { id: 'all', label: t('الكل') },
    { id: 'lagoon', label: t('بحيرة مارشيكا') },
    { id: 'mountains', label: t('جبل كوروكو والغابات') },
    { id: 'beaches', label: t('الشواطئ والساحل') },
    { id: 'culture', label: t('التراث والثقافة') },
  ]

  const filteredItems = defaultGalleryItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  )

  const currentIndex = selectedItem
    ? filteredItems.findIndex((it) => it.id === selectedItem.id)
    : -1

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1])
    } else {
      setSelectedItem(filteredItems[filteredItems.length - 1])
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1])
    } else {
      setSelectedItem(filteredItems[0])
    }
  }

  return (
    <section id="gallery" className="scroll-mt-20 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 font-display text-sm font-bold text-accent">
              <Sparkles className="h-4 w-4" />
              <span>{t('معرض الصور التفاعلي')}</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl text-foreground">
              {t('جمال الناظور في لقطات حية')}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
              {t('جولة بصرية بين مياه مارشيكا الزرقاء وقمم كوروكو الشامخة والشواطئ الطبيعية العذراء.')}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 md:pt-0" role="tablist" aria-label={t('تصنيفات المعرض')}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                    : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat.id === 'all' && <Filter className="h-3.5 w-3.5" />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Animated Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Container with Lazy Loading */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
                  <SafeImage
                    src={item.image}
                    alt={t(item.title)}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Floating Area Tag */}
                  <div className="absolute start-3 top-3 z-10 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md shadow-sm">
                    <MapPin className="h-3 w-3 text-accent" />
                    <span>{t(item.area)}</span>
                  </div>

                  {/* Expand Overlay Button */}
                  <div className="absolute end-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
                    <Expand className="h-4 w-4" />
                  </div>

                  {/* Subtle Gradient Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {t(item.title)}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-6 text-muted-foreground">
                    {t(item.description)}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal with Full-Screen Preview */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-card border border-border shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background shadow-md"
                  aria-label={t('إغلاق')}
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute start-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg transition-transform hover:scale-110 hover:bg-background"
                  aria-label={t('الصورة السابقة')}
                >
                  <ChevronRight className="h-6 w-6 rtl:rotate-0 ltr:rotate-180" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute end-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg transition-transform hover:scale-110 hover:bg-background"
                  aria-label={t('الصورة التالية')}
                >
                  <ChevronLeft className="h-6 w-6 rtl:rotate-0 ltr:rotate-180" />
                </button>

                {/* Modal Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <SafeImage
                    src={selectedItem.image}
                    alt={t(selectedItem.title)}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Modal Footer Description */}
                <div className="p-6 md:p-8">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                      <MapPin className="h-3.5 w-3.5" />
                      {t(selectedItem.area)}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {currentIndex + 1} / {filteredItems.length}
                    </span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">
                    {t(selectedItem.title)}
                  </h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {t(selectedItem.description)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
