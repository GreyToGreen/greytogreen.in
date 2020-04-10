var boltDomainName = null,
  isBoltCached = !1,
  ICPconfTemp = null,
  boltMob =
    (!/(tablet|ipad|playbook|PAD)|(android(?!.*(mobi|opera mini)))/i.test(
      navigator.userAgent
    ) &&
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      )) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    ),
  boltIsIE = function () {
    var b = window.navigator.userAgent,
      g = b.indexOf("MSIE "),
      m = b.indexOf("Trident/"),
      d = b.indexOf("Edge/"),
      h = b.indexOf("XiaoMi/MiuiBrowser"),
      b = b.indexOf("XiaoMi");
    return -1 < g || -1 < m || -1 < d || -1 < h || -1 < b ? !0 : !1;
  },
  boltPayId = null,
  boltiOS = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  boltiPad = -1 < navigator.userAgent.indexOf("iPad") && !window.MSStream,
  boltMacOs =
    -1 != navigator.appVersion.indexOf("Mac") &&
    0 <= navigator.userAgent.search("Safari")
      ? !0
      : !1,
  boltLTIE9 = !document.addEventListener && boltIsIE,
  boltOpera =
    boltMob &&
    (-1 != navigator.userAgent.indexOf("OPR") ||
      -1 != navigator.userAgent.indexOf("OPiOS")) &&
    -1 != navigator.userAgent.indexOf("Version"),
  boltUCBrowser = boltiOS
    ? !1
    : -1 != navigator.userAgent.indexOf("UCBrowser") &&
      "Mobile" == navigator.userAgent.substr(navigator.userAgent.length - 6),
  boltIphoneFirefox =
    boltMob && boltiOS && -1 !== navigator.userAgent.indexOf("FxiOS"),
  boltSupported = boltOpera || boltLTIE9 || boltUCBrowser || boltIphoneFirefox,
  boltIProp = "",
  boltPrefetcher = null,
  boltIphoneCss = document.createElement("style"),
  bolt_color = document.getElementById("bolt").getAttribute("bolt-color"),
  bolt_logo = document.getElementById("bolt").getAttribute("bolt-logo"),
  bolt_purchase_from = document
    .getElementById("bolt")
    .getAttribute("bolt-purchase-from"),
  bolt_mid = document.getElementById("bolt").getAttribute("bolt-mid"),
  bolt_switch = !1,
  bolt_invoice = !1,
  bolt_event = !1,
  bolt_webfront = !1,
  bolt_webstore = !1,
  bolt_button = !1,
  bolt_payunow = !1,
  bolt_sibutton = !1,
  bolt_sidynamic = !1,
  bolt_selfpay = !1;
String.prototype.startsWith ||
  Object.defineProperty(String.prototype, "startsWith", {
    value: function (b, g) {
      g = !g || 0 > g ? 0 : +g;
      return this.substring(g, g + b.length) === b;
    },
  });
