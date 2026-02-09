export function getImageUrl(base?: string) {
    if (!base) return;

    if (base.startsWith("http")) {
        return base;
    }

    const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;
    return `${IMAGES_URL}/${base}`;
}
