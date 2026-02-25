var winHeight = $(window).height(),
    winWidth = $(window).width(),
    flag = !1;

var tmp_citydistrict = "";

function tabs() {
    $(document).on("click", ".js-tab-head li", function (e) {
        var t, i, s;
        if ((e.preventDefault(), (t = $(this)), (bar = $(t).siblings(".bar")), (currindex = t.index()), (i = $(this).parents(".js-tab-wrap")), (s = $(i).find(".tab-content-body .tab-content")), !t.hasClass("active"))) {
            t.addClass("active").siblings().removeClass("active"), s.removeClass("active"), s.eq(currindex).addClass("active");
            var a = t.position().left;
            bar.animate(
                {
                    left: a,
                },
                500,
                function () {}
            );
        }
    });
}

function scrollUp() {
    var e = $(".js-scrollUp");
    $(window).scroll(function () {
        $(this).scrollTop() > 100 ? $(e).css("opacity", "1") : $(e).css("opacity", "0");
    }),
        $(".js-scrollUp").on("click", function () {
            return (
                $("html, body").animate(
                    {
                        scrollTop: 0,
                    },
                    800
                ),
                !1
            );
        });
}

function inputFocus() {
    var e = $(".input-block input");
    e.focus(function () {
        $(this).parent().addClass("focus");
    }),
        e.focusout(function () {
            var e = $(this);
            $(".datepicker").length > 1
                ? $(".datepicker").datepicker("widget").is(":visible") &&
                  setTimeout(function () {
                      $(".datepicker").datepicker("widget").is(":visible") || ("" == e.val() ? e.parent().removeClass("focus") : e.parent().addClass("focus"));
                  }, 300)
                : "" == e.val()
                ? e.parent().removeClass("focus")
                : e.parent().addClass("focus");
        });
}

function commonPopup() {
    var e, t;
    $(".js-popup-btn"),
        $(".js-popup-close"),
        $(document).on("click", ".js-popup-btn", function (i) {
            i.preventDefault(), (e = $(this).attr("data-popup")), (t = $(e)).addClass("active"), t.find(".js-popup-body").addClass("active"), $("html, body").addClass("over-hidden");
        }),
        $(document).on("click", ".js-popup-close", function (i) {
            i.preventDefault(), (e = $(this).parents(".js-popup-wrap")), (t = $(e)).find(".js-popup-body"), t.removeClass("active"), $("html, body").removeClass("over-hidden");
        });
}

function commonP() {
    var e;
    $(document).on("click", ".cmn-popup", function () {
        $("#" + $(this).attr("href").replace("#", "")).css({
            visibility: "visible",
            opacity: "1",
            display: "block",
            overflow: "auto",
            height: "100%",
            "z-index": "10000",
        }),
            (e = $(window).scrollTop()),
            $("html, body").addClass("over-hidden");
    }),
        $(document).on("click", ".js-ui-close", function (t) {
            $(this).closest(".overlayN").css({
                display: "none",
                overflow: "hidden",
            }),
                $(this).closest(".overLay").fadeOut(500),
                $("html, body").removeClass("over-hidden"),
                window.scroll(0, e);
        });
}

function carDetails() {
    if ($(window).width() <= 991) {
        var e = $(".tw-img-detach").detach();
        $(".tw-para-detach").after(e);
    } else (e = $(".tw-img-detach").detach()), $(".tw-para-detach").before(e);
    if ($(window).width() <= 991) {
        var t = $(".ui-claimimg-dth").detach();
        $(".ui-claimtext-dth").after(t);
    } else (t = $(".ui-claimimg-dth").detach()), $(".ui-claimtext-dth").before(t);
    if ($(window).width() <= 991) {
        var i = $(".idv-img-detach").detach();
        $(".idv-para-detach").after(i);
    } else (i = $(".idv-img-detach").detach()), $(".idv-para-detach").before(i);
    if ($(window).width() <= 991) {
        var s = $(".ui-garageimg-dth").detach();
        $(".ui-garagetext-dth").after(s);
    } else (s = $(".ui-garageimg-dth").detach()), $(".ui-garagetext-dth").before(s);
    if ($(window).width() <= 991) {
        var a = $(".ui-onlineimg-dth").detach();
        $(".ui-onlinetext-dth").after(a);
    } else (a = $(".ui-onlineimg-dth").detach()), $(".ui-onlinetext-dth").before(a);
}

