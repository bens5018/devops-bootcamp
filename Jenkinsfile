pipeline {
    agent any
    tools {
        nodejs 'whatever we want'
    }
    stages {
        stage('Node build') {
            
            steps {
                sh "npm install"
            }
        }
        stage('test'){
            steps {
                sh "npm test"
            }
        }
    }
}