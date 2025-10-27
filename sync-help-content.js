#!/usr/bin/env node

/**
 * Help Content Sync Script
 *
 * This script should be placed in your Vitepress help project.
 * It will:
 * 1. Clear all existing help content from the API
 * 2. Read all markdown files from the docs directory
 * 3. Send each file's content to the API for indexing
 *
 * Usage:
 * node sync-help-content.js
 *
 * Environment variables required:
 * - API_BASE_URL: The base URL of your API (e.g., https://api.aichiki.ai)
 * - HELP_SYNC_TOKEN: The token for authenticating help sync requests
 * - HELP_BASE_URL: The base URL of your help site (e.g., https://help.aichiki.ai)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import https from 'https'

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  API_BASE_URL = process.env.API_BASE_URL || 'https://localhost:3000',
  HELP_SYNC_TOKEN = 'Ly7mZ8PsJec8bmC6qgduA_MgP5MZBnPPGngEFbzF',
  HELP_BASE_URL = process.env.HELP_BASE_URL || 'https://blog.aichiki.ai',
  DOCS_DIR = path.join(__dirname, './docs') // Adjust path as needed

// Configure axios to ignore self-signed certificates for localhost
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

if (!HELP_SYNC_TOKEN) {
  console.error('❌ HELP_SYNC_TOKEN environment variable is required')
  process.exit(1)
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const makeApiCall = async (endpoint, method = 'GET', body = null) => {
  const url = `${API_BASE_URL}/public${endpoint}`

  console.log(`🔗 ${method} ${url}`)

  try {
    const config = {
      method: method.toLowerCase(),
      url,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // Always send token in request body
    const requestBody = body || {}
    requestBody.token = HELP_SYNC_TOKEN
    config.data = requestBody

    const response = await axiosInstance(config)
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message
    console.error(`❌ API call failed: ${errorMessage}`)
    throw new Error(errorMessage)
  }
}

const clearAllHelpContent = async () => {
  console.log('🧹 Clearing all existing help content...')

  try {
    const result = await makeApiCall('/help/clear', 'POST', {
      token: HELP_SYNC_TOKEN
    })

    console.log(`✅ Cleared ${result.deletedCount || 0} help documents`)
    return result
  } catch (error) {
    console.error('❌ Failed to clear help content:', error.message)
    throw error
  }
}

const getMarkdownFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file),
      stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!file.startsWith('.') && file !== 'node_modules') {
        getMarkdownFiles(filePath, fileList)
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

const convertPathToUrl = filePath => {
  // Convert file path to URL
  const relativePath = path.relative(DOCS_DIR, filePath),
    urlPath = relativePath
      .replace(/\\/g, '/') // Convert Windows paths
      .replace(/\.md$/, '') // Remove .md extension
      .replace(/\/index$/, '') // Remove /index from URLs
      .replace(/^index$/, '') // Handle root index

  return `${HELP_BASE_URL}${urlPath ? '/' + urlPath : ''}`
}

const extractTitle = content => {
  // Try to extract title from the first H1 heading
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) {
    return h1Match[1].trim()
  }

  // Try to extract from frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (frontmatterMatch) {
    const titleMatch = frontmatterMatch[1].match(/title:\s*['"]?([^'"]+)['"]?/)
    if (titleMatch) {
      return titleMatch[1].trim()
    }
  }

  return null
}

const cleanContent = content => {
  // Remove frontmatter
  content = content.replace(/^---\n[\s\S]*?\n---\n/, '')

  // Remove Vitepress-specific syntax
  content = content.replace(/::: \w+[\s\S]*?:::/g, '')

  // Clean up multiple newlines
  content = content.replace(/\n{3,}/g, '\n\n')

  return content.trim()
}

const addHelpDocument = async (url, content, title) => {
  try {
    const result = await makeApiCall('/help/add', 'POST', {
      token: HELP_SYNC_TOKEN,
      url,
      content,
      title
    })

    console.log(`✅ Added: ${title || url}`)
    return result
  } catch (error) {
    console.error(`❌ Failed to add ${url}:`, error.message)
    throw error
  }
}

const getHelpStats = async () => {
  try {
    const stats = await makeApiCall('/help/stats')
    return stats
  } catch (error) {
    console.error('❌ Failed to get help stats:', error.message)
    return { pineconeVectorCount: 0, firestoreDocCount: 0 }
  }
}

const syncSingleFile = async (relativePath) => {
  console.log(`🚀 Adding single file: ${relativePath}`)

  const filePath = path.join(DOCS_DIR, relativePath)

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    return
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8'),
      cleanedContent = cleanContent(content),
      url = convertPathToUrl(filePath),
      title = extractTitle(content)

    if (cleanedContent.length < 50) {
      console.log('⚠️  Content too short, skipping')
      return
    }

    await addHelpDocument(url, cleanedContent, title)
    console.log('✅ Successfully added single file!')
  } catch (error) {
    console.error(`❌ Failed to add file:`, error.message)
  }
}

const syncHelpContent = async () => {
  console.log('🚀 Starting help content sync...')
  console.log(`📁 Docs directory: ${DOCS_DIR}`)
  console.log(`🌐 API base URL: ${API_BASE_URL}`)
  console.log(`🔗 Help base URL: ${HELP_BASE_URL}`)

  try {
    // Get initial stats
    const initialStats = await getHelpStats()
    console.log(`📊 Initial stats: ${initialStats.firestoreDocCount} docs, ${initialStats.pineconeVectorCount} vectors`)

    // Clear all existing content
    await clearAllHelpContent()

    // Get all markdown files
    const markdownFiles = getMarkdownFiles(DOCS_DIR)
    console.log(`📄 Found ${markdownFiles.length} markdown files`)

    if (markdownFiles.length === 0) {
      console.log('⚠️  No markdown files found in docs directory')
      return
    }

    // Process each file
    let successCount = 0
    for (const [index, filePath] of markdownFiles.entries()) {
      try {
        console.log(`\n📝 Processing ${index + 1}/${markdownFiles.length}: ${path.relative(DOCS_DIR, filePath)}`)

        const content = fs.readFileSync(filePath, 'utf8'),
          cleanedContent = cleanContent(content),
          url = convertPathToUrl(filePath),
          title = extractTitle(content)

        if (cleanedContent.length < 50) {
          console.log('⚠️  Skipping (content too short)')
          continue
        }

        await addHelpDocument(url, cleanedContent, title)
        successCount++

        // Add a small delay to avoid overwhelming the API
        await sleep(100)
      } catch (error) {
        console.error(`❌ Failed to process ${filePath}:`, error.message)
      }
    }

    // Get final stats
    await sleep(2000) // Wait for indexing to complete
    const finalStats = await getHelpStats()

    console.log('\n🎉 Sync completed!')
    console.log(`✅ Successfully processed: ${successCount}/${markdownFiles.length} files`)
    console.log(`📊 Final stats: ${finalStats.firestoreDocCount} docs, ${finalStats.pineconeVectorCount} vectors`)
  } catch (error) {
    console.error('💥 Sync failed:', error.message)
    process.exit(1)
  }
}

// Check if docs directory exists
if (!fs.existsSync(DOCS_DIR)) {
  console.error(`❌ Docs directory not found: ${DOCS_DIR}`)
  console.error('Please adjust the DOCS_DIR path in the script')
  process.exit(1)
}

// Check command line arguments
const args = process.argv.slice(2)
if (args.length > 0 && args[0] === '--single') {
  if (args.length < 2) {
    console.error('❌ Please provide a file path for --single option')
    console.error('Usage: node sync-help-content.js --single chatting/chat-options.md')
    process.exit(1)
  }
  syncSingleFile(args[1])
} else {
  // Run the full sync
  syncHelpContent()
}
