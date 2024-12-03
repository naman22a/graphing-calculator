import Point from './point';

export function domainColoring(p1: Point, p2: Point): number[] {
    // calculate the complex number z = p2 - p1
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;

    // calculate the angle (phase) and magnitude
    const angle = Math.atan2(y, x);
    const magnitude = Math.sqrt(x * x + y * y);

    // convert the angle to degrees and normalize it to [0, 1] range
    const hue = angle / (2 * Math.PI) + 0.5;

    // normalize magnitude
    const brightness = 1 - Math.exp(-magnitude / 10);

    // convert HSV to RGB
    const rgb = hsvToRgb(hue, 1, brightness);

    return [rgb.r, rgb.g, rgb.b];
}

export function hsvToRgb(h: number, s: number, v: number) {
    let r: number, g: number, b: number;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }

    return {
        r: Math.round(r! * 255),
        g: Math.round(g! * 255),
        b: Math.round(b! * 255)
    };
}
