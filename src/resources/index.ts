import { Resource } from "@modelcontextprotocol/sdk/types.js";
import { GridStackUtils } from "../utils/gridstack-utils.js";

export class GridStackResources {
  private readonly utils: GridStackUtils;

  constructor() {
    this.utils = new GridStackUtils();
  }

  listResources(): Resource[] {
    return [
      {
        uri: "gridstack://documentation/api",
        name: "GridStack API Documentation",
        description: "Complete GridStack API reference",
        mimeType: "text/markdown",
      },
      {
        uri: "gridstack://examples/basic",
        name: "Basic GridStack Example",
        description: "Simple GridStack implementation",
        mimeType: "text/html",
      },
      {
        uri: "gridstack://examples/responsive",
        name: "Responsive GridStack Example",
        description: "Responsive grid with breakpoints",
        mimeType: "text/html",
      },
      {
        uri: "gridstack://examples/react",
        name: "React Integration",
        description: "GridStack with React component",
        mimeType: "text/javascript",
      },
      {
        uri: "gridstack://examples/vue",
        name: "Vue Integration",
        description: "GridStack with Vue component",
        mimeType: "text/javascript",
      },
      {
        uri: "gridstack://templates/dashboard",
        name: "Dashboard Template",
        description: "Complete dashboard layout template",
        mimeType: "text/html",
      },
      {
        uri: "gridstack://css/custom",
        name: "Custom CSS Styles",
        description: "Custom GridStack styling examples",
        mimeType: "text/css",
      },
      {
        uri: "gridstack://css/tailwind",
        name: "Tailwind CSS Integration",
        description: "Complete Tailwind CSS setup for GridStack",
        mimeType: "text/css",
      },
      {
        uri: "gridstack://css/modules",
        name: "CSS Modules Examples",
        description: "Component-scoped CSS modules for GridStack",
        mimeType: "text/css",
      },
      {
        uri: "gridstack://examples/tailwind-dashboard",
        name: "Tailwind Dashboard Example",
        description: "Modern dashboard using Tailwind CSS",
        mimeType: "text/html",
      },
    ];
  }

  async readResource(
    uri: string
  ): Promise<{ content: string; mimeType: string }> {
    switch (uri) {
      case "gridstack://documentation/api":
        return {
          content: this.getAPIDocumentation(),
          mimeType: "text/markdown",
        };

      case "gridstack://examples/basic":
        return {
          content: this.getBasicExample(),
          mimeType: "text/html",
        };

      case "gridstack://examples/responsive":
        return {
          content: this.getResponsiveExample(),
          mimeType: "text/html",
        };

      case "gridstack://examples/react":
        return {
          content: this.utils.generateFrameworkIntegration("react"),
          mimeType: "text/javascript",
        };

      case "gridstack://examples/vue":
        return {
          content: this.utils.generateFrameworkIntegration("vue"),
          mimeType: "text/javascript",
        };

      case "gridstack://templates/dashboard":
        return {
          content: this.getDashboardTemplate(),
          mimeType: "text/html",
        };

      case "gridstack://css/custom":
        return {
          content: this.getCustomCSS(),
          mimeType: "text/css",
        };

      case "gridstack://css/tailwind":
        return {
          content: this.getTailwindCSS(),
          mimeType: "text/css",
        };

      case "gridstack://css/modules":
        return {
          content: this.getCSSModules(),
          mimeType: "text/css",
        };

      case "gridstack://examples/tailwind-dashboard":
        return {
          content: this.getTailwindDashboard(),
          mimeType: "text/html",
        };

      default:
        throw new Error(`Resource not found: ${uri}`);
    }
  }

