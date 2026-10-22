// Mirrors app/src/main/java/com/example/nador/data/NadorData.kt for the web version.
const T = (ar, en, fr) => ({ ar, en, fr });
const img = (name) => `/assets/${name}.webp`;

window.NADOR = {
  hero: img("nador-coast-hero"),
  story: img("nador-landscape-story"),
  places: [
    { id: "charrana", name: T("شاطئ شعرانة", "Charrana Beach", "Plage de Charrana"), area: T("شعرانة", "Charrana", "Charrana"), note: T("ساحل صخري ومشهد بحري؛ تحقّق من حالة البحر قبل السباحة.", "Rocky coastline and seascape; check sea conditions before swimming.", "Côte rocheuse et paysage marin ; vérifiez l'état de la mer avant de nager."), image: img("place-charrana"), cat: "beaches", lat: 35.281, lng: -2.966 },
    { id: "bocana", name: T("بوكانة", "Boukana", "Boukana"), area: T("بوكانة", "Boukana", "Boukana"), note: T("أجواء شاطئية قرب البحيرة؛ راجع ظروف الوصول والسباحة.", "Beach atmosphere near the lagoon; check access and swimming conditions.", "Ambiance de plage près de la lagune ; vérifiez les conditions d'accès et de baignade."), image: img("place-bocana"), cat: "beaches", lat: 35.231, lng: -2.918 },
    { id: "marchica", name: T("بحيرة مارشيكا", "Marchica Lagoon", "Lagune de Marchica"), area: T("الناظور", "Nador", "Nador"), note: T("ممشى وإطلالات واسعة على مياه البحيرة.", "A promenade with expansive views over the lagoon.", "Une promenade avec de vastes vues sur les eaux de la lagune."), image: img("place-marchica"), cat: "lagoon", lat: 35.205, lng: -2.925 },
    { id: "ras_el_ma", name: T("رأس الماء", "Ras El Ma", "Ras El Ma"), area: T("رأس الماء", "Ras El Ma", "Ras El Ma"), note: T("شاطئ ورحلة ساحلية؛ خطّط للتنقّل مسبقاً.", "A beach and coastal outing; plan your transportation in advance.", "Une plage et une excursion côtière ; planifiez votre transport à l'avance."), image: img("place-ras-el-ma"), cat: "beaches", lat: 35.119, lng: -2.425 },
    { id: "gourougou_mountain", name: T("جبل كوروكو", "Mount Gourougou", "Mont Gourougou"), area: T("كوروكو", "Gourougou", "Gourougou"), note: T("إطلالات مرتفعة على الساحل والبحيرة.", "Elevated views of the coast and lagoon.", "Vues panoramiques élevées sur la côte et la lagune."), image: img("place-gourougou-mountain"), cat: "mountains", lat: 35.159, lng: -2.976 },
    { id: "gourougou_forest", name: T("غابة كوروكو", "Gourougou Forest", "Forêt de Gourougou"), area: T("كوروكو", "Gourougou", "Gourougou"), note: T("مسارات ومناطق ظل؛ اختر حذاءً مناسباً.", "Trails and shaded areas; wear suitable footwear.", "Sentiers et zones ombragées ; portez des chaussures adaptées."), image: img("place-gourougou-forest"), cat: "forest", lat: 35.166, lng: -2.991 }
  ],
  activities: [
    { id: "boat_marchica", name: T("جولة بالقارب في مارشيكا", "Boat Tour on Marchica", "Balade en bateau sur Marchica"), note: T("استكشف البحيرة مع مشغّل محلي بعد التحقّق من المواعيد والأسعار.", "Explore the lagoon with a local operator after checking schedules and prices.", "Explorez la lagune avec un opérateur local après vérification des horaires et tarifs."), suitable: T("للعائلات والشباب", "For families and young people", "Pour familles et jeunes"), image: img("activity-marchica-boat") },
    { id: "hike_gourougou", name: T("تنزّه في كوروكو", "Hike in Gourougou", "Randonnée à Gourougou"), note: T("أحضر الماء وحذاءً مناسباً، وتحقّق من حالة المسار قبل الانطلاق.", "Bring water and suitable footwear, and check trail conditions before setting out.", "Apportez de l'eau et des chaussures appropriées, et vérifiez l'état du sentier avant de partir."), suitable: T("لمن يحبّ المشي", "For those who enjoy walking", "Pour les amateurs de marche"), image: img("activity-gourougou-hike") },
    { id: "swim_charrana", name: T("يوم سباحة في شعرانة", "A Day of Swimming at Charrana", "Journée baignade à Charrana"), note: T("راقب حالة البحر واختر منطقة آمنة؛ لا توجد ضمانات للسباحة.", "Check sea conditions and choose a safe area; swimming cannot be guaranteed.", "Surveillez l'état de la mer et choisissez une zone sécurisée."), suitable: T("بحسب حالة البحر", "Depending on sea conditions", "Selon l'état de la mer"), image: img("activity-charrana-swim") }
  ],
  dining: [
    { id: "dining_corniche_seafood", name: T("مطعم سمك بالكورنيش", "Seafood Restaurant on the Corniche", "Restaurant de poissons sur la Corniche"), restaurant: true, area: "corniche", note: T("مأكولات بحرية — إدراج توضيحي يحتاج إلى التحقّق من الاسم والعنوان.", "Seafood — illustrative listing; the name and address need to be verified.", "Fruits de mer — fiche illustrative à vérifier sur place."), image: img("dining-corniche-seafood"), lat: 35.171, lng: -2.928 },
    { id: "dining_nador_rif", name: T("مطعم ريفي بوسط الناظور", "Rif Restaurant in Central Nador", "Restaurant traditionnel au centre de Nador"), restaurant: true, area: "center", note: T("أطباق محلية — تُضاف البيانات التجارية بعد التأكيد.", "Local dishes — business details will be added once confirmed.", "Plats locaux rifains — détails commerciaux à confirmer."), image: img("dining-nador-rif"), lat: 35.168, lng: -2.934 },
    { id: "dining_marchica_family", name: T("مطعم عائلي قرب مارشيكا", "Family Restaurant Near Marchica", "Restaurant familial près de Marchica"), restaurant: true, area: "marchica", note: T("وجبات مناسبة للمجموعات — نموذج دليل غير مؤكّد.", "Meals suitable for groups — an unverified directory listing example.", "Repas adaptés aux familles et groupes près de la lagune."), image: img("dining-marchica-family"), lat: 35.205, lng: -2.925 },
    { id: "cafe_marchica_view", name: T("مقهى مطل على مارشيكا", "Café Overlooking Marchica", "Café avec vue sur Marchica"), restaurant: false, area: "marchica", note: T("جلسة على البحيرة — تحقّق من الموقع وساعات العمل.", "A place to relax by the lagoon — check the location and opening hours.", "Espace détente au bord de la lagune — vérifiez les horaires."), image: img("cafe-marchica-view"), lat: 35.205, lng: -2.925 },
    { id: "cafe_nador_corniche", name: T("مقهى بالكورنيش", "Café on the Corniche", "Café sur la Corniche"), restaurant: false, area: "corniche", note: T("استراحة بعد التنزّه — نموذج إدراج يحتاج إلى التحقّق.", "A break after a walk — a sample listing that needs verification.", "Une pause café après votre promenade sur la corniche."), image: img("cafe-nador-corniche"), lat: 35.171, lng: -2.928 },
    { id: "cafe_ras_el_ma", name: T("مقهى قرب رأس الماء", "Café Near Ras El Ma", "Café près de Ras El Ma"), restaurant: false, area: "ras-el-ma", note: T("توقّف خلال الرحلة الساحلية — الاسم التجاري غير مؤكّد.", "A stop during a coastal trip — the business name is unconfirmed.", "Halte rafraîchissante pendant votre excursion côtière."), image: img("cafe-ras-el-ma"), lat: 35.119, lng: -2.425 }
  ],
  itineraries: [
    { id: "family_day", name: T("يوم عائلي", "Family Day", "Journée en Famille"), audience: T("وقت هادئ للجميع", "A peaceful time for everyone", "Un moment paisible pour tous"), image: img("itinerary-family"), steps: [T("صباح عند مارشيكا", "Morning at Marchica", "Matinée à Marchica"), T("غداء قرب الكورنيش", "Lunch near the waterfront", "Déjeuner près de la corniche"), T("نزهة هادئة عند الغروب", "A peaceful sunset stroll", "Promenade tranquille au coucher du soleil")] },
    { id: "youth_day", name: T("يوم للشباب", "Day for Young People", "Journée Jeunesse & Aventure"), audience: T("طبيعة وحركة", "Nature and activity", "Nature et dynamisme"), image: img("itinerary-youth"), steps: [T("انطلاق مبكر إلى كوروكو", "An early start for Gourougou", "Départ matinal vers Gourougou"), T("استراحة في المدينة", "A break in the city", "Pause déjeuner en ville"), T("زيارة شعرانة بحسب الطقس وحالة البحر", "A visit to Charrana, depending on the weather and sea conditions", "Visite de Charrana selon les conditions météo")] }
  ],
  culture: [
    { id: "selouane_kasbah", name: T("قصبة سلوان", "Selouane Kasbah", "Kasbah de Selouane"), note: T("محطة للتعرّف إلى تاريخ المنطقة. تحقّق من إمكانية الزيارة قبل التوجّه.", "A place to learn about the area's history. Check whether visits are possible before heading there.", "Une étape pour découvrir l'histoire séculaire du Rif oriental."), image: img("culture-selouane-kasbah") },
    { id: "rif_amazigh", name: T("التراث الأمازيغي الريفي", "Riffian Amazigh Heritage", "Patrimoine Amazigh du Rif"), note: T("لغة وحِرف ومذاقات حاضرة في الحياة المحلية؛ اقترب منها باحترام ومن دون اختزال.", "Language, crafts, and flavors are part of local life; engage with them respectfully and without reducing them to stereotypes.", "Langue, artisanat et saveurs ancrés dans la vie locale rifaine."), image: img("culture-rif-amazigh") }
  ],
  services: [
    { id: "local_guides", name: T("مرشدون محليون", "Local Guides", "Guides Locaux"), note: T("نوع الجولة واللغة ونقطة اللقاء تُعرض بعد التحقّق من مقدّمي الخدمة.", "The tour type, language, and meeting point will be listed after service providers have been verified.", "Circuits guidés et accompagnement personnalisé à travers Nador et le Rif."), image: img("service-local-guides") },
    { id: "sea_equipment", name: T("تأجير معدات الأنشطة البحرية", "Water Sports Equipment Rental", "Location de matériel nautique"), note: T("الموقع والتجهيزات وشروط السلامة تُضاف بعد التحقّق. هذه فئة دليل وليست توصية بمزوّد.", "The location, facilities, and safety requirements will be added after verification. This is a directory category, not a provider recommendation.", "Kits de plongée, kayaks et équipements pour profiter des eaux de Marchica."), image: img("service-sea-equipment") }
  ],
  checklist: [
    { id: "c1", text: T("راجع الطقس وحالة البحر قبل الانطلاق.", "Check the weather and sea conditions before setting out.", "Vérifiez la météo et l'état de la mer avant de partir.") },
    { id: "c2", text: T("تحقّق مباشرةً من مواعيد الأماكن ووسائل النقل.", "Check opening hours and transportation options directly.", "Vérifiez directement les horaires et moyens de transport.") },
    { id: "c3", text: T("للعائلات: ماء ووسائل حماية من الشمس.", "For families: bring water and sun protection.", "Pour les familles : prévoyez de l'eau et une protection solaire.") },
    { id: "c4", text: T("لمحبي المشي: حذاء مناسب وخطة عودة.", "For walkers: wear suitable shoes and plan your return.", "Pour les randonneurs : chaussures adaptées et itinéraire retour.") }
  ]
};

