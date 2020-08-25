import ColorBox from "./ColorBox.js";

export default function Legends({ plot }) {
    const legends = document.createElement("div");

    function render({ plot }) {
        legends.innerHTML = plot
            .map((item) => `${ColorBox(item.color)}<b>${item}</b>`)
            .join("<br>");
    }
    render({ plot });
    return [legends, render];
}
