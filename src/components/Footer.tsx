const LOGO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuClShDtPwlX9fHbHGvOATv5Jx8l-jiU-5XJ03GFncrO5gPCRxDwpsulDEstYMSmyaRP7ufcvNCUbJZCWELzeYVDB07S_B2HGEEjm5j1b_iQJCQlG_RpzEL2AVDoMkeL3jSZatw8iCWRSacQ9clgNpJKaccAXM5KOQ5BhAyP9QjsJgPhv9f-OrImZ6dbJ-e3P7haGBa7JfOaHJV1vSZJUb7ctQI2ZB7hl_3iEmZRHrIHZScnhkkC4prW'

export default function Footer({ className = '' }: { className?: string }) {
  return (
    <footer className={`w-full bg-primary py-20 relative z-10 ${className}`}>
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <div className="flex flex-col gap-6">
            <img alt="Logo" className="h-12 w-fit object-contain brightness-0 invert" src={LOGO_SRC} />
            <p className="font-body-md text-body-md text-on-primary-container leading-relaxed italic text-opacity-80">
              Wabi-sabi: Kusurun içindeki güzelliği bulmak.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-sm text-label-sm text-on-primary tracking-[0.2em] uppercase opacity-60">
              İletişim
            </h4>
            <p className="font-body-md text-body-md text-on-primary-container">İstanbul, Türkiye</p>
            <p className="font-body-md text-body-md text-on-primary-container">+90 212 000 00 00</p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-sm text-label-sm text-on-primary tracking-[0.2em] uppercase opacity-60">
              Çalışma Saatleri
            </h4>
            <p className="font-body-md text-body-md text-on-primary-container">Salı - Pazar: 18:00 - 23:00</p>
            <p className="font-body-md text-body-md text-on-primary-container">Pazartesi: Kapalı</p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-outline/20 text-center font-label-sm text-label-sm text-on-primary-container opacity-40 uppercase tracking-widest">
          © 2024 Izakaya Zen. Tüm Hakları Saklıdır.
        </div>
      </div>
    </footer>
  )
}