function funbindLogin() {
    $("#authoriseUsr,#Span,#LblUser,#LnkLogout").hide(), $("#lbllastlogin").text(""), $("#LblUser").text("").hide(), $("#btnmain_login,.mobloginBt").attr("href", "/registration-new-ui");
}

function funClearsessionForNewTW() {
    sessionStorage.removeItem("UserDetailsData"),
        sessionStorage.removeItem("UserLoggedInDetail"),
        sessionStorage.removeItem("AuthorizationToken"),
        sessionStorage.removeItem("TokenExpiry"),
        sessionStorage.removeItem("LoginType"),
        sessionStorage.removeItem("IsCallCenterUser"),
        (window.location.href = "/");
}

function bindGaragelisttw(e) {
    var t = JSON.parse(getGarageListtw("/docs/default-source/garage-upload/garagelist.xls"));
    if (window.location.href.indexOf("car") > -1)
        var i = t.filter(function (t) {
            if (null != t.City) return t.City.toLowerCase() === e.toLowerCase() && "Car" == t.Product;
        });
    else
        i = t.filter(function (t) {
            if (null != t.City) return t.City.toLowerCase() === e.toLowerCase() && "Two Wheeler" == t.Product;
        });
    $("#totalNocity").text(i.length),
        i.length <= 0 ? $(".search-show-list").hide() : $(".search-show-list").show(),
        $("#listOfgrg ").html(""),
        $.each(i, function (e, t) {
            e % 2 == 0
                ? $("#listOfgrg ").append(
                      '<li class="mrR"><div class="netGargs"><h4>' +
                          t.GARAGENAME +
                          "</h4><p>" +
                          t.ADDRESS +
                          '</p><div class="conMn"><div class="conGrgs"><span class="dtlsCn">Phone:</span><span class="grgPhone">' +
                          t.ContactNumber +
                          '</span></div><div class="manfGrgs"><span class="dtlsCn">Manufacturer:</span><span class="grgManufact">' +
                          t.MANUFACTURER +
                          "</span></div></div></div></li>"
                  )
                : $("#listOfgrg ").append(
                      '<li><div class="netGargs"><h4>' +
                          t.GARAGENAME +
                          "</h4><p>" +
                          t.ADDRESS +
                          '</p><div class="conMn"><div class="conGrgs"><span class="dtlsCn">Phone:</span><span class="grgPhone">' +
                          t.ContactNumber +
                          '</span></div><div class="manfGrgs"><span class="dtlsCn">Manufacturer:</span><span class="grgManufact">' +
                          t.MANUFACTURER +
                          "</span></div></div></div></li>"
                  );
        }),
        1 == $("#listOfgrg li").length ? $("#listOfgrg li").addClass("grgOnlyOne") : $("#listOfgrg li").removeClass("grgOnlyOne"),
        $("#partnerGar").removeClass("networkLoading");
}

function getGarageListtw(e) {
    var t = "",
        i = new Object();
    return (
        (i.documentUrl = "Garagelist"),
        (i.sheetNo = "0"),
        $.ajax({
            type: "POST",
            url: "/CustomService/Locations/readExcel",
            data: JSON.stringify(i),
            contentType: "application/json",
            dataType: "json",
            async: !1,
            success: function (e) {
                t = e.readExcelResult;
            },
            failure: function (e) {
                console.log(e.d);
            },
        }),
        t
    );
}

