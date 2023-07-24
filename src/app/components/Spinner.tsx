type Props = {
  dark?: boolean;
};

export default function Spinner({ dark }: Props) {
  return (
    <div
      className={`${
        dark ? "border-t-black" : "border-t-white"
      } w-6 h-6 bg-transparent border-4 border-transparent rounded-full animate-spin`}
    />
  );
}
