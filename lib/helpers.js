export function differential(points) {
    return points.reduce(
        (acc, curr, index) => {
            if (typeof acc[0] === "number") {
                acc[1].push(curr - acc[0]);
            }
            acc[0] = curr;
            if (index === points.length - 1) return acc[1];
            return acc;
        },
        [undefined, []]
    );
}

export function repeat(fn, iterationCount) {
    return function iterated(arg) {
        let result = arg;
        for (let i = 0; i < iterationCount; i++) {
            result = fn(result);
        }
        return result;
    };
}

export function ArrayIsEqualPercentage(arr1, arr2) {
    let biggestLength = Math.max(arr1.length, arr2.length);
    let equalsCount = arr1.reduce((acc, curr, index) => {
        return acc + (curr === arr2[index] ? 1 : 0);
    }, 0);
    return +((100 * equalsCount) / biggestLength).toFixed(2);
}
// const arr1 = repeat(differential, 1)(points);
// const arr2 = repeat(differential, 2)(points);

export function differentialEquality(arr, diffCount = 1) {
    arrDiff1 = differential(arr);
    arrDiffN = repeat(differential, diffCount + 1)(arr);

    const compare = ArrayIsEqualPercentage(arrDiff1, arrDiffN);

    let shiftedCompare = [];
    if (compare > 70) {
        return compare;
    } else {
        let arr1Copy = [...arrDiff1];
        let arr2Copy = [...arrDiffN];
        const minLength = Math.min(arr1Copy.length, arr2Copy.length);

        for (let i = 0; i < minLength; i++) {
            arr1Copy.shift();
            shiftedCompare.push(ArrayIsEqualPercentage(arr1Copy, arr2Copy));
        }
        const maxCompared = Math.max(...shiftedCompare);
        if (maxCompared > 70) {
            return maxCompared;
        } else {
            let arr1Copy = [...arrDiff1];
            let arr2Copy = [...arrDiffN];
            for (let i = 0; i < minLength; i++) {
                arr2Copy.shift();
                shiftedCompare.push(ArrayIsEqualPercentage(arr1Copy, arr2Copy));
            }
            return Math.max(...shiftedCompare);
        }
    }
}

export function noop() {
    console.count("noop");
}

export function BigONPowTwo(number) {
    for (let i = 0; i < number; i++) {
        for (let j = 0; j < number; j++) {
            noop();
        }
    }
}

// let timeArray = [];
// for (let i = 10; i < 20; i++) {
//     const start = performance.now();
//     BigONPowTwo(i);
//     const end = performance.now();
//     timeArray.push(end - start);
// }
// console.log(differentialEquality(timeArray));

// console.log(differentialEquality(points, 2));
// console.log(differential(points));
// console.log(arr2);

// console.log(repeat(differential, 2)(points));
