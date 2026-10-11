# SecureCore — Request Flow

**Module 2: Queues and Linked Lists**
Part of the Data Structures micro-project *Intelligent Access Verification System* (high-security biomedical research lab).

A small web simulation that shows why a **circular queue** is better than a **linear array queue**, and how a **linked list** lets an access log grow without a fixed size.

## Problem Being Demonstrated

| Structure | Limitation / Strength |
|---|---|
| Linear array queue | `rear` only moves forward. Once it reaches the end of the array, no new request can be added, even if earlier (front) slots are free. |
| Circular queue | `rear` wraps around using modulo, so freed slots are reused. |
| Linked list | Nodes are created as needed, so the access log grows dynamically. |

## Features

- **Generate Access Request:** enter a Researcher ID and choose a lab zone (Lab A / B / C).
- **Linear Queue (capacity 4):** enqueue, dequeue and reset. It shows the "rear reached the end" limitation.
- **Circular Queue (capacity 4):** enqueue and dequeue with FRONT and REAR markers. Slots are reused after wraparound.
- **Access History (linked list view):** add access logs and see each entry linked with `→ NEXT`, ending in `→ NULL`. The history can be cleared at any time.
- Responsive layout for desktop and mobile.

## Project Structure

- `index.html` — page structure (panels, buttons, containers)
- `style.css` — styling and responsive layout
- `script.js` — queue and log logic, rendering

## How to Run

1. Put `index.html`, `style.css` and `script.js` in the same folder.
2. Open `index.html` in any modern browser.

No installation or server is needed.

To host it online, enable **GitHub Pages**: Settings → Pages → deploy from the `main` branch.

## How to Use (Demo Steps)

**Show the linear queue limitation**
1. Enter an ID and click **Generate request**.
2. Click **Linear Queue → Enqueue** 4 times (all slots full).
3. Click **Dequeue** to free a front slot.
4. Click **Enqueue** again. The message says the rear reached the end, so a reset is required even though a front slot is free.

**Show the circular queue fix**
1. Click **Circular Queue → Enqueue** 4 times (full).
2. Click **Dequeue** to free a slot.
3. Click **Enqueue** again. The request goes into the freed slot because the rear wraps around.

**Show the linked list log**
1. Click **Add access log** several times.
2. Each entry appears as a node pointing to the next, ending in NULL.
3. Click **Clear history** to empty the list.

## How It Works

**Linear queue**
- Enqueue: if `rear >= SIZE`, show the limitation message. Otherwise `queue[rear++] = request`.
- Dequeue: remove from the front. The rear does **not** move backward.

**Circular queue**
- Enqueue: if `count == SIZE`, the queue is full. Otherwise `rear = (rear + 1) % SIZE`, `queue[rear] = request`, `count++`.
- Dequeue: if `count == 0`, the queue is empty. Otherwise `front = (front + 1) % SIZE`, `count--`.

**Access log (linked list)**
Each log entry is a node holding its data and a pointer to the next node. New logs are appended at the end, and the last node points to NULL. In this web version, the nodes are kept in a JavaScript array and drawn with `→ NEXT` / `→ NULL` labels to show the links.

## Complexity

| Operation | Linear queue | Circular queue | Linked list (append at tail) |
|---|---|---|---|
| Enqueue / Append | O(1) | O(1) | O(1) with a tail pointer |
| Dequeue | O(1) | O(1) | — |
| Search | O(n) | O(n) | O(n) |
| Memory | Fixed array | Fixed array | Grows per node, plus pointer overhead |

## Trade-offs

- Circular queues fix the wasted space but still have a **fixed capacity**.
- Linked lists have **no fixed size**, but each node needs extra memory for its pointer, and searching requires traversing the list.

## Technologies

HTML5 · CSS3 · JavaScript (vanilla, no libraries)

## Team

- **Member 2 — Bhavana:** Module 2, Queues and Linked Lists
- Course: Data Structures, Alliance School of Advanced Computing
