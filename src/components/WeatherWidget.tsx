import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
  RotateCw,
  Compass,
  AlertCircle,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface WeatherData {
  temperature: number
  apparentTemperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  isDay: boolean
  daily: Array<{
    date: string
    maxTemp: number
    minTemp: number
    code: number
  }>
}

// Map WMO codes to descriptions and icons
function getWeatherInfo(code: number, isDay = true, t: (k: string) => string) {
  if (code === 0) {
    return {
      label: isDay ? t('سماء صافية ومشمسة') : t('سماء صافية'),
      icon: Sun,
      color: 'text-amber-500',
    }
  }
  if (code === 1 || code === 2) {
    return {
      label: t('غائم جزئياً'),
      icon: CloudSun,
      color: 'text-amber-400',
    }
  }
  if (code === 3) {
    return {
      label: t('غائم'),
      icon: Cloud,
      color: 'text-slate-400',
    }
  }
  if (code === 45 || code === 48) {
    return {
      label: t('ضباب ساحلي'),
      icon: CloudFog,
      color: 'text-slate-400',
    }
  }
  if (code >= 51 && code <= 67) {
    return {
      label: t('أمطار خفيفة'),
      icon: CloudRain,
      color: 'text-sky-400',
    }
  }
  if (code >= 80 && code <= 82) {
    return {
      label: t('زخات مطرية'),
      icon: CloudRain,
      color: 'text-blue-500',
    }
  }
  if (code >= 95) {
    return {
      label: t('عواصف رعدية'),
      icon: CloudLightning,
      color: 'text-yellow-500',
    }
  }
  return {
    label: t('معتدل'),
    icon: CloudSun,
    color: 'text-emerald-500',
  }
}

export default function WeatherWidget() {
  const { t, i18n } = useTranslation()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchWeather = async () => {
    setLoading(true)
    setError(null)
    try {
      // Nador coordinates: 35.1688° N, 2.9335° W
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=35.1688&longitude=-2.9335&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Africa%2FCasablanca'
      )
      if (!res.ok) throw new Error('فشل جلب بيانات الطقس')
      const data = await res.json()

      const dailyForecast = (data.daily?.time || []).slice(0, 4).map((timeStr: string, idx: number) => ({
        date: timeStr,
        maxTemp: Math.round(data.daily.temperature_2m_max[idx]),
        minTemp: Math.round(data.daily.temperature_2m_min[idx]),
        code: data.daily.weather_code[idx],
      }))

      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        apparentTemperature: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1,
        daily: dailyForecast,
      })
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Weather fetch error:', err)
      setError(t('تعذّر تحميل حالة الطقس حالياً. يرجى المحاولة لاحقاً.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const currentInfo = weather ? getWeatherInfo(weather.weatherCode, weather.isDay, t) : null
  const WeatherIcon = currentInfo ? currentInfo.icon : Sun

  // Format weekday name
  const formatDay = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : i18n.language === 'fr' ? 'fr-FR' : 'en-US', {
        weekday: 'short',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="w-full" data-testid="nador-weather-widget">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 md:p-8 backdrop-blur-md shadow-sm transition-all hover:border-primary/50">
        {/* Top bar with location and refresh */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Compass className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-bold text-foreground text-sm md:text-base">
                {t('طقس الناظور والساحل اليوم')}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t('تحديث مباشر من محطة الأرصاد الساحلية')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-all hover:bg-muted hover:border-primary disabled:opacity-50"
              title={t('تحديث حالة الطقس')}
              aria-label={t('تحديث حالة الطقس')}
            >
              <RotateCw className={`h-4 w-4 ${loading ? 'animate-spin text-primary' : ''}`} />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && !weather && (
          <div className="py-10 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <RotateCw className="h-4 w-4 animate-spin text-primary" />
              <span>{t('جارٍ جلب حالة الطقس الحالية للناظور...')}</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !weather && (
          <div className="flex items-center gap-3 py-6 text-sm text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
            <button
              onClick={fetchWeather}
              className="ms-auto text-xs font-bold underline underline-offset-4"
            >
              {t('إعادة المحاولة')}
            </button>
          </div>
        )}

        {/* Weather Content */}
        {weather && (
          <div className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center">
              {/* Primary temp and condition */}
              <div className="flex items-center gap-5">
                <div className={`flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-primary/10 ${currentInfo?.color} shadow-inner`}>
                  <WeatherIcon className="h-10 w-10 md:h-12 md:w-12" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-black tracking-tight text-foreground font-display">
                      {weather.temperature}°
                    </span>
                    <span className="text-lg font-medium text-muted-foreground">C</span>
                  </div>
                  <p className="mt-1 font-bold text-foreground text-sm md:text-base">
                    {currentInfo?.label}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Thermometer className="h-3 w-3" />
                    <span>{t('يبدو مثل')} {weather.apparentTemperature}°C</span>
                  </p>
                </div>
              </div>

              {/* Weather Stats Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/60 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                    <Wind className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-foreground">{t('سرعة الرياح')}</span>
                    <span className="text-sm font-bold text-foreground">{weather.windSpeed} {t('كم/س')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/60 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <Droplets className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-foreground">{t('الرطوبة')}</span>
                    <span className="text-sm font-bold text-foreground">{weather.humidity}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Advice Banner for Nador Activities */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 p-3.5 text-xs leading-6 text-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                i
              </span>
              <p>
                {weather.windSpeed > 25
                  ? t('رياح بحرية نشطة اليوم — يُرجى توخي الحذر عند ارتياد الشواطئ المفتوحة أو السباحة في شعرانة وبوكانة.')
                  : t('الأجواء مواتية وممتعة للتنزه على ممشى مارشيكا أو صعود مسارات جبل كوروكو والاستمتاع بالمناظر.')}
              </p>
            </div>

            {/* 4-Day Mini Forecast */}
            {weather.daily.length > 0 && (
              <div className="mt-6 border-t border-border/60 pt-4">
                <span className="mb-3 block text-xs font-bold text-muted-foreground">
                  {t('توقعات الأيام القادمة بالناظور:')}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {weather.daily.map((day, idx) => {
                    const dayInfo = getWeatherInfo(day.code, true, t)
                    const DayIcon = dayInfo.icon
                    return (
                      <div
                        key={day.date}
                        className="flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-2.5 px-3"
                      >
                        <div>
                          <span className="block text-xs font-bold text-foreground">
                            {idx === 0 ? t('اليوم') : formatDay(day.date)}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {dayInfo.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DayIcon className={`h-4 w-4 ${dayInfo.color}`} />
                          <span className="text-xs font-bold text-foreground font-mono">
                            {day.maxTemp}° / {day.minTemp}°
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
