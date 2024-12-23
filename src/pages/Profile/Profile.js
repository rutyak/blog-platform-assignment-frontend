import React, { useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import BlogPosts from "../../components/BlogPosts";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [activeSection, setActiveSection] = useState("account");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const { userData } = useAuth(); 

  const handleSave = async () => {
    const updatedProfile = { username, email, dob, address };
    try {
      await axios.patch(`${Base_url}/profile/${userData._id}`, updatedProfile);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div className="min-h-[87.9vh] bg-gray-100">
      <div className="relative bg-gradient-to-r from-blue-500 to-green-500 h-60 flex items-center justify-center shadow-lg">
        <div className="absolute bottom-[1rem] flex flex-col items-center">
          <Avatar
            alt="User Profile"
            src="/static/images/avatar/1.jpg"
            sx={{
              width: 150, 
              height: 150,
              marginBottom: 1,
              border: "4px solid white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div className="relative mt-2">
            <span className="bg-gray-800 text-white text-xl px-4 py-2 rounded-full shadow-md">
              Rutik 
            </span>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center px-6 gap-6 mobile:flex-col md:flex-row">
        <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">
            Account Options
          </h3>
          <div className="space-y-4">
            <Button
              variant={activeSection === "account" ? "contained" : "outlined"}
              fullWidth
              onClick={() => setActiveSection("account")}
              sx={{
                justifyContent: "flex-start",
                backgroundColor:
                  activeSection === "account" ? "#34c38f" : "white",
                color: activeSection === "account" ? "white" : "gray",
                borderColor: "gray",
                "&:hover": {
                  backgroundColor:
                    activeSection === "account" ? "#28a376" : "#f9f9f9",
                },
              }}
            >
              Account Details
            </Button>
            <Button
              variant={activeSection === "blog" ? "contained" : "outlined"}
              fullWidth
              onClick={() => setActiveSection("blog")}
              sx={{
                justifyContent: "flex-start",
                backgroundColor: activeSection === "blog" ? "#34c38f" : "white",
                color: activeSection === "blog" ? "white" : "gray",
                borderColor: "gray",
                "&:hover": {
                  backgroundColor:
                    activeSection === "blog" ? "#28a376" : "#f9f9f9",
                },
              }}
            >
              Blog Posts
            </Button>
          </div>
        </div>

        <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6">
          {activeSection === "account" && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Account Details
              </h3>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <TextField
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-50"
                />
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50"
                />
                <TextField
                  label="Date of Birth"
                  fullWidth
                  variant="outlined"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="bg-gray-50"
                />
                <TextField
                  label="Address"
                  fullWidth
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="bg-gray-50"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-green-500 text-white capitalize hover:bg-green-600"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}
          {activeSection === "blog" && <BlogPosts editMode={true} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
