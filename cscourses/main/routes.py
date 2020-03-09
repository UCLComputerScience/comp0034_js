import requests
from flask import render_template, Blueprint, request, flash, redirect, url_for
from flask_login import current_user
from sqlalchemy import or_
from sqlalchemy.orm import with_polymorphic

from cscourses import db
from cscourses.models import Course, Student, Teacher, User

bp_main = Blueprint('main', __name__)


@bp_main.route('/')
def index(name=""):
    if current_user.is_authenticated:
        name = current_user.name
    return render_template("index.html", name=name)


@bp_main.route('/courses', methods=['GET'])
def courses():
    courses = Course.query.join(Teacher).with_entities(Course.course_code, Course.name,
                                                       Teacher.name.label('teacher_name')).all()
    return render_template("courses.html", courses=courses)


@bp_main.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        term = request.form['search_term']
        if term == "":
            flash("Enter a name to search for")
            return redirect(url_for('main.index'))
        users = with_polymorphic(User, [Student, Teacher])
        results = db.session.query(users).filter(
            or_(users.Student.name.contains(term), users.Teacher.name.contains(term))).all()
        if not results:
            flash("No students found with that name.")
            return redirect(url_for('main.index'))
        return render_template('search_results.html', results=results)
    else:
        return redirect(url_for('main.index'))


@bp_main.route('/api_courses', methods=['GET'])
def api_courses():
    response = requests.get('http://localhost:5000/api/courses', auth=('sarah_api', 'sanders'))
    # response.json returns a dict, in this case it is a nested dictionary
    courses = response.json()
    return render_template('courses_api_client.html', courses=courses)


@bp_main.route('/news')
def news():
    # Make an API call, and store the response.
    response = requests.get('https://hacker-news.firebaseio.com/v0/topstories.json')
    # Process information about the first 10 news item in the top stories list.
    item_ids = response.json()
    stories = []
    for item_id in item_ids[:10]:
        # Make a separate API call for each item.
        url = ('https://hacker-news.firebaseio.com/v0/item/' + str(item_id) + '.json')
        response = requests.get(url)
        story_data = response.json()
        story = {'title': story_data['title'], 'url': story_data['url'], }
        stories.append(story)
    return render_template('news.html', stories=stories)
