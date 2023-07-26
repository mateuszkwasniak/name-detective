import Image from "next/image";
import NameSearchForm from "./components/NameSearchForm";
import { NameProvider } from "./name-provider";
import NameInfo from "./components/NameInfo";

export const metadata = {
  title: "Name Detective",
  description: "Investigate the origin and gender of the given name",
};

export default function HomePage() {
  return (
    <main className="w-[90%] xl:w-[70rem] mt-[12rem] flex-grow">
      <section className="w-full flex flex-col md:flex-row gap-6 md:gap-16 mb-10">
        <div className="flex flex-col gap-10 md:w-[400px] xl:w-[450px]">
          <p className="w-[80%] mb-4 text-2xl md:text-3xl xl:text-2xl text-slate-800 font-light text-left">
            Name Detective is a simple web application that will allow you to
            find out what country and gender a given name belongs to.
          </p>
          <div className="hidden md:block relative md:w-[300px] md:h-[300px] xl:w-[450px] xl:h-[450px]">
            <Image
              src="/hero.png"
              fill
              sizes="450px 450px"
              priority
              alt="Dude with the looking glass"
              className="object-contain"
            />
          </div>
        </div>
        <NameProvider>
          <div className="md:w-[500px] xl:w-[600px] flex flex-col content-end gap-16">
            <div className="md:w-[350px] xl:w-[400px]">
              <NameSearchForm />
            </div>
            <NameInfo />
          </div>
        </NameProvider>
      </section>
    </main>
  );
}
