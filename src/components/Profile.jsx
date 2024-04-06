import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthUser from "../utils/AuthUser";
import { ProfileData } from "../utils/Axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { token, AxiosInstanse } = AuthUser();

  const fetchProfile = async () => {
    try {
      const response = await AxiosInstanse.get("/auth/profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  
  return (
    <div>
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Name: {profile.name}</p>
          <p>Role: {profile.role}</p>
          <img src={profile.avatar} alt="Avatar" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
