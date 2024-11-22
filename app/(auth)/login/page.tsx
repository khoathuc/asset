import PageBody from "@/components/layout/PageBody";
import "@/styles/auth.css";
import AuthForm from "../@comps/AuthForm";

export default function AuthPage() {
  return (
    <div className="asset-auth-page">
      <PageBody className="bg-base-200" no-header>  
        <div className="flex items-center justify-center h-screen">
          <AuthForm />
        </div>
      </PageBody>
    </div>
  );
}
