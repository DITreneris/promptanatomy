import { useEffect } from 'react'
import { X_PIXEL_ID } from '../config'

/**
 * X (Twitter) conversion tracking base code.
 * Loads only when VITE_X_PIXEL_ID is set (e.g. production).
 * Events (e.g. Purchase) can be sent via twq('event', 'Purchase', { ... }) where needed.
 */
export default function XPixel() {
  useEffect(() => {
    if (!X_PIXEL_ID) return
    if (typeof window === 'undefined' || window.twq) return

    const script = document.createElement('script')
    script.async = true
    script.textContent = `
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','${X_PIXEL_ID}');
`
    document.head.appendChild(script)
  }, [])

  return null
}
