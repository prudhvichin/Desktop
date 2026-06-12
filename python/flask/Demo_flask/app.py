from flask import Flask,redirect,url_for

app = Flask(__name__)

@app.route('/')
def Home_page():
    return 'this is home page'


@app.route('/about/<name>')
def About(name):
    return f'all about {name}'

@app.route('/admin')
def Admin():
    return "this is admin/owner page"

@app.route('/owner')
def Owner():
    return redirect('/admin')

@app.route('/user/<name>')
def User(name):
    if name=='admin' or name == 'prudhvi':
        return redirect('/admin')
    return f'welcome to user {name}'

@app.route('/demoacc/<demo>')
def demo(demo):
    return redirect(url_for('User',name=demo))


if __name__ == '__main__':
    app.run(debug=True)