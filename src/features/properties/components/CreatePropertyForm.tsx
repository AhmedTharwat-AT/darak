"use client";

import { useActionState } from "react";
import { createProperty } from "@/actions/properties";
import { useFormStatus } from "react-dom";

function CreatePropertyForm() {
  const [state, formAction] = useActionState(createProperty, {
    status: "idle",
    message: "",
  });

  return (
    <form
      className="flex flex-wrap gap-2 border-2 bg-green-200 p-2"
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
      className="my-2 w-[38%] border p-1"
      type="text"
      name={name}
      placeholder={name}
    />
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button className="w-full border bg-black p-1 text-white" type="submit">
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default CreatePropertyForm;
