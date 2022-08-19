export type Dialog = {
    id: number
    type: string
    name: string
    description: string
    image: string
    count_unread: number,
    messages: Array<Message>,
}

export type Message = {
    id: number
    owner_id: number
    message: string
    timeSending: string
    events: Array<MessageEvent>
}

export type MessageEvent = {
    id: number
    message_id: number
    user_id: number
    type: string
    created_at: string
    updated_at: string
}

export type Profile = {
    id: number
    name: string
    image: string
}
