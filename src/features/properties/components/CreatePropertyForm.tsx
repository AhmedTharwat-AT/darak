"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPropertySchema, CreatePropertySchema } from "@/lib/zodSchemas";
import { PropertyType } from "@/hooks/useFilter";
import { createProperty } from "@/actions/properties";
import { FileWithPreview } from "@/lib/types";

import ErrorField from "@/components/form/ErrorField";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import Textarea from "@/components/form/Textarea";
import PropertyTypeMenu from "@/components/PropertyTypeMenu";
import QuantityHandler from "@/components/QuantityHandler";
import { Button } from "@/components/ui/button";
import LocationInput from "@/components/LocationInput";
import LocationIcon from "@/components/LocationIcon";
import Spinner from "@/components/Spinner";
import DropImages from "@/components/DropImages";

function CreatePropertyForm() {
  const [serverMessage, setServerMessage] = useState({
    status: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    setError,
  } = useForm<CreatePropertySchema>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      mode: "",
      bathrooms: 0,
      price: 0,
      rooms: 0,
      space: 10,
      type: "apartment",
      phone: "",
      whatsapp: "",
      images: [],
    },
  });

  async function onSubmit(data: CreatePropertySchema) {
    try {
      const message = await createProperty(data);
      setServerMessage(message);
    } catch {
      setServerMessage({
        status: "failed",
        message: "Something went wrong!",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-[900px] flex-col items-center gap-5"
    >
      <div className="mb-6 flex w-full max-w-96 overflow-hidden rounded-lg border border-main">
        <RadioBtn register={register} mode="rent" />
        <RadioBtn register={register} mode="sell" />
      </div>

      <div className="w-full">
        <Label name="title" />
        <Input
          register={register}
          name="title"
          placeholder="Add Property Title"
          className="rounded-lg"
        />
        <ErrorField message={errors.title?.message} />
      </div>

      <div className="w-full">
        <Textarea
          register={register}
          name="description"
          placeholder="Add Property description"
          className="rounded-lg"
        />
        <ErrorField message={errors.description?.message} />
      </div>

      <div className="w-full">
        <Label name="upload images" />
        <DropImages
          images={getValues("images")}
          setImages={(images: FileWithPreview[]) =>
            setValue("images", images, {
              shouldValidate: true,
            })
          }
          setError={(message: string) =>
            setError("images", {
              type: "validate",
              message,
            })
          }
        />
        <ErrorField message={errors.images?.message} />
      </div>

      <div className="flex w-full gap-4 max-md:flex-col">
        <div className="w-full">
          <Label name="type" />
          <PropertyTypeMenu
            className="border"
            propertyType={getValues("type") as PropertyType}
            handlePropertyType={(type) =>
              setValue("type", type, { shouldValidate: true })
            }
            types={["apartment", "building", "store", "office"]}
          />
          <ErrorField message={errors.type?.message} />
        </div>
        <div className="w-full">
          <Label name="price" />
          <div className="flex overflow-hidden rounded-lg">
            <Input
              register={register}
              name="price"
              placeholder="enter whatsapp number"
            />
            <div className="flex select-none items-center justify-center self-stretch bg-gray-600 px-2 text-white">
              <span>EGP</span>
            </div>
          </div>
          <ErrorField message={errors.price?.message} />
        </div>
      </div>

      <div className="w-full">
        <Label name="location" />
        <div className="flex w-full items-center rounded-lg border bg-white p-1 ps-2">
          <LocationInput
            className="w-full border-none p-0"
            currentLocation={getValues("location")}
            handleLocation={(val) =>
              setValue("location", val, { shouldValidate: true })
            }
          />
          <LocationIcon />
        </div>
        <ErrorField message={errors.location?.message} />
      </div>

      <div className="flex w-full gap-4 max-md:flex-col">
        <div className="w-full">
          <Label name="phone" />
          <div className="flex overflow-hidden rounded-lg">
            <div className="flex select-none items-center justify-center self-stretch bg-gray-600 px-2 text-white">
              <span>+20</span>
            </div>
            <Input
              register={register}
              name="phone"
              placeholder="Enter phone number"
            />
          </div>
          <ErrorField message={errors.phone?.message} />
        </div>
        <div className="w-full">
          <Label name="whatsapp" />
          <div className="flex overflow-hidden rounded-lg">
            <div className="flex select-none items-center justify-center self-stretch bg-gray-600 px-2 text-white">
              <span>+20</span>
            </div>
            <Input
              register={register}
              name="whatsapp"
              placeholder="Enter whatsapp number"
            />
          </div>
          <ErrorField message={errors.whatsapp?.message} />
        </div>
      </div>

      <hr className="my-4 h-1 w-full bg-gray-200" />

      <h3 className="self-start text-lg font-medium capitalize">features</h3>

      <div className="flex w-full gap-4 max-md:flex-col">
        <div className="w-full">
          <Label name="rooms" />
          <QuantityHandler
            register={register}
            name="rooms"
            className="h-11 w-full gap-0 border"
            value={getValues("rooms")}
            handler={(val) => setValue("rooms", val, { shouldValidate: true })}
          />
          <ErrorField message={errors.rooms?.message} />
        </div>
        <div className="w-full">
          <Label name="bathrooms" />
          <QuantityHandler
            register={register}
            name="bathrooms"
            className="h-11 w-full gap-0 border"
            value={getValues("bathrooms")}
            handler={(val) =>
              setValue("bathrooms", val, { shouldValidate: true })
            }
          />
          <ErrorField message={errors.bathrooms?.message} />
        </div>
      </div>

      <div className="w-full">
        <Label name="Space (m2)" className="normal-case" />
        <QuantityHandler
          register={register}
          name="space"
          className="h-11 w-full gap-0 border"
          value={getValues("space")}
          handler={(val) => setValue("space", val, { shouldValidate: true })}
        />
        <ErrorField message={errors.space?.message} />
      </div>

      <div className="mt-6 w-full">
        <Button
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center text-lg uppercase hover:bg-main/90 md:text-xl"
        >
          {isSubmitting ? (
            <Spinner className="text-2xl text-white" />
          ) : (
            "create property"
          )}
        </Button>
        {serverMessage && (
          <ErrorField
            className={`text-center text-lg capitalize ${
              serverMessage.status === "success" ? "text-green-700" : ""
            }`}
            message={serverMessage.message}
          />
        )}
      </div>
    </form>
  );
}

function RadioBtn({
  mode,
  register,
}: {
  mode: "sell" | "rent";
  register: any;
}) {
  return (
    <div className="relative flex w-1/2 items-center justify-center">
      <input
        {...register("mode")}
        id={mode}
        type="radio"
        value={mode}
        defaultChecked={mode === "rent"}
        className="peer invisible absolute"
      />
      <label
        htmlFor={mode}
        className="size-full cursor-pointer bg-transparent py-2 text-center font-medium uppercase text-main transition-all peer-checked:cursor-default peer-checked:bg-main peer-checked:text-white"
      >
        {mode}
      </label>
    </div>
  );
}

export default CreatePropertyForm;
