!function(t) {
    var e = {};
    function n(r) {
        if (e[r])
            return e[r].exports;
        var i = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(i.exports, i, i.exports, n),
        i.l = !0,
        i.exports
    }
    n.m = t,
    n.c = e,
    n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }
    ,
    n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(t, e) {
        if (1 & e && (t = n(t)),
        8 & e)
            return t;
        if (4 & e && "object" == typeof t && t && t.__esModule)
            return t;
        var r = Object.create(null);
        if (n.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }),
        2 & e && "string" != typeof t)
            for (var i in t)
                n.d(r, i, function(e) {
                    return t[e]
                }
                .bind(null, i));
        return r
    }
    ,
    n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return n.d(e, "a", e),
        e
    }
    ,
    n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    n.p = "",
    n(n.s = 0)
}([function(t, e, n) {
    "use strict";
    n.r(e);
    var r = {};
    function i(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            n.push.apply(n, r)
        }
        return n
    }
    function o(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? i(Object(n), !0).forEach((function(e) {
                a(t, e, n[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }
            ))
        }
        return t
    }
    function a(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n,
        t
    }
    function l(t, e) {
        if (null != t)
            if ("string" == typeof t || "number" == typeof t)
                e.push(t.toString());
            else if (Array.isArray(t))
                for (var n = 0; n < t.length; n++)
                    l(t[n], e);
            else
                e.push(t)
    }
    function c(t, e) {
        for (var n = [], r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
            i[a - 2] = arguments[a];
        return l(i, n),
        "function" == typeof t ? t(o({}, e, {
            children: n
        })) : {
            tag: t,
            props: e,
            children: n
        }
    }
    function s(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            n.push.apply(n, r)
        }
        return n
    }
    function u(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n,
        t
    }
    n.r(r),
    n.d(r, "DAY", (function() {
        return f
    }
    )),
    n.d(r, "addDays", (function() {
        return p
    }
    )),
    n.d(r, "getDates", (function() {
        return h
    }
    )),
    n.d(r, "textWidth", (function() {
        return d
    }
    )),
    n.d(r, "formatMonth", (function() {
        return g
    }
    )),
    n.d(r, "formatDay", (function() {
        return v
    }
    )),
    n.d(r, "minDate", (function() {
        return m
    }
    )),
    n.d(r, "maxDate", (function() {
        return b
    }
    )),
    n.d(r, "max", (function() {
        return x
    }
    )),
    n.d(r, "p2s", (function() {
        return w
    }
    )),
    n.d(r, "s2p", (function() {
        return O
    }
    )),
    n.d(r, "formatData", (function() {
        return k
    }
    )),
    n.d(r, "hasPath", (function() {
        return j
    }
    )),
    n.d(r, "toposort", (function() {
        return D
    }
    )),
    n.d(r, "autoSchedule", (function() {
        return P
    }
    ));
    var f = 864e5;
    function p(t, e) {
        var n = new Date(t.valueOf());
        return n.setDate(n.getDate() + e),
        n
    }
    function h(t, e) {
        var n = []
          , r = new Date(t);
        for (r.setHours(24, 0, 0, 0); r.getTime() <= e; )
            n.push(r.getTime()),
            r = p(r, 1);
        return n
    }
    var y = null;
    function d(t, e, n) {
        return (y = y || document.createElement("canvas").getContext("2d")).font = e,
        y.measureText(t).width + n
    }
    function g(t) {
        var e = t.getFullYear()
          , n = t.getMonth() + 1;
        return "".concat(e, "/").concat(n > 9 ? n : "0".concat(n))
    }
    function v(t) {
        var e = t.getMonth() + 1
          , n = t.getDate();
        return "".concat(e, "/").concat(n)
    }
    function m(t, e) {
        return t && e ? t > e ? e : t : t || e
    }
    function b(t, e) {
        return t && e ? t < e ? e : t : t || e
    }
    function x(t, e) {
        return t.length ? Math.max.apply(null, t) : e
    }
    function w(t) {
        return t.map((function(t) {
            return "".concat(t[0], ",").concat(t[1])
        }
        )).join(" ")
    }
    function O(t) {
        return t.split(" ").map((function(t) {
            var e = t.split(",");
            return [parseFloat(e[0]), parseFloat(e[1])]
        }
        ))
    }
    function k(t, e, n) {
        var r = {}
          , i = t.map((function(t, e) {
            return r[t.id] = e,
            function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? s(Object(n), !0).forEach((function(e) {
                        u(t, e, n[e])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                    }
                    ))
                }
                return t
            }({}, t, {
                children: [],
                links: []
            })
        }
        ))
          , o = [];
        i.forEach((function(t) {
            var e = i[r[t.parent]];
            e ? e.children.push(t) : o.push(t)
        }
        )),
        e.forEach((function(t) {
            var e = i[r[t.source]]
              , n = i[r[t.target]];
            e && n && e.links.push(t)
        }
        )),
        function t(e, n) {
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                i.level = "".concat(n).concat(r + 1),
                i.text = "".concat(i.level, " ").concat(i.name),
                t(i.children, "".concat(i.level, "."))
            }
        }(o, ""),
        function t(e) {
            for (var n = null, r = null, i = 0, o = 0; o < e.length; o++) {
                var a = e[o];
                if (a.children.length) {
                    var l = t(a.children);
                    a.start = l.start,
                    a.end = l.end,
                    a.percent = l.percent,
                    l.start && l.end ? a.duration = (l.end - l.start) / f : a.duration = 0
                } else
                    a.percent = a.percent || 0,
                    a.start && (a.end = p(a.start, a.duration || 0)),
                    "milestone" === a.type && (a.end = a.start);
                n = m(n, a.start),
                r = b(r, a.end),
                i += a.percent
            }
            return e.length && (i /= e.length),
            {
                start: n,
                end: r,
                percent: i
            }
        }(o),
        n && n(o);
        var a = [];
        return o.forEach((function(t) {
            var e = [];
            for (e.push(t); e.length; ) {
                var n = e.pop()
                  , r = n.children.length;
                r && (n.type = "group"),
                a.push(n);
                for (var i = r - 1; i >= 0; i--)
                    e.push(n.children[i])
            }
        }
        )),
        a
    }
    function j(t, e, n) {
        var r = [];
        for (r.push(t[e]); r.length; ) {
            var i = r.pop();
            if (i.id === n)
                return !0;
            for (var o = 0; o < i.links.length; o++)
                r.push(i.links[o])
        }
        return !1
    }
    function D(t) {
        var e = {};
        t.forEach((function(t) {
            var n = function(t) {
                return {
                    id: t,
                    out: [],
                    in: 0
                }
            };
            e[t.source] = n(t.source),
            e[t.target] = n(t.target)
        }
        ));
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            e[r.target].in++,
            e[r.source].out.push(n)
        }
        for (var i = Object.keys(e).map((function(t) {
            return e[t].id
        }
        )).filter((function(t) {
            return !e[t].in
        }
        )), o = []; i.length; ) {
            var a = i.pop();
            o.push(a);
            for (var l = 0; l < e[a].out.length; l++) {
                var c = e[a].out[l]
                  , s = e[t[c].target];
                s.in--,
                s.in || i.push(s.id)
            }
        }
        return o
    }
    function P(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
          , r = {};
        e.forEach((function(t) {
            r[t.source] = {
                id: t.source,
                links: []
            },
            r[t.target] = {
                id: t.target,
                links: []
            }
        }
        ));
        var i = [];
        e.forEach((function(t) {
            var e = t.source
              , n = t.target;
            j(r, n, e) || (i.push(t),
            r[e].links.push(r[n]))
        }
        ));
        for (var o = D(i), a = {}, l = 0; l < t.length; l++) {
            var c = t[l];
            "milestone" === c.type && (c.duration = 0),
            a[c.id] = l
        }
        var s = {};
        o.forEach((function(t) {
            s[t] = []
        }
        )),
        i.forEach((function(t) {
            s[t.target].push(t)
        }
        )),
        o.forEach((function(e) {
            var r = t[a[e]];
            if (r) {
                var i = r.duration || 0;
                if (!n || "milestone" !== r.type) {
                    for (var o = null, l = null, c = 0; c < s[e].length; c++) {
                        var u = s[e][c]
                          , f = t[a[u.source]];
                        if (f && f.start) {
                            var h = p(f.start, u.lag || 0)
                              , y = p(h, f.duration || 0);
                            "SS" === u.type && (o = b(o, h)),
                            "FS" === u.type && (o = b(o, y)),
                            "SF" === u.type && (l = b(l, h)),
                            "FF" === u.type && (l = b(l, y))
                        }
                    }
                    l && (r.start = p(l, -i)),
                    o && (r.start = o)
                }
            }
        }
        ))
    }
    function T(t) {
        var e = t.styles
          , n = t.width
          , r = t.height
          , i = t.offsetY
          , o = t.thickWidth
          , a = t.maxTextWidth
          , l = o / 2;
        return c("g", null, c("rect", {
            x: l,
            y: l,
            width: n - o,
            height: r - o,
            style: e.box
        }), c("line", {
            x1: 0,
            x2: n,
            y1: i - l,
            y2: i - l,
            style: e.bline
        }), c("line", {
            x1: a,
            x2: n,
            y1: i / 2,
            y2: i / 2,
            style: e.line
        }))
    }
    function S(t) {
        var e = t.styles
          , n = t.dates
          , r = t.unit
          , i = t.offsetY
          , o = t.minTime
          , a = t.maxTime
          , l = t.maxTextWidth
          , s = n.filter((function(t) {
            return 1 === new Date(t).getDate()
        }
        ));
        s.unshift(o),
        s.push(a);
        for (var u = [], f = l, p = i / 2, h = s.length - 1, y = 0; y < h; y++) {
            var d = g(new Date(s[y]))
              , v = f + (s[y] - o) / r
              , m = (s[y + 1] - s[y]) / r;
            u.push(c("g", null, c("line", {
                x1: v,
                x2: v,
                y1: 0,
                y2: p,
                style: e.line
            }), m > 50 ? c("text", {
                x: v + m / 2,
                y: .25 * i,
                style: e.text3
            }, d) : null))
        }
        return c("g", null, u)
    }
    function E(t) {
        for (var e = t.styles, n = t.unit, r = t.minTime, i = t.maxTime, o = t.height, a = t.offsetY, l = t.maxTextWidth, s = h(r, i), u = [], f = l, p = a / 2, y = o - p, d = s.length - 1, g = 0; g < d; g++) {
            var v = new Date(s[g])
              , m = v.getDay()
              , b = f + (s[g] - r) / n
              , x = (s[g + 1] - s[g]) / n;
            u.push(c("g", null, 0 === m || 6 === m ? c("rect", {
                x: b,
                y: p,
                width: x,
                height: y,
                style: e.week
            }) : null, c("line", {
                x1: b,
                x2: b,
                y1: p,
                y2: a,
                style: e.line
            }), c("text", {
                x: b + x / 2,
                y: .75 * a,
                style: e.text3
            }, v.getDate()), g === d - 1 ? c("line", {
                x1: b + x,
                x2: b + x,
                y1: p,
                y2: a,
                style: e.line
            }) : null))
        }
        return c("g", null, c(S, {
            styles: e,
            unit: n,
            dates: s,
            offsetY: a,
            minTime: r,
            maxTime: i,
            maxTextWidth: l
        }), u)
    }
    function C(t) {
        var e = t.styles
          , n = t.unit
          , r = t.minTime
          , i = t.maxTime
          , o = t.height
          , a = t.offsetY
          , l = t.maxTextWidth
          , s = h(r, i)
          , u = s.filter((function(t) {
            return 0 === new Date(t).getDay()
        }
        ));
        u.push(i);
        for (var y = [], d = l, g = a, v = o - g, m = f / n, b = u.length - 1, x = 0; x < b; x++) {
            var w = new Date(u[x])
              , O = d + (u[x] - r) / n
              , k = w.getDate()
              , j = p(w, -1).getDate();
            y.push(c("g", null, c("rect", {
                x: O - m,
                y: g,
                width: 2 * m,
                height: v,
                style: e.week
            }), c("line", {
                x1: O,
                x2: O,
                y1: a / 2,
                y2: a,
                style: e.line
            }), c("text", {
                x: O + 3,
                y: .75 * a,
                style: e.text2
            }, k), O - d > 28 ? c("text", {
                x: O - 3,
                y: .75 * a,
                style: e.text1
            }, j) : null))
        }
        return c("g", null, c(S, {
            styles: e,
            unit: n,
            dates: s,
            offsetY: a,
            minTime: r,
            maxTime: i,
            maxTextWidth: l
        }), y)
    }
    function F(t) {
        var e = t.styles
          , n = t.months
          , r = t.unit
          , i = t.offsetY
          , o = t.minTime
          , a = t.maxTime
          , l = t.maxTextWidth
          , s = n.filter((function(t) {
            return 0 === new Date(t).getMonth()
        }
        ));
        s.unshift(o),
        s.push(a);
        for (var u = [], f = l, p = i / 2, h = s.length - 1, y = 0; y < h; y++) {
            var d = new Date(s[y])
              , g = f + (s[y] - o) / r
              , v = (s[y + 1] - s[y]) / r;
            u.push(c("g", null, c("line", {
                x1: g,
                x2: g,
                y1: 0,
                y2: p,
                style: e.line
            }), v > 35 ? c("text", {
                x: g + v / 2,
                y: .25 * i,
                style: e.text3
            }, d.getFullYear()) : null))
        }
        return c("g", null, u)
    }
    function W(t) {
        var e = t.styles
          , n = t.unit
          , r = t.minTime
          , i = t.maxTime
          , o = t.offsetY
          , a = t.maxTextWidth
          , l = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          , s = h(r, i).filter((function(t) {
            return 1 === new Date(t).getDate()
        }
        ));
        s.unshift(r),
        s.push(i);
        for (var u = [], f = a, p = o / 2, y = s.length - 1, d = 0; d < y; d++) {
            var g = new Date(s[d]).getMonth()
              , v = f + (s[d] - r) / n
              , m = (s[d + 1] - s[d]) / n;
            u.push(c("g", null, c("line", {
                x1: v,
                x2: v,
                y1: p,
                y2: o,
                style: e.line
            }), m > 30 ? c("text", {
                x: v + m / 2,
                y: .75 * o,
                style: e.text3
            }, l[g]) : null))
        }
        return c("g", null, c(F, {
            styles: e,
            unit: n,
            months: s,
            offsetY: o,
            minTime: r,
            maxTime: i,
            maxTextWidth: a
        }), u)
    }
    function A(t) {
        var e = t.styles
          , n = t.data
          , r = t.width
          , i = t.height
          , o = t.offsetY
          , a = t.rowHeight
          , l = t.maxTextWidth;
        return c("g", null, n.map((function(t, n) {
            var i = (n + 1) * a + o;
            return c("line", {
                key: n,
                x1: 0,
                x2: r,
                y1: i,
                y2: i,
                style: e.line
            })
        }
        )), c("line", {
            x1: l,
            x2: l,
            y1: 0,
            y2: i,
            style: e.bline
        }))
    }
    function Y(t) {
        var e = t.styles
          , n = t.data
          , r = t.onClick
          , i = t.rowHeight
          , o = t.offsetY;
        return c("g", null, n.map((function(t, n) {
            return c("text", {
                key: n,
                x: 10,
                y: (n + .5) * i + o,
                class: "gantt-label",
                style: e.label,
                onClick: function() {
                    return r(t)
                }
            }, t.text)
        }
        )))
    }
    function M(t) {
        var e = t.styles
          , n = t.data
          , r = t.unit
          , i = t.offsetY
          , o = t.minTime
          , a = t.rowHeight
          , l = t.barHeight
          , s = t.maxTextWidth
          , u = a / 2 + i
          , f = {};
        return n.forEach((function(t, e) {
            f[t.id] = e
        }
        )),
        c("g", null, n.map((function(t, i) {
            return t.end && t.start && t.links ? t.links.map((function(p) {
                var h = f[p.target]
                  , y = n[h];
                if (!y || !y.start || !y.end)
                    return null;
                var d = "milestone" === y.type ? l / 2 : 0
                  , g = u + i * a
                  , v = u + h * a
                  , m = l / 2 + 4;
                if (g > v && (m = -m),
                "FS" === p.type) {
                    var b = s + (t.end - o) / r
                      , x = s + (y.start - o) / r - d
                      , O = [[b, g], [b + 12, g]];
                    x - b >= 24 ? O.push([b + 12, v]) : (O.push([b + 12, v - m]),
                    O.push([x - 12, v - m]),
                    O.push([x - 12, v])),
                    O.push([x - 6, v]);
                    var k = [[x - 6, v - 6], [x, v], [x - 6, v + 6]];
                    return c("g", null, c("polyline", {
                        points: w(O),
                        style: e.link
                    }), c("polygon", {
                        points: w(k),
                        style: e.linkArrow
                    }))
                }
                if ("FF" === p.type) {
                    var j = s + (t.end - o) / r
                      , D = s + (y.end - o) / r + d
                      , P = [[j, g], [j + 12, g]];
                    D <= j ? P.push([j + 12, v]) : (P.push([j + 12, v - m]),
                    P.push([D + 12, v - m]),
                    P.push([D + 12, v])),
                    P.push([D + 6, v]);
                    var T = [[D + 6, v - 6], [D, v], [D + 6, v + 6]];
                    return c("g", null, c("polyline", {
                        points: w(P),
                        style: e.link
                    }), c("polygon", {
                        points: w(T),
                        style: e.linkArrow
                    }))
                }
                if ("SS" === p.type) {
                    var S = s + (t.start - o) / r
                      , E = s + (y.start - o) / r - d
                      , C = [[S, g], [S - 12, g]];
                    S <= E ? C.push([S - 12, v]) : (C.push([S - 12, v - m]),
                    C.push([E - 12, v - m]),
                    C.push([E - 12, v])),
                    C.push([E - 6, v]);
                    var F = [[E - 6, v - 6], [E, v], [E - 6, v + 6]];
                    return c("g", null, c("polyline", {
                        points: w(C),
                        style: e.link
                    }), c("polygon", {
                        points: w(F),
                        style: e.linkArrow
                    }))
                }
                if ("SF" === p.type) {
                    var W = s + (t.start - o) / r
                      , A = s + (y.end - o) / r + d
                      , Y = [[W, g], [W - 12, g]];
                    W - A >= 24 ? Y.push([W - 12, v]) : (Y.push([W - 12, v - m]),
                    Y.push([A + 12, v - m]),
                    Y.push([A + 12, v])),
                    Y.push([A + 6, v]);
                    var M = [[A + 6, v - 6], [A, v], [A + 6, v + 6]];
                    return c("g", null, c("polyline", {
                        points: w(Y),
                        style: e.link
                    }), c("polygon", {
                        points: w(M),
                        style: e.linkArrow
                    }))
                }
                return null
            }
            )) : null
        }
        )))
    }
    function B(t) {
        var e = t.styles
          , n = t.data
          , r = t.unit
          , i = t.height
          , o = t.offsetY
          , a = t.minTime
          , l = t.showDelay
          , s = t.rowHeight
          , u = t.barHeight
          , f = t.maxTextWidth
          , p = t.current
          , h = t.onClick
          , y = f
          , d = (s - u) / 2 + o
          , g = y + (p - a) / r;
        return c("g", null, p > a ? c("line", {
            x1: g,
            x2: g,
            y1: o,
            y2: i,
            style: e.cline
        }) : null, n.map((function(t, n) {
            if (!t.end || !t.start)
                return null;
            var i = function() {
                return h(t)
            }
              , o = y + (t.start - a) / r
              , f = d + n * s
              , p = f + u / 2;
            if ("milestone" === t.type) {
                var m = u / 2;
                return c("g", {
                    key: n,
                    class: "gantt-bar",
                    style: {
                        cursor: "pointer"
                    },
                    onClick: i
                }, c("polygon", {
                    points: [[o, p - m], [o + m, p], [o, p + m], [o - m, p]].map((function(t) {
                        return "".concat(t[0], ",").concat(t[1])
                    }
                    )).join(" "),
                    style: e.milestone,
                    onClick: i
                }), c("circle", {
                    class: "gantt-ctrl-start",
                    "data-id": t.id,
                    cx: o,
                    cy: p,
                    r: 6,
                    style: e.ctrl
                }))
            }
            var b = (t.end - t.start) / r
              , x = b * t.percent
              , w = "group" === t.type ? {
                back: e.groupBack,
                front: e.groupFront
            } : {
                back: e.taskBack,
                front: e.taskFront
            };
            return l && (o + x < g && t.percent < .999999 && (w.front = e.warning),
            o + b < g && t.percent < .999999 && (w.front = e.danger)),
            c("g", {
                key: n,
                class: "gantt-bar",
                style: {
                    cursor: "pointer"
                },
                onClick: i
            }, c("text", {
                x: o - 4,
                y: p,
                style: e.text1
            }, v(t.start)), c("text", {
                x: o + b + 4,
                y: p,
                style: e.text2
            }, v(t.end)), c("rect", {
                x: o,
                y: f,
                width: b,
                height: u,
                rx: 1.8,
                ry: 1.8,
                style: w.back,
                onClick: i
            }), x > 1e-6 ? c("rect", {
                x: o,
                y: f,
                width: x,
                height: u,
                rx: 1.8,
                ry: 1.8,
                style: w.front
            }) : null, "group" === t.type ? null : c("g", null, c("circle", {
                class: "gantt-ctrl-start",
                "data-id": t.id,
                cx: o - 12,
                cy: p,
                r: 6,
                style: e.ctrl
            }), c("circle", {
                class: "gantt-ctrl-finish",
                "data-id": t.id,
                cx: o + b + 12,
                cy: p,
                r: 6,
                style: e.ctrl
            })))
        }
        )))
    }
    function H(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            n.push.apply(n, r)
        }
        return n
    }
    function q(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? H(Object(n), !0).forEach((function(e) {
                L(t, e, n[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : H(Object(n)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }
            ))
        }
        return t
    }
    function L(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n,
        t
    }
    var R = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    function z(t) {
        var e = t.fontSize
          , n = void 0 === e ? "14px" : e
          , r = t.fontFamily
          , i = void 0 === r ? R : r;
        return "bold ".concat(n, " ").concat(i)
    }
    var I = {
        day: f / 28,
        week: 7 * f / 56,
        month: 30 * f / 56
    };
    function $() {}
    function _(t) {
        var e, n, r, i, o, a, l, s, u, f, p, h, y, d, g, v, m, b, x, w, O, k, j, D, P, S, F, H, L, z, _, N, J, X, U, V, G, K, Q, Z, tt, et, nt, rt = t.data, it = void 0 === rt ? [] : rt, ot = t.onClick, at = void 0 === ot ? $ : ot, lt = t.viewMode, ct = void 0 === lt ? "week" : lt, st = t.maxTextWidth, ut = void 0 === st ? 140 : st, ft = t.offsetY, pt = void 0 === ft ? 60 : ft, ht = t.rowHeight, yt = void 0 === ht ? 40 : ht, dt = t.barHeight, gt = void 0 === dt ? 16 : dt, vt = t.thickWidth, mt = void 0 === vt ? 1.4 : vt, bt = t.styleOptions, xt = void 0 === bt ? {} : bt, wt = t.showLinks, Ot = void 0 === wt || wt, kt = t.showDelay, jt = void 0 === kt || kt, Dt = t.start, Pt = t.end, Tt = I[ct], St = Dt.getTime() - 48 * Tt, Et = Pt.getTime() + 48 * Tt, Ct = (Et - St) / Tt + ut, Ft = it.length * yt + pt, Wt = "0 0 ".concat(Ct, " ").concat(Ft), At = Date.now(), Yt = (n = (e = xt).bgColor,
        r = void 0 === n ? "#fff" : n,
        i = e.lineColor,
        o = void 0 === i ? "#eee" : i,
        a = e.redLineColor,
        l = void 0 === a ? "#f04134" : a,
        s = e.groupBack,
        u = void 0 === s ? "#3db9d3" : s,
        f = e.groupFront,
        p = void 0 === f ? "#299cb4" : f,
        h = e.taskBack,
        y = void 0 === h ? "#65c16f" : h,
        d = e.taskFront,
        g = void 0 === d ? "#46ad51" : d,
        v = e.milestone,
        m = void 0 === v ? "#d33daf" : v,
        b = e.warning,
        x = void 0 === b ? "#faad14" : b,
        w = e.danger,
        O = void 0 === w ? "#f5222d" : w,
        k = e.link,
        j = void 0 === k ? "#ffa011" : k,
        D = e.textColor,
        P = void 0 === D ? "#222" : D,
        S = e.lightTextColor,
        F = void 0 === S ? "#999" : S,
        H = e.lineWidth,
        L = void 0 === H ? "1px" : H,
        z = e.thickLineWidth,
        _ = void 0 === z ? "1.4px" : z,
        N = e.fontSize,
        J = void 0 === N ? "14px" : N,
        X = e.smallFontSize,
        U = void 0 === X ? "12px" : X,
        V = e.fontFamily,
        G = void 0 === V ? R : V,
        K = e.whiteSpace,
        Q = {
            stroke: o,
            "stroke-width": L
        },
        Z = {
            stroke: l,
            "stroke-width": L
        },
        et = {
            fill: P,
            "dominant-baseline": "central",
            "font-size": J,
            "font-family": G,
            "white-space": void 0 === K ? "pre" : K
        },
        nt = {
            fill: F,
            "font-size": U
        },
        {
            week: {
                fill: "rgba(252, 248, 227, .6)"
            },
            box: q({}, tt = {
                stroke: o,
                "stroke-width": _
            }, {
                fill: r
            }),
            line: Q,
            cline: Z,
            bline: tt,
            label: et,
            groupLabel: q({}, et, {
                "font-weight": "600"
            }),
            text1: q({}, et, {}, nt, {
                "text-anchor": "end"
            }),
            text2: q({}, et, {}, nt),
            text3: q({}, et, {}, nt, {
                "text-anchor": "middle"
            }),
            link: {
                stroke: j,
                "stroke-width": "1.5px",
                fill: "none"
            },
            linkArrow: {
                fill: j
            },
            milestone: {
                fill: m
            },
            groupBack: {
                fill: u
            },
            groupFront: {
                fill: p
            },
            taskBack: {
                fill: y
            },
            taskFront: {
                fill: g
            },
            warning: {
                fill: x
            },
            danger: {
                fill: O
            },
            ctrl: {
                display: "none",
                fill: "#f0f0f0",
                stroke: "#929292",
                "stroke-width": "1px"
            }
        });
        return c("svg", {
            width: Ct,
            height: Ft,
            viewBox: Wt
        }, c(T, {
            styles: Yt,
            width: Ct,
            height: Ft,
            offsetY: pt,
            thickWidth: mt,
            maxTextWidth: ut
        }), "day" === ct ? c(E, {
            styles: Yt,
            unit: Tt,
            height: Ft,
            offsetY: pt,
            minTime: St,
            maxTime: Et,
            maxTextWidth: ut
        }) : null, "week" === ct ? c(C, {
            styles: Yt,
            unit: Tt,
            height: Ft,
            offsetY: pt,
            minTime: St,
            maxTime: Et,
            maxTextWidth: ut
        }) : null, "month" === ct ? c(W, {
            styles: Yt,
            unit: Tt,
            offsetY: pt,
            minTime: St,
            maxTime: Et,
            maxTextWidth: ut
        }) : null, c(A, {
            styles: Yt,
            data: it,
            width: Ct,
            height: Ft,
            offsetY: pt,
            rowHeight: yt,
            maxTextWidth: ut
        }), ut > 0 ? c(Y, {
            styles: Yt,
            data: it,
            onClick: at,
            offsetY: pt,
            rowHeight: yt
        }) : null, Ot ? c(M, {
            styles: Yt,
            data: it,
            unit: Tt,
            height: Ft,
            current: At,
            offsetY: pt,
            minTime: St,
            rowHeight: yt,
            barHeight: gt,
            maxTextWidth: ut
        }) : null, c(B, {
            styles: Yt,
            data: it,
            unit: Tt,
            height: Ft,
            current: At,
            offsetY: pt,
            minTime: St,
            onClick: at,
            showDelay: jt,
            rowHeight: yt,
            barHeight: gt,
            maxTextWidth: ut
        }))
    }
    function N(t) {
        return (N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        )(t)
    }
    var J = document;
    function X(t, e) {
        var n = t.tag
          , r = t.props
          , i = t.children
          , o = J.createElementNS("http://www.w3.org/2000/svg", n);
        return r && function(t, e) {
            Object.keys(e).forEach((function(n) {
                var r = e[n];
                "style" === n && "object" === N(r) ? Object.keys(r).forEach((function(e) {
                    t.style[e] = r[e]
                }
                )) : "onClick" === n ? "function" == typeof r && t.addEventListener("click", r) : t.setAttribute(n, r)
            }
            ))
        }(o, r),
        i.forEach((function(t) {
            o.appendChild("string" == typeof t ? J.createTextNode(t) : X(t, e))
        }
        )),
        o
    }
    function U() {
        return (U = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
        ).apply(this, arguments)
    }
    function V(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            n.push.apply(n, r)
        }
        return n
    }
    function G(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? V(Object(n), !0).forEach((function(e) {
                K(t, e, n[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : V(Object(n)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }
            ))
        }
        return t
    }
    function K(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n,
        t
    }
    function Q(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function Z(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r)
        }
    }
    var tt = function() {
        function t(e, n) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            Q(this, t),
            this.dom = "string" == typeof e ? document.querySelector(e) : e,
            this.format(n),
            this.options = r,
            this.render()
        }
        var e, n, r;
        return e = t,
        (n = [{
            key: "format",
            value: function(t) {
                this.data = t;
                var e = null
                  , n = null;
                t.forEach((function(t) {
                    e = m(e, t.start),
                    n = b(n, t.end)
                }
                )),
                this.start = e || new Date,
                this.end = n || new Date
            }
        }, {
            key: "setData",
            value: function(t) {
                this.format(t),
                this.render()
            }
        }, {
            key: "setOptions",
            value: function(t) {
                this.options = G({}, this.options, {}, t),
                this.render()
            }
        }, {
            key: "render",
            value: function() {
                var t = this.data
                  , e = this.start
                  , n = this.end
                  , r = this.options;
                if (this.tree && this.dom.removeChild(this.tree),
                void 0 === r.maxTextWidth) {
                    var i = z(r.styleOptions || {});
                    r.maxTextWidth = x(t.map((function(t) {
                        return d(t.text, i, 20)
                    }
                    )), 0)
                }
                var o = G({}, r, {
                    start: e,
                    end: n
                });
                this.tree = X(c(_, U({
                    data: t
                }, o))),
                this.dom.appendChild(this.tree)
            }
        }]) && Z(e.prototype, n),
        r && Z(e, r),
        t
    }();
    function et(t) {
        var e = "string" == typeof t ? document.querySelector(t) : t
          , n = e.getContext("2d")
          , r = n.webkitBackingStorePixelRatio || n.mozBackingStorePixelRatio || n.msBackingStorePixelRatio || n.oBackingStorePixelRatio || n.backingStorePixelRatio || 1
          , i = (window.devicePixelRatio || 1) / r;
        return ["width", "height"].forEach((function(t) {
            Object.defineProperty(n, t, {
                get: function() {
                    return e[t] / i
                },
                set: function(r) {
                    e[t] = r * i,
                    e.style[t] = "".concat(r, "px"),
                    n.scale(i, i)
                },
                enumerable: !0,
                configurable: !0
            })
        }
        )),
        e.addEventListener("click", (function(t) {
            if (n.onClick) {
                var r = e.getBoundingClientRect();
                n.onClick({
                    x: (t.clientX - r.left) * i,
                    y: (t.clientY - r.top) * i
                })
            }
        }
        )),
        n
    }
    function nt() {
        return (nt = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
        ).apply(this, arguments)
    }
    function rt(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            n.push.apply(n, r)
        }
        return n
    }
    function it(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? rt(Object(n), !0).forEach((function(e) {
                ot(t, e, n[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : rt(Object(n)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }
            ))
        }
        return t
    }
    function ot(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n,
        t
    }
    function at(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function lt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r)
        }
    }
    var ct = function() {
        function t(e, n) {
            var r = this
              , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            at(this, t),
            this.ctx = et(e),
            this.format(n),
            this.options = i,
            this.render(),
            this.ctx.onClick = function(t) {
                return r.render(t)
            }
        }
        var e, n, r;
        return e = t,
        (n = [{
            key: "format",
            value: function(t) {
                this.data = t;
                var e = null
                  , n = null;
                t.forEach((function(t) {
                    e = m(e, t.start),
                    n = b(n, t.end)
                }
                )),
                this.start = e || new Date,
                this.end = n || new Date
            }
        }, {
            key: "setData",
            value: function(t) {
                this.format(t),
                this.render()
            }
        }, {
            key: "setOptions",
            value: function(t) {
                this.options = it({}, this.options, {}, t),
                this.render()
            }
        }, {
            key: "render",
            value: function(t) {
                var e = this.data
                  , n = this.start
                  , r = this.end
                  , i = this.options;
                if (void 0 === i.maxTextWidth) {
                    var o = z(i.styleOptions || {});
                    i.maxTextWidth = x(e.map((function(t) {
                        return d(t.text, o, 20)
                    }
                    )), 0)
                }
                !function t(e, n, r) {
                    var i = e.tag
                      , o = e.props
                      , a = e.children;
                    if ("svg" === i) {
                        var l = o.width
                          , c = o.height;
                        n.width = l,
                        n.height = c
                    }
                    if ("line" === i) {
                        var s = o.x1
                          , u = o.x2
                          , f = o.y1
                          , p = o.y2
                          , h = o.style
                          , y = void 0 === h ? {} : h;
                        y.stroke && (n.strokeStyle = y.stroke,
                        n.lineWidth = parseFloat(y["stroke-width"] || 1)),
                        n.beginPath(),
                        n.moveTo(s, f),
                        n.lineTo(u, p),
                        n.stroke()
                    }
                    if ("polyline" === i || "polygon" === i) {
                        var d = o.points
                          , g = o.style
                          , v = void 0 === g ? {} : g
                          , m = O(d);
                        v.stroke && (n.strokeStyle = v.stroke,
                        n.lineWidth = parseFloat(v["stroke-width"] || 1)),
                        v.fill && (n.fillStyle = v.fill),
                        n.beginPath(),
                        n.moveTo(m[0][0], m[0][1]);
                        for (var b = 1; b < m.length; b++)
                            n.lineTo(m[b][0], m[b][1]);
                        "polyline" === i ? n.stroke() : n.fill()
                    }
                    if ("rect" === i) {
                        var x = o.x
                          , w = o.y
                          , k = o.width
                          , j = o.height
                          , D = o.rx
                          , P = void 0 === D ? 0 : D
                          , T = o.ry
                          , S = void 0 === T ? 0 : T
                          , E = o.onClick
                          , C = o.style
                          , F = void 0 === C ? {} : C;
                        n.beginPath(),
                        n.moveTo(x + P, w),
                        n.lineTo(x + k - P, w),
                        n.quadraticCurveTo(x + k, w, x + k, w + S),
                        n.lineTo(x + k, w + j - S),
                        n.quadraticCurveTo(x + k, w + j, x + k - P, w + j),
                        n.lineTo(x + P, w + j),
                        n.quadraticCurveTo(x, w + j, x, w + j - S),
                        n.lineTo(x, w + S),
                        n.quadraticCurveTo(x, w, x + P, w),
                        r && E && n.isPointInPath(r.x, r.y) && E(),
                        n.closePath(),
                        F.fill && (n.fillStyle = F.fill),
                        n.fill(),
                        F.stroke && (n.strokeStyle = F.stroke,
                        n.lineWidth = parseFloat(F["stroke-width"] || 1),
                        n.stroke())
                    }
                    if ("text" === i) {
                        var W = o.x
                          , A = o.y
                          , Y = o.style;
                        Y && (n.fillStyle = Y.fill,
                        n.textBaseline = {
                            central: "middle",
                            middle: "middle",
                            hanging: "hanging",
                            alphabetic: "alphabetic",
                            ideographic: "ideographic"
                        }[Y["dominant-baseline"]] || "alphabetic",
                        n.textAlign = {
                            start: "start",
                            middle: "center",
                            end: "end"
                        }[Y["text-anchor"]] || "start",
                        n.font = "".concat(Y["font-weight"] || "", " ").concat(Y["font-size"], " ").concat(Y["font-family"])),
                        n.fillText(a.join(""), W, A)
                    }
                    a.forEach((function(e) {
                        "string" != typeof e && t(e, n, r)
                    }
                    ))
                }(c(_, nt({
                    data: e
                }, it({}, i, {
                    start: n,
                    end: r
                }))), this.ctx, t)
            }
        }]) && lt(e.prototype, n),
        r && lt(e, r),
        t
    }();
    function st(t) {
        return (st = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        )(t)
    }
    function ut(t, e) {
        var n = t.tag
          , r = t.props
          , i = t.children
          , o = [];
        return o.push("<".concat(n)),
        Object.keys(r || {}).forEach((function(t) {
            var e = r[t];
            "onClick" !== t && ("style" === t && "object" === st(e) && (e = Object.keys(e).map((function(t) {
                return "".concat(t, ":").concat(e[t], ";")
            }
            )).join("")),
            o.push(" ".concat(t, '="').concat(String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;"), '"')))
        }
        )),
        i && i.length ? (o.push(">"),
        i.forEach((function(t) {
            "string" == typeof t ? o.push(String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;")) : o.push(ut(t, e))
        }
        )),
        o.push("</".concat(n, ">")),
        o.join("")) : (o.push(" />"),
        o.join(""))
    }
    function ft() {
        return (ft = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
        ).apply(this, arguments)
    }
    function pt(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            n.push.apply(n, r)
        }
        return n
    }
    function ht(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? pt(Object(n), !0).forEach((function(e) {
                yt(t, e, n[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : pt(Object(n)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }
            ))
        }
        return t
    }
    function yt(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n,
        t
    }
    function dt(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function gt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r)
        }
    }
    var vt = function() {
        function t(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            dt(this, t),
            this.format(e),
            this.options = n
        }
        var e, n, r;
        return e = t,
        (n = [{
            key: "format",
            value: function(t) {
                this.data = t;
                var e = null
                  , n = null;
                t.forEach((function(t) {
                    e = m(e, t.start),
                    n = b(n, t.end)
                }
                )),
                this.start = e || new Date,
                this.end = n || new Date
            }
        }, {
            key: "setData",
            value: function(t) {
                this.format(t)
            }
        }, {
            key: "setOptions",
            value: function(t) {
                this.options = ht({}, this.options, {}, t)
            }
        }, {
            key: "render",
            value: function() {
                var t = this.data
                  , e = this.start
                  , n = this.end;
                return ut(c(_, ft({
                    data: t
                }, ht({}, this.options, {
                    start: e,
                    end: n
                }))))
            }
        }]) && gt(e.prototype, n),
        r && gt(e, r),
        t
    }();
    var mt = function(t) {
        return document.querySelector(t)
    }
      , bt = function() {
        var t = [{
            id: 1,
            name: "Waterfall model"
        }, {
            id: 11,
            parent: 1,
            name: "Requirements"
        }, {
            id: 12,
            parent: 1,
            name: "Design"
        }, {
            id: 13,
            parent: 1,
            name: "Implement",
            type: "milestone"
        }, {
            id: 14,
            parent: 1,
            name: "Verification"
        }, {
            id: 2,
            name: "Development"
        }, {
            id: 21,
            parent: 2,
            name: "Preliminary"
        }, {
            id: 22,
            parent: 2,
            name: "Systems design"
        }, {
            id: 23,
            parent: 2,
            name: "Development"
        }, {
            id: 24,
            parent: 2,
            name: "Integration"
        }];
        return t.forEach((function(t) {
            var e, n, r;
            t.start = (e ? (r = 60 * Math.random() + 5,
            n = new Date(e)) : (r = 60 * Math.random() - 60,
            n = new Date),
            n.setDate(n.getDate() + r),
            n),
            t.duration = 90 * Math.random(),
            t.percent = Math.random()
        }
        )),
        {
            tasks: t,
            links: [{
                source: 11,
                target: 12,
                type: "FS",
                lag: 3
            }, {
                source: 12,
                target: 13,
                type: "FS",
                lag: 5
            }, {
                source: 13,
                target: 14,
                type: "FS"
            }, {
                source: 13,
                target: 21,
                type: "FS"
            }, {
                source: 23,
                target: 24,
                type: "SF"
            }]
        }
    }()
      , xt = bt.tasks
      , wt = bt.links
      , Ot = r.formatData(xt, wt)
      , kt = {
        viewMode: "week",
        onClick: function(t) {
            return console.log(t)
        }
    }
      , jt = new tt("#svg",Ot,kt)
      , Dt = new ct("#canvas",Ot,kt)
      , Pt = new vt(Ot,kt);
    function Tt() {
        mt("#str").textContent = function(t) {
            for (var e = "", n = (t = t.replace(/(>)\s*(<)(\/*)/g, "$1\n$2$3").replace(/ *(.*) +\n/g, "$1\n").replace(/(<.+>)(.+\n)/g, "$1\n$2")).split("\n"), r = 0, i = "other", o = {
                "single->single": 0,
                "single->closing": -1,
                "single->opening": 0,
                "single->other": 0,
                "closing->single": 0,
                "closing->closing": -1,
                "closing->opening": 0,
                "closing->other": 0,
                "opening->single": 1,
                "opening->closing": 0,
                "opening->opening": 1,
                "opening->other": 1,
                "other->single": 0,
                "other->closing": -1,
                "other->opening": 0,
                "other->other": 0
            }, a = 0; a < n.length; a++) {
                var l = n[a];
                if (l.match(/\s*<\?xml/))
                    e += l + "\n";
                else {
                    var c = Boolean(l.match(/<.+\/>/))
                      , s = Boolean(l.match(/<\/.+>/))
                      , u = Boolean(l.match(/<[^!].*>/))
                      , f = c ? "single" : s ? "closing" : u ? "opening" : "other"
                      , p = i + "->" + f;
                    i = f;
                    var h = "";
                    r += o[p];
                    for (var y = 0; y < r; y++)
                        h += "  ";
                    "opening->closing" == p ? e = e.substr(0, e.length - 1) + l + "\n" : e += h + l + "\n"
                }
            }
            return e
        }(Pt.render())
    }
    function St(t) {
        jt.setOptions(t),
        Dt.setOptions(t),
        Pt.setOptions(t),
        Tt()
    }
    function Et() {
        var t = r.formatData(xt, wt);
        jt.setData(t),
        Dt.setData(t),
        Pt.setData(t),
        Tt()
    }
    Tt(),
    mt("#viewMode").onchange = function(t) {
        St({
            viewMode: t.target.value
        })
    }
    ,
    mt("#showLinks").onchange = function() {
        St({
            showLinks: mt("#showLinks").checked
        })
    }
    ,
    mt("#showDelay").onchange = function() {
        St({
            showDelay: mt("#showDelay").checked
        })
    }
    ,
    mt("#autoSchedule").onclick = function() {
        r.autoSchedule(xt, wt),
        Et()
    }
    ;
    var Ct = null
      , Ft = !1
      , Wt = null
      , At = null;
    function Yt(t) {
        return t.classList.contains("gantt-ctrl-start")
    }
    function Mt(t) {
        return t.classList.contains("gantt-ctrl-finish")
    }
    document.onmousedown = function(t) {
        if (Ct = mt("svg"),
        Yt(t.target) || Mt(t.target)) {
            t.preventDefault(),
            Wt = t.target,
            document.querySelectorAll(".gantt-ctrl-start,.gantt-ctrl-finish").forEach((function(t) {
                t.style.display = "block"
            }
            )),
            Ft = !0,
            At = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var e = Wt.getAttribute("cx")
              , n = Wt.getAttribute("cy");
            At.setAttribute("x1", e),
            At.setAttribute("y1", n),
            At.setAttribute("x2", e),
            At.setAttribute("y2", n),
            At.style.stroke = "#ffa011",
            At.style["stroke-width"] = "2",
            At.style["stroke-dasharray"] = "5",
            Ct.appendChild(At)
        }
    }
    ,
    document.onmousemove = function(t) {
        if (Ft)
            if (t.preventDefault(),
            Yt(t.target) || Mt(t.target)) {
                var e = t.target.getAttribute("cx")
                  , n = t.target.getAttribute("cy");
                At.setAttribute("x2", e),
                At.setAttribute("y2", n)
            } else {
                var r = t.clientX
                  , i = t.clientY
                  , o = Ct.getBoundingClientRect();
                At.setAttribute("x2", r - o.left),
                At.setAttribute("y2", i - o.top)
            }
    }
    ,
    document.onmouseup = function(t) {
        if (Ft) {
            t.preventDefault();
            var e = Yt(t.target) || Mt(t.target);
            Wt && e && function(t, e) {
                var n = parseInt(t.dataset.id)
                  , r = parseInt(e.dataset.id)
                  , i = xt.find((function(t) {
                    return t.id === n
                }
                ))
                  , o = xt.find((function(t) {
                    return t.id === r
                }
                ))
                  , a = Yt(t) ? "S" : "F"
                  , l = Yt(e) ? "S" : "F";
                "milestone" === i.type && (a = "F"),
                "milestone" === o.type && (l = "S"),
                wt.push({
                    source: n,
                    target: r,
                    type: "".concat(a).concat(l)
                }),
                Et()
            }(Wt, t.target),
            document.querySelectorAll(".gantt-ctrl-start,.gantt-ctrl-finish").forEach((function(t) {
                t.style.display = "none"
            }
            )),
            Ft = !1,
            Wt && (Wt.style.display = "none",
            Wt = null),
            At && (Ct.removeChild(At),
            At = null)
        }
    }
}
]);
