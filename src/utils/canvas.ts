import { Settings } from "@/settings";
import { Color, colorToString, Vector2D } from ".";

export type Canvas = {
  readonly element: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
};

export function createCanvas(size: Vector2D): Canvas {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", `${size.x}px`);
  canvas.setAttribute("height", `${size.y}px`);

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
    throw new Error("Failed to get 2D context");
  }

  return {
    element: canvas,
    context: ctx,
  };
}

export function fillRect(
  canvas: Canvas,
  start: Vector2D,
  size: Vector2D,
  color: Color
): void {
  canvas.context.beginPath();
  canvas.context.fillStyle = colorToString(color);
  canvas.context.rect(start.x, start.y, size.x, size.y);
  canvas.context.fill();
}

export function clearRect(
  canvas: Canvas,
  start: Vector2D,
  size: Vector2D
): void {
  canvas.context.clearRect(start.x, start.y, size.x, size.y);
}

function createDefaultVector2d(): Vector2D {
  const size =
    (Settings.grid.nodeSize + Settings.grid.nodeOffset) *
      Settings.grid.dimension +
    Settings.grid.nodeOffset;

  const vector2d = { x: size, y: size };
  return vector2d;
}

export function fillCircle(
  canvas: Canvas,
  center: Vector2D,
  radius: number,
  color: Color
): void {
  canvas.context.beginPath();
  canvas.context.arc(center.x, center.y, radius, 0, Math.PI * 2);
  canvas.context.fillStyle = colorToString(color);
  canvas.context.fill();
}

export function setStyle(
  canvas: Canvas,
  style: Partial<CSSStyleDeclaration>
): void {
  for (const key in style) {
    if (!Object.hasOwnProperty.call(style, key)) {
      continue;
    }

    if (!style[key]) {
      continue;
    }

    canvas.element.style[key] = style[key] as string;
  }
}

export function createBackground(): Canvas {
  const vector2d = createDefaultVector2d();
  const canvas = createCanvas(vector2d);
  setStyle(canvas, { zIndex: "0" });
  return canvas;
}

export function createForeground(): Canvas {
  const vector2d = createDefaultVector2d();
  const canvas = createCanvas(vector2d);
  setStyle(canvas, { zIndex: "1" });
  return canvas;
}

export function calcLocalPoint(
  canvas: Canvas,
  globalPoint: Vector2D
): Vector2D | null {
  const canvasRect = canvas.element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const offset = {
    top: canvasRect.top + scrollTop,
    left: canvasRect.left + scrollLeft,
  };

  const x = globalPoint.x - offset.left;
  const y = globalPoint.y - offset.top;

  if (x < 0 || y < 0) {
    return null;
  }

  if (
    x > offset.left + canvasRect.width ||
    y > offset.top + canvasRect.height
  ) {
    return null;
  }

  return { x, y };
}
