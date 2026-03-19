import { a2 as On, a3 as Ci } from "./indexhtml-Co3Evg6-.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = { attribute: true, type: String, converter: On, reflect: false, hasChanged: Ci }, d = (t = l, o, e) => {
  const { kind: a, metadata: s } = e;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), n.set(e.name, t), a === "accessor") {
    const { name: r } = e;
    return { set(i) {
      const c = o.get.call(this);
      o.set.call(this, i), this.requestUpdate(r, c, t);
    }, init(i) {
      return i !== void 0 && this.P(r, void 0, t), i;
    } };
  }
  if (a === "setter") {
    const { name: r } = e;
    return function(i) {
      const c = this[r];
      o.call(this, i), this.requestUpdate(r, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function h(t) {
  return (o, e) => typeof e == "object" ? d(t, o, e) : ((a, s, n) => {
    const r = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, r ? { ...a, wrapped: true } : a), r ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(t, o, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function g(t) {
  return h({ ...t, state: true, attribute: false });
}
export {
  g,
  h
};
