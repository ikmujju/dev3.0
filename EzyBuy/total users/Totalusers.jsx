import { useEffect,useState } from "react";
import React from "react";
import axios from "axios";
import Adminheader from "../src/Admin/Adminheader";
import  './tuser.css'

function Totalusers(){
    const [users,setUsers]=useState([]);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect ( () =>{
            axios.get("http://localhost:3001/auth/disuser")
            .then((Response) =>{
               setUsers(Response.data);
                setLoading(false);

        })

            .catch((err) => {
                console.error("somthing went wrong");
                setError("Can't load User datas");
                setLoading(false);
                });
    },
[]);

    if(loading) return <p classname="tu-load">Loading User datas</p>
    if(error) return <p classname="tu-err">No Data Found</p>

    return(
        <>
        <Adminheader/>
        <div className="users-container">
            <h2>Total Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.status}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default Totalusers