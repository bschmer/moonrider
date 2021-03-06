const COLORS = require('../constants/colors');

AFRAME.registerSystem('materials', {
  init: function () {
    // Collect references to textures for gpu-preloader.
    this.textureList = [];

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.createMaterials.bind(this));
    } else {
      this.createMaterials();
    }
  },

  createMaterials: function () {
    this.tunnel = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/tunnel.vert.glsl'),
      fragmentShader: require('./shaders/tunnel.frag.glsl'),
      uniforms: {
        fogColor: {value: new THREE.Color(COLORS.RED)},
        color1: {value: new THREE.Color(COLORS.RED)},
        color2: {value: new THREE.Color(COLORS.BLUE)},
        color3: {value: new THREE.Color(COLORS.YELLOW)},
        scale: {value: 1.0}
      },
      transparent: true
    });

    this.merkaba = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COLORS.RED)
    });

    this.backglow = new THREE.MeshBasicMaterial({
      transparent: true,
      map: new THREE.TextureLoader().load(document.getElementById('backGlowImg').src),
      color: new THREE.Color(COLORS.RED)
    });
    this.textureList.push(this.backglow.map);

    this.aurora = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/aurora.vert.glsl'),
      fragmentShader: require('./shaders/aurora.frag.glsl'),
      uniforms: {
        time: {value: 0}
      },
      transparent: true
    });

    this.rings = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/rings.vert.glsl'),
      fragmentShader: require('./shaders/rings.frag.glsl'),
      uniforms: {
        time: {value: 0}
      },
      transparent: true,
      depthWrite: false
    });

    this.moon = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/moon.vert.glsl'),
      fragmentShader: require('./shaders/moon.frag.glsl'),
      uniforms: {
        map: {value: new THREE.TextureLoader().load(document.getElementById('moonImg').src)},
        tint: {value: new THREE.Color(COLORS.BRIGHTBLUE)}
      },
      transparent: true
    });
    this.textureList.push(this.moon.uniforms.map.value);

    this.home = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/home.vert.glsl'),
      fragmentShader: require('./shaders/home.frag.glsl'),
      uniforms: {
        color1: {value: new THREE.Color(COLORS.RED)},
        color2: {value: new THREE.Color(COLORS.BLUE)},
        color3: {value: new THREE.Color(COLORS.YELLOW)},
        src: {value: new THREE.TextureLoader().load(document.getElementById('homeShadowImg').src)},
        time: {value: 0}
      },
      transparent: true
    });
    this.textureList.push(this.home.uniforms.src.value);

    const weaponTexture = new THREE.TextureLoader().load(
      document.getElementById('weaponImg').src);
    weaponTexture.wrapS = THREE.RepeatWrapping;
    weaponTexture.wrapT = THREE.RepeatWrapping;
    weaponTexture.repeat.set(2, 2);
    weaponTexture.magFilter =  THREE.NearestFilter;
    this.textureList.push(weaponTexture);

    this.rightWeapon = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/weapon.vert.glsl'),
      fragmentShader: require('./shaders/weapon.frag.glsl'),
      uniforms: {
        src: {value: weaponTexture},
        color: {value: new THREE.Color(COLORS.BLUE)},
        thickness: {value: 1.6},
        time: {value: 0}
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    this.leftWeapon = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/weapon.vert.glsl'),
      fragmentShader: require('./shaders/weapon.frag.glsl'),
      uniforms: {
        src: {value: weaponTexture},
        color: {value: new THREE.Color(COLORS.RED)},
        thickness: {value: 1.6},
        time: {value: 0}
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    this.leftFistWeapon = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/flat.vert.glsl'),
      fragmentShader: require('./shaders/fistWeapon.frag.glsl'),
      uniforms: {
        src: {value: weaponTexture},
        color: {value: new THREE.Color(COLORS.RED)},
        time: {value: 0}
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    this.rightFistWeapon = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/flat.vert.glsl'),
      fragmentShader: require('./shaders/fistWeapon.frag.glsl'),
      uniforms: {
        src: {value: weaponTexture},
        color: {value: new THREE.Color(COLORS.BLUE)},
        time: {value: 0}
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const weaponHandleEnvTexture = new THREE.TextureLoader().load(
      document.getElementById('weaponImg').src);
    const weaponHandleTexture = new THREE.TextureLoader().load(
      document.getElementById('weaponHandleImg').src);
    weaponHandleEnvTexture.mapping = THREE.SphericalReflectionMapping;
    this.textureList.push(weaponHandleEnvTexture);
    this.textureList.push(weaponHandleTexture);

    this.leftWeaponHandle = new THREE.MeshStandardMaterial({
      roughness: 0.4,
      metalness: 0.5,
      color: new THREE.Color(COLORS.RED),
      map: weaponHandleTexture,
      envMap: weaponHandleEnvTexture
    });
    this.rightWeaponHandle = new THREE.MeshStandardMaterial({
      roughness: 0.4,
      metalness: 0.5,
      color: new THREE.Color(COLORS.BLUE),
      map: weaponHandleTexture,
      envMap: weaponHandleEnvTexture
    });

    const fistTexture = new THREE.TextureLoader().load(document.getElementById('fistsImg').src);
    var fistEnvTexture = new THREE.TextureLoader().load(document.getElementById('weapon2Img').src);
    fistEnvTexture.mapping = THREE.SphericalReflectionMapping;

    this.leftFist = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.8,
      map: fistTexture,
      envMap: fistEnvTexture,
      transparent: true
    });
    this.rightFist = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.8,
      map: fistTexture,
      envMap: fistEnvTexture,
      transparent: true
    });

    const beatTexture = new THREE.TextureLoader().load(
      document.getElementById('beatsImg').src);
    beatTexture.generateMipmaps = false;
    beatTexture.magFilter = THREE.LinearFilter;
    beatTexture.minFilter = THREE.LinearFilter;
    this.textureList.push(beatTexture);

    this.beat = new THREE.MeshLambertMaterial({map: beatTexture, transparent: true});
    this.blueBeatPieces = new THREE.MeshLambertMaterial({
      map: beatTexture,
      color: COLORS.BLUE,
      emissive: COLORS.BLUE,
      emissiveIntensity: 0.2
    });
    this.redBeatPieces = new THREE.MeshLambertMaterial({
      map: beatTexture,
      color: COLORS.RED,
      emissive: COLORS.RED,
      emissiveIntensity: 0.2
    });
    this.minePieces = new THREE.MeshLambertMaterial({
      color: COLORS.YELLOW,
      emissive: COLORS.YELLOW,
      emissiveIntensity: 0.2
    });

    const glowTexture = new THREE.TextureLoader().load(
      document.getElementById('backGlowImg').src);
    this.redBeatGlow = new THREE.MeshBasicMaterial({
      color: COLORS.RED,
      map: glowTexture,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.blueBeatGlow = new THREE.MeshBasicMaterial({
      color: COLORS.BLUE,
      map: glowTexture,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.textureList.push(glowTexture);

    this.stars = new THREE.PointsMaterial({
      size: 1,
      map: new THREE.TextureLoader().load(document.getElementById('starImg').src),
      blending: THREE.AdditiveBlending,
      transparent: true,
      color: new THREE.Color(COLORS.BLUE)
    });
    this.textureList.push(this.stars.map);

    const sideglowTexture = new THREE.TextureLoader().load(
      document.getElementById('sideglowImg').src);
    this.textureList.push(sideglowTexture);
    this.leftsideglow = new THREE.MeshBasicMaterial({
      map: sideglowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      side: THREE.BackSide,
      color: new THREE.Color(COLORS.OFF)
    });
    this.rightsideglow = new THREE.MeshBasicMaterial({
      map: sideglowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      color: new THREE.Color(COLORS.OFF)
    });


    const plumeTexture = new THREE.TextureLoader().load(document.getElementById('plumeImg').src);
    plumeTexture.minFilter = THREE.LinearFilter;
    this.arrowBluePlume = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/plume.vert.glsl'),
      fragmentShader: require('./shaders/plume.frag.glsl'),
      uniforms : {
        color: {value: new THREE.Color(COLORS.BLUE)},
        src: {value: plumeTexture}
      },
      transparent: true,
      depthTest: false,
    });
    this.arrowRedPlume = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/plume.vert.glsl'),
      fragmentShader: require('./shaders/plume.frag.glsl'),
      uniforms : {
        color: {value: new THREE.Color(COLORS.RED)},
        src: {value: plumeTexture}
      },
      transparent: true,
      depthTest: false,
    });

    this.dotBluePlume = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/plume.vert.glsl'),
      fragmentShader: require('./shaders/plume.frag.glsl'),
      uniforms : {
        color: {value: new THREE.Color(COLORS.BLUE)},
        src: {value: plumeTexture}
      },
      transparent: true,
      depthTest: false,
    });

    this.dotRedPlume = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/plume.vert.glsl'),
      fragmentShader: require('./shaders/plume.frag.glsl'),
      uniforms : {
        color: {value: new THREE.Color(COLORS.RED)},
        src: {value: plumeTexture}
      },
      transparent: true,
      depthTest: false,
    });

    this.minePlume = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/plume.vert.glsl'),
      fragmentShader: require('./shaders/plume.frag.glsl'),
      uniforms: {
        color: {value: new THREE.Color(COLORS.YELLOW)},
        src: {value: plumeTexture}
      },
      transparent: true,
      depthTest: false,
    });

    const tubeTexture = new THREE.TextureLoader().load(document.getElementById('tubeImg').src);
    const tubeColorTexture = new THREE.TextureLoader().load(document.getElementById('tubeColorImg').src);
    tubeTexture.generateMipmaps = false;
    tubeTexture.minFilter = THREE.LinearFilter;
    tubeColorTexture.generateMipmaps = false;
    tubeColorTexture.minFilter = THREE.LinearFilter;
    this.tube = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/tube.vert.glsl'),
      fragmentShader: require('./shaders/tube.frag.glsl'),
      uniforms: {
        time: {value: 0},
        opacity: {value: 0},
        src: {value: tubeTexture},
        color: {value: tubeColorTexture}
      },
      transparent: true,
      depthTest: false,
      side: THREE.BackSide
    });

    const trailTexture = new THREE.TextureLoader().load(document.getElementById('handStarTrailImg').src);
    trailTexture.generateMipmaps = false;
    trailTexture.minFilter = THREE.LinearFilter;
    this.handStarTrail = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/handstartrail.vert.glsl'),
      fragmentShader: require('./shaders/handstartrail.frag.glsl'),
      uniforms: {
        pulse: {value: 0},
        src: {value: trailTexture}
      },
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  },

  tick: function (t, dt) {
    this.rings.uniforms.time.value = t;
    this.aurora.uniforms.time.value = t;
    this.leftWeapon.uniforms.time.value = t;
    this.rightWeapon.uniforms.time.value = t;
    this.leftFistWeapon.uniforms.time.value = t;
    this.rightFistWeapon.uniforms.time.value = t;
    this.tube.uniforms.time.value = t;
    if (this.home.animate) { this.home.uniforms.time.value = t; }
  }
});

AFRAME.registerComponent('materials', {
  schema: {
    name: {default: ''},
    recursive: {default: true},
    animate: {default: true}
  },

  update: function () {
    if (this.data.name === '') { return; }

    this.material = this.system[this.data.name];
    if (!this.material) {
      console.warn(`[materials] Unknown material: ${this.data.name}`);
      return;
    }

    let mesh = this.el.getObject3D('mesh');
    if (!mesh) {
      this.el.addEventListener('object3dset', evt => {
        if (evt.detail.type !== 'mesh') { return; }
        mesh = this.el.getObject3D('mesh');
        if (mesh) { this.applyMaterial(mesh); }
      });
    } else {
      this.applyMaterial(mesh);
    }

    this.material.animate = this.data.animate;
  },

  applyMaterial: function (obj) {
    if (obj.detail) { obj = obj.detail.model; }
    if (this.data.recursive) {
      obj.traverse(o => {
        if (o.type === 'Mesh') {
          o.material = this.material;
        }
      });
    } else {
      obj.material = this.material;
    }
  }
});
