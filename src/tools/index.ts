import { Tool } from "@modelcontextprotocol/sdk/types.js";
import {
  InitGridParams,
  AddWidgetParams,
  RemoveWidgetParams,
  UpdateWidgetParams,
  MoveWidgetParams,
  ResizeWidgetParams,
  SaveGridParams,
  LoadGridParams,
  BatchUpdateParams,
  CompactParams,
  FloatParams,
  ColumnParams,
  CellHeightParams,
  MarginParams,
  ResponsiveParams,
  EnableParams,
  DestroyParams,
  GetGridItemsParams,
} from "../types.js";
import { GridStackUtils } from "../utils/gridstack-utils.js";

export class GridStackTools {
  private readonly utils: GridStackUtils;

  constructor() {
    this.utils = new GridStackUtils();
  }

  listTools(): Tool[] {
    return [
      // Core Grid Management
      {
        name: "gridstack_init",
        description:
          "Initialize a new GridStack instance with specified options",
        inputSchema: {
          type: "object",
          properties: {
            selector: {
              type: "string",
              description: "CSS selector for the grid container element",
              default: ".grid-stack",
            },
            options: {
              type: "object",
              description: "GridStack initialization options",
              properties: {
                acceptWidgets: {
                  oneOf: [{ type: "boolean" }, { type: "string" }],
                  description:
                    "Accept widgets from other grids or external elements",
                },
                alwaysShowResizeHandle: {
                  type: "boolean",
                  description: "Always show resize handles",
                },
                animate: {
                  type: "boolean",
                  description: "Enable animations",
                },
                auto: {
                  type: "boolean",
                  description: "Auto-position widgets",
                },
                cellHeight: {
                  oneOf: [{ type: "number" }, { type: "string" }],
                  description: "Cell height (px, 'auto', 'initial', CSS units)",
                },
                cellHeightThrottle: {
                  type: "number",
                  description: "Throttle time for cellHeight='auto' (ms)",
                },
                column: {
                  oneOf: [
                    { type: "number" },
                    { type: "string", enum: ["auto"] },
                  ],
                  description: "Number of columns or 'auto' for nested grids",
                },
                disableDrag: {
                  type: "boolean",
                  description: "Disable dragging of widgets",
                },
                disableResize: {
                  type: "boolean",
                  description: "Disable resizing of widgets",
                },
                float: {
                  type: "boolean",
                  description: "Enable floating widgets",
                },
                handle: {
                  type: "string",
                  description: "Draggable handle selector",
                },
                margin: {
                  oneOf: [{ type: "number" }, { type: "string" }],
                  description: "Gap between grid items (px or CSS units)",
                },
                maxRow: {
                  type: "number",
                  description: "Maximum number of rows",
                },
                minRow: {
                  type: "number",
                  description: "Minimum number of rows",
                },
                removable: {
                  oneOf: [{ type: "boolean" }, { type: "string" }],
                  description: "Allow widgets to be removed by dragging out",
                },
                rtl: {
                  type: "boolean",
                  description: "Right-to-left support",
                },
                staticGrid: {
                  type: "boolean",
                  description: "Make grid static (no drag/resize)",
                },
              },
            },
          },
        },
      },

      // Widget Management
      {
        name: "gridstack_add_widget",
        description: "Add a new widget to the grid",
        inputSchema: {
          type: "object",
          required: ["widget"],
          properties: {
            widget: {
              type: "object",
              description: "Widget configuration",
              properties: {
                id: {
                  oneOf: [{ type: "string" }, { type: "number" }],
                  description: "Unique widget identifier",
                },
                x: { type: "number", description: "X position" },
                y: { type: "number", description: "Y position" },
                w: { type: "number", description: "Width in columns" },
                h: { type: "number", description: "Height in rows" },
                minW: { type: "number", description: "Minimum width" },
                maxW: { type: "number", description: "Maximum width" },
                minH: { type: "number", description: "Minimum height" },
                maxH: { type: "number", description: "Maximum height" },
                locked: {
                  type: "boolean",
                  description: "Lock widget position/size",
                },
                noResize: { type: "boolean", description: "Disable resizing" },
                noMove: { type: "boolean", description: "Disable moving" },
                autoPosition: {
                  type: "boolean",
                  description: "Auto-position widget",
                },
                resizeToContent: {
                  type: "boolean",
                  description: "Resize to content",
                },
                content: { type: "string", description: "Widget HTML content" },
              },
            },
            triggerAddEvent: {
              type: "boolean",
              description: "Trigger 'added' event",
              default: true,
            },
          },
        },
      },

      {
        name: "gridstack_remove_widget",
        description: "Remove a widget from the grid",
        inputSchema: {
          type: "object",
          required: ["el"],
          properties: {
            el: {
              type: "string",
              description: "Widget selector or ID to remove",
            },
            removeDOM: {
              type: "boolean",
              description: "Remove from DOM as well",
              default: true,
            },
            triggerEvent: {
              type: "boolean",
              description: "Trigger 'removed' event",
              default: true,
            },
          },
        },
      },

      {
        name: "gridstack_update_widget",
        description: "Update widget properties",
        inputSchema: {
          type: "object",
          required: ["el", "opts"],
          properties: {
            el: {
              type: "string",
              description: "Widget selector or ID to update",
            },
            opts: {
              type: "object",
              description: "Properties to update",
              properties: {
                x: { type: "number" },
                y: { type: "number" },
                w: { type: "number" },
                h: { type: "number" },
                minW: { type: "number" },
                maxW: { type: "number" },
                minH: { type: "number" },
                maxH: { type: "number" },
                locked: { type: "boolean" },
                noResize: { type: "boolean" },
                noMove: { type: "boolean" },
                content: { type: "string" },
              },
            },
          },
        },
      },

      {
        name: "gridstack_move_widget",
        description: "Move a widget to a new position",
        inputSchema: {
          type: "object",
          required: ["el"],
          properties: {
            el: {
              type: "string",
              description: "Widget selector or ID to move",
            },
            x: {
              type: "number",
              description: "New X position",
            },
            y: {
              type: "number",
              description: "New Y position",
            },
          },
        },
      },

      {
        name: "gridstack_resize_widget",
        description: "Resize a widget",
        inputSchema: {
          type: "object",
          required: ["el"],
          properties: {
            el: {
              type: "string",
              description: "Widget selector or ID to resize",
            },
            width: {
              type: "number",
              description: "New width in columns",
            },
            height: {
              type: "number",
              description: "New height in rows",
            },
          },
        },
      },

      // Layout Management
      {
        name: "gridstack_compact",
        description: "Compact the grid layout",
        inputSchema: {
          type: "object",
          properties: {
            layout: {
              type: "string",
              enum: ["moveScale", "move", "scale", "none", "list"],
              description: "Compact layout type",
              default: "moveScale",
            },
            doSort: {
              type: "boolean",
              description: "Sort widgets before compacting",
              default: true,
            },
          },
        },
      },

      {
        name: "gridstack_float",
        description: "Enable or disable floating widgets",
        inputSchema: {
          type: "object",
          properties: {
            val: {
              type: "boolean",
              description: "Enable floating (true) or disable (false)",
            },
          },
        },
      },

      {
        name: "gridstack_column",
        description: "Change the number of columns",
        inputSchema: {
          type: "object",
          required: ["column"],
          properties: {
            column: {
              oneOf: [{ type: "number" }, { type: "string", enum: ["auto"] }],
              description: "Number of columns or 'auto'",
            },
            layout: {
              type: "string",
              enum: ["moveScale", "move", "scale", "none", "list"],
              description: "How to re-layout widgets",
              default: "moveScale",
            },
          },
        },
      },

      {
        name: "gridstack_cell_height",
        description: "Update cell height",
        inputSchema: {
          type: "object",
          properties: {
            val: {
              oneOf: [{ type: "number" }, { type: "string" }],
              description: "New cell height (px, 'auto', 'initial', CSS units)",
            },
            update: {
              type: "boolean",
              description: "Update existing widgets",
              default: true,
            },
          },
        },
      },

      {
        name: "gridstack_margin",
        description: "Update grid margin/gap",
        inputSchema: {
          type: "object",
          required: ["value"],
          properties: {
            value: {
              oneOf: [{ type: "number" }, { type: "string" }],
              description: "Margin value (px or CSS format)",
            },
            unit: {
              type: "string",
              description: "CSS unit (px, em, rem, etc.)",
              default: "px",
            },
          },
        },
      },

      // Batch Operations
      {
        name: "gridstack_batch_update",
        description: "Enable/disable batch update mode for efficiency",
        inputSchema: {
          type: "object",
          properties: {
            flag: {
              type: "boolean",
              description: "Enable (true) or disable (false) batch mode",
              default: true,
            },
          },
        },
      },

      // Serialization
      {
        name: "gridstack_save",
        description: "Save grid layout to JSON",
        inputSchema: {
          type: "object",
          properties: {
            saveContent: {
              type: "boolean",
              description: "Include widget content in save",
              default: true,
            },
            saveGridOpt: {
              type: "boolean",
              description: "Include grid options in save",
              default: false,
            },
          },
        },
      },

      {
        name: "gridstack_load",
        description: "Load grid layout from JSON",
        inputSchema: {
          type: "object",
          required: ["layout"],
          properties: {
            layout: {
              oneOf: [
                {
                  type: "array",
                  items: {
                    type: "object",
                    description: "Widget configuration",
                  },
                },
                { type: "string" },
              ],
              description: "Layout data (JSON array or string)",
            },
            addAndRemove: {
              type: "boolean",
              description: "Add new widgets and remove missing ones",
              default: true,
            },
          },
        },
      },

      // Grid State
      {
        name: "gridstack_enable",
        description: "Enable or disable the grid",
        inputSchema: {
          type: "object",
          properties: {
            doEnable: {
              type: "boolean",
              description: "Enable (true) or disable (false) the grid",
              default: true,
            },
          },
        },
      },

      {
        name: "gridstack_destroy",
        description: "Destroy the grid instance",
        inputSchema: {
          type: "object",
          properties: {
            removeDOM: {
              type: "boolean",
              description: "Remove DOM elements",
              default: false,
            },
          },
        },
      },

      {
        name: "gridstack_get_grid_items",
        description: "Get all grid items",
        inputSchema: {
          type: "object",
          properties: {
            onlyVisible: {
              type: "boolean",
              description: "Only return visible items",
              default: false,
            },
          },
        },
      },

      // Responsive Features
      {
        name: "gridstack_set_responsive",
        description: "Configure responsive breakpoints",
        inputSchema: {
          type: "object",
          required: ["breakpoints"],
          properties: {
            breakpoints: {
              type: "array",
              items: {
                type: "object",
                required: ["w", "c"],
                properties: {
                  w: {
                    type: "number",
                    description: "Window width breakpoint",
                  },
                  c: {
                    type: "number",
                    description: "Number of columns at this breakpoint",
                  },
                },
              },
              description: "Array of breakpoint configurations",
            },
          },
        },
      },

      // Utility Functions
      {
        name: "gridstack_will_it_fit",
        description: "Check if a widget will fit at specified position",
        inputSchema: {
          type: "object",
          required: ["widget"],
          properties: {
            widget: {
              type: "object",
              required: ["x", "y", "w", "h"],
              properties: {
                x: { type: "number", description: "X position" },
                y: { type: "number", description: "Y position" },
                w: { type: "number", description: "Width" },
                h: { type: "number", description: "Height" },
                id: {
                  oneOf: [{ type: "string" }, { type: "number" }],
                  description: "Widget ID to ignore in collision check",
                },
              },
            },
          },
        },
      },

      {
        name: "gridstack_is_area_empty",
        description: "Check if an area is empty",
        inputSchema: {
          type: "object",
          required: ["x", "y", "w", "h"],
          properties: {
            x: { type: "number", description: "X position" },
            y: { type: "number", description: "Y position" },
            w: { type: "number", description: "Width" },
            h: { type: "number", description: "Height" },
          },
        },
      },

      {
        name: "gridstack_get_cell_height",
        description: "Get current cell height",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },

      {
        name: "gridstack_get_cell_from_pixel",
        description: "Convert pixel coordinates to grid cell position",
        inputSchema: {
          type: "object",
          required: ["position"],
          properties: {
            position: {
              type: "object",
              required: ["top", "left"],
              properties: {
                top: { type: "number", description: "Top pixel position" },
                left: { type: "number", description: "Left pixel position" },
              },
            },
            useOffset: {
              type: "boolean",
              description: "Use offset coordinates",
              default: false,
            },
          },
        },
      },

      // Event Management
      {
        name: "gridstack_on",
        description: "Add event listener",
        inputSchema: {
          type: "object",
          required: ["eventName", "callback"],
          properties: {
            eventName: {
              type: "string",
              enum: [
                "added",
                "change",
                "disable",
                "drag",
                "dragstart",
                "dragstop",
                "dropped",
                "enable",
                "removed",
                "resize",
                "resizestart",
                "resizestop",
              ],
              description: "Event name to listen for",
            },
            callback: {
              type: "string",
              description: "JavaScript callback function code",
            },
          },
        },
      },

      {
        name: "gridstack_off",
        description: "Remove event listener",
        inputSchema: {
          type: "object",
          required: ["eventName"],
          properties: {
            eventName: {
              type: "string",
              enum: [
                "added",
                "change",
                "disable",
                "drag",
                "dragstart",
                "dragstop",
                "dropped",
                "enable",
                "removed",
                "resize",
                "resizestart",
                "resizestop",
              ],
              description: "Event name to remove listener for",
            },
          },
        },
      },

      // Advanced Features
      {
        name: "gridstack_make_widget",
        description: "Convert an existing DOM element into a grid widget",
        inputSchema: {
          type: "object",
          required: ["el"],
          properties: {
            el: {
              type: "string",
              description: "Element selector to convert",
            },
            options: {
              type: "object",
              description: "Widget options",
              properties: {
                x: { type: "number" },
                y: { type: "number" },
                w: { type: "number" },
                h: { type: "number" },
                autoPosition: { type: "boolean" },
                minW: { type: "number" },
                maxW: { type: "number" },
                minH: { type: "number" },
                maxH: { type: "number" },
                locked: { type: "boolean" },
                noResize: { type: "boolean" },
                noMove: { type: "boolean" },
              },
            },
          },
        },
      },

      {
        name: "gridstack_remove_all",
        description: "Remove all widgets from the grid",
        inputSchema: {
          type: "object",
          properties: {
            removeDOM: {
              type: "boolean",
              description: "Remove DOM elements",
              default: true,
            },
          },
        },
      },

      {
        name: "gridstack_get_margin",
        description: "Get current margin values",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },

      {
        name: "gridstack_get_column",
        description: "Get current number of columns",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },

      {
        name: "gridstack_get_float",
        description: "Get current float state",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },

      {
        name: "gridstack_add_grid",
        description:
          "Create a new grid with options and children (static method)",
        inputSchema: {
          type: "object",
          required: ["parent"],
          properties: {
            parent: {
              type: "string",
              description: "Parent element selector",
            },
            opt: {
              type: "object",
              description: "Grid options including children",
              properties: {
                children: {
                  type: "array",
                  items: {
                    type: "object",
                    description: "Child widget configuration",
                  },
                  description: "Array of child widgets to load",
                },
              },
            },
          },
        },
      },
    ];
  }

