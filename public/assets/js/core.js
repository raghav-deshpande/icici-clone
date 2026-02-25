//core 1.1 api JS

//var IsCallCenterFlow = true; //true for call center

//if (window.location.host == "ipartneruiuxsync.icicilombard.com" || window.location.host == "www.icicilombard.com") {
//    IsCallCenterFlow = false;
//}


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) { 
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var corelibrary = (function () {
    const ABK1 = '7083';
    const ABK2 = '8080';
    const ABK3 = '8080';
    const ABK4 = '8080';

    const ABI1 = '9083';
    const ABI2 = '8080';
    const ABI3 = '8080';
    const ABI4 = '8080';
    var coreobject = {};
    var resources = {};
    resources.authTokenIdentifier = 'AuthorizationToken';
    resources.CCAuthTokeIdentifier = "CallCenterUser";
    resources.LoginType = "LoginType";
    resources.TokenExpiry = "TokenExpiry";
    resources.UtmSrc = 'utm_source';
    resources.UtmMedium = 'utm_medium';
    resources.UtmCampaign = 'utm_campaign';
    resources.UtmKeyword = 'utm_keyword';
    resources.GclId = 'gclid';
    resources.EfId = 'ef_id';
    resources.ClientIPAddress = 'clientipaddress';
    resources.DeviceId = 'clientdeviceid';
    resources.ClientIP = 'ie/ios';
    resources.SID = 'SID';
    resources.Version = 'version'



    var QuoteIDKey = "QuoteId";
    var QuoteIDKey1 = "QuoteId1";
    var QuoteIDKey2 = "QuoteId2";
    var QuoteIDKey3 = "QuoteId3";
    var PPQuoteIDKey = "PPQuoteId";
    var corelationIdentifier = "Corelationid";
    
    

    const keyString = ABK1.slice(0, 2) + ABK2 + ABK3 + ABK4 + ABK1.slice(2, 4);
    const ivString = ABI1.slice(0, 2) + ABI2 + ABI3 + ABI4 + ABI1.slice(2, 4);

    const key = CryptoJS.enc.Utf8.parse(keyString);
    const iv = CryptoJS.enc.Utf8.parse(ivString);

    //var baseurl = "http://localhost:49116/IpartnerServices/v1/api/";

    var baseurl = "/IpartnerService/core/api/";
    var baseurlforCore2 = "/echannelServices/api/";
    var baseurlforWyn = $('#hdnWynApiDomain').val();
    var baseurlforoldUI = "/ipartner_web/api/"; //Added by Sudhi for HB 
    var baseurlformicro = "/digital/v2.0/";

    //var baseurl = "https://ipdigiuatuiux.icicilombard.com:9004/IpartnerService/core/api/";
    //var baseurl = "http://localhost:41110/core/api/";
    //var baseurlforoldUI = "https://ipdigiuatuiux.icicilombard.com:9002/ipartner_web/api/"; //Added by Sudhi for HB 

    coreobject.LogJserro = function (Message, Description, StackTrace, Url, Line, JsFile, Extra1, Extra2) {

        try {
            Extra2 = window.location.href;
            var SQuoteReplace = /'/gi;

            if (Message != '')
                Message = Message.replace(SQuoteReplace, '');

            if (Description != '')
                Description = Description.replace(SQuoteReplace, '');

            if (StackTrace != '')
                StackTrace = StackTrace.replace(SQuoteReplace, '');

            var request = {
                "Message": Message,
                "Description": Description,
                "StackTrace": StackTrace,
                "Url": Url,
                "Line": Line,
                "JsFile": JsFile,
                "Extra2": Extra2
            };

            var Core2domainUrl = baseurlforCore2 + "auth/JS_Loging";
            $.ajax({
                url: Core2domainUrl,
                type: "POST",
                data: JSON.stringify(request),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function (data, textStatus, jqXHR) {
                    //data - response from server
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
        catch (ex) { }
    };

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    coreobject.corelationId = function () {
        var corel = window.sessionStorage.getItem(corelationIdentifier);
        if (corel === null || corel === "undefined") {
            corel = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            window.sessionStorage.setItem(corelationIdentifier, corel);
        }
        return corel;
    };

    coreobject.getClientIPAddress = function () {

        var ip = "2405:204:e187:d206";
        return ip;

        //if (window.sessionStorage.getItem(resources.ClientIPAddress) == null) {
        //    window.sessionStorage.setItem(resources.ClientIPAddress, "ie/ios")
        //}
        //return window.sessionStorage.getItem(resources.ClientIPAddress);
    };

    coreobject.getDeviceIdAddress = function () {
        var deviceId = window.sessionStorage.getItem("deviceId");
        if (deviceId == undefined || deviceId == null || deviceId == "")
            deviceId = "d1234";
        return deviceId;
    };

    coreobject.getVersion = function () {

        var version = "v6.1";
        return version;
    };

    coreobject.getNewVersion = function () {

        var newVersion = "v6.1.1";
        return newVersion;
    };

    coreobject.getPBK = function () {

        var key = "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqJB60iVd+Thl+P5+Ore0abr7Ae+ANK+9jCj7UbYyXNSIbP6g3QMd4LhAAojln4VZRgpSBKjZ8YBc1yGgb516BOzfOBeqN4WtwN764UwFCyMaF0nA50BnjcMfGKLPvmhAbeRtaG06GtLhbAS9z57NQdEXivHzlRZJehzf7IHcpIUUDXKcaXe2/dHkAGk2zLhdrY9VErAxVj1g39qMNSvAJlrVT+heuR3MWwdle9KNgVFgg7AXybBhorb9GIuMsQS6UTxA/HIvSZUqAetDRfgGhTCss9Kq6EqJV92u4AiOIngstIOA3seLWx48N4xR0jfmZZElwlJIHeedgWxDsEN4/wIDAQAB-----END PUBLIC KEY-----";
        return key;
    };

    coreobject.getUserIP = function (onNewIP) { //  onNewIp - your listener function for new IPs
        //compatibility for firefox and chrome
        window.sessionStorage.setItem("clientipaddress", "ie/ios");
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

        if (myPeerConnection == null) {

            resources.ClientIP = "ie/ios";
            if (coreobject.getClientIPAddress() == "null" || coreobject.getClientIPAddress() == undefined || coreobject.getClientIPAddress() == "" || coreobject.getClientIPAddress() == null)
                window.sessionStorage.setItem("clientipaddress", resources.ClientIP);

            return "ie/ios";
        }

        var pc = new myPeerConnection({
            iceServers: []
        }),
            noop = function () { },
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;

        function iterateIP(ip) {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
        }

        //create a bogus data channel
        if (pc != undefined && pc != null && pc.createDataChannel != undefined)
            pc.createDataChannel("");

        // create offer and set local description
        pc.createOffer().then(function (sdp) {
            sdp.sdp.split('\n').forEach(function (line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }).catch(function (reason) {
            // An error occurred, so handle the failure to connect
        });

        //listen for candidate events
        pc.onicecandidate = function (ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) {
                if (window.sessionStorage.getItem("clientipaddress") == null) {
                    window.sessionStorage.setItem("clientipaddress", "ie/ios");
                }
                return;
            }
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    };

    coreobject.getUserIP(function (ip) {
        //alert("Got IP! :" + ip);

        if (ip == 0 || ip == null || ip == undefined || ip == "" || ip == "null" || ip == "undefined") {
            resources.ClientIP = 'ie/ios';
        }
        else {
            resources.ClientIP = ip;
        }

        if (coreobject.getClientIPAddress() == "ie/ios" || coreobject.getClientIPAddress() == undefined || coreobject.getClientIPAddress() == "" || coreobject.getClientIPAddress() == "null")
            window.sessionStorage.setItem("clientipaddress", resources.ClientIP);

    });

    coreobject.getEncryptedPassword = function (input) {

        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted.toString();
    };
    coreobject.getDecryptedPassword = function (input) {
        var decrypt = CryptoJS.AES.decrypt(input, key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);
        return decrypt.toString();
    };

    coreobject.getEncryptedBody = function (input, kv) {
        input = JSON.stringify(input);
        if (kv != undefined && kv != null && kv != "") {
            let kvq = kv.substring(0, 16);
            let ivq = kv.substring(16, 32);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), CryptoJS.enc.Utf8.parse(kvq),
                {
                    keySize: 128 / 8,
                    iv: CryptoJS.enc.Utf8.parse(ivq),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
        }

        //return "e01" + encrypted;
        return JSON.stringify(new EncryptedKvUIModel("e01" + encrypted));
    };

    /*// request Model
    class EncryptedRequestUIModel {
        constructor(requests) {
            this.requests = requests;
        }
    };*/

    // request Model
    class EncryptedKvUIModel {
        constructor(msg) {
            this.msg = msg;
        }
    };

    coreobject.KV = function () {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
    };

    coreobject.createEncryptedKV = function (kv) {
        var publicKey = coreobject.getPBK();

        var encryptor = new JSEncrypt({ default_key_size: "2048" });
        encryptor.setPublicKey(publicKey);

        var ciphertext = encryptor.encrypt(kv);
        return ciphertext.toString();
    }



    coreobject.GetuniqueNumber = function (length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)).toString();
    }




    coreobject.getClientId = function () {
        return window.sessionStorage.getItem("clientId");
    };

    coreobject.getApiBinding = function () {

        var d = new Date().toISOString();

        d = d.split(".")[0] + "Z";

        var input = coreobject.getClientId() + "|" + d;

        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted;
    };

    coreobject.clearSession = function () {
        window.sessionStorage.removeItem(corelationIdentifier);
        window.sessionStorage.removeItem(QuoteIDKey);
        window.sessionStorage.removeItem(QuoteIDKey1);
        window.sessionStorage.removeItem(QuoteIDKey2);
        window.sessionStorage.removeItem(QuoteIDKey3);
        window.sessionStorage.removeItem(PPQuoteIDKey);
        window.sessionStorage.removeItem("PolicyId");
        window.sessionStorage.removeItem('GA_IsValid');
        window.sessionStorage.removeItem('IsOEMPolicy');
        window.sessionStorage.removeItem('IPartnerQuoteId');
        window.sessionStorage.removeItem('RNhealthUIData');
        for (var key in window.sessionStorage) {
            if (key.indexOf("QuoteId") == 0) {
                window.sessionStorage.removeItem(key);
            }
        }
    };

    coreobject.IsAuthTokenExpired = function () {
        var authToken = window.sessionStorage.getItem(resources.authTokenIdentifier);
        if (authToken != null && authToken != "") {
            var TokenExpiry = window.sessionStorage.getItem(resources.TokenExpiry);
            var tokenExpiryDateTime = new Date(TokenExpiry);
            var currentDateTime = new Date();
            var ret = 60 * 1000; //in minute
            ret = (tokenExpiryDateTime - currentDateTime) / ret;
            if (ret < 2 && ret > 0) { return "GetRefreshToken"; }
            else if (ret < 0) { return "GetAuthToken"; }
            else { return "NotExpired"; }
        }
        else { return "GetAuthToken"; }
    };

    coreobject.setAuthorizationToken = function (ret) {
        if (ret == "GetAuthToken") {
            return new Promise(function (resolve, reject) {
                var page = window.location.href;
                var domainType = page.split("/")[2].split(".");
                var IPartnerInfo = corelibrary.GetParameterValues("IPartnerInfo");
                //if (domainType[0].toLowerCase() == "ipartnercc" && IPartnerInfo == null) {
                //    resolve(coreobject.generateTempCCAuthToken());
                //}
                //else
                resolve(coreobject.generateAuthToken());
            });
        }
        else if (ret == "GetRefreshToken") {
            return new Promise(function (resolve, reject) {
                resolve(corelibrary.MakePostCallForAuthToken2("auth-api/client/token/refresh", ""));
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                resolve("NotExpired");
            });
        }
    };

    coreobject.MakeGetCall = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    //window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);
                    window.sessionStorage.setItem("isProposalOTPAuth", response.isProposalOTPAuth);


                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }

                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {
                $.support.cors = true;
                var retVal = $.ajax({
                    type: "GET",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'SID': coreobject.getSId(),
                        'ApiBinding': coreobject.getApiBinding()
                    },
                    url: baseurl + url,
                    async: true,
                    datatype: "json",
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        },
                        307: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/Downtime/") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/Downtime";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };

    coreobject.MakePostCall_FormData = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    //window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);
                    window.sessionStorage.setItem("kv", response.kv);

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    if (ret == "GetJWTToken") { window.sessionStorage.setItem(resources.LoginType, "User"); }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {
                $.support.cors = true;
                var retVal = $.ajax({
                    type: "POST",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'ApiBinding': coreobject.getApiBinding(),
                        'SID': coreobject.getSId(),
                        'Kv': window.sessionStorage.getItem('kv')
                    },
                    url: baseurl + url,
                    data: data,
                    processData: false,
                    contentType: false,
                    async: false,
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };

    coreobject.MakePostCall = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    //window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);
                    window.sessionStorage.setItem("isProposalOTPAuth", response.isProposalOTPAuth);
                    window.sessionStorage.setItem("kv", response.kv);

                    //Handle Quote not found error
                    var isWeblink = window.sessionStorage.getItem("weblink");
                    if (isWeblink) {
                        response.isGuestUser ? window.sessionStorage.setItem("LoginType", "App") : window.sessionStorage.setItem("LoginType", "User");
                        window.sessionStorage.removeItem("weblink");
                    }

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {
                var kvr = coreobject.KV();
                var KV = coreobject.createEncryptedKV(kvr);

                data = coreobject.getEncryptedBody(data, kvr);

                $.support.cors = true;
                var retVal = $.ajax({
                    type: "POST",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'SID': coreobject.getSId(),
                        'ApiBinding': coreobject.getApiBinding(),
                        'Kv': KV,
                        //'version': coreobject.getVersion(),
                        'Version': coreobject.getNewVersion()
                    },
                    url: baseurl + url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    datatype: "json",
                    datatype: "json",
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };
    coreobject.MakePostCallVCX = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    window.sessionStorage.setItem("clientId", response.clientId);

                    window.sessionStorage.setItem("kv", response.kv);

                    //Handle Quote not found error
                    var isWeblink = window.sessionStorage.getItem("weblink");
                    if (isWeblink) {
                        response.isGuestUser ? window.sessionStorage.setItem("LoginType", "App") : window.sessionStorage.setItem("LoginType", "User");
                        window.sessionStorage.removeItem("weblink");
                    }

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {
                var kvr = coreobject.GetuniqueNumber(16) + coreobject.GetuniqueNumber(16);

                data = coreobject.getEncryptedBody(data, kvr);

                $.support.cors = true;
                var retVal = $.ajax({
                    type: "POST",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'ApiBinding': coreobject.getApiBinding(),
                        'Kv': kvr
                    },
                    //url: "https://echannel-wf.icicilombard.com/digital/v2.0/integration-api/videocalling/checkagntavailability",//baseurl + url,
                    url: url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    datatype: "json"
                });
                resolve(retVal);
            });
        });
    };
    coreobject.MakeGetCallForCore2 = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    //window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);
                    window.sessionStorage.setItem("isProposalOTPAuth", response.isProposalOTPAuth);

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {
                $.support.cors = true;
                var retVal = $.ajax({
                    type: "GET",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'SID': coreobject.getSId(),
                        'ApiBinding': coreobject.getApiBinding()
                    },
                    url: baseurlforCore2 + url,
                    async: true,
                    datatype: "json",
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1 && _location_href.indexOf("/cc-dashboard") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };

    coreobject.MakeGetCallForMicro = function (url) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);
                    window.sessionStorage.setItem("isProposalOTPAuth", response.isProposalOTPAuth);
                    //corelibrary.parseJwtToken(response.Passcode);

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {
                $.support.cors = true;
                var retVal = $.ajax({
                    type: "GET",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'SID': coreobject.getSId(),
                        'ApiBinding': coreobject.getApiBinding()
                    },
                    url: baseurlformicro + url,
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    datatype: "json",
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1 && _location_href.indexOf("/cc-dashboard") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        },
                        307: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/Downtime/") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/Downtime";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };


    coreobject.MakePostCallForCore2 = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    //window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);
                    window.sessionStorage.setItem("isProposalOTPAuth", response.isProposalOTPAuth);
                    window.sessionStorage.setItem("kv", response.kv);

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {

                var kvr = coreobject.KV();
                var KV = coreobject.createEncryptedKV(kvr);

                data = coreobject.getEncryptedBody(data, kvr);

                $.support.cors = true;
                var retVal = $.ajax({
                    type: "POST",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'SID': coreobject.getSId(),
                        'ApiBinding': coreobject.getApiBinding(),
                        'Kv': KV,
                        //'version': coreobject.getVersion()
                        'Version': coreobject.getNewVersion()
                    },
                    url: baseurlforCore2 + url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    datatype: "json",
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1 && _location_href.indexOf("/cc-dashboard") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };

    coreobject.MakePostCallForMicro = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);
                    window.sessionStorage.setItem("isProposalOTPAuth", response.isProposalOTPAuth);
                    window.sessionStorage.setItem("kv", response.kv);
                    //corelibrary.parseJwtToken(response.Passcode);

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                }
            }).then(function () {

                var kvr = coreobject.KV();
                var KV = coreobject.createEncryptedKV(kvr);

                data = coreobject.getEncryptedBody(data, kvr);

                $.support.cors = true;
                var retVal = $.ajax({
                    type: "POST",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),//adding utmkeyword in header
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'SID': coreobject.getSId(),
                        'ApiBinding': coreobject.getApiBinding(),
                        'Kv': KV,
                        //'version': coreobject.getVersion()
                        'Version': coreobject.getNewVersion()
                    },
                    url: baseurlformicro + url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    datatype: "json",
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1 && _location_href.indexOf("/cc-dashboard") <= -1)) {
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                window.location.href = "/?sessionexpired=t";
                            }
                        },
                        307: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/Downtime/") <= -1)) {
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                window.location.href = "/Downtime";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };

    coreobject.MakePostCallForWyn = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.authToken);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.tokenExpiry));
                    window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);

                    window.sessionStorage.setItem("kv", response.kv);

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    if (ret == "GetJWTToken") { window.sessionStorage.setItem(resources.LoginType, "User"); }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {
                $.support.cors = true;
                var retVal = $.ajax({
                    type: "POST",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'ApiBinding': coreobject.getApiBinding(),
                        'SID': coreobject.getSId(),
                        'Kv': window.sessionStorage.getItem('kv')
                    },
                    url: baseurlformicro + url,
                    data: data,
                    processData: false,
                    contentType: false,
                    async: true,
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };

    coreobject.MakePostCall_FormDataMicro = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);
                    window.sessionStorage.setItem("kv", response.kv);
                    //corelibrary.parseJwtToken(response.Passcode);

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    if (ret == "GetJWTToken") { window.sessionStorage.setItem(resources.LoginType, "User"); }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {
                $.support.cors = true;
                var retVal = $.ajax({
                    type: "POST",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'ApiBinding': coreobject.getApiBinding(),
                        'SID': coreobject.getSId(),
                        'Kv': window.sessionStorage.getItem('kv')
                    },
                    url: baseurlformicro + url,
                    data: data,
                    processData: false,
                    contentType: false,
                    async: true,
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };

    coreobject.MakePostCallForWyn = function (url, data) {

        return new Promise(function (resolve, reject) {

            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    /*window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("SID", response.sid);

                    window.sessionStorage.setItem("kv", response.kv);*/

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        //UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.LastLogin;
                        /*UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;*/
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                    //if (ret == "GetAuthToken") { window.sessionStorage.setItem(resources.LoginType, "App"); }
                }
            }).then(function () {

                var kvr = coreobject.GetuniqueNumber(16) + coreobject.GetuniqueNumber(16);

                data = coreobject.getEncryptedBody(data, kvr);

                $.support.cors = true;
                var retVal = $.ajax({
                    type: "POST",
                    crossDomain: true,
                    headers: {
                        'Authorization': coreobject.getAuthToken(),
                        'CorelationId': coreobject.corelationId(),
                        'UtmSrc': coreobject.getUtmSrc(),
                        'UtmMedium': coreobject.getUtmMedium(),
                        'UtmCampaign': coreobject.getUtmCampaign(),
                        'UtmKeyword': coreobject.getUtmKeyword(),
                        'GclId': coreobject.getGclId(),
                        'EfId': coreobject.getEfId(),
                        'ClientIPAddress': coreobject.getClientIPAddress(),
                        'DeviceId': coreobject.getDeviceIdAddress(),
                        'SID': coreobject.getSId(),
                        'ApiBinding': coreobject.getApiBinding(),
                        'Kv': kvr
                    },
                    url: baseurlforWyn + url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    datatype: "json",
                    statusCode: {
                        403: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1 && _location_href.indexOf("/cc-dashboard") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/?sessionexpired=t";
                            }
                        },
                        307: function () {
                            var _location_href = window.location.href.toLowerCase();
                            if (_location_href != null && (_location_href.indexOf("/Downtime/") <= -1)) {
                                sessionStorage.removeItem("UserDetailsData");
                                sessionStorage.removeItem("AuthorizationToken");
                                sessionStorage.removeItem("TokenExpiry");
                                sessionStorage.removeItem("LoginType");
                                window.location.href = "/Downtime";
                            }
                        }
                    }
                });
                resolve(retVal);
            });
        });
    };

    //coreobject.MakePostCallForAuthToken = function (url, data) {

    //    return __awaiter(this, void 0, void 0, function () {

    //        var retVal;
    //        return __generator(this, function (_a) {
    //            switch (_a.label) {
    //                case 0: return [4 /*yield*/, getDeviceId()];
    //                case 1:
    //                    a = _a.sent();
    //                    _a.label = 2;
    //                case 2:
    //                    if (!(coreobject.getDeviceIdAddress() == null || coreobject.getDeviceIdAddress() == "")) return [3 /*break*/, 4];
    //                    return [4 /*yield*/, getDeviceId()];
    //                case 3:
    //                    a = _a.sent();
    //                    return [3 /*break*/, 2];
    //                case 4:
    //                    $.support.cors = true;
    //                    retVal = $.ajax({
    //                        type: "POST",
    //                        crossDomain: true,
    //                        headers: {
    //                            'Authorization': coreobject.getAuthToken(),
    //                            'CorelationId': coreobject.corelationId(),
    //                            'UtmSrc': coreobject.getUtmSrc(),
    //                            'UtmMedium': coreobject.getUtmMedium(),
    //                            'UtmCampaign': coreobject.getUtmCampaign(),
    //                            'ClientIPAddress': coreobject.getClientIPAddress(),
    //                            'DeviceId': coreobject.getDeviceIdAddress(),
    //                            'ApiBinding': coreobject.getApiBinding(),
    //                            'GclId': coreobject.getGclId(),
    //                            'EfId': coreobject.getEfId()
    //                        },
    //                        url: baseurlforCore2 + url,
    //                        data: JSON.stringify(data),
    //                        contentType: "application/json; charset=utf-8",
    //                        async: false,
    //                        datatype: "json"
    //                    });
    //                    return [2 /*return*/, Promise.resolve(retVal)];
    //            }
    //        });

    //    });
    //};

    coreobject.MakePostCallForAuthToken = function (url, data) {

        //await getDeviceId();
        var kvr = coreobject.KV();
        var KV = coreobject.createEncryptedKV(kvr);

        data = coreobject.getEncryptedBody(data, kvr);
        $.support.cors = true;
        var retVal = $.ajax({
            type: "POST",
            crossDomain: true,
            headers: {
                'Authorization': coreobject.getAuthToken(),
                'CorelationId': coreobject.corelationId(),
                'UtmSrc': coreobject.getUtmSrc(),
                'UtmMedium': coreobject.getUtmMedium(),
                'UtmCampaign': coreobject.getUtmCampaign(),
                'UtmKeyword': coreobject.getUtmKeyword(),
                'GclId': coreobject.getGclId(),
                'EfId': coreobject.getEfId(),
                'ClientIPAddress': coreobject.getClientIPAddress(),
                'DeviceId': coreobject.getDeviceIdAddress(),
                'SID': coreobject.getSId(),
                'ApiBinding': coreobject.getApiBinding(),
                'Kv': KV,
                'Version': coreobject.getNewVersion()
            },
            url: baseurlforCore2 + url,
            data: data,
            contentType: "application/json; charset=utf-8",
            async: false,
            datatype: "json",
            statusCode: {
                403: function () {
                    var _location_href = window.location.href.toLowerCase();
                    if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1 && _location_href.indexOf("/cc-dashboard") <= -1)) {
                        sessionStorage.removeItem("UserDetailsData");
                        sessionStorage.removeItem("AuthorizationToken");
                        sessionStorage.removeItem("TokenExpiry");
                        sessionStorage.removeItem("LoginType");
                        window.location.href = "/?sessionexpired=t";
                    }
                }
            }
        });
        return Promise.resolve(retVal);
    };

    coreobject.MakePostCallForAuthToken2 = function (url, data) {

        //await getDeviceId();
        var kvr = coreobject.KV();
        var KV = coreobject.createEncryptedKV(kvr);

        data = coreobject.getEncryptedBody(data, kvr);
        $.support.cors = true;
        var retVal = $.ajax({
            type: "POST",
            crossDomain: true,
            headers: {
                'Authorization': coreobject.getAuthToken(),
                'CorelationId': coreobject.corelationId(),
                'UtmSrc': coreobject.getUtmSrc(),
                'UtmMedium': coreobject.getUtmMedium(),
                'UtmCampaign': coreobject.getUtmCampaign(),
                'UtmKeyword': coreobject.getUtmKeyword(),
                'GclId': coreobject.getGclId(),
                'EfId': coreobject.getEfId(),
                'ClientIPAddress': coreobject.getClientIPAddress(),
                'DeviceId': coreobject.getDeviceIdAddress(),
                'SID': coreobject.getSId(),
                'ApiBinding': coreobject.getApiBinding(),
                'Kv': KV,
                'Version': coreobject.getNewVersion()
            },
            url: baseurlformicro + url,
            data: data,
            contentType: "application/json; charset=utf-8",
            async: false,
            datatype: "json",
            statusCode: {
                403: function () {
                    var _location_href = window.location.href.toLowerCase();
                    if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1 && _location_href.indexOf("/cc-dashboard") <= -1)) {
                        sessionStorage.removeItem("UserDetailsData");
                        sessionStorage.removeItem("AuthorizationToken");
                        sessionStorage.removeItem("TokenExpiry");
                        sessionStorage.removeItem("LoginType");
                        window.location.href = "/?sessionexpired=t";
                    }
                }
            }
        });
        return Promise.resolve(retVal);
    };


    coreobject.MakeGetCallForCore2_2 = function (url) {

        //await getDeviceId(); MakeGetCallForCore2_2 //kk

        $.support.cors = true;
        var retVal = $.ajax({
            type: "GET",
            crossDomain: true,
            headers: {
                'Authorization': coreobject.getAuthToken(),
                'CorelationId': coreobject.corelationId(),
                'UtmSrc': coreobject.getUtmSrc(),
                'UtmMedium': coreobject.getUtmMedium(),
                'UtmCampaign': coreobject.getUtmCampaign(),
                'UtmKeyword': coreobject.getUtmKeyword(),
                'GclId': coreobject.getGclId(),
                'EfId': coreobject.getEfId(),
                'ClientIPAddress': coreobject.getClientIPAddress(),
                'DeviceId': coreobject.getDeviceIdAddress(),
                'SID': coreobject.getSId(),
                'ApiBinding': coreobject.getApiBinding()
            },
            url: baseurlforCore2 + url,
            contentType: "application/json; charset=utf-8",
            async: false,
            datatype: "json",
            statusCode: {
                403: function () {
                    var _location_href = window.location.href.toLowerCase();
                    if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                        sessionStorage.removeItem("UserDetailsData");
                        sessionStorage.removeItem("AuthorizationToken");
                        sessionStorage.removeItem("TokenExpiry");
                        sessionStorage.removeItem("LoginType");
                        window.location.href = "/?sessionexpired=t";
                    }
                }
            }
        });
        return Promise.resolve(retVal);
    };

    coreobject.MakeSyncGetCall = function (url) {

        $.support.cors = true;
        var retVal = $.ajax({
            type: "GET",
            crossDomain: true,
            headers: {
                'Authorization': coreobject.getAuthToken(),
                'CorelationId': coreobject.corelationId(),
                'UtmSrc': coreobject.getUtmSrc(),
                'UtmMedium': coreobject.getUtmMedium(),
                'UtmCampaign': coreobject.getUtmCampaign(),
                'UtmKeyword': coreobject.getUtmKeyword(),
                'GclId': coreobject.getGclId(),
                'EfId': coreobject.getEfId(),
                'ClientIPAddress': coreobject.getClientIPAddress(),
                'DeviceId': coreobject.getDeviceIdAddress(),
                'SID': coreobject.getSId(),
                'ApiBinding': coreobject.getApiBinding()
            },
            url: baseurl + url,
            contentType: "application/json; charset=utf-8",
            async: false,
            datatype: "json",
            statusCode: {
                403: function () {
                    var _location_href = window.location.href.toLowerCase();
                    if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                        sessionStorage.removeItem("UserDetailsData");
                        sessionStorage.removeItem("AuthorizationToken");
                        sessionStorage.removeItem("TokenExpiry");
                        sessionStorage.removeItem("LoginType");
                        window.location.href = "/?sessionexpired=t";
                    }
                }
            }
        });
        return Promise.resolve(retVal);
    };

    //Added by Sudhi for HB start
    coreobject.MakePostCallforOldUI = function (url, data) {
        $.support.cors = true;
        var kvr = coreobject.KV();
        var KV = coreobject.createEncryptedKV(kvr);

        data = coreobject.getEncryptedBody(data, kvr);
        var retVal = $.ajax({
            type: "POST",
            crossDomain: true,
            headers: {
                'Authorization': coreobject.getAuthToken(),
                'CCAuthorization': coreobject.getCCAuthToken(),
                'CorelationId': coreobject.corelationId(),
                'UtmSrc': coreobject.getUtmSrc(),
                'UtmMedium': coreobject.getUtmMedium(),
                'UtmCampaign': coreobject.getUtmCampaign(),
                'UtmKeyword': coreobject.getUtmKeyword(),
                'GclId': coreobject.getGclId(),
                'EfId': coreobject.getEfId(),
                'SID': coreobject.getSId(),
                'Kv': KV,
                //'version': coreobject.getVersion()
                'Version': coreobject.getNewVersion()
            },
            url: baseurlforoldUI + url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            async: true,
            datatype: "json",
            statusCode: {
                403: function () {
                    var _location_href = window.location.href.toLowerCase();
                    if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                        sessionStorage.removeItem("UserDetailsData");
                        sessionStorage.removeItem("AuthorizationToken");
                        sessionStorage.removeItem("TokenExpiry");
                        sessionStorage.removeItem("LoginType");
                        window.location.href = "/?sessionexpired=t";
                    }
                }
            }
        });
        return Promise.resolve(retVal);
    };

    coreobject.MakeGetCallforOldUI = function (url, data) {
        $.support.cors = true;
        var retVal = $.ajax({
            type: "GET",
            crossDomain: true,
            headers: {
                'Authorization': coreobject.getAuthToken(),
                'CorelationId': coreobject.corelationId(),
                'UtmSrc': coreobject.getUtmSrc(),
                'UtmMedium': coreobject.getUtmMedium(),
                'UtmCampaign': coreobject.getUtmCampaign(),
                'UtmKeyword': coreobject.getUtmKeyword(),
                'GclId': coreobject.getGclId(),
                'SID': coreobject.getSId(),
                'EfId': coreobject.getEfId()
            },
            url: baseurlforoldUI + url,
            async: true,
            datatype: "json",
            statusCode: {
                403: function () {
                    var _location_href = window.location.href.toLowerCase();
                    if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                        sessionStorage.removeItem("UserDetailsData");
                        sessionStorage.removeItem("AuthorizationToken");
                        sessionStorage.removeItem("TokenExpiry");
                        sessionStorage.removeItem("LoginType");
                        window.location.href = "/?sessionexpired=t";
                    }
                }
            }
        });

        return Promise.resolve(retVal);
    }
    //Added by Sudhi for HB end

    //Payment Transaction Call
    coreobject.MakePaymentTransactionCall = function (url, data) {
        return new Promise(function (resolve, reject) {
            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    // Added by Sangeeta to Resolve login control issue to fetch the login data in back scenario
                    window.sessionStorage.setItem("logintoken", response.authToken);
                    window.sessionStorage.setItem("loginTokenExpiry", new Date(response.tokenExpiry));
                    window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("kv", response.kv);

                    window.sessionStorage.setItem("SID", response.sid);

                    //Handle Quote not found error
                    var isWeblink = window.sessionStorage.getItem("weblink");
                    if (isWeblink) {
                        response.isGuestUser ? window.sessionStorage.setItem("LoginType", "App") : window.sessionStorage.setItem("LoginType", "User");
                        window.sessionStorage.removeItem("weblink");
                    }

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                }
            }).then(function () {
                var AuthToken = coreobject.getAuthToken();
                var kvr = coreobject.KV();
                var KV = coreobject.createEncryptedKV(kvr);

                var xhr = new XMLHttpRequest();
                url = baseurl + url;
                xhr.open("POST", url);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", coreobject.getAuthToken());
                xhr.setRequestHeader("UtmSrc", "" + coreobject.corelationId());
                xhr.setRequestHeader("UtmMedium", "" + coreobject.getUtmSrc());
                xhr.setRequestHeader("UtmCampaign", "" + coreobject.getUtmMedium());
                xhr.setRequestHeader("UtmKeyword", "" + coreobject.getUtmKeyword());
                xhr.setRequestHeader("GclId", "" + coreobject.getUtmCampaign());
                xhr.setRequestHeader("UtmKeyword", "" + coreobject.getUtmKeyword());
                xhr.setRequestHeader("EfId", "" + coreobject.getGclId());
                xhr.setRequestHeader("ClientIPAddress", "" + coreobject.getClientIPAddress());
                xhr.setRequestHeader("DeviceId", "" + coreobject.getDeviceIdAddress());
                xhr.setRequestHeader("Kv", "" + KV);
                //xhr.setRequestHeader("version", "" + coreobject.getVersion())
                xhr.setRequestHeader("Version", "" + coreobject.getNewVersion())
                xhr.setRequestHeader("SID", "" + coreobject.getSId());
                xhr.setRequestHeader("ApiBinding", "" + coreobject.getApiBinding());
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr);
                    }
                    else if (this.status == 403) {
                        var _location_href = window.location.href.toLowerCase();
                        if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                            sessionStorage.removeItem("UserDetailsData");
                            sessionStorage.removeItem("AuthorizationToken");
                            sessionStorage.removeItem("TokenExpiry");
                            sessionStorage.removeItem("LoginType");
                            window.location.href = "/?sessionexpired=t";
                            resolve(xhr);
                        }
                    }

                    else {
                        reject({
                            status: this.status, statusText: xhr.statusText
                        });
                    }
                };

                xhr.onerror = function () {
                    reject({
                        status: this.status, statusText: xhr.statusText
                    });
                };

                data = coreobject.getEncryptedBody(data, kvr);
                xhr.send(data);
            }); // then
        }); //final Promise
    };

    // Manoj - 06-09-2021 - made for eChannelCore Service - Base Url
    coreobject.MakePaymentTransactionCallCore2 = function (url, data) {
        return new Promise(function (resolve, reject) {
            var ret = coreobject.IsAuthTokenExpired();
            coreobject.setAuthorizationToken(ret).then(function (response) {
                if (response != null && response != "NotExpired") {
                    window.sessionStorage.setItem(resources.authTokenIdentifier, response.Passcode);
                    window.sessionStorage.setItem(resources.TokenExpiry, new Date(response.Expiry));
                    // Added by Sangeeta to Resolve login control issue to fetch the login data in back scenario
                    window.sessionStorage.setItem("logintoken", response.authToken);
                    window.sessionStorage.setItem("loginTokenExpiry", new Date(response.tokenExpiry));
                    window.sessionStorage.setItem("clientId", response.clientId);
                    window.sessionStorage.setItem("kv", response.kv);

                    window.sessionStorage.setItem("SID", response.sid);

                    //Handle Quote not found error
                    var isWeblink = window.sessionStorage.getItem("weblink");
                    if (isWeblink) {
                        response.isGuestUser ? window.sessionStorage.setItem("LoginType", "App") : window.sessionStorage.setItem("LoginType", "User");
                        window.sessionStorage.removeItem("weblink");
                    }

                    if (window.sessionStorage.getItem(resources.LoginType) == "User") {
                        var UserLoggedInDetail = {};
                        UserLoggedInDetail.UserName = response.userName;
                        UserLoggedInDetail.LastLogin = response.lastLogin;
                        UserLoggedInDetail.IPartnerUserId = response.iPartnerUserId;
                        UserLoggedInDetail.isguestuser = (response.isGuestUser) ? 1 : 0;
                        window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                    }
                }
            }).then(function () {
                var AuthToken = coreobject.getAuthToken();
                var kvr = coreobject.KV();
                var KV = coreobject.createEncryptedKV(kvr);

                var xhr = new XMLHttpRequest();
                url = baseurlforCore2 + url;
                xhr.open("POST", url);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", coreobject.getAuthToken());
                xhr.setRequestHeader("UtmSrc", "" + coreobject.corelationId());
                xhr.setRequestHeader("UtmMedium", "" + coreobject.getUtmSrc());
                xhr.setRequestHeader("UtmCampaign", "" + coreobject.getUtmMedium());
                xhr.setRequestHeader("UtmKeyword", "" + coreobject.getUtmKeyword());
                xhr.setRequestHeader("GclId", "" + coreobject.getUtmCampaign());
                xhr.setRequestHeader("UtmKeyword", "" + coreobject.getUtmKeyword());
                xhr.setRequestHeader("EfId", "" + coreobject.getGclId());
                xhr.setRequestHeader("ClientIPAddress", "" + coreobject.getClientIPAddress());
                xhr.setRequestHeader("DeviceId", "" + coreobject.getDeviceIdAddress());
                xhr.setRequestHeader("Kv", "" + KV);
                //xhr.setRequestHeader("version", "" + coreobject.getVersion())
                xhr.setRequestHeader("Version", "" + coreobject.getNewVersion())
                xhr.setRequestHeader("SID", "" + coreobject.getSId());
                xhr.setRequestHeader("ApiBinding", "" + coreobject.getApiBinding());
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr);
                    }
                    else if (this.status == 403) {
                        var _location_href = window.location.href.toLowerCase();
                        if (_location_href != null && (_location_href.indexOf("/action/edit") <= -1 && _location_href.indexOf("/action/preview") <= -1)) {
                            sessionStorage.removeItem("UserDetailsData");
                            sessionStorage.removeItem("AuthorizationToken");
                            sessionStorage.removeItem("TokenExpiry");
                            sessionStorage.removeItem("LoginType");
                            window.location.href = "/?sessionexpired=t";
                            resolve(xhr);
                        }
                    }

                    else {
                        reject({
                            status: this.status, statusText: xhr.statusText
                        });
                    }
                };

                xhr.onerror = function () {
                    reject({
                        status: this.status, statusText: xhr.statusText
                    });
                };

                data = coreobject.getEncryptedBody(data, kvr);
                xhr.send(data);
            }); // then
        }); //final Promise
    };
    // Manoj - 06-09-2021 - made for eChannelCore Service - Base Url

    coreobject.getSId = function () {
        var SId = window.sessionStorage.getItem(resources.SID);
        return SId == null ? "sid" : SId;
    };

    coreobject.getAuthToken = function () {
        return "Bearer " + window.sessionStorage.getItem(resources.authTokenIdentifier);
    };
    coreobject.getCCAuthToken = function () {
        return window.sessionStorage.getItem(resources.CCAuthTokeIdentifier);
    };
    coreobject.getUtmSrc = function () {
        return window.sessionStorage.getItem(resources.UtmSrc);
    };
    coreobject.getUtmMedium = function () {
        return window.sessionStorage.getItem(resources.UtmMedium);
    };
    coreobject.getUtmCampaign = function () {
        return window.sessionStorage.getItem(resources.UtmCampaign);
    };
    coreobject.getUtmKeyword = function () {
        return window.sessionStorage.getItem(resources.UtmKeyword);
    };
    coreobject.getGclId = function () {
        return window.sessionStorage.getItem(resources.GclId);
    };
    coreobject.getEfId = function () {
        return window.sessionStorage.getItem(resources.EfId);
    };
    coreobject.getLoginType = function () {
        return window.sessionStorage.getItem(resources.LoginType);
    };
    coreobject.GetParameterValues = function (name) {
        //modified by pavan for fixing idfc url decode
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(decodeURIComponent(window.location.href));
        if (results == null) { return null; }
        else { return decodeURI(results[1]) || 0; }
    };
    coreobject.formatddmmyyyy = function (dt) {
        if (dt != null && dt !== undefined) {
            var tempdt = new Date(dt);
            var month = '' + (tempdt.getMonth() + 1);
            var day = '' + tempdt.getDate();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var retDate = [day, month, tempdt.getFullYear()].join('/');
            return retDate;
        }
    };
    coreobject.utf8_decode = function (e) {
        var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t;
    };
    coreobject.encodeBase64 = function (e) {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var t = ""; var n, r, i, s, o, u, a; var f = 0;
        e = coreobject.utf8_decode(e.toString());
        while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + _keyStr.charAt(s) + _keyStr.charAt(o) + _keyStr.charAt(u) + _keyStr.charAt(a) }
        return t;
    };
    coreobject.decodeBase64 = function (s) {
        var e = {}, i, b = 0, c, x, l = 0, a, r = '', w = String.fromCharCode, L = s.length;
        var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (i = 0; i < 64; i++) { e[A.charAt(i)] = i; }
        for (x = 0; x < L; x++) {
            c = e[s.charAt(x)]; b = (b << 6) + c; l += 6;
            while (l >= 8) { ((a = (b >>> (l -= 8)) & 0xff) || (x < (L - 2))) && (r += w(a)); }
        }
        return r;
    };
    coreobject.parseJwt = function (token) {
        var base64Url = (token != null) ? token.split('.')[1] : token;
        if (base64Url != null) {
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        else return null;
    };
    coreobject.getAllowedURL = function () {
        var currenturl = window.location.href;
        var allowedurl = "www.icicilombard.com";
        if (currenturl != null && currenturl != "") {
            currenturl = currenturl.toLowerCase();
            if (currenturl.indexOf("https://ipdigiuatuiux.icicilombard.com:9002/") > -1) {
                var allowedurl = "https://ipdigiuatuiux.icicilombard.com:9002/";
            }
            if (currenturl.indexOf("https://ipdigiuatuiux.icicilombard.com:9004/") > -1) {
                var allowedurl = "https://ipdigiuatuiux.icicilombard.com:9004/";
            }
            if (currenturl.indexOf("https://ipartneruiuxsync.icicilombard.com/") > -1) {
                var allowedurl = "https://ipartneruiuxsync.icicilombard.com/";
            }
            return allowedurl;
        }
    }
    coreobject.IsPanCardMandatory = function (Amount) {
        if (Amount != "" && Amount != "0" && Amount != null) {
            var panNo = $("#txtpanno").val().toUpperCase();
            var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            if (parseInt(Amount) < 100000) {
                return false;
            }
            else {
                if (regex.test(panNo)) {
                    return false;
                }
                else {
                    $("#errpanno").show();
                    return true;
                }
            }
        }
        else { return false; }
    };
    coreobject.FocusPanNumber = function (errorMsg) {
        if (errorMsg == "Please Enter PAN Card Number") {
            $("#headingOne").removeClass("insClose").addClass("insActive");
            $("#collapseOne").show();
            $("#headingOne").find('.icn').removeClass('spr-plus-sign').addClass('spr-minus-sign');
            $("#collapseOne").find(".save").css("display", "inline-block");
            $("#collapseOne").find(".edit").hide();
            $("#errpanno").show();
            $("#collapseOne").find(".edit").trigger('click');
        }
    };

    coreobject.generateAuthToken = async function () {

        //Create token while coming from vendor application having dealNo in URL.

        var VendorDealId = corelibrary.GetParameterValues("dealno");
        var RmCode = corelibrary.GetParameterValues("RmCode");
        var MATCHID = corelibrary.GetParameterValues("MatchId");
        var TokenId = corelibrary.GetParameterValues("TokenId");//ck
        var tpdealno = corelibrary.GetParameterValues("tpdealno");
        if (VendorDealId != null && VendorDealId != "") {
            corelibrary.clearSession(); //clearing previous session storage
            var strSubProduct = corelibrary.GetParameterValues("SubSrc"); var strDealNo = VendorDealId;
            var strRmcode = "";
            var strMATCHID = "";
            if (RmCode != null && RmCode != "") {
                strRmcode = RmCode;
            }
            if (MATCHID != null && MATCHID != "") {
                strMATCHID = MATCHID;
            }
            var ProductCode = strDealNo.split('/')[0].split('-')[1];
            if (ProductCode == "3005") {
                strSubProduct = 2312;
            }
            else if (ProductCode == "3001") {
                strSubProduct = 2311;
            }
            else if (ProductCode == "4128") {
                strSubProduct = 3816;
            }
            else if (ProductCode == "4129") {
                strSubProduct = 3717;
            }
            else if (ProductCode == "4013") {
                strSubProduct = 50;
            }
            else if (ProductCode == "4111") {
                strSubProduct = 3315;
            }
            // added by pavan ti fic idfc hb transaction
            else if (ProductCode == "4140") {
                strSubProduct = 3817;
            }

            var strtpProductCode = '';
            if (strSubProduct == undefined || strSubProduct == null) {
                if (document.baseURI.toLowerCase().includes("car-insurance")) {
                    strSubProduct = 2311;
                    strtpProductCode = 2319;
                }
                if (document.baseURI.toLowerCase().includes("two-wheeler-insurance")) {
                    strSubProduct = 2312;
                    strtpProductCode = 2320;
                }
            }
            var strDealDetails = [];
            if (tpdealno != undefined && tpdealno != null) {
                strDealDetails = [{ ProductCode: strSubProduct, DealId: strDealNo, RmCode: strRmcode, MATCHID: strMATCHID },
                { ProductCode: strtpProductCode, DealId: tpdealno, RmCode: strRmcode, MATCHID: strMATCHID }];
            }
            else {
                strDealDetails = [{ ProductCode: strSubProduct, DealId: strDealNo, RmCode: strRmcode, MATCHID: strMATCHID }];
            }
            var cor = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            var authtoken = {}; authtoken.Client = "website"; authtoken.Scope = "MvImfz1HGC4UzIbv6oQT4UvKT83p"; authtoken.Deal = strDealDetails;
            window.sessionStorage.setItem(resources.LoginType, "App");

            return corelibrary.MakePostCallForAuthToken2("auth-api/client/initialize", authtoken);
        }

        //Create token while coming from call center
        var weblinkToken = corelibrary.GetParameterValues("iPartnertoken");
        var isWebId = corelibrary.GetParameterValues("webId");

        if (weblinkToken != undefined && weblinkToken != null && weblinkToken != "") {
            corelibrary.clearSession(); //clearing previous session storage
            window.sessionStorage.setItem("IsCallCenterUser", true);
            var ccAuthtoken = {};
            if (!isWebId) {
                window.sessionStorage.setItem(resources.LoginType, "User");
                ccAuthtoken.TokenId = weblinkToken;
            } else {
                var webId = weblinkToken.split('::')[0];
                window.sessionStorage.setItem(resources.LoginType, "App");
                ccAuthtoken.TokenId = webId;
            }
            var authtoken = {}; authtoken.Client = "website"; authtoken.Scope = "MvImfz1HGC4UzIbv6oQT4UvKT83p";
            await corelibrary.MakePostCallForAuthToken2("auth-api/client/initialize", authtoken).then(async function (response) {
                if (response.Success) {
                    window.sessionStorage.setItem("AuthorizationToken", response.Passcode);
                    window.sessionStorage.setItem("TokenExpiry", new Date(response.Expiry));
                    var ccAuthRes = await corelibrary.MakePostCallForMicro("auth-api/callcenter/cc-web-link", ccAuthtoken);
                    if (ccAuthRes.Success) {
                        window.sessionStorage.setItem("AuthorizationToken", ccAuthRes.Passcode);
                        window.sessionStorage.setItem("TokenExpiry", new Date(ccAuthRes.Expiry));
                        if (ccAuthRes.UserId == null || ccAuthRes.UserId == "" || ccAuthRes.UserId <= 0) {
                            window.sessionStorage.setItem(resources.LoginType, "App");
                        }
                    }
                    return ccAuthRes;
                }
            });

        }
        else if (TokenId != undefined && TokenId != null && TokenId != "") {
            //ck
            return corelibrary.MakeGetCallForCore2_2("web-link/" + TokenId);
        }
        else {
            //Create website token
            var cor = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            var authtoken = {}; authtoken.Client = "website"; authtoken.Scope = "MvImfz1HGC4UzIbv6oQT4UvKT83p";
            window.sessionStorage.setItem(resources.LoginType, "App");
            return corelibrary.MakePostCallForAuthToken2("auth-api/client/initialize", authtoken);
        }

    };

    //Temporary token generation for CC user
    coreobject.generateTempCCAuthToken = function () {


        corelibrary.clearSession(); //clearing previous session storage

        var CCUserId = "fDTSg2Art8NOHAblLu169w==";
        var iPartnerId = "fDTSg2Art8NOHAblLu169w==";
        var LoginType = "User";

        console.log("CCUserId && iPartnerId : " + CCUserId + iPartnerId);


        var authtoken = {}; authtoken.CallCenterUserId = CCUserId; authtoken.IPartnerUserId = iPartnerId; authtoken.ClientId = 1; authtoken.LoginType = LoginType;
        window.sessionStorage.setItem(resources.LoginType, LoginType);
        window.sessionStorage.setItem("IsCallCenterUser", true);

        return corelibrary.MakePostCallForAuthToken("auth/getCCUser", authtoken);

    };

    coreobject.getLocationResponse = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status === 200) {
                // console.log('SUCCESS', xhr.responseText);
                callback(JSON.parse(xhr.responseText));
            } else {
                // console.warn('request_error');
            }
        };
        xhr.open('GET', 'https://soy-vision-181209.el.r.appspot.com');//cloud function api to be set here
        xhr.send();
    };


    return coreobject;

})();

