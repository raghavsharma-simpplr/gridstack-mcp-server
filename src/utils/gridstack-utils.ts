import { GridStackOptions, GridStackWidget } from "../types.js";

export interface GridStackCodeResult {
  operation: string;
  parameters?: any;
  code: string;
  description?: string;
  example?: string;
  notes?: string[];
}

export class GridStackUtils {
  /**
   * Generate standardized GridStack code response
   */
  generateGridStackCode(operation: string, params: any): string {
    const result: GridStackCodeResult = {
      operation,
      parameters: params,
      code: params.code || "",
      description: this.getOperationDescription(operation),
      example: this.getOperationExample(operation),
      notes: this.getOperationNotes(operation),
    };

    return this.formatResponse(result);
  }

  /**
   * Format GridStack options for display
   */
  formatOptions(options: GridStackOptions): string {
    const formatted = JSON.stringify(options, null, 2);
    return formatted;
  }

  /**
   * Validate widget configuration
   */
  validateWidget(widget: GridStackWidget): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check required properties for positioning
    if (
      widget.x !== undefined &&
      (widget.x < 0 || !Number.isInteger(widget.x))
    ) {
      errors.push("x position must be a non-negative integer");
    }

    if (
      widget.y !== undefined &&
      (widget.y < 0 || !Number.isInteger(widget.y))
    ) {
      errors.push("y position must be a non-negative integer");
    }

    if (
      widget.w !== undefined &&
      (widget.w <= 0 || !Number.isInteger(widget.w))
    ) {
      errors.push("width must be a positive integer");
    }

    if (
      widget.h !== undefined &&
      (widget.h <= 0 || !Number.isInteger(widget.h))
    ) {
      errors.push("height must be a positive integer");
    }

    // Check min/max constraints
    if (
      widget.minW !== undefined &&
      widget.maxW !== undefined &&
      widget.minW > widget.maxW
    ) {
      errors.push("minW cannot be greater than maxW");
    }

    if (
      widget.minH !== undefined &&
      widget.maxH !== undefined &&
      widget.minH > widget.maxH
    ) {
      errors.push("minH cannot be greater than maxH");
    }

    if (
      widget.w !== undefined &&
      widget.minW !== undefined &&
      widget.w < widget.minW
    ) {
      errors.push("width cannot be less than minW");
    }

    if (
      widget.w !== undefined &&
      widget.maxW !== undefined &&
      widget.w > widget.maxW
    ) {
      errors.push("width cannot be greater than maxW");
    }

    if (
      widget.h !== undefined &&
      widget.minH !== undefined &&
      widget.h < widget.minH
    ) {
      errors.push("height cannot be less than minH");
    }

    if (
      widget.h !== undefined &&
      widget.maxH !== undefined &&
      widget.h > widget.maxH
    ) {
      errors.push("height cannot be greater than maxH");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate CSS selector validation
   */
  validateSelector(selector: string): { valid: boolean; error?: string } {
    if (!selector || typeof selector !== "string") {
      return { valid: false, error: "Selector must be a non-empty string" };
    }

    // Basic CSS selector validation
    try {
      document.querySelector(selector);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: "Invalid CSS selector format" };
    }
  }

