import { getEmbedUrl } from "@/lib/video";

export default function VideoEmbed({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  if (!url) return null;

  // Local video from /public
  if (url.startsWith("/")) {
    return (
      <div className="video-embed">
        <video
          controls
          playsInline
          className="w-full rounded-xl2"
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // YouTube / Vimeo embeds
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) return null;

  return (
    <div className="video-embed">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}