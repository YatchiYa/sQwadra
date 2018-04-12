# define my librairies
import os
import datetime
import re

from flask import Flask, render_template, url_for, request, session, redirect, flash, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId # For ObjectId to work
from pymongo import MongoClient

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, current_user, login_required, login_user, logout_user, UserMixin, AnonymousUserMixin, confirm_login, fresh_login_required
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo

from werkzeug.security import generate_password_hash, check_password_hash  #hash password
from werkzeug.urls import url_parse

# define my application

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'connect-to-mongodb'
app.config['MONGO_URI'] = 'mongodb://grow-prototype:growing@ds125288.mlab.com:25288/connect-to-mongodb'

mongo = PyMongo(app);

login = LoginManager(app)






#define my classes

#user class
class User():

    def __init__(self, username=None, password=None, email=None):
        self.username = username
        self.password = password
        self.email = email

    def save(self):
        users=mongo.db.users
        hashpass = self.password
        coun = 0
        users.insert({'name' : self.username, 'password' : hashpass, 'email' : self.email, 'count':coun })
        return self.username

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        return self.password_hash

    def get_by_username(self, username):
        self.username = username
        password = self.password
        return password


    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    @staticmethod
    def validate_login(password_hash, password):
        return check_password_hash(password_hash, password)



#ToDo class
class ToDo():
    def __init__(self, title=None, desc=None,categories=None, Deadline=None, checklist=[ ]):
        self.title = title
        self.desc = desc
        self.categories = categories
        self.deadline = Deadline
        self.checklist = checklist
        self.user = session['username']

    def save(self):
        todos=mongo.db.todos
        todos.insert({ "user": self.user, "name": self.title,"description":self.desc, "categories": self.categories, "deadline": self.deadline, "checklist": self.checklist })
        return self.title


#Skills Class
class Skills():
    def __init__(self, title=None):
        self.title = title
        self.user = session['username']

    def save(self):
        skills= mongo.db.skills
        skills.insert({ "user" : self.user, "title" : self.title })
        return self.title


#Dailies Class
class Dailies():
    def __init__(self, title=None, categories=None):
        self.title = title
        self.categories = categories
        self.user = session['username']

    def save(self):
        dailies= mongo.db.dailies
        dailies.insert({ "user" : self.user, "title" : self.title, "categories":self.categories })
        return self.title




# define my functions


@login.user_loader
def load_user(id):
    return users.find_one({'name' : request.form['username']})(int(id))


@app.route('/')
def index():
    if 'username' in session:
            #Display the all Tasks
        todos=mongo.db.todos
        users=mongo.db.users
        skills = mongo.db.skills
        dailies = mongo.db.dailies
        date = datetime.datetime.now()

        user_l = users.find({'name' : session['username']})
        todos_now = todos.find({'user' : session['username'], 'categories': "all" })
        todos_all = todos.find({'user' : session['username'], 'categories': "imp" })
        skills_active = skills.find({'user' : session['username']})
        dailies_active = dailies.find({'user' : session['username']})
        return render_template('Main.html', dailies=dailies_active, todos=todos_now, todosAll=todos_all, user=user_l, skills=skills_active ,date=date)

    feedbs=mongo.db.feedbs
    feedbs_l = feedbs.find()
    return render_template('home.html', feedbs=feedbs_l)



#redirection files

@app.route('/story')
def story():
    return render_template('Story.html')

@app.route('/aboutus')
def aboutus():
    return render_template('AboutUs.html')

@app.route('/connect', methods=['POST', 'GET'])
def connect():
    return render_template('index.html')



#login
@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users
    username = request.form['username']
    passw = request.form['pass']

    login_user = users.find_one({'name' : username})
    currentUser = User(username, passw, None)
    
    if login_user:
        if currentUser.password == login_user['password']:
            session['username'] = request.form['username']
            return redirect(url_for('index'))

    return 'Invalid username/password combination'



#register 
@app.route('/register', methods=['POST', 'GET'])
def register():
    users = mongo.db.users
    username = request.form['username']
    password = request.form['pass']
    email = request.form['Email']
    newUser = User(username, password, email)

    if request.method == 'POST':
        existing_user = users.find_one({'name' : newUser.username})
        existing_email = users.find_one({'email' : newUser.email})

        if existing_email is None :
            if  existing_user is None :
                    newUser.save()
                    return redirect(url_for('connect'))
            
            return 'That username already exists!'

        return 'that Email already exists ! '

    return render_template('register.html')


#logout
@app.route('/logout', methods=['GET'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))



#subscribe function
@app.route('/subscrib', methods=['POST','GET'])
def subscrib():
    if request.method == 'POST':
        emails = mongo.db.emails
        existing_emails = emails.find_one({'email' : request.form['email']})

        if existing_emails is None:
            emails.insert({'email': request.form['email']})
            return jsonify({'success' : 'your email was sent with success !!'})

        return jsonify({'error' : 'Your Email already Exists !! '})

    return jsonify({'none' : ' Method Out Of Control : '})     




#adding ToDo
@app.route('/todo',methods=['POST', 'GET'])
def todo():
    todos=mongo.db.todos
    if request.method == 'POST':
        name=request.values.get("name")
        newTodo = ToDo(name,'',"all")
        if name !='':
            newTodo.save()
            return redirect("/")  

        return ('',204)

    return ('',204)



#remove Todo
@app.route("/remove")
def remove ():
    #Deleting a Task with various reference/addSkills,
    todos=mongo.db.todos
    key=request.values.get("_id")
    todos.remove({"_id":ObjectId(key)})
    return ('',204)



#update ToDo
@app.route("/update", methods=['POST', 'GET'])
def update ():
    todos=mongo.db.todos
    data=request.form['quickEdit']
    return key



#add Skill
@app.route("/addSkill", methods=['POST','GET'] )
def addSkill():
    skills = mongo.db.skills
    if request.method == 'POST':
        name=request.values.get("skill_input")
        newSkill = Skills(name)
        if name !='':
            newSkill.save()
            return redirect("/")

        return ('',204)

    return ('',204)    


#add dailies
@app.route("/addDailies", methods=['POST','GET'] )
def addDailies():
    dailies = mongo.db.dailies
    if request.method == 'POST':
        name= request.form['title']
        cat = request.form['categorie']
        newDailies = Dailies(name,cat)
        if name !='':
            newDailies.save()
            return jsonify({'title':name, 'categorie':cat})

        return ('',204)

    return ('',204)  



#feedback systeme
#add feedback
@app.route("/feedback",methods=['POST', 'GET'])
def feedback():
    if request.method == 'POST':
        feedbs=mongo.db.feedbs
        pseudo=request.values.get("pseudo")
        comment=request.values.get("comment")

        if comment !='':
            if pseudo == '':
                pseudo='anonymous'

            feedbs.insert({'pseudo':pseudo, 'comment':comment})
            return redirect('/')

        return 'comment empty'

    return 'not allowd'

#delete feedback
@app.route("/delfeedback",methods=['POST', 'GET'])
def delfeedback():
    feedbs=mongo.db.feedbs
    key=request.values.get("_id")
    feedbs.remove({"_id":ObjectId(key)})
    return redirect('/')


#lunching the Main Function
if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True, port=8081)