function stringToArrayBuffer(e) {
    for (var t = new ArrayBuffer(e.length), i = new Uint8Array(t), s = 0, a = e.length; s < a; s++) i[s] = e.charCodeAt(s);
    return t;
}
$(document).ready(function () {
 $("#whtasapp-pop-close, #dontSendupdate").click(function (e) {
            e.preventDefault();
            if ((e.keyCode ? e.keyCode : e.which) == 13) {
                $(this).trigger("click");
            }
            setTimeout(function () {
                $("#checkbox2").focus();
            }, 500);
        });

    $(".quote_click").on("click", function () {
        $(window).scrollTop(0);
    }),
        scrollUp(),
        inputFocus(),
        carDetails(),
        tabs(),
        commonP(),
        commonPopup(),
        carreviewSlider(),
        newsUpdate(),
        awardsRecognize(),
        $(document).on("click", ".apopup", function () {
            $("#" + $(this).attr("href").replace("#", "")).css({
                visibility: "visible",
                opacity: "1",
                display: "block",
            });
        }),
        $("#rollOver").length && selectCustom(),
        $(document).on("click", ".gq-sticky", function () {
            return (
                $("html, body").animate(
                    {
                        scrollTop: 100,
                    },
                    800
                ),
                !1
            );
        }),
        $(".search-item input").on("focus", function () {
            $(".search-item .ui-error").hide();
        }),
        $("#viewListp .js-popup-close").click(function () {
            $(this).parents(".overlayN").css({
                visibility: "hidden",
                opacity: "0",
                display: "none",
            });
        }),
        $(document).on("click", ".openPopup", function (e) {
            e.preventDefault(), $("#" + $(this).attr("href").replace("#", "")).addClass("active");
        }),
        /*      //edited by Adnan
    $(document).on("click", "#findSortList li a, #checkCity", function(e) {
        // var t;
        // if ($("#partnerGar").addClass("networkLoading"), e.preventDefault(), $(this).parents("#findSortList").length >= 1) t = $(this).text(), $("#fw_citystate").parents(".block").find(".errorN").hide(), $(".selectedPlace").text(t), $(".searchCounter").addClass("searchCounter-show"), $("body").addClass("onPincodePopup"), $("#findSortList").addClass("citySelected");
        // else {
            // if ("" == (t = $("#fw_citystate").val().split(",")[0]) || null == t) return $("#fw_citystate").parents(".block").find(".errorN").text("Please enter valid city"), $("#fw_citystate").parents(".block").find(".errorN").show(), !1;
            // $("#fw_citystate").parents(".block").find(".errorN").hide(), $(".selectedPlace").text(t), $(".searchCounter").addClass("searchCounter-show"), $("body").addClass("onPincodePopup"), $("#findSortList").addClass("citySelected")
        // }
        
        if ($("#partnerGar").addClass("networkLoading"), e.preventDefault(), $(this).parents("#findSortList").length >= 1) t = $(this).text(), $("#fw_citystate").parents(".block").find(".errorN").hide(), $(".selectedPlace").text(t), $(".searchCounter").addClass("searchCounter-show"), $("body").addClass("onPincodePopup"), $("#findSortList").addClass("citySelected");
         else {
             if ("" == (t = $("#fw_citystate").val().split(",")[0]) || null == t)
             {
                return $("#fw_citystate").parents(".garages-search-block").find(".ui-error").text("Please enter valid city"),
                        $('#viewListp').hide(),
                        $("#fw_citystate").parents(".garages-search-block").find(".ui-error").show(),
                        $('#viewListp').css("opacity", "0"),
                        !1; 
             }else{
    
                $("#fw_citystate").parents(".block").find(".errorN").hide(),
                $(".selectedPlace").text(t),
                $(".searchCounter").addClass("searchCounter-show"),
                $("body").addClass("onPincodePopup"),
                $("#findSortList").addClass("citySelected") 
             }
                
         }
        
        bindGaragelisttw(t)
    })
    */
        $("#checkCity").click(function (o) {
            if (($("#partnerGar").addClass("networkLoading"), $("#listOfgrg ").html(""), o.preventDefault(), "" == (t = $("#fw_citystate").val().split(",")[0]) || null == t))
                return (
                    $("#fw_citystate").parents(".garages-search-block").find(".ui-error").text("Please enter valid city"),
                    $("#fw_citystate").parents(".garages-search-block").find(".ui-error").show(),
                    $("#viewListp").hide(),
                    $("#viewListp").css("opacity", "0"),
                    !1
                );
            $("#fw_citystate").parents(".block").find(".errorN").hide(),
                $("#viewListp").show(),
                $("#viewListp").css("visibility", "visible"),
                $("#viewListp").css("opacity", "1"),
                bindGaragelisttw(t),
                $("#partnerGar").removeClass("networkLoading");
        }),
        // var obj = JSON.parse(window.localStorage.getItem("_cityDistrict"));

        // if(obj.length == 0){
        // console.log("empty");
        // }else{
        // console.log("not empty");
        // }

        // if((window.localStorage.getItem("_cityDistrict"))=="" || (window.localStorage.getItem("_cityDistrict"))==null || (window.localStorage.getItem("_cityDistrict"))==undefined)
        // {
        // console.log("_cityDistrict is empty");
        // return;
        // }
        // else{
        // BindCityDistrictValue(JSON.parse(window.localStorage.getItem("_cityDistrict")), "#fw_citystate");
        // }

        BindCityDistrictValue(JSON.parse(window.localStorage.getItem("_cityDistrict")), "#fw_citystate");

    //, BindCityDistrictValue(tmp_citydistrict, "#fw_citystate");
    var e = JSON.parse(window.sessionStorage.getItem("UserDetailsData")),
        t = JSON.parse(window.sessionStorage.getItem("UserLoggedInDetail"));
    null != e && "" != e
        ? 1 == e.isguestuser
            ? funbindLogin()
            : ($("#lbllastlogin").text(e.LastLogin), $("#LblUser").text(e.UserName).show(), $("#authoriseUsr,#Span,#LblUser,#LnkLogout").show(), FeedbackTooggle1())
        : null != t && "" != t
        ? 1 == t.isguestuser
            ? funbindLogin()
            : ($("#lbllastlogin").text(t.LastLogin), $("#LblUser").text(t.UserName).show(), $("#authoriseUsr,#Span,#LblUser,#LnkLogout").show(), FeedbackTooggle1())
        : funbindLogin(),
        $(".ui-autocomplete").mouseenter(function (e) {
            e.preventDefault(), e.stopPropagation();
        }),
        $(".rating-n").length && ratingEmoji(),
        $(document).on("keydown", ".tel, .numeric", function (e) {
            46 == e.keyCode ||
                8 == e.keyCode ||
                9 == e.keyCode ||
                27 == e.keyCode ||
                13 == e.keyCode ||
                (65 == e.keyCode && !0 === e.ctrlKey) ||
                (e.keyCode >= 35 && e.keyCode <= 39) ||
                ((e.shiftKey || ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105))) && e.preventDefault());
        }),
        $(document).on("keyup keypress", ".tel, .numeric", function (e) {
            var t = $(this).val(),
                i = t.substr(t.length - 1);
            /^[0-9\.]$/.test(i) || (t.length > 0 ? $(this).val(t.substr(0, t.length - 1)) : $(this).val());
        });
}),
    $(window).resize(function () {
        carDetails();
    }),
    $(window).scroll(function () {
        $(window).width() < 768 &&
            ($(this).scrollTop() > 800
                ? ($(".ui-submit-btn").addClass("fixedBtn"), $(".renewal-link, .re-quote, .get-quote-btn").addClass("hidden"), $(".gq-sticky").removeClass("hidden"))
                : ($(".ui-submit-btn").removeClass("fixedBtn"), $(".renewal-link, .re-quote, .get-quote-btn").removeClass("hidden"), $(".gq-sticky").addClass("hidden")));
    }),
    (getLocation = function (e, t) {
        var i = new Array();
        return (
            $.each(e, function (e, s) {
                s.cityDistrictName.indexOf(t) > -1 && i.push(s);
            }),
            i
        );
    }),
    (ValidateinputData = function (e) {
        return void 0 === e || null == e || "" == e || e.length <= 0;
    }),
    (BindCityDistrictValue = function (e, t) {
        $(t).autocomplete({
            source: function (e, t) {
                var i = e.term;
                if (jQuery.isEmptyObject(JSON.parse(localStorage.getItem("_cityDistrict"))) == true) {
                    console.log("_cityDistrict is empty");
                    return;
                }
                if (!ValidateinputData(JSON.parse(localStorage.getItem("_cityDistrict")))) {
                    var s = JSON.parse(localStorage.getItem("_cityDistrict")),
                        a = getLocation(s, i.toUpperCase());

                    if (s == undefined || s == null || s == "") {
                        return;
                    }

                    t(
                        $.map(a, function (e) {
                            return {
                                label: e.cityDistrictName,
                                val: e.cityDistrictId,
                            };
                        })
                    );
                }
            },
            minLength: 3,
            select: function (e, t) {
                t.item && ($("#fw_pincode").val(""), t.item.val.split("-"), $("#fw_citystate").val(t.item.label.split(",")[0]));
            },
        });
    }),
    (FnListofCityDistrict = function () {
        // var obj = JSON.parse(window.localStorage.getItem("_cityDistrict"));

        // if(obj.length == 0){
        // console.log("empty");
        // }else{
        // console.log("not empty");
        // }
        if (jQuery.isEmptyObject(JSON.parse(localStorage.getItem("_cityDistrict"))) == true) {
            console.log("_cityDistrict is empty");
            return;
        }

        return ValidateinputData(JSON.parse(localStorage.getItem("_cityDistrict")))
            ? new Promise(function (e, t) {
                  window.location.href.indexOf("motor") > -1 && e(Motor.GetAllCityDistrict(""));
              })
            : new Promise(function (e, t) {
                  e([]);
              });
    });
