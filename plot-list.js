import {
    XPowTwo,
    TwoPowX,
    XLogX,
    X,
    XFactoriel,
    TwoXPowTwo,
} from "./lib/math-functions.js";
export const plot = [
    {
        func: XFactoriel,
        color: "blue",
        toString: () => "y = x!",
    },
    {
        func: TwoPowX,
        color: "green",
        toString: () => "y = 2 ^ x",
    },
    {
        func: XPowTwo,
        color: "red",
        toString: () => "y = x ^ 2",
    },
    {
        func: TwoXPowTwo,
        color: "pink",
        toString: () => "y = 2 . x ^ 2",
    },
    {
        func: XLogX,
        color: "black",
        toString: () => "y = x . log(x)",
    },
    {
        func: X,
        color: "yellow",
        toString: () => "y = x",
    },
];
