"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { Figure } from "@/components/ui/figure";
import { IMAGES } from "@/lib/placeholder";
import { REDUCED_MOTION } from "@/lib/motion";
import type { Project, ProjectCategory } from "@/content/projects";

/** Resting pose: seen from above, so the ring reads as an ellipse. */
const BASE_TILT = -36;
/** How far the pointer can tip the ring, in degrees, each way. */
const TILT_RANGE = 4;
const YAW_RANGE = 5;
/** Share of the remaining distance covered each frame. */
const LERP = 0.06;

/** Item i of n sits at the top (180°) and the ring runs clockwise from there. */
const angleOf = (i: number, n: number) => 180 - (i * 360) / n;

type Props = {
  projects: Project[];
  categories: ProjectCategory[];
  statement: string;
};

/**
 * Every project as a card standing on an invisible ring, like a rolodex laid
 * flat: each card's face is radial, so cards on the sides are seen face-on
 * and stack up, while those at the front and back are seen edge-on.
 * Category labels sit just outside their group's arc and always face the
 * viewer. Hovering or focusing a card pulls it outwards and previews it in
 * the middle of the ring; the pointer tips the whole ring slightly.
 *
 * Pure CSS 3D. Sizes come from CSS variables on the stage (`--r` radius,
 * `--card-w`, `--card-h`); the pose from `--tilt` / `--yaw`, which the
 * pointer eases (see .ring-* in globals.css).
 */
export function ProjectRing({ projects, categories, statement }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  // The cards never re-render: hover state is toggled on the DOM directly,
  // so only the preview updates when the active project changes.
  // Only projects with a page are links (and focusable); the rest preview on
  // hover but lead nowhere.
  const cards = useMemo(
    () =>
      projects.map((project, i) => {
        const props = {
          "data-index": i,
          className: "ring-card",
          style: {
            "--a": `${angleOf(i, projects.length)}deg`,
          } as CSSProperties,
        };
        const figure = (
          <Figure
            image={project.cover}
            ratio="h-full"
            sizes="10rem"
            objectPosition={`${(i * 37) % 100}% center`}
          />
        );
        return project.hasPage ? (
          <Link
            key={project.slug}
            href={`/projetos/${project.slug}`}
            data-featured=""
            aria-label={`${project.title} — ${project.category}`}
            {...props}>
            {figure}
          </Link>
        ) : (
          <div key={project.slug} aria-hidden {...props}>
            {figure}
          </div>
        );
      }),
    [projects],
  );

  const labels = useMemo(
    () =>
      categories.map((category, c) => {
        // Middle of the group's arc: cards before this group, plus half of it.
        const before = categories
          .slice(0, c)
          .reduce((sum, { count }) => sum + count, 0);
        const mid = before + (category.count - 1) / 2;
        return (
          <span
            key={category.name}
            className="ring-label text-small whitespace-nowrap"
            style={
              { "--a": `${angleOf(mid, projects.length)}deg` } as CSSProperties
            }>
            <span className="border-b border-ink pb-0.5">
              {category.name}
              <sup className="ml-0.5 text-[0.6em]">({category.count})</sup>
            </span>
          </span>
        );
      }),
    [categories, projects.length],
  );

  // Pointer parallax: ease --tilt / --yaw toward a pose set by the pointer.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const motion = window.matchMedia(REDUCED_MOTION);

    let frame = 0;
    let tilt = BASE_TILT;
    let yaw = 0;
    let targetTilt = BASE_TILT;
    let targetYaw = 0;

    const apply = () => {
      stage.style.setProperty("--tilt", `${tilt}deg`);
      stage.style.setProperty("--yaw", `${yaw}deg`);
    };

    const tick = () => {
      tilt += (targetTilt - tilt) * LERP;
      yaw += (targetYaw - yaw) * LERP;
      if (
        Math.abs(targetTilt - tilt) < 0.01 &&
        Math.abs(targetYaw - yaw) < 0.01
      ) {
        tilt = targetTilt;
        yaw = targetYaw;
        frame = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
      apply();
    };

    const onMove = (e: globalThis.PointerEvent) => {
      if (e.pointerType !== "mouse" || motion.matches) return;
      const rect = stage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetYaw = x * YAW_RANGE;
      targetTilt = BASE_TILT - y * TILT_RANGE;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetTilt = BASE_TILT;
      targetYaw = 0;
      if (!frame && !motion.matches) frame = requestAnimationFrame(tick);
    };

    const onMotionChange = () => {
      if (!motion.matches) return;
      cancelAnimationFrame(frame);
      frame = 0;
      tilt = targetTilt = BASE_TILT;
      yaw = targetYaw = 0;
      apply();
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);
    motion.addEventListener("change", onMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  const activate = (card: HTMLElement | null) => {
    if (card === activeCardRef.current) return;
    activeCardRef.current?.removeAttribute("data-active");
    card?.setAttribute("data-active", "");
    activeCardRef.current = card;
    setActive(card ? Number(card.dataset.index) : null);
  };

  const cardFrom = (target: EventTarget) =>
    target instanceof Element
      ? target.closest<HTMLElement>(".ring-card")
      : null;

  const onPointerOver = (e: PointerEvent) => {
    const card = cardFrom(e.target);
    if (card) activate(card);
  };

  const onFocus = (e: FocusEvent) => activate(cardFrom(e.target));
  const onBlur = (e: FocusEvent) => {
    if (!cardFrom(e.relatedTarget ?? document.body)) activate(null);
  };

  const project = active === null ? null : projects[active];

  return (
    <div
      ref={stageRef}
      className="ring-stage relative h-full w-full"
      onPointerLeave={() => activate(null)}>
      <div
        className="ring-pose"
        onPointerOver={onPointerOver}
        onFocus={onFocus}
        onBlur={onBlur}>
        {cards}
        {labels}
      </div>

      {/* Centre of the ring: the statement, or the active project's preview. */}
      {/* Both states share one grid cell; the hidden one stays laid out (and
          its images keep loading), so switching is instant. */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 grid w-[calc(var(--r)*1.3)] -translate-x-1/2 -translate-y-1/2 place-items-center text-center">
        <p
          className={`col-start-1 row-start-1 text-[length:calc(var(--r)*0.17)] leading-[1.1] tracking-[-0.06em] whitespace-nowrap ${project ? "invisible" : ""}`}>
          {statement}
        </p>

        <div
          aria-hidden={!project}
          className={`col-start-1 row-start-1 flex flex-col items-center ${project ? "" : "invisible"}`}>
          <p className="max-w-[16ch] text-[length:max(1rem,calc(var(--r)*0.075))] leading-[1.1] tracking-[-0.04em]">
            {project?.title}
          </p>
          <div className="relative mt-[calc(var(--r)*0.05)] aspect-[1.87/1] w-[calc(var(--r)*0.75)]">
            {IMAGES.map((_, i) => (
              <div
                key={i}
                aria-hidden
                className={`absolute inset-0 ${
                  project?.cover !== undefined &&
                  project.cover % IMAGES.length === i
                    ? ""
                    : "opacity-0"
                }`}>
                <Figure image={i} ratio="h-full" sizes="25vw" />
              </div>
            ))}
          </div>
          <p className="mt-[calc(var(--r)*0.03)] text-small">
            {project?.category}
            {project?.hasPage && " · Ver projeto +"}
          </p>
        </div>
      </div>
    </div>
  );
}
