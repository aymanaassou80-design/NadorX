package com.example.nador.data

object NadorData {
    val places = listOf(
        Place(
            id = "charrana",
            name = TranslatableText("شاطئ شعرانة", "Charrana Beach", "Plage de Charrana"),
            area = TranslatableText("شعرانة", "Charrana", "Charrana"),
            note = TranslatableText(
                "ساحل صخري ومشهد بحري؛ تحقّق من حالة البحر قبل السباحة.",
                "Rocky coastline and seascape; check sea conditions before swimming.",
                "Côte rocheuse et paysage marin ; vérifiez l'état de la mer avant de nager."
            ),
            imageUrl = "drawable/img_charrana_beach",
            categoryId = "beaches",
            latitude = 35.281,
            longitude = -2.966
        ),
        Place(
            id = "bocana",
            name = TranslatableText("بوكانة", "Boukana", "Boukana"),
            area = TranslatableText("بوكانة", "Boukana", "Boukana"),
            note = TranslatableText(
                "أجواء شاطئية قرب البحيرة؛ راجع ظروف الوصول والسباحة.",
                "Beach atmosphere near the lagoon; check access and swimming conditions.",
                "Ambiance de plage près de la lagune ; vérifiez les conditions d'accès et de baignade."
            ),
            imageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
            categoryId = "beaches",
            latitude = 35.231,
            longitude = -2.918
        ),
        Place(
            id = "marchica",
            name = TranslatableText("بحيرة مارشيكا", "Marchica Lagoon", "Lagune de Marchica"),
            area = TranslatableText("الناظور", "Nador", "Nador"),
            note = TranslatableText(
                "ممشى وإطلالات واسعة على مياه البحيرة.",
                "A promenade with expansive views over the lagoon.",
                "Une promenade avec de vastes vues sur les eaux de la lagune."
            ),
            imageUrl = "drawable/img_marchica_lagoon",
            categoryId = "lagoon",
            latitude = 35.205,
            longitude = -2.925
        ),
        Place(
            id = "ras_el_ma",
            name = TranslatableText("رأس الماء", "Ras El Ma", "Ras El Ma"),
            area = TranslatableText("رأس الماء", "Ras El Ma", "Ras El Ma"),
            note = TranslatableText(
                "شاطئ ورحلة ساحلية؛ خطّط للتنقّل مسبقاً.",
                "A beach and coastal outing; plan your transportation in advance.",
                "Une plage et une excursion côtière ; planifiez votre transport à l'avance."
            ),
            imageUrl = "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80",
            categoryId = "beaches",
            latitude = 35.119,
            longitude = -2.425
        ),
        Place(
            id = "gourougou_mountain",
            name = TranslatableText("جبل كوروكو", "Mount Gourougou", "Mont Gourougou"),
            area = TranslatableText("كوروكو", "Gourougou", "Gourougou"),
            note = TranslatableText(
                "إطلالات مرتفعة على الساحل والبحيرة.",
                "Elevated views of the coast and lagoon.",
                "Vues panoramiques élevées sur la côte et la lagune."
            ),
            imageUrl = "drawable/img_gourougou_mount",
            categoryId = "mountains",
            latitude = 35.159,
            longitude = -2.976
        ),
        Place(
            id = "gourougou_forest",
            name = TranslatableText("غابة كوروكو", "Gourougou Forest", "Forêt de Gourougou"),
            area = TranslatableText("كوروكو", "Gourougou", "Gourougou"),
            note = TranslatableText(
                "مسارات ومناطق ظل؛ اختر حذاءً مناسباً.",
                "Trails and shaded areas; wear suitable footwear.",
                "Sentiers et zones ombragées ; portez des chaussures adaptées."
            ),
            imageUrl = "drawable/img_gourougou_mount",
            categoryId = "forest",
            latitude = 35.166,
            longitude = -2.991
        )
    )

