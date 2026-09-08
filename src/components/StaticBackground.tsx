export default function StaticBackground({
  src,
  opacity = 0.4,
  grayscale = true,
}: {
  src: string;
  opacity?: number;
  grayscale?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={`w-full h-full object-cover ${grayscale ? "grayscale" : ""}`}
        style={{ opacity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,9,0.75) 0%, rgba(10,10,9,0.4) 30%, rgba(10,10,9,0.55) 70%, rgba(10,10,9,0.9) 100%)",
        }}
      />
    </div>
  );
}
