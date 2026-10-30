import { useEffect, useRef, useState } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
// 요소가 20% 보이면 등장 시작
const THRESHOLD = 0.2

/**
 * 요소가 화면에 보이면 true, 완전히 벗어나면 false로 돌아가 다시 들어올 때 같은 등장 효과를 반복
 * 움직임 줄이기 설정이면 항상 true
 */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [reducedMotion] = useState(() => window.matchMedia(REDUCED_MOTION).matches)
  const [inView, setInView] = useState(reducedMotion)

  useEffect(() => {
    const element = ref.current
    if (reducedMotion || !element) {
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= THRESHOLD) {
          setInView(true)
        } else if (!entry.isIntersecting) {
          setInView(false)
        }
      },
      // 0: 완전히 벗어날 때 초기화, THRESHOLD: 충분히 보일 때 등장
      { threshold: [0, THRESHOLD] },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  return { ref, inView }
}
