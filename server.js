const express = require("express");
const multer = require("multer");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const port = 3000;

// Configure Multer (save uploaded PDFs to /tmp)
const upload = multer({ dest: "/tmp" });

// Serve static files (your HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Handle print form submission
app.post("/print", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const PrinterCUPSName = WebPrinter_1;
  const filePath = req.file.path;
  const quality = req.body.quality || "draft";
  const duplex = req.body.duplex ? "two-sided-long-edge" : "one-sided";

  // Build lp command
  const cmd = `lp -d ${WebPrinter_1} -o print-quality=${quality} -o sides=${duplex} "${filePath}"`;

  console.log("Running:", cmd);

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("Error:", stderr);
      return res.status(500).send(`<h2>❌ Print failed</h2><pre>${stderr}</pre>`);
    }

    console.log("Success:", stdout);
    res.send(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>Print Status</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Poppins', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: linear-gradient(90deg, orange, lightblue);
              background-size: 200% 200%;
              animation: gradientShift 8s ease infinite;
            }
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .status-box {
              background: rgba(255, 255, 255, 0.95);
              padding: 2rem;
              border-radius: 16px;
              box-shadow: 0 8px 24px rgba(0,0,0,0.2);
              text-align: center;
            }
            h2 { margin-bottom: 1rem; }
            a {
              display: inline-block;
              margin-top: 1rem;
              text-decoration: none;
              padding: 0.75rem 1.25rem;
              border-radius: 10px;
              background: linear-gradient(90deg, #ff7e5f, #0077b6);
              color: white;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="status-box">
            <h2>✅ Print job sent successfully!</h2>
            <pre>${stdout}</pre>
            <a href="/home.html">Back to Print Menu</a>
          </div>
        </body>
      </html>
    `);
  });
});

app.listen(port, () => {
  console.log(`Print server running at http://localhost:${port}`);
});
