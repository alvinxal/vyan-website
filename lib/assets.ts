// Asset Manifest - Organized by priority for optimal loading

// CRITICAL ASSETS - Only homepage hero/above-the-fold content
// These are preloaded to ensure fast initial render
export const CRITICAL_ASSETS = {
  videos: [
    '/assets/nusa.webm', // Hero video - CRITICAL
  ],
  images: [
    '/vyan.webp', // Guide section - above fold
  ],
  externalImages: [] as string[], // No external images in critical path
}

// HOMEPAGE ASSETS - Loaded after critical assets, for below-the-fold content
export const HOMEPAGE_ASSETS = {
  videos: [] as string[],
  images: [
    // Testimonials
    '/testi-1.webp',
    '/testi-2.webp',
    '/testi-3.webp',
    
    // Map/Tour locations
    '/banyumala.webp',
    '/tianyar.webp',
    '/tegallalang.webp',
    '/tegalwangi.png',
    '/tanah-lot.png',
    '/gwk.webp',
    '/nusa-penida.webp',
    '/west-national.webp',
    '/tanah-lot.webp',
    '/ubud.webp',
    '/besakih.webp',
    '/cliff-jump.webp',
  ],
  externalImages: [] as string[],
}

// DESTINATION PAGE ASSETS
export const DESTINATION_ASSETS = {
  videos: [
    '/banyumala_20s.mp4',
    '/mount-agung_compressed.mp4',
    '/beach.mp4',
  ],
  images: [] as string[],
  externalImages: [
    'https://images.pexels.com/photos/4571930/pexels-photo-4571930.jpeg',
    'https://images.pexels.com/photos/35159215/pexels-photo-35159215.jpeg',
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546484488-2a1430996887?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585302397841-b42e837d0d81?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542897730-cc0c1dd8b73b?q=80&w=2831&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565970141926-c001afaf8577?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552301726-570d51466ae2?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1612017888429-0110c5f45334?q=80&w=2071&auto=format&fit=crop',
    'https://images.pexels.com/photos/28211183/pexels-photo-28211183.jpeg',
  ],
}

// SERVICES/TRANSPORT PAGE ASSETS
export const SERVICES_ASSETS = {
  videos: [] as string[],
  images: [
    '/ride1.webp',
    '/ride2.webp',
    '/ride3.webp',
    '/woman-swimming.webp',
    '/villa-inside.webp',
    '/cafe-on-beach.webp',
    '/food1.webp',
    '/bartender.webp',
    '/food2.webp',
  ],
  externalImages: [] as string[],
}

// INQUIRY PAGE ASSETS
export const INQUIRY_ASSETS = {
  videos: [] as string[],
  images: [
    '/inquiry-pic.webp',
  ],
  externalImages: [
    'https://images.unsplash.com/photo-1582880421648-a7154a8c99c1?q=80&w=1471&auto=format&fit=crop',
  ],
}

// Helper function to preload assets on demand
export function preloadAssets(assetGroup: typeof CRITICAL_ASSETS) {
  const promises: Promise<void>[] = []

  // Preload images
  ;[...assetGroup.images, ...assetGroup.externalImages].forEach(src => {
    const promise = new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve() // Still resolve to prevent blocking
      img.src = src
    })
    promises.push(promise)
  })

  // Preload videos
  assetGroup.videos.forEach(src => {
    const promise = fetch(src)
      .then(response => response.blob())
      .then(() => {})
      .catch(() => {}) // Silently fail
    promises.push(promise)
  })

  return Promise.all(promises)
}
