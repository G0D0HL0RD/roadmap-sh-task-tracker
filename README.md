# roadmap-sh-task-tracker

Task tracker is a project used to track and manage your tasks. This is a simple CLI to track what you need to do, what you have done, and what you are currently working on.

## Requirements

- Node.js (v14+ recommended)

## Install / Run

1. Clone or open the repo.
2. From repo root run commands with Node:
   ```bash
   node index.js <command> [args...]
   ```

## Commands

- Add a task

  ```bash
  node index.js add "Task description"
  ```

  - Description required; status defaults to `todo`.

- Update a task

  ```bash
  node index.js update <id> "New description"
  ```

  - `id` must be a number. If missing or invalid you will see `No Task-id to update`.

- Delete a task

  ```bash
  node index.js delete <id>
  ```

- List tasks by status

  ```bash
  node index.js list <status>
  ```

  - Valid statuses: `todo`, `in-progress`, `done`.

- Mark task status
  ```bash
  node index.js mark <id> <status>
  ```

## Notes / Behavior

- Tasks persisted to `tasks.json` via `saveTasks`.
- Each task object: `{ id, description, status, createdAt, updatedAt }`.
- Common messages:
  - `Task description cannot be empty` — when adding with empty description.
  - `No Task-id to update` / `No Task-id to delete` — when ID is missing or non-numeric.
  - `Task updating failed.` / `No such Task is present!!!` — when ID not found.
- Wrap multi-word descriptions in quotes when calling from the shell.

## Example

```bash
node index.js add "Practice coding"
node index.js update 2 "Practice algorithms"
node index.js mark 2 done
node index.js list done
node index.js delete 2
```
