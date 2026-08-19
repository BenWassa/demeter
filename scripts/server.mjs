import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.env.DEMETER_ROOT || '.');
const port = Number(process.env.PORT || 4173);
const types = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8',
  '.svg':'image/svg+xml',
  '.webp':'image/webp',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg'
};

createServer(async (req,res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    const safe = normalize(pathname).replace(/^([.][.][/\\])+/, '');
    const file = join(root, safe);
    if (!file.startsWith(root)) throw new Error('invalid path');
    const info = await stat(file);
    if (!info.isFile()) throw new Error('not a file');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type':types[extname(file)] || 'application/octet-stream', 'cache-control':'no-store' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type':'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}).listen(port,'127.0.0.1',()=>console.log(`Demeter served at http://127.0.0.1:${port}`));
