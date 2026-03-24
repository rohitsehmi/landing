async function main() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' })

  var page = figma.root.children.find(function(p) { return p.name === 'Landing' })
  if (!page) { page = figma.createPage(); page.name = 'Landing' }
  await figma.setCurrentPageAsync(page)
  page.children.forEach(function(c) { c.remove() })

  var W = 1440
  var black = { r: 0.06, g: 0.06, b: 0.06 }
  var white = { r: 1, g: 1, b: 1 }
  var grey = { r: 0.5, g: 0.5, b: 0.5 }
  var lightgrey = { r: 0.92, g: 0.92, b: 0.92 }
  var verylightgrey = { r: 0.97, g: 0.97, b: 0.97 }
  var accent = { r: 0.06, g: 0.06, b: 0.06 }

  function frame(name, y, h, bg) {
    bg = bg || white
    var f = figma.createFrame()
    f.name = name
    f.x = 0; f.y = y
    f.resize(W, h)
    f.fills = [{ type: 'SOLID', color: bg }]
    f.clipsContent = false
    page.appendChild(f)
    return f
  }

  function rect(parent, x, y, w, h, color, radius) {
    color = color || black
    radius = radius || 0
    var r = figma.createRectangle()
    r.resize(w, h)
    r.fills = [{ type: 'SOLID', color: color }]
    r.cornerRadius = radius
    parent.appendChild(r)
    r.x = x; r.y = y
    return r
  }

  function text(parent, str, x, y, size, weight, color, align) {
    size = size || 14
    weight = weight || 'Regular'
    color = color || black
    align = align || 'LEFT'
    var t = figma.createText()
    t.fontName = { family: 'Inter', style: weight }
    t.characters = str
    t.fontSize = size
    t.fills = [{ type: 'SOLID', color: color }]
    t.textAlignHorizontal = align
    parent.appendChild(t)
    t.x = x; t.y = y
    return t
  }

  function divider(parent, y) {
    var d = figma.createRectangle()
    d.resize(W, 1)
    d.fills = [{ type: 'SOLID', color: lightgrey }]
    parent.appendChild(d)
    d.x = 0; d.y = y
    return d
  }

  var PAD = 120
  var yOffset = 0

  // ── NAV ──────────────────────────────────────────────────────
  var nav = frame('Nav', yOffset, 72, white)
  divider(nav, 71)
  text(nav, 'Deesyn', PAD, 26, 18, 'Bold', black)
  text(nav, 'Work', 660, 28, 14, 'Medium', grey)
  text(nav, 'Process', 720, 28, 14, 'Medium', grey)
  text(nav, 'About', 790, 28, 14, 'Medium', grey)
  var ctaBg = rect(nav, W - PAD - 120, 20, 120, 36, black, 6)
  text(nav, 'Get early access', W - PAD - 116, 30, 13, 'Medium', white)
  yOffset += 72

  // ── HERO ─────────────────────────────────────────────────────
  var hero = frame('Hero', yOffset, 640, white)
  text(hero, 'Design that moves', PAD, 160, 72, 'Bold', black, 'LEFT')
  text(hero, 'your business forward.', PAD, 244, 72, 'Bold', black, 'LEFT')
  text(hero, 'Deesyn is a design consultancy helping growth-stage companies', PAD, 344, 20, 'Regular', grey)
  text(hero, 'ship polished products, faster.', PAD, 372, 20, 'Regular', grey)
  rect(hero, PAD, 432, 180, 52, black, 6)
  text(hero, 'Join the waitlist', PAD + 24, 452, 15, 'Semi Bold', white)
  var secBtn = rect(hero, PAD + 200, 432, 160, 52, white, 6)
  secBtn.strokes = [{ type: 'SOLID', color: lightgrey }]
  secBtn.strokeWeight = 1
  text(hero, 'See our work', PAD + 228, 452, 15, 'Regular', black)
  text(hero, '40+ projects shipped', PAD, 528, 13, 'Regular', grey)
  text(hero, '  |  ', PAD + 148, 528, 13, 'Regular', lightgrey)
  text(hero, '12 retained clients', PAD + 172, 528, 13, 'Regular', grey)
  text(hero, '  |  ', PAD + 310, 528, 13, 'Regular', lightgrey)
  text(hero, '3x avg revenue growth', PAD + 334, 528, 13, 'Regular', grey)
  yOffset += 640

  // ── STATS BAR ────────────────────────────────────────────────
  var stats = frame('StatsBar', yOffset, 140, verylightgrey)
  divider(stats, 0)
  divider(stats, 139)
  var statData = [
    ['40+', 'Projects shipped'],
    ['12', 'Retained clients'],
    ['3x', 'Avg revenue growth'],
    ['6 wk', 'Avg time to launch'],
  ]
  for (var s = 0; s < statData.length; s++) {
    var sx = PAD + s * 300
    text(stats, statData[s][0], sx, 36, 36, 'Bold', black)
    text(stats, statData[s][1], sx, 82, 13, 'Regular', grey)
  }
  yOffset += 140

  // ── FEATURES ─────────────────────────────────────────────────
  var feat = frame('Features', yOffset, 640, white)
  text(feat, 'WHAT WE DO', PAD, 80, 11, 'Semi Bold', grey)
  text(feat, 'End-to-end design, built for scale.', PAD, 112, 44, 'Bold', black)
  var featData = [
    ['Product Design', 'Full product design from discovery to handoff. Wireframes, prototypes, and pixel-perfect UI.'],
    ['Design Systems', 'Scalable component libraries and token systems that your eng team will love.'],
    ['Brand & Identity', 'Strategy, visual identity, and brand guidelines that hold up across every touchpoint.'],
    ['Growth Design', 'Landing pages, onboarding flows, and conversion-focused design that ships fast.'],
    ['Dev Handoff', 'Clean Figma files, annotated specs, and direct support during implementation.'],
    ['Fractional CDO', 'Embedded design leadership for teams that need senior taste without a full hire.'],
  ]
  for (var fi = 0; fi < featData.length; fi++) {
    var fc = fi % 3
    var fr = Math.floor(fi / 3)
    var fx = PAD + fc * 380
    var fy = 220 + fr * 180
    var fCard = rect(feat, fx, fy, 360, 160, verylightgrey, 8)
    fCard.strokes = [{ type: 'SOLID', color: lightgrey }]
    fCard.strokeWeight = 1
    text(feat, featData[fi][0], fx + 24, fy + 24, 16, 'Semi Bold', black)
    text(feat, featData[fi][1], fx + 24, fy + 56, 13, 'Regular', grey)
  }
  yOffset += 640

  // ── SHOWCASE / CASE STUDY ────────────────────────────────────
  var show = frame('Showcase', yOffset, 560, white)
  divider(show, 0)
  text(show, 'SELECTED WORK', PAD, 72, 11, 'Semi Bold', grey)
  text(show, 'Outcomes, not just deliverables.', PAD, 104, 40, 'Bold', black)
  var cases = [
    ['Fika', 'SaaS / Product Design', 'Redesigned onboarding, cut drop-off by 38%'],
    ['Meridian', 'Fintech / Brand + UI', 'New visual identity + app shipped in 6 weeks'],
    ['Flux Studio', 'Agency / Design System', '200+ components, zero design debt'],
  ]
  for (var ci = 0; ci < cases.length; ci++) {
    var cx = PAD + ci * 400
    var cCard = rect(show, cx, 200, 380, 280, verylightgrey, 8)
    cCard.strokes = [{ type: 'SOLID', color: lightgrey }]
    cCard.strokeWeight = 1
    rect(show, cx, 200, 380, 160, { r: 0.88, g: 0.88, b: 0.88 }, 8)
    text(show, cases[ci][0], cx + 20, 380, 18, 'Bold', black)
    text(show, cases[ci][1], cx + 20, 408, 12, 'Regular', grey)
    text(show, cases[ci][2], cx + 20, 436, 13, 'Regular', black)
  }
  yOffset += 560

  // ── TESTIMONIALS ─────────────────────────────────────────────
  var testi = frame('Testimonials', yOffset, 480, verylightgrey)
  divider(testi, 0)
  text(testi, 'SOCIAL PROOF', PAD, 72, 11, 'Semi Bold', grey)
  text(testi, 'Teams that ship with us.', PAD, 104, 40, 'Bold', black)
  var quotes = [
    ['"Working with Deesyn was like hiring a 10-person design team overnight. They shipped more in 6 weeks than we had in 6 months."', 'Sarah K.', 'CPO, Fika'],
    ['"The design system they built is the best engineering investment we have made. Onboarding new devs takes hours, not weeks."', 'Marcus L.', 'CTO, Meridian'],
    ['"They understand business, not just pixels. Every decision was tied back to growth metrics."', 'Priya M.', 'CEO, Flux Studio'],
  ]
  for (var qi = 0; qi < quotes.length; qi++) {
    var qx = PAD + qi * 400
    var qCard = rect(testi, qx, 188, 380, 220, white, 8)
    qCard.strokes = [{ type: 'SOLID', color: lightgrey }]
    qCard.strokeWeight = 1
    text(testi, quotes[qi][0], qx + 24, 212, 13, 'Regular', black)
    text(testi, quotes[qi][1], qx + 24, 348, 13, 'Semi Bold', black)
    text(testi, quotes[qi][2], qx + 24, 368, 12, 'Regular', grey)
  }
  yOffset += 480

  // ── FAQ ──────────────────────────────────────────────────────
  var faq = frame('FAQ', yOffset, 560, white)
  divider(faq, 0)
  text(faq, 'QUESTIONS', PAD, 72, 11, 'Semi Bold', grey)
  text(faq, 'Frequently asked.', PAD, 104, 40, 'Bold', black)
  var qs = [
    'How quickly can you start?',
    'Do you work with early-stage startups?',
    'What does a typical engagement look like?',
    'Do you offer ongoing retainers?',
    'How do you handle handoff to engineering?',
  ]
  for (var qi2 = 0; qi2 < qs.length; qi2++) {
    var qy2 = 200 + qi2 * 64
    divider(faq, qy2)
    text(faq, qs[qi2], PAD, qy2 + 20, 15, qi2 === 0 ? 'Semi Bold' : 'Regular', black)
    text(faq, qi2 === 0 ? '^' : 'v', W - PAD - 12, qy2 + 20, 14, 'Regular', grey)
    if (qi2 === 0) {
      text(faq, 'We typically kick off within 1-2 weeks of signing. Discovery takes 3-5 days,', PAD, qy2 + 44, 13, 'Regular', grey)
    }
  }
  divider(faq, 200 + qs.length * 64)
  yOffset += 560

  // ── WAITLIST CTA ─────────────────────────────────────────────
  var cta = frame('WaitlistCTA', yOffset, 360, black)
  text(cta, 'Ready to ship something great?', PAD, 100, 44, 'Bold', white)
  text(cta, 'Join 200+ teams on the waitlist. We take on 2 new clients per month.', PAD, 160, 16, 'Regular', { r: 0.6, g: 0.6, b: 0.6 })
  var inputBg = rect(cta, PAD, 220, 300, 52, { r: 0.12, g: 0.12, b: 0.12 }, 6)
  inputBg.strokes = [{ type: 'SOLID', color: { r: 0.25, g: 0.25, b: 0.25 } }]
  inputBg.strokeWeight = 1
  text(cta, 'your@email.com', PAD + 16, 240, 14, 'Regular', { r: 0.4, g: 0.4, b: 0.4 })
  rect(cta, PAD + 316, 220, 160, 52, white, 6)
  text(cta, 'Notify me', PAD + 348, 240, 14, 'Semi Bold', black)
  yOffset += 360

  // ── FOOTER ───────────────────────────────────────────────────
  var footer = frame('Footer', yOffset, 80, white)
  divider(footer, 0)
  text(footer, 'Deesyn', PAD, 30, 15, 'Bold', black)
  text(footer, '2026 Deesyn. All rights reserved.', PAD + 100, 32, 13, 'Regular', grey)
  text(footer, 'Privacy', W - PAD - 180, 32, 13, 'Regular', grey)
  text(footer, 'Twitter', W - PAD - 100, 32, 13, 'Regular', grey)
  text(footer, 'LinkedIn', W - PAD - 32, 32, 13, 'Regular', grey)
  yOffset += 80

  figma.viewport.scrollAndZoomIntoView(page.children)
  figma.notify('Landing page built - ' + yOffset + 'px tall', { timeout: 3000 })
}

main()
