import { useState } from "react";

export default function IntroFormPage() {
  const [formData, setFormData] = useState({
    f_name: "Emily",
    m_name: "Elizabeth",
    l_name: "Gerard",
    acknowledgement:
      "I understand that what is on this page is not password protected...",
    ack_date: "2026-01-13",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  function handleClear() {
    setFormData({
      f_name: "",
      m_name: "",
      l_name: "",
      acknowledgement: "",
      ack_date: "",
    });
  }

  return (
    <>
      <h2>Introduction Form</h2>
      <h3>Please submit the form below.</h3>

      <form onSubmit={handleSubmit}>
        <p>
          <label>First Name: </label>
          <input
            type="text"
            name="f_name"
            value={formData.f_name}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Middle Name: </label>
          <input
            type="text"
            name="m_name"
            value={formData.m_name}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Last Name: </label>
          <input
            type="text"
            name="l_name"
            value={formData.l_name}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Acknowledgement Statement: </label>
          <input
            type="text"
            name="acknowledgement"
            value={formData.acknowledgement}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Acknowledgement Date: </label>
          <input
            type="date"
            name="ack_date"
            value={formData.ack_date}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </p>
      </form>
    </>
  );
}
