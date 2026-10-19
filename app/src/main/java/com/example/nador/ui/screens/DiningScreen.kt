package com.example.nador.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.example.nador.data.AppLanguage
import com.example.nador.data.DiningSpot
import com.example.nador.data.NadorData
import com.example.nador.ui.components.DiningCard
import com.example.nador.ui.components.FilterChipItem
import com.example.nador.ui.components.SectionHeader
import com.example.nador.ui.components.openMapIntent

@Composable
fun DiningScreen(
    language: AppLanguage,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var selectedType by remember { mutableStateOf("all") } // all, restaurant, cafe
    var selectedArea by remember { mutableStateOf("all") } // all, corniche, center, marchica, ras-el-ma

    val types = listOf(
        "all" to when (language) {
            AppLanguage.ARABIC -> "الكل"
            AppLanguage.ENGLISH -> "All"
            AppLanguage.FRENCH -> "Tous"
        },
        "restaurant" to when (language) {
            AppLanguage.ARABIC -> "مطاعم"
            AppLanguage.ENGLISH -> "Restaurants"
            AppLanguage.FRENCH -> "Restaurants"
        },
        "cafe" to when (language) {
            AppLanguage.ARABIC -> "مقاهي"
            AppLanguage.ENGLISH -> "Cafés"
            AppLanguage.FRENCH -> "Cafés"
        }
    )

    val areas = listOf(
        "all" to when (language) {
            AppLanguage.ARABIC -> "كل المناطق"
            AppLanguage.ENGLISH -> "All Areas"
            AppLanguage.FRENCH -> "Toutes les zones"
        },
        "corniche" to when (language) {
            AppLanguage.ARABIC -> "الكورنيش"
            AppLanguage.ENGLISH -> "Corniche"
            AppLanguage.FRENCH -> "Corniche"
        },
        "center" to when (language) {
            AppLanguage.ARABIC -> "وسط الناظور"
            AppLanguage.ENGLISH -> "Central Nador"
            AppLanguage.FRENCH -> "Centre-ville"
        },
        "marchica" to when (language) {
            AppLanguage.ARABIC -> "مارشيكا"
            AppLanguage.ENGLISH -> "Marchica"
            AppLanguage.FRENCH -> "Marchica"
        },
        "ras-el-ma" to when (language) {
            AppLanguage.ARABIC -> "رأس الماء"
            AppLanguage.ENGLISH -> "Ras El Ma"
            AppLanguage.FRENCH -> "Ras El Ma"
        }
    )

    val filteredDining = remember(selectedType, selectedArea) {
        NadorData.dining.filter { item ->
            val matchesType = when (selectedType) {
                "restaurant" -> item.isRestaurant
                "cafe" -> !item.isRestaurant
                else -> true
            }
            val matchesArea = selectedArea == "all" || item.areaKey == selectedArea
            matchesType && matchesArea
        }
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("dining_screen"),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            SectionHeader(
                number = "04",
                title = when (language) {
                    AppLanguage.ARABIC -> "دليل الطعام والاستراحة"
                    AppLanguage.ENGLISH -> "Food & Refreshment Guide"
                    AppLanguage.FRENCH -> "Guide gourmand & pauses café"
                },
                intro = when (language) {
                    AppLanguage.ARABIC -> "اقتراحات تصف أنواع الأماكن والمناطق في الناظور؛ المأكولات البحرية، المقاهي المطلة، والأطباق الريفية."
                    AppLanguage.ENGLISH -> "Suggestions describing place types & areas in Nador: seafood, waterfront cafés & traditional cuisine."
                    AppLanguage.FRENCH -> "Poissons frais, terrasses face à la lagune et spécialités rifaines."
                }
            )
        }

        // Type Filter Chips
        item {
            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                    text = when (language) {
                        AppLanguage.ARABIC -> "التصنيف:"
                        AppLanguage.ENGLISH -> "Category:"
                        AppLanguage.FRENCH -> "Catégorie :"
                    },
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    items(types) { (typeKey, label) ->
                        FilterChipItem(
                            label = label,
                            selected = selectedType == typeKey,
                            onClick = { selectedType = typeKey }
                        )
                    }
                }
            }
        }

        // Area Filter Chips
        item {
            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                    text = when (language) {
                        AppLanguage.ARABIC -> "المنطقة:"
                        AppLanguage.ENGLISH -> "Area:"
                        AppLanguage.FRENCH -> "Zone :"
                    },
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    items(areas) { (areaKey, label) ->
                        FilterChipItem(
                            label = label,
                            selected = selectedArea == areaKey,
                            onClick = { selectedArea = areaKey }
                        )
                    }
                }
            }
        }

        // Disclaimer Tag
        item {
            Surface(
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
                shape = androidx.compose.foundation.shape.RoundedCornerShape(6.dp)
            ) {
                Text(
                    text = when (language) {
                        AppLanguage.ARABIC -> "ملاحظة: إدراجات توضيحية إرشادية لوصف المناطق، تحقّق من ساعات العمل والعناوين عند الزيارة."
                        AppLanguage.ENGLISH -> "Note: Illustrative directory entries for area discovery. Please check actual hours and locations."
                        AppLanguage.FRENCH -> "Note : Liste illustrative destinée à l'orientation dans chaque zone."
                    },
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(10.dp)
                )
            }
        }

        items(filteredDining) { item ->
            DiningCard(
                diningSpot = item,
                language = language,
                onOpenMap = {
                    openMapIntent(context, item.latitude, item.longitude, item.name.get(language))
                }
            )
        }
    }
}
