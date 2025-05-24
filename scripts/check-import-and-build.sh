# scripts/check-import-and-build.sh
#!/bin/bash
set -e

echo "🧪 Running lint to check import order and code quality..."
npm run lint

echo "🏗️ Running build..."
npm run build

echo "✅ Import check and build completed!"
