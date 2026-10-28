// Responsive, optimized versions of the site's own photos through Next's image
// optimizer (WebP, resized per screen), for plain <img> tags.
// Widths must be among Next's default sizes (640, 750, 828, 1080, 1200, 1920, 2048, 3840).
const RAW = process.env.NEXT_PUBLIC_RAW_IMAGES === "1"; // local previews without the optimizer

export const optimized = (src, w, q = 75) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;

export function responsive(src, sizes, widths = [640, 1080, 1920]) {
  if (RAW || !src || !src.startsWith("/")) return { src };
  return {
    src: optimized(src, widths[widths.length - 1]),
    srcSet: widths.map((w) => `${optimized(src, w)} ${w}w`).join(", "),
    sizes,
  };
}
