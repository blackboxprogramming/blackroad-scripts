#!/usr/bin/env node
// BlackRoad Copilot Agent Gateway - MCP Server
// Routes Copilot CLI requests to optimal local AI agents

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { RequestClassifier } from './classifier.js'
import { Router } from './router.js'
import { writeFile, mkdir } from 'fs/promises'
import { homedir } from 'os'
import { join } from 'path'

const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || 'http://octavia:11434'
const CONFIG_DIR = join(homedir(), '.blackroad', 'copilot-gateway')
const HISTORY_FILE = join(CONFIG_DIR, 'routing-history.jsonl')

class GatewayServer {
  constructor() {
    this.server = new Server(
      {
        name: 'blackroad-copilot-gateway',
        version: '0.1.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    )

    this.classifier = new RequestClassifier()
    this.router = new Router(OLLAMA_ENDPOINT)
    
    this.setupHandlers()
    this.setupErrorHandling()
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'route_request',
          description: 'Route a request to the optimal local AI agent based on intent',
          inputSchema: {
            type: 'object',
            properties: {
              request: {
                type: 'string',
                description: 'The user request or prompt to process'
              }
            },
            required: ['request']
          }
        },
        {
          name: 'list_models',
          description: 'List all available AI models in the BlackRoad fleet',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        {
          name: 'model_status',
          description: 'Check health and availability of AI models',
          inputSchema: {
            type: 'object',
            properties: {
              model: {
                type: 'string',
                description: 'Model name to check (optional, checks all if omitted)'
              }
            }
          }
        },
        {
          name: 'gateway_stats',
          description: 'Get gateway statistics and performance metrics',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        }
      ]
    }))

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params

      switch (name) {
        case 'route_request':
          return await this.handleRouteRequest(args.request)
        
        case 'list_models':
          return await this.handleListModels()
        
        case 'model_status':
          return await this.handleModelStatus(args.model)
        
        case 'gateway_stats':
          return await this.handleGatewayStats()
        
        default:
          throw new Error(`Unknown tool: ${name}`)
      }
    })
  }

  async handleRouteRequest(request) {
    try {
      // Classify request intent
      const classification = this.classifier.classify(request)
      
      // Route to optimal model
      const result = await this.router.route(request, classification)
      
      // Log to history
      await this.logRouting({
        timestamp: new Date().toISOString(),
        request: request.substring(0, 100),
        classification,
        result: {
          model: result.model,
          success: result.success,
          duration_ms: result.duration_ms
        }
      })

      if (result.success) {
        return {
          content: [
            {
              type: 'text',
              text: result.response
            }
          ],
          metadata: {
            model: result.model,
            intent: result.intent,
            confidence: result.confidence,
            duration_ms: result.duration_ms
          }
        }
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${result.error}`
            }
          ],
          isError: true
        }
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Gateway error: ${error.message}`
          }
        ],
        isError: true
      }
    }
  }

  async handleListModels() {
    const result = await this.router.client.listModels()
    
    if (result.success) {
      const modelList = result.models.map(m => `• ${m}`).join('\n')
      return {
        content: [
          {
            type: 'text',
            text: `Available models:\n${modelList}`
          }
        ]
      }
    } else {
      return {
        content: [
          {
            type: 'text',
            text: `Error listing models: ${result.error}`
          }
        ],
        isError: true
      }
    }
  }

  async handleModelStatus(modelName) {
    const health = await this.router.client.checkHealth()
    
    if (!health) {
      return {
        content: [
          {
            type: 'text',
            text: `Ollama endpoint not reachable at ${OLLAMA_ENDPOINT}`
          }
        ],
        isError: true
      }
    }

    if (modelName) {
      const available = await this.router.isModelAvailable(modelName)
      return {
        content: [
          {
            type: 'text',
            text: `Model ${modelName}: ${available ? '✅ Available' : '❌ Not available'}`
          }
        ]
      }
    } else {
      const models = await this.router.client.listModels()
      const status = models.success ? 
        `✅ Ollama healthy\n${models.models.length} models available` :
        '❌ Ollama error'
      
      return {
        content: [
          {
            type: 'text',
            text: status
          }
        ]
      }
    }
  }

  async handleGatewayStats() {
    const loadStats = this.router.getLoadStats()
    const statsText = Object.entries(loadStats)
      .map(([model, count]) => `• ${model}: ${count} active`)
      .join('\n') || 'No active requests'

    return {
      content: [
        {
          type: 'text',
          text: `Gateway Statistics:\n${statsText}`
        }
      ]
    }
  }

  async logRouting(entry) {
    try {
      await mkdir(CONFIG_DIR, { recursive: true })
      const line = JSON.stringify(entry) + '\n'
      await writeFile(HISTORY_FILE, line, { flag: 'a' })
    } catch (error) {
      console.error('Failed to log routing:', error)
    }
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[Gateway Error]', error)
    }

    process.on('SIGINT', async () => {
      await this.server.close()
      process.exit(0)
    })
  }

  async run() {
    // Load classifier and router
    await this.classifier.load()
    await this.router.load()

    // Create config directory
    await mkdir(CONFIG_DIR, { recursive: true })

    const transport = new StdioServerTransport()
    await this.server.connect(transport)
    
    console.error('BlackRoad Copilot Gateway running on stdio')
    console.error(`Ollama endpoint: ${OLLAMA_ENDPOINT}`)
  }
}

// Start server
const gateway = new GatewayServer()
gateway.run().catch(console.error)
