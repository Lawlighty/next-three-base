import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle, siteIco } from "../components/layout/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/Date/date";
import { GetStaticProps } from "next";
import LoadingPage from "../components/loadingFrame/indexPage";
import { useState, useEffect } from "react";
import * as THREE from "three";
import Orbitcontrols from "three-orbitcontrols";
import { Spin } from "antd";

export default function Home() {
  let scene, camera, renderer;
  let GLTFLoader;
  let smart_cheshen;
  let poiPosArray = [
    { x: -1.47, y: 0.87, z: -0.36, frame: 1 },
    { x: -1.46, y: 0.49, z: -0.69, frame: 2 },
    { x: 1.5, y: 0.7, z: 0, frame: 8 },
    { x: 0.33, y: 1.79, z: 0, frame: 3 },

    { x: 0.73, y: 1.38, z: -0.8, frame: 5 },
    { x: -0.1, y: 1.17, z: 0.88, frame: 6 },
    { x: -1.16, y: 0.16, z: 0.89, frame: 7 },
  ];
  let poiObjects = [];

  useEffect(() => {
    init();
  }, []);
  const [allTexture, setAllTexture] = useState({});
  const [isStart, setIsStart] = useState(false);
  const [progress, setProgress] = useState({});
  const init = () => {
    GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader").GLTFLoader;
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      90,
      document.body.clientWidth / document.body.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(document.body.clientWidth, document.body.clientHeight);
    document.getElementById("theatre").appendChild(renderer.domElement);

    // 控制器
    let controls = new Orbitcontrols(camera, renderer.domElement);

    loadAllTexture(loadCarModel);
    // 光源
    addLight();

    // 渲染
    loop();
  };

  const loadAllTexture = (cb) => {
    let loadIndex = 0;
    let textures = [
      "skymap2",
      "skymap",
      "shache_occ",
      "shache_nor",
      "shache_col",
      "neishi_occ",
      "neishi_nor",
      "mennei_col",
      "luntai_nor",
      "luntai_col",
      "lungu_occ",
      "lungu_nor",
      "lungu_col",
      "linjian_occ",
      "linjian_nor",
      "linjian_col",
      "floor",
      "deng_occ",
      "deng_nor",
      "deng_col",
      "cheshen_occ",
      "cheshen_nor",
      "chejia_occ",
      "chejia_nor",
      "chedengzhao_nor",
    ];
    function loadNextTexture() {
      let textureName = textures[loadIndex];
      setIsStart(true);
      loadTexture(
        "images/textures/" + textureName + ".jpg",
        function (texture) {
          let nowAllTexture = allTexture;
          allTexture[textureName] = {
            texture: texture,
          };
          setAllTexture({ ...nowAllTexture });
          if (loadIndex < textures.length - 1) {
            loadIndex++;
            loadNextTexture();
          } else {
            if (cb) {
              cb();
            }
          }
        }
      );
    }
    loadNextTexture();
  };
  const loadTexture = (filepath, cb) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(filepath, cb);
  };
  const loadCarModel = () => {
    const loader = new GLTFLoader();

    loader.load(
      "images/model.gltf",
      function (gltf) {
        console.log("gltf.scene", gltf.scene);
        console.log("gltf.scene.children", gltf.scene.children);
        scene.add(gltf.scene);

        console.log(gltf.scene.children);

        // 添加 视频点
        // setupInfoPoint();
        for (let i = 0; i < gltf.scene.children[0].children.length; i++) {
          let child = gltf.scene.children[0].children[i];

          if (
            child.name == "smart_lungu0" ||
            child.name == "smart_lungu1" ||
            child.name == "smart_lungu2" ||
            child.name == "smart_lungu3"
          ) {
            child.material = new THREE.MeshStandardMaterial();
            child.material.map = allTexture["lungu_col"].texture;
            child.material.normalMap = allTexture["lungu_nor"].texture;
            child.material.aoMap = allTexture["lungu_occ"].texture;
          } else if (
            child.name == "smart_chelun0" ||
            child.name == "smart_chelun1" ||
            child.name == "smart_chelun2" ||
            child.name == "smart_chelun3"
          ) {
            child.material = new THREE.MeshStandardMaterial();
            child.material.map = allTexture["luntai_col"].texture;
            child.material.normalMap = allTexture["luntai_nor"].texture;
          } else if (child.name == "smart_cheshen") {
            smart_cheshen = child;
            child.material = new THREE.MeshStandardMaterial();

            child.material.color = new THREE.Color(0x70631b);
            child.material.metalness = 0.44;
            child.material.roughness = 0;

            child.material.normalMap = allTexture["cheshen_nor"].texture;
            child.material.aoMap = allTexture["cheshen_occ"].texture;

            child.material.envMap = allTexture["skymap2"].texture;
            child.material.envMap.mapping =
              THREE.EquirectangularReflectionMapping;
            child.material.envMapIntensity = 1;
          } else if (child.name == "smart_chejia") {
            child.material = new THREE.MeshStandardMaterial();
            child.material.color = new THREE.Color(0x252929);
            child.material.metalness = 0.44;
            child.material.roughness = 0.4;
            child.material.normalMap = allTexture["chejia_nor"].texture;
            child.material.aoMap = allTexture["chejia_occ"].texture;
          } else if (child.name == "smart_boli") {
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0x333333);
            child.material.transparent = true;
            child.material.opacity = 0.2;

            child.material.envMap = allTexture["skymap2"].texture;
            child.material.envMap.mapping =
              THREE.EquirectangularReflectionMapping;
            child.material.envMapIntensity = 1;
          } else if (child.name == "smart_tianchuang") {
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0x000000);
            child.material.transparent = true;
            child.material.opacity = 0.5;

            child.material.envMap = allTexture["skymap2"].texture;
            child.material.envMap.mapping =
              THREE.EquirectangularReflectionMapping;
            child.material.envMapIntensity = 1;
          } else if (child.name == "smart_shachepan") {
            child.material = new THREE.MeshStandardMaterial();
            child.material.color = new THREE.Color(0xf2f2f2);
            child.material.emissive = new THREE.Color(0x000000);
            child.material.metalness = 0.5;
            child.material.roughness = 0.62;
            child.material.map = allTexture["shache_col"].texture;
            child.material.normalMap = allTexture["shache_nor"].texture;
            child.material.aoMap = allTexture["shache_occ"].texture;
          } else if (
            child.name == "smart_neishi" ||
            child.name == "smart_neishi2"
          ) {
            //
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0x333333);
            child.material.emissive = new THREE.Color(0x000000);
            child.material.normalMap = allTexture["neishi_nor"].texture;
            child.material.aoMap = allTexture["neishi_occ"].texture;
          } else if (child.name == "smart_neibao") {
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0x2e2e2e);
            child.material.map = allTexture["mennei_col"].texture;
          } else if (child.name == "smart_linjian") {
            child.material = new THREE.MeshStandardMaterial();
            child.material.color = new THREE.Color(0x2e2e2e);
            child.material.metalness = 0.5;
            child.material.roughness = 0.62;
            child.material.map = allTexture["linjian_col"].texture;
            child.material.normalMap = allTexture["linjian_nor"].texture;
            child.material.aoMap = allTexture["linjian_occ"].texture;
          } else if (child.name == "smart_daochejing") {
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0xffffff);
          } else if (child.name == "smart_bolinei") {
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0x333333);
          } else if (
            child.name == "smart_chedeng" ||
            child.name == "smart_shachedeng" ||
            child.name == "smart_wudeng"
          ) {
            child.material = new THREE.MeshStandardMaterial();
            child.material.color = new THREE.Color(0xffffff);
            child.material.emissive = new THREE.Color(0x333333);
            child.material.metalness = 1.0;
            child.material.roughness = 0.4;

            child.material.normalMap = allTexture["deng_nor"].texture;
          } else if (child.name == "smart_chedengzhao") {
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0xffffff);
            child.material.emissive = new THREE.Color(0x000000);
            child.material.transparent = true;
            child.material.opacity = 0.3;

            child.material.normalMap = allTexture["chedengzhao_nor"].texture;

            child.material.envMap = allTexture["skymap2"].texture;
            child.material.envMap.mapping =
              THREE.EquirectangularReflectionMapping;
            child.material.envMapIntensity = 1;
          } else if (child.name == "smart_shachedengzhao") {
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0xca0816);
            child.material.transparent = true;
            child.material.opacity = 0.4;

            child.material.normalMap = allTexture["chedengzhao_nor"].texture;
          } else if (child.name == "smart_shangeshang") {
            child.material = new THREE.MeshStandardMaterial();
            child.material.color = new THREE.Color(0xf0f0f);
            child.material.emissive = new THREE.Color(0x000000);
            child.material.metalness = 1;
            child.material.roughness = 0;
          } else if (child.name == "smart_shangexia") {
            child.material = new THREE.MeshPhongMaterial();
            child.material.color = new THREE.Color(0);
            child.material.metalness = 1;
            child.material.roughness = 0;
          } else if (
            child.name == "smart_LOGO" ||
            child.name == "smart_paiqiguan"
          ) {
            child.material = new THREE.MeshStandardMaterial();
            child.material.color = new THREE.Color(0x6c6c6c);
            child.material.emissive = new THREE.Color(0x444444);
            child.material.metalness = 1;
            child.material.roughness = 0.32;
          }
        }
      },
      ({ loaded, total }) => {
        if (loaded / total == 1) {
          setIsStart(false);
        }
      },
      // function (xhr) {
      //   console.log("xhr " + xhr + "% loaded");
      //   console.log("xhr.loaded " + xhr.loaded + "% loaded");
      //   console.log("xhr.total " + xhr.total + "% loaded");
      //   console.log("xhr key", Object.keys(xhr));
      //   setIsStart(false);
      // },
      function (error) {
        console.log("An error happened");
      }
    );
  };
  const setupInfoPoint = () => {
    const pointTexture = new THREE.TextureLoader().load("images/point.png");

    let group = new THREE.Group();
    let materialC = new THREE.SpriteMaterial({
      map: pointTexture,
      color: 0xffffff,
      fog: false,
    });
    for (let a = 0; a < poiPosArray.length; a++) {
      let x = poiPosArray[a].x;
      let y = poiPosArray[a].y - 0.5;
      let z = poiPosArray[a].z;

      let sprite = new THREE.Sprite(materialC);
      sprite.scale.set(0.15, 0.15, 1);
      sprite.position.set(x, y, z);
      sprite.idstr = "popup_" + poiPosArray[a].frame;
      group.add(sprite);

      poiObjects.push(sprite);
    }
    scene.add(group);

    document.body.addEventListener("click", function (event) {
      event.preventDefault();

      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      console.log("mouse", mouse);
      raycaster.setFromCamera(mouse, camera);
      console.log("raycaster", raycaster);
      let intersects = raycaster.intersectObjects(poiObjects);
      console.log("intersects", intersects);
      if (intersects.length > 0) {
        let popIndex = parseInt(intersects[0].object.idstr.substr(6, 1));
        console.log("popIndex", popIndex);
      }
    });
  };
  function changeCheshen(cIndex) {
    let colors = [0xffff00, 0xff0000, 0xffffff];

    smart_cheshen.material.color = new THREE.Color(colors[cIndex]);
  }

  function addLight() {
    let ambientLight = new THREE.AmbientLight(0xd5d5d5);
    ambientLight.intensity = 1.2;
    scene.add(ambientLight);

    let bottomRightDirLight = new THREE.DirectionalLight();
    bottomRightDirLight.position.x = 5;
    bottomRightDirLight.position.y = 3;
    bottomRightDirLight.position.z = -5;
    bottomRightDirLight.intensity = 0.8;

    // let helper=new THREE.DirectionalLightHelper(bottomRightDirLight,1);
    // scene.add( helper );
    scene.add(bottomRightDirLight);

    let frontDirLight = new THREE.DirectionalLight(0xffffff);

    frontDirLight.position.x = -5;
    frontDirLight.position.y = 3;
    frontDirLight.position.z = 5;
    frontDirLight.intensity = 0.8;
    //directionalLight.castShadow=true;

    // let helper=new THREE.DirectionalLightHelper(frontDirLight,1);
    // scene.add( helper );
    scene.add(frontDirLight);
    // 车子正前上方斜45度的灯结束
  }

  function loop() {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
  }
  return (
    <div>
      <div>
        <Layout home>{}</Layout>
        <div className="container">
          {/* <Head>
            <title>{siteTitle}</title>
            <link rel="icon" href={siteIco} />
          </Head> */}

          <main>
            <Spin tip="超哥哥加载中..." spinning={isStart}>
              {/* 这是是汽车展示 */}
              <div id="theatre"></div>
            </Spin>
          </main>

          <footer>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="logo_desc">
                狗狗币<strong className="logo_desc_info">1</strong>U{" "}
              </div>

              <img
                src="/images/website/doge.png"
                alt="Vercel Logo"
                className="logo"
              />
            </a>
          </footer>

          <style jsx>{`
            .container {
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              // padding: 1rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer img {
              margin-left: 0.5rem;
            }

            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            .title a {
              color: #0070f3;
              text-decoration: none;
            }

            .title a:hover,
            .title a:focus,
            .title a:active {
              text-decoration: underline;
            }

            .title {
              margin: 0;
              line-height: 1.15;
              font-size: 4rem;
            }

            .title,
            .description {
              text-align: center;
            }

            .description {
              line-height: 1.5;
              font-size: 1.5rem;
            }

            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            }

            .grid {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              max-width: 800px;
              margin-top: 1rem;
            }

            .card {
              margin: 1rem;
              flex-basis: 45%;
              padding: 1.5rem;
              text-align: left;
              color: inherit;
              text-decoration: none;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              transition: color 0.15s ease, border-color 0.15s ease;
            }

            .card:hover,
            .card:focus,
            .card:active {
              color: #0070f3;
              border-color: #0070f3;
            }

            .card h3 {
              margin: 0 0 1rem 0;
              font-size: 1.5rem;
            }

            .card p {
              margin: 0;
              font-size: 1.25rem;
              line-height: 1.5;
            }

            .logo_desc {
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              letter-spacing: 0.2rem;
              animation-name: hd;
              animation-duration: 3s;
              animation-iteration-count: infinite;
            }

            @keyframes hd {
              0% {
                color: #1abc9c;
                opacity: 0.2;
              }
              15% {
                color: #16a085;
                opacity: 0.3;
              }
              30% {
                color: #f1c40f;
                opacity: 0.4;
              }
              45% {
                color: #f39c12;
                opacity: 0.5;
              }
              60% {
                color: #e67e22;
                opacity: 0.6;
              }
              75% {
                color: #e74c3c;
                opacity: 0.7;
              }
              90% {
                color: #c0392b;
                opacity: 0.8;
              }
              100% {
                color: #c0392b;
                opacity: 1;
              }
            }
            .logo_desc_info {
              font-size: 2rem;
              position: relative;
              top: -0.1rem;
            }

            .logo {
              height: 1.5em;
            }

            @media (max-width: 600px) {
              .grid {
                width: 100%;
                flex-direction: column;
              }
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
