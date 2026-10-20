package com.example.nador.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.BookmarkBorder
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.nador.data.*
import com.example.nador.ui.components.SafeNetworkImage
import com.example.nador.ui.components.openMapIntent
import com.example.nador.ui.screens.*

enum class AppTab {
    HOME,
    PLACES,
    MAP,
    ACTIVITIES,
    DINING,
    CULTURE
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NadorApp() {
    val context = LocalContext.current
    var currentLanguage by remember { mutableStateOf(AppLanguage.ARABIC) }
    var currentTab by remember { mutableStateOf(AppTab.HOME) }
    var showLanguageDialog by remember { mutableStateOf(false) }
    var selectedPlaceForDetail by remember { mutableStateOf<Place?>(null) }

    // Saved places set
    var savedPlaceIds by remember { mutableStateOf(setOf("marchica", "gourougou_mountain")) }

    // Checklist state
    var checklist by remember { mutableStateOf(NadorData.defaultChecklist) }

    val layoutDirection = if (currentLanguage.isRtl) LayoutDirection.Rtl else LayoutDirection.Ltr

    // BackHandler to return to HOME if on another tab or dismiss details
    BackHandler(enabled = selectedPlaceForDetail != null || currentTab != AppTab.HOME) {
        if (selectedPlaceForDetail != null) {
            selectedPlaceForDetail = null
        } else if (currentTab != AppTab.HOME) {
            currentTab = AppTab.HOME
        }
    }

    CompositionLocalProvider(LocalLayoutDirection provides layoutDirection) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Column {
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "اكتشف الناظور"
                                    AppLanguage.ENGLISH -> "Discover Nador"
                                    AppLanguage.FRENCH -> "Découvrir Nador"
                                },
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onPrimary
                            )
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "دليل الساحل والريف"
                                    AppLanguage.ENGLISH -> "Coast & Rif Guide"
                                    AppLanguage.FRENCH -> "Guide du littoral et du Rif"
                                },
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.8f)
                            )
                        }
                    },
                    actions = {
                        // Language switcher button
                        FilledTonalButton(
                            onClick = { showLanguageDialog = true },
                            colors = ButtonDefaults.filledTonalButtonColors(
                                containerColor = MaterialTheme.colorScheme.secondary.copy(alpha = 0.25f),
                                contentColor = MaterialTheme.colorScheme.onPrimary
                            ),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier
                                .padding(end = 4.dp)
                                .testTag("language_switch_button")
                        ) {
                            Icon(Icons.Default.Language, contentDescription = "Change Language", modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = currentLanguage.displayName,
                                style = MaterialTheme.typography.labelMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        // Bookmark counter button
                        IconButton(
                            onClick = { currentTab = AppTab.CULTURE },
                            modifier = Modifier.testTag("saved_places_button")
                        ) {
                            BadgedBox(badge = {
                                if (savedPlaceIds.isNotEmpty()) {
                                    Badge(
                                        containerColor = MaterialTheme.colorScheme.secondary,
                                        contentColor = Color.White
                                    ) {
                                        Text("${savedPlaceIds.size}")
                                    }
                                }
                            }) {
                                Icon(
                                    imageVector = Icons.Default.Bookmark,
                                    contentDescription = "Saved places",
                                    tint = MaterialTheme.colorScheme.onPrimary
                                )
                            }
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = MaterialTheme.colorScheme.primary,
                        titleContentColor = MaterialTheme.colorScheme.onPrimary,
                        actionIconContentColor = MaterialTheme.colorScheme.onPrimary
                    )
                )
            },
            bottomBar = {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface,
                    contentColor = MaterialTheme.colorScheme.onSurface,
                    tonalElevation = 8.dp
                ) {
                    NavigationBarItem(
                        selected = currentTab == AppTab.HOME,
                        onClick = { currentTab = AppTab.HOME },
                        icon = { Icon(Icons.Default.Home, contentDescription = null) },
                        label = {
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "الرئيسية"
                                    AppLanguage.ENGLISH -> "Home"
                                    AppLanguage.FRENCH -> "Accueil"
                                },
                                style = MaterialTheme.typography.labelSmall
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer
                        ),
                        modifier = Modifier.testTag("nav_home")
                    )
                    NavigationBarItem(
                        selected = currentTab == AppTab.PLACES,
                        onClick = { currentTab = AppTab.PLACES },
                        icon = { Icon(Icons.Default.Explore, contentDescription = null) },
                        label = {
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "الأماكن"
                                    AppLanguage.ENGLISH -> "Places"
                                    AppLanguage.FRENCH -> "Lieux"
                                },
                                style = MaterialTheme.typography.labelSmall
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer
                        ),
                        modifier = Modifier.testTag("nav_places")
                    )
                    NavigationBarItem(
                        selected = currentTab == AppTab.MAP,
                        onClick = { currentTab = AppTab.MAP },
                        icon = { Icon(Icons.Default.Map, contentDescription = null) },
                        label = {
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "الخريطة"
                                    AppLanguage.ENGLISH -> "Map"
                                    AppLanguage.FRENCH -> "Carte"
                                },
                                style = MaterialTheme.typography.labelSmall
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer
                        ),
                        modifier = Modifier.testTag("nav_map")
                    )
                    NavigationBarItem(
                        selected = currentTab == AppTab.ACTIVITIES,
                        onClick = { currentTab = AppTab.ACTIVITIES },
                        icon = { Icon(Icons.Default.DirectionsRun, contentDescription = null) },
                        label = {
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "الأنشطة"
                                    AppLanguage.ENGLISH -> "Activities"
                                    AppLanguage.FRENCH -> "Activités"
                                },
                                style = MaterialTheme.typography.labelSmall
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer
                        ),
                        modifier = Modifier.testTag("nav_activities")
                    )
                    NavigationBarItem(
                        selected = currentTab == AppTab.DINING,
                        onClick = { currentTab = AppTab.DINING },
                        icon = { Icon(Icons.Default.Restaurant, contentDescription = null) },
                        label = {
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "المطاعم"
                                    AppLanguage.ENGLISH -> "Dining"
                                    AppLanguage.FRENCH -> "Restos"
                                },
                                style = MaterialTheme.typography.labelSmall
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer
                        ),
                        modifier = Modifier.testTag("nav_dining")
                    )
                    NavigationBarItem(
                        selected = currentTab == AppTab.CULTURE,
                        onClick = { currentTab = AppTab.CULTURE },
                        icon = { Icon(Icons.Default.AccountBalance, contentDescription = null) },
                        label = {
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "الثقافة"
                                    AppLanguage.ENGLISH -> "Culture"
                                    AppLanguage.FRENCH -> "Culture"
                                },
                                style = MaterialTheme.typography.labelSmall
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer
                        ),
                        modifier = Modifier.testTag("nav_culture")
                    )
                }
            }
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            ) {
                when (currentTab) {
                    AppTab.HOME -> HomeScreen(
                        language = currentLanguage,
                        onNavigateToPlaces = { currentTab = AppTab.PLACES },
                        onNavigateToActivities = { currentTab = AppTab.ACTIVITIES },
                        onNavigateToMap = { currentTab = AppTab.MAP },
                        onSelectPlace = { selectedPlaceForDetail = it },
                        savedPlaceIds = savedPlaceIds,
                        onToggleBookmark = { id ->
                            savedPlaceIds = if (savedPlaceIds.contains(id)) savedPlaceIds - id else savedPlaceIds + id
                        },
                        checklist = checklist,
                        onToggleChecklist = { id ->
                            checklist = checklist.map {
                                if (it.id == id) it.copy(isChecked = !it.isChecked) else it
                            }
                        }
                    )
                    AppTab.PLACES -> PlacesScreen(
                        language = currentLanguage,
                        onSelectPlace = { selectedPlaceForDetail = it },
                        savedPlaceIds = savedPlaceIds,
                        onToggleBookmark = { id ->
                            savedPlaceIds = if (savedPlaceIds.contains(id)) savedPlaceIds - id else savedPlaceIds + id
                        }
                    )
                    AppTab.MAP -> MapScreen(
                        language = currentLanguage
                    )
                    AppTab.ACTIVITIES -> ActivitiesScreen(
                        language = currentLanguage
                    )
                    AppTab.DINING -> DiningScreen(
                        language = currentLanguage
                    )
                    AppTab.CULTURE -> CulturePlanScreen(
                        language = currentLanguage,
                        checklist = checklist,
                        onToggleChecklist = { id ->
                            checklist = checklist.map {
                                if (it.id == id) it.copy(isChecked = !it.isChecked) else it
                            }
                        },
                        savedPlaces = NadorData.places.filter { savedPlaceIds.contains(it.id) },
                        onSelectPlace = { selectedPlaceForDetail = it },
                        onToggleBookmark = { id ->
                            savedPlaceIds = if (savedPlaceIds.contains(id)) savedPlaceIds - id else savedPlaceIds + id
                        }
                    )
                }
            }
        }

        // Language Switch Dialog
        if (showLanguageDialog) {
            AlertDialog(
                onDismissRequest = { showLanguageDialog = false },
                title = {
                    Text(
                        text = when (currentLanguage) {
                            AppLanguage.ARABIC -> "اختر لغة التطبيق"
                            AppLanguage.ENGLISH -> "Select App Language"
                            AppLanguage.FRENCH -> "Choisir la langue"
                        },
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                },
                text = {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        AppLanguage.values().forEach { lang ->
                            Surface(
                                onClick = {
                                    currentLanguage = lang
                                    showLanguageDialog = false
                                },
                                shape = RoundedCornerShape(8.dp),
                                color = if (currentLanguage == lang) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Row(
                                    modifier = Modifier.padding(14.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = lang.displayName,
                                        style = MaterialTheme.typography.bodyLarge,
                                        fontWeight = if (currentLanguage == lang) FontWeight.Bold else FontWeight.Normal
                                    )
                                    if (currentLanguage == lang) {
                                        Icon(
                                            Icons.Default.Check,
                                            contentDescription = null,
                                            tint = MaterialTheme.colorScheme.primary
                                        )
                                    }
                                }
                            }
                        }
                    }
                },
                confirmButton = {
                    TextButton(onClick = { showLanguageDialog = false }) {
                        Text(
                            text = when (currentLanguage) {
                                AppLanguage.ARABIC -> "إلغاء"
                                AppLanguage.ENGLISH -> "Close"
                                AppLanguage.FRENCH -> "Fermer"
                            }
                        )
                    }
                }
            )
        }

        // Place Detail Dialog
        selectedPlaceForDetail?.let { place ->
            val isBookmarked = savedPlaceIds.contains(place.id)
            AlertDialog(
                onDismissRequest = { selectedPlaceForDetail = null },
                modifier = Modifier.fillMaxWidth(),
                title = null,
                text = {
                    Column(modifier = Modifier.fillMaxWidth()) {
                        SafeNetworkImage(
                            url = place.imageUrl,
                            contentDescription = place.name.get(currentLanguage),
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(200.dp)
                                .clip(RoundedCornerShape(8.dp))
                        )
                        Spacer(modifier = Modifier.height(14.dp))
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = place.name.get(currentLanguage),
                                style = MaterialTheme.typography.titleLarge,
                                fontWeight = FontWeight.Bold
                            )
                            IconButton(onClick = {
                                savedPlaceIds = if (isBookmarked) savedPlaceIds - place.id else savedPlaceIds + place.id
                            }) {
                                Icon(
                                    imageVector = if (isBookmarked) Icons.Default.Bookmark else Icons.Outlined.BookmarkBorder,
                                    contentDescription = "Bookmark",
                                    tint = if (isBookmarked) MaterialTheme.colorScheme.secondary else MaterialTheme.colorScheme.onSurface
                                )
                            }
                        }
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                Icons.Default.Place,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.secondary,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = place.area.get(currentLanguage),
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = place.note.get(currentLanguage),
                            style = MaterialTheme.typography.bodyMedium,
                            lineHeight = 22.sp
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(
                            onClick = {
                                openMapIntent(context, place.latitude, place.longitude, place.name.get(currentLanguage))
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Icon(Icons.Default.Navigation, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = when (currentLanguage) {
                                    AppLanguage.ARABIC -> "فتح في الخريطة والتوجيه"
                                    AppLanguage.ENGLISH -> "Open in Maps & Navigate"
                                    AppLanguage.FRENCH -> "Naviguer sur la carte"
                                },
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                },
                confirmButton = {
                    TextButton(onClick = { selectedPlaceForDetail = null }) {
                        Text(
                            text = when (currentLanguage) {
                                AppLanguage.ARABIC -> "إغلاق"
                                AppLanguage.ENGLISH -> "Close"
                                AppLanguage.FRENCH -> "Fermer"
                            }
                        )
                    }
                }
            )
        }
    }
}