  async callTool(name: string, args: any): Promise<string> {
    try {
      switch (name) {
        case "gridstack_init":
          return this.initGrid(args as InitGridParams);

        case "gridstack_add_widget":
          return this.addWidget(args as AddWidgetParams);

        case "gridstack_remove_widget":
          return this.removeWidget(args as RemoveWidgetParams);

        case "gridstack_update_widget":
          return this.updateWidget(args as UpdateWidgetParams);

        case "gridstack_move_widget":
          return this.moveWidget(args as MoveWidgetParams);

        case "gridstack_resize_widget":
          return this.resizeWidget(args as ResizeWidgetParams);

        case "gridstack_compact":
          return this.compact(args as CompactParams);

        case "gridstack_float":
          return this.float(args as FloatParams);

        case "gridstack_column":
          return this.column(args as ColumnParams);

        case "gridstack_cell_height":
          return this.cellHeight(args as CellHeightParams);

        case "gridstack_margin":
          return this.margin(args as MarginParams);

        case "gridstack_batch_update":
          return this.batchUpdate(args as BatchUpdateParams);

        case "gridstack_save":
          return this.save(args as SaveGridParams);

        case "gridstack_load":
          return this.load(args as LoadGridParams);

        case "gridstack_enable":
          return this.enable(args as EnableParams);

        case "gridstack_destroy":
          return this.destroy(args as DestroyParams);

        case "gridstack_get_grid_items":
          return this.getGridItems(args as GetGridItemsParams);

        case "gridstack_set_responsive":
          return this.setResponsive(args as ResponsiveParams);

        case "gridstack_will_it_fit":
          return this.willItFit(args);

        case "gridstack_is_area_empty":
          return this.isAreaEmpty(args);

        case "gridstack_get_cell_height":
          return this.getCellHeight();

        case "gridstack_get_cell_from_pixel":
          return this.getCellFromPixel(args);

        case "gridstack_on":
          return this.addEventListener(args);

        case "gridstack_off":
          return this.removeEventListener(args);

        case "gridstack_make_widget":
          return this.makeWidget(args);

        case "gridstack_remove_all":
          return this.removeAll(args);

        case "gridstack_get_margin":
          return this.getMargin();

        case "gridstack_get_column":
          return this.getColumn();

        case "gridstack_get_float":
          return this.getFloat();

        case "gridstack_add_grid":
          return this.addGrid(args);

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return `Error executing ${name}: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  // Tool implementations
  private async initGrid(params: InitGridParams): Promise<string> {
    const { selector = ".grid-stack", options = {} } = params;

    return this.utils.generateGridStackCode("init", {
      selector,
      options: this.utils.formatOptions(options),
      code: `const grid = GridStack.init(${JSON.stringify(
        options,
        null,
        2
      )}, '${selector}');`,
    });
  }

  private async addWidget(params: AddWidgetParams): Promise<string> {
    const { widget, triggerAddEvent = true } = params;

    return this.utils.generateGridStackCode("addWidget", {
      widget,
      triggerAddEvent,
      code: `grid.addWidget(${JSON.stringify(widget, null, 2)});`,
    });
  }

  private async removeWidget(params: RemoveWidgetParams): Promise<string> {
    const { el, removeDOM = true, triggerEvent = true } = params;

    return this.utils.generateGridStackCode("removeWidget", {
      element: el,
      removeDOM,
      triggerEvent,
      code: `grid.removeWidget('${String(
        el
      )}', ${removeDOM}, ${triggerEvent});`,
    });
  }

  private async updateWidget(params: UpdateWidgetParams): Promise<string> {
    const { el, opts } = params;

    return this.utils.generateGridStackCode("updateWidget", {
      element: el,
      options: opts,
      code: `grid.update('${String(el)}', ${JSON.stringify(opts, null, 2)});`,
    });
  }

  private async moveWidget(params: MoveWidgetParams): Promise<string> {
    const { el, x, y } = params;

    return this.utils.generateGridStackCode("moveWidget", {
      element: el,
      position: { x, y },
      code: `grid.move('${String(el)}', ${x}, ${y});`,
    });
  }

  private async resizeWidget(params: ResizeWidgetParams): Promise<string> {
    const { el, width, height } = params;

    return this.utils.generateGridStackCode("resizeWidget", {
      element: el,
      size: { width, height },
      code: `grid.resize('${String(el)}', ${width}, ${height});`,
    });
  }

  private async compact(params: CompactParams): Promise<string> {
    const { layout = "moveScale", doSort = true } = params;

    return this.utils.generateGridStackCode("compact", {
      layout,
      doSort,
      code: `grid.compact('${layout}', ${doSort});`,
    });
  }

  private async float(params: FloatParams): Promise<string> {
    const { val } = params;

    return this.utils.generateGridStackCode("float", {
      value: val,
      code: val !== undefined ? `grid.float(${val});` : `grid.float();`,
    });
  }

  private async column(params: ColumnParams): Promise<string> {
    const { column, layout = "moveScale" } = params;

    return this.utils.generateGridStackCode("column", {
      column,
      layout,
      code: `grid.column(${
        typeof column === "string" ? `'${column}'` : column
      }, '${layout}');`,
    });
  }

  private async cellHeight(params: CellHeightParams): Promise<string> {
    const { val, update = true } = params;

    return this.utils.generateGridStackCode("cellHeight", {
      value: val,
      update,
      code:
        val !== undefined
          ? `grid.cellHeight(${
              typeof val === "string" ? `'${val}'` : val
            }, ${update});`
          : `grid.cellHeight();`,
    });
  }

  private async margin(params: MarginParams): Promise<string> {
    const { value, unit = "px" } = params;

    return this.utils.generateGridStackCode("margin", {
      value,
      unit,
      code: `grid.margin(${typeof value === "string" ? `'${value}'` : value});`,
    });
  }

  private async batchUpdate(params: BatchUpdateParams): Promise<string> {
    const { flag = true } = params;

    return this.utils.generateGridStackCode("batchUpdate", {
      flag,
      code: `grid.batchUpdate(${flag});`,
    });
  }

  private async save(params: SaveGridParams): Promise<string> {
    const { saveContent = true, saveGridOpt = false } = params;

    return this.utils.generateGridStackCode("save", {
      saveContent,
      saveGridOpt,
      code: `const layout = grid.save(${saveContent}, ${saveGridOpt});`,
    });
  }

  private async load(params: LoadGridParams): Promise<string> {
    const { layout, addAndRemove = true } = params;

    const layoutData =
      typeof layout === "string" ? layout : JSON.stringify(layout, null, 2);
    const codeString = `grid.load(${layoutData}, ${addAndRemove});`;

    return this.utils.generateGridStackCode("load", {
      layout: layoutData,
      addAndRemove,
      code: codeString,
    });
  }

  private async enable(params: EnableParams): Promise<string> {
    const { doEnable = true } = params;

    return this.utils.generateGridStackCode("enable", {
      doEnable,
      code: doEnable ? `grid.enable();` : `grid.disable();`,
    });
  }

  private async destroy(params: DestroyParams): Promise<string> {
    const { removeDOM = false } = params;

    return this.utils.generateGridStackCode("destroy", {
      removeDOM,
      code: `grid.destroy(${removeDOM});`,
    });
  }

  private async getGridItems(params: GetGridItemsParams): Promise<string> {
    const { onlyVisible = false } = params;

    return this.utils.generateGridStackCode("getGridItems", {
      onlyVisible,
      code: `const items = grid.getGridItems(${onlyVisible});`,
    });
  }

  private async setResponsive(params: ResponsiveParams): Promise<string> {
    const { breakpoints } = params;

    return this.utils.generateGridStackCode("setResponsive", {
      breakpoints,
      code: `grid.setResponsive(${JSON.stringify(breakpoints, null, 2)});`,
    });
  }

  private async willItFit(params: any): Promise<string> {
    const { widget } = params;

    return this.utils.generateGridStackCode("willItFit", {
      widget,
      code: `const willFit = grid.willItFit(${JSON.stringify(
        widget,
        null,
        2
      )});`,
    });
  }

  private async isAreaEmpty(params: any): Promise<string> {
    const { x, y, w, h } = params;

    return this.utils.generateGridStackCode("isAreaEmpty", {
      area: { x, y, w, h },
      code: `const isEmpty = grid.isAreaEmpty(${x}, ${y}, ${w}, ${h});`,
    });
  }

  private async getCellHeight(): Promise<string> {
    return this.utils.generateGridStackCode("getCellHeight", {
      code: `const cellHeight = grid.getCellHeight();`,
    });
  }

  private async getCellFromPixel(params: any): Promise<string> {
    const { position, useOffset = false } = params;

    return this.utils.generateGridStackCode("getCellFromPixel", {
      position,
      useOffset,
      code: `const cell = grid.getCellFromPixel(${JSON.stringify(
        position
      )}, ${useOffset});`,
    });
  }

  private async addEventListener(params: any): Promise<string> {
    const { eventName, callback } = params;

    return this.utils.generateGridStackCode("addEventListener", {
      eventName,
      callback,
      code: `grid.on('${eventName}', ${callback});`,
    });
  }

  private async removeEventListener(params: any): Promise<string> {
    const { eventName } = params;

    return this.utils.generateGridStackCode("removeEventListener", {
      eventName,
      code: `grid.off('${eventName}');`,
    });
  }

  private async makeWidget(params: any): Promise<string> {
    const { el, options = {} } = params;

    return this.utils.generateGridStackCode("makeWidget", {
      element: el,
      options,
      code: `grid.makeWidget('${el}', ${JSON.stringify(options, null, 2)});`,
    });
  }

  private async removeAll(params: any): Promise<string> {
    const { removeDOM = true } = params;

    return this.utils.generateGridStackCode("removeAll", {
      removeDOM,
      code: `grid.removeAll(${removeDOM});`,
    });
  }

  private async getMargin(): Promise<string> {
    return this.utils.generateGridStackCode("getMargin", {
      code: `const margin = grid.getMargin();`,
    });
  }

  private async getColumn(): Promise<string> {
    return this.utils.generateGridStackCode("getColumn", {
      code: `const columns = grid.column();`,
    });
  }

  private async getFloat(): Promise<string> {
    return this.utils.generateGridStackCode("getFloat", {
      code: `const floatMode = grid.float();`,
    });
  }

  private async addGrid(params: any): Promise<string> {
    const { parent, opt = {} } = params;

    return this.utils.generateGridStackCode("addGrid", {
      parent,
      options: opt,
      code: `const grid = GridStack.addGrid('${parent}', ${JSON.stringify(
        opt,
        null,
        2
      )});`,
    });
  }
}
