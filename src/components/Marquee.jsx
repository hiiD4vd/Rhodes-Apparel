export default function Marquee() {
  return (
    <div className="marquee-container hover-target" data-cursor="DRAG">
      <div className="marquee-content">
        <span className="filled">MINIMALIST.</span>
        <span>CLASSIC.</span>
        <span className="filled">ETERNAL.</span>
        <span>MINIMALIST.</span>
        <span className="filled">CLASSIC.</span>
        <span>ETERNAL.</span>
      </div>
      <div className="marquee-content" aria-hidden="true">
        <span className="filled">MINIMALIST.</span>
        <span>CLASSIC.</span>
        <span className="filled">ETERNAL.</span>
        <span>MINIMALIST.</span>
        <span className="filled">CLASSIC.</span>
        <span>ETERNAL.</span>
      </div>
    </div>
  );
}
