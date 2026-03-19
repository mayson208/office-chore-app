import { r as rc, a as ao, t as tn, u as uc, b as b$1, U as Ut, k as kl, T as Tl, C as Cl, n as nn, M as Ms, E, N as Nl, _ as _s } from "./indexhtml-Co3Evg6-.js";
import { g as g$1 } from "./state-Bmc-LnRe-KqHo9snF.js";
import { o } from "./base-panel-BUjfv_Bo-C8fvTxLS.js";
import { showNotification as N } from "./copilot-notification-C3QdZgiY-Di_PPGRW.js";
import { r as r$1 } from "./icons-Dw7Bm2ra-sLZmCL32.js";
const U = "copilot-info-panel{--dev-tools-red-color: red;--dev-tools-grey-color: gray;--dev-tools-green-color: green;position:relative}copilot-info-panel div.info-tray{display:flex;flex-direction:column;gap:10px}copilot-info-panel vaadin-button{margin-inline:var(--lumo-space-l)}copilot-info-panel dl{display:grid;grid-template-columns:auto auto;gap:0;margin:var(--space-100) var(--space-50);font:var(--font-xsmall)}copilot-info-panel dl>dt,copilot-info-panel dl>dd{padding:3px 10px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}copilot-info-panel dd.live-reload-status>span{overflow:hidden;text-overflow:ellipsis;display:block;color:var(--status-color)}copilot-info-panel dd span.hidden{display:none}copilot-info-panel dd span.true{color:var(--dev-tools-green-color);font-size:large}copilot-info-panel dd span.false{color:var(--dev-tools-red-color);font-size:large}copilot-info-panel code{white-space:nowrap;-webkit-user-select:all;user-select:all}copilot-info-panel .checks{display:inline-grid;grid-template-columns:auto 1fr;gap:var(--space-50)}copilot-info-panel span.hint{font-size:var(--font-size-0);background:var(--gray-50);padding:var(--space-75);border-radius:var(--radius-2)}";
var j = function() {
  var e = document.getSelection();
  if (!e.rangeCount)
    return function() {
    };
  for (var t = document.activeElement, o2 = [], s = 0; s < e.rangeCount; s++)
    o2.push(e.getRangeAt(s));
  switch (t.tagName.toUpperCase()) {
    case "INPUT":
    case "TEXTAREA":
      t.blur();
      break;
    default:
      t = null;
      break;
  }
  return e.removeAllRanges(), function() {
    e.type === "Caret" && e.removeAllRanges(), e.rangeCount || o2.forEach(function(r) {
      e.addRange(r);
    }), t && t.focus();
  };
}, B = j, h = {
  "text/plain": "Text",
  "text/html": "Url",
  default: "Text"
}, L = "Copy to clipboard: #{key}, Enter";
function O(e) {
  var t = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return e.replace(/#{\s*key\s*}/g, t);
}
function J(e, t) {
  var o2, s, r, n, l, a, d = false;
  t || (t = {}), o2 = t.debug || false;
  try {
    r = B(), n = document.createRange(), l = document.getSelection(), a = document.createElement("span"), a.textContent = e, a.ariaHidden = "true", a.style.all = "unset", a.style.position = "fixed", a.style.top = 0, a.style.clip = "rect(0, 0, 0, 0)", a.style.whiteSpace = "pre", a.style.webkitUserSelect = "text", a.style.MozUserSelect = "text", a.style.msUserSelect = "text", a.style.userSelect = "text", a.addEventListener("copy", function(i) {
      if (i.stopPropagation(), t.format)
        if (i.preventDefault(), typeof i.clipboardData > "u") {
          o2 && console.warn("unable to use e.clipboardData"), o2 && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
          var y = h[t.format] || h.default;
          window.clipboardData.setData(y, e);
        } else
          i.clipboardData.clearData(), i.clipboardData.setData(t.format, e);
      t.onCopy && (i.preventDefault(), t.onCopy(i.clipboardData));
    }), document.body.appendChild(a), n.selectNodeContents(a), l.addRange(n);
    var p = document.execCommand("copy");
    if (!p)
      throw new Error("copy command was unsuccessful");
    d = true;
  } catch (i) {
    o2 && console.error("unable to copy using execCommand: ", i), o2 && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(t.format || "text", e), t.onCopy && t.onCopy(window.clipboardData), d = true;
    } catch (y) {
      o2 && console.error("unable to copy using clipboardData: ", y), o2 && console.error("falling back to prompt"), s = O("message" in t ? t.message : L), window.prompt(s, e);
    }
  } finally {
    l && (typeof l.removeRange == "function" ? l.removeRange(n) : l.removeAllRanges()), a && document.body.removeChild(a), r();
  }
  return d;
}
var M = J;
const V = /* @__PURE__ */ Nl(M);
var W = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, g = (e, t, o2, s) => {
  for (var r = s > 1 ? void 0 : s ? _(t, o2) : t, n = e.length - 1, l; n >= 0; n--)
    (l = e[n]) && (r = (s ? l(t, o2, r) : l(r)) || r);
  return s && r && W(t, o2, r), r;
};
let v = class extends o {
  constructor() {
    super(...arguments), this.serverInfo = [], this.clientInfo = [{ name: "Browser", version: navigator.userAgent }], this.handleServerInfoEvent = (e) => {
      const t = JSON.parse(e.data.info);
      this.serverInfo = t.versions, rc().then((o2) => {
        o2 && (this.clientInfo.unshift({ name: "Vaadin Employee", version: "true", more: void 0 }), this.requestUpdate("clientInfo"));
      }), ao() === "success" && tn("hotswap-active", { value: uc() });
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.onCommand("copilot-info", this.handleServerInfoEvent), this.onEventBus("system-info-with-callback", (e) => {
      e.detail.callback(this.getInfoForClipboard(e.detail.notify));
    }), this.reaction(
      () => b$1.idePluginState,
      () => {
        this.requestUpdate("serverInfo");
      }
    );
  }
  getIndex(e) {
    return this.serverInfo.findIndex((t) => t.name === e);
  }
  render() {
    return Ut`<style>
        ${U}
      </style>
      <div class="info-tray">
        <dl>
          ${[...this.serverInfo, ...this.clientInfo].map(
      (e) => Ut`
              <dt>${e.name}</dt>
              <dd title="${e.version}" style="${e.name === "Java Hotswap" ? "white-space: normal" : ""}">
                ${this.renderValue(e.version)} ${e.more}
              </dd>
            `
    )}
          ${this.renderDevWorkflowSection()}
        </dl>
        ${this.renderDevelopmentWorkflowButton()}
      </div>`;
  }
  renderDevWorkflowSection() {
    const e = ao(), t = this.getIdePluginLabelText(b$1.idePluginState), o2 = this.getHotswapAgentLabelText(e);
    return Ut`
      <dt>Java Hotswap</dt>
      <dd>${u(e === "success")} ${o2}</dd>
      <dt>IDE Plugin</dt>
      <dd>${u(kl() === "success")} ${t}</dd>
    `;
  }
  renderDevelopmentWorkflowButton() {
    const e = Tl();
    let t = "", o2 = null;
    return e.status === "success" ? (t = "More details...", o2 = r$1.successColorful) : e.status === "warning" ? (t = "Improve Development Workflow...", o2 = r$1.warningColorful) : e.status === "error" && (t = "Fix Development Workflow...", o2 = Ut`<span style="color: var(--red)">${r$1.error}</span>`), Ut`
      <vaadin-button
        id="development-workflow-guide"
        @click="${() => {
      Cl();
    }}">
        <span slot="prefix"> ${o2}</span>
        ${t}</vaadin-button
      >
    `;
  }
  getHotswapAgentLabelText(e) {
    return e === "success" ? "Java Hotswap is enabled" : e === "error" ? "Hotswap is partially enabled" : "Hotswap is not enabled";
  }
  getIdePluginLabelText(e) {
    if (kl() !== "success")
      return "Not installed";
    if (e == null ? void 0 : e.version) {
      let t = null;
      return (e == null ? void 0 : e.ide) && ((e == null ? void 0 : e.ide) === "intellij" ? t = "IntelliJ" : (e == null ? void 0 : e.ide) === "vscode" ? t = "VS Code" : (e == null ? void 0 : e.ide) === "eclipse" && (t = "Eclipse")), t ? `${e == null ? void 0 : e.version} ${t}` : e == null ? void 0 : e.version;
    }
    return "Not installed";
  }
  renderValue(e) {
    return e === "false" ? u(false) : e === "true" ? u(true) : e;
  }
  getInfoForClipboard(e) {
    const t = this.renderRoot.querySelectorAll(".info-tray dt"), r = Array.from(t).map((n) => ({
      key: n.textContent.trim(),
      value: n.nextElementSibling.textContent.trim()
    })).filter((n) => n.key !== "Live reload").filter((n) => !n.key.startsWith("Vaadin Emplo")).map((n) => {
      var _a;
      const { key: l } = n;
      let { value: a } = n;
      if (l === "IDE Plugin")
        a = this.getIdePluginLabelText(b$1.idePluginState) ?? "false";
      else if (l === "Java Hotswap") {
        const d = (_a = b$1.jdkInfo) == null ? void 0 : _a.jrebel, p = ao();
        d && p === "success" ? a = "JRebel is in use" : a = this.getHotswapAgentLabelText(p);
      }
      return `${l}: ${a}`;
    }).join(`
`);
    return e && N({
      type: nn.INFORMATION,
      message: "Environment information copied to clipboard",
      dismissId: "versionInfoCopied"
    }), r.trim();
  }
};
g([
  g$1()
], v.prototype, "serverInfo", 2);
g([
  g$1()
], v.prototype, "clientInfo", 2);
v = g([
  _s("copilot-info-panel")
], v);
let x = class extends Ms {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.style.display = "flex";
  }
  render() {
    return Ut`<button title="Copy to clipboard" aria-label="Copy to clipboard" theme="icon tertiary">
      <span
        @click=${() => {
      E.emit("system-info-with-callback", {
        callback: V,
        notify: true
      });
    }}
        >${r$1.copy}</span
      >
    </button>`;
  }
};
x = g([
  _s("copilot-info-actions")
], x);
const F = {
  header: "Info",
  expanded: false,
  panelOrder: 15,
  panel: "right",
  floating: false,
  tag: "copilot-info-panel",
  actionsTag: "copilot-info-actions",
  eager: true
  // Render even when collapsed as error handling depends on this
}, z = {
  init(e) {
    e.addPanel(F);
  }
};
window.Vaadin.copilot.plugins.push(z);
function u(e) {
  return e ? Ut`<span class="true">☑</span>` : Ut`<span class="false">☒</span>`;
}
export {
  x as Actions,
  v as CopilotInfoPanel
};
