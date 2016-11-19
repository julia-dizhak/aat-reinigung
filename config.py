from flask.ext.babel import lazy_gettext

LANGUAGES = {
    'de': lazy_gettext('German'),
    'en': lazy_gettext('English'),
}


BABEL_DEFAULT_LOCALE = 'de'
