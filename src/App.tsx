import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import ScrollToTop from "./components/ScrollToTop"
import Index from "./pages/Index"
import PlacesPage from "./pages/PlacesPage"
import CategoryPage from "./pages/CategoryPage"
import PlaceDetailPage from "./pages/PlaceDetailPage"
import AboutPage from "./pages/AboutPage"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/place/:placeId" element={<PlaceDetailPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          
          {/* Direct Category Shortcuts requested by user */}
          <Route path="/tourism" element={<Navigate to="/category/tourism" replace />} />
          <Route path="/beaches" element={<Navigate to="/category/beaches" replace />} />
          <Route path="/nature" element={<Navigate to="/category/nature" replace />} />
          <Route path="/dining" element={<Navigate to="/category/restaurants" replace />} />
          <Route path="/services" element={<Navigate to="/category/services" replace />} />
          
          <Route path="/about" element={<AboutPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
