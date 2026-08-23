import { cn } from '@/lib/utils'

type PageKey = 'index' | 'menu' | 'hakkimizda' | 'rezervasyon' | 'iletisim'

const NAV_ITEMS: { key: PageKey; label: string; href: string }[] = [
  { key: 'menu', label: 'MENÜ', href: 'menu.html' },
  { key: 'hakkimizda', label: 'HAKKIMIZDA', href: 'hakkimizda.html' },
  { key: 'rezervasyon', label: 'REZERVASYON', href: 'rezervasyon.html' },
  { key: 'iletisim', label: 'İLETİŞİM', href: 'iletisim.html' },
]

const LOGO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuClShDtPwlX9fHbHGvOATv5Jx8l-jiU-5XJ03GFncrO5gPCRxDwpsulDEstYMSmyaRP7ufcvNCUbJZCWELzeYVDB07S_B2HGEEjm5j1b_iQJCQlG_RpzEL2AVDoMkeL3jSZatw8iCWRSacQ9clgNpJKaccAXM5KOQ5BhAyP9QjsJgPhv9f-OrImZ6dbJ-e3P7haGBa7JfOaHJV1vSZJUb7ctQI2ZB7hl_3iEmZRHrIHZScnhkkC4prW'

export default function Header({ active }: { active: PageKey }) {
  const logo = <img alt="Logo" className="h-8 w-auto object-contain" src={LOGO_SRC} />

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-primary shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
        <div className="h-20 max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between">
          <div className="flex items-center gap-4">
            {active === 'index' ? logo : <a href="index.html">{logo}</a>}
            <span className="font-headline-md text-headline-md text-on-primary tracking-widest uppercase">
              Izakaya Zen
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={cn(
                  'font-label-sm text-label-sm transition-colors py-2',
                  item.key === active
                    ? 'text-secondary border-b border-secondary'
                    : 'text-on-primary-container hover:text-on-primary',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <button
              type="button"
              data-mobile-menu-toggle=""
              aria-controls="mobile-menu-panel"
              aria-expanded="false"
              aria-label="Menüyü aç"
              className="md:hidden flex items-center justify-center w-10 h-10 text-on-primary"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-outline-variant">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu-panel"
        data-mobile-menu-panel=""
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-primary md:hidden opacity-0 pointer-events-none"
      >
        <nav data-mobile-menu-links="" className="h-full flex flex-col items-center justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(
                'font-headline-md text-headline-md tracking-widest uppercase',
                item.key === active ? 'text-secondary' : 'text-on-primary',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
