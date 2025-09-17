# GridStack MCP Server

A comprehensive Model Context Protocol (MCP) server for GridStack.js - the powerful drag-and-drop grid layout library. This server provides complete access to GridStack's API through MCP tools and resources, making it easy to build dynamic dashboard layouts, responsive grids, and interactive widget systems.

## 🚀 Features

### Core GridStack Operations

- **Grid Management**: Initialize, destroy, enable/disable grids
- **Widget Operations**: Add, remove, update, move, resize widgets
- **Layout Control**: Compact, float mode, column management
- **Responsive Design**: Breakpoint configuration and responsive layouts
- **Serialization**: Save and load grid layouts to/from JSON
- **Event Handling**: Complete event system for grid interactions

### Developer Experience

- **26+ Tools**: Comprehensive coverage of GridStack API
- **Rich Resources**: Examples, templates, and documentation
- **Framework Integration**: React, Vue, Angular examples
- **CSS Support**: Tailwind CSS and CSS modules integration
- **Type Safety**: Full TypeScript support with detailed schemas

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository:**

```bash
git clone <repository-url>
cd gridstack-mcp-server
```

2. **Install dependencies:**

```bash
yarn install
# or
npm install
```

3. **Build the project:**

```bash
yarn build
# or
npm run build
```

## 🏃‍♂️ Running the Server

### Local Development

```bash
# Build and start the server
yarn build && yarn start

# Development mode with auto-rebuild
yarn dev
```

### MCP Client Integration

The server runs on stdio and follows the MCP protocol. Here's how to integrate it with different MCP clients:

#### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gridstack": {
      "command": "node",
      "args": ["/path/to/gridstack-mcp-server/dist/index.js"]
    }
  }
}
```

#### Cursor/VSCode Integration

```json
{
  "mcp.servers": {
    "gridstack": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "/path/to/gridstack-mcp-server"
    }
  }
}
```

### Testing the Server

Test with basic MCP commands:

```bash
# List available tools
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node dist/index.js

# Initialize a grid
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "gridstack_init", "arguments": {"options": {"column": 12, "cellHeight": "auto"}}}}' | node dist/index.js

# List resources
echo '{"jsonrpc": "2.0", "id": 1, "method": "resources/list"}' | node dist/index.js
```

## 🛠 Available Tools

### Grid Management

| Tool                 | Description                           |
| -------------------- | ------------------------------------- |
| `gridstack_init`     | Initialize new GridStack instance     |
| `gridstack_destroy`  | Destroy grid instance                 |
| `gridstack_enable`   | Enable/disable grid interactions      |
| `gridstack_add_grid` | Create grid with options and children |

### Widget Operations

| Tool                      | Description                   |
| ------------------------- | ----------------------------- |
| `gridstack_add_widget`    | Add new widget to grid        |
| `gridstack_remove_widget` | Remove widget from grid       |
| `gridstack_update_widget` | Update widget properties      |
| `gridstack_move_widget`   | Move widget to new position   |
| `gridstack_resize_widget` | Resize widget dimensions      |
| `gridstack_make_widget`   | Convert DOM element to widget |
| `gridstack_remove_all`    | Remove all widgets            |

### Layout Management

| Tool                     | Description                  |
| ------------------------ | ---------------------------- |
| `gridstack_compact`      | Compact grid layout          |
| `gridstack_float`        | Enable/disable floating mode |
| `gridstack_column`       | Change number of columns     |
| `gridstack_cell_height`  | Update cell height           |
| `gridstack_margin`       | Update grid margins          |
| `gridstack_batch_update` | Batch multiple operations    |

### Data & State

| Tool                       | Description           |
| -------------------------- | --------------------- |
| `gridstack_save`           | Save layout to JSON   |
| `gridstack_load`           | Load layout from JSON |
| `gridstack_get_grid_items` | Get all grid items    |
| `gridstack_get_margin`     | Get current margins   |
| `gridstack_get_column`     | Get column count      |
| `gridstack_get_float`      | Get float state       |

### Utilities

| Tool                            | Description                  |
| ------------------------------- | ---------------------------- |
| `gridstack_will_it_fit`         | Check if widget fits         |
| `gridstack_is_area_empty`       | Check if area is empty       |
| `gridstack_get_cell_height`     | Get current cell height      |
| `gridstack_get_cell_from_pixel` | Convert pixels to grid cells |

### Events

| Tool            | Description           |
| --------------- | --------------------- |
| `gridstack_on`  | Add event listener    |
| `gridstack_off` | Remove event listener |

### Responsive

| Tool                       | Description           |
| -------------------------- | --------------------- |
| `gridstack_set_responsive` | Configure breakpoints |

## 📚 Resources

The server provides several built-in resources:

- **`gridstack://documentation/api`** - Complete API documentation
- **`gridstack://examples/basic`** - Basic GridStack implementation
- **`gridstack://examples/responsive`** - Responsive grid example
- **`gridstack://examples/react`** - React integration
- **`gridstack://examples/vue`** - Vue integration
- **`gridstack://templates/dashboard`** - Dashboard template
- **`gridstack://css/custom`** - Custom CSS examples

