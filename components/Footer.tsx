import { siteConfig } from "@/config/site.config";

export default function Footer() {
  const { footer, nav, name } = siteConfig;

  return (
    <footer className="bg-surface border-t border-border section-padding !py-12">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-2xl font-display font-bold mb-1">{name}</p>
            <p className="text-muted text-sm">{footer.tagline}</p>
          </div>

          {/* Nav links */}
          <ul className="flex flex-wrap gap-6">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted hover:text-white text-sm transition-colors link-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex gap-4">
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-white text-sm transition-colors link-underline"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">{footer.copyright}</p>
          <p className="text-muted text-xs">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
