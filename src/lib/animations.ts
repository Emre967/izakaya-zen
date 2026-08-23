/* ==========================================================================
   IZAKAYA ZEN — MOTION LAYER
   Lenis (smooth scroll) + GSAP + ScrollTrigger, npm paketleri olarak.
   Bölümler numaralandırılmıştır, ayarlar en üstteki CONFIG objesinden yönetilir.

   Not: eski statik siteden birebir taşındı. Tek fark, artık npm importu
   kullanması (CDN <script> yerine) ve eski "pinned hero + video-scrub"
   bölümünün (bkz. eski dosyada initHeroPin) kaldırılmış olması — ana sayfanın
   hero'su artık BrokenByDesign bileşeni, kendi giriş animasyonunu kendi
   yönetiyor.
   ========================================================================== */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/* ------------------------------------------------------------------------
   0. CONFIG — tüm ayarlanabilir sayılar burada. Süre/mesafe/yumuşaklık
   değiştirmek istediğinde sadece bu objeyi düzenle.
   ------------------------------------------------------------------------ */
const CONFIG = {
  lenis: {
    duration: 1.1, // "yumuşama" süresi (sn). Yüksek = daha ağır/yağlı hissettirir, düşük = daha sert/direkt. 0.9–1.3 arası önerilir.
    easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)), // scroll'un yavaşlama eğrisi (expo-out benzeri)
    smoothWheel: true, // mouse tekerleği scroll'unu yumuşat
    syncTouch: false, // dokunmatik (mobil) scroll'u yapay olarak YUMUŞATMA — parmakla scroll native hızında kalsın diye kapalı, mobilde "ağır" hissettirmesin
    touchMultiplier: 1, // dokunmatik hassasiyet çarpanı (syncTouch kapalıyken pratik etkisi yok, ileride açarsan diye burada duruyor)
    wheelMultiplier: 1, // mouse tekerleği hassasiyet çarpanı — 1 = normal hız, artırırsan scroll daha hızlı ilerler
  },
  reveal: {
    start: 'top 85%', // ScrollTrigger tetikleme çizgisi: elementin üstü ekranın %85'ine gelince tetiklenir (ekrana tam girmeden biraz erken başlar)
    lineDuration: 0.9, // başlık satırının maskeden çıkma süresi (sn)
    lineStagger: 0.09, // aynı başlıktaki ardışık satırlar arası gecikme (sn)
    lineEase: 'power4.out', // satırların yükseliş eğrisi — akıcı/yumuşak "yukarı doğru belirme" hissi
    fadeUpDistance: 26, // paragraf/buton fade-up başlangıç mesafesi (px) — abartısız, hafif bir kalkış
    fadeUpDuration: 0.85, // fade-up animasyon süresi (sn)
    fadeUpStagger: 0.12, // aynı bölümdeki paragraf/buton öğeleri arası gecikme (sn)
    fadeUpExtraDelay: 0.15, // paragrafların başlıktan biraz sonra girmesi için ek gecikme (sn) — başlık önce, metin arkasından gelsin
  },
  parallax: {
    strength: 0.12, // görselin kendi kutusu içindeki toplam kayma oranı (ör: 0.12 = %12). İstenen aralık %10-15.
    scrubEase: 0.6, // parallax'ın scroll'a ne kadar sıkı bağlı olacağı (GSAP scrub değeri) — 1'den düşük olması hafif bir gecikme/yumuşaklık katar
  },
  gallery: {
    scrubEase: 1, // yatay galerinin scroll'a bağlılığı — 1 = birebir takip
  },
  progress: {
    smooth: 0.15, // alt ilerleme çubuğunun gerçek scroll yüzdesini ne kadar "gevşek" takip edeceği (lerp faktörü, 0-1)
  },
  menu: {
    linkStagger: 0.06, // mobil menüde linklerin sırayla girme gecikmesi (sn)
    duration: 0.4, // link giriş/çıkış animasyon süresi (sn)
  },
  counters: {
    duration: 1.6, // sayaç 0'dan hedef değere kaç saniyede sayacak
    ease: 'power2.out',
  },
  mobileBreakpoint: 768, // bu genişliğin (px) altında yatay galeri devre dışı kalır, yerine basit fade-in kullanılır
}

