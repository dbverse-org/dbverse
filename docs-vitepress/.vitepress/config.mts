import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const sidebar = [
  {
    text: 'Start',
    items: [
      { text: 'Home', link: '/' }
    ]
  },
  {
    text: 'Overview',
    items: [
      { text: 'Concepts', link: '/concepts' },
      { text: 'Architecture', link: '/architecture' }
    ]
  },
  {
    text: 'Packages',
    items: [
      { text: 'Index', link: '/packages' }
    ]
  },
  {
    text: 'Resources',
    items: [
      { text: 'Troubleshooting', link: '/troubleshooting' },
      { text: 'Code of Conduct', link: '/conduct' },
      { text: 'About', link: '/about' }
    ]
  }
]

export default withMermaid(
  defineConfig({
    lang: 'en-US',
    title: 'dbverse',
    description: 'Scientific data analysis with embedded analytical databases.',
    base: '/dbverse/',
    cleanUrls: true,
    outDir: './site',
    cacheDir: './.vitepress/cache',

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/dbverse/assets/dbverse-logo.svg' }],
      ['meta', { name: 'theme-color', content: '#111827' }]
    ],

    themeConfig: {
      siteTitle: 'dbverse',
      logo: {
        src: '/assets/dbverse-logo.svg',
        alt: 'dbverse logo'
      },
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Index', link: '/packages' }
      ],
      sidebar,
      socialLinks: [
        { icon: 'github', link: 'https://github.com/dbverse-org/dbverse' }
      ],
      search: {
        provider: 'local'
      },
      editLink: {
        pattern: 'https://github.com/dbverse-org/dbverse/edit/main/docs-vitepress/:path',
        text: 'Edit this page on GitHub'
      },
      footer: {
        copyright: 'Copyright dbverse contributors'
      }
    }
  })
)
