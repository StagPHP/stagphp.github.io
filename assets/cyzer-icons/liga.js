/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'search': '&#xe8b6;',
            'content_copy': '&#xe14d;',
            'local_grocery_store': '&#xe8cc;',
            'shopping_cart': '&#xe8cc;',
            'local_mall': '&#xe54c;',
            'art_track': '&#xe060;',
            'account_box': '&#xe851;',
            'add_box': '&#xe146;',
            'arrow_back': '&#xe5c4;',
            'arrow_downward': '&#xe5db;',
            'arrow_forward': '&#xe5c8;',
            'arrow_upward': '&#xe5d8;',
            'video_library': '&#xe04a;',
            'check_box': '&#xe834;',
            'check_circle': '&#xe86c;',
            'clear': '&#xe5cd;',
            'close': '&#xe5cd;',
            'cancel': '&#xe5c9;',
            'memory': '&#xe322;',
            'dashboard': '&#xe871;',
            'picture_as_pdf': '&#xe415;',
            'cloud_download': '&#xe2c0;',
            'error_outline': '&#xe001;',
            'error': '&#xe000;',
            'insert_drive_file': '&#xe24d;',
            'file_upload': '&#xe2c6;',
            'help': '&#xe887;',
            'help_outline': '&#xe8fd;',
            'perm_media': '&#xe8a7;',
            'view_list': '&#xe8ef;',
            'dehaze': '&#xe3c7;',
            'more_vert': '&#xe5d4;',
            'launch': '&#xe89e;',
            'open_in_new': '&#xe89e;',
            'notifications': '&#xe7f4;',
            'notifications_active': '&#xe7f7;',
            'person': '&#xe7fd;',
            'indeterminate_check_box': '&#xe909;',
            'report': '&#xe160;',
            'security': '&#xe32a;',
            'settings': '&#xe8b8;',
            'build': '&#xe869;',
            'tune': '&#xe429;',
            'backup': '&#xe2c3;',
            'cloud_upload': '&#xe2c3;',
            'verified_user': '&#xe8e8;',
            'remove_red_eye': '&#xe8f4;',
            'visibility': '&#xe8f4;',
            'visibility_off': '&#xe8f5;',
            'report_problem': '&#xe002;',
            'warning': '&#xe002;',
            'web': '&#xe051;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/cyz-ico/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
