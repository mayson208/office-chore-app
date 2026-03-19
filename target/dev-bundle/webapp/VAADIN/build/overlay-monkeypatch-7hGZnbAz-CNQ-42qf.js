import { x as xe } from "./indexhtml-Co3Evg6-.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const d = (e, a, n) => (n.configurable = true, n.enumerable = true, Reflect.decorate && typeof a != "object" && Object.defineProperty(e, a, n), n);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(e, a) {
  return (n, o, b) => {
    const i = (l) => {
      var _a;
      return ((_a = l.renderRoot) == null ? void 0 : _a.querySelector(e)) ?? null;
    };
    return d(n, o, { get() {
      return i(this);
    } });
  };
}
function u(e) {
  e.querySelectorAll(
    "vaadin-context-menu, vaadin-menu-bar, vaadin-menu-bar-submenu, vaadin-select, vaadin-combo-box, vaadin-tooltip, vaadin-dialog, vaadin-multi-select-combo-box"
  ).forEach((a) => {
    var _a, _b, _c;
    ((_a = a == null ? void 0 : a.$) == null ? void 0 : _a.comboBox) && (a = a.$.comboBox);
    let n = (_b = a.shadowRoot) == null ? void 0 : _b.querySelector(
      `${a.localName}-overlay, ${a.localName}-submenu, vaadin-menu-bar-overlay`
    );
    (n == null ? void 0 : n.localName) === "vaadin-menu-bar-submenu" && (n = n.shadowRoot.querySelector("vaadin-menu-bar-overlay")), n ? n._attachOverlay = t.bind(n) : ((_c = a.$) == null ? void 0 : _c.overlay) && (a.$.overlay._attachOverlay = t.bind(a.$.overlay));
  });
}
function r() {
  return document.querySelector(`${xe}main`).shadowRoot;
}
const m = () => Array.from(r().children).filter((a) => a._hasOverlayStackMixin && !a.hasAttribute("closing")).sort((a, n) => a.__zIndex - n.__zIndex || 0), s = (e) => e === m().pop();
function t() {
  const e = this;
  e._placeholder = document.createComment("vaadin-overlay-placeholder"), e.parentNode.insertBefore(e._placeholder, e), r().appendChild(e), e.hasOwnProperty("_last") || Object.defineProperty(e, "_last", {
    // Only returns odd die sides
    get() {
      return s(this);
    }
  }), e.bringToFront(), requestAnimationFrame(() => u(e));
}
export {
  u,
  v
};
