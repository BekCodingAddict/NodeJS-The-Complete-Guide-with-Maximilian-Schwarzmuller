# Section 6: Working With Dynamic Content & Adding Template Engines

## Errors

### 1. throw new TypeError

- Definition: throw new TypeError('app.use() requires a middleware function') and TypeError: app.use() requires a middleware function
- Solution: The issue arises because the way you use exports and module.exports changes how you access the exported content. Let's clarify the difference and resolve your issue.

1. Using module.exports = router
   When you use module.exports = router, you're exporting the router object directly. To use it in another file, you can simply do:

```javascript
// Export
module.exports = router;

// Import
const router = require("./path/to/file");
app.use("/somePath", router);
```

This works because require returns the value assigned to module.exports.

2.2. Using exports.routes = router
When you use exports.routes = router, you're adding a routes property to the exports object. To use it, you need to access the routes property explicitly in the importing file:

```javascript
// Export
exports.routes = router;

// Import
const { routes } = require("./path/to/file");
app.use("/somePath", routes);
```

If you don't access the routes property (e.g., you try to pass require('./path/to/file') directly to app.use()), you'll get the error because the entire object ({ routes: router, products: products }) is not a valid middleware function.
