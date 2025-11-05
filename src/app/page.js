// // src/app/page.js
"use client"

import Link from 'next/link'
import React from 'react'

const Welcome = () => {
  return (
    <div className='p-6 text-center items-center'>
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
      <div className='flex space-x-4 text-lg mb-4 justify-center'>
        <Link href="/Tasks" className="mt-4 w-64 px-4 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 text-center block">
          Go to Tasks
        </Link>

        <Link href="/Employees" className="mt-4 w-64 px-4 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 text-center block">
          Go to Employees
        </Link>
      </div>
    </div>
  )
}

export default Welcome