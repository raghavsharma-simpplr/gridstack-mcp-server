#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GridStackTools } from "./tools/index.js";
import { GridStackResources } from "./resources/index.js";

class GridStackMCPServer {
  private server: Server;
  private tools: GridStackTools;
  private resources: GridStackResources;

  constructor() {
    this.server = new Server({
      name: "gridstack-mcp-server",
      version: "1.0.0",
    });

    this.tools = new GridStackTools();
    this.resources = new GridStackResources();
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: this.resources.listResources(),
      };
    });

    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        const resource = await this.resources.readResource(request.params.uri);
        return {
          contents: [
            {
              uri: request.params.uri,
              mimeType: resource.mimeType,
              text: resource.content,
            },
          ],
        };
      }
    );

    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.tools.listTools(),
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const result = await this.tools.callTool(
        request.params.name,
        request.params.arguments || {}
      );
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("GridStack MCP server running on stdio");
  }
}

const server = new GridStackMCPServer();
server.run().catch(console.error);
