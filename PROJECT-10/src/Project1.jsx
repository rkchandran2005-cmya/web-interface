import { useState } from 'react'
import './Project1.css'

function Project1() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const completedCount = tasks.filter((task) => task.completed).length

  function addTask(event) {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title, completed: false },
    ])
    setNewTask('')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  return (
    <main className="todo-page">
      <section className="todo-app" aria-labelledby="todo-title">
        <header className="todo-header">
          <div className="eyebrow"><span /> DAILY NOTES</div>
          <h1 id="todo-title">Make room<br />for what matters.</h1>
          <p className="intro">A little progress, one task at a time.</p>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <label className="sr-only" htmlFor="new-task">Add a task</label>
          <input
            id="new-task"
            type="text"
            placeholder="What needs doing today?"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button type="submit" className="add-button">
            <span aria-hidden="true">+</span> Add
          </button>
        </form>

        <div className="list-heading">
          <h2>Today&apos;s list</h2>
          <span className="task-count">
            {completedCount} / {tasks.length} done
          </span>
        </div>

        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className={`task-row${task.completed ? ' is-complete' : ''}`} key={task.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="custom-checkbox" aria-hidden="true" />
                  <span className="task-title">{task.title}</span>
                </label>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  title="Delete task"
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 10h-7L6.1 6m2.4 3v4m3-4v4" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-mark" aria-hidden="true">+</span>
            <p>Your list is clear.</p>
            <span>Add a task to get started.</span>
          </div>
        )}

        <footer className="todo-footer">
          <span>SMALL STEPS COUNT</span>
          <span className="footer-line" />
          <span>{tasks.length - completedCount} remaining</span>
        </footer>
      </section>
    </main>
  )
}

export default Project1