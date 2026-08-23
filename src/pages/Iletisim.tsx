import { useEffect, useState, type FormEvent } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { initMotionLayer } from '@/lib/animations'

export default function Iletisim() {
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
      <Header active="iletisim" />
      <main
        className="w-full pt-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250, 249, 249, 0.85), rgba(250, 249, 249, 0.85)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYzFgpQRbGXuQfgfUEC0awyiE1L0Qwgqesui0d_Z8Jl-n6rZfm9aokaV2K462BT7AU2OmBdBf1ZTd5xiXdogVBROT_4idxlxicUSKSSX2htDHdk_W0yyyd6P3_qO3WzDbufBoxqbJh4eUta-wQPhTcl3lb6UV_aD8Cvo_gl4IC--o0GzKl59KMilG8LaV5hBgoEWjI_dPPSqzXTnWns8fkN_BOB0HA66pOCci-Wv5-t7rMHqs544hs')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="flex flex-col w-full relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-multiply opacity-80">
            <div
              className="absolute top-10 left-[10%] w-3 h-3 bg-secondary rounded-full blur-[2px]"
              style={{ animation: 'float-fade 8s ease-in-out infinite' }}
            />
            <div
              className="absolute top-40 right-[20%] w-4 h-4 bg-secondary rounded-[4px] rotate-45 blur-[1px]"
              style={{ animation: 'float-fade 12s ease-in-out infinite reverse' }}
            />
            <div
              className="absolute bottom-20 left-[30%] w-2 h-2 bg-secondary rounded-full blur-[1px]"
              style={{ animation: 'float-fade 10s ease-in-out 1s infinite' }}
            />
          </div>

          <section className="w-full pt-16 pb-24 md:pt-24 md:pb-32 relative flex items-center justify-center">
            <div
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_VfsTE7dGXh9JUyuthF_CrGS_B1r1Fk23R98s5Q0K4rZqDHrF1YU87fHSCfJkZdc2JtMS3Hekr_W6lY2Gu486hon7m1N3goDFNeydDQXW3tAkuYqhnSShjOIaC-RgEY5vMa3rPYdwp0EdC3mCfR0cVzPfjQwxHYoxq38jj43EB85b0ofpX42ALn-uJy3viJiGJIpqJHoUUCHG_MeQn_NN4FXb22FkFMuNC6RMpi7-qBgUXBM7Ex-u')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="max-w-container-max w-full px-margin-mobile lg:px-margin-desktop relative z-20 text-center">
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-4">Bize Ulaşın</p>
              <h1 className="font-display-lg text-display-lg text-on-background max-w-3xl mx-auto">
                Sessizliğe
                <br />
                <span className="italic text-surface-tint">Bir Davet</span>
              </h1>
            </div>
          </section>

          <section className="max-w-container-max w-full mx-auto px-margin-mobile lg:px-margin-desktop pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start relative">
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-outline-variant/30 to-transparent -translate-x-1/2" />

              <div className="flex flex-col gap-12 lg:pr-12">
                <div className="space-y-8">
                  <h2 className="font-headline-lg text-headline-lg text-on-background pb-4 border-b border-outline-variant/20 inline-block pr-12">
                    Bize Ulaşın
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary mt-1">location_on</span>
                      <div>
                        <h3 className="font-label-sm text-label-sm text-surface-tint uppercase tracking-widest mb-1">Adres</h3>
                        <p className="font-body-lg text-body-lg text-on-background">
                          Bebek Mahallesi, Sahil Sokak No:12
                          <br />
                          Beşiktaş, İstanbul
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary mt-1">call</span>
                      <div>
                        <h3 className="font-label-sm text-label-sm text-surface-tint uppercase tracking-widest mb-1">Telefon</h3>
                        <p className="font-body-lg text-body-lg text-on-background">+90 212 000 00 00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary mt-1">mail</span>
                      <div>
                        <h3 className="font-label-sm text-label-sm text-surface-tint uppercase tracking-widest mb-1">E-posta</h3>
                        <p className="font-body-lg text-body-lg text-on-background hover:text-secondary transition-colors cursor-pointer">
                          rezervasyon@izakayazen.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary mt-1">schedule</span>
                      <div>
                        <h3 className="font-label-sm text-label-sm text-surface-tint uppercase tracking-widest mb-1">
                          Çalışma Saatleri
                        </h3>
                        <p className="font-body-md text-body-md text-on-background">
                          Akşam Yemeği: Salı - Pazar, 18:00 - 23:00
                          <br />
                          <span className="text-surface-tint text-sm">Pazartesi ve resmi tatillerde kapalıyız</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full aspect-[4/3] relative rounded-sm overflow-hidden group">
                  <div className="absolute inset-0 border border-outline-variant/30 z-10 pointer-events-none transition-colors group-hover:border-secondary/50" />
                  <img
                    alt="Bebek, Beşiktaş / İstanbul"
                    className="w-full h-full object-cover filter grayscale opacity-80 mix-blend-luminosity group-hover:grayscale-0 transition-all duration-1000"
                    data-parallax=""
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvA9oWoUijoMYpWLJTV9hjKL69iwrnTFeIKJ-GEjdIVNrWYP7tLWIuwximQCZw9R2cQLfAXuLk6ygisDdiYHKjWNG7Bj4JXKF3sArd-t86fU1HMkk7kR9bN6u8qA2kESE2dE5P5tzJBtYuLTUIVI7zmSBV0qqjs0M-FBtqYaK-k_6Kj2lG06TCNR78AzQQWKd8gVLGY7-7CGPyichRyJP_VnQ1azHiGncn1XHOj-yNzf5GM5fklZWC"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-8 lg:pl-12 lg:pt-16 relative">
                <div className="absolute -top-12 -right-8 opacity-20 pointer-events-none hidden lg:block">
                  <svg className="fill-current text-primary" height="120" viewBox="0 0 100 100" width="120">
                    <path
                      d="M50 25 C65 25, 75 35, 75 50 C75 65, 65 75, 50 75 C35 75, 25 65, 25 50 C25 35, 35 25, 50 25 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M50 35 C60 35, 65 40, 65 50 C65 60, 60 65, 50 65 C40 65, 35 60, 35 50 C35 40, 40 35, 50 35 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-background mb-2">Bize Yazın</h2>
                  <p className="font-body-md text-body-md text-surface-tint">
                    Özel davet veya özel talepleriniz için, ekibimizin dönüş yapması 24 saat sürebilir.
                  </p>
                </div>
                <form className="flex flex-col gap-10 mt-4" onSubmit={handleSubmit}>
                  <div className="relative group">
                    <input
                      className="w-full bg-transparent border-b border-outline-variant py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary transition-colors"
                      id="c-ad"
                      name="ad"
                      placeholder="Ad Soyad"
                      required
                      type="text"
                    />
                  </div>
                  <div className="relative group">
                    <input
                      className="w-full bg-transparent border-b border-outline-variant py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary transition-colors"
                      id="c-eposta"
                      name="eposta"
                      placeholder="E-posta Adresi"
                      required
                      type="email"
                    />
                  </div>
                  <div className="relative group">
                    <select
                      className="w-full bg-transparent border-b border-outline-variant py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      id="c-tur"
                      defaultValue=""
                    >
                      <option disabled hidden value="">
                        Talep Türü Seçin
                      </option>
                      <option value="rezervasyon">Genel Rezervasyon</option>
                      <option value="ozel">Özel Davet (Omakase Odası)</option>
                      <option value="diyet">Diyet Kısıtlamaları</option>
                      <option value="diger">Diğer</option>
                    </select>
                    <span className="absolute right-0 top-4 material-symbols-outlined text-surface-tint pointer-events-none">
                      expand_more
                    </span>
                  </div>
                  <div className="relative group">
                    <textarea
                      className="w-full bg-transparent border-b border-outline-variant py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary transition-colors resize-none"
                      id="c-mesaj"
                      name="mesaj"
                      placeholder="Mesajınız"
                      required
                      rows={4}
                    />
                  </div>
                  <button
                    className="self-start px-10 py-4 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-[0.2em] hover:bg-secondary transition-colors relative overflow-hidden group"
                    type="submit"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Mesajı Gönder{' '}
                      <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </span>
                  </button>
                  {submitted && (
                    <p className="font-body-md text-secondary">
                      Mesajınız için teşekkürler, en kısa sürede size dönüş yapacağız.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <ScrollProgress />
    </>
  )
}
