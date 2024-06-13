import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function EditBook() {
  const [bookDetails, setBooksDetails] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  // This use effect essentially is for displaying the existing book data to user
  useEffect(() => {
    setLoading(true);
    // get the book based on ID
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBooksDetails({
          title: res.data.title,
          author: res.data.author,
          publishYear: res.data.publishYear,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("error, check console");
        console.log(err);
      });
  }, []);

  const handleEditBook = () => {
    // create data object
    // access bookDetails state object
    const data = {
      title: bookDetails.title,
      author: bookDetails.author,
      publishYear: bookDetails.publishYear,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("Please check console");
        console.log(err);
      });
  };

  const handleOnChange = (e) => {
    // use name from the input to store it in bookDetails object
    const { name, value } = e.target;
    setBooksDetails({
      // spreading here for immutable state update, creating new object that includes all existing properties
      ...bookDetails,
      // if publishYear then force change value to a num
      [name]: name === "publishYear" ? Number(value) : value,
    });
  };

  return (
    <div className="p4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4 ">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              // add name for the handleOnChange to store into bookDetails object
              name="title"
              value={bookDetails.title}
              onChange={handleOnChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4 ">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              name="author"
              value={bookDetails.author}
              onChange={handleOnChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4 ">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="number"
              name="publishYear"
              value={bookDetails.publishYear}
              onChange={handleOnChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default EditBook;
