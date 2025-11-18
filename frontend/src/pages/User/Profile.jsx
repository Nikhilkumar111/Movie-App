import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader.jsx";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = ({ backgroundUrl }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const bgImage =
    backgroundUrl ||
    "https://wallpapercave.com/wp/wp1814319.jpg"; // movie-themed background

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h2 className="text-center text-3xl font-bold text-white mb-6">
          Edit Your Profile
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loadingUpdateProfile}
            className={`w-full py-3 font-bold rounded-lg transition text-white ${
              loadingUpdateProfile
                ? "bg-red-600/70 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loadingUpdateProfile ? <Loader small /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
