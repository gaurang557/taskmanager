import React from 'react'

const Users = async () => {
    var s = await fetch('https://jsonplaceholder.typicode.com/users')
    var d = await s.json()  
  return (
    <div>
        <h1>Users Page</h1>
        {d && d.map((item)=><p key={item.id}>{item.name}</p>)}
    </div>
  )
}

export default Users