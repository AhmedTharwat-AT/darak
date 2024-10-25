import { useActionState } from "react";
"use client";

import { addProperty } from "@/actions/actions";
import { useFormStatus } from "react-dom";

function AddProperty() {
  const [state, formAction] = useActionState(addProperty, {
    status: "idle",
    message: "",
  });

  return (
    <form
      className="border-2 flex-wrap bg-green-200 flex gap-2 p-2"
      action={formAction}
    >
      <div className="w-full">
        <p>Add Property</p>
        <p>status : {state.status}</p>
        <p>message : {state.message}</p>
      </div>
      <Input name="name" />
      <Input name="description" />
      <Input name="price" />
      <Input name="location" />
      <Input name="images" />
      <Input name="title" />
      <Input name="mode" />
      <Input name="type" />
      <Input name="space" />
      <Input name="rooms" />
      <Input name="bathrooms" />
      <Input name="ownerId" />

      <FormButton />
    </form>
  );
}

function Input({ name }: { name: string }) {
  return (
    <input
      className="border w-[38%] p-1 my-2 "
      type="text"
      name={name}
      placeholder={name}
    />
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button className="border p-1 w-full bg-black text-white" type="submit">
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default AddProperty;
