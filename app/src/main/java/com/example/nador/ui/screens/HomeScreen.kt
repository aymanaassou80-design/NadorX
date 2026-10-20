package com.example.nador.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.BookmarkBorder
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.nador.data.*
import com.example.nador.ui.components.SafeNetworkImage
import com.example.nador.ui.components.SectionHeader

@Composable
fun HomeScreen(
    language: AppLanguage,
    onNavigateToPlaces: () -> Unit,
    onNavigateToActivities: () -> Unit,
    onNavigateToMap: () -> Unit,
    onSelectPlace: (Place) -> Unit,
    savedPlaceIds: Set<String>,
    onToggleBookmark: (String) -> Unit,
    checklist: List<ChecklistItem>,
    onToggleChecklist: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("home_screen"),
        contentPadding = PaddingValues(bottom = 90.dp)
    ) {
        // Hero Section
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(340.dp)
            ) {
                SafeNetworkImage(
                    url = NadorData.heroImageUrl,
                    contentDescription = when (language) {
                        AppLanguage.ARABIC -> "ساحل الناظور والبحر الأبيض المتوسط"
                        AppLanguage.ENGLISH -> "The Nador Coast and Mediterranean Sea"
                        AppLanguage.FRENCH -> "La côte de Nador et la mer Méditerranée"
                    },
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )
                // Gradient Overlay
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(
                                    Color.Black.copy(alpha = 0.45f),
                                    Color.Black.copy(alpha = 0.30f),
                                    Color.Black.copy(alpha = 0.85f)
                                )
                            )
                        )
                )
                // Hero Content
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(20.dp),
                    verticalArrangement = Arrangement.Bottom
                ) {
                    Surface(
                        color = MaterialTheme.colorScheme.secondary.copy(alpha = 0.9f),
                        shape = RoundedCornerShape(4.dp)
                    ) {
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "دليل الزائر إلى الساحل والريف"
                                AppLanguage.ENGLISH -> "Visitor's Guide to the Coast & Rif"
                                AppLanguage.FRENCH -> "Guide du visiteur du littoral et du Rif"
                            },
                            style = MaterialTheme.typography.labelSmall,
                            color = Color.White,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = when (language) {
                            AppLanguage.ARABIC -> "اكتشف الناظور: بين زرقة المتوسط وهدوء مارشيكا"
                            AppLanguage.ENGLISH -> "Discover Nador: Between the Mediterranean & Marchica"
                            AppLanguage.FRENCH -> "Découvrez Nador : Entre Méditerranée et Marchica"
                        },
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = when (language) {
                            AppLanguage.ARABIC -> "خطّط لنزهة عائلية أو يوم مليء بالمغامرة؛ ابدأ باستكشاف الأماكن والأنشطة."
                            AppLanguage.ENGLISH -> "Plan a family outing or an action-packed adventure; start exploring places & activities."
                            AppLanguage.FRENCH -> "Planifiez une sortie en famille ou une journée d'aventure."
                        },
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.White.copy(alpha = 0.88f)
                    )
                    Spacer(modifier = Modifier.height(14.dp))
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Button(
                            onClick = onNavigateToPlaces,
                            colors = ButtonDefaults.buttonColors(
                                containerColor = MaterialTheme.colorScheme.primary
                            ),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.weight(1f).testTag("home_explore_button")
                        ) {
                            Icon(Icons.Default.Explore, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = when (language) {
                                    AppLanguage.ARABIC -> "الأماكن"
                                    AppLanguage.ENGLISH -> "Places"
                                    AppLanguage.FRENCH -> "Lieux"
                                },
                                fontWeight = FontWeight.Bold
                            )
                        }
                        OutlinedButton(
                            onClick = onNavigateToActivities,
                            colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White),
                            border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.7f)),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.weight(1f).testTag("home_activities_button")
                        ) {
                            Icon(Icons.Default.DirectionsRun, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = when (language) {
                                    AppLanguage.ARABIC -> "الأنشطة"
                                    AppLanguage.ENGLISH -> "Activities"
                                    AppLanguage.FRENCH -> "Activités"
                                },
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }

        // Weather Forecast Card for Nador
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 6.dp)
                    .testTag("weather_forecast_card"),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.6f)),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.WbSunny,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.secondary,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = when (language) {
                                    AppLanguage.ARABIC -> "طقس الناظور والساحل اليوم"
                                    AppLanguage.ENGLISH -> "Nador Weather & Coastal Forecast"
                                    AppLanguage.FRENCH -> "Météo de Nador & Littoral"
                                },
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = MaterialTheme.colorScheme.primaryContainer
                        ) {
                            Text(
                                text = "21°C",
                                style = MaterialTheme.typography.labelLarge,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onPrimaryContainer,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = when (language) {
                            AppLanguage.ARABIC -> "أجواء مشمسة ومعتدلة مع نسيم بحري لطيف (14 كم/س). مثالية للنزهات البحرية وزيارة بحيرة مارشيكا."
                            AppLanguage.ENGLISH -> "Sunny and mild with a gentle sea breeze (14 km/h). Ideal for lagoon strolls and outdoor visits."
                            AppLanguage.FRENCH -> "Ensoleillé et agréable avec brise marine (14 km/h). Idéal pour les sorties à Marchica."
                        },
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        // Stats Banner: "3 آفاق تلتقي هنا: البحر والبحيرة والريف"
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.4f)),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.secondary.copy(alpha = 0.3f))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "٣ آفاق تلتقي هنا"
                                AppLanguage.ENGLISH -> "3 Horizons Meet Here"
                                AppLanguage.FRENCH -> "3 Horizons se rencontrent"
                            },
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "البحر الأبيض المتوسط، بحيرة مارشيكا، ومرتفعات الريف"
                                AppLanguage.ENGLISH -> "Mediterranean Sea, Marchica Lagoon & Rif Highlands"
                                AppLanguage.FRENCH -> "Méditerranée, Lagune de Marchica et Monts du Rif"
                            },
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Button(
                        onClick = onNavigateToMap,
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary)
                    ) {
                        Icon(Icons.Default.Map, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "الخريطة"
                                AppLanguage.ENGLISH -> "Map"
                                AppLanguage.FRENCH -> "Carte"
                            },
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // Key Locations Responsive Grid Section
        item {
            Column(modifier = Modifier.padding(horizontal = 16.dp)) {
                SectionHeader(
                    number = "01",
                    title = when (language) {
                        AppLanguage.ARABIC -> "أبرز المعالم والوجهات الرئيسية"
                        AppLanguage.ENGLISH -> "Key Locations & Landmarks"
                        AppLanguage.FRENCH -> "Destinations clés & sites incontournables"
                    },
                    intro = when (language) {
                        AppLanguage.ARABIC -> "استكشف أهم معالم الناظور مثل بحيرة مارشيكا وجبل كوروكو والساحل المتوسطي."
                        AppLanguage.ENGLISH -> "Discover Nador's key highlights including Marchica Lagoon, Mount Gourougou, and the Mediterranean coast."
                        AppLanguage.FRENCH -> "Découvrez les incontournables de Nador : la lagune de Marchica, le mont Gourougou et le littoral."
                    }
                )
            }
        }

        item {
            BoxWithConstraints(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
            ) {
                val columnCount = when {
                    maxWidth >= 840.dp -> 3
                    maxWidth >= 520.dp -> 2
                    else -> 1
                }
                val keyPlaces = NadorData.places // includes 'بحيرة مارشيكا', 'جبل كوروكو', etc.
                val chunkedPlaces = keyPlaces.chunked(columnCount)

                Column(
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                    modifier = Modifier.fillMaxWidth().testTag("key_locations_responsive_grid")
                ) {
                    chunkedPlaces.forEach { rowPlaces ->
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(14.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            rowPlaces.forEach { place ->
                                Card(
                                    modifier = Modifier
                                        .weight(1f)
                                        .clickable { onSelectPlace(place) }
                                        .testTag("key_location_card_${place.id}"),
                                    shape = RoundedCornerShape(12.dp),
                                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                                    border = androidx.compose.foundation.BorderStroke(
                                        1.dp,
                                        MaterialTheme.colorScheme.outline.copy(alpha = 0.6f)
                                    ),
                                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                                ) {
                                    Column {
                                        Box(
                                            modifier = Modifier
                                                .fillMaxWidth()
                                                .height(160.dp)
                                        ) {
                                            SafeNetworkImage(
                                                url = place.imageUrl,
                                                contentDescription = place.name.get(language),
                                                modifier = Modifier.fillMaxSize()
                                            )
                                            // Area badge
                                            Surface(
                                                color = MaterialTheme.colorScheme.surface.copy(alpha = 0.92f),
                                                shape = RoundedCornerShape(6.dp),
                                                modifier = Modifier
                                                    .align(Alignment.TopStart)
                                                    .padding(8.dp)
                                            ) {
                                                Row(
                                                    verticalAlignment = Alignment.CenterVertically,
                                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                                ) {
                                                    Icon(
                                                        imageVector = Icons.Default.Place,
                                                        contentDescription = null,
                                                        tint = MaterialTheme.colorScheme.secondary,
                                                        modifier = Modifier.size(13.dp)
                                                    )
                                                    Spacer(modifier = Modifier.width(4.dp))
                                                    Text(
                                                        text = place.area.get(language),
                                                        style = MaterialTheme.typography.labelSmall,
                                                        fontWeight = FontWeight.Bold,
                                                        color = MaterialTheme.colorScheme.onSurface
                                                    )
                                                }
                                            }

                                            // Bookmark toggle
                                            val isSaved = savedPlaceIds.contains(place.id)
                                            IconButton(
                                                onClick = { onToggleBookmark(place.id) },
                                                modifier = Modifier
                                                    .align(Alignment.TopEnd)
                                                    .padding(6.dp)
                                                    .background(
                                                        MaterialTheme.colorScheme.surface.copy(alpha = 0.9f),
                                                        androidx.compose.foundation.shape.CircleShape
                                                    )
                                                    .size(34.dp)
                                            ) {
                                                Icon(
                                                    imageVector = if (isSaved) Icons.Default.Bookmark else Icons.Outlined.BookmarkBorder,
                                                    contentDescription = "Save",
                                                    tint = if (isSaved) MaterialTheme.colorScheme.secondary else MaterialTheme.colorScheme.onSurface,
                                                    modifier = Modifier.size(16.dp)
                                                )
                                            }
                                        }

                                        Column(modifier = Modifier.padding(14.dp)) {
                                            Text(
                                                text = place.name.get(language),
                                                style = MaterialTheme.typography.titleMedium,
                                                fontWeight = FontWeight.Bold,
                                                color = MaterialTheme.colorScheme.onSurface
                                            )
                                            Spacer(modifier = Modifier.height(4.dp))
                                            Text(
                                                text = place.note.get(language),
                                                style = MaterialTheme.typography.bodyMedium,
                                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                                maxLines = 2
                                            )
                                        }
                                    }
                                }
                            }
                            // If last row has fewer items than columnCount, pad with empty spacer weights
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

        // "روح المكان" (Spirit of the Place)
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f))
            ) {
                Column {
                    SafeNetworkImage(
                        url = NadorData.landscapeStoryImageUrl,
                        contentDescription = "روح المكان",
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(180.dp)
                    )
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                Icons.Default.Explore,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.secondary,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = when (language) {
                                    AppLanguage.ARABIC -> "روح المكان"
                                    AppLanguage.ENGLISH -> "Spirit of the Place"
                                    AppLanguage.FRENCH -> "L'esprit des lieux"
                                },
                                style = MaterialTheme.typography.labelLarge,
                                color = MaterialTheme.colorScheme.secondary,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "بين الساحل ومرتفعات الريف، تتعدّد الطرق لاكتشاف المكان على مهل."
                                AppLanguage.ENGLISH -> "Between the coast and the Rif highlands, explore at your own pace."
                                AppLanguage.FRENCH -> "Entre le littoral et les reliefs du Rif, prenez le temps de voyager."
                            },
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "في الناظور، يمكن أن يبدأ اليوم بهدوء البحيرة وينتهي بإطلالة على المتوسط. مساحة للقاء العائلة، أو للمشي واكتشاف مشهد جديد."
                                AppLanguage.ENGLISH -> "In Nador, the day can begin with the calm of Marchica and end overlooking the Mediterranean."
                                AppLanguage.FRENCH -> "À Nador, la journée commence au calme de la lagune et se termine face à la mer."
                            },
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        // Quick Travel Checklist
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            Icons.Default.CheckCircle,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "قائمة سريعة قبل الانطلاق"
                                AppLanguage.ENGLISH -> "Quick Travel Checklist"
                                AppLanguage.FRENCH -> "Liste rapide avant le départ"
                            },
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    checklist.forEach { item ->
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable { onToggleChecklist(item.id) }
                                .padding(vertical = 6.dp)
                        ) {
                            Checkbox(
                                checked = item.isChecked,
                                onCheckedChange = { onToggleChecklist(item.id) }
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = item.text.get(language),
                                style = MaterialTheme.typography.bodyMedium,
                                color = if (item.isChecked) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }
                }
            }
        }
    }
}