## 💡 Usage Examples

### Basic Grid Initialization

```javascript
// Initialize a 12-column grid with auto height
const grid = GridStack.init({
  column: 12,
  cellHeight: "auto",
  margin: 10,
  float: false,
});
```

### Adding Widgets

```javascript
// Add a widget with specific position and size
grid.addWidget({
  x: 0,
  y: 0,
  w: 3,
  h: 2,
  content: '<div class="my-widget">Content</div>',
  id: "widget1",
});
```

### Responsive Configuration

```javascript
// Set up responsive breakpoints
grid.setResponsive([
  { w: 768, c: 1 }, // Mobile: 1 column
  { w: 992, c: 6 }, // Tablet: 6 columns
  { w: 1200, c: 12 }, // Desktop: 12 columns
]);
```

### Save/Load Layout

```javascript
// Save current layout
const layout = grid.save(true);
localStorage.setItem("dashboard-layout", JSON.stringify(layout));

// Load saved layout
const savedLayout = JSON.parse(localStorage.getItem("dashboard-layout"));
grid.load(savedLayout);
```

## 🎨 CSS Framework Support

### Tailwind CSS Integration

The server includes comprehensive Tailwind CSS support for modern, utility-first styling:

#### Installation

```bash
# Install Tailwind CSS
npm install -D tailwindcss @tailwindcss/forms @tailwindcss/typography
npx tailwindcss init
```

#### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "gs-1": "repeat(1, minmax(0, 1fr))",
        "gs-2": "repeat(2, minmax(0, 1fr))",
        "gs-3": "repeat(3, minmax(0, 1fr))",
        "gs-4": "repeat(4, minmax(0, 1fr))",
        "gs-5": "repeat(5, minmax(0, 1fr))",
        "gs-6": "repeat(6, minmax(0, 1fr))",
        "gs-7": "repeat(7, minmax(0, 1fr))",
        "gs-8": "repeat(8, minmax(0, 1fr))",
        "gs-9": "repeat(9, minmax(0, 1fr))",
        "gs-10": "repeat(10, minmax(0, 1fr))",
        "gs-11": "repeat(11, minmax(0, 1fr))",
        "gs-12": "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
```

#### Tailwind GridStack Styles

```css
/* Custom GridStack + Tailwind integration */
.grid-stack {
  @apply relative;
}

.grid-stack-item {
  @apply absolute transition-all duration-200 ease-in-out;
}

.grid-stack-item-content {
  @apply h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md;
}

.grid-stack-item-content.ui-draggable-dragging {
  @apply shadow-lg ring-2 ring-blue-500 ring-opacity-50;
}

.grid-stack-item-content.ui-resizable-resizing {
  @apply shadow-lg ring-2 ring-green-500 ring-opacity-50;
}

/* Responsive grid utilities */
.grid-stack-1 {
  @apply grid-cols-gs-1;
}
.grid-stack-2 {
  @apply grid-cols-gs-2;
}
.grid-stack-3 {
  @apply grid-cols-gs-3;
}
.grid-stack-4 {
  @apply grid-cols-gs-4;
}
.grid-stack-5 {
  @apply grid-cols-gs-5;
}
.grid-stack-6 {
  @apply grid-cols-gs-6;
}
.grid-stack-7 {
  @apply grid-cols-gs-7;
}
.grid-stack-8 {
  @apply grid-cols-gs-8;
}
.grid-stack-9 {
  @apply grid-cols-gs-9;
}
.grid-stack-10 {
  @apply grid-cols-gs-10;
}
.grid-stack-11 {
  @apply grid-cols-gs-11;
}
.grid-stack-12 {
  @apply grid-cols-gs-12;
}
```

#### Tailwind Widget Components

```html
<!-- Modern Dashboard Widget -->
<div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="3">
  <div
    class="grid-stack-item-content bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Sales Overview</h3>
      <div class="flex space-x-2">
        <button class="p-1 text-gray-400 hover:text-gray-600">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">This Month</span>
        <span class="text-2xl font-bold text-indigo-600">$24,500</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-indigo-600 h-2 rounded-full" style="width: 75%"></div>
      </div>
      <p class="text-sm text-green-600">↗ +12% from last month</p>
    </div>
  </div>
