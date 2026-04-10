import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WORKING");
});

app.post("/test-record", (req, res) => {
  console.log("TEST HIT");
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
// // RAILWAY-SAFE TEST VERSION
// // Designed for Railway limitations:
// // - Single short test recording
// // - No long-running background jobs
// // - No channel watcher
// // - Minimal disk usage
// // - Optional upload via rclone (if installed)

// import express from 'express';
// import { spawn, exec } from 'child_process';
// import fs from 'fs';

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 3000;
// const MAX_DURATION = 120; // max 2 minutes on Railway

// let active = false;

// // =========================
// // HEALTH CHECK
// // =========================
// app.get('/', (req, res) => {
//   res.send('Railway test recorder is running');
// });

// // =========================
// // TEST RECORD ENDPOINT
// // =========================

// app.post("/test-record", async (req, res) => {
//   const { url } = req.body;

//   console.log("TEST STARTED:", url);

//   try {
//     const result = {
//       ok: true,
//       received: url,
//       time: new Date().toISOString()
//     };

//     console.log("TEST COMPLETE");
//     res.json(result);
//   } catch (err) {
//     console.log("ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/test-record', (req, res) => {
//   const { url, duration = 60 } = req.body;

//   if (!url) return res.status(400).send('Missing URL');
//   if (active) return res.status(429).send('Already recording');

//   const safeDuration = Math.min(duration, MAX_DURATION);
//   const id = Date.now().toString();
//   const file = `downloads/${id}.mp4`;

//   active = true;

//   const process = spawn('yt-dlp', [
//   '--live-from-start',
//   '--no-part',
//   '-o', file,
//   url
//   ]);


// // =========================
// // UPLOAD + CLEANUP
// // =========================
// function uploadAndCleanup(file, id) {
//   // If rclone is available, try upload
//   exec(`rclone move ${file} remote:test/${id}.mp4`, (err) => {
//     if (err) {
//       console.log('Upload skipped or failed, deleting locally');
//       fs.unlink(file, () => {});
//       return;
//     }

//     console.log('Uploaded and removed local file');
//   });
// }

// // =========================
// // START SERVER
// // =========================
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
