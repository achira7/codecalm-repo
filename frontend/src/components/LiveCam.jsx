import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Color } from "../theme/Colors";
import { BtnColor } from "../theme/ButtonTheme";

import { roleStateAtom } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const LiveCam = () => {
  const [userData, setUserData] = useState({});
  const [emotionResponseState, setEmotionResponseState] = useState("");
  const [emotionFrequency, setEmotionFrequency] = useState("");
  const [gaze, setGaze] = useState("");
  const [progress, setProgress] = useState(0);

  const [focusLevel, setFocusLevel] = useState(null);

  const [showNotification, setShowNotification] = useState(true);
  const webcamRef = useRef(null);
  const intervalRef = useRef(null);

  const userRole = useRecoilValue(roleStateAtom);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getuser/", {
          withCredentials: true,
        });
        const user = response.data;
        setUserData(user);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    const postImage = async (imageSrc) => {
      try {
        const formData = new FormData();
        formData.append("frame", imageSrc);
        formData.append("user_id", userData.id);

        const response = await axios.post(
          "http://127.0.0.1:8000/api/emotions/",
          formData,
          {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
            },
          },
        );

        if (response) {
          const { emo, frq, gaze } = response.data;
          setEmotionResponseState(emo);
          setEmotionFrequency(frq);
          setGaze(gaze);

          if (
            response.data.emo === "No Face Detected" ||
            response.data.emo === "Multiple Faces Detected" ||
            response.data.emo === "No Emotion Detected" ||
            response.data.emo ===
              "Webcam cover is closed or image is too dark" ||
            response.data.emo === "Image is blurred. Please clear the webcam."
          ) {
            if (
              showNotification &&
              localStorage.getItem("notification") !== "hidden"
            ) {
              setShowNotification(false);
              notifyUser(response.data.emo);
              toast.error(response.data.emo, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                limit: 1,
              });
            } else {
            }
          }

          if (
            response.data.frq === "You seem to be stressed!" &&
            localStorage.getItem("notification") !== true
          ) {
            toast.error(`You seem to be stressed!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              limit: 1,
            });
          }
        }
      } catch (error) {
        console.error("Error in POST request to emotions API:", error);
      }
    };

    const postFocusImage = async (imageSrc) => {
      try {
        const formData = new FormData();
        formData.append("frame", imageSrc);
        formData.append("user_id", userData.id);

        const response = await axios.post(
          "http://127.0.0.1:8000/api/focus/",
          formData,
          {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
            },
          }
        );
        if (response.data) {
          const focusData = response.data.text;

          if (focusData === "F") {
            setFocusLevel("Focused");
          } else if (focusData === "NF") {
            setFocusLevel("Not Focused");
          } else {
            setFocusLevel(focusData);
          }
        }
      } catch (error) {
        console.error("Error in POST request to focus API:", error);
      }
    };

    const captureAndPostImages = () => {
      if (webcamRef.current && userData.id) {
        const imageSrc = webcamRef.current.getScreenshot();
        postImage(imageSrc);
        postFocusImage(imageSrc);
      }
    };

    const intervalTime = 10000;
    const progressIntervalTime = 100;

    intervalRef.current = setInterval(() => {
      captureAndPostImages();
    }, intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 0;
        }
        return prevProgress + 100 / (intervalTime / progressIntervalTime);
      });
    }, progressIntervalTime);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressInterval);
    };
  }, [userData]);

  const customId = "custom-id-yes";

  const notifyUser = (message) => {
    if (document.hidden && Notification.permission === "granted") {
      new Notification("CodeCalm", {
        body: message,
        icon: "http://127.0.0.1:8000/media/favicons/codecalm_favicon_2.png",
      });
    }
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div>
      {/* <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 ${ window.location.pathname.includes("/employee/livecam")? ' ': 'hidden'}`} >  */}
      {userRole != "Admin" && (
        <div
          className={`${
            window.location.pathname.includes("/employee/livecam")
              ? "min-h-screen flex flex-col items-center justify-center bg-gray-100"
              : "opacity-0 h-1 pointer-events-none fixed top-1"
          }`}
        >
          <h1
            className={`text-3xl font-bold text-sky-500 font-google ${Color.background} ${Color.cardBGText}`}
          >
            Live Camera
          </h1>
          <div
            className={` ${Color.chartsBGText} rounded-lg shadow-lg p-4 w-full max-w-xl`}
          >
            <div className="relative">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-lg w-full"
              />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-full">
                LIVE
              </div>
              <img
                src="http://127.0.0.1:8000/media/assets/codecalm-logo-colored.png"
                alt="CodeCalm"
                className="absolute top-2 right-2 w-10"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">Current Emotion</p>
                <p className="text-lg font-semibold">{emotionResponseState}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">Current Stress Level</p>
                <p className="text-lg font-semibold">{emotionFrequency}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">Current Focus</p>
                <p className="text-lg font-semibold">{focusLevel}</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar
                  value={progress}
                  strokeWidth={50}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default LiveCam;
