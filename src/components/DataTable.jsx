import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

function DataTable() {
  const [originalData, setOriginalData] = useState()
  const [userData, setuserData] = useState(); 
  const [isAce, setIsAce] = useState(false);
  const [isLoding, setIsLoding] = useState(true)

  // set header for the table.
  let heading = [
    "City",
    "State",
    "Country",
    "PinCode",
    "Number",
    "Name",
    "Latitude",
    "Longitude",
  ];

  // get initial data from database
  useEffect(() => {
    axios.get(`https://randomuser.me/api?results=30`).then((response) => {
      let tableData = [];
      let bigdata = response.data.results;
      bigdata.map((data) => {
        let newObject = {
          City: data.location.city,
          State: data.location.state,
          Country: data.location.country,
          PinCode: data.location.postcode,
          Number: data.location.street.number,
          Name: data.name.first + " " + data.name.last,
          Latitude: data.location.coordinates.latitude,
          Longitude: data.location.coordinates.longitude,
        };
        tableData.push(newObject);
        setIsLoding(false)
      });
      setOriginalData(tableData);
      setuserData(tableData);
    });
  }, []);

  // search fucnction for all keys in the table
  const filterData = (event) => {
    let filteredData = originalData.filter((data) => {
      return (
        data.City.toLowerCase().includes(event.target.value.toLowerCase()) ||
        data.State.toLowerCase().includes(event.target.value.toLowerCase()) ||
        data.Country.toLowerCase().includes(event.target.value.toLowerCase()) ||
        data.PinCode.toString().toLowerCase().includes(event.target.value.toString().toLowerCase()) ||
        data.Number.toString().toLowerCase().includes(event.target.value.toString().toLowerCase()) ||
        data.Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        data.Latitude.toString().toLowerCase().includes(event.target.value.toString().toLowerCase()) ||
        data.Longitude.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setuserData(filteredData);
  };

  // sort function for the table
  const handleOrder = (e) => {
    let id  = e.target.id;
    if (isAce === true) {
        setuserData(userData.sort((a, b) => (typeof a === String || typeof b === String) ? a[id].localeCompare(b[id]) : a[id].toString().localeCompare(b[id].toString())));
        setIsAce(!isAce);
    } else {
      setuserData(userData.sort((a, b) =>  (typeof a === String || typeof b === String) ?  b[id].localeCompare(a[id]) : b[id].toString().localeCompare(a[id].toString())));
      setIsAce(!isAce);
    }
  };

// if data is not available
  if (isLoding){
    return (
      <Fragment>
        <h1>Loading...</h1>
      </Fragment>
    )
  }

  return (
    <Fragment>
    <div className="container">
    <input type="text" onChange={(event) => filterData(event)} />
    </div>
      {Array.isArray(userData) && userData.length > 0 && (
        <table
          style={{
            width: "99%",
            border: "red solid 1px",
            borderRadius: "12px",
            padding: "10px",
            margin: "5px",
          }}
        >
          <thead>
            <tr>
              {heading?.map((head, headID) => (
                <th key={headID} id={head} onClick={(e) => handleOrder(e)}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.map((data, index) => (
              <tr key={index}>
                <td>{data.City}</td>
                <td>{data.State}</td>
                <td>{data.Country}</td>
                <td>{data.PinCode}</td>
                <td>{data.Number}</td>
                <td>{data.Name}</td>
                <td>{data.Latitude}</td>
                <td>{data.Longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
}

export default DataTable;
