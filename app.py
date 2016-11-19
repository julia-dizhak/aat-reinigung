from flask import Flask, request, render_template, redirect, session
from flask.ext.babel import Babel

from config import LANGUAGES, BABEL_DEFAULT_LOCALE
app = Flask(__name__, static_folder='.', static_url_path='')
app.config.from_pyfile('config.py')
app.secret_key = 'Jhr]ogxQ[Vmi4oo'
babel = Babel(app)

LANGUAGE_KEY = '_LANG_'


@babel.localeselector
def get_locale():
    lang = session.get(LANGUAGE_KEY, BABEL_DEFAULT_LOCALE)
    return lang


@app.route('/lang/<language>/')
def set_language_code(language=None):
    session[LANGUAGE_KEY] = language if language in LANGUAGES.keys() else BABEL_DEFAULT_LOCALE
    return redirect('/')


@app.route('/')
def root():
    languages = LANGUAGES
    current_language = get_locale()
    return render_template(
        'index.html',
        **{
            'LANGAUGES': LANGUAGES,
            'LANGUAGE_CODE': current_language,
        }
        )

if __name__ == '__main__':
    app.run(debug=True)
