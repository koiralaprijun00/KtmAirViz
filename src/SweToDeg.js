// Converts decimal degrees to SWEREF99 coordinates
const NorthingMin = 6565900
const NorthingMax = 6600900
const EastingMin = 134700
const EastingMax = 169700

const LatitudeMin = 59.208266
const LatitudeMax = 59.522258
const LongitudeMin = 17.732179
const LongitudeMax = 18.348042

function convertDegreesToSweref(point) {
  const t = {
    x: (point.x - LatitudeMin) / (LatitudeMax - LatitudeMin),
    y: (point.y - LongitudeMin) / (LongitudeMax - LongitudeMin)
  }

  return {
    x: NorthingMin + t.x * (NorthingMax - NorthingMin),
    y: EastingMin + t.y * (EastingMax - EastingMin)
  }
}

function convertSwerefToDegrees(point) {
  const t = {
    x: (point.x - NorthingMin) / (NorthingMax - NorthingMin),
    y: (point.y - EastingMin) / (EastingMax - EastingMin)
  }

  return {
    x: LatitudeMin + t.x * (LatitudeMax - LatitudeMin),
    y: LongitudeMin + t.y * (LongitudeMax - LongitudeMin)
  }
}

export { convertDegreesToSweref, convertSwerefToDegrees }
