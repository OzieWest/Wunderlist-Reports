### Wunderlist reports

#### Dev mode

```bash
cd app
docker build -f Dockerfile.dev -t wunder:dev .
docker run --name wunder --rm -it -e WUNDER_SECRET -e WUNDER_ID -v $(pwd)/app:/usr/src/app wunder:dev bash

#Inside container
npm install -y
npm start
```

#### Usage

```bash
mkdir ~/reports

cd app
docker build -f Dockerfile -t wunder .
docker run --name wunder --rm -it -e WUNDER_SECRET -e WUNDER_ID -v ~/reports:/usr/src/app/report wunder
```