var CallFnFetchCityDistrict = FnListofCityDistrict();

function twLandingblock() {
    $(document).on("click", ".js-note-veh", function () {
        $(this).parents(".get-quote-wrap").find(".vehiclereg-no").hide(), $(".idontrem-block").show();
    }),
        $(document).on("click", ".js-note-remveh", function () {
            $(".vehiclereg-no").show(), $(".idontrem-block").hide();
        });
}

function carreviewSlider() {
    $("#caruiSlider").owlCarousel({
        nav: !0,
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
            },
            600: {
                items: 2,
                slideBy: 2,
            },
            1000: {
                items: 2,
                slideBy: 2,
            },
        },
    });
}

function newsUpdate() {
    $("#news_update").owlCarousel({
        nav: !0,
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
            },
            600: {
                items: 1,
                slideBy: 1,
            },
            1300: {
                items: 3,
                slideBy: 3,
            },
        },
    });
}

function awardsRecognize() {
    $("#awards_recognize").owlCarousel({
        nav: !0,
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
            },
            600: {
                items: 1,
                slideBy: 1,
            },
            1300: {
                items: 1,
                slideBy: 1,
            },
        },
    });
}

function selectCustom() {
    $(".basic-select select").selectbox({
        speed: 50,
        onChange: function (e, t) {
            $(this).attr("id"), $(this).parents(".drp").find("label").css("top", "-4px"), $(this).parents(".basic-select").find(".sbSelector").css("opacity", "1"), $(this).parents(".block").addClass("focus");
        },
    }),
        $(".sbSelector").each(function () {
            "" != $(this).text() ? $(this).parents(".block").addClass("focus") : $(this).parents(".block").removeClass("focus");
        });
}
Promise.all([CallFnFetchCityDistrict]).then(
    function (e) {
        ValidateinputData(JSON.parse(localStorage.getItem("_cityDistrict")))
            ? null != e[0] && (localStorage.setItem("_cityDistrict", JSON.stringify(e[0])), BindCityDistrictValue(e[0], "#fw_citystate"))
            : BindCityDistrictValue(JSON.parse(localStorage.getItem("_cityDistrict")), "#fw_citystate");
    },
    function (e) {}
),
    $(document).ready(function () {
        $(".input-block input").on("keypress", function () {
            $(this).parents(".input-block").find(".ui-error").hide();
        }),
            $(".input-block input[type=text]").each(function () {
                "" != $(this).val() && $(this).parents(".input-block").addClass("focus");
            });
    });

