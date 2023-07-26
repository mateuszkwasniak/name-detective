"use client";

type Props = {
  date: Date;
};

export default function ClientsLocaleDateTime({ date }: Props) {
  return (
    <p className="md:text-xl">
      {date.toLocaleDateString()} at {date.toLocaleTimeString()}
    </p>
  );
}
