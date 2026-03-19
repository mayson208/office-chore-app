var _a, _b;
import { m as ms, _ as _s, Y as Yl, Q, E as E$1, t as tn, n as nn, f as Pl, b as b$1, M as Ms, a as ao, U as Ut, j as Da, O, D as Di, H as He$1, x as xe, $ as $l, o as ue, p as Hl, v as le, w as Ql, y as Ul, z as Qi, A as it, I as zl, L as Bl, T as Tl, i as ic, R as dc, S as oc, V as ac, B as Bs, a0 as Ol, a1 as wl, W as Wl } from "./indexhtml-Co3Evg6-.js";
import { g, h } from "./state-Bmc-LnRe-KqHo9snF.js";
import { v as v$1, u as u$1 } from "./overlay-monkeypatch-7hGZnbAz-CNQ-42qf.js";
import { r as r$1 } from "./icons-Dw7Bm2ra-sLZmCL32.js";
import { z, V as V$1 } from "./react-utils-BPFPQdLp-Bcr0EtBv.js";
import { showNotification as N$1, dismissNotification as m } from "./copilot-notification-C3QdZgiY-Di_PPGRW.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ce(e) {
  return (t, i) => {
    const o = typeof t == "function" ? t : t[i];
    Object.assign(o, e);
  };
}
const F = "@keyframes bounce{0%{transform:scale(.8)}50%{transform:scale(1.5)}to{transform:scale(1)}}@keyframes pulse{0%{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 transparent}25%{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 var(--pulse-first-color, var(--selection-color))}50%{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 transparent}75%{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 var(--pulse-second-color, var(--accent-color))}to{box-shadow:0 0 calc(var(--pulse-size) * 2) 0 transparent}}@keyframes around-we-go-again{0%{background-position:0 0,0 0,calc(var(--glow-size) * -.5) calc(var(--glow-size) * -.5),calc(100% + calc(var(--glow-size) * .5)) calc(100% + calc(var(--glow-size) * .5))}25%{background-position:0 0,0 0,calc(100% + calc(var(--glow-size) * .5)) calc(var(--glow-size) * -.5),calc(var(--glow-size) * -.5) calc(100% + calc(var(--glow-size) * .5))}50%{background-position:0 0,0 0,calc(100% + calc(var(--glow-size) * .5)) calc(100% + calc(var(--glow-size) * .5)),calc(var(--glow-size) * -.5) calc(var(--glow-size) * -.5)}75%{background-position:0 0,0 0,calc(var(--glow-size) * -.5) calc(100% + calc(var(--glow-size) * .5)),calc(100% + calc(var(--glow-size) * .5)) calc(var(--glow-size) * -.5)}to{background-position:0 0,0 0,calc(var(--glow-size) * -.5) calc(var(--glow-size) * -.5),calc(100% + calc(var(--glow-size) * .5)) calc(100% + calc(var(--glow-size) * .5))}}@keyframes swirl{0%{rotate:0deg;filter:hue-rotate(20deg)}50%{filter:hue-rotate(-30deg)}to{rotate:360deg;filter:hue-rotate(20deg)}}";
var ke = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, I = (e, t, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Se(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (n = (o ? s(t, i, n) : s(n)) || n);
  return o && n && ke(t, i, n), n;
};
const U = "data-drag-initial-index", E = "data-drag-final-index";
let y = class extends Ms {
  constructor() {
    super(...arguments), this.position = "right", this.opened = false, this.keepOpen = false, this.resizing = false, this.closingForcefully = false, this.draggingSectionPanel = null, this.documentMouseUpListener = () => {
      this.resizing && E$1.emit("user-select", { allowSelection: true }), this.resizing = false, b$1.setDrawerResizing(false), this.removeAttribute("resizing");
    }, this.activationAnimationTransitionEndListener = () => {
      this.style.removeProperty("--closing-delay"), this.style.removeProperty("--initial-position"), this.removeEventListener("transitionend", this.activationAnimationTransitionEndListener);
    }, this.resizingMouseMoveListener = (e) => {
      if (!this.resizing)
        return;
      const { x: t, y: i } = e;
      e.stopPropagation(), e.preventDefault(), requestAnimationFrame(() => {
        let o;
        if (this.position === "right") {
          const n = document.body.clientWidth - t;
          this.style.setProperty("--size", `${n}px`), ue.saveDrawerSize(this.position, n), o = { width: n };
        } else if (this.position === "left") {
          const n = t;
          this.style.setProperty("--size", `${n}px`), ue.saveDrawerSize(this.position, n), o = { width: n };
        } else if (this.position === "bottom") {
          const n = document.body.clientHeight - i;
          this.style.setProperty("--size", `${n}px`), ue.saveDrawerSize(this.position, n), o = { height: n };
        }
        Q.panels.filter((n) => !n.floating && n.panel === this.position).forEach((n) => {
          Q.updatePanel(n.tag, o);
        });
      });
    }, this.sectionPanelDraggingStarted = (e, t) => {
      this.draggingSectionPanel = e, E$1.emit("user-select", { allowSelection: false }), this.draggingSectionPointerStartY = t.clientY, e.toggleAttribute("dragging", true), e.style.zIndex = "1000", Array.from(this.querySelectorAll("copilot-section-panel-wrapper")).forEach((i, o) => {
        i.setAttribute(U, `${o}`);
      }), document.addEventListener("mousemove", this.sectionPanelDragging), document.addEventListener("mouseup", this.sectionPanelDraggingFinished);
    }, this.sectionPanelDragging = (e) => {
      if (!this.draggingSectionPanel)
        return;
      const { clientX: t, clientY: i } = e;
      if (!Hl(this.getBoundingClientRect(), t, i)) {
        this.cleanUpDragging();
        return;
      }
      const o = i - this.draggingSectionPointerStartY;
      this.draggingSectionPanel.style.transform = `translateY(${o}px)`, this.updateSectionPanelPositionsWhileDragging();
    }, this.sectionPanelDraggingFinished = () => {
      if (!this.draggingSectionPanel)
        return;
      E$1.emit("user-select", { allowSelection: true });
      const e = this.getAllPanels().filter(
        (t) => {
          var _a2;
          return t.hasAttribute(E) && ((_a2 = t.panelInfo) == null ? void 0 : _a2.panelOrder) !== Number.parseInt(t.getAttribute(E), 10);
        }
      ).map((t) => ({
        tag: t.panelTag,
        order: Number.parseInt(t.getAttribute(E), 10)
      }));
      this.cleanUpDragging(), Q.updateOrders(e), document.removeEventListener("mouseup", this.sectionPanelDraggingFinished), document.removeEventListener("mousemove", this.sectionPanelDragging);
    }, this.updateSectionPanelPositionsWhileDragging = () => {
      const e = this.draggingSectionPanel.getBoundingClientRect().height;
      this.getAllPanels().sort((t, i) => {
        const o = t.getBoundingClientRect(), n = i.getBoundingClientRect(), a = (o.top + o.bottom) / 2, s = (n.top + n.bottom) / 2;
        return a - s;
      }).forEach((t, i) => {
        var _a2;
        if (t.setAttribute(E, `${i}`), t.panelTag !== ((_a2 = this.draggingSectionPanel) == null ? void 0 : _a2.panelTag)) {
          const o = Number.parseInt(t.getAttribute(U), 10);
          o > i ? t.style.transform = `translateY(${-e}px)` : o < i ? t.style.transform = `translateY(${e}px)` : t.style.removeProperty("transform");
        }
      });
    };
  }
  static get styles() {
    return [
      le(F),
      ms`
        :host {
          --size: 350px;
          --min-size: 20%;
          --max-size: 80%;
          --default-content-height: 300px;
          --transition-duration: var(--duration-2);
          --opening-delay: var(--duration-2);
          --closing-delay: var(--duration-3);
          --hover-size: 18px;
          --pulse-size: var(--hover-size);
          --pulse-animation-duration: 8s;
          --initial-position: 0px;
          position: absolute;
          z-index: var(--z-index-drawer);
          transition: translate var(--transition-duration) var(--closing-delay);
        }

        :host([no-transition]),
        :host([no-transition]) .container {
          transition: none;
          -webkit-transition: none;
          -moz-transition: none;
          -o-transition: none;
        }

        :host(:is([position='left'], [position='right'])) {
          width: var(--size);
          min-width: var(--min-size);
          max-width: var(--max-size);
          top: 0;
          bottom: 0;
        }

        :host([position='left']) {
          left: var(--initial-position);
          translate: calc(-100% + var(--hover-size)) 0%;
          padding-right: var(--hover-size);
        }

        :host([position='right']) {
          right: var(--initial-position);
          translate: calc(100% - var(--hover-size)) 0%;
          padding-left: var(--hover-size);
        }

        :host([position='bottom']) {
          height: var(--size);
          min-height: var(--min-size);
          max-height: var(--max-size);
          bottom: var(--initial-position);
          left: 0;
          right: 0;
          translate: 0% calc(100% - var(--hover-size));
          padding-top: var(--hover-size);
        }

        /* The visible container. Needed to have extra space for hover and resize handle outside it. */

        .container {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          height: 100%;
          background: var(--surface);
          -webkit-backdrop-filter: var(--surface-backdrop-filter);
          backdrop-filter: var(--surface-backdrop-filter);
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: var(--surface-box-shadow-2);
          transition:
            opacity var(--transition-duration) var(--closing-delay),
            visibility calc(var(--transition-duration) * 2) var(--closing-delay);
          opacity: 0;
          /* For accessibility (restored when open) */
          visibility: hidden;
        }

        :host([position='left']) .container {
          border-right: 1px solid var(--surface-border-color);
        }

        :host([position='right']) .container {
          border-left: 1px solid var(--surface-border-color);
        }

        :host([position='bottom']) .container {
          border-top: 1px solid var(--surface-border-color);
        }

        /* Opened state */

        :host(:is([opened], [keepopen])) {
          translate: 0% 0%;
          transition-delay: var(--opening-delay);
          z-index: var(--z-index-opened-drawer);
        }

        :host(:is([opened], [keepopen])) .container {
          transition-delay: var(--opening-delay);
          visibility: visible;
          opacity: 1;
        }

        .resize {
          position: absolute;
          z-index: 10;
          inset: 0;
        }

        :host(:is([position='left'], [position='right'])) .resize {
          width: var(--hover-size);
          cursor: col-resize;
        }

        :host([position='left']) .resize {
          left: auto;
          right: calc(var(--hover-size) * 0.5);
        }

        :host([position='right']) .resize {
          right: auto;
          left: calc(var(--hover-size) * 0.5);
        }

        :host([position='bottom']) .resize {
          height: var(--hover-size);
          bottom: auto;
          top: calc(var(--hover-size) * 0.5);
          cursor: row-resize;
        }

        :host([resizing]) .container {
          /* vaadin-grid (used in the outline) blocks the mouse events */
          pointer-events: none;
        }

        /* Visual indication of the drawer */

        :host::before {
          content: '';
          position: absolute;
          pointer-events: none;
          z-index: -1;
          inset: var(--hover-size);
          transition: opacity var(--transition-duration) var(--closing-delay);
          animation: pulse var(--pulse-animation-duration) infinite;
        }
        :host([document-hidden])::before {
          animation: none;
        }

        :host([attention-required]) {
          --pulse-animation-duration: 2s;
          --pulse-first-color: var(--red-500);
          --pulse-second-color: var(--red-800);
        }

        :host(:is([opened], [keepopen]))::before {
          transition-delay: var(--opening-delay);
          opacity: 0;
        }
        .hasmore {
          position: absolute;
          bottom: 0;
          width: 100%;

          text-align: center;
          padding-bottom: 0.5em;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--surface-2));
          padding-top: 2em;
          display: none;
        }
        .hasmoreContainer {
          height: 100%;
          position: relative;
        }
        :host([position='left']) .hasmoreContainer[canscroll] .hasmore,
        :host([position='right']) .hasmoreContainer[canscroll] .hasmore {
          display: block;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.reaction(
      () => Q.panels,
      () => this.requestUpdate()
    ), this.reaction(
      () => b$1.operationInProgress,
      (t) => {
        t === Ql.DragAndDrop && !this.opened && !this.keepOpen ? this.style.setProperty("pointer-events", "none") : this.style.setProperty("pointer-events", "auto");
      }
    ), this.reaction(
      () => Q.getAttentionRequiredPanelConfiguration(),
      () => {
        const t = Q.getAttentionRequiredPanelConfiguration();
        t && !t.floating && this.toggleAttribute(Ul, t.panel === this.position);
      }
    ), this.reaction(
      () => b$1.active,
      () => {
        if (!b$1.active || !Qi.isActivationAnimation() || b$1.activatedFrom === "restore" || b$1.activatedFrom === "test")
          return;
        const t = Q.getAttentionRequiredPanelConfiguration();
        t && !t.floating && t.panel === this.position || (this.addEventListener("transitionend", this.activationAnimationTransitionEndListener), this.toggleAttribute("no-transition", true), this.opened = true, this.style.setProperty("--closing-delay", "var(--duration-1)"), this.style.setProperty("--initial-position", "calc(-1 * (max(var(--size), var(--min-size)) * 1) / 3)"), requestAnimationFrame(() => {
          this.toggleAttribute("no-transition", false), this.opened = false;
        }));
      }
    ), document.addEventListener("mouseup", this.documentMouseUpListener);
    const e = ue.getDrawerSize(this.position);
    e && this.style.setProperty("--size", `${e}px`), document.addEventListener("mousemove", this.resizingMouseMoveListener), this.addEventListener("mouseenter", this.mouseEnterListener), E$1.on("document-activation-change", (t) => {
      this.toggleAttribute("document-hidden", !t.detail.active);
    });
  }
  firstUpdated(e) {
    super.firstUpdated(e), requestAnimationFrame(() => this.toggleAttribute("no-transition", false)), this.resizeElement.addEventListener("mousedown", (t) => {
      t.button === 0 && (this.resizing = true, b$1.setDrawerResizing(true), this.setAttribute("resizing", ""), E$1.emit("user-select", { allowSelection: false }));
    });
  }
  updated(e) {
    super.updated(e), e.has("opened") && this.opened && this.hasAttribute(Ul) && (this.removeAttribute(Ul), Q.clearAttention()), this.updateScrollable();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("mousemove", this.resizingMouseMoveListener), document.removeEventListener("mouseup", this.documentMouseUpListener), this.removeEventListener("mouseenter", this.mouseEnterListener);
  }
  /**
   * Cleans up attributes/styles etc... for dragging operations
   * @private
   */
  cleanUpDragging() {
    this.draggingSectionPanel && (b$1.setSectionPanelDragging(false), this.draggingSectionPanel.style.zIndex = "", Array.from(this.querySelectorAll("copilot-section-panel-wrapper")).forEach((e) => {
      e.style.removeProperty("transform"), e.removeAttribute(E), e.removeAttribute(U);
    }), this.draggingSectionPanel.removeAttribute("dragging"), this.draggingSectionPanel = null);
  }
  getAllPanels() {
    return Array.from(this.querySelectorAll("copilot-section-panel-wrapper"));
  }
  /**
   * Closes the drawer and disables mouse enter event for a while.
   */
  forceClose() {
    this.closingForcefully = true, this.opened = false, setTimeout(() => {
      this.closingForcefully = false;
    }, 0.5);
  }
  mouseEnterListener(e) {
    if (this.closingForcefully || b$1.sectionPanelResizing)
      return;
    document.querySelector("copilot-main").shadowRoot.querySelector("copilot-drawer-panel[opened]") || (this.opened = true);
  }
  render() {
    return Ut`
      <div class="hasmoreContainer">
        <div class="container" @scroll=${this.updateScrollable}>
          <slot></slot>
        </div>
        <div class="hasmore">⌄</div>
      </div>
      <div class="resize"></div>
    `;
  }
  updateScrollable() {
    this.hasmoreContainer.toggleAttribute(
      "canscroll",
      this.container.scrollHeight - this.container.scrollTop - this.container.clientHeight > 10
    );
  }
};
I([
  h({ reflect: true, attribute: true })
], y.prototype, "position", 2);
I([
  h({ reflect: true, type: Boolean })
], y.prototype, "opened", 2);
I([
  h({ reflect: true, type: Boolean })
], y.prototype, "keepOpen", 2);
I([
  v$1(".container")
], y.prototype, "container", 2);
I([
  v$1(".hasmoreContainer")
], y.prototype, "hasmoreContainer", 2);
I([
  v$1(".resize")
], y.prototype, "resizeElement", 2);
I([
  Ce({ passive: true })
], y.prototype, "updateScrollable", 1);
y = I([
  _s("copilot-drawer-panel")
], y);
var De = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, ae = (e, t, i, o) => {
  for (var n = o > 1 ? void 0 : o ? $e(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (n = (o ? s(t, i, n) : s(n)) || n);
  return o && n && De(t, i, n), n;
};
let V = class extends it {
  constructor() {
    super(...arguments), this.checked = false;
  }
  static get styles() {
    return ms`
      .switch {
        display: inline-flex;
        align-items: center;
        gap: var(--space-100);
      }

      .switch input {
        display: none;
      }

      .slider {
        background-color: var(--gray-300);
        border-radius: 9999px;
        cursor: pointer;
        inset: 0;
        position: absolute;
        transition: 0.4s;
        height: 0.75rem;
        position: relative;
        width: 1.5rem;
        min-width: 1.5rem;
      }

      .slider:before {
        background-color: white;
        border-radius: 50%;
        bottom: 1px;
        content: '';
        height: 0.625rem;
        left: 1px;
        position: absolute;
        transition: 0.4s;
        width: 0.625rem;
      }

      input:checked + .slider {
        background-color: var(--selection-color);
      }

      input:checked + .slider:before {
        transform: translateX(0.75rem);
      }

      label:has(input:focus) {
        outline: 2px solid var(--selection-color);
        outline-offset: 2px;
      }
    `;
  }
  render() {
    return Ut`
      <label class="switch">
        <input
          class="feature-toggle"
          id="feature-toggle-${this.id}"
          type="checkbox"
          ?checked="${this.checked}"
          @change=${(e) => {
      e.preventDefault(), this.checked = e.target.checked, this.dispatchEvent(new CustomEvent("on-change"));
    }} />
        <span class="slider"></span>
        ${this.title}
      </label>
    `;
  }
  //  @change=${(e: InputEvent) => this.toggleFeatureFlag(e, feature)}
};
ae([
  h({ reflect: true, type: Boolean })
], V.prototype, "checked", 2);
V = ae([
  _s("copilot-toggle-button")
], V);
function v(e, t) {
  const i = document.createElement(e);
  if (t.style && (i.className = t.style), t.icon)
    if (typeof t.icon == "string") {
      const o = document.createElement("vaadin-icon");
      o.setAttribute("icon", t.icon), i.append(o);
    } else
      i.append(Ee(t.icon.strings[0]));
  if (t.label) {
    const o = document.createElement("span");
    o.className = "label", o.innerHTML = t.label, i.append(o);
  }
  if (t.hint) {
    const o = document.createElement("span");
    o.className = "hint", o.innerHTML = t.hint, i.append(o);
  }
  return i;
}
function Ee(e) {
  if (!e) return null;
  const t = document.createElement("template");
  t.innerHTML = e;
  const i = t.content.children;
  return i.length === 1 ? i[0] : i;
}
class Le {
  constructor() {
    this.offsetX = 0, this.offsetY = 0;
  }
  draggingStarts(t, i) {
    this.offsetX = i.clientX - t.getBoundingClientRect().left, this.offsetY = i.clientY - t.getBoundingClientRect().top;
  }
  dragging(t, i) {
    const o = i.clientX, n = i.clientY, a = o - this.offsetX, s = o - this.offsetX + t.getBoundingClientRect().width, p = n - this.offsetY, f = n - this.offsetY + t.getBoundingClientRect().height;
    return this.adjust(t, a, p, s, f);
  }
  adjust(t, i, o, n, a) {
    let s, p, f, $;
    const B = document.documentElement.getBoundingClientRect().width, J = document.documentElement.getBoundingClientRect().height;
    return (n + i) / 2 < B / 2 ? (t.style.setProperty("--left", `${i}px`), t.style.setProperty("--right", ""), $ = void 0, s = Math.max(0, i)) : (t.style.removeProperty("--left"), t.style.setProperty("--right", `${B - n}px`), s = void 0, $ = Math.max(0, B - n)), (o + a) / 2 < J / 2 ? (t.style.setProperty("--top", `${o}px`), t.style.setProperty("--bottom", ""), f = void 0, p = Math.max(0, o)) : (t.style.setProperty("--top", ""), t.style.setProperty("--bottom", `${J - a}px`), p = void 0, f = Math.max(0, J - a)), {
      left: s,
      right: $,
      top: p,
      bottom: f
    };
  }
  anchor(t) {
    const { left: i, top: o, bottom: n, right: a } = t.getBoundingClientRect();
    return this.adjust(t, i, o, a, n);
  }
  anchorLeftTop(t) {
    const { left: i, top: o } = t.getBoundingClientRect();
    return t.style.setProperty("--left", `${i}px`), t.style.setProperty("--right", ""), t.style.setProperty("--top", `${o}px`), t.style.setProperty("--bottom", ""), {
      left: i,
      top: o
    };
  }
}
const w = new Le();
var Me = Object.defineProperty, Re = Object.getOwnPropertyDescriptor, D = (e, t, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Re(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (n = (o ? s(t, i, n) : s(n)) || n);
  return o && n && Me(t, i, n), n;
};
const G = "https://github.com/JetBrains/JetBrainsRuntime/releases";
function je(e, t) {
  if (!t)
    return true;
  const [i, o, n] = t.split(".").map((f) => parseInt(f)), [a, s, p] = e.split(".").map((f) => parseInt(f));
  if (i < a)
    return true;
  if (i == a) {
    if (o < s)
      return true;
    if (o === s)
      return n < p;
  }
  return false;
}
const W = "Download complete";
let b = class extends Ms {
  constructor() {
    super(), this.javaPluginSectionOpened = false, this.hotswapSectionOpened = false, this.hotswapTab = "hotswapagent", this.downloadStatusMessages = [], this.downloadProgress = 0, this.onDownloadStatusUpdate = this.downloadStatusUpdate.bind(this), this.reaction(
      () => [b$1.jdkInfo, b$1.idePluginState],
      () => {
        b$1.idePluginState && (!b$1.idePluginState.ide || !b$1.idePluginState.active ? this.javaPluginSectionOpened = true : (!(/* @__PURE__ */ new Set(["vscode", "intellij"])).has(b$1.idePluginState.ide) || !b$1.idePluginState.active) && (this.javaPluginSectionOpened = false)), b$1.jdkInfo && ao() !== "success" && (this.hotswapSectionOpened = true);
      },
      { fireImmediately: true }
    );
  }
  connectedCallback() {
    super.connectedCallback(), E$1.on("set-up-vs-code-hotswap-status", this.onDownloadStatusUpdate);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), E$1.off("set-up-vs-code-hotswap-status", this.onDownloadStatusUpdate);
  }
  render() {
    var _a2, _b2, _c, _d;
    const e = {
      intellij: ((_a2 = b$1.idePluginState) == null ? void 0 : _a2.ide) === "intellij",
      vscode: ((_b2 = b$1.idePluginState) == null ? void 0 : _b2.ide) === "vscode",
      eclipse: ((_c = b$1.idePluginState) == null ? void 0 : _c.ide) === "eclipse",
      idePluginInstalled: !!((_d = b$1.idePluginState) == null ? void 0 : _d.active)
    };
    return Ut`
      <div part="container">${this.renderPluginSection(e)} ${this.renderHotswapSection(e)}</div>
      <div part="footer">
        <vaadin-button
          id="close"
          @click="${() => Q.updatePanel(q.tag, { floating: false })}"
          >Close
        </vaadin-button>
        <vaadin-button
          id="more-info"
          theme="tertiary"
          @click="${() => {
      window.open(
        "https://vaadin.com/docs/latest/flow/configuration/live-reload/hotswap-agent",
        "_blank",
        "noopener"
      );
    }}"
          >More information...
        </vaadin-button>
      </div>
    `;
  }
  renderPluginSection(e) {
    let t = "";
    e.intellij ? t = "IntelliJ" : e.vscode ? t = "VS Code" : e.eclipse && (t = "Eclipse");
    let i, o;
    e.vscode || e.intellij ? e.idePluginInstalled ? (i = `Plugin for ${t} installed`, o = this.renderPluginInstalledContent()) : (i = `Plugin for ${t} not installed`, o = this.renderPluginIsNotInstalledContent(e)) : e.eclipse ? (i = "Eclipse development workflow is not supported yet", o = this.renderEclipsePluginContent()) : (i = "No IDE found", o = this.renderNoIdePluginContent());
    const n = e.idePluginInstalled ? r$1.successColorful : r$1.warningColorful;
    return Ut`
      <details
        part="panel"
        .open=${this.javaPluginSectionOpened}
        @toggle=${(a) => {
      Da(() => {
        this.javaPluginSectionOpened = a.target.open;
      });
    }}>
        <summary part="header">
          <span class="icon">${n}</span>
          <div>${i}</div>
        </summary>
        <div part="content">${o}</div>
      </details>
    `;
  }
  renderNoIdePluginContent() {
    return Ut`
      <div>
        <div>We could not detect an IDE</div>
        ${this.recommendSupportedPlugin()}
      </div>
    `;
  }
  renderEclipsePluginContent() {
    return Ut`
      <div>
        <div>Eclipse workflow environment is not supported yet.</div>
        ${this.recommendSupportedPlugin()}
      </div>
    `;
  }
  recommendSupportedPlugin() {
    return Ut`<p>
      Please use <a href="https://code.visualstudio.com">Visual Studio Code</a> or
      <a href="https://www.jetbrains.com/idea">IntelliJ IDEA</a> for better development experience
    </p>`;
  }
  renderPluginInstalledContent() {
    return Ut` <p>You have a running plugin. Enjoy your awesome development workflow!</p> `;
  }
  renderPluginIsNotInstalledContent(e) {
    let t = null, i = "Install from Marketplace";
    return e.intellij ? (t = zl, i = "Install from JetBrains Marketplace") : e.vscode && (t = Bl, i = "Install from VSCode Marketplace"), Ut`
      <div>
        <div>Install the Vaadin IDE Plugin to ensure a smooth development workflow</div>
        <p>
          Installing the plugin is not required, but strongly recommended.<br />Some Vaadin Copilot functionality, such
          as undo, will not function optimally without the plugin.
        </p>
        ${t ? Ut` <div>
              <vaadin-button
                @click="${() => {
      window.open(t, "_blank");
    }}"
                >${i}
                <vaadin-icon icon="vaadin:external-link"></vaadin-icon>
              </vaadin-button>
            </div>` : O}
      </div>
    `;
  }
  renderHotswapSection(e) {
    const { jdkInfo: t } = b$1;
    if (!t)
      return O;
    const i = ao();
    let o, n, a;
    return i === "success" ? (o = r$1.successColorful, a = "Java Hotswap is enabled") : i === "warning" ? (o = r$1.warningColorful, a = "Java Hotswap is not enabled") : i === "error" && (o = r$1.warningColorful, a = "Java Hotswap is partially enabled"), this.hotswapTab === "jrebel" ? t.jrebel ? n = this.renderJRebelInstalledContent() : n = this.renderJRebelNotInstalledContent() : e.intellij ? n = this.renderHotswapAgentIntelliJPluginContent() : n = this.renderHotswapAgentNotInstalledContent(e), Ut`
      <details
        part="panel"
        .open=${this.hotswapSectionOpened}
        @toggle=${(s) => {
      Da(() => {
        this.hotswapSectionOpened = s.target.open;
      });
    }}>
        <summary part="header">
          <span class="icon">${o}</span>
          <div>${a}</div>
        </summary>
        <div part="content">
          <div class="tabs" role="tablist">
            <button
              aria-selected="${this.hotswapTab === "hotswapagent" ? "true" : "false"}"
              class="tab"
              role="tab"
              @click=${() => {
      this.hotswapTab = "hotswapagent";
    }}>
              Hotswap Agent
            </button>
            <button
              aria-selected="${this.hotswapTab === "jrebel" ? "true" : "false"}"
              class="tab"
              role="tab"
              @click=${() => {
      this.hotswapTab = "jrebel";
    }}>
              JRebel
            </button>
          </div>
          <div part="content">${n}</div>
        </div>
      </details>
    `;
  }
  renderJRebelInstalledContent() {
    return Ut` <div>JRebel is running and enabled.</div> `;
  }
  renderJRebelNotInstalledContent() {
    return Ut`
      <div>
        <a href="https://www.jrebel.com">JRebel ${r$1.linkExternal}</a> is a commercial hotswap solution. Vaadin
        detects the JRebel Agent and automatically reloads the application in the browser after the Java changes have
        been hotpatched.
        <br />
        <a href="https://www.jrebel.com/products/jrebel">Read more</a>
        <p>
          Go to
          <a href="https://www.jrebel.com/products/jrebel/learn" target="_blank" rel="noopener noreferrer">
            >https://www.jrebel.com/products/jrebel/learn ${r$1.linkExternal}</a
          >
          to get started
        </p>
      </div>
    `;
  }
  renderHotswapAgentNotInstalledContent(e) {
    const t = ao(), i = [
      this.renderJavaRunningInDebugModeSection(),
      t === "success" ? this.renderHotswapAgentInstalledContent() : O,
      this.renderHotswapAgentJdkSection(e),
      this.renderInstallHotswapAgentJdkSection(e),
      this.renderHotswapAgentVersionSection(),
      this.renderHotswapAgentMissingArgParam(e)
    ];
    return Ut` <div part="hotswap-agent-section-container">${i}</div> `;
  }
  renderHotswapAgentIntelliJPluginContent() {
    const t = ao() === "success";
    return Ut`
      <div part="hotswap-agent-section-container">
        <div class="inner-section">
          <details class="inner" .open="${!t}">
            <summary>
              <span class="icon">${t ? r$1.successColorful : r$1.warningColorful}</span>
              <div>Use 'Debug using Hotswap Agent' launch configuration</div>
            </summary>
            <div class="hint">
              Vaadin IntelliJ plugin offers launch mode that does not require any manual configuration!
              <p>
                In order to run recommended launch configuration, you should click three dots right next to Debug button
                and select <code>Debug using Hotswap Agent</code> option.
              </p>
            </div>
          </details>
        </div>
      </div>
    `;
  }
  renderJavaRunningInDebugModeSection() {
    var _a2;
    const e = (_a2 = b$1.jdkInfo) == null ? void 0 : _a2.runningInJavaDebugMode;
    return Ut`
      <div class="inner-section">
        <details class="inner" .open="${!e}">
          <summary>
            <span class="icon">${e ? r$1.successColorful : r$1.warningColorful}</span>
            <div>Run Java in debug mode</div>
          </summary>
          <div class="hint">Start the application in debug mode in the IDE</div>
        </details>
      </div>
    `;
  }
  renderHotswapAgentMissingArgParam(e) {
    var _a2, _b2;
    const t = ((_a2 = b$1.jdkInfo) == null ? void 0 : _a2.runningWitHotswap) && ((_b2 = b$1.jdkInfo) == null ? void 0 : _b2.runningWithExtendClassDef);
    return Ut`
      <div class="inner-section">
        <details class="inner" .open="${!t}">
          <summary>
            <span class="icon">${t ? r$1.successColorful : r$1.warningColorful}</span>
            <div>Enable HotswapAgent</div>
          </summary>
          <div class="hint">
            <ul>
              ${e.intellij ? Ut`<li>Launch as mentioned in the previous step</li>` : O}
              ${e.intellij ? Ut`<li>
                    To manually configure IntelliJ, add the
                    <code>-XX:HotswapAgent=fatjar -XX:+AllowEnhancedClassRedefinition -XX:+UpdateClasses</code> JVM
                    arguments when launching the application
                  </li>` : Ut`<li>
                    Add the
                    <code>-XX:HotswapAgent=fatjar -XX:+AllowEnhancedClassRedefinition -XX:+UpdateClasses</code> JVM
                    arguments when launching the application
                  </li>`}
            </ul>
          </div>
        </details>
      </div>
    `;
  }
  renderHotswapAgentJdkSection(e) {
    var _a2, _b2, _c;
    const t = (_a2 = b$1.jdkInfo) == null ? void 0 : _a2.extendedClassDefCapable, i = ((_b2 = this.downloadStatusMessages) == null ? void 0 : _b2[this.downloadStatusMessages.length - 1]) === W;
    return Ut`
      <div class="inner-section">
        <details class="inner" .open="${!t}">
          <summary>
            <span class="icon">${t ? r$1.successColorful : r$1.warningColorful}</span>
            <div>Run using JetBrains Runtime JDK</div>
          </summary>
          <div class="hint">
            JetBrains Runtime provides much better hotswapping compared to other JDKs.
            <ul>
              ${e.intellij && je("1.3.0", (_c = b$1.idePluginState) == null ? void 0 : _c.version) ? Ut` <li>Upgrade to the latest IntelliJ plugin</li>` : O}
              ${e.intellij ? Ut` <li>Launch the application in IntelliJ using "Debug using Hotswap Agent"</li>` : O}
              ${e.vscode ? Ut` <li>
                    <a href @click="${(o) => this.downloadJetbrainsRuntime(o)}"
                      >Let Copilot download and set up JetBrains Runtime for VS Code</a
                    >
                    ${this.downloadProgress > 0 ? Ut`<vaadin-progress-bar
                          .value="${this.downloadProgress}"
                          min="0"
                          max="1"></vaadin-progress-bar>` : O}
                    <ul>
                      ${this.downloadStatusMessages.map((o) => Ut`<li>${o}</li>`)}
                      ${i ? Ut`<h3>Go to VS Code and launch the 'Debug using Hotswap Agent' configuration</h3>` : O}
                    </ul>
                  </li>` : O}
              <li>
                ${e.intellij || e.vscode ? Ut`If there is a problem, you can manually
                      <a target="_blank" href="${G}">download JetBrains Runtime JDK</a> and set up
                      your debug configuration to use it.` : Ut`<a target="_blank" href="${G}">Download JetBrains Runtime JDK</a> and set up
                      your debug configuration to use it.`}
              </li>
            </ul>
          </div>
        </details>
      </div>
    `;
  }
  renderInstallHotswapAgentJdkSection(e) {
    var _a2, _b2;
    const t = (_a2 = b$1.jdkInfo) == null ? void 0 : _a2.hotswapAgentFound, i = (_b2 = b$1.jdkInfo) == null ? void 0 : _b2.extendedClassDefCapable;
    return Ut`
      <div class="inner-section">
        <details class="inner" .open="${!t}">
          <summary>
            <span class="icon">${t ? r$1.successColorful : r$1.warningColorful}</span>
            <div>Install HotswapAgent</div>
          </summary>
          <div class="hint">
            Hotswap Agent provides application level support for hot reloading, such as reinitalizing Vaadin @Route or
            @BrowserCallable classes when they are updated
            <ul>
              ${e.intellij ? Ut`<li>Launch as mentioned in the previous step</li>` : O}
              ${!e.intellij && !i ? Ut`<li>First install JetBrains Runtime as mentioned in the step above.</li>` : O}
              ${e.intellij ? Ut`<li>
                    To manually configure IntelliJ, download HotswapAgent and install the jar file as
                    <code>[JAVA_HOME]/lib/hotswap/hotswap-agent.jar</code> in the JetBrains Runtime JDK. Note that the
                    file must be renamed to exactly match this path.
                  </li>` : Ut`<li>
                    Download HotswapAgent and install the jar file as
                    <code>[JAVA_HOME]/lib/hotswap/hotswap-agent.jar</code> in the JetBrains Runtime JDK. Note that the
                    file must be renamed to exactly match this path.
                  </li>`}
            </ul>
          </div>
        </details>
      </div>
    `;
  }
  renderHotswapAgentVersionSection() {
    var _a2, _b2, _c, _d;
    if (!((_a2 = b$1.jdkInfo) == null ? void 0 : _a2.hotswapAgentFound))
      return O;
    const e = (_b2 = b$1.jdkInfo) == null ? void 0 : _b2.hotswapVersionOk, t = (_c = b$1.jdkInfo) == null ? void 0 : _c.hotswapVersion, i = (_d = b$1.jdkInfo) == null ? void 0 : _d.hotswapAgentLocation;
    return Ut`
      <div class="inner-section">
        <details class="inner" .open="${!e}">
          <summary>
            <span class="icon">${e ? r$1.successColorful : r$1.warningColorful}</span>
            <div>Hotswap version requires update</div>
          </summary>
          <div class="hint">
            HotswapAgent version ${t} is in use
            <a target="_blank" href="https://github.com/HotswapProjects/HotswapAgent/releases"
              >Download the latest HotswapAgent</a
            >
            and place it in <code>${i}</code>
          </div>
        </details>
      </div>
    `;
  }
  renderHotswapAgentInstalledContent() {
    return Ut` <div>Hotswap agent is in use. Enjoy your awesome development workflow!</div> `;
  }
  async downloadJetbrainsRuntime(e) {
    return e.target.disabled = true, e.preventDefault(), this.downloadStatusMessages = [], Di(`${xe}set-up-vs-code-hotswap`, {}, (t) => {
      t.data.error ? (He$1("Error downloading JetBrains runtime", t.data.error), this.downloadStatusMessages = [...this.downloadStatusMessages, "Download failed"]) : this.downloadStatusMessages = [...this.downloadStatusMessages, W];
    });
  }
  downloadStatusUpdate(e) {
    const t = e.detail.progress;
    t ? this.downloadProgress = t : this.downloadStatusMessages = [...this.downloadStatusMessages, e.detail.message];
  }
};
b.NAME = "copilot-development-setup-user-guide";
b.styles = ms`
    :host {
      --icon-size: 24px;
      --summary-header-gap: 10px;
      --footer-height: calc(50px + var(--space-150));
      color: var(--color);
    }
    :host code {
      background-color: var(--gray-50);
      font-size: var(--font-size-0);
      display: inline-block;
      margin-top: var(--space-100);
      margin-bottom: var(--space-100);
      user-select: all;
    }

    [part='container'] {
      display: flex;
      flex-direction: column;
      gap: var(--space-150);
      padding: var(--space-150);
      box-sizing: border-box;
      height: calc(100% - var(--footer-height));
      overflow: auto;
    }

    [part='footer'] {
      display: flex;
      justify-content: space-between;
      height: var(--footer-height);
      padding-left: var(--space-150);
      padding-right: var(--space-150);
    }
    [part='hotswap-agent-section-container'] {
      display: flex;
      flex-direction: column;
      gap: var(--space-100);
    }
    [part='content'] {
      display: flex;
      padding: var(--space-150);
      flex-direction: column;
    }
    div.inner-section div.hint {
      margin-left: calc(var(--summary-header-gap) + var(--icon-size));
      margin-top: var(--space-75);
    }
    details {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      & > summary span.icon {
        width: var(--icon-size);
        height: var(--icon-size);
      }
      & > summary,
      summary::part(header) {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        position: relative;
        gap: var(--summary-header-gap);
        font: var(--font);
      }
      summary::after,
      summary::part(header)::after {
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        border-color: var(--color);
        opacity: var(--panel-toggle-opacity, 0.2);
        border-width: 2px;
        border-style: solid solid none none;
        transform: rotate(var(--panel-toggle-angle, -45deg));
        position: absolute;
        right: 15px;
        top: calc(50% - var(--panel-toggle-offset, 2px));
      }
      &:not([open]) {
        --panel-toggle-angle: 135deg;
        --panel-toggle-offset: 4px;
      }
    }
    details[part='panel'] {
      background: var(--card-bg);
      border: var(--card-border);
      border-radius: 4px;
      user-select: none;

      &:has(summary:hover) {
        border-color: var(--accent-color);
      }

      & > summary,
      summary::part(header) {
        padding: 10px 10px;
        padding-right: 25px;
      }

      summary:hover,
      summary::part(header):hover {
        --panel-toggle-opacity: 0.5;
      }

      input[type='checkbox'],
      summary::part(checkbox) {
        margin: 0;
      }

      &:not([open]):hover {
        background: var(--card-hover-bg);
      }

      &[open] {
        background: var(--card-open-bg);
        box-shadow: var(--card-open-shadow);

        & > summary {
          font-weight: bold;
        }
      }
      .tabs {
        border-bottom: 1px solid var(--border-color);
        box-sizing: border-box;
        display: flex;
        height: 2.25rem;
      }

      .tab {
        background: none;
        border: none;
        border-bottom: 1px solid transparent;
        color: var(--color);
        font: var(--font-button);
        height: 2.25rem;
        padding: 0 0.75rem;
      }

      .tab[aria-selected='true'] {
        color: var(--color-high-contrast);
        border-bottom-color: var(--color-high-contrast);
      }

      .tab-content {
        flex: 1 1 auto;
        gap: var(--space-150);
        overflow: auto;
        padding: var(--space-150);
      }
    }
  `;
D([
  g()
], b.prototype, "javaPluginSectionOpened", 2);
D([
  g()
], b.prototype, "hotswapSectionOpened", 2);
D([
  g()
], b.prototype, "hotswapTab", 2);
D([
  g()
], b.prototype, "downloadStatusMessages", 2);
D([
  g()
], b.prototype, "downloadProgress", 2);
b = D([
  _s(b.NAME)
], b);
const q = Yl({
  header: "Development Workflow",
  tag: $l,
  width: 800,
  height: 800,
  floatingPosition: {
    top: 50,
    left: 50
  },
  individual: true
}), Oe = {
  init(e) {
    e.addPanel(q);
  }
};
window.Vaadin.copilot.plugins.push(Oe);
Q.addPanel(q);
var Te = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, X = (e, t, i, o) => {
  for (var n = o > 1 ? void 0 : o ? _e(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (n = (o ? s(t, i, n) : s(n)) || n);
  return o && n && Te(t, i, n), n;
};
const He = 8;
let H = class extends Ms {
  constructor() {
    super(...arguments), this.initialMouseDownPosition = null, this.dragging = false, this.mouseDownListener = (e) => {
      this.initialMouseDownPosition = { x: e.clientX, y: e.clientY }, w.draggingStarts(this, e), document.addEventListener("mousemove", this.documentDraggingMouseMoveEventListener);
    }, this.documentDraggingMouseMoveEventListener = (e) => {
      if (this.initialMouseDownPosition && !this.dragging) {
        const { clientX: t, clientY: i } = e;
        this.dragging = Math.abs(t - this.initialMouseDownPosition.x) + Math.abs(i - this.initialMouseDownPosition.y) > He;
      }
      this.dragging && (this.setOverlayVisibility(false), w.dragging(this, e));
    }, this.documentMouseUpListener = (e) => {
      if (this.dragging) {
        const t = w.dragging(this, e);
        Qi.setActivationButtonPosition(t), this.setOverlayVisibility(true);
      }
      this.dragging = false, this.initialMouseDownPosition = null, document.removeEventListener("mousemove", this.documentDraggingMouseMoveEventListener), this.setMenuBarOnClick();
    }, this.dispatchSpotlightActivationEvent = (e) => {
      this.dispatchEvent(
        new CustomEvent("spotlight-activation-changed", {
          detail: e
        })
      );
    }, this.activationBtnClicked = (e) => {
      if (this.dragging) {
        e == null ? void 0 : e.stopPropagation(), this.dragging = false;
        return;
      }
      if (b$1.active && this.handleAttentionRequiredOnClick()) {
        e == null ? void 0 : e.stopPropagation(), e == null ? void 0 : e.preventDefault();
        return;
      }
      e == null ? void 0 : e.stopPropagation(), this.dispatchEvent(new CustomEvent("activation-btn-clicked"));
    }, this.handleAttentionRequiredOnClick = () => {
      const e = Q.getAttentionRequiredPanelConfiguration();
      return e ? e.panel && !e.floating ? (E$1.emit("open-attention-required-drawer", null), true) : (Q.clearAttention(), true) : false;
    }, this.setMenuBarOnClick = () => {
      const e = this.shadowRoot.querySelector("vaadin-menu-bar-button");
      e && (e.onclick = this.activationBtnClicked);
    };
  }
  static get styles() {
    return [
      le(F),
      ms`
        :host {
          --space: 8px;
          --height: 28px;
          --width: 28px;
          position: absolute;
          top: clamp(var(--space), var(--top), calc(100vh - var(--height) - var(--space)));
          left: clamp(var(--space), var(--left), calc(100vw - var(--width) - var(--space)));
          bottom: clamp(var(--space), var(--bottom), calc(100vh - var(--height) - var(--space)));
          right: clamp(var(--space), var(--right), calc(100vw - var(--width) - var(--space)));
          user-select: none;
          -ms-user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          --indicator-color: var(--red);
          /* Don't add a z-index or anything else that creates a stacking context */
        }

        :host .menu-button {
          min-width: unset;
        }

        :host([document-hidden]) {
          -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
          filter: grayscale(100%);
        }

        .menu-button::part(container) {
          overflow: visible;
        }

        .menu-button vaadin-menu-bar-button {
          all: initial;
          display: block;
          position: relative;
          z-index: var(--z-index-activation-button);
          width: var(--width);
          height: var(--height);
          overflow: hidden;
          color: transparent;
          background: hsl(0 0% 0% / 0.25);
          border-radius: 8px;
          box-shadow: 0 0 0 1px hsl(0 0% 100% / 0.1);
          cursor: default;
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          transition:
            box-shadow 0.2s,
            background-color 0.2s;
        }

        /* pointer-events property is set when the menu is open */

        .menu-button[style*='pointer-events'] + .monkey-patch-close-on-hover {
          position: fixed; /* escapes the host positioning context */
          inset: 0;
          bottom: 40px;
          z-index: calc(var(--z-index-popover) - 1);
          pointer-events: auto;
        }

        /* visual effect when active */

        .menu-button vaadin-menu-bar-button::before {
          all: initial;
          content: '';
          position: absolute;
          inset: -6px;
          background-image: radial-gradient(circle at 50% -10%, hsl(221 100% 55% / 0.6) 0%, transparent 60%),
            radial-gradient(circle at 25% 40%, hsl(303 71% 64%) 0%, transparent 70%),
            radial-gradient(circle at 80% 10%, hsla(262, 38%, 9%, 0.5) 0%, transparent 80%),
            radial-gradient(circle at 110% 50%, hsla(147, 100%, 77%, 1) 20%, transparent 100%);
          animation: 5s swirl linear infinite;
          animation-play-state: paused;
          opacity: 0;
          transition: opacity 0.5s;
        }

        /* vaadin symbol */

        .menu-button vaadin-menu-bar-button::after {
          all: initial;
          content: '';
          position: absolute;
          inset: 1px;
          background: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7407 9.70401C12.7407 9.74417 12.7378 9.77811 12.7335 9.81479C12.7111 10.207 12.3897 10.5195 11.9955 10.5195C11.6014 10.5195 11.2801 10.209 11.2577 9.8169C11.2534 9.7801 11.2504 9.74417 11.2504 9.70401C11.2504 9.31225 11.1572 8.90867 10.2102 8.90867H7.04307C5.61481 8.90867 5 8.22698 5 6.86345V5.70358C5 5.31505 5.29521 5 5.68008 5C6.06495 5 6.35683 5.31505 6.35683 5.70358V6.09547C6.35683 6.53423 6.655 6.85413 7.307 6.85413H10.4119C11.8248 6.85413 11.9334 7.91255 11.98 8.4729H12.0111C12.0577 7.91255 12.1663 6.85413 13.5791 6.85413H16.6841C17.3361 6.85413 17.614 6.54529 17.614 6.10641L17.6158 5.70358C17.6158 5.31505 17.9246 5 18.3095 5C18.6943 5 19 5.31505 19 5.70358V6.86345C19 8.22698 18.3763 8.90867 16.9481 8.90867H13.7809C12.8338 8.90867 12.7407 9.31225 12.7407 9.70401Z" fill="white"/><path d="M12.7536 17.7785C12.6267 18.0629 12.3469 18.2608 12.0211 18.2608C11.6907 18.2608 11.4072 18.0575 11.2831 17.7668C11.2817 17.7643 11.2803 17.7619 11.279 17.7595C11.2761 17.7544 11.2732 17.7495 11.2704 17.744L8.45986 12.4362C8.3821 12.2973 8.34106 12.1399 8.34106 11.9807C8.34106 11.4732 8.74546 11.0603 9.24238 11.0603C9.64162 11.0603 9.91294 11.2597 10.0985 11.6922L12.0216 15.3527L13.9468 11.6878C14.1301 11.2597 14.4014 11.0603 14.8008 11.0603C15.2978 11.0603 15.7021 11.4732 15.7021 11.9807C15.7021 12.1399 15.6611 12.2973 15.5826 12.4374L12.7724 17.7446C12.7683 17.7524 12.7642 17.7597 12.7601 17.767C12.7579 17.7708 12.7557 17.7746 12.7536 17.7785Z" fill="white"/></svg>');
          background-size: 100%;
        }

        .menu-button vaadin-menu-bar-button[focus-ring] {
          outline: 2px solid var(--selection-color);
          outline-offset: 2px;
        }

        .menu-button vaadin-menu-bar-button:hover {
          background: hsl(0 0% 0% / 0.8);
          box-shadow:
            0 0 0 1px hsl(0 0% 100% / 0.1),
            0 2px 8px -1px hsl(0 0% 0% / 0.3);
        }

        :host([active]) .menu-button vaadin-menu-bar-button {
          background-color: transparent;
          box-shadow:
            inset 0 0 0 1px hsl(0 0% 0% / 0.2),
            0 2px 8px -1px hsl(0 0% 0% / 0.3);
        }

        :host([active]) .menu-button vaadin-menu-bar-button::before {
          opacity: 1;
          animation-play-state: running;
        }

        :host([attention-required]) {
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        [part='indicator'] {
          top: -6px;
          right: -6px;
          width: 12px;
          height: 12px;
          box-sizing: border-box;
          border-radius: 100%;
          position: absolute;
          display: var(--indicator-display, none);
          background: var(--indicator-color);
          z-index: calc(var(--z-index-activation-button) + 1);
          border: 2px solid var(--indicator-border);
        }

        :host([indicator='warning']) {
          --indicator-display: block;
          --indicator-color: var(--yellow);
        }

        :host([indicator='error']) {
          --indicator-display: block;
          --indicator-color: var(--red);
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.reaction(
      () => Q.attentionRequiredPanelTag,
      () => {
        this.toggleAttribute(Ul, Q.attentionRequiredPanelTag !== null), this.updateIndicator();
      }
    ), this.reaction(
      () => b$1.active,
      () => {
        this.toggleAttribute("active", b$1.active);
      },
      { fireImmediately: true }
    ), this.addEventListener("mousedown", this.mouseDownListener), document.addEventListener("mouseup", this.documentMouseUpListener);
    const e = Qi.getActivationButtonPosition();
    e ? (this.style.setProperty("--left", `${e.left}px`), this.style.setProperty("--bottom", `${e.bottom}px`), this.style.setProperty("--right", `${e.right}px`), this.style.setProperty("--top", `${e.top}px`)) : (this.style.setProperty("--bottom", "var(--space)"), this.style.setProperty("--right", "var(--space)")), E$1.on("document-activation-change", (t) => {
      this.toggleAttribute("document-hidden", !t.detail.active);
    }), this.reaction(
      () => [b$1.jdkInfo, b$1.idePluginState],
      () => {
        this.updateIndicator();
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mousedown", this.mouseDownListener), document.removeEventListener("mouseup", this.documentMouseUpListener);
  }
  updateIndicator() {
    if (this.hasAttribute(Ul)) {
      this.setAttribute("indicator", "error");
      return;
    }
    const e = Tl();
    e.status !== "success" ? this.setAttribute("indicator", e.status) : this.removeAttribute("indicator");
  }
  /**
   * To hide overlay while dragging
   * @param visible
   */
  setOverlayVisibility(e) {
    const t = this.shadowRoot.querySelector("vaadin-menu-bar-button").__overlay;
    e ? (t == null ? void 0 : t.style.setProperty("display", "flex"), t == null ? void 0 : t.style.setProperty("visibility", "visible")) : (t == null ? void 0 : t.style.setProperty("display", "none"), t == null ? void 0 : t.style.setProperty("visibility", "invisible"));
  }
  render() {
    var _a2, _b2;
    const e = [
      {
        text: "Vaadin Copilot",
        children: [
          {
            component: v("vaadin-menu-bar-item", {
              label: '<span class="deactivate">Deactivate</span><span class="activate">Activate</span> Copilot',
              hint: Qi.isActivationShortcut() ? ic.toggleCopilot : void 0
            }),
            action: "copilot"
          },
          {
            component: v("vaadin-menu-bar-item", {
              label: "Toggle Command Window",
              hint: ic.toggleCommandWindow,
              style: "toggle-spotlight"
            }),
            action: "spotlight"
          }
        ]
      }
    ];
    return b$1.active && (((_b2 = (_a2 = b$1.idePluginState) == null ? void 0 : _a2.supportedActions) == null ? void 0 : _b2.find((t) => t === "undo")) && (e[0].children = [
      {
        component: v("vaadin-menu-bar-item", {
          label: "Undo",
          hint: ic.undo
        }),
        action: "undo"
      },
      {
        component: v("vaadin-menu-bar-item", {
          label: "Redo",
          hint: ic.redo
        }),
        action: "redo"
      },
      ...e[0].children
    ]), e[0].children = [
      {
        component: v("vaadin-menu-bar-item", {
          label: "Tell us what you think"
          // Label used also in ScreenshotsIT.java
        }),
        action: "feedback"
      },
      {
        component: v("vaadin-menu-bar-item", {
          label: "Show welcome message"
        }),
        action: "welcome"
      },
      {
        component: v("vaadin-menu-bar-item", {
          label: "Show keyboard shortcuts"
        }),
        action: "shortcuts"
      },
      {
        component: "hr"
      },
      ...e[0].children,
      { component: "hr" },
      // Settings sub menu
      {
        text: "Settings",
        children: [
          {
            component: v("vaadin-menu-bar-item", {
              label: "Activation shortcut enabled",
              hint: Qi.isActivationShortcut() ? "✓" : void 0
            }),
            action: "shortcut"
          },
          {
            component: v("vaadin-menu-bar-item", {
              label: "Show animation when activating",
              hint: Qi.isActivationAnimation() ? "✓" : void 0
            }),
            action: "animate-on-activate"
          }
        ]
      }
    ]), e[0].children.unshift(dc()), Ut`
      <vaadin-menu-bar
        class="menu-button"
        .items="${e}"
        @item-selected="${(t) => {
      this.handleMenuItemClick(t.detail.value);
    }}"
        ?open-on-hover=${!this.dragging}
        overlay-class="activation-button-menu">
      </vaadin-menu-bar>
      <div class="monkey-patch-close-on-hover" @mouseenter="${this.closeMenu}"></div>
      <div part="indicator"></div>
    `;
  }
  closeMenu() {
    this.menubar._close();
  }
  handleMenuItemClick(e) {
    if (e.onClick) {
      e.onClick();
      return;
    }
    switch (e.action) {
      case "copilot":
        this.activationBtnClicked();
        break;
      case "spotlight":
        b$1.setSpotlightActive(!b$1.spotlightActive);
        break;
      case "shortcut":
        Qi.setActivationShortcut(!Qi.isActivationShortcut());
        break;
      case "animate-on-activate":
        Qi.setActivationAnimation(!Qi.isActivationAnimation());
        break;
      case "undo":
      case "redo":
        E$1.emit("undoRedo", { undo: e.action === "undo" });
        break;
      case "feedback":
        Q.updatePanel("copilot-feedback-panel", {
          floating: true
        });
        break;
      case "welcome":
        b$1.setWelcomeActive(true), b$1.setSpotlightActive(true);
        break;
      case "shortcuts":
        Q.updatePanel("copilot-shortcuts-panel", {
          floating: true
        });
        break;
    }
  }
  firstUpdated() {
    this.setMenuBarOnClick(), u$1(this.shadowRoot);
  }
};
X([
  v$1("vaadin-menu-bar")
], H.prototype, "menubar", 2);
X([
  g()
], H.prototype, "dragging", 2);
H = X([
  _s("copilot-activation-button")
], H);
var Be = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, C = (e, t, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Je(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (n = (o ? s(t, i, n) : s(n)) || n);
  return o && n && Be(t, i, n), n;
};
const u = "resize-dir", N = "floating-resizing-active";
let P = class extends Ms {
  constructor() {
    super(...arguments), this.panelTag = "", this.dockingItems = [
      {
        component: v("vaadin-context-menu-item", {
          icon: r$1.dockRight,
          label: "Dock right"
        }),
        panel: "right"
      },
      {
        component: v("vaadin-context-menu-item", {
          icon: r$1.dockLeft,
          label: "Dock left"
        }),
        panel: "left"
      },
      {
        component: v("vaadin-context-menu-item", {
          icon: r$1.dockBottom,
          label: "Dock bottom"
        }),
        panel: "bottom"
      }
    ], this.floatingResizingStarted = false, this.resizingInDrawerStarted = false, this.toggling = false, this.rectangleBeforeResizing = null, this.floatingResizeHandlerMouseMoveListener = (e) => {
      var _a2, _b2;
      if (!((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) || this.floatingResizingStarted || !((_b2 = this.panelInfo) == null ? void 0 : _b2.expanded))
        return;
      const t = this.getBoundingClientRect(), i = Math.abs(e.clientX - t.x), o = Math.abs(t.x + t.width - e.clientX), n = Math.abs(e.clientY - t.y), a = Math.abs(t.y + t.height - e.clientY), s = Number.parseInt(
        window.getComputedStyle(this).getPropertyValue("--floating-offset-resize-threshold"),
        10
      );
      let p = "";
      i < s ? n < s ? (p = "nw-resize", this.setAttribute(u, "top left")) : a < s ? (p = "sw-resize", this.setAttribute(u, "bottom left")) : (p = "col-resize", this.setAttribute(u, "left")) : o < s ? n < s ? (p = "ne-resize", this.setAttribute(u, "top right")) : a < s ? (p = "se-resize", this.setAttribute(u, "bottom right")) : (p = "col-resize", this.setAttribute(u, "right")) : a < s ? (p = "row-resize", this.setAttribute(u, "bottom")) : n < s && (p = "row-resize", this.setAttribute(u, "top")), p !== "" ? (this.rectangleBeforeResizing = this.getBoundingClientRect(), this.style.setProperty("--resize-cursor", p)) : (this.style.removeProperty("--resize-cursor"), this.removeAttribute(u)), this.toggleAttribute(N, p !== "");
    }, this.floatingResizingMouseDownListener = (e) => {
      this.hasAttribute(N) && e.button === 0 && (e.stopPropagation(), e.preventDefault(), w.anchorLeftTop(this), this.floatingResizingStarted = true, this.toggleAttribute("resizing", true), Da(() => {
        b$1.sectionPanelResizing = true;
      }));
    }, this.floatingResizingMouseLeaveListener = () => {
      var _a2;
      ((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) && (this.floatingResizingStarted || (this.removeAttribute("resizing"), this.removeAttribute(N), this.removeAttribute("dragging"), this.style.removeProperty("--resize-cursor"), this.removeAttribute(u)));
    }, this.floatingResizingMouseMoveListener = (e) => {
      var _a2;
      if (!((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) || !this.floatingResizingStarted)
        return;
      const t = this.getAttribute(u);
      if (t === null)
        return;
      e.stopPropagation(), e.preventDefault();
      const { clientX: i, clientY: o } = e, n = t.split(" "), a = this.rectangleBeforeResizing;
      if (n.includes("left")) {
        const s = Math.max(0, i);
        this.setFloatingResizeDirectionProps("left", s, a.left - s + a.width);
      }
      if (n.includes("right")) {
        const s = Math.max(0, i);
        this.setFloatingResizeDirectionProps("right", s, s - a.right + a.width);
      }
      if (n.includes("top")) {
        const s = Math.max(0, o), p = a.top - s + a.height;
        this.setFloatingResizeDirectionProps("top", s, void 0, p);
      }
      if (n.includes("bottom")) {
        const s = Math.max(0, o), p = s - a.bottom + a.height;
        this.setFloatingResizeDirectionProps("bottom", s, void 0, p);
      }
    }, this.setFloatingResizeDirectionProps = (e, t, i, o) => {
      i && i > Number.parseFloat(window.getComputedStyle(this).getPropertyValue("--min-width")) && (this.style.setProperty(`--${e}`, `${t}px`), this.style.setProperty("width", `${i}px`));
      const n = window.getComputedStyle(this), a = Number.parseFloat(n.getPropertyValue("--header-height")), s = Number.parseFloat(n.getPropertyValue("--floating-offset-resize-threshold")) / 2;
      o && o > a + s && (this.style.setProperty(`--${e}`, `${t}px`), this.style.setProperty("height", `${o}px`), this.container.style.setProperty("margin-top", "calc(var(--floating-offset-resize-threshold) / 4)"), this.container.style.height = `calc(${o}px - var(--floating-offset-resize-threshold) / 2)`);
    }, this.floatingResizingMouseUpListener = (e) => {
      var _a2;
      if (!this.floatingResizingStarted || !((_a2 = this.panelInfo) == null ? void 0 : _a2.floating))
        return;
      e.stopPropagation(), e.preventDefault(), this.floatingResizingStarted = false, Da(() => {
        b$1.sectionPanelResizing = false;
      });
      const { width: t, height: i } = this.getBoundingClientRect(), { left: o, top: n, bottom: a, right: s } = w.anchor(this), p = window.getComputedStyle(this.container), f = Number.parseInt(p.borderTopWidth, 10), $ = Number.parseInt(p.borderTopWidth, 10);
      Q.updatePanel(this.panelInfo.tag, {
        width: t,
        height: i - (f + $),
        floatingPosition: {
          ...this.panelInfo.floatingPosition,
          left: o,
          top: n,
          bottom: a,
          right: s
        }
      }), this.style.removeProperty("width"), this.style.removeProperty("height"), this.container.style.removeProperty("height"), this.container.style.removeProperty("margin-top"), this.setCssSizePositionProperties(), this.toggleAttribute("dragging", false);
    }, this.transitionEndEventListener = () => {
      this.toggling && (this.toggling = false, w.anchor(this));
    }, this.resizeInDrawerMouseDownListener = (e) => {
      e.button === 0 && (this.resizingInDrawerStarted = true, this.setAttribute("resizing", ""), E$1.emit("user-select", { allowSelection: false }));
    }, this.resizeInDrawerMouseMoveListener = (e) => {
      if (!this.resizingInDrawerStarted)
        return;
      const { y: t } = e;
      e.stopPropagation(), e.preventDefault();
      const i = t - this.getBoundingClientRect().top;
      this.style.setProperty("--section-height", `${i}px`), Q.updatePanel(this.panelInfo.tag, {
        height: i
      });
    }, this.resizeInDrawerMouseUpListener = () => {
      var _a2;
      this.resizingInDrawerStarted && (((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) || (this.resizingInDrawerStarted = false, this.removeAttribute("resizing"), E$1.emit("user-select", { allowSelection: true }), this.style.setProperty("--section-height", `${this.getBoundingClientRect().height}px`)));
    }, this.sectionPanelMouseEnterListener = () => {
      this.hasAttribute(Ul) && (this.removeAttribute(Ul), Q.clearAttention());
    }, this.contentAreaMouseDownListener = () => {
      Q.bringToFront(this.panelInfo.tag);
    }, this.documentMouseUpEventListener = () => {
      var _a2;
      document.removeEventListener("mousemove", this.draggingEventListener), ((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) && (this.toggleAttribute("dragging", false), b$1.setSectionPanelDragging(false));
    }, this.panelHeaderMouseDownEventListener = (e) => {
      e.button === 0 && (Q.bringToFront(this.panelInfo.tag), !this.hasAttribute(u) && (e.target instanceof HTMLButtonElement && e.target.getAttribute("part") === "title-button" ? this.startDraggingDebounce(e) : this.startDragging(e)));
    }, this.panelHeaderMouseUpEventListener = (e) => {
      e.button === 0 && this.startDraggingDebounce.clear();
    }, this.startDragging = (e) => {
      var _a2;
      w.draggingStarts(this, e), document.addEventListener("mousemove", this.draggingEventListener), b$1.setSectionPanelDragging(true), ((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) ? this.toggleAttribute("dragging", true) : this.parentElement.sectionPanelDraggingStarted(this, e), e.preventDefault(), e.stopPropagation();
    }, this.startDraggingDebounce = Pl(this.startDragging, 200), this.draggingEventListener = (e) => {
      var _a2, _b2;
      const t = w.dragging(this, e);
      if (((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) && ((_b2 = this.panelInfo) == null ? void 0 : _b2.floatingPosition)) {
        e.preventDefault();
        const { left: i, top: o, bottom: n, right: a } = t;
        Q.updatePanel(this.panelInfo.tag, {
          floatingPosition: {
            ...this.panelInfo.floatingPosition,
            left: i,
            top: o,
            bottom: n,
            right: a
          }
        });
      }
    }, this.setCssSizePositionProperties = () => {
      var _a2;
      const e = Q.getPanelByTag(this.panelTag);
      if (e && (e.height !== void 0 && (((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) || e.panel === "left" || e.panel === "right" ? this.style.setProperty("--section-height", `${e.height}px`) : this.style.removeProperty("--section-height")), e.width !== void 0 && (e.floating || e.panel === "bottom" ? this.style.setProperty("--section-width", `${e.width}px`) : this.style.removeProperty("--section-width")), e.floating && e.floatingPosition && !this.toggling)) {
        const { left: t, top: i, bottom: o, right: n } = e.floatingPosition;
        this.style.setProperty("--left", t !== void 0 ? `${t}px` : "auto"), this.style.setProperty("--top", i !== void 0 ? `${i}px` : "auto"), this.style.setProperty("--bottom", o !== void 0 ? `${o}px` : ""), this.style.setProperty("--right", n !== void 0 ? `${n}px` : "");
      }
    }, this.renderPopupButton = () => {
      if (!this.panelInfo)
        return O;
      let e;
      return this.panelInfo.panel === void 0 ? e = "Close the popup" : e = this.panelInfo.floating ? `Dock ${this.panelInfo.header} to ${this.panelInfo.panel}` : `Open ${this.panelInfo.header} as a popup`, Ut`
      <vaadin-context-menu .items=${this.dockingItems} @item-selected="${this.changeDockingPanel}">
        <button
          part="popup-button"
          @click="${(t) => this.changePanelFloating(t)}"
          @mousedown="${(t) => t.stopPropagation()}"
          title="${e}"
          aria-label=${e}>
          ${this.getPopupButtonIcon()}
        </button>
      </vaadin-context-menu>
    `;
    }, this.changePanelFloating = (e) => {
      var _a2, _b2, _c;
      if (this.panelInfo)
        if (e.stopPropagation(), oc(this), (_a2 = this.panelInfo) == null ? void 0 : _a2.floating)
          Q.updatePanel(this.panelInfo.tag, { floating: false });
        else {
          let t;
          if (this.panelInfo.floatingPosition)
            t = this.panelInfo.floatingPosition;
          else {
            const { left: n, top: a } = this.getBoundingClientRect();
            t = {
              left: n,
              top: a
            };
          }
          let i = (_b2 = this.panelInfo) == null ? void 0 : _b2.height;
          i === void 0 && this.panelInfo.expanded && (i = Number.parseInt(window.getComputedStyle(this).height, 10)), this.parentElement.forceClose(), Q.updatePanel(this.panelInfo.tag, {
            floating: true,
            expanded: true,
            width: ((_c = this.panelInfo) == null ? void 0 : _c.width) || Number.parseInt(window.getComputedStyle(this).width, 10),
            height: i,
            floatingPosition: t
          }), Q.bringToFront(this.panelInfo.tag);
        }
    }, this.toggleExpand = (e) => {
      this.panelInfo && (e.stopPropagation(), w.anchorLeftTop(this), Q.updatePanel(this.panelInfo.tag, {
        expanded: !this.panelInfo.expanded
      }), this.toggling = true, this.toggleAttribute("expanded", this.panelInfo.expanded));
    };
  }
  static get styles() {
    return [
      le(F),
      ms`
        * {
          box-sizing: border-box;
        }

        :host {
          flex: none;
          display: grid;
          align-content: start;
          grid-template-rows: auto 1fr;
          transition: grid-template-rows var(--duration-2);
          overflow: hidden;
          position: relative;
          --min-width: 160px;
          --resize-div-size: 10px;
          --header-height: 37px;
          --content-height: calc(var(--section-height) - var(--header-height));
          --content-width: var(--content-width, 100%);
          --floating-border-width: 1px;
          --floating-offset-resize-threshold: 8px;
          cursor: var(--cursor, var(--resize-cursor, default));
        }

        :host(:not([expanded])) {
          grid-template-rows: auto 0fr;
          --content-height: 0px !important;
        }

        [part='header'] {
          align-items: center;
          color: var(--color-high-contrast);
          display: flex;
          flex: none;
          font: var(--font-small-bold);
          justify-content: space-between;
          min-width: 100%;
          user-select: none;
          -webkit-user-select: none;
          width: var(--min-width);
          height: var(--header-height);
        }

        :host([floating]:not([expanded])) [part='header'] {
          --min-width: unset;
        }

        [part='header'] {
          border-bottom: 1px solid var(--border-color);
        }

        :host([floating]) [part='header'] {
          transition: border-color var(--duration-2);
        }

        :host([floating]:not([expanded])) [part='header'] {
          border-color: transparent;
        }

        [part='title'] {
          flex: auto;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        [part='content'] {
          height: var(--content-height);
          overflow: auto;
          transition:
            height var(--duration-2),
            width var(--duration-2),
            opacity var(--duration-2),
            visibility calc(var(--duration-2) * 2);
        }

        [part='drawer-resize'] {
          resize: vertical;
          cursor: row-resize;
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 10px;
        }

        :host([floating]) [part='drawer-resize'] {
          display: none;
        }

        :host(:not([expanded])) [part='drawer-resize'] {
          display: none;
        }

        :host(:not([floating]):not(:last-child)) {
          border-bottom: 1px solid var(--border-color);
        }

        :host(:not([expanded])) [part='content'] {
          opacity: 0;
          visibility: hidden;
        }

        :host([floating]:not([expanded])) [part='content'] {
          width: 0;
          height: 0;
        }

        :host(:not([expanded])) [part='content'][style*='height'] {
          height: 0 !important;
        }

        :host(:not([expanded])) [part='content'][style*='width'] {
          width: 0 !important;
        }

        :host([floating]) {
          position: fixed;
          min-width: 0;
          min-height: 0;
          z-index: calc(var(--z-index-floating-panel) + var(--z-index-focus, 0));
          top: clamp(0px, var(--top), calc(100vh - var(--section-height, var(--header-height)) * 0.5));
          left: clamp(calc(var(--section-width) * -0.5), var(--left), calc(100vw - var(--section-width) * 0.5));
          bottom: clamp(
            calc(var(--section-height, var(--header-height)) * -0.5),
            var(--bottom),
            calc(100vh - var(--section-height, var(--header-height)) * 0.5)
          );
          right: clamp(calc(var(--section-width) * -0.5), var(--right), calc(100vw - var(--section-width) * 0.5));
          width: var(--section-width);
          overflow: visible;
        }
        :host([floating]) [part='container'] {
          background: var(--surface);
          border: var(--floating-border-width) solid var(--surface-border-color);
          -webkit-backdrop-filter: var(--surface-backdrop-filter);
          backdrop-filter: var(--surface-backdrop-filter);
          border-radius: var(--radius-2);
          margin: auto;
          box-shadow: var(--surface-box-shadow-2);
          overflow: hidden;
        }
        :host([floating][expanded]) [part='container'] {
          height: calc(100% - var(--floating-offset-resize-threshold) / 2);
          width: calc(100% - var(--floating-offset-resize-threshold) / 2);
        }

        :host([floating]:not([expanded])) {
          width: unset;
        }

        :host([floating]) .drag-handle {
          cursor: var(--resize-cursor, move);
        }

        :host([floating][expanded]) [part='content'] {
          min-width: var(--min-width);
          min-height: 0;
          max-height: 85vh;
          max-width: 90vw;
          width: var(--content-width);
        }

        /* :hover for Firefox, :active for others */

        :host([floating][expanded]) [part='content']:is(:hover, :active) {
          transition: none;
        }

        [part='header'] button {
          align-items: center;
          appearance: none;
          background: transparent;
          border: 0px;
          border-radius: var(--radius-1);
          color: var(--color);
          display: flex;
          flex: 0 0 auto;
          height: 2.25rem;
          justify-content: center;
          padding: 0px;
          width: 16px;
          margin-left: 10px;
          margin-right: 10px;
        }

        div.actions {
          width: auto;
        }

        :host(:not([expanded])) div.actions {
          display: none;
        }

        [part='title'] button {
          color: var(--color-high-contrast);
          font: var(--font-xsmall-strong);
          width: auto;
        }

        [part='header'] button:hover {
          color: var(--color-high-contrast);
        }

        [part='header'] button:focus-visible {
          outline: 2px solid var(--blue-500);
          outline-offset: -2px;
        }

        [part='header'] button svg {
          display: block;
        }

        [part='header'] .actions:empty {
          display: none;
        }

        ::slotted(*) {
          box-sizing: border-box;
          display: block;
          height: var(--content-height, var(--default-content-height, 100%));
          /* padding: var(--space-150); */
          width: 100%;
        }

        :host(:not([floating])) ::slotted(*) {
          /* padding-top: var(--space-50); */
        }
        /*workaround for outline to have a explicit height while floating by default. 
          may be removed after https://github.com/vaadin/web-components/issues/7620 is solved
        */
        :host([floating][expanded][paneltag='copilot-outline-panel']) {
          --grid-default-height: 400px;
        }

        :host([dragging]) {
          opacity: 0.4;
        }

        :host([dragging]) [part='content'] {
          pointer-events: none;
        }

        :host([attention-required]) {
          --pulse-animation-duration: 2s;
          --pulse-first-color: var(--red-500);
          --pulse-second-color: var(--red-800);
          --pulse-size: 12px;
          animation: pulse 2s infinite;
        }

        :host([resizing]),
        :host([resizing]) [part='content'] {
          transition: none;
        }
        :host([resizing]) [part='content'] {
          height: 100%;
        }

        :host([hiding-while-drag-and-drop]) {
          display: none;
        }

        // dragging in drawer

        :host(:not([floating])) .drag-handle {
          cursor: grab;
        }

        :host(:not([floating])[dragging]) .drag-handle {
          cursor: grabbing;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "region"), this.reaction(
      () => Q.getAttentionRequiredPanelConfiguration(),
      () => {
        const e = Q.getAttentionRequiredPanelConfiguration();
        this.toggleAttribute(Ul, (e == null ? void 0 : e.tag) === this.panelTag && (e == null ? void 0 : e.floating));
      }
    ), this.addEventListener("mouseenter", this.sectionPanelMouseEnterListener), document.addEventListener("mousemove", this.resizeInDrawerMouseMoveListener), document.addEventListener("mouseup", this.resizeInDrawerMouseUpListener), this.reaction(
      () => b$1.operationInProgress,
      () => {
        requestAnimationFrame(() => {
          var _a2;
          this.toggleAttribute(
            "hiding-while-drag-and-drop",
            b$1.operationInProgress === Ql.DragAndDrop && ((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) && !this.panelInfo.showWhileDragging
          );
        });
      }
    ), this.reaction(
      () => Q.floatingPanelsZIndexOrder,
      () => {
        this.style.setProperty("--z-index-focus", `${Q.getFloatingPanelZIndex(this.panelTag)}`);
      },
      { fireImmediately: true }
    ), this.addEventListener("transitionend", this.transitionEndEventListener), this.addEventListener("mousemove", this.floatingResizeHandlerMouseMoveListener), this.addEventListener("mousedown", this.floatingResizingMouseDownListener), this.addEventListener("mouseleave", this.floatingResizingMouseLeaveListener), document.addEventListener("mousemove", this.floatingResizingMouseMoveListener), document.addEventListener("mouseup", this.floatingResizingMouseUpListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mouseenter", this.sectionPanelMouseEnterListener), this.drawerResizeElement.removeEventListener("mousedown", this.resizeInDrawerMouseDownListener), document.removeEventListener("mousemove", this.resizeInDrawerMouseMoveListener), document.removeEventListener("mouseup", this.resizeInDrawerMouseUpListener), this.removeEventListener("mousemove", this.floatingResizeHandlerMouseMoveListener), this.removeEventListener("mousedown", this.floatingResizingMouseDownListener), document.removeEventListener("mousemove", this.floatingResizingMouseMoveListener), document.removeEventListener("mouseup", this.floatingResizingMouseUpListener);
  }
  willUpdate(e) {
    var _a2;
    super.willUpdate(e), e.has("panelTag") && (this.panelInfo = Q.getPanelByTag(this.panelTag), this.setAttribute("aria-labelledby", this.panelInfo.tag.concat("-title"))), this.toggleAttribute("floating", (_a2 = this.panelInfo) == null ? void 0 : _a2.floating);
  }
  updated(e) {
    super.updated(e), this.setCssSizePositionProperties();
  }
  firstUpdated(e) {
    var _a2, _b2;
    super.firstUpdated(e), document.addEventListener("mouseup", this.documentMouseUpEventListener), this.headerDraggableArea.addEventListener("mousedown", this.panelHeaderMouseDownEventListener), this.headerDraggableArea.addEventListener("mouseup", this.panelHeaderMouseUpEventListener), this.toggleAttribute("expanded", (_a2 = this.panelInfo) == null ? void 0 : _a2.expanded), this.toggleAttribute("individual", ((_b2 = this.panelInfo) == null ? void 0 : _b2.individual) ?? false), ac(this), this.setCssSizePositionProperties(), this.contentArea.addEventListener("mousedown", this.contentAreaMouseDownListener), this.drawerResizeElement.addEventListener("mousedown", this.resizeInDrawerMouseDownListener), u$1(this.shadowRoot);
  }
  render() {
    return this.panelInfo ? Ut`
      <div part="container">
        <div part="header" class="drag-handle">
          ${this.panelInfo.expandable !== false ? Ut` <button
                part="toggle-button"
                @mousedown="${(e) => e.stopPropagation()}"
                @click="${(e) => this.toggleExpand(e)}"
                aria-expanded="${this.panelInfo.expanded}"
                aria-controls="content"
                aria-label="Expand ${this.panelInfo.header}">
                ${this.panelInfo.expanded ? r$1.chevronDown : r$1.chevronRight}
              </button>` : O}
          <h2 id="${this.panelInfo.tag}-title" part="title">
            <button
              part="title-button"
              @dblclick="${(e) => {
      this.toggleExpand(e), this.startDraggingDebounce.clear();
    }}">
              ${this.panelInfo.header}
            </button>
          </h2>
          <div class="actions" @mousedown="${(e) => e.stopPropagation()}">${this.renderActions()}</div>
          ${this.renderHelpButton()} ${this.renderPopupButton()}
        </div>
        <div part="content" id="content">
          <slot name="content"></slot>
        </div>
        <div part="drawer-resize"></div>
      </div>
    ` : O;
  }
  getPopupButtonIcon() {
    return this.panelInfo ? this.panelInfo.panel === void 0 ? r$1.close : this.panelInfo.floating ? this.panelInfo.panel === "bottom" ? r$1.dockBottom : this.panelInfo.panel === "left" ? r$1.dockLeft : this.panelInfo.panel === "right" ? r$1.dockRight : O : r$1.popup : O;
  }
  renderHelpButton() {
    var _a2;
    return ((_a2 = this.panelInfo) == null ? void 0 : _a2.helpUrl) ? Ut` <button
      @click="${() => window.open(this.panelInfo.helpUrl, "_blank")}"
      @mousedown="${(e) => e.stopPropagation()}"
      title="More information about ${this.panelInfo.header}"
      aria-label="More information about ${this.panelInfo.header}">
      ${r$1.help}
    </button>` : O;
  }
  renderActions() {
    var _a2;
    if (!((_a2 = this.panelInfo) == null ? void 0 : _a2.actionsTag))
      return O;
    const e = this.panelInfo.actionsTag;
    return Bs(`<${e}></${e}>`);
  }
  changeDockingPanel(e) {
    var _a2;
    const t = e.detail.value.panel;
    if (((_a2 = this.panelInfo) == null ? void 0 : _a2.panel) !== t) {
      const i = Q.panels.filter((o) => o.panel === t).map((o) => o.panelOrder).sort((o, n) => n - o)[0];
      oc(this), Q.updatePanel(this.panelInfo.tag, { panel: t, panelOrder: i + 1 });
    }
    this.panelInfo.floating && this.changePanelFloating(e);
  }
};
C([
  h()
], P.prototype, "panelTag", 2);
C([
  v$1(".drag-handle")
], P.prototype, "headerDraggableArea", 2);
C([
  v$1("#content")
], P.prototype, "contentArea", 2);
C([
  v$1('[part="drawer-resize"]')
], P.prototype, "drawerResizeElement", 2);
C([
  v$1('[part="container"]')
], P.prototype, "container", 2);
C([
  g()
], P.prototype, "dockingItems", 2);
P = C([
  _s("copilot-section-panel-wrapper")
], P);
E$1.on("undoRedo", (e) => {
  const i = { files: e.detail.files ?? z(), uiId: V$1() }, o = e.detail.undo ? "copilot-plugin-undo" : "copilot-plugin-redo";
  tn(e.detail.undo ? "undo" : "redo"), E$1.send(o, i);
});
var Ve = (e, t, i, o) => {
  for (var n = t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (n = s(n) || n);
  return n;
};
let K = class extends Ms {
  static get styles() {
    return [
      le(Ol),
      le(wl),
      ms`
        :host {
          --lumo-secondary-text-color: var(--dev-tools-text-color);
          --lumo-contrast-80pct: var(--dev-tools-text-color-emphasis);
          --lumo-contrast-60pct: var(--dev-tools-text-color-secondary);
          --lumo-font-size-m: 14px;

          position: fixed;
          bottom: 2.5rem;
          right: 0rem;
          visibility: visible; /* Always show, even if copilot is off */
          user-select: none;
          z-index: 10000;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);

          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        @supports (backdrop-filter: blur(1px)) {
          .notification-tray div.message {
            backdrop-filter: blur(8px);
          }

          .notification-tray div.message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 40rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          word-break: break-all;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          max-width: 100%;
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
          display: flex;
          flex-direction: column;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }
      `
    ];
  }
  render() {
    return Ut`<div class="notification-tray">
      ${b$1.notifications.map((e) => this.renderNotification(e))}
    </div>`;
  }
  renderNotification(e) {
    return Ut`
      <div
        class="message ${e.type} ${e.animatingOut ? "animate-out" : ""} ${e.details || e.link ? "has-details" : ""}"
        data-testid="message">
        <div class="message-content">
          <div class="message-heading">${e.message}</div>
          <div class="message-details" ?hidden="${!e.details && !e.link}">
            ${Wl(e.details)}
            ${e.link ? Ut`<a class="ahreflike" href="${e.link}" target="_blank">Learn more</a>` : ""}
          </div>
          ${e.dismissId ? Ut`<div
                class="persist ${e.dontShowAgain ? "on" : "off"}"
                @click=${() => {
      this.toggleDontShowAgain(e);
    }}>
                ${Fe(e)}
              </div>` : ""}
        </div>
        <div
          class="dismiss-message"
          @click=${(t) => {
      m(e), t.stopPropagation();
    }}>
          Dismiss
        </div>
      </div>
    `;
  }
  toggleDontShowAgain(e) {
    e.dontShowAgain = !e.dontShowAgain, this.requestUpdate();
  }
};
K = Ve([
  _s("copilot-notifications-container")
], K);
function Fe(e) {
  return e.dontShowAgainMessage ? e.dontShowAgainMessage : "Do not show this again";
}
N$1({
  type: nn.WARNING,
  message: "Development Mode",
  details: "This application is running in development mode.",
  dismissId: "devmode"
});
const se = Pl(() => {
  E$1.emit("component-tree-updated", {});
});
E$1.on("vite-after-update", () => {
  se();
});
const Z = (_b = (_a = window == null ? void 0 : window.Vaadin) == null ? void 0 : _a.connectionState) == null ? void 0 : _b.stateChangeListeners;
Z ? Z.add((e, t) => {
  e === "loading" && t === "connected" && b$1.active && se();
}) : console.warn("Unable to add listener for connection state changes");
E$1.on("copilot-plugin-state", (e) => {
  b$1.setIdePluginState(e.detail), e.detail.active && tn("plugin-active", { pluginVersion: e.detail.version, ide: e.detail.ide }), e.preventDefault();
});
E$1.on("copilot-ide-notification", (e) => {
  N$1({
    type: nn[e.detail.type],
    message: e.detail.message,
    dismissId: e.detail.dismissId
  }), e.preventDefault();
});