var regMobile = /^[6-9][0-9][\d*]{6}[0-9]{2}$/;

$(document).ready(function () {
    hideLoaderlanding();
    
    showvideoPopup();
    closevideoPopup();
    datetype();
    $(".sb-container").scrollBox();

    $(".jq-dte-day").attr("maxlength", "2");
    $(".jq-dte-month").attr("maxlength", "2");
    $(".jq-dte-year").attr("maxlength", "4");
    $(".Numeric").keydown(function (e) {
        46 == e.keyCode ||
            8 == e.keyCode ||
            9 == e.keyCode ||
            27 == e.keyCode ||
            13 == e.keyCode ||
            (65 == e.keyCode && e.ctrlKey === !0) ||
            (e.keyCode >= 35 && e.keyCode <= 39) ||
            ((e.shiftKey || ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105))) && e.preventDefault());
    });
    $(".date-block .block").click(function () {
        $(this).find(".errorN").hide();
    });
});

$(window).on("load", function () {
    hideLoaderlanding();
});

function showLoaderlanding() {
    $(".pageLoader").fadeIn(500);
}
function hideLoaderlanding() {
    $(".pageLoader").fadeOut(800);
}


function showvideoPopup() {
    $(document).on("click", ".car_video", function () {
        $(".popupVideo").fadeIn();
    });
}

