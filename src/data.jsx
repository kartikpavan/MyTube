import { SiYoutubegaming, SiMyanimelist } from "react-icons/si";
import { FaLaughSquint, FaQq, FaFilm, FaMusic } from "react-icons/fa";
import { MdEmojiNature } from "react-icons/md";

export const categories = [
	{ id: 1, name: "Games", iconSrc: <SiYoutubegaming size={30} /> },
	{ id: 2, name: "Funny", iconSrc: <FaLaughSquint size={30} /> },
	{ id: 3, name: "Stories", iconSrc: <FaQq size={30} /> },
	{ id: 4, name: "Movie", iconSrc: <FaFilm size={30} /> },
	{ id: 5, name: "Anime", iconSrc: <SiMyanimelist size={30} /> },
	{ id: 6, name: "Music", iconSrc: <FaMusic size={30} /> },
	{ id: 7, name: "Nature", iconSrc: <MdEmojiNature size={30} /> },
];
