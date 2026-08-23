import { useEffect, useRef } from 'react'

/* Ambient WebGL noise background — ported from the original per-page inline
   <canvas>+<script> (Google Stitch "STITCH_SHADER" block). Sits fixed behind
   the whole page (-z-10) so it shows through every section that doesn't have
   its own opaque background. */
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function syncSize() {
      const w = canvas!.clientWidth || 1280
      const h = canvas!.clientHeight || 720
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w
        canvas!.height = h
      }
    }
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)
    syncSize()

    const gl: WebGLRenderingContext | null =
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)
    if (!gl) return

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`
    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  vec3 m0 = 1.0 - 1.5*(a0*a0 + h*h);
  vec3 g = a0 * vec3(x0.x, x12.x, x12.z) + h * vec3(x0.y, x12.y, x12.w);
  return 130.0 * dot(m, g);
}
void main() {
    vec2 uv = v_texCoord;
    float n1 = snoise(uv * 3.0 + u_time * 0.1);
    float n2 = snoise(uv * 6.0 - u_time * 0.15);
    float noise = (n1 + n2 * 0.5) * 0.5 + 0.5;
    vec3 colorLow = vec3(0.98, 0.976, 0.976);
    vec3 colorHigh = vec3(0.86, 0.855, 0.85);
    vec3 sakuraTint = vec3(1.0, 0.92, 0.93);
    vec3 finalColor = mix(colorLow, colorHigh, noise);
    finalColor = mix(finalColor, sakuraTint, noise * 0.15);
    float vignette = 1.0 - length(uv - 0.5) * 0.5;
    finalColor *= vignette;
    gl_FragColor = vec4(finalColor, 1.0);
}
`

    function cs(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs))
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(prog)
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_resolution')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width
        const ny = 1.0 - (event.clientY - rect.top) / rect.height
        mouse.x = nx * canvas!.width
        mouse.y = ny * canvas!.height
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf = 0
    function render(t: number) {
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      if (uTime) gl!.uniform1f(uTime, t * 0.001)
      if (uRes) gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      if (uMouse) gl!.uniform2f(uMouse, mouse.x, mouse.y)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
