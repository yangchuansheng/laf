
# Intro

`runtime-nodejs` is the application service engine of `laf`, responsible for:

- The execution of the cloud function
- Database access proxy

# Development

## You should know

- [Node.js](https://nodejs.org/en/docs)
- [Express](https://expressjs.com) web framework
- [Kubernetes](https://kubernetes.io) basic use
- [Telepresence](https://www.telepresence.io) for local development
- [MongoDb](https://docs.mongodb.com) basic use

## Prerequisites

- laf cluster installed locally or remotely (~/.kube/config)
- telepresence installed (see https://www.telepresence.io/reference/install)
- a running app in laf cluster (appid)

## Start service locally

```sh
cd runtimes/nodejs

# connect the cluster if not connected
telepresence connect

export APPID=your-app-id

# proxy app cluster traffic to local, replace `APPID` with your prepared appid
telepresence intercept $APPID -n $APPID -p 8000:8000 -e $(pwd)/.env

# after intercept command, you can use following command to check if intercept active
telepresence list -n $APPID

# Start local service first, required nodejs version >= 18.0.0
npm install

npm run build

npm start

```

> Clean up

```bash
telepresence leave $APPID-$APPID
```

## Troubleshooting

- `telepresence helm install` failed for `arm64 / Apple Chip` cluster, please upgrade your telepresence to `v2.11.1` or later.
