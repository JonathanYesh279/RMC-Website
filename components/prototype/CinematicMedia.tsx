// Media surface for the prototype's cinematic moments. Renders a stills
// placeholder today, but accepts a videoUrl so real short-form RMC footage can
// drop in later without touching the layouts that use it.
export default function CinematicMedia({
  img,
  alt,
  videoUrl,
  className = "",
}: {
  img: string;
  alt: string;
  videoUrl?: string | null;
  className?: string;
}) {
  return (
    <div className={`pt-media ${className}`} aria-hidden={alt === "" || undefined}>
      {videoUrl ? (
        <video
          className="pt-media-el"
          src={videoUrl}
          poster={img}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="pt-media-el" src={img} alt={alt} loading="lazy" />
      )}
      <div className="pt-media-scrim" />
    </div>
  );
}
