import { FileWithPath } from "@mantine/dropzone";
import { ReactEventHandler, useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import { Button, Image } from "@mantine/core";
import "react-image-crop/dist/ReactCrop.css";

interface BandProfileCropperProps {
  file?: FileWithPath;
  setCroppedFile: (f: File) => void;
}

export const BandProfileCropper = ({
  file,
  setCroppedFile,
}: BandProfileCropperProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState<string>("");
  const [originalHeight, setOriginalHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    setOriginalWidth(width);
    setOriginalHeight(height);

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        1,
        width,
        height,
      ),
      width,
      height,
    );

    setCrop(crop);
  };

  useEffect(() => {
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, [file]);

  // Adjust file when crop changes
  useEffect(() => {
    if (crop && file) {
      if (imageRef.current) {
        const offscreen = new OffscreenCanvas(640, 640);

        // Calculate crop position from top left
        const cropX = (crop.x / 100) * originalWidth;
        const cropY = (crop.y / 100) * originalHeight;

        // Original image crop
        const originalCropWidth = (crop.width / 100) * originalWidth;
        const originalCropHeight = (crop.height / 100) * originalHeight;

        (
          offscreen.getContext("2d") as OffscreenCanvasRenderingContext2D
        )?.drawImage(
          imageRef.current,
          cropX,
          cropY,
          originalCropWidth,
          originalCropHeight,
          0,
          0,
          640,
          640,
        );

        offscreen
          .convertToBlob({
            type: "image/jpeg",
            quality: 1,
          })
          .then((b) => {
            setCroppedFile(new File([b], file.name));
          });
      }
    }
  }, [crop]);

  if (!file) {
    return <></>;
  }

  return (
    <>
      <ReactCrop crop={crop} onChange={(_, c) => setCrop(c)} aspect={1}>
        <Image src={image} ref={imageRef} onLoad={onImageLoad} />
      </ReactCrop>
    </>
  );
};
