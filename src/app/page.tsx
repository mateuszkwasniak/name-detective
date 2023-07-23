import Image from "next/image";
import NameSearchForm from "./components/NameSearchForm";

export const metadata = {
  title: "Name Detective",
  description: "Research the origin and gender of the given name",
};

export default function HomePage() {
  return (
    <main className="md:w-[90%] xl:w-[70rem] mt-[12rem] flex-grow">
      <section className="w-full flex md:gap-16 md:justify-center xl:justify-between">
        <div className="flex flex-col gap-10 md:w-[400px] xl:w-[450px]">
          <p className="w-[80%] mb-4 xl:text-2xl text-slate-800 font-light text-left">
            Name Detective is a simple web application that will allow you to
            find out what country and gender a given name belongs to.
          </p>
          <div className="relative md:w-[300px] md:h-[300px] xl:w-[450px] xl:h-[450px]">
            <Image
              src="/hero.png"
              fill
              sizes="450px 450px"
              priority
              alt="Dude with the looking glass"
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-[300px] xl:w-[400px]">
          <NameSearchForm />
        </div>
      </section>
    </main>
  );
}
