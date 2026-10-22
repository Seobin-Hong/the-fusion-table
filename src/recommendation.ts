export const cultures = [
  { id: 'western', name: 'Western', flag: 'us' },
  { id: 'japanese', name: 'Japanese', flag: 'japan' },
  { id: 'korean', name: 'Korean', flag: 'korea' },
  { id: 'chineseHotpot', name: 'Chinese Hotpot', flag: 'china' },
  { id: 'southIndian', name: 'South Indian', flag: 'india' },
  { id: 'ethiopian', name: 'Ethiopian', flag: 'ethiopia' },
  { id: 'filipino', name: 'Filipino', flag: 'philippines' },
  { id: 'jordanian', name: 'Jordanian', flag: 'jordan' },
  { id: 'frenchFrench', name: 'French · à la française', flag: 'france' },
  { id: 'frenchRussian', name: 'French · à la russe', flag: 'france' },
  { id: 'spanishTapas', name: 'Spanish · Tapas', flag: 'spain' },
  { id: 'italianFamily', name: 'Italian · Family-style', flag: 'italy' },
  { id: 'swedishSmorgasbord', name: 'Swedish · Smörgåsbord', flag: 'sweden' },
  { id: 'georgianSupra', name: 'Georgian · Supra', flag: 'georgia' },
  { id: 'basquePintxos', name: 'Basque · Pintxos', flag: 'basque' },
  { id: 'britishAfternoonTea', name: 'British · Afternoon Tea', flag: 'uk' },
] as const;

export type CultureId = (typeof cultures)[number]['id'];
export type FlagId = (typeof cultures)[number]['flag'];
export type TableShape = 'round' | 'square' | 'rectangle';
export type LibraryKind = 'fork' | 'knife' | 'plate' | 'bowl' | 'cup' | 'spoon' | 'chopsticks' | 'napkin';
export type Kind = LibraryKind | 'tray' | 'hotpot' | 'leaf' | 'side-dish' | 'shared-round' | 'platter' | 'buffet' | 'tiered-stand';
export type GuestCounts = Partial<Record<CultureId, number>>;

export const allKinds: LibraryKind[] = ['fork', 'knife', 'plate', 'bowl', 'cup', 'spoon', 'chopsticks', 'napkin'];

export interface RecommendedItem {
  id: string;
  kind: Kind;
  x: number;
  y: number;
  angle: number;
  scale: number;
}

const libraryByCulture: Record<CultureId, LibraryKind[]> = {
  western: ['fork', 'knife', 'plate'],
  japanese: ['plate', 'bowl', 'cup', 'chopsticks', 'napkin'],
  korean: ['bowl', 'spoon', 'chopsticks', 'plate'],
  chineseHotpot: ['bowl', 'chopsticks', 'plate'],
  southIndian: ['plate'],
  ethiopian: ['plate'],
  filipino: ['plate', 'spoon'],
  jordanian: ['plate'],
  frenchFrench: ['plate', 'bowl'],
  frenchRussian: ['fork', 'knife', 'plate'],
  spanishTapas: ['plate', 'bowl'],
  italianFamily: ['plate'],
  swedishSmorgasbord: ['plate'],
  georgianSupra: ['plate', 'bowl'],
  basquePintxos: ['plate'],
  britishAfternoonTea: ['plate', 'cup'],
};

export function guestKinds(counts: GuestCounts): Set<LibraryKind> {
  const kinds = new Set<LibraryKind>();
  for (const culture of cultures) {
    if ((counts[culture.id] ?? 0) > 0) libraryByCulture[culture.id].forEach(kind => kinds.add(kind));
  }
  return kinds;
}

interface Seat {
  x: number;
  y: number;
  angle: number;
}

function orientationTowardCenter(x: number, y: number): number {
  const faceX = 500 - x;
  const faceY = 350 - y;
  return Math.atan2(faceX, -faceY) * 180 / Math.PI;
}

