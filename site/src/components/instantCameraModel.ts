import type * as Three from "three";
import { geometryKit, reliefCanvas } from "./cameraModel";

type T = typeof Three;

/**
 * La fotocamera istantanea 3D, coperta di sticker di viaggio, costruita in codice come
 * la mirrorless di cameraModel.ts: arriva dallo snippet "Instant Cam" di Giulia (three.js r128),
 * portato su three.js recente. La usano la sezione sull'anno in California (InstantCamera),
 * dove si scatta e la foto esce dalla fessura, e la fascia degli oggetti che fluttuano in cima a
 * "Chi sono" (FloatingObjects). Unità: circa 2,8 cm; +Z è il frontale con l'obiettivo, +X il
 * lato del mirino.
 */

export const INSTANT_PALETTES = {
  nero: { body: 0x141415, trim: 0x1b1b1d, soft: 0x232325, swatch: "#121213" },
  antracite: {
    body: 0x2e2e31,
    trim: 0x353538,
    soft: 0x3a3a3d,
    swatch: "#2c2c2e",
  },
  grafite: {
    body: 0x55555a,
    trim: 0x5e5e63,
    soft: 0x4a4a4e,
    swatch: "#55555a",
  },
  cenere: { body: 0x9c9ca0, trim: 0xa6a6aa, soft: 0x7c7c80, swatch: "#9a9a9e" },
} as const;
export type InstantPaletteName = keyof typeof INSTANT_PALETTES;

/** La stampa che esce dalla fessura: larghezza, lunghezza, lato dell'immagine, spessore */
export const PRINT = { w: 3.1, l: 3.75, img: 2.7, t: 0.022 };

type Draw = (g: CanvasRenderingContext2D) => void;

// Plastica opaca appena goffrata, come il guscio delle istantanee: rumore ammorbidito
function blurNoise() {
  const N = 128;
  const a = new Float32Array(N * N);
  for (let i = 0; i < a.length; i++) a[i] = Math.random();
  return (u: number, v: number) => {
    const x = Math.floor(u * N);
    const y = Math.floor(v * N);
    let s = 0;
    for (let j = -1; j <= 1; j++)
      for (let i = -1; i <= 1; i++)
        s += a[((y + j + N) % N) * N + ((x + i + N) % N)];
    return s / 9;
  };
}

// ---------- Gli sticker: disegnati in canvas, fustellati con un bordo bianco ----------
const STK = 512;
const paper = "#f7f4ec";
const serif = (px: number, w = 700) =>
  `${w} ${px}px Georgia, "Times New Roman", serif`;