let initialized = false

/* ------------------------------------------------------------------------
   INIT — sayfa React root'unu mount ettikten sonra bir kere çağrılır.
   ------------------------------------------------------------------------ */
export function initMotionLayer() {
  if (initialized) return // React StrictMode dev'de effect'i iki kez çalıştırabilir
  initialized = true

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return // hiçbir animasyon kurulmaz, site tamamen normal çalışır

  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true }) // mobil tarayıcıda adres çubuğu gizlenip/görünürken gereksiz yeniden hesaplamayı önler

  const isMobile = () => window.innerWidth < CONFIG.mobileBreakpoint

  /* ------------------------------------------------------------------------
     LENIS SMOOTH SCROLL + GSAP TICKER BAĞLANTISI
     ------------------------------------------------------------------------ */
  const lenis = new Lenis({
    duration: CONFIG.lenis.duration,
    easing: CONFIG.lenis.easing,
    smoothWheel: CONFIG.lenis.smoothWheel,
    syncTouch: CONFIG.lenis.syncTouch,
    touchMultiplier: CONFIG.lenis.touchMultiplier,
    wheelMultiplier: CONFIG.lenis.wheelMultiplier,
  })

  // Lenis her scroll güncellemesinde ScrollTrigger'a haber versin
  lenis.on('scroll', ScrollTrigger.update)

  // Lenis'in kendi raf döngüsünü GSAP'in ticker'ına bağla (iki ayrı rAF döngüsü olmasın)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0) // sekme arka plana alınıp geri gelince büyük bir "atlama" olmasın

  /* ------------------------------------------------------------------------
     METİN REVEAL — h1/h2/h3 satır satır maskeden çıkar, p/CTA fade-up stagger
     Elle tek tek işaretlemek yerine tüm main içeriği otomatik taranır.
     ------------------------------------------------------------------------ */
  function initTextReveal() {
    const headings = Array.from(document.querySelectorAll<HTMLElement>('main h1, main h2, main h3'))

    // Her kelimeyi <span> ile sarar, iç içe elementleri (br, italic span vb.) bozmadan korur.
    function wrapWords(node: Node) {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent ?? ''
          if (!text.trim()) return
          const frag = document.createDocumentFragment()
          const parts = text.split(/(\s+)/) // boşlukları da koru
          parts.forEach((part) => {
            if (part.trim() === '') {
              frag.appendChild(document.createTextNode(part))
            } else {
              const mask = document.createElement('span')
              mask.className = 'az-word-mask'
              mask.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;'
              const inner = document.createElement('span')
              inner.className = 'az-word-inner'
              inner.style.cssText = 'display:inline-block;'
              inner.textContent = part
              mask.appendChild(inner)
              frag.appendChild(mask)
            }
          })
          child.replaceWith(frag)
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrapWords(child) // örn. <span class="italic">...</span> veya <br> — br'nin child'ı yok, sorun çıkarmaz
        }
      })
    }

    headings.forEach((heading) => {
      heading.style.opacity = '0' // kelimelere bölünene kadar (font yüklenene kadar) çıplak metin görünmesin
    })

    // Font yüklenmeden satır ölçümü yapılırsa yanlış gruplanabilir, bu yüzden document.fonts.ready bekleniyor.
    const ready = document.fonts?.ready ?? Promise.resolve()
    ready.then(() => {
      headings.forEach((heading) => {
        wrapWords(heading)
        const words = Array.from(heading.querySelectorAll<HTMLElement>('.az-word-mask'))
        if (!words.length) {
          heading.style.opacity = '1'
          return
        }

        // Aynı satırdaki kelimeleri offsetTop'a göre grupla (satır satır reveal için)
        const lines: HTMLElement[][] = []
        let lastTop: number | null = null
        words.forEach((word) => {
          const top = Math.round(word.getBoundingClientRect().top)
          if (lastTop === null || Math.abs(top - lastTop) > 2) {
            lines.push([word])
            lastTop = top
          } else {
            lines[lines.length - 1].push(word)
          }
        })

        // Başlangıç durumu: her satırın iç metni maskenin altında ve şeffaf
        lines.forEach((lineWords) => {
          const inners = lineWords.map((w) => w.querySelector('.az-word-inner'))
          gsap.set(inners, { yPercent: 110, opacity: 0 })
        })

        heading.style.opacity = '1' // artık maskelenmiş haliyle görünür olabilir (henüz kelimeler görünmüyor)

        ScrollTrigger.create({
          trigger: heading,
          start: CONFIG.reveal.start,
          once: true,
          onEnter: () => {
            lines.forEach((lineWords, i) => {
              const inners = lineWords.map((w) => w.querySelector('.az-word-inner'))
              gsap.to(inners, {
                yPercent: 0,
                opacity: 1,
                duration: CONFIG.reveal.lineDuration,
                ease: CONFIG.reveal.lineEase,
                delay: i * CONFIG.reveal.lineStagger,
              })
            })
          },
        })
      })
    })

    // Paragraf / CTA fade-up — bölüm (section) bazında gruplanıp stagger ile oynatılır
    const sections = document.querySelectorAll<HTMLElement>('main section, main > div > section')
    sections.forEach((section) => {
      const items = section.querySelectorAll('p, a[class*="px-8"], a[class*="px-10"], button[type="submit"]')
      if (!items.length) return
      gsap.set(items, { y: CONFIG.reveal.fadeUpDistance, opacity: 0 })
      ScrollTrigger.create({
        trigger: section,
        start: CONFIG.reveal.start,
        once: true,
        onEnter: () => {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: CONFIG.reveal.fadeUpDuration,
            stagger: CONFIG.reveal.fadeUpStagger,
            delay: CONFIG.reveal.fadeUpExtraDelay,
            ease: 'power3.out',
          })
        },
      })
    })
  }

  /* ------------------------------------------------------------------------
     GÖRSEL PARALLAX — [data-parallax] işaretli görseller kutuları içinde hafifçe kayar
     ------------------------------------------------------------------------ */
  function initParallax() {
    const els = gsap.utils.toArray<HTMLElement>('[data-parallax]')
    els.forEach((el) => {
      const customStrength = parseFloat(el.getAttribute('data-parallax') || '')
      const strength = !isNaN(customStrength) && customStrength > 0 ? customStrength : CONFIG.parallax.strength
      const travel = strength * 100 // yüzdeye çevir

      // Görsel taşmasın diye hafifçe büyütülür (translate için tampon alan sağlar)
      gsap.set(el, { scale: 1 + strength, transformOrigin: 'center center' })

      // Tailwind'in hover geçişleri (transition-all vb.) GSAP'in her karede yazdığı transform'u
      // "gecikmeli" CSS transition ile yakalayıp jank yaratmasın diye transform CSS transition'dan hariç tutulur.
      // Filter/opacity gibi hover efektleri (varsa) etkilenmeden çalışmaya devam eder.
      el.style.transitionProperty = 'filter, opacity, background-color, box-shadow, border-color'

      gsap.fromTo(
        el,
        { yPercent: -travel / 2 },
        {
          yPercent: travel / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: CONFIG.parallax.scrubEase,
          },
        },
      )
    })
  }

  /* ------------------------------------------------------------------------
     YATAY KAYDIRILAN GALERİ — bölüm pinlenir, dikey scroll yatay harekete çevrilir
     Mobilde pin devre dışı, doğal petek (overflow-x) scroll'a düşer.
     ------------------------------------------------------------------------ */
  function initHorizontalGallery() {
    const wrap = document.querySelector<HTMLElement>('[data-horizontal-track-wrap]')
    const track = document.querySelector<HTMLElement>('[data-horizontal-track]')
    if (!wrap || !track) return

    if (isMobile()) {
      // Mobilde: pin/scrub yok — basit, native yatay scroll + hafif fade-in yeterli.
      // Kaydırma "wrap" elementinde olmalı (viewport genişliğinde) — "track" zaten w-max olduğu için kendi içinde taşmaz.
      wrap.classList.remove('overflow-hidden')
      wrap.classList.add('overflow-x-auto')
      track.classList.add('snap-x', 'snap-mandatory')
      gsap.utils.toArray<HTMLElement>(track.children).forEach((card) => card.classList.add('snap-center'))
      gsap.utils.toArray<HTMLElement>(track.children).forEach((card) => {
        gsap.set(card, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: card,
          start: 'top 92%',
          once: true,
          onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
        })
      })
      return
    }

    const getScrollAmount = () => Math.max(0, track.scrollWidth - wrap.clientWidth)

    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap.closest('section') ?? undefined,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        scrub: CONFIG.gallery.scrubEase,
        pin: true,
        invalidateOnRefresh: true,
      },
    })
  }

  /* ------------------------------------------------------------------------
     SCROLL İLERLEME GÖSTERGESİ — alt ince çizgi + yüzde
     rAF ile çalışır, scroll event içinde sadece hedef değeri günceller (ağır iş yapmaz)
     ------------------------------------------------------------------------ */
  function initScrollProgress() {
    const bar = document.querySelector<HTMLElement>('[data-scroll-progress-bar]')
    const percent = document.querySelector<HTMLElement>('[data-scroll-progress-percent]')
    if (!bar) return

    let current = 0
    let target = 0

    function updateTarget() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      target = docHeight > 0 ? scrollTop / docHeight : 0
    }
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget)
    updateTarget()

    function tick() {
      current += (target - current) * CONFIG.progress.smooth
      bar!.style.transform = `scaleX(${current})`
      if (percent) percent.textContent = `${Math.round(current * 100)}%`
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  /* ------------------------------------------------------------------------
     MOBİL MENÜ — hamburger açılınca linkler sırayla gelir, kapanırken tersi
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    const toggle = document.querySelector<HTMLElement>('[data-mobile-menu-toggle]')
    const panel = document.querySelector<HTMLElement & { inert: boolean }>('[data-mobile-menu-panel]')
    if (!toggle || !panel) return

    const links = Array.from(panel.querySelectorAll<HTMLElement>('[data-mobile-menu-links] a'))
    let open = false
    panel.inert = true // kapalıyken klavye ile içine girilmesin

    function openMenu() {
      open = true
      toggle!.setAttribute('aria-expanded', 'true')
      panel!.setAttribute('aria-hidden', 'false')
      panel!.inert = false
      panel!.classList.remove('pointer-events-none')
      document.body.style.overflow = 'hidden'
      lenis.stop()

      gsap.set(links, { opacity: 0, y: 20 })
      gsap.to(panel, { opacity: 1, duration: 0.3 })
      gsap.to(links, {
        opacity: 1,
        y: 0,
        duration: CONFIG.menu.duration,
        stagger: CONFIG.menu.linkStagger,
        ease: 'power3.out',
        delay: 0.08,
      })
    }

    function closeMenu() {
      open = false
      toggle!.setAttribute('aria-expanded', 'false')
      panel!.setAttribute('aria-hidden', 'true')
      panel!.inert = true
      document.body.style.overflow = ''
      lenis.start()

      gsap.to(links, {
        opacity: 0,
        y: -12,
        duration: CONFIG.menu.duration * 0.7,
        stagger: { each: CONFIG.menu.linkStagger, from: 'end' },
        ease: 'power2.in',
      })
      gsap.to(panel, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        onComplete: () => panel!.classList.add('pointer-events-none'),
      })
    }

    toggle.addEventListener('click', () => (open ? closeMenu() : openMenu()))
    links.forEach((link) => link.addEventListener('click', closeMenu))
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) {
        closeMenu()
        toggle!.focus()
      }
    })
  }

  /* ------------------------------------------------------------------------
     SAYAÇLAR — [data-count="hedef"] ekrana girince 0'dan hedefe sayar
     ------------------------------------------------------------------------ */
  function initCounters() {
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-count') || '')
      if (isNaN(target)) return
      const obj = { val: 0 }
      ScrollTrigger.create({
        trigger: el,
        start: CONFIG.reveal.start,
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: CONFIG.counters.duration,
            ease: CONFIG.counters.ease,
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString('tr-TR')
            },
          })
        },
      })
    })
  }

  initTextReveal()
  initParallax()
  initHorizontalGallery()
  initScrollProgress()
  initMobileMenu()
  initCounters()

  window.addEventListener('load', () => ScrollTrigger.refresh())
}
