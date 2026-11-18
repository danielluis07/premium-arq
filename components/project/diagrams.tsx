/**
 * Architectural diagrams for project pages, drawn in isometric SVG so they
 * scale crisply and need no image files.
 *
 * World units: x runs to the lower right, y to the lower left, z up. Every
 * volume is seen from the +x/+y side, so its top, +x and +y faces are the
 * visible ones. Shapes are painted back to front in source order.
 */

import type { ReactNode } from "react";

/** Screen pixels per world unit, before the SVG is scaled to fit. */
const UNIT = 20;
const COS30 = Math.cos(Math.PI / 6);

const INK = "var(--ink)";
const PAPER = "var(--paper)";
const LIGHT = "#ebebe6";
const MID = "#d4d4cd";
const STONE = "#b9b8b0";
const TERRACOTTA = "#e0603a";
const OCHRE = "#f0c419";
const MOSS = "#b5cf6b";
const MOSS_DARK = "#8fae45";

type P3 = readonly [number, number, number];
type P2 = readonly [number, number];

const project = ([x, y, z]: P3): P2 => [
  (x - y) * COS30 * UNIT,
  ((x + y) * 0.5 - z) * UNIT,
];

const points = (ps: readonly P3[]) =>
  ps
    .map(project)
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

/** Closed path through the points, for compound shapes. */
const ring = (ps: readonly P3[]) => `M${points(ps).replaceAll(" ", "L")}Z`;

type Box = { x: number; y: number; z: number; w: number; d: number; h: number };

const topFace = ({ x, y, z, w, d, h }: Box): P3[] => [
  [x, y, z + h],
  [x + w, y, z + h],
  [x + w, y + d, z + h],
  [x, y + d, z + h],
];
const rightFace = ({ x, y, z, w, d, h }: Box): P3[] => [
  [x + w, y, z],
  [x + w, y + d, z],
  [x + w, y + d, z + h],
  [x + w, y, z + h],
];
const frontFace = ({ x, y, z, w, d, h }: Box): P3[] => [
  [x, y + d, z],
  [x + w, y + d, z],
  [x + w, y + d, z + h],
  [x, y + d, z + h],
];

const stroke = {
  stroke: INK,
  strokeWidth: 1,
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

type Fills = { top: string; right: string; front: string };
const PLAIN: Fills = { top: PAPER, right: LIGHT, front: MID };

/**
 * A box, optionally with a rectangular courtyard cut through it (`hole`,
 * relative to the box's x/y) and a coloured band at the bottom of its outer
 * walls (`band`, a height in world units).
 */
function Volume({
  box,
  fills = PLAIN,
  hole,
  holeFloor = LIGHT,
  band,
}: {
  box: Box;
  fills?: Fills;
  hole?: { x: number; y: number; w: number; d: number };
  holeFloor?: string;
  band?: { h: number; fill: string };
}) {
  const bandBox = band && { ...box, h: band.h };
  const cut = hole && {
    x: box.x + hole.x,
    y: box.y + hole.y,
    w: hole.w,
    d: hole.d,
  };
  const cutTop = cut && topFace({ ...cut, z: box.z, h: box.h });

  return (
    <g>
      {cut && cutTop && (
        // Inside the courtyard, painted first: the outer walls and the roof
        // (with the courtyard cut out of it) then hide whatever the viewer
        // couldn't see. The floor, then the two far walls (at min x / min y).
        <g>
          <polygon
            points={points(topFace({ ...cut, z: box.z, h: 0 }))}
            fill={holeFloor}
            {...stroke}
          />
          <polygon
            points={points([
              [cut.x, cut.y, box.z],
              [cut.x, cut.y + cut.d, box.z],
              [cut.x, cut.y + cut.d, box.z + box.h],
              [cut.x, cut.y, box.z + box.h],
            ])}
            fill={fills.right}
            {...stroke}
          />
          <polygon
            points={points([
              [cut.x, cut.y, box.z],
              [cut.x + cut.w, cut.y, box.z],
              [cut.x + cut.w, cut.y, box.z + box.h],
              [cut.x, cut.y, box.z + box.h],
            ])}
            fill={fills.front}
            {...stroke}
          />
        </g>
      )}
      <polygon points={points(rightFace(box))} fill={fills.right} {...stroke} />
      <polygon points={points(frontFace(box))} fill={fills.front} {...stroke} />
      {bandBox && (
        <>
          <polygon points={points(rightFace(bandBox))} fill={band.fill} {...stroke} />
          <polygon points={points(frontFace(bandBox))} fill={band.fill} {...stroke} />
        </>
      )}
      <path
        d={ring(topFace(box)) + (cutTop ? ring(cutTop) : "")}
        fillRule="evenodd"
        fill={fills.top}
        {...stroke}
      />
    </g>
  );
}

/** Straight arrow in world space with a screen-space head. */
function Arrow({
  from,
  to,
  color,
  dashed,
}: {
  from: P3;
  to: P3;
  color: string;
  dashed?: boolean;
}) {
  const [x1, y1] = project(from);
  const [x2, y2] = project(to);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 13;
  const spread = 0.45;
  const tip = (a: number): P2 => [
    x2 - head * Math.cos(angle + a),
    y2 - head * Math.sin(angle + a),
  ];
  const [l, r] = [tip(spread), tip(-spread)];

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - head * 0.6 * Math.cos(angle)}
        y2={y2 - head * 0.6 * Math.sin(angle)}
        stroke={color}
        strokeWidth={3}
        strokeDasharray={dashed ? "2 5" : undefined}
        strokeLinecap="round"
      />
      <polygon
        points={`${x2},${y2} ${l[0]},${l[1]} ${r[0]},${r[1]}`}
        fill={color}
      />
    </g>
  );
}