function stickerCanvas(path: Draw, draw: Draw) {
  const c = document.createElement("canvas");
  c.width = c.height = STK;
  const g = c.getContext("2d")!;
  g.save();
  path(g);
  g.lineJoin = "round";
  g.lineWidth = 34;
  g.strokeStyle = paper;
  g.stroke();
  g.fillStyle = paper;
  g.fill();
  g.clip();
  draw(g);
  g.restore();
  // Grana e un filo di usura
  const img = g.getImageData(0, 0, STK, STK);
  for (let i = 0; i < img.data.length; i += 4) {
    if (!img.data[i + 3]) continue;
    const n = (Math.random() - 0.5) * 14;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  return c;
}

const P = {
  circle:
    (r = 220): Draw =>
    (g) => {
      g.beginPath();
      g.arc(256, 256, r, 0, Math.PI * 2);
    },
  oval:
    (rx: number, ry: number): Draw =>
    (g) => {
      g.beginPath();
      g.ellipse(256, 256, rx, ry, 0, 0, Math.PI * 2);
    },
  rect:
    (w: number, h: number, r: number): Draw =>
    (g) => {
      g.beginPath();
      const x = 256 - w / 2;
      const y = 256 - h / 2;
      g.moveTo(x + r, y);
      g.arcTo(x + w, y, x + w, y + h, r);
      g.arcTo(x + w, y + h, x, y + h, r);
      g.arcTo(x, y + h, x, y, r);
      g.arcTo(x, y, x + w, y, r);
      g.closePath();
    },
  arch:
    (w: number, h: number): Draw =>
    (g) => {
      g.beginPath();
      const x = 256 - w / 2;
      const top = 256 - h / 2 + w / 2;
      const bot = 256 + h / 2;
      g.moveTo(x, bot - 20);
      g.lineTo(x, top);
      g.arc(256, top, w / 2, Math.PI, 0);
      g.lineTo(x + w, bot - 20);
      g.quadraticCurveTo(x + w, bot, x + w - 20, bot);
      g.lineTo(x + 20, bot);
      g.quadraticCurveTo(x, bot, x, bot - 20);
      g.closePath();
    },
  shield:
    (w: number, h: number): Draw =>
    (g) => {
      g.beginPath();
      const x = 256 - w / 2;
      const y = 256 - h / 2;
      g.moveTo(x + 24, y);
      g.lineTo(x + w - 24, y);
      g.quadraticCurveTo(x + w, y, x + w, y + 24);
      g.lineTo(x + w, y + h * 0.55);
      g.quadraticCurveTo(x + w, y + h * 0.85, 256, y + h);
      g.quadraticCurveTo(x, y + h * 0.85, x, y + h * 0.55);
      g.lineTo(x, y + 24);
      g.quadraticCurveTo(x, y, x + 24, y);
      g.closePath();
    },
  pebble: ((g) => {
    g.beginPath();
    g.moveTo(256, 470);
    g.bezierCurveTo(120, 440, 40, 300, 50, 180);
    g.bezierCurveTo(60, 70, 180, 40, 256, 40);
    g.bezierCurveTo(332, 40, 452, 70, 462, 180);
    g.bezierCurveTo(472, 300, 392, 440, 256, 470);
    g.closePath();
  }) as Draw,
};

function arcText(
  g: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  r: number,
  center: number,
  bottom: boolean,
  font: string,
  color: string,
) {
  g.save();
  g.font = font;
  g.fillStyle = color;
  g.textAlign = "center";
  g.textBaseline = "middle";
  const chars = [...text];
  const widths = chars.map((ch) => g.measureText(ch).width + 2);
  const total = widths.reduce((a, b) => a + b, 0);
  let cum = 0;
  chars.forEach((ch, i) => {
    const off = (cum + widths[i] / 2 - total / 2) / r;
    const a = bottom ? center - off : center + off;
    g.save();
    g.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    g.rotate(bottom ? a - Math.PI / 2 : a + Math.PI / 2);
    g.fillText(ch, 0, 0);
    g.restore();
    cum += widths[i];
  });
  g.restore();
}

function stars(
  g: CanvasRenderingContext2D,
  n: number,
  col: string,
  area: [number, number, number, number],
) {
  g.fillStyle = col;
  for (let i = 0; i < n; i++) {
    g.beginPath();
    g.arc(
      area[0] + Math.random() * area[2],
      area[1] + Math.random() * area[3],
      Math.random() * 3 + 1,
      0,
      7,
    );
    g.fill();
  }
}

/** Gli sticker dei paesi, disegnati una volta e riusati da ogni scena che costruisce la fotocamera */
let stickerCache: Record<string, HTMLCanvasElement> | null = null;

function stickers(displayFont: string) {
  if (stickerCache) return stickerCache;
  const display = (px: number) => `400 ${px}px ${displayFont}`;
  stickerCache = {
    china: stickerCanvas(P.pebble, (g) => {
      g.fillStyle = "#e39a35";
      g.fillRect(0, 0, 512, 512);
      g.fillStyle = "#f4ead2";
      g.beginPath();
      g.ellipse(256, 230, 160, 150, 0, 0, 7);
      g.fill();
      g.strokeStyle = "#b8352a";
      g.lineWidth = 6;
      g.stroke();
      // Il drago stilizzato
      g.strokeStyle = "#2f7d55";
      g.lineWidth = 22;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(150, 300);
      g.bezierCurveTo(170, 180, 260, 330, 290, 210);
      g.bezierCurveTo(305, 150, 360, 170, 352, 220);
      g.stroke();
      g.lineWidth = 8;
      for (const [a, b, c2, d] of [
        [190, 250, 170, 280],
        [240, 270, 255, 305],
        [300, 215, 330, 240],
      ]) {
        g.beginPath();
        g.moveTo(a, b);
        g.lineTo(c2, d);
        g.stroke();
      }
      g.fillStyle = "#2f7d55";
      g.beginPath();
      g.ellipse(355, 205, 26, 18, -0.4, 0, 7);
      g.fill();
      g.fillStyle = "#b8352a";
      g.font = serif(58);
      g.textAlign = "center";
      g.fillText("CHINA", 256, 430);
    }),
    norway: stickerCanvas(P.rect(400, 330, 70), (g) => {
      const sky = g.createLinearGradient(0, 90, 0, 420);
      sky.addColorStop(0, "#cfe3ea");
      sky.addColorStop(1, "#8fb9c8");
      g.fillStyle = sky;
      g.fillRect(0, 0, 512, 512);
      g.fillStyle = "#3d6f8f";
      g.fillRect(0, 300, 512, 140);
      // La vela a righe
      g.save();
      g.beginPath();
      g.moveTo(250, 120);
      g.lineTo(350, 140);
      g.lineTo(345, 255);
      g.lineTo(250, 245);
      g.closePath();
      g.clip();
      for (let i = 0; i < 8; i++) {
        g.fillStyle = i % 2 ? "#f6f2ea" : "#c9302c";
        g.fillRect(250 + i * 13, 100, 13, 170);
      }
      g.restore();
      g.strokeStyle = "#5b3a24";
      g.lineWidth = 8;
      g.beginPath();
      g.moveTo(250, 105);
      g.lineTo(250, 290);
      g.stroke();
      // Lo scafo
      g.fillStyle = "#7a4b2c";
      g.beginPath();
      g.moveTo(120, 255);
      g.quadraticCurveTo(250, 340, 390, 255);
      g.lineTo(370, 300);
      g.quadraticCurveTo(250, 340, 140, 300);
      g.closePath();
      g.fill();
      g.fillStyle = "#d9d2c3";
      for (let i = 0; i < 5; i++) {
        g.beginPath();
        g.arc(175 + i * 40, 280, 15, 0, 7);
        g.fill();
        g.strokeStyle = "#5b3a24";
        g.lineWidth = 4;
        g.stroke();
      }
      g.fillStyle = paper;
      g.fillRect(0, 345, 512, 70);
      g.fillStyle = "#1f3f63";
      g.font = serif(60);
      g.textAlign = "center";
      g.fillText("NORWAY", 256, 395);
    }),
    uk: stickerCanvas(P.circle(220), (g) => {
      g.fillStyle = "#b52a2f";
      g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 22; i++) {
        const a = (i / 22) * Math.PI * 2;
        if (Math.abs(Math.sin(a)) > 0.75) continue;
        g.fillStyle = paper;
        g.beginPath();
        g.arc(256 + Math.cos(a) * 185, 256 + Math.sin(a) * 185, 7, 0, 7);
        g.fill();
      }
      const sky = g.createLinearGradient(0, 100, 0, 420);
      sky.addColorStop(0, "#7fb2d6");
      sky.addColorStop(1, "#d8e8ee");
      g.fillStyle = sky;
      g.beginPath();
      g.arc(256, 256, 150, 0, 7);
      g.fill();
      // La torre con l'orologio
      g.fillStyle = "#c8a46a";
      g.fillRect(225, 175, 62, 230);
      g.beginPath();
      g.moveTo(220, 178);
      g.lineTo(256, 110);
      g.lineTo(292, 178);
      g.fill();
      g.fillStyle = paper;
      g.beginPath();
      g.arc(256, 215, 22, 0, 7);
      g.fill();
      g.strokeStyle = "#5a4630";
      g.lineWidth = 3;
      g.beginPath();
      g.moveTo(256, 215);
      g.lineTo(256, 200);
      g.moveTo(256, 215);
      g.lineTo(267, 220);
      g.stroke();
      g.fillStyle = "#8c6f45";
      for (let i = 0; i < 5; i++) g.fillRect(232 + i * 11, 260, 5, 120);
      g.fillStyle = "#3b5f45";
      g.fillRect(100, 360, 312, 60);
      arcText(
        g,
        "UNITED",
        256,
        256,
        186,
        -Math.PI / 2,
        false,
        serif(46),
        paper,
      );
      arcText(g, "KINGDOM", 256, 256, 186, Math.PI / 2, true, serif(46), paper);
    }),
    mexico: stickerCanvas(P.circle(200), (g) => {
      g.fillStyle = "#2f3170";
      g.fillRect(0, 0, 512, 512);
      // Il teschio decorato
      g.fillStyle = "#fbfaf6";
      g.strokeStyle = "#2a2a3a";
      g.lineWidth = 6;
      g.beginPath();
      g.ellipse(256, 225, 125, 130, 0, 0, 7);
      g.fill();
      g.stroke();
      const flower = (
        x: number,
        y: number,
        r: number,
        c1: string,
        c2: string,
      ) => {
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4;
          g.fillStyle = c1;
          g.beginPath();
          g.ellipse(
            x + Math.cos(a) * r,
            y + Math.sin(a) * r,
            r * 0.6,
            r * 0.35,
            a,
            0,
            7,
          );
          g.fill();
        }
        g.fillStyle = c2;
        g.beginPath();
        g.arc(x, y, r * 0.5, 0, 7);
        g.fill();
      };
      flower(205, 230, 30, "#e8566c", "#f2b134");
      flower(307, 230, 30, "#3aa0c8", "#f2b134");
      flower(256, 135, 20, "#f08a24", "#7b4bb3");
      g.fillStyle = "#2a2a3a";
      g.beginPath();
      g.moveTo(256, 268);
      g.lineTo(242, 292);
      g.lineTo(270, 292);
      g.fill();
      g.strokeStyle = "#2a2a3a";
      g.lineWidth = 4;
      g.beginPath();
      g.moveTo(205, 318);
      g.quadraticCurveTo(256, 345, 307, 318);
      g.stroke();
      for (let i = 0; i < 7; i++) {
        g.beginPath();
        g.moveTo(214 + i * 14, 315 + Math.sin((i / 6) * Math.PI) * 10);
        g.lineTo(214 + i * 14, 334 + Math.sin((i / 6) * Math.PI) * 8);
        g.stroke();
      }
      g.strokeStyle = "#f2b134";
      g.lineWidth = 6;
      g.beginPath();
      g.arc(140, 330, 30, 0, 4);
      g.stroke();
      g.strokeStyle = "#e8566c";
      g.beginPath();
      g.arc(372, 330, 26, 3, 7);
      g.stroke();
      g.fillStyle = "#f2b134";
      g.fillRect(150, 385, 212, 66);
      g.fillStyle = "#2a2a3a";
      g.font = display(52);
      g.textAlign = "center";
      g.fillText("MEXICO", 256, 436);
    }),
    morocco: stickerCanvas(P.arch(330, 430), (g) => {
      const sky = g.createLinearGradient(0, 40, 0, 470);
      sky.addColorStop(0, "#2b3f8f");
      sky.addColorStop(0.7, "#6b5fae");
      sky.addColorStop(1, "#a98cc4");
      g.fillStyle = sky;
      g.fillRect(0, 0, 512, 512);
      stars(g, 26, "#f3e9c6", [100, 60, 312, 200]);
      g.fillStyle = "#f3e9c6";
      g.beginPath();
      g.arc(300, 140, 40, 0, 7);
      g.fill();
      g.fillStyle = "#34428f";
      g.beginPath();
      g.arc(318, 128, 36, 0, 7);
      g.fill();
      g.fillStyle = "#d9b27c";
      g.beginPath();
      g.moveTo(60, 340);
      g.quadraticCurveTo(200, 270, 300, 330);
      g.quadraticCurveTo(380, 290, 460, 320);
      g.lineTo(460, 512);
      g.lineTo(60, 512);
      g.fill();
      g.fillStyle = "#c4955d";
      g.beginPath();
      g.moveTo(60, 380);
      g.quadraticCurveTo(250, 320, 460, 390);
      g.lineTo(460, 512);
      g.lineTo(60, 512);
      g.fill();
      // La palma
      g.strokeStyle = "#4a3a2a";
      g.lineWidth = 8;
      g.beginPath();
      g.moveTo(180, 345);
      g.quadraticCurveTo(170, 280, 190, 230);
      g.stroke();
      g.strokeStyle = "#2f6b4a";
      g.lineWidth = 9;
      for (const [dx, dy] of [
        [-60, 10],
        [-40, -25],
        [0, -35],
        [40, -20],
        [55, 15],
      ]) {
        g.beginPath();
        g.moveTo(190, 230);
        g.quadraticCurveTo(
          190 + dx * 0.5,
          230 + dy - 15,
          190 + dx,
          230 + dy + 20,
        );
        g.stroke();
      }
      g.fillStyle = paper;
      g.font = serif(52);
      g.textAlign = "center";
      g.fillText("MOROCCO", 256, 445);
    }),
    france: stickerCanvas(P.rect(320, 440, 18), (g) => {
      const sky = g.createLinearGradient(0, 30, 0, 480);
      sky.addColorStop(0, "#1d2f6b");
      sky.addColorStop(1, "#5d7fb8");
      g.fillStyle = sky;
      g.fillRect(0, 0, 512, 512);
      stars(g, 30, "#e8eefc", [100, 40, 312, 260]);
      // La torre a traliccio
      g.strokeStyle = "#e8eefc";
      g.lineWidth = 5;
      g.beginPath();
      g.moveTo(256, 60);
      g.lineTo(200, 380);
      g.moveTo(256, 60);
      g.lineTo(312, 380);
      g.stroke();
      g.lineWidth = 3;
      for (let i = 0; i < 12; i++) {
        const t = i / 12;
        const y = 80 + t * 290;
        const hw = 6 + t * 50;
        g.beginPath();
        g.moveTo(256 - hw, y);
        g.lineTo(256 + hw, y + 24);
        g.moveTo(256 + hw, y);
        g.lineTo(256 - hw, y + 24);
        g.stroke();
      }
      g.lineWidth = 6;
      for (const [y, hw] of [
        [150, 26],
        [260, 44],
      ]) {
        g.beginPath();
        g.moveTo(256 - hw, y);
        g.lineTo(256 + hw, y);
        g.stroke();
      }
      g.beginPath();
      g.arc(256, 400, 40, Math.PI, 0);
      g.stroke();
      g.fillStyle = "#c8302c";
      g.fillRect(96, 390, 320, 70);
      g.fillStyle = paper;
      g.font = serif(54);
      g.textAlign = "center";
      g.fillText("FRANCE", 256, 442);
    }),
    japan: stickerCanvas(P.circle(215), (g) => {
      g.fillStyle = "#9b3a3a";
      g.fillRect(0, 0, 512, 512);
      const sky = g.createLinearGradient(0, 80, 0, 430);
      sky.addColorStop(0, "#f6e3e3");
      sky.addColorStop(1, "#e9eef2");
      g.fillStyle = sky;
      g.beginPath();
      g.arc(256, 256, 170, 0, 7);
      g.fill();
      // La pagoda
      g.fillStyle = "#3a3f4a";
      for (let i = 0; i < 5; i++) {
        const y = 150 + i * 48;
        const w = 60 + i * 22;
        g.beginPath();
        g.moveTo(256 - w, y + 18);
        g.quadraticCurveTo(256, y - 8, 256 + w, y + 18);
        g.lineTo(256 + w - 18, y + 26);
        g.lineTo(256 - w + 18, y + 26);
        g.fill();
        g.fillRect(256 - w * 0.45, y + 26, w * 0.9, 22);
      }
      g.fillRect(252, 100, 8, 55);
      // I fiori di ciliegio
      for (let i = 0; i < 70; i++) {
        const a = Math.random() * 7;
        const r = 120 + Math.random() * 55;
        g.fillStyle = Math.random() > 0.5 ? "#f2a9bf" : "#f7c9d6";
        g.beginPath();
        g.arc(
          256 + Math.cos(a) * r,
          256 + Math.sin(a) * r * 0.9 - 30,
          5 + Math.random() * 6,
          0,
          7,
        );
        g.fill();
      }
      arcText(g, "JAPAN", 256, 256, 192, Math.PI / 2, true, serif(42), paper);
    }),
    canada: stickerCanvas(P.shield(330, 400), (g) => {
      g.fillStyle = paper;
      g.fillRect(0, 0, 512, 512);
      g.fillStyle = "#c3272b";
      g.fillRect(0, 0, 512, 160);
      g.fillStyle = paper;
      g.font = display(84);
      g.textAlign = "center";
      g.fillText("CANADA", 256, 140);
      g.fillStyle = "#8fa8c0";
      g.beginPath();
      g.moveTo(91, 380);
      g.lineTo(170, 230);
      g.lineTo(230, 320);
      g.lineTo(300, 205);
      g.lineTo(421, 380);
      g.fill();
      g.fillStyle = paper;
      for (const [x, y, s] of [
        [170, 230, 14],
        [300, 205, 17],
      ]) {
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(x - s, y + s * 1.6);
        g.lineTo(x + s, y + s * 1.6);
        g.fill();
      }
      const leaf = [
        [0, -1],
        [0.12, -0.7],
        [0.32, -0.8],
        [0.27, -0.38],
        [0.62, -0.6],
        [0.55, -0.42],
        [0.85, -0.38],
        [0.7, -0.15],
        [0.78, -0.05],
        [0.4, 0.1],
        [0.45, 0.28],
        [0.06, 0.2],
        [0.06, 0.6],
        [-0.06, 0.6],
        [-0.06, 0.2],
        [-0.45, 0.28],
        [-0.4, 0.1],
        [-0.78, -0.05],
        [-0.7, -0.15],
        [-0.85, -0.38],
        [-0.55, -0.42],
        [-0.62, -0.6],
        [-0.27, -0.38],
        [-0.32, -0.8],
        [-0.12, -0.7],
      ];
      g.fillStyle = "#c3272b";
      g.beginPath();
      leaf.forEach(([x, y], i) => {
        if (i) g.lineTo(256 + x * 85, 330 + y * 85);
        else g.moveTo(256 + x * 85, 330 + y * 85);
      });
      g.closePath();
      g.fill();
    }),
    germany: stickerCanvas(P.oval(220, 175), (g) => {
      g.fillStyle = "#d9a83a";
      g.fillRect(0, 0, 512, 512);
      g.fillStyle = "#f4ead2";
      g.beginPath();
      g.ellipse(256, 256, 170, 125, 0, 0, 7);
      g.fill();
      g.strokeStyle = "#8b5a2b";
      g.lineWidth = 4;
      g.stroke();
      // Il bretzel
      g.strokeStyle = "#8a4e22";
      g.lineWidth = 30;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(256, 330);
      g.bezierCurveTo(140, 330, 150, 190, 230, 200);
      g.bezierCurveTo(300, 210, 260, 300, 205, 315);
      g.stroke();
      g.beginPath();
      g.moveTo(256, 330);
      g.bezierCurveTo(372, 330, 362, 190, 282, 200);
      g.bezierCurveTo(212, 210, 252, 300, 307, 315);
      g.stroke();
      g.fillStyle = "#f4ead2";
      for (let i = 0; i < 18; i++)
        g.fillRect(170 + Math.random() * 170, 200 + Math.random() * 120, 4, 3);
      arcText(
        g,
        "GERMANY",
        256,
        300,
        205,
        -Math.PI / 2,
        false,
        serif(44),
        "#9b2a24",
      );
    }),
  };
  return stickerCache;
}

