import React,{useState} from 'react'

function login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`);
  };
  return (
<>
<section className="">
<form onSubmit={handleSubmit}>
     <label>
       Username:
       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
     </label>
     <label>
       Password:
       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
     </label>
     <button type="submit">Login</button>
   </form>
</section>
</>
  )
}

export default login