function seatsForShape(shape: TableShape, count: number): Seat[] {
  if (count <= 0) return [];
  if (shape === 'round') {
    return Array.from({ length: count }, (_, index) => {
      const angle = -Math.PI / 2 + index * Math.PI * 2 / count;
      const x = 500 + Math.cos(angle) * 210;
      const y = 350 + Math.sin(angle) * 210;
      return { x, y, angle: orientationTowardCenter(x, y) };
    });
  }

  const bounds = shape === 'square'
    ? { left: 210, top: 60, right: 790, bottom: 640 }
    : { left: 100, top: 150, right: 900, bottom: 550 };
  const inset = 52;
  const left = bounds.left + inset;
  const right = bounds.right - inset;
  const top = bounds.top + inset;
  const bottom = bounds.bottom - inset;
  const width = right - left;
  const height = bottom - top;

  if (count === 3 && shape === 'square') {
    return [
      { x: (left + right) / 2, y: top },
      { x: left, y: (top + bottom) / 2 },
      { x: right, y: (top + bottom) / 2 },
    ].map(({ x, y }) => ({ x, y, angle: orientationTowardCenter(x, y) }));
  }

  if (count === 3 && shape === 'rectangle') {
    return [
      // On a rectangular table, the two guests along the top edge face straight
      // down the table; the guest opposite them faces straight up.
      { x: left + width / 3, y: top, angle: 180 },
      { x: left + width * 2 / 3, y: top, angle: 180 },
      { x: (left + right) / 2, y: bottom, angle: 0 },
    ];
  }

  const perimeter = 2 * (width + height);

  return Array.from({ length: count }, (_, index) => {
    let distance = (width / 2 + index * perimeter / count) % perimeter;
    let x: number;
    let y: number;
    if (distance < width) {
      x = left + distance;
      y = top;
    } else if ((distance -= width) < height) {
      x = right;
      y = top + distance;
    } else if ((distance -= height) < width) {
      x = right - distance;
      y = bottom;
    } else {
      distance -= width;
      x = left;
      y = bottom - distance;
    }
    return { x, y, angle: orientationTowardCenter(x, y) };
  });
}

function interleaveGuests(active: { id: CultureId; count: number }[], total: number): CultureId[] {
  const assigned = active.map(() => 0);
  const sequence: CultureId[] = [];
  let cursor = 0;

  for (let turn = 0; turn < total; turn += 1) {
    const nextRatios = active.map((culture, index) => (assigned[index] + 1) / culture.count);
    const minRatio = Math.min(...nextRatios);
    let chosen = cursor;
    for (let offset = 0; offset < active.length; offset += 1) {
      const index = (cursor + offset) % active.length;
      if (nextRatios[index] <= minRatio + 1e-8) {
        chosen = index;
        break;
      }
    }
    sequence.push(active[chosen].id);
    assigned[chosen] += 1;
    cursor = (chosen + 1) % active.length;
  }
  return sequence;
}

