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
 /*       stage('sonar scan'){
            steps {
                 withSonarQubeEnv('TestverSonarQube') {
                sh 'npm clean package sonar:sonar'
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
*/
        stage('Docker image build'){
            steps {
                withCredentials([usernamePassword(credentialsId: 'ECRAccess', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                    sh '''
                    wget https://download.docker.com/linux/ubuntu/dists/bionic/pool/stable/amd64/docker-ce-cli_18.09.9~3-0~ubuntu-bionic_amd64.deb
                    dpkg -i ./docker-ce-cli_18.09.9~3-0~ubuntu-bionic_amd64.deb
                    apt-get update
                    apt-get install -y awscli
                    docker build -t workshopuser14:latest .
                    docker tag workshopuser14:latest workshopuser14:${BUILD_NUMBER}
                    docker tag workshopuser14:latest 686567993080.dkr.ecr.us-east-1.amazonaws.com/devopsbootcampuser14:latest
                    docker tag workshopuser14:latest workshopuser1:notyourmommastag
                    $(aws ecr get-login --region us-east-1 | sed 's/-e none//g')
                    docker push 686567993080.dkr.ecr.us-east-1.amazonaws.com/devopsbootcampuser14:latest
                    '''
                }
            }
        }

    }
}