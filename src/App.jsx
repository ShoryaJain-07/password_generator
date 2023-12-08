import { useState,useCallback,useRef,useEffect } from "react"

function App() {
  const [length, setlength] = useState(8)
  const [num,setnum] = useState(false)
  const[ch,setch] = useState(false)
  const[password,setpassword] = useState("")

  const passref=useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(num){
      str += "0123456789"
    }
    if(ch){
      str += "!@#$%^&*()_+{}|[]/?"
    }

    for(let i=1; i<length; i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass += str[char]
    }

    setpassword(pass);

  },[length,num,ch,setpassword])

  const copypass=useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},[length,num,ch,passwordGenerator])

  return (
      <div className="w-full max-w-md my-8 shadow-md rounded-lg mx-auto px-4 py-3 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} readOnly placeholder="password" className="outline-none w-full py-1 px-3" ref={passref}/>
          <button onClick={copypass} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-senter gap-x-1">
              <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e)=>{setlength(e.target.value)}} />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={num} id="numberinput" onChange={()=>{
                setnum((prev)=>!prev)}}/>
                <label htmlFor="numberinput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={ch} id="chinput" onChange={()=>{
                setch((prev)=>!prev)}}/>
                <label htmlFor="chinput">Characters</label>
            </div>
          </div>
        
      </div>
  )
}

export default App
