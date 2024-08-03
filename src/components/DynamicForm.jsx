import React from "react";

const DynamicForm = ({
  fields,
  formData,
  handleChange,
  handleSubmit,
  formTitle,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formTitle}</h2>
      {fields?.map((field) => (
        <div key={field.name} className="mb-6">
          <label
            className="block text-m font-medium text-gray-700"
            htmlFor={field.name}
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <button
        type="submit"
        className="mt-4 w-full bg-customBrown-200 text-white p-2 rounded-2xl hover:bg-customBrown-300"
      >
        {formTitle}
      </button>
    </form>
  );
};

export default DynamicForm;
