#!/usr/bin/env node
// ── Push brand direction variables to Figma ──────────────────────────────────
// Creates three variable collections (Direction A, B, C) with colour, spacing,
// radius, and typography tokens for each brand direction.
//
// Usage:
//   FIGMA_TOKEN=your_token node scripts/push-brand-variables.mjs
//
// Required Figma token scope: file_variables:write

const FILE_KEY = 'LQM36v4ut0TV6VJULtF1GU'
const TOKEN = process.env.FIGMA_TOKEN

if (!TOKEN) {
  console.error('Error: FIGMA_TOKEN env var is required.')
  console.error('  FIGMA_TOKEN=your_token node scripts/push-brand-variables.mjs')
  process.exit(1)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert #RRGGBB to Figma RGBA (0–1 range) */
function hex(h) {
  const r = parseInt(h.slice(1, 3), 16) / 255
  const g = parseInt(h.slice(3, 5), 16) / 255
  const b = parseInt(h.slice(5, 7), 16) / 255
  return { r, g, b, a: 1 }
}

/** Figma variable value shape for COLOR type */
const color = (hexStr) => ({ type: 'VARIABLE_VALUE', resolvedType: 'COLOR', value: hex(hexStr) })

/** Figma variable value shape for FLOAT type */
const float = (n) => ({ type: 'VARIABLE_VALUE', resolvedType: 'FLOAT', value: n })

/** Figma variable value shape for STRING type */
const string = (s) => ({ type: 'VARIABLE_VALUE', resolvedType: 'STRING', value: s })

// ── Brand token definitions ───────────────────────────────────────────────────

const brands = [
  {
    name: 'Direction A — Dark & Precise',
    refs: 'Pentagram · Sagmeister & Walsh',
    colors: {
      'color/page':         '#0C0C0C',
      'color/surface':      '#161616',
      'color/border':       '#2A2A2A',
      'color/text':         '#F2EDE6',
      'color/text-muted':   '#7A7068',
      'color/accent':       '#C9A96E',
      'color/accent-fg':    '#0C0C0C',
    },
    spacing: {
      'spacing/xs':  4,
      'spacing/sm':  8,
      'spacing/md':  16,
      'spacing/lg':  32,
      'spacing/xl':  64,
      'spacing/2xl': 96,
    },
    radius: {
      'radius/sm':   2,
      'radius/md':   2,
      'radius/lg':   4,
      'radius/full': 9999,
    },
    type: {
      'font/display':           'Fraunces',
      'font/body':              'DM Sans',
      'font/mono':              'Geist Mono',
      'font-size/display':      48,
      'font-size/heading':      32,
      'font-size/body':         16,
      'font-size/small':        13,
      'font-weight/display':    300,
      'font-weight/body':       400,
      'letter-spacing/display': -0.03,
      'letter-spacing/body':    0.005,
    },
  },
  {
    name: 'Direction B — Warm & Editorial',
    refs: 'Wolff Olins · Bureau Borsche',
    colors: {
      'color/page':         '#FAF7F2',
      'color/surface':      '#F0EAE0',
      'color/border':       '#DDD5C8',
      'color/text':         '#1C1814',
      'color/text-muted':   '#7C7068',
      'color/accent':       '#D94F30',
      'color/accent-fg':    '#FAF7F2',
    },
    spacing: {
      'spacing/xs':  4,
      'spacing/sm':  8,
      'spacing/md':  16,
      'spacing/lg':  32,
      'spacing/xl':  64,
      'spacing/2xl': 96,
    },
    radius: {
      'radius/sm':   4,
      'radius/md':   4,
      'radius/lg':   8,
      'radius/full': 9999,
    },
    type: {
      'font/display':           'Fraunces',
      'font/body':              'DM Sans',
      'font/mono':              'Geist Mono',
      'font-size/display':      48,
      'font-size/heading':      32,
      'font-size/body':         16,
      'font-size/small':        13,
      'font-weight/display':    400,
      'font-weight/body':       400,
      'letter-spacing/display': -0.025,
      'letter-spacing/body':    0,
    },
  },
  {
    name: 'Direction C — Bold & Systemic',
    refs: 'Experimental Jetset · 2×4',
    colors: {
      'color/page':         '#F8F8F8',
      'color/surface':      '#EEEEEE',
      'color/border':       '#D0D0D0',
      'color/text':         '#0A0A0A',
      'color/text-muted':   '#5C5C5C',
      'color/accent':       '#0F00E8',
      'color/accent-fg':    '#F8F8F8',
    },
    spacing: {
      'spacing/xs':  4,
      'spacing/sm':  8,
      'spacing/md':  16,
      'spacing/lg':  32,
      'spacing/xl':  64,
      'spacing/2xl': 96,
    },
    radius: {
      'radius/sm':   0,
      'radius/md':   0,
      'radius/lg':   0,
      'radius/full': 9999,
    },
    type: {
      'font/display':           'Fraunces',
      'font/body':              'DM Sans',
      'font/mono':              'Geist Mono',
      'font-size/display':      48,
      'font-size/heading':      32,
      'font-size/body':         16,
      'font-size/small':        13,
      'font-weight/display':    600,
      'font-weight/body':       400,
      'letter-spacing/display': -0.045,
      'letter-spacing/body':    -0.005,
    },
  },
]

// ── Build Figma API payload ────────────────────────────────────────────────────

function buildPayload() {
  const variableCollections = []
  const variableModes = []
  const variables = []
  const variableModeValues = []

  brands.forEach((brand, bi) => {
    const collectionId = `collection_${bi}`
    const modeId = `mode_${bi}`

    // Collection
    variableCollections.push({
      action: 'CREATE',
      id: collectionId,
      name: brand.name,
      initialModeId: modeId,
    })

    // Mode
    variableModes.push({
      action: 'CREATE',
      id: modeId,
      name: 'Default',
      variableCollectionId: collectionId,
    })

    // Variables + values
    const allTokens = [
      ...Object.entries(brand.colors).map(([k, v]) => ({ key: k, type: 'COLOR', val: color(v) })),
      ...Object.entries(brand.spacing).map(([k, v]) => ({ key: k, type: 'FLOAT', val: float(v) })),
      ...Object.entries(brand.radius).map(([k, v]) => ({ key: k, type: 'FLOAT', val: float(v) })),
      ...Object.entries(brand.type).map(([k, v]) => ({
        key: k,
        type: typeof v === 'number' ? 'FLOAT' : 'STRING',
        val: typeof v === 'number' ? float(v) : string(v),
      })),
    ]

    allTokens.forEach(({ key, type, val }, vi) => {
      const varId = `var_${bi}_${vi}`

      variables.push({
        action: 'CREATE',
        id: varId,
        name: key,
        resolvedType: type,
        variableCollectionId: collectionId,
      })

      variableModeValues.push({
        variableId: varId,
        modeId,
        value: val.value,
      })
    })
  })

  return { variableCollections, variableModes, variables, variableModeValues }
}

// ── Push to Figma ─────────────────────────────────────────────────────────────

async function push() {
  const payload = buildPayload()

  console.log(`Pushing to Figma file: ${FILE_KEY}`)
  console.log(`  ${brands.length} collections`)
  console.log(`  ${payload.variables.length} variables total\n`)

  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables`, {
    method: 'POST',
    headers: {
      'X-Figma-Token': TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error('Figma API error:', JSON.stringify(data, null, 2))
    process.exit(1)
  }

  console.log('Done. Three brand direction collections created in Figma.')
  console.log('Open your file → Assets panel → Local variables to see them.')
  brands.forEach(b => console.log(`  ✓ ${b.name}`))
}

push()
