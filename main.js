import { plot } from "./plot-list.js";
import {
    drawLine,
    drawPoint,
    drawCurve,
    FunctionPlotter,
} from "./lib/canvas-helpers.js";
import Legend from "./components/Legends.js";
import Input from "./components/Input.js";
import Fragment from "./components/Fragment.js";
import { parseFunction } from "./lib/math-functions.js";
import Colors from "./lib/Colors.js";

const newEl = document.createElement.bind(document);

let initialPlot = plot;

const ctx = document.getElementById("plot").getContext("2d");

let newPlotInput = "";
let newPlotColor = "";
let customColor = false;
let differentiate = false;
let skewXValue = 15;
let userDefinedPlots = [];

const [Legends, renderLegends] = Legend({ plot });

function PlotAll(plot, ctx, skewX = 15) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    plot.forEach((item) =>
        FunctionPlotter({
            func: item.func,
            count: 500,
            diff: item.diff,
            ctx,
            color: item.color,
            skewX,
            drawer: drawLine,
        })
    );
    console.log(plot);
    renderLegends({ plot });
}

PlotAll(initialPlot, ctx);

const funcInput = Input({
    name: "NewMathFunction",
    type: "text",
    className: "function-input",
    onInput: (e) => {
        newPlotInput = e.target.value;
    },
});

const diffCheckbox = Input({
    name: "differential-toggle",
    type: "checkbox",
    title: "differentiate?",
    onChange: (e) => {
        differentiate = e.target.checked;
    },
});

const colorInput = Input({
    name: "NewPlotColor",
    type: "color",
    style: "display: none",
    onInput: (e) => {
        newPlotColor = e.target.value;
    },
});

const colorCheckbox = Input({
    name: "CustomColor",
    type: "checkbox",
    title: "Custom Color",
    checked: customColor,
    onChange: (e) => {
        customColor = e.target.checked;
        console.log(customColor);
        colorInput.render({
            style: "display: " + (customColor ? "inline-block" : "none"),
        });
    },
});

const skewXInput = Input({
    name: "SkewX",
    type: "number",
    title: "skewX: ",
    value: 15,
    onInput: (e) => {
        skewXValue = e.target.value;
        PlotAll([...plot, ...userDefinedPlots], ctx, +skewXValue);
        console.log(e.target.value);
    },
});

const addButton = Input({
    name: "add-function",
    type: "submit",
    value: "Add",
    onClick: (e) => {
        e.preventDefault();
        if (newPlotInput === "") {
            alert("please write the function you want to plot");
            return false;
        }
        const func = parseFunction(newPlotInput);
        let mathematicalForm = newPlotInput;
        if (differentiate) {
            mathematicalForm = `(${mathematicalForm})'`;
        }
        mathematicalForm = "y = " + mathematicalForm;
        userDefinedPlots.push({
            func,
            diff: differentiate,
            color: customColor ? newPlotColor : Colors.random(),
            toString: () => mathematicalForm,
        });
        PlotAll([...initialPlot, ...userDefinedPlots], ctx);

        // reset the form
        newPlotInput = "";
        funcInput.render({ value: "" });
        differentiate = false;
        diffCheckbox.render({ checked: false });
    },
});

const resetButton = Input({
    type: "submit",
    value: "Reset",
    onClick: (e) => {
        initialPlot = [];
        userDefinedPlots = [];
        PlotAll([], ctx);
    },
});

document.body.appendChild(newEl("br"));
document.body.appendChild(skewXInput);
document.body.appendChild(Legends);

document.body.appendChild(
    Fragment({
        children: [
            funcInput,
            diffCheckbox,
            newEl("br"),
            colorCheckbox,
            colorInput,
            newEl("br"),
            addButton,
            resetButton,
        ],
    })
);

function RandChar(count) {
    let chars = "";
    for (let i = 0; i < count; i++) {
        chars += String.fromCharCode(Math.random() * 26 + 65);
    }
    return chars;
}