  private getAPIDocumentation(): string {
    return `# GridStack MCP Server API Documentation

## Overview
This MCP server provides comprehensive access to GridStack.js functionality through tools and resources.

## Available Tools

### Core Grid Management
- \`gridstack_init\` - Initialize a new GridStack instance
- \`gridstack_destroy\` - Destroy grid instance
- \`gridstack_enable\` - Enable/disable grid interactions

### Widget Management
- \`gridstack_add_widget\` - Add new widget
- \`gridstack_remove_widget\` - Remove widget
- \`gridstack_update_widget\` - Update widget properties
- \`gridstack_move_widget\` - Move widget position
- \`gridstack_resize_widget\` - Resize widget
- \`gridstack_make_widget\` - Convert DOM element to widget

### Layout Operations
- \`gridstack_compact\` - Compact grid layout
- \`gridstack_float\` - Enable/disable floating mode
- \`gridstack_column\` - Change column count
- \`gridstack_cell_height\` - Update cell height
- \`gridstack_margin\` - Update margins

### Serialization
- \`gridstack_save\` - Save layout to JSON
- \`gridstack_load\` - Load layout from JSON

### Utilities
- \`gridstack_will_it_fit\` - Check widget fit
- \`gridstack_is_area_empty\` - Check empty area
- \`gridstack_get_cell_height\` - Get current cell height

### Event Management
- \`gridstack_on\` - Add event listener
- \`gridstack_off\` - Remove event listener

## Event Types
- \`added\` - Widget added
- \`change\` - Layout changed
- \`drag\`, \`dragstart\`, \`dragstop\` - Drag events
- \`resize\`, \`resizestart\`, \`resizestop\` - Resize events
- \`removed\` - Widget removed

## Widget Configuration
\`\`\`json
{
  "id": "widget1",
  "x": 0, "y": 0,
  "w": 3, "h": 2,
  "minW": 1, "maxW": 6,
  "minH": 1, "maxH": 4,
  "locked": false,
  "noResize": false,
  "noMove": false,
  "content": "<div>Widget Content</div>"
}
\`\`\`

## Grid Options
\`\`\`json
{
  "column": 12,
  "cellHeight": "auto",
  "margin": 10,
  "float": false,
  "disableDrag": false,
  "disableResize": false,
  "animate": true,
  "acceptWidgets": true
}
\`\`\``;
  }

  private getBasicExample(): string {
    return this.utils.generateHTMLTemplate({
      column: 12,
      cellHeight: "auto",
      margin: 10,
      children: [
        { id: "widget1", x: 0, y: 0, w: 3, h: 2, content: "Widget 1" },
        { id: "widget2", x: 3, y: 0, w: 3, h: 2, content: "Widget 2" },
        { id: "widget3", x: 0, y: 2, w: 6, h: 3, content: "Large Widget" },
      ],
    });
  }

