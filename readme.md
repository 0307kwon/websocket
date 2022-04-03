# websocket 개발용 template

기본적인 채팅만 구현되어 있습니다.
websocket을 사용하는 프로젝트를 만들 때 사용할 수 있습니다.

## 새로운 기능 배포 순서

1. webpack-dev-server를 통해 각 패키지 내에서 테스트
2. root workspace 폴더에서 yarn start를 통해 서버와 동일한 환경으로 테스트
3. 깃헙에 올리고 젠킨스 빌드 후 실제로 테스트
   - 젠킨스 빌드 파이프라인 script는 아래를 참고

## spec

- monorepo로 구성
  - yarn berry
  - yarn workspace
  - typescript
  - webpack 5
  - 클라이언트
    - react
    - less
  - 서버
    - nest

## 포트 바인딩

- api, 정적파일 서버
  - 외부: 80 -> 내부: 9001
- websocket 서버
  - 외부: 4000 -> 내부 3001

포트 변경을 위해서는 다음 파일의 변경이 필요합니다.
외부 포트 수정 시 서버 컴퓨터의 security group도 바꿔주세요.

- docker-compose.yaml
  ports 속성을 수정하여 개방할 외부 포트 설정
- nginx.conf
  외부 포트 -> 내부 포트 바인딩

## 추가로 필요한 설정

### 최상위 폴더에 .env 파일이 있어야합니다.

end point url에 필요한 값들입니다.

```
# 배포 환경이 키값 가장 앞에 나와야한다.
DEV_API_SERVER=webpack-dev-server를 위한 로컬 api 서버 주소
DEV_SOCKET_SERVER=webpack-dev-server를 위한 로컬 socket 서버 주소
# root workspace에서 yarn start 시에 필요함
DEV_WITH_DOCKER_API_SERVER=로컬에서 서버와 동일한 환경으로 테스트할 때 로컬 api 서버 주소
DEV_WITH_DOCKER_SOCKET_SERVER=로컬에서 서버와 동일한 환경으로 테스트할 때 로컬 socket 서버 주소
PROD_API_SERVER=api 서버 주소
PROD_SOCKET_SERVER=socket 서버 주소
```

### .env 파일을 서버 컴퓨터에도 직접 넣어줘야합니다.

.env 경로 : /home/ubuntu/

### 젠킨스 파이프라인 script 설정

- 서버 컴퓨터에 docker, docker-compose가 설치되어 있어야합니다.
- 오라클 ubuntu 20.04에서 테스트 완료했습니다.

```
pipeline {
    agent any

    tools {
        nodejs 젠킨스에서 설정한 node name
    }

    environment {
        GIT_URL = 깃헙주소
    }

    stages {
        stage('Pull') {
            steps {
                git url: "${GIT_URL}", branch: 브랜치, poll: true, changelog: true
            }
        }

        stage('set .env file') {
            steps {
                sh "sudo cp /home/ubuntu/.env ./"
                sh "cat .env"
            }
        }

        stage('client, server build') {
            steps {
                sh "yarn workspaces foreach -pt run build"
            }
        }

        stage('deploy') {
            steps {
                sh 'sudo docker-compose down'
                sh 'sudo docker-compose up -d --build'
            }
        }
    }
}
```

## QnA

### 타입스크립트가 vscode에서 동작하지 않는 현상

1. cmd + shift + p > select typescript version
   <img width="886" alt="스크린샷 2022-04-03 오후 3 08 23" src="https://user-images.githubusercontent.com/48755175/161414301-922f312f-6a09-4b10-92f4-07faebe8bf71.png">

2. use workspace version 선택
   <img width="887" alt="스크린샷 2022-04-03 오후 3 08 33" src="https://user-images.githubusercontent.com/48755175/161414332-c03954ab-8588-429f-9d03-f74c633d0e25.png">