    val activities = listOf(
        ActivityItem(
            id = "boat_marchica",
            name = TranslatableText("جولة بالقارب في مارشيكا", "Boat Tour on Marchica", "Balade en bateau sur Marchica"),
            note = TranslatableText(
                "استكشف البحيرة مع مشغّل محلي بعد التحقّق من المواعيد والأسعار.",
                "Explore the lagoon with a local operator after checking schedules and prices.",
                "Explorez la lagune avec un opérateur local après vérification des horaires et tarifs."
            ),
            suitable = TranslatableText("للعائلات والشباب", "For families and young people", "Pour familles et jeunes"),
            imageUrl = "drawable/img_marchica_lagoon",
            categoryId = "lagoon"
        ),
        ActivityItem(
            id = "hike_gourougou",
            name = TranslatableText("تنزّه في كوروكو", "Hike in Gourougou", "Randonnée à Gourougou"),
            note = TranslatableText(
                "أحضر الماء وحذاءً مناسباً، وتحقّق من حالة المسار قبل الانطلاق.",
                "Bring water and suitable footwear, and check trail conditions before setting out.",
                "Apportez de l'eau et des chaussures appropriées, et vérifiez l'état du sentier avant de partir."
            ),
            suitable = TranslatableText("لمن يحبّ المشي", "For those who enjoy walking", "Pour les amateurs de marche"),
            imageUrl = "drawable/img_gourougou_mount",
            categoryId = "mountains"
        ),
        ActivityItem(
            id = "swim_charrana",
            name = TranslatableText("يوم سباحة في شعرانة", "A Day of Swimming at Charrana", "Journée baignade à Charrana"),
            note = TranslatableText(
                "راقب حالة البحر واختر منطقة آمنة؛ لا توجد ضمانات للسباحة.",
                "Check sea conditions and choose a safe area; swimming cannot be guaranteed.",
                "Surveillez l'état de la mer et choisissez une zone sécurisée."
            ),
            suitable = TranslatableText("بحسب حالة البحر", "Depending on sea conditions", "Selon l'état de la mer"),
            imageUrl = "drawable/img_charrana_beach",
            categoryId = "beaches"
        )
    )