/** Fits the viewBox to every projected point given, plus padding. */
function Canvas({
  bounds,
  pad = 12,
  extraRight = 0,
  label,
  children,
}: {
  bounds: readonly P3[];
  pad?: number;
  /** Room for labels past the drawing, in screen pixels. */
  extraRight?: number;
  /** Omit when the SVG sits inside an element that is already labelled. */
  label?: string;
  children: ReactNode;
}) {
  const projected = bounds.map(project);
  const xs = projected.map(([x]) => x);
  const ys = projected.map(([, y]) => y);
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) - minX + pad + extraRight;
  const height = Math.max(...ys) - minY + pad;

  return (
    <svg
      viewBox={`${minX.toFixed(1)} ${minY.toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)}`}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className="block h-auto w-full">
      {children}
    </svg>
  );
}

const corners = ({ x, y, z, w, d }: Omit<Box, "h">): P3[] => [
  [x, y, z],
  [x + w, y, z],
  [x + w, y + d, z],
  [x, y + d, z],
];

// ---------------------------------------------------------------------------
// Exploded axonometric: terrain, stone base, rooms and green roof, pulled
// apart vertically and labelled on the right.
// ---------------------------------------------------------------------------

const SITE: Box = { x: 0, y: 0, z: 0, w: 16, d: 15, h: 0.5 };
const FOOTPRINT = { x: 3, y: 3, w: 10, d: 9 };
const COURTYARD = { x: 3.5, y: 3, w: 3, d: 3 };

const LAYERS = [
  {
    label: "Cobertura verde",
    box: { ...FOOTPRINT, z: 15, h: 0.4 },
    fills: { top: MOSS, right: MOSS_DARK, front: MOSS_DARK },
  },
  {
    label: "Quartos · 2 pavimentos",
    box: { ...FOOTPRINT, z: 9.5, h: 2.6 },
    fills: PLAIN,
  },
  {
    label: "Embasamento de pedra",
    box: { ...FOOTPRINT, z: 4.5, h: 1.3 },
    fills: { top: LIGHT, right: STONE, front: STONE },
  },
] as const;

/**
 * Wide screens get the labels beside the layers; on phones they'd shrink to
 * a few pixels, so the drawing goes unlabelled with a list under it instead.
 */
