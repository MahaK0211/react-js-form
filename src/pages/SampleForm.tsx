import React, { useState } from "react";
import Input from "../Components/Input";
import Select from "../Components/Select";
import { validate } from "../hooks/useValidation";
import GoogleMapComponent from "../Components/GoogleMap";

function SampleForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
      console.log("Form Data:", formValues);
    }
  };

  return (
    <div className="p-6 mt-5 max-w-5xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Sample Data</h2>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
        {/* First Name */}
        <Input id="name" label="First Name" value={formValues.name} onChange={handleChange} error={errors.name} />

        {/* Last Name */}
        <Input
          id="lastname"
          label="Last Name"
          value={formValues.lastname}
          onChange={handleChange}
          error={errors.lastname}
        />

        {/* Email */}
        <Input
          id="email"
          label="Email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* Password */}
        <Input
          id="password"
          label="Password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* Address */}
        <Input id="address" label="Address" value={formValues.address} onChange={handleChange} error={errors.address} />

        {/* Address 2 */}
        <Input id="address2" label="Address 2" value={formValues.address2} onChange={handleChange} />

        {/* City */}
        <Select
          id="city"
          label="City"
          options={["Chennai", "Madurai", "Thiruvannamalai", "Erode"]}
          value={formValues.city}
          onChange={handleChange}
          error={errors.city}
        />

        {/* State */}
        <Select
          id="state"
          label="State"
          options={["Tamil Nadu"]}
          value={formValues.state}
          onChange={handleChange}
          error={errors.state}
        />

        {/* Zip */}
        <Input id="zip" label="Zip" value={formValues.zip} onChange={handleChange} error={errors.zip} />

        {/* Checkbox */}
        <div className="col-span-1 md:col-span-3 flex items-center">
          <input
            id="gridCheck"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="gridCheck" className="ml-2 text-sm text-gray-700">
            Check me out
          </label>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-3">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Google Map */}
      <div className="mt-6">
        <GoogleMapComponent />
      </div>
      <hr/>
    </div>
  );
}

export default SampleForm;