  /**
   * Generate responsive breakpoint validation
   */
  validateBreakpoints(breakpoints: any[]): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!Array.isArray(breakpoints)) {
      errors.push("Breakpoints must be an array");
      return { valid: false, errors };
    }

    breakpoints.forEach((bp, index) => {
      if (typeof bp !== "object" || bp === null) {
        errors.push(`Breakpoint at index ${index} must be an object`);
        return;
      }

      if (typeof bp.w !== "number" || bp.w <= 0) {
        errors.push(
          `Breakpoint at index ${index} must have a positive width (w)`
        );
      }

      if (typeof bp.c !== "number" || bp.c <= 0 || !Number.isInteger(bp.c)) {
        errors.push(
          `Breakpoint at index ${index} must have a positive integer columns (c)`
        );
      }
    });

    // Check for duplicate widths
    const widths = breakpoints
      .map((bp) => bp.w)
      .filter((w) => typeof w === "number");
    const uniqueWidths = new Set(widths);
    if (widths.length !== uniqueWidths.size) {
      errors.push("Breakpoints cannot have duplicate widths");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate HTML template for GridStack
   */
  generateHTMLTemplate(options: GridStackOptions = {}): string {
    const {
      class: className = "",
      column = 12,
      cellHeight = "auto",
      margin = 10,
      children = [],
    } = options;

    const gridClass = `grid-stack${className ? ` ${className}` : ""}`;

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GridStack Layout</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack@12/dist/gridstack.min.css">
  <style>
    .grid-stack-item-content {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="${gridClass}">`;

    // Add children widgets
    children.forEach((widget) => {
      const attrs = [
        `gs-x="${widget.x || 0}"`,
        `gs-y="${widget.y || 0}"`,
        `gs-w="${widget.w || 1}"`,
        `gs-h="${widget.h || 1}"`,
      ];

      if (widget.id) attrs.push(`gs-id="${widget.id}"`);
      if (widget.minW) attrs.push(`gs-min-w="${widget.minW}"`);
      if (widget.maxW) attrs.push(`gs-max-w="${widget.maxW}"`);
      if (widget.minH) attrs.push(`gs-min-h="${widget.minH}"`);
      if (widget.maxH) attrs.push(`gs-max-h="${widget.maxH}"`);
      if (widget.locked) attrs.push(`gs-locked="true"`);
      if (widget.noResize) attrs.push(`gs-no-resize="true"`);
      if (widget.noMove) attrs.push(`gs-no-move="true"`);

      html += `
    <div class="grid-stack-item" ${attrs.join(" ")}>
      <div class="grid-stack-item-content">
        ${widget.content || `Widget ${widget.id || "Item"}`}
      </div>
    </div>`;
    });

    html += `
  </div>

  <script src="https://cdn.jsdelivr.net/npm/gridstack@12/dist/gridstack-all.js"></script>
  <script>
    const grid = GridStack.init(${JSON.stringify(options, null, 4)});
  </script>
</body>
</html>`;

    return html;
  }

  /**
   * Generate CSS for GridStack customization
   */
  generateCustomCSS(
    options: {
      cellHeight?: number | string;
      margin?: number | string;
      columns?: number;
      customColors?: {
        background?: string;
        border?: string;
        hover?: string;
      };
    } = {}
  ): string {
    const { cellHeight, margin, columns = 12, customColors } = options;

    let css = `/* GridStack Custom Styles */\n`;

    // Grid container styles
    css += `.grid-stack {\n`;
    if (margin) {
      css += `  margin: ${
        typeof margin === "number" ? `${margin}px` : margin
      };\n`;
    }
    css += `}\n\n`;

    // Cell height
    if (cellHeight) {
      css += `.grid-stack > .grid-stack-item > .grid-stack-item-content {\n`;
      css += `  min-height: ${
        typeof cellHeight === "number" ? `${cellHeight}px` : cellHeight
      };\n`;
      css += `}\n\n`;
    }

    // Custom colors
    if (customColors) {
      css += `.grid-stack-item-content {\n`;
      if (customColors.background) {
        css += `  background-color: ${customColors.background};\n`;
      }
      if (customColors.border) {
        css += `  border-color: ${customColors.border};\n`;
      }
      css += `}\n\n`;

      if (customColors.hover) {
        css += `.grid-stack-item:hover .grid-stack-item-content {\n`;
        css += `  background-color: ${customColors.hover};\n`;
        css += `}\n\n`;
      }
    }

    // Responsive columns
    if (columns !== 12) {
      css += `/* Custom ${columns}-column grid */\n`;
      for (let i = 1; i <= columns; i++) {
        const width = ((100 / columns) * i).toFixed(6);
        css += `.grid-stack > .grid-stack-item[gs-w="${i}"] { width: ${width}%; }\n`;
        css += `.grid-stack > .grid-stack-item[gs-x="${i - 1}"] { left: ${(
          (100 / columns) *
          (i - 1)
        ).toFixed(6)}%; }\n`;
      }
      css += `\n`;
    }

    return css;
  }

  private getOperationDescription(operation: string): string {
    const descriptions: Record<string, string> = {
      init: "Initialize a new GridStack instance with the specified options",
      addWidget: "Add a new widget to the grid at the specified position",
      removeWidget: "Remove a widget from the grid",
      updateWidget: "Update widget properties (position, size, constraints)",
      moveWidget: "Move a widget to a new position",
      resizeWidget: "Resize a widget to new dimensions",
      compact: "Compact the grid layout to remove gaps",
      float: "Enable or disable floating widget mode",
      column: "Change the number of columns in the grid",
      cellHeight: "Update the height of grid cells",
      margin: "Update the margin/gap between grid items",
      batchUpdate: "Enable batch update mode for efficient multiple operations",
      save: "Serialize the current grid layout to JSON",
      load: "Load a grid layout from JSON data",
      enable: "Enable or disable grid interactions",
      destroy: "Destroy the grid instance and clean up",
      getGridItems: "Get all grid items (widgets)",
      setResponsive: "Configure responsive breakpoints",
      willItFit: "Check if a widget will fit at the specified position",
      isAreaEmpty: "Check if a grid area is empty",
      getCellHeight: "Get the current cell height",
      getCellFromPixel: "Convert pixel coordinates to grid cell position",
      addEventListener: "Add an event listener for grid events",
      removeEventListener: "Remove an event listener",
      makeWidget: "Convert an existing DOM element into a grid widget",
      removeAll: "Remove all widgets from the grid",
      getMargin: "Get current margin values",
      getColumn: "Get current number of columns",
      getFloat: "Get current float mode state",
      addGrid: "Create a new grid with options and children (static method)",
    };

    return descriptions[operation] || "GridStack operation";
  }

  private getOperationExample(operation: string): string {
    const examples: Record<string, string> = {
      init: `// Initialize with basic options
const grid = GridStack.init({
  column: 12,
  cellHeight: 'auto',
  margin: 10,
  float: false
});`,
      addWidget: `// Add a widget with content
grid.addWidget({
  x: 0, y: 0, w: 3, h: 2,
  content: '<div>My Widget</div>',
  id: 'widget1'
});`,
      removeWidget: `// Remove widget by selector
grid.removeWidget('#widget1');`,
      updateWidget: `// Update widget properties
grid.update('#widget1', {
  w: 4, h: 3,
  locked: true
});`,
      moveWidget: `// Move widget to new position
grid.move('#widget1', 2, 1);`,
      resizeWidget: `// Resize widget
grid.resize('#widget1', 4, 3);`,
      save: `// Save layout to JSON
const layout = grid.save(true);
localStorage.setItem('layout', JSON.stringify(layout));`,
      load: `// Load layout from JSON
const layout = JSON.parse(localStorage.getItem('layout'));
grid.load(layout);`,
    };

    return examples[operation] || `// ${operation} example`;
  }

  private getOperationNotes(operation: string): string[] {
    const notes: Record<string, string[]> = {
      init: [
        "Grid container must have 'grid-stack' class",
        "Include GridStack CSS and JS files",
        "Options are merged with defaults",
      ],
      addWidget: [
        "Widget will be auto-positioned if x,y not specified",
        "Triggers 'added' event by default",
        "Returns the created DOM element",
      ],
      removeWidget: [
        "Can accept element, selector, or GridStackNode",
        "Set removeDOM=false to keep in DOM",
        "Triggers 'removed' event by default",
      ],
      batchUpdate: [
        "Use before multiple operations for efficiency",
        "Call with false to end batch mode",
        "Only one 'change' event fired at end",
      ],
      save: [
        "Returns array of widget configurations",
        "saveContent=true includes HTML content",
        "saveGridOpt=true includes grid options",
      ],
      load: [
        "Accepts array of widget configs or JSON string",
        "addAndRemove=true syncs with current widgets",
        "Existing widgets not in layout are removed",
      ],
      float: [
        "Float mode allows widgets to move up to fill gaps",
        "Disable for more predictable layouts",
        "Can be toggled at runtime",
      ],
      column: [
        "Changing columns re-layouts existing widgets",
        "CSS must support the new column count",
        "Use 'auto' for nested grids",
      ],
    };

    return notes[operation] || [];
  }

  private formatResponse(result: GridStackCodeResult): string {
    let response = `## GridStack ${result.operation}

${result.description}

### Generated Code:
\`\`\`javascript
${result.code}
\`\`\``;

    if (result.parameters && Object.keys(result.parameters).length > 0) {
      response += `

### Parameters:
\`\`\`json
${JSON.stringify(result.parameters, null, 2)}
\`\`\``;
    }

    if (result.example) {
      response += `

### Example:
\`\`\`javascript
${result.example}
\`\`\``;
    }

    if (result.notes && result.notes.length > 0) {
      response += `

### Notes:
${result.notes.map((note) => `- ${note}`).join("\n")}`;
    }

    return response;
  }

  /**
   * Generate framework-specific integration code
   */
  generateFrameworkIntegration(framework: "react" | "vue" | "angular"): string {
    switch (framework) {
      case "react":
        return this.generateReactIntegration();
      case "vue":
        return this.generateVueIntegration();
      case "angular":
        return this.generateAngularIntegration();
      default:
        return "Framework not supported";
    }
  }

  private generateReactIntegration(): string {
    return `// React GridStack Component
import React, { useEffect, useRef } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

const GridStackComponent = ({ options, children, onChange }) => {
  const gridRef = useRef(null);
  const gridInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize GridStack
    gridInstanceRef.current = GridStack.init(options, gridRef.current);
    
    // Add event listeners
    if (onChange) {
      gridInstanceRef.current.on('change', onChange);
    }

    return () => {
      // Cleanup
      gridInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div ref={gridRef} className="grid-stack">
      {children}
    </div>
  );
};

// Usage
const App = () => {
  const handleChange = (event, items) => {
    console.log('Grid changed:', items);
  };

  return (
    <GridStackComponent 
      options={{ column: 12, cellHeight: 'auto' }}
      onChange={handleChange}
    >
      <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="3" gs-h="2">
        <div className="grid-stack-item-content">Widget 1</div>
      </div>
    </GridStackComponent>
  );
};`;
  }

  private generateVueIntegration(): string {
    return `<!-- Vue GridStack Component -->
<template>
  <div ref="gridRef" class="grid-stack">
    <slot />
  </div>
</template>

<script>
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

export default {
  name: 'GridStackComponent',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      grid: null
    };
  },
  mounted() {
    this.grid = GridStack.init(this.options, this.$refs.gridRef);
    
    // Add event listeners
    this.grid.on('change', (event, items) => {
      this.$emit('change', event, items);
    });
  },
  beforeUnmount() {
    this.grid?.destroy();
  }
};
</script>

<!-- Usage -->
<template>
  <GridStackComponent 
    :options="{ column: 12, cellHeight: 'auto' }"
    @change="handleChange"
  >
    <div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="3" gs-h="2">
      <div class="grid-stack-item-content">Widget 1</div>
    </div>
  </GridStackComponent>
</template>`;
  }

  private generateAngularIntegration(): string {
    return `// Angular GridStack Component
import { Component, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { GridStack } from 'gridstack';

@Component({
  selector: 'app-gridstack',
  template: '<ng-content></ng-content>',
  styleUrls: ['./gridstack.component.css']
})
export class GridStackComponent implements OnInit, OnDestroy {
  @Input() options: any = {};
  @Output() change = new EventEmitter<any>();
  
  private grid: GridStack | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.classList.add('grid-stack');
    this.grid = GridStack.init(this.options, this.el.nativeElement);
    
    this.grid.on('change', (event, items) => {
      this.change.emit({ event, items });
    });
  }

  ngOnDestroy() {
    this.grid?.destroy();
  }
}

// Usage in template
/*
<app-gridstack [options]="{ column: 12, cellHeight: 'auto' }" (change)="onGridChange($event)">
  <div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="3" gs-h="2">
    <div class="grid-stack-item-content">Widget 1</div>
  </div>
</app-gridstack>
*/`;
  }
}
