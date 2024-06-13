import React from "react";
import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Header from "@/components/Header";

const signIn = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col text-center items-center justify-center min-h-screen px-14 py-2 -mt-56">
        <img className="w-80" src="/social-sphere-logo.png" alt="" />
        <p className="font-xs mt-12 italic font-semibold">
          BUILT FOR PORTFOLIO PURPOSES ONLY.
        </p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  signIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}

export default signIn;
