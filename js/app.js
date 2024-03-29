(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } }),
            );
        }, t));
    },
    s = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } }),
              );
          }, t);
      }
    },
    i = (e, i = 500) => (e.hidden ? s(e, i) : t(e, i)),
    n = !0,
    r = (e = 500) => {
      document.documentElement.classList.contains("lock") ? a(e) : o(e);
    },
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    };
  function l(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function c(e) {
    return e.filter(function (e, t, s) {
      return s.indexOf(e) === t;
    });
  }
  function d(e, t) {
    const s = Array.from(e).filter(function (e, s, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const i = {},
          n = s.dataset[t].split(",");
        (i.value = n[0]),
          (i.type = n[1] ? n[1].trim() : "max"),
          (i.item = s),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = c(i);
      const n = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const s = t.split(","),
              i = s[1],
              r = s[2],
              a = window.matchMedia(s[0]),
              o = e.filter(function (e) {
                if (e.value === i && e.type === r) return !0;
              });
            n.push({ itemsArray: o, matchMedia: a });
          }),
          n
        );
    }
  }
  class u {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton,
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`,
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this),
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this),
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this),
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this),
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector,
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute,
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive,
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : r(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. ",
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          n &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive,
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            r(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`,
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && l(`[Попапос]: ${e}`);
    }
  }
  e.popup = new u({ Popup: u });
  let p = (e, t = !1, s = 500, i = 0) => {
    const n = "string" == typeof e ? document.querySelector(e) : e;
    if (n) {
      let r = "",
        o = 0;
      t &&
        ((r = "header.header"), (o = document.querySelector(r).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: s,
        header: r,
        offset: i,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (a(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", c);
      else {
        let e = n.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: o ? e - o : e, behavior: "smooth" });
      }
      l(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  let f = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
            ? this.removeError(e)
            : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`,
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error"),
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let s = t.querySelectorAll("input,textarea");
          for (let e = 0; e < s.length; e++) {
            const t = s[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              f.removeError(t);
          }
          let i = t.querySelectorAll(".checkbox__input");
          if (i.length > 0)
            for (let e = 0; e < i.length; e++) {
              i[e].checked = !1;
            }
          if (e.select) {
            let s = t.querySelectorAll(".select");
            if (s.length)
              for (let t = 0; t < s.length; t++) {
                const i = s[t].querySelector("select");
                e.select.selectBuild(i);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  var h, m;
  function g(e) {
    return "object" == typeof e && "function" == typeof e.to;
  }
  function v(e) {
    e.parentElement.removeChild(e);
  }
  function b(e) {
    return null != e;
  }
  function y(e) {
    e.preventDefault();
  }
  function w(e) {
    return "number" == typeof e && !isNaN(e) && isFinite(e);
  }
  function S(e, t, s) {
    s > 0 &&
      (C(e, t),
      setTimeout(function () {
        A(e, t);
      }, s));
  }
  function x(e) {
    return Math.max(Math.min(e, 100), 0);
  }
  function E(e) {
    return Array.isArray(e) ? e : [e];
  }
  function T(e) {
    var t = (e = String(e)).split(".");
    return t.length > 1 ? t[1].length : 0;
  }
  function C(e, t) {
    e.classList && !/\s/.test(t)
      ? e.classList.add(t)
      : (e.className += " " + t);
  }
  function A(e, t) {
    e.classList && !/\s/.test(t)
      ? e.classList.remove(t)
      : (e.className = e.className.replace(
          new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
          " ",
        ));
  }
  function L(e) {
    var t = void 0 !== window.pageXOffset,
      s = "CSS1Compat" === (e.compatMode || "");
    return {
      x: t
        ? window.pageXOffset
        : s
          ? e.documentElement.scrollLeft
          : e.body.scrollLeft,
      y: t
        ? window.pageYOffset
        : s
          ? e.documentElement.scrollTop
          : e.body.scrollTop,
    };
  }
  function O(e, t) {
    return 100 / (t - e);
  }
  function P(e, t, s) {
    return (100 * t) / (e[s + 1] - e[s]);
  }
  function M(e, t) {
    for (var s = 1; e >= t[s]; ) s += 1;
    return s;
  }
  function k(e, t, s) {
    if (s >= e.slice(-1)[0]) return 100;
    var i = M(s, e),
      n = e[i - 1],
      r = e[i],
      a = t[i - 1],
      o = t[i];
    return (
      a +
      (function (e, t) {
        return P(e, e[0] < 0 ? t + Math.abs(e[0]) : t - e[0], 0);
      })([n, r], s) /
        O(a, o)
    );
  }
  function _(e, t, s, i) {
    if (100 === i) return i;
    var n = M(i, e),
      r = e[n - 1],
      a = e[n];
    return s
      ? i - r > (a - r) / 2
        ? a
        : r
      : t[n - 1]
        ? e[n - 1] +
          (function (e, t) {
            return Math.round(e / t) * t;
          })(i - e[n - 1], t[n - 1])
        : i;
  }
  (e.select = new (class {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        (this.selectClasses = {
          classSelect: "select",
          classSelectBody: "select__body",
          classSelectTitle: "select__title",
          classSelectValue: "select__value",
          classSelectLabel: "select__label",
          classSelectInput: "select__input",
          classSelectText: "select__text",
          classSelectLink: "select__link",
          classSelectOptions: "select__options",
          classSelectOptionsScroll: "select__scroll",
          classSelectOption: "select__option",
          classSelectContent: "select__content",
          classSelectRow: "select__row",
          classSelectData: "select__asset",
          classSelectDisabled: "_select-disabled",
          classSelectTag: "_select-tag",
          classSelectOpen: "_select-open",
          classSelectActive: "_select-active",
          classSelectFocus: "_select-focus",
          classSelectMultiple: "_select-multiple",
          classSelectCheckBox: "_select-checkbox",
          classSelectOptionSelected: "_select-selected",
        }),
        (this._this = this),
        this.config.init)
      ) {
        const e = t
          ? document.querySelectorAll(t)
          : document.querySelectorAll("select");
        e.length
          ? (this.selectsInit(e),
            this.setLogging(`Проснулся, построил селектов: (${e.length})`))
          : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
      }
    }
    getSelectClass(e) {
      return `.${e}`;
    }
    getSelectElement(e, t) {
      return {
        originalSelect: e.querySelector("select"),
        selectElement: e.querySelector(this.getSelectClass(t)),
      };
    }
    selectsInit(e) {
      e.forEach((e, t) => {
        this.selectInit(e, t + 1);
      }),
        document.addEventListener(
          "click",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "focusin",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "focusout",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        );
    }
    selectInit(e, t) {
      const s = this;
      let i = document.createElement("div");
      if (
        (i.classList.add(this.selectClasses.classSelect),
        e.parentNode.insertBefore(i, e),
        i.appendChild(e),
        (e.hidden = !0),
        t && (e.dataset.id = t),
        i.insertAdjacentHTML(
          "beforeend",
          `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`,
        ),
        this.selectBuild(e),
        this.getSelectPlaceholder(e) &&
          ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
          this.getSelectPlaceholder(e).label.show))
      ) {
        this.getSelectElement(
          i,
          this.selectClasses.classSelectTitle,
        ).selectElement.insertAdjacentHTML(
          "afterbegin",
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(e).label.text
              ? this.getSelectPlaceholder(e).label.text
              : this.getSelectPlaceholder(e).value
          }</span>`,
        );
      }
      (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
        e.addEventListener("change", function (e) {
          s.selectChange(e);
        });
    }
    selectBuild(e) {
      const t = e.parentElement;
      (t.dataset.id = e.dataset.id),
        t.classList.add(
          e.getAttribute("class") ? `select_${e.getAttribute("class")}` : "",
        ),
        e.multiple
          ? t.classList.add(this.selectClasses.classSelectMultiple)
          : t.classList.remove(this.selectClasses.classSelectMultiple),
        e.hasAttribute("data-checkbox") && e.multiple
          ? t.classList.add(this.selectClasses.classSelectCheckBox)
          : t.classList.remove(this.selectClasses.classSelectCheckBox),
        this.setSelectTitleValue(t, e),
        this.setOptions(t, e),
        e.hasAttribute("data-search") && this.searchActions(t),
        e.hasAttribute("data-open") && this.selectAction(t),
        this.selectDisabled(t, e);
    }
    selectsActions(e) {
      const t = e.target,
        s = e.type;
      if (
        t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const i = t.closest(".select")
            ? t.closest(".select")
            : document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag),
                  ).dataset.selectId
                }"]`,
              ),
          n = this.getSelectElement(i).originalSelect;
        if ("click" === s) {
          if (!n.disabled)
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
            ) {
              const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag),
                ),
                s = document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`,
                );
              this.optionAction(i, n, s);
            } else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle),
              )
            )
              this.selectAction(i);
            else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption),
              )
            ) {
              const e = t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption),
              );
              this.optionAction(i, n, e);
            }
        } else
          "focusin" === s || "focusout" === s
            ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) &&
              ("focusin" === s
                ? i.classList.add(this.selectClasses.classSelectFocus)
                : i.classList.remove(this.selectClasses.classSelectFocus))
            : "keydown" === s && "Escape" === e.code && this.selectsСlose();
      } else this.selectsСlose();
    }
    selectsСlose() {
      const e = document.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect,
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`,
      );
      e.length &&
        e.forEach((e) => {
          this.selectAction(e);
        });
    }
    selectAction(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions,
        ).selectElement;
      s.classList.contains("_slide") ||
        (e.classList.toggle(this.selectClasses.classSelectOpen),
        i(s, t.dataset.speed));
    }
    setSelectTitleValue(e, t) {
      const s = this.getSelectElement(
          e,
          this.selectClasses.classSelectBody,
        ).selectElement,
        i = this.getSelectElement(
          e,
          this.selectClasses.classSelectTitle,
        ).selectElement;
      i && i.remove(),
        s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
    }
    getSelectTitleValue(e, t) {
      let s = this.getSelectedOptionsData(t, 2).html;
      if (
        (t.multiple &&
          t.hasAttribute("data-tags") &&
          ((s = this.getSelectedOptionsData(t)
            .elements.map(
              (t) =>
                `<span role="button" data-select-id="${
                  e.dataset.id
                }" data-value="${
                  t.value
                }" class="_select-tag">${this.getSelectElementContent(
                  t,
                )}</span>`,
            )
            .join("")),
          t.dataset.tags &&
            document.querySelector(t.dataset.tags) &&
            ((document.querySelector(t.dataset.tags).innerHTML = s),
            t.hasAttribute("data-search") && (s = !1))),
        (s = s.length ? s : t.dataset.placeholder),
        this.getSelectedOptionsData(t).values.length
          ? e.classList.add(this.selectClasses.classSelectActive)
          : e.classList.remove(this.selectClasses.classSelectActive),
        t.hasAttribute("data-search"))
      )
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      {
        const e =
          this.getSelectedOptionsData(t).elements.length &&
          this.getSelectedOptionsData(t).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
      }
    }
    getSelectElementContent(e) {
      const t = e.dataset.asset ? `${e.dataset.asset}` : "",
        s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
      let i = "";
      return (
        (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
        (i += t ? s : ""),
        (i += t ? "</span>" : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
        (i += e.textContent),
        (i += t ? "</span>" : ""),
        (i += t ? "</span>" : ""),
        i
      );
    }
    getSelectPlaceholder(e) {
      const t = Array.from(e.options).find((e) => !e.value);
      if (t)
        return {
          value: t.textContent,
          show: t.hasAttribute("data-show"),
          label: { show: t.hasAttribute("data-label"), text: t.dataset.label },
        };
    }
    getSelectedOptionsData(e, t) {
      let s = [];
      return (
        e.multiple
          ? (s = Array.from(e.options)
              .filter((e) => e.value)
              .filter((e) => e.selected))
          : s.push(e.options[e.selectedIndex]),
        {
          elements: s.map((e) => e),
          values: s.filter((e) => e.value).map((e) => e.value),
          html: s.map((e) => this.getSelectElementContent(e)),
        }
      );
    }
    getOptions(e) {
      let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
        s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
        i = Array.from(e.options);
      if (i.length > 0) {
        let n = "";
        return (
          ((this.getSelectPlaceholder(e) &&
            !this.getSelectPlaceholder(e).show) ||
            e.multiple) &&
            (i = i.filter((e) => e.value)),
          (n += t
            ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
            : ""),
          i.forEach((t) => {
            n += this.getOption(t, e);
          }),
          (n += t ? "</div>" : ""),
          n
        );
      }
    }
    getOption(e, t) {
      const s =
          e.selected && t.multiple
            ? ` ${this.selectClasses.classSelectOptionSelected}`
            : "",
        i = e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
        n = e.dataset.class ? ` ${e.dataset.class}` : "",
        r = !!e.dataset.href && e.dataset.href,
        a = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
      let o = "";
      return (
        (o += r
          ? `<a ${a} ${i} href="${r}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
          : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${e.value}" type="button">`),
        (o += this.getSelectElementContent(e)),
        (o += r ? "</a>" : "</button>"),
        o
      );
    }
    setOptions(e, t) {
      this.getSelectElement(
        e,
        this.selectClasses.classSelectOptions,
      ).selectElement.innerHTML = this.getOptions(t);
    }
    optionAction(e, t, s) {
      if (t.multiple) {
        s.classList.toggle(this.selectClasses.classSelectOptionSelected);
        this.getSelectedOptionsData(t).elements.forEach((e) => {
          e.removeAttribute("selected");
        });
        e.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected),
        ).forEach((e) => {
          t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
            "selected",
            "selected",
          );
        });
      } else
        t.hasAttribute("data-show-selected") ||
          (e.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption,
            )}[hidden]`,
          ) &&
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption,
              )}[hidden]`,
            ).hidden = !1),
          (s.hidden = !0)),
          (t.value = s.hasAttribute("data-value")
            ? s.dataset.value
            : s.textContent),
          this.selectAction(e);
      this.setSelectTitleValue(e, t), this.setSelectChange(t);
    }
    selectChange(e) {
      const t = e.target;
      this.selectBuild(t), this.setSelectChange(t);
    }
    setSelectChange(e) {
      if (
        (e.hasAttribute("data-validate") && f.validateInput(e),
        e.hasAttribute("data-submit") && e.value)
      ) {
        let t = document.createElement("button");
        (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
      }
      const t = e.parentElement;
      this.selectCallback(t, e);
    }
    selectDisabled(e, t) {
      t.disabled
        ? (e.classList.add(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle,
          ).selectElement.disabled = !0))
        : (e.classList.remove(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle,
          ).selectElement.disabled = !1));
    }
    searchActions(e) {
      this.getSelectElement(e).originalSelect;
      const t = this.getSelectElement(
          e,
          this.selectClasses.classSelectInput,
        ).selectElement,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions,
        ).selectElement,
        i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
        n = this;
      t.addEventListener("input", function () {
        i.forEach((e) => {
          e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
            ? (e.hidden = !1)
            : (e.hidden = !0);
        }),
          !0 === s.hidden && n.selectAction(e);
      });
    }
    selectCallback(e, t) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", { detail: { select: t } }),
      );
    }
    setLogging(e) {
      this.config.logging && l(`[select]: ${e}`);
    }
  })({})),
    (function (e) {
      (e.Range = "range"),
        (e.Steps = "steps"),
        (e.Positions = "positions"),
        (e.Count = "count"),
        (e.Values = "values");
    })(h || (h = {})),
    (function (e) {
      (e[(e.None = -1)] = "None"),
        (e[(e.NoValue = 0)] = "NoValue"),
        (e[(e.LargeValue = 1)] = "LargeValue"),
        (e[(e.SmallValue = 2)] = "SmallValue");
    })(m || (m = {}));
  var I = (function () {
      function e(e, t, s) {
        var i;
        (this.xPct = []),
          (this.xVal = []),
          (this.xSteps = []),
          (this.xNumSteps = []),
          (this.xHighestCompleteStep = []),
          (this.xSteps = [s || !1]),
          (this.xNumSteps = [!1]),
          (this.snap = t);
        var n = [];
        for (
          Object.keys(e).forEach(function (t) {
            n.push([E(e[t]), t]);
          }),
            n.sort(function (e, t) {
              return e[0][0] - t[0][0];
            }),
            i = 0;
          i < n.length;
          i++
        )
          this.handleEntryPoint(n[i][1], n[i][0]);
        for (
          this.xNumSteps = this.xSteps.slice(0), i = 0;
          i < this.xNumSteps.length;
          i++
        )
          this.handleStepPoint(i, this.xNumSteps[i]);
      }
      return (
        (e.prototype.getDistance = function (e) {
          for (var t = [], s = 0; s < this.xNumSteps.length - 1; s++)
            t[s] = P(this.xVal, e, s);
          return t;
        }),
        (e.prototype.getAbsoluteDistance = function (e, t, s) {
          var i,
            n = 0;
          if (e < this.xPct[this.xPct.length - 1])
            for (; e > this.xPct[n + 1]; ) n++;
          else
            e === this.xPct[this.xPct.length - 1] && (n = this.xPct.length - 2);
          s || e !== this.xPct[n + 1] || n++, null === t && (t = []);
          var r = 1,
            a = t[n],
            o = 0,
            l = 0,
            c = 0,
            d = 0;
          for (
            i = s
              ? (e - this.xPct[n]) / (this.xPct[n + 1] - this.xPct[n])
              : (this.xPct[n + 1] - e) / (this.xPct[n + 1] - this.xPct[n]);
            a > 0;

          )
            (o = this.xPct[n + 1 + d] - this.xPct[n + d]),
              t[n + d] * r + 100 - 100 * i > 100
                ? ((l = o * i), (r = (a - 100 * i) / t[n + d]), (i = 1))
                : ((l = ((t[n + d] * o) / 100) * r), (r = 0)),
              s
                ? ((c -= l), this.xPct.length + d >= 1 && d--)
                : ((c += l), this.xPct.length - d >= 1 && d++),
              (a = t[n + d] * r);
          return e + c;
        }),
        (e.prototype.toStepping = function (e) {
          return (e = k(this.xVal, this.xPct, e));
        }),
        (e.prototype.fromStepping = function (e) {
          return (function (e, t, s) {
            if (s >= 100) return e.slice(-1)[0];
            var i = M(s, t),
              n = e[i - 1],
              r = e[i],
              a = t[i - 1];
            return (function (e, t) {
              return (t * (e[1] - e[0])) / 100 + e[0];
            })([n, r], (s - a) * O(a, t[i]));
          })(this.xVal, this.xPct, e);
        }),
        (e.prototype.getStep = function (e) {
          return (e = _(this.xPct, this.xSteps, this.snap, e));
        }),
        (e.prototype.getDefaultStep = function (e, t, s) {
          var i = M(e, this.xPct);
          return (
            (100 === e || (t && e === this.xPct[i - 1])) &&
              (i = Math.max(i - 1, 1)),
            (this.xVal[i] - this.xVal[i - 1]) / s
          );
        }),
        (e.prototype.getNearbySteps = function (e) {
          var t = M(e, this.xPct);
          return {
            stepBefore: {
              startValue: this.xVal[t - 2],
              step: this.xNumSteps[t - 2],
              highestStep: this.xHighestCompleteStep[t - 2],
            },
            thisStep: {
              startValue: this.xVal[t - 1],
              step: this.xNumSteps[t - 1],
              highestStep: this.xHighestCompleteStep[t - 1],
            },
            stepAfter: {
              startValue: this.xVal[t],
              step: this.xNumSteps[t],
              highestStep: this.xHighestCompleteStep[t],
            },
          };
        }),
        (e.prototype.countStepDecimals = function () {
          var e = this.xNumSteps.map(T);
          return Math.max.apply(null, e);
        }),
        (e.prototype.hasNoSize = function () {
          return this.xVal[0] === this.xVal[this.xVal.length - 1];
        }),
        (e.prototype.convert = function (e) {
          return this.getStep(this.toStepping(e));
        }),
        (e.prototype.handleEntryPoint = function (e, t) {
          var s;
          if (
            !w((s = "min" === e ? 0 : "max" === e ? 100 : parseFloat(e))) ||
            !w(t[0])
          )
            throw new Error("noUiSlider: 'range' value isn't numeric.");
          this.xPct.push(s), this.xVal.push(t[0]);
          var i = Number(t[1]);
          s
            ? this.xSteps.push(!isNaN(i) && i)
            : isNaN(i) || (this.xSteps[0] = i),
            this.xHighestCompleteStep.push(0);
        }),
        (e.prototype.handleStepPoint = function (e, t) {
          if (t)
            if (this.xVal[e] !== this.xVal[e + 1]) {
              this.xSteps[e] =
                P([this.xVal[e], this.xVal[e + 1]], t, 0) /
                O(this.xPct[e], this.xPct[e + 1]);
              var s = (this.xVal[e + 1] - this.xVal[e]) / this.xNumSteps[e],
                i = Math.ceil(Number(s.toFixed(3)) - 1),
                n = this.xVal[e] + this.xNumSteps[e] * i;
              this.xHighestCompleteStep[e] = n;
            } else this.xSteps[e] = this.xHighestCompleteStep[e] = this.xVal[e];
        }),
        e
      );
    })(),
    D = {
      to: function (e) {
        return void 0 === e ? "" : e.toFixed(2);
      },
      from: Number,
    },
    $ = {
      target: "target",
      base: "base",
      origin: "origin",
      handle: "handle",
      handleLower: "handle-lower",
      handleUpper: "handle-upper",
      touchArea: "touch-area",
      horizontal: "horizontal",
      vertical: "vertical",
      background: "background",
      connect: "connect",
      connects: "connects",
      ltr: "ltr",
      rtl: "rtl",
      textDirectionLtr: "txt-dir-ltr",
      textDirectionRtl: "txt-dir-rtl",
      draggable: "draggable",
      drag: "state-drag",
      tap: "state-tap",
      active: "active",
      tooltip: "tooltip",
      pips: "pips",
      pipsHorizontal: "pips-horizontal",
      pipsVertical: "pips-vertical",
      marker: "marker",
      markerHorizontal: "marker-horizontal",
      markerVertical: "marker-vertical",
      markerNormal: "marker-normal",
      markerLarge: "marker-large",
      markerSub: "marker-sub",
      value: "value",
      valueHorizontal: "value-horizontal",
      valueVertical: "value-vertical",
      valueNormal: "value-normal",
      valueLarge: "value-large",
      valueSub: "value-sub",
    },
    V = { tooltips: ".__tooltips", aria: ".__aria" };
  function N(e, t) {
    if (!w(t)) throw new Error("noUiSlider: 'step' is not numeric.");
    e.singleStep = t;
  }
  function q(e, t) {
    if (!w(t))
      throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
    e.keyboardPageMultiplier = t;
  }
  function z(e, t) {
    if (!w(t))
      throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
    e.keyboardMultiplier = t;
  }
  function B(e, t) {
    if (!w(t))
      throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
    e.keyboardDefaultStep = t;
  }
  function j(e, t) {
    if ("object" != typeof t || Array.isArray(t))
      throw new Error("noUiSlider: 'range' is not an object.");
    if (void 0 === t.min || void 0 === t.max)
      throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    e.spectrum = new I(t, e.snap || !1, e.singleStep);
  }
  function H(e, t) {
    if (((t = E(t)), !Array.isArray(t) || !t.length))
      throw new Error("noUiSlider: 'start' option is incorrect.");
    (e.handles = t.length), (e.start = t);
  }
  function F(e, t) {
    if ("boolean" != typeof t)
      throw new Error("noUiSlider: 'snap' option must be a boolean.");
    e.snap = t;
  }
  function G(e, t) {
    if ("boolean" != typeof t)
      throw new Error("noUiSlider: 'animate' option must be a boolean.");
    e.animate = t;
  }
  function R(e, t) {
    if ("number" != typeof t)
      throw new Error(
        "noUiSlider: 'animationDuration' option must be a number.",
      );
    e.animationDuration = t;
  }
  function W(e, t) {
    var s,
      i = [!1];
    if (
      ("lower" === t ? (t = [!0, !1]) : "upper" === t && (t = [!1, !0]),
      !0 === t || !1 === t)
    ) {
      for (s = 1; s < e.handles; s++) i.push(t);
      i.push(!1);
    } else {
      if (!Array.isArray(t) || !t.length || t.length !== e.handles + 1)
        throw new Error(
          "noUiSlider: 'connect' option doesn't match handle count.",
        );
      i = t;
    }
    e.connect = i;
  }
  function U(e, t) {
    switch (t) {
      case "horizontal":
        e.ort = 0;
        break;
      case "vertical":
        e.ort = 1;
        break;
      default:
        throw new Error("noUiSlider: 'orientation' option is invalid.");
    }
  }
  function Y(e, t) {
    if (!w(t)) throw new Error("noUiSlider: 'margin' option must be numeric.");
    0 !== t && (e.margin = e.spectrum.getDistance(t));
  }
  function X(e, t) {
    if (!w(t)) throw new Error("noUiSlider: 'limit' option must be numeric.");
    if (((e.limit = e.spectrum.getDistance(t)), !e.limit || e.handles < 2))
      throw new Error(
        "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.",
      );
  }
  function Z(e, t) {
    var s;
    if (!w(t) && !Array.isArray(t))
      throw new Error(
        "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.",
      );
    if (Array.isArray(t) && 2 !== t.length && !w(t[0]) && !w(t[1]))
      throw new Error(
        "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.",
      );
    if (0 !== t) {
      for (
        Array.isArray(t) || (t = [t, t]),
          e.padding = [
            e.spectrum.getDistance(t[0]),
            e.spectrum.getDistance(t[1]),
          ],
          s = 0;
        s < e.spectrum.xNumSteps.length - 1;
        s++
      )
        if (e.padding[0][s] < 0 || e.padding[1][s] < 0)
          throw new Error(
            "noUiSlider: 'padding' option must be a positive number(s).",
          );
      var i = t[0] + t[1],
        n = e.spectrum.xVal[0];
      if (i / (e.spectrum.xVal[e.spectrum.xVal.length - 1] - n) > 1)
        throw new Error(
          "noUiSlider: 'padding' option must not exceed 100% of the range.",
        );
    }
  }
  function K(e, t) {
    switch (t) {
      case "ltr":
        e.dir = 0;
        break;
      case "rtl":
        e.dir = 1;
        break;
      default:
        throw new Error("noUiSlider: 'direction' option was not recognized.");
    }
  }
  function Q(e, t) {
    if ("string" != typeof t)
      throw new Error(
        "noUiSlider: 'behaviour' must be a string containing options.",
      );
    var s = t.indexOf("tap") >= 0,
      i = t.indexOf("drag") >= 0,
      n = t.indexOf("fixed") >= 0,
      r = t.indexOf("snap") >= 0,
      a = t.indexOf("hover") >= 0,
      o = t.indexOf("unconstrained") >= 0,
      l = t.indexOf("drag-all") >= 0,
      c = t.indexOf("smooth-steps") >= 0;
    if (n) {
      if (2 !== e.handles)
        throw new Error(
          "noUiSlider: 'fixed' behaviour must be used with 2 handles",
        );
      Y(e, e.start[1] - e.start[0]);
    }
    if (o && (e.margin || e.limit))
      throw new Error(
        "noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit",
      );
    e.events = {
      tap: s || r,
      drag: i,
      dragAll: l,
      smoothSteps: c,
      fixed: n,
      snap: r,
      hover: a,
      unconstrained: o,
    };
  }
  function J(e, t) {
    if (!1 !== t)
      if (!0 === t || g(t)) {
        e.tooltips = [];
        for (var s = 0; s < e.handles; s++) e.tooltips.push(t);
      } else {
        if ((t = E(t)).length !== e.handles)
          throw new Error("noUiSlider: must pass a formatter for all handles.");
        t.forEach(function (e) {
          if ("boolean" != typeof e && !g(e))
            throw new Error(
              "noUiSlider: 'tooltips' must be passed a formatter or 'false'.",
            );
        }),
          (e.tooltips = t);
      }
  }
  function ee(e, t) {
    if (t.length !== e.handles)
      throw new Error("noUiSlider: must pass a attributes for all handles.");
    e.handleAttributes = t;
  }
  function te(e, t) {
    if (!g(t))
      throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
    e.ariaFormat = t;
  }
  function se(e, t) {
    if (
      !(function (e) {
        return g(e) && "function" == typeof e.from;
      })(t)
    )
      throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
    e.format = t;
  }
  function ie(e, t) {
    if ("boolean" != typeof t)
      throw new Error(
        "noUiSlider: 'keyboardSupport' option must be a boolean.",
      );
    e.keyboardSupport = t;
  }
  function ne(e, t) {
    e.documentElement = t;
  }
  function re(e, t) {
    if ("string" != typeof t && !1 !== t)
      throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
    e.cssPrefix = t;
  }
  function ae(e, t) {
    if ("object" != typeof t)
      throw new Error("noUiSlider: 'cssClasses' must be an object.");
    "string" == typeof e.cssPrefix
      ? ((e.cssClasses = {}),
        Object.keys(t).forEach(function (s) {
          e.cssClasses[s] = e.cssPrefix + t[s];
        }))
      : (e.cssClasses = t);
  }
  function oe(e) {
    var t = {
        margin: null,
        limit: null,
        padding: null,
        animate: !0,
        animationDuration: 300,
        ariaFormat: D,
        format: D,
      },
      s = {
        step: { r: !1, t: N },
        keyboardPageMultiplier: { r: !1, t: q },
        keyboardMultiplier: { r: !1, t: z },
        keyboardDefaultStep: { r: !1, t: B },
        start: { r: !0, t: H },
        connect: { r: !0, t: W },
        direction: { r: !0, t: K },
        snap: { r: !1, t: F },
        animate: { r: !1, t: G },
        animationDuration: { r: !1, t: R },
        range: { r: !0, t: j },
        orientation: { r: !1, t: U },
        margin: { r: !1, t: Y },
        limit: { r: !1, t: X },
        padding: { r: !1, t: Z },
        behaviour: { r: !0, t: Q },
        ariaFormat: { r: !1, t: te },
        format: { r: !1, t: se },
        tooltips: { r: !1, t: J },
        keyboardSupport: { r: !0, t: ie },
        documentElement: { r: !1, t: ne },
        cssPrefix: { r: !0, t: re },
        cssClasses: { r: !0, t: ae },
        handleAttributes: { r: !1, t: ee },
      },
      i = {
        connect: !1,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        keyboardSupport: !0,
        cssPrefix: "noUi-",
        cssClasses: $,
        keyboardPageMultiplier: 5,
        keyboardMultiplier: 1,
        keyboardDefaultStep: 10,
      };
    e.format && !e.ariaFormat && (e.ariaFormat = e.format),
      Object.keys(s).forEach(function (n) {
        if (b(e[n]) || void 0 !== i[n]) s[n].t(t, b(e[n]) ? e[n] : i[n]);
        else if (s[n].r)
          throw new Error("noUiSlider: '" + n + "' is required.");
      }),
      (t.pips = e.pips);
    var n = document.createElement("div"),
      r = void 0 !== n.style.msTransform,
      a = void 0 !== n.style.transform;
    t.transformRule = a ? "transform" : r ? "msTransform" : "webkitTransform";
    return (
      (t.style = [
        ["left", "top"],
        ["right", "bottom"],
      ][t.dir][t.ort]),
      t
    );
  }
  function le(e, t, s) {
    var i,
      n,
      r,
      a,
      o,
      l,
      c,
      d = window.navigator.pointerEnabled
        ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
        : window.navigator.msPointerEnabled
          ? {
              start: "MSPointerDown",
              move: "MSPointerMove",
              end: "MSPointerUp",
            }
          : {
              start: "mousedown touchstart",
              move: "mousemove touchmove",
              end: "mouseup touchend",
            },
      u =
        window.CSS &&
        CSS.supports &&
        CSS.supports("touch-action", "none") &&
        (function () {
          var e = !1;
          try {
            var t = Object.defineProperty({}, "passive", {
              get: function () {
                e = !0;
              },
            });
            window.addEventListener("test", null, t);
          } catch (e) {}
          return e;
        })(),
      p = e,
      f = t.spectrum,
      g = [],
      w = [],
      T = [],
      O = 0,
      P = {},
      M = e.ownerDocument,
      k = t.documentElement || M.documentElement,
      _ = M.body,
      I = "rtl" === M.dir || 1 === t.ort ? 0 : 100;
    function D(e, t) {
      var s = M.createElement("div");
      return t && C(s, t), e.appendChild(s), s;
    }
    function $(e, s) {
      var i = D(e, t.cssClasses.origin),
        n = D(i, t.cssClasses.handle);
      if (
        (D(n, t.cssClasses.touchArea),
        n.setAttribute("data-handle", String(s)),
        t.keyboardSupport &&
          (n.setAttribute("tabindex", "0"),
          n.addEventListener("keydown", function (e) {
            return (function (e, s) {
              if (z() || B(s)) return !1;
              var i = ["Left", "Right"],
                n = ["Down", "Up"],
                r = ["PageDown", "PageUp"],
                a = ["Home", "End"];
              t.dir && !t.ort
                ? i.reverse()
                : t.ort && !t.dir && (n.reverse(), r.reverse());
              var o,
                l = e.key.replace("Arrow", ""),
                c = l === r[0],
                d = l === r[1],
                u = l === n[0] || l === i[0] || c,
                p = l === n[1] || l === i[1] || d,
                h = l === a[0],
                m = l === a[1];
              if (!(u || p || h || m)) return !0;
              if ((e.preventDefault(), p || u)) {
                var v = u ? 0 : 1,
                  b = ve(s)[v];
                if (null === b) return !1;
                !1 === b &&
                  (b = f.getDefaultStep(w[s], u, t.keyboardDefaultStep)),
                  (b *=
                    d || c ? t.keyboardPageMultiplier : t.keyboardMultiplier),
                  (b = Math.max(b, 1e-7)),
                  (b *= u ? -1 : 1),
                  (o = g[s] + b);
              } else
                o = m
                  ? t.spectrum.xVal[t.spectrum.xVal.length - 1]
                  : t.spectrum.xVal[0];
              return (
                pe(s, f.toStepping(o), !0, !0),
                re("slide", s),
                re("update", s),
                re("change", s),
                re("set", s),
                !1
              );
            })(e, s);
          })),
        void 0 !== t.handleAttributes)
      ) {
        var r = t.handleAttributes[s];
        Object.keys(r).forEach(function (e) {
          n.setAttribute(e, r[e]);
        });
      }
      return (
        n.setAttribute("role", "slider"),
        n.setAttribute("aria-orientation", t.ort ? "vertical" : "horizontal"),
        0 === s
          ? C(n, t.cssClasses.handleLower)
          : s === t.handles - 1 && C(n, t.cssClasses.handleUpper),
        (i.handle = n),
        i
      );
    }
    function N(e, s) {
      return !!s && D(e, t.cssClasses.connect);
    }
    function q(e, s) {
      return (
        !(!t.tooltips || !t.tooltips[s]) &&
        D(e.firstChild, t.cssClasses.tooltip)
      );
    }
    function z() {
      return p.hasAttribute("disabled");
    }
    function B(e) {
      return n[e].hasAttribute("disabled");
    }
    function j() {
      o &&
        (ne("update" + V.tooltips),
        o.forEach(function (e) {
          e && v(e);
        }),
        (o = null));
    }
    function H() {
      j(),
        (o = n.map(q)),
        ie("update" + V.tooltips, function (e, s, i) {
          if (o && t.tooltips && !1 !== o[s]) {
            var n = e[s];
            !0 !== t.tooltips[s] && (n = t.tooltips[s].to(i[s])),
              (o[s].innerHTML = n);
          }
        });
    }
    function F(e, t) {
      return e.map(function (e) {
        return f.fromStepping(t ? f.getStep(e) : e);
      });
    }
    function G(e) {
      var t,
        s = (function (e) {
          if (e.mode === h.Range || e.mode === h.Steps) return f.xVal;
          if (e.mode === h.Count) {
            if (e.values < 2)
              throw new Error(
                "noUiSlider: 'values' (>= 2) required for mode 'count'.",
              );
            for (var t = e.values - 1, s = 100 / t, i = []; t--; ) i[t] = t * s;
            return i.push(100), F(i, e.stepped);
          }
          return e.mode === h.Positions
            ? F(e.values, e.stepped)
            : e.mode === h.Values
              ? e.stepped
                ? e.values.map(function (e) {
                    return f.fromStepping(f.getStep(f.toStepping(e)));
                  })
                : e.values
              : [];
        })(e),
        i = {},
        n = f.xVal[0],
        r = f.xVal[f.xVal.length - 1],
        a = !1,
        o = !1,
        l = 0;
      return (
        (t = s.slice().sort(function (e, t) {
          return e - t;
        })),
        (s = t.filter(function (e) {
          return !this[e] && (this[e] = !0);
        }, {}))[0] !== n && (s.unshift(n), (a = !0)),
        s[s.length - 1] !== r && (s.push(r), (o = !0)),
        s.forEach(function (t, n) {
          var r,
            c,
            d,
            u,
            p,
            g,
            v,
            b,
            y,
            w,
            S = t,
            x = s[n + 1],
            E = e.mode === h.Steps;
          for (
            E && (r = f.xNumSteps[n]),
              r || (r = x - S),
              void 0 === x && (x = S),
              r = Math.max(r, 1e-7),
              c = S;
            c <= x;
            c = Number((c + r).toFixed(7))
          ) {
            for (
              b = (p = (u = f.toStepping(c)) - l) / (e.density || 1),
                w = p / (y = Math.round(b)),
                d = 1;
              d <= y;
              d += 1
            )
              i[(g = l + d * w).toFixed(5)] = [f.fromStepping(g), 0];
            (v =
              s.indexOf(c) > -1 ? m.LargeValue : E ? m.SmallValue : m.NoValue),
              !n && a && c !== x && (v = 0),
              (c === x && o) || (i[u.toFixed(5)] = [c, v]),
              (l = u);
          }
        }),
        i
      );
    }
    function R(e, s, i) {
      var n,
        r,
        a = M.createElement("div"),
        o =
          (((n = {})[m.None] = ""),
          (n[m.NoValue] = t.cssClasses.valueNormal),
          (n[m.LargeValue] = t.cssClasses.valueLarge),
          (n[m.SmallValue] = t.cssClasses.valueSub),
          n),
        l =
          (((r = {})[m.None] = ""),
          (r[m.NoValue] = t.cssClasses.markerNormal),
          (r[m.LargeValue] = t.cssClasses.markerLarge),
          (r[m.SmallValue] = t.cssClasses.markerSub),
          r),
        c = [t.cssClasses.valueHorizontal, t.cssClasses.valueVertical],
        d = [t.cssClasses.markerHorizontal, t.cssClasses.markerVertical];
      function u(e, s) {
        var i = s === t.cssClasses.value,
          n = i ? o : l;
        return s + " " + (i ? c : d)[t.ort] + " " + n[e];
      }
      return (
        C(a, t.cssClasses.pips),
        C(
          a,
          0 === t.ort ? t.cssClasses.pipsHorizontal : t.cssClasses.pipsVertical,
        ),
        Object.keys(e).forEach(function (n) {
          !(function (e, n, r) {
            if ((r = s ? s(n, r) : r) !== m.None) {
              var o = D(a, !1);
              (o.className = u(r, t.cssClasses.marker)),
                (o.style[t.style] = e + "%"),
                r > m.NoValue &&
                  (((o = D(a, !1)).className = u(r, t.cssClasses.value)),
                  o.setAttribute("data-value", String(n)),
                  (o.style[t.style] = e + "%"),
                  (o.innerHTML = String(i.to(n))));
            }
          })(n, e[n][0], e[n][1]);
        }),
        a
      );
    }
    function W() {
      a && (v(a), (a = null));
    }
    function U(e) {
      W();
      var t = G(e),
        s = e.filter,
        i = e.format || {
          to: function (e) {
            return String(Math.round(e));
          },
        };
      return (a = p.appendChild(R(t, s, i)));
    }
    function Y() {
      var e = i.getBoundingClientRect(),
        s = "offset" + ["Width", "Height"][t.ort];
      return 0 === t.ort ? e.width || i[s] : e.height || i[s];
    }
    function X(e, s, i, n) {
      var r = function (r) {
          var a,
            o,
            l = (function (e, t, s) {
              var i = 0 === e.type.indexOf("touch"),
                n = 0 === e.type.indexOf("mouse"),
                r = 0 === e.type.indexOf("pointer"),
                a = 0,
                o = 0;
              0 === e.type.indexOf("MSPointer") && (r = !0);
              if ("mousedown" === e.type && !e.buttons && !e.touches) return !1;
              if (i) {
                var l = function (t) {
                  var i = t.target;
                  return (
                    i === s ||
                    s.contains(i) ||
                    (e.composed && e.composedPath().shift() === s)
                  );
                };
                if ("touchstart" === e.type) {
                  var c = Array.prototype.filter.call(e.touches, l);
                  if (c.length > 1) return !1;
                  (a = c[0].pageX), (o = c[0].pageY);
                } else {
                  var d = Array.prototype.find.call(e.changedTouches, l);
                  if (!d) return !1;
                  (a = d.pageX), (o = d.pageY);
                }
              }
              (t = t || L(M)),
                (n || r) && ((a = e.clientX + t.x), (o = e.clientY + t.y));
              return (
                (e.pageOffset = t), (e.points = [a, o]), (e.cursor = n || r), e
              );
            })(r, n.pageOffset, n.target || s);
          return (
            !!l &&
            !(z() && !n.doNotReject) &&
            ((a = p),
            (o = t.cssClasses.tap),
            !(
              (a.classList
                ? a.classList.contains(o)
                : new RegExp("\\b" + o + "\\b").test(a.className)) &&
              !n.doNotReject
            ) &&
              !(e === d.start && void 0 !== l.buttons && l.buttons > 1) &&
              (!n.hover || !l.buttons) &&
              (u || l.preventDefault(),
              (l.calcPoint = l.points[t.ort]),
              void i(l, n)))
          );
        },
        a = [];
      return (
        e.split(" ").forEach(function (e) {
          s.addEventListener(e, r, !!u && { passive: !0 }), a.push([e, r]);
        }),
        a
      );
    }
    function Z(e) {
      var s,
        n,
        r,
        a,
        o,
        l,
        c =
          (100 *
            (e -
              ((s = i),
              (n = t.ort),
              (r = s.getBoundingClientRect()),
              (a = s.ownerDocument),
              (o = a.documentElement),
              (l = L(a)),
              /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (l.x = 0),
              n ? r.top + l.y - o.clientTop : r.left + l.x - o.clientLeft))) /
          Y();
      return (c = x(c)), t.dir ? 100 - c : c;
    }
    function K(e, t) {
      "mouseout" === e.type &&
        "HTML" === e.target.nodeName &&
        null === e.relatedTarget &&
        J(e, t);
    }
    function Q(e, s) {
      if (
        -1 === navigator.appVersion.indexOf("MSIE 9") &&
        0 === e.buttons &&
        0 !== s.buttonsProperty
      )
        return J(e, s);
      var i = (t.dir ? -1 : 1) * (e.calcPoint - s.startCalcPoint);
      ce(
        i > 0,
        (100 * i) / s.baseSize,
        s.locations,
        s.handleNumbers,
        s.connect,
      );
    }
    function J(e, s) {
      s.handle && (A(s.handle, t.cssClasses.active), (O -= 1)),
        s.listeners.forEach(function (e) {
          k.removeEventListener(e[0], e[1]);
        }),
        0 === O &&
          (A(p, t.cssClasses.drag),
          ue(),
          e.cursor &&
            ((_.style.cursor = ""), _.removeEventListener("selectstart", y))),
        t.events.smoothSteps &&
          (s.handleNumbers.forEach(function (e) {
            pe(e, w[e], !0, !0, !1, !1);
          }),
          s.handleNumbers.forEach(function (e) {
            re("update", e);
          })),
        s.handleNumbers.forEach(function (e) {
          re("change", e), re("set", e), re("end", e);
        });
    }
    function ee(e, s) {
      if (!s.handleNumbers.some(B)) {
        var i;
        if (1 === s.handleNumbers.length)
          (i = n[s.handleNumbers[0]].children[0]),
            (O += 1),
            C(i, t.cssClasses.active);
        e.stopPropagation();
        var r = [],
          a = X(d.move, k, Q, {
            target: e.target,
            handle: i,
            connect: s.connect,
            listeners: r,
            startCalcPoint: e.calcPoint,
            baseSize: Y(),
            pageOffset: e.pageOffset,
            handleNumbers: s.handleNumbers,
            buttonsProperty: e.buttons,
            locations: w.slice(),
          }),
          o = X(d.end, k, J, {
            target: e.target,
            handle: i,
            listeners: r,
            doNotReject: !0,
            handleNumbers: s.handleNumbers,
          }),
          l = X("mouseout", k, K, {
            target: e.target,
            handle: i,
            listeners: r,
            doNotReject: !0,
            handleNumbers: s.handleNumbers,
          });
        r.push.apply(r, a.concat(o, l)),
          e.cursor &&
            ((_.style.cursor = getComputedStyle(e.target).cursor),
            n.length > 1 && C(p, t.cssClasses.drag),
            _.addEventListener("selectstart", y, !1)),
          s.handleNumbers.forEach(function (e) {
            re("start", e);
          });
      }
    }
    function te(e) {
      e.stopPropagation();
      var s = Z(e.calcPoint),
        i = (function (e) {
          var t = 100,
            s = !1;
          return (
            n.forEach(function (i, n) {
              if (!B(n)) {
                var r = w[n],
                  a = Math.abs(r - e);
                (a < t || (a <= t && e > r) || (100 === a && 100 === t)) &&
                  ((s = n), (t = a));
              }
            }),
            s
          );
        })(s);
      !1 !== i &&
        (t.events.snap || S(p, t.cssClasses.tap, t.animationDuration),
        pe(i, s, !0, !0),
        ue(),
        re("slide", i, !0),
        re("update", i, !0),
        t.events.snap
          ? ee(e, { handleNumbers: [i] })
          : (re("change", i, !0), re("set", i, !0)));
    }
    function se(e) {
      var t = Z(e.calcPoint),
        s = f.getStep(t),
        i = f.fromStepping(s);
      Object.keys(P).forEach(function (e) {
        "hover" === e.split(".")[0] &&
          P[e].forEach(function (e) {
            e.call(be, i);
          });
      });
    }
    function ie(e, t) {
      (P[e] = P[e] || []),
        P[e].push(t),
        "update" === e.split(".")[0] &&
          n.forEach(function (e, t) {
            re("update", t);
          });
    }
    function ne(e) {
      var t = e && e.split(".")[0],
        s = t ? e.substring(t.length) : e;
      Object.keys(P).forEach(function (e) {
        var i = e.split(".")[0],
          n = e.substring(i.length);
        (t && t !== i) ||
          (s && s !== n) ||
          ((function (e) {
            return e === V.aria || e === V.tooltips;
          })(n) &&
            s !== n) ||
          delete P[e];
      });
    }
    function re(e, s, i) {
      Object.keys(P).forEach(function (n) {
        var r = n.split(".")[0];
        e === r &&
          P[n].forEach(function (e) {
            e.call(
              be,
              g.map(t.format.to),
              s,
              g.slice(),
              i || !1,
              w.slice(),
              be,
            );
          });
      });
    }
    function ae(e, s, i, r, a, o, l) {
      var c;
      return (
        n.length > 1 &&
          !t.events.unconstrained &&
          (r &&
            s > 0 &&
            ((c = f.getAbsoluteDistance(e[s - 1], t.margin, !1)),
            (i = Math.max(i, c))),
          a &&
            s < n.length - 1 &&
            ((c = f.getAbsoluteDistance(e[s + 1], t.margin, !0)),
            (i = Math.min(i, c)))),
        n.length > 1 &&
          t.limit &&
          (r &&
            s > 0 &&
            ((c = f.getAbsoluteDistance(e[s - 1], t.limit, !1)),
            (i = Math.min(i, c))),
          a &&
            s < n.length - 1 &&
            ((c = f.getAbsoluteDistance(e[s + 1], t.limit, !0)),
            (i = Math.max(i, c)))),
        t.padding &&
          (0 === s &&
            ((c = f.getAbsoluteDistance(0, t.padding[0], !1)),
            (i = Math.max(i, c))),
          s === n.length - 1 &&
            ((c = f.getAbsoluteDistance(100, t.padding[1], !0)),
            (i = Math.min(i, c)))),
        l || (i = f.getStep(i)),
        !((i = x(i)) === e[s] && !o) && i
      );
    }
    function le(e, s) {
      var i = t.ort;
      return (i ? s : e) + ", " + (i ? e : s);
    }
    function ce(e, s, i, n, r) {
      var a = i.slice(),
        o = n[0],
        l = t.events.smoothSteps,
        c = [!e, e],
        d = [e, !e];
      (n = n.slice()),
        e && n.reverse(),
        n.length > 1
          ? n.forEach(function (e, t) {
              var i = ae(a, e, a[e] + s, c[t], d[t], !1, l);
              !1 === i ? (s = 0) : ((s = i - a[e]), (a[e] = i));
            })
          : (c = d = [!0]);
      var u = !1;
      n.forEach(function (e, t) {
        u = pe(e, i[e] + s, c[t], d[t], !1, l) || u;
      }),
        u &&
          (n.forEach(function (e) {
            re("update", e), re("slide", e);
          }),
          null != r && re("drag", o));
    }
    function de(e, s) {
      return t.dir ? 100 - e - s : e;
    }
    function ue() {
      T.forEach(function (e) {
        var t = w[e] > 50 ? -1 : 1,
          s = 3 + (n.length + t * e);
        n[e].style.zIndex = String(s);
      });
    }
    function pe(e, s, i, r, a, o) {
      return (
        a || (s = ae(w, e, s, i, r, !1, o)),
        !1 !== s &&
          ((function (e, s) {
            (w[e] = s), (g[e] = f.fromStepping(s));
            var i = "translate(" + le(de(s, 0) - I + "%", "0") + ")";
            (n[e].style[t.transformRule] = i), fe(e), fe(e + 1);
          })(e, s),
          !0)
      );
    }
    function fe(e) {
      if (r[e]) {
        var s = 0,
          i = 100;
        0 !== e && (s = w[e - 1]), e !== r.length - 1 && (i = w[e]);
        var n = i - s,
          a = "translate(" + le(de(s, n) + "%", "0") + ")",
          o = "scale(" + le(n / 100, "1") + ")";
        r[e].style[t.transformRule] = a + " " + o;
      }
    }
    function he(e, s) {
      return null === e || !1 === e || void 0 === e
        ? w[s]
        : ("number" == typeof e && (e = String(e)),
          !1 !== (e = t.format.from(e)) && (e = f.toStepping(e)),
          !1 === e || isNaN(e) ? w[s] : e);
    }
    function me(e, s, i) {
      var n = E(e),
        r = void 0 === w[0];
      (s = void 0 === s || s),
        t.animate && !r && S(p, t.cssClasses.tap, t.animationDuration),
        T.forEach(function (e) {
          pe(e, he(n[e], e), !0, !1, i);
        });
      var a = 1 === T.length ? 0 : 1;
      if (r && f.hasNoSize() && ((i = !0), (w[0] = 0), T.length > 1)) {
        var o = 100 / (T.length - 1);
        T.forEach(function (e) {
          w[e] = e * o;
        });
      }
      for (; a < T.length; ++a)
        T.forEach(function (e) {
          pe(e, w[e], !0, !0, i);
        });
      ue(),
        T.forEach(function (e) {
          re("update", e), null !== n[e] && s && re("set", e);
        });
    }
    function ge(e) {
      if ((void 0 === e && (e = !1), e))
        return 1 === g.length ? g[0] : g.slice(0);
      var s = g.map(t.format.to);
      return 1 === s.length ? s[0] : s;
    }
    function ve(e) {
      var s = w[e],
        i = f.getNearbySteps(s),
        n = g[e],
        r = i.thisStep.step,
        a = null;
      if (t.snap)
        return [
          n - i.stepBefore.startValue || null,
          i.stepAfter.startValue - n || null,
        ];
      !1 !== r &&
        n + r > i.stepAfter.startValue &&
        (r = i.stepAfter.startValue - n),
        (a =
          n > i.thisStep.startValue
            ? i.thisStep.step
            : !1 !== i.stepBefore.step && n - i.stepBefore.highestStep),
        100 === s ? (r = null) : 0 === s && (a = null);
      var o = f.countStepDecimals();
      return (
        null !== r && !1 !== r && (r = Number(r.toFixed(o))),
        null !== a && !1 !== a && (a = Number(a.toFixed(o))),
        [a, r]
      );
    }
    C((l = p), t.cssClasses.target),
      0 === t.dir ? C(l, t.cssClasses.ltr) : C(l, t.cssClasses.rtl),
      0 === t.ort ? C(l, t.cssClasses.horizontal) : C(l, t.cssClasses.vertical),
      C(
        l,
        "rtl" === getComputedStyle(l).direction
          ? t.cssClasses.textDirectionRtl
          : t.cssClasses.textDirectionLtr,
      ),
      (i = D(l, t.cssClasses.base)),
      (function (e, s) {
        var i = D(s, t.cssClasses.connects);
        (n = []), (r = []).push(N(i, e[0]));
        for (var a = 0; a < t.handles; a++)
          n.push($(s, a)), (T[a] = a), r.push(N(i, e[a + 1]));
      })(t.connect, i),
      (c = t.events).fixed ||
        n.forEach(function (e, t) {
          X(d.start, e.children[0], ee, { handleNumbers: [t] });
        }),
      c.tap && X(d.start, i, te, {}),
      c.hover && X(d.move, i, se, { hover: !0 }),
      c.drag &&
        r.forEach(function (e, s) {
          if (!1 !== e && 0 !== s && s !== r.length - 1) {
            var i = n[s - 1],
              a = n[s],
              o = [e],
              l = [i, a],
              u = [s - 1, s];
            C(e, t.cssClasses.draggable),
              c.fixed && (o.push(i.children[0]), o.push(a.children[0])),
              c.dragAll && ((l = n), (u = T)),
              o.forEach(function (t) {
                X(d.start, t, ee, { handles: l, handleNumbers: u, connect: e });
              });
          }
        }),
      me(t.start),
      t.pips && U(t.pips),
      t.tooltips && H(),
      ne("update" + V.aria),
      ie("update" + V.aria, function (e, s, i, r, a) {
        T.forEach(function (e) {
          var s = n[e],
            r = ae(w, e, 0, !0, !0, !0),
            o = ae(w, e, 100, !0, !0, !0),
            l = a[e],
            c = String(t.ariaFormat.to(i[e]));
          (r = f.fromStepping(r).toFixed(1)),
            (o = f.fromStepping(o).toFixed(1)),
            (l = f.fromStepping(l).toFixed(1)),
            s.children[0].setAttribute("aria-valuemin", r),
            s.children[0].setAttribute("aria-valuemax", o),
            s.children[0].setAttribute("aria-valuenow", l),
            s.children[0].setAttribute("aria-valuetext", c);
        });
      });
    var be = {
      destroy: function () {
        for (
          ne(V.aria),
            ne(V.tooltips),
            Object.keys(t.cssClasses).forEach(function (e) {
              A(p, t.cssClasses[e]);
            });
          p.firstChild;

        )
          p.removeChild(p.firstChild);
        delete p.noUiSlider;
      },
      steps: function () {
        return T.map(ve);
      },
      on: ie,
      off: ne,
      get: ge,
      set: me,
      setHandle: function (e, t, s, i) {
        if (!((e = Number(e)) >= 0 && e < T.length))
          throw new Error("noUiSlider: invalid handle number, got: " + e);
        pe(e, he(t, e), !0, !0, i), re("update", e), s && re("set", e);
      },
      reset: function (e) {
        me(t.start, e);
      },
      disable: function (e) {
        null != e
          ? (n[e].setAttribute("disabled", ""),
            n[e].handle.removeAttribute("tabindex"))
          : (p.setAttribute("disabled", ""),
            n.forEach(function (e) {
              e.handle.removeAttribute("tabindex");
            }));
      },
      enable: function (e) {
        null != e
          ? (n[e].removeAttribute("disabled"),
            n[e].handle.setAttribute("tabindex", "0"))
          : (p.removeAttribute("disabled"),
            n.forEach(function (e) {
              e.removeAttribute("disabled"),
                e.handle.setAttribute("tabindex", "0");
            }));
      },
      __moveHandles: function (e, t, s) {
        ce(e, t, w, s);
      },
      options: s,
      updateOptions: function (e, i) {
        var n = ge(),
          r = [
            "margin",
            "limit",
            "padding",
            "range",
            "animate",
            "snap",
            "step",
            "format",
            "pips",
            "tooltips",
          ];
        r.forEach(function (t) {
          void 0 !== e[t] && (s[t] = e[t]);
        });
        var a = oe(s);
        r.forEach(function (s) {
          void 0 !== e[s] && (t[s] = a[s]);
        }),
          (f = a.spectrum),
          (t.margin = a.margin),
          (t.limit = a.limit),
          (t.padding = a.padding),
          t.pips ? U(t.pips) : W(),
          t.tooltips ? H() : j(),
          (w = []),
          me(b(e.start) ? e.start : n, i);
      },
      target: p,
      removePips: W,
      removeTooltips: j,
      getPositions: function () {
        return w.slice();
      },
      getTooltips: function () {
        return o;
      },
      getOrigins: function () {
        return n;
      },
      pips: U,
    };
    return be;
  }
  function ce(e, t) {
    if (!e || !e.nodeName)
      throw new Error(
        "noUiSlider: create requires a single element, got: " + e,
      );
    if (e.noUiSlider)
      throw new Error("noUiSlider: Slider was already initialized.");
    var s = le(e, oe(t), t);
    return (e.noUiSlider = s), s;
  }
  function de(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function ue(e) {
    return e instanceof de(e).Element || e instanceof Element;
  }
  function pe(e) {
    return e instanceof de(e).HTMLElement || e instanceof HTMLElement;
  }
  function fe(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof de(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  !(function () {
    const e = document.querySelectorAll("[data-range]");
    e.length &&
      e.forEach((e) => {
        const t = e.querySelector("[data-range-from]"),
          s = e.querySelector("[data-range-to]"),
          i = e.querySelector("[data-range-item]");
        ce(i, {
          start: [Number(t.value), Number(s.value)],
          connect: !0,
          range: {
            min: [Number(t.dataset.rangeFrom)],
            max: [Number(s.dataset.rangeTo)],
          },
        }),
          i.noUiSlider.on("update", (e) => {
            (t.value = Math.round(e[0])), (s.value = Math.round(e[1]));
          });
      });
  })();
  var he = Math.max,
    me = Math.min,
    ge = Math.round;
  function ve() {
    var e = navigator.userAgentData;
    return null != e && e.brands && Array.isArray(e.brands)
      ? e.brands
          .map(function (e) {
            return e.brand + "/" + e.version;
          })
          .join(" ")
      : navigator.userAgent;
  }
  function be() {
    return !/^((?!chrome|android).)*safari/i.test(ve());
  }
  function ye(e, t, s) {
    void 0 === t && (t = !1), void 0 === s && (s = !1);
    var i = e.getBoundingClientRect(),
      n = 1,
      r = 1;
    t &&
      pe(e) &&
      ((n = (e.offsetWidth > 0 && ge(i.width) / e.offsetWidth) || 1),
      (r = (e.offsetHeight > 0 && ge(i.height) / e.offsetHeight) || 1));
    var a = (ue(e) ? de(e) : window).visualViewport,
      o = !be() && s,
      l = (i.left + (o && a ? a.offsetLeft : 0)) / n,
      c = (i.top + (o && a ? a.offsetTop : 0)) / r,
      d = i.width / n,
      u = i.height / r;
    return {
      width: d,
      height: u,
      top: c,
      right: l + d,
      bottom: c + u,
      left: l,
      x: l,
      y: c,
    };
  }
  function we(e) {
    var t = de(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function Se(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function xe(e) {
    return ((ue(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function Ee(e) {
    return ye(xe(e)).left + we(e).scrollLeft;
  }
  function Te(e) {
    return de(e).getComputedStyle(e);
  }
  function Ce(e) {
    var t = Te(e),
      s = t.overflow,
      i = t.overflowX,
      n = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(s + n + i);
  }
  function Ae(e, t, s) {
    void 0 === s && (s = !1);
    var i,
      n,
      r = pe(t),
      a =
        pe(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            s = ge(t.width) / e.offsetWidth || 1,
            i = ge(t.height) / e.offsetHeight || 1;
          return 1 !== s || 1 !== i;
        })(t),
      o = xe(t),
      l = ye(e, a, s),
      c = { scrollLeft: 0, scrollTop: 0 },
      d = { x: 0, y: 0 };
    return (
      (r || (!r && !s)) &&
        (("body" !== Se(t) || Ce(o)) &&
          (c =
            (i = t) !== de(i) && pe(i)
              ? { scrollLeft: (n = i).scrollLeft, scrollTop: n.scrollTop }
              : we(i)),
        pe(t)
          ? (((d = ye(t, !0)).x += t.clientLeft), (d.y += t.clientTop))
          : o && (d.x = Ee(o))),
      {
        x: l.left + c.scrollLeft - d.x,
        y: l.top + c.scrollTop - d.y,
        width: l.width,
        height: l.height,
      }
    );
  }
  function Le(e) {
    var t = ye(e),
      s = e.offsetWidth,
      i = e.offsetHeight;
    return (
      Math.abs(t.width - s) <= 1 && (s = t.width),
      Math.abs(t.height - i) <= 1 && (i = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: s, height: i }
    );
  }
  function Oe(e) {
    return "html" === Se(e)
      ? e
      : e.assignedSlot || e.parentNode || (fe(e) ? e.host : null) || xe(e);
  }
  function Pe(e) {
    return ["html", "body", "#document"].indexOf(Se(e)) >= 0
      ? e.ownerDocument.body
      : pe(e) && Ce(e)
        ? e
        : Pe(Oe(e));
  }
  function Me(e, t) {
    var s;
    void 0 === t && (t = []);
    var i = Pe(e),
      n = i === (null == (s = e.ownerDocument) ? void 0 : s.body),
      r = de(i),
      a = n ? [r].concat(r.visualViewport || [], Ce(i) ? i : []) : i,
      o = t.concat(a);
    return n ? o : o.concat(Me(Oe(a)));
  }
  function ke(e) {
    return ["table", "td", "th"].indexOf(Se(e)) >= 0;
  }
  function _e(e) {
    return pe(e) && "fixed" !== Te(e).position ? e.offsetParent : null;
  }
  function Ie(e) {
    for (var t = de(e), s = _e(e); s && ke(s) && "static" === Te(s).position; )
      s = _e(s);
    return s &&
      ("html" === Se(s) || ("body" === Se(s) && "static" === Te(s).position))
      ? t
      : s ||
          (function (e) {
            var t = /firefox/i.test(ve());
            if (/Trident/i.test(ve()) && pe(e) && "fixed" === Te(e).position)
              return null;
            var s = Oe(e);
            for (
              fe(s) && (s = s.host);
              pe(s) && ["html", "body"].indexOf(Se(s)) < 0;

            ) {
              var i = Te(s);
              if (
                "none" !== i.transform ||
                "none" !== i.perspective ||
                "paint" === i.contain ||
                -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                (t && "filter" === i.willChange) ||
                (t && i.filter && "none" !== i.filter)
              )
                return s;
              s = s.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var De = "top",
    $e = "bottom",
    Ve = "right",
    Ne = "left",
    qe = "auto",
    ze = [De, $e, Ve, Ne],
    Be = "start",
    je = "end",
    He = "clippingParents",
    Fe = "viewport",
    Ge = "popper",
    Re = "reference",
    We = ze.reduce(function (e, t) {
      return e.concat([t + "-" + Be, t + "-" + je]);
    }, []),
    Ue = [].concat(ze, [qe]).reduce(function (e, t) {
      return e.concat([t, t + "-" + Be, t + "-" + je]);
    }, []),
    Ye = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function Xe(e) {
    var t = new Map(),
      s = new Set(),
      i = [];
    function n(e) {
      s.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!s.has(e)) {
              var i = t.get(e);
              i && n(i);
            }
          }),
        i.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        s.has(e.name) || n(e);
      }),
      i
    );
  }
  var Ze = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function Ke() {
    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
      t[s] = arguments[s];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function Qe(e) {
    void 0 === e && (e = {});
    var t = e,
      s = t.defaultModifiers,
      i = void 0 === s ? [] : s,
      n = t.defaultOptions,
      r = void 0 === n ? Ze : n;
    return function (e, t, s) {
      void 0 === s && (s = r);
      var n,
        a,
        o = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, Ze, r),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        l = [],
        c = !1,
        d = {
          state: o,
          setOptions: function (s) {
            var n = "function" == typeof s ? s(o.options) : s;
            u(),
              (o.options = Object.assign({}, r, o.options, n)),
              (o.scrollParents = {
                reference: ue(e)
                  ? Me(e)
                  : e.contextElement
                    ? Me(e.contextElement)
                    : [],
                popper: Me(t),
              });
            var a,
              c,
              p = (function (e) {
                var t = Xe(e);
                return Ye.reduce(function (e, s) {
                  return e.concat(
                    t.filter(function (e) {
                      return e.phase === s;
                    }),
                  );
                }, []);
              })(
                ((a = [].concat(i, o.options.modifiers)),
                (c = a.reduce(function (e, t) {
                  var s = e[t.name];
                  return (
                    (e[t.name] = s
                      ? Object.assign({}, s, t, {
                          options: Object.assign({}, s.options, t.options),
                          data: Object.assign({}, s.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {})),
                Object.keys(c).map(function (e) {
                  return c[e];
                })),
              );
            return (
              (o.orderedModifiers = p.filter(function (e) {
                return e.enabled;
              })),
              o.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  s = e.options,
                  i = void 0 === s ? {} : s,
                  n = e.effect;
                if ("function" == typeof n) {
                  var r = n({ state: o, name: t, instance: d, options: i }),
                    a = function () {};
                  l.push(r || a);
                }
              }),
              d.update()
            );
          },
          forceUpdate: function () {
            if (!c) {
              var e = o.elements,
                t = e.reference,
                s = e.popper;
              if (Ke(t, s)) {
                (o.rects = {
                  reference: Ae(t, Ie(s), "fixed" === o.options.strategy),
                  popper: Le(s),
                }),
                  (o.reset = !1),
                  (o.placement = o.options.placement),
                  o.orderedModifiers.forEach(function (e) {
                    return (o.modifiersData[e.name] = Object.assign(
                      {},
                      e.data,
                    ));
                  });
                for (var i = 0; i < o.orderedModifiers.length; i++)
                  if (!0 !== o.reset) {
                    var n = o.orderedModifiers[i],
                      r = n.fn,
                      a = n.options,
                      l = void 0 === a ? {} : a,
                      u = n.name;
                    "function" == typeof r &&
                      (o =
                        r({ state: o, options: l, name: u, instance: d }) || o);
                  } else (o.reset = !1), (i = -1);
              }
            }
          },
          update:
            ((n = function () {
              return new Promise(function (e) {
                d.forceUpdate(), e(o);
              });
            }),
            function () {
              return (
                a ||
                  (a = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (a = void 0), e(n());
                    });
                  })),
                a
              );
            }),
          destroy: function () {
            u(), (c = !0);
          },
        };
      if (!Ke(e, t)) return d;
      function u() {
        l.forEach(function (e) {
          return e();
        }),
          (l = []);
      }
      return (
        d.setOptions(s).then(function (e) {
          !c && s.onFirstUpdate && s.onFirstUpdate(e);
        }),
        d
      );
    };
  }
  var Je = { passive: !0 };
  function et(e) {
    return e.split("-")[0];
  }
  function tt(e) {
    return e.split("-")[1];
  }
  function st(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function it(e) {
    var t,
      s = e.reference,
      i = e.element,
      n = e.placement,
      r = n ? et(n) : null,
      a = n ? tt(n) : null,
      o = s.x + s.width / 2 - i.width / 2,
      l = s.y + s.height / 2 - i.height / 2;
    switch (r) {
      case De:
        t = { x: o, y: s.y - i.height };
        break;
      case $e:
        t = { x: o, y: s.y + s.height };
        break;
      case Ve:
        t = { x: s.x + s.width, y: l };
        break;
      case Ne:
        t = { x: s.x - i.width, y: l };
        break;
      default:
        t = { x: s.x, y: s.y };
    }
    var c = r ? st(r) : null;
    if (null != c) {
      var d = "y" === c ? "height" : "width";
      switch (a) {
        case Be:
          t[c] = t[c] - (s[d] / 2 - i[d] / 2);
          break;
        case je:
          t[c] = t[c] + (s[d] / 2 - i[d] / 2);
      }
    }
    return t;
  }
  var nt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function rt(e) {
    var t,
      s = e.popper,
      i = e.popperRect,
      n = e.placement,
      r = e.variation,
      a = e.offsets,
      o = e.position,
      l = e.gpuAcceleration,
      c = e.adaptive,
      d = e.roundOffsets,
      u = e.isFixed,
      p = a.x,
      f = void 0 === p ? 0 : p,
      h = a.y,
      m = void 0 === h ? 0 : h,
      g = "function" == typeof d ? d({ x: f, y: m }) : { x: f, y: m };
    (f = g.x), (m = g.y);
    var v = a.hasOwnProperty("x"),
      b = a.hasOwnProperty("y"),
      y = Ne,
      w = De,
      S = window;
    if (c) {
      var x = Ie(s),
        E = "clientHeight",
        T = "clientWidth";
      if (
        (x === de(s) &&
          "static" !== Te((x = xe(s))).position &&
          "absolute" === o &&
          ((E = "scrollHeight"), (T = "scrollWidth")),
        n === De || ((n === Ne || n === Ve) && r === je))
      )
        (w = $e),
          (m -=
            (u && x === S && S.visualViewport
              ? S.visualViewport.height
              : x[E]) - i.height),
          (m *= l ? 1 : -1);
      if (n === Ne || ((n === De || n === $e) && r === je))
        (y = Ve),
          (f -=
            (u && x === S && S.visualViewport ? S.visualViewport.width : x[T]) -
            i.width),
          (f *= l ? 1 : -1);
    }
    var C,
      A = Object.assign({ position: o }, c && nt),
      L =
        !0 === d
          ? (function (e, t) {
              var s = e.x,
                i = e.y,
                n = t.devicePixelRatio || 1;
              return { x: ge(s * n) / n || 0, y: ge(i * n) / n || 0 };
            })({ x: f, y: m }, de(s))
          : { x: f, y: m };
    return (
      (f = L.x),
      (m = L.y),
      l
        ? Object.assign(
            {},
            A,
            (((C = {})[w] = b ? "0" : ""),
            (C[y] = v ? "0" : ""),
            (C.transform =
              (S.devicePixelRatio || 1) <= 1
                ? "translate(" + f + "px, " + m + "px)"
                : "translate3d(" + f + "px, " + m + "px, 0)"),
            C),
          )
        : Object.assign(
            {},
            A,
            (((t = {})[w] = b ? m + "px" : ""),
            (t[y] = v ? f + "px" : ""),
            (t.transform = ""),
            t),
          )
    );
  }
  const at = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var s = t.styles[e] || {},
          i = t.attributes[e] || {},
          n = t.elements[e];
        pe(n) &&
          Se(n) &&
          (Object.assign(n.style, s),
          Object.keys(i).forEach(function (e) {
            var t = i[e];
            !1 === t
              ? n.removeAttribute(e)
              : n.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        s = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, s.popper),
        (t.styles = s),
        t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var i = t.elements[e],
              n = t.attributes[e] || {},
              r = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : s[e],
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            pe(i) &&
              Se(i) &&
              (Object.assign(i.style, r),
              Object.keys(n).forEach(function (e) {
                i.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  const ot = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function (e) {
      var t = e.state,
        s = e.options,
        i = e.name,
        n = s.offset,
        r = void 0 === n ? [0, 0] : n,
        a = Ue.reduce(function (e, s) {
          return (
            (e[s] = (function (e, t, s) {
              var i = et(e),
                n = [Ne, De].indexOf(i) >= 0 ? -1 : 1,
                r =
                  "function" == typeof s
                    ? s(Object.assign({}, t, { placement: e }))
                    : s,
                a = r[0],
                o = r[1];
              return (
                (a = a || 0),
                (o = (o || 0) * n),
                [Ne, Ve].indexOf(i) >= 0 ? { x: o, y: a } : { x: a, y: o }
              );
            })(s, t.rects, r)),
            e
          );
        }, {}),
        o = a[t.placement],
        l = o.x,
        c = o.y;
      null != t.modifiersData.popperOffsets &&
        ((t.modifiersData.popperOffsets.x += l),
        (t.modifiersData.popperOffsets.y += c)),
        (t.modifiersData[i] = a);
    },
  };
  var lt = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function ct(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return lt[e];
    });
  }
  var dt = { start: "end", end: "start" };
  function ut(e) {
    return e.replace(/start|end/g, function (e) {
      return dt[e];
    });
  }
  function pt(e, t) {
    var s = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (s && fe(s)) {
      var i = t;
      do {
        if (i && e.isSameNode(i)) return !0;
        i = i.parentNode || i.host;
      } while (i);
    }
    return !1;
  }
  function ft(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function ht(e, t, s) {
    return t === Fe
      ? ft(
          (function (e, t) {
            var s = de(e),
              i = xe(e),
              n = s.visualViewport,
              r = i.clientWidth,
              a = i.clientHeight,
              o = 0,
              l = 0;
            if (n) {
              (r = n.width), (a = n.height);
              var c = be();
              (c || (!c && "fixed" === t)) &&
                ((o = n.offsetLeft), (l = n.offsetTop));
            }
            return { width: r, height: a, x: o + Ee(e), y: l };
          })(e, s),
        )
      : ue(t)
        ? (function (e, t) {
            var s = ye(e, !1, "fixed" === t);
            return (
              (s.top = s.top + e.clientTop),
              (s.left = s.left + e.clientLeft),
              (s.bottom = s.top + e.clientHeight),
              (s.right = s.left + e.clientWidth),
              (s.width = e.clientWidth),
              (s.height = e.clientHeight),
              (s.x = s.left),
              (s.y = s.top),
              s
            );
          })(t, s)
        : ft(
            (function (e) {
              var t,
                s = xe(e),
                i = we(e),
                n = null == (t = e.ownerDocument) ? void 0 : t.body,
                r = he(
                  s.scrollWidth,
                  s.clientWidth,
                  n ? n.scrollWidth : 0,
                  n ? n.clientWidth : 0,
                ),
                a = he(
                  s.scrollHeight,
                  s.clientHeight,
                  n ? n.scrollHeight : 0,
                  n ? n.clientHeight : 0,
                ),
                o = -i.scrollLeft + Ee(e),
                l = -i.scrollTop;
              return (
                "rtl" === Te(n || s).direction &&
                  (o += he(s.clientWidth, n ? n.clientWidth : 0) - r),
                { width: r, height: a, x: o, y: l }
              );
            })(xe(e)),
          );
  }
  function mt(e, t, s, i) {
    var n =
        "clippingParents" === t
          ? (function (e) {
              var t = Me(Oe(e)),
                s =
                  ["absolute", "fixed"].indexOf(Te(e).position) >= 0 && pe(e)
                    ? Ie(e)
                    : e;
              return ue(s)
                ? t.filter(function (e) {
                    return ue(e) && pt(e, s) && "body" !== Se(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      r = [].concat(n, [s]),
      a = r[0],
      o = r.reduce(
        function (t, s) {
          var n = ht(e, s, i);
          return (
            (t.top = he(n.top, t.top)),
            (t.right = me(n.right, t.right)),
            (t.bottom = me(n.bottom, t.bottom)),
            (t.left = he(n.left, t.left)),
            t
          );
        },
        ht(e, a, i),
      );
    return (
      (o.width = o.right - o.left),
      (o.height = o.bottom - o.top),
      (o.x = o.left),
      (o.y = o.top),
      o
    );
  }
  function gt(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function vt(e, t) {
    return t.reduce(function (t, s) {
      return (t[s] = e), t;
    }, {});
  }
  function bt(e, t) {
    void 0 === t && (t = {});
    var s = t,
      i = s.placement,
      n = void 0 === i ? e.placement : i,
      r = s.strategy,
      a = void 0 === r ? e.strategy : r,
      o = s.boundary,
      l = void 0 === o ? He : o,
      c = s.rootBoundary,
      d = void 0 === c ? Fe : c,
      u = s.elementContext,
      p = void 0 === u ? Ge : u,
      f = s.altBoundary,
      h = void 0 !== f && f,
      m = s.padding,
      g = void 0 === m ? 0 : m,
      v = gt("number" != typeof g ? g : vt(g, ze)),
      b = p === Ge ? Re : Ge,
      y = e.rects.popper,
      w = e.elements[h ? b : p],
      S = mt(ue(w) ? w : w.contextElement || xe(e.elements.popper), l, d, a),
      x = ye(e.elements.reference),
      E = it({ reference: x, element: y, strategy: "absolute", placement: n }),
      T = ft(Object.assign({}, y, E)),
      C = p === Ge ? T : x,
      A = {
        top: S.top - C.top + v.top,
        bottom: C.bottom - S.bottom + v.bottom,
        left: S.left - C.left + v.left,
        right: C.right - S.right + v.right,
      },
      L = e.modifiersData.offset;
    if (p === Ge && L) {
      var O = L[n];
      Object.keys(A).forEach(function (e) {
        var t = [Ve, $e].indexOf(e) >= 0 ? 1 : -1,
          s = [De, $e].indexOf(e) >= 0 ? "y" : "x";
        A[e] += O[s] * t;
      });
    }
    return A;
  }
  function yt(e, t, s) {
    return he(e, me(t, s));
  }
  const wt = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        s = e.options,
        i = e.name,
        n = s.mainAxis,
        r = void 0 === n || n,
        a = s.altAxis,
        o = void 0 !== a && a,
        l = s.boundary,
        c = s.rootBoundary,
        d = s.altBoundary,
        u = s.padding,
        p = s.tether,
        f = void 0 === p || p,
        h = s.tetherOffset,
        m = void 0 === h ? 0 : h,
        g = bt(t, { boundary: l, rootBoundary: c, padding: u, altBoundary: d }),
        v = et(t.placement),
        b = tt(t.placement),
        y = !b,
        w = st(v),
        S = "x" === w ? "y" : "x",
        x = t.modifiersData.popperOffsets,
        E = t.rects.reference,
        T = t.rects.popper,
        C =
          "function" == typeof m
            ? m(Object.assign({}, t.rects, { placement: t.placement }))
            : m,
        A =
          "number" == typeof C
            ? { mainAxis: C, altAxis: C }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, C),
        L = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        O = { x: 0, y: 0 };
      if (x) {
        if (r) {
          var P,
            M = "y" === w ? De : Ne,
            k = "y" === w ? $e : Ve,
            _ = "y" === w ? "height" : "width",
            I = x[w],
            D = I + g[M],
            $ = I - g[k],
            V = f ? -T[_] / 2 : 0,
            N = b === Be ? E[_] : T[_],
            q = b === Be ? -T[_] : -E[_],
            z = t.elements.arrow,
            B = f && z ? Le(z) : { width: 0, height: 0 },
            j = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            H = j[M],
            F = j[k],
            G = yt(0, E[_], B[_]),
            R = y ? E[_] / 2 - V - G - H - A.mainAxis : N - G - H - A.mainAxis,
            W = y ? -E[_] / 2 + V + G + F + A.mainAxis : q + G + F + A.mainAxis,
            U = t.elements.arrow && Ie(t.elements.arrow),
            Y = U ? ("y" === w ? U.clientTop || 0 : U.clientLeft || 0) : 0,
            X = null != (P = null == L ? void 0 : L[w]) ? P : 0,
            Z = I + W - X,
            K = yt(f ? me(D, I + R - X - Y) : D, I, f ? he($, Z) : $);
          (x[w] = K), (O[w] = K - I);
        }
        if (o) {
          var Q,
            J = "x" === w ? De : Ne,
            ee = "x" === w ? $e : Ve,
            te = x[S],
            se = "y" === S ? "height" : "width",
            ie = te + g[J],
            ne = te - g[ee],
            re = -1 !== [De, Ne].indexOf(v),
            ae = null != (Q = null == L ? void 0 : L[S]) ? Q : 0,
            oe = re ? ie : te - E[se] - T[se] - ae + A.altAxis,
            le = re ? te + E[se] + T[se] - ae - A.altAxis : ne,
            ce =
              f && re
                ? (function (e, t, s) {
                    var i = yt(e, t, s);
                    return i > s ? s : i;
                  })(oe, te, le)
                : yt(f ? oe : ie, te, f ? le : ne);
          (x[S] = ce), (O[S] = ce - te);
        }
        t.modifiersData[i] = O;
      }
    },
    requiresIfExists: ["offset"],
  };
  const St = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        s = e.state,
        i = e.name,
        n = e.options,
        r = s.elements.arrow,
        a = s.modifiersData.popperOffsets,
        o = et(s.placement),
        l = st(o),
        c = [Ne, Ve].indexOf(o) >= 0 ? "height" : "width";
      if (r && a) {
        var d = (function (e, t) {
            return gt(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : vt(e, ze),
            );
          })(n.padding, s),
          u = Le(r),
          p = "y" === l ? De : Ne,
          f = "y" === l ? $e : Ve,
          h =
            s.rects.reference[c] +
            s.rects.reference[l] -
            a[l] -
            s.rects.popper[c],
          m = a[l] - s.rects.reference[l],
          g = Ie(r),
          v = g ? ("y" === l ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
          b = h / 2 - m / 2,
          y = d[p],
          w = v - u[c] - d[f],
          S = v / 2 - u[c] / 2 + b,
          x = yt(y, S, w),
          E = l;
        s.modifiersData[i] = (((t = {})[E] = x), (t.centerOffset = x - S), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        s = e.options.element,
        i = void 0 === s ? "[data-popper-arrow]" : s;
      null != i &&
        ("string" != typeof i || (i = t.elements.popper.querySelector(i))) &&
        pt(t.elements.popper, i) &&
        (t.elements.arrow = i);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function xt(e, t, s) {
    return (
      void 0 === s && (s = { x: 0, y: 0 }),
      {
        top: e.top - t.height - s.y,
        right: e.right - t.width + s.x,
        bottom: e.bottom - t.height + s.y,
        left: e.left - t.width - s.x,
      }
    );
  }
  function Et(e) {
    return [De, Ve, $e, Ne].some(function (t) {
      return e[t] >= 0;
    });
  }
  var Tt = Qe({
      defaultModifiers: [
        {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (e) {
            var t = e.state,
              s = e.instance,
              i = e.options,
              n = i.scroll,
              r = void 0 === n || n,
              a = i.resize,
              o = void 0 === a || a,
              l = de(t.elements.popper),
              c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return (
              r &&
                c.forEach(function (e) {
                  e.addEventListener("scroll", s.update, Je);
                }),
              o && l.addEventListener("resize", s.update, Je),
              function () {
                r &&
                  c.forEach(function (e) {
                    e.removeEventListener("scroll", s.update, Je);
                  }),
                  o && l.removeEventListener("resize", s.update, Je);
              }
            );
          },
          data: {},
        },
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              s = e.name;
            t.modifiersData[s] = it({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              s = e.options,
              i = s.gpuAcceleration,
              n = void 0 === i || i,
              r = s.adaptive,
              a = void 0 === r || r,
              o = s.roundOffsets,
              l = void 0 === o || o,
              c = {
                placement: et(t.placement),
                variation: tt(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: n,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                rt(
                  Object.assign({}, c, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: a,
                    roundOffsets: l,
                  }),
                ),
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  rt(
                    Object.assign({}, c, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: l,
                    }),
                  ),
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        at,
        ot,
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              s = e.options,
              i = e.name;
            if (!t.modifiersData[i]._skip) {
              for (
                var n = s.mainAxis,
                  r = void 0 === n || n,
                  a = s.altAxis,
                  o = void 0 === a || a,
                  l = s.fallbackPlacements,
                  c = s.padding,
                  d = s.boundary,
                  u = s.rootBoundary,
                  p = s.altBoundary,
                  f = s.flipVariations,
                  h = void 0 === f || f,
                  m = s.allowedAutoPlacements,
                  g = t.options.placement,
                  v = et(g),
                  b =
                    l ||
                    (v === g || !h
                      ? [ct(g)]
                      : (function (e) {
                          if (et(e) === qe) return [];
                          var t = ct(e);
                          return [ut(e), t, ut(t)];
                        })(g)),
                  y = [g].concat(b).reduce(function (e, s) {
                    return e.concat(
                      et(s) === qe
                        ? (function (e, t) {
                            void 0 === t && (t = {});
                            var s = t,
                              i = s.placement,
                              n = s.boundary,
                              r = s.rootBoundary,
                              a = s.padding,
                              o = s.flipVariations,
                              l = s.allowedAutoPlacements,
                              c = void 0 === l ? Ue : l,
                              d = tt(i),
                              u = d
                                ? o
                                  ? We
                                  : We.filter(function (e) {
                                      return tt(e) === d;
                                    })
                                : ze,
                              p = u.filter(function (e) {
                                return c.indexOf(e) >= 0;
                              });
                            0 === p.length && (p = u);
                            var f = p.reduce(function (t, s) {
                              return (
                                (t[s] = bt(e, {
                                  placement: s,
                                  boundary: n,
                                  rootBoundary: r,
                                  padding: a,
                                })[et(s)]),
                                t
                              );
                            }, {});
                            return Object.keys(f).sort(function (e, t) {
                              return f[e] - f[t];
                            });
                          })(t, {
                            placement: s,
                            boundary: d,
                            rootBoundary: u,
                            padding: c,
                            flipVariations: h,
                            allowedAutoPlacements: m,
                          })
                        : s,
                    );
                  }, []),
                  w = t.rects.reference,
                  S = t.rects.popper,
                  x = new Map(),
                  E = !0,
                  T = y[0],
                  C = 0;
                C < y.length;
                C++
              ) {
                var A = y[C],
                  L = et(A),
                  O = tt(A) === Be,
                  P = [De, $e].indexOf(L) >= 0,
                  M = P ? "width" : "height",
                  k = bt(t, {
                    placement: A,
                    boundary: d,
                    rootBoundary: u,
                    altBoundary: p,
                    padding: c,
                  }),
                  _ = P ? (O ? Ve : Ne) : O ? $e : De;
                w[M] > S[M] && (_ = ct(_));
                var I = ct(_),
                  D = [];
                if (
                  (r && D.push(k[L] <= 0),
                  o && D.push(k[_] <= 0, k[I] <= 0),
                  D.every(function (e) {
                    return e;
                  }))
                ) {
                  (T = A), (E = !1);
                  break;
                }
                x.set(A, D);
              }
              if (E)
                for (
                  var $ = function (e) {
                      var t = y.find(function (t) {
                        var s = x.get(t);
                        if (s)
                          return s.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (T = t), "break";
                    },
                    V = h ? 3 : 1;
                  V > 0;
                  V--
                ) {
                  if ("break" === $(V)) break;
                }
              t.placement !== T &&
                ((t.modifiersData[i]._skip = !0),
                (t.placement = T),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        wt,
        St,
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              s = e.name,
              i = t.rects.reference,
              n = t.rects.popper,
              r = t.modifiersData.preventOverflow,
              a = bt(t, { elementContext: "reference" }),
              o = bt(t, { altBoundary: !0 }),
              l = xt(a, i),
              c = xt(o, n, r),
              d = Et(l),
              u = Et(c);
            (t.modifiersData[s] = {
              referenceClippingOffsets: l,
              popperEscapeOffsets: c,
              isReferenceHidden: d,
              hasPopperEscaped: u,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": d,
                "data-popper-escaped": u,
              }));
          },
        },
      ],
    }),
    Ct = "tippy-content",
    At = "tippy-backdrop",
    Lt = "tippy-arrow",
    Ot = "tippy-svg-arrow",
    Pt = { passive: !0, capture: !0 },
    Mt = function () {
      return document.body;
    };
  function kt(e, t, s) {
    if (Array.isArray(e)) {
      var i = e[t];
      return null == i ? (Array.isArray(s) ? s[t] : s) : i;
    }
    return e;
  }
  function _t(e, t) {
    var s = {}.toString.call(e);
    return 0 === s.indexOf("[object") && s.indexOf(t + "]") > -1;
  }
  function It(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function Dt(e, t) {
    return 0 === t
      ? e
      : function (i) {
          clearTimeout(s),
            (s = setTimeout(function () {
              e(i);
            }, t));
        };
    var s;
  }
  function $t(e) {
    return [].concat(e);
  }
  function Vt(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function Nt(e) {
    return e.split("-")[0];
  }
  function qt(e) {
    return [].slice.call(e);
  }
  function zt(e) {
    return Object.keys(e).reduce(function (t, s) {
      return void 0 !== e[s] && (t[s] = e[s]), t;
    }, {});
  }
  function Bt() {
    return document.createElement("div");
  }
  function jt(e) {
    return ["Element", "Fragment"].some(function (t) {
      return _t(e, t);
    });
  }
  function Ht(e) {
    return _t(e, "MouseEvent");
  }
  function Ft(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function Gt(e) {
    return jt(e)
      ? [e]
      : (function (e) {
            return _t(e, "NodeList");
          })(e)
        ? qt(e)
        : Array.isArray(e)
          ? e
          : qt(document.querySelectorAll(e));
  }
  function Rt(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function Wt(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function Ut(e) {
    var t,
      s = $t(e)[0];
    return null != s && null != (t = s.ownerDocument) && t.body
      ? s.ownerDocument
      : document;
  }
  function Yt(e, t, s) {
    var i = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[i](t, s);
    });
  }
  function Xt(e, t) {
    for (var s = t; s; ) {
      var i;
      if (e.contains(s)) return !0;
      s =
        null == s.getRootNode || null == (i = s.getRootNode())
          ? void 0
          : i.host;
    }
    return !1;
  }
  var Zt = { isTouch: !1 },
    Kt = 0;
  function Qt() {
    Zt.isTouch ||
      ((Zt.isTouch = !0),
      window.performance && document.addEventListener("mousemove", Jt));
  }
  function Jt() {
    var e = performance.now();
    e - Kt < 20 &&
      ((Zt.isTouch = !1), document.removeEventListener("mousemove", Jt)),
      (Kt = e);
  }
  function es() {
    var e = document.activeElement;
    if (Ft(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var ts =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var ss = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    is = Object.assign(
      {
        appendTo: Mt,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      ss,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      },
    ),
    ns = Object.keys(is);
  function rs(e) {
    var t = (e.plugins || []).reduce(function (t, s) {
      var i,
        n = s.name,
        r = s.defaultValue;
      n && (t[n] = void 0 !== e[n] ? e[n] : null != (i = is[n]) ? i : r);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function as(e, t) {
    var s = Object.assign(
      {},
      t,
      { content: It(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (
              t ? Object.keys(rs(Object.assign({}, is, { plugins: t }))) : ns
            ).reduce(function (t, s) {
              var i = (e.getAttribute("data-tippy-" + s) || "").trim();
              if (!i) return t;
              if ("content" === s) t[s] = i;
              else
                try {
                  t[s] = JSON.parse(i);
                } catch (e) {
                  t[s] = i;
                }
              return t;
            }, {});
          })(e, t.plugins),
    );
    return (
      (s.aria = Object.assign({}, is.aria, s.aria)),
      (s.aria = {
        expanded: "auto" === s.aria.expanded ? t.interactive : s.aria.expanded,
        content:
          "auto" === s.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : s.aria.content,
      }),
      s
    );
  }
  var os = function () {
    return "innerHTML";
  };
  function ls(e, t) {
    e[os()] = t;
  }
  function cs(e) {
    var t = Bt();
    return (
      !0 === e
        ? (t.className = Lt)
        : ((t.className = Ot), jt(e) ? t.appendChild(e) : ls(t, e)),
      t
    );
  }
  function ds(e, t) {
    jt(t.content)
      ? (ls(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? ls(e, t.content) : (e.textContent = t.content));
  }
  function us(e) {
    var t = e.firstElementChild,
      s = qt(t.children);
    return {
      box: t,
      content: s.find(function (e) {
        return e.classList.contains(Ct);
      }),
      arrow: s.find(function (e) {
        return e.classList.contains(Lt) || e.classList.contains(Ot);
      }),
      backdrop: s.find(function (e) {
        return e.classList.contains(At);
      }),
    };
  }
  function ps(e) {
    var t = Bt(),
      s = Bt();
    (s.className = "tippy-box"),
      s.setAttribute("data-state", "hidden"),
      s.setAttribute("tabindex", "-1");
    var i = Bt();
    function n(s, i) {
      var n = us(t),
        r = n.box,
        a = n.content,
        o = n.arrow;
      i.theme
        ? r.setAttribute("data-theme", i.theme)
        : r.removeAttribute("data-theme"),
        "string" == typeof i.animation
          ? r.setAttribute("data-animation", i.animation)
          : r.removeAttribute("data-animation"),
        i.inertia
          ? r.setAttribute("data-inertia", "")
          : r.removeAttribute("data-inertia"),
        (r.style.maxWidth =
          "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
        i.role ? r.setAttribute("role", i.role) : r.removeAttribute("role"),
        (s.content === i.content && s.allowHTML === i.allowHTML) ||
          ds(a, e.props),
        i.arrow
          ? o
            ? s.arrow !== i.arrow &&
              (r.removeChild(o), r.appendChild(cs(i.arrow)))
            : r.appendChild(cs(i.arrow))
          : o && r.removeChild(o);
    }
    return (
      (i.className = Ct),
      i.setAttribute("data-state", "hidden"),
      ds(i, e.props),
      t.appendChild(s),
      s.appendChild(i),
      n(e.props, e.props),
      { popper: t, onUpdate: n }
    );
  }
  ps.$$tippy = !0;
  var fs = 1,
    hs = [],
    ms = [];
  function gs(e, t) {
    var s,
      i,
      n,
      r,
      a,
      o,
      l,
      c,
      d = as(e, Object.assign({}, is, rs(zt(t)))),
      u = !1,
      p = !1,
      f = !1,
      h = !1,
      m = [],
      g = Dt(U, d.interactiveDebounce),
      v = fs++,
      b = (c = d.plugins).filter(function (e, t) {
        return c.indexOf(e) === t;
      }),
      y = {
        id: v,
        reference: e,
        popper: Bt(),
        popperInstance: null,
        props: d,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: b,
        clearDelayTimeouts: function () {
          clearTimeout(s), clearTimeout(i), cancelAnimationFrame(n);
        },
        setProps: function (t) {
          0;
          if (y.state.isDestroyed) return;
          I("onBeforeUpdate", [y, t]), R();
          var s = y.props,
            i = as(e, Object.assign({}, s, zt(t), { ignoreAttributes: !0 }));
          (y.props = i),
            G(),
            s.interactiveDebounce !== i.interactiveDebounce &&
              (V(), (g = Dt(U, i.interactiveDebounce)));
          s.triggerTarget && !i.triggerTarget
            ? $t(s.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : i.triggerTarget && e.removeAttribute("aria-expanded");
          $(), _(), x && x(s, i);
          y.popperInstance &&
            (K(),
            J().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          I("onAfterUpdate", [y, t]);
        },
        setContent: function (e) {
          y.setProps({ content: e });
        },
        show: function () {
          0;
          var e = y.state.isVisible,
            t = y.state.isDestroyed,
            s = !y.state.isEnabled,
            i = Zt.isTouch && !y.props.touch,
            n = kt(y.props.duration, 0, is.duration);
          if (e || t || s || i) return;
          if (O().hasAttribute("disabled")) return;
          if ((I("onShow", [y], !1), !1 === y.props.onShow(y))) return;
          (y.state.isVisible = !0), L() && (S.style.visibility = "visible");
          _(), B(), y.state.isMounted || (S.style.transition = "none");
          if (L()) {
            var r = M();
            Rt([r.box, r.content], 0);
          }
          (o = function () {
            var e;
            if (y.state.isVisible && !h) {
              if (
                ((h = !0),
                S.offsetHeight,
                (S.style.transition = y.props.moveTransition),
                L() && y.props.animation)
              ) {
                var t = M(),
                  s = t.box,
                  i = t.content;
                Rt([s, i], n), Wt([s, i], "visible");
              }
              D(),
                $(),
                Vt(ms, y),
                null == (e = y.popperInstance) || e.forceUpdate(),
                I("onMount", [y]),
                y.props.animation &&
                  L() &&
                  (function (e, t) {
                    H(e, t);
                  })(n, function () {
                    (y.state.isShown = !0), I("onShown", [y]);
                  });
            }
          }),
            (function () {
              var e,
                t = y.props.appendTo,
                s = O();
              e =
                (y.props.interactive && t === Mt) || "parent" === t
                  ? s.parentNode
                  : It(t, [s]);
              e.contains(S) || e.appendChild(S);
              (y.state.isMounted = !0), K(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !y.state.isVisible,
            t = y.state.isDestroyed,
            s = !y.state.isEnabled,
            i = kt(y.props.duration, 1, is.duration);
          if (e || t || s) return;
          if ((I("onHide", [y], !1), !1 === y.props.onHide(y))) return;
          (y.state.isVisible = !1),
            (y.state.isShown = !1),
            (h = !1),
            (u = !1),
            L() && (S.style.visibility = "hidden");
          if ((V(), j(), _(!0), L())) {
            var n = M(),
              r = n.box,
              a = n.content;
            y.props.animation && (Rt([r, a], i), Wt([r, a], "hidden"));
          }
          D(),
            $(),
            y.props.animation
              ? L() &&
                (function (e, t) {
                  H(e, function () {
                    !y.state.isVisible &&
                      S.parentNode &&
                      S.parentNode.contains(S) &&
                      t();
                  });
                })(i, y.unmount)
              : y.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          P().addEventListener("mousemove", g), Vt(hs, g), g(e);
        },
        enable: function () {
          y.state.isEnabled = !0;
        },
        disable: function () {
          y.hide(), (y.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          y.state.isVisible && y.hide();
          if (!y.state.isMounted) return;
          Q(),
            J().forEach(function (e) {
              e._tippy.unmount();
            }),
            S.parentNode && S.parentNode.removeChild(S);
          (ms = ms.filter(function (e) {
            return e !== y;
          })),
            (y.state.isMounted = !1),
            I("onHidden", [y]);
        },
        destroy: function () {
          0;
          if (y.state.isDestroyed) return;
          y.clearDelayTimeouts(),
            y.unmount(),
            R(),
            delete e._tippy,
            (y.state.isDestroyed = !0),
            I("onDestroy", [y]);
        },
      };
    if (!d.render) return y;
    var w = d.render(y),
      S = w.popper,
      x = w.onUpdate;
    S.setAttribute("data-tippy-root", ""),
      (S.id = "tippy-" + y.id),
      (y.popper = S),
      (e._tippy = y),
      (S._tippy = y);
    var E = b.map(function (e) {
        return e.fn(y);
      }),
      T = e.hasAttribute("aria-expanded");
    return (
      G(),
      $(),
      _(),
      I("onCreate", [y]),
      d.showOnCreate && ee(),
      S.addEventListener("mouseenter", function () {
        y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
      }),
      S.addEventListener("mouseleave", function () {
        y.props.interactive &&
          y.props.trigger.indexOf("mouseenter") >= 0 &&
          P().addEventListener("mousemove", g);
      }),
      y
    );
    function C() {
      var e = y.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function A() {
      return "hold" === C()[0];
    }
    function L() {
      var e;
      return !(null == (e = y.props.render) || !e.$$tippy);
    }
    function O() {
      return l || e;
    }
    function P() {
      var e = O().parentNode;
      return e ? Ut(e) : document;
    }
    function M() {
      return us(S);
    }
    function k(e) {
      return (y.state.isMounted && !y.state.isVisible) ||
        Zt.isTouch ||
        (r && "focus" === r.type)
        ? 0
        : kt(y.props.delay, e ? 0 : 1, is.delay);
    }
    function _(e) {
      void 0 === e && (e = !1),
        (S.style.pointerEvents = y.props.interactive && !e ? "" : "none"),
        (S.style.zIndex = "" + y.props.zIndex);
    }
    function I(e, t, s) {
      var i;
      (void 0 === s && (s = !0),
      E.forEach(function (s) {
        s[e] && s[e].apply(s, t);
      }),
      s) && (i = y.props)[e].apply(i, t);
    }
    function D() {
      var t = y.props.aria;
      if (t.content) {
        var s = "aria-" + t.content,
          i = S.id;
        $t(y.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(s);
          if (y.state.isVisible) e.setAttribute(s, t ? t + " " + i : i);
          else {
            var n = t && t.replace(i, "").trim();
            n ? e.setAttribute(s, n) : e.removeAttribute(s);
          }
        });
      }
    }
    function $() {
      !T &&
        y.props.aria.expanded &&
        $t(y.props.triggerTarget || e).forEach(function (e) {
          y.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                y.state.isVisible && e === O() ? "true" : "false",
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function V() {
      P().removeEventListener("mousemove", g),
        (hs = hs.filter(function (e) {
          return e !== g;
        }));
    }
    function N(t) {
      if (!Zt.isTouch || (!f && "mousedown" !== t.type)) {
        var s = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!y.props.interactive || !Xt(S, s)) {
          if (
            $t(y.props.triggerTarget || e).some(function (e) {
              return Xt(e, s);
            })
          ) {
            if (Zt.isTouch) return;
            if (y.state.isVisible && y.props.trigger.indexOf("click") >= 0)
              return;
          } else I("onClickOutside", [y, t]);
          !0 === y.props.hideOnClick &&
            (y.clearDelayTimeouts(),
            y.hide(),
            (p = !0),
            setTimeout(function () {
              p = !1;
            }),
            y.state.isMounted || j());
        }
      }
    }
    function q() {
      f = !0;
    }
    function z() {
      f = !1;
    }
    function B() {
      var e = P();
      e.addEventListener("mousedown", N, !0),
        e.addEventListener("touchend", N, Pt),
        e.addEventListener("touchstart", z, Pt),
        e.addEventListener("touchmove", q, Pt);
    }
    function j() {
      var e = P();
      e.removeEventListener("mousedown", N, !0),
        e.removeEventListener("touchend", N, Pt),
        e.removeEventListener("touchstart", z, Pt),
        e.removeEventListener("touchmove", q, Pt);
    }
    function H(e, t) {
      var s = M().box;
      function i(e) {
        e.target === s && (Yt(s, "remove", i), t());
      }
      if (0 === e) return t();
      Yt(s, "remove", a), Yt(s, "add", i), (a = i);
    }
    function F(t, s, i) {
      void 0 === i && (i = !1),
        $t(y.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, s, i),
            m.push({ node: e, eventType: t, handler: s, options: i });
        });
    }
    function G() {
      var e;
      A() &&
        (F("touchstart", W, { passive: !0 }),
        F("touchend", Y, { passive: !0 })),
        ((e = y.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
          function (e) {
            if ("manual" !== e)
              switch ((F(e, W), e)) {
                case "mouseenter":
                  F("mouseleave", Y);
                  break;
                case "focus":
                  F(ts ? "focusout" : "blur", X);
                  break;
                case "focusin":
                  F("focusout", X);
              }
          },
        );
    }
    function R() {
      m.forEach(function (e) {
        var t = e.node,
          s = e.eventType,
          i = e.handler,
          n = e.options;
        t.removeEventListener(s, i, n);
      }),
        (m = []);
    }
    function W(e) {
      var t,
        s = !1;
      if (y.state.isEnabled && !Z(e) && !p) {
        var i = "focus" === (null == (t = r) ? void 0 : t.type);
        (r = e),
          (l = e.currentTarget),
          $(),
          !y.state.isVisible &&
            Ht(e) &&
            hs.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (y.props.trigger.indexOf("mouseenter") < 0 || u) &&
          !1 !== y.props.hideOnClick &&
          y.state.isVisible
            ? (s = !0)
            : ee(e),
          "click" === e.type && (u = !s),
          s && !i && te(e);
      }
    }
    function U(e) {
      var t = e.target,
        s = O().contains(t) || S.contains(t);
      if ("mousemove" !== e.type || !s) {
        var i = J()
          .concat(S)
          .map(function (e) {
            var t,
              s = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
            return s
              ? {
                  popperRect: e.getBoundingClientRect(),
                  popperState: s,
                  props: d,
                }
              : null;
          })
          .filter(Boolean);
        (function (e, t) {
          var s = t.clientX,
            i = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              n = e.popperState,
              r = e.props.interactiveBorder,
              a = Nt(n.placement),
              o = n.modifiersData.offset;
            if (!o) return !0;
            var l = "bottom" === a ? o.top.y : 0,
              c = "top" === a ? o.bottom.y : 0,
              d = "right" === a ? o.left.x : 0,
              u = "left" === a ? o.right.x : 0,
              p = t.top - i + l > r,
              f = i - t.bottom - c > r,
              h = t.left - s + d > r,
              m = s - t.right - u > r;
            return p || f || h || m;
          });
        })(i, e) && (V(), te(e));
      }
    }
    function Y(e) {
      Z(e) ||
        (y.props.trigger.indexOf("click") >= 0 && u) ||
        (y.props.interactive ? y.hideWithInteractivity(e) : te(e));
    }
    function X(e) {
      (y.props.trigger.indexOf("focusin") < 0 && e.target !== O()) ||
        (y.props.interactive &&
          e.relatedTarget &&
          S.contains(e.relatedTarget)) ||
        te(e);
    }
    function Z(e) {
      return !!Zt.isTouch && A() !== e.type.indexOf("touch") >= 0;
    }
    function K() {
      Q();
      var t = y.props,
        s = t.popperOptions,
        i = t.placement,
        n = t.offset,
        r = t.getReferenceClientRect,
        a = t.moveTransition,
        l = L() ? us(S).arrow : null,
        c = r
          ? {
              getBoundingClientRect: r,
              contextElement: r.contextElement || O(),
            }
          : e,
        d = {
          name: "$$tippy",
          enabled: !0,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: function (e) {
            var t = e.state;
            if (L()) {
              var s = M().box;
              ["placement", "reference-hidden", "escaped"].forEach(
                function (e) {
                  "placement" === e
                    ? s.setAttribute("data-placement", t.placement)
                    : t.attributes.popper["data-popper-" + e]
                      ? s.setAttribute("data-" + e, "")
                      : s.removeAttribute("data-" + e);
                },
              ),
                (t.attributes.popper = {});
            }
          },
        },
        u = [
          { name: "offset", options: { offset: n } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !a } },
          d,
        ];
      L() &&
        l &&
        u.push({ name: "arrow", options: { element: l, padding: 3 } }),
        u.push.apply(u, (null == s ? void 0 : s.modifiers) || []),
        (y.popperInstance = Tt(
          c,
          S,
          Object.assign({}, s, {
            placement: i,
            onFirstUpdate: o,
            modifiers: u,
          }),
        ));
    }
    function Q() {
      y.popperInstance &&
        (y.popperInstance.destroy(), (y.popperInstance = null));
    }
    function J() {
      return qt(S.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      y.clearDelayTimeouts(), e && I("onTrigger", [y, e]), B();
      var t = k(!0),
        i = C(),
        n = i[0],
        r = i[1];
      Zt.isTouch && "hold" === n && r && (t = r),
        t
          ? (s = setTimeout(function () {
              y.show();
            }, t))
          : y.show();
    }
    function te(e) {
      if (
        (y.clearDelayTimeouts(), I("onUntrigger", [y, e]), y.state.isVisible)
      ) {
        if (
          !(
            y.props.trigger.indexOf("mouseenter") >= 0 &&
            y.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            u
          )
        ) {
          var t = k(!1);
          t
            ? (i = setTimeout(function () {
                y.state.isVisible && y.hide();
              }, t))
            : (n = requestAnimationFrame(function () {
                y.hide();
              }));
        }
      } else j();
    }
  }
  function vs(e, t) {
    void 0 === t && (t = {});
    var s = is.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", Qt, Pt),
      window.addEventListener("blur", es);
    var i = Object.assign({}, t, { plugins: s }),
      n = Gt(e).reduce(function (e, t) {
        var s = t && gs(t, i);
        return s && e.push(s), e;
      }, []);
    return jt(e) ? n[0] : n;
  }
  (vs.defaultProps = is),
    (vs.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        is[t] = e[t];
      });
    }),
    (vs.currentInput = Zt);
  Object.assign({}, at, {
    effect: function (e) {
      var t = e.state,
        s = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, s.popper),
        (t.styles = s),
        t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow);
    },
  });
  vs.setDefaultProps({ render: ps });
  const bs = vs;
  function ys(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function ws(e, t) {
    void 0 === e && (e = {}),
      void 0 === t && (t = {}),
      Object.keys(t).forEach((s) => {
        void 0 === e[s]
          ? (e[s] = t[s])
          : ys(t[s]) &&
            ys(e[s]) &&
            Object.keys(t[s]).length > 0 &&
            ws(e[s], t[s]);
      });
  }
  e.tippy = bs("[data-tippy-content]", {});
  const Ss = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function xs() {
    const e = "undefined" != typeof document ? document : {};
    return ws(e, Ss), e;
  }
  const Es = {
    document: Ss,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function Ts() {
    const e = "undefined" != typeof window ? window : {};
    return ws(e, Es), e;
  }
  function Cs(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function As() {
    return Date.now();
  }
  function Ls(e, t) {
    void 0 === t && (t = "x");
    const s = Ts();
    let i, n, r;
    const a = (function (e) {
      const t = Ts();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((n = a.transform || a.webkitTransform),
          n.split(",").length > 6 &&
            (n = n
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new s.WebKitCSSMatrix("none" === n ? "" : n)))
        : ((r =
            a.MozTransform ||
            a.OTransform ||
            a.MsTransform ||
            a.msTransform ||
            a.transform ||
            a
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = r.toString().split(","))),
      "x" === t &&
        (n = s.WebKitCSSMatrix
          ? r.m41
          : 16 === i.length
            ? parseFloat(i[12])
            : parseFloat(i[4])),
      "y" === t &&
        (n = s.WebKitCSSMatrix
          ? r.m42
          : 16 === i.length
            ? parseFloat(i[13])
            : parseFloat(i[5])),
      n || 0
    );
  }
  function Os(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function Ps() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != n &&
        ((s = n),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(n)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            r = Object.getOwnPropertyDescriptor(n, i);
          void 0 !== r &&
            r.enumerable &&
            (Os(e[i]) && Os(n[i])
              ? n[i].__swiper__
                ? (e[i] = n[i])
                : Ps(e[i], n[i])
              : !Os(e[i]) && Os(n[i])
                ? ((e[i] = {}),
                  n[i].__swiper__ ? (e[i] = n[i]) : Ps(e[i], n[i]))
                : (e[i] = n[i]));
        }
      }
    }
    var s;
    return e;
  }
  function Ms(e, t, s) {
    e.style.setProperty(t, s);
  }
  function ks(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const n = Ts(),
      r = -t.translate;
    let a,
      o = null;
    const l = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      n.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > r ? "next" : "prev",
      d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      u = () => {
        (a = new Date().getTime()), null === o && (o = a);
        const e = Math.max(Math.min((a - o) / l, 1), 0),
          c = 0.5 - Math.cos(e * Math.PI) / 2;
        let p = r + c * (s - r);
        if ((d(p, s) && (p = s), t.wrapperEl.scrollTo({ [i]: p }), d(p, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: p });
            }),
            void n.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = n.requestAnimationFrame(u);
      };
    u();
  }
  function _s(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function Is(e) {
    try {
      return void console.warn(e);
    } catch (e) {}
  }
  function Ds(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return (
      s.classList.add(
        ...(Array.isArray(t)
          ? t
          : (function (e) {
              return (
                void 0 === e && (e = ""),
                e
                  .trim()
                  .split(" ")
                  .filter((e) => !!e.trim())
              );
            })(t)),
      ),
      s
    );
  }
  function $s(e, t) {
    return Ts().getComputedStyle(e, null).getPropertyValue(t);
  }
  function Vs(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function Ns(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i; )
      t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
  }
  function qs(e, t, s) {
    const i = Ts();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let zs, Bs, js;
  function Hs() {
    return (
      zs ||
        (zs = (function () {
          const e = Ts(),
            t = xs();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      zs
    );
  }
  function Fs(e) {
    return (
      void 0 === e && (e = {}),
      Bs ||
        (Bs = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = Hs(),
            i = Ts(),
            n = i.navigator.platform,
            r = t || i.navigator.userAgent,
            a = { ios: !1, android: !1 },
            o = i.screen.width,
            l = i.screen.height,
            c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = r.match(/(iPad).*OS\s([\d_]+)/);
          const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            f = "Win32" === n;
          let h = "MacIntel" === n;
          return (
            !d &&
              h &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${l}`) >= 0 &&
              ((d = r.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (h = !1)),
            c && !f && ((a.os = "android"), (a.android = !0)),
            (d || p || u) && ((a.os = "ios"), (a.ios = !0)),
            a
          );
        })(e)),
      Bs
    );
  }
  function Gs() {
    return (
      js ||
        (js = (function () {
          const e = Ts();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, i] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && i < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
          };
        })()),
      js
    );
  }
  var Rs = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const n = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][n](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function n() {
        i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
        for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++)
          r[a] = arguments[a];
        t.apply(i, r);
      }
      return (n.__emitterProxy = t), i.on(e, n, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, n) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(n, 1);
                  });
            }),
            s)
          : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++)
        r[a] = arguments[a];
      "string" == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (s = r.slice(1, r.length)), (i = e))
        : ((t = r[0].events), (s = r[0].data), (i = r[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const Ws = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    Us = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    Ys = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        n = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = n,
          r = [s - t];
        return (
          r.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
          void e.slides.forEach((t, s) => {
            r.includes(t.column) && Us(e, s);
          })
        );
      }
      const r = n + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let i = n - t; i <= r + t; i += 1) {
          const t = ((i % s) + s) % s;
          (t < n || t > r) && Us(e, t);
        }
      else
        for (let i = Math.max(n - t, 0); i <= Math.min(r + t, s - 1); i += 1)
          i !== n && (i > r || i < n) && Us(e, i);
    };
  var Xs = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt($s(i, "padding-left") || 0, 10) -
            parseInt($s(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt($s(i, "padding-top") || 0, 10) -
            parseInt($s(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t, s) {
        return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
      }
      const s = e.params,
        {
          wrapperEl: i,
          slidesEl: n,
          size: r,
          rtlTranslate: a,
          wrongRTL: o,
        } = e,
        l = e.virtual && s.virtual.enabled,
        c = l ? e.virtual.slides.length : e.slides.length,
        d = _s(n, `.${e.params.slideClass}, swiper-slide`),
        u = l ? e.virtual.slides.length : d.length;
      let p = [];
      const f = [],
        h = [];
      let m = s.slidesOffsetBefore;
      "function" == typeof m && (m = s.slidesOffsetBefore.call(e));
      let g = s.slidesOffsetAfter;
      "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = s.spaceBetween,
        w = -m,
        S = 0,
        x = 0;
      if (void 0 === r) return;
      "string" == typeof y && y.indexOf("%") >= 0
        ? (y = (parseFloat(y.replace("%", "")) / 100) * r)
        : "string" == typeof y && (y = parseFloat(y)),
        (e.virtualSize = -y),
        d.forEach((e) => {
          a ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        s.centeredSlides &&
          s.cssMode &&
          (Ms(i, "--swiper-centered-offset-before", ""),
          Ms(i, "--swiper-centered-offset-after", ""));
      const E = s.grid && s.grid.rows > 1 && e.grid;
      let T;
      E ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
      const C =
        "auto" === s.slidesPerView &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter(
          (e) => void 0 !== s.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let i = 0; i < u; i += 1) {
        let n;
        if (
          ((T = 0),
          d[i] && (n = d[i]),
          E && e.grid.updateSlide(i, n, d),
          !d[i] || "none" !== $s(n, "display"))
        ) {
          if ("auto" === s.slidesPerView) {
            C && (d[i].style[e.getDirectionLabel("width")] = "");
            const r = getComputedStyle(n),
              a = n.style.transform,
              o = n.style.webkitTransform;
            if (
              (a && (n.style.transform = "none"),
              o && (n.style.webkitTransform = "none"),
              s.roundLengths)
            )
              T = e.isHorizontal() ? qs(n, "width", !0) : qs(n, "height", !0);
            else {
              const e = t(r, "width"),
                s = t(r, "padding-left"),
                i = t(r, "padding-right"),
                a = t(r, "margin-left"),
                o = t(r, "margin-right"),
                l = r.getPropertyValue("box-sizing");
              if (l && "border-box" === l) T = e + a + o;
              else {
                const { clientWidth: t, offsetWidth: r } = n;
                T = e + s + i + a + o + (r - t);
              }
            }
            a && (n.style.transform = a),
              o && (n.style.webkitTransform = o),
              s.roundLengths && (T = Math.floor(T));
          } else
            (T = (r - (s.slidesPerView - 1) * y) / s.slidesPerView),
              s.roundLengths && (T = Math.floor(T)),
              d[i] && (d[i].style[e.getDirectionLabel("width")] = `${T}px`);
          d[i] && (d[i].swiperSlideSize = T),
            h.push(T),
            s.centeredSlides
              ? ((w = w + T / 2 + S / 2 + y),
                0 === S && 0 !== i && (w = w - r / 2 - y),
                0 === i && (w = w - r / 2 - y),
                Math.abs(w) < 0.001 && (w = 0),
                s.roundLengths && (w = Math.floor(w)),
                x % s.slidesPerGroup == 0 && p.push(w),
                f.push(w))
              : (s.roundLengths && (w = Math.floor(w)),
                (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                  e.params.slidesPerGroup ==
                  0 && p.push(w),
                f.push(w),
                (w = w + T + y)),
            (e.virtualSize += T + y),
            (S = T),
            (x += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + g),
        a &&
          o &&
          ("slide" === s.effect || "coverflow" === s.effect) &&
          (i.style.width = `${e.virtualSize + y}px`),
        s.setWrapperSize &&
          (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`),
        E && e.grid.updateWrapperSize(T, p),
        !s.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < p.length; i += 1) {
          let n = p[i];
          s.roundLengths && (n = Math.floor(n)),
            p[i] <= e.virtualSize - r && t.push(n);
        }
        (p = t),
          Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
            p.push(e.virtualSize - r);
      }
      if (l && s.loop) {
        const t = h[0] + y;
        if (s.slidesPerGroup > 1) {
          const i = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                s.slidesPerGroup,
            ),
            n = t * s.slidesPerGroup;
          for (let e = 0; e < i; e += 1) p.push(p[p.length - 1] + n);
        }
        for (
          let i = 0;
          i < e.virtual.slidesBefore + e.virtual.slidesAfter;
          i += 1
        )
          1 === s.slidesPerGroup && p.push(p[p.length - 1] + t),
            f.push(f[f.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === p.length && (p = [0]), 0 !== y)) {
        const t =
          e.isHorizontal() && a
            ? "marginLeft"
            : e.getDirectionLabel("marginRight");
        d.filter(
          (e, t) => !(s.cssMode && !s.loop) || t !== d.length - 1,
        ).forEach((e) => {
          e.style[t] = `${y}px`;
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        h.forEach((t) => {
          e += t + (y || 0);
        }),
          (e -= y);
        const t = e - r;
        p = p.map((e) => (e <= 0 ? -m : e > t ? t + g : e));
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        if (
          (h.forEach((t) => {
            e += t + (y || 0);
          }),
          (e -= y),
          e < r)
        ) {
          const t = (r - e) / 2;
          p.forEach((e, s) => {
            p[s] = e - t;
          }),
            f.forEach((e, s) => {
              f[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: d,
          snapGrid: p,
          slidesGrid: f,
          slidesSizesGrid: h,
        }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
      ) {
        Ms(i, "--swiper-centered-offset-before", -p[0] + "px"),
          Ms(
            i,
            "--swiper-centered-offset-after",
            e.size / 2 - h[h.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (u !== c && e.emit("slidesLengthChange"),
        p.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        f.length !== b && e.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && e.updateSlidesOffset(),
        e.emit("slidesUpdated"),
        !(l || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
      ) {
        const t = `${s.containerModifierClass}backface-hidden`,
          i = e.el.classList.contains(t);
        u <= s.maxBackfaceHiddenSlides
          ? i || e.el.classList.add(t)
          : i && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let n,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const a = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
            const e = t.activeIndex + n;
            if (e > t.slides.length && !i) break;
            s.push(a(e));
          }
      else s.push(a(t.activeIndex));
      for (n = 0; n < s.length; n += 1)
        if (void 0 !== s[n]) {
          const e = s[n].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: n, snapGrid: r } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let a = -e;
      n && (a = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let o = s.spaceBetween;
      "string" == typeof o && o.indexOf("%") >= 0
        ? (o = (parseFloat(o.replace("%", "")) / 100) * t.size)
        : "string" == typeof o && (o = parseFloat(o));
      for (let e = 0; e < i.length; e += 1) {
        const l = i[e];
        let c = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (c -= i[0].swiperSlideOffset);
        const d =
            (a + (s.centeredSlides ? t.minTranslate() : 0) - c) /
            (l.swiperSlideSize + o),
          u =
            (a - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - c) /
            (l.swiperSlideSize + o),
          p = -(a - c),
          f = p + t.slidesSizesGrid[e],
          h = p >= 0 && p <= t.size - t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (f > 1 && f <= t.size) ||
          (p <= 0 && f >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          h && i[e].classList.add(s.slideFullyVisibleClass),
          (l.progress = n ? -d : d),
          (l.originalProgress = n ? -u : u);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: n, isBeginning: r, isEnd: a, progressLoop: o } = t;
      const l = r,
        c = a;
      if (0 === i) (n = 0), (r = !0), (a = !0);
      else {
        n = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          o = Math.abs(e - t.maxTranslate()) < 1;
        (r = s || n <= 0), (a = o || n >= 1), s && (n = 0), o && (n = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          n = t.slidesGrid[s],
          r = t.slidesGrid[i],
          a = t.slidesGrid[t.slidesGrid.length - 1],
          l = Math.abs(e);
        (o = l >= n ? (l - n) / a : (l + a - r) / a), o > 1 && (o -= 1);
      }
      Object.assign(t, {
        progress: n,
        progressLoop: o,
        isBeginning: r,
        isEnd: a,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !l && t.emit("reachBeginning toEdge"),
        a && !c && t.emit("reachEnd toEdge"),
        ((l && !r) || (c && !a)) && t.emit("fromEdge"),
        t.emit("progress", n);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: n } = e,
        r = e.virtual && s.virtual.enabled,
        a = e.grid && s.grid && s.grid.rows > 1,
        o = (e) => _s(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let l, c, d;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass,
          );
        }),
        r)
      )
        if (s.loop) {
          let t = n - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (l = o(`[data-swiper-slide-index="${t}"]`));
        } else l = o(`[data-swiper-slide-index="${n}"]`);
      else
        a
          ? ((l = t.filter((e) => e.column === n)[0]),
            (d = t.filter((e) => e.column === n + 1)[0]),
            (c = t.filter((e) => e.column === n - 1)[0]))
          : (l = t[n]);
      l &&
        (l.classList.add(s.slideActiveClass),
        a
          ? (d && d.classList.add(s.slideNextClass),
            c && c.classList.add(s.slidePrevClass))
          : ((d = (function (e, t) {
              const s = [];
              for (; e.nextElementSibling; ) {
                const i = e.nextElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(l, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && !d && (d = t[0]),
            d && d.classList.add(s.slideNextClass),
            (c = (function (e, t) {
              const s = [];
              for (; e.previousElementSibling; ) {
                const i = e.previousElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(l, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && 0 === !c && (c = t[t.length - 1]),
            c && c.classList.add(s.slidePrevClass))),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: n,
          activeIndex: r,
          realIndex: a,
          snapIndex: o,
        } = t;
      let l,
        c = e;
      const d = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === c &&
          (c = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let n;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (n = e)
                  : i >= t[e] && i < t[e + 1] && (n = e + 1)
                : i >= t[e] && (n = e);
            return (
              s.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0), n
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        l = i.indexOf(s);
      else {
        const e = Math.min(n.slidesPerGroupSkip, c);
        l = e + Math.floor((c - e) / n.slidesPerGroup);
      }
      if ((l >= i.length && (l = i.length - 1), c === r && !t.params.loop))
        return void (l !== o && ((t.snapIndex = l), t.emit("snapIndexChange")));
      if (c === r && t.params.loop && t.virtual && t.params.virtual.enabled)
        return void (t.realIndex = d(c));
      const u = t.grid && n.grid && n.grid.rows > 1;
      let p;
      if (t.virtual && n.virtual.enabled && n.loop) p = d(c);
      else if (u) {
        const e = t.slides.filter((e) => e.column === c)[0];
        let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
          (p = Math.floor(s / n.grid.rows));
      } else if (t.slides[c]) {
        const e = t.slides[c].getAttribute("data-swiper-slide-index");
        p = e ? parseInt(e, 10) : c;
      } else p = c;
      Object.assign(t, {
        previousSnapIndex: o,
        snapIndex: l,
        previousRealIndex: a,
        realIndex: p,
        previousIndex: r,
        activeIndex: c,
      }),
        t.initialized && Ys(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (a !== p && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        i = s.params;
      let n = e.closest(`.${i.slideClass}, swiper-slide`);
      !n &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !n &&
            e.matches &&
            e.matches(`.${i.slideClass}, swiper-slide`) &&
            (n = e);
        });
      let r,
        a = !1;
      if (n)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === n) {
            (a = !0), (r = e);
            break;
          }
      if (!n || !a)
        return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
      (s.clickedSlide = n),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              n.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = r),
        i.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide();
    },
  };
  var Zs = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: n } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let r = Ls(n, e);
      return (r += this.cssOverflowAdjustment()), s && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: n, wrapperEl: r, progress: a } = s;
      let o,
        l = 0,
        c = 0;
      s.isHorizontal() ? (l = i ? -e : e) : (c = e),
        n.roundLengths && ((l = Math.floor(l)), (c = Math.floor(c))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? l : c),
        n.cssMode
          ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -l
              : -c)
          : n.virtualTranslate ||
            (s.isHorizontal()
              ? (l -= s.cssOverflowAdjustment())
              : (c -= s.cssOverflowAdjustment()),
            (r.style.transform = `translate3d(${l}px, ${c}px, 0px)`));
      const d = s.maxTranslate() - s.minTranslate();
      (o = 0 === d ? 0 : (e - s.minTranslate()) / d),
        o !== a && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const r = this,
        { params: a, wrapperEl: o } = r;
      if (r.animating && a.preventInteractionOnTransition) return !1;
      const l = r.minTranslate(),
        c = r.maxTranslate();
      let d;
      if (
        ((d = i && e > l ? l : i && e < c ? c : e),
        r.updateProgress(d),
        a.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!r.support.smoothScroll)
            return (
              ks({ swiper: r, targetPosition: -d, side: e ? "left" : "top" }),
              !0
            );
          o.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(d),
            s &&
              (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(d),
            s &&
              (r.emit("beforeTransitionStart", t, n),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd,
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    s && r.emit("transitionEnd"));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function Ks(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
    const { activeIndex: r, previousIndex: a } = t;
    let o = i;
    if (
      (o || (o = r > a ? "next" : r < a ? "prev" : "reset"),
      t.emit(`transition${n}`),
      s && r !== a)
    ) {
      if ("reset" === o) return void t.emit(`slideResetTransition${n}`);
      t.emit(`slideChangeTransition${n}`),
        "next" === o
          ? t.emit(`slideNextTransition${n}`)
          : t.emit(`slidePrevTransition${n}`);
    }
  }
  var Qs = {
    slideTo: function (e, t, s, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const r = this;
      let a = e;
      a < 0 && (a = 0);
      const {
        params: o,
        snapGrid: l,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: u,
        rtlTranslate: p,
        wrapperEl: f,
        enabled: h,
      } = r;
      if ((r.animating && o.preventInteractionOnTransition) || (!h && !i && !n))
        return !1;
      const m = Math.min(r.params.slidesPerGroupSkip, a);
      let g = m + Math.floor((a - m) / r.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1);
      const v = -l[g];
      if (o.normalizeSlideIndex)
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * c[e]),
            i = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (a = e)
              : t >= s && t < i && (a = e + 1)
            : t >= s && (a = e);
        }
      if (r.initialized && a !== u) {
        if (
          !r.allowSlideNext &&
          (p
            ? v > r.translate && v > r.minTranslate()
            : v < r.translate && v < r.minTranslate())
        )
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (u || 0) !== a
        )
          return !1;
      }
      let b;
      if (
        (a !== (d || 0) && s && r.emit("beforeSlideChangeStart"),
        r.updateProgress(v),
        (b = a > u ? "next" : a < u ? "prev" : "reset"),
        (p && -v === r.translate) || (!p && v === r.translate))
      )
        return (
          r.updateActiveIndex(a),
          o.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== o.effect && r.setTranslate(v),
          "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
          !1
        );
      if (o.cssMode) {
        const e = r.isHorizontal(),
          s = p ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
              ? ((r._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  f[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (f[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._immediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              ks({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          f.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(a),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, i),
        r.transitionStart(s, b),
        0 === t
          ? r.transitionEnd(s, b)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd,
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(s, b));
              }),
            r.wrapperEl.addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const n = this,
        r = n.grid && n.params.grid && n.params.grid.rows > 1;
      let a = e;
      if (n.params.loop)
        if (n.virtual && n.params.virtual.enabled) a += n.virtual.slidesBefore;
        else {
          let e;
          if (r) {
            const t = a * n.params.grid.rows;
            e = n.slides.filter(
              (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
            )[0].column;
          } else e = n.getSlideIndexByData(a);
          const t = r
              ? Math.ceil(n.slides.length / n.params.grid.rows)
              : n.slides.length,
            { centeredSlides: s } = n.params;
          let i = n.params.slidesPerView;
          "auto" === i
            ? (i = n.slidesPerViewDynamic())
            : ((i = Math.ceil(parseFloat(n.params.slidesPerView, 10))),
              s && i % 2 == 0 && (i += 1));
          let o = t - e < i;
          if ((s && (o = o || e < Math.ceil(i / 2)), o)) {
            const i = s
              ? e < n.activeIndex
                ? "prev"
                : "next"
              : e - n.activeIndex - 1 < n.params.slidesPerView
                ? "next"
                : "prev";
            n.loopFix({
              direction: i,
              slideTo: !0,
              activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
              slideRealIndex: "next" === i ? n.realIndex : void 0,
            });
          }
          if (r) {
            const e = a * n.params.grid.rows;
            a = n.slides.filter(
              (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
            )[0].column;
          } else a = n.getSlideIndexByData(a);
        }
      return (
        requestAnimationFrame(() => {
          n.slideTo(a, t, s, i);
        }),
        n
      );
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { enabled: n, params: r, animating: a } = i;
      if (!n) return i;
      let o = r.slidesPerGroup;
      "auto" === r.slidesPerView &&
        1 === r.slidesPerGroup &&
        r.slidesPerGroupAuto &&
        (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : o,
        c = i.virtual && r.virtual.enabled;
      if (r.loop) {
        if (a && !c && r.loopPreventsSliding) return !1;
        if (
          (i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft),
          i.activeIndex === i.slides.length - 1 && r.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              i.slideTo(i.activeIndex + l, e, t, s);
            }),
            !0
          );
      }
      return r.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + l, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: n,
          snapGrid: r,
          slidesGrid: a,
          rtlTranslate: o,
          enabled: l,
          animating: c,
        } = i;
      if (!l) return i;
      const d = i.virtual && n.virtual.enabled;
      if (n.loop) {
        if (c && !d && n.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function u(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = u(o ? i.translate : -i.translate),
        f = r.map((e) => u(e));
      let h = r[f.indexOf(p) - 1];
      if (void 0 === h && n.cssMode) {
        let e;
        r.forEach((t, s) => {
          p >= t && (e = s);
        }),
          void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== h &&
          ((m = a.indexOf(h)),
          m < 0 && (m = i.activeIndex - 1),
          "auto" === n.slidesPerView &&
            1 === n.slidesPerGroup &&
            n.slidesPerGroupAuto &&
            ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        n.rewind && i.isBeginning)
      ) {
        const n =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(n, e, t, s);
      }
      return n.loop && 0 === i.activeIndex && n.cssMode
        ? (requestAnimationFrame(() => {
            i.slideTo(m, e, t, s);
          }),
          !0)
        : i.slideTo(m, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const n = this;
      let r = n.activeIndex;
      const a = Math.min(n.params.slidesPerGroupSkip, r),
        o = a + Math.floor((r - a) / n.params.slidesPerGroup),
        l = n.rtlTranslate ? n.translate : -n.translate;
      if (l >= n.snapGrid[o]) {
        const e = n.snapGrid[o];
        l - e > (n.snapGrid[o + 1] - e) * i && (r += n.params.slidesPerGroup);
      } else {
        const e = n.snapGrid[o - 1];
        l - e <= (n.snapGrid[o] - e) * i && (r -= n.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, n.slidesGrid.length - 1)),
        n.slideTo(r, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let n,
        r = e.clickedIndex;
      const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (n = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? r < e.loopedSlides - i / 2 ||
              r > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  _s(s, `${a}[data-swiper-slide-index="${n}"]`)[0],
                )),
                Cs(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - i
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  _s(s, `${a}[data-swiper-slide-index="${n}"]`)[0],
                )),
                Cs(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  var Js = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      const n = () => {
          _s(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          });
        },
        r = t.grid && s.grid && s.grid.rows > 1,
        a = s.slidesPerGroup * (r ? s.grid.rows : 1),
        o = t.slides.length % a != 0,
        l = r && t.slides.length % s.grid.rows != 0,
        c = (e) => {
          for (let i = 0; i < e; i += 1) {
            const e = t.isElement
              ? Ds("swiper-slide", [s.slideBlankClass])
              : Ds("div", [s.slideClass, s.slideBlankClass]);
            t.slidesEl.append(e);
          }
        };
      if (o) {
        if (s.loopAddBlankSlides) {
          c(a - (t.slides.length % a)), t.recalcSlides(), t.updateSlides();
        } else
          Is(
            "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        n();
      } else if (l) {
        if (s.loopAddBlankSlides) {
          c(s.grid.rows - (t.slides.length % s.grid.rows)),
            t.recalcSlides(),
            t.updateSlides();
        } else
          Is(
            "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        n();
      } else n();
      t.loopFix({
        slideRealIndex: e,
        direction: s.centeredSlides ? void 0 : "next",
      });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: n,
        activeSlideIndex: r,
        byController: a,
        byMousewheel: o,
      } = void 0 === e ? {} : e;
      const l = this;
      if (!l.params.loop) return;
      l.emit("beforeLoopFix");
      const {
          slides: c,
          allowSlidePrev: d,
          allowSlideNext: u,
          slidesEl: p,
          params: f,
        } = l,
        { centeredSlides: h } = f;
      if (
        ((l.allowSlidePrev = !0),
        (l.allowSlideNext = !0),
        l.virtual && f.virtual.enabled)
      )
        return (
          s &&
            (f.centeredSlides || 0 !== l.snapIndex
              ? f.centeredSlides && l.snapIndex < f.slidesPerView
                ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                : l.snapIndex === l.snapGrid.length - 1 &&
                  l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
              : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
          (l.allowSlidePrev = d),
          (l.allowSlideNext = u),
          void l.emit("loopFix")
        );
      let m = f.slidesPerView;
      "auto" === m
        ? (m = l.slidesPerViewDynamic())
        : ((m = Math.ceil(parseFloat(f.slidesPerView, 10))),
          h && m % 2 == 0 && (m += 1));
      const g = f.slidesPerGroupAuto ? m : f.slidesPerGroup;
      let v = g;
      v % g != 0 && (v += g - (v % g)),
        (v += f.loopAdditionalSlides),
        (l.loopedSlides = v);
      const b = l.grid && f.grid && f.grid.rows > 1;
      c.length < m + v
        ? Is(
            "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
          )
        : b &&
          "row" === f.grid.fill &&
          Is(
            "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
          );
      const y = [],
        w = [];
      let S = l.activeIndex;
      void 0 === r
        ? (r = l.getSlideIndex(
            c.filter((e) => e.classList.contains(f.slideActiveClass))[0],
          ))
        : (S = r);
      const x = "next" === i || !i,
        E = "prev" === i || !i;
      let T = 0,
        C = 0;
      const A = b ? Math.ceil(c.length / f.grid.rows) : c.length,
        L = (b ? c[r].column : r) + (h && void 0 === n ? -m / 2 + 0.5 : 0);
      if (L < v) {
        T = Math.max(v - L, g);
        for (let e = 0; e < v - L; e += 1) {
          const t = e - Math.floor(e / A) * A;
          if (b) {
            const e = A - t - 1;
            for (let t = c.length - 1; t >= 0; t -= 1)
              c[t].column === e && y.push(t);
          } else y.push(A - t - 1);
        }
      } else if (L + m > A - v) {
        C = Math.max(L - (A - 2 * v), g);
        for (let e = 0; e < C; e += 1) {
          const t = e - Math.floor(e / A) * A;
          b
            ? c.forEach((e, s) => {
                e.column === t && w.push(s);
              })
            : w.push(t);
        }
      }
      if (
        ((l.__preventObserver__ = !0),
        requestAnimationFrame(() => {
          l.__preventObserver__ = !1;
        }),
        E &&
          y.forEach((e) => {
            (c[e].swiperLoopMoveDOM = !0),
              p.prepend(c[e]),
              (c[e].swiperLoopMoveDOM = !1);
          }),
        x &&
          w.forEach((e) => {
            (c[e].swiperLoopMoveDOM = !0),
              p.append(c[e]),
              (c[e].swiperLoopMoveDOM = !1);
          }),
        l.recalcSlides(),
        "auto" === f.slidesPerView
          ? l.updateSlides()
          : b &&
            ((y.length > 0 && E) || (w.length > 0 && x)) &&
            l.slides.forEach((e, t) => {
              l.grid.updateSlide(t, e, l.slides);
            }),
        f.watchSlidesProgress && l.updateSlidesOffset(),
        s)
      )
        if (y.length > 0 && E) {
          if (void 0 === t) {
            const e = l.slidesGrid[S],
              t = l.slidesGrid[S + T] - e;
            o
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(S + T, 0, !1, !0),
                n &&
                  ((l.touchEventsData.startTranslate =
                    l.touchEventsData.startTranslate - t),
                  (l.touchEventsData.currentTranslate =
                    l.touchEventsData.currentTranslate - t)));
          } else if (n) {
            const e = b ? y.length / f.grid.rows : y.length;
            l.slideTo(l.activeIndex + e, 0, !1, !0),
              (l.touchEventsData.currentTranslate = l.translate);
          }
        } else if (w.length > 0 && x)
          if (void 0 === t) {
            const e = l.slidesGrid[S],
              t = l.slidesGrid[S - C] - e;
            o
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(S - C, 0, !1, !0),
                n &&
                  ((l.touchEventsData.startTranslate =
                    l.touchEventsData.startTranslate - t),
                  (l.touchEventsData.currentTranslate =
                    l.touchEventsData.currentTranslate - t)));
          } else {
            const e = b ? w.length / f.grid.rows : w.length;
            l.slideTo(l.activeIndex - e, 0, !1, !0);
          }
      if (
        ((l.allowSlidePrev = d),
        (l.allowSlideNext = u),
        l.controller && l.controller.control && !a)
      ) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: n,
          activeSlideIndex: r,
          byController: !0,
        };
        Array.isArray(l.controller.control)
          ? l.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === f.slidesPerView && s,
                });
            })
          : l.controller.control instanceof l.constructor &&
            l.controller.control.params.loop &&
            l.controller.control.loopFix({
              ...e,
              slideTo:
                l.controller.control.params.slidesPerView === f.slidesPerView &&
                s,
            });
      }
      l.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function ei(e, t, s) {
    const i = Ts(),
      { params: n } = e,
      r = n.edgeSwipeDetection,
      a = n.edgeSwipeThreshold;
    return (
      !r ||
      !(s <= a || s >= i.innerWidth - a) ||
      ("prevent" === r && (t.preventDefault(), !0))
    );
  }
  function ti(e) {
    const t = this,
      s = xs();
    let i = e;
    i.originalEvent && (i = i.originalEvent);
    const n = t.touchEventsData;
    if ("pointerdown" === i.type) {
      if (null !== n.pointerId && n.pointerId !== i.pointerId) return;
      n.pointerId = i.pointerId;
    } else
      "touchstart" === i.type &&
        1 === i.targetTouches.length &&
        (n.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type) return void ei(t, i, i.targetTouches[0].pageX);
    const { params: r, touches: a, enabled: o } = t;
    if (!o) return;
    if (!r.simulateTouch && "mouse" === i.pointerType) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let l = i.target;
    if ("wrapper" === r.touchEventsTarget && !t.wrapperEl.contains(l)) return;
    if ("which" in i && 3 === i.which) return;
    if ("button" in i && i.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const c = !!r.noSwipingClass && "" !== r.noSwipingClass,
      d = i.composedPath ? i.composedPath() : i.path;
    c && i.target && i.target.shadowRoot && d && (l = d[0]);
    const u = r.noSwipingSelector
        ? r.noSwipingSelector
        : `.${r.noSwipingClass}`,
      p = !(!i.target || !i.target.shadowRoot);
    if (
      r.noSwiping &&
      (p
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === xs() || s === Ts()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(u, l)
        : l.closest(u))
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !l.closest(r.swipeHandler)) return;
    (a.currentX = i.pageX), (a.currentY = i.pageY);
    const f = a.currentX,
      h = a.currentY;
    if (!ei(t, i, f)) return;
    Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (a.startX = f),
      (a.startY = h),
      (n.touchStartTime = As()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      r.threshold > 0 && (n.allowThresholdMove = !1);
    let m = !0;
    l.matches(n.focusableElements) &&
      ((m = !1), "SELECT" === l.nodeName && (n.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(n.focusableElements) &&
        s.activeElement !== l &&
        s.activeElement.blur();
    const g = m && t.allowTouchMove && r.touchStartPreventDefault;
    (!r.touchStartForcePreventDefault && !g) ||
      l.isContentEditable ||
      i.preventDefault(),
      r.freeMode &&
        r.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !r.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", i);
  }
  function si(e) {
    const t = xs(),
      s = this,
      i = s.touchEventsData,
      { params: n, touches: r, rtlTranslate: a, enabled: o } = s;
    if (!o) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    let l,
      c = e;
    if ((c.originalEvent && (c = c.originalEvent), "pointermove" === c.type)) {
      if (null !== i.touchId) return;
      if (c.pointerId !== i.pointerId) return;
    }
    if ("touchmove" === c.type) {
      if (
        ((l = [...c.changedTouches].filter(
          (e) => e.identifier === i.touchId,
        )[0]),
        !l || l.identifier !== i.touchId)
      )
        return;
    } else l = c;
    if (!i.isTouched)
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", c)
      );
    const d = l.pageX,
      u = l.pageY;
    if (c.preventedByNestedSwiper) return (r.startX = d), void (r.startY = u);
    if (!s.allowTouchMove)
      return (
        c.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(r, { startX: d, startY: u, currentX: d, currentY: u }),
          (i.touchStartTime = As()))
        )
      );
    if (n.touchReleaseOnEdges && !n.loop)
      if (s.isVertical()) {
        if (
          (u < r.startY && s.translate <= s.maxTranslate()) ||
          (u > r.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (d < r.startX && s.translate <= s.maxTranslate()) ||
        (d > r.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      c.target === t.activeElement &&
      c.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    i.allowTouchCallbacks && s.emit("touchMove", c),
      (r.previousX = r.currentX),
      (r.previousY = r.currentY),
      (r.currentX = d),
      (r.currentY = u);
    const p = r.currentX - r.startX,
      f = r.currentY - r.startY;
    if (s.params.threshold && Math.sqrt(p ** 2 + f ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && r.currentY === r.startY) ||
      (s.isVertical() && r.currentX === r.startX)
        ? (i.isScrolling = !1)
        : p * p + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(p))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > n.touchAngle
            : 90 - e > n.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", c),
      void 0 === i.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !n.cssMode && c.cancelable && c.preventDefault(),
      n.touchMoveStopPropagation && !n.nested && c.stopPropagation();
    let h = s.isHorizontal() ? p : f,
      m = s.isHorizontal()
        ? r.currentX - r.previousX
        : r.currentY - r.previousY;
    n.oneWayMovement &&
      ((h = Math.abs(h) * (a ? 1 : -1)), (m = Math.abs(m) * (a ? 1 : -1))),
      (r.diff = h),
      (h *= n.touchRatio),
      a && ((h = -h), (m = -m));
    const g = s.touchesDirection;
    (s.swipeDirection = h > 0 ? "prev" : "next"),
      (s.touchesDirection = m > 0 ? "prev" : "next");
    const v = s.params.loop && !n.cssMode,
      b =
        ("next" === s.touchesDirection && s.allowSlideNext) ||
        ("prev" === s.touchesDirection && s.allowSlidePrev);
    if (!i.isMoved) {
      if (
        (v && b && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !n.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", c);
    }
    if (
      (new Date().getTime(),
      i.isMoved &&
        i.allowThresholdMove &&
        g !== s.touchesDirection &&
        v &&
        b &&
        Math.abs(h) >= 1)
    )
      return (
        Object.assign(r, {
          startX: d,
          startY: u,
          currentX: d,
          currentY: u,
          startTranslate: i.currentTranslate,
        }),
        (i.loopSwapReset = !0),
        void (i.startTranslate = i.currentTranslate)
      );
    s.emit("sliderMove", c),
      (i.isMoved = !0),
      (i.currentTranslate = h + i.startTranslate);
    let y = !0,
      w = n.resistanceRatio;
    if (
      (n.touchReleaseOnEdges && (w = 0),
      h > 0
        ? (v &&
            b &&
            i.allowThresholdMove &&
            i.currentTranslate >
              (n.centeredSlides
                ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((y = !1),
            n.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + h) ** w)))
        : h < 0 &&
          (v &&
            b &&
            i.allowThresholdMove &&
            i.currentTranslate <
              (n.centeredSlides
                ? s.maxTranslate() +
                  s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === n.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(n.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((y = !1),
            n.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - h) ** w))),
      y && (c.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      n.threshold > 0)
    ) {
      if (!(Math.abs(h) > n.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          void (r.diff = s.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    n.followFinger &&
      !n.cssMode &&
      (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
        n.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      n.freeMode &&
        n.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function ii(e) {
    const t = this,
      s = t.touchEventsData;
    let i,
      n = e;
    n.originalEvent && (n = n.originalEvent);
    if ("touchend" === n.type || "touchcancel" === n.type) {
      if (
        ((i = [...n.changedTouches].filter(
          (e) => e.identifier === s.touchId,
        )[0]),
        !i || i.identifier !== s.touchId)
      )
        return;
    } else {
      if (null !== s.touchId) return;
      if (n.pointerId !== s.pointerId) return;
      i = n;
    }
    if (
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        n.type,
      )
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(n.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    (s.pointerId = null), (s.touchId = null);
    const {
      params: r,
      touches: a,
      rtlTranslate: o,
      slidesGrid: l,
      enabled: c,
    } = t;
    if (!c) return;
    if (!r.simulateTouch && "mouse" === n.pointerType) return;
    if (
      (s.allowTouchCallbacks && t.emit("touchEnd", n),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    r.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = As(),
      u = d - s.touchStartTime;
    if (t.allowClick) {
      const e = n.path || (n.composedPath && n.composedPath());
      t.updateClickedSlide((e && e[0]) || n.target, e),
        t.emit("tap click", n),
        u < 300 &&
          d - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", n);
    }
    if (
      ((s.lastClickTime = As()),
      Cs(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        (0 === a.diff && !s.loopSwapReset) ||
        (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let p;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (p = r.followFinger
        ? o
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      r.cssMode)
    )
      return;
    if (r.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    const f = p >= -t.maxTranslate() && !t.params.loop;
    let h = 0,
      m = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < l.length;
      e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== l[e + t]
        ? (f || (p >= l[e] && p < l[e + t])) && ((h = e), (m = l[e + t] - l[e]))
        : (f || p >= l[e]) &&
          ((h = e), (m = l[l.length - 1] - l[l.length - 2]));
    }
    let g = null,
      v = null;
    r.rewind &&
      (t.isBeginning
        ? (v =
            r.virtual && r.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (g = 0));
    const b = (p - l[h]) / m,
      y = h < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (u > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (b >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? g : h + y)
          : t.slideTo(h)),
        "prev" === t.swipeDirection &&
          (b > 1 - r.longSwipesRatio
            ? t.slideTo(h + y)
            : null !== v && b < 0 && Math.abs(b) > r.longSwipesRatio
              ? t.slideTo(v)
              : t.slideTo(h));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (n.target === t.navigation.nextEl || n.target === t.navigation.prevEl)
        ? n.target === t.navigation.nextEl
          ? t.slideTo(h + y)
          : t.slideTo(h)
        : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : h + y),
          "prev" === t.swipeDirection && t.slideTo(null !== v ? v : h));
    }
  }
  function ni() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e,
      a = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const o = a && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    o
      ? e.params.loop && !a
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = n),
      (e.allowSlideNext = i),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function ri(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function ai() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let n;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function oi(e) {
    const t = this;
    Ws(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  function li() {
    const e = this;
    e.documentTouchHandlerProceeded ||
      ((e.documentTouchHandlerProceeded = !0),
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  const ci = (e, t) => {
    const s = xs(),
      { params: i, el: n, wrapperEl: r, device: a } = e,
      o = !!i.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      c = t;
    s[l]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
      n[l]("touchstart", e.onTouchStart, { passive: !1 }),
      n[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[l]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
      s[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[l]("touchend", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[l]("touchcancel", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        n[l]("click", e.onClick, !0),
      i.cssMode && r[l]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[c](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            ni,
            !0,
          )
        : e[c]("observerUpdate", ni, !0),
      n[l]("load", e.onLoad, { capture: !0 });
  };
  const di = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var ui = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function pi(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        n = s[i];
      "object" == typeof n && null !== n
        ? (!0 === e[i] && (e[i] = { enabled: !0 }),
          "navigation" === i &&
            e[i] &&
            e[i].enabled &&
            !e[i].prevEl &&
            !e[i].nextEl &&
            (e[i].auto = !0),
          ["pagination", "scrollbar"].indexOf(i) >= 0 &&
            e[i] &&
            e[i].enabled &&
            !e[i].el &&
            (e[i].auto = !0),
          i in e && "enabled" in n
            ? ("object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              Ps(t, s))
            : Ps(t, s))
        : Ps(t, s);
    };
  }
  const fi = {
      eventsEmitter: Rs,
      update: Xs,
      translate: Zs,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            Ks({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              Ks({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: Qs,
      loop: Js,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            { params: t } = e;
          (e.onTouchStart = ti.bind(e)),
            (e.onTouchMove = si.bind(e)),
            (e.onTouchEnd = ii.bind(e)),
            (e.onDocumentTouchStart = li.bind(e)),
            t.cssMode && (e.onScroll = ai.bind(e)),
            (e.onClick = ri.bind(e)),
            (e.onLoad = oi.bind(e)),
            ci(e, "on");
        },
        detachEvents: function () {
          ci(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: n } = e,
            r = i.breakpoints;
          if (!r || (r && 0 === Object.keys(r).length)) return;
          const a = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
          if (!a || e.currentBreakpoint === a) return;
          const o = (a in r ? r[a] : void 0) || e.originalParams,
            l = di(e, i),
            c = di(e, o),
            d = i.enabled;
          l && !c
            ? (n.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !l &&
              c &&
              (n.classList.add(`${i.containerModifierClass}grid`),
              ((o.grid.fill && "column" === o.grid.fill) ||
                (!o.grid.fill && "column" === i.grid.fill)) &&
                n.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === o[t]) return;
              const s = i[t] && i[t].enabled,
                n = o[t] && o[t].enabled;
              s && !n && e[t].disable(), !s && n && e[t].enable();
            });
          const u = o.direction && o.direction !== i.direction,
            p = i.loop && (o.slidesPerView !== i.slidesPerView || u),
            f = i.loop;
          u && s && e.changeDirection(), Ps(e.params, o);
          const h = e.params.enabled,
            m = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            d && !h ? e.disable() : !d && h && e.enable(),
            (e.currentBreakpoint = a),
            e.emit("_beforeBreakpoint", o),
            s &&
              (p
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !f && m
                  ? (e.loopCreate(t), e.updateSlides())
                  : f && !m && e.loopDestroy()),
            e.emit("breakpoint", o);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const n = Ts(),
            r = "window" === t ? n.innerHeight : s.clientHeight,
            a = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: r * t, point: e };
              }
              return { value: e, point: e };
            });
          a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < a.length; e += 1) {
            const { point: r, value: o } = a[e];
            "window" === t
              ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = r)
              : o <= s.clientWidth && (i = r);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: n, device: r } = e,
            a = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...a), n.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    hi = {};
  class mi {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
        i[n] = arguments[n];
      1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
        t || (t = {}),
        (t = Ps({}, t)),
        e && !t.el && (t.el = e);
      const r = xs();
      if (
        t.el &&
        "string" == typeof t.el &&
        r.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          r.querySelectorAll(t.el).forEach((s) => {
            const i = Ps({}, t, { el: s });
            e.push(new mi(i));
          }),
          e
        );
      }
      const a = this;
      (a.__swiper__ = !0),
        (a.support = Hs()),
        (a.device = Fs({ userAgent: t.userAgent })),
        (a.browser = Gs()),
        (a.eventsListeners = {}),
        (a.eventsAnyListeners = []),
        (a.modules = [...a.__modules__]),
        t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
      const o = {};
      a.modules.forEach((e) => {
        e({
          params: t,
          swiper: a,
          extendParams: pi(t, o),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      const l = Ps({}, ui, o);
      return (
        (a.params = Ps({}, l, hi, t)),
        (a.originalParams = Ps({}, a.params)),
        (a.passedParams = Ps({}, t)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((e) => {
            a.on(e, a.params.on[e]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === a.params.direction,
          isVertical: () => "vertical" === a.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = Vs(_s(t, `.${s.slideClass}, swiper-slide`)[0]);
      return Vs(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = _s(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        n = (s.maxTranslate() - i) * e + i;
      s.translateTo(n, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: n,
        slidesSizesGrid: r,
        size: a,
        activeIndex: o,
      } = this;
      let l = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = i[o] ? i[o].swiperSlideSize : 0;
        for (let s = o + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
        for (let s = o - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
      } else if ("current" === e)
        for (let e = o + 1; e < i.length; e += 1) {
          (t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
        }
      else
        for (let e = o - 1; e >= 0; e -= 1) {
          n[o] - n[e] < a && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let n;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && Ws(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          n = e.slideTo(t.length - 1, 0, !1, !0);
        } else n = e.slideTo(e.activeIndex, 0, !1, !0);
        n || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          "SWIPER-CONTAINER" === s.parentNode.host.nodeName &&
          (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let n = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return _s(s, i())[0];
      })();
      return (
        !n &&
          t.params.createElements &&
          ((n = Ds("div", t.params.wrapperClass)),
          s.append(n),
          _s(s, `.${t.params.slideClass}`).forEach((e) => {
            n.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: n,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : n,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === $s(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === $s(s, "direction")),
          wrongRTL: "-webkit-box" === $s(n, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? Ws(t, e)
            : e.addEventListener("load", (e) => {
                Ws(t, e.target);
              });
        }),
        Ys(t),
        (t.initialized = !0),
        Ys(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, el: n, wrapperEl: r, slides: a } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            n.removeAttribute("style"),
            r.removeAttribute("style"),
            a &&
              a.length &&
              a.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideFullyVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      Ps(hi, e);
    }
    static get extendedDefaults() {
      return hi;
    }
    static get defaults() {
      return ui;
    }
    static installModule(e) {
      mi.prototype.__modules__ || (mi.prototype.__modules__ = []);
      const t = mi.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => mi.installModule(e)), mi)
        : (mi.installModule(e), mi);
    }
  }
  function gi(e, t, s, i) {
    return (
      e.params.createElements &&
        Object.keys(i).forEach((n) => {
          if (!s[n] && !0 === s.auto) {
            let r = _s(e.el, `.${i[n]}`)[0];
            r || ((r = Ds("div", i[n])), (r.className = i[n]), e.el.append(r)),
              (s[n] = r),
              (t[n] = r);
          }
        }),
      s
    );
  }
  function vi(e) {
    let { swiper: t, extendParams: s, on: i, emit: n } = e;
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (t.navigation = { nextEl: null, prevEl: null });
    const r = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function a(e) {
      let s;
      return e &&
        "string" == typeof e &&
        t.isElement &&
        ((s = t.el.querySelector(e)), s)
        ? s
        : (e &&
            ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length &&
              (s = t.el.querySelector(e))),
          e && !s ? e : s);
    }
    function o(e, s) {
      const i = t.params.navigation;
      (e = r(e)).forEach((e) => {
        e &&
          (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
          "BUTTON" === e.tagName && (e.disabled = s),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
      });
    }
    function l() {
      const { nextEl: e, prevEl: s } = t.navigation;
      if (t.params.loop) return o(s, !1), void o(e, !1);
      o(s, t.isBeginning && !t.params.rewind),
        o(e, t.isEnd && !t.params.rewind);
    }
    function c(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) &&
          (t.slidePrev(), n("navigationPrev"));
    }
    function d(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) &&
          (t.slideNext(), n("navigationNext"));
    }
    function u() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = gi(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      let s = a(e.nextEl),
        i = a(e.prevEl);
      Object.assign(t.navigation, { nextEl: s, prevEl: i }),
        (s = r(s)),
        (i = r(i));
      const n = (s, i) => {
        s && s.addEventListener("click", "next" === i ? d : c),
          !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
      };
      s.forEach((e) => n(e, "next")), i.forEach((e) => n(e, "prev"));
    }
    function p() {
      let { nextEl: e, prevEl: s } = t.navigation;
      (e = r(e)), (s = r(s));
      const i = (e, s) => {
        e.removeEventListener("click", "next" === s ? d : c),
          e.classList.remove(...t.params.navigation.disabledClass.split(" "));
      };
      e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
    }
    i("init", () => {
      !1 === t.params.navigation.enabled ? f() : (u(), l());
    }),
      i("toEdge fromEdge lock unlock", () => {
        l();
      }),
      i("destroy", () => {
        p();
      }),
      i("enable disable", () => {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = r(e)),
          (s = r(s)),
          t.enabled
            ? l()
            : [...e, ...s]
                .filter((e) => !!e)
                .forEach((e) => e.classList.add(t.params.navigation.lockClass));
      }),
      i("click", (e, s) => {
        let { nextEl: i, prevEl: a } = t.navigation;
        (i = r(i)), (a = r(a));
        const o = s.target;
        if (
          t.params.navigation.hideOnClick &&
          !a.includes(o) &&
          !i.includes(o)
        ) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === o || t.pagination.el.contains(o))
          )
            return;
          let e;
          i.length
            ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
            : a.length &&
              (e = a[0].classList.contains(t.params.navigation.hiddenClass)),
            n(!0 === e ? "navigationShow" : "navigationHide"),
            [...i, ...a]
              .filter((e) => !!e)
              .forEach((e) =>
                e.classList.toggle(t.params.navigation.hiddenClass),
              );
        }
      });
    const f = () => {
      t.el.classList.add(
        ...t.params.navigation.navigationDisabledClass.split(" "),
      ),
        p();
    };
    Object.assign(t.navigation, {
      enable: () => {
        t.el.classList.remove(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          u(),
          l();
      },
      disable: f,
      update: l,
      init: u,
      destroy: p,
    });
  }
  function bi(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function yi(e) {
    let { swiper: t, extendParams: s, on: i, emit: n } = e;
    const r = "swiper-pagination";
    let a;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${r}-bullet`,
        bulletActiveClass: `${r}-bullet-active`,
        modifierClass: `${r}-`,
        currentClass: `${r}-current`,
        totalClass: `${r}-total`,
        hiddenClass: `${r}-hidden`,
        progressbarFillClass: `${r}-progressbar-fill`,
        progressbarOppositeClass: `${r}-progressbar-opposite`,
        clickableClass: `${r}-clickable`,
        lockClass: `${r}-lock`,
        horizontalClass: `${r}-horizontal`,
        verticalClass: `${r}-vertical`,
        paginationDisabledClass: `${r}-disabled`,
      },
    }),
      (t.pagination = { el: null, bullets: [] });
    let o = 0;
    const l = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function c() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
      );
    }
    function d(e, s) {
      const { bulletActiveClass: i } = t.params.pagination;
      e &&
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
        (e.classList.add(`${i}-${s}`),
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          e.classList.add(`${i}-${s}-${s}`));
    }
    function u(e) {
      const s = e.target.closest(bi(t.params.pagination.bulletClass));
      if (!s) return;
      e.preventDefault();
      const i = Vs(s) * t.params.slidesPerGroup;
      if (t.params.loop) {
        if (t.realIndex === i) return;
        t.slideToLoop(i);
      } else t.slideTo(i);
    }
    function p() {
      const e = t.rtl,
        s = t.params.pagination;
      if (c()) return;
      let i,
        r,
        u = t.pagination.el;
      u = l(u);
      const p =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        f = t.params.loop
          ? Math.ceil(p / t.params.slidesPerGroup)
          : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((r = t.previousRealIndex || 0),
            (i =
              t.params.slidesPerGroup > 1
                ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                : t.realIndex))
          : void 0 !== t.snapIndex
            ? ((i = t.snapIndex), (r = t.previousSnapIndex))
            : ((r = t.previousIndex || 0), (i = t.activeIndex || 0)),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const n = t.pagination.bullets;
        let l, c, p;
        if (
          (s.dynamicBullets &&
            ((a = qs(n[0], t.isHorizontal() ? "width" : "height", !0)),
            u.forEach((e) => {
              e.style[t.isHorizontal() ? "width" : "height"] =
                a * (s.dynamicMainBullets + 4) + "px";
            }),
            s.dynamicMainBullets > 1 &&
              void 0 !== r &&
              ((o += i - (r || 0)),
              o > s.dynamicMainBullets - 1
                ? (o = s.dynamicMainBullets - 1)
                : o < 0 && (o = 0)),
            (l = Math.max(i - o, 0)),
            (c = l + (Math.min(n.length, s.dynamicMainBullets) - 1)),
            (p = (c + l) / 2)),
          n.forEach((e) => {
            const t = [
              ...[
                "",
                "-next",
                "-next-next",
                "-prev",
                "-prev-prev",
                "-main",
              ].map((e) => `${s.bulletActiveClass}${e}`),
            ]
              .map((e) =>
                "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
              )
              .flat();
            e.classList.remove(...t);
          }),
          u.length > 1)
        )
          n.forEach((e) => {
            const n = Vs(e);
            n === i
              ? e.classList.add(...s.bulletActiveClass.split(" "))
              : t.isElement && e.setAttribute("part", "bullet"),
              s.dynamicBullets &&
                (n >= l &&
                  n <= c &&
                  e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                n === l && d(e, "prev"),
                n === c && d(e, "next"));
          });
        else {
          const e = n[i];
          if (
            (e && e.classList.add(...s.bulletActiveClass.split(" ")),
            t.isElement &&
              n.forEach((e, t) => {
                e.setAttribute("part", t === i ? "bullet-active" : "bullet");
              }),
            s.dynamicBullets)
          ) {
            const e = n[l],
              t = n[c];
            for (let e = l; e <= c; e += 1)
              n[e] &&
                n[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
            d(e, "prev"), d(t, "next");
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(n.length, s.dynamicMainBullets + 4),
            r = (a * i - a) / 2 - p * a,
            o = e ? "right" : "left";
          n.forEach((e) => {
            e.style[t.isHorizontal() ? o : "top"] = `${r}px`;
          });
        }
      }
      u.forEach((e, r) => {
        if (
          ("fraction" === s.type &&
            (e.querySelectorAll(bi(s.currentClass)).forEach((e) => {
              e.textContent = s.formatFractionCurrent(i + 1);
            }),
            e.querySelectorAll(bi(s.totalClass)).forEach((e) => {
              e.textContent = s.formatFractionTotal(f);
            })),
          "progressbar" === s.type)
        ) {
          let n;
          n = s.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
              ? "horizontal"
              : "vertical";
          const r = (i + 1) / f;
          let a = 1,
            o = 1;
          "horizontal" === n ? (a = r) : (o = r),
            e.querySelectorAll(bi(s.progressbarFillClass)).forEach((e) => {
              (e.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${o})`),
                (e.style.transitionDuration = `${t.params.speed}ms`);
            });
        }
        "custom" === s.type && s.renderCustom
          ? ((e.innerHTML = s.renderCustom(t, i + 1, f)),
            0 === r && n("paginationRender", e))
          : (0 === r && n("paginationRender", e), n("paginationUpdate", e)),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
      });
    }
    function f() {
      const e = t.params.pagination;
      if (c()) return;
      const s =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.grid && t.params.grid.rows > 1
            ? t.slides.length / Math.ceil(t.params.grid.rows)
            : t.slides.length;
      let i = t.pagination.el;
      i = l(i);
      let r = "";
      if ("bullets" === e.type) {
        let i = t.params.loop
          ? Math.ceil(s / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
        for (let s = 0; s < i; s += 1)
          e.renderBullet
            ? (r += e.renderBullet.call(t, s, e.bulletClass))
            : (r += `<${e.bulletElement} ${
                t.isElement ? 'part="bullet"' : ""
              } class="${e.bulletClass}"></${e.bulletElement}>`);
      }
      "fraction" === e.type &&
        (r = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        "progressbar" === e.type &&
          (r = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
        (t.pagination.bullets = []),
        i.forEach((s) => {
          "custom" !== e.type && (s.innerHTML = r || ""),
            "bullets" === e.type &&
              t.pagination.bullets.push(
                ...s.querySelectorAll(bi(e.bulletClass)),
              );
        }),
        "custom" !== e.type && n("paginationRender", i[0]);
    }
    function h() {
      t.params.pagination = gi(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" },
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let s;
      "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
        s ||
          "string" != typeof e.el ||
          (s = [...document.querySelectorAll(e.el)]),
        s || (s = e.el),
        s &&
          0 !== s.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            Array.isArray(s) &&
            s.length > 1 &&
            ((s = [...t.el.querySelectorAll(e.el)]),
            s.length > 1 &&
              (s = s.filter((e) => Ns(e, ".swiper")[0] === t.el)[0])),
          Array.isArray(s) && 1 === s.length && (s = s[0]),
          Object.assign(t.pagination, { el: s }),
          (s = l(s)),
          s.forEach((s) => {
            "bullets" === e.type &&
              e.clickable &&
              s.classList.add(...(e.clickableClass || "").split(" ")),
              s.classList.add(e.modifierClass + e.type),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              "bullets" === e.type &&
                e.dynamicBullets &&
                (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                (o = 0),
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
              "progressbar" === e.type &&
                e.progressbarOpposite &&
                s.classList.add(e.progressbarOppositeClass),
              e.clickable && s.addEventListener("click", u),
              t.enabled || s.classList.add(e.lockClass);
          }));
    }
    function m() {
      const e = t.params.pagination;
      if (c()) return;
      let s = t.pagination.el;
      s &&
        ((s = l(s)),
        s.forEach((s) => {
          s.classList.remove(e.hiddenClass),
            s.classList.remove(e.modifierClass + e.type),
            s.classList.remove(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            ),
            e.clickable &&
              (s.classList.remove(...(e.clickableClass || "").split(" ")),
              s.removeEventListener("click", u));
        })),
        t.pagination.bullets &&
          t.pagination.bullets.forEach((t) =>
            t.classList.remove(...e.bulletActiveClass.split(" ")),
          );
    }
    i("changeDirection", () => {
      if (!t.pagination || !t.pagination.el) return;
      const e = t.params.pagination;
      let { el: s } = t.pagination;
      (s = l(s)),
        s.forEach((s) => {
          s.classList.remove(e.horizontalClass, e.verticalClass),
            s.classList.add(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            );
        });
    }),
      i("init", () => {
        !1 === t.params.pagination.enabled ? g() : (h(), f(), p());
      }),
      i("activeIndexChange", () => {
        void 0 === t.snapIndex && p();
      }),
      i("snapIndexChange", () => {
        p();
      }),
      i("snapGridLengthChange", () => {
        f(), p();
      }),
      i("destroy", () => {
        m();
      }),
      i("enable disable", () => {
        let { el: e } = t.pagination;
        e &&
          ((e = l(e)),
          e.forEach((e) =>
            e.classList[t.enabled ? "remove" : "add"](
              t.params.pagination.lockClass,
            ),
          ));
      }),
      i("lock unlock", () => {
        p();
      }),
      i("click", (e, s) => {
        const i = s.target,
          r = l(t.pagination.el);
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          r &&
          r.length > 0 &&
          !i.classList.contains(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = r[0].classList.contains(t.params.pagination.hiddenClass);
          n(!0 === e ? "paginationShow" : "paginationHide"),
            r.forEach((e) =>
              e.classList.toggle(t.params.pagination.hiddenClass),
            );
        }
      });
    const g = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: e } = t.pagination;
      e &&
        ((e = l(e)),
        e.forEach((e) =>
          e.classList.add(t.params.pagination.paginationDisabledClass),
        )),
        m();
    };
    Object.assign(t.pagination, {
      enable: () => {
        t.el.classList.remove(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = l(e)),
          e.forEach((e) =>
            e.classList.remove(t.params.pagination.paginationDisabledClass),
          )),
          h(),
          f(),
          p();
      },
      disable: g,
      render: f,
      update: p,
      init: h,
      destroy: m,
    });
  }
  function wi(e) {
    let { swiper: t, extendParams: s, on: i } = e;
    s({ parallax: { enabled: !1 } });
    const n =
        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
      r = (e, s) => {
        const { rtl: i } = t,
          n = i ? -1 : 1,
          r = e.getAttribute("data-swiper-parallax") || "0";
        let a = e.getAttribute("data-swiper-parallax-x"),
          o = e.getAttribute("data-swiper-parallax-y");
        const l = e.getAttribute("data-swiper-parallax-scale"),
          c = e.getAttribute("data-swiper-parallax-opacity"),
          d = e.getAttribute("data-swiper-parallax-rotate");
        if (
          (a || o
            ? ((a = a || "0"), (o = o || "0"))
            : t.isHorizontal()
              ? ((a = r), (o = "0"))
              : ((o = r), (a = "0")),
          (a =
            a.indexOf("%") >= 0
              ? parseInt(a, 10) * s * n + "%"
              : a * s * n + "px"),
          (o = o.indexOf("%") >= 0 ? parseInt(o, 10) * s + "%" : o * s + "px"),
          null != c)
        ) {
          const t = c - (c - 1) * (1 - Math.abs(s));
          e.style.opacity = t;
        }
        let u = `translate3d(${a}, ${o}, 0px)`;
        if (null != l) {
          u += ` scale(${l - (l - 1) * (1 - Math.abs(s))})`;
        }
        if (d && null != d) {
          u += ` rotate(${d * s * -1}deg)`;
        }
        e.style.transform = u;
      },
      a = () => {
        const { el: e, slides: s, progress: i, snapGrid: a, isElement: o } = t,
          l = _s(e, n);
        t.isElement && l.push(..._s(t.hostEl, n)),
          l.forEach((e) => {
            r(e, i);
          }),
          s.forEach((e, s) => {
            let o = e.progress;
            t.params.slidesPerGroup > 1 &&
              "auto" !== t.params.slidesPerView &&
              (o += Math.ceil(s / 2) - i * (a.length - 1)),
              (o = Math.min(Math.max(o, -1), 1)),
              e
                .querySelectorAll(`${n}, [data-swiper-parallax-rotate]`)
                .forEach((e) => {
                  r(e, o);
                });
          });
      };
    i("beforeInit", () => {
      t.params.parallax.enabled &&
        ((t.params.watchSlidesProgress = !0),
        (t.originalParams.watchSlidesProgress = !0));
    }),
      i("init", () => {
        t.params.parallax.enabled && a();
      }),
      i("setTranslate", () => {
        t.params.parallax.enabled && a();
      }),
      i("setTransition", (e, s) => {
        t.params.parallax.enabled &&
          (function (e) {
            void 0 === e && (e = t.params.speed);
            const { el: s, hostEl: i } = t,
              r = [...s.querySelectorAll(n)];
            t.isElement && r.push(...i.querySelectorAll(n)),
              r.forEach((t) => {
                let s =
                  parseInt(
                    t.getAttribute("data-swiper-parallax-duration"),
                    10,
                  ) || e;
                0 === e && (s = 0), (t.style.transitionDuration = `${s}ms`);
              });
          })(s);
      });
  }
  function Si(e) {
    let t,
      s,
      { swiper: i, extendParams: n, on: r, emit: a, params: o } = e;
    (i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      n({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !1,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      });
    let l,
      c,
      d,
      u,
      p,
      f,
      h,
      m,
      g = o && o.autoplay ? o.autoplay.delay : 3e3,
      v = o && o.autoplay ? o.autoplay.delay : 3e3,
      b = new Date().getTime();
    function y(e) {
      i &&
        !i.destroyed &&
        i.wrapperEl &&
        e.target === i.wrapperEl &&
        (i.wrapperEl.removeEventListener("transitionend", y), m || C());
    }
    const w = () => {
        if (i.destroyed || !i.autoplay.running) return;
        i.autoplay.paused ? (c = !0) : c && ((v = l), (c = !1));
        const e = i.autoplay.paused ? l : b + v - new Date().getTime();
        (i.autoplay.timeLeft = e),
          a("autoplayTimeLeft", e, e / g),
          (s = requestAnimationFrame(() => {
            w();
          }));
      },
      S = (e) => {
        if (i.destroyed || !i.autoplay.running) return;
        cancelAnimationFrame(s), w();
        let n = void 0 === e ? i.params.autoplay.delay : e;
        (g = i.params.autoplay.delay), (v = i.params.autoplay.delay);
        const r = (() => {
          let e;
          if (
            ((e =
              i.virtual && i.params.virtual.enabled
                ? i.slides.filter((e) =>
                    e.classList.contains("swiper-slide-active"),
                  )[0]
                : i.slides[i.activeIndex]),
            !e)
          )
            return;
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(r) &&
          r > 0 &&
          void 0 === e &&
          ((n = r), (g = r), (v = r)),
          (l = n);
        const o = i.params.speed,
          c = () => {
            i &&
              !i.destroyed &&
              (i.params.autoplay.reverseDirection
                ? !i.isBeginning || i.params.loop || i.params.rewind
                  ? (i.slidePrev(o, !0, !0), a("autoplay"))
                  : i.params.autoplay.stopOnLastSlide ||
                    (i.slideTo(i.slides.length - 1, o, !0, !0), a("autoplay"))
                : !i.isEnd || i.params.loop || i.params.rewind
                  ? (i.slideNext(o, !0, !0), a("autoplay"))
                  : i.params.autoplay.stopOnLastSlide ||
                    (i.slideTo(0, o, !0, !0), a("autoplay")),
              i.params.cssMode &&
                ((b = new Date().getTime()),
                requestAnimationFrame(() => {
                  S();
                })));
          };
        return (
          n > 0
            ? (clearTimeout(t),
              (t = setTimeout(() => {
                c();
              }, n)))
            : requestAnimationFrame(() => {
                c();
              }),
          n
        );
      },
      x = () => {
        (b = new Date().getTime()),
          (i.autoplay.running = !0),
          S(),
          a("autoplayStart");
      },
      E = () => {
        (i.autoplay.running = !1),
          clearTimeout(t),
          cancelAnimationFrame(s),
          a("autoplayStop");
      },
      T = (e, s) => {
        if (i.destroyed || !i.autoplay.running) return;
        clearTimeout(t), e || (h = !0);
        const n = () => {
          a("autoplayPause"),
            i.params.autoplay.waitForTransition
              ? i.wrapperEl.addEventListener("transitionend", y)
              : C();
        };
        if (((i.autoplay.paused = !0), s))
          return f && (l = i.params.autoplay.delay), (f = !1), void n();
        const r = l || i.params.autoplay.delay;
        (l = r - (new Date().getTime() - b)),
          (i.isEnd && l < 0 && !i.params.loop) || (l < 0 && (l = 0), n());
      },
      C = () => {
        (i.isEnd && l < 0 && !i.params.loop) ||
          i.destroyed ||
          !i.autoplay.running ||
          ((b = new Date().getTime()),
          h ? ((h = !1), S(l)) : S(),
          (i.autoplay.paused = !1),
          a("autoplayResume"));
      },
      A = () => {
        if (i.destroyed || !i.autoplay.running) return;
        const e = xs();
        "hidden" === e.visibilityState && ((h = !0), T(!0)),
          "visible" === e.visibilityState && C();
      },
      L = (e) => {
        "mouse" === e.pointerType &&
          ((h = !0), (m = !0), i.animating || i.autoplay.paused || T(!0));
      },
      O = (e) => {
        "mouse" === e.pointerType && ((m = !1), i.autoplay.paused && C());
      };
    r("init", () => {
      i.params.autoplay.enabled &&
        (i.params.autoplay.pauseOnMouseEnter &&
          (i.el.addEventListener("pointerenter", L),
          i.el.addEventListener("pointerleave", O)),
        xs().addEventListener("visibilitychange", A),
        x());
    }),
      r("destroy", () => {
        i.el.removeEventListener("pointerenter", L),
          i.el.removeEventListener("pointerleave", O),
          xs().removeEventListener("visibilitychange", A),
          i.autoplay.running && E();
      }),
      r("_freeModeStaticRelease", () => {
        (u || h) && C();
      }),
      r("_freeModeNoMomentumRelease", () => {
        i.params.autoplay.disableOnInteraction ? E() : T(!0, !0);
      }),
      r("beforeTransitionStart", (e, t, s) => {
        !i.destroyed &&
          i.autoplay.running &&
          (s || !i.params.autoplay.disableOnInteraction ? T(!0, !0) : E());
      }),
      r("sliderFirstMove", () => {
        !i.destroyed &&
          i.autoplay.running &&
          (i.params.autoplay.disableOnInteraction
            ? E()
            : ((d = !0),
              (u = !1),
              (h = !1),
              (p = setTimeout(() => {
                (h = !0), (u = !0), T(!0);
              }, 200))));
      }),
      r("touchEnd", () => {
        if (!i.destroyed && i.autoplay.running && d) {
          if (
            (clearTimeout(p),
            clearTimeout(t),
            i.params.autoplay.disableOnInteraction)
          )
            return (u = !1), void (d = !1);
          u && i.params.cssMode && C(), (u = !1), (d = !1);
        }
      }),
      r("slideChange", () => {
        !i.destroyed && i.autoplay.running && (f = !0);
      }),
      Object.assign(i.autoplay, { start: x, stop: E, pause: T, resume: C });
  }
  function xi(e) {
    let { swiper: t, extendParams: s, on: i } = e;
    s({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs",
      },
    });
    let n = !1,
      r = !1;
    function a() {
      const e = t.thumbs.swiper;
      if (!e || e.destroyed) return;
      const s = e.clickedIndex,
        i = e.clickedSlide;
      if (i && i.classList.contains(t.params.thumbs.slideThumbActiveClass))
        return;
      if (null == s) return;
      let n;
      (n = e.params.loop
        ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)
        : s),
        t.params.loop ? t.slideToLoop(n) : t.slideTo(n);
    }
    function o() {
      const { thumbs: e } = t.params;
      if (n) return !1;
      n = !0;
      const s = t.constructor;
      if (e.swiper instanceof s)
        (t.thumbs.swiper = e.swiper),
          Object.assign(t.thumbs.swiper.originalParams, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
          Object.assign(t.thumbs.swiper.params, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
          t.thumbs.swiper.update();
      else if (Os(e.swiper)) {
        const i = Object.assign({}, e.swiper);
        Object.assign(i, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
          (t.thumbs.swiper = new s(i)),
          (r = !0);
      }
      return (
        t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass),
        t.thumbs.swiper.on("tap", a),
        !0
      );
    }
    function l(e) {
      const s = t.thumbs.swiper;
      if (!s || s.destroyed) return;
      const i =
        "auto" === s.params.slidesPerView
          ? s.slidesPerViewDynamic()
          : s.params.slidesPerView;
      let n = 1;
      const r = t.params.thumbs.slideThumbActiveClass;
      if (
        (t.params.slidesPerView > 1 &&
          !t.params.centeredSlides &&
          (n = t.params.slidesPerView),
        t.params.thumbs.multipleActiveThumbs || (n = 1),
        (n = Math.floor(n)),
        s.slides.forEach((e) => e.classList.remove(r)),
        s.params.loop || (s.params.virtual && s.params.virtual.enabled))
      )
        for (let e = 0; e < n; e += 1)
          _s(
            s.slidesEl,
            `[data-swiper-slide-index="${t.realIndex + e}"]`,
          ).forEach((e) => {
            e.classList.add(r);
          });
      else
        for (let e = 0; e < n; e += 1)
          s.slides[t.realIndex + e] &&
            s.slides[t.realIndex + e].classList.add(r);
      const a = t.params.thumbs.autoScrollOffset,
        o = a && !s.params.loop;
      if (t.realIndex !== s.realIndex || o) {
        const n = s.activeIndex;
        let r, l;
        if (s.params.loop) {
          const e = s.slides.filter(
            (e) =>
              e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`,
          )[0];
          (r = s.slides.indexOf(e)),
            (l = t.activeIndex > t.previousIndex ? "next" : "prev");
        } else (r = t.realIndex), (l = r > t.previousIndex ? "next" : "prev");
        o && (r += "next" === l ? a : -1 * a),
          s.visibleSlidesIndexes &&
            s.visibleSlidesIndexes.indexOf(r) < 0 &&
            (s.params.centeredSlides
              ? (r =
                  r > n ? r - Math.floor(i / 2) + 1 : r + Math.floor(i / 2) - 1)
              : r > n && s.params.slidesPerGroup,
            s.slideTo(r, e ? 0 : void 0));
      }
    }
    (t.thumbs = { swiper: null }),
      i("beforeInit", () => {
        const { thumbs: e } = t.params;
        if (e && e.swiper)
          if ("string" == typeof e.swiper || e.swiper instanceof HTMLElement) {
            const s = xs(),
              i = () => {
                const i =
                  "string" == typeof e.swiper
                    ? s.querySelector(e.swiper)
                    : e.swiper;
                if (i && i.swiper) (e.swiper = i.swiper), o(), l(!0);
                else if (i) {
                  const s = (n) => {
                    (e.swiper = n.detail[0]),
                      i.removeEventListener("init", s),
                      o(),
                      l(!0),
                      e.swiper.update(),
                      t.update();
                  };
                  i.addEventListener("init", s);
                }
                return i;
              },
              n = () => {
                if (t.destroyed) return;
                i() || requestAnimationFrame(n);
              };
            requestAnimationFrame(n);
          } else o(), l(!0);
      }),
      i("slideChange update resize observerUpdate", () => {
        l();
      }),
      i("setTransition", (e, s) => {
        const i = t.thumbs.swiper;
        i && !i.destroyed && i.setTransition(s);
      }),
      i("beforeDestroy", () => {
        const e = t.thumbs.swiper;
        e && !e.destroyed && r && e.destroy();
      }),
      Object.assign(t.thumbs, { init: o, update: l });
  }
  function Ei() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)',
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  Object.keys(fi).forEach((e) => {
    Object.keys(fi[e]).forEach((t) => {
      mi.prototype[t] = fi[e][t];
    });
  }),
    mi.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const n = Ts();
        let r = null,
          a = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          l = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== n.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((r = new ResizeObserver((e) => {
                a = n.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let n = s,
                    r = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: a } = e;
                    (a && a !== t.el) ||
                      ((n = i ? i.width : (s[0] || s).inlineSize),
                      (r = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (n === s && r === i) || o();
                });
              })),
              r.observe(t.el))
            : (n.addEventListener("resize", o),
              n.addEventListener("orientationchange", l));
        }),
          s("destroy", () => {
            a && n.cancelAnimationFrame(a),
              r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
              n.removeEventListener("resize", o),
              n.removeEventListener("orientationchange", l);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const r = [],
          a = Ts(),
          o = function (e, s) {
            void 0 === s && (s = {});
            const i = new (a.MutationObserver || a.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void n("observerUpdate", e[0]);
                const s = function () {
                  n("observerUpdate", e[0]);
                };
                a.requestAnimationFrame
                  ? a.requestAnimationFrame(s)
                  : a.setTimeout(s, 0);
              },
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              r.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = Ns(t.hostEl);
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.hostEl, { childList: t.params.observeSlideChildren }),
                o(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      !(function () {
        if (
          (Ei(),
          document.querySelector(".main-block__slider") &&
            new mi(".main-block__slider", {
              modules: [vi, yi, wi, Si],
              autoplay: { delay: 3e3, disableOnInteraction: !1 },
              observer: !0,
              observeParents: !0,
              slidesPerView: 1,
              spaceBetween: 50,
              parallax: !0,
              speed: 800,
              loop: !0,
              pagination: { el: ".controll-main-block__dotts", clickable: !0 },
              on: {
                init: function (e) {
                  const t = document.querySelector(".fraction-controll__all"),
                    s = document.querySelectorAll(
                      ".slide-main-block:not(.swiper-slide-duplicate) ",
                    );
                  t.innerHTML = s.length < 10 ? `0${s.length}` : s.length;
                },
                slideChange: function (e) {
                  document.querySelector(
                    ".fraction-controll__current",
                  ).innerHTML =
                    e.realIndex + 1 < 10
                      ? `0${e.realIndex + 1}`
                      : e.realIndex + 1;
                },
              },
            }),
          document.querySelector(".products-slider") &&
            new mi(".products-slider__slider", {
              modules: [vi, yi, Si],
              autoplay: { delay: 3e3, disableOnInteraction: !1 },
              observer: !0,
              watchOverflow: !0,
              observeParents: !0,
              slidesPerView: 4,
              spaceBetween: 30,
              parallax: !0,
              speed: 800,
              pagination: {
                el: ".products-slider__dotts",
                clickable: !0,
                dynamicBullets: !0,
              },
              breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 20 },
                1370: { slidesPerView: 4, spaceBetween: 30 },
              },
              on: { init: function (e) {} },
            }),
          document.querySelector(".products-new") &&
            new mi(".products-new__slider", {
              modules: [vi, yi, Si],
              autoplay: { delay: 3e3, disableOnInteraction: !1 },
              observer: !0,
              watchOverflow: !0,
              observeParents: !0,
              slidesPerView: 3,
              spaceBetween: 30,
              parallax: !0,
              speed: 800,
              pagination: {
                el: ".products-new__dotts",
                clickable: !0,
                dynamicBullets: !0,
              },
              breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 5 },
                580: { slidesPerView: 2, spaceBetween: 10 },
                992: { slidesPerView: 2, spaceBetween: 20 },
                1370: { slidesPerView: 3, spaceBetween: 30 },
              },
              on: { init: function (e) {} },
            }),
          document.querySelector(".thumbs-images"))
        ) {
          const e = new mi(".thumbs-images", {
            modules: [vi, yi, Si, xi],
            observer: !0,
            watchOverflow: !0,
            observeParents: !0,
            slidesPerView: 4,
            spaceBetween: 30,
            parallax: !0,
            speed: 800,
            pagination: {
              el: ".products-new__dotts",
              clickable: !0,
              dynamicBullets: !0,
            },
            breakpoints: {
              992: { slidesPerView: 3 },
              1370: { slidesPerView: 4, spaceBetween: 16 },
            },
            on: { init: function (e) {} },
          });
          new mi(".images-product__slider", {
            modules: [vi, yi, Si, xi],
            autoplay: { delay: 3e3, disableOnInteraction: !1 },
            thumbs: { swiper: e },
            observer: !0,
            watchOverflow: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            on: { init: function (e) {} },
          });
        }
      })();
    });
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]"),
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`,
        ),
          c(
            Array.from(e).map(function (e) {
              return `${e.dataset.watchRoot ? e.dataset.watchRoot : null}|${
                e.dataset.watchMargin ? e.dataset.watchMargin : "0px"
              }|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            }),
          ).forEach((t) => {
            let s = t.split("|"),
              i = { root: s[0], margin: s[1], threshold: s[2] },
              n = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  n = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === i.root &&
                  String(s) === i.margin &&
                  String(n) === i.threshold
                )
                  return e;
              }),
              r = this.getScrollWatcherConfig(i);
            this.scrollWatcherInit(n, r);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`,
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %",
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`,
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`,
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && l(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const s = e.target;
      this.scrollWatcherIntersecting(e, s),
        s.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(s, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } }),
        );
    }
  })({});
  let Ti = !1;
  function Ci(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (Ti) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (Ci.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(","),
          i = {};
        (i.element = t),
          (i.parent = t.parentNode),
          (i.destination = document.querySelector(s[0].trim())),
          (i.breakpoint = s[1] ? s[1].trim() : "767"),
          (i.place = s[2] ? s[2].trim() : "last"),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.оbjects.push(i);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this,
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, s) {
            return Array.prototype.indexOf.call(s, e) === t;
          },
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          i = String.prototype.split.call(s, ","),
          n = window.matchMedia(i[0]),
          r = i[1],
          a = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        n.addListener(function () {
          e.mediaHandler(n, a);
        }),
          this.mediaHandler(n, a);
      }
    }),
    (Ci.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (Ci.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
            ? s.children[e].insertAdjacentElement("beforebegin", t)
            : s.insertAdjacentElement("afterbegin", t);
    }),
    (Ci.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (Ci.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (Ci.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                    ? 1
                    : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                    ? -1
                    : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new Ci("max").init(),
    document.addEventListener("click", function (e) {
      const t = e.target;
      if (t.closest("[data-parent]")) {
        const s = t.dataset.parent ? t.dataset.parent : null,
          i = document.querySelector(`[data-submenu="${s}"]`);
        if (i) {
          const e = document.querySelector("._sub-menu-active"),
            s = document.querySelector("._sub-menu-open");
          e &&
            e !== t &&
            (e.classList.remove("_sub-menu-active"),
            s.classList.remove("_sub-menu-open"),
            document.documentElement.classList.remove("sub-menu-open")),
            document.documentElement.classList.toggle("sub-menu-open"),
            t.classList.toggle("_sub-menu-active"),
            i.classList.toggle("_sub-menu-open");
        } else console.log("Ой ой, нет такого подменю");
        e.preventDefault();
      }
      t.closest(".menu-top-header__link_catalog") &&
        (document.documentElement.classList.add("catalog-open"),
        e.preventDefault());
      t.closest(".menu-catalog__back") &&
        (document.documentElement.classList.remove("catalog-open"),
        document.querySelector("._sub-menu-active") &&
          document
            .querySelector("._sub-menu-active")
            .classList.remove("_sub-menu-active"),
        document.querySelector("._sub-menu-open") &&
          document
            .querySelector("._sub-menu-open")
            .classList.remove("_sub-menu-open"),
        e.preventDefault());
      t.closest(".sub-menu-catalog__back") &&
        (document.documentElement.classList.remove("sub-menu-open"),
        document.querySelector("._sub-menu-active") &&
          document
            .querySelector("._sub-menu-active")
            .classList.remove("_sub-menu-active"),
        document.querySelector("._sub-menu-open") &&
          document
            .querySelector("._sub-menu-open")
            .classList.remove("_sub-menu-open"),
        e.preventDefault());
    });
  const Ai = document.querySelectorAll(".sub-menu-catalog__block");
  Ai.length &&
    Ai.forEach((e) => {
      const t = e.querySelectorAll(".sub-menu-catalog__category").length;
      e.classList.add(`sub-menu-catalog__block_${t}`);
    }),
    document.querySelector(".filter-catalog__title") &&
      document
        .querySelector(".filter-catalog__title")
        .addEventListener("click", () => {
          window.innerWidth < 992 &&
            document
              .querySelector(".filter-catalog__items")
              .classList.toggle("_active");
        }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          n &&
            (r(),
            document.documentElement.classList.toggle("menu-open"),
            document.documentElement.classList.contains("catalog-open") &&
              document.documentElement.classList.remove("catalog-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const s = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        s.length && r(s);
        let n = d(e, "spollers");
        function r(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  a(e),
                  e.addEventListener("click", o))
                : (e.classList.remove("_spoller-init"),
                  a(e, !1),
                  e.removeEventListener("click", o));
          });
        }
        function a(e, t = !0) {
          let s = e.querySelectorAll("[data-spoller]");
          s.length &&
            ((s = Array.from(s).filter(
              (t) => t.closest("[data-spollers]") === e,
            )),
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function o(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const s = t.closest("[data-spoller]"),
              n = s.closest("[data-spollers]"),
              r = !!n.hasAttribute("data-one-spoller");
            n.querySelectorAll("._slide").length ||
              (r && !s.classList.contains("_spoller-active") && l(n),
              s.classList.toggle("_spoller-active"),
              i(s.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function l(e) {
          const s = e.querySelector("[data-spoller]._spoller-active");
          s &&
            (s.classList.remove("_spoller-active"),
            t(s.nextElementSibling, 500));
        }
        n &&
          n.length &&
          n.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              r(e.itemsArray, e.matchMedia);
            }),
              r(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll("[data-tabs]");
      let i = [];
      if (e.length > 0) {
        const t = (function () {
          if (location.hash) return location.hash.replace("#", "");
        })();
        t && t.startsWith("tab-") && (i = t.replace("tab-", "").split("-")),
          e.forEach((e, t) => {
            e.classList.add("_tab-init"),
              e.setAttribute("data-tabs-index", t),
              e.addEventListener("click", a),
              (function (e) {
                let t = e.querySelectorAll("[data-tabs-titles]>*"),
                  s = e.querySelectorAll("[data-tabs-body]>*");
                const n = e.dataset.tabsIndex,
                  r = i[0] == n;
                if (r) {
                  const t = e.querySelector("[data-tabs-titles]>._tab-active");
                  t && t.classList.remove("_tab-active");
                }
                s.length &&
                  ((s = Array.from(s).filter(
                    (t) => t.closest("[data-tabs]") === e,
                  )),
                  (t = Array.from(t).filter(
                    (t) => t.closest("[data-tabs]") === e,
                  )),
                  s.forEach((e, s) => {
                    t[s].setAttribute("data-tabs-title", ""),
                      e.setAttribute("data-tabs-item", ""),
                      r && s == i[1] && t[s].classList.add("_tab-active"),
                      (e.hidden = !t[s].classList.contains("_tab-active"));
                  }));
              })(e);
          });
        let s = d(e, "tabs");
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              n(e.itemsArray, e.matchMedia);
            }),
              n(e.itemsArray, e.matchMedia);
          });
      }
      function n(e, t) {
        e.forEach((e) => {
          let s = (e = e.item).querySelector("[data-tabs-titles]"),
            i = e.querySelectorAll("[data-tabs-title]"),
            n = e.querySelector("[data-tabs-body]"),
            r = e.querySelectorAll("[data-tabs-item]");
          (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
            (r = Array.from(r).filter((t) => t.closest("[data-tabs]") === e)),
            r.forEach((r, a) => {
              t.matches
                ? (n.append(i[a]), n.append(r), e.classList.add("_tab-spoller"))
                : (s.append(i[a]), e.classList.remove("_tab-spoller"));
            });
        });
      }
      function r(e) {
        let i = e.querySelectorAll("[data-tabs-title]"),
          n = e.querySelectorAll("[data-tabs-item]");
        const r = e.dataset.tabsIndex;
        const a = (function (e) {
          if (e.hasAttribute("data-tabs-animate"))
            return e.dataset.tabsAnimate > 0
              ? Number(e.dataset.tabsAnimate)
              : 500;
        })(e);
        if (n.length > 0) {
          const o = e.hasAttribute("data-tabs-hash");
          (n = Array.from(n).filter((t) => t.closest("[data-tabs]") === e)),
            (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
            n.forEach((e, n) => {
              i[n].classList.contains("_tab-active")
                ? (a ? s(e, a) : (e.hidden = !1),
                  o &&
                    !e.closest(".popup") &&
                    (function (e) {
                      (e = e ? `#${e}` : window.location.href.split("#")[0]),
                        history.pushState("", "", e);
                    })(`tab-${r}-${n}`))
                : a
                  ? t(e, a)
                  : (e.hidden = !0);
            });
        }
      }
      function a(e) {
        const t = e.target;
        if (t.closest("[data-tabs-title]")) {
          const s = t.closest("[data-tabs-title]"),
            i = s.closest("[data-tabs]");
          if (
            !s.classList.contains("_tab-active") &&
            !i.querySelector("._slide")
          ) {
            let e = i.querySelectorAll("[data-tabs-title]._tab-active");
            e.length &&
              (e = Array.from(e).filter((e) => e.closest("[data-tabs]") === i)),
              e.length && e[0].classList.remove("_tab-active"),
              s.classList.add("_tab-active"),
              r(i);
          }
          e.preventDefault();
        }
      }
    })(),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]",
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            f.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && f.validateInput(t));
        });
    })(),
    (function (t) {
      e.popup && e.popup.open("some");
      const s = document.forms;
      if (s.length)
        for (const e of s)
          e.addEventListener("submit", function (e) {
            i(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              f.formClean(t);
            });
      async function i(e, s) {
        if (0 === (t ? f.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            s.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              i = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              r = new FormData(e);
            e.classList.add("_sending");
            const a = await fetch(t, { method: i, body: r });
            if (a.ok) {
              await a.json();
              e.classList.remove("_sending"), n(e);
            } else alert("Ошибка"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (s.preventDefault(), n(e));
        } else {
          s.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && p(t, !0, 1e3);
        }
      }
      function n(t) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: t } }),
        ),
          setTimeout(() => {
            if (e.popup) {
              const s = t.dataset.popupMessage;
              s && e.popup.open(s);
            }
          }, 0),
          f.formClean(t),
          l(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    document.addEventListener("click", function (e) {
      let t = e.target;
      if (t.closest(".quantity__button")) {
        let e = parseInt(t.closest(".quantity").querySelector("input").value);
        t.classList.contains("quantity__button_plus")
          ? e++
          : (--e, e < 1 && (e = 1)),
          (t.closest(".quantity").querySelector("input").value = e);
      }
    }),
    (function () {
      const e = document.querySelectorAll(".rating");
      e.length > 0 &&
        (function () {
          let t, s;
          for (let t = 0; t < e.length; t++) {
            i(e[t]);
          }
          function i(e) {
            n(e), r(), e.classList.contains("rating_set") && a(e);
          }
          function n(e) {
            (t = e.querySelector(".rating__active")),
              (s = e.querySelector(".rating__value"));
          }
          function r(e = s.innerHTML) {
            const i = e / 0.05;
            t.style.width = `${i}%`;
          }
          function a(e) {
            const t = e.querySelectorAll(".rating__item");
            for (let i = 0; i < t.length; i++) {
              const a = t[i];
              a.addEventListener("mouseenter", function (t) {
                n(e), r(a.value);
              }),
                a.addEventListener("mouseleave", function (e) {
                  r();
                }),
                a.addEventListener("click", function (t) {
                  n(e),
                    e.dataset.ajax
                      ? o(a.value, e)
                      : ((s.innerHTML = i + 1), r());
                });
            }
          }
          async function o(e, t) {
            if (!t.classList.contains("rating_sending")) {
              t.classList.add("rating_sending");
              let e = await fetch("rating.json", { method: "GET" });
              if (e.ok) {
                const i = (await e.json()).newRating;
                (s.innerHTML = i), r(), t.classList.remove("rating_sending");
              } else alert("Ошибка"), t.classList.remove("rating_sending");
            }
          }
        })();
    })();
})();
