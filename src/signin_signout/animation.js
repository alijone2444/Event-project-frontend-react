import { Vector3 } from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { SpotLight, useDepthBuffer } from '@react-three/drei'


export default function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-2, 2, 6], fov: 50, near: 1, far: 20 }}
     style={{ position:"fixed", top: 0, left: 0, width: '100%', height: '100%' }}>
      <color attach="background" args={['#202020']} />
      <fog attach="fog" args={['#202020', 5, 20]} />
      <ambientLight intensity={0.015} />
      <Scene />
    </Canvas>
  )
}

function Scene() {
  // This is a super cheap depth buffer that only renders once (frames: 1 is optional!), which works well for static scenes
  // Spots can optionally use that for realism, learn about soft particles here: http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
  const depthBuffer = useDepthBuffer({ frames: 1 })
  return (
    <>
      <MovingSpot depthBuffer={depthBuffer} color="white" position={[1, 3, 0]} />
      <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[5, 3, 3]} />
      <MovingSpot depthBuffer={depthBuffer} color="white" position={[-1, 3, 0]} />
      <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[-5,3, 1]} />
      <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>
    </>
  )
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useEffect(() => {
    function handleMouseMove(e) {
      light.current.target.position.lerp(vec.set((e.clientX * 2 / window.innerWidth - 1) * viewport.width / 2, -(e.clientY * 2 / window.innerHeight - 1) * viewport.height / 2, 0), 0.1)
      light.current.target.updateMatrixWorld()
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [light, viewport, vec])
  return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}