import { useEffect, useState, type FormEvent } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { initMotionLayer } from '@/lib/animations'

export default function Rezervasyon() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    initMotionLayer()
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    e.currentTarget.reset()
  }

  return (
    <>
      <Header active="rezervasyon" />
      <main className="w-full pt-20 bg-background">
        <div
          className="flex flex-col w-full relative min-h-[900px] items-center justify-center py-32 px-4 md:px-8"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxjoigVemwtkv6qLv32ACzg_bUcsGPBlB6xVwruK4qM6xbWjh6fAgVvySKqUVPHcZ0dj7xNWqwkQ_phUY23MLQV2yHK-Sxk25YVa9MNpujkhv1wlQ5J8q-VVTFB3_tR8-IcmtzfjkeM7fGRX0RI1mOWsmKPDQ0ymKpmqNBRHFFat-MK5FWPLSQx3LW7H4TW_rWL96hbpWAQpRZ-PjlnjAeix-E9ZygtQHb646NI8GFrZweWE4eIQpb')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-0" />
          <div className="relative z-10 w-full max-w-2xl bg-surface/85 backdrop-blur-md rounded-sm p-8 md:p-12 shadow-2xl overflow-hidden border border-outline-variant/30">
            <svg className="absolute top-4 right-4 text-secondary/30 w-12 h-12 floating-leaf" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C7.5 2 4 6 4 10.5C4 16 11.5 21 12 21.5C12.5 21 20 16 20 10.5C20 6 16.5 2 12 2Z" />
            </svg>
            <div className="mb-10 text-center">
              <span className="font-display-lg text-3xl text-secondary opacity-80 mb-3 block">卓</span>
              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-2">
                Masanızı Ayırtın
              </h1>
              <p className="font-body-md text-on-surface-variant">
                Sessizliğin ve ustalığın buluştuğu bir omakase akşamı için yerinizi ayırtın.
              </p>
            </div>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1" htmlFor="tarih">
                    Tarih
                  </label>
                  <div className="flex items-center border-b border-outline hover:border-secondary transition-colors pb-1">
                    <span className="material-symbols-outlined text-outline-variant mr-3 group-hover:text-secondary transition-colors">
                      calendar_today
                    </span>
                    <input
                      className="w-full bg-transparent font-body-md text-on-surface focus:outline-none focus:ring-0"
                      id="tarih"
                      name="tarih"
                      required
                      type="date"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1" htmlFor="saat">
                    Saat
                  </label>
                  <div className="flex items-center border-b border-outline hover:border-secondary transition-colors pb-1">
                    <span className="material-symbols-outlined text-outline-variant mr-3 group-hover:text-secondary transition-colors">
                      schedule
                    </span>
                    <select
                      className="w-full bg-transparent font-body-md text-on-surface appearance-none focus:outline-none focus:ring-0 cursor-pointer"
                      id="saat"
                      name="saat"
                      defaultValue=""
                    >
                      <option disabled value="">
                        Saat Seçin
                      </option>
                      <option value="18:00">18:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="21:30">21:30</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="relative group w-full md:w-1/2">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1" htmlFor="kisi">
                  Kişi Sayısı
                </label>
                <div className="flex items-center border-b border-outline hover:border-secondary transition-colors pb-1">
                  <span className="material-symbols-outlined text-outline-variant mr-3 group-hover:text-secondary transition-colors">
                    group
                  </span>
                  <select
                    className="w-full bg-transparent font-body-md text-on-surface appearance-none focus:outline-none focus:ring-0 cursor-pointer"
                    id="kisi"
                    name="kisi"
                    defaultValue="2"
                  >
                    <option value="1">1 Kişi</option>
                    <option value="2">2 Kişi</option>
                    <option value="3">3 Kişi</option>
                    <option value="4">4 Kişi</option>
                    <option value="5+">5+ Kişi (Bizimle İletişime Geçin)</option>
                  </select>
                </div>
              </div>
              <div className="relative group">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1" htmlFor="ad">
                  Ad Soyad
                </label>
                <div className="flex items-center border-b border-outline hover:border-secondary transition-colors pb-1">
                  <span className="material-symbols-outlined text-outline-variant mr-3 group-hover:text-secondary transition-colors">
                    person
                  </span>
                  <input
                    className="w-full bg-transparent font-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-0"
                    id="ad"
                    name="ad"
                    placeholder="Ad Soyad"
                    required
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1" htmlFor="telefon">
                    Telefon
                  </label>
                  <div className="flex items-center border-b border-outline hover:border-secondary transition-colors pb-1">
                    <span className="material-symbols-outlined text-outline-variant mr-3 group-hover:text-secondary transition-colors">
                      call
                    </span>
                    <input
                      className="w-full bg-transparent font-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-0"
                      id="telefon"
                      name="telefon"
                      required
                      type="tel"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1" htmlFor="eposta">
                    E-posta
                  </label>
                  <div className="flex items-center border-b border-outline hover:border-secondary transition-colors pb-1">
                    <span className="material-symbols-outlined text-outline-variant mr-3 group-hover:text-secondary transition-colors">
                      mail
                    </span>
                    <input
                      className="w-full bg-transparent font-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-0"
                      id="eposta"
                      name="eposta"
                      required
                      type="email"
                    />
                  </div>
                </div>
              </div>
              <div className="relative group">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1" htmlFor="not">
                  Özel Not
                </label>
                <div className="flex items-center border-b border-outline hover:border-secondary transition-colors pb-1">
                  <span className="material-symbols-outlined text-outline-variant mr-3 group-hover:text-secondary transition-colors">
                    edit_note
                  </span>
                  <input
                    className="w-full bg-transparent font-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-0"
                    id="not"
                    name="not"
                    placeholder="Alerji, özel gün vb. (opsiyonel)"
                    type="text"
                  />
                </div>
              </div>
              <div className="pt-6">
                <button
                  className="w-full bg-primary hover:bg-secondary text-on-primary font-label-sm text-label-sm uppercase tracking-widest py-4 rounded-sm transition-colors duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
                  type="submit"
                >
                  <span>Rezervasyonu Onayla</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                {submitted && (
                  <p className="mt-6 font-body-md text-secondary text-center">
                    Teşekkürler. Rezervasyon talebiniz alındı, ekibimiz en kısa sürede sizinle iletişime geçecek.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollProgress />
    </>
  )
}
