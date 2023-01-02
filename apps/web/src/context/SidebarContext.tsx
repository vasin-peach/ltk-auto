import { createContext, ReactNode, useState } from 'react'

const defaultState = {
  active: false,
  toogleActive: () => {},
  setActive: (state: boolean) => {},
  swipeListen: () => {},
  removeSwipeListen: () => {},
}

const SidebarContext = createContext<typeof defaultState>(defaultState)

/* -------------------------------- Provider -------------------------------- */
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  /* --------------------------------- States --------------------------------- */
  const [active, setActive] = useState(false)
  let isListener = false
  let xStart = 0
  let xCurrent = 0
  let xDiff = 0
  let threshold = 50

  /* --------------------------------- Methods -------------------------------- */
  const toogleActive = () => setActive(!active)

  const handleTouchStart = (e: TouchEvent) => {
    const getTouches = (e: TouchEvent) => e.touches
    const firstTouch = getTouches(e)[0]
    xStart = firstTouch.clientX
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!xStart) return

    xCurrent = e.touches[0].clientX
    xDiff = xStart - xCurrent

    if (xDiff && xDiff >= threshold) {
      setActive(true)
    } else if (xDiff < 0 && Math.abs(xDiff) >= threshold) {
      setActive(false)
    }
  }

  // https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
  const swipeListen = () => {
    if (isListener) return
    const container = document.querySelectorAll('body *:not(.swiper), body *:not(.swiper *)')[0] as HTMLElement
    container.addEventListener('touchstart', handleTouchStart, false)
    container.addEventListener('touchmove', handleTouchMove, false)
    isListener = true
  }

  const removeSwipeListen = () => {
    if (!isListener) return
    document.removeEventListener('touchstart', handleTouchStart, false)
    document.removeEventListener('touchmove', handleTouchMove, false)
    isListener = false
  }

  return (
    <SidebarContext.Provider
      value={{
        active,
        toogleActive,
        setActive,
        swipeListen,
        removeSwipeListen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContext
