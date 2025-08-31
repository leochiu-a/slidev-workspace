#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const args = process.argv.slice(2)
const command = args[0]

const packageRoot = join(__dirname, '..')

function showHelp() {
  console.log(`
Slidev Workspace - A tool for managing multiple Slidev presentations

Usage:
  slidev-workspace <command> [options]

Commands:
  dev     Start the development server
  build   Build the project for production
  help    Show this help message

Examples:
  slidev-workspace dev    # Start development server
  slidev-workspace build  # Build for production

For more information, visit: https://github.com/author/slidev-workspace
`)
}

function runCommand(cmd: string, args: string[] = []) {
  const child = spawn(cmd, args, {
    cwd: packageRoot,
    stdio: 'inherit',
    shell: true
  })

  child.on('error', (error) => {
    console.error('Error running command:', error.message)
    process.exit(1)
  })

  child.on('exit', (code) => {
    process.exit(code || 0)
  })
}

switch (command) {
  case 'dev':
    console.log('🚀 Starting Slidev Workspace development server...')
    runCommand('pnpm', ['run', 'slidev-workspace:dev'])
    break

  case 'build':
    console.log('📦 Building Slidev Workspace for production...')
    runCommand('pnpm', ['run', 'slidev-workspace:build'])
    break

  case 'help':
  case '--help':
  case '-h':
    showHelp()
    break

  default:
    if (!command) {
      showHelp()
    } else {
      console.error(`Unknown command: ${command}`)
      console.error('Run "slidev-workspace help" for available commands.')
      process.exit(1)
    }
}