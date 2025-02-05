"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

interface Room {
	name: string;
	onlineCount: number;
	onlineMax: number;
}
var socket: Socket;

const Home = () => {
	console.log('parent')
	const [getBool, setBool] = useState<boolean>(true);

	const [getRoomName, setRoomName] = useState<string>("");
	const [getMaxPlayers, setMaxPlayers] = useState<string>("5");
	const [getVisible, setVisible] = useState<boolean>(false);

	const createRoom = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevents default form behavior
		const data = {
			name: getRoomName,
			onlineMax: getMaxPlayers,
			userName: localStorage.getItem("userNickname"),
			JWT: localStorage.getItem('JWT')
		}
		socket.emit("createroom", data)
	}

	return (
		<div className="flex-row p-[10vh]">
			<h1>All Rooms</h1>
			<button onClick={() => setVisible(!getVisible)}>Add Room</button>
			<RoomsElement />
			{getVisible && (
				<form className="flex flex-col" onSubmit={createRoom}>
					<input
						type="text"
						required
						onChange={(e) => setRoomName(e.target.value)}
						value={getRoomName}
						placeholder="Room name"
						className="block bg-gray-400/50"
					/>
					<div className="flex m-auto">
						<input
							type="range"
							min="1"
							max="10"
							step="1"
							value={getMaxPlayers}
							onChange={(e) => setMaxPlayers(e.target.value)}
						/>
						<label className="w-2">{getMaxPlayers.toString()}</label>
					</div>
					<input type="submit" value="submit" className="bg-gray-400/50" />
				</form>
			)}
		</div>
	);
};

const RoomsElement = () => {
	const [getRooms, setRooms] = useState<Map<string, Room>>(new Map());
	console.log('child')
	useEffect(() => {
		async function fetchRooms() {
			const res = await fetch("http://localhost:3000/api/allrooms");
			const data = await res.json();
			console.log("Fetched rooms data:", data);
			const updatedMap = new Map<string, Room>(Object.entries(data));
			setRooms(updatedMap);
		}
		fetchRooms();
		socket = io("http://localhost:3000");
		socket.on("connect", () => {
			console.log("Connected to WebSocket server!");
		});
		socket.on("room_created", (message: { key: string; room: Room }) => {
			setRooms((prev) => {
				const updatedMap = new Map(prev);
				updatedMap.set(message.key, message.room)
				return updatedMap
			});
		});
		socket.on("deleteroom", (key: string) => {
			setRooms((prev) => {
				const updatedMap = new Map(prev);
				updatedMap.delete(key);
				return updatedMap;
			});
		});
		return () => {
			socket.disconnect();
			console.log('disconected')
		};
	}, []);
	return (
		<div className="grid gap-2">
			{[...getRooms.entries()].map(([key, room]) => (
				(
					<div
						key={key}
						className="w-auto mx-auto bg-gray-400/50 flex justify-around items-center"
					>
						<Link
							href={`/mafia_room?utm_room=${key}`}
							className="inline px-5"
						>
							{room.name}
						</Link>
						<div className="inline px-5">
							{room.onlineCount}/{room.onlineMax}
						</div>
					</div>
				) 
			))}
		</div>
	);
};

export default Home;