export function getRecommendedLayout(shape: TableShape, counts: GuestCounts): RecommendedItem[] {
  const active = cultures
    .map(({ id }) => ({ id, count: Math.max(0, Math.floor(counts[id] ?? 0)) }))
    .filter(({ count }) => count > 0);
  const total = active.reduce((sum, culture) => sum + culture.count, 0);
  if (!total) return [];

  const seats = seatsForShape(shape, total);
  const guestSequence = interleaveGuests(active, total);
  const items: RecommendedItem[] = [];
  let nextId = 0;
  const add = (kind: Kind, x: number, y: number, angle = 0, scale = 1) => {
    items.push({ id: `item-${nextId++}`, kind, x, y, angle, scale });
  };
  const addForSeat = (seat: Seat, kind: Kind, localX: number, localY: number, localAngle = 0, scale = 1) => {
    const radians = seat.angle * Math.PI / 180;
    const x = seat.x + localX * Math.cos(radians) - localY * Math.sin(radians);
    const y = seat.y + localX * Math.sin(radians) + localY * Math.cos(radians);
    add(kind, x, y, seat.angle + localAngle, scale);
  };
  const scaleForSeat = Math.max(0.5, Math.min(1, 1.14 - total * 0.022));
  const cultureCounts = new Map(active.map(culture => [culture.id, culture.count]));

  seats.forEach((seat, index) => {
    const culture = guestSequence[index];
    const scale = scaleForSeat;
    if (culture === 'western') {
      addForSeat(seat, 'plate', 0, 0, 0, scale * 1.78);
      addForSeat(seat, 'fork', -74, 0, 0, scale * 1.14);
      addForSeat(seat, 'knife', 74, 0, 0, scale * 1.14);
    } else if (culture === 'japanese') {
      addForSeat(seat, 'tray', 0, 0, 0, scale * 1.48);
      addForSeat(seat, 'plate', -19, -4, 0, scale * 0.53);
      addForSeat(seat, 'bowl', 19, -4, 0, scale * 0.51);
      addForSeat(seat, 'cup', 17, 19, 0, scale * 0.37);
      addForSeat(seat, 'chopsticks', -2, -25, 0, scale * 0.45);
    } else if (culture === 'korean') {
      addForSeat(seat, 'bowl', -18, 0, 0, scale * 0.65);
      addForSeat(seat, 'bowl', 18, 0, 0, scale * 0.65);
      addForSeat(seat, 'spoon', 50, 0, 0, scale * 0.8);
      addForSeat(seat, 'chopsticks', 72, 0, 0, scale * 0.62);
    } else if (culture === 'chineseHotpot') {
      addForSeat(seat, 'bowl', -24, 0, 0, scale * 0.68);
      addForSeat(seat, 'chopsticks', 22, 0, 0, scale * 0.62);
      addForSeat(seat, 'cup', 47, -8, 0, scale * 0.42);
    } else if (culture === 'southIndian') {
      addForSeat(seat, 'leaf', 0, 0, 0, scale * 1.6);
    } else if (culture === 'frenchRussian') {
      addForSeat(seat, 'plate', 0, 0, 0, scale * 1.65);
      addForSeat(seat, 'fork', -66, 0, 0, scale * 1.05);
      addForSeat(seat, 'knife', 66, 0, 0, scale * 1.05);
    } else if (culture === 'italianFamily' || culture === 'swedishSmorgasbord' || culture === 'basquePintxos') {
      addForSeat(seat, 'plate', 0, 0, 0, scale * 1.4);
    } else if (culture === 'britishAfternoonTea') {
      addForSeat(seat, 'plate', -18, 0, 0, scale * 0.9);
      addForSeat(seat, 'cup', 24, 0, 0, scale * 0.62);
    }
  });

  const sharedCultures = active.filter(({ id }) => [
    'korean', 'chineseHotpot', 'ethiopian', 'filipino', 'jordanian',
    'frenchFrench', 'spanishTapas', 'italianFamily', 'swedishSmorgasbord',
    'georgianSupra', 'basquePintxos', 'britishAfternoonTea',
  ].includes(id));
  const sharedCenters = sharedCultures.length === 1
    ? [{ x: 500, y: 350 }]
    : sharedCultures.length === 2
      ? [{ x: 420, y: 350 }, { x: 580, y: 350 }]
      : sharedCultures.length === 3
        ? [{ x: 400, y: 300 }, { x: 600, y: 300 }, { x: 500, y: 425 }]
        : sharedCultures.length === 4
          ? [{ x: 400, y: 285 }, { x: 600, y: 285 }, { x: 400, y: 440 }, { x: 600, y: 440 }]
          : [{ x: 370, y: 285 }, { x: 500, y: 285 }, { x: 630, y: 285 }, { x: 420, y: 445 }, { x: 580, y: 445 }];
  const sharedScale = sharedCultures.length <= 1 ? 1 : sharedCultures.length === 2 ? 0.72 : 0.56;

  sharedCultures.forEach(({ id }, index) => {
    const center = sharedCenters[index];
    const guestCount = cultureCounts.get(id) ?? 1;
    if (id === 'korean') {
      const sideCount = Math.max(3, Math.min(6, Math.ceil(guestCount / 2) + 1));
      for (let dish = 0; dish < sideCount; dish += 1) {
        const angle = -Math.PI / 2 + dish * Math.PI * 2 / sideCount;
        add('side-dish', center.x + Math.cos(angle) * 35 * sharedScale, center.y + Math.sin(angle) * 29 * sharedScale, 0, 0.57 * sharedScale);
      }
    } else if (id === 'chineseHotpot') {
      const hotpotScale = Math.min(1.6, 1.25 + guestCount * 0.04) * sharedScale;
      add('hotpot', center.x, center.y, 0, hotpotScale);
      for (let dish = 0; dish < 4; dish += 1) {
        const angle = -Math.PI / 4 + dish * Math.PI / 2;
        add('plate', center.x + Math.cos(angle) * 62 * sharedScale, center.y + Math.sin(angle) * 54 * sharedScale, 0, 0.5 * sharedScale);
      }
    } else if (id === 'ethiopian') {
      add('shared-round', center.x, center.y, 0, Math.min(2.2, 1.65 + guestCount * 0.08) * sharedScale);
    } else if (id === 'filipino') {
      add('platter', center.x, center.y, 0, Math.min(3.2, 2.3 + guestCount * 0.15) * sharedScale);
    } else if (id === 'jordanian') {
      add('shared-round', center.x, center.y, 0, Math.min(2.25, 1.7 + guestCount * 0.09) * sharedScale);
    } else if (id === 'frenchFrench') {
      const dishScale = Math.min(0.78, 0.68 + guestCount * 0.015) * sharedScale;
      [[-38, -25], [0, -25], [38, -25], [-38, 25], [0, 25], [38, 25]].forEach(([x, y]) =>
        add('side-dish', center.x + x * sharedScale, center.y + y * sharedScale, 0, dishScale));
    } else if (id === 'spanishTapas') {
      const dishCount = Math.max(5, Math.min(8, guestCount + 3));
      for (let dish = 0; dish < dishCount; dish += 1) {
        const angle = -Math.PI / 2 + dish * Math.PI * 2 / dishCount;
        add('side-dish', center.x + Math.cos(angle) * 44 * sharedScale, center.y + Math.sin(angle) * 36 * sharedScale, 0, 0.68 * sharedScale);
      }
    } else if (id === 'italianFamily') {
      add('platter', center.x, center.y, 0, Math.min(2.65, 2.05 + guestCount * 0.07) * sharedScale);
    } else if (id === 'swedishSmorgasbord') {
      add('buffet', center.x, center.y - 88, 0, Math.min(2.65, 2.1 + guestCount * 0.06) * sharedScale);
    } else if (id === 'georgianSupra') {
      const dishCount = Math.max(6, Math.min(10, guestCount + 4));
      add('shared-round', center.x, center.y, 0, Math.min(1.35, 1.05 + guestCount * 0.025) * sharedScale);
      for (let dish = 0; dish < dishCount; dish += 1) {
        const angle = -Math.PI / 2 + dish * Math.PI * 2 / dishCount;
        add('side-dish', center.x + Math.cos(angle) * 54 * sharedScale, center.y + Math.sin(angle) * 43 * sharedScale, 0, 0.5 * sharedScale);
      }
    } else if (id === 'basquePintxos') {
      add('platter', center.x, center.y, 0, Math.min(2.9, 2.3 + guestCount * 0.07) * sharedScale);
    } else if (id === 'britishAfternoonTea') {
      add('tiered-stand', center.x, center.y, 0, Math.min(1.75, 1.35 + guestCount * 0.04) * sharedScale);
    }
  });

  return items;
}
