type Edge = "arc" | "fold" | "split";

const contours = {
  arc: ["M-10,-2 H1010 V10 C720,10 680,98 448,98 C242,98 152,30 -10,30 Z"],
  fold: ["M-2,-2 H1002 V17 L320,99 L-2,44 Z"],
  split: ["M-2,-2 H501 L501,15 L-2,96 Z", "M499,-2 H1002 V96 L499,15 Z"],
};

export default function SectionEdge({ shape }: { shape: Edge }) {
  return (
    <div className="section-edge" data-edge={shape} aria-hidden="true">
      {contours[shape].map((path, index) => (
        <svg key={index} viewBox="0 0 1000 100" preserveAspectRatio="none" focusable="false">
          <path className="section-edge-rim" d={path} transform="translate(0 5)" />
          <path className="section-edge-face" d={path} />
        </svg>
      ))}
    </div>
  );
}
