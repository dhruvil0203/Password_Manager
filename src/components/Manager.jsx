// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswordArray(JSON.parse(storedPasswords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const savePassword = () => {
    if (form.site && form.username && form.password) {
      const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast.error("Error: Password not saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const deletePassword = (id) => {
    if (window.confirm("Do you want to delete this password?")) {
      const updatedPasswordArray = passwordArray.filter(
        (item) => item.id !== id
      );
      setPasswordArray(updatedPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
      toast("Password deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm(passwordToEdit);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      <div className="p-2 md:p-0 mt-5 md:mycontainer min-h-[90vh] text-black font-semibold">
        <h1 className="text-4xl text-center font-bold">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-500 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-7 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            className="rounded-full border border-green-500 p-4 py-1 w-full"
            type="text"
            name="site"
            id="site"
            placeholder="Enter website url"
          />
          <div className="md:flex-row flex-col flex w-full gap-7">
            <input
              onChange={handleChange}
              value={form.username}
              className="rounded-full border border-green-500 p-4 py-1 w-full"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
            />
            <div className="relative">
              <input
                onChange={handleChange}
                value={form.password}
                className="rounded-full border border-green-500 p-4 py-1 w-full"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                name="password"
                id="password"
                placeholder="Enter Password"
              />
              <span
                className="absolute right-[5px] top-[4px] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <img
                  className="p-1"
                  width={25}
                  src={showPassword ? "/hide.png" : "/view.png"} // Dynamic image based on state
                  alt="Show/Hide Password"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center bg-green-500 hover:bg-green-400 rounded-full px-5 py-2 w-fit border border-green-600"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
              colors="primary:#000000,secondary:#000000"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="py-5 font-bold text-xl">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md mb-5 overflow-hidden">
              <thead className="bg-green-600 text-black">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 text-center">
                      <div className="flex items-center justify-center">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer w-5"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "2px",
                              paddingLeft: "3px",
                            }}
                            trigger="hover"
                            colors="primary:#000000,secondary:#000000"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer w-5"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "2px",
                              paddingLeft: "3px",
                            }}
                            trigger="hover"
                            colors="primary:#000000,secondary:#000000"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer w-5"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "2px",
                              paddingLeft: "3px",
                            }}
                            trigger="hover"
                            colors="primary:#000000,secondary:#000000"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className="lordiconedit size-7 cursor-pointer w-5"
                          onClick={() => editPassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/tyounuzx.json"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "2px",
                              paddingLeft: "3px",
                            }}
                            trigger="hover"
                            colors="primary:#000000,secondary:#000000"
                          ></lord-icon>
                        </div>
                        <div
                          className="lordicondelete size-7 cursor-pointer w-5"
                          onClick={() => deletePassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/dovoajyj.json"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "2px",
                              paddingLeft: "3px",
                            }}
                            trigger="hover"
                            colors="primary:#000000,secondary:#000000"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
