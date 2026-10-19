package com.example.nador.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.example.nador.data.AppLanguage
import com.example.nador.data.NadorData
import com.example.nador.data.Place
import com.example.nador.ui.components.FilterChipItem
import com.example.nador.ui.components.PlaceCard
import com.example.nador.ui.components.SectionHeader

@Composable
fun PlacesScreen(
    language: AppLanguage,
    onSelectPlace: (Place) -> Unit,
    savedPlaceIds: Set<String>,
    onToggleBookmark: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("all") }

    val categories = listOf(
        "all" to when (language) {
            AppLanguage.ARABIC -> "الكل"
            AppLanguage.ENGLISH -> "All"
            AppLanguage.FRENCH -> "Tous"
        },
        "beaches" to when (language) {
            AppLanguage.ARABIC -> "الشواطئ"
            AppLanguage.ENGLISH -> "Beaches"
            AppLanguage.FRENCH -> "Plages"
        },
        "lagoon" to when (language) {
            AppLanguage.ARABIC -> "البحيرة"
            AppLanguage.ENGLISH -> "Lagoon"
            AppLanguage.FRENCH -> "Lagune"
        },
        "mountains" to when (language) {
            AppLanguage.ARABIC -> "الجبال"
            AppLanguage.ENGLISH -> "Mountains"
            AppLanguage.FRENCH -> "Montagnes"
        },
        "forest" to when (language) {
            AppLanguage.ARABIC -> "الغابات"
            AppLanguage.ENGLISH -> "Forests"
            AppLanguage.FRENCH -> "Forêts"
        }
    )

    val filteredPlaces = remember(searchQuery, selectedCategory, language) {
        NadorData.places.filter { place ->
            val matchesCategory = selectedCategory == "all" || place.categoryId == selectedCategory
            val matchesSearch = searchQuery.isBlank() ||
                    place.name.get(language).contains(searchQuery, ignoreCase = true) ||
                    place.area.get(language).contains(searchQuery, ignoreCase = true) ||
                    place.note.get(language).contains(searchQuery, ignoreCase = true)
            matchesCategory && matchesSearch
        }
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("places_screen"),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            SectionHeader(
                number = "01",
                title = when (language) {
                    AppLanguage.ARABIC -> "استكشف معالم الناظور والطبيعة"
                    AppLanguage.ENGLISH -> "Explore Nador's Landmarks & Nature"
                    AppLanguage.FRENCH -> "Explorez la nature et les sites de Nador"
                },
                intro = when (language) {
                    AppLanguage.ARABIC -> "الشواطئ الساحرة، بحيرة مارشيكا، ومرتفعات كوروكو الخضراء."
                    AppLanguage.ENGLISH -> "Charming beaches, Marchica lagoon, and the lush heights of Gourougou."
                    AppLanguage.FRENCH -> "Des plages sauvages, la lagune et les monts de Gourougou."
                }
            )
        }

        // Search Bar
        item {
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("places_search_field"),
                placeholder = {
                    Text(
                        text = when (language) {
                            AppLanguage.ARABIC -> "ابحث عن شاطئ أو معلم أو منطقة…"
                            AppLanguage.ENGLISH -> "Search beach, landmark or area…"
                            AppLanguage.FRENCH -> "Rechercher une plage, un lieu…"
                        }
                    )
                },
                leadingIcon = {
                    Icon(Icons.Default.Search, contentDescription = "Search")
                },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { searchQuery = "" }) {
                            Icon(Icons.Default.Clear, contentDescription = "Clear")
                        }
                    }
                },
                singleLine = true,
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = MaterialTheme.colorScheme.primary,
                    unfocusedBorderColor = MaterialTheme.colorScheme.outline
                )
            )
        }

        // Category Filter Chips
        item {
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(categories) { (catId, label) ->
                    FilterChipItem(
                        label = label,
                        selected = selectedCategory == catId,
                        onClick = { selectedCategory = catId }
                    )
                }
            }
        }

        // Places Responsive Grid List
        item {
            BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
                val columnCount = when {
                    maxWidth >= 840.dp -> 3
                    maxWidth >= 520.dp -> 2
                    else -> 1
                }
                val chunkedPlaces = filteredPlaces.chunked(columnCount)

                Column(
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                    modifier = Modifier.fillMaxWidth().testTag("places_responsive_grid")
                ) {
                    chunkedPlaces.forEach { rowPlaces ->
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(14.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            rowPlaces.forEach { place ->
                                Box(modifier = Modifier.weight(1f)) {
                                    PlaceCard(
                                        place = place,
                                        language = language,
                                        isBookmarked = savedPlaceIds.contains(place.id),
                                        onToggleBookmark = { onToggleBookmark(place.id) },
                                        onClick = { onSelectPlace(place) }
                                    )
                                }
                            }
                            if (rowPlaces.size < columnCount) {
                                repeat(columnCount - rowPlaces.size) {
                                    Spacer(modifier = Modifier.weight(1f))
                                }
                            }
                        }
                    }
                }
            }
        }

        if (filteredPlaces.isEmpty()) {
            item {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 32.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp),
                        horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "لم يتم العثور على نتائج تطابق بحثك"
                                AppLanguage.ENGLISH -> "No places found matching your search"
                                AppLanguage.FRENCH -> "Aucun lieu ne correspond à votre recherche"
                            },
                            style = MaterialTheme.typography.bodyLarge
                        )
                    }
                }
            }
        }
    }
}
