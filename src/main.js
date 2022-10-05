const PREFIX_A = '/api/';
const PREFIX_B = 'egg-born-module-';
const PREFIX_C = './egg-born-module-';
const PREFIX_D = './';

export default {
  // aa-hello aa/hello
  //   first check / then -
  parseInfo(moduleName, type = 'module') {
    if (!moduleName) return null;
    if (moduleName.indexOf('://') > -1) return null;
    if (moduleName.charAt(0) === '/') moduleName = moduleName.substr(1);
    let parts = moduleName.split('/').filter(item => item);
    if (parts.length < 2) {
      parts = moduleName.split('-').filter(item => item);
      if (parts.length < 2) return null;
      if (parts.length >= 5) parts = parts.slice(3);
    }
    if (type === 'suite') {
      return {
        pid: parts[0],
        name: parts[1],
        fullName: `egg-born-suite-${parts[0]}-${parts[1]}`,
        relativeName: `${parts[0]}-${parts[1]}`,
      };
    }
    return {
      pid: parts[0],
      name: parts[1],
      fullName: `egg-born-module-${parts[0]}-${parts[1]}`,
      relativeName: `${parts[0]}-${parts[1]}`,
      url: `${parts[0]}/${parts[1]}`,
      sync: parts[2] === 'sync',
      monkey: parts[2] === 'monkey',
    };
  },
  // /api/aa/hello/home/index
  // egg-born-module-aa-hello
  // ./aa-hello/
  // ./egg-born-module-aa-hello/
  parseName(moduleUrl) {
    if (!moduleUrl) return null;
    if (moduleUrl.indexOf('/api/static/') === 0) {
      moduleUrl = '/api/' + moduleUrl.substring('/api/static/'.length);
    }
    if (moduleUrl.indexOf(PREFIX_A) === 0) {
      const posA = PREFIX_A.length;
      const posB = moduleUrl.indexOf('/', posA) + 1;
      if (posB === -1) return null;
      const posC = moduleUrl.indexOf('/', posB);
      if (posC === -1) return null;
      return moduleUrl.substring(posA, posC);
    } else if (moduleUrl.indexOf(PREFIX_B) === 0) {
      return this._parseName(moduleUrl, PREFIX_B);
    } else if (moduleUrl.indexOf(PREFIX_C) === 0) {
      return this._parseName(moduleUrl, PREFIX_C);
    } else if (moduleUrl.indexOf(PREFIX_D) === 0) {
      return this._parseName(moduleUrl, PREFIX_D);
    }
    return null;
  },
  _parseName(moduleUrl, prefix) {
    const posA = prefix.length;
    let posB = moduleUrl.indexOf('/', posA);
    if (posB === -1) posB = moduleUrl.length;
    return moduleUrl.substring(posA, posB);
  },
};
