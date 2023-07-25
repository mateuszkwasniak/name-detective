import LoginForm from "./components/LoginForm";

export const metadata = {
  title: "Login",
  description: "Login as the admin",
};

export default function LoginPage() {
  return (
    <main className="w-[90%] xl:w-[70rem] mt-[12rem] flex-grow">
      <LoginForm />
    </main>
  );
}
