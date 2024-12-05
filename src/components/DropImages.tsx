import { FileWithPreview } from "@/lib/types";
import Image from "next/image";
import { useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { ImCross } from "react-icons/im";

function DropImages({
  images,
  setImages,
  setError,
}: {
  images: FileWithPreview[];
  setImages: (images: FileWithPreview[]) => void;
  setError: (message: string) => void;
}) {
  const onDrop = useCallback(
    (acceptedimages: FileWithPath[]) => {
      const currFile = acceptedimages[0];
      // check if file is larger than 1mb
      if (currFile.size > 1000000) {
        setError("please select images smaller than 1mb");
        return;
      }
      // check if file already exist
      const newimages: FileWithPreview[] = [
        ...images.filter((f) => f.name !== currFile.name),
        Object.assign(currFile, {
          preview: URL.createObjectURL(currFile),
        }),
      ];
      setImages(newimages);
    },

    [images, setImages, setError],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 3,
    multiple: true,
    onError: () =>
      setError("please select valid images type (jpg , png , jpeg , webp)"),
    disabled: images.length >= 3,
  });

  return (
    <div className="w-full">
      {images.length < 3 && (
        <>
          <div
            {...getRootProps({
              className:
                "dropzone border-4 cursor-pointer  hover:bg-gray-100 hover:border-main/70 transition-all duration-300 w-full h-36 text-center rounded-lg border-dashed flex items-center justify-center border-gray-300 p-4",
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the images here</p>
            ) : (
              <p className="cursor-pointer">
                Drag and drop images or{" "}
                <span className="font-medium capitalize text-main underline">
                  browse
                </span>
              </p>
            )}
          </div>
        </>
      )}

      {images && images.length > 0 && (
        <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {images.map((file: any, index: number) => (
            <div
              className={`rounded-lg bg-gray-200 p-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${index == 2 && "sm:col-span-2 md:col-span-1"}`}
              key={file.name}
            >
              <div className="flex items-center justify-between p-2">
                <p className="max-w-40 truncate pb-1">{file.name}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setImages(images.filter((f) => f !== file));
                  }}
                  className="p-1"
                >
                  <ImCross className="text-lg text-main" />
                </button>
              </div>
              <div className="relative h-36 overflow-hidden rounded-lg">
                <Image
                  fill
                  src={file.preview}
                  alt="property image"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropImages;
