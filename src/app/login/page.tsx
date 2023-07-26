import LoginForm from "./components/LoginForm";
import Image from "next/image";

export const metadata = {
  title: "Login",
  description: "Login as the admin",
};

export default function LoginPage() {
  return (
    <main className="w-[90%] xl:w-[70rem] mt-[12rem] flex-grow">
      <section className="w-full flex justify-center md:justify-start gap-16 mb-10 ">
        <LoginForm />
        <div className="hidden md:block self-center relative md:w-[300px] md:h-[300px] xl:w-[450px] xl:h-[450px]">
          <Image
            src="/hero2.png"
            fill
            sizes="450px 450px"
            priority
            alt="Gal with the looking glass"
            className="object-contain"
          />
        </div>
      </section>
    </main>
  );
}
