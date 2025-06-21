import React, { useState, useRef, useEffect, useCallback } from "react";

interface ImageEditorProps {
  imageFile: File;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedFile: File) => void;
  onCancel: () => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageTransform {
  scale: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  imageFile,
  isOpen,
  onClose,
  onSave,
  onCancel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [cropArea, setCropArea] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string>("");
  const [transform, setTransform] = useState<ImageTransform>({
    scale: 1,
    rotation: 0,
    flipX: false,
    flipY: false,
  });
  const [_imageUrl, setImageUrl] = useState<string>("");

  // Load image when component mounts or file changes
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);

      const img = new Image();
      img.onload = () => {
        setImage(img);
        // Initialize crop area to full image
        setCropArea({
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
        });
        // Reset transforms for new image
        setTransform({ scale: 1, rotation: 0, flipX: false, flipY: false });
      };
      img.src = url;

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imageFile]);

  // Draw image and crop overlay on canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !image) return;

    // Set canvas size
    const containerWidth = 600;
    const containerHeight = 400;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, containerWidth, containerHeight);

    // Calculate image display size maintaining aspect ratio
    const imageAspect = image.width / image.height;
    const containerAspect = containerWidth / containerHeight;

    let displayWidth, displayHeight, offsetX, offsetY;

    if (imageAspect > containerAspect) {
      displayWidth = containerWidth * transform.scale;
      displayHeight = (containerWidth / imageAspect) * transform.scale;
      offsetX = (containerWidth - displayWidth) / 2;
      offsetY = (containerHeight - displayHeight) / 2;
    } else {
      displayWidth = containerHeight * imageAspect * transform.scale;
      displayHeight = containerHeight * transform.scale;
      offsetX = (containerWidth - displayWidth) / 2;
      offsetY = (containerHeight - displayHeight) / 2;
    }

    // Save context for transformations
    ctx.save();

    // Apply transformations
    ctx.translate(containerWidth / 2, containerHeight / 2);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(transform.flipX ? -1 : 1, transform.flipY ? -1 : 1);
    ctx.translate(-containerWidth / 2, -containerHeight / 2);

    // Draw image
    ctx.drawImage(image, offsetX, offsetY, displayWidth, displayHeight);

    // Restore context
    ctx.restore();

    // Calculate crop overlay positions
    const scaleX = displayWidth / image.width;
    const scaleY = displayHeight / image.height;
    const cropX = offsetX + cropArea.x * scaleX;
    const cropY = offsetY + cropArea.y * scaleY;
    const cropWidth = cropArea.width * scaleX;
    const cropHeight = cropArea.height * scaleY;

    // Create overlay effect by drawing semi-transparent rectangles around crop area
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

    // Top overlay
    if (cropY > 0) {
      ctx.fillRect(0, 0, containerWidth, cropY);
    }

    // Bottom overlay
    if (cropY + cropHeight < containerHeight) {
      ctx.fillRect(
        0,
        cropY + cropHeight,
        containerWidth,
        containerHeight - (cropY + cropHeight)
      );
    }

    // Left overlay
    if (cropX > 0) {
      ctx.fillRect(0, cropY, cropX, cropHeight);
    }

    // Right overlay
    if (cropX + cropWidth < containerWidth) {
      ctx.fillRect(
        cropX + cropWidth,
        cropY,
        containerWidth - (cropX + cropWidth),
        cropHeight
      );
    }

    // Draw crop border
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropX, cropY, cropWidth, cropHeight);

    // Draw resize handles
    const handleSize = 8;
    ctx.fillStyle = "#3b82f6";

    // Corner handles
    ctx.fillRect(
      cropX - handleSize / 2,
      cropY - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropX + cropWidth - handleSize / 2,
      cropY - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropX - handleSize / 2,
      cropY + cropHeight - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropX + cropWidth - handleSize / 2,
      cropY + cropHeight - handleSize / 2,
      handleSize,
      handleSize
    );

    // Side handles
    ctx.fillRect(
      cropX + cropWidth / 2 - handleSize / 2,
      cropY - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropX + cropWidth / 2 - handleSize / 2,
      cropY + cropHeight - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropX - handleSize / 2,
      cropY + cropHeight / 2 - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropX + cropWidth - handleSize / 2,
      cropY + cropHeight / 2 - handleSize / 2,
      handleSize,
      handleSize
    );
  }, [image, cropArea, transform]);

  // Redraw canvas when dependencies change
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Handle mouse events for crop area
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on resize handles
    const handleSize = 8;
    const containerWidth = 600;
    const containerHeight = 400;

    const imageAspect = image.width / image.height;
    const containerAspect = containerWidth / containerHeight;

    let displayWidth, displayHeight, offsetX, offsetY;

    if (imageAspect > containerAspect) {
      displayWidth = containerWidth * transform.scale;
      displayHeight = (containerWidth / imageAspect) * transform.scale;
      offsetX = (containerWidth - displayWidth) / 2;
      offsetY = (containerHeight - displayHeight) / 2;
    } else {
      displayWidth = containerHeight * imageAspect * transform.scale;
      displayHeight = containerHeight * transform.scale;
      offsetX = (containerWidth - displayWidth) / 2;
      offsetY = (containerHeight - displayHeight) / 2;
    }

    const scaleX = displayWidth / image.width;
    const scaleY = displayHeight / image.height;
    const cropX = offsetX + cropArea.x * scaleX;
    const cropY = offsetY + cropArea.y * scaleY;
    const cropWidth = cropArea.width * scaleX;
    const cropHeight = cropArea.height * scaleY;

    // Check resize handles
    const handles = [
      { name: "nw", x: cropX, y: cropY },
      { name: "ne", x: cropX + cropWidth, y: cropY },
      { name: "sw", x: cropX, y: cropY + cropHeight },
      { name: "se", x: cropX + cropWidth, y: cropY + cropHeight },
      { name: "n", x: cropX + cropWidth / 2, y: cropY },
      { name: "s", x: cropX + cropWidth / 2, y: cropY + cropHeight },
      { name: "w", x: cropX, y: cropY + cropHeight / 2 },
      { name: "e", x: cropX + cropWidth, y: cropY + cropHeight / 2 },
    ];

    for (const handle of handles) {
      if (
        Math.abs(x - handle.x) <= handleSize / 2 &&
        Math.abs(y - handle.y) <= handleSize / 2
      ) {
        setIsResizing(true);
        setResizeHandle(handle.name);
        setDragStart({ x, y });
        return;
      }
    }

    // Check if clicking inside crop area for dragging
    if (
      x >= cropX &&
      x <= cropX + cropWidth &&
      y >= cropY &&
      y <= cropY + cropHeight
    ) {
      setIsDragging(true);
      setDragStart({ x: x - cropX, y: y - cropY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging) {
      const containerWidth = 600;
      const containerHeight = 400;

      const imageAspect = image.width / image.height;
      const containerAspect = containerWidth / containerHeight;

      let displayWidth, displayHeight, offsetX, offsetY;

      if (imageAspect > containerAspect) {
        displayWidth = containerWidth * transform.scale;
        displayHeight = (containerWidth / imageAspect) * transform.scale;
        offsetX = (containerWidth - displayWidth) / 2;
        offsetY = (containerHeight - displayHeight) / 2;
      } else {
        displayWidth = containerHeight * imageAspect * transform.scale;
        displayHeight = containerHeight * transform.scale;
        offsetX = (containerWidth - displayWidth) / 2;
        offsetY = (containerHeight - displayHeight) / 2;
      }

      const scaleX = displayWidth / image.width;
      const scaleY = displayHeight / image.height;

      const newX = Math.max(
        0,
        Math.min(
          image.width - cropArea.width,
          (x - dragStart.x - offsetX) / scaleX
        )
      );
      const newY = Math.max(
        0,
        Math.min(
          image.height - cropArea.height,
          (y - dragStart.y - offsetY) / scaleY
        )
      );

      setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
    } else if (isResizing) {
      // Handle resizing logic here
      const containerWidth = 600;
      const containerHeight = 400;

      const imageAspect = image.width / image.height;
      const containerAspect = containerWidth / containerHeight;

      let displayWidth = 0,
        displayHeight,
        offsetX = 0,
        offsetY = 0;
      if (offsetX === 0 && offsetY === 0) {
      }

      if (imageAspect > containerAspect) {
        displayWidth = containerWidth * transform.scale;
        displayHeight = (containerWidth / imageAspect) * transform.scale;
        offsetX = (containerWidth - displayWidth) / 2;
        offsetY = (containerHeight - displayHeight) / 2;
      } else {
        displayWidth = containerHeight * imageAspect * transform.scale;
        displayHeight = containerHeight * transform.scale;
        offsetX = (containerWidth - displayWidth) / 2;
        offsetY = (containerHeight - displayHeight) / 2;
      }

      const scaleX = displayWidth / image.width;
      const scaleY = displayHeight / image.height;

      const deltaX = (x - dragStart.x) / scaleX;
      const deltaY = (y - dragStart.y) / scaleY;

      setCropArea((prev) => {
        let newCrop = { ...prev };

        switch (resizeHandle) {
          case "n": {
            const newHeight = Math.max(50, prev.height - deltaY);
            newCrop.y = Math.max(0, prev.y + prev.height - newHeight);
            newCrop.height = newHeight;
            break;
          }
          case "s": {
            newCrop.height = Math.max(
              50,
              Math.min(image.height - prev.y, prev.height + deltaY)
            );
            break;
          }
          case "w": {
            const newWidth = Math.max(50, prev.width - deltaX);
            newCrop.x = Math.max(0, prev.x + prev.width - newWidth);
            newCrop.width = newWidth;
            break;
          }
          case "e": {
            newCrop.width = Math.max(
              50,
              Math.min(image.width - prev.x, prev.width + deltaX)
            );
            break;
          }
          case "se":
            newCrop.width = Math.max(
              50,
              Math.min(image.width - prev.x, prev.width + deltaX)
            );
            newCrop.height = Math.max(
              50,
              Math.min(image.height - prev.y, prev.height + deltaY)
            );
            break;
          case "sw": {
            const newWidth = Math.max(50, prev.width - deltaX);
            newCrop.x = Math.max(0, prev.x + prev.width - newWidth);
            newCrop.width = newWidth;
            newCrop.height = Math.max(
              50,
              Math.min(image.height - prev.y, prev.height + deltaY)
            );
            break;
          }
          case "ne": {
            const newHeight = Math.max(50, prev.height - deltaY);
            newCrop.y = Math.max(0, prev.y + prev.height - newHeight);
            newCrop.height = newHeight;
            newCrop.width = Math.max(
              50,
              Math.min(image.width - prev.x, prev.width + deltaX)
            );
            break;
          }
          case "nw":
            const newWidth = Math.max(50, prev.width - deltaX);
            const newHeight = Math.max(50, prev.height - deltaY);
            newCrop.x = Math.max(0, prev.x + prev.width - newWidth);
            newCrop.y = Math.max(0, prev.y + prev.height - newHeight);
            newCrop.width = newWidth;
            newCrop.height = newHeight;
            break;
        }

        return newCrop;
      });

      setDragStart({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle("");
  };

  // Transform controls
  const handleZoom = (delta: number) => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.1, Math.min(3, prev.scale + delta)),
    }));
  };

  const handleRotate = (degrees: number) => {
    setTransform((prev) => ({
      ...prev,
      rotation: (prev.rotation + degrees) % 360,
    }));
  };

  const handleFlip = (axis: "x" | "y") => {
    setTransform((prev) => ({
      ...prev,
      [axis === "x" ? "flipX" : "flipY"]:
        !prev[axis === "x" ? "flipX" : "flipY"],
    }));
  };

  const handleReset = () => {
    setTransform({ scale: 1, rotation: 0, flipX: false, flipY: false });
    if (image) {
      setCropArea({ x: 0, y: 0, width: image.width, height: image.height });
    }
  };

  // Apply edits and create new file
  const handleSave = async () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to crop area
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;

    // Apply transformations
    ctx.save();
    ctx.translate(cropArea.width / 2, cropArea.height / 2);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(transform.flipX ? -1 : 1, transform.flipY ? -1 : 1);
    ctx.translate(-cropArea.width / 2, -cropArea.height / 2);

    // Draw cropped image
    ctx.drawImage(
      image,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      cropArea.width,
      cropArea.height
    );

    ctx.restore();

    // Convert canvas to blob and create file
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const editedFile = new File([blob], imageFile.name, {
            type: imageFile.type,
            lastModified: Date.now(),
          });
          onSave(editedFile);
        }
      },
      imageFile.type,
      0.9
    );
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Chỉnh sửa ảnh</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Canvas Area */}
          <div className="flex-1 p-4 bg-gray-100">
            <canvas
              ref={canvasRef}
              className="block mx-auto border border-gray-300 cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ backgroundColor: "transparent" }}
            />
          </div>

          {/* Controls */}
          <div className="p-4 w-64 bg-gray-50 border-l">
            <div className="space-y-4">
              {/* Zoom Controls */}
              <div>
                <label className="block mb-2 text-sm font-medium">Zoom</label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleZoom(-0.1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-sm">
                    {(transform.scale * 100).toFixed(0)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => handleZoom(0.1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rotation Controls */}
              <div>
                <label className="block mb-2 text-sm font-medium">Xoay</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleRotate(-90)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ↺ 90°
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRotate(90)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ↻ 90°
                  </button>
                </div>
              </div>

              {/* Flip Controls */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Lật ảnh
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleFlip("x")}
                    className={`px-3 py-1 rounded ${transform.flipX ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  >
                    ⟷ Ngang
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFlip("y")}
                    className={`px-3 py-1 rounded ${transform.flipY ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  >
                    ↕ Dọc
                  </button>
                </div>
              </div>

              {/* Crop Info */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Vùng cắt
                </label>
                <div className="space-y-1 text-xs">
                  <div>X: {Math.round(cropArea.x)}</div>
                  <div>Y: {Math.round(cropArea.y)}</div>
                  <div>W: {Math.round(cropArea.width)}</div>
                  <div>H: {Math.round(cropArea.height)}</div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 w-full bg-gray-200 rounded hover:bg-gray-300"
              >
                Đặt lại
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 space-x-2 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
