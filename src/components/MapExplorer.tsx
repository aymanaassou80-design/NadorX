import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Navigation } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Spot = { name: string; detail: string; position: [number, number] }
type Category = { id: string; label: string; spots: Spot[] }

const categories: Category[] = [
  { id: 'beaches', label: 'الشواطئ', spots: [
    { name: 'شاطئ شعرانة', detail: 'الموقع التقريبي للشاطئ — تحقّق من حالة البحر والوصول.', position: [35.281, -2.966] },
    { name: 'بوكانة', detail: 'منطقة الشاطئ واللسان الرملي قرب مارشيكا.', position: [35.231, -2.918] },
    { name: 'رأس الماء', detail: 'منطقة ساحلية — راجع وسائل النقل وظروف البحر.', position: [35.119, -2.425] },
  ] },
  { id: 'lagoon', label: 'البحيرة والبحر', spots: [
    { name: 'بحيرة مارشيكا', detail: 'إطلالة وممشى على البحيرة قرب الناظور.', position: [35.205, -2.925] },
    { name: 'واجهة الناظور البحرية', detail: 'منطقة الواجهة البحرية والكورنيش.', position: [35.171, -2.928] },
    { name: 'بوكانة', detail: 'منطقة اتصال البحيرة بالمتوسط.', position: [35.231, -2.918] },
  ] },
  { id: 'mountains', label: 'الجبال', spots: [
    { name: 'جبل كوروكو', detail: 'منطقة جبلية بإطلالات على الناظور ومارشيكا.', position: [35.159, -2.976] },
    { name: 'مداخل كوروكو', detail: 'نقاط انطلاق تقريبية للمسارات؛ تحقّق من الطريق.', position: [35.146, -2.962] },
  ] },
  { id: 'forest', label: 'الغابات', spots: [
    { name: 'غابة كوروكو', detail: 'منطقة غابوية ومسارات مشي تقريبية.', position: [35.166, -2.991] },
    { name: 'مسارات كوروكو', detail: 'المسارات قد تتغير؛ تحقّق من الظروف قبل الانطلاق.', position: [35.151, -2.985] },
  ] },
  { id: 'activities', label: 'الأنشطة', spots: [
    { name: 'جولات القوارب — مارشيكا', detail: 'نقطة عامة؛ المواعيد والمزوّدون غير مؤكّدين.', position: [35.203, -2.93] },
    { name: 'المشي — كوروكو', detail: 'منطقة انطلاق تقريبية؛ تحقّق من المسار والطقس.', position: [35.159, -2.976] },
    { name: 'السباحة — شعرانة', detail: 'السباحة رهينة بحالة البحر والسلامة.', position: [35.281, -2.966] },
  ] },
  { id: 'dining', label: 'المطاعم والمقاهي', spots: [
    { name: 'الكورنيش', detail: 'منطقة بحث عامة وليست أسماء محلات مؤكّدة.', position: [35.171, -2.928] },
    { name: 'وسط الناظور', detail: 'منطقة بحث عامة للمطاعم والمقاهي.', position: [35.168, -2.934] },
    { name: 'مارشيكا', detail: 'منطقة بحث عامة قرب البحيرة.', position: [35.205, -2.925] },
    { name: 'رأس الماء', detail: 'منطقة بحث عامة؛ تحقّق من العناوين وساعات العمل.', position: [35.119, -2.425] },
  ] },
  { id: 'culture', label: 'الثقافة', spots: [
    { name: 'قصبة سلوان', detail: 'موقع تقريبي في سلوان؛ تحقّق من إمكانية الزيارة.', position: [35.073, -2.942] },
    { name: 'التراث الريفي الأمازيغي', detail: 'نطاق ثقافي واسع، وليس معلماً واحداً.', position: [35.168, -2.934] },
  ] },
  { id: 'services', label: 'الخدمات السياحية', spots: [
    { name: 'خدمات الإرشاد المحلي', detail: 'نطاق بحث عام؛ لا يمثّل مزوّداً مؤكّداً.', position: [35.168, -2.934] },
    { name: 'معدات الأنشطة البحرية', detail: 'منطقة ساحلية عامة؛ التوفّر غير مؤكّد.', position: [35.231, -2.918] },
  ] },
]

export default function MapExplorer() {
  const { t } = useTranslation()
  const mapElement = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('beaches')
  const category = categories.find((item) => item.id === active) ?? categories[0]

  useEffect(() => {
    if (!mapElement.current) return
    const map = L.map(mapElement.current, { scrollWheelZoom: false, zoomControl: false })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: t('© مساهمو OpenStreetMap'),
    }).addTo(map)
    L.control.zoom({ position: 'topright' }).addTo(map)
    category.spots.forEach((spot) => {
      L.circleMarker(spot.position, { radius: 8, color: '#f7f5ef', weight: 3, fillColor: '#b38a32', fillOpacity: 1 })
        .addTo(map).bindPopup(`<strong>${t(spot.name)}</strong><br>${t(spot.detail)}`)
    })
    map.fitBounds(L.latLngBounds(category.spots.map((spot) => spot.position)), { padding: [38, 38], maxZoom: 11 })
    const timer = window.setTimeout(() => map.invalidateSize(), 120)
    return () => { window.clearTimeout(timer); map.remove() }
  }, [category, t])

  return (
    <section id="maps" className="scroll-mt-20 bg-muted/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 grid gap-4 border-b border-border pb-5 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-8">
          <span className="font-display text-sm font-bold text-accent">08 {t('/ دليل الناظور')}</span>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">{t('خريطة تفاعلية لكل فئة')}</h2>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">{t('بدّل الفئة لاستعراض مواقعها على الخريطة، ثم افتح العلامة لمعرفة التفاصيل.')}</p>
        </div>
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label={t('فئات الخريطة')}>
          {categories.map((item) => <button key={item.id} type="button" role="tab" aria-selected={active === item.id} onClick={() => setActive(item.id)} className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-bold transition-colors ${active === item.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:border-primary'}`}><MapPin className="h-4 w-4" />{t(item.label)}</button>)}
        </div>
        <div className="grid overflow-hidden border border-border bg-card lg:grid-cols-[1.5fr_0.7fr]">
          <div ref={mapElement} className="h-[420px] min-h-[340px] w-full bg-muted md:h-[540px]" aria-label={t('خريطة مواقع الناظور')} />
          <aside className="p-5 md:p-7">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-4"><div><h3 className="text-xl font-bold">{t(category.label)}</h3><p className="mt-1 text-sm text-muted-foreground">{category.spots.length} {t('مواقع على الخريطة')}</p></div><Navigation className="h-5 w-5 text-accent" /></div>
            <ul className="space-y-1">{category.spots.map((spot, index) => <li key={`${category.id}-${spot.name}`}><a href={`https://www.openstreetmap.org/?mlat=${spot.position[0]}&mlon=${spot.position[1]}#map=13/${spot.position[0]}/${spot.position[1]}`} target="_blank" rel="noreferrer" className="flex items-start gap-3 border-b border-border/70 py-3 text-start transition-colors hover:bg-muted/60"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-foreground">{index + 1}</span><span><strong className="block text-sm">{t(spot.name)}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{t(spot.detail)}</span></span></a></li>)}</ul>
            <p className="mt-5 border-s-2 border-accent ps-3 text-xs leading-6 text-muted-foreground">{t('العلامات تقريبية، وبعض فئات المطاعم والخدمات تشير إلى مناطق عامة لا إلى مزوّدين مؤكّدين. استخدم الخريطة للتوجيه الأولي فقط.')}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}