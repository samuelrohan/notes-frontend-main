import React, { useEffect, useState } from 'react'

function Test() {
    const [txt, setTxt] = useState("")

    const getTest = async()=>{
        const res = await fetch(`https://devnoteapp.onrender.com/user/test`)
        const data = await res.json();
        console.log(data)
        setTxt(data.message)
    }
    useEffect(()=>{
        getTest()
    }, [])
  return (
    <div>
      <h1>{txt}</h1>
    </div>
  )
}

export default Test
