"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";



import { Button, Checkbox, Input, Label } from "@nx-next-shadcn/shadcn";



import loginImg from "../../assets/login/Illustration.svg";
import eravendLogo from "../../assets/login/eravend.svg";


const Login = () => {
  const router = useRouter();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    router.push("/dashboard/company");
  };
  return (
    <main>
      <div className="container">
        <div className="flex h-full min-h-screen flex-col-reverse items-center justify-center gap-8 py-8 md:flex-row [&>*]:flex-1">
          <div className="w-full md:w-auto">
            <h2 className="mb-4 text-center text-3xl font-semibold text-indigo-500 lg:text-6xl">
              WELCOME
            </h2>
            <Image
              src={eravendLogo}
              alt="eravend_logo"
              className="mx-auto w-full max-w-[300px]"
            />

            <form className="mt-8" onSubmit={handleSubmit}>
              <Label htmlFor="Email" className="mb-2 block">
                Email address
              </Label>
              <Input placeholder="a@eravend.com" className="mb-4" />
              <Label htmlFor="Email" className="mb-2 block">
                Password
              </Label>
              <Input type="password" placeholder="********" />
              <div className="mb-6 mt-2 flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Remember me</Label>
              </div>
              <Button type="submit" className="w-full p-6 text-xl">
                LOGIN
              </Button>
            </form>
          </div>
          <div className="w-full md:w-auto">
            <Image
              src={loginImg}
              alt="login_illustration"
              className="mx-auto w-full max-w-[500px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;