bolt_color = bolt_color ? bolt_color : "";
bolt_logo = bolt_logo ? bolt_logo : "";
try {
  (bolt_color = bolt_color.replace(/#/g, "")),
    (bolt_color = /^[0-9A-F]{3,6}$/i.test(bolt_color) ? bolt_color : "");
} catch (e) {
  bolt_color = "";
}
var bolt_mid = bolt_mid && "" != bolt_mid ? bolt_mid : "",
  isBoltEnabledParam = "\x26merchantId\x3d" + bolt_mid + "\x26merchantKey\x3d",
  bolt_purchase_from = (function () {
    switch (bolt_purchase_from) {
      case "INVOICE":
        bolt_invoice = !0;
        isBoltEnabledParam = "purchaseFrom\x3dinvoice" + isBoltEnabledParam;
        bolt_purchase_from = "INVOICE";
        break;
      case "EVENTS":
        bolt_event = !0;
        isBoltEnabledParam = "purchaseFrom\x3devents" + isBoltEnabledParam;
        bolt_purchase_from = "EVENTS";
        break;
      case "WEBFRONT":
        bolt_webfront = !0;
        isBoltEnabledParam = "purchaseFrom\x3dwebfront" + isBoltEnabledParam;
        bolt_purchase_from = "webfront";
        break;
      case "WEBSTORE":
        bolt_webstore = !0;
        isBoltEnabledParam = "purchaseFrom\x3dwebstore" + isBoltEnabledParam;
        bolt_purchase_from = "webstore";
        break;
      case "BUTTON":
        bolt_button = !0;
        isBoltEnabledParam =
          "purchaseFrom\x3dPayuMoneyButton" + isBoltEnabledParam;
        bolt_purchase_from = "PayuMoneyButton";
        break;
      case "PAYUNOW_WEBSITE":
        bolt_payunow = !0;
        isBoltEnabledParam =
          "purchaseFrom\x3dPAYUNOW_WEBSITE" + isBoltEnabledParam;
        bolt_purchase_from = "PAYUNOW_WEBSITE";
        break;
      case "SIDYNAMIC":
        bolt_sidynamic = !0;
        isBoltEnabledParam = "purchaseFrom\x3dSiDynamic" + isBoltEnabledParam;
        bolt_purchase_from = "SiDynamic";
        break;
      case "SIBUTTON":
        bolt_sibutton = !0;
        isBoltEnabledParam = "purchaseFrom\x3dSiButton" + isBoltEnabledParam;
        bolt_purchase_from = "SiButton";
        break;
      case "PAYUMONEY_SELFPAY":
        bolt_selfpay = !0;
        isBoltEnabledParam =
          "purchaseFrom\x3dPAYUMONEY_SELFPAY" + isBoltEnabledParam;
        bolt_purchase_from = "PAYUMONEY_SELFPAY";
        break;
      default:
        (bolt_purchase_from = "THIRD_PARTY"), (isBoltEnabledParam = null);
    }
    return bolt_purchase_from;
  })(),
  boltIProp = boltMob
    ? boltiOS
      ? "display:block;position:absolute;visibility:hidden;width:100%;height:100%;height:100vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;"
      : "display:block;position:fixed;visibility:visible;width:100%;height:100%;height:100vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;"
    : boltiPad
    ? "display:block;position:absolute;visibility:hidden;width:100%;height:100%;height:100vh;left:0;right:0;bottom:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;"
    : boltiOS
    ? "display:block;position:fixed;visibility:hidden;width:100%;height:100%;height:100vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;"
    : "display:block;position:fixed;visibility:visible;width:100%;height:100%;height:100vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;",
  boltIframe = null;
window.onbeforeunload = function () {};
(function () {
  function b(b) {
    var d = new XMLHttpRequest();
    d.open("POST", boltDomainName + "/payu/icpcheckout/isBoltEnabled", !0);
    d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    d.onreadystatechange = function () {
      bolt_switch = !1;
      if (d.readyState == XMLHttpRequest.DONE && 200 == d.status) {
        try {
          JSON.parse(d.responseText) && (bolt_switch = !0);
        } catch (b) {}
        g(bolt_switch);
      }
      d.readyState == XMLHttpRequest.DONE && 200 != d.status && g(bolt_switch);
    };
    d.send(b);
  }
  function g(b) {
    b && boltPrefetcher();
    bolt_invoice &&
      "function" === typeof initiateBolt &&
      initiateBolt(bolt_switch);
  }
  boltDomainName = document.getElementById("bolt").src;
  boltDomainName =
    -1 < boltDomainName.indexOf("/static")
      ? boltDomainName.substring(0, boltDomainName.indexOf("/static"))
      : boltDomainName.substring(0, boltDomainName.indexOf("/bolt"));
  boltDomainName = boltDomainName.replace("-static", "");
  boltPrefetcher = function () {
    var b = boltDomainName + "/icppayu/prefetcher",
      d = new XMLHttpRequest();
    d.onreadystatechange = function () {
      if (d.readyState == XMLHttpRequest.DONE && 200 == d.status) {
        var h = document.createElement("iframe");
        h.src = b;
        h.id = "loadIframe";
        h.setAttribute(
          "style",
          "display:none;position:fixed;width:0%;height:0%;left:0;bottom:0;overflow:hidden;"
        );
        h.setAttribute("allowtransparency", "true");
        h.setAttribute("frameborder", "0");
        document.getElementsByTagName("body")[0].appendChild(h);
        document.getElementById("loadIframe").onload = function () {
          var b = document.getElementById("loadIframe");
          try {
            b.parentNode.removeChild(b);
          } catch (d) {
            b.removeChild(b);
          }
        };
      }
    };
    d.open("GET", b, !0);
    d.send(null);
  };
  bolt_invoice ||
  bolt_event ||
  bolt_button ||
  bolt_webfront ||
  bolt_webstore ||
  bolt_payunow ||
  bolt_sidynamic ||
  bolt_sibutton ||
  bolt_selfpay
    ? isBoltEnabledParam
      ? b(isBoltEnabledParam)
      : boltPrefetcher()
    : boltPrefetcher();
})();
var bolt = (function () {
  var b,
    g,
    m,
    d = !0;
  Array.prototype.indexOf = function (b, d) {
    for (var g = d || 0, m = this.length; g < m; g++)
      if (this[g] === b) return g;
    return -1;
  };
  return {
    launch: function (h, p) {
      function y(a) {
        try {
          setTimeout(function () {
            d = a ? "dropout" != a.replace(/\s/g, "").toLowerCase() : !0;
          }, 0);
        } catch (b) {
          d = !0;
        }
      }
      function z() {
        b = document.getElementById("boltFrame");
        if (
          isBoltCached &&
          b &&
          JSON.stringify(ICPconfTemp) === JSON.stringify(h)
        )
          a = ICPconfTemp;
        else {
          var a = A();
          ICPconfTemp = a ? a : null;
          isBoltCached = !1;
        }
        return { ICPconf: a, isBoltCached: isBoltCached };
      }
      function B() {
        var a = document.getElementById("icpLoader"),
          b = document.getElementById("imageLoaderImg");
        if (a) (b.style.display = "block"), (a.style.display = "block");
        else {
          var f = document.body,
            k = document.documentElement,
            k = Math.max(
              f.scrollHeight,
              f.offsetHeight,
              k.clientHeight,
              k.scrollHeight,
              k.offsetHeight
            ),
            f = document.createElement("div");
          f.id = "icpLoader";
          boltMacOs
            ? f.setAttribute(
                "style",
                "height:" +
                  k +
                  "px;display:block;position:absolute;width:100%;top:0;z-index:10000;overflow:hidden;background:rgba(0, 0, 0, 0.6);"
              )
            : f.setAttribute(
                "style",
                "height:" +
                  k +
                  "px;display:block;position:absolute;width:100%;top:0;z-index:10000;overflow:hidden;background:rgba(0, 0, 0, 0.75);"
              );
          k = document.createElement("div");
          k.id = "imageLoaderImg";
          k.setAttribute(
            "style",
            "height:" +
              screen.height +
              "px;display:block;position:fixed;width:100%;left:0;z-index:10000;overflow:hidden;background:url(" +
              boltDomainName +
              "/static/kiwi/images/oval.svg) center 45% no-repeat;"
          );
          f.appendChild(k);
          if (bolt_invoice && (k = document.getElementById("invoiceLoader")))
            try {
              k.parentNode.removeChild(k), k.removeChild(k);
            } catch (d) {}
          document.body.appendChild(f);
        }
        m = b;
        g = a;
      }
      function A() {
        for (
          var a = !0,
            b = "key txnid hash amount firstname email phone productinfo surl furl".split(
              " "
            ),
            f = ["eventId", "ticketPurchaseList", "customFormData"],
            d = ["merchantId", "email", "phone", "invoiceId"],
            g = [],
            b =
              bolt_invoice ||
              bolt_event ||
              bolt_button ||
              bolt_webfront ||
              bolt_webstore ||
              bolt_payunow ||
              bolt_sidynamic ||
              bolt_sibutton ||
              bolt_selfpay
                ? bolt_invoice
                  ? d
                  : bolt_event
                  ? f
                  : bolt_button ||
                    bolt_webfront ||
                    bolt_webstore ||
                    bolt_payunow ||
                    bolt_sidynamic ||
                    bolt_sibutton ||
                    bolt_selfpay
                  ? g
                  : b
                : b,
            c = {
              str: function (a) {
                return "string" === typeof a && "" != a;
              },
              onlyString: function (a) {
                return { flg: c.str(a), msg: "should be string" };
              },
              key: function (a) {
                return c.onlyString(a);
              },
              txnid: function (a) {
                return c.onlyString(a);
              },
              hash: function (a) {
                return c.onlyString(a);
              },
              amount: function (a) {
                return {
                  flg: /(^\d+\.\d*$)|(^\d*\.\d+$)|(^\d+\.\d+$)|(^\d+$)/.test(a),
                  msg: "should be numeric",
                };
              },
              firstname: function (a) {
                return c.onlyString(a);
              },
              email: function (a) {
                return { flg: !0, msg: "is invalid" };
              },
              phone: function (a) {
                return { flg: !0, msg: "is invalid" };
              },
              productinfo: function (a) {
                return c.onlyString(a);
              },
              surl: function (a) {
                return c.onlyString(a);
              },
              furl: function (a) {
                return c.onlyString(a);
              },
              merchantId: function (a) {
                return c.onlyString(a);
              },
              invoiceId: function (a) {
                return c.onlyString(a);
              },
              eventId: function (a) {
                return { flg: /^\d+$/.test(a), msg: "should be numeric" };
              },
              ticketPurchaseList: function (a) {
                return c.onlyString(a);
              },
              customFormData: function (a) {
                return c.onlyString(a);
              },
            },
            f = 0;
          f < b.length;
          f++
        )
          if (b[f] in h) {
            if (((d = c[b[f]]), (d = d(h[b[f]])), !d.flg))
              return q(b[f] + ": " + d.msg), (a = !1);
          } else return q(b[f] + ": mandatory param is missing"), (a = !1);
        return a ? h : null;
      }
      function C() {
        var a =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : !1;
        boltIframe = document.createElement("iframe");
        boltIframe.name = "boltFrame";
        boltIframe.id = "boltFrame";
        a && boltIframe.setAttribute("class", a);
        boltIframe.setAttribute("style", boltIProp);
        boltIframe.setAttribute("allowtransparency", "true");
        boltIframe.setAttribute("frameborder", "0");
      }
      function w() {
        var a = document.head || document.getElementsByTagName("head")[0];
        boltIphoneCss.type = "text/css";
        boltIphoneCss.id = "boltIphone";
        boltIphoneCss.styleSheet
          ? (boltIphoneCss.styleSheet.cssText =
              "body {overflow: hidden !important;}")
          : boltIphoneCss.appendChild(
              document.createTextNode("body {overflow: hidden !important;}")
            );
        a.appendChild(boltIphoneCss);
      }
      function x(a) {
        p && p.responseHandler && p.responseHandler({ response: a });
      }
      function q(a) {
        p && p.catchException && p.catchException({ message: a });
      }
      function r() {
        b = document.getElementById("boltFrame");
        s(b);
      }
      function u() {
        g = document.getElementById("icpLoader");
        s(g);
      }
      function v() {
        var a = document.getElementById("boltIphone");
        a && (a.innerHTML = "");
        s(document.getElementById("boltIphone"));
      }
      function s(a) {
        if (a) {
          try {
            a.parentNode.removeChild(a);
          } catch (b) {}
          try {
            a.removeChild(a);
          } catch (d) {}
        }
      }
      if (boltSupported)
        q("Sorry ! This browser is not supported. Please choose another.");
      else {
        y(h.mode);
        delete h.mode;
        var c = z();
        if (c.ICPconf)
          if ((h.noLoader || B(), c.isBoltCached && b && !bolt_invoice)) {
            if ((boltiOS && boltMob) || boltiPad) window.scrollTo(0, 0), w();
            g.style.display = "block";
            b.style.display = "block";
            b.contentWindow.postMessage({ evt: "cache" }, "*");
          } else {
            null != b && r();
            var n = "boltFrame";
            c.ICPconf.boltEnabled = "true";
            if (
              bolt_invoice ||
              bolt_event ||
              bolt_button ||
              bolt_webfront ||
              bolt_webstore ||
              bolt_payunow ||
              bolt_sidynamic ||
              bolt_sibutton ||
              bolt_selfpay
            )
              (n = bolt_switch ? "boltFrame" : ""),
                (c.ICPconf.boltEnabled = JSON.stringify(bolt_switch));
            c.ICPconf.purchaseFrom = bolt_purchase_from;
            c.ICPconf.service_provider = "payu_paisa";
            c.ICPconf.color = bolt_color;
            c.ICPconf.logo = bolt_logo;
            if (n) {
              C(h.customClass);
              b = document.getElementById("boltFrame");
              var l = document.getElementsByTagName("body")[0];
              "INVOICE" === bolt_purchase_from &&
                document.getElementsByClassName("invoice-main-container")[0] &&
                (l = document.getElementsByClassName(
                  "invoice-main-container"
                )[0]);
              l.appendChild(boltIframe);
            }
            var D = boltDomainName + "/payu/icpcheckout/",
              l = document.createElement("form");
            l.setAttribute("method", "POST");
            l.setAttribute("action", D);
            l.setAttribute("id", "boltForm");
            l.setAttribute("target", n);
            for (var t in c.ICPconf)
              c.ICPconf.hasOwnProperty(t) &&
                ((n = document.createElement("input")),
                n.setAttribute("type", "hidden"),
                n.setAttribute("name", t),
                n.setAttribute(
                  "value",
                  c.ICPconf[t] ? c.ICPconf[t].toString() : ""
                ),
                l.appendChild(n));
            document.body.appendChild(l);
            try {
              l.submit();
            } catch (E) {
              r(), u(), q("Payment processing failed. Please try again later");
            }
            if (boltiOS || boltiPad) window.scrollTo(0, 0), w();
            s(document.getElementById("boltForm"));
          }
        else q("Payment processing failed. Please try again later");
      }
      c = window.addEventListener ? "addEventListener" : "attachEvent";
      (0, window[c])(
        "attachEvent" == c ? "onmessage" : "message",
        function (a) {
          var c = a.message ? "message" : "data";
          a = a[c] && "string" == typeof a[c] ? JSON.parse(a[c]) : a[c];
          c = a.evt;
          delete a.evt;
          b = document.getElementById("boltFrame");
          g = document.getElementById("icpLoader");
          m = document.getElementById("imageLoaderImg");
          "PayuMoneyButton" != ICPconfTemp.purchaseFrom &&
            "PAYUNOW_WEBSITE" != ICPconfTemp.purchaseFrom &&
            "webfront" != ICPconfTemp.purchaseFrom &&
            "webstore" != ICPconfTemp.purchaseFrom &&
            delete ICPconfTemp.purchaseFrom;
          delete ICPconfTemp.service_provider;
          delete ICPconfTemp.boltEnabled;
          delete ICPconfTemp.color;
          delete ICPconfTemp.logo;
          switch (c) {
            case "bolt-close":
              isBoltCached = !1;
              delete a.evt;
              a.txnStatus = "success" === a.status ? "SUCCESS" : "FAILED";
              a.txnMessage =
                "success" === a.status
                  ? "Transaction Successful"
                  : a.error_Message;
              boltPayId = null;
              r();
              if (d) u(), ((boltiOS && boltMob) || boltiPad) && v(), x(a);
              else {
                var f = "",
                  f =
                    "SUCCESS" == a.txnStatus
                      ? a.surl
                        ? a.surl
                        : a.postUrl
                      : a.furl
                      ? a.furl
                      : a.postUrl;
                "" == f || f.startsWith("http") || (f = "http://" + f);
                c = document.createElement("form");
                c.setAttribute("method", "POST");
                c.setAttribute("action", f);
                for (var k in a)
                  (f = document.createElement("input")),
                    f.setAttribute("type", "hidden"),
                    f.setAttribute("name", k),
                    f.setAttribute("value", a[k]),
                    c.appendChild(f);
                document.body.appendChild(c);
                c.submit();
              }
              break;
            case "bolt-cancel":
              isBoltCached = !0;
              delete a.evt;
              boltPayId = a.boltId;
              a.txnStatus = "CANCEL";
              a.txnMessage = a.boltMsg;
              delete a.boltMsg;
              delete a.boltId;
              g.style.display = "none";
              b.style.display = "none";
              ((boltiOS && boltMob) || boltiPad) && v();
              x(a);
              break;
            case "bolt-launched":
              if (
                b &&
                ((b.style.visibility = "visible"),
                m && (m.style.display = "none"),
                b.contentWindow)
              )
                try {
                  b.contentWindow.focus();
                } catch (h) {}
              break;
            case "bolt-cached":
              isBoltCached = !0;
              break;
            case "bolt-ohFish":
              r();
              u();
              ((boltiOS && boltMob) || boltiPad) && v();
              q(a.errMsg);
              break;
            case "bolt-previous-id":
              try {
                boltPayId &&
                  b.contentWindow.postMessage(
                    { evt: "new", id: boltPayId },
                    "*"
                  );
              } catch (l) {}
          }
        },
        !1
      );
    },
    aurthor: "Jaysinh Gohil",
    version: "2.0-08.01.19",
  };
})();
