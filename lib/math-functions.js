export const XPowTwo = (x) => x ** 2;
export const TwoPowX = (x) => 2 ** x;
export const XLogX = (x) => x * Math.log(x);
export const X = (x) => x;
export const XFactoriel = (x) => {
    let fact = 1;
    for (let i = 1; i <= x; i++) {
        fact *= i;
    }
    return fact;
};

export const TwoXPowTwo = (x) => 2 * x ** 2;

export function parseFunction(str) {
    let func = str
        .replace(/\^/g, "**")
        .replace(/\./g, "*")
        .replace(/log/gi, "Math.log")
        .replace(/x!/g, "XFactoriel(x)");

    return eval(`(x) => ${func}`);
}
