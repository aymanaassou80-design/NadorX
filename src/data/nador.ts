export const places = [
  { name: 'شاطئ شعرانة', area: 'شعرانة', note: 'ساحل صخري ومشهد بحري؛ تحقّق من حالة البحر قبل السباحة.', image: '/assets/place-charrana.webp' },
  { name: 'بوكانة', area: 'بوكانة', note: 'أجواء شاطئية قرب البحيرة؛ راجع ظروف الوصول والسباحة.', image: '/assets/place-bocana.webp' },
  { name: 'بحيرة مارشيكا', area: 'الناظور', note: 'ممشى وإطلالات واسعة على مياه البحيرة.', image: '/assets/place-marchica.webp' },
  { name: 'رأس الماء', area: 'رأس الماء', note: 'شاطئ ورحلة ساحلية؛ خطّط للتنقّل مسبقاً.', image: '/assets/place-ras-el-ma.webp' },
  { name: 'جبل كوروكو', area: 'كوروكو', note: 'إطلالات مرتفعة على الساحل والبحيرة.', image: '/assets/place-gourougou-mountain.webp' },
  { name: 'غابة كوروكو', area: 'كوروكو', note: 'مسارات ومناطق ظل؛ اختر حذاءً مناسباً.', image: '/assets/place-gourougou-forest.webp' },
]

export const activities = [
  { name: 'جولة بالقارب في مارشيكا', note: 'استكشف البحيرة مع مشغّل محلي بعد التحقّق من المواعيد والأسعار.', suitable: 'للعائلات والشباب', image: '/assets/activity-marchica-boat.webp' },
  { name: 'تنزّه في كوروكو', note: 'أحضر الماء وحذاءً مناسباً، وتحقّق من حالة المسار قبل الانطلاق.', suitable: 'لمن يحبّ المشي', image: '/assets/activity-gourougou-hike.webp' },
  { name: 'يوم سباحة في شعرانة', note: 'راقب حالة البحر واختر منطقة آمنة؛ لا توجد ضمانات للسباحة.', suitable: 'بحسب حالة البحر', image: '/assets/activity-charrana-swim.webp' },
]

export const dining = [
  { name: 'مطعم سمك بالكورنيش', type: 'مطعم', area: 'الكورنيش', note: 'مأكولات بحرية — إدراج توضيحي يحتاج إلى التحقّق من الاسم والعنوان.', image: '/assets/dining-corniche-seafood.webp' },
  { name: 'مطعم ريفي بوسط الناظور', type: 'مطعم', area: 'وسط الناظور', note: 'أطباق محلية — تُضاف البيانات التجارية بعد التأكيد.', image: '/assets/dining-nador-rif.webp' },
  { name: 'مطعم عائلي قرب مارشيكا', type: 'مطعم', area: 'مارشيكا', note: 'وجبات مناسبة للمجموعات — نموذج دليل غير مؤكّد.', image: '/assets/dining-marchica-family.webp' },
  { name: 'مقهى مطل على مارشيكا', type: 'مقهى', area: 'مارشيكا', note: 'جلسة على البحيرة — تحقّق من الموقع وساعات العمل.', image: '/assets/cafe-marchica-view.webp' },
  { name: 'مقهى بالكورنيش', type: 'مقهى', area: 'الكورنيش', note: 'استراحة بعد التنزّه — نموذج إدراج يحتاج إلى التحقّق.', image: '/assets/cafe-nador-corniche.webp' },
  { name: 'مقهى قرب رأس الماء', type: 'مقهى', area: 'رأس الماء', note: 'توقّف خلال الرحلة الساحلية — الاسم التجاري غير مؤكّد.', image: '/assets/cafe-ras-el-ma.webp' },
]

export const itineraries = [
  { name: 'يوم عائلي', audience: 'وقت هادئ للجميع', image: '/assets/itinerary-family.webp', steps: ['صباح عند مارشيكا', 'غداء قرب الكورنيش', 'نزهة هادئة عند الغروب'] },
  { name: 'يوم للشباب', audience: 'طبيعة وحركة', image: '/assets/itinerary-youth.webp', steps: ['انطلاق مبكر إلى كوروكو', 'استراحة في المدينة', 'زيارة شعرانة بحسب الطقس وحالة البحر'] },
]

export const culture = [
  { name: 'قصبة سلوان', note: 'محطة للتعرّف إلى تاريخ المنطقة. تحقّق من إمكانية الزيارة قبل التوجّه.', image: '/assets/culture-selouane-kasbah.webp' },
  { name: 'التراث الأمازيغي الريفي', note: 'لغة وحِرف ومذاقات حاضرة في الحياة المحلية؛ اقترب منها باحترام ومن دون اختزال.', image: '/assets/culture-rif-amazigh.webp' },
]

export const services = [
  { name: 'مرشدون محليون', note: 'نوع الجولة واللغة ونقطة اللقاء تُعرض بعد التحقّق من مقدّمي الخدمة.', image: '/assets/service-local-guides.webp' },
  { name: 'تأجير معدات الأنشطة البحرية', note: 'الموقع والتجهيزات وشروط السلامة تُضاف بعد التحقّق. هذه فئة دليل وليست توصية بمزوّد.', image: '/assets/service-sea-equipment.webp' },
]
