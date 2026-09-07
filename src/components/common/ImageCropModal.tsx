"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area, getCroppedImg } from "@/lib/cropImage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  UploadCloud,
  Crop,
  RotateCw,
  ZoomIn,
  Loader2,
  Check,
  X,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  onUploadSuccess: (url: string) => void;
  folder?: string;
  defaultAspect?: number;
}

export function ImageCropModal({
  isOpen,
  onClose,
  imageSrc,
  onUploadSuccess,
  folder = "projects",
  defaultAspect = 16 / 9,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(defaultAspect);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsUploading(true);
    try {
      // 1. Get cropped image Blob from Canvas
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);

      // 2. Prepare FormData for /api/cloudinary
      const file = new File([croppedBlob], `crop-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      // 3. Upload to Cloudinary via server API route
      const res = await fetch("/api/cloudinary", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to upload image");
      }

      const data = await res.json();
      toast.success("Image cropped & uploaded to Cloudinary!");
      onUploadSuccess(data.url);
      onClose();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isUploading && onClose()}>
      <DialogContent className="max-w-2xl bg-card border-border p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading font-bold flex items-center gap-2">
            <Crop className="h-5 w-5 text-primary" /> Crop & Adjust Image
          </DialogTitle>
        </DialogHeader>

        {/* Cropper Container */}
        <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden border border-border/50">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        {/* Aspect Ratio Presets */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Aspect Ratio
          </Label>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={aspect === 16 / 9 ? "default" : "outline"}
              size="sm"
              onClick={() => setAspect(16 / 9)}
              className="text-xs"
            >
              16:9 (Landscape)
            </Button>
            <Button
              type="button"
              variant={aspect === 4 / 3 ? "default" : "outline"}
              size="sm"
              onClick={() => setAspect(4 / 3)}
              className="text-xs"
            >
              4:3 (Standard)
            </Button>
            <Button
              type="button"
              variant={aspect === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setAspect(1)}
              className="text-xs"
            >
              1:1 (Square)
            </Button>
            <Button
              type="button"
              variant={aspect === undefined ? "default" : "outline"}
              size="sm"
              onClick={() => setAspect(undefined)}
              className="text-xs"
            >
              Free Crop
            </Button>
          </div>
        </div>

        {/* Sliders Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Zoom Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ZoomIn className="h-3.5 w-3.5" /> Zoom
              </span>
              <span>{zoom.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Rotation Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <RotateCw className="h-3.5 w-3.5" /> Rotation
              </span>
              <span>{rotation}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              step={90}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading to Cloudinary...
              </>
            ) : (
              <>
                <UploadCloud className="mr-2 h-4 w-4" />
                Crop & Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface CloudinaryFileDropzoneProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  label?: string;
}

export function CloudinaryFileUploader({
  onUploadSuccess,
  folder = "projects",
  label = "Upload Image to Cloudinary",
}: CloudinaryFileDropzoneProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedImage(reader.result as string);
        setIsModalOpen(true);
      });
      reader.readAsDataURL(file);
      // Reset input value so same file can be selected again if needed
      e.target.value = "";
    }
  };

  return (
    <>
      <div className="relative">
        <label className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm font-semibold shadow transition-all duration-200 gap-2">
          <UploadCloud className="h-4 w-4" />
          <span>{label}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={selectedImage}
        onUploadSuccess={onUploadSuccess}
        folder={folder}
      />
    </>
  );
}