    val dining = listOf(
        DiningSpot(
            id = "dining_corniche_seafood",
            name = TranslatableText("مطعم سمك بالكورنيش", "Seafood Restaurant on the Corniche", "Restaurant de poissons sur la Corniche"),
            type = TranslatableText("مطعم", "Restaurant", "Restaurant"),
            isRestaurant = true,
            area = TranslatableText("الكورنيش", "Corniche", "Corniche"),
            areaKey = "corniche",
            note = TranslatableText(
                "مأكولات بحرية — إدراج توضيحي يحتاج إلى التحقّق من الاسم والعنوان.",
                "Seafood — illustrative listing; the name and address need to be verified.",
                "Fruits de mer — fiche illustrative à vérifier sur place."
            ),
            imageUrl = "drawable/img_nador_seafood",
            latitude = 35.171,
            longitude = -2.928
        ),
        DiningSpot(
            id = "dining_nador_rif",
            name = TranslatableText("مطعم ريفي بوسط الناظور", "Rif Restaurant in Central Nador", "Restaurant traditionnel au centre de Nador"),
            type = TranslatableText("مطعم", "Restaurant", "Restaurant"),
            isRestaurant = true,
            area = TranslatableText("وسط الناظور", "Central Nador", "Centre de Nador"),
            areaKey = "center",
            note = TranslatableText(
                "أطباق محلية — تُضاف البيانات التجارية بعد التأكيد.",
                "Local dishes — business details will be added once confirmed.",
                "Plats locaux rifains — détails commerciaux à confirmer."
            ),
            imageUrl = "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80",
            latitude = 35.168,
            longitude = -2.934
        ),
        DiningSpot(
            id = "dining_marchica_family",
            name = TranslatableText("مطعم عائلي قرب مارشيكا", "Family Restaurant Near Marchica", "Restaurant familial près de Marchica"),
            type = TranslatableText("مطعم", "Restaurant", "Restaurant"),
            isRestaurant = true,
            area = TranslatableText("مارشيكا", "Marchica", "Marchica"),
            areaKey = "marchica",
            note = TranslatableText(
                "وجبات مناسبة للمجموعات — نموذج دليل غير مؤكّد.",
                "Meals suitable for groups — an unverified directory listing example.",
                "Repas adaptés aux familles et groupes près de la lagune."
            ),
            imageUrl = "drawable/img_nador_seafood",
            latitude = 35.205,
            longitude = -2.925
        ),
        DiningSpot(
            id = "cafe_marchica_view",
            name = TranslatableText("مقهى مطل على مارشيكا", "Café Overlooking Marchica", "Café avec vue sur Marchica"),
            type = TranslatableText("مقهى", "Café", "Café"),
            isRestaurant = false,
            area = TranslatableText("مارشيكا", "Marchica", "Marchica"),
            areaKey = "marchica",
            note = TranslatableText(
                "جلسة على البحيرة — تحقّق من الموقع وساعات العمل.",
                "A place to relax by the lagoon — check the location and opening hours.",
                "Espace détente au bord de la lagune — vérifiez les horaires."
            ),
            imageUrl = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
            latitude = 35.205,
            longitude = -2.925
        ),
        DiningSpot(
            id = "cafe_nador_corniche",
            name = TranslatableText("مقهى بالكورنيش", "Café on the Corniche", "Café sur la Corniche"),
            type = TranslatableText("مقهى", "Café", "Café"),
            isRestaurant = false,
            area = TranslatableText("الكورنيش", "Corniche", "Corniche"),
            areaKey = "corniche",
            note = TranslatableText(
                "استراحة بعد التنزّه — نموذج إدراج يحتاج إلى التحقّق.",
                "A break after a walk — a sample listing that needs verification.",
                "Une pause café après votre promenade sur la corniche."
            ),
            imageUrl = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
            latitude = 35.171,
            longitude = -2.928
        ),
        DiningSpot(
            id = "cafe_ras_el_ma",
            name = TranslatableText("مقهى قرب رأس الماء", "Café Near Ras El Ma", "Café près de Ras El Ma"),
            type = TranslatableText("مقهى", "Café", "Café"),
            isRestaurant = false,
            area = TranslatableText("رأس الماء", "Ras El Ma", "Ras El Ma"),
            areaKey = "ras-el-ma",
            note = TranslatableText(
                "توقّف خلال الرحلة الساحلية — الاسم التجاري غير مؤكّد.",
                "A stop during a coastal trip — the business name is unconfirmed.",
                "Halte rafraîchissante pendant votre excursion côtière."
            ),
            imageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
            latitude = 35.119,
            longitude = -2.425
        )
    )

    val itineraries = listOf(
        Itinerary(
            id = "family_day",
            name = TranslatableText("يوم عائلي", "Family Day", "Journée en Famille"),
            audience = TranslatableText("وقت هادئ للجميع", "A peaceful time for everyone", "Un moment paisible pour tous"),
            imageUrl = "drawable/img_marchica_lagoon",
            steps = listOf(
                TranslatableText("صباح عند مارشيكا", "Morning at Marchica", "Matinée à Marchica"),
                TranslatableText("غداء قرب الكورنيش", "Lunch near the waterfront", "Déjeuner près de la corniche"),
                TranslatableText("نزهة هادئة عند الغروب", "A peaceful sunset stroll", "Promenade tranquille au coucher du soleil")
            )
        ),
        Itinerary(
            id = "youth_day",
            name = TranslatableText("يوم للشباب", "Day for Young People", "Journée Jeunesse & Aventure"),
            audience = TranslatableText("طبيعة وحركة", "Nature and activity", "Nature et dynamisme"),
            imageUrl = "drawable/img_gourougou_mount",
            steps = listOf(
                TranslatableText("انطلاق مبكر إلى كوروكو", "An early start for Gourougou", "Départ matinal vers Gourougou"),
                TranslatableText("استراحة في المدينة", "A break in the city", "Pause déjeuner en ville"),
                TranslatableText("زيارة شعرانة بحسب الطقس وحالة البحر", "A visit to Charrana, depending on the weather and sea conditions", "Visite de Charrana selon les conditions météo")
            )
        )
    )

