from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'welcome to home'

@app.route('/about')
def about():
    return 'this is about page'


if __name__ == "__main__":
    app.run(debug=True)