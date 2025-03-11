export function generateRandomColor(options?: {
    type?: "light" | "dark" | "pastel" | "transparent";
}): string {
    const randomChannel = () => Math.floor(Math.random() * 256);
    let r = randomChannel();
    let g = randomChannel();
    let b = randomChannel();
    let a = 1;

    switch (options?.type) {
        case "light":
            r = Math.floor(200 + Math.random() * 56);
            g = Math.floor(200 + Math.random() * 56);
            b = Math.floor(200 + Math.random() * 56);
            break;
        case "dark":
            r = Math.floor(Math.random() * 100);
            g = Math.floor(Math.random() * 100);
            b = Math.floor(Math.random() * 100);
            break;
        case "pastel":
            r = Math.floor(150 + Math.random() * 100);
            g = Math.floor(150 + Math.random() * 100);
            b = Math.floor(150 + Math.random() * 100);
            break;
        case "transparent":
            a = Math.random();
            break;
    }

    const toHex = (value: number) => value.toString(16).padStart(2, '0');

    if (options?.type === "transparent") {
        return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(Math.floor(a * 255))}`;
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
