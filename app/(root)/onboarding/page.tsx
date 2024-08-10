"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function OnboardingComponent() {
  const [error, setError] = React.useState("");

  const [userData, setUserData] = React.useState({
    linkedin: "",
    address: "",
  });
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const res = await completeOnboarding();

    if (res?.message) {
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <div className="my-2 px-4 w-full lg:w-[568px] md:px-2 lg:0">
      <div>
        <h1 className="text-1xl my-4">Fill out your details</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <Label className="text-4xl my-4">Address</Label>

            <Textarea
              name="address"
              cols={50}
              rows={10}
              placeholder="type your address"
              value={userData.address}
              onChange={(event) => {
                setUserData({
                  ...userData,
                  address: event.target.value,
                });
              }}
            ></Textarea>
          </div>

          <div>
            <Label className="text-lg my-12">Linkedin</Label>

            <Input
              type="text"
              name="linkedin"
              value={userData.linkedin}
              required
              placeholder="Enter your linkedin URL"
              onChange={(event) => {
                setUserData({
                  ...userData,
                  linkedin: event.target.value,
                });
              }}
            />
          </div>
          {error && <p className="text-red-600">Error: {error}</p>}
          <button
            type="submit"
            className="bg-slate-500 border-1 rounded-md text-white px-4 py-2 my-2 border-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