/**
 * Le scene inventate che la stampa mostra quando non ci sono foto vere: un tramonto sul mare,
 * montagne su un lago, una città al crepuscolo
 */
export const SCENES: Draw[] = [
  (g) => {
    const s = g.createLinearGradient(0, 0, 0, 300);
    s.addColorStop(0, "#f2a65a");
    s.addColorStop(0.6, "#f6c98b");
    s.addColorStop(1, "#f9e0b5");
    g.fillStyle = s;
    g.fillRect(0, 0, 512, 300);
    g.fillStyle = "#fff1d0";
    g.beginPath();
    g.arc(300, 270, 60, 0, 7);
    g.fill();
    const sea = g.createLinearGradient(0, 290, 0, 512);
    sea.addColorStop(0, "#5f8ea3");
    sea.addColorStop(1, "#244b63");
    g.fillStyle = sea;
    g.fillRect(0, 290, 512, 222);
    g.strokeStyle = "rgba(255,230,190,.55)";
    g.lineWidth = 3;
    for (let i = 0; i < 14; i++) {
      const y = 305 + i * 14;
      g.beginPath();
      g.moveTo(240 - i * 6, y);
      g.lineTo(360 + i * 6, y);
      g.stroke();
    }
    g.fillStyle = "#1d2a35";
    g.beginPath();
    g.moveTo(120, 380);
    g.lineTo(175, 380);
    g.lineTo(165, 392);
    g.lineTo(128, 392);
    g.fill();
    g.beginPath();
    g.moveTo(150, 378);
    g.lineTo(150, 320);
    g.lineTo(178, 372);
    g.fill();
  },
  (g) => {
    const s = g.createLinearGradient(0, 0, 0, 280);
    s.addColorStop(0, "#9cc3d9");
    s.addColorStop(1, "#e8eef0");
    g.fillStyle = s;
    g.fillRect(0, 0, 512, 512);
    g.fillStyle = "#6f86a0";
    g.beginPath();
    g.moveTo(0, 300);
    g.lineTo(140, 120);
    g.lineTo(230, 220);
    g.lineTo(330, 90);
    g.lineTo(512, 300);
    g.fill();
    g.fillStyle = "#f4f6f7";
    for (const [x, y, w] of [
      [140, 120, 36],
      [330, 90, 44],
    ]) {
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x - w, y + w * 1.2);
      g.lineTo(x + w, y + w * 1.2);
      g.fill();
    }
    g.fillStyle = "#3e5f4c";
    g.fillRect(0, 290, 512, 40);
    const l = g.createLinearGradient(0, 330, 0, 512);
    l.addColorStop(0, "#6c94a8");
    l.addColorStop(1, "#2f4f61");
    g.fillStyle = l;
    g.fillRect(0, 330, 512, 182);
    g.fillStyle = "#2c4636";
    for (let i = 0; i < 18; i++) {
      const x = i * 30 + 5;
      g.beginPath();
      g.moveTo(x, 300);
      g.lineTo(x + 12, 250 - (i % 3) * 10);
      g.lineTo(x + 24, 300);
      g.fill();
    }
  },
  (g) => {
    const s = g.createLinearGradient(0, 0, 0, 512);
    s.addColorStop(0, "#30406e");
    s.addColorStop(0.55, "#c77a8a");
    s.addColorStop(1, "#f2b38a");
    g.fillStyle = s;
    g.fillRect(0, 0, 512, 512);
    let x = 0;
    g.fillStyle = "#1e2235";
    while (x < 512) {
      const w = 30 + Math.random() * 50;
      const h = 120 + Math.random() * 200;
      g.fillRect(x, 512 - h, w, h);
      x += w + 4;
    }
    g.fillStyle = "#f6d58a";
    for (let i = 0; i < 160; i++)
      g.fillRect(Math.random() * 512, 300 + Math.random() * 212, 4, 6);
  },
];

