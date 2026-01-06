pipeline {
    agent any 

    tools {
        nodejs "node" // Ensure "node" matches the name in Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                sh 'git config --global --add safe.directory "*"'
                checkout scm
            }
        }

        stage('Install & Setup') {
            steps {
                // Update package list and install libatomic1 directly
                sh 'apt-get update && apt-get install -y libatomic1'
                
                // Install project dependencies
                sh 'npm install'
                
                // Install Playwright browsers AND all required Linux system dependencies
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                // Running tests in headless mode
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // This ensures the report is saved even if tests fail
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}