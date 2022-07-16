import React, { useState, Fragment, useEffect, useRef } from "react";
import Spinner from "./Spinner";

import { AiOutlineDown, AiOutlineCloudUpload } from "react-icons/ai";
import { TiTick, TiLocation, TiTrash } from "react-icons/ti";
import { Listbox, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";

//*firebase storage for uploading images and videos
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import { firebaseApp } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Create = ({ categories, toast, user }) => {
	console.log(user);
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [category, setCategory] = useState("");
	const [videoAsset, setVideoAsset] = useState(null);
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(1);
	const [description, setDescription] = useState("");

	const storage = getStorage(firebaseApp);
	const db = getFirestore(firebaseApp);
	const navigate = useNavigate();

	//! upload function
	const uploadVideo = (e) => {
		setLoading(true);
		const videoFile = e.target.files[0];
		console.log(videoFile);
		//* In order to upload or download files, delete files, or get or update metadata, you must create a reference to the file you want to operate on.
		//* A reference can be thought of as a pointer to a file in the cloud. References are lightweight,
		const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, videoFile);
		// Monitor Upload Progress
		uploadTask.on(
			"State_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				//Setting up our custom progress value
				setProgress(uploadProgress);
			},
			(error) => {
				// Handle unsuccessful uploads
				console.log(error);
				toast.error("Video Not uploaded");
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...

				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setVideoAsset(downloadURL);
					console.log("File available at", downloadURL);
					toast.success("Video Uploaded Successfully");
					setLoading(false);
				});
			}
		);
	};

	//! Delete video
	const deleteVideo = () => {
		const deleteRef = ref(storage, videoAsset);
		deleteObject(deleteRef)
			.then(() => {
				// File deleted successfully
				setVideoAsset(null);
				toast.warning("Video removed from our server");
			})
			.catch((error) => {
				// Uh-oh, an error occurred!
				console.log(error);
				toast.error("Oops !! Something went wrong");
			});
	};

	//tiny editor integration
	const editorRef = useRef(null);

	const getDescriptionValue = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
			setDescription(editorRef.current.getContent());
		}
	};

	const uploadDetails = async () => {
		try {
			if (title === "" || location === "" || !videoAsset || !description || !category) {
				toast.error("Required Fields are missing ");
			} else {
				const data = {
					id: `${Date.now()}`,
					title: title,
					userId: user?.uid,
					category: category,
					description: description,
					location: location,
					videoUrl: videoAsset,
				};

				await setDoc(doc(db, "videos", `${Date.now()}`), data);
				setLoading(false);
				navigate("/", { replace: true });
			}
		} catch (error) {
			console.log(error);
			toast.error(error);
		}
	};

	//Console logging our download url
	// useEffect(() => {}, [title, location, description, category]);

	return (
		<div className=" flex justify-center items-center w-full h-[100vh] pt-8">
			<div className="w-[100%] md:w-[80%] h-full border-2 border-gray-300 border-md p-4 flex flex-col items-center justify-center gap-2">
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					className="w-full p-2 text-lg input  border-gray-400 outline-none opacity-50 "
					placeholder="Title"
					required
				/>
				<div className="flex items-center justify-between w-full gap-8 my-2 ">
					<Listbox value={category} onChange={setCategory} className="w-full z-50">
						<div className="relative mt-1">
							<Listbox.Button className="relative w-full cursor-default rounded-lg bg-primary py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
								<span className="block truncate text-lg">Choose a category</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<AiOutlineDown size={22} />
								</span>
							</Listbox.Button>
							<Transition
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg">
									{categories.map((data) => (
										<Listbox.Option
											onClick={() => setCategory(data.name)}
											key={data.id}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active
														? "bg-secondary text-secondary-content"
														: "text-gray-900"
												}`
											}
											value={data.name}
										>
											{({ selected }) => (
												<Fragment>
													<span
														className={` truncate flex items-center gap-4 ${
															selected ? "font-medium" : "font-normal"
														}`}
													>
														{data.name} {data.iconSrc}
													</span>
													{selected ? (
														<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-focus">
															<TiTick
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</Fragment>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
					<div className="form-control w-full">
						<label className="input-group">
							<span>
								<TiLocation className="w-22 " />
							</span>
							<input
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								type="text"
								className="w-full p-2 text-lg input  border-gray-400 outline-none opacity-50 text-white "
								placeholder=" Location"
								required
							/>
						</label>
					</div>
				</div>

				{/* file selection */}
				<div className="flex border-2 border-gray-500 border-dotted h-[400px] w-full border-md relative ">
					{/* if there is no video uploaded then display upload form else loading screen and then the video which is alreay uploaded*/}
					{!videoAsset ? (
						<div className="w-full">
							<div className="flex flex-col items-center justify-center h-full w-full ">
								<div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
									{loading ? (
										<div>
											<Spinner
												msg={"Uploading your Video"}
												progress={progress}
											/>
										</div>
									) : (
										<div>
											<AiOutlineCloudUpload size={42} />
											<div className="text-lg mt-2">Click to Upload </div>
										</div>
									)}
								</div>
							</div>
							{!loading && (
								<input
									onChange={uploadVideo}
									type="file"
									name="upload-image"
									accept="video/mp4,video/x-m4v,video/*"
									className="input absolute top-0 input-info w-full h-full opacity-0 cursor-pointer"
								/>
							)}
						</div>
					) : (
						<div className="flex item-center justify center h-full w-full relative">
							<div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-red-500 absolute top-5 right-5 cursor-pointer z-10 hover:scale-110 duration-200 hover:bg-slate-600">
								<TiTrash size={24} color={"white"} onClick={deleteVideo} />
							</div>
							<video src={videoAsset} controls className="h-full w-full" />
						</div>
					)}
				</div>
				<Editor
					onChange={getDescriptionValue}
					apiKey={import.meta.env.VITE_APP_TINY_EDITOR_API_KEY}
					onInit={(evt, editor) => (editorRef.current = editor)}
					init={{
						height: 500,
						menubar: false,
						width: "100%",
						plugins: [
							"advlist",
							"autolink",
							"lists",
							"link",
							"image",
							"charmap",
							"preview",
							"anchor",
							"searchreplace",
							"visualblocks",
							"code",
							"fullscreen",
							"insertdatetime",
							"media",
							"table",
							"code",
							"help",
							"wordcount",
						],
						toolbar:
							"undo redo | blocks | " +
							"bold italic forecolor | alignleft aligncenter " +
							"alignright alignjustify | bullist numlist outdent indent | " +
							"removeformat | help",
						content_style:
							"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						content_css: "dark",
					}}
				/>
				<button
					className={`btn btn-primary w-full max-w-xl text-lg ${
						loading ? "loading" : null
					} `}
					onClick={uploadDetails}
				>
					Upload Video
				</button>
			</div>
		</div>
	);
};

export default Create;