</div>
```

### CSS Modules Integration

For component-scoped styling, the server supports CSS Modules:

#### CSS Module Example

```css
/* Widget.module.css */
.widget {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.widget:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.widgetHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.widgetTitle {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.widgetValue {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

.widgetChart {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}
```

#### React Component with CSS Modules

```jsx
// Widget.jsx
import styles from "./Widget.module.css";

const Widget = ({ title, value, change, children }) => {
  return (
    <div className="grid-stack-item" gs-w="3" gs-h="2">
      <div className={`grid-stack-item-content ${styles.widget}`}>
        <div className={styles.widgetHeader}>
          <h3 className={styles.widgetTitle}>{title}</h3>
        </div>
        <div className={styles.widgetValue}>{value}</div>
        {change && <p className={styles.widgetChange}>{change}</p>}
        {children && <div className={styles.widgetChart}>{children}</div>}
      </div>
    </div>
  );
};
```

## 🔧 Advanced Configuration

### Custom Widget Types

```javascript
// Define custom widget templates
const widgetTemplates = {
  chart: {
    w: 4,
    h: 3,
    content: '<div class="chart-widget">Chart Content</div>',
    minW: 2,
    minH: 2,
  },
  kpi: {
    w: 2,
    h: 2,
    content: '<div class="kpi-widget">KPI Content</div>',
    noResize: true,
  },
};

// Use templates
grid.addWidget(widgetTemplates.chart);
```

### Event Handling

```javascript
// Listen to grid events
grid.on("change", (event, items) => {
  console.log("Layout changed:", items);
  // Auto-save layout
  localStorage.setItem("layout", JSON.stringify(grid.save()));
});

grid.on("added", (event, items) => {
  console.log("Widget added:", items);
});

grid.on("removed", (event, items) => {
  console.log("Widget removed:", items);
});
```

### Performance Optimization

```javascript
// Batch multiple operations
grid.batchUpdate(true);
grid.addWidget(widget1);
grid.addWidget(widget2);
grid.addWidget(widget3);
grid.batchUpdate(false); // Triggers single 'change' event
```

## 🚀 Framework Integration

### React Hook

```jsx
import { useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";

export const useGridStack = (options = {}) => {
  const gridRef = useRef(null);
  const [grid, setGrid] = useState(null);

  useEffect(() => {
    if (gridRef.current) {
      const gridInstance = GridStack.init(options, gridRef.current);
      setGrid(gridInstance);

      return () => gridInstance.destroy();
    }
  }, []);

  return { gridRef, grid };
};
```

### Vue Composable

```javascript
// useGridStack.js
import { ref, onMounted, onUnmounted } from "vue";
import { GridStack } from "gridstack";

export function useGridStack(options = {}) {
  const gridRef = ref(null);
  const grid = ref(null);

  onMounted(() => {
    if (gridRef.value) {
      grid.value = GridStack.init(options, gridRef.value);
    }
  });

  onUnmounted(() => {
    grid.value?.destroy();
  });

  return { gridRef, grid };
}
```

## 📖 API Reference

### Tool Parameters

Each tool accepts specific parameters. Here are the most commonly used:

#### Widget Configuration

```typescript
interface GridStackWidget {
  id?: string | number;
  x?: number; // X position (0-based)
  y?: number; // Y position (0-based)
  w?: number; // Width in columns
  h?: number; // Height in rows
  minW?: number; // Minimum width
  maxW?: number; // Maximum width
  minH?: number; // Minimum height
  maxH?: number; // Maximum height
  locked?: boolean; // Lock position/size
  noResize?: boolean; // Disable resizing
  noMove?: boolean; // Disable moving
  content?: string; // HTML content
}
```

#### Grid Options

```typescript
interface GridStackOptions {
  column?: number; // Number of columns (default: 12)
  cellHeight?: number | string; // Cell height ('auto', px, etc.)
  margin?: number | string; // Gap between items
  float?: boolean; // Enable floating widgets
  disableDrag?: boolean; // Disable dragging
  disableResize?: boolean; // Disable resizing
  animate?: boolean; // Enable animations
  acceptWidgets?: boolean; // Accept external widgets
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GridStack.js](https://github.com/gridstack/gridstack.js) - The amazing grid layout library
- [Model Context Protocol](https://modelcontextprotocol.io/) - The protocol this server implements
- [Anthropic](https://www.anthropic.com/) - For the MCP specification and Claude integration

## 📞 Support

- 📚 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/your-repo/gridstack-mcp-server/issues)
- 💬 [Discussions](https://github.com/your-repo/gridstack-mcp-server/discussions)

---

**Happy Grid Building! 🎯**
