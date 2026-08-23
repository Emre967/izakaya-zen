import { useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { initMotionLayer } from '@/lib/animations'

type Dish = { name: string; description: string; price: string; badge?: boolean }
type Category = { kanji: string; title: string; align: 'left' | 'right'; layout: 'list' | 'grid'; dishes: Dish[] }

const CATEGORIES: Category[] = [
  {
    kanji: '前菜',
    title: 'Başlangıçlar',
    align: 'left',
    layout: 'list',
    dishes: [
      { name: 'Edamame', description: 'Deniz tuzu ile buharda pişmiş, taze soya fasulyesi.', price: '240' },
      { name: 'Miso Çorbası', description: 'Geleneksel dashi suyu, tofu, wakame ve taze soğan.', price: '280' },
      {
        name: 'Beef Tataki',
        description: 'Hafif mühürlenmiş dana bonfile dilimleri, ponzu sos, sarımsak cipsi ve trüf yağı.',
        price: '650',
        badge: true,
      },
    ],
  },
  {
    kanji: '寿司と刺身',
    title: 'Sushi & Sashimi',
    align: 'right',
    layout: 'grid',
    dishes: [
      { name: 'Sake Sashimi (3 parça)', description: 'İskoç somonu, taze wasabi ve ev yapımı soya.', price: '420' },
      { name: 'Maguro Nigiri (2 parça)', description: 'Mavi yüzgeçli orkinos sırtı, nikiri sos glaze.', price: '480' },
      {
        name: 'Zen Roll (8 parça)',
        description: 'Yılan balığı, avokado, salatalık, üzeri alevlenmiş somon ve unagi sos.',
        price: '750',
        badge: true,
      },
      {
        name: 'Spicy Tuna Roll (6 parça)',
        description: 'Acı mayonezli orkinos, taze soğan, tempura çıtırları.',
        price: '580',
      },
    ],
  },
  {
    kanji: '主菜',
    title: 'Ana Yemekler',
    align: 'left',
    layout: 'list',
    dishes: [
      {
        name: 'Miso Gindara',
        description: 'Saikyo miso ile 48 saat marine edilmiş ızgara siyah cod balığı, zencefil turşusu.',
        price: '1.450',
        badge: true,
      },
      {
        name: 'Tori Teriyaki',
        description: 'Izgara tavuk but, ev yapımı teriyaki sos, ızgara kuşkonmaz ve susam.',
        price: '580',
      },
      {
        name: 'Wagyu Ishiyaki (A5, 150g)',
        description: "Japonya'dan ithal A5 kalite Kagoshima Wagyu, sıcak volkanik taş üzerinde sunum.",
        price: '3.800',
      },
    ],
  },
  {
    kanji: 'デザート',
    title: 'Tatlılar',
    align: 'right',
    layout: 'grid',
    dishes: [
      { name: 'Matcha Tiramisu', description: 'Mascarpone, Uji matcha, sake emdirilmiş pandispanya.', price: '320' },
      {
        name: 'Yuzu Cheesecake',
        description: 'Japon narenciyesi yuzu ile fırınlanmış cheesecake, ahududu coulis.',
        price: '340',
      },
      {
        name: 'Mochi Selection (3 parça)',
        description: 'Mevsimsel lezzetlerle hazırlanan geleneksel dondurmalı pirinç keki (Matcha, Mango, Siyah Susam).',
        price: '290',
      },
    ],
  },
]

function DishRow({ dish }: { dish: Dish }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 bg-primary/90 backdrop-blur-sm rounded-sm px-6 py-5 border border-white/10 hover:border-secondary/50 transition-colors">
      <div className="flex-1 pr-4">
        <h3 className="font-headline-md text-2xl text-on-primary mb-2 flex items-center gap-3">
          {dish.name}
          {dish.badge && (
            <span
              className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold"
              title="Şefin İmza Tabağı"
            >
              印
            </span>
          )}
        </h3>
        <p className="font-body-md text-on-primary-container opacity-90">{dish.description}</p>
      </div>
      <div className="flex-none font-body-lg text-secondary tracking-wider">
        <span className="text-sm align-top mr-1">₺</span>
        {dish.price}
      </div>
    </div>
  )
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="flex flex-col justify-between bg-primary/90 backdrop-blur-sm rounded-sm px-6 py-5 border border-white/10 hover:border-secondary/50 transition-colors">
      <div>
        <h3 className="font-headline-md text-xl text-on-primary mb-2 flex items-center gap-2">
          {dish.name}
          {dish.badge && (
            <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px] font-bold">
              印
            </span>
          )}
        </h3>
        <p className="font-body-md text-on-primary-container opacity-90 mb-3 text-sm">{dish.description}</p>
      </div>
      <div className="font-body-lg text-secondary tracking-wider text-right">
        <span className="text-xs align-top mr-1">₺</span>
        {dish.price}
      </div>
    </div>
  )
}

