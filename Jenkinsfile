node {
    def backendPort = ""
    def frontendPort = ""
    def branch = env.BRANCH_NAME

    echo "🔍 Checking deployment configuration for branch: '${branch}'"

    if (branch == 'master') {
        backendPort = 5002
        frontendPort = 3002
        echo "✅ Branch is 'master'. Ports -> Backend: ${backendPort}, Frontend: ${frontendPort}"
    } else if (branch == 'main') {
        backendPort = 5004
        frontendPort = 3004
        echo "✅ Branch is 'main'. Ports -> Backend: ${backendPort}, Frontend: ${frontendPort}"
    } else {
        echo "❌ Branch '${branch}' is not configured for deployment. Skipping pipeline."
        return
    }


    stage('Checkout') {
        echo "📦 Checking out code from branch: '${branch}'"
        checkout scm
    }

    stage('Build React App') {
        echo "⚙️ Building React frontend inside 'client/' directory"
        dir('frontend') {
            sh 'npm install'
            sh 'CI=false npm run build'
        }
        echo "✅ React app build completed"
    }

    stage('Build and Deploy') {
        echo "🚀 Shutting down old containers (if any)"
        sh "docker-compose down || true"

        echo "📦 Building and launching new containers using docker-compose"
        sh """
            BACKEND_PORT=${backendPort} \
            FRONTEND_PORT=${frontendPort} \
            BRANCH_NAME=${branch} \
            docker-compose up -d --build
        """
        echo "✅ Services deployed on ports Backend:${backendPort}, Frontend:${frontendPort}"
    }

    stage('Clean Up (optional)') {
        echo "🧹 Cleaning up dangling Docker images"
        sh "docker image prune -f"
        echo "✅ Cleanup completed"
    }
}
