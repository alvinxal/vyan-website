'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Montserrat } from 'next/font/google'
import { CRITICAL_ASSETS } from '@/lib/assets'
import { useLoading } from '@/lib/loading-context'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

const ICON_PATH_MAIN = "M287 111.468C273.947 113.913 263.23 123.314 253 131.116C238.82 141.93 224.765 152.013 207 155.789C194.801 158.383 178.807 159.462 167 154.743C156.571 150.575 147.837 142.67 137 139.44C117.193 133.537 96.9781 135.018 77 131.195C71.4159 130.127 66.0498 128.535 61 125.88C56.4255 123.474 52.206 120.241 47 119.329C42.2968 118.504 36.7059 118.849 33.7423 123.109C31.124 126.872 31.4419 133.185 33.7384 137C35.2779 139.557 38.3732 141.775 38.4182 145C38.4974 150.677 34.2829 154.667 35.4676 161C38.7452 178.523 54.6144 193.04 64.5725 207C69.0795 213.318 71.7658 221.31 77.1852 226.895C84.1875 234.111 93.5579 235 103 235C117.949 235 134.518 230.628 149 235.36C158.714 238.533 164.904 247.47 174 252.029C184.762 257.423 197.455 258.707 207.907 264.684C214.822 268.638 219.563 277.126 226 282.112C238.889 292.095 253.464 299.629 265.996 310.084C269.903 313.343 273.437 316.913 276.485 321C286.163 333.975 283.407 349.634 275.961 363C272.273 369.62 266.065 376.221 265.189 384C263.346 400.371 285.393 402.414 297 400.699C299.412 400.343 301.801 399.656 304 398.597C318.825 391.459 311.499 377.604 314.394 365C315.881 358.53 322.179 354.828 324.95 349C330.388 337.56 326.846 325.715 337.015 316.093C350.261 303.56 367.894 305.06 384 299.302C387.972 297.882 391.781 296.05 394.671 292.895C398.812 288.374 400.711 282.477 406.015 278.969C414.952 273.057 426.45 270.652 436 265.741C443.982 261.636 450.312 255.19 458 250.604C465.1 246.369 474.581 243.908 478.543 236C479.805 233.481 479.989 230.768 479.992 228C480.018 207.716 457.36 207.039 446.616 193.999C438.129 183.7 432.307 172.122 422 163.3C412.811 155.435 400.257 147.295 389 142.779C384.138 140.828 378.86 140.207 374 138.127C365.221 134.371 357.138 128.933 348 126.029C342.758 124.363 337.077 124.989 332 123.298C326.747 121.548 322.084 117.603 317 115.312C307.85 111.187 296.944 109.604 287 111.468z"
const ICON_PATH_DETAIL = "M263 123L264 124L263 123M61 126L62 127L61 126M78 131L79 132L78 131M239 141L240 142L239 141M236 143L237 144L236 143M149 145L150 146L149 145M221 151L222 152L221 151M163 153L164 154L163 153M55 194L56 195L55 194M83 231L84 232L83 231M85 232L86 233L85 232M475 240L476 241L475 240M203 262L204 263L203 262M401 282L402 283L401 282M250 298L251 299L250 298M253 300L254 301L253 300M256 302L257 303L256 302M270 313L271 314L270 313M339 313L340 314L339 313M271 314L272 315L271 314z"
const ICON_PATH_ISLAND = "M428 332.468C421.926 332.886 412.471 331.294 407 334.028C403.551 335.751 401.089 339.11 398 341.367C394.652 343.812 390.485 345.536 389.474 350.004C387.981 356.599 393.636 360.08 397.91 363.609C401.278 366.389 403.191 370.654 407.04 372.86C411.676 375.518 416.725 375.54 420.985 379.214C425.698 383.277 429.763 390.386 436.996 389.677C442.624 389.126 443.194 383.909 445.727 380C447.806 376.792 451.111 374.458 452.82 371C457.426 361.683 444.434 354.879 440.533 348C436.971 341.718 437.83 331.792 428 332.468z"

export default function GlobalLoader() {
  const { isLoading, setIsLoading } = useLoading()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const allAssets = [
      ...CRITICAL_ASSETS.videos,
      ...CRITICAL_ASSETS.images,
      ...CRITICAL_ASSETS.externalImages,
    ]

    const totalAssets = allAssets.length
    let loadedCount = 0

    const updateProgress = () => {
      loadedCount++
      const percentage = Math.round((loadedCount / totalAssets) * 100)
      setProgress(percentage)

      if (loadedCount === totalAssets) {
        // All assets loaded, wait a bit then hide loader
        setTimeout(() => {
          setIsLoading(false)
        }, 800)
      }
    }

    // Preload images
    const imagePromises = [...CRITICAL_ASSETS.images, ...CRITICAL_ASSETS.externalImages].map(src => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          updateProgress()
          resolve(null)
        }
        img.onerror = () => {
          // Still count as loaded to prevent stuck loading
          updateProgress()
          resolve(null)
        }
        img.src = src
      })
    })

    // Preload videos
    const videoPromises = CRITICAL_ASSETS.videos.map(src => {
      return new Promise((resolve) => {
        fetch(src)
          .then(response => response.blob())
          .then(() => {
            updateProgress()
            resolve(null)
          })
          .catch(() => {
            // Still count as loaded to prevent stuck loading
            updateProgress()
            resolve(null)
          })
      })
    })

    // Start loading all assets
    Promise.all([...imagePromises, ...videoPromises])

  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={`${montserrat.className} bg-[#F8F5F0] text-white leading-relaxed overflow-x-hidden bg-grain`}
          exit={{
            y: "100vh",
            opacity: 0,
            transition: {
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          layout
        >
          <motion.div
            className="fixed inset-0 z-[99999] bg-[#F8F5F0] flex flex-col items-center justify-center text-[#2D2623]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="relative w-56 h-56 mb-8">
                {/* Outline Layer (Border) */}
                <svg viewBox="0 0 512 512" className="absolute inset-0 w-full h-full z-20" fill="none" stroke="#2D2623" strokeWidth="6">
                  <path d={ICON_PATH_MAIN} />
                  <path d={ICON_PATH_DETAIL} />
                  <path d={ICON_PATH_ISLAND} />
                </svg>

                {/* Fill Layer Container (Masked) */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full overflow-hidden z-10"
                  style={{
                    height: `${progress}%`
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Inner SVG (Filled - No Gap) */}
                  <div className="absolute bottom-0 left-0 w-full h-56">
                    <svg viewBox="0 0 512 512" className="w-full h-full" fill="#2D2623" stroke="none">
                      <path d={ICON_PATH_MAIN} />
                      <path d={ICON_PATH_DETAIL} />
                      <path d={ICON_PATH_ISLAND} />
                    </svg>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className={`text-lg font-medium tracking-widest ${montserrat.className}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                {progress}%
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