/**
 * Gli sticker e le scritte usano i caratteri del sito, che vanno caricati prima di disegnarli:
 * chi costruisce il modello aspetta questa promessa
 */
export function fontsReady() {
  if (!document.fonts) return Promise.resolve();
  const display = getComputedStyle(document.documentElement)
    .getPropertyValue("--display")
    .trim();
  return Promise.all([
    document.fonts.ready,
    display ? document.fonts.load(`84px ${display}`).catch(() => {}) : null,
  ]).then(() => undefined);
}

/**
 * Il modello, già centrato: oltre a `model`, `setPalette` e `dispose` espone i pezzi che
 * servono allo scatto (il tasto rosso, il flash, la stampa e la tela della foto). La stampa
 * resta nascosta finché una scena non scatta
 */
export function createInstantCameraModel(THREE: T) {
  const textures: Three.Texture[] = [];
  const extraMats: Three.Material[] = [];
  const { box, cylZ, lathe } = geometryKit(THREE);
  // Le scritte usano i caratteri del sito: quello del testo e quello dei titoli
  const font = getComputedStyle(document.body).fontFamily || "sans-serif";
  const displayFont =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--display")
      .trim() || "Impact, sans-serif";

  const relief = (
    id: string,
    w: number,
    h: number,
    fn: (u: number, v: number) => number,
    strength: number,
    rx = 1,
    ry = 1,
  ) => {
    const t = new THREE.CanvasTexture(reliefCanvas(id, w, h, fn, strength));
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rx, ry);
    t.anisotropy = 8;
    textures.push(t);
    return t;
  };
  const canvasTex = (c: HTMLCanvasElement) => {
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    t.colorSpace = THREE.SRGBColorSpace;
    textures.push(t);
    return t;
  };

  const plasticN = relief("instant-plastic", 256, 256, blurNoise(), 3, 3, 3);
  const ribsN = relief(
    "instant-ribs",
    64,
    64,
    (_u, v) => Math.abs(Math.sin(v * Math.PI * 6)),
    4,
  );

  // ---------- Materiali ----------
  const M = {
    body: new THREE.MeshStandardMaterial({
      color: 0x141415,
      roughness: 0.62,
      normalMap: plasticN,
      normalScale: new THREE.Vector2(0.45, 0.45),
    }),
    trim: new THREE.MeshStandardMaterial({
      color: 0x1b1b1d,
      roughness: 0.5,
      normalMap: plasticN,
      normalScale: new THREE.Vector2(0.3, 0.3),
    }),
    soft: new THREE.MeshStandardMaterial({
      color: 0x232325,
      roughness: 0.85,
      normalMap: plasticN,
      normalScale: new THREE.Vector2(0.6, 0.6),
    }),
    black: new THREE.MeshStandardMaterial({
      color: 0x030303,
      roughness: 0.95,
      side: THREE.DoubleSide,
    }),
    red: new THREE.MeshPhysicalMaterial({
      color: 0xd8301f,
      roughness: 0.32,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    }),
    redRib: new THREE.MeshStandardMaterial({
      color: 0xd8301f,
      roughness: 0.4,
      normalMap: ribsN,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x07100c,
      roughness: 0.02,
      clearcoat: 1,
      clearcoatRoughness: 0.01,
      envMapIntensity: 3,
    }),
    coat: new THREE.MeshStandardMaterial({
      color: 0x1f4a3a,
      roughness: 0.08,
      metalness: 1,
      envMapIntensity: 1.3,
    }),
    clear: new THREE.MeshPhysicalMaterial({
      color: 0x9aa0a4,
      roughness: 0.08,
      metalness: 0.2,
      clearcoat: 1,
      envMapIntensity: 2.2,
    }),
    paper: new THREE.MeshStandardMaterial({ color: 0xf7f6f2, roughness: 0.85 }),
    grey: new THREE.MeshStandardMaterial({ color: 0x8a8a8c, roughness: 0.5 }),
  };

  const textPlane = (
    text: string,
    w: number,
    h: number,
    px: number,
    color = "#d9d9d9",
  ) => {
    const c = document.createElement("canvas");
    c.width = Math.round(w * 400);
    c.height = Math.round(h * 400);
    const g = c.getContext("2d")!;
    g.fillStyle = color;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = `500 ${px}px ${font}`;
    g.fillText(text, c.width / 2, c.height / 2);
    const mat = new THREE.MeshStandardMaterial({
      map: canvasTex(c),
      transparent: true,
      roughness: 0.6,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
    });
    extraMats.push(mat);
    return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  };

  // ---------- Il modello ----------
  const model = new THREE.Group();
  const add = (
    geo: Three.BufferGeometry,
    mat: Three.Material,
    x = 0,
    y = 0,
    z = 0,
    parent: Three.Object3D = model,
  ) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };

  const W = 4.0;
  const BASE_H = 1.0;
  const BASE_FRONT = 1.88;
  const BASE_BACK = -2.3;
  const HEAD_FRONT = 1.6;
  const HEAD_BACK = 0.75;
  const HEAD_TOP = 3.55;
  const SLOT_Y = 0.66;

  // La base che contiene la pellicola
  add(
    box(W, BASE_H, BASE_FRONT - BASE_BACK, 0.12, 0.08),
    M.body,
    0,
    BASE_H / 2,
    (BASE_FRONT + BASE_BACK) / 2,
  );
  // La fessura da cui esce la foto, con il labbro sopra
  add(
    box(3.5, 0.08, 0.06, 0.03, 0.01, 1),
    M.black,
    0,
    SLOT_Y,
    BASE_FRONT - 0.01,
  );
  add(
    box(3.62, 0.1, 0.08, 0.04, 0.02, 2),
    M.trim,
    0,
    SLOT_Y + 0.1,
    BASE_FRONT + 0.02,
  );
  // Il pannello frontale in basso, appena incassato
  add(box(3.7, 0.42, 0.04, 0.06, 0.015, 2), M.trim, 0, 0.3, BASE_FRONT + 0.005);
  // Le giunzioni sui fianchi e i ganci dietro
  for (const sx of [-1, 1])
    add(
      box(0.02, 0.03, BASE_FRONT - BASE_BACK - 0.6, 0.01, 0.005, 1),
      M.black,
      sx * (W / 2 + 0.002),
      0.42,
      -0.25,
    );
  for (const x of [-1.35, 1.35]) {
    add(box(0.55, 0.22, 0.1, 0.04, 0.02, 2), M.trim, x, 0.3, BASE_BACK - 0.03);
    add(box(0.4, 0.05, 0.12, 0.02, 0.01, 1), M.trim, x, 0.42, BASE_BACK - 0.05);
  }
  // I piedini e l'attacco del treppiede
  for (const [x, z] of [
    [-1.6, 1.4],
    [1.6, 1.4],
    [-1.6, -1.9],
    [1.6, -1.9],
  ])
    add(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 20), M.soft, x, -0.005, z);
  add(
    new THREE.CylinderGeometry(0.22, 0.22, 0.02, 40),
    M.trim,
    0,
    -0.005,
    -0.4,
  );
  add(
    new THREE.CylinderGeometry(0.06, 0.06, 0.03, 20),
    M.black,
    0,
    -0.01,
    -0.4,
  );

  // La fascia sopra la base, dove sta la meccanica
  add(
    box(W, 0.52, 0.42, 0.1, 0.06),
    M.trim,
    0,
    BASE_H + 0.24,
    HEAD_FRONT + 0.1,
  );
  add(
    box(1.3, 0.24, 0.1, 0.1, 0.03, 2),
    M.black,
    0.3,
    BASE_H + 0.26,
    HEAD_FRONT + 0.3,
  );
  add(
    box(0.32, 0.2, 0.14, 0.09, 0.04, 3),
    M.trim,
    0.62,
    BASE_H + 0.26,
    HEAD_FRONT + 0.33,
  );
  for (const x of [-1.3, 1.3])
    add(
      box(0.02, 0.4, 0.02, 0.01, 0.005, 1),
      M.black,
      x,
      BASE_H + 0.24,
      HEAD_FRONT + 0.315,
    );

  // Il frontale verticale
  add(
    box(W, HEAD_TOP - BASE_H, HEAD_FRONT - HEAD_BACK, 0.32, 0.1, 5),
    M.body,
    0,
    (HEAD_TOP + BASE_H) / 2,
    (HEAD_FRONT + HEAD_BACK) / 2,
  );

  // L'obiettivo ad anelli concentrici
  {
    const g = new THREE.Group();
    g.position.set(0.12, 2.5, HEAD_FRONT);
    model.add(g);
    const a = (geo: Three.BufferGeometry, mat: Three.Material, z = 0) =>
      add(geo, mat, 0, 0, z, g);
    a(
      lathe([
        [0.84, 0],
        [0.86, 0.02],
        [0.86, 0.18],
        [0.83, 0.22],
        [0.78, 0.23],
      ]),
      M.trim,
    );
    // I gradini, con un profilo a dente di sega
    const pts: [number, number][] = [];
    let r = 0.78;
    const z = 0.23;
    for (let i = 0; i < 9; i++) {
      pts.push([r, z]);
      r -= 0.022;
      pts.push([r, z + 0.012]);
      r -= 0.012;
    }
    pts.push([r, z + 0.03], [r - 0.03, z + 0.06], [0.4, 0.31]);
    a(lathe(pts, 120), M.body);
    a(cylZ(0.4, 0.2, 64, true), M.black, 0.22);
    // La lente: una calotta lucida e, dentro, un elemento con il riflesso verde
    const capG = (R: number, rr: number) => {
      const t = Math.asin(Math.min(0.999, rr / R));
      const geo = new THREE.SphereGeometry(R, 64, 16, 0, Math.PI * 2, 0, t);
      geo.rotateX(Math.PI / 2);
      return geo;
    };
    a(capG(0.9, 0.3), M.coat, 0.22 - 0.9 + 0.05);
    a(capG(0.75, 0.39), M.glass, 0.33 - 0.75);
    a(new THREE.TorusGeometry(0.395, 0.018, 10, 64), M.trim, 0.31);
  }

  // Il flash: una cornice e il diffusore a prisma, che si accende allo scatto
  const flashMat = (() => {
    const x = -1.38;
    const y = 2.72;
    add(box(0.86, 1.12, 0.06, 0.1, 0.02, 2), M.trim, x, y, HEAD_FRONT + 0.01);
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 320;
    const g = c.getContext("2d")!;
    const lg = g.createLinearGradient(0, 0, 256, 0);
    for (let i = 0; i <= 16; i++)
      lg.addColorStop(i / 16, i % 2 ? "#e9ecee" : "#9ea4a8");
    g.fillStyle = lg;
    g.fillRect(0, 0, 256, 320);
    g.fillStyle = "rgba(255,255,255,.55)";
    g.fillRect(70, 0, 50, 320);
    g.fillRect(150, 0, 20, 320);
    g.fillStyle = "rgba(0,0,0,.08)";
    for (let yy = 0; yy < 320; yy += 6) g.fillRect(0, yy, 256, 2);
    const mat = new THREE.MeshPhysicalMaterial({
      map: canvasTex(c),
      roughness: 0.12,
      metalness: 0.3,
      clearcoat: 1,
      emissive: 0xffffff,
      emissiveIntensity: 0,
    });
    extraMats.push(mat);
    add(box(0.7, 0.96, 0.05, 0.06, 0.015, 2), mat, x, y, HEAD_FRONT + 0.03);
    return mat;
  })();
  const flashLight = new THREE.PointLight(0xffffff, 0, 14, 1.6);
  flashLight.position.set(-1.38, 2.72, HEAD_FRONT + 0.6);
  model.add(flashLight);

  // La finestra del mirino
  {
    const x = 1.42;
    const y = 2.98;
    add(box(0.86, 0.82, 0.08, 0.14, 0.03, 3), M.trim, x, y, HEAD_FRONT + 0.01);
    add(box(0.68, 0.64, 0.04, 0.1, 0.01, 2), M.black, x, y, HEAD_FRONT + 0.04);
    const g = new THREE.SphereGeometry(0.6, 48, 12, 0, Math.PI * 2, 0, 0.5);
    g.rotateX(Math.PI / 2);
    g.scale(0.95, 0.9, 0.5);
    add(g, M.clear, x, y, HEAD_FRONT - 0.2);
    add(box(0.1, 0.1, 0.01, 0.01, 0.003, 1), M.paper, x, y, HEAD_FRONT + 0.08);
  }
  // Il cursore dell'esposizione, fra "–" e "+"
  add(
    box(0.55, 0.16, 0.04, 0.08, 0.015, 2),
    M.black,
    1.42,
    2.3,
    HEAD_FRONT + 0.005,
  );
  add(cylZ(0.09, 0.08, 32), M.trim, 1.5, 2.3, HEAD_FRONT + 0.04);
  for (const [t, x] of [
    ["–", 1.0],
    ["+", 1.84],
  ] as const) {
    const p = textPlane(t, 0.16, 0.16, 54, "#8a8a8c");
    p.position.set(x, 2.3, HEAD_FRONT + 0.003);
    model.add(p);
  }
  // Il tasto "+", il sensore e il pulsante tondo
  add(
    box(0.22, 0.22, 0.06, 0.05, 0.02, 2),
    M.black,
    -0.78,
    3.22,
    HEAD_FRONT + 0.01,
  );
  {
    const p = textPlane("+", 0.2, 0.2, 64, "#e6e6e6");
    p.position.set(-0.78, 3.22, HEAD_FRONT + 0.045);
    model.add(p);
  }
  add(cylZ(0.1, 0.04, 32), M.trim, -0.78, 2.85, HEAD_FRONT + 0.01);
  add(cylZ(0.055, 0.05, 24), M.glass, -0.78, 2.85, HEAD_FRONT + 0.02);
  add(cylZ(0.13, 0.05, 40), M.trim, 1.22, 1.85, HEAD_FRONT + 0.01);
  add(cylZ(0.09, 0.08, 40), M.black, 1.22, 1.85, HEAD_FRONT + 0.03);

  // Il tasto di scatto rosso, quello da cliccare
  const shutter = new THREE.Group();
  shutter.position.set(-1.42, 1.93, HEAD_FRONT);
  model.add(shutter);
  add(cylZ(0.29, 0.05, 64), M.black, 0, 0, 0.01, shutter);
  const shutterCap = new THREE.Group();
  shutter.add(shutterCap);
  add(cylZ(0.24, 0.1, 64), M.red, 0, 0, 0.06, shutterCap);
  {
    const g = new THREE.SphereGeometry(0.6, 48, 10, 0, Math.PI * 2, 0, 0.41);
    g.rotateX(Math.PI / 2);
    add(g, M.red, 0, 0, 0.11 - 0.6 + 0.02, shutterCap);
  }

  // Il pulsante rosso in cima e la griglia dell'altoparlante
  add(
    new THREE.CylinderGeometry(0.1, 0.1, 0.18, 32),
    M.red,
    -0.2,
    HEAD_TOP + 0.06,
    1.15,
  );
  add(
    box(0.3, 0.02, 0.22, 0.04, 0.008, 1),
    M.black,
    -0.2,
    HEAD_TOP - 0.005,
    1.15,
  );
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 2; j++)
      add(
        new THREE.CylinderGeometry(0.018, 0.018, 0.02, 10),
        M.black,
        0.45 + i * 0.07,
        HEAD_TOP - 0.002,
        1.1 + j * 0.08,
      );

  // Il dorso inclinato: il profilo laterale estruso lungo la larghezza
  const SL_X0 = -1.3;
  const SL_X1 = 2.0;
  const SL_BEV = 0.08;
  const D = { z: -2.2, y: 1.0 };
  const C = { z: 0.15, y: 3.0 };
  {
    const s = new THREE.Shape(); // coordinate (−z, y)
    s.moveTo(-0.8, 0.95);
    s.lineTo(-0.8, 3.0);
    s.lineTo(-C.z, C.y);
    s.lineTo(-D.z, D.y);
    s.lineTo(-0.8, 0.95);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: SL_X1 - SL_X0 - 2 * SL_BEV,
      bevelEnabled: true,
      bevelThickness: SL_BEV,
      bevelSize: SL_BEV,
      bevelSegments: 4,
      curveSegments: 8,
    });
    g.rotateY(Math.PI / 2);
    g.translate(SL_X0 + SL_BEV, 0, 0);
    g.computeVertexNormals();
    add(g, M.body);
  }
  // L'oculare del mirino, un tubo di gomma sul retro
  add(box(0.82, 0.76, 1.5, 0.2, 0.1, 4), M.soft, 1.38, 2.72, -0.42);
  add(box(0.58, 0.52, 0.04, 0.12, 0.02, 2), M.black, 1.38, 2.72, -1.17);
  add(box(0.3, 0.3, 0.02, 0.04, 0.006, 1), M.grey, 1.38, 2.72, -1.2);
  // Dietro il frontale: l'interruttore "on", la porta USB, un tasto
  {
    const x = -1.66;
    const z = HEAD_BACK;
    add(box(0.42, 0.34, 0.1, 0.05, 0.02, 2), M.redRib, x, 3.0, z - 0.03);
    const p = textPlane("on", 0.26, 0.12, 60, "#ffffff");
    p.position.set(x, 3.08, z - 0.085);
    p.rotation.y = Math.PI;
    model.add(p);
    add(
      box(0.26, 0.08, 0.04, 0.03, 0.01, 1),
      M.black,
      x - 0.05,
      1.9,
      z - 0.005,
    );
    add(cylZ(0.13, 0.04, 40), M.trim, x - 0.05, 1.58, z - 0.01);
    add(cylZ(0.022, 0.02, 12), M.grey, x + 0.22, 1.9, z - 0.01);
  }

  // ---------- Gli sticker ----------
  const art = stickers(displayFont);
  const stickerTextures = new Map<string, Three.Texture>();
  const stickerMat = (name: string) => {
    let tex = stickerTextures.get(name);
    if (!tex) {
      tex = canvasTex(art[name]);
      stickerTextures.set(name, tex);
    }
    const m = new THREE.MeshPhysicalMaterial({
      map: tex,
      alphaTest: 0.5,
      roughness: 0.38,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
    extraMats.push(m);
    return m;
  };
  const place = (
    name: string,
    size: number,
    pos: Three.Vector3,
    basis: [Three.Vector3, Three.Vector3, Three.Vector3],
    rot: number,
  ) => {
    const g = new THREE.PlaneGeometry(size, size, 8, 8);
    g.rotateZ(rot);
    const m = new THREE.Mesh(g, stickerMat(name));
    m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(...basis));
    m.position.copy(pos);
    m.receiveShadow = true;
    model.add(m);
  };
  // Sul piano inclinato: s è la distanza dal fondo lungo la pendenza, x la posizione in larghezza
  const SL_U = new THREE.Vector3(0, C.y - D.y, C.z - D.z).normalize();
  const SL_N = new THREE.Vector3(0, C.z - D.z, -(C.y - D.y)).normalize();
  const slopeBasis: [Three.Vector3, Three.Vector3, Three.Vector3] = [
    new THREE.Vector3(-1, 0, 0),
    SL_U,
    SL_N,
  ];
  const onSlope = (
    name: string,
    size: number,
    x: number,
    s: number,
    rot: number,
  ) =>
    place(
      name,
      size,
      new THREE.Vector3(x, D.y, D.z)
        .addScaledVector(SL_U, s)
        .addScaledVector(SL_N, SL_BEV + 0.008),
      slopeBasis,
      rot,
    );
  onSlope("china", 1.0, 0.25, 2.5, 0.05);
  onSlope("norway", 0.98, 0.2, 1.55, -0.08);
  onSlope("uk", 1.0, 1.08, 0.72, 0.12);
  onSlope("mexico", 0.82, 0.0, 0.48, -0.2);
  onSlope("morocco", 1.02, -0.86, 1.05, 0.18);
  onSlope("france", 0.9, 1.5, 1.68, -0.25);
  // Sul fianco, sotto l'oculare
  const sideBasis: [Three.Vector3, Three.Vector3, Three.Vector3] = [
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 0, 0),
  ];
  const onSide = (
    name: string,
    size: number,
    z: number,
    y: number,
    rot: number,
  ) =>
    place(name, size, new THREE.Vector3(SL_X1 + 0.008, y, z), sideBasis, rot);
  onSide("japan", 0.98, 0.05, 2.2, 0.1);
  onSide("canada", 0.8, 0.42, 1.35, -0.12);
  onSide("germany", 0.95, -0.85, 1.42, 0.05);

  // ---------- La stampa, che esce dalla fessura allo scatto ----------
  const printPivot = new THREE.Group();
  printPivot.position.set(0, SLOT_Y, BASE_FRONT);
  model.add(printPivot);
  const print = new THREE.Group();
  printPivot.add(print);
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xf6f5f1,
    roughness: 0.8,
    transparent: true,
  });
  add(
    new THREE.BoxGeometry(PRINT.w, PRINT.t, PRINT.l),
    frameMat,
    0,
    0,
    PRINT.l / 2,
    print,
  );
  const photoCanvas = document.createElement("canvas");
  photoCanvas.width = photoCanvas.height = 512;
  const photoTex = canvasTex(photoCanvas);
  const photoMat = new THREE.MeshStandardMaterial({
    map: photoTex,
    roughness: 0.35,
    transparent: true,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const photoGeo = new THREE.PlaneGeometry(PRINT.img, PRINT.img);
  photoGeo.rotateX(-Math.PI / 2);
  add(
    photoGeo,
    photoMat,
    0,
    PRINT.t / 2 + 0.002,
    0.2 + PRINT.img / 2,
    print,
  ).castShadow = false;
  // La data in basso a destra, come quella stampata dalle istantanee
  const dateC = document.createElement("canvas");
  dateC.width = 512;
  dateC.height = 96;
  {
    const g = dateC.getContext("2d")!;
    g.fillStyle = "#2b3a67";
    g.font = `400 44px ${font}`;
    g.textAlign = "right";
    g.textBaseline = "middle";
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    g.fillText(
      `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`,
      500,
      50,
    );
  }
  const dateMat = new THREE.MeshStandardMaterial({
    map: canvasTex(dateC),
    transparent: true,
    roughness: 0.7,
    depthWrite: false,
  });
  const dateGeo = new THREE.PlaneGeometry(1.6, 0.3);
  dateGeo.rotateX(-Math.PI / 2);
  add(
    dateGeo,
    dateMat,
    0.55,
    PRINT.t / 2 + 0.003,
    0.2 + PRINT.img + 0.45,
    print,
  ).castShadow = false;
  print.visible = false;

  /** Disegna una nuova foto sulla stampa, con il tono delle istantanee: velatura calda, vignetta, grana */
  const paintPhoto = (draw: Draw) => {
    const g = photoCanvas.getContext("2d")!;
    g.clearRect(0, 0, 512, 512);
    draw(g);
    g.fillStyle = "rgba(255,200,140,.12)";
    g.fillRect(0, 0, 512, 512);
    const v = g.createRadialGradient(256, 256, 160, 256, 256, 380);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(30,20,10,.45)");
    g.fillStyle = v;
    g.fillRect(0, 0, 512, 512);
    const img = g.getImageData(0, 0, 512, 512);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (Math.random() - 0.5) * 22;
      img.data[i] += n;
      img.data[i + 1] += n;
      img.data[i + 2] += n;
    }
    g.putImageData(img, 0, 0);
    photoTex.needsUpdate = true;
  };

  // Il centro di rotazione: la base appoggia a y = −1.75
  model.position.set(0, -1.75, -0.1);

  return {
    model,
    /** Il punto più basso, per appoggiare un'ombra sotto */
    bottom: -1.75,
    shutter,
    shutterCap,
    flashLight,
    flashMat,
    printPivot,
    print,
    printMats: [frameMat, photoMat, dateMat],
    photoMat,
    paintPhoto,
    setPalette(name: InstantPaletteName) {
      const p = INSTANT_PALETTES[name];
      M.body.color.setHex(p.body);
      M.trim.color.setHex(p.trim);
      M.soft.color.setHex(p.soft);
    },
    dispose() {
      model.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      for (const m of Object.values(M)) m.dispose();
      for (const m of extraMats) m.dispose();
      for (const m of [frameMat, photoMat, dateMat]) m.dispose();
      for (const t of textures) t.dispose();
    },
  };
}
