export interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: string;
  kind: string;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;
const API_URL = "https://www.googleapis.com/webfonts/v1/webfonts";

// Cache for loaded font stylesheets
const loadedFonts = new Set<string>();

// Cache for the Google Fonts API response
let fontsCache: GoogleFont[] | null = null;
let fontsCacheTimestamp: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchGoogleFonts(): Promise<GoogleFont[]> {
  // Check if we have a valid cache
  if (
    fontsCache &&
    fontsCacheTimestamp &&
    Date.now() - fontsCacheTimestamp < CACHE_DURATION
  ) {
    return fontsCache;
  }

  if (!API_KEY) {
    throw new Error("Google Fonts API key is not configured");
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&sort=popularity`);
    if (!response.ok) {
      throw new Error("Failed to fetch Google Fonts");
    }
    const data = await response.json();
    fontsCache = data.items;
    fontsCacheTimestamp = Date.now();
    return data.items;
  } catch (error) {
    // If fetch fails and we have a cache, return it even if expired
    if (fontsCache) {
      return fontsCache;
    }
    console.error("Error fetching Google Fonts:", error);
    throw error;
  }
}

export function getFontUrl(font: GoogleFont, variant = "regular"): string {
  const fontFamily = font.family.replace(/\s+/g, "+");
  const fontVariant = variant === "regular" ? "400" : variant;
  return `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontVariant}&display=swap`;
}

export async function loadFont(
  fontFamily: string,
  variant = "regular",
): Promise<void> {
  if (loadedFonts.has(fontFamily)) {
    return;
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.href = getFontUrl({ family: fontFamily } as GoogleFont, variant);
    link.rel = "stylesheet";

    link.onload = () => {
      loadedFonts.add(fontFamily);
      resolve();
    };

    link.onerror = () => {
      // We don't want to reject the promise to avoid breaking the selector (network, CORS, font unavailable).
      loadedFonts.add(fontFamily);
      if (typeof console !== "undefined" && console.warn) {
        console.warn(`Font "${fontFamily}" could not be loaded (network or unavailable).`);
      }
      resolve();
    };

    document.head.appendChild(link);
  });
}

export interface FontPickerProps {
  onFontSelect?: (font: GoogleFont) => void;
  value?: string;
}

export const FONT_CATEGORIES = [
  "serif",
  "sans-serif",
  "display",
  "handwriting",
  "monospace",
] as const;

export type FontCategory = (typeof FONT_CATEGORIES)[number];

export const FONT_WEIGHTS = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;

export type FontWeight = (typeof FONT_WEIGHTS)[number];

// Cache for the export: CSS @font-face with fonts as data URLs (avoid SecurityError)
const fontEmbedCache = new Map<string, string>();

/**
 * Returns the CSS @font-face for a font, with the file URLs replaced by data URLs.
 * Used for export to keep the font without accessing document.styleSheets (cross-origin).
 */
export async function getFontEmbedCSS(fontFamily: string): Promise<string> {
  const cached = fontEmbedCache.get(fontFamily);
  if (cached) return cached;

  const url = getFontUrl({ family: fontFamily } as GoogleFont, "400");
  const res = await fetch(url, {
    credentials: "omit",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0",
    },
  });
  let cssText = await res.text();

  const baseUrl = url.replace(/[?#].*$/, "");
  const urlRegex = /url\(["']?([^"')]+)["']?\)/g;
  let match: RegExpExecArray | null;
  const replacements: Array<{ from: string; to: string }> = [];

  while ((match = urlRegex.exec(cssText)) !== null) {
    let fontUrl = match[1].trim();
    if (!fontUrl.startsWith("http")) {
      fontUrl = new URL(fontUrl, baseUrl).href;
    }
    try {
      const fontRes = await fetch(fontUrl, { credentials: "omit" });
      const blob = await fontRes.blob();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      replacements.push({ from: match[0], to: `url(${dataUrl})` });
    } catch (e) {
      console.warn("Font embed: failed to fetch", fontUrl, e);
    }
  }

  for (const { from, to } of replacements) {
    cssText = cssText.replace(from, to);
  }
  fontEmbedCache.set(fontFamily, cssText);
  return cssText;
}
