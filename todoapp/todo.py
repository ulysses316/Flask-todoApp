from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from todoapp.auth import login_required
from todoapp.db import get_db

bp = Blueprint('todo', __name__)

@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO note (title, body, author_id)'
                ' VALUES (?, ?, ?)',
                (title, body, g.user['id'])
            )
            db.commit()
            return redirect(url_for('index'))
    

    db=get_db()
    notes = db.execute(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM note p JOIN user u ON p.author_id = u.id'
        ' ORDER BY created DESC'
    ).fetchall()
    return render_template('index.html', notes=notes)

def get_todo(id, check_author=True):
    post = get_db().execute(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM note p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?',
        (id,)
    ).fetchone()

    if post is None:
        abort(404, f"Post id {id} doesn't exist.")

    if check_author and post['author_id'] != g.user['id']:
        abort(403)

    return post

@bp.route('/<int:id>/update', methods=['GET', 'POST'])
@login_required
def update(id):
    note = get_todo(id)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required'
        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE note SET title = ?, body = ?'
                ' WHERE id = ?',
                (title, body, id)
            )
            db.commit()
            return redirect(url_for('index'))

@bp.route('/<int:id>/delete', methods=['GET'])
@login_required
def delete(id):
    get_todo(id)
    db = get_db()
    db.execute('DELETE FROM note WHERE id = ?', (id,))
    db.commit()
    return redirect(url_for('index'))