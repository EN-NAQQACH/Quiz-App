import { useEffect, useState } from "react";

function UserInfo() {

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [role, setrole] = useState('');
    const [id, setid] = useState('')
    const [name, setname] = useState('')

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
        setname(data.name)
        console.log(data)
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
                    disabled
                />
                <label htmlFor="">name:</label>
                <input
                    type="text"
                    value={name}
                    disabled
                />
                <label htmlFor="">username:</label>
                <input
                    type="text"
                    value={username}
                    disabled
                />
                <label htmlFor="">email:</label>
                <input
                    type="text"
                    value={email}
                    disabled
                />
                <label htmlFor="">role:</label>
                <input
                    type="text"
                    value={role}
                    disabled
                />
            </form>
        </div>
    )
}
export default UserInfo;