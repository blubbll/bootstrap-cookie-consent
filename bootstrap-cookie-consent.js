if (window.ie && document.documentMode >= 8 || !window.ie) {
    // Creare's 'Implied Consent' EU Cookie Law Banner v:2.4
    // Conceived by Robert Kent, James Bavington & Tom Foyster
    // Modified by Simon Freytag for syntax, namespace, jQuery and Bootstrap
    (function() {
        'use strict';
        window.C = {
            // Number of days before the cookie expires, and the banner reappears
            cookieDuration: 14,

            // Name of our cookie
            cookieName: 'complianceCookie',

            // Value of cookie
            cookieValueOn: 'on',
            cookieValueOff: 'off',

            // Message banner title
            bannerTitle: "Cookies:",

            // Message banner message
            bannerMessage: "This site uses cookies to deliver its services.",

          
            // accept class
            acceptClass: "btn-success btn-xs",
            // deny class
            denyClass: "btn-danger btn-xs",
          
          
            // accept text
            acceptText: "accept",
            // denytext
            denyText: "deny",

            // Link to your cookie policy.
            bannerLinkURL: "/cookies?",
            // Link text
            bannerLinkText: "Read more",

            // Text alignment
            alertAlign: "center",

            createDiv: function() {
                var banner = document.createElement('div');
                banner.id = 'cookieAlert';
                banner.innerHTML = (
                    '<div class="alert alert-success alert-dismissible text-' +
                    this.alertAlign + ' fade in" ' +
                    'role="alert" style="position: fixed; bottom: 0; width: 100%; ' +
                    'margin-bottom: 0"><strong>' + this.bannerTitle + '</strong> ' +
                    this.bannerMessage + ' <a href="' + this.bannerLinkURL + '">' +
                  
                    this.bannerLinkText + '</a> <button type="button" class="btn ' +
                    this.acceptClass + '" onclick="window.C.createCookie(C.cookieName, C.cookieValueOn' +
                    ', C.cookieDuration);" data-dismiss="alert" aria-label="Close">' +
                    this.acceptText + '</button>'+
                  
                    '<button type="button" class="btn ' +
                    this.denyClass + '" onclick="window.C.createCookie(C.cookieName, C.cookieValueOff' +
                    ', C.cookieDuration);" data-dismiss="alert" aria-label="Close">' +
                    this.denyText + '</button></div>'
                );
                if (typeof document.body.appendChild === 'function')
                    document.body.appendChild(banner)
                else if (typeof document.body.append === 'function')
                    document.body.append(banner);
            },

            createCookie: function(name, value, days) {
                console.log("accepted Cookies");

                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                }
                document.cookie = name + "=" + value + expires + "; path=/";
                document.querySelectorAll("#cookieAlert")[0].outerHTML = void 0;
                setTimeout(document.location.reload(), 0);
            },

            getAccepted: function() {
                return (this.checkCookie(this.cookieName) !== null && this.checkCookie(this.cookieName) === this.cookieValueOn)
            },
            getDenied: function() {
                return (this.checkCookie(this.cookieName) !== null && this.checkCookie(this.cookieName) === this.cookieValueOff)
            },
            revokeCookie: function() {
                this.deleteCookie(this.cookieName);
                this.deleteCookie('connect.sid');
                setTimeout(document.location.reload(), 0);
            },

            deleteCookie: function(name) {
                var d = new Date(); //Create an date object
                d.setTime(d.getTime() - (1000 * 60 * 60 * 24)); //Set the time to the past. 1000 milliseonds = 1 second
                var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
                window.document.cookie = name + "=" + "; " + expires; //Set the cookie with name and the expiration date
            },
            checkCookie: function(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0)
                        return c.substring(nameEQ.length, c.length);
                }
                return null;
            },

            init: function() {
                if (this.checkCookie(this.cookieName) !== this.cookieValueOn && this.checkCookie(this.cookieName) !== this.cookieValueOff)
                    this.createDiv();
            }
        };

        window.setTimeout(function() {
            window.C.init();
        }, 0);
    }());
} else window.setTimeout(function() {
    console.log("No cookie consend needed, document is readonly under IE 8");
}, 0);
