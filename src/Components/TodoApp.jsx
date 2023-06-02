import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"

import { useQuery } from "react-query"
import axios from "axios"
import Swal from "sweetalert2"

const TodoApp = () => {
  const navigate = useNavigate()

  const complete = "incomplete"
  const { user, logOut } = useContext(AuthContext)

  const url = `https://server-templete-fake-data.vercel.app/todo/${user?.email}`
  const { data, refetch } = useQuery("data", () => axios.get(url))
  if (data?.data.length == 0) {
    refetch()
  }

  const handleAddTask = (event) => {
    event.preventDefault()
    if (!user) {
      return navigate("/login")
    }
    const form = event.target
    const name = form.name.value
    const description = form.desc.value
    const title = form.title.value
    const task = {
      name,
      description,
      title,
      email: user.email,
      status: complete,
    }
    form.reset()

    fetch("https://server-templete-fake-data.vercel.app/todo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then(() => {
  
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your task has been added",
          showConfirmButton: false,
          timer: 1500,
        })
        refetch()
      })
  }

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Log out")
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
  }

  //delete task operation========================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://server-templete-fake-data.vercel.app/todo/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
          
            refetch()
          })
        Swal.fire("Deleted!", "Your task has been deleted.", "success")
      }
    })
  }

  //handle update status==============
  const handleStatus = (id) => {
    
    fetch(`https://server-templete-fake-data.vercel.app/todo/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "complete" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch()
        }
      })
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="bg-white p-4 shadow">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Task List</h1>
          {user ? (
            <button onClick={handleLogout} className="btn btn-error btn-sm ">
              logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-error btn-sm ">Google Login</button>
            </Link>
          )}
        </div>
        <form className=" mb-4" onSubmit={handleAddTask}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              required
              className="flex-grow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="*Add Task Name"
            />
            <input
              type="text"
              required
              className="flex-grow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="*Add Task title"
              name="title"
            />
            <input
              type="text"
              className="flex-grow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Add Task Description"
              name="desc"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 m-2 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              {user && (
                <tr>
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              )}
            </thead>
            <tbody>
              {user &&
                data?.data.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.name} </td>
                    <td>{item.title}</td>
                    <td> {item.description} </td>
                    <td>
                      <button
                        onClick={() => handleStatus(item._id)}
                        className={`btn  btn-sm ${
                          item.status == "complete"
                            ? " btn btn-disabled  "
                            : "btn-warning"
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TodoApp
