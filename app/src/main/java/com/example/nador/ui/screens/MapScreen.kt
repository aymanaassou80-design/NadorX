package com.example.nador.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.nador.data.AppLanguage
import com.example.nador.data.MapSpot
import com.example.nador.data.NadorData
import com.example.nador.ui.components.FilterChipItem
import com.example.nador.ui.components.SectionHeader
import com.example.nador.ui.components.openMapIntent

@Composable
fun MapScreen(
    language: AppLanguage,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var selectedCategoryId by remember { mutableStateOf("beaches") }
    val activeCategory = NadorData.mapCategories.find { it.id == selectedCategoryId }
        ?: NadorData.mapCategories.first()

    var selectedSpot by remember(selectedCategoryId) {
        mutableStateOf(activeCategory.spots.firstOrNull())
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("map_screen"),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            SectionHeader(
                number = "08",
                title = when (language) {
                    AppLanguage.ARABIC -> "خريطة تفاعلية لكل فئة"
                    AppLanguage.ENGLISH -> "Interactive Map by Category"
                    AppLanguage.FRENCH -> "Carte interactive par catégorie"
                },
                intro = when (language) {
                    AppLanguage.ARABIC -> "بدّل الفئة لاستعراض مواقعها على الخريطة، ثم افتح العلامة لمعرفة التفاصيل والتوجيه."
                    AppLanguage.ENGLISH -> "Switch categories to explore their locations, then tap a marker for details and navigation."
                    AppLanguage.FRENCH -> "Changez de catégorie pour localiser les sites et lancer le guidage."
                }
            )
        }

        // Category Tabs
        item {
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(NadorData.mapCategories) { cat ->
                    FilterChipItem(
                        label = cat.label.get(language),
                        selected = selectedCategoryId == cat.id,
                        onClick = {
                            selectedCategoryId = cat.id
                            selectedSpot = cat.spots.firstOrNull()
                        }
                    )
                }
            }
        }

        // Map Canvas Box
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(280.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline)
            ) {
                Box(modifier = Modifier.fillMaxSize()) {
                    // Geographic Canvas representing Mediterranean Sea, Marchica Lagoon & Gourougou Mountain
                    Canvas(
                        modifier = Modifier
                            .fillMaxSize()
                            .pointerInput(activeCategory.spots) {
                                detectTapGestures { tapOffset ->
                                    // Find closest spot
                                    val width = size.width
                                    val height = size.height

                                    // Map bounds:
                                    // Latitude: 35.05 to 35.32 (Height)
                                    // Longitude: -3.02 to -2.40 (Width)
                                    var closest: MapSpot? = null
                                    var minDistance = Float.MAX_VALUE

                                    activeCategory.spots.forEach { spot ->
                                        val normX = ((spot.longitude - (-3.02)) / ((-2.40) - (-3.02))).toFloat()
                                        val normY = (1f - ((spot.latitude - 35.05) / (35.32 - 35.05))).toFloat()
                                        val spotX = normX.coerceIn(0.1f, 0.9f) * width
                                        val spotY = normY.coerceIn(0.1f, 0.9f) * height

                                        val dist = (tapOffset.x - spotX) * (tapOffset.x - spotX) +
                                                (tapOffset.y - spotY) * (tapOffset.y - spotY)
                                        if (dist < minDistance && dist < 3000f) {
                                            minDistance = dist
                                            closest = spot
                                        }
                                    }
                                    if (closest != null) {
                                        selectedSpot = closest
                                    }
                                }
                            }
                    ) {
                        val w = size.width
                        val h = size.height

                        // Draw Sea & Lagoon Background
                        drawRect(color = Color(0xFFE8F1F5))

                        // Draw Coastline & Land
                        val landPath = Path().apply {
                            moveTo(0f, h * 0.35f)
                            cubicTo(w * 0.25f, h * 0.25f, w * 0.45f, h * 0.45f, w * 0.7f, h * 0.40f)
                            cubicTo(w * 0.85f, h * 0.38f, w * 0.95f, h * 0.50f, w, h * 0.55f)
                            lineTo(w, h)
                            lineTo(0f, h)
                            close()
                        }
                        drawPath(landPath, color = Color(0xFFE3EDE4))

                        // Draw Marchica Lagoon (encircled blue lagoon)
                        val lagoonPath = Path().apply {
                            moveTo(w * 0.38f, h * 0.50f)
                            cubicTo(w * 0.45f, h * 0.42f, w * 0.58f, h * 0.44f, w * 0.62f, h * 0.52f)
                            cubicTo(w * 0.60f, h * 0.62f, w * 0.45f, h * 0.66f, w * 0.38f, h * 0.50f)
                            close()
                        }
                        drawPath(lagoonPath, color = Color(0xFFBCE1E8))
                        drawPath(lagoonPath, color = Color(0xFF88BDC7), style = Stroke(width = 2f))

                        // Draw Mount Gourougou elevation contour
                        drawCircle(
                            color = Color(0xFF87988A).copy(alpha = 0.25f),
                            radius = 45f,
                            center = Offset(w * 0.22f, h * 0.62f)
                        )
                        drawCircle(
                            color = Color(0xFF6B806E).copy(alpha = 0.35f),
                            radius = 28f,
                            center = Offset(w * 0.22f, h * 0.62f)
                        )

                        // Draw Spot Markers
                        activeCategory.spots.forEach { spot ->
                            val normX = ((spot.longitude - (-3.02)) / ((-2.40) - (-3.02))).toFloat()
                            val normY = (1f - ((spot.latitude - 35.05) / (35.32 - 35.05))).toFloat()
                            val spotX = normX.coerceIn(0.12f, 0.88f) * w
                            val spotY = normY.coerceIn(0.12f, 0.88f) * h
                            val isSelected = spot.id == selectedSpot?.id

                            // Outer pulse ring if selected
                            if (isSelected) {
                                drawCircle(
                                    color = Color(0xFFB38A32).copy(alpha = 0.35f),
                                    radius = 22f,
                                    center = Offset(spotX, spotY)
                                )
                            }

                            // Marker pin circle
                            drawCircle(
                                color = if (isSelected) Color(0xFFB38A32) else Color(0xFF1B4332),
                                radius = if (isSelected) 11f else 8f,
                                center = Offset(spotX, spotY)
                            )
                            drawCircle(
                                color = Color.White,
                                radius = if (isSelected) 5f else 3.5f,
                                center = Offset(spotX, spotY)
                            )
                        }
                    }

                    // Watermark / Map Legend
                    Surface(
                        color = MaterialTheme.colorScheme.surface.copy(alpha = 0.85f),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier
                            .align(Alignment.TopStart)
                            .padding(10.dp)
                    ) {
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "البحر الأبيض المتوسط · بحيرة مارشيكا"
                                AppLanguage.ENGLISH -> "Mediterranean Sea · Marchica Lagoon"
                                AppLanguage.FRENCH -> "Mer Méditerranée · Lagune de Marchica"
                            },
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurface,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // Selected Spot Detail Card
        selectedSpot?.let { spot ->
            item {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("selected_spot_card"),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f)),
                    border = androidx.compose.foundation.BorderStroke(1.5.dp, MaterialTheme.colorScheme.secondary)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    Icons.Default.Place,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.secondary,
                                    modifier = Modifier.size(20.dp)
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = spot.name.get(language),
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            Surface(
                                shape = RoundedCornerShape(4.dp),
                                color = MaterialTheme.colorScheme.surface
                            ) {
                                Text(
                                    text = String.format("%.3f, %.3f", spot.latitude, spot.longitude),
                                    style = MaterialTheme.typography.labelSmall,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = spot.detail.get(language),
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(14.dp))
                        Button(
                            onClick = {
                                openMapIntent(context, spot.latitude, spot.longitude, spot.name.get(language))
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Icon(Icons.Default.Navigation, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = when (language) {
                                    AppLanguage.ARABIC -> "فتح في خرائط Google والتوجيه"
                                    AppLanguage.ENGLISH -> "Open in Google Maps & Directions"
                                    AppLanguage.FRENCH -> "Ouvrir dans Google Maps"
                                },
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }

        // List of all spots in active category
        item {
            Text(
                text = "${activeCategory.label.get(language)} (${activeCategory.spots.size})",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(top = 8.dp)
            )
        }

        items(activeCategory.spots) { spot ->
            val isSelected = spot.id == selectedSpot?.id
            Surface(
                onClick = { selectedSpot = spot },
                shape = RoundedCornerShape(10.dp),
                color = if (isSelected) MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.5f) else MaterialTheme.colorScheme.surface,
                border = androidx.compose.foundation.BorderStroke(
                    1.dp,
                    if (isSelected) MaterialTheme.colorScheme.secondary else MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)
                ),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .background(
                                if (isSelected) MaterialTheme.colorScheme.secondary else MaterialTheme.colorScheme.surfaceVariant,
                                CircleShape
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Default.LocationOn,
                            contentDescription = null,
                            tint = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = spot.name.get(language),
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = spot.detail.get(language),
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f))
            ) {
                Text(
                    text = when (language) {
                        AppLanguage.ARABIC -> "العلامات تقريبية، استخدم الخريطة للتوجيه الأولي والاطلاع على التضاريس."
                        AppLanguage.ENGLISH -> "Markers are approximate. Use the map for initial orientation and geography."
                        AppLanguage.FRENCH -> "Les repères sont indicatifs pour votre orientation générale."
                    },
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(12.dp)
                )
            }
        }
    }
}
