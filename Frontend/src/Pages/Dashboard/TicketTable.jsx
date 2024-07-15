import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import ReadOnly from "../../Components/Dashboard/ReadOnly";
import EditableRow from "../../Components/Dashboard/EditableRow";

const TicketTable = () => {
  const initialFormState = {
    title: "",
    artist: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    city: "",
    eventLocation: "",
    organizer: "",
    price: "",
    currency: "",
    ticketType: "",
    quantityAvailable: "",
    image: "",
    seat: "",
    row: "",
  };

  const [addFormData, setAddFormData] = useState(initialFormState);

  const [ticket, setTicket] = useState([]);

  const [editFormData, setEditFormData] = useState(ticket);
  const [editTicketID, setEditTicketID] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/tickets/`
        );
        setTicket(res.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  // if (!ticket) return <div>No ticket data available</div>;

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
    console.log("editFormData", editFormData);
  };
  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/tickets/`,
        addFormData
      );
      console.log("Response data:", res.data);
      setTicket((prevTickets) => [...prevTickets, res.data]);
      setAddFormData(initialFormState); // Setzt das Formular zurück
    } catch (error) {
      console.error(
        "Fehler beim Hinzufügen des Tickets:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // handleEditFormSubmit

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedTicket = {
      _id: editTicketID,
      title: editFormData.title,
      artist: editFormData.artist,
      description: editFormData.description,
      // location: {
      //   venueName: editFormData.location.venueName,
      //   addressLine1: editFormData.location.addressLine1,
      //   state: editFormData.location.state,
      //   postalCode: editFormData.location.postalCode,
      //   country: editFormData.location.country,
      // },
      date: editFormData.date,
      startTime: editFormData.startTime,
      endTime: editFormData.endTime,
      city: editFormData.city,
      eventLocation: editFormData.eventLocation,
      organizer: editFormData.organizer,
      price: 25,
      currency: editFormData.currency,
      ticketType: editFormData.ticketType,
      quantityAvailable: 100,
      image: editFormData.image,
      qrCode: editFormData.qrCode,
      qrCodeImage: editFormData.qrCodeImage,
      seat: editFormData.seat,
      selectedSeats: [],
    };

    const newTickets = [...ticket];

    const index = ticket.findIndex((ticket) => ticket._id === editTicketID);

    newTickets[index] = editedTicket;

    setTicket(newTickets);
    setEditTicketID(null);
  };

  // handleCancelClick
  const handleCancelClick = () => {
    setEditTicketID(null);
  };

  const getTicketID = (event, ticket) => {
    event.preventDefault();
    setEditTicketID(ticket._id);
    console.log("ticketID", editTicketID);
  };

  // handleDeleteClick
  const handleDeleteClick = async (id) => {
    try {
      // API-Aufruf zum Löschen des Tickets
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/tickets/${id}`
      );
      // Nach erfolgreichem Löschen das Ticket aus dem State entfernen
      setTicket((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // handleEditClick
  const handleEditClick = (event, ticket) => {
    event.preventDefault();
    setEditTicketID(ticket._id);
    const formValues = {
      title: ticket.title,
      artist: ticket.artist,
      description: ticket.description,
      // location: {
      //   venueName: ticket.location.venueName,
      //   addressLine1: ticket.location.addressLine1,
      //   state: ticket.location.state,
      //   postalCode: ticket.location.postalCode,
      //   country: ticket.location.country,
      // },
      date: ticket.date,
      startTime: ticket.startTime,
      endTime: ticket.endTime,
      city: ticket.city,
      eventLocation: ticket.eventLocation,
      organizer: ticket.organizer,
      price: ticket.price,
      currency: ticket.currency,
      ticketType: ticket.ticketType,
      quantityAvailable: ticket.quantityAvailable,
      image: ticket.image,
      qrCode: ticket.qrCode,
      qrCodeImage: ticket.qrCodeImage,
      seat: ticket.seat,
      selectedSeats: [],
    };

    setEditFormData(formValues);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Add a Tickets</h1>

      <form
        onSubmit={handleAddFormSubmit}
        className="bg-white p-6 mb-4 border border-gray-200 rounded-xl shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="title"
            value={addFormData.title}
            onChange={handleAddFormChange}
            placeholder="Title"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="artist"
            value={addFormData.artist}
            onChange={handleAddFormChange}
            placeholder="Artist"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="description"
            value={addFormData.description}
            onChange={handleAddFormChange}
            placeholder="Description"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="city"
            value={addFormData.city}
            onChange={handleAddFormChange}
            placeholder="City"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="eventLocation"
            value={addFormData.eventLocation}
            onChange={handleAddFormChange}
            placeholder="Event Location"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="date"
            name="date"
            value={addFormData.date}
            onChange={handleAddFormChange}
            placeholder="Date"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="time"
            name="startTime"
            value={addFormData.startTime}
            onChange={handleAddFormChange}
            placeholder="Start Time"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="time"
            name="endTime"
            value={addFormData.endTime}
            onChange={handleAddFormChange}
            placeholder="End Time"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="organizer"
            value={addFormData.organizer}
            onChange={handleAddFormChange}
            placeholder="Organizer"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="number"
            name="price"
            value={addFormData.price}
            onChange={handleAddFormChange}
            placeholder="Price"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="currency"
            value={addFormData.currency}
            onChange={handleAddFormChange}
            placeholder="Currency"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="ticketType"
            value={addFormData.ticketType}
            onChange={handleAddFormChange}
            placeholder="Ticket Type"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="number"
            name="quantityAvailable"
            value={addFormData.quantityAvailable}
            onChange={handleAddFormChange}
            placeholder="Quantity Available"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="image"
            value={addFormData.image}
            onChange={handleAddFormChange}
            placeholder="Image URL"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="seat"
            value={addFormData.seat}
            onChange={handleAddFormChange}
            placeholder="Seat"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="row"
            value={addFormData.row}
            onChange={handleAddFormChange}
            placeholder="Row"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Ticket
        </button>
      </form>

      <div className="relative flex flex-col bg-clip-border shadow-xl rounded-xl text-gray-70 shadow-md h-full w-full bg-blue-gray-100">
        <div className="relative bg-clip-border mt-4 mx-4 overflow-hidden text-gray-700 rounded-none bg-blue-gray-100">
          <div className="flex justify-between items-center ">
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900">
              Ticket List
            </h5>
          </div>
        </div>
        <div className="p-6 overflow-scroll px-0">
          <form onSubmit={handleEditFormSubmit}>
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Title
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Artist
                    </h6>
                  </th>{" "}
                  {/* 
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Description
                    </h6>
                  </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Venue Name
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Address Line 1
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      State
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Postal Code
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Country
                    </h6>
                  </th> */}
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Date
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Start Time
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      End Time
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      City
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Event Location
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Organizer
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Price
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Currency{" "}
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Ticket Type
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Quantity Available
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Image{" "}
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Seat
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Row
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Actions
                    </h6>
                  </th>
                </tr>
              </thead>

              <tbody>
                {ticket.map((ticket) => (
                  <Fragment key={ticket._id}>
                    {editTicketID === ticket._id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        editTicketID={editTicketID}
                      />
                    ) : (
                      <ReadOnly
                        ticket={ticket}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
