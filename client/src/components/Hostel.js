import React from 'react'
import { useParams } from 'react-router-dom'

export default function Hostel() {

  const {id} = useParams();

  return (
    <div>Hostel {id} </div>
  )
}