function closevideoPopup() {
    $(document).on("click", ".closeSpan", function () {
        $(".popupVideo").fadeOut();
        $(".embed-responsive-item").get(0).pause();
        $(".embed-responsive-item")[0].currentTime = 0;
    });
}

function datetype() {
    $("#hltdb1").datetextentry({
        show_tooltips: false,
        show_hints: true,
        field_order: "DMY",
        min_year: "2021",
        max_date: function () {
            return this.get_today() - "-6m";
        },
        max_date_message: "Date must not be greater than 6 month from today",
        on_change: function (date_str) {
            var mDate = date_str.split("-");
            var month_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var monthCount = parseFloat(mDate[1] - 1);
            var dateTxt = mDate[0] + " " + month_name[monthCount] + " " + mDate[2];
            $("#hltdb1").parents(".jq-dte").find(".jq-dte-errorbox").text(dateTxt).show();
        },
    });
}

function showErrorwdgt(el) {
    $(el).parents(".input-block").find(".ui-error").show();
    return false;
}

function hideErrorwdgt(el) {
    $(el).parents(".input-block").find(".ui-error").hide();
    return true;
}

function requiredfield(ID, message) {
    if ($.trim(ID.val()) == "") {
        ID.parent().find(".errorN").css({ display: "block" });
        ID.parent().parent().find(".errorN").html(message);

        return false;
    } else {
        ID.parent().parent().find(".errorN").html("");
        return true;
    }
}

/**
 * jQiery scrollBar Plugin
 */
