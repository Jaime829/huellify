import DOMPurify from "dompurify";

export default function SafeDBIcon({ svgRawString, className = "" }) {
    const cleanSvg = DOMPurify.sanitize(svgRawString, {
        USE_PROFILES: { svg: true }, // Optimiza la limpieza enfocándose solo en reglas de SVG
    });

    return (
        <span
            className={`flex items-center justify-center ${className}`}
            dangerouslySetInnerHTML={{ __html: cleanSvg }}
        />
    );
}
