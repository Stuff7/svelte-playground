import type { UserFile } from './models';

export default function socketEvents(accessToken: string) {
  const url = `ws://localhost:5000/ws?token=${accessToken}`;
  const socket = new WebSocket(url);
  return new Promise<Realtime>((resolve, reject) => {
    socket.onopen = () => {
      socket.onmessage = ({ data }) => {
        const files = JSON.parse(data);
        EVENTS['folder-change'].forEach(handler => handler(files));
      };

      const addSocketEvent = (eventName: EventName) => {
        socket.send(`event:add:${eventName}`);
      };

      const removeSocketEvent = (eventName: EventName) => {
        socket.send(`event:remove:${eventName}`);
      };

      resolve({
        on(eventName, handler) {
          if (EVENTS[eventName].push(handler) === 1) {
            addSocketEvent(eventName);
          }
          return handler;
        },
        off(eventName, handler) {
          EVENTS[eventName] = EVENTS[eventName].filter(h => h !== handler);
          if (EVENTS[eventName].length === 0) {
            removeSocketEvent(eventName);
          }
        },
        close() {
          EVENT_NAMES.forEach(removeSocketEvent);
          socket.close(3000, 'Bye!');
        },
      });
    };

    socket.onerror = (error) => {
      console.error('Error in WebSocket', error);
      reject(error);
    };
  });
}

export type Realtime = {
  on<T extends EventName>(eventName: T, handler: EventHandler<T>): EventHandler<T>,
  off<T extends EventName>(eventName: T, handler: EventHandler<T>): void,
  close(): void,
};

const EVENTS = {
  'folder-change': [] as FileChangeEventHandler[],
};

const EVENT_NAMES = Object.keys(EVENTS) as EventName[];

type EventName = keyof typeof EVENTS;
type EventHandler<T extends EventName> = typeof EVENTS[T][number];

type FileChangeEventHandler = (fileChange: FileChange) => unknown;

export interface FileChange {
  userId: string,
  folderId: string,
  files: UserFile[],
}
