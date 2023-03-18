import React, { useState } from 'react'
import axios from 'axios'

export const Linking = () => {

    const [name, setName] = useState("")
    const [data, setData] = useState([])
    const [dobPlace, setDobPlace] = useState("");

    const transferValue = (e) => {
        const options = {
            url: 'http://localhost:8000/api/users',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                name: name,
                dobPlace: dobPlace
            }
        };

        axios(options)
            .then(response => {
                console.log(response.status);
            });
    }
    const getData = () => {
        axios.get("http://localhost:8000/api/users").then((res) => {
            console.log(res.data.data);
            setData(res.data.data)
        });
    }

    const Delete = (id) => {
        alert(id)
        axios.delete(`http://localhost:8000/api/users/${id}`).then((res) => {
            console.log(res);
            console.log(res.data);
            const posts = this.state.posts.filter(item => item.id !== id);
            this.setState({ posts });
        })

    }

    const edit = (id) => {
        alert(id)
        axios.put(`http://localhost:8000/api/users:id`).then((res) => {
        })
    }

    return (
        <div>
            <h1>List User</h1>
            <form>
                <label>Name:</label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)}></input>
                <br />
                <br />
                <label>Birthplace:</label>
                <input type="text" name="" onChange={(e) => setDobPlace(e.target.value)}></input>
                <br />
                <br />
                <input type="button" name="send" value="add user" onClick={transferValue} ></input>
            </form>

            <h1>

                <input type="button" name="get" value="refresh" onClick={getData}></input>
            </h1>
            <table class="table">
                <caption>List of users</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {/* <th scope="col">id</th> */}
                        <th scope="col">name</th>
                        <th scope="col">dobPlace</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((ele) => {
                            return (
                                <tr>

                                    <td>{ele.id}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.dob_place}</td>
                                    <td><input type="button" name="send" value="Edit" onClick={() => edit(ele.id)} ></input></td>
                                    <td><input type="button" name="send" value="Delete" onClick={() => Delete(ele.id)} ></input></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
