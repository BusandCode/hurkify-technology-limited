import { NAV_LINKS } from "@/lib/nav-links";

export function Footer() {
  return (
    <footer className="bg-secondary text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xs">
            <span className="font-display text-lg font-extrabold text-white">
              Hurkify
            </span>
            <p className="mt-3 text-sm leading-relaxed">
              IT consulting and healthcare technology support for businesses
              across Nigeria.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Navigate
            </h3>
            <ul className="mt-4 flex flex-col flex-wrap gap-x-6 gap-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>support@hurkify.com</li>
              <li>
                6, Asabi Cole Street, Off ShopRite Bustop, Alausa, Ikeja
                <br />
                <span className="text-white/50">
                  (Closest landmark: Passport Office)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Hurkify Technology Limited. All
            rights reserved.
          </p>
          <p>Registered in Nigeria</p>
        </div>
      </div>
    </footer>
  );
}