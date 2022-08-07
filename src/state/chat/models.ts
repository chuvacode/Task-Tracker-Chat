export type Dialog = {
    id: number
    type: string
    name: string
    description: string
    image: string
    messages: Array<Message>,
}

export type Message = {
    id: number
    owner_id: number
    messageText: string
    timeSending: string
}

export type Profile = {
    id: number
    name: string
    image: string
}
