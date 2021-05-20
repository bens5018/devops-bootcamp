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
        stage("Quality Gate"){
          timeout(time: 1, unit: 'HOURS') {
              def qg = waitForQualityGate()
              if (qg.status != 'OK') {
                  error "Pipeline aborted due to quality gate failure: ${qg.status}"
              }
          }
      }
    }
}