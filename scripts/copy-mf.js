const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'apps/shell-next/public/mf');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const angularDistBrowser = path.join(process.cwd(), 'apps/mf-angular-about/dist/browser');
const angularDist = fs.existsSync(angularDistBrowser) ? angularDistBrowser : path.join(process.cwd(), 'apps/mf-angular-about/dist');
const svelteDist = path.join(process.cwd(), 'apps/mf-svelte-about/dist');
const vueDist = path.join(process.cwd(), 'apps/mf-vue-about/dist');

if (fs.existsSync(svelteDist)) {
  const svelteFiles = fs.readdirSync(svelteDist);
  svelteFiles.forEach((file) => {
    if (file.endsWith('.js')) {
      const sourcePath = path.join(svelteDist, file);
      const targetPath = path.join(targetDir, 'mf-svelte-about.js');
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied mf-svelte-about.js`);
    }
  });
}

if (fs.existsSync(vueDist)) {
  const vueFiles = fs.readdirSync(vueDist);
  vueFiles.forEach((file) => {
    if (file.endsWith('.js')) {
      const sourcePath = path.join(vueDist, file);
      const targetPath = path.join(targetDir, 'mf-vue-about.js');
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied mf-vue-about.js`);
    }
  });
}

if (fs.existsSync(angularDist)) {
  const angularTargetDir = path.join(targetDir, 'angular');
  if (!fs.existsSync(angularTargetDir)) {
    fs.mkdirSync(angularTargetDir, { recursive: true });
  }

  const angularFiles = fs.readdirSync(angularDist);
  const jsFiles = angularFiles.filter(f => f.endsWith('.js'));
  
  if (jsFiles.length > 0) {
    const order = ['runtime', 'polyfills', 'main'];
    const ordered = [];
    const rest = [];
    
    jsFiles.forEach((file) => {
      const lowerFile = file.toLowerCase();
      const found = order.find(o => lowerFile.includes(o));
      if (found) {
        ordered.push(file);
      } else {
        rest.push(file);
      }
    });
    
    ordered.sort((a, b) => {
      const aIdx = order.findIndex(o => a.toLowerCase().includes(o));
      const bIdx = order.findIndex(o => b.toLowerCase().includes(o));
      return aIdx - bIdx;
    });
    
    const finalOrder = [...ordered, ...rest.sort()];
    
    finalOrder.forEach((file) => {
      const sourcePath = path.join(angularDist, file);
      const targetPath = path.join(angularTargetDir, file);
      fs.copyFileSync(sourcePath, targetPath);
    });
    
    const manifest = {
      files: finalOrder,
    };
    fs.writeFileSync(
      path.join(angularTargetDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log(`Copied ${jsFiles.length} Angular files to angular/`);
  }
}
