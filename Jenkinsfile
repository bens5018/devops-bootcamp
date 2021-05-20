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
        stage('sonar scan'){
            steps {
                 withSonarQubeEnv('TestverSonarQube') {
                sh 'mvn clean package sonar:sonar'
              }
            }
        }
        stage('Quality Gate'){
          steps {
              timeout(time: 1, unit: 'HOURS') {
                waitForQualityGate abortPipeline: true
              }
            }
        }
    }
}