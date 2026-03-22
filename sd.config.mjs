import StyleDictionary from 'style-dictionary'

const base = [
  'tokens/primitives.json',
  'tokens/typography.json',
  'tokens/elevation.json',
  'tokens/states.json',
  'tokens/motion.json',
  'tokens/icons.json',
  'tokens/semantic.json',
]

const builds = [
  {
    source: [...base, 'tokens/themes/light.json'],
    platform: 'css-light',
    destination: 'tokens.css',
    selector: ":root, [data-theme='light']",
  },
  {
    source: ['tokens/primitives.json', 'tokens/themes/dark.json'],
    platform: 'css-dark',
    destination: 'tokens-dark.css',
    selector: "[data-theme='dark']",
  },
  {
    source: ['tokens/primitives.json', 'tokens/themes/direction-a.json'],
    platform: 'css-direction-a',
    destination: 'tokens-direction-a.css',
    selector: "[data-brand='a']",
  },
  {
    source: ['tokens/primitives.json', 'tokens/themes/direction-b.json'],
    platform: 'css-direction-b',
    destination: 'tokens-direction-b.css',
    selector: "[data-brand='b']",
  },
  {
    source: ['tokens/primitives.json', 'tokens/themes/direction-c.json'],
    platform: 'css-direction-c',
    destination: 'tokens-direction-c.css',
    selector: "[data-brand='c']",
  },
]

for (const build of builds) {
  const sd = new StyleDictionary({
    source: build.source,
    platforms: {
      [build.platform]: {
        transformGroup: 'css',
        buildPath: 'styles/',
        files: [
          {
            destination: build.destination,
            format: 'css/variables',
            options: { selector: build.selector },
          },
        ],
      },
    },
  })
  await sd.buildAllPlatforms()
}