(function ($, window, document) {
    "use strict";

    var pluginName = "scrollBox",
        defaults = {
            containerClass: "sb-container",
            containerNoScrollClass: "sb-container-noscroll",
            contentClass: "sb-content",
            scrollbarContainerClass: "sb-scrollbar-container",
            scrollBarClass: "sb-scrollbar",
        };

    // plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            this.addScrollbar();
            this.addEvents();
            this.onResize();
        },
        addScrollbar: function () {
            $(this.element).addClass(this.settings.containerClass);
            this.wrapper = $("<div class='" + this.settings.contentClass + "' />");
            this.wrapper.append($(this.element).contents());
            $(this.element).append(this.wrapper);

            this.scollbarContainer = $("<div class='" + this.settings.scrollbarContainerClass + "' />");
            this.scrollBar = $("<div class='" + this.settings.scrollBarClass + "' />");
            this.scollbarContainer.append(this.scrollBar);
            $(this.element).prepend(this.scollbarContainer);
        },
        addEvents: function () {
            this.wrapper.on("scroll." + pluginName, $.proxy(this.onScroll, this));
            $(window).on("resize." + pluginName, $.proxy(this.onResize, this));

            this.scrollBar.on("mousedown." + pluginName, $.proxy(this.onMousedown, this));
            this.scrollBar.on("touchstart." + pluginName, $.proxy(this.onTouchstart, this));
        },

        onTouchstart: function (ev) {
            var me = this;

            ev.preventDefault();
            var y = me.scrollBar[0].offsetTop;

            var onMove = function (end) {
                var delta = end.touches[0].pageY - ev.touches[0].pageY;
                me.scrollBar[0].style.top = Math.min(me.scollbarContainer[0].clientHeight - me.scrollBar[0].clientHeight, Math.max(0, y + delta)) + "px";
                me.wrapper[0].scrollTop = (me.wrapper[0].scrollHeight * me.scrollBar[0].offsetTop) / me.scollbarContainer[0].clientHeight;
            };

            $(document).on("touchmove." + pluginName, onMove);
            $(document).on("touchend." + pluginName, function () {
                $(document).off("touchmove." + pluginName);
                $(document).off("touchend." + pluginName);
            });
        },

        onMousedown: function (ev) {
            var me = this;

            ev.preventDefault();
            var y = me.scrollBar[0].offsetTop;

            var onMove = function (end) {
                var delta = end.pageY - ev.pageY;
                me.scrollBar[0].style.top = Math.min(me.scollbarContainer[0].clientHeight - me.scrollBar[0].clientHeight, Math.max(0, y + delta)) + "px";
                me.wrapper[0].scrollTop = (me.wrapper[0].scrollHeight * me.scrollBar[0].offsetTop) / me.scollbarContainer[0].clientHeight;
            };

            $(document).on("mousemove." + pluginName, onMove);
            $(document).on("mouseup." + pluginName, function () {
                $(document).off("mousemove." + pluginName);
                $(document).off("mouseup." + pluginName);
            });
        },

        onResize: function () {
            this.wrapper.css("max-height", $(this.element).height());

            var wrapper_client_height = this.wrapper[0].clientHeight;

            this.scrollBar.css("height", (this.scollbarContainer[0].clientHeight * wrapper_client_height) / this.wrapper[0].scrollHeight + "px");
            if (this.scollbarContainer[0].clientHeight <= this.scrollBar[0].clientHeight) {
                $(this.element).addClass(this.settings.containerNoScrollClass);
            } else {
                $(this.element).removeClass(this.settings.containerNoScrollClass);
            }

            this.onScroll();
        },

        onScroll: function () {
            this.scrollBar.css("top", Math.min(this.scollbarContainer[0].clientHeight - this.scrollBar[0].clientHeight, (this.scollbarContainer[0].clientHeight * this.wrapper[0].scrollTop) / this.wrapper[0].scrollHeight) + "px");
        },
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);

