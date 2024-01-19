import { useEffect, useState } from "react";

function UserInfo() {

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [role, setrole] = useState('');
    const [id, setid] = useState('')
    const [full_name, setfullname] = useState('')
    const fetchuser = async () => {
        const res = await fetch('https://quiz-app.eroslabs.live/api/user/info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        const data = await res.json()
        setusername(data.username)
        setemail(data.email)
        setrole(data.role)
        setid(data.id)
        setfullname(data.name)
    }

    const handleUpdate = async () => {
        try {
          const res = await fetch('https://quiz-app.eroslabs.live/api/user/update', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
              username,
              email,
              full_name,
            }),
          });
    
          if (res.ok) {
            alert('User info updated successfully');
            fetchuser();
          } else {
            alert('Failed to update user info');
          }
        } catch (error) {
          console.error('Error updating user info:', error);
        }
      }


    useEffect(() => {
        fetchuser();
    }, [])



    return (
        <div className="content">
            <h2>User Info</h2>
            <form className="form-info">
                <label htmlFor="">id:</label>
                <input
                    type="text"
                    value={id}
                    disabled="true"
                />
                <label htmlFor="">name:</label>
                <input
                    type="text"
                    value={full_name}
                    onChange={(e) => setfullname(e.target.value)}
                    
                />
                <label htmlFor="">username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}

                    
                />
                <label htmlFor="">email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    
                />
                <label htmlFor="">role:</label>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                    disabled="true"
                    
                />
                <button type="button" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    )
}
export default UserInfo;