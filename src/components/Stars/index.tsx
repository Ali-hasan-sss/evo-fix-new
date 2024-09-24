// src\components\Stars\index.tsx

"use client"
import React from 'react'
import ReactStars from 'react-stars'

export default function Stars() {
    return (
        <div className=' flex justify-center'>
            <ReactStars count={5} size={24} color2={'#ffd700'} />
        </div>
    )
}