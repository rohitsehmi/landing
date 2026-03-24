// ── Deesyn Brand Direction Variables ─────────────────────────────────────────
// Run this in Figma's plugin console:
//   Plugins → Development → Open console  (or ⌘⌥I)
// Paste the entire script and press Enter.
// Creates three variable collections — one per brand direction.

const brands = [
  {
    name: 'Direction A — Dark & Precise',
    colors: {
      'color/page':       { r: 0.047, g: 0.047, b: 0.047 },
      'color/surface':    { r: 0.086, g: 0.086, b: 0.086 },
      'color/border':     { r: 0.165, g: 0.165, b: 0.165 },
      'color/text':       { r: 0.949, g: 0.929, b: 0.902 },
      'color/text-muted': { r: 0.478, g: 0.439, b: 0.408 },
      'color/accent':     { r: 0.788, g: 0.663, b: 0.431 },
      'color/accent-fg':  { r: 0.047, g: 0.047, b: 0.047 },
    },
    floats: {
      'spacing/xs': 4, 'spacing/sm': 8, 'spacing/md': 16,
      'spacing/lg': 32, 'spacing/xl': 64, 'spacing/2xl': 96,
      'radius/sm': 2, 'radius/md': 2, 'radius/lg': 4, 'radius/full': 9999,
      'font-size/display': 48, 'font-size/heading': 32,
      'font-size/body': 16, 'font-size/small': 13,
      'font-weight/display': 300, 'font-weight/body': 400,
    },
    strings: {
      'font/display': 'Fraunces',
      'font/body': 'DM Sans',
      'font/mono': 'Geist Mono',
    },
  },
  {
    name: 'Direction B — Warm & Editorial',
    colors: {
      'color/page':       { r: 0.980, g: 0.969, b: 0.949 },
      'color/surface':    { r: 0.941, g: 0.918, b: 0.878 },
      'color/border':     { r: 0.867, g: 0.835, b: 0.784 },
      'color/text':       { r: 0.110, g: 0.094, b: 0.078 },
      'color/text-muted': { r: 0.486, g: 0.439, b: 0.408 },
      'color/accent':     { r: 0.851, g: 0.310, b: 0.188 },
      'color/accent-fg':  { r: 0.980, g: 0.969, b: 0.949 },
    },
    floats: {
      'spacing/xs': 4, 'spacing/sm': 8, 'spacing/md': 16,
      'spacing/lg': 32, 'spacing/xl': 64, 'spacing/2xl': 96,
      'radius/sm': 4, 'radius/md': 4, 'radius/lg': 8, 'radius/full': 9999,
      'font-size/display': 48, 'font-size/heading': 32,
      'font-size/body': 16, 'font-size/small': 13,
      'font-weight/display': 400, 'font-weight/body': 400,
    },
    strings: {
      'font/display': 'Fraunces',
      'font/body': 'DM Sans',
      'font/mono': 'Geist Mono',
    },
  },
  {
    name: 'Direction C — Bold & Systemic',
    colors: {
      'color/page':       { r: 0.973, g: 0.973, b: 0.973 },
      'color/surface':    { r: 0.933, g: 0.933, b: 0.933 },
      'color/border':     { r: 0.816, g: 0.816, b: 0.816 },
      'color/text':       { r: 0.039, g: 0.039, b: 0.039 },
      'color/text-muted': { r: 0.361, g: 0.361, b: 0.361 },
      'color/accent':     { r: 0.059, g: 0.000, b: 0.910 },
      'color/accent-fg':  { r: 0.973, g: 0.973, b: 0.973 },
    },
    floats: {
      'spacing/xs': 4, 'spacing/sm': 8, 'spacing/md': 16,
      'spacing/lg': 32, 'spacing/xl': 64, 'spacing/2xl': 96,
      'radius/sm': 0, 'radius/md': 0, 'radius/lg': 0, 'radius/full': 9999,
      'font-size/display': 48, 'font-size/heading': 32,
      'font-size/body': 16, 'font-size/small': 13,
      'font-weight/display': 600, 'font-weight/body': 400,
    },
    strings: {
      'font/display': 'Fraunces',
      'font/body': 'DM Sans',
      'font/mono': 'Geist Mono',
    },
  },
]

let created = 0

for (const brand of brands) {
  const collection = figma.variables.createVariableCollection(brand.name)
  const modeId = collection.defaultModeId

  for (const [name, rgb] of Object.entries(brand.colors)) {
    const v = figma.variables.createVariable(name, collection, 'COLOR')
    v.setValueForMode(modeId, { ...rgb, a: 1 })
    created++
  }

  for (const [name, value] of Object.entries(brand.floats)) {
    const v = figma.variables.createVariable(name, collection, 'FLOAT')
    v.setValueForMode(modeId, value)
    created++
  }

  for (const [name, value] of Object.entries(brand.strings)) {
    const v = figma.variables.createVariable(name, collection, 'STRING')
    v.setValueForMode(modeId, value)
    created++
  }

  console.log(`✓ ${brand.name}`)
}

console.log(`\nDone — ${created} variables created across 3 collections.`)
console.log('Open Assets panel → Local variables to see them.')
