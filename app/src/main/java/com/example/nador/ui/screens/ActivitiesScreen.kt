package com.example.nador.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DirectionsBoat
import androidx.compose.material.icons.filled.Hiking
import androidx.compose.material.icons.filled.Pool
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.nador.data.ActivityItem
import com.example.nador.data.AppLanguage
import com.example.nador.data.Itinerary
import com.example.nador.data.NadorData
import com.example.nador.ui.components.SafeNetworkImage
import com.example.nador.ui.components.SectionHeader

@Composable
fun ActivitiesScreen(
    language: AppLanguage,
    modifier: Modifier = Modifier
) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("activities_screen"),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(18.dp)
    ) {
        // Section 02: Activities
        item {
            SectionHeader(
                number = "02",
                title = when (language) {
                    AppLanguage.ARABIC -> "اختر إيقاع يومك"
                    AppLanguage.ENGLISH -> "Choose Your Pace"
                    AppLanguage.FRENCH -> "Choisissez votre rythme"
                },
                intro = when (language) {
                    AppLanguage.ARABIC -> "تجارب على الماء وبين المسارات الجبلية؛ المواعيد والأسعار تُحدّد مع المزوّدين المحليين."
                    AppLanguage.ENGLISH -> "Experiences on the water and along mountain trails; verify schedules with local operators."
                    AppLanguage.FRENCH -> "Expériences nautiques et sentiers en montagne."
                }
            )
        }

        items(NadorData.activities) { activity ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("activity_card_${activity.id}"),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.6f))
            ) {
                Column {
                    Box(modifier = Modifier.height(170.dp).fillMaxWidth()) {
                        SafeNetworkImage(
                            url = activity.imageUrl,
                            contentDescription = activity.name.get(language),
                            modifier = Modifier.fillMaxSize()
                        )
                        Surface(
                            color = MaterialTheme.colorScheme.secondary,
                            shape = RoundedCornerShape(4.dp),
                            modifier = Modifier.align(Alignment.TopStart).padding(10.dp)
                        ) {
                            Text(
                                text = activity.suitable.get(language),
                                style = MaterialTheme.typography.labelSmall,
                                color = Color.White,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = activity.name.get(language),
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = activity.note.get(language),
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        // Safety Notice
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.4f)),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.secondary.copy(alpha = 0.4f))
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.Shield,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.secondary,
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = when (language) {
                            AppLanguage.ARABIC -> "تحقّق من الطقس وحالة البحر وتعليمات السلامة مباشرةً قبل بدء أي نشاط."
                            AppLanguage.ENGLISH -> "Check the weather, sea conditions, and safety guidelines directly before your activity."
                            AppLanguage.FRENCH -> "Consultez la météo et les consignes de sécurité avant toute activité."
                        },
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }

        // Section 03: Itineraries
        item {
            SectionHeader(
                number = "03",
                title = when (language) {
                    AppLanguage.ARABIC -> "يومان، بطريقتين مختلفتين"
                    AppLanguage.ENGLISH -> "Two Days, Two Different Ways"
                    AppLanguage.FRENCH -> "Deux journées, deux ambiances"
                },
                intro = when (language) {
                    AppLanguage.ARABIC -> "مسارات مرنة تجمع بين التوقفات القريبة. عدّل الترتيب بحسب الطقس ووسائل النقل."
                    AppLanguage.ENGLISH -> "Flexible routes linking nearby highlights. Adjust timing based on weather."
                    AppLanguage.FRENCH -> "Des itinéraires modulables pour explorer la région à votre rythme."
                }
            )
        }

        items(NadorData.itineraries) { itinerary ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("itinerary_card_${itinerary.id}"),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.6f))
            ) {
                Column {
                    SafeNetworkImage(
                        url = itinerary.imageUrl,
                        contentDescription = itinerary.name.get(language),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(170.dp)
                    )
                    Column(modifier = Modifier.padding(16.dp)) {
                        Surface(
                            color = MaterialTheme.colorScheme.primaryContainer,
                            shape = RoundedCornerShape(4.dp)
                        ) {
                            Text(
                                text = itinerary.audience.get(language),
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onPrimaryContainer,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = itinerary.name.get(language),
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(12.dp))

                        // Steps timeline
                        itinerary.steps.forEachIndexed { index, step ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(26.dp)
                                        .background(MaterialTheme.colorScheme.primary, CircleShape),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = "${index + 1}",
                                        style = MaterialTheme.typography.labelSmall,
                                        color = Color.White,
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                                Spacer(modifier = Modifier.width(12.dp))
                                Text(
                                    text = step.get(language),
                                    style = MaterialTheme.typography.bodyMedium,
                                    fontWeight = FontWeight.Medium
                                )
                            }
                            if (index < itinerary.steps.size - 1) {
                                HorizontalDivider(
                                    modifier = Modifier.padding(start = 38.dp),
                                    color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
