pipeline {
  agent any
  environment {
    CI = 'true'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker image') {
      steps {
        sh 'docker build -t kramp-playwright:${BUILD_NUMBER} .'
      }
    }

    stage('Run tests (in container)') {
      steps {
        sh '''
          docker run --rm \
            -e CI=true \
            -e UI_USER="${UI_USER}" \
            -e UI_PASS="${UI_PASS}" \
            -e BASIC_AUTH_USER="${BASIC_AUTH_USER}" \
            -e BASIC_AUTH_PASS="${BASIC_AUTH_PASS}" \
            -v "${WORKSPACE}/playwright-report":/app/playwright-report \
            -v "${WORKSPACE}/test-results":/app/test-results \
            kramp-playwright:${BUILD_NUMBER} \
            sh -c "npm ci --no-audit --no-fund && npx playwright install --with-deps || true && npm run test:chromium"
        '''
      }
    }

    stage('Archive artifacts') {
      steps {
        archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
      }
    }
  }
  post {
    always {
      sh 'echo "Build finished. Artifacts available under ${WORKSPACE}/playwright-report and ${WORKSPACE}/test-results" || true'
    }
  }
}
