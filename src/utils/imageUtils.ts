export function getImageUrl(base?: string) {
    if (!base) return;

    const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;
    return `${IMAGES_URL}/${base}`;
}
