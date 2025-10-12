import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center md:flex-row gap-10 w-full min-h-[80vh] px-4 md:px-40">
      <div className="w-full md:w-md flex items-center justify-center font-primary">
        <div className="text-black relative z-50">
          <h5 className="text-dark text-2xl">Hi There,</h5>
          <h2 className="text-3xl">
            I’m a <span className="text-primary">Full Stack</span> Web Developer
          </h2>
          <h1 className="text-5xl text-primary py-3">VIJAY SINGH</h1>
          <p className="text-foreground">
            Full Stack Web Developer with strong expertise in modern web
            technologies. I design and develop complete solutions — from
            intuitive interfaces to efficient backend systems.
          </p>
          <div className="my-5">
            <Button>HIRE ME</Button>
          </div>
        </div>
      </div>
      <div className="flex md:p-10 justify-center md:justify-end items-center">
        <Image
          src={"/vijay_brush.png"}
          width={300}
          height={300}
          alt="brush-vijay"
        />
      </div>
    </div>
  );
}