$(document).ready(function () {
    //$('.wit-popuplink').hide();

    $(document).on("click", function (e) {
        //e.preventDefault();
        e.stopPropagation();
        var w = $(".input-block");
        $(e.target).closest(w).length || w.parent().find(".wit-popuplink").removeClass("whtLink");
        $(e.target).closest(w).length || w.parent().find(".wit-popuplink").hide();
    });

    $(document).on("focus", ".js_mobileTelattr input, .mobile-block input", function () {
        $(".wit-popuplink").removeClass("whtLink");
        $(".wit-popuplink").hide();
    });
    // $(document).on("blur", ".js-veh-block input", function () {
    //     if ($(this).val() == "") {
    //         $('.wit-popuplink').removeClass('whtLink');
    //         $('.wit-popuplink').hide();
    //     } else {
    //         $(".wit-popuplink").addClass("whtLink");
    //         $(".wit-popuplink").show();
    //     }
    // });

    if ($(window).width() <= 991) {
        var imgNewp = $(".io-img-dth").detach();
        $(".io-test-dth").after(imgNewp);
    } else {
        var imgNewp = $(".io-img-dth").detach();
        $(".io-test-dth").before(imgNewp);
    }

    if ($(window).width() <= 991) {
        var imgNewp11 = $(".dth-hd-img").detach();
        $(".dth-hd-para").after(imgNewp11);
    } else {
        var imgNewp11 = $(".dth-hd-img").detach();
        $(".dth-hd-para").before(imgNewp11);
    }

    $(document).on("click", ".vMore", function (e) {
        var $par = $(this).parents(".tw-para-detach, .view-more-content");
        var $this = $(this);
        $(".paraHide").hide();
        $(".vMore").removeClass("vLess").html("view more");
        $this.addClass("vLess").html("View less");
        $par.find(".paraHide").show();
        e.preventDefault();
    });

    $(document).on("click", ".vMore.vLess", function (e) {
        var $par = $(this).parents(".tw-para-detach, .view-more-content");
        var $this = $(this);
        $this.removeClass("vLess").html("View more");
        $par.find(".paraHide").hide();
        e.preventDefault();
    });

    $("#btnwhatapp").click(function () {
        window.checkWhatsapp(1);
    });

    $("#keepMeposted , #whtasapp-pop-close").click(function () {
        $("#whatsapp-popup").removeClass("active");
        window["whatsAppTick"] = true;
        window.checkedWhatsappClick(true);
    });
    $("#dontSendupdate").click(function () {
        $("#whatsapp-popup").removeClass("active");
        window["whatsAppTick"] = false;
        window.checkedWhatsappClick();
    });
    $("#understand-reg-no-close-1").click(function () {
        $("#understand-reg-no-1").removeClass("active");
    });

    setTimeout(function () {
        $('.js-veh-block input[type="text"]').blur(function () {
            if (!$(this).val()) {
                $(".wit-popuplink").show();
            } else {
                $(".wit-popuplink").hide();
            }
        });
    }, 500);

    $(".ui-form-block input:checkbox").keypress(function (e) {
        e.preventDefault();
        if ((e.keyCode ? e.keyCode : e.which) == 13) {
            $(this).trigger("click");
        }
        setTimeout(function () {
            $("#whtasapp-pop-close").focus();
        }, 500);
    });

    $("#moreQuote").click(function () {
        if ($(window).width() < 767) {
            $(".more-quotes-wrapper").addClass("animate__animated animate__shakeX");
        }
        setTimeout(function () {
            $(".more-quotes-wrapper").removeClass("animate__animated animate__shakeX");
        }, 2500);
    });
    $(".btn_click").click(function () {
        $(".ui-error-new").show();
    });

    $(".Numeric").keyup(function () {
        $(".ui-error-new").hide();
    });

    $(".menu-list li:first-child").addClass("jump_active");
    bannerDth();
    $(".il-input-block input").on("focus", function () {
        $(this).parents(".il-input-block").addClass("onFocused focus");
    });

    $(".il-input-block input").on("focusout", function () {
        $(this).parents(".il-input-block").removeClass("onFocused focus");
        if ($(this).val().length >= 1) {
            $(this).parents(".il-input-block").addClass("focus");
        }
    });
});
$(window).resize(function () {
    bannerDth();
});

function bannerDth() {
    if ($(window).width() <= 767) {
        var rq = $(".toggle-panel-wrapper").detach();
        $(".banner-content").after(rq);
    }

    setTimeout(function () {
        if ($(window).width() <= 767) {
            var sliderplan1 = $(".banner-content figure").detach();
            $(".bannerFormblock").after(sliderplan1);
        } else {
            var sliderplan1 = $(".banner-content figure").detach();
            $(".banner-content ul").after(sliderplan1);
        }
    }, 500);
}