    val culture = listOf(
        CultureItem(
            id = "selouane_kasbah",
            name = TranslatableText("قصبة سلوان", "Selouane Kasbah", "Kasbah de Selouane"),
            note = TranslatableText(
                "محطة للتعرّف إلى تاريخ المنطقة. تحقّق من إمكانية الزيارة قبل التوجّه.",
                "A place to learn about the area's history. Check whether visits are possible before heading there.",
                "Une étape pour découvrir l'histoire séculaire du Rif oriental."
            ),
            imageUrl = "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&auto=format&fit=crop&q=80"
        ),
        CultureItem(
            id = "rif_amazigh",
            name = TranslatableText("التراث الأمازيغي الريفي", "Riffian Amazigh Heritage", "Patrimoine Amazigh du Rif"),
            note = TranslatableText(
                "لغة وحِرف ومذاقات حاضرة في الحياة المحلية؛ اقترب منها باحترام ومن دون اختزال.",
                "Language, crafts, and flavors are part of local life; engage with them respectfully and without reducing them to stereotypes.",
                "Langue, artisanat et saveurs ancrés dans la vie locale rifaine."
            ),
            imageUrl = "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80"
        )
    )

    val services = listOf(
        TourismService(
            id = "local_guides",
            name = TranslatableText("مرشدون محليون", "Local Guides", "Guides Locaux"),
            note = TranslatableText(
                "نوع الجولة واللغة ونقطة اللقاء تُعرض بعد التحقّق من مقدّمي الخدمة.",
                "The tour type, language, and meeting point will be listed after service providers have been verified.",
                "Circuits guidés et accompagnement personnalisé à travers Nador et le Rif."
            ),
            imageUrl = "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80"
        ),
        TourismService(
            id = "sea_equipment",
            name = TranslatableText("تأجير معدات الأنشطة البحرية", "Water Sports Equipment Rental", "Location de matériel nautique"),
            note = TranslatableText(
                "الموقع والتجهيزات وشروط السلامة تُضاف بعد التحقّق. هذه فئة دليل وليست توصية بمزوّد.",
                "The location, facilities, and safety requirements will be added after verification. This is a directory category, not a provider recommendation.",
                "Kits de plongée, kayaks et équipements pour profiter des eaux de Marchica."
            ),
            imageUrl = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80"
        )
    )

