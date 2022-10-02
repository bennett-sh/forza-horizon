# Forza Horizon Telemetry (NodeJS)
A simple UDP server library, which can parse data from FH4/FH5.

<br/>

## 📝How to use
#### 0. Install & Import
 1. Install:
 ```sh
 $ npm i forza-horizon
 ```
 <br />

 2. Import:
 ```ts
 import ForzaServer from 'forza-horizon'
 ```
#### 1. Create a server
```ts
const server = new ForzaServer( PORT )
```
#### 2. Add listeners
```ts
server.on('listening', () => console.log('Listening...'))

server.on('data', data => {
  console.log(data)
})
```
#### 3. Bind Server
```ts
server.bind()
```

## 💬Example
```ts
import ForzaServer from 'forza-horizon'

const server = new ForzaServer(3001)

server.on('data', data => {
    let isMoving = [data.VelocityX, data.VelocityY, data.VelocityZ].some(v => v > 0.1)

    console.log(`Is moving: ${isMoving}`)
})

server.bind()
```

