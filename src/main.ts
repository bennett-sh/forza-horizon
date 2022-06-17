
import { createSocket, Socket } from 'dgram'
import parseData from './parse'
import ForzaServerEvent from './types/ForzaServerEvent'


export default class ForzaServer {
    #listeners = {
        listening: [],
        error: [],
        message: [],
        data: [],
        connect: [],
        close: []
    }
    server: Socket
    port: number

    constructor(port: number) {
        this.port = port
        this.server = createSocket('udp6')

        this.server.on('listening', (...args) => {
            this.#listeners['listening'].forEach(f => f(...args))
        })

        this.server.on('error', (...args) => {
            this.#listeners['error'].forEach(f => f(...args))
        })

        this.server.on('message', (...args) => {
            let data = parseData(args[0].toJSON().data)

            this.#listeners['data'].forEach(f => f(data))
            this.#listeners['message'].forEach(f => f(...args))
        })

        this.server.on('connect', (...args) => {
            this.#listeners['connect'].forEach(f => f(...args))
        })

        this.server.on('close', (...args) => {
            this.#listeners['close'].forEach(f => f(...args))
        })
    }

    bind(...args) {
        this.server.bind(this.port, ...args)
    }

    close(onClosed: () => void = () => {}) {
        this.server.close(onClosed)
    }

    on(event: ForzaServerEvent, onEvent: (...args) => any) {
        this.#listeners[event].push(onEvent)
    }
}
