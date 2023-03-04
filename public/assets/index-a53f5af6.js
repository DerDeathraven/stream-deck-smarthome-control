(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const r = {};
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerpolicy && (r.referrerPolicy = i.referrerpolicy),
      i.crossorigin === "use-credentials"
        ? (r.credentials = "include")
        : i.crossorigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const r = n(i);
    fetch(i.href, r);
  }
})();
function Cs(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let i = 0; i < s.length; i++) n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function Tn(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        i = oe(s) ? xo(s) : Tn(s);
      if (i) for (const r in i) t[r] = i[r];
    }
    return t;
  } else {
    if (oe(e)) return e;
    if (te(e)) return e;
  }
}
const bo = /;(?![^(]*\))/g,
  vo = /:([^]+)/,
  wo = /\/\*.*?\*\//gs;
function xo(e) {
  const t = {};
  return (
    e
      .replace(wo, "")
      .split(bo)
      .forEach((n) => {
        if (n) {
          const s = n.split(vo);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function Fe(e) {
  let t = "";
  if (oe(e)) t = e;
  else if (P(e))
    for (let n = 0; n < e.length; n++) {
      const s = Fe(e[n]);
      s && (t += s + " ");
    }
  else if (te(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Co =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Eo = Cs(Co);
function Wi(e) {
  return !!e || e === "";
}
const Es = (e) =>
    oe(e)
      ? e
      : e == null
      ? ""
      : P(e) || (te(e) && (e.toString === Yi || !N(e.toString)))
      ? JSON.stringify(e, Vi, 2)
      : String(e),
  Vi = (e, t) =>
    t && t.__v_isRef
      ? Vi(e, t.value)
      : xt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, i]) => ((n[`${s} =>`] = i), n),
            {}
          ),
        }
      : zi(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : te(t) && !P(t) && !Ji(t)
      ? String(t)
      : t,
  ee = {},
  wt = [],
  Ne = () => {},
  So = () => !1,
  Ao = /^on[^a-z]/,
  Bn = (e) => Ao.test(e),
  Ss = (e) => e.startsWith("onUpdate:"),
  he = Object.assign,
  As = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  To = Object.prototype.hasOwnProperty,
  W = (e, t) => To.call(e, t),
  P = Array.isArray,
  xt = (e) => On(e) === "[object Map]",
  zi = (e) => On(e) === "[object Set]",
  N = (e) => typeof e == "function",
  oe = (e) => typeof e == "string",
  Ts = (e) => typeof e == "symbol",
  te = (e) => e !== null && typeof e == "object",
  Bs = (e) => te(e) && N(e.then) && N(e.catch),
  Yi = Object.prototype.toString,
  On = (e) => Yi.call(e),
  Bo = (e) => On(e).slice(8, -1),
  Ji = (e) => On(e) === "[object Object]",
  Os = (e) =>
    oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  dn = Cs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  kn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Oo = /-(\w)/g,
  qe = kn((e) => e.replace(Oo, (t, n) => (n ? n.toUpperCase() : ""))),
  ko = /\B([A-Z])/g,
  kt = kn((e) => e.replace(ko, "-$1").toLowerCase()),
  Rn = kn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Yn = kn((e) => (e ? `on${Rn(e)}` : "")),
  Kt = (e, t) => !Object.is(e, t),
  pn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  xn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  es = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Ro = (e) => {
    const t = oe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let si;
const Io = () =>
  si ||
  (si =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let xe;
class Qi {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = xe),
      !t && xe && (this.index = (xe.scopes || (xe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = xe;
      try {
        return (xe = this), t();
      } finally {
        xe = n;
      }
    }
  }
  on() {
    xe = this;
  }
  off() {
    xe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i &&
          i !== this &&
          ((this.parent.scopes[this.index] = i), (i.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Xi(e) {
  return new Qi(e);
}
function Po(e, t = xe) {
  t && t.active && t.effects.push(e);
}
function Zi() {
  return xe;
}
function Fo(e) {
  xe && xe.cleanups.push(e);
}
const ks = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Gi = (e) => (e.w & nt) > 0,
  er = (e) => (e.n & nt) > 0,
  No = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= nt;
  },
  Lo = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const i = t[s];
        Gi(i) && !er(i) ? i.delete(e) : (t[n++] = i),
          (i.w &= ~nt),
          (i.n &= ~nt);
      }
      t.length = n;
    }
  },
  Cn = new WeakMap();
let Mt = 0,
  nt = 1;
const ts = 30;
let Pe;
const dt = Symbol(""),
  ns = Symbol("");
class Rs {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Po(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Pe,
      n = Ge;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Pe),
        (Pe = this),
        (Ge = !0),
        (nt = 1 << ++Mt),
        Mt <= ts ? No(this) : ii(this),
        this.fn()
      );
    } finally {
      Mt <= ts && Lo(this),
        (nt = 1 << --Mt),
        (Pe = this.parent),
        (Ge = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Pe === this
      ? (this.deferStop = !0)
      : this.active &&
        (ii(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ii(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Ge = !0;
const tr = [];
function Rt() {
  tr.push(Ge), (Ge = !1);
}
function It() {
  const e = tr.pop();
  Ge = e === void 0 ? !0 : e;
}
function ve(e, t, n) {
  if (Ge && Pe) {
    let s = Cn.get(e);
    s || Cn.set(e, (s = new Map()));
    let i = s.get(n);
    i || s.set(n, (i = ks())), nr(i);
  }
}
function nr(e, t) {
  let n = !1;
  Mt <= ts ? er(e) || ((e.n |= nt), (n = !Gi(e))) : (n = !e.has(Pe)),
    n && (e.add(Pe), Pe.deps.push(e));
}
function Ye(e, t, n, s, i, r) {
  const o = Cn.get(e);
  if (!o) return;
  let c = [];
  if (t === "clear") c = [...o.values()];
  else if (n === "length" && P(e)) {
    const l = Number(s);
    o.forEach((u, d) => {
      (d === "length" || d >= l) && c.push(u);
    });
  } else
    switch ((n !== void 0 && c.push(o.get(n)), t)) {
      case "add":
        P(e)
          ? Os(n) && c.push(o.get("length"))
          : (c.push(o.get(dt)), xt(e) && c.push(o.get(ns)));
        break;
      case "delete":
        P(e) || (c.push(o.get(dt)), xt(e) && c.push(o.get(ns)));
        break;
      case "set":
        xt(e) && c.push(o.get(dt));
        break;
    }
  if (c.length === 1) c[0] && ss(c[0]);
  else {
    const l = [];
    for (const u of c) u && l.push(...u);
    ss(ks(l));
  }
}
function ss(e, t) {
  const n = P(e) ? e : [...e];
  for (const s of n) s.computed && ri(s);
  for (const s of n) s.computed || ri(s);
}
function ri(e, t) {
  (e !== Pe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function $o(e, t) {
  var n;
  return (n = Cn.get(e)) === null || n === void 0 ? void 0 : n.get(t);
}
const Mo = Cs("__proto__,__v_isRef,__isVue"),
  sr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Ts)
  ),
  Do = Is(),
  Ho = Is(!1, !0),
  Uo = Is(!0),
  oi = jo();
function jo() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = U(this);
        for (let r = 0, o = this.length; r < o; r++) ve(s, "get", r + "");
        const i = s[t](...n);
        return i === -1 || i === !1 ? s[t](...n.map(U)) : i;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Rt();
        const s = U(this)[t].apply(this, n);
        return It(), s;
      };
    }),
    e
  );
}
function qo(e) {
  const t = U(this);
  return ve(t, "has", e), t.hasOwnProperty(e);
}
function Is(e = !1, t = !1) {
  return function (s, i, r) {
    if (i === "__v_isReactive") return !e;
    if (i === "__v_isReadonly") return e;
    if (i === "__v_isShallow") return t;
    if (i === "__v_raw" && r === (e ? (t ? rc : lr) : t ? cr : or).get(s))
      return s;
    const o = P(s);
    if (!e) {
      if (o && W(oi, i)) return Reflect.get(oi, i, r);
      if (i === "hasOwnProperty") return qo;
    }
    const c = Reflect.get(s, i, r);
    return (Ts(i) ? sr.has(i) : Mo(i)) || (e || ve(s, "get", i), t)
      ? c
      : ie(c)
      ? o && Os(i)
        ? c
        : c.value
      : te(c)
      ? e
        ? ar(c)
        : Pn(c)
      : c;
  };
}
const Ko = ir(),
  Wo = ir(!0);
function ir(e = !1) {
  return function (n, s, i, r) {
    let o = n[s];
    if (Tt(o) && ie(o) && !ie(i)) return !1;
    if (
      !e &&
      (!En(i) && !Tt(i) && ((o = U(o)), (i = U(i))), !P(n) && ie(o) && !ie(i))
    )
      return (o.value = i), !0;
    const c = P(n) && Os(s) ? Number(s) < n.length : W(n, s),
      l = Reflect.set(n, s, i, r);
    return (
      n === U(r) && (c ? Kt(i, o) && Ye(n, "set", s, i) : Ye(n, "add", s, i)), l
    );
  };
}
function Vo(e, t) {
  const n = W(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ye(e, "delete", t, void 0), s;
}
function zo(e, t) {
  const n = Reflect.has(e, t);
  return (!Ts(t) || !sr.has(t)) && ve(e, "has", t), n;
}
function Yo(e) {
  return ve(e, "iterate", P(e) ? "length" : dt), Reflect.ownKeys(e);
}
const rr = { get: Do, set: Ko, deleteProperty: Vo, has: zo, ownKeys: Yo },
  Jo = {
    get: Uo,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Qo = he({}, rr, { get: Ho, set: Wo }),
  Ps = (e) => e,
  In = (e) => Reflect.getPrototypeOf(e);
function rn(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const i = U(e),
    r = U(t);
  n || (t !== r && ve(i, "get", t), ve(i, "get", r));
  const { has: o } = In(i),
    c = s ? Ps : n ? Ls : Wt;
  if (o.call(i, t)) return c(e.get(t));
  if (o.call(i, r)) return c(e.get(r));
  e !== i && e.get(t);
}
function on(e, t = !1) {
  const n = this.__v_raw,
    s = U(n),
    i = U(e);
  return (
    t || (e !== i && ve(s, "has", e), ve(s, "has", i)),
    e === i ? n.has(e) : n.has(e) || n.has(i)
  );
}
function cn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ve(U(e), "iterate", dt), Reflect.get(e, "size", e)
  );
}
function ci(e) {
  e = U(e);
  const t = U(this);
  return In(t).has.call(t, e) || (t.add(e), Ye(t, "add", e, e)), this;
}
function li(e, t) {
  t = U(t);
  const n = U(this),
    { has: s, get: i } = In(n);
  let r = s.call(n, e);
  r || ((e = U(e)), (r = s.call(n, e)));
  const o = i.call(n, e);
  return (
    n.set(e, t), r ? Kt(t, o) && Ye(n, "set", e, t) : Ye(n, "add", e, t), this
  );
}
function ai(e) {
  const t = U(this),
    { has: n, get: s } = In(t);
  let i = n.call(t, e);
  i || ((e = U(e)), (i = n.call(t, e))), s && s.call(t, e);
  const r = t.delete(e);
  return i && Ye(t, "delete", e, void 0), r;
}
function fi() {
  const e = U(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ye(e, "clear", void 0, void 0), n;
}
function ln(e, t) {
  return function (s, i) {
    const r = this,
      o = r.__v_raw,
      c = U(o),
      l = t ? Ps : e ? Ls : Wt;
    return (
      !e && ve(c, "iterate", dt), o.forEach((u, d) => s.call(i, l(u), l(d), r))
    );
  };
}
function an(e, t, n) {
  return function (...s) {
    const i = this.__v_raw,
      r = U(i),
      o = xt(r),
      c = e === "entries" || (e === Symbol.iterator && o),
      l = e === "keys" && o,
      u = i[e](...s),
      d = n ? Ps : t ? Ls : Wt;
    return (
      !t && ve(r, "iterate", l ? ns : dt),
      {
        next() {
          const { value: h, done: g } = u.next();
          return g
            ? { value: h, done: g }
            : { value: c ? [d(h[0]), d(h[1])] : d(h), done: g };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Qe(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Xo() {
  const e = {
      get(r) {
        return rn(this, r);
      },
      get size() {
        return cn(this);
      },
      has: on,
      add: ci,
      set: li,
      delete: ai,
      clear: fi,
      forEach: ln(!1, !1),
    },
    t = {
      get(r) {
        return rn(this, r, !1, !0);
      },
      get size() {
        return cn(this);
      },
      has: on,
      add: ci,
      set: li,
      delete: ai,
      clear: fi,
      forEach: ln(!1, !0),
    },
    n = {
      get(r) {
        return rn(this, r, !0);
      },
      get size() {
        return cn(this, !0);
      },
      has(r) {
        return on.call(this, r, !0);
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: ln(!0, !1),
    },
    s = {
      get(r) {
        return rn(this, r, !0, !0);
      },
      get size() {
        return cn(this, !0);
      },
      has(r) {
        return on.call(this, r, !0);
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: ln(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      (e[r] = an(r, !1, !1)),
        (n[r] = an(r, !0, !1)),
        (t[r] = an(r, !1, !0)),
        (s[r] = an(r, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [Zo, Go, ec, tc] = Xo();
function Fs(e, t) {
  const n = t ? (e ? tc : ec) : e ? Go : Zo;
  return (s, i, r) =>
    i === "__v_isReactive"
      ? !e
      : i === "__v_isReadonly"
      ? e
      : i === "__v_raw"
      ? s
      : Reflect.get(W(n, i) && i in s ? n : s, i, r);
}
const nc = { get: Fs(!1, !1) },
  sc = { get: Fs(!1, !0) },
  ic = { get: Fs(!0, !1) },
  or = new WeakMap(),
  cr = new WeakMap(),
  lr = new WeakMap(),
  rc = new WeakMap();
function oc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function cc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oc(Bo(e));
}
function Pn(e) {
  return Tt(e) ? e : Ns(e, !1, rr, nc, or);
}
function lc(e) {
  return Ns(e, !1, Qo, sc, cr);
}
function ar(e) {
  return Ns(e, !0, Jo, ic, lr);
}
function Ns(e, t, n, s, i) {
  if (!te(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = i.get(e);
  if (r) return r;
  const o = cc(e);
  if (o === 0) return e;
  const c = new Proxy(e, o === 2 ? s : n);
  return i.set(e, c), c;
}
function ze(e) {
  return Tt(e) ? ze(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Tt(e) {
  return !!(e && e.__v_isReadonly);
}
function En(e) {
  return !!(e && e.__v_isShallow);
}
function fr(e) {
  return ze(e) || Tt(e);
}
function U(e) {
  const t = e && e.__v_raw;
  return t ? U(t) : e;
}
function Bt(e) {
  return xn(e, "__v_skip", !0), e;
}
const Wt = (e) => (te(e) ? Pn(e) : e),
  Ls = (e) => (te(e) ? ar(e) : e);
function ur(e) {
  Ge && Pe && ((e = U(e)), nr(e.dep || (e.dep = ks())));
}
function hr(e, t) {
  e = U(e);
  const n = e.dep;
  n && ss(n);
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function Vt(e) {
  return ac(e, !1);
}
function ac(e, t) {
  return ie(e) ? e : new fc(e, t);
}
class fc {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : U(t)),
      (this._value = n ? t : Wt(t));
  }
  get value() {
    return ur(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || En(t) || Tt(t);
    (t = n ? t : U(t)),
      Kt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Wt(t)), hr(this));
  }
}
function V(e) {
  return ie(e) ? e.value : e;
}
const uc = {
  get: (e, t, n) => V(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return ie(i) && !ie(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function dr(e) {
  return ze(e) ? e : new Proxy(e, uc);
}
function hc(e) {
  const t = P(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = pr(e, n);
  return t;
}
class dc {
  constructor(t, n, s) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return $o(U(this._object), this._key);
  }
}
function pr(e, t, n) {
  const s = e[t];
  return ie(s) ? s : new dc(e, t, n);
}
var gr;
class pc {
  constructor(t, n, s, i) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[gr] = !1),
      (this._dirty = !0),
      (this.effect = new Rs(t, () => {
        this._dirty || ((this._dirty = !0), hr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = U(this);
    return (
      ur(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
gr = "__v_isReadonly";
function gc(e, t, n = !1) {
  let s, i;
  const r = N(e);
  return (
    r ? ((s = e), (i = Ne)) : ((s = e.get), (i = e.set)),
    new pc(s, i, r || !i, n)
  );
}
function et(e, t, n, s) {
  let i;
  try {
    i = s ? e(...s) : e();
  } catch (r) {
    Zt(r, t, n);
  }
  return i;
}
function Oe(e, t, n, s) {
  if (N(e)) {
    const r = et(e, t, n, s);
    return (
      r &&
        Bs(r) &&
        r.catch((o) => {
          Zt(o, t, n);
        }),
      r
    );
  }
  const i = [];
  for (let r = 0; r < e.length; r++) i.push(Oe(e[r], t, n, s));
  return i;
}
function Zt(e, t, n, s = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy,
      c = n;
    for (; r; ) {
      const u = r.ec;
      if (u) {
        for (let d = 0; d < u.length; d++) if (u[d](e, o, c) === !1) return;
      }
      r = r.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      et(l, null, 10, [e, o, c]);
      return;
    }
  }
  mc(e, n, i, s);
}
function mc(e, t, n, s = !0) {
  console.error(e);
}
let zt = !1,
  is = !1;
const ue = [];
let He = 0;
const Ct = [];
let Ve = null,
  ft = 0;
const mr = Promise.resolve();
let $s = null;
function _r(e) {
  const t = $s || mr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _c(e) {
  let t = He + 1,
    n = ue.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Yt(ue[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function Ms(e) {
  (!ue.length || !ue.includes(e, zt && e.allowRecurse ? He + 1 : He)) &&
    (e.id == null ? ue.push(e) : ue.splice(_c(e.id), 0, e), yr());
}
function yr() {
  !zt && !is && ((is = !0), ($s = mr.then(wr)));
}
function yc(e) {
  const t = ue.indexOf(e);
  t > He && ue.splice(t, 1);
}
function br(e) {
  P(e)
    ? Ct.push(...e)
    : (!Ve || !Ve.includes(e, e.allowRecurse ? ft + 1 : ft)) && Ct.push(e),
    yr();
}
function ui(e, t = zt ? He + 1 : 0) {
  for (; t < ue.length; t++) {
    const n = ue[t];
    n && n.pre && (ue.splice(t, 1), t--, n());
  }
}
function vr(e) {
  if (Ct.length) {
    const t = [...new Set(Ct)];
    if (((Ct.length = 0), Ve)) {
      Ve.push(...t);
      return;
    }
    for (Ve = t, Ve.sort((n, s) => Yt(n) - Yt(s)), ft = 0; ft < Ve.length; ft++)
      Ve[ft]();
    (Ve = null), (ft = 0);
  }
}
const Yt = (e) => (e.id == null ? 1 / 0 : e.id),
  bc = (e, t) => {
    const n = Yt(e) - Yt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function wr(e) {
  (is = !1), (zt = !0), ue.sort(bc);
  const t = Ne;
  try {
    for (He = 0; He < ue.length; He++) {
      const n = ue[He];
      n && n.active !== !1 && et(n, null, 14);
    }
  } finally {
    (He = 0),
      (ue.length = 0),
      vr(),
      (zt = !1),
      ($s = null),
      (ue.length || Ct.length) && wr();
  }
}
function vc(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ee;
  let i = n;
  const r = t.startsWith("update:"),
    o = r && t.slice(7);
  if (o && o in s) {
    const d = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: h, trim: g } = s[d] || ee;
    g && (i = n.map((S) => (oe(S) ? S.trim() : S))), h && (i = n.map(es));
  }
  let c,
    l = s[(c = Yn(t))] || s[(c = Yn(qe(t)))];
  !l && r && (l = s[(c = Yn(kt(t)))]), l && Oe(l, e, 6, i);
  const u = s[c + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), Oe(u, e, 6, i);
  }
}
function xr(e, t, n = !1) {
  const s = t.emitsCache,
    i = s.get(e);
  if (i !== void 0) return i;
  const r = e.emits;
  let o = {},
    c = !1;
  if (!N(e)) {
    const l = (u) => {
      const d = xr(u, t, !0);
      d && ((c = !0), he(o, d));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !r && !c
    ? (te(e) && s.set(e, null), null)
    : (P(r) ? r.forEach((l) => (o[l] = null)) : he(o, r),
      te(e) && s.set(e, o),
      o);
}
function Fn(e, t) {
  return !e || !Bn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      W(e, t[0].toLowerCase() + t.slice(1)) || W(e, kt(t)) || W(e, t));
}
let Ce = null,
  Nn = null;
function Sn(e) {
  const t = Ce;
  return (Ce = e), (Nn = (e && e.type.__scopeId) || null), t;
}
function Pt(e) {
  Nn = e;
}
function Ft() {
  Nn = null;
}
function Cr(e, t = Ce, n) {
  if (!t || e._n) return e;
  const s = (...i) => {
    s._d && xi(-1);
    const r = Sn(t);
    let o;
    try {
      o = e(...i);
    } finally {
      Sn(r), s._d && xi(1);
    }
    return o;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Jn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    props: r,
    propsOptions: [o],
    slots: c,
    attrs: l,
    emit: u,
    render: d,
    renderCache: h,
    data: g,
    setupState: S,
    ctx: R,
    inheritAttrs: T,
  } = e;
  let z, K;
  const B = Sn(e);
  try {
    if (n.shapeFlag & 4) {
      const D = i || s;
      (z = Ie(d.call(D, D, h, r, S, g, R))), (K = l);
    } else {
      const D = t;
      (z = Ie(
        D.length > 1 ? D(r, { attrs: l, slots: c, emit: u }) : D(r, null)
      )),
        (K = t.props ? l : xc(l));
    }
  } catch (D) {
    (jt.length = 0), Zt(D, e, 1), (z = ae(Ee));
  }
  let x = z;
  if (K && T !== !1) {
    const D = Object.keys(K),
      { shapeFlag: L } = x;
    D.length && L & 7 && (o && D.some(Ss) && (K = Cc(K, o)), (x = st(x, K)));
  }
  return (
    n.dirs && ((x = st(x)), (x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (x.transition = n.transition),
    (z = x),
    Sn(B),
    z
  );
}
function wc(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    if (jr(s)) {
      if (s.type !== Ee || s.children === "v-if") {
        if (t) return;
        t = s;
      }
    } else return;
  }
  return t;
}
const xc = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Bn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Cc = (e, t) => {
    const n = {};
    for (const s in e) (!Ss(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Ec(e, t, n) {
  const { props: s, children: i, component: r } = e,
    { props: o, children: c, patchFlag: l } = t,
    u = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return s ? hi(s, o, u) : !!o;
    if (l & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const g = d[h];
        if (o[g] !== s[g] && !Fn(u, g)) return !0;
      }
    }
  } else
    return (i || c) && (!c || !c.$stable)
      ? !0
      : s === o
      ? !1
      : s
      ? o
        ? hi(s, o, u)
        : !0
      : !!o;
  return !1;
}
function hi(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !Fn(n, r)) return !0;
  }
  return !1;
}
function Ds({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Sc = (e) => e.__isSuspense,
  Ac = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, n, s, i, r, o, c, l, u) {
      e == null ? Bc(t, n, s, i, r, o, c, l, u) : Oc(e, t, n, s, i, o, c, l, u);
    },
    hydrate: kc,
    create: Hs,
    normalize: Rc,
  },
  Tc = Ac;
function Jt(e, t) {
  const n = e.props && e.props[t];
  N(n) && n();
}
function Bc(e, t, n, s, i, r, o, c, l) {
  const {
      p: u,
      o: { createElement: d },
    } = l,
    h = d("div"),
    g = (e.suspense = Hs(e, i, s, t, h, n, r, o, c, l));
  u(null, (g.pendingBranch = e.ssContent), h, null, s, g, r, o),
    g.deps > 0
      ? (Jt(e, "onPending"),
        Jt(e, "onFallback"),
        u(null, e.ssFallback, t, n, s, null, r, o),
        Et(g, e.ssFallback))
      : g.resolve();
}
function Oc(e, t, n, s, i, r, o, c, { p: l, um: u, o: { createElement: d } }) {
  const h = (t.suspense = e.suspense);
  (h.vnode = t), (t.el = e.el);
  const g = t.ssContent,
    S = t.ssFallback,
    { activeBranch: R, pendingBranch: T, isInFallback: z, isHydrating: K } = h;
  if (T)
    (h.pendingBranch = g),
      Ue(g, T)
        ? (l(T, g, h.hiddenContainer, null, i, h, r, o, c),
          h.deps <= 0
            ? h.resolve()
            : z && (l(R, S, n, s, i, null, r, o, c), Et(h, S)))
        : (h.pendingId++,
          K ? ((h.isHydrating = !1), (h.activeBranch = T)) : u(T, i, h),
          (h.deps = 0),
          (h.effects.length = 0),
          (h.hiddenContainer = d("div")),
          z
            ? (l(null, g, h.hiddenContainer, null, i, h, r, o, c),
              h.deps <= 0
                ? h.resolve()
                : (l(R, S, n, s, i, null, r, o, c), Et(h, S)))
            : R && Ue(g, R)
            ? (l(R, g, n, s, i, h, r, o, c), h.resolve(!0))
            : (l(null, g, h.hiddenContainer, null, i, h, r, o, c),
              h.deps <= 0 && h.resolve()));
  else if (R && Ue(g, R)) l(R, g, n, s, i, h, r, o, c), Et(h, g);
  else if (
    (Jt(t, "onPending"),
    (h.pendingBranch = g),
    h.pendingId++,
    l(null, g, h.hiddenContainer, null, i, h, r, o, c),
    h.deps <= 0)
  )
    h.resolve();
  else {
    const { timeout: B, pendingId: x } = h;
    B > 0
      ? setTimeout(() => {
          h.pendingId === x && h.fallback(S);
        }, B)
      : B === 0 && h.fallback(S);
  }
}
function Hs(e, t, n, s, i, r, o, c, l, u, d = !1) {
  const {
      p: h,
      m: g,
      um: S,
      n: R,
      o: { parentNode: T, remove: z },
    } = u,
    K = e.props ? Ro(e.props.timeout) : void 0,
    B = {
      vnode: e,
      parent: t,
      parentComponent: n,
      isSVG: o,
      container: s,
      hiddenContainer: i,
      anchor: r,
      deps: 0,
      pendingId: 0,
      timeout: typeof K == "number" ? K : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: d,
      isUnmounted: !1,
      effects: [],
      resolve(x = !1) {
        const {
          vnode: D,
          activeBranch: L,
          pendingBranch: X,
          pendingId: $,
          effects: E,
          parentComponent: j,
          container: q,
        } = B;
        if (B.isHydrating) B.isHydrating = !1;
        else if (!x) {
          const ye = L && X.transition && X.transition.mode === "out-in";
          ye &&
            (L.transition.afterLeave = () => {
              $ === B.pendingId && g(X, q, pe, 0);
            });
          let { anchor: pe } = B;
          L && ((pe = R(L)), S(L, j, B, !0)), ye || g(X, q, pe, 0);
        }
        Et(B, X), (B.pendingBranch = null), (B.isInFallback = !1);
        let Y = B.parent,
          de = !1;
        for (; Y; ) {
          if (Y.pendingBranch) {
            Y.effects.push(...E), (de = !0);
            break;
          }
          Y = Y.parent;
        }
        de || br(E), (B.effects = []), Jt(D, "onResolve");
      },
      fallback(x) {
        if (!B.pendingBranch) return;
        const {
          vnode: D,
          activeBranch: L,
          parentComponent: X,
          container: $,
          isSVG: E,
        } = B;
        Jt(D, "onFallback");
        const j = R(L),
          q = () => {
            B.isInFallback && (h(null, x, $, j, X, null, E, c, l), Et(B, x));
          },
          Y = x.transition && x.transition.mode === "out-in";
        Y && (L.transition.afterLeave = q),
          (B.isInFallback = !0),
          S(L, X, null, !0),
          Y || q();
      },
      move(x, D, L) {
        B.activeBranch && g(B.activeBranch, x, D, L), (B.container = x);
      },
      next() {
        return B.activeBranch && R(B.activeBranch);
      },
      registerDep(x, D) {
        const L = !!B.pendingBranch;
        L && B.deps++;
        const X = x.vnode.el;
        x.asyncDep
          .catch(($) => {
            Zt($, x, 0);
          })
          .then(($) => {
            if (x.isUnmounted || B.isUnmounted || B.pendingId !== x.suspenseId)
              return;
            x.asyncResolved = !0;
            const { vnode: E } = x;
            hs(x, $, !1), X && (E.el = X);
            const j = !X && x.subTree.el;
            D(x, E, T(X || x.subTree.el), X ? null : R(x.subTree), B, o, l),
              j && z(j),
              Ds(x, E.el),
              L && --B.deps === 0 && B.resolve();
          });
      },
      unmount(x, D) {
        (B.isUnmounted = !0),
          B.activeBranch && S(B.activeBranch, n, x, D),
          B.pendingBranch && S(B.pendingBranch, n, x, D);
      },
    };
  return B;
}
function kc(e, t, n, s, i, r, o, c, l) {
  const u = (t.suspense = Hs(
      t,
      s,
      n,
      e.parentNode,
      document.createElement("div"),
      null,
      i,
      r,
      o,
      c,
      !0
    )),
    d = l(e, (u.pendingBranch = t.ssContent), n, u, r, o);
  return u.deps === 0 && u.resolve(), d;
}
function Rc(e) {
  const { shapeFlag: t, children: n } = e,
    s = t & 32;
  (e.ssContent = di(s ? n.default : n)),
    (e.ssFallback = s ? di(n.fallback) : ae(Ee));
}
function di(e) {
  let t;
  if (N(e)) {
    const n = Ot && e._c;
    n && ((e._d = !1), Q()), (e = e()), n && ((e._d = !0), (t = Be), Hr());
  }
  return (
    P(e) && (e = wc(e)),
    (e = Ie(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)),
    e
  );
}
function Ic(e, t) {
  t && t.pendingBranch
    ? P(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : br(e);
}
function Et(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: s } = e,
    i = (n.el = t.el);
  s && s.subTree === n && ((s.vnode.el = i), Ds(s, i));
}
function Pc(e, t) {
  if (re) {
    let n = re.provides;
    const s = re.parent && re.parent.provides;
    s === n && (n = re.provides = Object.create(s)), (n[e] = t);
  }
}
function Ht(e, t, n = !1) {
  const s = re || Ce;
  if (s) {
    const i =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return n && N(t) ? t.call(s.proxy) : t;
  }
}
function Fc(e, t) {
  return Us(e, null, { flush: "post" });
}
const fn = {};
function gn(e, t, n) {
  return Us(e, t, n);
}
function Us(
  e,
  t,
  { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: o } = ee
) {
  const c = Zi() === (re == null ? void 0 : re.scope) ? re : null;
  let l,
    u = !1,
    d = !1;
  if (
    (ie(e)
      ? ((l = () => e.value), (u = En(e)))
      : ze(e)
      ? ((l = () => e), (s = !0))
      : P(e)
      ? ((d = !0),
        (u = e.some((x) => ze(x) || En(x))),
        (l = () =>
          e.map((x) => {
            if (ie(x)) return x.value;
            if (ze(x)) return ht(x);
            if (N(x)) return et(x, c, 2);
          })))
      : N(e)
      ? t
        ? (l = () => et(e, c, 2))
        : (l = () => {
            if (!(c && c.isUnmounted)) return h && h(), Oe(e, c, 3, [g]);
          })
      : (l = Ne),
    t && s)
  ) {
    const x = l;
    l = () => ht(x());
  }
  let h,
    g = (x) => {
      h = K.onStop = () => {
        et(x, c, 4);
      };
    },
    S;
  if (Xt)
    if (
      ((g = Ne),
      t ? n && Oe(t, c, 3, [l(), d ? [] : void 0, g]) : l(),
      i === "sync")
    ) {
      const x = Tl();
      S = x.__watcherHandles || (x.__watcherHandles = []);
    } else return Ne;
  let R = d ? new Array(e.length).fill(fn) : fn;
  const T = () => {
    if (K.active)
      if (t) {
        const x = K.run();
        (s || u || (d ? x.some((D, L) => Kt(D, R[L])) : Kt(x, R))) &&
          (h && h(),
          Oe(t, c, 3, [x, R === fn ? void 0 : d && R[0] === fn ? [] : R, g]),
          (R = x));
      } else K.run();
  };
  T.allowRecurse = !!t;
  let z;
  i === "sync"
    ? (z = T)
    : i === "post"
    ? (z = () => be(T, c && c.suspense))
    : ((T.pre = !0), c && (T.id = c.uid), (z = () => Ms(T)));
  const K = new Rs(l, z);
  t
    ? n
      ? T()
      : (R = K.run())
    : i === "post"
    ? be(K.run.bind(K), c && c.suspense)
    : K.run();
  const B = () => {
    K.stop(), c && c.scope && As(c.scope.effects, K);
  };
  return S && S.push(B), B;
}
function Nc(e, t, n) {
  const s = this.proxy,
    i = oe(e) ? (e.includes(".") ? Er(s, e) : () => s[e]) : e.bind(s, s);
  let r;
  N(t) ? (r = t) : ((r = t.handler), (n = t));
  const o = re;
  it(this);
  const c = Us(i, r.bind(s), n);
  return o ? it(o) : tt(), c;
}
function Er(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++) s = s[n[i]];
    return s;
  };
}
function ht(e, t) {
  if (!te(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ie(e))) ht(e.value, t);
  else if (P(e)) for (let n = 0; n < e.length; n++) ht(e[n], t);
  else if (zi(e) || xt(e))
    e.forEach((n) => {
      ht(n, t);
    });
  else if (Ji(e)) for (const n in e) ht(e[n], t);
  return e;
}
function Lc() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Mn(() => {
      e.isMounted = !0;
    }),
    Br(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ae = [Function, Array],
  $c = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ae,
      onEnter: Ae,
      onAfterEnter: Ae,
      onEnterCancelled: Ae,
      onBeforeLeave: Ae,
      onLeave: Ae,
      onAfterLeave: Ae,
      onLeaveCancelled: Ae,
      onBeforeAppear: Ae,
      onAppear: Ae,
      onAfterAppear: Ae,
      onAppearCancelled: Ae,
    },
    setup(e, { slots: t }) {
      const n = Un(),
        s = Lc();
      let i;
      return () => {
        const r = t.default && Ar(t.default(), !0);
        if (!r || !r.length) return;
        let o = r[0];
        if (r.length > 1) {
          for (const T of r)
            if (T.type !== Ee) {
              o = T;
              break;
            }
        }
        const c = U(e),
          { mode: l } = c;
        if (s.isLeaving) return Qn(o);
        const u = pi(o);
        if (!u) return Qn(o);
        const d = rs(u, c, s, n);
        os(u, d);
        const h = n.subTree,
          g = h && pi(h);
        let S = !1;
        const { getTransitionKey: R } = u.type;
        if (R) {
          const T = R();
          i === void 0 ? (i = T) : T !== i && ((i = T), (S = !0));
        }
        if (g && g.type !== Ee && (!Ue(u, g) || S)) {
          const T = rs(g, c, s, n);
          if ((os(g, T), l === "out-in"))
            return (
              (s.isLeaving = !0),
              (T.afterLeave = () => {
                (s.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Qn(o)
            );
          l === "in-out" &&
            u.type !== Ee &&
            (T.delayLeave = (z, K, B) => {
              const x = Sr(s, g);
              (x[String(g.key)] = g),
                (z._leaveCb = () => {
                  K(), (z._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = B);
            });
        }
        return o;
      };
    },
  },
  Mc = $c;
function Sr(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function rs(e, t, n, s) {
  const {
      appear: i,
      mode: r,
      persisted: o = !1,
      onBeforeEnter: c,
      onEnter: l,
      onAfterEnter: u,
      onEnterCancelled: d,
      onBeforeLeave: h,
      onLeave: g,
      onAfterLeave: S,
      onLeaveCancelled: R,
      onBeforeAppear: T,
      onAppear: z,
      onAfterAppear: K,
      onAppearCancelled: B,
    } = t,
    x = String(e.key),
    D = Sr(n, e),
    L = (E, j) => {
      E && Oe(E, s, 9, j);
    },
    X = (E, j) => {
      const q = j[1];
      L(E, j),
        P(E) ? E.every((Y) => Y.length <= 1) && q() : E.length <= 1 && q();
    },
    $ = {
      mode: r,
      persisted: o,
      beforeEnter(E) {
        let j = c;
        if (!n.isMounted)
          if (i) j = T || c;
          else return;
        E._leaveCb && E._leaveCb(!0);
        const q = D[x];
        q && Ue(e, q) && q.el._leaveCb && q.el._leaveCb(), L(j, [E]);
      },
      enter(E) {
        let j = l,
          q = u,
          Y = d;
        if (!n.isMounted)
          if (i) (j = z || l), (q = K || u), (Y = B || d);
          else return;
        let de = !1;
        const ye = (E._enterCb = (pe) => {
          de ||
            ((de = !0),
            pe ? L(Y, [E]) : L(q, [E]),
            $.delayedLeave && $.delayedLeave(),
            (E._enterCb = void 0));
        });
        j ? X(j, [E, ye]) : ye();
      },
      leave(E, j) {
        const q = String(e.key);
        if ((E._enterCb && E._enterCb(!0), n.isUnmounting)) return j();
        L(h, [E]);
        let Y = !1;
        const de = (E._leaveCb = (ye) => {
          Y ||
            ((Y = !0),
            j(),
            ye ? L(R, [E]) : L(S, [E]),
            (E._leaveCb = void 0),
            D[q] === e && delete D[q]);
        });
        (D[q] = e), g ? X(g, [E, de]) : de();
      },
      clone(E) {
        return rs(E, t, n, s);
      },
    };
  return $;
}
function Qn(e) {
  if (Ln(e)) return (e = st(e)), (e.children = null), e;
}
function pi(e) {
  return Ln(e) ? (e.children ? e.children[0] : void 0) : e;
}
function os(e, t) {
  e.shapeFlag & 6 && e.component
    ? os(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Ar(e, t = !1, n) {
  let s = [],
    i = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const c = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === fe
      ? (o.patchFlag & 128 && i++, (s = s.concat(Ar(o.children, t, c))))
      : (t || o.type !== Ee) && s.push(c != null ? st(o, { key: c }) : o);
  }
  if (i > 1) for (let r = 0; r < s.length; r++) s[r].patchFlag = -2;
  return s;
}
function Le(e) {
  return N(e) ? { setup: e, name: e.name } : e;
}
const mn = (e) => !!e.type.__asyncLoader,
  Ln = (e) => e.type.__isKeepAlive;
function Dc(e, t) {
  Tr(e, "a", t);
}
function Hc(e, t) {
  Tr(e, "da", t);
}
function Tr(e, t, n = re) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let i = n;
      for (; i; ) {
        if (i.isDeactivated) return;
        i = i.parent;
      }
      return e();
    });
  if (($n(t, s, n), n)) {
    let i = n.parent;
    for (; i && i.parent; )
      Ln(i.parent.vnode) && Uc(s, t, n, i), (i = i.parent);
  }
}
function Uc(e, t, n, s) {
  const i = $n(t, e, s, !0);
  js(() => {
    As(s[t], i);
  }, n);
}
function $n(e, t, n = re, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          Rt(), it(n);
          const c = Oe(t, n, e, o);
          return tt(), It(), c;
        });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const Je =
    (e) =>
    (t, n = re) =>
      (!Xt || e === "sp") && $n(e, (...s) => t(...s), n),
  jc = Je("bm"),
  Mn = Je("m"),
  qc = Je("bu"),
  Kc = Je("u"),
  Br = Je("bum"),
  js = Je("um"),
  Wc = Je("sp"),
  Vc = Je("rtg"),
  zc = Je("rtc");
function Yc(e, t = re) {
  $n("ec", e, t);
}
function St(e, t) {
  const n = Ce;
  if (n === null) return e;
  const s = jn(n) || n.proxy,
    i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, c, l, u = ee] = t[r];
    o &&
      (N(o) && (o = { mounted: o, updated: o }),
      o.deep && ht(c),
      i.push({
        dir: o,
        instance: s,
        value: c,
        oldValue: void 0,
        arg: l,
        modifiers: u,
      }));
  }
  return e;
}
function ct(e, t, n, s) {
  const i = e.dirs,
    r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const c = i[o];
    r && (c.oldValue = r[o].value);
    let l = c.dir[s];
    l && (Rt(), Oe(l, n, 8, [e.el, c, e, t]), It());
  }
}
const Or = "components",
  kr = Symbol();
function Rr(e) {
  return oe(e) ? Jc(Or, e, !1) || e : e || kr;
}
function Jc(e, t, n = !0, s = !1) {
  const i = Ce || re;
  if (i) {
    const r = i.type;
    if (e === Or) {
      const c = El(r, !1);
      if (c && (c === t || c === qe(t) || c === Rn(qe(t)))) return r;
    }
    const o = gi(i[e] || r[e], t) || gi(i.appContext[e], t);
    return !o && s ? r : o;
  }
}
function gi(e, t) {
  return e && (e[t] || e[qe(t)] || e[Rn(qe(t))]);
}
function Qt(e, t, n, s) {
  let i;
  const r = n && n[s];
  if (P(e) || oe(e)) {
    i = new Array(e.length);
    for (let o = 0, c = e.length; o < c; o++)
      i[o] = t(e[o], o, void 0, r && r[o]);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let o = 0; o < e; o++) i[o] = t(o + 1, o, void 0, r && r[o]);
  } else if (te(e))
    if (e[Symbol.iterator])
      i = Array.from(e, (o, c) => t(o, c, void 0, r && r[c]));
    else {
      const o = Object.keys(e);
      i = new Array(o.length);
      for (let c = 0, l = o.length; c < l; c++) {
        const u = o[c];
        i[c] = t(e[u], u, c, r && r[c]);
      }
    }
  else i = [];
  return n && (n[s] = i), i;
}
const cs = (e) => (e ? (Wr(e) ? jn(e) || e.proxy : cs(e.parent)) : null),
  Ut = he(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => cs(e.parent),
    $root: (e) => cs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => qs(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ms(e.update)),
    $nextTick: (e) => e.n || (e.n = _r.bind(e.proxy)),
    $watch: (e) => Nc.bind(e),
  }),
  Xn = (e, t) => e !== ee && !e.__isScriptSetup && W(e, t),
  Qc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: i,
        props: r,
        accessCache: o,
        type: c,
        appContext: l,
      } = e;
      let u;
      if (t[0] !== "$") {
        const S = o[t];
        if (S !== void 0)
          switch (S) {
            case 1:
              return s[t];
            case 2:
              return i[t];
            case 4:
              return n[t];
            case 3:
              return r[t];
          }
        else {
          if (Xn(s, t)) return (o[t] = 1), s[t];
          if (i !== ee && W(i, t)) return (o[t] = 2), i[t];
          if ((u = e.propsOptions[0]) && W(u, t)) return (o[t] = 3), r[t];
          if (n !== ee && W(n, t)) return (o[t] = 4), n[t];
          ls && (o[t] = 0);
        }
      }
      const d = Ut[t];
      let h, g;
      if (d) return t === "$attrs" && ve(e, "get", t), d(e);
      if ((h = c.__cssModules) && (h = h[t])) return h;
      if (n !== ee && W(n, t)) return (o[t] = 4), n[t];
      if (((g = l.config.globalProperties), W(g, t))) return g[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: i, ctx: r } = e;
      return Xn(i, t)
        ? ((i[t] = n), !0)
        : s !== ee && W(s, t)
        ? ((s[t] = n), !0)
        : W(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((r[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: i,
          propsOptions: r,
        },
      },
      o
    ) {
      let c;
      return (
        !!n[o] ||
        (e !== ee && W(e, o)) ||
        Xn(t, o) ||
        ((c = r[0]) && W(c, o)) ||
        W(s, o) ||
        W(Ut, o) ||
        W(i.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : W(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let ls = !0;
function Xc(e) {
  const t = qs(e),
    n = e.proxy,
    s = e.ctx;
  (ls = !1), t.beforeCreate && mi(t.beforeCreate, e, "bc");
  const {
    data: i,
    computed: r,
    methods: o,
    watch: c,
    provide: l,
    inject: u,
    created: d,
    beforeMount: h,
    mounted: g,
    beforeUpdate: S,
    updated: R,
    activated: T,
    deactivated: z,
    beforeDestroy: K,
    beforeUnmount: B,
    destroyed: x,
    unmounted: D,
    render: L,
    renderTracked: X,
    renderTriggered: $,
    errorCaptured: E,
    serverPrefetch: j,
    expose: q,
    inheritAttrs: Y,
    components: de,
    directives: ye,
    filters: pe,
  } = t;
  if ((u && Zc(u, s, null, e.appContext.config.unwrapInjectedRef), o))
    for (const ne in o) {
      const Z = o[ne];
      N(Z) && (s[ne] = Z.bind(n));
    }
  if (i) {
    const ne = i.call(n, n);
    te(ne) && (e.data = Pn(ne));
  }
  if (((ls = !0), r))
    for (const ne in r) {
      const Z = r[ne],
        rt = N(Z) ? Z.bind(n, n) : N(Z.get) ? Z.get.bind(n, n) : Ne,
        nn = !N(Z) && N(Z.set) ? Z.set.bind(n) : Ne,
        ot = pt({ get: rt, set: nn });
      Object.defineProperty(s, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => ot.value,
        set: ($e) => (ot.value = $e),
      });
    }
  if (c) for (const ne in c) Ir(c[ne], s, n, ne);
  if (l) {
    const ne = N(l) ? l.call(n) : l;
    Reflect.ownKeys(ne).forEach((Z) => {
      Pc(Z, ne[Z]);
    });
  }
  d && mi(d, e, "c");
  function me(ne, Z) {
    P(Z) ? Z.forEach((rt) => ne(rt.bind(n))) : Z && ne(Z.bind(n));
  }
  if (
    (me(jc, h),
    me(Mn, g),
    me(qc, S),
    me(Kc, R),
    me(Dc, T),
    me(Hc, z),
    me(Yc, E),
    me(zc, X),
    me(Vc, $),
    me(Br, B),
    me(js, D),
    me(Wc, j),
    P(q))
  )
    if (q.length) {
      const ne = e.exposed || (e.exposed = {});
      q.forEach((Z) => {
        Object.defineProperty(ne, Z, {
          get: () => n[Z],
          set: (rt) => (n[Z] = rt),
        });
      });
    } else e.exposed || (e.exposed = {});
  L && e.render === Ne && (e.render = L),
    Y != null && (e.inheritAttrs = Y),
    de && (e.components = de),
    ye && (e.directives = ye);
}
function Zc(e, t, n = Ne, s = !1) {
  P(e) && (e = as(e));
  for (const i in e) {
    const r = e[i];
    let o;
    te(r)
      ? "default" in r
        ? (o = Ht(r.from || i, r.default, !0))
        : (o = Ht(r.from || i))
      : (o = Ht(r)),
      ie(o) && s
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (c) => (o.value = c),
          })
        : (t[i] = o);
  }
}
function mi(e, t, n) {
  Oe(P(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ir(e, t, n, s) {
  const i = s.includes(".") ? Er(n, s) : () => n[s];
  if (oe(e)) {
    const r = t[e];
    N(r) && gn(i, r);
  } else if (N(e)) gn(i, e.bind(n));
  else if (te(e))
    if (P(e)) e.forEach((r) => Ir(r, t, n, s));
    else {
      const r = N(e.handler) ? e.handler.bind(n) : t[e.handler];
      N(r) && gn(i, r, e);
    }
}
function qs(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: i,
      optionsCache: r,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    c = r.get(t);
  let l;
  return (
    c
      ? (l = c)
      : !i.length && !n && !s
      ? (l = t)
      : ((l = {}), i.length && i.forEach((u) => An(l, u, o, !0)), An(l, t, o)),
    te(t) && r.set(t, l),
    l
  );
}
function An(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && An(e, r, n, !0), i && i.forEach((o) => An(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = Gc[o] || (n && n[o]);
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const Gc = {
  data: _i,
  props: at,
  emits: at,
  methods: at,
  computed: at,
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  components: at,
  directives: at,
  watch: tl,
  provide: _i,
  inject: el,
};
function _i(e, t) {
  return t
    ? e
      ? function () {
          return he(
            N(e) ? e.call(this, this) : e,
            N(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function el(e, t) {
  return at(as(e), as(t));
}
function as(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function at(e, t) {
  return e ? he(he(Object.create(null), e), t) : t;
}
function tl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = he(Object.create(null), e);
  for (const s in t) n[s] = _e(e[s], t[s]);
  return n;
}
function nl(e, t, n, s = !1) {
  const i = {},
    r = {};
  xn(r, Hn, 1), (e.propsDefaults = Object.create(null)), Pr(e, t, i, r);
  for (const o in e.propsOptions[0]) o in i || (i[o] = void 0);
  n ? (e.props = s ? i : lc(i)) : e.type.props ? (e.props = i) : (e.props = r),
    (e.attrs = r);
}
function sl(e, t, n, s) {
  const {
      props: i,
      attrs: r,
      vnode: { patchFlag: o },
    } = e,
    c = U(i),
    [l] = e.propsOptions;
  let u = !1;
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        let g = d[h];
        if (Fn(e.emitsOptions, g)) continue;
        const S = t[g];
        if (l)
          if (W(r, g)) S !== r[g] && ((r[g] = S), (u = !0));
          else {
            const R = qe(g);
            i[R] = fs(l, c, R, S, e, !1);
          }
        else S !== r[g] && ((r[g] = S), (u = !0));
      }
    }
  } else {
    Pr(e, t, i, r) && (u = !0);
    let d;
    for (const h in c)
      (!t || (!W(t, h) && ((d = kt(h)) === h || !W(t, d)))) &&
        (l
          ? n &&
            (n[h] !== void 0 || n[d] !== void 0) &&
            (i[h] = fs(l, c, h, void 0, e, !0))
          : delete i[h]);
    if (r !== c) for (const h in r) (!t || !W(t, h)) && (delete r[h], (u = !0));
  }
  u && Ye(e, "set", "$attrs");
}
function Pr(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1,
    c;
  if (t)
    for (let l in t) {
      if (dn(l)) continue;
      const u = t[l];
      let d;
      i && W(i, (d = qe(l)))
        ? !r || !r.includes(d)
          ? (n[d] = u)
          : ((c || (c = {}))[d] = u)
        : Fn(e.emitsOptions, l) ||
          ((!(l in s) || u !== s[l]) && ((s[l] = u), (o = !0)));
    }
  if (r) {
    const l = U(n),
      u = c || ee;
    for (let d = 0; d < r.length; d++) {
      const h = r[d];
      n[h] = fs(i, l, h, u[h], e, !W(u, h));
    }
  }
  return o;
}
function fs(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const c = W(o, "default");
    if (c && s === void 0) {
      const l = o.default;
      if (o.type !== Function && N(l)) {
        const { propsDefaults: u } = i;
        n in u ? (s = u[n]) : (it(i), (s = u[n] = l.call(null, t)), tt());
      } else s = l;
    }
    o[0] &&
      (r && !c ? (s = !1) : o[1] && (s === "" || s === kt(n)) && (s = !0));
  }
  return s;
}
function Fr(e, t, n = !1) {
  const s = t.propsCache,
    i = s.get(e);
  if (i) return i;
  const r = e.props,
    o = {},
    c = [];
  let l = !1;
  if (!N(e)) {
    const d = (h) => {
      l = !0;
      const [g, S] = Fr(h, t, !0);
      he(o, g), S && c.push(...S);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!r && !l) return te(e) && s.set(e, wt), wt;
  if (P(r))
    for (let d = 0; d < r.length; d++) {
      const h = qe(r[d]);
      yi(h) && (o[h] = ee);
    }
  else if (r)
    for (const d in r) {
      const h = qe(d);
      if (yi(h)) {
        const g = r[d],
          S = (o[h] = P(g) || N(g) ? { type: g } : Object.assign({}, g));
        if (S) {
          const R = wi(Boolean, S.type),
            T = wi(String, S.type);
          (S[0] = R > -1),
            (S[1] = T < 0 || R < T),
            (R > -1 || W(S, "default")) && c.push(h);
        }
      }
    }
  const u = [o, c];
  return te(e) && s.set(e, u), u;
}
function yi(e) {
  return e[0] !== "$";
}
function bi(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function vi(e, t) {
  return bi(e) === bi(t);
}
function wi(e, t) {
  return P(t) ? t.findIndex((n) => vi(n, e)) : N(t) && vi(t, e) ? 0 : -1;
}
const Nr = (e) => e[0] === "_" || e === "$stable",
  Ks = (e) => (P(e) ? e.map(Ie) : [Ie(e)]),
  il = (e, t, n) => {
    if (t._n) return t;
    const s = Cr((...i) => Ks(t(...i)), n);
    return (s._c = !1), s;
  },
  Lr = (e, t, n) => {
    const s = e._ctx;
    for (const i in e) {
      if (Nr(i)) continue;
      const r = e[i];
      if (N(r)) t[i] = il(i, r, s);
      else if (r != null) {
        const o = Ks(r);
        t[i] = () => o;
      }
    }
  },
  $r = (e, t) => {
    const n = Ks(t);
    e.slots.default = () => n;
  },
  rl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = U(t)), xn(t, "_", n)) : Lr(t, (e.slots = {}));
    } else (e.slots = {}), t && $r(e, t);
    xn(e.slots, Hn, 1);
  },
  ol = (e, t, n) => {
    const { vnode: s, slots: i } = e;
    let r = !0,
      o = ee;
    if (s.shapeFlag & 32) {
      const c = t._;
      c
        ? n && c === 1
          ? (r = !1)
          : (he(i, t), !n && c === 1 && delete i._)
        : ((r = !t.$stable), Lr(t, i)),
        (o = t);
    } else t && ($r(e, t), (o = { default: 1 }));
    if (r) for (const c in i) !Nr(c) && !(c in o) && delete i[c];
  };
function Mr() {
  return {
    app: null,
    config: {
      isNativeTag: So,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let cl = 0;
function ll(e, t) {
  return function (s, i = null) {
    N(s) || (s = Object.assign({}, s)), i != null && !te(i) && (i = null);
    const r = Mr(),
      o = new Set();
    let c = !1;
    const l = (r.app = {
      _uid: cl++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Bl,
      get config() {
        return r.config;
      },
      set config(u) {},
      use(u, ...d) {
        return (
          o.has(u) ||
            (u && N(u.install)
              ? (o.add(u), u.install(l, ...d))
              : N(u) && (o.add(u), u(l, ...d))),
          l
        );
      },
      mixin(u) {
        return r.mixins.includes(u) || r.mixins.push(u), l;
      },
      component(u, d) {
        return d ? ((r.components[u] = d), l) : r.components[u];
      },
      directive(u, d) {
        return d ? ((r.directives[u] = d), l) : r.directives[u];
      },
      mount(u, d, h) {
        if (!c) {
          const g = ae(s, i);
          return (
            (g.appContext = r),
            d && t ? t(g, u) : e(g, u, h),
            (c = !0),
            (l._container = u),
            (u.__vue_app__ = l),
            jn(g.component) || g.component.proxy
          );
        }
      },
      unmount() {
        c && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(u, d) {
        return (r.provides[u] = d), l;
      },
    });
    return l;
  };
}
function us(e, t, n, s, i = !1) {
  if (P(e)) {
    e.forEach((g, S) => us(g, t && (P(t) ? t[S] : t), n, s, i));
    return;
  }
  if (mn(s) && !i) return;
  const r = s.shapeFlag & 4 ? jn(s.component) || s.component.proxy : s.el,
    o = i ? null : r,
    { i: c, r: l } = e,
    u = t && t.r,
    d = c.refs === ee ? (c.refs = {}) : c.refs,
    h = c.setupState;
  if (
    (u != null &&
      u !== l &&
      (oe(u)
        ? ((d[u] = null), W(h, u) && (h[u] = null))
        : ie(u) && (u.value = null)),
    N(l))
  )
    et(l, c, 12, [o, d]);
  else {
    const g = oe(l),
      S = ie(l);
    if (g || S) {
      const R = () => {
        if (e.f) {
          const T = g ? (W(h, l) ? h[l] : d[l]) : l.value;
          i
            ? P(T) && As(T, r)
            : P(T)
            ? T.includes(r) || T.push(r)
            : g
            ? ((d[l] = [r]), W(h, l) && (h[l] = d[l]))
            : ((l.value = [r]), e.k && (d[e.k] = l.value));
        } else
          g
            ? ((d[l] = o), W(h, l) && (h[l] = o))
            : S && ((l.value = o), e.k && (d[e.k] = o));
      };
      o ? ((R.id = -1), be(R, n)) : R();
    }
  }
}
const be = Ic;
function al(e) {
  return fl(e);
}
function fl(e, t) {
  const n = Io();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: i,
      patchProp: r,
      createElement: o,
      createText: c,
      createComment: l,
      setText: u,
      setElementText: d,
      parentNode: h,
      nextSibling: g,
      setScopeId: S = Ne,
      insertStaticContent: R,
    } = e,
    T = (
      a,
      f,
      p,
      _ = null,
      m = null,
      v = null,
      C = !1,
      b = null,
      w = !!f.dynamicChildren
    ) => {
      if (a === f) return;
      a && !Ue(a, f) && ((_ = sn(a)), $e(a, m, v, !0), (a = null)),
        f.patchFlag === -2 && ((w = !1), (f.dynamicChildren = null));
      const { type: y, ref: O, shapeFlag: A } = f;
      switch (y) {
        case Dn:
          z(a, f, p, _);
          break;
        case Ee:
          K(a, f, p, _);
          break;
        case _n:
          a == null && B(f, p, _, C);
          break;
        case fe:
          de(a, f, p, _, m, v, C, b, w);
          break;
        default:
          A & 1
            ? L(a, f, p, _, m, v, C, b, w)
            : A & 6
            ? ye(a, f, p, _, m, v, C, b, w)
            : (A & 64 || A & 128) && y.process(a, f, p, _, m, v, C, b, w, mt);
      }
      O != null && m && us(O, a && a.ref, v, f || a, !f);
    },
    z = (a, f, p, _) => {
      if (a == null) s((f.el = c(f.children)), p, _);
      else {
        const m = (f.el = a.el);
        f.children !== a.children && u(m, f.children);
      }
    },
    K = (a, f, p, _) => {
      a == null ? s((f.el = l(f.children || "")), p, _) : (f.el = a.el);
    },
    B = (a, f, p, _) => {
      [a.el, a.anchor] = R(a.children, f, p, _, a.el, a.anchor);
    },
    x = ({ el: a, anchor: f }, p, _) => {
      let m;
      for (; a && a !== f; ) (m = g(a)), s(a, p, _), (a = m);
      s(f, p, _);
    },
    D = ({ el: a, anchor: f }) => {
      let p;
      for (; a && a !== f; ) (p = g(a)), i(a), (a = p);
      i(f);
    },
    L = (a, f, p, _, m, v, C, b, w) => {
      (C = C || f.type === "svg"),
        a == null ? X(f, p, _, m, v, C, b, w) : j(a, f, m, v, C, b, w);
    },
    X = (a, f, p, _, m, v, C, b) => {
      let w, y;
      const { type: O, props: A, shapeFlag: k, transition: F, dirs: M } = a;
      if (
        ((w = a.el = o(a.type, v, A && A.is, A)),
        k & 8
          ? d(w, a.children)
          : k & 16 &&
            E(a.children, w, null, _, m, v && O !== "foreignObject", C, b),
        M && ct(a, null, _, "created"),
        $(w, a, a.scopeId, C, _),
        A)
      ) {
        for (const J in A)
          J !== "value" &&
            !dn(J) &&
            r(w, J, null, A[J], v, a.children, _, m, We);
        "value" in A && r(w, "value", null, A.value),
          (y = A.onVnodeBeforeMount) && De(y, _, a);
      }
      M && ct(a, null, _, "beforeMount");
      const G = (!m || (m && !m.pendingBranch)) && F && !F.persisted;
      G && F.beforeEnter(w),
        s(w, f, p),
        ((y = A && A.onVnodeMounted) || G || M) &&
          be(() => {
            y && De(y, _, a), G && F.enter(w), M && ct(a, null, _, "mounted");
          }, m);
    },
    $ = (a, f, p, _, m) => {
      if ((p && S(a, p), _)) for (let v = 0; v < _.length; v++) S(a, _[v]);
      if (m) {
        let v = m.subTree;
        if (f === v) {
          const C = m.vnode;
          $(a, C, C.scopeId, C.slotScopeIds, m.parent);
        }
      }
    },
    E = (a, f, p, _, m, v, C, b, w = 0) => {
      for (let y = w; y < a.length; y++) {
        const O = (a[y] = b ? Xe(a[y]) : Ie(a[y]));
        T(null, O, f, p, _, m, v, C, b);
      }
    },
    j = (a, f, p, _, m, v, C) => {
      const b = (f.el = a.el);
      let { patchFlag: w, dynamicChildren: y, dirs: O } = f;
      w |= a.patchFlag & 16;
      const A = a.props || ee,
        k = f.props || ee;
      let F;
      p && lt(p, !1),
        (F = k.onVnodeBeforeUpdate) && De(F, p, f, a),
        O && ct(f, a, p, "beforeUpdate"),
        p && lt(p, !0);
      const M = m && f.type !== "foreignObject";
      if (
        (y
          ? q(a.dynamicChildren, y, b, p, _, M, v)
          : C || Z(a, f, b, null, p, _, M, v, !1),
        w > 0)
      ) {
        if (w & 16) Y(b, f, A, k, p, _, m);
        else if (
          (w & 2 && A.class !== k.class && r(b, "class", null, k.class, m),
          w & 4 && r(b, "style", A.style, k.style, m),
          w & 8)
        ) {
          const G = f.dynamicProps;
          for (let J = 0; J < G.length; J++) {
            const ce = G[J],
              ke = A[ce],
              _t = k[ce];
            (_t !== ke || ce === "value") &&
              r(b, ce, ke, _t, m, a.children, p, _, We);
          }
        }
        w & 1 && a.children !== f.children && d(b, f.children);
      } else !C && y == null && Y(b, f, A, k, p, _, m);
      ((F = k.onVnodeUpdated) || O) &&
        be(() => {
          F && De(F, p, f, a), O && ct(f, a, p, "updated");
        }, _);
    },
    q = (a, f, p, _, m, v, C) => {
      for (let b = 0; b < f.length; b++) {
        const w = a[b],
          y = f[b],
          O =
            w.el && (w.type === fe || !Ue(w, y) || w.shapeFlag & 70)
              ? h(w.el)
              : p;
        T(w, y, O, null, _, m, v, C, !0);
      }
    },
    Y = (a, f, p, _, m, v, C) => {
      if (p !== _) {
        if (p !== ee)
          for (const b in p)
            !dn(b) && !(b in _) && r(a, b, p[b], null, C, f.children, m, v, We);
        for (const b in _) {
          if (dn(b)) continue;
          const w = _[b],
            y = p[b];
          w !== y && b !== "value" && r(a, b, y, w, C, f.children, m, v, We);
        }
        "value" in _ && r(a, "value", p.value, _.value);
      }
    },
    de = (a, f, p, _, m, v, C, b, w) => {
      const y = (f.el = a ? a.el : c("")),
        O = (f.anchor = a ? a.anchor : c(""));
      let { patchFlag: A, dynamicChildren: k, slotScopeIds: F } = f;
      F && (b = b ? b.concat(F) : F),
        a == null
          ? (s(y, p, _), s(O, p, _), E(f.children, p, O, m, v, C, b, w))
          : A > 0 && A & 64 && k && a.dynamicChildren
          ? (q(a.dynamicChildren, k, p, m, v, C, b),
            (f.key != null || (m && f === m.subTree)) && Dr(a, f, !0))
          : Z(a, f, p, O, m, v, C, b, w);
    },
    ye = (a, f, p, _, m, v, C, b, w) => {
      (f.slotScopeIds = b),
        a == null
          ? f.shapeFlag & 512
            ? m.ctx.activate(f, p, _, C, w)
            : pe(f, p, _, m, v, C, w)
          : ge(a, f, w);
    },
    pe = (a, f, p, _, m, v, C) => {
      const b = (a.component = bl(a, _, m));
      if ((Ln(a) && (b.ctx.renderer = mt), vl(b), b.asyncDep)) {
        if ((m && m.registerDep(b, me), !a.el)) {
          const w = (b.subTree = ae(Ee));
          K(null, w, f, p);
        }
        return;
      }
      me(b, a, f, p, m, v, C);
    },
    ge = (a, f, p) => {
      const _ = (f.component = a.component);
      if (Ec(a, f, p))
        if (_.asyncDep && !_.asyncResolved) {
          ne(_, f, p);
          return;
        } else (_.next = f), yc(_.update), _.update();
      else (f.el = a.el), (_.vnode = f);
    },
    me = (a, f, p, _, m, v, C) => {
      const b = () => {
          if (a.isMounted) {
            let { next: O, bu: A, u: k, parent: F, vnode: M } = a,
              G = O,
              J;
            lt(a, !1),
              O ? ((O.el = M.el), ne(a, O, C)) : (O = M),
              A && pn(A),
              (J = O.props && O.props.onVnodeBeforeUpdate) && De(J, F, O, M),
              lt(a, !0);
            const ce = Jn(a),
              ke = a.subTree;
            (a.subTree = ce),
              T(ke, ce, h(ke.el), sn(ke), a, m, v),
              (O.el = ce.el),
              G === null && Ds(a, ce.el),
              k && be(k, m),
              (J = O.props && O.props.onVnodeUpdated) &&
                be(() => De(J, F, O, M), m);
          } else {
            let O;
            const { el: A, props: k } = f,
              { bm: F, m: M, parent: G } = a,
              J = mn(f);
            if (
              (lt(a, !1),
              F && pn(F),
              !J && (O = k && k.onVnodeBeforeMount) && De(O, G, f),
              lt(a, !0),
              A && zn)
            ) {
              const ce = () => {
                (a.subTree = Jn(a)), zn(A, a.subTree, a, m, null);
              };
              J
                ? f.type.__asyncLoader().then(() => !a.isUnmounted && ce())
                : ce();
            } else {
              const ce = (a.subTree = Jn(a));
              T(null, ce, p, _, a, m, v), (f.el = ce.el);
            }
            if ((M && be(M, m), !J && (O = k && k.onVnodeMounted))) {
              const ce = f;
              be(() => De(O, G, ce), m);
            }
            (f.shapeFlag & 256 ||
              (G && mn(G.vnode) && G.vnode.shapeFlag & 256)) &&
              a.a &&
              be(a.a, m),
              (a.isMounted = !0),
              (f = p = _ = null);
          }
        },
        w = (a.effect = new Rs(b, () => Ms(y), a.scope)),
        y = (a.update = () => w.run());
      (y.id = a.uid), lt(a, !0), y();
    },
    ne = (a, f, p) => {
      f.component = a;
      const _ = a.vnode.props;
      (a.vnode = f),
        (a.next = null),
        sl(a, f.props, _, p),
        ol(a, f.children, p),
        Rt(),
        ui(),
        It();
    },
    Z = (a, f, p, _, m, v, C, b, w = !1) => {
      const y = a && a.children,
        O = a ? a.shapeFlag : 0,
        A = f.children,
        { patchFlag: k, shapeFlag: F } = f;
      if (k > 0) {
        if (k & 128) {
          nn(y, A, p, _, m, v, C, b, w);
          return;
        } else if (k & 256) {
          rt(y, A, p, _, m, v, C, b, w);
          return;
        }
      }
      F & 8
        ? (O & 16 && We(y, m, v), A !== y && d(p, A))
        : O & 16
        ? F & 16
          ? nn(y, A, p, _, m, v, C, b, w)
          : We(y, m, v, !0)
        : (O & 8 && d(p, ""), F & 16 && E(A, p, _, m, v, C, b, w));
    },
    rt = (a, f, p, _, m, v, C, b, w) => {
      (a = a || wt), (f = f || wt);
      const y = a.length,
        O = f.length,
        A = Math.min(y, O);
      let k;
      for (k = 0; k < A; k++) {
        const F = (f[k] = w ? Xe(f[k]) : Ie(f[k]));
        T(a[k], F, p, null, m, v, C, b, w);
      }
      y > O ? We(a, m, v, !0, !1, A) : E(f, p, _, m, v, C, b, w, A);
    },
    nn = (a, f, p, _, m, v, C, b, w) => {
      let y = 0;
      const O = f.length;
      let A = a.length - 1,
        k = O - 1;
      for (; y <= A && y <= k; ) {
        const F = a[y],
          M = (f[y] = w ? Xe(f[y]) : Ie(f[y]));
        if (Ue(F, M)) T(F, M, p, null, m, v, C, b, w);
        else break;
        y++;
      }
      for (; y <= A && y <= k; ) {
        const F = a[A],
          M = (f[k] = w ? Xe(f[k]) : Ie(f[k]));
        if (Ue(F, M)) T(F, M, p, null, m, v, C, b, w);
        else break;
        A--, k--;
      }
      if (y > A) {
        if (y <= k) {
          const F = k + 1,
            M = F < O ? f[F].el : _;
          for (; y <= k; )
            T(null, (f[y] = w ? Xe(f[y]) : Ie(f[y])), p, M, m, v, C, b, w), y++;
        }
      } else if (y > k) for (; y <= A; ) $e(a[y], m, v, !0), y++;
      else {
        const F = y,
          M = y,
          G = new Map();
        for (y = M; y <= k; y++) {
          const we = (f[y] = w ? Xe(f[y]) : Ie(f[y]));
          we.key != null && G.set(we.key, y);
        }
        let J,
          ce = 0;
        const ke = k - M + 1;
        let _t = !1,
          ei = 0;
        const Lt = new Array(ke);
        for (y = 0; y < ke; y++) Lt[y] = 0;
        for (y = F; y <= A; y++) {
          const we = a[y];
          if (ce >= ke) {
            $e(we, m, v, !0);
            continue;
          }
          let Me;
          if (we.key != null) Me = G.get(we.key);
          else
            for (J = M; J <= k; J++)
              if (Lt[J - M] === 0 && Ue(we, f[J])) {
                Me = J;
                break;
              }
          Me === void 0
            ? $e(we, m, v, !0)
            : ((Lt[Me - M] = y + 1),
              Me >= ei ? (ei = Me) : (_t = !0),
              T(we, f[Me], p, null, m, v, C, b, w),
              ce++);
        }
        const ti = _t ? ul(Lt) : wt;
        for (J = ti.length - 1, y = ke - 1; y >= 0; y--) {
          const we = M + y,
            Me = f[we],
            ni = we + 1 < O ? f[we + 1].el : _;
          Lt[y] === 0
            ? T(null, Me, p, ni, m, v, C, b, w)
            : _t && (J < 0 || y !== ti[J] ? ot(Me, p, ni, 2) : J--);
        }
      }
    },
    ot = (a, f, p, _, m = null) => {
      const { el: v, type: C, transition: b, children: w, shapeFlag: y } = a;
      if (y & 6) {
        ot(a.component.subTree, f, p, _);
        return;
      }
      if (y & 128) {
        a.suspense.move(f, p, _);
        return;
      }
      if (y & 64) {
        C.move(a, f, p, mt);
        return;
      }
      if (C === fe) {
        s(v, f, p);
        for (let A = 0; A < w.length; A++) ot(w[A], f, p, _);
        s(a.anchor, f, p);
        return;
      }
      if (C === _n) {
        x(a, f, p);
        return;
      }
      if (_ !== 2 && y & 1 && b)
        if (_ === 0) b.beforeEnter(v), s(v, f, p), be(() => b.enter(v), m);
        else {
          const { leave: A, delayLeave: k, afterLeave: F } = b,
            M = () => s(v, f, p),
            G = () => {
              A(v, () => {
                M(), F && F();
              });
            };
          k ? k(v, M, G) : G();
        }
      else s(v, f, p);
    },
    $e = (a, f, p, _ = !1, m = !1) => {
      const {
        type: v,
        props: C,
        ref: b,
        children: w,
        dynamicChildren: y,
        shapeFlag: O,
        patchFlag: A,
        dirs: k,
      } = a;
      if ((b != null && us(b, null, p, a, !0), O & 256)) {
        f.ctx.deactivate(a);
        return;
      }
      const F = O & 1 && k,
        M = !mn(a);
      let G;
      if ((M && (G = C && C.onVnodeBeforeUnmount) && De(G, f, a), O & 6))
        yo(a.component, p, _);
      else {
        if (O & 128) {
          a.suspense.unmount(p, _);
          return;
        }
        F && ct(a, null, f, "beforeUnmount"),
          O & 64
            ? a.type.remove(a, f, p, m, mt, _)
            : y && (v !== fe || (A > 0 && A & 64))
            ? We(y, f, p, !1, !0)
            : ((v === fe && A & 384) || (!m && O & 16)) && We(w, f, p),
          _ && Zs(a);
      }
      ((M && (G = C && C.onVnodeUnmounted)) || F) &&
        be(() => {
          G && De(G, f, a), F && ct(a, null, f, "unmounted");
        }, p);
    },
    Zs = (a) => {
      const { type: f, el: p, anchor: _, transition: m } = a;
      if (f === fe) {
        _o(p, _);
        return;
      }
      if (f === _n) {
        D(a);
        return;
      }
      const v = () => {
        i(p), m && !m.persisted && m.afterLeave && m.afterLeave();
      };
      if (a.shapeFlag & 1 && m && !m.persisted) {
        const { leave: C, delayLeave: b } = m,
          w = () => C(p, v);
        b ? b(a.el, v, w) : w();
      } else v();
    },
    _o = (a, f) => {
      let p;
      for (; a !== f; ) (p = g(a)), i(a), (a = p);
      i(f);
    },
    yo = (a, f, p) => {
      const { bum: _, scope: m, update: v, subTree: C, um: b } = a;
      _ && pn(_),
        m.stop(),
        v && ((v.active = !1), $e(C, a, f, p)),
        b && be(b, f),
        be(() => {
          a.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    We = (a, f, p, _ = !1, m = !1, v = 0) => {
      for (let C = v; C < a.length; C++) $e(a[C], f, p, _, m);
    },
    sn = (a) =>
      a.shapeFlag & 6
        ? sn(a.component.subTree)
        : a.shapeFlag & 128
        ? a.suspense.next()
        : g(a.anchor || a.el),
    Gs = (a, f, p) => {
      a == null
        ? f._vnode && $e(f._vnode, null, null, !0)
        : T(f._vnode || null, a, f, null, null, null, p),
        ui(),
        vr(),
        (f._vnode = a);
    },
    mt = {
      p: T,
      um: $e,
      m: ot,
      r: Zs,
      mt: pe,
      mc: E,
      pc: Z,
      pbc: q,
      n: sn,
      o: e,
    };
  let Vn, zn;
  return (
    t && ([Vn, zn] = t(mt)), { render: Gs, hydrate: Vn, createApp: ll(Gs, Vn) }
  );
}
function lt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Dr(e, t, n = !1) {
  const s = e.children,
    i = t.children;
  if (P(s) && P(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let c = i[r];
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = i[r] = Xe(i[r])), (c.el = o.el)),
        n || Dr(o, c)),
        c.type === Dn && (c.el = o.el);
    }
}
function ul(e) {
  const t = e.slice(),
    n = [0];
  let s, i, r, o, c;
  const l = e.length;
  for (s = 0; s < l; s++) {
    const u = e[s];
    if (u !== 0) {
      if (((i = n[n.length - 1]), e[i] < u)) {
        (t[s] = i), n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        (c = (r + o) >> 1), e[n[c]] < u ? (r = c + 1) : (o = c);
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), (n[r] = s));
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; ) (n[r] = o), (o = t[o]);
  return n;
}
const hl = (e) => e.__isTeleport,
  fe = Symbol(void 0),
  Dn = Symbol(void 0),
  Ee = Symbol(void 0),
  _n = Symbol(void 0),
  jt = [];
let Be = null;
function Q(e = !1) {
  jt.push((Be = e ? null : []));
}
function Hr() {
  jt.pop(), (Be = jt[jt.length - 1] || null);
}
let Ot = 1;
function xi(e) {
  Ot += e;
}
function Ur(e) {
  return (
    (e.dynamicChildren = Ot > 0 ? Be || wt : null),
    Hr(),
    Ot > 0 && Be && Be.push(e),
    e
  );
}
function se(e, t, n, s, i, r) {
  return Ur(I(e, t, n, s, i, r, !0));
}
function Gt(e, t, n, s, i) {
  return Ur(ae(e, t, n, s, i, !0));
}
function jr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ue(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Hn = "__vInternal",
  qr = ({ key: e }) => e ?? null,
  yn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? oe(e) || ie(e) || N(e)
        ? { i: Ce, r: e, k: t, f: !!n }
        : e
      : null;
function I(
  e,
  t = null,
  n = null,
  s = 0,
  i = null,
  r = e === fe ? 0 : 1,
  o = !1,
  c = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && qr(t),
    ref: t && yn(t),
    scopeId: Nn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ce,
  };
  return (
    c
      ? (Ws(l, n), r & 128 && e.normalize(l))
      : n && (l.shapeFlag |= oe(n) ? 8 : 16),
    Ot > 0 &&
      !o &&
      Be &&
      (l.patchFlag > 0 || r & 6) &&
      l.patchFlag !== 32 &&
      Be.push(l),
    l
  );
}
const ae = dl;
function dl(e, t = null, n = null, s = 0, i = null, r = !1) {
  if (((!e || e === kr) && (e = Ee), jr(e))) {
    const c = st(e, t, !0);
    return (
      n && Ws(c, n),
      Ot > 0 &&
        !r &&
        Be &&
        (c.shapeFlag & 6 ? (Be[Be.indexOf(e)] = c) : Be.push(c)),
      (c.patchFlag |= -2),
      c
    );
  }
  if ((Sl(e) && (e = e.__vccOpts), t)) {
    t = pl(t);
    let { class: c, style: l } = t;
    c && !oe(c) && (t.class = Fe(c)),
      te(l) && (fr(l) && !P(l) && (l = he({}, l)), (t.style = Tn(l)));
  }
  const o = oe(e) ? 1 : Sc(e) ? 128 : hl(e) ? 64 : te(e) ? 4 : N(e) ? 2 : 0;
  return I(e, t, n, s, i, o, r, !0);
}
function pl(e) {
  return e ? (fr(e) || Hn in e ? he({}, e) : e) : null;
}
function st(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: o } = e,
    c = t ? ml(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && qr(c),
    ref:
      t && t.ref ? (n && i ? (P(i) ? i.concat(yn(t)) : [i, yn(t)]) : yn(t)) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== fe ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function gl(e = " ", t = 0) {
  return ae(Dn, null, e, t);
}
function Kr(e = "", t = !1) {
  return t ? (Q(), Gt(Ee, null, e)) : ae(Ee, null, e);
}
function Ie(e) {
  return e == null || typeof e == "boolean"
    ? ae(Ee)
    : P(e)
    ? ae(fe, null, e.slice())
    : typeof e == "object"
    ? Xe(e)
    : ae(Dn, null, String(e));
}
function Xe(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : st(e);
}
function Ws(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (P(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Ws(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(Hn in t)
        ? (t._ctx = Ce)
        : i === 3 &&
          Ce &&
          (Ce.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    N(t)
      ? ((t = { default: t, _ctx: Ce }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [gl(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function ml(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Fe([t.class, s.class]));
      else if (i === "style") t.style = Tn([t.style, s.style]);
      else if (Bn(i)) {
        const r = t[i],
          o = s[i];
        o &&
          r !== o &&
          !(P(r) && r.includes(o)) &&
          (t[i] = r ? [].concat(r, o) : o);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function De(e, t, n, s = null) {
  Oe(e, t, 7, [n, s]);
}
const _l = Mr();
let yl = 0;
function bl(e, t, n) {
  const s = e.type,
    i = (t ? t.appContext : e.appContext) || _l,
    r = {
      uid: yl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Qi(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Fr(s, i),
      emitsOptions: xr(s, i),
      emit: null,
      emitted: null,
      propsDefaults: ee,
      inheritAttrs: s.inheritAttrs,
      ctx: ee,
      data: ee,
      props: ee,
      attrs: ee,
      slots: ee,
      refs: ee,
      setupState: ee,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (r.ctx = { _: r }),
    (r.root = t ? t.root : r),
    (r.emit = vc.bind(null, r)),
    e.ce && e.ce(r),
    r
  );
}
let re = null;
const Un = () => re || Ce,
  it = (e) => {
    (re = e), e.scope.on();
  },
  tt = () => {
    re && re.scope.off(), (re = null);
  };
function Wr(e) {
  return e.vnode.shapeFlag & 4;
}
let Xt = !1;
function vl(e, t = !1) {
  Xt = t;
  const { props: n, children: s } = e.vnode,
    i = Wr(e);
  nl(e, n, i, t), rl(e, s);
  const r = i ? wl(e, t) : void 0;
  return (Xt = !1), r;
}
function wl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Bt(new Proxy(e.ctx, Qc)));
  const { setup: s } = n;
  if (s) {
    const i = (e.setupContext = s.length > 1 ? Cl(e) : null);
    it(e), Rt();
    const r = et(s, e, 0, [e.props, i]);
    if ((It(), tt(), Bs(r))) {
      if ((r.then(tt, tt), t))
        return r
          .then((o) => {
            hs(e, o, t);
          })
          .catch((o) => {
            Zt(o, e, 0);
          });
      e.asyncDep = r;
    } else hs(e, r, t);
  } else Vr(e, t);
}
function hs(e, t, n) {
  N(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : te(t) && (e.setupState = dr(t)),
    Vr(e, n);
}
let Ci;
function Vr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ci && !s.render) {
      const i = s.template || qs(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config,
          { delimiters: c, compilerOptions: l } = s,
          u = he(he({ isCustomElement: r, delimiters: c }, o), l);
        s.render = Ci(i, u);
      }
    }
    e.render = s.render || Ne;
  }
  it(e), Rt(), Xc(e), It(), tt();
}
function xl(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return ve(e, "get", "$attrs"), t[n];
    },
  });
}
function Cl(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = xl(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function jn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(dr(Bt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Ut) return Ut[n](e);
        },
        has(t, n) {
          return n in t || n in Ut;
        },
      }))
    );
}
function El(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Sl(e) {
  return N(e) && "__vccOpts" in e;
}
const pt = (e, t) => gc(e, t, Xt);
function zr(e) {
  const t = Un();
  let n = e();
  return (
    tt(),
    Bs(n) &&
      (n = n.catch((s) => {
        throw (it(t), s);
      })),
    [n, () => it(t)]
  );
}
const Al = Symbol(""),
  Tl = () => Ht(Al),
  Bl = "3.2.47",
  Ol = "http://www.w3.org/2000/svg",
  ut = typeof document < "u" ? document : null,
  Ei = ut && ut.createElement("template"),
  kl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const i = t
        ? ut.createElementNS(Ol, e)
        : ut.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          i.setAttribute("multiple", s.multiple),
        i
      );
    },
    createText: (e) => ut.createTextNode(e),
    createComment: (e) => ut.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => ut.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, i, r) {
      const o = n ? n.previousSibling : t.lastChild;
      if (i && (i === r || i.nextSibling))
        for (
          ;
          t.insertBefore(i.cloneNode(!0), n),
            !(i === r || !(i = i.nextSibling));

        );
      else {
        Ei.innerHTML = s ? `<svg>${e}</svg>` : e;
        const c = Ei.content;
        if (s) {
          const l = c.firstChild;
          for (; l.firstChild; ) c.appendChild(l.firstChild);
          c.removeChild(l);
        }
        t.insertBefore(c, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Rl(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Il(e, t, n) {
  const s = e.style,
    i = oe(n);
  if (n && !i) {
    if (t && !oe(t)) for (const r in t) n[r] == null && ds(s, r, "");
    for (const r in n) ds(s, r, n[r]);
  } else {
    const r = s.display;
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = r);
  }
}
const Si = /\s*!important$/;
function ds(e, t, n) {
  if (P(n)) n.forEach((s) => ds(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Pl(e, t);
    Si.test(n)
      ? e.setProperty(kt(s), n.replace(Si, ""), "important")
      : (e[s] = n);
  }
}
const Ai = ["Webkit", "Moz", "ms"],
  Zn = {};
function Pl(e, t) {
  const n = Zn[t];
  if (n) return n;
  let s = qe(t);
  if (s !== "filter" && s in e) return (Zn[t] = s);
  s = Rn(s);
  for (let i = 0; i < Ai.length; i++) {
    const r = Ai[i] + s;
    if (r in e) return (Zn[t] = r);
  }
  return t;
}
const Ti = "http://www.w3.org/1999/xlink";
function Fl(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ti, t.slice(6, t.length))
      : e.setAttributeNS(Ti, t, n);
  else {
    const r = Eo(t);
    n == null || (r && !Wi(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? "" : n);
  }
}
function Nl(e, t, n, s, i, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, i, r), (e[t] = n ?? "");
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const l = n ?? "";
    (e.value !== l || e.tagName === "OPTION") && (e.value = l),
      n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean"
      ? (n = Wi(n))
      : n == null && l === "string"
      ? ((n = ""), (c = !0))
      : l === "number" && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function bt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Ll(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function $l(e, t, n, s, i = null) {
  const r = e._vei || (e._vei = {}),
    o = r[t];
  if (s && o) o.value = s;
  else {
    const [c, l] = Ml(t);
    if (s) {
      const u = (r[t] = Ul(s, i));
      bt(e, c, u, l);
    } else o && (Ll(e, c, o, l), (r[t] = void 0));
  }
}
const Bi = /(?:Once|Passive|Capture)$/;
function Ml(e) {
  let t;
  if (Bi.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Bi)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : kt(e.slice(2)), t];
}
let Gn = 0;
const Dl = Promise.resolve(),
  Hl = () => Gn || (Dl.then(() => (Gn = 0)), (Gn = Date.now()));
function Ul(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    Oe(jl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Hl()), n;
}
function jl(e, t) {
  if (P(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (i) => !i._stopped && s && s(i))
    );
  } else return t;
}
const Oi = /^on[a-z]/,
  ql = (e, t, n, s, i = !1, r, o, c, l) => {
    t === "class"
      ? Rl(e, s, i)
      : t === "style"
      ? Il(e, n, s)
      : Bn(t)
      ? Ss(t) || $l(e, t, n, s, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Kl(e, t, s, i)
        )
      ? Nl(e, t, s, r, o, c, l)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Fl(e, t, s, i));
  };
function Kl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Oi.test(t) && N(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Oi.test(t) && oe(n))
    ? !1
    : t in e;
}
function Vs(e) {
  const t = Un();
  if (!t) return;
  const n = (t.ut = (i = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
      ).forEach((r) => gs(r, i));
    }),
    s = () => {
      const i = e(t.proxy);
      ps(t.subTree, i), n(i);
    };
  Fc(s),
    Mn(() => {
      const i = new MutationObserver(s);
      i.observe(t.subTree.el.parentNode, { childList: !0 }),
        js(() => i.disconnect());
    });
}
function ps(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          ps(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) gs(e.el, t);
  else if (e.type === fe) e.children.forEach((n) => ps(n, t));
  else if (e.type === _n) {
    let { el: n, anchor: s } = e;
    for (; n && (gs(n, t), n !== s); ) n = n.nextSibling;
  }
}
function gs(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t) n.setProperty(`--${s}`, t[s]);
  }
}
const Wl = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Mc.props;
const ki = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return P(t) ? (n) => pn(t, n) : t;
};
function Vl(e) {
  e.target.composing = !0;
}
function Ri(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const At = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
      e._assign = ki(i);
      const r = s || (i.props && i.props.type === "number");
      bt(e, t ? "change" : "input", (o) => {
        if (o.target.composing) return;
        let c = e.value;
        n && (c = c.trim()), r && (c = es(c)), e._assign(c);
      }),
        n &&
          bt(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (bt(e, "compositionstart", Vl),
          bt(e, "compositionend", Ri),
          bt(e, "change", Ri));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: s, number: i } },
      r
    ) {
      if (
        ((e._assign = ki(r)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (s && e.value.trim() === t) ||
              ((i || e.type === "number") && es(e.value) === t))))
      )
        return;
      const o = t ?? "";
      e.value !== o && (e.value = o);
    },
  },
  zl = he({ patchProp: ql }, kl);
let Ii;
function Yl() {
  return Ii || (Ii = al(zl));
}
const Jl = (...e) => {
  const t = Yl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const i = Ql(s);
      if (!i) return;
      const r = t._component;
      !N(r) && !r.render && !r.template && (r.template = i.innerHTML),
        (i.innerHTML = "");
      const o = n(i, !1, i instanceof SVGElement);
      return (
        i instanceof Element &&
          (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
        o
      );
    }),
    t
  );
};
function Ql(e) {
  return oe(e) ? document.querySelector(e) : e;
}
const Se = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, i] of t) n[s] = i;
    return n;
  },
  Xl = {},
  Zl = (e) => (Pt("data-v-49f6a901"), (e = e()), Ft(), e),
  Gl = { class: "navbar" },
  ea = Zl(() =>
    I("div", { class: "title" }, "JLCD - Streamdeck Smarthome Control", -1)
  ),
  ta = [ea];
function na(e, t) {
  return Q(), se("div", Gl, ta);
}
const sa = Se(Xl, [
    ["render", na],
    ["__scopeId", "data-v-49f6a901"],
  ]),
  qn = location.href;
async function Pi() {
  const t = await (
    await fetch(`${qn}api/state`, {
      headers: { "Content-Type": "application/json" },
    })
  ).json();
  if (ia(t)) return (t.buttonSettings = await oa(t.buttonSettings)), t;
  throw new Error("StreamDeck config not found");
}
function ia(e) {
  return "baseSettings" in e;
}
async function ra() {
  const t = await (await fetch(`${qn}api/streamdeck-info`)).json();
  if ("KEY_COLUMNS" in t) {
    const { KEY_COLUMNS: n, KEY_ROWS: s } = t,
      i = [];
    for (let r = 0; r < s; r++) {
      i.push([]);
      for (let o = 0; o < n; o++) i[r].push(!1);
    }
    return i;
  }
  throw new Error("StreamDeck config not found");
}
async function oa(e) {
  const n = await (await fetch(`${qn}api/streamdeck-info`)).json();
  for (let s = 0; s < n.KEY_COLUMNS * n.KEY_ROWS; s++)
    e[s] = e[s] || {
      type: "button",
      icons: [],
      protocol: "MQTT",
      typeSpecifigConfig: {},
    };
  return e;
}
async function ca(e) {
  if (
    (
      await fetch(`${qn}api/state`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      })
    ).status !== 200
  )
    throw new Error("Failed to update config");
}
var la = !1;
/*!
 * pinia v2.0.30
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ let Yr;
const Kn = (e) => (Yr = e),
  Jr = Symbol();
function ms(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var qt;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(qt || (qt = {}));
function aa() {
  const e = Xi(!0),
    t = e.run(() => Vt({}));
  let n = [],
    s = [];
  const i = Bt({
    install(r) {
      Kn(i),
        (i._a = r),
        r.provide(Jr, i),
        (r.config.globalProperties.$pinia = i),
        s.forEach((o) => n.push(o)),
        (s = []);
    },
    use(r) {
      return !this._a && !la ? s.push(r) : n.push(r), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return i;
}
const Qr = () => {};
function Fi(e, t, n, s = Qr) {
  e.push(t);
  const i = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), s());
  };
  return !n && Zi() && Fo(i), i;
}
function yt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
function _s(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, s) => e.set(s, n)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const s = t[n],
      i = e[n];
    ms(i) && ms(s) && e.hasOwnProperty(n) && !ie(s) && !ze(s)
      ? (e[n] = _s(i, s))
      : (e[n] = s);
  }
  return e;
}
const fa = Symbol();
function ua(e) {
  return !ms(e) || !e.hasOwnProperty(fa);
}
const { assign: Ze } = Object;
function ha(e) {
  return !!(ie(e) && e.effect);
}
function da(e, t, n, s) {
  const { state: i, actions: r, getters: o } = t,
    c = n.state.value[e];
  let l;
  function u() {
    c || (n.state.value[e] = i ? i() : {});
    const d = hc(n.state.value[e]);
    return Ze(
      d,
      r,
      Object.keys(o || {}).reduce(
        (h, g) => (
          (h[g] = Bt(
            pt(() => {
              Kn(n);
              const S = n._s.get(e);
              return o[g].call(S, S);
            })
          )),
          h
        ),
        {}
      )
    );
  }
  return (
    (l = Xr(e, u, t, n, s, !0)),
    (l.$reset = function () {
      const h = i ? i() : {};
      this.$patch((g) => {
        Ze(g, h);
      });
    }),
    l
  );
}
function Xr(e, t, n = {}, s, i, r) {
  let o;
  const c = Ze({ actions: {} }, n),
    l = { deep: !0 };
  let u,
    d,
    h = Bt([]),
    g = Bt([]),
    S;
  const R = s.state.value[e];
  !r && !R && (s.state.value[e] = {}), Vt({});
  let T;
  function z($) {
    let E;
    (u = d = !1),
      typeof $ == "function"
        ? ($(s.state.value[e]),
          (E = { type: qt.patchFunction, storeId: e, events: S }))
        : (_s(s.state.value[e], $),
          (E = { type: qt.patchObject, payload: $, storeId: e, events: S }));
    const j = (T = Symbol());
    _r().then(() => {
      T === j && (u = !0);
    }),
      (d = !0),
      yt(h, E, s.state.value[e]);
  }
  const K = Qr;
  function B() {
    o.stop(), (h = []), (g = []), s._s.delete(e);
  }
  function x($, E) {
    return function () {
      Kn(s);
      const j = Array.from(arguments),
        q = [],
        Y = [];
      function de(ge) {
        q.push(ge);
      }
      function ye(ge) {
        Y.push(ge);
      }
      yt(g, { args: j, name: $, store: L, after: de, onError: ye });
      let pe;
      try {
        pe = E.apply(this && this.$id === e ? this : L, j);
      } catch (ge) {
        throw (yt(Y, ge), ge);
      }
      return pe instanceof Promise
        ? pe
            .then((ge) => (yt(q, ge), ge))
            .catch((ge) => (yt(Y, ge), Promise.reject(ge)))
        : (yt(q, pe), pe);
    };
  }
  const D = {
      _p: s,
      $id: e,
      $onAction: Fi.bind(null, g),
      $patch: z,
      $reset: K,
      $subscribe($, E = {}) {
        const j = Fi(h, $, E.detached, () => q()),
          q = o.run(() =>
            gn(
              () => s.state.value[e],
              (Y) => {
                (E.flush === "sync" ? d : u) &&
                  $({ storeId: e, type: qt.direct, events: S }, Y);
              },
              Ze({}, l, E)
            )
          );
        return j;
      },
      $dispose: B,
    },
    L = Pn(D);
  s._s.set(e, L);
  const X = s._e.run(() => ((o = Xi()), o.run(() => t())));
  for (const $ in X) {
    const E = X[$];
    if ((ie(E) && !ha(E)) || ze(E))
      r ||
        (R && ua(E) && (ie(E) ? (E.value = R[$]) : _s(E, R[$])),
        (s.state.value[e][$] = E));
    else if (typeof E == "function") {
      const j = x($, E);
      (X[$] = j), (c.actions[$] = E);
    }
  }
  return (
    Ze(L, X),
    Ze(U(L), X),
    Object.defineProperty(L, "$state", {
      get: () => s.state.value[e],
      set: ($) => {
        z((E) => {
          Ze(E, $);
        });
      },
    }),
    s._p.forEach(($) => {
      Ze(
        L,
        o.run(() => $({ store: L, app: s._a, pinia: s, options: c }))
      );
    }),
    R && r && n.hydrate && n.hydrate(L.$state, R),
    (u = !0),
    (d = !0),
    L
  );
}
function Zr(e, t, n) {
  let s, i;
  const r = typeof t == "function";
  typeof e == "string" ? ((s = e), (i = r ? n : t)) : ((i = e), (s = e.id));
  function o(c, l) {
    const u = Un();
    return (
      (c = c || (u && Ht(Jr, null))),
      c && Kn(c),
      (c = Yr),
      c._s.has(s) || (r ? Xr(s, t, i, c) : da(s, i, c)),
      c._s.get(s)
    );
  }
  return (o.$id = s), o;
}
function en(e) {
  {
    e = U(e);
    const t = {};
    for (const n in e) {
      const s = e[n];
      (ie(s) || ze(s)) && (t[n] = pr(e, n));
    }
    return t;
  }
}
const gt = Zr("StateStore", {
    state: () => ({ configState: void 0, activeIndex: void 0 }),
    getters: {
      getConfigState: async (e) => (
        e.configState || (e.configState = await Pi()), e.configState
      ),
      getActiveButton: (e) => {
        var t;
        if (e.activeIndex !== void 0)
          return (t = e.configState) == null
            ? void 0
            : t.buttonSettings[e.activeIndex];
      },
    },
    actions: {
      async getButtonConfig(e) {
        return (await this.getConfigState).buttonSettings[e];
      },
      async refreshConfig() {
        this.configState = await Pi();
      },
      async updateConfig() {
        this.configState && ca(this.configState);
      },
    },
  }),
  pa = Le({
    __name: "DeckButton",
    props: { normalizedIndex: null },
    async setup(e) {
      let t, n;
      const s = e;
      Vs((u) => ({ "5dd2a2d5": V(o) }));
      const i = gt(),
        r =
          (([t, n] = zr(() => i.getButtonConfig(s.normalizedIndex))),
          (t = await t),
          n(),
          t),
        o = pt(() => {
          var d;
          if (!r) return "#ff0000";
          const u = r.typeSpecifigConfig.state;
          return (
            ((d = r.icons.find((h) => h.state === u)) == null
              ? void 0
              : d.color) || "#ff0000"
          );
        });
      function c() {
        i.activeIndex = s.normalizedIndex;
      }
      function l() {
        const u = [],
          d = i.activeIndex === s.normalizedIndex ? "active" : "";
        return u.push(d), u;
      }
      return (u, d) => (
        Q(),
        se(
          "div",
          {
            class: Fe(["buttonWrapper", l()]),
            onClick: d[0] || (d[0] = (h) => c()),
          },
          Es(e.normalizedIndex),
          3
        )
      );
    },
  });
const ga = Se(pa, [["__scopeId", "data-v-edf60ee9"]]),
  Ke = Object.create(null);
Ke.open = "0";
Ke.close = "1";
Ke.ping = "2";
Ke.pong = "3";
Ke.message = "4";
Ke.upgrade = "5";
Ke.noop = "6";
const bn = Object.create(null);
Object.keys(Ke).forEach((e) => {
  bn[Ke[e]] = e;
});
const ma = { type: "error", data: "parser error" },
  _a =
    typeof Blob == "function" ||
    (typeof Blob < "u" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  ya = typeof ArrayBuffer == "function",
  ba = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  Gr = ({ type: e, data: t }, n, s) =>
    _a && t instanceof Blob
      ? n
        ? s(t)
        : Ni(t, s)
      : ya && (t instanceof ArrayBuffer || ba(t))
      ? n
        ? s(t)
        : Ni(new Blob([t]), s)
      : s(Ke[e] + (t || "")),
  Ni = (e, t) => {
    const n = new FileReader();
    return (
      (n.onload = function () {
        const s = n.result.split(",")[1];
        t("b" + (s || ""));
      }),
      n.readAsDataURL(e)
    );
  },
  Li = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Dt = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < Li.length; e++) Dt[Li.charCodeAt(e)] = e;
const va = (e) => {
    let t = e.length * 0.75,
      n = e.length,
      s,
      i = 0,
      r,
      o,
      c,
      l;
    e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
    const u = new ArrayBuffer(t),
      d = new Uint8Array(u);
    for (s = 0; s < n; s += 4)
      (r = Dt[e.charCodeAt(s)]),
        (o = Dt[e.charCodeAt(s + 1)]),
        (c = Dt[e.charCodeAt(s + 2)]),
        (l = Dt[e.charCodeAt(s + 3)]),
        (d[i++] = (r << 2) | (o >> 4)),
        (d[i++] = ((o & 15) << 4) | (c >> 2)),
        (d[i++] = ((c & 3) << 6) | (l & 63));
    return u;
  },
  wa = typeof ArrayBuffer == "function",
  eo = (e, t) => {
    if (typeof e != "string") return { type: "message", data: to(e, t) };
    const n = e.charAt(0);
    return n === "b"
      ? { type: "message", data: xa(e.substring(1), t) }
      : bn[n]
      ? e.length > 1
        ? { type: bn[n], data: e.substring(1) }
        : { type: bn[n] }
      : ma;
  },
  xa = (e, t) => {
    if (wa) {
      const n = va(e);
      return to(n, t);
    } else return { base64: !0, data: e };
  },
  to = (e, t) => {
    switch (t) {
      case "blob":
        return e instanceof ArrayBuffer ? new Blob([e]) : e;
      case "arraybuffer":
      default:
        return e;
    }
  },
  no = String.fromCharCode(30),
  Ca = (e, t) => {
    const n = e.length,
      s = new Array(n);
    let i = 0;
    e.forEach((r, o) => {
      Gr(r, !1, (c) => {
        (s[o] = c), ++i === n && t(s.join(no));
      });
    });
  },
  Ea = (e, t) => {
    const n = e.split(no),
      s = [];
    for (let i = 0; i < n.length; i++) {
      const r = eo(n[i], t);
      if ((s.push(r), r.type === "error")) break;
    }
    return s;
  },
  so = 4;
function le(e) {
  if (e) return Sa(e);
}
function Sa(e) {
  for (var t in le.prototype) e[t] = le.prototype[t];
  return e;
}
le.prototype.on = le.prototype.addEventListener = function (e, t) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
    this
  );
};
le.prototype.once = function (e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments);
  }
  return (n.fn = t), this.on(e, n), this;
};
le.prototype.off =
  le.prototype.removeListener =
  le.prototype.removeAllListeners =
  le.prototype.removeEventListener =
    function (e, t) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return (this._callbacks = {}), this;
      var n = this._callbacks["$" + e];
      if (!n) return this;
      if (arguments.length == 1) return delete this._callbacks["$" + e], this;
      for (var s, i = 0; i < n.length; i++)
        if (((s = n[i]), s === t || s.fn === t)) {
          n.splice(i, 1);
          break;
        }
      return n.length === 0 && delete this._callbacks["$" + e], this;
    };
le.prototype.emit = function (e) {
  this._callbacks = this._callbacks || {};
  for (
    var t = new Array(arguments.length - 1),
      n = this._callbacks["$" + e],
      s = 1;
    s < arguments.length;
    s++
  )
    t[s - 1] = arguments[s];
  if (n) {
    n = n.slice(0);
    for (var s = 0, i = n.length; s < i; ++s) n[s].apply(this, t);
  }
  return this;
};
le.prototype.emitReserved = le.prototype.emit;
le.prototype.listeners = function (e) {
  return (
    (this._callbacks = this._callbacks || {}), this._callbacks["$" + e] || []
  );
};
le.prototype.hasListeners = function (e) {
  return !!this.listeners(e).length;
};
const Te = (() =>
  typeof self < "u"
    ? self
    : typeof window < "u"
    ? window
    : Function("return this")())();
function io(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const Aa = Te.setTimeout,
  Ta = Te.clearTimeout;
function Wn(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = Aa.bind(Te)), (e.clearTimeoutFn = Ta.bind(Te)))
    : ((e.setTimeoutFn = Te.setTimeout.bind(Te)),
      (e.clearTimeoutFn = Te.clearTimeout.bind(Te)));
}
const Ba = 1.33;
function Oa(e) {
  return typeof e == "string"
    ? ka(e)
    : Math.ceil((e.byteLength || e.size) * Ba);
}
function ka(e) {
  let t = 0,
    n = 0;
  for (let s = 0, i = e.length; s < i; s++)
    (t = e.charCodeAt(s)),
      t < 128
        ? (n += 1)
        : t < 2048
        ? (n += 2)
        : t < 55296 || t >= 57344
        ? (n += 3)
        : (s++, (n += 4));
  return n;
}
class Ra extends Error {
  constructor(t, n, s) {
    super(t),
      (this.description = n),
      (this.context = s),
      (this.type = "TransportError");
  }
}
class ro extends le {
  constructor(t) {
    super(),
      (this.writable = !1),
      Wn(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.socket = t.socket);
  }
  onError(t, n, s) {
    return super.emitReserved("error", new Ra(t, n, s)), this;
  }
  open() {
    return (this.readyState = "opening"), this.doOpen(), this;
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(t) {
    this.readyState === "open" && this.write(t);
  }
  onOpen() {
    (this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open");
  }
  onData(t) {
    const n = eo(t, this.socket.binaryType);
    this.onPacket(n);
  }
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  onClose(t) {
    (this.readyState = "closed"), super.emitReserved("close", t);
  }
  pause(t) {}
}
const oo =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
      ""
    ),
  ys = 64,
  Ia = {};
let $i = 0,
  un = 0,
  Mi;
function Di(e) {
  let t = "";
  do (t = oo[e % ys] + t), (e = Math.floor(e / ys));
  while (e > 0);
  return t;
}
function co() {
  const e = Di(+new Date());
  return e !== Mi ? (($i = 0), (Mi = e)) : e + "." + Di($i++);
}
for (; un < ys; un++) Ia[oo[un]] = un;
function lo(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) &&
      (t.length && (t += "&"),
      (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
  return t;
}
function Pa(e) {
  let t = {},
    n = e.split("&");
  for (let s = 0, i = n.length; s < i; s++) {
    let r = n[s].split("=");
    t[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
  }
  return t;
}
let ao = !1;
try {
  ao = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const Fa = ao;
function fo(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || Fa)) return new XMLHttpRequest();
  } catch {}
  if (!t)
    try {
      return new Te[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
function Na() {}
const La = (function () {
  return new fo({ xdomain: !1 }).responseType != null;
})();
class $a extends ro {
  constructor(t) {
    if ((super(t), (this.polling = !1), typeof location < "u")) {
      const s = location.protocol === "https:";
      let i = location.port;
      i || (i = s ? "443" : "80"),
        (this.xd =
          (typeof location < "u" && t.hostname !== location.hostname) ||
          i !== t.port),
        (this.xs = t.secure !== s);
    }
    const n = t && t.forceBase64;
    this.supportsBinary = La && !n;
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this.poll();
  }
  pause(t) {
    this.readyState = "pausing";
    const n = () => {
      (this.readyState = "paused"), t();
    };
    if (this.polling || !this.writable) {
      let s = 0;
      this.polling &&
        (s++,
        this.once("pollComplete", function () {
          --s || n();
        })),
        this.writable ||
          (s++,
          this.once("drain", function () {
            --s || n();
          }));
    } else n();
  }
  poll() {
    (this.polling = !0), this.doPoll(), this.emitReserved("poll");
  }
  onData(t) {
    const n = (s) => {
      if (
        (this.readyState === "opening" && s.type === "open" && this.onOpen(),
        s.type === "close")
      )
        return (
          this.onClose({ description: "transport closed by the server" }), !1
        );
      this.onPacket(s);
    };
    Ea(t, this.socket.binaryType).forEach(n),
      this.readyState !== "closed" &&
        ((this.polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this.poll());
  }
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  write(t) {
    (this.writable = !1),
      Ca(t, (n) => {
        this.doWrite(n, () => {
          (this.writable = !0), this.emitReserved("drain");
        });
      });
  }
  uri() {
    let t = this.query || {};
    const n = this.opts.secure ? "https" : "http";
    let s = "";
    this.opts.timestampRequests !== !1 && (t[this.opts.timestampParam] = co()),
      !this.supportsBinary && !t.sid && (t.b64 = 1),
      this.opts.port &&
        ((n === "https" && Number(this.opts.port) !== 443) ||
          (n === "http" && Number(this.opts.port) !== 80)) &&
        (s = ":" + this.opts.port);
    const i = lo(t),
      r = this.opts.hostname.indexOf(":") !== -1;
    return (
      n +
      "://" +
      (r ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      s +
      this.opts.path +
      (i.length ? "?" + i : "")
    );
  }
  request(t = {}) {
    return (
      Object.assign(t, { xd: this.xd, xs: this.xs }, this.opts),
      new je(this.uri(), t)
    );
  }
  doWrite(t, n) {
    const s = this.request({ method: "POST", data: t });
    s.on("success", n),
      s.on("error", (i, r) => {
        this.onError("xhr post error", i, r);
      });
  }
  doPoll() {
    const t = this.request();
    t.on("data", this.onData.bind(this)),
      t.on("error", (n, s) => {
        this.onError("xhr poll error", n, s);
      }),
      (this.pollXhr = t);
  }
}
class je extends le {
  constructor(t, n) {
    super(),
      Wn(this, n),
      (this.opts = n),
      (this.method = n.method || "GET"),
      (this.uri = t),
      (this.async = n.async !== !1),
      (this.data = n.data !== void 0 ? n.data : null),
      this.create();
  }
  create() {
    const t = io(
      this.opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref"
    );
    (t.xdomain = !!this.opts.xd), (t.xscheme = !!this.opts.xs);
    const n = (this.xhr = new fo(t));
    try {
      n.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0);
          for (let s in this.opts.extraHeaders)
            this.opts.extraHeaders.hasOwnProperty(s) &&
              n.setRequestHeader(s, this.opts.extraHeaders[s]);
        }
      } catch {}
      if (this.method === "POST")
        try {
          n.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        n.setRequestHeader("Accept", "*/*");
      } catch {}
      "withCredentials" in n && (n.withCredentials = this.opts.withCredentials),
        this.opts.requestTimeout && (n.timeout = this.opts.requestTimeout),
        (n.onreadystatechange = () => {
          n.readyState === 4 &&
            (n.status === 200 || n.status === 1223
              ? this.onLoad()
              : this.setTimeoutFn(() => {
                  this.onError(typeof n.status == "number" ? n.status : 0);
                }, 0));
        }),
        n.send(this.data);
    } catch (s) {
      this.setTimeoutFn(() => {
        this.onError(s);
      }, 0);
      return;
    }
    typeof document < "u" &&
      ((this.index = je.requestsCount++), (je.requests[this.index] = this));
  }
  onError(t) {
    this.emitReserved("error", t, this.xhr), this.cleanup(!0);
  }
  cleanup(t) {
    if (!(typeof this.xhr > "u" || this.xhr === null)) {
      if (((this.xhr.onreadystatechange = Na), t))
        try {
          this.xhr.abort();
        } catch {}
      typeof document < "u" && delete je.requests[this.index],
        (this.xhr = null);
    }
  }
  onLoad() {
    const t = this.xhr.responseText;
    t !== null &&
      (this.emitReserved("data", t),
      this.emitReserved("success"),
      this.cleanup());
  }
  abort() {
    this.cleanup();
  }
}
je.requestsCount = 0;
je.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function") attachEvent("onunload", Hi);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in Te ? "pagehide" : "unload";
    addEventListener(e, Hi, !1);
  }
}
function Hi() {
  for (let e in je.requests)
    je.requests.hasOwnProperty(e) && je.requests[e].abort();
}
const uo = (() =>
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (t) => Promise.resolve().then(t)
      : (t, n) => n(t, 0))(),
  hn = Te.WebSocket || Te.MozWebSocket,
  Ui = !0,
  Ma = "arraybuffer",
  ji =
    typeof navigator < "u" &&
    typeof navigator.product == "string" &&
    navigator.product.toLowerCase() === "reactnative";
class Da extends ro {
  constructor(t) {
    super(t), (this.supportsBinary = !t.forceBase64);
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) return;
    const t = this.uri(),
      n = this.opts.protocols,
      s = ji
        ? {}
        : io(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity"
          );
    this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
    try {
      this.ws = Ui && !ji ? (n ? new hn(t, n) : new hn(t)) : new hn(t, n, s);
    } catch (i) {
      return this.emitReserved("error", i);
    }
    (this.ws.binaryType = this.socket.binaryType || Ma),
      this.addEventListeners();
  }
  addEventListeners() {
    (this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }),
      (this.ws.onclose = (t) =>
        this.onClose({
          description: "websocket connection closed",
          context: t,
        })),
      (this.ws.onmessage = (t) => this.onData(t.data)),
      (this.ws.onerror = (t) => this.onError("websocket error", t));
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const s = t[n],
        i = n === t.length - 1;
      Gr(s, this.supportsBinary, (r) => {
        const o = {};
        try {
          Ui && this.ws.send(r);
        } catch {}
        i &&
          uo(() => {
            (this.writable = !0), this.emitReserved("drain");
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && (this.ws.close(), (this.ws = null));
  }
  uri() {
    let t = this.query || {};
    const n = this.opts.secure ? "wss" : "ws";
    let s = "";
    this.opts.port &&
      ((n === "wss" && Number(this.opts.port) !== 443) ||
        (n === "ws" && Number(this.opts.port) !== 80)) &&
      (s = ":" + this.opts.port),
      this.opts.timestampRequests && (t[this.opts.timestampParam] = co()),
      this.supportsBinary || (t.b64 = 1);
    const i = lo(t),
      r = this.opts.hostname.indexOf(":") !== -1;
    return (
      n +
      "://" +
      (r ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      s +
      this.opts.path +
      (i.length ? "?" + i : "")
    );
  }
  check() {
    return !!hn;
  }
}
const Ha = { websocket: Da, polling: $a },
  Ua =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  ja = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function bs(e) {
  const t = e,
    n = e.indexOf("["),
    s = e.indexOf("]");
  n != -1 &&
    s != -1 &&
    (e =
      e.substring(0, n) +
      e.substring(n, s).replace(/:/g, ";") +
      e.substring(s, e.length));
  let i = Ua.exec(e || ""),
    r = {},
    o = 14;
  for (; o--; ) r[ja[o]] = i[o] || "";
  return (
    n != -1 &&
      s != -1 &&
      ((r.source = t),
      (r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":")),
      (r.authority = r.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (r.ipv6uri = !0)),
    (r.pathNames = qa(r, r.path)),
    (r.queryKey = Ka(r, r.query)),
    r
  );
}
function qa(e, t) {
  const n = /\/{2,9}/g,
    s = t.replace(n, "/").split("/");
  return (
    (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1),
    t.slice(-1) == "/" && s.splice(s.length - 1, 1),
    s
  );
}
function Ka(e, t) {
  const n = {};
  return (
    t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (s, i, r) {
      i && (n[i] = r);
    }),
    n
  );
}
let ho = class vt extends le {
  constructor(t, n = {}) {
    super(),
      (this.writeBuffer = []),
      t && typeof t == "object" && ((n = t), (t = null)),
      t
        ? ((t = bs(t)),
          (n.hostname = t.host),
          (n.secure = t.protocol === "https" || t.protocol === "wss"),
          (n.port = t.port),
          t.query && (n.query = t.query))
        : n.host && (n.hostname = bs(n.host).host),
      Wn(this, n),
      (this.secure =
        n.secure != null
          ? n.secure
          : typeof location < "u" && location.protocol === "https:"),
      n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
      (this.hostname =
        n.hostname ||
        (typeof location < "u" ? location.hostname : "localhost")),
      (this.port =
        n.port ||
        (typeof location < "u" && location.port
          ? location.port
          : this.secure
          ? "443"
          : "80")),
      (this.transports = n.transports || ["polling", "websocket"]),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !0,
        },
        n
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") +
        (this.opts.addTrailingSlash ? "/" : "")),
      typeof this.opts.query == "string" &&
        (this.opts.query = Pa(this.opts.query)),
      (this.id = null),
      (this.upgrades = null),
      (this.pingInterval = null),
      (this.pingTimeout = null),
      (this.pingTimeoutTimer = null),
      typeof addEventListener == "function" &&
        (this.opts.closeOnBeforeunload &&
          ((this.beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener("beforeunload", this.beforeunloadEventListener, !1)),
        this.hostname !== "localhost" &&
          ((this.offlineEventListener = () => {
            this.onClose("transport close", {
              description: "network connection lost",
            });
          }),
          addEventListener("offline", this.offlineEventListener, !1))),
      this.open();
  }
  createTransport(t) {
    const n = Object.assign({}, this.opts.query);
    (n.EIO = so), (n.transport = t), this.id && (n.sid = this.id);
    const s = Object.assign({}, this.opts.transportOptions[t], this.opts, {
      query: n,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port,
    });
    return new Ha[t](s);
  }
  open() {
    let t;
    if (
      this.opts.rememberUpgrade &&
      vt.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
    )
      t = "websocket";
    else if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else t = this.transports[0];
    this.readyState = "opening";
    try {
      t = this.createTransport(t);
    } catch {
      this.transports.shift(), this.open();
      return;
    }
    t.open(), this.setTransport(t);
  }
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = t),
      t
        .on("drain", this.onDrain.bind(this))
        .on("packet", this.onPacket.bind(this))
        .on("error", this.onError.bind(this))
        .on("close", (n) => this.onClose("transport close", n));
  }
  probe(t) {
    let n = this.createTransport(t),
      s = !1;
    vt.priorWebsocketSuccess = !1;
    const i = () => {
      s ||
        (n.send([{ type: "ping", data: "probe" }]),
        n.once("packet", (h) => {
          if (!s)
            if (h.type === "pong" && h.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", n), !n)
              )
                return;
              (vt.priorWebsocketSuccess = n.name === "websocket"),
                this.transport.pause(() => {
                  s ||
                    (this.readyState !== "closed" &&
                      (d(),
                      this.setTransport(n),
                      n.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", n),
                      (n = null),
                      (this.upgrading = !1),
                      this.flush()));
                });
            } else {
              const g = new Error("probe error");
              (g.transport = n.name), this.emitReserved("upgradeError", g);
            }
        }));
    };
    function r() {
      s || ((s = !0), d(), n.close(), (n = null));
    }
    const o = (h) => {
      const g = new Error("probe error: " + h);
      (g.transport = n.name), r(), this.emitReserved("upgradeError", g);
    };
    function c() {
      o("transport closed");
    }
    function l() {
      o("socket closed");
    }
    function u(h) {
      n && h.name !== n.name && r();
    }
    const d = () => {
      n.removeListener("open", i),
        n.removeListener("error", o),
        n.removeListener("close", c),
        this.off("close", l),
        this.off("upgrading", u);
    };
    n.once("open", i),
      n.once("error", o),
      n.once("close", c),
      this.once("close", l),
      this.once("upgrading", u),
      n.open();
  }
  onOpen() {
    if (
      ((this.readyState = "open"),
      (vt.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush(),
      this.readyState === "open" && this.opts.upgrade)
    ) {
      let t = 0;
      const n = this.upgrades.length;
      for (; t < n; t++) this.probe(this.upgrades[t]);
    }
  }
  onPacket(t) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          this.resetPingTimeout(),
            this.sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong");
          break;
        case "error":
          const n = new Error("server error");
          (n.code = t.data), this.onError(n);
          break;
        case "message":
          this.emitReserved("data", t.data),
            this.emitReserved("message", t.data);
          break;
      }
  }
  onHandshake(t) {
    this.emitReserved("handshake", t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this.upgrades = this.filterUpgrades(t.upgrades)),
      (this.pingInterval = t.pingInterval),
      (this.pingTimeout = t.pingTimeout),
      (this.maxPayload = t.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer),
      (this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose("ping timeout");
      }, this.pingInterval + this.pingTimeout)),
      this.opts.autoUnref && this.pingTimeoutTimer.unref();
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen),
      (this.prevBufferLen = 0),
      this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const t = this.getWritablePackets();
      this.transport.send(t),
        (this.prevBufferLen = t.length),
        this.emitReserved("flush");
    }
  }
  getWritablePackets() {
    if (
      !(
        this.maxPayload &&
        this.transport.name === "polling" &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer;
    let n = 1;
    for (let s = 0; s < this.writeBuffer.length; s++) {
      const i = this.writeBuffer[s].data;
      if ((i && (n += Oa(i)), s > 0 && n > this.maxPayload))
        return this.writeBuffer.slice(0, s);
      n += 2;
    }
    return this.writeBuffer;
  }
  write(t, n, s) {
    return this.sendPacket("message", t, n, s), this;
  }
  send(t, n, s) {
    return this.sendPacket("message", t, n, s), this;
  }
  sendPacket(t, n, s, i) {
    if (
      (typeof n == "function" && ((i = n), (n = void 0)),
      typeof s == "function" && ((i = s), (s = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    (s = s || {}), (s.compress = s.compress !== !1);
    const r = { type: t, data: n, options: s };
    this.emitReserved("packetCreate", r),
      this.writeBuffer.push(r),
      i && this.once("flush", i),
      this.flush();
  }
  close() {
    const t = () => {
        this.onClose("forced close"), this.transport.close();
      },
      n = () => {
        this.off("upgrade", n), this.off("upgradeError", n), t();
      },
      s = () => {
        this.once("upgrade", n), this.once("upgradeError", n);
      };
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? s() : t();
            })
          : this.upgrading
          ? s()
          : t()),
      this
    );
  }
  onError(t) {
    (vt.priorWebsocketSuccess = !1),
      this.emitReserved("error", t),
      this.onClose("transport error", t);
  }
  onClose(t, n) {
    (this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing") &&
      (this.clearTimeoutFn(this.pingTimeoutTimer),
      this.transport.removeAllListeners("close"),
      this.transport.close(),
      this.transport.removeAllListeners(),
      typeof removeEventListener == "function" &&
        (removeEventListener(
          "beforeunload",
          this.beforeunloadEventListener,
          !1
        ),
        removeEventListener("offline", this.offlineEventListener, !1)),
      (this.readyState = "closed"),
      (this.id = null),
      this.emitReserved("close", t, n),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0));
  }
  filterUpgrades(t) {
    const n = [];
    let s = 0;
    const i = t.length;
    for (; s < i; s++) ~this.transports.indexOf(t[s]) && n.push(t[s]);
    return n;
  }
};
ho.protocol = so;
function Wa(e, t = "", n) {
  let s = e;
  (n = n || (typeof location < "u" && location)),
    e == null && (e = n.protocol + "//" + n.host),
    typeof e == "string" &&
      (e.charAt(0) === "/" &&
        (e.charAt(1) === "/" ? (e = n.protocol + e) : (e = n.host + e)),
      /^(https?|wss?):\/\//.test(e) ||
        (typeof n < "u" ? (e = n.protocol + "//" + e) : (e = "https://" + e)),
      (s = bs(e))),
    s.port ||
      (/^(http|ws)$/.test(s.protocol)
        ? (s.port = "80")
        : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")),
    (s.path = s.path || "/");
  const r = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return (
    (s.id = s.protocol + "://" + r + ":" + s.port + t),
    (s.href =
      s.protocol + "://" + r + (n && n.port === s.port ? "" : ":" + s.port)),
    s
  );
}
const Va = typeof ArrayBuffer == "function",
  za = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  po = Object.prototype.toString,
  Ya =
    typeof Blob == "function" ||
    (typeof Blob < "u" && po.call(Blob) === "[object BlobConstructor]"),
  Ja =
    typeof File == "function" ||
    (typeof File < "u" && po.call(File) === "[object FileConstructor]");
function zs(e) {
  return (
    (Va && (e instanceof ArrayBuffer || za(e))) ||
    (Ya && e instanceof Blob) ||
    (Ja && e instanceof File)
  );
}
function vn(e, t) {
  if (!e || typeof e != "object") return !1;
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++) if (vn(e[n])) return !0;
    return !1;
  }
  if (zs(e)) return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return vn(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && vn(e[n])) return !0;
  return !1;
}
function Qa(e) {
  const t = [],
    n = e.data,
    s = e;
  return (
    (s.data = vs(n, t)), (s.attachments = t.length), { packet: s, buffers: t }
  );
}
function vs(e, t) {
  if (!e) return e;
  if (zs(e)) {
    const n = { _placeholder: !0, num: t.length };
    return t.push(e), n;
  } else if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let s = 0; s < e.length; s++) n[s] = vs(e[s], t);
    return n;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (n[s] = vs(e[s], t));
    return n;
  }
  return e;
}
function Xa(e, t) {
  return (e.data = ws(e.data, t)), delete e.attachments, e;
}
function ws(e, t) {
  if (!e) return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++) e[n] = ws(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = ws(e[n], t));
  return e;
}
const Za = 5;
var H;
(function (e) {
  (e[(e.CONNECT = 0)] = "CONNECT"),
    (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
    (e[(e.EVENT = 2)] = "EVENT"),
    (e[(e.ACK = 3)] = "ACK"),
    (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (e[(e.BINARY_ACK = 6)] = "BINARY_ACK");
})(H || (H = {}));
class Ga {
  constructor(t) {
    this.replacer = t;
  }
  encode(t) {
    return (t.type === H.EVENT || t.type === H.ACK) && vn(t)
      ? this.encodeAsBinary({
          type: t.type === H.EVENT ? H.BINARY_EVENT : H.BINARY_ACK,
          nsp: t.nsp,
          data: t.data,
          id: t.id,
        })
      : [this.encodeAsString(t)];
  }
  encodeAsString(t) {
    let n = "" + t.type;
    return (
      (t.type === H.BINARY_EVENT || t.type === H.BINARY_ACK) &&
        (n += t.attachments + "-"),
      t.nsp && t.nsp !== "/" && (n += t.nsp + ","),
      t.id != null && (n += t.id),
      t.data != null && (n += JSON.stringify(t.data, this.replacer)),
      n
    );
  }
  encodeAsBinary(t) {
    const n = Qa(t),
      s = this.encodeAsString(n.packet),
      i = n.buffers;
    return i.unshift(s), i;
  }
}
class Ys extends le {
  constructor(t) {
    super(), (this.reviver = t);
  }
  add(t) {
    let n;
    if (typeof t == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(t);
      const s = n.type === H.BINARY_EVENT;
      s || n.type === H.BINARY_ACK
        ? ((n.type = s ? H.EVENT : H.ACK),
          (this.reconstructor = new ef(n)),
          n.attachments === 0 && super.emitReserved("decoded", n))
        : super.emitReserved("decoded", n);
    } else if (zs(t) || t.base64)
      if (this.reconstructor)
        (n = this.reconstructor.takeBinaryData(t)),
          n && ((this.reconstructor = null), super.emitReserved("decoded", n));
      else throw new Error("got binary data when not reconstructing a packet");
    else throw new Error("Unknown type: " + t);
  }
  decodeString(t) {
    let n = 0;
    const s = { type: Number(t.charAt(0)) };
    if (H[s.type] === void 0) throw new Error("unknown packet type " + s.type);
    if (s.type === H.BINARY_EVENT || s.type === H.BINARY_ACK) {
      const r = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; );
      const o = t.substring(r, n);
      if (o != Number(o) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      s.attachments = Number(o);
    }
    if (t.charAt(n + 1) === "/") {
      const r = n + 1;
      for (; ++n && !(t.charAt(n) === "," || n === t.length); );
      s.nsp = t.substring(r, n);
    } else s.nsp = "/";
    const i = t.charAt(n + 1);
    if (i !== "" && Number(i) == i) {
      const r = n + 1;
      for (; ++n; ) {
        const o = t.charAt(n);
        if (o == null || Number(o) != o) {
          --n;
          break;
        }
        if (n === t.length) break;
      }
      s.id = Number(t.substring(r, n + 1));
    }
    if (t.charAt(++n)) {
      const r = this.tryParse(t.substr(n));
      if (Ys.isPayloadValid(s.type, r)) s.data = r;
      else throw new Error("invalid payload");
    }
    return s;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case H.CONNECT:
        return typeof n == "object";
      case H.DISCONNECT:
        return n === void 0;
      case H.CONNECT_ERROR:
        return typeof n == "string" || typeof n == "object";
      case H.EVENT:
      case H.BINARY_EVENT:
        return Array.isArray(n) && n.length > 0;
      case H.ACK:
      case H.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class ef {
  constructor(t) {
    (this.packet = t), (this.buffers = []), (this.reconPack = t);
  }
  takeBinaryData(t) {
    if (
      (this.buffers.push(t), this.buffers.length === this.reconPack.attachments)
    ) {
      const n = Xa(this.reconPack, this.buffers);
      return this.finishedReconstruction(), n;
    }
    return null;
  }
  finishedReconstruction() {
    (this.reconPack = null), (this.buffers = []);
  }
}
const tf = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: Ys,
      Encoder: Ga,
      get PacketType() {
        return H;
      },
      protocol: Za,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function Re(e, t, n) {
  return (
    e.on(t, n),
    function () {
      e.off(t, n);
    }
  );
}
const nf = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class go extends le {
  constructor(t, n, s) {
    super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = n),
      s && s.auth && (this.auth = s.auth),
      (this._opts = Object.assign({}, s)),
      this.io._autoConnect && this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const t = this.io;
    this.subs = [
      Re(t, "open", this.onopen.bind(this)),
      Re(t, "packet", this.onpacket.bind(this)),
      Re(t, "error", this.onerror.bind(this)),
      Re(t, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this;
  }
  emit(t, ...n) {
    if (nf.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (
      (n.unshift(t),
      this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
    )
      return this._addToQueue(n), this;
    const s = { type: H.EVENT, data: n };
    if (
      ((s.options = {}),
      (s.options.compress = this.flags.compress !== !1),
      typeof n[n.length - 1] == "function")
    ) {
      const o = this.ids++,
        c = n.pop();
      this._registerAckCallback(o, c), (s.id = o);
    }
    const i =
      this.io.engine &&
      this.io.engine.transport &&
      this.io.engine.transport.writable;
    return (
      (this.flags.volatile && (!i || !this.connected)) ||
        (this.connected
          ? (this.notifyOutgoingListeners(s), this.packet(s))
          : this.sendBuffer.push(s)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(t, n) {
    var s;
    const i =
      (s = this.flags.timeout) !== null && s !== void 0
        ? s
        : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[t] = n;
      return;
    }
    const r = this.io.setTimeoutFn(() => {
      delete this.acks[t];
      for (let o = 0; o < this.sendBuffer.length; o++)
        this.sendBuffer[o].id === t && this.sendBuffer.splice(o, 1);
      n.call(this, new Error("operation has timed out"));
    }, i);
    this.acks[t] = (...o) => {
      this.io.clearTimeoutFn(r), n.apply(this, [null, ...o]);
    };
  }
  emitWithAck(t, ...n) {
    const s = this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0;
    return new Promise((i, r) => {
      n.push((o, c) => (s ? (o ? r(o) : i(c)) : i(o))), this.emit(t, ...n);
    });
  }
  _addToQueue(t) {
    let n;
    typeof t[t.length - 1] == "function" && (n = t.pop());
    const s = {
      id: this.ids++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    t.push((i, ...r) =>
      s !== this._queue[0]
        ? void 0
        : (i !== null
            ? s.tryCount > this._opts.retries &&
              (this._queue.shift(), n && n(i))
            : (this._queue.shift(), n && n(null, ...r)),
          (s.pending = !1),
          this._drainQueue())
    ),
      this._queue.push(s),
      this._drainQueue();
  }
  _drainQueue() {
    if (this._queue.length === 0) return;
    const t = this._queue[0];
    if (t.pending) return;
    (t.pending = !0), t.tryCount++;
    const n = this.ids;
    (this.ids = t.id),
      (this.flags = t.flags),
      this.emit.apply(this, t.args),
      (this.ids = n);
  }
  packet(t) {
    (t.nsp = this.nsp), this.io._packet(t);
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((t) => {
          this._sendConnectPacket(t);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(t) {
    this.packet({
      type: H.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
        : t,
    });
  }
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  onclose(t, n) {
    (this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", t, n);
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case H.CONNECT:
          t.data && t.data.sid
            ? this.onconnect(t.data.sid, t.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                )
              );
          break;
        case H.EVENT:
        case H.BINARY_EVENT:
          this.onevent(t);
          break;
        case H.ACK:
        case H.BINARY_ACK:
          this.onack(t);
          break;
        case H.DISCONNECT:
          this.ondisconnect();
          break;
        case H.CONNECT_ERROR:
          this.destroy();
          const s = new Error(t.data.message);
          (s.data = t.data.data), this.emitReserved("connect_error", s);
          break;
      }
  }
  onevent(t) {
    const n = t.data || [];
    t.id != null && n.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(n)
        : this.receiveBuffer.push(Object.freeze(n));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const s of n) s.apply(this, t);
    }
    super.emit.apply(this, t),
      this._pid &&
        t.length &&
        typeof t[t.length - 1] == "string" &&
        (this._lastOffset = t[t.length - 1]);
  }
  ack(t) {
    const n = this;
    let s = !1;
    return function (...i) {
      s || ((s = !0), n.packet({ type: H.ACK, id: t, data: i }));
    };
  }
  onack(t) {
    const n = this.acks[t.id];
    typeof n == "function" && (n.apply(this, t.data), delete this.acks[t.id]);
  }
  onconnect(t, n) {
    (this.id = t),
      (this.recovered = n && this._pid === n),
      (this._pid = n),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved("connect");
  }
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => {
        this.notifyOutgoingListeners(t), this.packet(t);
      }),
      (this.sendBuffer = []);
  }
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
      this.io._destroy(this);
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: H.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(t) {
    return (this.flags.compress = t), this;
  }
  get volatile() {
    return (this.flags.volatile = !0), this;
  }
  timeout(t) {
    return (this.flags.timeout = t), this;
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    );
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    );
  }
  offAny(t) {
    if (!this._anyListeners) return this;
    if (t) {
      const n = this._anyListeners;
      for (let s = 0; s < n.length; s++)
        if (t === n[s]) return n.splice(s, 1), this;
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    );
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    );
  }
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners) return this;
    if (t) {
      const n = this._anyOutgoingListeners;
      for (let s = 0; s < n.length; s++)
        if (t === n[s]) return n.splice(s, 1), this;
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const s of n) s.apply(this, t.data);
    }
  }
}
function Nt(e) {
  (e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0);
}
Nt.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e);
    e = Math.floor(t * 10) & 1 ? e + n : e - n;
  }
  return Math.min(e, this.max) | 0;
};
Nt.prototype.reset = function () {
  this.attempts = 0;
};
Nt.prototype.setMin = function (e) {
  this.ms = e;
};
Nt.prototype.setMax = function (e) {
  this.max = e;
};
Nt.prototype.setJitter = function (e) {
  this.jitter = e;
};
class xs extends le {
  constructor(t, n) {
    var s;
    super(),
      (this.nsps = {}),
      (this.subs = []),
      t && typeof t == "object" && ((n = t), (t = void 0)),
      (n = n || {}),
      (n.path = n.path || "/socket.io"),
      (this.opts = n),
      Wn(this, n),
      this.reconnection(n.reconnection !== !1),
      this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(n.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5
      ),
      (this.backoff = new Nt({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(n.timeout == null ? 2e4 : n.timeout),
      (this._readyState = "closed"),
      (this.uri = t);
    const i = n.parser || tf;
    (this.encoder = new i.Encoder()),
      (this.decoder = new i.Decoder()),
      (this._autoConnect = n.autoConnect !== !1),
      this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), this)
      : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this);
  }
  reconnectionDelay(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        (n = this.backoff) === null || n === void 0 || n.setMin(t),
        this);
  }
  randomizationFactor(t) {
    var n;
    return t === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        (n = this.backoff) === null || n === void 0 || n.setJitter(t),
        this);
  }
  reconnectionDelayMax(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        (n = this.backoff) === null || n === void 0 || n.setMax(t),
        this);
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect();
  }
  open(t) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new ho(this.uri, this.opts);
    const n = this.engine,
      s = this;
    (this._readyState = "opening"), (this.skipReconnect = !1);
    const i = Re(n, "open", function () {
        s.onopen(), t && t();
      }),
      r = Re(n, "error", (o) => {
        s.cleanup(),
          (s._readyState = "closed"),
          this.emitReserved("error", o),
          t ? t(o) : s.maybeReconnectOnOpen();
      });
    if (this._timeout !== !1) {
      const o = this._timeout;
      o === 0 && i();
      const c = this.setTimeoutFn(() => {
        i(), n.close(), n.emit("error", new Error("timeout"));
      }, o);
      this.opts.autoUnref && c.unref(),
        this.subs.push(function () {
          clearTimeout(c);
        });
    }
    return this.subs.push(i), this.subs.push(r), this;
  }
  connect(t) {
    return this.open(t);
  }
  onopen() {
    this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
    const t = this.engine;
    this.subs.push(
      Re(t, "ping", this.onping.bind(this)),
      Re(t, "data", this.ondata.bind(this)),
      Re(t, "error", this.onerror.bind(this)),
      Re(t, "close", this.onclose.bind(this)),
      Re(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  ondecoded(t) {
    uo(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  onerror(t) {
    this.emitReserved("error", t);
  }
  socket(t, n) {
    let s = this.nsps[t];
    return (
      s || ((s = new go(this, t, n)), (this.nsps[t] = s)),
      this._autoConnect && s.connect(),
      s
    );
  }
  _destroy(t) {
    const n = Object.keys(this.nsps);
    for (const s of n) if (this.nsps[s].active) return;
    this._close();
  }
  _packet(t) {
    const n = this.encoder.encode(t);
    for (let s = 0; s < n.length; s++) this.engine.write(n[s], t.options);
  }
  cleanup() {
    this.subs.forEach((t) => t()),
      (this.subs.length = 0),
      this.decoder.destroy();
  }
  _close() {
    (this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"),
      this.engine && this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(t, n) {
    this.cleanup(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", t, n),
      this._reconnection && !this.skipReconnect && this.reconnect();
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1);
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const s = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved("reconnect_attempt", t.backoff.attempts),
          !t.skipReconnect &&
            t.open((i) => {
              i
                ? ((t._reconnecting = !1),
                  t.reconnect(),
                  this.emitReserved("reconnect_error", i))
                : t.onreconnect();
            }));
      }, n);
      this.opts.autoUnref && s.unref(),
        this.subs.push(function () {
          clearTimeout(s);
        });
    }
  }
  onreconnect() {
    const t = this.backoff.attempts;
    (this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", t);
  }
}
const $t = {};
function wn(e, t) {
  typeof e == "object" && ((t = e), (e = void 0)), (t = t || {});
  const n = Wa(e, t.path || "/socket.io"),
    s = n.source,
    i = n.id,
    r = n.path,
    o = $t[i] && r in $t[i].nsps,
    c = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let l;
  return (
    c ? (l = new xs(s, t)) : ($t[i] || ($t[i] = new xs(s, t)), (l = $t[i])),
    n.query && !t.query && (t.query = n.queryKey),
    l.socket(n.path, t)
  );
}
Object.assign(wn, { Manager: xs, Socket: go, io: wn, connect: wn });
const mo = wn(),
  sf = { class: "flex gap-4 justify-center" },
  rf = { class: "flex gap-4 flex-col" },
  of = Le({
    __name: "Streamdeck",
    async setup(e) {
      let t, n;
      const s = gt(),
        i = (([t, n] = zr(() => ra())), (t = await t), n(), t);
      return (
        Mn(() => {
          mo.on("buttonStateChange", (r) => {
            var c;
            r = JSON.parse(r);
            const o =
              (c = s.configState) == null ? void 0 : c.buttonSettings[r.index];
            o && (o.typeSpecifigConfig.state = r.message);
          });
        }),
        (r, o) => (
          Q(),
          se("div", null, [
            (Q(!0),
            se(
              fe,
              null,
              Qt(
                V(i),
                (c, l) => (
                  Q(),
                  se("div", sf, [
                    (Q(!0),
                    se(
                      fe,
                      null,
                      Qt(
                        c,
                        (u, d) => (
                          Q(),
                          se("div", rf, [
                            ae(
                              ga,
                              { "normalized-index": c.length * l + d },
                              null,
                              8,
                              ["normalized-index"]
                            ),
                          ])
                        )
                      ),
                      256
                    )),
                  ])
                )
              ),
              256
            )),
          ])
        )
      );
    },
  });
const cf = Se(of, [["__scopeId", "data-v-e9993e75"]]),
  Js = (e) => (Pt("data-v-c78d6a10"), (e = e()), Ft(), e),
  lf = { class: "flex flex-col" },
  af = Js(() => I("label", { for: "path" }, "Path", -1)),
  ff = Js(() => I("br", null, null, -1)),
  uf = Js(() => I("label", { for: "message" }, "Message", -1)),
  hf = Le({
    __name: "ButtonSettings",
    setup(e) {
      const t = gt(),
        s = en(t).getActiveButton;
      return (i, r) => (
        Q(),
        se("div", lf, [
          af,
          St(
            I(
              "input",
              {
                type: "text",
                name: "path",
                "onUpdate:modelValue":
                  r[0] || (r[0] = (o) => (V(s).typeSpecifigConfig.path = o)),
              },
              null,
              512
            ),
            [[At, V(s).typeSpecifigConfig.path]]
          ),
          ff,
          uf,
          St(
            I(
              "input",
              {
                type: "text",
                name: "message",
                "onUpdate:modelValue":
                  r[1] || (r[1] = (o) => (V(s).typeSpecifigConfig.message = o)),
                placeholder: "sends 'true' if empty",
              },
              null,
              512
            ),
            [[At, V(s).typeSpecifigConfig.message]]
          ),
        ])
      );
    },
  });
const df = Se(hf, [["__scopeId", "data-v-c78d6a10"]]),
  tn = (e) => (Pt("data-v-075f3303"), (e = e()), Ft(), e),
  pf = { class: "flex flex-col" },
  gf = tn(() => I("label", { for: "path" }, "Path", -1)),
  mf = tn(() => I("br", null, null, -1)),
  _f = tn(() => I("label", { for: "incomingPath" }, "incomingPath", -1)),
  yf = tn(() => I("br", null, null, -1)),
  bf = tn(() => I("label", { for: "message" }, "Message", -1)),
  vf = Le({
    __name: "SwitchSettings",
    setup(e) {
      const t = gt(),
        s = en(t).getActiveButton;
      return (i, r) => (
        Q(),
        se("div", pf, [
          gf,
          St(
            I(
              "input",
              {
                type: "text",
                name: "path",
                "onUpdate:modelValue":
                  r[0] || (r[0] = (o) => (V(s).typeSpecifigConfig.path = o)),
              },
              null,
              512
            ),
            [[At, V(s).typeSpecifigConfig.path]]
          ),
          mf,
          _f,
          St(
            I(
              "input",
              {
                type: "text",
                name: "incomingPath",
                "onUpdate:modelValue":
                  r[1] ||
                  (r[1] = (o) => (V(s).typeSpecifigConfig.incomingPath = o)),
              },
              null,
              512
            ),
            [[At, V(s).typeSpecifigConfig.incomingPath]]
          ),
          yf,
          bf,
          St(
            I(
              "input",
              {
                type: "text",
                name: "message",
                "onUpdate:modelValue":
                  r[2] || (r[2] = (o) => (V(s).typeSpecifigConfig.message = o)),
                placeholder: "sends the active state if empty",
              },
              null,
              512
            ),
            [[At, V(s).typeSpecifigConfig.message]]
          ),
        ])
      );
    },
  });
const wf = Se(vf, [["__scopeId", "data-v-075f3303"]]),
  xf = Le({
    __name: "ActiveButtonLog",
    setup(e) {
      const t = gt();
      function n() {
        var s;
        mo.on(
          (s = t.getActiveButton) == null
            ? void 0
            : s.typeSpecifigConfig.incomingPath,
          () => {}
        );
      }
      return (
        t.$subscribe(() => {
          n();
        }),
        (s, i) => (Q(), se("div"))
      );
    },
  }),
  Cf = { class: "flex flex-col iconWrapper" },
  Ef = { class: "textHolder text-center" },
  Sf = Le({
    __name: "Icon",
    props: { icon: null },
    setup(e) {
      const t = e;
      Vs((r) => ({ "07116bf3": V(n) }));
      const { color: n, state: s } = t.icon,
        i = Vt(s);
      return (r, o) => (
        Q(),
        se("div", Cf, [
          I(
            "div",
            {
              class: Fe([
                "iconHolder h-full rounded-lg cursor-pointer",
                { color: V(n) },
              ]),
            },
            null,
            2
          ),
          I("div", Ef, Es(i.value), 1),
        ])
      );
    },
  });
const Af = Se(Sf, [["__scopeId", "data-v-5638a324"]]),
  Qs = Zr("ModalStore", {
    state: () => ({ visible: !1, activeButton: void 0, activeIconIndex: 0 }),
    getters: {
      getActiveIconSettings(e) {
        return e.activeButton.icons[e.activeIconIndex];
      },
    },
  });
function qi(e, t) {
  const n = Qs();
  return (
    (n.activeButton = e),
    (n.activeIconIndex = t),
    (n.visible = !0),
    new Promise((s, i) => {
      const r = n.$subscribe((o) => {
        if (n.returnString || !n.visible) {
          const c = String(n.returnString);
          r(), n.$reset(), s(c);
        }
      });
    })
  );
}
const Xs = (e) => (Pt("data-v-0154e996"), (e = e()), Ft(), e),
  Tf = Xs(() => I("div", { class: "headline" }, [I("p", null, "States")], -1)),
  Bf = { class: "icons" },
  Of = Xs(() => I("p", { class: "plus-icon" }, "+", -1)),
  kf = Xs(() => I("p", { class: "add-text" }, "add State", -1)),
  Rf = [Of, kf],
  If = Le({
    __name: "IconStates",
    setup(e) {
      const t = gt(),
        n = en(t);
      async function s() {
        const r = n.getActiveButton.value.icons;
        r.push({ state: "false", color: "#ff0000" });
        const o = n.getActiveButton.value;
        await qi(o, r.length - 1);
      }
      async function i(r) {
        const o = n.getActiveButton.value;
        await qi(o, r);
      }
      return (r, o) => (
        Q(),
        se("div", null, [
          Tf,
          I("div", Bf, [
            (Q(!0),
            se(
              fe,
              null,
              Qt(
                V(t).getActiveButton.icons,
                (c, l) => (
                  Q(),
                  Gt(
                    Af,
                    {
                      key: `${c.icon}${c.color}${c.state}`,
                      icon: c,
                      "on@update:state": (u) =>
                        (V(n).getActiveButton.value.icons[l] = u),
                      onClick: (u) => i(l),
                    },
                    null,
                    8,
                    ["icon", "on@update:state", "onClick"]
                  )
                )
              ),
              128
            )),
            I(
              "div",
              { class: "add-icon", onClick: o[0] || (o[0] = (c) => s()) },
              Rf
            ),
          ]),
        ])
      );
    },
  });
const Pf = Se(If, [["__scopeId", "data-v-0154e996"]]),
  Ff = { key: 0, class: "settings" },
  Nf = { class: "flex w-full justify-center gap-10" },
  Lf = { class: "selector-wrapper" },
  $f = { class: "flex w-full justify-center gap-10" },
  Mf = { class: "selector-wrapper" },
  Df = { class: "flex justify-end" },
  Hf = Le({
    __name: "SettingsPanel",
    setup(e) {
      const t = gt(),
        s = en(t).getActiveButton,
        i = pt(() => {
          if (s.value) {
            if (s.value.type == "buttonSwitch") return wf;
            if (s.value.type == "button") return df;
          }
        });
      function r(c) {
        s.value && (s.value.type = c);
      }
      function o(c) {
        s.value && (s.value.protocol = c);
      }
      return (c, l) =>
        V(s)
          ? (Q(),
            se("div", Ff, [
              I("div", Nf, [
                I("div", Lf, [
                  I(
                    "div",
                    {
                      class: Fe([
                        "selector left",
                        V(s).protocol == "MQTT" ? "active" : "",
                      ]),
                      onClick: l[0] || (l[0] = (u) => o("MQTT")),
                    },
                    " MQTT ",
                    2
                  ),
                  I(
                    "div",
                    {
                      class: Fe([
                        "selector right",
                        V(s).protocol == "HTTP" ? "active" : "",
                      ]),
                      onClick: l[1] || (l[1] = (u) => o("HTTP")),
                    },
                    " HTTP ",
                    2
                  ),
                ]),
              ]),
              I("div", $f, [
                I("div", Mf, [
                  I(
                    "div",
                    {
                      onClick: l[2] || (l[2] = (u) => r("button")),
                      class: Fe([
                        "selector left",
                        V(s).type == "button" ? "active" : "",
                      ]),
                    },
                    " Button ",
                    2
                  ),
                  I(
                    "div",
                    {
                      class: Fe([
                        "selector right",
                        V(s).type == "buttonSwitch" ? "active" : "",
                      ]),
                      onClick: l[3] || (l[3] = (u) => r("buttonSwitch")),
                    },
                    " Switch ",
                    2
                  ),
                ]),
              ]),
              I("div", null, [(Q(), Gt(Rr(V(i))))]),
              ae(Pf),
              I("div", Df, [
                I(
                  "div",
                  {
                    class: "save-button",
                    onClick: l[4] || (l[4] = (u) => V(t).updateConfig()),
                  },
                  "Save"
                ),
              ]),
              ae(xf),
            ]))
          : Kr("", !0);
    },
  });
const Uf = Se(Hf, [["__scopeId", "data-v-f85e326f"]]),
  jf = (e) => (Pt("data-v-5dc37282"), (e = e()), Ft(), e),
  qf = { class: "flex flex-col h-full" },
  Kf = jf(() =>
    I(
      "div",
      { class: "h-2/3 flex justify-center items-center" },
      [I("div", { class: "color" })],
      -1
    )
  ),
  Wf = { class: "flex flex-wrap p-5 gap-2 overflow-auto" },
  Vf = ["onClick"],
  zf = { class: "colorBlock" },
  Yf = Le({
    __name: "ModalColorPicker",
    setup(e) {
      Vs((c) => ({ dc380c2e: V(i) }));
      const t = Qs(),
        s = en(t).getActiveIconSettings,
        i = pt(() => {
          var c;
          return ((c = s.value) == null ? void 0 : c.color) || r[0];
        });
      var r = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
        "#FF1A66",
        "#E6331A",
        "#33FFCC",
        "#66994D",
        "#B366CC",
        "#4D8000",
        "#B33300",
        "#CC80CC",
        "#66664D",
        "#991AFF",
        "#E666FF",
        "#4DB3FF",
        "#1AB399",
        "#E666B3",
        "#33991A",
        "#CC9999",
        "#B3B31A",
        "#00E680",
        "#4D8066",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#9900B3",
        "#E64D66",
        "#4DB380",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF",
      ];
      s.value.color = s.value.color || r[0];
      function o(c) {
        const l = c.target;
        s.value.color = l.value;
      }
      return (c, l) => (
        Q(),
        se("div", qf, [
          Kf,
          I("div", Wf, [
            (Q(!0),
            se(
              fe,
              null,
              Qt(
                V(r),
                (u) => (
                  Q(),
                  se(
                    "div",
                    {
                      class: "colorBlock",
                      style: Tn(`background-color:${u};`),
                      onClick: (d) => (V(s).color = u),
                    },
                    null,
                    12,
                    Vf
                  )
                )
              ),
              256
            )),
            I("div", zf, [I("input", { type: "color", onInput: o }, null, 32)]),
          ]),
        ])
      );
    },
  });
const Ki = Se(Yf, [["__scopeId", "data-v-5dc37282"]]),
  Jf = {};
function Qf(e, t) {
  return Q(), se("div");
}
const Xf = Se(Jf, [["render", Qf]]),
  Zf = {};
function Gf(e, t) {
  return Q(), se("div");
}
const eu = Se(Zf, [["render", Gf]]),
  tu = (e) => (Pt("data-v-3630e1fe"), (e = e()), Ft(), e),
  nu = { key: 0, class: "modalWrapper" },
  su = { class: "modal" },
  iu = { class: "modalNavigation" },
  ru = ["onClick"],
  ou = { class: "absolute bottom-0 w-full" },
  cu = { class: "flex flex-col px-5" },
  lu = tu(() =>
    I("label", { for: "stateName", class: "text-center" }, " State ", -1)
  ),
  au = { class: "modalContent" },
  fu = Le({
    __name: "Modal",
    setup(e) {
      const t = Vt(!1),
        n = {
          colorPicker: "Color Picker",
          prefabAssets: "Prefab Assets",
          yourAssets: "Your Assets",
        },
        s = Qs(),
        i = Vt("colorPicker"),
        r = pt(() => {
          switch (i.value) {
            case "colorPicker":
              return Ki;
            case "prefabAssets":
              return Xf;
            case "yourAssets":
              return eu;
            default:
              return Ki;
          }
        });
      function o(u) {
        i.value = u;
      }
      const c = pt(() => {
        var g;
        const u = s.getActiveIconSettings,
          d = s.activeIconIndex;
        return !!(
          (g = s.activeButton) != null &&
          g.icons.find((S, R) => S.state === u.state && R !== d)
        );
      });
      function l() {
        if (!s.getActiveIconSettings.state || c.value) {
          t.value = !0;
          return;
        }
        s.visible = !1;
      }
      return (u, d) =>
        V(s).visible
          ? (Q(),
            se("div", nu, [
              I("div", su, [
                I("div", iu, [
                  (Q(),
                  se(
                    fe,
                    null,
                    Qt(n, (h, g) =>
                      I(
                        "div",
                        {
                          onClick: (S) => o(g),
                          class: Fe([
                            "navigationItem",
                            { active: g === i.value },
                          ]),
                        },
                        Es(h),
                        11,
                        ru
                      )
                    ),
                    64
                  )),
                  I("div", ou, [
                    I("div", cu, [
                      lu,
                      St(
                        I(
                          "input",
                          {
                            type: "text",
                            "onUpdate:modelValue":
                              d[0] ||
                              (d[0] = (h) =>
                                (V(s).getActiveIconSettings.state = h)),
                            onInput: d[1] || (d[1] = (h) => (t.value = !1)),
                            class: Fe([
                              "state-input text-black",
                              { isInvalid: t.value },
                            ]),
                          },
                          null,
                          34
                        ),
                        [[At, V(s).getActiveIconSettings.state]]
                      ),
                    ]),
                    I("div", { class: "save-button", onClick: l }, "Save"),
                  ]),
                ]),
                I("div", au, [(Q(), Gt(Rr(V(r))))]),
              ]),
            ]))
          : Kr("", !0);
    },
  });
const uu = Se(fu, [["__scopeId", "data-v-3630e1fe"]]),
  hu = { class: "appWrapper" },
  du = { class: "flex w-full h-full justify-center items-center" },
  pu = Le({
    __name: "App",
    setup(e) {
      return (t, n) => (
        Q(),
        se("div", hu, [
          ae(uu),
          ae(sa),
          (Q(),
          Gt(Tc, null, {
            default: Cr(() => [
              I("div", du, [ae(cf, { class: "w-full" }), ae(Uf)]),
            ]),
            _: 1,
          })),
        ])
      );
    },
  });
const gu = Se(pu, [["__scopeId", "data-v-89ef2bde"]]),
  mu = aa();
Jl(gu).use(mu).mount("#app");
