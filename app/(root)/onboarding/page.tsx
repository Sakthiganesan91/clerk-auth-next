"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";

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
      router.push("/home");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <div>
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address</label>
          <p>Enter your Address.</p>
          <textarea
            name="address"
            cols={30}
            rows={10}
            value={userData.address}
            onChange={(event) => {
              setUserData({
                ...userData,
                address: event.target.value,
              });
            }}
          ></textarea>
        </div>

        <div>
          <label>Linkedin</label>
          <p>Enter your linkedin URL</p>
          <input
            type="text"
            name="linkedin"
            value={userData.linkedin}
            required
            onChange={(event) => {
              setUserData({
                ...userData,
                linkedin: event.target.value,
              });
            }}
          />
        </div>
        {error && <p className="text-red-600">Error: {error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
