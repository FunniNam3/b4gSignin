import React from "react";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  permissions: number;
  gradYear: number;
}

const apiURL = "http://127.0.0.1:5000/";

async function getCurrentUserData(url: string): Promise<UserData> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Handle errors
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as UserData;
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserData>();

  async function getUserData() {
    setCurrentUser(await getCurrentUserData(apiURL + "currentUser"));
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div>
        <h1>HELLO</h1>
        <p>{currentUser?.firstName}</p>
      </div>
    </>
  );
}

export default App;
