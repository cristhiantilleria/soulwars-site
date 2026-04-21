import { NextResponse } from 'next/server';
import * as net from 'net';

// TODO: update these to your real BYOND server address and port
const BYOND_HOST = process.env.BYOND_SERVER_HOST || 'play.soulwars.net';
const BYOND_PORT = parseInt(process.env.BYOND_SERVER_PORT || '2525', 10);
const PROBE_TIMEOUT_MS = 4000;

function probeByondServer(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const cleanup = (result: boolean) => {
      socket.destroy();
      resolve(result);
    };
    socket.setTimeout(PROBE_TIMEOUT_MS);
    socket.on('connect', () => cleanup(true));
    socket.on('error',   () => cleanup(false));
    socket.on('timeout', () => cleanup(false));
    socket.connect(port, host);
  });
}

export async function GET() {
  try {
    const online = await probeByondServer(BYOND_HOST, BYOND_PORT);
    return NextResponse.json(
      { online, players: 0, maxPlayers: 0 },
      {
        headers: {
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { online: false, players: 0, maxPlayers: 0 },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
