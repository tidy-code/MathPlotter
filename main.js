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

let initialPlot = plot;

function Main() {
    const ctx = document.getElementById("plot").getContext("2d");

    let newPlotInput = "";
    let newPlotColor = "";
    let customColor = false;
    let userDefinedPlots = [];

    const [Legends, renderLegends] = Legend({ plot });

    document.body.appendChild(Legends);

    function PlotAll(plot, ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        plot.forEach((item) =>
            FunctionPlotter({
                func: item.func,
                count: 500,
                ctx,
                color: item.color,
                skewX: 15,
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
            const newPlotInputAtTheTime = newPlotInput;
            userDefinedPlots.push({
                func,
                color: customColor ? newPlotColor : Colors.random(),
                toString: () => "y = " + newPlotInputAtTheTime,
            });
            PlotAll([...initialPlot, ...userDefinedPlots], ctx);
            newPlotInput = "";
            funcInput.render({ value: "" });
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
    const newEl = document.createElement.bind(document);
    document.body.appendChild(
        Fragment({
            children: [
                funcInput,
                newEl("br"),
                colorCheckbox,
                colorInput,
                newEl("br"),
                addButton,
                resetButton,
            ],
        })
    );
}

function RandChar(count) {
    let chars = "";
    for (let i = 0; i < count; i++) {
        chars += String.fromCharCode(Math.random() * 26 + 65);
    }
    return chars;
}

Main();
