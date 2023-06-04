import React from 'react'

export default function RightButton({onClick}) {
  return (
    <div onClick={onClick} className='text-3xl hover:text-cyan-500 ml-4 active:text-cyan-800 select-none cursor-pointer inline'>{">"}</div>
  )
}
