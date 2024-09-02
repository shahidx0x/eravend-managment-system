import React from "react";

import Image from "next/image";

import { Button, Checkbox, Input, Label } from "@nx-next-shadcn/shadcn";

const page = () => {
  const handleLoginButton = () => {
    console.log("");
  };
  return (
    <div className="flex h-screen flex-col-reverse md:flex-row">
      <div className="center basis-6/12">
        <div className="md:w-[30rem] lg:w-[35rem]">
          <h2 className="text-center text-6xl font-bold text-indigo-500">
            WELCOME TO
          </h2>
          <Image
            src="./login/eravend.svg"
            alt="eravend_logo"
            height={0}
            width={0}
            className="h-full w-full p-5"
          />
          <div className="">
            <Label htmlFor="Email">Email address</Label>
            <Input placeholder="a@eravend.com" />
            <Label htmlFor="Email">Password</Label>
            <Input type="password" placeholder="********" />
            <div className="flex items-center space-x-2 py-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Remember me</Label>
            </div>
            <Button className="w-full p-7 text-xl">LOGIN</Button>
          </div>
        </div>
      </div>
      <div className="center md:basis-6/12">
        <Image
          src="./login/illustration.svg"
          alt="login_illustration"
          height={0}
          width={0}
          className="h-[80%] w-[80%]"
        />
      </div>
    </div>
  );
};

export default page;
