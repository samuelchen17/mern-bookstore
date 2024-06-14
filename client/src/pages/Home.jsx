import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import TableDisplay from "../components/home/TableDisplay";
import CardDisplay from "../components/home/CardDisplay";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayType, setDisplayType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      // grabs the object containing book data from backend
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => {
            setDisplayType("table");
          }}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => {
            setDisplayType("card");
          }}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books list</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {/* if loading = true, show loading icon, else generate the list */}
      {loading ? (
        <Spinner />
      ) : displayType === "table" ? (
        <TableDisplay books={books} />
      ) : (
        <CardDisplay books={books} />
      )}
    </div>
  );
}

export default Home;
