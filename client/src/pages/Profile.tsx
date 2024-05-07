import React, { useEffect, useState } from "react";
import {
  changePassword,
  getProfile,
  updateProfile,
  uploadProfilePicture,
} from "../api";
import Loading from "../component/Loading";
import { ProfileType } from "../types";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks";

function Profile() {
  const [profile, setProfile] = useState<ProfileType>({
    name: "",
    email: "",
    profilePicture: "",
  });
  const [editProfileData, setEditProfileData] = useState<ProfileType>({
    name: "",
    email: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [edit, setEdit] = useState(false);
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();

  const profileUpdateHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    updateProfile(editProfileData).then((data: any) => {
      setProfile(data.user);
      setEditProfileData(data.user);
      setEdit(false);
    });
  };

  const uploadImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    toast.loading("Uploading Image...", { toastId: "uploading-profile-image" });
    uploadProfilePicture(image)
      .then((data: any) => {
        setProfile(data.user);
        setEditProfileData(data.user);
        dispatch({
          type: "user/SET_PROFILE_PICTURE",
          payload: data.user.profilePicture,
        });
        setEdit(false);
      })
      .finally(() => {
        setImage(null);
        toast.done("uploading-profile-image");
      });
  };

  const passwordChangeHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    changePassword({
      currentPassword: passwordChange.currentPassword,
      newPassword: passwordChange.newPassword,
    }).then(() => {
      toast.success("Password changed successfully");
      setPasswordChange({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    });
  };

  useEffect(() => {
    getProfile().then((data: any) => {
      setProfile(data.user);
      setEditProfileData(data.user);
      setLoading(false);
    });
  }, []);

  if (loading || !profile.email) return <Loading />;
  return (
    <div className="w-full max-w-screen-xl flex gap-4 flex-col p-8">
      <div className="flex flex-col gap-8 md:flex-row md:gap-20">
        <div className="md:w-60">
          <h1 className="text-2xl">Account Settings</h1>
          <p>Update your profile information</p>
        </div>
        <div>
          <div className="flex flex-col">
            <img
              src={editProfileData.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded mb-5"
            />
            <div>
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm text-gray-500 dark:text-gray-300"
                >
                  Change Image
                </label>

                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  multiple={false}
                  className="block w-96 max-w-[80vw] px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  onChange={(e) => {
                    if (
                      e.currentTarget.files &&
                      e.currentTarget.files.length > 0
                    ) {
                      if (e.currentTarget.files[0].size > 1024 * 1024) {
                        e.currentTarget.value = "";
                        alert("File size should be less than 1MB");
                        return;
                      }
                      setImage(e.currentTarget.files[0]);
                    }
                  }}
                />
                <button
                  onClick={uploadImage}
                  className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Upload Image
                </button>
              </div>
              {/* <button className="">
                Change Image
              </button> */}
              <p className="text-sm">
                JPG, JPEG, PNG and WEBP allowed upto 1MB
              </p>
            </div>
          </div>

          <form className="pt-4">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[30rem] max-w-[80vw]"
                value={editProfileData.name}
                disabled={!edit}
                onChange={(e) =>
                  setEditProfileData({
                    ...editProfileData,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email (Read only)
              </label>
              <input
                type="email"
                id="email"
                disabled
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[30rem] max-w-[80vw]"
                placeholder={editProfileData.email}
              />
            </div>
            <button
              className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={(e) => {
                e.preventDefault();
                setEdit(!edit);
                setEditProfileData(profile);
              }}
            >
              {edit ? "Cancel" : "Edit"}
            </button>
            {edit && (
              <button
                // type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={profileUpdateHandler}
              >
                Change details
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="flex pt-4 flex-col md:flex-row md:gap-20">
        <div className="md:w-60">
          <h1 className="text-2xl">Change Password</h1>
          <p>Change your account password</p>
        </div>
        <div>
          <form className="">
            <div className="mb-5">
              <label
                htmlFor="current-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Current password
              </label>
              <input
                type="password"
                id="current-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[30rem] max-w-[80vw]"
                placeholder="Enter current password"
                value={passwordChange.currentPassword}
                onChange={(e) =>
                  setPasswordChange({
                    ...passwordChange,
                    currentPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="new-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New password
              </label>
              <input
                type="password"
                id="new-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[30rem] max-w-[80vw]"
                placeholder="Enter new password"
                value={passwordChange.newPassword}
                onChange={(e) =>
                  setPasswordChange({
                    ...passwordChange,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm new password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[30rem] max-w-[80vw]"
                placeholder="Confirm new password"
                value={passwordChange.confirmPassword}
                onChange={(e) =>
                  setPasswordChange({
                    ...passwordChange,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={passwordChangeHandler}
            >
              Change password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
