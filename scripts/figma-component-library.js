async function main() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' })

  let page = figma.root.children.find(function(p) { return p.name === 'Components' })
  if (!page) { page = figma.createPage(); page.name = 'Components' }
  await figma.setCurrentPageAsync(page)
  page.children.forEach(function(c) { c.remove() })

  function makeFrame(name, x, y, w, h) {
    var f = figma.createFrame()
    f.name = name; f.x = x; f.y = y
    f.resize(w, h)
    f.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    f.cornerRadius = 8
    f.strokes = [{ type: 'SOLID', color: { r: 0.88, g: 0.88, b: 0.88 } }]
    f.strokeWeight = 1
    page.appendChild(f)
    return f
  }

  function addText(parent, str, x, y, size, bold, color) {
    size = size || 13
    bold = bold || false
    color = color || { r: 0.1, g: 0.1, b: 0.1 }
    var t = figma.createText()
    t.fontName = { family: 'Inter', style: bold ? 'Bold' : 'Regular' }
    t.characters = str
    t.fontSize = size
    t.fills = [{ type: 'SOLID', color: color }]
    parent.appendChild(t)
    t.x = x; t.y = y
    return t
  }

  function addRect(parent, x, y, w, h, color, radius) {
    color = color || { r: 0.06, g: 0.06, b: 0.06 }
    radius = radius || 6
    var r = figma.createRectangle()
    r.resize(w, h)
    r.fills = [{ type: 'SOLID', color: color }]
    r.cornerRadius = radius
    parent.appendChild(r)
    r.x = x; r.y = y
    return r
  }

  var grey = { r: 0.5, g: 0.5, b: 0.5 }
  var white = { r: 1, g: 1, b: 1 }
  var black = { r: 0.06, g: 0.06, b: 0.06 }
  var light = { r: 0.9, g: 0.9, b: 0.9 }

  // Button
  var btn = makeFrame('Button', 0, 0, 320, 160)
  addText(btn, 'BUTTON', 12, 12, 9, false, grey)
  addRect(btn, 12, 36, 120, 40, black)
  addText(btn, 'Primary', 36, 49, 13, true, white)
  var sec = addRect(btn, 144, 36, 120, 40, white)
  sec.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }]
  sec.strokeWeight = 1
  addText(btn, 'Secondary', 158, 49, 13, false, black)
  addRect(btn, 12, 96, 120, 40, { r: 0.86, g: 0.15, b: 0.15 })
  addText(btn, 'Destructive', 24, 109, 13, true, white)

  // Input
  var inp = makeFrame('Input', 368, 0, 320, 160)
  addText(inp, 'INPUT', 12, 12, 9, false, grey)
  var i1 = addRect(inp, 12, 36, 296, 40, white)
  i1.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }]
  i1.strokeWeight = 1
  addText(inp, 'your@email.com', 24, 49, 13, false, { r: 0.7, g: 0.7, b: 0.7 })
  var i2 = addRect(inp, 12, 92, 296, 40, { r: 0.98, g: 0.98, b: 0.98 })
  i2.strokes = [{ type: 'SOLID', color: black }]
  i2.strokeWeight = 1.5
  addText(inp, 'rohit@deesyn.com', 24, 105, 13)

  // Card
  var card = makeFrame('Card', 736, 0, 320, 200)
  addText(card, 'CARD', 12, 12, 9, false, grey)
  var inner = addRect(card, 12, 36, 296, 152, { r: 0.99, g: 0.99, b: 0.99 }, 8)
  inner.strokes = [{ type: 'SOLID', color: light }]
  inner.strokeWeight = 1
  addText(card, 'Card title', 24, 52, 15, true)
  addText(card, 'Card description text.', 24, 76, 12, false, grey)
  addRect(card, 24, 118, 80, 32, black, 5)
  addText(card, 'Action', 38, 126, 12, true, white)

  // Badge
  var badge = makeFrame('Badge', 1104, 0, 320, 100)
  addText(badge, 'BADGE', 12, 12, 9, false, grey)
  addRect(badge, 12, 36, 72, 24, black, 12)
  addText(badge, 'Default', 20, 42, 11, true, white)
  addRect(badge, 96, 36, 88, 24, { r: 0.94, g: 0.94, b: 0.94 }, 12)
  addText(badge, 'Secondary', 104, 42, 11, true, { r: 0.2, g: 0.2, b: 0.2 })
  addRect(badge, 196, 36, 64, 24, { r: 0.86, g: 0.15, b: 0.15 }, 12)
  addText(badge, 'Error', 210, 42, 11, true, white)

  // Accordion
  var acc = makeFrame('Accordion', 0, 224, 320, 200)
  addText(acc, 'ACCORDION', 12, 12, 9, false, grey)
  var qs = ['What is pricing?', 'How to get started?', 'Can I cancel?']
  for (var i = 0; i < qs.length; i++) {
    var qy = 36 + i * 52
    addRect(acc, 12, qy, 296, 1, light, 0)
    addText(acc, qs[i], 12, qy + 8, 13, i === 0)
    addText(acc, i === 0 ? '^' : 'v', 288, qy + 8, 12, false, grey)
    if (i === 0) addText(acc, 'Answer appears here when expanded.', 12, qy + 30, 12, false, grey)
  }

  // Avatar
  var av = makeFrame('Avatar', 368, 224, 320, 120)
  addText(av, 'AVATAR', 12, 12, 9, false, grey)
  var sizes = [32, 40, 48, 64]
  var ax = 12
  for (var j = 0; j < sizes.length; j++) {
    var s = sizes[j]
    var circle = figma.createEllipse()
    circle.resize(s, s)
    circle.fills = [{ type: 'SOLID', color: { r: 0.88, g: 0.84, b: 0.98 } }]
    av.appendChild(circle)
    circle.x = ax; circle.y = 36
    addText(av, 'RS', ax + s * 0.18, 36 + s * 0.28, Math.round(s * 0.3), true, { r: 0.4, g: 0.1, b: 0.8 })
    ax += s + 16
  }

  // Waitlist Form
  var wl = makeFrame('WaitlistForm', 736, 224, 320, 180)
  addText(wl, 'WAITLIST FORM', 12, 12, 9, false, grey)
  addText(wl, 'Get early access', 12, 36, 16, true)
  addText(wl, 'Join the waitlist.', 12, 60, 12, false, grey)
  var wi = addRect(wl, 12, 90, 192, 40, white)
  wi.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }]
  wi.strokeWeight = 1
  addText(wl, 'your@email.com', 22, 103, 12, false, { r: 0.7, g: 0.7, b: 0.7 })
  addRect(wl, 212, 90, 96, 40, black)
  addText(wl, 'Notify me', 220, 103, 12, true, white)

  console.log('Done - 7 components on Components page')
  figma.notify('Components created', { timeout: 3000 })
}

main()
