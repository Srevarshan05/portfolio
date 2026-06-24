"use client";

// Tetromino shapes for decorative scatter
const TETROMINOES = [
  // L-shape
  <svg key="L" width="32" height="32" viewBox="0 0 32 32" fill="currentColor"><rect x="4" y="4" width="8" height="8"/><rect x="4" y="12" width="8" height="8"/><rect x="4" y="20" width="8" height="8"/><rect x="12" y="20" width="8" height="8"/></svg>,
  // T-shape
  <svg key="T" width="32" height="32" viewBox="0 0 32 32" fill="currentColor"><rect x="4" y="12" width="8" height="8"/><rect x="12" y="12" width="8" height="8"/><rect x="20" y="12" width="8" height="8"/><rect x="12" y="4" width="8" height="8"/></svg>,
  // S-shape
  <svg key="S" width="32" height="32" viewBox="0 0 32 32" fill="currentColor"><rect x="12" y="4" width="8" height="8"/><rect x="20" y="4" width="8" height="8"/><rect x="4" y="12" width="8" height="8"/><rect x="12" y="12" width="8" height="8"/></svg>,
  // Z-shape
  <svg key="Z" width="32" height="32" viewBox="0 0 32 32" fill="currentColor"><rect x="4" y="4" width="8" height="8"/><rect x="12" y="4" width="8" height="8"/><rect x="12" y="12" width="8" height="8"/><rect x="20" y="12" width="8" height="8"/></svg>,
  // I-shape
  <svg key="I" width="32" height="8" viewBox="0 0 32 8" fill="currentColor"><rect x="0" y="0" width="8" height="8"/><rect x="8" y="0" width="8" height="8"/><rect x="16" y="0" width="8" height="8"/><rect x="24" y="0" width="8" height="8"/></svg>,
  // O-shape
  <svg key="O" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="8" height="8"/><rect x="8" y="0" width="8" height="8"/><rect x="0" y="8" width="8" height="8"/><rect x="8" y="8" width="8" height="8"/></svg>,
];

const ACCENT_COLORS = [
  "var(--purple)",
  "var(--sky)",
  "var(--teal)",
  "var(--orange)",
  "var(--indigo)",
  "var(--fuchsia)",
];

interface TetrominoScatterProps {
  count?: number;
  isDark?: boolean;
}

export default function TetrominoScatter({ count = 10, isDark = false }: TetrominoScatterProps) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: i % TETROMINOES.length,
    color: ACCENT_COLORS[i % ACCENT_COLORS.length],
    top: `${5 + (i * 9.1) % 88}%`,
    left: `${(i * 11.3) % 92}%`,
    rotate: (i * 37) % 360,
    scale: 0.8 + (i % 3) * 0.3,
    opacity: isDark ? 0.06 : 0.08,
  }));

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: "absolute",
            top: piece.top,
            left: piece.left,
            color: piece.color,
            transform: `rotate(${piece.rotate}deg) scale(${piece.scale})`,
            opacity: piece.opacity,
          }}
        >
          {TETROMINOES[piece.shape]}
        </div>
      ))}
    </div>
  );
}
