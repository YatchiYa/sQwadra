from flask import Flask, render_template, url_for, request, session, redirect, flash
from flask_pymongo import PyMongo
import bcrypt

app = Flask(__name__)

@app.route('/story')
def story():
    return render_template('Story.html')

@app.route('/aboutus')
def aboutus():
    return render_template('AboutUs.html')

@app.route('/connect', methods=['POST', 'GET'])
def connect():
    return render_template('index.html')