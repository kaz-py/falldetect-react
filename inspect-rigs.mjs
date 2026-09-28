import fs from 'node:fs'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
globalThis.ProgressEvent = class { constructor(type, props) { Object.assign(this, { type }, props) } }
export async function readRig(path) {
 const b=fs.readFileSync(path); const len=b.readUInt32LE(12); const j=JSON.parse(b.subarray(20,20+len)); const bin=b.subarray(28+len)
 j.buffers[0].uri='data:application/octet-stream;base64,'+bin.toString('base64')
 j.materials=(j.materials||[]).map(()=>({pbrMetallicRoughness:{baseColorFactor:[.7,.5,.4,1],metallicFactor:0,roughnessFactor:.8}}))
 delete j.images; delete j.textures
 return new GLTFLoader().parseAsync(JSON.stringify(j),'')
}
for (const path of ['public/models/human.glb','public/models/anatomical-hand.glb']) {
 const g=await readRig(path); g.scene.updateMatrixWorld(true)
 console.log(path, 'animations',g.animations.map(a=>({name:a.name,duration:a.duration,tracks:a.tracks.length})))
 if(path.includes('human')){
  const m=new THREE.AnimationMixer(g.scene);const a=m.clipAction(g.animations.find(a=>a.name.includes('Death')));a.setLoop(THREE.LoopOnce,1);a.clampWhenFinished=true;a.play()
  for(const t of [0,.5,1,1.5,2,2.5,3,3.49]){m.setTime(t);g.scene.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(g.scene,true);console.log('BOUNDS',t,b.min.toArray(),b.max.toArray())}
 }
 if(path.includes('hand')) g.scene.traverse(o=>{
  if(o.isBone) {
   const q=o.getWorldQuaternion(new THREE.Quaternion())
   console.log(o.name, 'p',o.getWorldPosition(new THREE.Vector3()).toArray().map(n=>+n.toFixed(2)), 'X',new THREE.Vector3(1,0,0).applyQuaternion(q).toArray().map(n=>+n.toFixed(2)))
  }
 })
 if(path.includes('hand')){
  const m=new THREE.AnimationMixer(g.scene);m.clipAction(g.animations.find(a=>a.name==='RigAction')).play();m.setTime(10);g.scene.updateMatrixWorld(true)
  for(const name of ['thumb_trapez','thumb_meta','thumb_prox','thumb_dist','index_prox','index_dist']){const o=g.scene.getObjectByName(name);console.log('CLOSED',name,o.getWorldPosition(new THREE.Vector3()).toArray().map(n=>+n.toFixed(2)))}
 }
}
