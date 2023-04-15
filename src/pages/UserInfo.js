import React, { useContext, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import profile from "../assets/images/user.png";
import Header from "../components/Header";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const UserInfo = () => {
  const {
    user,
    userName,
    email,
    number,
    address,
    imageAsset,
    setImageAsset,
    isDone,
    setIsDone,
    setUserName,
    setEmail,
    setNumber,
    setAddress,
  } = UserAuth();

  const { id } = useParams();

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const q = query(collection(db, "userInfo"));
  //     onSnapshot(q, (querySnapShot) => {
  //       querySnapShot.docs.map((doc) => {
  //         const data = doc.data();
  //         console.log(data);
  // setImageAsset(data.imageURL);
  // setUserName(data.userName);
  // setEmail(data.email);
  // setNumber(data.number);
  // setAddress(data.address);

  //         setIsDone(true);
  //         console.log(doc.id);
  //         console.log(data.userId);
  //         return doc.id;
  //       });
  //     });
  //   };
  //   fetchUserInfo();
  // }, []);
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user?.uid) {
        const q = query(
          collection(db, "userInfo"),
          where("userId", "==", user?.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data())[0];
        setImageAsset(data.imageURL);
        setUserName(data.userName);
        setEmail(data.email);
        setNumber(data.number);
        setAddress(data.address);
        setIsDone(true);
      }
    };
    fetchUserDetails();
  }, [user?.uid]);

  return (
    <>
      <Header />
      <div className="bg-slate-800 w-full h-full flex flex-col min-h-screen justify-center items-center text-white">
        <div className="bg-slate-900/50 rounded-lg p-6 w-[95%] sm:w-[450px] flex flex-col gap-y-8 mt-16">
          {/* {user && userId === id && isDone (
            <>
              {isDone ? (
                <>
                  <div className="-mt-16">
                    <img
                      src={`${imageAsset ? imageAsset : profile}`}
                      alt="profile"
                      className="w-[100px] h-[100px] rounded-full mx-auto"
                    />
                  </div>
                  <div className="text-center">
                    <p className="mb-2">Name :</p>
                    <h2 className="text-center text-lg font-medium bg-black/25 px-2 py-1 rounded-md capitalize inline">
                      {userName}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="mb-4 pl-2">Email :</p>
                      <p className="text-center bg-black/25 px-2 py-2 rounded-md inline">
                        {email}
                      </p>
                    </div>
                    <div>
                      <p className="mb-4 pl-2">Number :</p>
                      <p className="text-center bg-black/25 px-2 py-2 rounded-md inline">
                        {number}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 pl-2">Address :</p>
                    <p className="bg-black/25 px-3 py-2 rounded-md">
                      {address}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link to={`/addprofile/${id}`}>
                      <button
                        className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                        type="button"
                      >
                        Edit <AiFillEdit />
                      </button>
                    </Link>
                    <Link to={"/home"}>
                      <button
                        className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                        type="button"
                      >
                        Done <MdDone />
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="-mt-16">
                    <img
                      src={`${imageAsset ? imageAsset : profile}`}
                      alt="profile"
                      className="w-[100px] h-[100px] rounded-full mx-auto"
                    />
                  </div>
                  <div className="text-center">
                    <p className="mb-2">Name :</p>
                    <h2 className="text-center text-lg font-medium bg-black/25 px-2 py-1 rounded-md w-[65%] mx-auto text-gray-500">
                      nill
                    </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="mb-4 pl-2">Email :</p>
                      <p className="text-center bg-black/25 px-2 py-2 pr-32 rounded-md inline text-gray-500">
                        nill
                      </p>
                    </div>
                    <div>
                      <p className="mb-4 pl-2">Number :</p>
                      <p className="text-center bg-black/25 px-2 pr-32 py-2 rounded-md inline text-gray-500">
                        nill
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 pl-2">Address :</p>
                    <p className="bg-black/25 px-3 py-2 pb-16 rounded-md text-gray-500">
                      nill
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link to={`/addprofile`}>
                      <button
                        className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                        type="button"
                      >
                        Edit Profile <AiFillEdit />
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </>
          )} */}
          {user && user?.uid === id && isDone ? (
            <>
              <div className="-mt-16">
                <img
                  src={`${imageAsset ? imageAsset : profile}`}
                  alt="profile"
                  className="w-[100px] h-[100px] rounded-full mx-auto"
                />
              </div>
              <div className="text-center">
                <p className="mb-2">Name :</p>
                <h2 className="text-center text-lg font-medium bg-black/25 px-2 py-1 rounded-md capitalize inline">
                  {userName}
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-4 pl-2">Email :</p>
                  <p className="text-center bg-black/25 px-2 py-2 rounded-md inline">
                    {email}
                  </p>
                </div>
                <div>
                  <p className="mb-4 pl-2">Number :</p>
                  <p className="text-center bg-black/25 px-2 py-2 rounded-md inline">
                    {number}
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-2 pl-2">Address :</p>
                <p className="bg-black/25 px-3 py-2 rounded-md">{address}</p>
              </div>
              <div className="flex justify-between items-center">
                <Link to={`/addprofile/${id}`}>
                  <button
                    className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                    type="button"
                  >
                    Edit <AiFillEdit />
                  </button>
                </Link>
                <Link to={"/home"}>
                  <button
                    className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                    type="button"
                  >
                    Done <MdDone />
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="-mt-16">
                <img
                  src={`${imageAsset ? imageAsset : profile}`}
                  alt="profile"
                  className="w-[100px] h-[100px] rounded-full mx-auto"
                />
              </div>
              <div className="text-center">
                <p className="mb-2">Name :</p>
                <h2 className="text-center text-lg font-medium bg-black/25 px-2 py-1 rounded-md w-[65%] mx-auto text-gray-500">
                  nill
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-4 pl-2">Email :</p>
                  <p className="text-center bg-black/25 px-2 py-2 pr-32 rounded-md inline text-gray-500">
                    nill
                  </p>
                </div>
                <div>
                  <p className="mb-4 pl-2">Number :</p>
                  <p className="text-center bg-black/25 px-2 pr-32 py-2 rounded-md inline text-gray-500">
                    nill
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-2 pl-2">Address :</p>
                <p className="bg-black/25 px-3 py-2 pb-16 rounded-md text-gray-500">
                  nill
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Link to={`/addprofile`}>
                  <button
                    className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                    type="button"
                  >
                    Edit Profile <AiFillEdit />
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
