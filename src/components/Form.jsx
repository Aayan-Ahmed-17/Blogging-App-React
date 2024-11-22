import React, { useState } from "react";
import { useRef } from "react";

const Form = ({
  name,
  onSubmitFunc,
  emailRef,
  passwordRef,
  firstNameRef,
  lastNameRef,
}) => {
  let formData;
  function fieldData(event) {
    event.preventDefault();
    firstNameRef
      ? (formData = {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
      : (formData = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
    onSubmitFunc(formData);
  }

  return (
    <form
      onSubmit={fieldData}
      className="w-96 mx-auto grid gap-3 border-2 border-black px-5 py-10 rounded-xl mt-40"
    >
      <h2 className="text-center text-3xl">{name}</h2>
      {firstNameRef && (
        <>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="First Name"
              name="fName"
              autoComplete="on"
              ref={firstNameRef}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Last Name"
              name="LName"
              autoComplete="on"
              ref={lastNameRef}
              required
            />
          </label>
        </>
      )}
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Email"
          name="email"
          autoComplete="on"
          ref={emailRef}
          required
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="password"
          className="grow"
          placeholder="Password"
          name="password"
          ref={passwordRef}
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg max-w-2/5 justify-self-end py-2 px-3 box-content text-xl"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
