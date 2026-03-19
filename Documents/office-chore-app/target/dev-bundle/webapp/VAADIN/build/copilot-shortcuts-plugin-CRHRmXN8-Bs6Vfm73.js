import { Y as Yl, _ as _s, U as Ut, B as Bs, i as ic } from "./indexhtml-Co3Evg6-.js";
import { o } from "./base-panel-BUjfv_Bo-C8fvTxLS.js";
import { r as r$1 } from "./icons-Dw7Bm2ra-sLZmCL32.js";
const m = "copilot-shortcuts-panel{font:var(--font-xsmall);padding:var(--space-200);display:flex;flex-direction:column;gap:var(--space-50)}copilot-shortcuts-panel h3{font:var(--font-xsmall-strong);margin:0;padding:0}copilot-shortcuts-panel h3:not(:first-of-type){margin-top:var(--space-200)}copilot-shortcuts-panel ul{list-style:none;margin:0;padding:0 var(--space-50);display:flex;flex-direction:column}copilot-shortcuts-panel ul li{display:flex;align-items:center;gap:var(--space-150);padding:var(--space-75) 0}copilot-shortcuts-panel ul li:not(:last-of-type){border-bottom:1px dashed var(--border-color)}copilot-shortcuts-panel ul li svg{height:16px;width:16px}copilot-shortcuts-panel ul li .kbds{flex:1;text-align:right}copilot-shortcuts-panel kbd{display:inline-block;border-radius:var(--radius-1);border:1px solid var(--border-color);min-width:1em;min-height:1em;text-align:center;margin:0 .1em;padding:.25em;box-sizing:border-box;font-size:var(--font-size-1);font-family:var(--font-family);line-height:1}";
var v = (i, s, n, a) => {
  for (var o2 = s, r = i.length - 1, p; r >= 0; r--)
    (p = i[r]) && (o2 = p(o2) || o2);
  return o2;
};
let c = class extends o {
  render() {
    return Ut`<style>
        ${m}
      </style>
      <h3>Global</h3>
      <ul>
        <li>${r$1.vaadinLogo} Copilot ${t(ic.toggleCopilot)}</li>
        <li>${r$1.terminal} Command window ${t(ic.toggleCommandWindow)}</li>
        <li>${r$1.undo} Undo ${t(ic.undo)}</li>
        <li>${r$1.redo} Redo ${t(ic.redo)}</li>
      </ul>
      <h3>Selected component</h3>
      <ul>
        <li>${r$1.code} Go to source ${t(ic.goToSource)}</li>
        <li>${r$1.copy} Copy ${t(ic.copy)}</li>
        <li>${r$1.paste} Paste ${t(ic.paste)}</li>
        <li>${r$1.duplicate} Duplicate ${t(ic.duplicate)}</li>
        <li>${r$1.userUp} Select parent ${t(ic.selectParent)}</li>
        <li>${r$1.userLeft} Select previous sibling ${t(ic.selectPreviousSibling)}</li>
        <li>${r$1.userRight} Select first child / next sibling ${t(ic.selectNextSibling)}</li>
        <li>${r$1.trash} Delete ${t(ic.delete)}</li>
      </ul>`;
  }
};
c = v([
  _s("copilot-shortcuts-panel")
], c);
function t(i) {
  return Ut`<span class="kbds">${Bs(i)}</span>`;
}
const x = Yl({
  header: "Keyboard Shortcuts",
  tag: "copilot-shortcuts-panel",
  width: 400,
  height: 550,
  floatingPosition: {
    top: 50,
    left: 50
  }
}), y = {
  init(i) {
    i.addPanel(x);
  }
};
window.Vaadin.copilot.plugins.push(y);
