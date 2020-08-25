import { differential } from "./helpers.js";

export function drawPoint({ x, y, ctx, color = "black" }) {
    const radius = 0.5;
    ctx.beginPath();
    ctx.fillStyle = color;

    y = ctx.canvas.height - y;
    ctx.arc(x * 5, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

export function drawCurve({ x, y, ctx, color, allPoints }) {
    const x1 = x;
    const y1 = ctx.canvas.height - y;
    const x2 = x1 + 1;
    const y2 = ctx.canvas.height - allPoints[x2];
    const x3 = x2 + 1;
    const y3 = ctx.canvas.height - allPoints[x3];

    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.beginPath();
    ctx.bezierCurveTo(x2, y2, x3, y3, x2, y2);
    ctx.stroke();
}

export function drawLine({ x, y, ctx, color, allPoints, skewX }) {
    const x1 = x * skewX;
    const y1 = ctx.canvas.height - y;
    const x2 = x1 + skewX;
    const y2 = ctx.canvas.height - allPoints[x + 1];

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export function FunctionPlotter({
    func,
    count,
    ctx,
    diff,
    drawer,
    color,
    skewX = 1,
}) {
    let points = new Array(count).fill(0).map((item, index) => func(index));
    if (diff) {
        points = differential(points);
    }
    // points.forEach((point, index) => (points[index] = points[index] / skewX));
    points.forEach((point, index) => {
        drawer({ x: index, y: point, ctx, color, allPoints: points, skewX });
    });
}
