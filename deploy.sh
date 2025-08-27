#!/bin/bash

# 🚀 Professional Resume Builder - Auto Deployment Script

echo "🚀 Starting Professional Resume Builder Deployment..."
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Function to check command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
echo "📦 Checking dependencies..."
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies."
        exit 1
    fi
    echo "✅ Dependencies installed successfully."
else
    echo "✅ Dependencies already installed."
fi

# Setup database
echo "🗄️ Setting up database..."
npm run db:push
if [ $? -ne 0 ]; then
    echo "❌ Failed to setup database."
    exit 1
fi

npm run db:generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client."
    exit 1
fi
echo "✅ Database setup completed."

# Create test user
echo "👤 Creating test user..."
curl -s -X POST http://localhost:3000/api/seed -H "Content-Type: application/json" -d '{}' > /dev/null
echo "✅ Test user created/verified."

# Build application
echo "🔨 Building application for production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed."
    exit 1
fi
echo "✅ Build completed successfully."

# Check deployment options
echo ""
echo "🎯 DEPLOYMENT OPTIONS:"
echo "=================="
echo "1. Vercel (Recommended)"
echo "2. Netlify"
echo "3. Railway"
echo "4. Digital Ocean"
echo "5. AWS Amplify"
echo "6. Local Production"
echo ""

read -p "Choose deployment option (1-6): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if command_exists vercel; then
            vercel --prod
        else
            echo "Installing Vercel CLI..."
            npm install -g vercel
            vercel --prod
        fi
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        if command_exists netlify; then
            netlify deploy --prod
        else
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
            netlify deploy --prod
        fi
        ;;
    3)
        echo "🚀 Deploying to Railway..."
        if command_exists railway; then
            railway up
        else
            echo "Installing Railway CLI..."
            npm install -g @railway/cli
            railway login
            railway up
        fi
        ;;
    4)
        echo "🚀 Deploying to Digital Ocean..."
        echo "Please install doctl and configure your Digital Ocean account."
        echo "Then run: doctl apps create --spec .do/app.yaml"
        ;;
    5)
        echo "🚀 Deploying to AWS Amplify..."
        if command_exists amplify; then
            amplify publish
        else
            echo "Installing Amplify CLI..."
            npm install -g @aws-amplify/cli
            amplify init
            amplify publish
        fi
        ;;
    6)
        echo "🚀 Starting local production server..."
        npm start
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 DEPLOYMENT COMPLETED!"
echo "=================="
echo "📱 Test the application at your deployed URL"
echo "🔑 Test credentials: test@example.com / password123"
echo "📄 Full deployment guide: DEPLOYMENT_GUIDE.md"
echo "🐛 For issues, check the troubleshooting section"
echo ""
echo "✨ Thank you for using Professional Resume Builder!"