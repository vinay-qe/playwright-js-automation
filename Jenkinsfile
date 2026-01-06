pipeline {
    agent any // Ensure your Jenkins agent has Node.js installed

    tools {
        nodejs "node" // Name of the Node.js installation configured in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                // Install browsers needed for the tests
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests in headless mode (default in CI)
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive Playwright HTML report
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