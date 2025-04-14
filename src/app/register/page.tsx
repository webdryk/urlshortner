import AuthForm from "@/components/AuthForm";
import Link from "next/link"; // Import the Link component

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <AuthForm type="register" />
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
