# ButtonCounter — Technical & Performance Requirements

## Purpose

Define the technical and performance requirements for the ButtonCounter application.

---

## Technology Stack

| Layer     | Technology | Role                       |
| --------- | ---------- | -------------------------- |
| Framework | SvelteKit  | Frontend & routing         |
| Language  | TypeScript | Type-safe development      |
| Database  | Turso      | Persistent counter storage |

---

## Functional Requirements Definition

1. Button Press Action: Count increases by 1
   Each time the button is pressed, the count increases by 1.

2. Timing of Saving Count to Database
   The count is saved to the database each time the button is pressed.

3. Count Retention After Page Reload
   When the page is opened, the current count stored in the database is displayed.

4. Necessity of Reset Function
   A reset button will be implemented. Pressing it resets the count to 0 and reflects this in the database.

---

## Performance Requirements

### Response Time

- **Target:** Under 200ms from button press to count update reflected in the UI.
- This includes the full round-trip: client request → server processing → DB write → response → UI update.

---

## Concurrent Access

### Behavior

When multiple users press the button simultaneously, the counter must reflect every press without losing any increment.

### Strategy: Atomic DB Increment

All counter updates are performed using a single SQL statement:

```sql
UPDATE counter SET count = count + 1 WHERE id = 1;
```

**Why this works:**

- The increment happens entirely inside the database — no read-then-write cycle on the application side.
- The database serializes concurrent writes, preventing lost updates.
- Simple to implement and reliable under load.

---

## Error Handling

### DB Connection Failure (or any server-side error)

| Audience  | Behavior                                                                                 |
| --------- | ---------------------------------------------------------------------------------------- |
| User      | Display a clear, friendly error message (e.g. "Something went wrong. Please try again.") |
| Developer | Log the full error server-side, including timestamp, error type, and stack trace         |

### Principles

- The user should never see a raw error or stack trace.
- All errors must be logged with enough context to diagnose the issue.
- The UI should remain usable after an error (no broken/frozen state).

---

## Data Model / DB Schema

### Table: `counter`

```sql
CREATE TABLE IF NOT EXISTS counter (
  id    INTEGER PRIMARY KEY DEFAULT 1,
  count INTEGER NOT NULL DEFAULT 0
);
```

| Column | Type    | Description                               |
| ------ | ------- | ----------------------------------------- |
| id     | INTEGER | Always `1` — single global counter        |
| count  | INTEGER | Current button press count, starts at `0` |

### Notes

- The table holds a single row (`id = 1`) representing the global counter.
- On first deploy, the row must be seeded: `INSERT INTO counter (id, count) VALUES (1, 0);`
- No additional tables are required for v1.

---

## API Design

### Approach: REST Endpoints (SvelteKit server routes)

| Method | Endpoint       | Description                       |
| ------ | -------------- | --------------------------------- |
| GET    | `/api/counter` | Returns the current counter value |
| POST   | `/api/counter` | Increments the counter by 1       |

### GET `/api/counter`

**Response (200 OK):**

```json
{ "count": 42 }
```

### POST `/api/counter`

**Response (200 OK):**

```json
{ "count": 43 }
```

**Response (500 Internal Server Error):**

```json
{ "error": "Something went wrong. Please try again." }
```

### Notes

- No request body is needed for `POST` — the increment is always `+1`.
- Both endpoints return the latest count so the UI can update immediately after a press.

---

## Real-time / Sync Strategy

### Approach: Server-Sent Events (SSE)

The server pushes count updates to all connected clients instantly whenever the counter changes — no client-side polling required.

| Setting   | Value                                      |
| --------- | ------------------------------------------ |
| Endpoint  | `GET /api/counter/stream`                  |
| Direction | Server → Client (one-way push)             |
| Trigger   | Opened on page load, closed on page unload |

### Behavior

- On page load, the client opens a persistent SSE connection to `/api/counter/stream`.
- When any user presses the button, the server increments the counter and immediately pushes the updated count to all connected clients.
- The UI updates in real time without the client needing to make any additional requests.
- When the user presses the button, a `POST /api/counter` is sent — the response also returns the latest count for immediate local update, ahead of the SSE broadcast.

### SSE Event Format

```
data: {"count": 43}
```

### Notes

- SSE is unidirectional (server → client only), which is all ButtonCounter needs.
- SSE works natively in modern browsers with no additional libraries.
- If the connection drops, the browser will automatically attempt to reconnect.

---

## Environment & Configuration

All sensitive configuration is stored in environment variables and must never be committed to version control.

### Required Variables (`.env`)

| Variable             | Description                   |
| -------------------- | ----------------------------- |
| `TURSO_DATABASE_URL` | Turso database connection URL |
| `TURSO_AUTH_TOKEN`   | Turso authentication token    |

### Example `.env`

```env
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

### Notes

- A `.env.example` file with placeholder values should be committed to the repo as a reference.
- `.env` must be added to `.gitignore`.
- In production, these variables are set via the deployment platform's environment settings (e.g. Vercel, Cloudflare).

---
