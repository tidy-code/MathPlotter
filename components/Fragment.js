export default function Fragment({ children, delimiter }) {
    const fr = document.createDocumentFragment();
    children.forEach((child) => {
        fr.appendChild(child);
        if (typeof delimiter !== "undefined") {
            if (typeof delimiter === "string") {
                fr.appendChild(document.createElement(delimiter));
            } else {
                fr.appendChild(delimiter.cloneNode());
            }
        }
    });

    return fr;
}