$(document).ready(function () {

    //for 403 Error
    if (corelibrary.GetParameterValues("sessionexpired") == 't') { $('#homeErrorpopup').addClass('active'); };


    //Create token while coming from call center
    var authorizationToken = corelibrary.GetParameterValues("iPartnertoken");

    if (authorizationToken != undefined && authorizationToken != null && authorizationToken != "") {

        var ret = corelibrary.IsAuthTokenExpired();
        corelibrary.setAuthorizationToken(ret).then(function (response) {
            if (response != null && response != "NotExpired" && (response.Success || response.success)) {
                window.sessionStorage.setItem("AuthorizationToken", response.Passcode || response.authToken);
                window.sessionStorage.setItem("TokenExpiry", new Date(response.Expiry || response.tokenExpiry));
                window.sessionStorage.setItem("clientId", response.clientId);

                if (window.sessionStorage.getItem("LoginType") == "User") {
                    var UserLoggedInDetail = {};
                    UserLoggedInDetail.UserName = response.LastName || response.userName;
                    UserLoggedInDetail.LastLogin = response.LastLogin || response.lastLogin;
                    UserLoggedInDetail.IPartnerUserId = response.UserId || response.iPartnerUserId;
                    UserLoggedInDetail.isguestuser = (response.IsGuestUser || response.isGuestUser) ? 1 : 0;
                    window.sessionStorage.setItem('UserLoggedInDetail', JSON.stringify(UserLoggedInDetail));
                }

            }
        });
    }

    var CurrentUrlIndexer = window.location.pathname.indexOf("registration");
    var PreviousUrlIndexer = document.referrer.indexOf("renewal");

    if (CurrentUrlIndexer > 0 && PreviousUrlIndexer > 0) {
        var ProposalId = window.sessionStorage.getItem("ProposalId");
        var policyId = window.sessionStorage.getItem("PolicyId");
        if (policyId != undefined && policyId != null && policyId != "") {
            $("#hdnrenewalId").val(policyId);
        }
        else {
            $("#hdnrenewalecsId").val(ProposalId);
        }
    }

    //for UI team 
    var clientIpAddress = corelibrary.getClientIPAddress();

    $('#hdnDeviceId').val("d1234");
    $('#hdnIPaddress').val(clientIpAddress);
    //for UI team

    //var CallAsyncDeviceId = (function () {

    //    var asyncObj = {};

    //    asyncObj.CallDeviceId = function () {

    //        if (IsCallCenterFlow) {

    //            if (corelibrary.getDeviceIdAddress() == null || corelibrary.getDeviceIdAddress() == "" || corelibrary.getDeviceIdAddress() == undefined || corelibrary.getDeviceIdAddress() == "null")
    //                window.sessionStorage.setItem('clientdeviceid', "callCenter");

    //            $('#hdnDeviceId').val(corelibrary.getDeviceIdAddress());
    //            $('#hdnIPaddress').val(clientIpAddress);

    //        }
    //        else {

    //            asyncCallDeviceId().then(function (clientdeviceId) {

    //                if (clientdeviceId == null || clientdeviceId == "") {
    //                    asyncObj.CallDeviceId();
    //                    return;
    //                }

    //                if (corelibrary.getDeviceIdAddress() == null || corelibrary.getDeviceIdAddress() == "" || corelibrary.getDeviceIdAddress() == undefined || corelibrary.getDeviceIdAddress() == "null")
    //                    window.sessionStorage.setItem('clientdeviceid', clientdeviceId);

    //                $('#hdnDeviceId').val(corelibrary.getDeviceIdAddress());
    //                $('#hdnIPaddress').val(clientIpAddress);
    //                //window.sessionStorage.setItem('clientipaddress', clientIpAddress);
    //                return;
    //            });
    //        }
    //    }

    //    if (corelibrary.getDeviceIdAddress() == null || corelibrary.getDeviceIdAddress() == "" || corelibrary.getDeviceIdAddress() == undefined || corelibrary.getDeviceIdAddress() == "null") {
    //        asyncObj.CallDeviceId();
    //    }

    //    else {
    //        $('#hdnDeviceId').val(corelibrary.getDeviceIdAddress());
    //        $('#hdnIPaddress').val(clientIpAddress);
    //        //window.sessionStorage.setItem('clientipaddress', clientIpAddress);
    //    }

    //    return asyncObj;
    //})();

});