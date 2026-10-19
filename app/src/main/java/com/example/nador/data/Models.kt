package com.example.nador.data

enum class AppLanguage(val code: String, val displayName: String, val isRtl: Boolean) {
    ARABIC("ar", "العربية", true),
    ENGLISH("en", "English", false),
    FRENCH("fr", "Français", false)
}

data class TranslatableText(
    val ar: String,
    val en: String,
    val fr: String
) {
    fun get(lang: AppLanguage): String = when (lang) {
        AppLanguage.ARABIC -> ar
        AppLanguage.ENGLISH -> en
        AppLanguage.FRENCH -> fr
    }
}

data class Place(
    val id: String,
    val name: TranslatableText,
    val area: TranslatableText,
    val note: TranslatableText,
    val imageUrl: String,
    val categoryId: String,
    val latitude: Double,
    val longitude: Double
)

data class ActivityItem(
    val id: String,
    val name: TranslatableText,
    val note: TranslatableText,
    val suitable: TranslatableText,
    val imageUrl: String,
    val categoryId: String
)

data class DiningSpot(
    val id: String,
    val name: TranslatableText,
    val type: TranslatableText, // مطعم / مقهى
    val isRestaurant: Boolean,
    val area: TranslatableText,
    val areaKey: String, // corniche, center, marchica, ras-el-ma
    val note: TranslatableText,
    val imageUrl: String,
    val latitude: Double,
    val longitude: Double
)

data class Itinerary(
    val id: String,
    val name: TranslatableText,
    val audience: TranslatableText,
    val imageUrl: String,
    val steps: List<TranslatableText>
)

data class CultureItem(
    val id: String,
    val name: TranslatableText,
    val note: TranslatableText,
    val imageUrl: String
)

data class TourismService(
    val id: String,
    val name: TranslatableText,
    val note: TranslatableText,
    val imageUrl: String
)

data class MapSpot(
    val id: String,
    val name: TranslatableText,
    val detail: TranslatableText,
    val latitude: Double,
    val longitude: Double,
    val categoryId: String
)

data class MapCategory(
    val id: String,
    val label: TranslatableText,
    val spots: List<MapSpot>
)

data class ChecklistItem(
    val id: String,
    val text: TranslatableText,
    val isChecked: Boolean = false
)
