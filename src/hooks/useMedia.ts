import { useEffect, useState } from 'react'

export function useMedia() {
  const [media, setMedia] = useState<'mobile' | 'desktop'>('desktop')

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    function handleChange(mql: MediaQueryList | MediaQueryListEvent) {
      if (mql.matches) {
        setMedia('mobile')
      } else {
        setMedia('desktop')
      }
    }
    handleChange(mql)
    mql.addEventListener('change', handleChange)
    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [])

  return {
    media,
  }
}
