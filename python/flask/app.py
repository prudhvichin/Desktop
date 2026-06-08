# from flask import Flask, redirect,url_for

# app = Flask(__name__)


# def home():
#     return "Welcome Home"

# def admin():
#     return "Welcome admin"

# def student():
#     return "Welcome student"

# def staff():
#     return "Welcome staff"


# app.add_url_rule('/', 'home', home)
# app.add_url_rule('/admin','admin',admin)
# app.add_url_rule('/student','student',student)
# app.add_url_rule('/staff','staff',staff)



# @app.route('/user/<name>')
# def user(name):
#     if name == "admin":
#         return redirect(url_for("admin"))
#     if name == "student":
#         return redirect(url_for("student"))
#     if name == "staff":
#         return redirect(url_for("staff"))



# if __name__ == '__main__':
#     app.run(debug=True)