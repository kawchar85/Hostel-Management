import React from 'react'
import { useParams } from 'react-router-dom'

export default function Room() {
    const { hostelId } = useParams();
    const { roomId } = useParams();
    return (
        <div>Room {roomId} ,under Hostel {hostelId}</div>
    )
}
