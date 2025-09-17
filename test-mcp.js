#!/usr/bin/env node

// Test script to verify MCP server functionality
// This simulates how Cursor would interact with the server

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing GridStack MCP Server...\n');

const serverPath = path.join(__dirname, 'dist', 'index.js');
console.log(`Server path: ${serverPath}\n`);

// Test cases
const tests = [
  {
    name: 'List Tools',
    request: '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}'
  },
  {
    name: 'List Resources', 
    request: '{"jsonrpc": "2.0", "id": 1, "method": "resources/list"}'
  },
  {
    name: 'Initialize Grid',
    request: '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "gridstack_init", "arguments": {"options": {"column": 12, "cellHeight": "auto", "margin": 10}}}}'
  },
  {
    name: 'Read Tailwind Resource',
    request: '{"jsonrpc": "2.0", "id": 1, "method": "resources/read", "params": {"uri": "gridstack://css/tailwind"}}'
  }
];

async function runTest(test) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 Testing: ${test.name}`);
    console.log(`Request: ${test.request.substring(0, 100)}...`);
    
    const child = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      try {
        // Extract JSON response (ignore stderr logging)
        const lines = stdout.split('\n');
        const jsonLine = lines.find(line => line.trim().startsWith('{'));
        
        if (jsonLine) {
          const response = JSON.parse(jsonLine);
          if (response.result) {
            console.log(`✅ ${test.name}: SUCCESS`);
            if (response.result.tools) {
              console.log(`   Found ${response.result.tools.length} tools`);
            } else if (response.result.resources) {
              console.log(`   Found ${response.result.resources.length} resources`);
            } else if (response.result.content) {
              console.log(`   Generated content successfully`);
            } else if (response.result.contents) {
              console.log(`   Read resource successfully`);
            }
            resolve(true);
          } else if (response.error) {
            console.log(`❌ ${test.name}: ERROR - ${response.error.message}`);
            resolve(false);
          }
        } else {
          console.log(`❌ ${test.name}: No valid JSON response`);
          resolve(false);
        }
      } catch (error) {
        console.log(`❌ ${test.name}: Parse error - ${error.message}`);
        resolve(false);
      }
    });

    child.on('error', (error) => {
      console.log(`❌ ${test.name}: Process error - ${error.message}`);
      resolve(false);
    });

    // Send request
    child.stdin.write(test.request + '\n');
    child.stdin.end();
  });
}

async function runAllTests() {
  console.log('Starting MCP server tests...\n');
  
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await runTest(test);
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Total: ${passed + failed}`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! MCP server is ready for Cursor.');
  } else {
    console.log('\n⚠️  Some tests failed. Check server configuration.');
  }
}

runAllTests().catch(console.error);
