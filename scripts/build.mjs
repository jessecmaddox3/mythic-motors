import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root=fileURLToPath(new URL('../',import.meta.url))
const read=(name)=>readFile(path.join(root,name),'utf8')
const escape=(value)=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const license=await read('LICENSE')
const notices=[license,'Three.js r128',await read('public/vendor/three-LICENSE.txt'),'Bungee',await read('public/fonts/bungee-OFL.txt'),'Bungee Shade',await read('public/fonts/bungeeshade-OFL.txt'),'Chakra Petch',await read('public/fonts/chakrapetch-OFL.txt')].join('\n\n')
await writeFile(path.join(root,'public/LICENSE.txt'),license)
await writeFile(path.join(root,'public/THIRD_PARTY_NOTICES.txt'),notices)
await writeFile(path.join(root,'public/credits.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mythic Motors credits</title><style>body{max-width:800px;margin:40px auto;padding:20px;font-family:system-ui;line-height:1.6}pre{white-space:pre-wrap;overflow-wrap:anywhere}</style><h1>Credits and licenses</h1><p><a href="./">Back to the game</a></p><p>Original game by Jess Maddox with AI coding assistance. Procedural geometry and sound; no external model or audio files.</p><pre>${escape(notices)}</pre></html>`)
let html=await read('public/index.html'),css=await read('public/game.css')
for(const match of [...css.matchAll(/url\('\.\/fonts\/([^']+)'\)/g)]){
  const font=await readFile(path.join(root,'public/fonts',match[1]))
  css=css.replace(match[0],`url('data:font/woff2;base64,${font.toString('base64')}')`)
}
html=html.replace('<link rel="stylesheet" href="./game.css">',`<style>${css}</style>`)
for(const name of ['vendor/three-r128.min.js','game.js']){
  const script=(await read('public/'+name)).replaceAll('</script','<\\/script')
  html=html.replace(`<script src="./${name}"></script>`,`<script>${script}</script>`)
}
html=html.replace('<a class="back-link" href="./credits.html">Credits and licenses</a>','<button class="back-link credits-button" onclick="document.getElementById(\'offlineCredits\').showModal()">Credits and licenses</button>')
html=html.replace('</body>',`<dialog id="offlineCredits" style="margin:auto;max-width:800px;max-height:85vh;padding:24px"><button onclick="document.getElementById('offlineCredits').close()">Close credits</button><h2>Credits and licenses</h2><pre style="white-space:pre-wrap;overflow-wrap:anywhere">${escape(notices)}</pre></dialog>\n</body>`)
await mkdir(path.join(root,'artifacts'),{recursive:true})
await writeFile(path.join(root,'artifacts/Mythic-Motors.html'),html)
console.log('Built the complete single-file game, fonts and license notices.')
