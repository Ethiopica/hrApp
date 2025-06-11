const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(cors());

// Add custom routes before JSON Server router
server.use((req, res, next) => {
  try {
    if (req.method === "POST") {
      req.body.createdAt = Date.now();
    }
    next();
  } catch (error) {
    console.error("Error in middleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Use default router
server.use(router);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
}); 