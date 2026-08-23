import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ShaderBackground from '@/components/ShaderBackground'
import { initMotionLayer } from '@/lib/animations'

const VALUES = [
  { kanji: '静', title: 'Sükunet', description: 'Her ziyaretin, kalabalığın gürültüsünden uzak bir mola olmasını sağlıyoruz.' },
  { kanji: '真', title: 'Özgünlük', description: 'Malzemeyi maskelemeden, doğal tadını ön plana çıkarıyoruz.' },
  { kanji: '和', title: 'Uyum', description: 'Gelenek ile modernliği, doğu ile batıyı aynı tabakta buluşturuyoruz.' },
]

export default function Hakkimizda() {
  useEffect(() => {
    initMotionLayer()
  }, [])

  return (
    <>
      <Header active="hakkimizda" />
      <main className="w-full pt-20">
        <div className="flex flex-col w-full relative min-h-screen bg-transparent text-on-background overflow-hidden">
          <ShaderBackground />
          <div
            className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 mix-blend-multiply z-0"
            style={{ backgroundImage: 'radial-gradient(#e5e2e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          />

          <section className="relative w-full h-[60vh] flex items-center justify-center z-10 overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent z-10 mix-blend-overlay" />
            <div className="absolute inset-0 w-full h-full mix-blend-luminosity opacity-80">
              <img
                alt="Japon zen bahçesi"
                className="w-full h-full object-cover"
                data-parallax=""
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvA9oWoUijoMYpWLJTV9hjKL69iwrnTFeIKJ-GEjdIVNrWYP7tLWIuwximQCZw9R2cQLfAXuLk6ygisDdiYHKjWNG7Bj4JXKF3sArd-t86fU1HMkk7kR9bN6u8qA2kESE2dE5P5tzJBtYuLTUIVI7zmSBV0qqjs0M-FBtqYaK-k_6Kj2lG06TCNR78AzQQWKd8gVLGY7-7CGPyichRyJP_VnQ1azHiGncn1XHOj-yNzf5GM5fklZWC"
              />
            </div>
            <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop text-center flex flex-col items-center">
              <p className="font-label-sm text-label-sm text-on-secondary tracking-[0.3em] uppercase mb-6 opacity-90">
                HAKKIMIZDA
              </p>
              <h1 className="font-display-lg text-display-lg text-on-secondary mb-2 max-w-4xl leading-tight drop-shadow-md">
                Sessizliğin İçindeki <span className="italic font-light">Zanaat.</span>
              </h1>
            </div>
          </section>

          <section className="relative w-full py-[120px] z-10" id="hikaye">
            <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter items-center">
                <div className="lg:col-span-6 flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-[1px] bg-outline" />
                    <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-on-surface-variant">
                      Hikayemiz
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">
                    Bir Tabak, <br />
                    <span className="italic text-surface-tint">Bin Yıllık Gelenek</span>
                  </h2>
                  <div className="space-y-6 text-on-surface-variant font-body-lg text-body-lg">
                    <p>
                      Izakaya Zen, 2010 yılında İstanbul'da, Edomae suşi geleneğini Anadolu'nun cömert
                      misafirperverliğiyle buluşturma fikriyle doğdu. Kurucumuz, Tokyo'daki Toyosu balık
                      pazarının şafak vaktindeki sessizliğinden ilham alarak, her tabakta o sakinliği
                      yeniden yaratmayı hedefledi.
                    </p>
                    <p>
                      Yıllar içinde mutfağımız, wabi-sabi felsefesinin -kusurun, geçiciliğin ve sadeliğin
                      içindeki güzelliği kabul etmenin- bir yansıması haline geldi. Şeflerimiz,
                      geleneksel bıçak tekniklerini modern sunum anlayışıyla harmanlayarak, her ziyareti
                      bir meditasyona dönüştürüyor.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-[4/5] overflow-hidden border border-outline-variant/30 rounded-sm">
                    <img
                      alt="Soya sosu hazırlığı"
                      className="w-full h-full object-cover"
                      data-parallax=""
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDntqiwqh9GWfwMPB1U15T3ENTdqrtl0IGiUSwMeK8wjhmeheZHimifxPus14AWq57fYwO-K3EpsdrRaYanGFiKF74axTWHfOZS0ZZHx17_DOb-p2x75iUCtrHYOZJxpCHLZ-YTthYBkCHRPxBbPH8kB32MbQmPzezAw0RYYbmNQk5gHzlQH1DeYZWPcQ5uBlTZr4ZzIqYURQJn7ScX5zoDFFyutio8zRfRMHCEyb8VaQDqDUjpP8Qe"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary rounded-full flex items-center justify-center shadow-xl rotate-12">
                    <span className="font-display-lg text-4xl text-on-secondary opacity-90">心</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative w-full py-[120px] z-10 bg-primary/95 text-on-primary backdrop-blur-md">
            <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg">Değerlerimiz</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {VALUES.map((value) => (
                  <div key={value.title} className="border-l border-outline/20 pl-6">
                    <span className="font-display-lg text-2xl text-secondary block mb-4">{value.kanji}</span>
                    <h3 className="font-headline-md text-headline-md mb-2">{value.title}</h3>
                    <p className="font-body-md text-on-primary-container">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative w-full py-[120px] z-10 text-center">
            <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col items-center">
              <p className="font-body-lg text-body-lg text-on-surface-variant italic max-w-xl mb-10">
                "Gerçek zarafet, sadeliğin cesaretinde saklıdır."
              </p>
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
          </section>
        </div>
      </main>
      <Footer className="mt-20" />
      <ScrollProgress />
    </>
  )
}
