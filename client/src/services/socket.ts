import { io, Socket } from 'socket.io-client';

const SOCKET_URL = window.location.origin;

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});

socket.on('connect', () => {
  console.log('⚡ Connected to NutriCraft Real-time WebSockets Server:', socket.id);
});

socket.on('disconnect', () => {
  console.warn('⚠️ Disconnected from NutriCraft Real-time Server');
});
