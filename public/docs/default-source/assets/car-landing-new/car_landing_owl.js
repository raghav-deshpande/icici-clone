$(document).ready(function(){
    $(document).on("click", ".vMore", function (e) {
        var $par = $(this).parents(".tw-para-detach");
        var $par2 = $(this).parents(".view-more-content");
        var $this = $(this);
        // $(".paraHide").hide();
        $(this).removeClass("vLess").html("View more");
        $this.addClass("vLess").html("View less");
        $par.find(".paraHide").show();
        $par2.find(".paraHide").show();
        e.preventDefault();
    });

    $(document).on("click", ".vMore.vLess", function (e) {
        var $par = $(this).parents(".tw-para-detach");
        var $par2 = $(this).parents(".view-more-content");
        var $this = $(this);
        $this.removeClass("vLess").html("View more");
        $par.find(".paraHide").hide();
        $par2.find(".paraHide").hide();
        e.preventDefault();
    });
});

$("#moreQuote").click(function () {
    if ($(window).width() < 767) {
        $(".more-quotes-wrapper").addClass("animate__animated animate__shakeX");
    }
    setTimeout(function () {
        $(".more-quotes-wrapper").removeClass("animate__animated animate__shakeX");
    }, 2500);
});


$(document).ready(function () {

    if ($(window).width() <= 767) {

        if ($.isFunction($.fn.owlCarousel)){
            window.scrollTo(0, 80);
            $("#how_to_choose_right_ins").owlCarousel({
                loop: false,
                margin: 20,
                nav: false,
                dots: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    767: {
                        items: 1,
                    },
                },
            });

        }
            
    }else {

            if ($.isFunction($.fn.owlCarousel))
            $("#how_to_choose_right_ins").owlCarousel("destroy");
    }


    if ($.isFunction($.fn.owlCarousel)){

        $("#pkg_policy_slider").owlCarousel({
            loop: false,
            dots: false,
            margin: 20,
            nav: true,
            items: 1,
            responsive: {
                0: {
                    nav: false,
                    dots: true,
                },
                992: {
                    nav: true,
                    dots: false,
                },
            },
        });

    }


});


$(document).ready(function () {
    $(".btn_click").click(function () {
        $(".ui-error-new").show();
    });

    $(".Numeric").keyup(function () {
        $(".ui-error-new").hide();
    });
});
$(document).ready(function () {
    $(".vehicle-regno").keyup(removeextraAlphanumeric).blur(removeextraAlphanumeric);
    $(document).on("keyup blur", ".vehicle-regno", removeextraAlphanumeric);

    /*alpha numeric*/
    $(document).on("keyup keypress", ".vehicle-regno", function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }

        e.preventDefault();
        return false;
    });

    /*alpha numeric*/

    //$('.wit-popuplink').hide();

    $("#register-vehile")
        .focus(function () {
            $(this).attr("placeholder", "Eg: MH 01 A1234");
            $(".wit-popuplink").addClass("whtLink");
            $(".wit-popuplink").show();
        })
        .blur(function () {
            //$('.wit-popuplink').removeClass('test');
            $("#register-vehile").attr("placeholder", "");
        });

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

    

    $(document).on("click", ".rMore", function (e) {
        var owl_stage_all = $(this).parents(".view-more-content").parents(".owl-stage");
        var $this = $(this);
        $(".paraHide").hide();
        // $(this).removeClass("vLess").html("Read more");
        $(owl_stage_all).children(".owl-item").find(".rMore").addClass("rLess").html("Read less");
        $(owl_stage_all).children(".owl-item").find(".paraHide").show();
        $(owl_stage_all).children(".owl-item").css("min-height", "958.64px");
        // $par2.find(".paraHide").show();
        e.preventDefault();
    });

    $(document).on("click", ".rMore.rLess", function (e) {
        var owl_stage_all = $(this).parents(".view-more-content").parents(".owl-stage");
        var $this = $(this);
        $(owl_stage_all).children(".owl-item").find(".rMore").removeClass("rLess").html("Read more");
        $(owl_stage_all).children(".owl-item").find(".paraHide").hide();
        $(owl_stage_all).children(".owl-item").css("min-height", "463.64px");
        // $par2.find(".paraHide").hide();
        e.preventDefault();
    });
});

function removeextraAlphanumeric() {
    var initVal = $(this).val();
    outputVal = initVal.replace(/[^0-9a-zA-Z]/g, "");
    if (initVal != outputVal) {
        $(this).val(outputVal);
    }
}

$(window).on("load", function () {
    setTimeout(function () {
        $(".input-block input[type=text], .input-block input[type=tel]").each(function () {
            var text_value = $(this).val();
            if (text_value != "") {
                $(this).parents(".input-block").addClass("focus");
            }
        });
    }, 500);

    setTimeout(function () {
        $('.js-veh-block input[type="text"]').blur(function () {
            if (!$(this).val()) {
                $(".wit-popuplink").show();
            } else {
                $(".wit-popuplink").hide();
            }
        });
    }, 500);
});

$(document).ready(function () {
    $(".input-block input").on("keypress", function () {
        $(this).parents(".input-block").find(".ui-error").hide();
    });

    $(".ui-error").hide();

    $(window).on("load", function () {
        setTimeout(function () {
            $(".input-block input[type=text], .input-block input[type=email]").each(function () {
                var text_value = $(this).val();

                if (text_value != "") {
                    $(this).parents(".input-block").addClass("focus");
                }
            });
        }, 500);
    });
});

$(document).ready(function () {
    $(".ui-form-block input:checkbox").keypress(function (e) {
        e.preventDefault();
        if ((e.keyCode ? e.keyCode : e.which) == 13) {
            $(this).trigger("click");
        }
        setTimeout(function () {
            $("#whtasapp-pop-close").focus();
        }, 500);
    });
});
