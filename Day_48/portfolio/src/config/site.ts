export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  navMenuItems: [
    // {
    //   label: "Profile",
    //   href: "/profile",
    // },
  ],
  links: {
    facebook: "https://facebook.com",
    github: "https://github.com/",
  },
};