export default function Menu() {
  const sakuraContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initMotionLayer()

    // Düşen sakura yaprakları — sürekli, rastgele zamanlamayla yenilenir.
    const container = sakuraContainerRef.current
    if (!container) return
    const maxLeaves = 15
    const leaves: HTMLDivElement[] = []
    const timeouts: number[] = []

    function createLeaf() {
      if (!container || leaves.length >= maxLeaves) return
      const leaf = document.createElement('div')
      leaf.innerHTML = `
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.4;">
          <path d="M7 0C7 0 14 5 14 10C14 15 7 20 7 20C7 20 0 15 0 10C0 5 7 0 7 0Z" fill="#ffb3b3"/>
        </svg>
      `
      const startX = Math.random() * window.innerWidth
      const duration = 15 + Math.random() * 20
      const scale = 0.5 + Math.random() * 0.8
      leaf.style.position = 'absolute'
      leaf.style.top = '-30px'
      leaf.style.left = `${startX}px`
      leaf.style.transform = `scale(${scale}) rotate(0deg)`
      leaf.style.transition = `transform ${duration}s linear, top ${duration}s linear, left ${duration}s ease-in-out`
      leaf.style.zIndex = '10'
      leaf.style.pointerEvents = 'none'
      leaf.style.filter = 'blur(1px)'
      container.appendChild(leaf)
      leaves.push(leaf)

      timeouts.push(
        window.setTimeout(() => {
          const endX = startX + (Math.random() * 200 - 100)
          const rotations = 360 * (1 + Math.random() * 2)
          leaf.style.top = `${window.innerHeight + 30}px`
          leaf.style.left = `${endX}px`
          leaf.style.transform = `scale(${scale}) rotate(${rotations}deg) translateZ(0)`
        }, 50),
      )
      timeouts.push(
        window.setTimeout(
          () => {
            leaf.remove()
            const index = leaves.indexOf(leaf)
            if (index > -1) leaves.splice(index, 1)
            createLeaf()
          },
          duration * 1000 + 50,
        ),
      )
    }

    for (let i = 0; i < maxLeaves; i++) {
      timeouts.push(window.setTimeout(createLeaf, i * 800))
    }

    return () => {
      timeouts.forEach((t) => clearTimeout(t))
      leaves.forEach((l) => l.remove())
    }
  }, [])

  return (
    <>
      <Header active="menu" />
      <main className="w-full pt-20 bg-background">
        <div
          className="flex flex-col w-full min-h-screen relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTupRosXJzBaxh8ljknjulwLHgVnxsiKnb6UicTNfBdOcyNtBiJ2Xb4f2x6GPkIOCcNdxdWGUmz_s6Z6a0cWgS34Jb9moc4_dduvMIOMSLOaDuJJqhFFayFUqN6dw-ViJiGdCzoEbxjGnKfiMNx9FR9aRblKjgH6QKxSW8NXwinzqzQhbuAyk3ZEG3wREGvDW4RY0WuThiIPW4v3o5Xy2M6BnN8KeaqelVF8jqXrnGTW4Y2kYYa-CP')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] z-0 pointer-events-none" />
          <div ref={sakuraContainerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden" />

          <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop py-24 md:py-32 w-full flex flex-col items-center">
            <div className="text-center mb-24 md:mb-32 flex flex-col items-center">
              <span
                className="material-symbols-outlined text-secondary text-4xl mb-6 opacity-80"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
              >
                spa
              </span>
              <h1 className="font-display-lg text-display-lg text-primary mb-4 tracking-wider uppercase text-center relative drop-shadow-sm">
                OMAKASE
                <span
                  className="absolute -top-12 -left-16 text-secondary/10 text-9xl font-headline-lg select-none"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
                >
                  献立
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-center italic opacity-80">
                "Mevsimlerin ritmi, ustaların dokunuşuyla tabaklara yansıyor."
              </p>
              <div className="w-16 h-px bg-outline-variant/50 mt-12" />
            </div>

            <div className="w-full max-w-4xl flex flex-col gap-32">
              {CATEGORIES.map((category) => (
                <section key={category.title} className="w-full flex flex-col relative">
                  <div
                    className={`absolute ${category.align === 'left' ? '-left-8 md:-left-24' : '-right-8 md:-right-24'} top-0 h-full hidden md:flex flex-col items-center justify-start pointer-events-none opacity-20`}
                  >
                    <span
                      className="font-headline-lg text-4xl text-primary"
                      data-parallax="0.06"
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      {category.kanji}
                    </span>
                  </div>
                  <h2
                    className={`font-headline-lg text-headline-lg text-primary mb-12 border-b border-outline-variant/30 pb-4 flex items-center justify-between ${category.align === 'right' ? 'text-right sm:text-left' : ''}`}
                  >
                    <span className="tracking-widest uppercase text-3xl">{category.title}</span>
                  </h2>
                  {category.layout === 'list' ? (
                    <div className="flex flex-col gap-4">
                      {category.dishes.map((dish) => (
                        <DishRow key={dish.name} dish={dish} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.dishes.map((dish) => (
                        <DishCard key={dish.name} dish={dish} />
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-8 mb-16">
              <a
                className="group relative inline-block px-8 py-4 bg-primary text-on-primary font-label-sm text-label-sm tracking-widest uppercase overflow-hidden border border-outline-variant hover:border-secondary transition-colors duration-500"
                href="rezervasyon.html"
              >
                <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-[150%] block">
                  Rezervasyon Yap
                </span>
                <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-[150%] transition-transform duration-500 group-hover:translate-y-0 text-secondary">
                  Masa Ayırt
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollProgress />
    </>
  )
}