  private getResponsiveExample(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive GridStack</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack@12/dist/gridstack.min.css">
  <style>
    body { margin: 20px; font-family: Arial, sans-serif; }
    .grid-stack-item-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Responsive GridStack Demo</h1>
  <div class="grid-stack">
    <div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="2">
      <div class="grid-stack-item-content">Chart Widget</div>
    </div>
    <div class="grid-stack-item" gs-x="4" gs-y="0" gs-w="4" gs-h="2">
      <div class="grid-stack-item-content">Stats Widget</div>
    </div>
    <div class="grid-stack-item" gs-x="8" gs-y="0" gs-w="4" gs-h="2">
      <div class="grid-stack-item-content">News Widget</div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/gridstack@12/dist/gridstack-all.js"></script>
  <script>
    const grid = GridStack.init({
      columnOpts: {
        breakpoints: [
          { w: 768, c: 1 },   // Mobile: 1 column
          { w: 992, c: 6 },   // Tablet: 6 columns
          { w: 1200, c: 12 }  // Desktop: 12 columns
        ]
      },
      margin: 10,
      cellHeight: 'auto'
    });

    // Add responsive behavior
    window.addEventListener('resize', () => {
      grid.doLayout();
    });
  </script>
</body>
</html>`;
  }

  private getDashboardTemplate(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GridStack Dashboard</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack@12/dist/gridstack.min.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { 
      margin: 0; 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f7fa;
    }
    .dashboard-header {
      background: #2c3e50;
      color: white;
      padding: 1rem 2rem;
      margin-bottom: 2rem;
    }
    .grid-stack-item-content {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .widget-title { font-weight: bold; color: #2c3e50; }
    .widget-value { font-size: 2em; font-weight: bold; color: #3498db; }
    .chart-placeholder {
      flex: 1;
      background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="dashboard-header">
    <h1><i class="fas fa-tachometer-alt"></i> Business Dashboard</h1>
  </div>

  <div class="grid-stack">
    <!-- KPI Cards -->
    <div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="3" gs-h="2">
      <div class="grid-stack-item-content">
        <div class="widget-header">
          <span class="widget-title">Revenue</span>
          <i class="fas fa-dollar-sign" style="color: #27ae60;"></i>
        </div>
        <div class="widget-value">$127K</div>
        <small style="color: #27ae60;">↗ +12% from last month</small>
      </div>
    </div>

    <div class="grid-stack-item" gs-x="3" gs-y="0" gs-w="3" gs-h="2">
      <div class="grid-stack-item-content">
        <div class="widget-header">
          <span class="widget-title">Users</span>
          <i class="fas fa-users" style="color: #3498db;"></i>
        </div>
        <div class="widget-value">2.4K</div>
        <small style="color: #3498db;">↗ +8% from last month</small>
      </div>
    </div>

    <div class="grid-stack-item" gs-x="6" gs-y="0" gs-w="3" gs-h="2">
      <div class="grid-stack-item-content">
        <div class="widget-header">
          <span class="widget-title">Orders</span>
          <i class="fas fa-shopping-cart" style="color: #e74c3c;"></i>
        </div>
        <div class="widget-value">856</div>
        <small style="color: #e74c3c;">↗ +15% from last month</small>
      </div>
    </div>

    <div class="grid-stack-item" gs-x="9" gs-y="0" gs-w="3" gs-h="2">
      <div class="grid-stack-item-content">
        <div class="widget-header">
          <span class="widget-title">Conversion</span>
          <i class="fas fa-percentage" style="color: #f39c12;"></i>
        </div>
        <div class="widget-value">3.2%</div>
        <small style="color: #f39c12;">↗ +0.4% from last month</small>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid-stack-item" gs-x="0" gs-y="2" gs-w="8" gs-h="4">
      <div class="grid-stack-item-content">
        <div class="widget-header">
          <span class="widget-title">Sales Trend</span>
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="chart-placeholder">
          <i class="fas fa-chart-area fa-3x"></i>
        </div>
      </div>
    </div>

    <div class="grid-stack-item" gs-x="8" gs-y="2" gs-w="4" gs-h="4">
      <div class="grid-stack-item-content">
        <div class="widget-header">
          <span class="widget-title">Traffic Sources</span>
          <i class="fas fa-chart-pie"></i>
        </div>
        <div class="chart-placeholder">
          <i class="fas fa-chart-pie fa-3x"></i>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid-stack-item" gs-x="0" gs-y="6" gs-w="6" gs-h="3">
      <div class="grid-stack-item-content">
        <div class="widget-header">
          <span class="widget-title">Recent Orders</span>
          <i class="fas fa-list"></i>
        </div>
        <div style="flex: 1; overflow-y: auto;">
          <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <strong>#1234</strong> - John Doe - $89.99
          </div>
          <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <strong>#1235</strong> - Jane Smith - $156.50
          </div>
          <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <strong>#1236</strong> - Bob Johnson - $45.00
          </div>
        </div>
      </div>
    </div>

    <div class="grid-stack-item" gs-x="6" gs-y="6" gs-w="6" gs-h="3">
      <div class="grid-stack-item-content">
        <div class="widget-header">
          <span class="widget-title">System Status</span>
          <i class="fas fa-server"></i>
        </div>
        <div style="flex: 1;">
          <div style="margin: 10px 0;">
            <span>API Server</span>
            <span style="float: right; color: #27ae60;"><i class="fas fa-circle"></i> Online</span>
          </div>
          <div style="margin: 10px 0;">
            <span>Database</span>
            <span style="float: right; color: #27ae60;"><i class="fas fa-circle"></i> Online</span>
          </div>
          <div style="margin: 10px 0;">
            <span>CDN</span>
            <span style="float: right; color: #f39c12;"><i class="fas fa-circle"></i> Warning</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/gridstack@12/dist/gridstack-all.js"></script>
  <script>
    const grid = GridStack.init({
      column: 12,
      cellHeight: 70,
      margin: 15,
      animate: true,
      float: false
    });

    // Add some interactivity
    grid.on('change', (event, items) => {
      console.log('Dashboard layout changed:', items);
    });
  </script>
</body>
</html>`;
  }

