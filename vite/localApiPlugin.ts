import type {IncomingMessage, ServerResponse} from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {config as loadEnv} from 'dotenv';
import type {Plugin} from 'vite';
import {sendMeetingRequest} from '../api/book-meeting.ts';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

/**
 * Serves `/api/book-meeting` during `vite` so local form submissions work
 * without needing `vercel dev`. Production still uses `api/book-meeting.ts`.
 */
export function localApiPlugin(): Plugin {
  return {
    name: 'local-api-book-meeting',
    configureServer(server) {
      loadEnv({path: path.resolve(rootDir, '../.env')});

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/api/book-meeting') {
          next();
          return;
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          sendJson(res, 405, {error: 'Method not allowed'});
          return;
        }

        try {
          const body = await readJsonBody(req);
          const result = await sendMeetingRequest(body ?? {});

          if (result.ok === false) {
            sendJson(res, result.status, {error: result.error});
            return;
          }

          sendJson(res, 200, {ok: true});
        } catch (error) {
          console.error('Local /api/book-meeting failed', error);
          sendJson(res, 500, {error: 'Неуспешно изпращане. Моля, опитайте отново.'});
        }
      });
    },
  };
}
