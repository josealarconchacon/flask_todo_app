from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# configure flask app to connect to db
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://josealarconchacon@localhost:5432/flask_todo_app'
# link SQLAlchemy to Flask app
db = SQLAlchemy(app)


class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(), nullable=False)

# debugging statements, define dander-repr method
def __repr__ (self):
    return f'<Todo {self.id} {self.description}>'

db.create_all()

# Create
@app.route('/todos/create', methods=['POST'])
def create_todo():
    # create new todo obj
    description = request.get_json()['description'];
    todo = Todo(description=description)
    db.session.add(todo)
    db.session.commit()
    return jsonify({
        'description': todo.description
    })


@app.route('/')
def index():
    return render_template('index.html', data=Todo.query.all())