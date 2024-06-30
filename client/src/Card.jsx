import React from 'react'

export default function Card({title, username}) {
  return (
    <div className='h-auto w-full p-6 bg-white rounded-lg shadow-lg'>
        <div className="flex flex-col">
            <h1>{title}</h1>
            <p>{username}</p>
        </div>
    </div>
  )
}
