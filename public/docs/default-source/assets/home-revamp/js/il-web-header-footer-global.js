$(document).ready(function () {
    /* footer revamp function */
    let isMobile = window.innerWidth <= 767;
    handleResponsiveAccordion();

    function bindDesktopAccordion() {
        $(".accordion-header")
            .off("click")
            .on("click", function () {
                const $this = $(this);
                const $body = $this.next(".accordion-body");

                if ($this.hasClass("active")) {
                    $this.removeClass("active");
                    $body.stop(true, true).slideUp(200);
                } else {
                    $(".accordion-header").removeClass("active");
                    $(".accordion-body").stop(true, true).slideUp(200);
                    $this.addClass("active");
                    $body.stop(true, true).slideDown(200);
                }
            });
    }

    function bindMobileAccordion() {
        $(".col-footer-content h4")
            .off("click")
            .on("click", function () {
                const $column = $(this).closest(".col-footer-content");
                const $ul = $column.find("ul");

                if ($column.hasClass("active")) {
                    $column.removeClass("active");
                    $ul.stop(true, true).slideUp(200);
                } else {
                    $(".col-footer-content.active").removeClass("active").find("ul").stop(true, true).slideUp(200);
                    $column.addClass("active");
                    $ul.stop(true, true).slideDown(200);
                }
            });
    }

    function unbindDesktopAccordion() {
        $(".accordion-header").off("click").removeClass("active");
        $(".accordion-body").stop(true, true).slideUp(0).removeAttr("style");
    }

    function unbindMobileAccordion() {
        $(".col-footer-content h4").off("click");
        $(".col-footer-content").removeClass("active");
        $(".col-footer-content ul").stop(true, true).slideUp(0).removeAttr("style");
    }

    function openFirstAccordion() {
        if (window.innerWidth <= 767) {
            $(".col-footer-content").removeClass("active").find("ul").hide(); // close all
            const $first = $(".col-footer-content").first();
            $first.addClass("active");
            $first.find("ul").slideDown(200);
        } else {
            $(".accordion-header").removeClass("active");
            $("footer .accordion-body").hide(); // close all
            const $first = $(".accordion-header").first();
            $first.addClass("active");
            $first.next(".accordion-body").slideDown(200);
        }
    }

    function handleResponsiveAccordion() {
        const nowMobile = window.innerWidth <= 767;

        if (nowMobile !== isMobile) {
            if (nowMobile) {
                unbindDesktopAccordion();
                bindMobileAccordion();
            } else {
                unbindMobileAccordion();
                bindDesktopAccordion();
            }
            isMobile = nowMobile;
            openFirstAccordion(); // ensure only one is open after switching
        }
    }

    // Initial setup
    if (isMobile) {
        bindMobileAccordion();
    } else {
        bindDesktopAccordion();
    }
    openFirstAccordion();

    /* footer revamp function */

    /*********************** datalayer event start here ***********************/
     // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  function pushEvent(category, action, label, productName = '') {
    const eventData = {
      event: 'custom_event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    };

    if (productName) {
      eventData.product_name = productName;
    }

    dataLayer.push(eventData);
    console.log('GA Event pushed:', eventData);
  }
// Footer / navigation links
$(document).on('click', '.col-footer-wrapper a', function (e) {
    const label = $(this).text()
        .trim()
        .replace(/\s+/g, '_')   // replace spaces with underscores
        .replace(/-/g, '_')     // replace hyphens with underscores
        .toLowerCase();

    pushEvent('all_page_comman_int', 'footer_navigation_bar', label);
});
 $(document).on('click', '.read-more', function () {  
     const $columns = $(this).closest('.columns');
     let cta_text = $columns.find('.latest-insight-heading').text().trim() || 'unknown_report'; 
     cta_text = cta_text.toLowerCase().replace(/[^a-z0-9]+/g, '_') .replace(/^_+|_+$/g, '');    
     pushEvent('consumer_insights_lp_int',cta_text,'latest_insights');
 });
$(document).on('click', '.imgWrapp', function () {
    pushEvent('all_page_comman_int', 'ask_ria_live_chat_bot', 'NA');
  });
// Social icons
$(document).on('click', '.social-links a', function (e) {
    const title = $(this).attr('title') || $.trim($(this).text()) || 'social_link';
    pushEvent('all_page_comman_int', 'footer_navigation_bar', title);
});

$(document).on('click', '.app-links .iconslogo a', function (e) {
    const index = $(this).index();
    const label = index === 0 ? 'google_play_icon' : 'app_store_icon';

    pushEvent('all_page_comman_int', 'footer_navigation_bar', label);
});



// GC List (other ICICI group links)
$(document).on('click', '.gc-List a', function (e) {
    const label = $.trim($(this).text()).toLowerCase();
    pushEvent('all_page_comman_int', 'footer_navigation_bar', label);
});

  // 2. IL Logo Click
  $(document).on('click', '.il-logo a', function () {
    pushEvent('all_page_comman_int', 'icici_lombard_logo', 'NA');
  });

  // 3.1 Login Button
  $(document).on('click', '#login-revamp-click', function () {
    pushEvent('all_page_comman_int', 'top_header', 'login');
  });

   // Handle top header and submenu links
$(document).on('click', '.top-links a, .submenu-wrap-top a', function (e) {
    let label = '';

    const href = $(this).attr('href') || '';
    const classes = $(this).attr('class') || '';

    // Special top-level links
    if (href === '/investor-relations') {
        label = 'Investor Relations';
    } else if (classes.includes('bgBlue')) {
        label = 'Become an advisor';
    } else if (classes.includes('js-call-back')) {
        label = 'Call Back';
    } else if (classes.includes('liveChat')) {
        label = 'Live Chat';
    } else if (href.startsWith('tel:')) {
        label = 'Call Us';
    } else {
        // Get the text of the clicked link, ignoring children like <span>, <small>
        label = $(this).clone().children().remove().end().text();
    }

    // Normalize: lowercase, replace spaces with _
    label = label
        .replace(/\u00A0/g, ' ')      // non-breaking space
        .replace(/[\r\n\t]+/g, ' ')   // remove newlines/tabs
        .replace(/\s+/g, ' ')         // collapse spaces
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_');

    if (!label.includes('submit')) {
        pushEvent('all_page_comman_int', 'top_header', label);
    }
});



    // 4. Main Navigation Submenus (Special case for other-wrap)
  $(document).on('click', '.sub-menu-wrap a', function () {
    const href = $(this).attr('href') || '';
    const productName = $.trim($(this).text()).toLowerCase(); // product name in lowercase
    let label = 'other_insurance'; // default fallback

    // Find the closest .sub-menu-wrap to detect main category
    const submenuWrap = $(this).closest('.sub-menu-wrap');

    if (submenuWrap.hasClass('renewal-wrap')) {
        label = 'renewal';
    } else if (submenuWrap.hasClass('sub-claim-wrap')) {
        label = 'claims';
    } else if (href.includes('corporate.icicilombard.com')) {
        label = 'corporate_insurance';
    } else if (href.includes('/business-insurance') || href.includes('sme-insurance')) {
        label = 'sme_insurance';
    } else if (
        href.includes('/crop-insurance') ||
        href.includes('/nri-insurance') ||
        href.includes('/cyber-insurance') ||
        href.includes('/home-insurance') ||
        href.includes('/complete-home-protect-policy')
    ) {
        label = 'other_insurance';
    } else if (href.includes('/motor-insurance')) {
        label = 'motor_insurance';
    } else if (href.includes('/health-insurance')) {
        label = 'health_insurance';
    } else if (href.includes('/travel-insurance')) {
        label = 'travel_insurance';
    }

    const eventLabel = `${productName.replace(/\s+/g, '_')}`;

    // Send to GTM or your tracking function
    pushEvent('all_page_comman_int', 'main_navigation', eventLabel);

});


   //  1. Field Fill Tracking — trigger only on blur (after user finishes typing)
  $(document).on('blur', '#callbackName, #callbackMobile', function () {
    const placeholder = $(this).attr('id') === 'callbackName' ? 'full_name' : 'mobile_number';
    const value = $.trim($(this).val());

    if (value) {
      // Send event only if field has some value
      pushEvent('all_page_comman_int', `${placeholder}_fill`, placeholder, 'Call Back');
    }
  });

  //  2. Product Select Tracking — fires immediately on change
  $(document).on('change', '#callback-select', function () {
    const selectedProduct = $.trim($(this).val()).replace(/\s+/g, '_').toLowerCase();
    if (selectedProduct) {
      pushEvent('all_page_comman_int', 'select_product_fill', selectedProduct, 'Call Back');
    }
  });

  //  3. Submit Click Tracking — validates and passes success/fail
  $(document).on('click', '.js-callback-valid', function () {
    const nameVal = $.trim($('#callbackName').val());
    const mobileVal = $.trim($('#callbackMobile').val());
    const productVal = $.trim($('#callback-select').val());
    const productName = productVal.replace(/\s+/g, '_').toLowerCase() || 'Not Selected';

    const isSuccess = !!(nameVal && mobileVal && productVal);
    const eventAction = isSuccess ? 'success' : 'fail';

    try {
      pushEvent('all_page_comman_int', eventAction, 'call_back_form_submit', productName);
    } catch (e) {
      console.error('Error pushing callback form event:', e);
    }
  });

    /*********************** datalayer event ends here ***********************/
});

