from flask import Blueprint, jsonify, request, make_response
from flask_httpauth import HTTPBasicAuth

from cscourses import db
from cscourses.models import Course, User

bp_api = Blueprint('api', __name__, url_prefix='/api')

http_auth = HTTPBasicAuth()


@bp_api.after_request
def add_header(response):
    # Note: this is redundant if you use Flask.jsonify as jsonify returns a response object and
    # sets the content type to application/json. Included in this repository so you are aware of the after_request
    # decorator
    response.headers['Content-Type'] = 'application/json'
    return response


@bp_api.errorhandler(404)
def not_found():
    error = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    response = jsonify(error)
    return make_response(response, 404)


@bp_api.errorhandler(401)
def not_authorised():
    error = {
        'status': 401,
        'message': 'You must provide username and password to access this resource',
    }
    response = jsonify(error)
    return make_response(response, 404)


@http_auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(name=username).first()
    if not user or not user.check_password(password):
        return False
    return True


@bp_api.route('/courses', methods=['GET'])
@http_auth.login_required
def read_courses():
    courses = Course.query.all()
    json = jsonify(courses=[c.serialize for c in courses])
    return make_response(json, 200)


@bp_api.route('/courses/<int:course_id>', methods=['GET'])
@http_auth.login_required
def read_course(course_id):
    course = Course.query.filter_by(id=course_id).first_or_404()
    json = jsonify(course=course.serialize)
    return make_response(json, 200)


@bp_api.route('/courses', methods=['POST'])
@http_auth.login_required
def create_course():
    '''To create a new course all fields must be provided'''
    # request.args.get() will return None if the arg is not present in the request
    course_code = request.args.get('course_code', type=str)
    name = request.args.get('name', type=str)
    teacher_id = request.args.get('teacher_id', type=int)
    # The following line checks if any of the variables are None
    if None in (course_code, name, teacher_id):
        headers = {"Content-Type": "application/json"}
        json = jsonify({'message': 'Please provide: course_code, name, teacher_id'})
        return make_response(json, 400, headers)
    course = Course(course_code=course_code, name=name, teacher_id=teacher_id)
    db.session.add(course)
    db.session.commit()
    json = jsonify(Course=course.serialize)
    return make_response(json, 201)


@bp_api.route('/courses/<int:course_id>', methods=['PUT'])
@http_auth.login_required
def update_course(course_id):
    # Find the course by its ID
    course = db.session.query(Course).filter_by(id=course_id).first_or_404()
    # Create variables using the values posted in the request
    course_name = request.args.get('course_name')
    teacher_id = request.args.get('teacher_id')
    course_code = request.args.get('course_code')
    # If any of the variables have a provided value then update the database
    if course_name is not None:
        course.name = course_name
    if teacher_id is not None:
        course.teacher_id = teacher_id
    if course_code is not None:
        course.course_code = course_code
    db.session.commit()
    json = jsonify({'message': 'Updated Course with id {}'.format(course.id)})
    return make_response(json, 200)


@bp_api.route('/courses/<int:course_id>', methods=['DELETE'])
@http_auth.login_required
def delete_course(course_id):
    course = Course.query.filter_by(id=course_id).one()
    db.session.delete(course)
    db.session.commit()
    json = jsonify({'message': 'Removed Course with id {}'.format(course_id)})
    return make_response(json, 200)


@bp_api.route('/users', methods=['POST'])
def create_user():
    username = request.args.get('username')
    password = request.args.get('password')
    if username is None or password is None:
        json = jsonify({'message': 'Missing username or password'})
        return make_response(json, 400)
    if User.query.filter_by(name=username).first() is not None:
        json = jsonify({'message': 'Duplicate username'})
        return make_response(json, 400)
    user = User(name=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    json = jsonify({'user_id': '{}'.format(user.id), 'name': '{}'.format(user.name)})
    return make_response(json, 201)
