class F8 {
  static component(tagName, { data, template }) {
    const variableResults = [];
    if (data) {
      Object.keys(data()).forEach((key) => {
        window[key] = data()[key];
      });
    }

    if (template.includes("{{")) {
      const results = template.match(/{{.+?}}/g);
      results.forEach((result) => {
        const variableResult = result.match(/{{(.+?)}}/);
        variableResults.push(variableResult[1].trim());

        template = template.replaceAll(
          result,
          `<span class="${variableResult[1].trim()}">${
            window[variableResult[1].trim()]
          }</span>`
        );
      });
    }

    const templateEl = document.createElement("template");
    templateEl.innerHTML = template;

    const templateNode = templateEl.content.cloneNode(true);

    Array.from(templateNode.children).forEach((element) => {
      Array.from(element.attributes).forEach((attr) => {
        const nodeName = attr.nodeName;
        const nodeValue = attr.nodeValue;
        const eventName = nodeName.slice(nodeName.indexOf(":") + 1);

        element.addEventListener(eventName, () => {
          eval(nodeValue);
          variableResults.forEach((result) => {
            if (nodeValue.includes(result)) {
              const node = document.querySelector(`.${result}`);
              node.innerText = window[result];
            }
          });
        });
      });
    });

    customElements.define(
      tagName,
      class extends HTMLElement {
        connectedCallback() {
          const root = document.querySelector(tagName);
          root.append(templateNode);
        }
      }
    );
  }
}
