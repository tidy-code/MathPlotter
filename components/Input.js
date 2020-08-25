export default function Input({
    onInput,
    onClick,
    onChange,
    checked,
    className = "",
    style = "",
    placeholder = "",
    value = "",
    name = "",
    type = "text",
    title = "",
}) {
    const input = document.createElement("input");

    if (typeof onInput === "function") {
        input.addEventListener("input", onInput);
    }
    if (typeof onClick === "function") {
        input.addEventListener("click", onClick);
    }
    if (typeof onChange === "function") {
        input.addEventListener("change", onChange);
    }

    if (title !== "") {
        const label = document.createElement("label");
        label.innerText = title;
        label.appendChild(input);

        label.render = function render(props) {
            Object.assign(input, props);
        };

        label.render({
            placeholder,
            value,
            name,
            type,
            checked,
            style,
            className,
        });

        return label;
    }

    input.render = function render(props) {
        Object.assign(input, props);
    };

    input.render({
        placeholder,
        value,
        name,
        type,
        checked,
        style,
        className,
    });
    return input;
}
