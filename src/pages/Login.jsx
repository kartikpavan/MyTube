import React from "react";
import videoBg from "../assets/videobg.mp4";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
//* google authentication
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../firebase";
//* firebase firestore
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Login = () => {
	const provider = new GoogleAuthProvider();
	const auth = getAuth(firebaseApp);
	const db = getFirestore(firebaseApp);

	const navigate = useNavigate();

	const signIn = async () => {
		const { user } = await signInWithPopup(auth, provider);
		const { refreshToken, providerData } = user;
		console.log(refreshToken, providerData);

		//* Storing the refreshTOken and the user data in browser local storage
		localStorage.setItem("user", JSON.stringify(providerData));
		localStorage.setItem("userToken", JSON.stringify(refreshToken));

		//* sending user details to firebase firestore
		await setDoc(doc(db, "users", providerData[0].uid), providerData[0]);
		navigate("/", { replace: true });
	};

	return (
		<div>
			<div className="h-screen w-screen">
				<div className="overlay"></div>
				<video src={videoBg} autoPlay loop muted />
				<div className="absolute top-0 flex justify-center items-center h-screen w-screen">
					<button
						className="btn btn-lg glass text-white flex items-center gap-2"
						onClick={() => signIn()}
					>
						<FcGoogle size={28} />
						Sign in with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
