package com.example.nador.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.nador.data.AppLanguage
import com.example.nador.data.ChecklistItem
import com.example.nador.data.NadorData
import com.example.nador.data.Place
import com.example.nador.ui.components.AppFooter
import com.example.nador.ui.components.PlaceCard
import com.example.nador.ui.components.SafeNetworkImage
import com.example.nador.ui.components.SectionHeader

@Composable
fun CulturePlanScreen(
    language: AppLanguage,
    checklist: List<ChecklistItem>,
    onToggleChecklist: (String) -> Unit,
    savedPlaces: List<Place>,
    onSelectPlace: (Place) -> Unit,
    onToggleBookmark: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("culture_plan_screen"),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(18.dp)
    ) {
        // Section 05: Culture
        item {
            SectionHeader(
                number = "05",
                title = when (language) {
                    AppLanguage.ARABIC -> "محطات من ذاكرة الريف"
                    AppLanguage.ENGLISH -> "Highlights from Rif Heritage"
                    AppLanguage.FRENCH -> "Mémoire et patrimoine du Rif"
                },
                intro = when (language) {
                    AppLanguage.ARABIC -> "اكتشاف المكان يبدأ بالفضول والاحترام للتاريخ والثقافة الريفية العريقة."
                    AppLanguage.ENGLISH -> "Discovering a place begins with curiosity and respect for Rif history & culture."
                    AppLanguage.FRENCH -> "À la découverte des racines et de l'histoire du Rif."
                }
            )
        }

        items(NadorData.culture) { item ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("culture_card_${item.id}"),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.6f))
            ) {
                Column {
                    SafeNetworkImage(
                        url = item.imageUrl,
                        contentDescription = item.name.get(language),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(170.dp)
                    )
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = item.name.get(language),
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = item.note.get(language),
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        // Section 06: Services
        item {
            SectionHeader(
                number = "06",
                title = when (language) {
                    AppLanguage.ARABIC -> "خدمات تساعدك على الانطلاق"
                    AppLanguage.ENGLISH -> "Services to Help You Get Started"
                    AppLanguage.FRENCH -> "Services pour votre séjour"
                },
                intro = when (language) {
                    AppLanguage.ARABIC -> "فئات للبحث والإرشاد المحلي وتأجير معدات الأنشطة البحرية."
                    AppLanguage.ENGLISH -> "Categories for search: local guides and water activity rentals."
                    AppLanguage.FRENCH -> "Guides locaux et équipements pour activités marines."
                }
            )
        }

        items(NadorData.services) { item ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("service_card_${item.id}"),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.6f))
            ) {
                Column {
                    SafeNetworkImage(
                        url = item.imageUrl,
                        contentDescription = item.name.get(language),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(170.dp)
                    )
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = item.name.get(language),
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = item.note.get(language),
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        // Saved Places section if any
        if (savedPlaces.isNotEmpty()) {
            item {
                SectionHeader(
                    number = "★",
                    title = when (language) {
                        AppLanguage.ARABIC -> "أماكني المحفوظة"
                        AppLanguage.ENGLISH -> "My Saved Places"
                        AppLanguage.FRENCH -> "Mes lieux favoris"
                    },
                    intro = ""
                )
            }
            items(savedPlaces) { place ->
                PlaceCard(
                    place = place,
                    language = language,
                    isBookmarked = true,
                    onToggleBookmark = { onToggleBookmark(place.id) },
                    onClick = { onSelectPlace(place) }
                )
            }
        }

        // Section 07: Plan Checklist
        item {
            SectionHeader(
                number = "07",
                title = when (language) {
                    AppLanguage.ARABIC -> "قبل أن تبدأ رحلتك"
                    AppLanguage.ENGLISH -> "Before You Begin Your Trip"
                    AppLanguage.FRENCH -> "Avant de commencer votre voyage"
                },
                intro = when (language) {
                    AppLanguage.ARABIC -> "خطوات بسيطة تساعد على زيارة أكثر راحة واستعداداً."
                    AppLanguage.ENGLISH -> "Simple steps for a comfortable, well-prepared visit."
                    AppLanguage.FRENCH -> "Conseils pratiques pour préparer au mieux votre escapade."
                }
            )
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = when (language) {
                            AppLanguage.ARABIC -> "قائمة التحقق السريعة"
                            AppLanguage.ENGLISH -> "Quick Checklist"
                            AppLanguage.FRENCH -> "Liste de vérification"
                        },
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(10.dp))
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
                                style = MaterialTheme.typography.bodyMedium
                            )
                        }
                    }
                }
            }
        }

        // Contact & Feedback Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.4f)),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.3f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            Icons.Default.Info,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "للتواصل أو تصحيح بيانات الدليل"
                                AppLanguage.ENGLISH -> "Contact & Corrections"
                                AppLanguage.FRENCH -> "Contact & Corrections"
                            },
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = when (language) {
                            AppLanguage.ARABIC -> "دليل سياحي مستقل وغير تجاري. إذا كنت ترغب في تحديث معلومات أو اقتراح مسار سياحي جديد، يسعدنا تواصلك."
                            AppLanguage.ENGLISH -> "Independent travel guide. If you wish to update information or suggest new trails, feel free to reach out."
                            AppLanguage.FRENCH -> "Guide touristique indépendant. Pour toute suggestion ou mise à jour, contactez-nous."
                        },
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Button(
                        onClick = {
                            val intent = Intent(Intent.ACTION_SENDTO).apply {
                                data = Uri.parse("mailto:contact@discover-nador.ma")
                                putExtra(Intent.EXTRA_SUBJECT, "Nador Travel Guide Feedback")
                            }
                            try {
                                context.startActivity(intent)
                            } catch (e: Exception) {
                                // Fallback
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Icon(Icons.Default.Email, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = when (language) {
                                AppLanguage.ARABIC -> "إرسال رسالة"
                                AppLanguage.ENGLISH -> "Send Message"
                                AppLanguage.FRENCH -> "Envoyer un e-mail"
                            },
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // App Footer with owner credit
        item {
            AppFooter(language = language)
        }
    }
}