    val mapCategories = listOf(
        MapCategory(
            id = "beaches",
            label = TranslatableText("الشواطئ", "Beaches", "Plages"),
            spots = listOf(
                MapSpot("charrana", TranslatableText("شاطئ شعرانة", "Charrana Beach", "Plage de Charrana"), TranslatableText("الموقع التقريبي للشاطئ — تحقّق من حالة البحر والوصول.", "Approximate beach location — check sea conditions and access.", "Plage sauvage côtière."), 35.281, -2.966, "beaches"),
                MapSpot("bocana", TranslatableText("بوكانة", "Boukana", "Boukana"), TranslatableText("منطقة الشاطئ واللسان الرملي قرب مارشيكا.", "Beach and sandbar area near Marchica.", "Cordon littoral de Marchica."), 35.231, -2.918, "beaches"),
                MapSpot("ras_el_ma", TranslatableText("رأس الماء", "Ras El Ma", "Ras El Ma"), TranslatableText("منطقة ساحلية — راجع وسائل النقل وظروف البحر.", "Coastal area — check transport options and sea conditions.", "Falaises et plage de Ras El Ma."), 35.119, -2.425, "beaches")
            )
        ),
        MapCategory(
            id = "lagoon",
            label = TranslatableText("البحيرة والبحر", "Lagoon & Sea", "Lagune & Mer"),
            spots = listOf(
                MapSpot("marchica", TranslatableText("بحيرة مارشيكا", "Marchica Lagoon", "Lagune de Marchica"), TranslatableText("إطلالة وممشى على البحيرة قرب الناظور.", "A lakeside viewpoint and promenade near Nador.", "Grande promenade lagunaire."), 35.205, -2.925, "lagoon"),
                MapSpot("corniche", TranslatableText("واجهة الناظور البحرية", "Nador Waterfront", "Corniche de Nador"), TranslatableText("منطقة الواجهة البحرية والكورنيش.", "Waterfront and corniche area.", "Espace de promenade maritime."), 35.171, -2.928, "lagoon"),
                MapSpot("bocana_inlet", TranslatableText("بوكانة (ممر البحر)", "Boukana Inlet", "Passe de Boukana"), TranslatableText("منطقة اتصال البحيرة بالمتوسط.", "Where the lagoon connects to the Mediterranean.", "Connexion entre la lagune et la mer."), 35.231, -2.918, "lagoon")
            )
        ),
        MapCategory(
            id = "mountains",
            label = TranslatableText("الجبال", "Mountains", "Montagnes"),
            spots = listOf(
                MapSpot("gourougou_peak", TranslatableText("جبل كوروكو", "Mount Gourougou", "Mont Gourougou"), TranslatableText("منطقة جبلية بإطلالات على الناظور ومارشيكا.", "Mountain area with views of Nador and Marchica.", "Sommet dominant la région."), 35.159, -2.976, "mountains"),
                MapSpot("gourougou_entry", TranslatableText("مداخل كوروكو", "Gourougou Entrances", "Entrées de Gourougou"), TranslatableText("نقاط انطلاق تقريبية للمسارات؛ تحقّق من الطريق.", "Approximate trail starting points; check the route.", "Points de départ de randonnée."), 35.146, -2.962, "mountains")
            )
        ),
        MapCategory(
            id = "forest",
            label = TranslatableText("الغابات", "Forests", "Forêts"),
            spots = listOf(
                MapSpot("gourougou_forest_spot", TranslatableText("غابة كوروكو", "Gourougou Forest", "Forêt de Gourougou"), TranslatableText("منطقة غابوية ومسارات مشي تقريبية.", "Forest area and approximate walking trails.", "Espaces ombragés de pins et chênes."), 35.166, -2.991, "forest"),
                MapSpot("gourougou_trails", TranslatableText("مسارات كوروكو", "Gourougou Trails", "Sentiers de Gourougou"), TranslatableText("المسارات قد تتغير؛ تحقّق من الظروف قبل الانطلاق.", "Trails may change; check conditions before setting out.", "Parcours balisés en forêt."), 35.151, -2.985, "forest")
            )
        ),
        MapCategory(
            id = "activities",
            label = TranslatableText("الأنشطة", "Activities", "Activités"),
            spots = listOf(
                MapSpot("boat_tours", TranslatableText("جولات القوارب — مارشيكا", "Boat Tours — Marchica", "Tours en bateau — Marchica"), TranslatableText("نقطة عامة؛ المواعيد والمزوّدون غير مؤكّدين.", "General location; schedules and providers are unverified.", "Embarcadère des balades nautiques."), 35.203, -2.930, "activities"),
                MapSpot("hiking_spot", TranslatableText("المشي — كوروكو", "Hiking — Gourougou", "Randonnée — Gourougou"), TranslatableText("منطقة انطلاق تقريبية؛ تحقّق من المسار والطقس.", "Approximate starting area; check the route and weather.", "Départ des circuits pédestres."), 35.159, -2.976, "activities"),
                MapSpot("swimming_spot", TranslatableText("السباحة — شعرانة", "Swimming — Charrana", "Baignade — Charrana"), TranslatableText("السباحة رهينة بحالة البحر والسلامة.", "Swimming is subject to sea conditions and safety.", "Criques de baignade."), 35.281, -2.966, "activities")
            )
        ),
        MapCategory(
            id = "dining",
            label = TranslatableText("المطاعم والمقاهي", "Dining & Cafés", "Restaurants & Cafés"),
            spots = listOf(
                MapSpot("corniche_food", TranslatableText("الكورنيش", "Corniche", "Corniche"), TranslatableText("منطقة بحث عامة للمطاعم والمقاهي البحرية.", "General search area for restaurants and cafés.", "Secteur de restaurants maritimes."), 35.171, -2.928, "dining"),
                MapSpot("center_food", TranslatableText("وسط الناظور", "Central Nador", "Centre de Nador"), TranslatableText("منطقة بحث عامة للمطاعم الشعبية والتراثية.", "General search area for traditional food.", "Plats traditionnels au centre-ville."), 35.168, -2.934, "dining"),
                MapSpot("marchica_food", TranslatableText("مارشيكا", "Marchica", "Marchica"), TranslatableText("منطقة بحث عامة قرب البحيرة والممشى.", "General search area near the lagoon.", "Cafés panoramiques au bord de l'eau."), 35.205, -2.925, "dining"),
                MapSpot("ras_el_ma_food", TranslatableText("رأس الماء", "Ras El Ma", "Ras El Ma"), TranslatableText("منطقة بحث عامة؛ مأكولات بحرية طازجة.", "General search area; fresh seafood.", "Poissons frais du port."), 35.119, -2.425, "dining")
            )
        ),
        MapCategory(
            id = "culture",
            label = TranslatableText("الثقافة", "Culture", "Culture"),
            spots = listOf(
                MapSpot("selouane_spot", TranslatableText("قصبة سلوان", "Selouane Kasbah", "Kasbah de Selouane"), TranslatableText("موقع تقريبي في سلوان؛ تحقّق من إمكانية الزيارة.", "Approximate location in Selouane; check visits.", "Site historique fortifié."), 35.073, -2.942, "culture"),
                MapSpot("rif_heritage", TranslatableText("التراث الريفي الأمازيغي", "Riffian Amazigh Heritage", "Patrimoine Rifain"), TranslatableText("نطاق ثقافي واسع، وليس معلماً واحداً.", "A broad cultural area, not a single landmark.", "Artisanat et culture locale."), 35.168, -2.934, "culture")
            )
        )
    )

    val defaultChecklist = listOf(
        ChecklistItem("c1", TranslatableText("راجع الطقس وحالة البحر قبل الانطلاق.", "Check the weather and sea conditions before setting out.", "Vérifiez la météo et l'état de la mer avant de partir.")),
        ChecklistItem("c2", TranslatableText("تحقّق مباشرةً من مواعيد الأماكن ووسائل النقل.", "Check opening hours and transportation options directly.", "Vérifiez directement les horaires et moyens de transport.")),
        ChecklistItem("c3", TranslatableText("للعائلات: ماء ووسائل حماية من الشمس.", "For families: bring water and sun protection.", "Pour les familles : prévoyez de l'eau et une protection solaire.")),
        ChecklistItem("c4", TranslatableText("لمحبي المشي: حذاء مناسب وخطة عودة.", "For walkers: wear suitable shoes and plan your return.", "Pour les randonneurs : chaussures adaptées et itinéraire retour."))
    )

    val heroImageUrl = "drawable/img_nador_hero"
    val landscapeStoryImageUrl = "drawable/img_marchica_lagoon"
}
