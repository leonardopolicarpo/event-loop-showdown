> 🇧🇷 **This README is also available in [Portuguese](./README.pt-BR.md).**

# Node.js Event Loop Showdown 🚀

A simple but powerful interactive demonstration of the Node.js Event Loop, showing the difference between blocking and non-blocking code execution using a real-time dashboard.

**[➡️ Live Demo URL ⬅️]**

---

## 🎯 The Concept

Node.js is single-threaded, which means it can only do one thing at a time. Its power comes from the **Event Loop**, which efficiently handles I/O operations (like database queries or API calls) without blocking the main thread.

However, long-running, CPU-intensive tasks can **block the Event Loop**, freezing the entire application and making it unable to respond to any other users.

This project visually demonstrates this exact problem and its solution.

## 🚀 The Demo

The live demo page establishes a real-time WebSocket connection with the server, which sends a `pong` message every second.

You have two buttons:

1.  **`Run Blocking Task`**: This triggers an API endpoint that performs a heavy, synchronous CPU calculation directly on the main thread.
    * **Observe:** You will see the stream of `pong` messages on the screen **freeze** completely until the calculation is done. This is the Event Loop being blocked.

2.  **`Run Non-Blocking Task`**: This triggers another endpoint that offloads the *exact same calculation* to a separate worker process (`child_process`).
    * **Observe:** The stream of `pong` messages **continues uninterrupted** while the heavy task runs in the background. The API remains responsive to all users.

## 🛠️ Technical Stack

* **Backend:** Node.js, Express.js
* **Real-time:** Socket.IO (WebSockets)
* **Concurrency:** Node.js `child_process` module
* **Frontend:** Vanilla HTML, CSS & JavaScript
* **Deployment:** Vercel

## ⚙️ How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/leonardopolicarpo/event-loop-showdown.git
    cd event-loop-showdown
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the server:
    ```bash
    node api/server.js
    ```
4.  Open `http://localhost:3333` in your browser.
