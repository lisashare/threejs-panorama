import * as THREE from 'three'

var scene = new THREE.Scene()
// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(400, 200, 300)
scene.add(directionalLight)
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight2.position.set(-400, -200, -300)
scene.add(directionalLight2)
// 环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)
// 相机设置
var width = window.innerWidth
var height = window.innerHeight
var k = width / height // 窗口宽高比
var s = 150 // 三维场景显示范围控制系数，系数越大，显示的范围越大
// 创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
camera.position.set(400, 500, 300) // 设置相机位置
camera.lookAt(scene.position) // 设置相机方向（指向的场景对象）
// 创建渲染器对象
var renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
})
renderer.setSize(width, height) // 设置渲染区域尺寸
// renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
document.body.appendChild(renderer.domElement) // body元素中插入canvas对象

// 添加坐标轴辅助器
// var axesHelper = new THREE.AxesHelper(300)
// scene.add(axesHelper)

window.addEventListener('dblclick', () => {
  // 双击控制屏幕进入全屏，退出全屏
  const fullScreenElement = document.fullscreenElement
  if (!fullScreenElement) {
    // 让画布对象全屏
    renderer.domElement.requestFullscreen()
  } else {
    // 退出全屏，使用document对象
    document.exitFullscreen()
  }
    
})


// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})

export {
  scene, camera, renderer, width, height
}