function loginClickEvent() {
    // $("#login-revamp-click").on("click", function () {
    //     showLoginPopUp("email");
    // });
}
function funsetdevicedetect() {
    var e = !1,
        t = navigator.userAgent + "|Desktop";
    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
    ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            navigator.userAgent.substr(0, 4)
        )) &&
        ((e = !0), (t = navigator.userAgent + "|Mobile")),
        sessionStorage.setItem("mobiledevice", e),
        sessionStorage.setItem("devicetype", t);
}
function megamenuHover() {
    var e;
    $(window).width() >= 992 &&
        ($(".menu-list>li").mouseenter(function () {
            var t = $(this);
            e = setTimeout(function () {
                t.addClass("active");
            }, 100);
        }),
        $(".menu-list>li").mouseleave(function () {
            clearTimeout(e), $(".menu-list>li").removeClass("active");
        }));
}
function footerbottomList() {
    $(".gc-InMax").on("click", function () {
        $(this).parent().find(".gc-List").slideToggle(150), $(".gc-Button").toggleClass("active"), $("html, body").animate({ scrollTop: $(document).height() });
    }),
        $(document).on("click", function (e) {
            var t = $(".gc-InMax");
            $(e.target).closest(t).length || (t.parent().find(".gc-List").slideUp(150), $(".gc-Button").removeClass("active"));
        });
}
function callBackform() {
    $(window).width() >= 991 &&
        ($(".js-call-back").on("click", function () {
            $(this).parent().find(".js-callback").slideToggle(), $(".js-callback").toggleClass("active");
        }),
        $(document).on("click", function (e) {
            var t = $(".call-wrap");
            $(e.target).closest(t).length || t.parent().find(".js-callback").slideUp();
        }));
}
function menuEvents() {
    $(".mob-humberger").on("click", function () {
        $("html").addClass("menu-open mega-menu-transition"),
            $(".ilOverlay").show(),
            $(".right-top-menu").show(),
            $("body").addClass("no-scroll"),
            $(".sub-menu-wrap").hide(),
            $(".submenu-wrap-top").hide(),
            $(".right-top-menu").find("li").removeClass("active-nav"),
            $(".menu-list").find("li").removeClass("active-nav");
    }),
        $(".menu-close, .ilOverlay").on("click", function () {
            $("html").removeClass("menu-open"),
                setTimeout(function () {
                    $("html").removeClass("mega-menu-transition");
                }, 300),
                $(".ilOverlay").hide(),
                $("body").removeClass("no-scroll");
        }),
        $(document).on("click", ".js-mob-callback", function () {
            $(".js-callback").css("display", "block"), $(".sub-menu-wrap").hide(), $(".submenu-wrap-top").hide(), $(".right-top-menu").find("li").removeClass("active-nav"), $(".menu-list").find("li").removeClass("active-nav");
        }),
        $(".callback-close").on("click", function () {
            $(".js-callback").css("display", "none");
        }),
        $(window).width() <= 991 &&
            ($(".menu-list li>a").on("click", function () {
                $(this).parent("li").siblings().removeClass("active-nav"),
                    $(this).parent("li").toggleClass("active-nav"),
                    $(this).parent("li").siblings().find(".sub-menu-wrap").slideUp(),
                    $(this).parent("li").find(".sub-menu-wrap").slideToggle(),
                    $(".submenu-wrap-top").slideUp(),
                    $(".right-top-menu").find("li").removeClass("active-nav");
                    $(this).parent("li").find('.other-list-title').addClass('show-other');
            }),

            $(".other-list-title").on("click", function () {
            
            //$(this).parents(".other-product-navlist").find(".other-product-nav").slideToggle();
             $(this).parents(".other-product-navlist").toggleClass('active-other');
            
            }),

            
            $(".right-top-menu li>a").on("click", function () {
                $(this).parent("li").siblings().removeClass("active-nav"),
                    $(this).parent("li").toggleClass("active-nav"),
                    $(this).parent("li").siblings().find(".submenu-wrap-top").slideUp(),
                    $(this).parent("li").find(".submenu-wrap-top").slideToggle(),
                    $(".sub-menu-wrap").slideUp(),
                    $(".menu-list").find("li").removeClass("active-nav");
            }),
            $(".footer-top-block h4").click(function () {
                $(this).hasClass("active-list")
                    ? $(this).removeClass("active-list").addClass("close-list")
                    : ($(".footer-top-block h4").removeClass("active-list").addClass("close-list"), $(this).addClass("active-list").removeClass("close-list")),
                    $(".footer-top-block .close-list").next("ul").slideUp(),
                    $(".footer-top-block .active-list").next("ul").slideDown();
            }));
}
function headerDetach() {
    if ($(window).width() <= 991) {
        var e = $(".nav-dth").detach();
        $(".log-dth").after(e);
    } else (e = $(".nav-dth").detach()), $(".log-dth").before(e);
    if (($(window).width() <= 991 ? ($(".nav-dth").detach(), $(".js-mob-callback").after(e)) : ($(".nav-dth").detach(), $(".js-mob-callback").before(e)), $(window).width() <= 991)) {
        var t = $(".js-rightmenu-dth").detach();
        $(".menu-list").after(t);
    } else (t = $(".js-rightmenu-dth").detach()), $(".call-wrap").after(t);
    if ($(window).width() <= 991) {
        var i = $(".view-pro").detach();
        $(".user-menu").after(i);
    } else (i = $(".view-pro").detach()), $(".login-content-block").before(i);
    if ($(window).width() <= 991) {
        var o = $(".logout-link").detach();
        $(".view-pro").after(o);
    } else (o = $(".logout-link").detach()), $(".login-para").after(o);
}
function inputFocuspre() {
    var e = $(".input-feild input");
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
function callBackevents() {
    $(document).on("click", ".js-callback-valid", function () {
        var o, n, a, s;
        $("#hdnDeviceId1").val("d1234"),
            $("#hdnIPaddress1").val("2405:204:e187:d206"),
            (null != sessionStorage.getItem("devicetype") && null != sessionStorage.getItem("devicetype") && "" != sessionStorage.getItem("devicetype")) || funsetdevicedetect(),
            $("#hdnUserAgent1").val(window.sessionStorage.getItem("devicetype").split("|")[0]),
            calbackFormvalid() &&
                ($(".il-loader").show(),
                ((s = new Object()).setFullname = "txtName"),
                (s.setMobile = "txtMobileNumber"),
                (s.setProduct = "FormDropDownList_C004"),
                (s.txtfullname = $("#callbackName").val()),
                (s.txtMobile = $("#callbackMobile").val()),
                (s.ddproduct = $("#callback-select").val()),
                (s.hdnIPaddress = $("#hdnIPaddress1").val()),
                (s.hdnDeviceId = $("#hdnDeviceId1").val()),
                (s.hdnUserAgent = $("#hdnUserAgent1").val()),
                "/CustomService/Locations/callbackSubmit",
                (o = JSON.stringify(s)),
                (n = t),
                (a = i),
                $.ajax({ url: e + "/CustomService/Locations/callbackSubmit", type: "POST", contentType: "application/json;charset=utf-8", dataType: "json", data: o, async: !1, success: n, error: a }));
    });
    var e = "";
    function t(e) {
        if ("" != jQuery.parseJSON(e.callbackSubmitResult)) {
            var t = jQuery.parseJSON(jQuery.parseJSON(e.callbackSubmitResult));
            1 == t.success ? ($("#callbackThankyou").show(), $(".call-main-wrap").hide()) : $(".il-error-com").text(t.errorMessage), $(".il-loader").hide();
        }
        return !1;
    }
    function i() {
        return $(".errorCommFP").css("display", "none"), $(".il-loader").hide(), !1;
    }
    e = "" != location.port ? "http://" + window.location.hostname + ":" + location.port : "https://" + window.location.hostname;
}
function calbackFormvalid() {
    var e = !0,
        t = $(".il-callback-name"),
        i = $(".il-callback-mobile"),
        o = $("#callback-select");
    return "" == t.val() && (showError(t), (e = !1)), regMobilecb.test(i.val()) || (showError(i), (e = !1)), "" == o.val() && (showError(o), (e = !1)), e;
}
function showLoader() {
    $(".il-loader").fadeIn(500);
}
function hideLoader() {
    $(".il-loader").fadeOut(450);
}
function funshowmoblogin() {
    $(window).width() < 992 && ($(".guest-user").hide(), $(".men-user").show());
}
function funbindLogin() {
    $("#authoriseUsr,#Span,#userName,#logoutBtn,.js-view-profile").hide(),
        $("#logTimedate").text(""),
        $("#userName").text("").hide(),
        $(".login-link").click(function () {
            // showLoginPopUp("email"),
            //     showLoginPopUp("email"),
            $("html").removeClass("menu-open"),
                setTimeout(function () {
                    $("html").removeClass("mega-menu-transition");
                }, 300),
                $(".ilOverlay").hide(),
                $("body").removeClass("no-scroll");
        });
}
function funClearsessionForNewTW() {
    doLogout();
}
function FeedbackTooggle1() {
    $(".login-link").hide(),
        funshowmoblogin(),
        $(".js-user-ico").css("display", "inline-block"),
        $(window).width() >= 992 &&
            ($(".js-user-ico").on("click", function () {
                $(this).parent().find(".login-details-wrap").slideDown();
            }),
            $(document).on("click", function (e) {
                var t = $(".login-menu");
                $(e.target).closest(t).length || t.parent().find(".login-details-wrap").slideUp();
            }));
}
function showError(e) {
    $(e).parents(".input-feild").find(".il-error").show(),
        $(e).parents(".input-textarea").find(".il-error").show(),
        $(e).parents(".input-block").find(".ui-error").show(),
        $(e).parents(".block").find(".ui-error").hide(),
        $(e).parents(".check-feild").find(".ui-error").show();
}
function hideError(e) {
    $(e).parents(".input-feild").find(".il-error").hide(),
        $(e).parents(".input-textarea").find(".il-error").hide(),
        $(e).parents(".input-block").find(".ui-error").hide(),
        $(e).parents(".block").find(".ui-error").hide(),
        $(e).parents(".check-feild").find(".ui-error").hide();
}
$(document).ready(function () {
    /******** ILTC app redirection changes ********/
    if (window.location.href.includes("inapp")) {
        localStorage.setItem("iltcapp", "true");

        $("#ppmainWrapper .btn-back, #tw_selplnbackbtn").css({
            cssText: "display: none !important",
        });
        setTimeout(function () {
            $(".bk_btn_widgt").css("display", "none");
            $("#ppmainWrapper .btn-back, .iltc-wrapper, .total_insured").css({
                cssText: "display: none !important",
            });
        }, 2000);

        $(".kyc-verify-btn").css("position", "relative");
        $(".fixed_footer").addClass("btnFix");

        $(
            ".iltc-wrapper, .il-header, .ilheaderInner, header, .iltcapp-block, .vehicle-ins-block, .sPlanHead, .travel-back-btn, .myraChatwrapp, .bk_btn_widgt, .insureddetailsWrap .insured-back, .miniHeader, .mainHomepage .orngS, footer, .il-footer, .get-sticky-angular, #ym-notification, .il-travel-landing-contentwrap, #footerLinks, .OTP-header, .total_insured, .iltc-wraper-sec, .products-code-block, .search-bg, a.bdr-link"
        ).css({
            cssText: "display: none",
        });
        $(".roadside-bg").css("background", "none");
        $(".roadside-bg").css({
            cssText: "padding-bottom: 0 !important",
        });

        $("#arogyaKyc .popup .closeBtn").attr("href", "/arogya-thank-you");

        $("#basicDetails a.bdr-link").attr("href", "/");
        $("#tw_buynowsel").css("width", "100%");

        $(".top-menu-wrap.pad-Top").css({
            cssText: "padding-top: 0",
        });
    } else if (window.location.href.includes("claim")) {
        if ($(window).width() <= 991) {
            $(".iltc-wrapper").css({
                cssText: "display: block",
            });
        }
    }

    if (localStorage.getItem("iltcapp") || sessionStorage.getItem("inapp", "true")) {
        $(
            ".iltc-wrapper, .il-header, .ilheaderInner, header, .iltcapp-block, .vehicle-ins-block, .sPlanHead, .travel-back-btn, .myraChatwrapp, .bk_btn_widgt, .insureddetailsWrap .insured-back, .miniHeader, .mainHomepage .orngS, footer, .il-footer, .get-sticky-angular, #ym-notification, .il-travel-landing-contentwrap, #footerLinks, .OTP-header, .total_insured, .iltc-wraper-sec, .products-code-block, .search-bg, a.bdr-link"
        ).css({
            cssText: "display: none",
        });
        $(".roadside-bg").css("background", "none");
        $(".roadside-bg").css({
            cssText: "padding-bottom: 0 !important",
        });

        $("#ppmainWrapper .btn-back, #tw_selplnbackbtn").css({
            cssText: "display: none !important",
        });
        setTimeout(function () {
            $(".bk_btn_widgt").css("display", "none");
            $("#ppmainWrapper .btn-back, .iltc-wrapper, .total_insured").css({
                cssText: "display: none !important",
            });
        }, 2000);

        $(".il-payment-back").css({
            cssText: "display: block",
        });
        $(".kyc-verify-btn").css("position", "relative");
        $(".fixed_footer").addClass("btnFix");
        $("#arogyaKyc .popup .closeBtn").attr("href", "/arogya-thank-you");
        $("#basicDetails a.bdr-link").attr("href", "/");
        $("#tw_buynowsel").css("width", "100%");
    }
    /******** ILTC app redirection changes ********/

    footerbottomList(),
        callBackform(),
        headerDetach(),
        megamenuHover(),
        menuEvents(),
        inputFocuspre(),
        callBackevents(),
        loginClickEvent(),
        null == window.sessionStorage.getItem("devicetype") && funsetdevicedetect(),
        $(".input-textarea textarea").on("click", function () {
            $(this).parents(".input-textarea").find(".il-error").hide();
        }),
        $(".input-feild input, .input-feild select").on("click", function () {
            $(this).parents(".input-feild").find(".il-error").hide();
        });
}),
    $(window).resize(function () {
        headerDetach();
    }),
    $(document).on("keydown", ".tel", function (e) {
        46 == e.keyCode ||
            8 == e.keyCode ||
            9 == e.keyCode ||
            27 == e.keyCode ||
            13 == e.keyCode ||
            (65 == e.keyCode && !0 === e.ctrlKey) ||
            (e.keyCode >= 35 && e.keyCode <= 39) ||
            ((e.shiftKey || ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105))) && e.preventDefault());
    }),
    $(document).on("keyup keypress", ".tel", function (e) {
        var t = $(this).val(),
            i = t.substr(t.length - 1);
        /^[0-9\.]$/.test(i) || (t.length > 0 ? $(this).val(t.substr(0, t.length - 1)) : $(this).val());
    }),
    $(document).on("keydown", ".alphaText", function (e) {
        46 == e.keyCode ||
            8 == e.keyCode ||
            9 == e.keyCode ||
            27 == e.keyCode ||
            13 == e.keyCode ||
            (65 == e.keyCode && !0 === e.ctrlKey) ||
            (e.keyCode >= 35 && e.keyCode <= 39) ||
            32 == e.keyCode ||
            (222 != e.keyCode && (e.keyCode < 65 || e.keyCode > 90) && e.preventDefault());
    }),
    $(document).on("keyup paste keypress", ".alphaText", function (e) {
        var t = $(this).val(),
            i = t.substr(t.length - 1);
        /^[A-Za-z_ ']+$/.test(i) || (t.length > 0 ? $(this).val(t.substr(0, t.length - 1)) : $(this).val());
    }),
    $(document).ready(function () {
        $("#hdnDeviceId1").val("d1234"), $("#hdnIPaddress1").val("2405:204:e187:d206");
        var e = JSON.parse(window.sessionStorage.getItem("UserDetailsData")),
            t = JSON.parse(window.sessionStorage.getItem("UserLoggedInDetail"));
        null != e && "" != e
            ? 1 == e.isguestuser
                ? funbindLogin()
                : ($("#logTimedate").text(e.LastLogin), $("#userName").text(e.UserName).show(), $("#authoriseUsr,#Span,#userName,#logoutBtn").show(), FeedbackTooggle1())
            : null != t && "" != t
            ? 1 == t.isguestuser
                ? funbindLogin()
                : ($("#logTimedate").text(t.LastLogin), $("#userName").text(t.UserName).show(), $("#authoriseUsr,#Span,#userName,#logoutBtn").show(), FeedbackTooggle1())
            : funbindLogin();
    });
var regMobilecb = /^[6-9]{1}[0-9]{9}$/;

(function () {
    function ensureAlt(img) {
        if (!img || img.hasAttribute('alt')) return;
        var src = img.getAttribute('src') || '';
        var cls = img.getAttribute('class') || '';
        var altText = '';
        if (/whatsapp/i.test(src) || /whatsapp/i.test(cls)) {
            altText = 'WhatsApp';
        } else if (/(logo|icon|sprite|decor|spacer|blank)/i.test(src + ' ' + cls)) {
            altText = '';
        } else {
            altText = 'Illustration';
        }
        img.setAttribute('alt', altText);
        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
        if ((/\\blazy\\b/i.test(cls) || img.classList.contains('lazy')) && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    }
    function ensureDimensions(img) {
        if (!img) return;
        function setDims() {
            if (!img.hasAttribute('width') && img.naturalWidth) {
                img.setAttribute('width', img.naturalWidth);
            }
            if (!img.hasAttribute('height') && img.naturalHeight) {
                img.setAttribute('height', img.naturalHeight);
            }
        }
        if (img.complete) setDims();
        else img.addEventListener('load', setDims, { once: true });
    }
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) { ensureAlt(imgs[i]); ensureDimensions(imgs[i]); }
    try {
        var links = document.getElementsByTagName('a');
        for (var li = 0; li < links.length; li++) {
            var a = links[li];
            var href = (a.getAttribute('href') || '').toLowerCase();
            var txt = (a.textContent || '').trim().toLowerCase();
            if (href.indexOf('/motor-insurance-claims') !== -1 && txt === 'here') {
                a.textContent = 'Motor Insurance Claims';
            }
            if (!href || href === '' || href === '#' || href.indexOf('javascript:') === 0) {
                if ((a.id || '').toLowerCase() === 'whatreg') {
                    a.setAttribute('href', '#understand-reg-no');
                } else if (a.getAttribute('data-anchor')) {
                    a.setAttribute('href', '#' + a.getAttribute('data-anchor'));
                } else {
                    a.setAttribute('href', '#');
                    a.setAttribute('role', 'button');
                }
            }
        }
    } catch (e) {}
    if (window.MutationObserver) {
        var observer = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];
                if (m.type === 'childList') {
                    for (var j = 0; j < m.addedNodes.length; j++) {
                        var n = m.addedNodes[j];
                        if (n.nodeType === 1) {
                            if (n.tagName === 'IMG') { ensureAlt(n); ensureDimensions(n); }
                            var nested = n.querySelectorAll && n.querySelectorAll('img');
                            if (nested) for (var k = 0; k < nested.length; k++) { ensureAlt(nested[k]); ensureDimensions(nested[k]); }
                            var anchors = n.tagName === 'A' ? [n] : (n.querySelectorAll && n.querySelectorAll('a')) || [];
                            for (var ai = 0; ai < anchors.length; ai++) {
                                var an = anchors[ai];
                                var href = (an.getAttribute('href') || '').toLowerCase();
                                var txt = (an.textContent || '').trim().toLowerCase();
                                if (href.indexOf('/motor-insurance-claims') !== -1 && txt === 'here') {
                                    an.textContent = 'Motor Insurance Claims';
                                }
                                if (!href || href === '' || href === '#' || href.indexOf('javascript:') === 0) {
                                    if ((an.id || '').toLowerCase() === 'whatreg') {
                                        an.setAttribute('href', '#understand-reg-no');
                                    } else if (an.getAttribute('data-anchor')) {
                                        an.setAttribute('href', '#' + an.getAttribute('data-anchor'));
                                    } else {
                                        an.setAttribute('href', '#');
                                        an.setAttribute('role', 'button');
                                    }
                                }
                            }
                        }
                    }
                } else if (m.type === 'attributes' && m.target && m.target.tagName === 'IMG') {
                    ensureAlt(m.target); ensureDimensions(m.target);
                }
            }
        });
        observer.observe(document.documentElement || document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src', 'class']
        });
    }
})();