  private getCustomCSS(): string {
    return this.utils.generateCustomCSS({
      cellHeight: 80,
      margin: 15,
      columns: 12,
      customColors: {
        background: "#ffffff",
        border: "#e1e5e9",
        hover: "#f8f9fa",
      },
    });
  }

  private getTailwindCSS(): string {
    return `/* GridStack + Tailwind CSS Integration */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* GridStack base styles */
.grid-stack {
  @apply relative;
}

.grid-stack-item {
  @apply absolute transition-all duration-200 ease-in-out;
}

.grid-stack-item-content {
  @apply h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md;
}

/* Drag/resize states */
.grid-stack-item-content.ui-draggable-dragging {
  @apply shadow-lg ring-2 ring-blue-500 ring-opacity-50;
}

.grid-stack-item-content.ui-resizable-resizing {
  @apply shadow-lg ring-2 ring-green-500 ring-opacity-50;
}

/* Widget variants */
.widget-primary {
  @apply bg-blue-50 border-blue-200;
}

.widget-success {
  @apply bg-green-50 border-green-200;
}

.widget-warning {
  @apply bg-yellow-50 border-yellow-200;
}`;
  }

  private getCSSModules(): string {
    return `/* Widget.module.css - MVP CSS Modules example */
.widget {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  height: 100%;
  transition: box-shadow 0.2s ease;
}

.widget:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.widgetHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.widgetTitle {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}

.widgetContent {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

/* Usage in React:
import styles from './Widget.module.css';

const Widget = ({ title, children }) => (
  <div className="grid-stack-item">
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>{title}</h3>
      </div>
      <div className={styles.widgetContent}>{children}</div>
    </div>
  </div>
);
*/`;
  }

  private getTailwindDashboard(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind GridStack Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack@12/dist/gridstack.min.css">
  <style>
    .grid-stack-item-content {
      @apply h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md;
    }
  </style>
</head>
<body class="bg-gray-50">
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
    
    <div class="grid-stack">
      <!-- KPI Widget -->
      <div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="3" gs-h="2">
        <div class="grid-stack-item-content bg-blue-50 border-blue-200">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-sm font-medium text-gray-700">Revenue</h3>
            <span class="text-xs text-blue-600">↗ +12%</span>
          </div>
          <div class="text-2xl font-bold text-blue-600">$24,500</div>
        </div>
      </div>

      <!-- Chart Widget -->
      <div class="grid-stack-item" gs-x="3" gs-y="0" gs-w="6" gs-h="4">
        <div class="grid-stack-item-content">
          <h3 class="text-sm font-medium text-gray-700 mb-3">Sales Chart</h3>
          <div class="h-full bg-gray-100 rounded flex items-center justify-center">
            <span class="text-gray-500">Chart Area</span>
          </div>
        </div>
      </div>

      <!-- List Widget -->
      <div class="grid-stack-item" gs-x="0" gs-y="2" gs-w="3" gs-h="3">
        <div class="grid-stack-item-content">
          <h3 class="text-sm font-medium text-gray-700 mb-3">Recent Orders</h3>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>#1234</span>
              <span class="text-green-600">$89.99</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>#1235</span>
              <span class="text-green-600">$156.50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/gridstack@12/dist/gridstack-all.js"></script>
  <script>
    const grid = GridStack.init({
      column: 12,
      cellHeight: 70,
      margin: 15
    });
  </script>
</body>
</html>`;
  }
}
