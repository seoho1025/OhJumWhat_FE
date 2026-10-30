import { useEffect, useRef, useState } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
// 요소가 20% 보이면 등장 시작
const THRESHOLD = 0.2

/** 요소가 화면에 한 번 들어오면 true, 움직임 줄이기 설정이면 처음부터 true */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => window.matchMedia(REDUCED_MOTION).matches)

  useEffect(() => {
    const element = ref.current
    if (inView || !element) {
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: THRESHOLD },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [inView])

  return { ref, inView }
}