window.UI = {
  title: T("اكتشف الناظور", "Discover Nador", "Découvrir Nador"),
  subtitle: T("دليل الزائر إلى الساحل والريف", "A visitor's guide to the coast and the Rif", "Le guide du visiteur de la côte et du Rif"),
  heroText: T("شواطئ المتوسط، بحيرة مارشيكا، غابات وجبل كوروكو، وتراث الريف الأمازيغي — في دليل واحد.", "Mediterranean beaches, Marchica Lagoon, the forests of Mount Gourougou and Riffian Amazigh heritage — all in one guide.", "Plages méditerranéennes, lagune de Marchica, forêts du Gourougou et patrimoine amazigh du Rif — en un seul guide."),
  explore: T("ابدأ الاستكشاف", "Start exploring", "Commencer"),
  safety: T("تنبيه السلامة: راجع حالة البحر والطقس قبل السباحة أو المسارات الجبلية.", "Safety notice: check sea and weather conditions before swimming or mountain trails.", "Sécurité : vérifiez l'état de la mer et la météo avant la baignade ou les sentiers de montagne."),
  nav: { places: T("الأماكن", "Places", "Lieux"), activities: T("الأنشطة", "Activities", "Activités"), dining: T("المطاعم", "Dining", "Restaurants"), plans: T("المسارات", "Itineraries", "Itinéraires"), culture: T("الثقافة", "Culture", "Culture"), map: T("الخريطة", "Map", "Carte") },
  cats: { all: T("الكل", "All", "Tout"), saved: T("المحفوظة", "Saved", "Favoris"), beaches: T("الشواطئ", "Beaches", "Plages"), lagoon: T("البحيرة والبحر", "Lagoon & Sea", "Lagune & Mer"), mountains: T("الجبال", "Mountains", "Montagnes"), forest: T("الغابات", "Forests", "Forêts") },
  diningKinds: { all: T("الكل", "All", "Tout"), restaurant: T("مطاعم", "Restaurants", "Restaurants"), cafe: T("مقاهي", "Cafés", "Cafés") },
  areas: { all: T("كل المناطق", "All areas", "Toutes les zones"), corniche: T("الكورنيش", "Corniche", "Corniche"), center: T("وسط الناظور", "Central Nador", "Centre de Nador"), marchica: T("مارشيكا", "Marchica", "Marchica"), "ras-el-ma": T("رأس الماء", "Ras El Ma", "Ras El Ma") },
  restaurant: T("مطعم", "Restaurant", "Restaurant"),
  cafe: T("مقهى", "Café", "Café"),
  search: T("ابحث عن أماكن، مطاعم، أنشطة…", "Search places, restaurants, activities…", "Rechercher lieux, restaurants, activités…"),
  openMap: T("فتح في الخريطة", "Open in map", "Ouvrir la carte"),
  save: T("حفظ", "Save", "Enregistrer"),
  saved: T("تم الحفظ", "Saved", "Enregistré"),
  empty: T("لا توجد نتائج.", "No results.", "Aucun résultat."),
  services: T("خدمات سياحية", "Tourism services", "Services touristiques"),
  checklist: T("قائمة التحضير", "Travel checklist", "Liste de préparation"),
  mapText: T("اختر مكاناً لعرضه على الخريطة.", "Pick a place to show it on the map.", "Choisissez un lieu pour l'afficher sur la carte."),
  footer: T("المعلومات إرشادية؛ تحقّق دائماً من الظروف والمواعيد محلياً.", "Information is indicative; always check conditions and hours locally.", "Informations indicatives ; vérifiez toujours les conditions et horaires sur place.")
};
