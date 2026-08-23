import { useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ShaderBackground from '@/components/ShaderBackground'
import BrokenByDesign from '@/components/ui/broken-by-design'
import { initMotionLayer } from '@/lib/animations'

export default function Index() {
  const sakuraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initMotionLayer()

    const el = sakuraRef.current
    if (!el) return
    const onScroll = () => {
      const scrollY = window.scrollY
      const floatY = Math.sin(scrollY * 0.005) * 40
      const floatX = Math.cos(scrollY * 0.003) * 20
      const rotation = scrollY * 0.05
      el.style.transform = `translate3d(${floatX}px, ${floatY}px, 0) rotate(${rotation}deg)`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Header active="index" />
      <main className="w-full pt-20">
        <div className="w-full relative min-h-screen bg-transparent text-on-background overflow-hidden">
          <ShaderBackground />
          <div
            className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 mix-blend-multiply z-0"
            style={{ backgroundImage: 'radial-gradient(#e5e2e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          />
          <div
            ref={sakuraRef}
            className="fixed top-24 right-8 w-16 h-16 z-50 pointer-events-none drop-shadow-xl"
            style={{ transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          />

          {/* Hero — restoranın imza tabaklarını "kırık cam" mozaiği içinde gösteren
              etkileşimli giriş bölümü. */}
          <BrokenByDesign height="100vh" />

          <section className="relative w-full py-[120px] z-10 bg-transparent">
            <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter items-center">
                <div className="lg:col-span-5 relative group">
                  <div className="absolute -inset-4 bg-surface-container-high/40 backdrop-blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
                  <div className="relative aspect-[3/4] overflow-hidden border border-outline-variant/30 rounded-sm">
                    <img
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                      alt="Japon zen bahçesi"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvA9oWoUijoMYpWLJTV9hjKL69iwrnTFeIKJ-GEjdIVNrWYP7tLWIuwximQCZw9R2cQLfAXuLk6ygisDdiYHKjWNG7Bj4JXKF3sArd-t86fU1HMkk7kR9bN6u8qA2kESE2dE5P5tzJBtYuLTUIVI7zmSBV0qqjs0M-FBtqYaK-k_6Kj2lG06TCNR78AzQQWKd8gVLGY7-7CGPyichRyJP_VnQ1azHiGncn1XHOj-yNzf5GM5fklZWC"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary rounded-full flex items-center justify-center shadow-xl rotate-12 scale-90 group-hover:scale-100 transition-transform duration-700">
                    <span className="font-display-lg text-4xl text-on-secondary opacity-90">和</span>
                  </div>
                </div>
                <div className="lg:col-span-6 lg:col-start-7 flex flex-col pt-8 lg:pt-0">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-[1px] bg-outline" />
                    <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-on-surface-variant">
                      Felsefemiz
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">
                    Denge ve Uyumun <br />
                    <span className="italic text-surface-tint">Sessiz Şiiri</span>
                  </h2>
                  <div className="space-y-6 text-on-surface-variant font-body-lg text-body-lg">
                    <p>
                      Sakura &amp; Zen'de, yemek pişirmeyi bir sanat formu olarak görüyoruz. Tıpkı bir Zen
                      bahçesinin özenle düzenlenmesi gibi, her tabağımızda doğanın sunduğu en taze
                      malzemeleri, mevsimlerin ritmiyle uyum içinde sunuyoruz.
                    </p>
                    <p>
                      Wabi-sabi felsefesini benimsiyor; sadeliğin içindeki kusursuzluğu, geçiciliğin
                      içindeki güzelliği arıyoruz. Geleneksel Edomae tekniklerini, modern bir sunumla
                      birleştirerek, sadece doyurucu değil, aynı zamanda ruhu besleyen bir gastronomi
                      deneyimi vadediyoruz.
                    </p>
                  </div>
                  <div className="mt-12">
                    <a
                      className="inline-flex items-center gap-3 font-label-sm text-label-sm text-primary tracking-widest uppercase hover:text-secondary transition-colors group"
                      href="hakkimizda.html#hikaye"
                    >
                      Hikayemizi Keşfedin
                      <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-2">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-label="Atmosfer Galerisi"
            className="relative w-full min-h-screen py-[120px] z-10 bg-surface overflow-hidden flex flex-col justify-center"
            data-horizontal-gallery=""
          >
            <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-outline" />
                <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-on-surface-variant">
                  Atmosfer
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Her Köşede <span className="italic text-surface-tint">Bir Detay</span>
              </h2>
            </div>
            <div className="w-full overflow-hidden" data-horizontal-track-wrap="">
              <div className="flex gap-8 px-margin-mobile lg:px-margin-desktop w-max" data-horizontal-track="">
                {ATMOSFER_CARDS.map((card) => (
                  <article key={card.title} className="w-[280px] md:w-[360px] flex-none">
                    <div className="relative aspect-[3/4] overflow-hidden border border-outline-variant/30 rounded-sm mb-4">
                      <img alt={card.alt} className="w-full h-full object-cover" src={card.src} />
                    </div>
                    <h3 className="font-headline-md text-xl text-on-surface mb-1">{card.title}</h3>
                    <p className="font-body-md text-on-surface-variant text-sm">{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="relative w-full py-[160px] z-10 bg-primary/95 text-on-primary backdrop-blur-md">
            <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                  <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg mb-4">Öne Çıkanlar</h2>
                  <p className="font-body-md text-on-primary-container max-w-md">
                    Şefimizin özenle hazırladığı, mevsimin en taze lezzetlerini yansıtan imza tabaklarımız.
                  </p>
                </div>
                <a
                  className="border-b border-on-primary/30 pb-1 font-label-sm text-label-sm tracking-widest uppercase hover:border-secondary hover:text-secondary transition-colors whitespace-nowrap"
                  href="menu.html"
                >
                  Tüm Menüyü Gör
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <article className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6 border border-outline/20">
                    <img
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      alt="Omakase Deneyimi"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwyfxEVbKthIhYjG35g7BXAVXs0nKANkNjABZ9sRM-elLQ6UGvAAoh4R3ZJVIdwi_VLD6HK1q7VDkcsC3CyxtH5VYdLV52SNKmAbZhfGo1N6vP46uN0AzDE0RwGAtzfTcidjWxwOO6n3Kzj8LVs61wP26EXMRE4pbfPreO_GgVYHtaOq_qkjuIE7uezOIqMu_eyFlDsL7QjiqMXhB-nyh6-iDKPpqXQ_o2kufR3sudNBN4mWGTxKlm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-headline-md text-headline-md">Omakase Deneyimi</h3>
                    <span className="font-label-sm text-secondary tracking-widest">₺3.500</span>
                  </div>
                  <div className="w-full border-b border-outline/20 border-dotted mb-3" />
                  <p className="font-body-md text-on-primary-container line-clamp-2">
                    Şefin seçimiyle hazırlanan, 15 aşamalı geleneksel ve modern lezzet yolculuğu.
                  </p>
                </article>
                <article className="group cursor-pointer md:mt-16">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6 border border-outline/20">
                    <img
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      alt="Mevsim Nigiri"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXlvbY8syfGaV_rVsliz0UX5CiuJScXxtYS7ODWyhelDqB3NVr71Yk-SRhrD9apj1tds6L0SDEB6pKHVSKupUWj15_o9edgHBhPulfe0Td9AYoe5V-Q6Rr0Pqun72XZIZkbAchCdTiF_lFZZuPxfc-eAgdsDjfFeRKZHBELK46bOSh-DPAdCnPe8SWd8mcCjYizLJvlN20uVDMMWuPIjGK1egj00hVz_0TlyA9Zy8oa49iA_YDWDT5"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg z-10">
                      <span className="font-label-sm text-[10px] text-on-secondary tracking-widest leading-none text-center">
                        YENİ
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-headline-md text-headline-md">Mevsim Nigiri</h3>
                    <span className="font-label-sm text-secondary tracking-widest">₺950</span>
                  </div>
                  <div className="w-full border-b border-outline/20 border-dotted mb-3" />
                  <p className="font-body-md text-on-primary-container line-clamp-2">
                    Günlük olarak Tokyo'dan getirtilen balıklarla hazırlanan, mevsimin en taze seçkisi.
                  </p>
                </article>
                <article className="group cursor-pointer md:mt-32">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6 border border-outline/20">
                    <img
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      alt="Matcha Rüyası"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6ZZcgJSL5wnmp3m7Q4h9nxRajGkGLMJcq_8JwmBMHdaD_hRMa5HofrZjO32eUHfg30WX0kqlGi7tD_FcIPzjD6y8n1YKA_jBOepOBu0n8t7nF1pMlByt76i0v-zYuj9S9OHdTXsTdyU6IzeMNFuJ2L1yLx_3pbSjdAWofxrAyEKqUunCLoR_ujSAcr3cqN2EV-kw6Dk7RfyZrTSR-Bk1RbAEiyWiFShp3RbTH70u-SvKPQwOs1EI7"
                    />
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-headline-md text-headline-md">Matcha Rüyası</h3>
                    <span className="font-label-sm text-secondary tracking-widest">₺420</span>
                  </div>
                  <div className="w-full border-b border-outline/20 border-dotted mb-3" />
                  <p className="font-body-md text-on-primary-container line-clamp-2">
                    Kyoto'nun premium matcha çayı ile hazırlanan, sıcak ve soğuğun mükemmel uyumu.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="relative w-full py-[120px] bg-surface-container/60 backdrop-blur-sm overflow-hidden z-10">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'><g fill=\\'none\\' fill-rule=\\'evenodd\\'><g fill=\\'%23000000\\' fill-opacity=\\'1\\'><path d=\\'M30 30c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM0 60c0-5.523 4.477-10 10-10s10 4.477 10 10v2h-2v-2c0-4.418-3.582-8-8-8s-8 3.582-8 8v2H0v-2zm60 0c0-5.523-4.477-10-10-10s-10 4.477-10 10v2h2v-2c0-4.418 3.582-8 8-8s8 3.582 8 8v2h2v-2zM30 60c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z\\'/></g></g></svg>')",
              }}
            />
            <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop relative">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="w-full lg:w-1/2">
                  <span className="font-label-sm text-label-sm text-secondary tracking-[0.2em] uppercase mb-4 block">
                    [ Kültürel Köşemiz ]
                  </span>
                  <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
                    Özüne Sadık,
                    <br />
                    Malzemeye Saygılı.
                  </h2>
                  <div className="h-[1px] w-full bg-outline-variant/50 mb-8 relative">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-[2px] bg-secondary" />
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                    Gerçek Japon mutfağı, malzemenin doğal tat profilini gizlemek yerine onu ön plana
                    çıkarmayı amaçlar. Biz de mutfağımızda, mevsimin sunduğu en iyi ürünleri arıyor,
                    onları geleneksel tekniklerle onurlandırıyoruz. Soya sosumuz yıllanmış, pirincimiz
                    özenle seçilmiş, deniz ürünlerimiz ise sürdürülebilir kaynaklardan temin edilmiştir.
                  </p>
                  <div className="grid grid-cols-2 gap-8 mt-12">
                    <div className="border-l border-outline-variant pl-6 hover:border-secondary transition-colors">
                      <h4 className="font-headline-md text-[24px] text-on-surface mb-2">Toyosu</h4>
                      <p className="font-body-md text-on-surface-variant text-sm">Haftalık taze balık ithalatı.</p>
                    </div>
                    <div className="border-l border-outline-variant pl-6 hover:border-secondary transition-colors">
                      <h4 className="font-headline-md text-[24px] text-on-surface mb-2">Koshihikari</h4>
                      <p className="font-body-md text-on-surface-variant text-sm">Premium kalite suşi pirinci.</p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 relative h-[500px]">
                  <div className="absolute top-0 right-0 w-3/4 h-[400px] border border-outline-variant bg-surface/90 backdrop-blur-sm p-4 shadow-sm z-10 hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Soya sosu hazırlığı"
                      data-parallax="0.04"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDntqiwqh9GWfwMPB1U15T3ENTdqrtl0IGiUSwMeK8wjhmeheZHimifxPus14AWq57fYwO-K3EpsdrRaYanGFiKF74axTWHfOZS0ZZHx17_DOb-p2x75iUCtrHYOZJxpCHLZ-YTthYBkCHRPxBbPH8kB32MbQmPzezAw0RYYbmNQk5gHzlQH1DeYZWPcQ5uBlTZr4ZzIqYURQJn7ScX5zoDFFyutio8zRfRMHCEyb8VaQDqDUjpP8Qe"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-2/3 h-[300px] border border-outline-variant bg-surface/90 backdrop-blur-sm p-4 shadow-md z-20 hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Pirinç yıkama"
                      data-parallax="0.04"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjARr_nuIlftt3Iw96w9lbl0SCTTe5dCnVd7KbLbaZvTSzp4NRrz_lnBS6ey_Xg3SerB1lrGPYuRnMGcrBqxpzAZfzrn2yd-9zm9pWdfxVXQp5GB_0tGVQlvvUzVnMxsgheJJIihm4Bun2wXFFWXXLVclOoe2Wq5irWqU-9inGQOXE98_28pdZmj1H81jJERTkefxCxylQC01HCMYE6zx-MDZWzkeYZiI5ppymRmpj0XogyyYlq4Za"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer className="mt-20" />
      <ScrollProgress />
    </>
  )
}

const ATMOSFER_CARDS = [
  {
    title: 'Zen Bahçesi',
    description: 'Sakinliğin taşlara işlendiği köşemiz.',
    alt: 'Zen bahçesi detayı',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvA9oWoUijoMYpWLJTV9hjKL69iwrnTFeIKJ-GEjdIVNrWYP7tLWIuwximQCZw9R2cQLfAXuLk6ygisDdiYHKjWNG7Bj4JXKF3sArd-t86fU1HMkk7kR9bN6u8qA2kESE2dE5P5tzJBtYuLTUIVI7zmSBV0qqjs0M-FBtqYaK-k_6Kj2lG06TCNR78AzQQWKd8gVLGY7-7CGPyichRyJP_VnQ1azHiGncn1XHOj-yNzf5GM5fklZWC',
  },
  {
    title: 'Yıllanmış Soya',
    description: 'Sabırla olgunlaşan, geleneksel tatlar.',
    alt: 'Soya sosu hazırlığı',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDntqiwqh9GWfwMPB1U15T3ENTdqrtl0IGiUSwMeK8wjhmeheZHimifxPus14AWq57fYwO-K3EpsdrRaYanGFiKF74axTWHfOZS0ZZHx17_DOb-p2x75iUCtrHYOZJxpCHLZ-YTthYBkCHRPxBbPH8kB32MbQmPzezAw0RYYbmNQk5gHzlQH1DeYZWPcQ5uBlTZr4ZzIqYURQJn7ScX5zoDFFyutio8zRfRMHCEyb8VaQDqDUjpP8Qe',
  },
  {
    title: 'Özenli Hazırlık',
    description: 'Her tanenin tek tek gözden geçirildiği an.',
    alt: 'Pirinç yıkama',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjARr_nuIlftt3Iw96w9lbl0SCTTe5dCnVd7KbLbaZvTSzp4NRrz_lnBS6ey_Xg3SerB1lrGPYuRnMGcrBqxpzAZfzrn2yd-9zm9pWdfxVXQp5GB_0tGVQlvvUzVnMxsgheJJIihm4Bun2wXFFWXXLVclOoe2Wq5irWqU-9inGQOXE98_28pdZmj1H81jJERTkefxCxylQC01HCMYE6zx-MDZWzkeYZiI5ppymRmpj0XogyyYlq4Za',
  },
  {
    title: 'Şefin Dokunuşu',
    description: '15 aşamalı yolculuğun doruk noktası.',
    alt: 'Omakase sunumu',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwyfxEVbKthIhYjG35g7BXAVXs0nKANkNjABZ9sRM-elLQ6UGvAAoh4R3ZJVIdwi_VLD6HK1q7VDkcsC3CyxtH5VYdLV52SNKmAbZhfGo1N6vP46uN0AzDE0RwGAtzfTcidjWxwOO6n3Kzj8LVs61wP26EXMRE4pbfPreO_GgVYHtaOq_qkjuIE7uezOIqMu_eyFlDsL7QjiqMXhB-nyh6-iDKPpqXQ_o2kufR3sudNBN4mWGTxKlm',
  },
  {
    title: 'Mevsim Seçkisi',
    description: 'Günün en taze balıklarıyla hazırlanır.',
    alt: 'Nigiri sunumu',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXlvbY8syfGaV_rVsliz0UX5CiuJScXxtYS7ODWyhelDqB3NVr71Yk-SRhrD9apj1tds6L0SDEB6pKHVSKupUWj15_o9edgHBhPulfe0Td9AYoe5V-Q6Rr0Pqun72XZIZkbAchCdTiF_lFZZuPxfc-eAgdsDjfFeRKZHBELK46bOSh-DPAdCnPe8SWd8mcCjYizLJvlN20uVDMMWuPIjGK1egj00hVz_0TlyA9Zy8oa49iA_YDWDT5',
  },
]
