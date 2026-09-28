import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { createHandsModel, createAnalysisModel } from './src/components/three/models.js'
const human=location.search.includes('human')
const gltf=await new GLTFLoader().loadAsync(human?'/models/human.glb':'/models/anatomical-hand.glb')
const renderer=new THREE.WebGLRenderer({antialias:true})
renderer.setSize(innerWidth,innerHeight);renderer.setScissorTest(true)
renderer.toneMapping=THREE.ACESFilmicToneMapping
document.body.append(renderer.domElement)
const times=human?[0,.8,1.6,2.2,3.2,5]:[0,1,2,0,1,2]
for(let i=0;i<6;i++){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#173847')
 scene.add(new THREE.HemisphereLight(0xffffff,0x647080,2))
 const light=new THREE.DirectionalLight(0xfff3e8,2.3);light.position.set(-3,5,8);scene.add(light)
 const model=(human?createAnalysisModel:createHandsModel)()
 model.attachGltf({scene:clone(gltf.scene),animations:gltf.animations})
 scene.add(model.root)
 model.update(0,0)
 if(human)model.update(times[i])
 else for(let f=0;f<100;f++)model.update(f/60,times[i])
 const camera=new THREE.PerspectiveCamera(42,(innerWidth/3)/(innerHeight/2),.1,100)
 camera.position.set(human?2.8:0,human?2.3:.2,6.4);camera.lookAt(0,human?-.25:-.1,human?-.45:0)
 const x=(i%3)*innerWidth/3,y=(1-Math.floor(i/3))*innerHeight/2
 renderer.setViewport(x,y,innerWidth/3,innerHeight/2);renderer.setScissor(x,y,innerWidth/3,innerHeight/2)
 renderer.render(scene,camera)
 const label=document.createElement('div');label.textContent=(human?'Fall time ':'Hand phase ')+times[i];document.querySelector('.labels').append(label)
}
