import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blogs', href: '/blogs' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Support', href: '/support' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
};

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/technogencis', icon: Github },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/technogencis',
    icon: Linkedin,
  },
  { name: 'Twitter', href: 'https://twitter.com/technogencis', icon: Twitter },
  { name: 'Email', href: 'mailto:contact@technogencis.com', icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary"></div>
              <span className="text-xl font-bold">TechnoGencis</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Leading technology solutions provider specializing in innovative
              software development, digital transformation, and cutting-edge
              technology consulting.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Button key={item.name} variant="ghost" size="icon" asChild>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TechnoGencis. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Made with ❤️ by TechnoGencis
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