export function ExplodedDiagram({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label}>
      <div className="mx-auto hidden max-w-[44rem] sm:block">
        <ExplodedDrawing labelled />
      </div>
      <div className="sm:hidden">
        <ExplodedDrawing />
        <ol className="mt-6 flex flex-col gap-1 text-small" aria-hidden>
          {[...LAYERS, { label: "Terreno em encosta" }].map(({ label: name }) => (
            <li key={name}>{name}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ExplodedDrawing({ labelled = false }: { labelled?: boolean }) {
  const labelX = project([SITE.w, 0, 0])[0] + 28;
  // Every layer, top to bottom, at its own bottom face.
  const levels = [
    ...LAYERS.map(({ box }) => box),
    { ...FOOTPRINT, z: SITE.h, h: 0 },
  ];

  return (
    <Canvas
      bounds={[
        ...corners(SITE),
        ...corners({ ...FOOTPRINT, z: LAYERS[0].box.z + LAYERS[0].box.h }),
      ]}
      extraRight={labelled ? 180 : 0}>
      {/* Dashed guides: each layer's corners dropped onto the one below. */}
      {levels.slice(0, -1).map((box, i) =>
        corners(box).map(([x, y], c) => {
          const [x1, y1] = project([x, y, box.z]);
          const [x2, y2] = project([x, y, levels[i + 1].z + levels[i + 1].h]);
          return (
            <line
              key={`${i}-${c}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={INK}
              strokeWidth={0.75}
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
          );
        }),
      )}

      {/* Terrain, with contour lines on top. */}
      <Volume box={SITE} fills={{ top: PAPER, right: MID, front: STONE }} />
      {[2.5, 5, 7.5, 10, 12.5].map((y) => (
        <polyline
          key={y}
          points={points([
            [0, y, SITE.h],
            [5, y + 0.8, SITE.h],
            [11, y - 0.6, SITE.h],
            [SITE.w, y + 0.4, SITE.h],
          ])}
          fill="none"
          stroke={INK}
          strokeWidth={0.5}
          strokeOpacity={0.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {[...LAYERS].reverse().map(({ label: name, box, fills }) => (
        <Volume key={name} box={box} fills={fills} hole={COURTYARD} />
      ))}

      {/* Labels: a leader from each layer's rightmost corner. */}
      {labelled &&
        [...LAYERS, { label: "Terreno em encosta", box: SITE }].map(
          ({ label: name, box }) => {
        const [x, y] = project([box.x + box.w, box.y, box.z + box.h / 2]);
        return (
          <g key={name}>
            <line
              x1={x + 6}
              y1={y}
              x2={labelX - 6}
              y2={y}
              stroke={INK}
              strokeWidth={0.75}
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={x + 6} cy={y} r={2.5} fill={INK} />
            <text
              x={labelX}
              y={y}
              dominantBaseline="middle"
              fontSize={14}
              letterSpacing="-0.01em"
              fill={INK}>
              {name}
            </text>
          </g>
        );
          },
        )}
    </Canvas>
  );
}

// ---------------------------------------------------------------------------
// Three design moves on the same massing, side by side.
// ---------------------------------------------------------------------------

const PLOT: Box = { x: 0, y: 0, z: 0, w: 14, d: 13, h: 0.3 };
const MASS: Box = { x: 3, y: 3, z: PLOT.h, w: 8, d: 7, h: 3.2 };
const PATIO = { x: 2, y: 2, w: 4, d: 3 };
const GROUND = 1;

function Massing({
  band,
  holeFloor,
  behind,
}: {
  band?: string;
  holeFloor?: string;
  /** Drawn on the plot before the building, so the building hides it. */
  behind?: ReactNode;
}) {
  return (
    <>
      <Volume box={PLOT} fills={{ top: LIGHT, right: MID, front: MID }} />
      {behind}
      <Volume
        box={MASS}
        hole={PATIO}
        holeFloor={holeFloor}
        band={band ? { h: GROUND, fill: band } : undefined}
      />
    </>
  );
}

const midZ = MASS.z + MASS.h * 0.65;
const cx = MASS.x + MASS.w / 2;
const cy = MASS.y + MASS.d / 2;

/** How far the view arrows reach past the building. */
const REACH = 3.6;

function ViewsPanel() {
  const reach = REACH;
  return (
    <>
      {/* Back-facing views go behind, so the building hides their roots. */}
      <Massing
        behind={
          <>
            <Arrow from={[MASS.x, cy, midZ]} to={[MASS.x - reach, cy, midZ]} color={TERRACOTTA} />
            <Arrow from={[cx, MASS.y, midZ]} to={[cx, MASS.y - reach, midZ]} color={TERRACOTTA} />
          </>
        }
      />
      <Arrow
        from={[MASS.x + MASS.w, cy, midZ]}
        to={[MASS.x + MASS.w + reach, cy, midZ]}
        color={TERRACOTTA}
      />
      <Arrow
        from={[cx, MASS.y + MASS.d, midZ]}
        to={[cx, MASS.y + MASS.d + reach, midZ]}
        color={TERRACOTTA}
      />
      <Arrow
        from={[MASS.x + MASS.w, MASS.y + MASS.d, midZ]}
        to={[MASS.x + MASS.w + reach * 0.75, MASS.y + MASS.d + reach * 0.75, midZ]}
        color={TERRACOTTA}
      />
    </>
  );
}

function StreetPanel() {
  const street = MASS.x + MASS.w + 1.4;
  return (
    <>
      <Massing band={OCHRE} />
      <Arrow
        from={[street, MASS.y - 1.5, PLOT.h]}
        to={[street, MASS.y + MASS.d + 1.8, PLOT.h]}
        color={TERRACOTTA}
        dashed
      />
    </>
  );
}

function PatioPanel() {
  return <Massing holeFloor={OCHRE} />;
}

const STRATEGIES = [
  { name: "Vistas para o vale", Panel: ViewsPanel },
  { name: "Térreo ativo", Panel: StreetPanel },
  { name: "Pátio central", Panel: PatioPanel },
] as const;

export function StrategiesDiagram({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-4">
      {STRATEGIES.map(({ name, Panel }) => (
        <div
          key={name}
          aria-hidden
          className="mx-auto flex w-full max-w-[18rem] flex-col items-center">
          <Canvas
            bounds={[
              ...corners(PLOT),
              ...corners({ ...MASS, z: MASS.z + MASS.h }),
              // The view arrows' tips.
              [MASS.x - REACH, cy, midZ],
              [cx, MASS.y - REACH, midZ],
              [MASS.x + MASS.w + REACH, cy, midZ],
              [cx, MASS.y + MASS.d + REACH, midZ],
            ]}>
            <Panel />
          </Canvas>
          <p className="mt-3 text-center text-small uppercase">{name}</p>
        </div>
      ))}
    </div>
  );
}
