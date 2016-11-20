import os

from flask import Flask, request, render_template, redirect, session, jsonify, Response
from flask.ext.babel import Babel, lazy_gettext
from flask.ext.mandrill import Mandrill
from flask_jsonschema import JsonSchema, ValidationError
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from config import LANGUAGES, BABEL_DEFAULT_LOCALE
app = Flask(__name__, static_folder='.', static_url_path='')

app.config['MANDRILL_API_KEY'] = os.environ.get('MANDRILL_API_KEY', '')
mandrill = Mandrill(app)

app.config.from_pyfile('config.py')
app.secret_key = os.environ.get('SECRET_KEY', 'Jhr]ogxQ[Vmi4oo')
babel = Babel(app)


LANGUAGE_KEY = '_LANG_'

DEFAULT_TO = os.environ.get('DEFAULT_TO', '')
DEFAULT_FROM = os.environ.get('DEFAULT_FROM', 'aat@tweehq.com')


app.config['JSONSCHEMA_DIR'] = os.path.join(app.root_path, 'schemas')

jsonschema = JsonSchema(app)

limiter = Limiter(
    app,
    key_func=get_remote_address,
    global_limits=[]
)

@app.errorhandler(ValidationError)
def on_validation_error(e):
    return Response(
        status=400,
        content_type='application/json'
    )


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


@app.route('/feedback/', methods=['POST'])
@jsonschema.validate('message')
@limiter.limit("20 per day")
def feedback_form():
    data = request.get_json()
    email = data['email']
    name = data['name']
    phone = data['phone']
    msg = mandrill.send_email(
        from_email=DEFAULT_FROM,
        subject='AAT-Website message',
        to=[{'email': DEFAULT_TO}],
        text=u'{}\n{}\n{}'.format(name, email, phone)
    )

    return jsonify(msg.json())


if __name__ == '__main__':
    app.run(debug=os.environ.get('DEBUG', 1))
