import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { clone } from 'three/addons/utils/SkeletonUtils.js'
const human=location.search.includes('human')
const gltf=await new GLTFLoader().loadAsync(human?'/models/human.glb':'/models/anatomical-hand.glb')
const renderer=new THREE.WebGLRenderer({antialias:true})
renderer.setSize(innerWidth,innerHeight)
renderer.setScissorTest(true)
renderer.toneMapping=THREE.ACESFilmicToneMapping
document.body.append(renderer.domElement)
const times=human?[0,.6,1.2,1.8,2.6,3.49]:[8.5,9,9.5,10,10.5,11]
for(let i=0;i<6;i++){
 const scene=new THREE.Scene()
 scene.background=new THREE.Color('#173847')
 scene.add(new THREE.HemisphereLight(0xffffff,0x647080,2))
 const light=new THREE.DirectionalLight(0xfff3e8,2.3);light.position.set(-3,5,8);scene.add(light)
 const model=clone(gltf.scene)
 if(!human)model.traverse(o=>{if(o.isMesh){o.geometry.computeVertexNormals();o.material.normalScale?.set(0,0);o.material.roughness=.85;o.material.metalness=0}})
 const mixer=new THREE.AnimationMixer(model)
 const clip=gltf.animations.find(a=>human?a.name.includes('Death'):a.name==='RigAction')
 mixer.clipAction(clip).play()
 mixer.setTime(times[i])
 model.updateMatrixWorld(true)
 const bounds=new THREE.Box3().setFromObject(model,true)
 const center=bounds.getCenter(new THREE.Vector3()), size=bounds.getSize(new THREE.Vector3())
 const wrap=new THREE.Group();wrap.add(model)
 const scale=3.3/Math.max(size.x,size.y,size.z)
 wrap.scale.setScalar(scale);wrap.position.copy(center.multiplyScalar(-scale))
 scene.add(wrap)
 const camera=new THREE.PerspectiveCamera(40,(innerWidth/3)/(innerHeight/2),.01,100)
 camera.position.set(human?3:0,human?2:0,6);camera.lookAt(0,0,0)
 const x=(i%3)*innerWidth/3,y=(1-Math.floor(i/3))*innerHeight/2
 renderer.setViewport(x,y,innerWidth/3,innerHeight/2);renderer.setScissor(x,y,innerWidth/3,innerHeight/2)
 renderer.render(scene,camera)
 const label=document.createElement('div');label.textContent=clip.name+' @ '+times[i];document.querySelector('.labels').append(label)
}
