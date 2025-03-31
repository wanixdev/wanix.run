var __defProp = Object.defineProperty;
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
};

// node_modules/cbor-x/decode.js
var decoder;
try {
  decoder = new TextDecoder();
} catch (error) {
}
var src;
var srcEnd;
var position = 0;
var EMPTY_ARRAY = [];
var LEGACY_RECORD_INLINE_ID = 105;
var RECORD_DEFINITIONS_ID = 57342;
var RECORD_INLINE_ID = 57343;
var BUNDLED_STRINGS_ID = 57337;
var PACKED_REFERENCE_TAG_ID = 6;
var STOP_CODE = {};
var maxArraySize = 11281e4;
var maxMapSize = 1681e4;
var strings = EMPTY_ARRAY;
var stringPosition = 0;
var currentDecoder = {};
var currentStructures;
var srcString;
var srcStringStart = 0;
var srcStringEnd = 0;
var bundledStrings;
var referenceMap;
var currentExtensions = [];
var currentExtensionRanges = [];
var packedValues;
var dataView;
var restoreMapsAsObject;
var defaultOptions = {
  useRecords: false,
  mapsAsObjects: true
};
var sequentialMode = false;
var inlineObjectReadThreshold = 2;
try {
  new Function("");
} catch (error) {
  inlineObjectReadThreshold = Infinity;
}
var Decoder = class _Decoder {
  constructor(options) {
    if (options) {
      if ((options.keyMap || options._keyMap) && !options.useRecords) {
        options.useRecords = false;
        options.mapsAsObjects = true;
      }
      if (options.useRecords === false && options.mapsAsObjects === void 0)
        options.mapsAsObjects = true;
      if (options.getStructures)
        options.getShared = options.getStructures;
      if (options.getShared && !options.structures)
        (options.structures = []).uninitialized = true;
      if (options.keyMap) {
        this.mapKey = /* @__PURE__ */ new Map();
        for (let [k, v2] of Object.entries(options.keyMap)) this.mapKey.set(v2, k);
      }
    }
    Object.assign(this, options);
  }
  /*
  decodeKey(key) {
  	return this.keyMap
  		? Object.keys(this.keyMap)[Object.values(this.keyMap).indexOf(key)] || key
  		: key
  }
  */
  decodeKey(key) {
    return this.keyMap ? this.mapKey.get(key) || key : key;
  }
  encodeKey(key) {
    return this.keyMap && this.keyMap.hasOwnProperty(key) ? this.keyMap[key] : key;
  }
  encodeKeys(rec) {
    if (!this._keyMap) return rec;
    let map = /* @__PURE__ */ new Map();
    for (let [k, v2] of Object.entries(rec)) map.set(this._keyMap.hasOwnProperty(k) ? this._keyMap[k] : k, v2);
    return map;
  }
  decodeKeys(map) {
    if (!this._keyMap || map.constructor.name != "Map") return map;
    if (!this._mapKey) {
      this._mapKey = /* @__PURE__ */ new Map();
      for (let [k, v2] of Object.entries(this._keyMap)) this._mapKey.set(v2, k);
    }
    let res = {};
    map.forEach((v2, k) => res[safeKey(this._mapKey.has(k) ? this._mapKey.get(k) : k)] = v2);
    return res;
  }
  mapDecode(source, end) {
    let res = this.decode(source);
    if (this._keyMap) {
      switch (res.constructor.name) {
        case "Array":
          return res.map((r) => this.decodeKeys(r));
      }
    }
    return res;
  }
  decode(source, end) {
    if (src) {
      return saveState(() => {
        clearSource();
        return this ? this.decode(source, end) : _Decoder.prototype.decode.call(defaultOptions, source, end);
      });
    }
    srcEnd = end > -1 ? end : source.length;
    position = 0;
    stringPosition = 0;
    srcStringEnd = 0;
    srcString = null;
    strings = EMPTY_ARRAY;
    bundledStrings = null;
    src = source;
    try {
      dataView = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength));
    } catch (error) {
      src = null;
      if (source instanceof Uint8Array)
        throw error;
      throw new Error("Source must be a Uint8Array or Buffer but was a " + (source && typeof source == "object" ? source.constructor.name : typeof source));
    }
    if (this instanceof _Decoder) {
      currentDecoder = this;
      packedValues = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues);
      if (this.structures) {
        currentStructures = this.structures;
        return checkedRead();
      } else if (!currentStructures || currentStructures.length > 0) {
        currentStructures = [];
      }
    } else {
      currentDecoder = defaultOptions;
      if (!currentStructures || currentStructures.length > 0)
        currentStructures = [];
      packedValues = null;
    }
    return checkedRead();
  }
  decodeMultiple(source, forEach) {
    let values, lastPosition = 0;
    try {
      let size = source.length;
      sequentialMode = true;
      let value = this ? this.decode(source, size) : defaultDecoder.decode(source, size);
      if (forEach) {
        if (forEach(value) === false) {
          return;
        }
        while (position < size) {
          lastPosition = position;
          if (forEach(checkedRead()) === false) {
            return;
          }
        }
      } else {
        values = [value];
        while (position < size) {
          lastPosition = position;
          values.push(checkedRead());
        }
        return values;
      }
    } catch (error) {
      error.lastPosition = lastPosition;
      error.values = values;
      throw error;
    } finally {
      sequentialMode = false;
      clearSource();
    }
  }
};
function checkedRead() {
  try {
    let result = read();
    if (bundledStrings) {
      if (position >= bundledStrings.postBundlePosition) {
        let error = new Error("Unexpected bundle position");
        error.incomplete = true;
        throw error;
      }
      position = bundledStrings.postBundlePosition;
      bundledStrings = null;
    }
    if (position == srcEnd) {
      currentStructures = null;
      src = null;
      if (referenceMap)
        referenceMap = null;
    } else if (position > srcEnd) {
      let error = new Error("Unexpected end of CBOR data");
      error.incomplete = true;
      throw error;
    } else if (!sequentialMode) {
      throw new Error("Data read, but end of buffer not reached");
    }
    return result;
  } catch (error) {
    clearSource();
    if (error instanceof RangeError || error.message.startsWith("Unexpected end of buffer")) {
      error.incomplete = true;
    }
    throw error;
  }
}
function read() {
  let token = src[position++];
  let majorType = token >> 5;
  token = token & 31;
  if (token > 23) {
    switch (token) {
      case 24:
        token = src[position++];
        break;
      case 25:
        if (majorType == 7) {
          return getFloat16();
        }
        token = dataView.getUint16(position);
        position += 2;
        break;
      case 26:
        if (majorType == 7) {
          let value = dataView.getFloat32(position);
          if (currentDecoder.useFloat32 > 2) {
            let multiplier = mult10[(src[position] & 127) << 1 | src[position + 1] >> 7];
            position += 4;
            return (multiplier * value + (value > 0 ? 0.5 : -0.5) >> 0) / multiplier;
          }
          position += 4;
          return value;
        }
        token = dataView.getUint32(position);
        position += 4;
        break;
      case 27:
        if (majorType == 7) {
          let value = dataView.getFloat64(position);
          position += 8;
          return value;
        }
        if (majorType > 1) {
          if (dataView.getUint32(position) > 0)
            throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");
          token = dataView.getUint32(position + 4);
        } else if (currentDecoder.int64AsNumber) {
          token = dataView.getUint32(position) * 4294967296;
          token += dataView.getUint32(position + 4);
        } else
          token = dataView.getBigUint64(position);
        position += 8;
        break;
      case 31:
        switch (majorType) {
          case 2:
          // byte string
          case 3:
            throw new Error("Indefinite length not supported for byte or text strings");
          case 4:
            let array = [];
            let value, i2 = 0;
            while ((value = read()) != STOP_CODE) {
              if (i2 >= maxArraySize) throw new Error(`Array length exceeds ${maxArraySize}`);
              array[i2++] = value;
            }
            return majorType == 4 ? array : majorType == 3 ? array.join("") : Buffer.concat(array);
          case 5:
            let key;
            if (currentDecoder.mapsAsObjects) {
              let object = {};
              let i3 = 0;
              if (currentDecoder.keyMap) {
                while ((key = read()) != STOP_CODE) {
                  if (i3++ >= maxMapSize) throw new Error(`Property count exceeds ${maxMapSize}`);
                  object[safeKey(currentDecoder.decodeKey(key))] = read();
                }
              } else {
                while ((key = read()) != STOP_CODE) {
                  if (i3++ >= maxMapSize) throw new Error(`Property count exceeds ${maxMapSize}`);
                  object[safeKey(key)] = read();
                }
              }
              return object;
            } else {
              if (restoreMapsAsObject) {
                currentDecoder.mapsAsObjects = true;
                restoreMapsAsObject = false;
              }
              let map = /* @__PURE__ */ new Map();
              if (currentDecoder.keyMap) {
                let i3 = 0;
                while ((key = read()) != STOP_CODE) {
                  if (i3++ >= maxMapSize) {
                    throw new Error(`Map size exceeds ${maxMapSize}`);
                  }
                  map.set(currentDecoder.decodeKey(key), read());
                }
              } else {
                let i3 = 0;
                while ((key = read()) != STOP_CODE) {
                  if (i3++ >= maxMapSize) {
                    throw new Error(`Map size exceeds ${maxMapSize}`);
                  }
                  map.set(key, read());
                }
              }
              return map;
            }
          case 7:
            return STOP_CODE;
          default:
            throw new Error("Invalid major type for indefinite length " + majorType);
        }
      default:
        throw new Error("Unknown token " + token);
    }
  }
  switch (majorType) {
    case 0:
      return token;
    case 1:
      return ~token;
    case 2:
      return readBin(token);
    case 3:
      if (srcStringEnd >= position) {
        return srcString.slice(position - srcStringStart, (position += token) - srcStringStart);
      }
      if (srcStringEnd == 0 && srcEnd < 140 && token < 32) {
        let string = token < 16 ? shortStringInJS(token) : longStringInJS(token);
        if (string != null)
          return string;
      }
      return readFixedString(token);
    case 4:
      if (token >= maxArraySize) throw new Error(`Array length exceeds ${maxArraySize}`);
      let array = new Array(token);
      for (let i2 = 0; i2 < token; i2++) array[i2] = read();
      return array;
    case 5:
      if (token >= maxMapSize) throw new Error(`Map size exceeds ${maxArraySize}`);
      if (currentDecoder.mapsAsObjects) {
        let object = {};
        if (currentDecoder.keyMap) for (let i2 = 0; i2 < token; i2++) object[safeKey(currentDecoder.decodeKey(read()))] = read();
        else for (let i2 = 0; i2 < token; i2++) object[safeKey(read())] = read();
        return object;
      } else {
        if (restoreMapsAsObject) {
          currentDecoder.mapsAsObjects = true;
          restoreMapsAsObject = false;
        }
        let map = /* @__PURE__ */ new Map();
        if (currentDecoder.keyMap) for (let i2 = 0; i2 < token; i2++) map.set(currentDecoder.decodeKey(read()), read());
        else for (let i2 = 0; i2 < token; i2++) map.set(read(), read());
        return map;
      }
    case 6:
      if (token >= BUNDLED_STRINGS_ID) {
        let structure = currentStructures[token & 8191];
        if (structure) {
          if (!structure.read) structure.read = createStructureReader(structure);
          return structure.read();
        }
        if (token < 65536) {
          if (token == RECORD_INLINE_ID) {
            let length = readJustLength();
            let id = read();
            let structure2 = read();
            recordDefinition(id, structure2);
            let object = {};
            if (currentDecoder.keyMap) for (let i2 = 2; i2 < length; i2++) {
              let key = currentDecoder.decodeKey(structure2[i2 - 2]);
              object[safeKey(key)] = read();
            }
            else for (let i2 = 2; i2 < length; i2++) {
              let key = structure2[i2 - 2];
              object[safeKey(key)] = read();
            }
            return object;
          } else if (token == RECORD_DEFINITIONS_ID) {
            let length = readJustLength();
            let id = read();
            for (let i2 = 2; i2 < length; i2++) {
              recordDefinition(id++, read());
            }
            return read();
          } else if (token == BUNDLED_STRINGS_ID) {
            return readBundleExt();
          }
          if (currentDecoder.getShared) {
            loadShared();
            structure = currentStructures[token & 8191];
            if (structure) {
              if (!structure.read)
                structure.read = createStructureReader(structure);
              return structure.read();
            }
          }
        }
      }
      let extension = currentExtensions[token];
      if (extension) {
        if (extension.handlesRead)
          return extension(read);
        else
          return extension(read());
      } else {
        let input = read();
        for (let i2 = 0; i2 < currentExtensionRanges.length; i2++) {
          let value = currentExtensionRanges[i2](token, input);
          if (value !== void 0)
            return value;
        }
        return new Tag(input, token);
      }
    case 7:
      switch (token) {
        case 20:
          return false;
        case 21:
          return true;
        case 22:
          return null;
        case 23:
          return;
        // undefined
        case 31:
        default:
          let packedValue = (packedValues || getPackedValues())[token];
          if (packedValue !== void 0)
            return packedValue;
          throw new Error("Unknown token " + token);
      }
    default:
      if (isNaN(token)) {
        let error = new Error("Unexpected end of CBOR data");
        error.incomplete = true;
        throw error;
      }
      throw new Error("Unknown CBOR token " + token);
  }
}
var validName = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function createStructureReader(structure) {
  if (!structure) throw new Error("Structure is required in record definition");
  function readObject() {
    let length = src[position++];
    length = length & 31;
    if (length > 23) {
      switch (length) {
        case 24:
          length = src[position++];
          break;
        case 25:
          length = dataView.getUint16(position);
          position += 2;
          break;
        case 26:
          length = dataView.getUint32(position);
          position += 4;
          break;
        default:
          throw new Error("Expected array header, but got " + src[position - 1]);
      }
    }
    let compiledReader = this.compiledReader;
    while (compiledReader) {
      if (compiledReader.propertyCount === length)
        return compiledReader(read);
      compiledReader = compiledReader.next;
    }
    if (this.slowReads++ >= inlineObjectReadThreshold) {
      let array = this.length == length ? this : this.slice(0, length);
      compiledReader = currentDecoder.keyMap ? new Function("r", "return {" + array.map((k) => currentDecoder.decodeKey(k)).map((k) => validName.test(k) ? safeKey(k) + ":r()" : "[" + JSON.stringify(k) + "]:r()").join(",") + "}") : new Function("r", "return {" + array.map((key) => validName.test(key) ? safeKey(key) + ":r()" : "[" + JSON.stringify(key) + "]:r()").join(",") + "}");
      if (this.compiledReader)
        compiledReader.next = this.compiledReader;
      compiledReader.propertyCount = length;
      this.compiledReader = compiledReader;
      return compiledReader(read);
    }
    let object = {};
    if (currentDecoder.keyMap) for (let i2 = 0; i2 < length; i2++) object[safeKey(currentDecoder.decodeKey(this[i2]))] = read();
    else for (let i2 = 0; i2 < length; i2++) {
      object[safeKey(this[i2])] = read();
    }
    return object;
  }
  structure.slowReads = 0;
  return readObject;
}
function safeKey(key) {
  if (typeof key === "string") return key === "__proto__" ? "__proto_" : key;
  if (typeof key === "number" || typeof key === "boolean" || typeof key === "bigint") return key.toString();
  if (key == null) return key + "";
  throw new Error("Invalid property name type " + typeof key);
}
var readFixedString = readStringJS;
function readStringJS(length) {
  let result;
  if (length < 16) {
    if (result = shortStringInJS(length))
      return result;
  }
  if (length > 64 && decoder)
    return decoder.decode(src.subarray(position, position += length));
  const end = position + length;
  const units = [];
  result = "";
  while (position < end) {
    const byte1 = src[position++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = src[position++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      const byte4 = src[position++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= 4096) {
      result += fromCharCode.apply(String, units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += fromCharCode.apply(String, units);
  }
  return result;
}
var fromCharCode = String.fromCharCode;
function longStringInJS(length) {
  let start = position;
  let bytes = new Array(length);
  for (let i2 = 0; i2 < length; i2++) {
    const byte = src[position++];
    if ((byte & 128) > 0) {
      position = start;
      return;
    }
    bytes[i2] = byte;
  }
  return fromCharCode.apply(String, bytes);
}
function shortStringInJS(length) {
  if (length < 4) {
    if (length < 2) {
      if (length === 0)
        return "";
      else {
        let a2 = src[position++];
        if ((a2 & 128) > 1) {
          position -= 1;
          return;
        }
        return fromCharCode(a2);
      }
    } else {
      let a2 = src[position++];
      let b = src[position++];
      if ((a2 & 128) > 0 || (b & 128) > 0) {
        position -= 2;
        return;
      }
      if (length < 3)
        return fromCharCode(a2, b);
      let c = src[position++];
      if ((c & 128) > 0) {
        position -= 3;
        return;
      }
      return fromCharCode(a2, b, c);
    }
  } else {
    let a2 = src[position++];
    let b = src[position++];
    let c = src[position++];
    let d = src[position++];
    if ((a2 & 128) > 0 || (b & 128) > 0 || (c & 128) > 0 || (d & 128) > 0) {
      position -= 4;
      return;
    }
    if (length < 6) {
      if (length === 4)
        return fromCharCode(a2, b, c, d);
      else {
        let e = src[position++];
        if ((e & 128) > 0) {
          position -= 5;
          return;
        }
        return fromCharCode(a2, b, c, d, e);
      }
    } else if (length < 8) {
      let e = src[position++];
      let f2 = src[position++];
      if ((e & 128) > 0 || (f2 & 128) > 0) {
        position -= 6;
        return;
      }
      if (length < 7)
        return fromCharCode(a2, b, c, d, e, f2);
      let g = src[position++];
      if ((g & 128) > 0) {
        position -= 7;
        return;
      }
      return fromCharCode(a2, b, c, d, e, f2, g);
    } else {
      let e = src[position++];
      let f2 = src[position++];
      let g = src[position++];
      let h = src[position++];
      if ((e & 128) > 0 || (f2 & 128) > 0 || (g & 128) > 0 || (h & 128) > 0) {
        position -= 8;
        return;
      }
      if (length < 10) {
        if (length === 8)
          return fromCharCode(a2, b, c, d, e, f2, g, h);
        else {
          let i2 = src[position++];
          if ((i2 & 128) > 0) {
            position -= 9;
            return;
          }
          return fromCharCode(a2, b, c, d, e, f2, g, h, i2);
        }
      } else if (length < 12) {
        let i2 = src[position++];
        let j2 = src[position++];
        if ((i2 & 128) > 0 || (j2 & 128) > 0) {
          position -= 10;
          return;
        }
        if (length < 11)
          return fromCharCode(a2, b, c, d, e, f2, g, h, i2, j2);
        let k = src[position++];
        if ((k & 128) > 0) {
          position -= 11;
          return;
        }
        return fromCharCode(a2, b, c, d, e, f2, g, h, i2, j2, k);
      } else {
        let i2 = src[position++];
        let j2 = src[position++];
        let k = src[position++];
        let l = src[position++];
        if ((i2 & 128) > 0 || (j2 & 128) > 0 || (k & 128) > 0 || (l & 128) > 0) {
          position -= 12;
          return;
        }
        if (length < 14) {
          if (length === 12)
            return fromCharCode(a2, b, c, d, e, f2, g, h, i2, j2, k, l);
          else {
            let m = src[position++];
            if ((m & 128) > 0) {
              position -= 13;
              return;
            }
            return fromCharCode(a2, b, c, d, e, f2, g, h, i2, j2, k, l, m);
          }
        } else {
          let m = src[position++];
          let n = src[position++];
          if ((m & 128) > 0 || (n & 128) > 0) {
            position -= 14;
            return;
          }
          if (length < 15)
            return fromCharCode(a2, b, c, d, e, f2, g, h, i2, j2, k, l, m, n);
          let o = src[position++];
          if ((o & 128) > 0) {
            position -= 15;
            return;
          }
          return fromCharCode(a2, b, c, d, e, f2, g, h, i2, j2, k, l, m, n, o);
        }
      }
    }
  }
}
function readBin(length) {
  return currentDecoder.copyBuffers ? (
    // specifically use the copying slice (not the node one)
    Uint8Array.prototype.slice.call(src, position, position += length)
  ) : src.subarray(position, position += length);
}
var f32Array = new Float32Array(1);
var u8Array = new Uint8Array(f32Array.buffer, 0, 4);
function getFloat16() {
  let byte0 = src[position++];
  let byte1 = src[position++];
  let exponent = (byte0 & 127) >> 2;
  if (exponent === 31) {
    if (byte1 || byte0 & 3)
      return NaN;
    return byte0 & 128 ? -Infinity : Infinity;
  }
  if (exponent === 0) {
    let abs = ((byte0 & 3) << 8 | byte1) / (1 << 24);
    return byte0 & 128 ? -abs : abs;
  }
  u8Array[3] = byte0 & 128 | // sign bit
  (exponent >> 1) + 56;
  u8Array[2] = (byte0 & 7) << 5 | // last exponent bit and first two mantissa bits
  byte1 >> 3;
  u8Array[1] = byte1 << 5;
  u8Array[0] = 0;
  return f32Array[0];
}
var keyCache = new Array(4096);
var Tag = class {
  constructor(value, tag) {
    this.value = value;
    this.tag = tag;
  }
};
currentExtensions[0] = (dateString) => {
  return new Date(dateString);
};
currentExtensions[1] = (epochSec) => {
  return new Date(Math.round(epochSec * 1e3));
};
currentExtensions[2] = (buffer) => {
  let value = BigInt(0);
  for (let i2 = 0, l = buffer.byteLength; i2 < l; i2++) {
    value = BigInt(buffer[i2]) + (value << BigInt(8));
  }
  return value;
};
currentExtensions[3] = (buffer) => {
  return BigInt(-1) - currentExtensions[2](buffer);
};
currentExtensions[4] = (fraction) => {
  return +(fraction[1] + "e" + fraction[0]);
};
currentExtensions[5] = (fraction) => {
  return fraction[1] * Math.exp(fraction[0] * Math.log(2));
};
var recordDefinition = (id, structure) => {
  id = id - 57344;
  let existingStructure = currentStructures[id];
  if (existingStructure && existingStructure.isShared) {
    (currentStructures.restoreStructures || (currentStructures.restoreStructures = []))[id] = existingStructure;
  }
  currentStructures[id] = structure;
  structure.read = createStructureReader(structure);
};
currentExtensions[LEGACY_RECORD_INLINE_ID] = (data) => {
  let length = data.length;
  let structure = data[1];
  recordDefinition(data[0], structure);
  let object = {};
  for (let i2 = 2; i2 < length; i2++) {
    let key = structure[i2 - 2];
    object[safeKey(key)] = data[i2];
  }
  return object;
};
currentExtensions[14] = (value) => {
  if (bundledStrings)
    return bundledStrings[0].slice(bundledStrings.position0, bundledStrings.position0 += value);
  return new Tag(value, 14);
};
currentExtensions[15] = (value) => {
  if (bundledStrings)
    return bundledStrings[1].slice(bundledStrings.position1, bundledStrings.position1 += value);
  return new Tag(value, 15);
};
var glbl = { Error, RegExp };
currentExtensions[27] = (data) => {
  return (glbl[data[0]] || Error)(data[1], data[2]);
};
var packedTable = (read2) => {
  if (src[position++] != 132) {
    let error = new Error("Packed values structure must be followed by a 4 element array");
    if (src.length < position)
      error.incomplete = true;
    throw error;
  }
  let newPackedValues = read2();
  if (!newPackedValues || !newPackedValues.length) {
    let error = new Error("Packed values structure must be followed by a 4 element array");
    error.incomplete = true;
    throw error;
  }
  packedValues = packedValues ? newPackedValues.concat(packedValues.slice(newPackedValues.length)) : newPackedValues;
  packedValues.prefixes = read2();
  packedValues.suffixes = read2();
  return read2();
};
packedTable.handlesRead = true;
currentExtensions[51] = packedTable;
currentExtensions[PACKED_REFERENCE_TAG_ID] = (data) => {
  if (!packedValues) {
    if (currentDecoder.getShared)
      loadShared();
    else
      return new Tag(data, PACKED_REFERENCE_TAG_ID);
  }
  if (typeof data == "number")
    return packedValues[16 + (data >= 0 ? 2 * data : -2 * data - 1)];
  let error = new Error("No support for non-integer packed references yet");
  if (data === void 0)
    error.incomplete = true;
  throw error;
};
currentExtensions[28] = (read2) => {
  if (!referenceMap) {
    referenceMap = /* @__PURE__ */ new Map();
    referenceMap.id = 0;
  }
  let id = referenceMap.id++;
  let startingPosition = position;
  let token = src[position];
  let target2;
  if (token >> 5 == 4)
    target2 = [];
  else
    target2 = {};
  let refEntry = { target: target2 };
  referenceMap.set(id, refEntry);
  let targetProperties = read2();
  if (refEntry.used) {
    if (Object.getPrototypeOf(target2) !== Object.getPrototypeOf(targetProperties)) {
      position = startingPosition;
      target2 = targetProperties;
      referenceMap.set(id, { target: target2 });
      targetProperties = read2();
    }
    return Object.assign(target2, targetProperties);
  }
  refEntry.target = targetProperties;
  return targetProperties;
};
currentExtensions[28].handlesRead = true;
currentExtensions[29] = (id) => {
  let refEntry = referenceMap.get(id);
  refEntry.used = true;
  return refEntry.target;
};
currentExtensions[258] = (array) => new Set(array);
(currentExtensions[259] = (read2) => {
  if (currentDecoder.mapsAsObjects) {
    currentDecoder.mapsAsObjects = false;
    restoreMapsAsObject = true;
  }
  return read2();
}).handlesRead = true;
function combine(a2, b) {
  if (typeof a2 === "string")
    return a2 + b;
  if (a2 instanceof Array)
    return a2.concat(b);
  return Object.assign({}, a2, b);
}
function getPackedValues() {
  if (!packedValues) {
    if (currentDecoder.getShared)
      loadShared();
    else
      throw new Error("No packed values available");
  }
  return packedValues;
}
var SHARED_DATA_TAG_ID = 1399353956;
currentExtensionRanges.push((tag, input) => {
  if (tag >= 225 && tag <= 255)
    return combine(getPackedValues().prefixes[tag - 224], input);
  if (tag >= 28704 && tag <= 32767)
    return combine(getPackedValues().prefixes[tag - 28672], input);
  if (tag >= 1879052288 && tag <= 2147483647)
    return combine(getPackedValues().prefixes[tag - 1879048192], input);
  if (tag >= 216 && tag <= 223)
    return combine(input, getPackedValues().suffixes[tag - 216]);
  if (tag >= 27647 && tag <= 28671)
    return combine(input, getPackedValues().suffixes[tag - 27639]);
  if (tag >= 1811940352 && tag <= 1879048191)
    return combine(input, getPackedValues().suffixes[tag - 1811939328]);
  if (tag == SHARED_DATA_TAG_ID) {
    return {
      packedValues,
      structures: currentStructures.slice(0),
      version: input
    };
  }
  if (tag == 55799)
    return input;
});
var isLittleEndianMachine = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
var typedArrays = [
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  typeof BigUint64Array == "undefined" ? { name: "BigUint64Array" } : BigUint64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  typeof BigInt64Array == "undefined" ? { name: "BigInt64Array" } : BigInt64Array,
  Float32Array,
  Float64Array
];
var typedArrayTags = [64, 68, 69, 70, 71, 72, 77, 78, 79, 85, 86];
for (let i2 = 0; i2 < typedArrays.length; i2++) {
  registerTypedArray(typedArrays[i2], typedArrayTags[i2]);
}
function registerTypedArray(TypedArray, tag) {
  let dvMethod = "get" + TypedArray.name.slice(0, -5);
  let bytesPerElement;
  if (typeof TypedArray === "function")
    bytesPerElement = TypedArray.BYTES_PER_ELEMENT;
  else
    TypedArray = null;
  for (let littleEndian = 0; littleEndian < 2; littleEndian++) {
    if (!littleEndian && bytesPerElement == 1)
      continue;
    let sizeShift = bytesPerElement == 2 ? 1 : bytesPerElement == 4 ? 2 : bytesPerElement == 8 ? 3 : 0;
    currentExtensions[littleEndian ? tag : tag - 4] = bytesPerElement == 1 || littleEndian == isLittleEndianMachine ? (buffer) => {
      if (!TypedArray)
        throw new Error("Could not find typed array for code " + tag);
      if (!currentDecoder.copyBuffers) {
        if (bytesPerElement === 1 || bytesPerElement === 2 && !(buffer.byteOffset & 1) || bytesPerElement === 4 && !(buffer.byteOffset & 3) || bytesPerElement === 8 && !(buffer.byteOffset & 7))
          return new TypedArray(buffer.buffer, buffer.byteOffset, buffer.byteLength >> sizeShift);
      }
      return new TypedArray(Uint8Array.prototype.slice.call(buffer, 0).buffer);
    } : (buffer) => {
      if (!TypedArray)
        throw new Error("Could not find typed array for code " + tag);
      let dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      let elements = buffer.length >> sizeShift;
      let ta = new TypedArray(elements);
      let method = dv[dvMethod];
      for (let i2 = 0; i2 < elements; i2++) {
        ta[i2] = method.call(dv, i2 << sizeShift, littleEndian);
      }
      return ta;
    };
  }
}
function readBundleExt() {
  let length = readJustLength();
  let bundlePosition = position + read();
  for (let i2 = 2; i2 < length; i2++) {
    let bundleLength = readJustLength();
    position += bundleLength;
  }
  let dataPosition = position;
  position = bundlePosition;
  bundledStrings = [readStringJS(readJustLength()), readStringJS(readJustLength())];
  bundledStrings.position0 = 0;
  bundledStrings.position1 = 0;
  bundledStrings.postBundlePosition = position;
  position = dataPosition;
  return read();
}
function readJustLength() {
  let token = src[position++] & 31;
  if (token > 23) {
    switch (token) {
      case 24:
        token = src[position++];
        break;
      case 25:
        token = dataView.getUint16(position);
        position += 2;
        break;
      case 26:
        token = dataView.getUint32(position);
        position += 4;
        break;
    }
  }
  return token;
}
function loadShared() {
  if (currentDecoder.getShared) {
    let sharedData = saveState(() => {
      src = null;
      return currentDecoder.getShared();
    }) || {};
    let updatedStructures = sharedData.structures || [];
    currentDecoder.sharedVersion = sharedData.version;
    packedValues = currentDecoder.sharedValues = sharedData.packedValues;
    if (currentStructures === true)
      currentDecoder.structures = currentStructures = updatedStructures;
    else
      currentStructures.splice.apply(currentStructures, [0, updatedStructures.length].concat(updatedStructures));
  }
}
function saveState(callback) {
  let savedSrcEnd = srcEnd;
  let savedPosition = position;
  let savedStringPosition = stringPosition;
  let savedSrcStringStart = srcStringStart;
  let savedSrcStringEnd = srcStringEnd;
  let savedSrcString = srcString;
  let savedStrings = strings;
  let savedReferenceMap = referenceMap;
  let savedBundledStrings = bundledStrings;
  let savedSrc = new Uint8Array(src.slice(0, srcEnd));
  let savedStructures = currentStructures;
  let savedDecoder = currentDecoder;
  let savedSequentialMode = sequentialMode;
  let value = callback();
  srcEnd = savedSrcEnd;
  position = savedPosition;
  stringPosition = savedStringPosition;
  srcStringStart = savedSrcStringStart;
  srcStringEnd = savedSrcStringEnd;
  srcString = savedSrcString;
  strings = savedStrings;
  referenceMap = savedReferenceMap;
  bundledStrings = savedBundledStrings;
  src = savedSrc;
  sequentialMode = savedSequentialMode;
  currentStructures = savedStructures;
  currentDecoder = savedDecoder;
  dataView = new DataView(src.buffer, src.byteOffset, src.byteLength);
  return value;
}
function clearSource() {
  src = null;
  referenceMap = null;
  currentStructures = null;
}
var mult10 = new Array(147);
for (let i2 = 0; i2 < 256; i2++) {
  mult10[i2] = +("1e" + Math.floor(45.15 - i2 * 0.30103));
}
var defaultDecoder = new Decoder({ useRecords: false });
var decode = defaultDecoder.decode;
var decodeMultiple = defaultDecoder.decodeMultiple;
var FLOAT32_OPTIONS = {
  NEVER: 0,
  ALWAYS: 1,
  DECIMAL_ROUND: 3,
  DECIMAL_FIT: 4
};

// node_modules/cbor-x/encode.js
var textEncoder;
try {
  textEncoder = new TextEncoder();
} catch (error) {
}
var extensions;
var extensionClasses;
var Buffer2 = typeof globalThis === "object" && globalThis.Buffer;
var hasNodeBuffer = typeof Buffer2 !== "undefined";
var ByteArrayAllocate = hasNodeBuffer ? Buffer2.allocUnsafeSlow : Uint8Array;
var ByteArray = hasNodeBuffer ? Buffer2 : Uint8Array;
var MAX_STRUCTURES = 256;
var MAX_BUFFER_SIZE = hasNodeBuffer ? 4294967296 : 2144337920;
var throwOnIterable;
var target;
var targetView;
var position2 = 0;
var safeEnd;
var bundledStrings2 = null;
var MAX_BUNDLE_SIZE = 61440;
var hasNonLatin = /[\u0080-\uFFFF]/;
var RECORD_SYMBOL = Symbol("record-id");
var Encoder = class extends Decoder {
  constructor(options) {
    super(options);
    this.offset = 0;
    let typeBuffer;
    let start;
    let sharedStructures;
    let hasSharedUpdate;
    let structures;
    let referenceMap2;
    options = options || {};
    let encodeUtf8 = ByteArray.prototype.utf8Write ? function(string, position3, maxBytes) {
      return target.utf8Write(string, position3, maxBytes);
    } : textEncoder && textEncoder.encodeInto ? function(string, position3) {
      return textEncoder.encodeInto(string, target.subarray(position3)).written;
    } : false;
    let encoder = this;
    let hasSharedStructures = options.structures || options.saveStructures;
    let maxSharedStructures = options.maxSharedStructures;
    if (maxSharedStructures == null)
      maxSharedStructures = hasSharedStructures ? 128 : 0;
    if (maxSharedStructures > 8190)
      throw new Error("Maximum maxSharedStructure is 8190");
    let isSequential = options.sequential;
    if (isSequential) {
      maxSharedStructures = 0;
    }
    if (!this.structures)
      this.structures = [];
    if (this.saveStructures)
      this.saveShared = this.saveStructures;
    let samplingPackedValues, packedObjectMap2, sharedValues = options.sharedValues;
    let sharedPackedObjectMap2;
    if (sharedValues) {
      sharedPackedObjectMap2 = /* @__PURE__ */ Object.create(null);
      for (let i2 = 0, l = sharedValues.length; i2 < l; i2++) {
        sharedPackedObjectMap2[sharedValues[i2]] = i2;
      }
    }
    let recordIdsToRemove = [];
    let transitionsCount = 0;
    let serializationsSinceTransitionRebuild = 0;
    this.mapEncode = function(value, encodeOptions) {
      if (this._keyMap && !this._mapped) {
        switch (value.constructor.name) {
          case "Array":
            value = value.map((r) => this.encodeKeys(r));
            break;
        }
      }
      return this.encode(value, encodeOptions);
    };
    this.encode = function(value, encodeOptions) {
      if (!target) {
        target = new ByteArrayAllocate(8192);
        targetView = new DataView(target.buffer, 0, 8192);
        position2 = 0;
      }
      safeEnd = target.length - 10;
      if (safeEnd - position2 < 2048) {
        target = new ByteArrayAllocate(target.length);
        targetView = new DataView(target.buffer, 0, target.length);
        safeEnd = target.length - 10;
        position2 = 0;
      } else if (encodeOptions === REUSE_BUFFER_MODE)
        position2 = position2 + 7 & 2147483640;
      start = position2;
      if (encoder.useSelfDescribedHeader) {
        targetView.setUint32(position2, 3654940416);
        position2 += 3;
      }
      referenceMap2 = encoder.structuredClone ? /* @__PURE__ */ new Map() : null;
      if (encoder.bundleStrings && typeof value !== "string") {
        bundledStrings2 = [];
        bundledStrings2.size = Infinity;
      } else
        bundledStrings2 = null;
      sharedStructures = encoder.structures;
      if (sharedStructures) {
        if (sharedStructures.uninitialized) {
          let sharedData = encoder.getShared() || {};
          encoder.structures = sharedStructures = sharedData.structures || [];
          encoder.sharedVersion = sharedData.version;
          let sharedValues2 = encoder.sharedValues = sharedData.packedValues;
          if (sharedValues2) {
            sharedPackedObjectMap2 = {};
            for (let i2 = 0, l = sharedValues2.length; i2 < l; i2++)
              sharedPackedObjectMap2[sharedValues2[i2]] = i2;
          }
        }
        let sharedStructuresLength = sharedStructures.length;
        if (sharedStructuresLength > maxSharedStructures && !isSequential)
          sharedStructuresLength = maxSharedStructures;
        if (!sharedStructures.transitions) {
          sharedStructures.transitions = /* @__PURE__ */ Object.create(null);
          for (let i2 = 0; i2 < sharedStructuresLength; i2++) {
            let keys = sharedStructures[i2];
            if (!keys)
              continue;
            let nextTransition, transition = sharedStructures.transitions;
            for (let j2 = 0, l = keys.length; j2 < l; j2++) {
              if (transition[RECORD_SYMBOL] === void 0)
                transition[RECORD_SYMBOL] = i2;
              let key = keys[j2];
              nextTransition = transition[key];
              if (!nextTransition) {
                nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
              }
              transition = nextTransition;
            }
            transition[RECORD_SYMBOL] = i2 | 1048576;
          }
        }
        if (!isSequential)
          sharedStructures.nextId = sharedStructuresLength;
      }
      if (hasSharedUpdate)
        hasSharedUpdate = false;
      structures = sharedStructures || [];
      packedObjectMap2 = sharedPackedObjectMap2;
      if (options.pack) {
        let packedValues2 = /* @__PURE__ */ new Map();
        packedValues2.values = [];
        packedValues2.encoder = encoder;
        packedValues2.maxValues = options.maxPrivatePackedValues || (sharedPackedObjectMap2 ? 16 : Infinity);
        packedValues2.objectMap = sharedPackedObjectMap2 || false;
        packedValues2.samplingPackedValues = samplingPackedValues;
        findRepetitiveStrings(value, packedValues2);
        if (packedValues2.values.length > 0) {
          target[position2++] = 216;
          target[position2++] = 51;
          writeArrayHeader(4);
          let valuesArray = packedValues2.values;
          encode2(valuesArray);
          writeArrayHeader(0);
          writeArrayHeader(0);
          packedObjectMap2 = Object.create(sharedPackedObjectMap2 || null);
          for (let i2 = 0, l = valuesArray.length; i2 < l; i2++) {
            packedObjectMap2[valuesArray[i2]] = i2;
          }
        }
      }
      throwOnIterable = encodeOptions & THROW_ON_ITERABLE;
      try {
        if (throwOnIterable)
          return;
        encode2(value);
        if (bundledStrings2) {
          writeBundles(start, encode2);
        }
        encoder.offset = position2;
        if (referenceMap2 && referenceMap2.idsToInsert) {
          position2 += referenceMap2.idsToInsert.length * 2;
          if (position2 > safeEnd)
            makeRoom(position2);
          encoder.offset = position2;
          let serialized = insertIds(target.subarray(start, position2), referenceMap2.idsToInsert);
          referenceMap2 = null;
          return serialized;
        }
        if (encodeOptions & REUSE_BUFFER_MODE) {
          target.start = start;
          target.end = position2;
          return target;
        }
        return target.subarray(start, position2);
      } finally {
        if (sharedStructures) {
          if (serializationsSinceTransitionRebuild < 10)
            serializationsSinceTransitionRebuild++;
          if (sharedStructures.length > maxSharedStructures)
            sharedStructures.length = maxSharedStructures;
          if (transitionsCount > 1e4) {
            sharedStructures.transitions = null;
            serializationsSinceTransitionRebuild = 0;
            transitionsCount = 0;
            if (recordIdsToRemove.length > 0)
              recordIdsToRemove = [];
          } else if (recordIdsToRemove.length > 0 && !isSequential) {
            for (let i2 = 0, l = recordIdsToRemove.length; i2 < l; i2++) {
              recordIdsToRemove[i2][RECORD_SYMBOL] = void 0;
            }
            recordIdsToRemove = [];
          }
        }
        if (hasSharedUpdate && encoder.saveShared) {
          if (encoder.structures.length > maxSharedStructures) {
            encoder.structures = encoder.structures.slice(0, maxSharedStructures);
          }
          let returnBuffer = target.subarray(start, position2);
          if (encoder.updateSharedData() === false)
            return encoder.encode(value);
          return returnBuffer;
        }
        if (encodeOptions & RESET_BUFFER_MODE)
          position2 = start;
      }
    };
    this.findCommonStringsToPack = () => {
      samplingPackedValues = /* @__PURE__ */ new Map();
      if (!sharedPackedObjectMap2)
        sharedPackedObjectMap2 = /* @__PURE__ */ Object.create(null);
      return (options2) => {
        let threshold = options2 && options2.threshold || 4;
        let position3 = this.pack ? options2.maxPrivatePackedValues || 16 : 0;
        if (!sharedValues)
          sharedValues = this.sharedValues = [];
        for (let [key, status] of samplingPackedValues) {
          if (status.count > threshold) {
            sharedPackedObjectMap2[key] = position3++;
            sharedValues.push(key);
            hasSharedUpdate = true;
          }
        }
        while (this.saveShared && this.updateSharedData() === false) {
        }
        samplingPackedValues = null;
      };
    };
    const encode2 = (value) => {
      if (position2 > safeEnd)
        target = makeRoom(position2);
      var type = typeof value;
      var length;
      if (type === "string") {
        if (packedObjectMap2) {
          let packedPosition = packedObjectMap2[value];
          if (packedPosition >= 0) {
            if (packedPosition < 16)
              target[position2++] = packedPosition + 224;
            else {
              target[position2++] = 198;
              if (packedPosition & 1)
                encode2(15 - packedPosition >> 1);
              else
                encode2(packedPosition - 16 >> 1);
            }
            return;
          } else if (samplingPackedValues && !options.pack) {
            let status = samplingPackedValues.get(value);
            if (status)
              status.count++;
            else
              samplingPackedValues.set(value, {
                count: 1
              });
          }
        }
        let strLength = value.length;
        if (bundledStrings2 && strLength >= 4 && strLength < 1024) {
          if ((bundledStrings2.size += strLength) > MAX_BUNDLE_SIZE) {
            let extStart;
            let maxBytes2 = (bundledStrings2[0] ? bundledStrings2[0].length * 3 + bundledStrings2[1].length : 0) + 10;
            if (position2 + maxBytes2 > safeEnd)
              target = makeRoom(position2 + maxBytes2);
            target[position2++] = 217;
            target[position2++] = 223;
            target[position2++] = 249;
            target[position2++] = bundledStrings2.position ? 132 : 130;
            target[position2++] = 26;
            extStart = position2 - start;
            position2 += 4;
            if (bundledStrings2.position) {
              writeBundles(start, encode2);
            }
            bundledStrings2 = ["", ""];
            bundledStrings2.size = 0;
            bundledStrings2.position = extStart;
          }
          let twoByte = hasNonLatin.test(value);
          bundledStrings2[twoByte ? 0 : 1] += value;
          target[position2++] = twoByte ? 206 : 207;
          encode2(strLength);
          return;
        }
        let headerSize;
        if (strLength < 32) {
          headerSize = 1;
        } else if (strLength < 256) {
          headerSize = 2;
        } else if (strLength < 65536) {
          headerSize = 3;
        } else {
          headerSize = 5;
        }
        let maxBytes = strLength * 3;
        if (position2 + maxBytes > safeEnd)
          target = makeRoom(position2 + maxBytes);
        if (strLength < 64 || !encodeUtf8) {
          let i2, c1, c2, strPosition = position2 + headerSize;
          for (i2 = 0; i2 < strLength; i2++) {
            c1 = value.charCodeAt(i2);
            if (c1 < 128) {
              target[strPosition++] = c1;
            } else if (c1 < 2048) {
              target[strPosition++] = c1 >> 6 | 192;
              target[strPosition++] = c1 & 63 | 128;
            } else if ((c1 & 64512) === 55296 && ((c2 = value.charCodeAt(i2 + 1)) & 64512) === 56320) {
              c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
              i2++;
              target[strPosition++] = c1 >> 18 | 240;
              target[strPosition++] = c1 >> 12 & 63 | 128;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            } else {
              target[strPosition++] = c1 >> 12 | 224;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            }
          }
          length = strPosition - position2 - headerSize;
        } else {
          length = encodeUtf8(value, position2 + headerSize, maxBytes);
        }
        if (length < 24) {
          target[position2++] = 96 | length;
        } else if (length < 256) {
          if (headerSize < 2) {
            target.copyWithin(position2 + 2, position2 + 1, position2 + 1 + length);
          }
          target[position2++] = 120;
          target[position2++] = length;
        } else if (length < 65536) {
          if (headerSize < 3) {
            target.copyWithin(position2 + 3, position2 + 2, position2 + 2 + length);
          }
          target[position2++] = 121;
          target[position2++] = length >> 8;
          target[position2++] = length & 255;
        } else {
          if (headerSize < 5) {
            target.copyWithin(position2 + 5, position2 + 3, position2 + 3 + length);
          }
          target[position2++] = 122;
          targetView.setUint32(position2, length);
          position2 += 4;
        }
        position2 += length;
      } else if (type === "number") {
        if (!this.alwaysUseFloat && value >>> 0 === value) {
          if (value < 24) {
            target[position2++] = value;
          } else if (value < 256) {
            target[position2++] = 24;
            target[position2++] = value;
          } else if (value < 65536) {
            target[position2++] = 25;
            target[position2++] = value >> 8;
            target[position2++] = value & 255;
          } else {
            target[position2++] = 26;
            targetView.setUint32(position2, value);
            position2 += 4;
          }
        } else if (!this.alwaysUseFloat && value >> 0 === value) {
          if (value >= -24) {
            target[position2++] = 31 - value;
          } else if (value >= -256) {
            target[position2++] = 56;
            target[position2++] = ~value;
          } else if (value >= -65536) {
            target[position2++] = 57;
            targetView.setUint16(position2, ~value);
            position2 += 2;
          } else {
            target[position2++] = 58;
            targetView.setUint32(position2, ~value);
            position2 += 4;
          }
        } else {
          let useFloat32;
          if ((useFloat32 = this.useFloat32) > 0 && value < 4294967296 && value >= -2147483648) {
            target[position2++] = 250;
            targetView.setFloat32(position2, value);
            let xShifted;
            if (useFloat32 < 4 || // this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
            (xShifted = value * mult10[(target[position2] & 127) << 1 | target[position2 + 1] >> 7]) >> 0 === xShifted) {
              position2 += 4;
              return;
            } else
              position2--;
          }
          target[position2++] = 251;
          targetView.setFloat64(position2, value);
          position2 += 8;
        }
      } else if (type === "object") {
        if (!value)
          target[position2++] = 246;
        else {
          if (referenceMap2) {
            let referee = referenceMap2.get(value);
            if (referee) {
              target[position2++] = 216;
              target[position2++] = 29;
              target[position2++] = 25;
              if (!referee.references) {
                let idsToInsert = referenceMap2.idsToInsert || (referenceMap2.idsToInsert = []);
                referee.references = [];
                idsToInsert.push(referee);
              }
              referee.references.push(position2 - start);
              position2 += 2;
              return;
            } else
              referenceMap2.set(value, { offset: position2 - start });
          }
          let constructor = value.constructor;
          if (constructor === Object) {
            writeObject(value);
          } else if (constructor === Array) {
            length = value.length;
            if (length < 24) {
              target[position2++] = 128 | length;
            } else {
              writeArrayHeader(length);
            }
            for (let i2 = 0; i2 < length; i2++) {
              encode2(value[i2]);
            }
          } else if (constructor === Map) {
            if (this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) {
              target[position2++] = 217;
              target[position2++] = 1;
              target[position2++] = 3;
            }
            length = value.size;
            if (length < 24) {
              target[position2++] = 160 | length;
            } else if (length < 256) {
              target[position2++] = 184;
              target[position2++] = length;
            } else if (length < 65536) {
              target[position2++] = 185;
              target[position2++] = length >> 8;
              target[position2++] = length & 255;
            } else {
              target[position2++] = 186;
              targetView.setUint32(position2, length);
              position2 += 4;
            }
            if (encoder.keyMap) {
              for (let [key, entryValue] of value) {
                encode2(encoder.encodeKey(key));
                encode2(entryValue);
              }
            } else {
              for (let [key, entryValue] of value) {
                encode2(key);
                encode2(entryValue);
              }
            }
          } else {
            for (let i2 = 0, l = extensions.length; i2 < l; i2++) {
              let extensionClass = extensionClasses[i2];
              if (value instanceof extensionClass) {
                let extension = extensions[i2];
                let tag = extension.tag;
                if (tag == void 0)
                  tag = extension.getTag && extension.getTag.call(this, value);
                if (tag < 24) {
                  target[position2++] = 192 | tag;
                } else if (tag < 256) {
                  target[position2++] = 216;
                  target[position2++] = tag;
                } else if (tag < 65536) {
                  target[position2++] = 217;
                  target[position2++] = tag >> 8;
                  target[position2++] = tag & 255;
                } else if (tag > -1) {
                  target[position2++] = 218;
                  targetView.setUint32(position2, tag);
                  position2 += 4;
                }
                extension.encode.call(this, value, encode2, makeRoom);
                return;
              }
            }
            if (value[Symbol.iterator]) {
              if (throwOnIterable) {
                let error = new Error("Iterable should be serialized as iterator");
                error.iteratorNotHandled = true;
                throw error;
              }
              target[position2++] = 159;
              for (let entry of value) {
                encode2(entry);
              }
              target[position2++] = 255;
              return;
            }
            if (value[Symbol.asyncIterator] || isBlob(value)) {
              let error = new Error("Iterable/blob should be serialized as iterator");
              error.iteratorNotHandled = true;
              throw error;
            }
            if (this.useToJSON && value.toJSON) {
              const json = value.toJSON();
              if (json !== value)
                return encode2(json);
            }
            writeObject(value);
          }
        }
      } else if (type === "boolean") {
        target[position2++] = value ? 245 : 244;
      } else if (type === "bigint") {
        if (value < BigInt(1) << BigInt(64) && value >= 0) {
          target[position2++] = 27;
          targetView.setBigUint64(position2, value);
        } else if (value > -(BigInt(1) << BigInt(64)) && value < 0) {
          target[position2++] = 59;
          targetView.setBigUint64(position2, -value - BigInt(1));
        } else {
          if (this.largeBigIntToFloat) {
            target[position2++] = 251;
            targetView.setFloat64(position2, Number(value));
          } else {
            if (value >= BigInt(0))
              target[position2++] = 194;
            else {
              target[position2++] = 195;
              value = BigInt(-1) - value;
            }
            let bytes = [];
            while (value) {
              bytes.push(Number(value & BigInt(255)));
              value >>= BigInt(8);
            }
            writeBuffer(new Uint8Array(bytes.reverse()), makeRoom);
            return;
          }
        }
        position2 += 8;
      } else if (type === "undefined") {
        target[position2++] = 247;
      } else {
        throw new Error("Unknown type: " + type);
      }
    };
    const writeObject = this.useRecords === false ? this.variableMapSize ? (object) => {
      let keys = Object.keys(object);
      let vals = Object.values(object);
      let length = keys.length;
      if (length < 24) {
        target[position2++] = 160 | length;
      } else if (length < 256) {
        target[position2++] = 184;
        target[position2++] = length;
      } else if (length < 65536) {
        target[position2++] = 185;
        target[position2++] = length >> 8;
        target[position2++] = length & 255;
      } else {
        target[position2++] = 186;
        targetView.setUint32(position2, length);
        position2 += 4;
      }
      let key;
      if (encoder.keyMap) {
        for (let i2 = 0; i2 < length; i2++) {
          encode2(encoder.encodeKey(keys[i2]));
          encode2(vals[i2]);
        }
      } else {
        for (let i2 = 0; i2 < length; i2++) {
          encode2(keys[i2]);
          encode2(vals[i2]);
        }
      }
    } : (object) => {
      target[position2++] = 185;
      let objectOffset = position2 - start;
      position2 += 2;
      let size = 0;
      if (encoder.keyMap) {
        for (let key in object) if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
          encode2(encoder.encodeKey(key));
          encode2(object[key]);
          size++;
        }
      } else {
        for (let key in object) if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
          encode2(key);
          encode2(object[key]);
          size++;
        }
      }
      target[objectOffset++ + start] = size >> 8;
      target[objectOffset + start] = size & 255;
    } : (object, skipValues) => {
      let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
      let newTransitions = 0;
      let length = 0;
      let parentRecordId;
      let keys;
      if (this.keyMap) {
        keys = Object.keys(object).map((k) => this.encodeKey(k));
        length = keys.length;
        for (let i2 = 0; i2 < length; i2++) {
          let key = keys[i2];
          nextTransition = transition[key];
          if (!nextTransition) {
            nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
            newTransitions++;
          }
          transition = nextTransition;
        }
      } else {
        for (let key in object) if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
          nextTransition = transition[key];
          if (!nextTransition) {
            if (transition[RECORD_SYMBOL] & 1048576) {
              parentRecordId = transition[RECORD_SYMBOL] & 65535;
            }
            nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
            newTransitions++;
          }
          transition = nextTransition;
          length++;
        }
      }
      let recordId = transition[RECORD_SYMBOL];
      if (recordId !== void 0) {
        recordId &= 65535;
        target[position2++] = 217;
        target[position2++] = recordId >> 8 | 224;
        target[position2++] = recordId & 255;
      } else {
        if (!keys)
          keys = transition.__keys__ || (transition.__keys__ = Object.keys(object));
        if (parentRecordId === void 0) {
          recordId = structures.nextId++;
          if (!recordId) {
            recordId = 0;
            structures.nextId = 1;
          }
          if (recordId >= MAX_STRUCTURES) {
            structures.nextId = (recordId = maxSharedStructures) + 1;
          }
        } else {
          recordId = parentRecordId;
        }
        structures[recordId] = keys;
        if (recordId < maxSharedStructures) {
          target[position2++] = 217;
          target[position2++] = recordId >> 8 | 224;
          target[position2++] = recordId & 255;
          transition = structures.transitions;
          for (let i2 = 0; i2 < length; i2++) {
            if (transition[RECORD_SYMBOL] === void 0 || transition[RECORD_SYMBOL] & 1048576)
              transition[RECORD_SYMBOL] = recordId;
            transition = transition[keys[i2]];
          }
          transition[RECORD_SYMBOL] = recordId | 1048576;
          hasSharedUpdate = true;
        } else {
          transition[RECORD_SYMBOL] = recordId;
          targetView.setUint32(position2, 3655335680);
          position2 += 3;
          if (newTransitions)
            transitionsCount += serializationsSinceTransitionRebuild * newTransitions;
          if (recordIdsToRemove.length >= MAX_STRUCTURES - maxSharedStructures)
            recordIdsToRemove.shift()[RECORD_SYMBOL] = void 0;
          recordIdsToRemove.push(transition);
          writeArrayHeader(length + 2);
          encode2(57344 + recordId);
          encode2(keys);
          if (skipValues) return;
          for (let key in object)
            if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key))
              encode2(object[key]);
          return;
        }
      }
      if (length < 24) {
        target[position2++] = 128 | length;
      } else {
        writeArrayHeader(length);
      }
      if (skipValues) return;
      for (let key in object)
        if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key))
          encode2(object[key]);
    };
    const makeRoom = (end) => {
      let newSize;
      if (end > 16777216) {
        if (end - start > MAX_BUFFER_SIZE)
          throw new Error("Encoded buffer would be larger than maximum buffer size");
        newSize = Math.min(
          MAX_BUFFER_SIZE,
          Math.round(Math.max((end - start) * (end > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096
        );
      } else
        newSize = (Math.max(end - start << 2, target.length - 1) >> 12) + 1 << 12;
      let newBuffer = new ByteArrayAllocate(newSize);
      targetView = new DataView(newBuffer.buffer, 0, newSize);
      if (target.copy)
        target.copy(newBuffer, 0, start, end);
      else
        newBuffer.set(target.slice(start, end));
      position2 -= start;
      start = 0;
      safeEnd = newBuffer.length - 10;
      return target = newBuffer;
    };
    let chunkThreshold = 100;
    let continuedChunkThreshold = 1e3;
    this.encodeAsIterable = function(value, options2) {
      return startEncoding(value, options2, encodeObjectAsIterable);
    };
    this.encodeAsAsyncIterable = function(value, options2) {
      return startEncoding(value, options2, encodeObjectAsAsyncIterable);
    };
    function* encodeObjectAsIterable(object, iterateProperties, finalIterable) {
      let constructor = object.constructor;
      if (constructor === Object) {
        let useRecords = encoder.useRecords !== false;
        if (useRecords)
          writeObject(object, true);
        else
          writeEntityLength(Object.keys(object).length, 160);
        for (let key in object) {
          let value = object[key];
          if (!useRecords) encode2(key);
          if (value && typeof value === "object") {
            if (iterateProperties[key])
              yield* encodeObjectAsIterable(value, iterateProperties[key]);
            else
              yield* tryEncode(value, iterateProperties, key);
          } else encode2(value);
        }
      } else if (constructor === Array) {
        let length = object.length;
        writeArrayHeader(length);
        for (let i2 = 0; i2 < length; i2++) {
          let value = object[i2];
          if (value && (typeof value === "object" || position2 - start > chunkThreshold)) {
            if (iterateProperties.element)
              yield* encodeObjectAsIterable(value, iterateProperties.element);
            else
              yield* tryEncode(value, iterateProperties, "element");
          } else encode2(value);
        }
      } else if (object[Symbol.iterator] && !object.buffer) {
        target[position2++] = 159;
        for (let value of object) {
          if (value && (typeof value === "object" || position2 - start > chunkThreshold)) {
            if (iterateProperties.element)
              yield* encodeObjectAsIterable(value, iterateProperties.element);
            else
              yield* tryEncode(value, iterateProperties, "element");
          } else encode2(value);
        }
        target[position2++] = 255;
      } else if (isBlob(object)) {
        writeEntityLength(object.size, 64);
        yield target.subarray(start, position2);
        yield object;
        restartEncoding();
      } else if (object[Symbol.asyncIterator]) {
        target[position2++] = 159;
        yield target.subarray(start, position2);
        yield object;
        restartEncoding();
        target[position2++] = 255;
      } else {
        encode2(object);
      }
      if (finalIterable && position2 > start) yield target.subarray(start, position2);
      else if (position2 - start > chunkThreshold) {
        yield target.subarray(start, position2);
        restartEncoding();
      }
    }
    function* tryEncode(value, iterateProperties, key) {
      let restart = position2 - start;
      try {
        encode2(value);
        if (position2 - start > chunkThreshold) {
          yield target.subarray(start, position2);
          restartEncoding();
        }
      } catch (error) {
        if (error.iteratorNotHandled) {
          iterateProperties[key] = {};
          position2 = start + restart;
          yield* encodeObjectAsIterable.call(this, value, iterateProperties[key]);
        } else throw error;
      }
    }
    function restartEncoding() {
      chunkThreshold = continuedChunkThreshold;
      encoder.encode(null, THROW_ON_ITERABLE);
    }
    function startEncoding(value, options2, encodeIterable) {
      if (options2 && options2.chunkThreshold)
        chunkThreshold = continuedChunkThreshold = options2.chunkThreshold;
      else
        chunkThreshold = 100;
      if (value && typeof value === "object") {
        encoder.encode(null, THROW_ON_ITERABLE);
        return encodeIterable(value, encoder.iterateProperties || (encoder.iterateProperties = {}), true);
      }
      return [encoder.encode(value)];
    }
    async function* encodeObjectAsAsyncIterable(value, iterateProperties) {
      for (let encodedValue of encodeObjectAsIterable(value, iterateProperties, true)) {
        let constructor = encodedValue.constructor;
        if (constructor === ByteArray || constructor === Uint8Array)
          yield encodedValue;
        else if (isBlob(encodedValue)) {
          let reader = encodedValue.stream().getReader();
          let next;
          while (!(next = await reader.read()).done) {
            yield next.value;
          }
        } else if (encodedValue[Symbol.asyncIterator]) {
          for await (let asyncValue of encodedValue) {
            restartEncoding();
            if (asyncValue)
              yield* encodeObjectAsAsyncIterable(asyncValue, iterateProperties.async || (iterateProperties.async = {}));
            else yield encoder.encode(asyncValue);
          }
        } else {
          yield encodedValue;
        }
      }
    }
  }
  useBuffer(buffer) {
    target = buffer;
    targetView = new DataView(target.buffer, target.byteOffset, target.byteLength);
    position2 = 0;
  }
  clearSharedData() {
    if (this.structures)
      this.structures = [];
    if (this.sharedValues)
      this.sharedValues = void 0;
  }
  updateSharedData() {
    let lastVersion = this.sharedVersion || 0;
    this.sharedVersion = lastVersion + 1;
    let structuresCopy = this.structures.slice(0);
    let sharedData = new SharedData(structuresCopy, this.sharedValues, this.sharedVersion);
    let saveResults = this.saveShared(
      sharedData,
      (existingShared) => (existingShared && existingShared.version || 0) == lastVersion
    );
    if (saveResults === false) {
      sharedData = this.getShared() || {};
      this.structures = sharedData.structures || [];
      this.sharedValues = sharedData.packedValues;
      this.sharedVersion = sharedData.version;
      this.structures.nextId = this.structures.length;
    } else {
      structuresCopy.forEach((structure, i2) => this.structures[i2] = structure);
    }
    return saveResults;
  }
};
function writeEntityLength(length, majorValue) {
  if (length < 24)
    target[position2++] = majorValue | length;
  else if (length < 256) {
    target[position2++] = majorValue | 24;
    target[position2++] = length;
  } else if (length < 65536) {
    target[position2++] = majorValue | 25;
    target[position2++] = length >> 8;
    target[position2++] = length & 255;
  } else {
    target[position2++] = majorValue | 26;
    targetView.setUint32(position2, length);
    position2 += 4;
  }
}
var SharedData = class {
  constructor(structures, values, version) {
    this.structures = structures;
    this.packedValues = values;
    this.version = version;
  }
};
function writeArrayHeader(length) {
  if (length < 24)
    target[position2++] = 128 | length;
  else if (length < 256) {
    target[position2++] = 152;
    target[position2++] = length;
  } else if (length < 65536) {
    target[position2++] = 153;
    target[position2++] = length >> 8;
    target[position2++] = length & 255;
  } else {
    target[position2++] = 154;
    targetView.setUint32(position2, length);
    position2 += 4;
  }
}
var BlobConstructor = typeof Blob === "undefined" ? function() {
} : Blob;
function isBlob(object) {
  if (object instanceof BlobConstructor)
    return true;
  let tag = object[Symbol.toStringTag];
  return tag === "Blob" || tag === "File";
}
function findRepetitiveStrings(value, packedValues2) {
  switch (typeof value) {
    case "string":
      if (value.length > 3) {
        if (packedValues2.objectMap[value] > -1 || packedValues2.values.length >= packedValues2.maxValues)
          return;
        let packedStatus = packedValues2.get(value);
        if (packedStatus) {
          if (++packedStatus.count == 2) {
            packedValues2.values.push(value);
          }
        } else {
          packedValues2.set(value, {
            count: 1
          });
          if (packedValues2.samplingPackedValues) {
            let status = packedValues2.samplingPackedValues.get(value);
            if (status)
              status.count++;
            else
              packedValues2.samplingPackedValues.set(value, {
                count: 1
              });
          }
        }
      }
      break;
    case "object":
      if (value) {
        if (value instanceof Array) {
          for (let i2 = 0, l = value.length; i2 < l; i2++) {
            findRepetitiveStrings(value[i2], packedValues2);
          }
        } else {
          let includeKeys = !packedValues2.encoder.useRecords;
          for (var key in value) {
            if (value.hasOwnProperty(key)) {
              if (includeKeys)
                findRepetitiveStrings(key, packedValues2);
              findRepetitiveStrings(value[key], packedValues2);
            }
          }
        }
      }
      break;
    case "function":
      console.log(value);
  }
}
var isLittleEndianMachine2 = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
extensionClasses = [
  Date,
  Set,
  Error,
  RegExp,
  Tag,
  ArrayBuffer,
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  typeof BigUint64Array == "undefined" ? function() {
  } : BigUint64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  typeof BigInt64Array == "undefined" ? function() {
  } : BigInt64Array,
  Float32Array,
  Float64Array,
  SharedData
];
extensions = [
  {
    // Date
    tag: 1,
    encode(date, encode2) {
      let seconds = date.getTime() / 1e3;
      if ((this.useTimestamp32 || date.getMilliseconds() === 0) && seconds >= 0 && seconds < 4294967296) {
        target[position2++] = 26;
        targetView.setUint32(position2, seconds);
        position2 += 4;
      } else {
        target[position2++] = 251;
        targetView.setFloat64(position2, seconds);
        position2 += 8;
      }
    }
  },
  {
    // Set
    tag: 258,
    // https://github.com/input-output-hk/cbor-sets-spec/blob/master/CBOR_SETS.md
    encode(set, encode2) {
      let array = Array.from(set);
      encode2(array);
    }
  },
  {
    // Error
    tag: 27,
    // http://cbor.schmorp.de/generic-object
    encode(error, encode2) {
      encode2([error.name, error.message]);
    }
  },
  {
    // RegExp
    tag: 27,
    // http://cbor.schmorp.de/generic-object
    encode(regex, encode2) {
      encode2(["RegExp", regex.source, regex.flags]);
    }
  },
  {
    // Tag
    getTag(tag) {
      return tag.tag;
    },
    encode(tag, encode2) {
      encode2(tag.value);
    }
  },
  {
    // ArrayBuffer
    encode(arrayBuffer, encode2, makeRoom) {
      writeBuffer(arrayBuffer, makeRoom);
    }
  },
  {
    // Uint8Array
    getTag(typedArray) {
      if (typedArray.constructor === Uint8Array) {
        if (this.tagUint8Array || hasNodeBuffer && this.tagUint8Array !== false)
          return 64;
      }
    },
    encode(typedArray, encode2, makeRoom) {
      writeBuffer(typedArray, makeRoom);
    }
  },
  typedArrayEncoder(68, 1),
  typedArrayEncoder(69, 2),
  typedArrayEncoder(70, 4),
  typedArrayEncoder(71, 8),
  typedArrayEncoder(72, 1),
  typedArrayEncoder(77, 2),
  typedArrayEncoder(78, 4),
  typedArrayEncoder(79, 8),
  typedArrayEncoder(85, 4),
  typedArrayEncoder(86, 8),
  {
    encode(sharedData, encode2) {
      let packedValues2 = sharedData.packedValues || [];
      let sharedStructures = sharedData.structures || [];
      if (packedValues2.values.length > 0) {
        target[position2++] = 216;
        target[position2++] = 51;
        writeArrayHeader(4);
        let valuesArray = packedValues2.values;
        encode2(valuesArray);
        writeArrayHeader(0);
        writeArrayHeader(0);
        packedObjectMap = Object.create(sharedPackedObjectMap || null);
        for (let i2 = 0, l = valuesArray.length; i2 < l; i2++) {
          packedObjectMap[valuesArray[i2]] = i2;
        }
      }
      if (sharedStructures) {
        targetView.setUint32(position2, 3655335424);
        position2 += 3;
        let definitions = sharedStructures.slice(0);
        definitions.unshift(57344);
        definitions.push(new Tag(sharedData.version, 1399353956));
        encode2(definitions);
      } else
        encode2(new Tag(sharedData.version, 1399353956));
    }
  }
];
function typedArrayEncoder(tag, size) {
  if (!isLittleEndianMachine2 && size > 1)
    tag -= 4;
  return {
    tag,
    encode: function writeExtBuffer(typedArray, encode2) {
      let length = typedArray.byteLength;
      let offset = typedArray.byteOffset || 0;
      let buffer = typedArray.buffer || typedArray;
      encode2(hasNodeBuffer ? Buffer2.from(buffer, offset, length) : new Uint8Array(buffer, offset, length));
    }
  };
}
function writeBuffer(buffer, makeRoom) {
  let length = buffer.byteLength;
  if (length < 24) {
    target[position2++] = 64 + length;
  } else if (length < 256) {
    target[position2++] = 88;
    target[position2++] = length;
  } else if (length < 65536) {
    target[position2++] = 89;
    target[position2++] = length >> 8;
    target[position2++] = length & 255;
  } else {
    target[position2++] = 90;
    targetView.setUint32(position2, length);
    position2 += 4;
  }
  if (position2 + length >= target.length) {
    makeRoom(position2 + length);
  }
  target.set(buffer.buffer ? buffer : new Uint8Array(buffer), position2);
  position2 += length;
}
function insertIds(serialized, idsToInsert) {
  let nextId;
  let distanceToMove = idsToInsert.length * 2;
  let lastEnd = serialized.length - distanceToMove;
  idsToInsert.sort((a2, b) => a2.offset > b.offset ? 1 : -1);
  for (let id = 0; id < idsToInsert.length; id++) {
    let referee = idsToInsert[id];
    referee.id = id;
    for (let position3 of referee.references) {
      serialized[position3++] = id >> 8;
      serialized[position3] = id & 255;
    }
  }
  while (nextId = idsToInsert.pop()) {
    let offset = nextId.offset;
    serialized.copyWithin(offset + distanceToMove, offset, lastEnd);
    distanceToMove -= 2;
    let position3 = offset + distanceToMove;
    serialized[position3++] = 216;
    serialized[position3++] = 28;
    lastEnd = offset;
  }
  return serialized;
}
function writeBundles(start, encode2) {
  targetView.setUint32(bundledStrings2.position + start, position2 - bundledStrings2.position - start + 1);
  let writeStrings = bundledStrings2;
  bundledStrings2 = null;
  encode2(writeStrings[0]);
  encode2(writeStrings[1]);
}
var defaultEncoder = new Encoder({ useRecords: false });
var encode = defaultEncoder.encode;
var encodeAsIterable = defaultEncoder.encodeAsIterable;
var encodeAsAsyncIterable = defaultEncoder.encodeAsAsyncIterable;
var { NEVER, ALWAYS, DECIMAL_ROUND, DECIMAL_FIT } = FLOAT32_OPTIONS;
var REUSE_BUFFER_MODE = 512;
var RESET_BUFFER_MODE = 1024;
var THROW_ON_ITERABLE = 2048;

// callbuffer.ts
var CallBuffer = class {
  buffer;
  ctrl;
  len;
  data;
  maxData;
  constructor(buf) {
    this.buffer = buf;
    this.ctrl = new Int32Array(this.buffer, 0, 2);
    this.len = new Int32Array(this.buffer, 4, 1);
    this.data = new Uint8Array(this.buffer, 8);
    this.maxData = this.buffer.byteLength - 8 - 16;
  }
  respond(value) {
    let buf;
    if (value instanceof Uint8Array) {
      const limit = Math.min(value.length, this.maxData);
      buf = encode(value.slice(0, limit));
    } else {
      buf = encode(value);
    }
    this.len[0] = buf.length;
    this.data.set(buf, 0);
    Atomics.store(this.ctrl, 0, 1);
    Atomics.notify(this.ctrl, 0);
  }
  call(method, params) {
    this.ctrl[0] = 0;
    params["method"] = method;
    postMessage(params);
    Atomics.wait(this.ctrl, 0, 0);
    return decode(this.data.slice(0, this.len[0]));
  }
};

// node_modules/@bjorn3/browser_wasi_shim/dist/wasi_defs.js
var wasi_defs_exports = {};
__export(wasi_defs_exports, {
  ADVICE_DONTNEED: () => ADVICE_DONTNEED,
  ADVICE_NOREUSE: () => ADVICE_NOREUSE,
  ADVICE_NORMAL: () => ADVICE_NORMAL,
  ADVICE_RANDOM: () => ADVICE_RANDOM,
  ADVICE_SEQUENTIAL: () => ADVICE_SEQUENTIAL,
  ADVICE_WILLNEED: () => ADVICE_WILLNEED,
  CLOCKID_MONOTONIC: () => CLOCKID_MONOTONIC,
  CLOCKID_PROCESS_CPUTIME_ID: () => CLOCKID_PROCESS_CPUTIME_ID,
  CLOCKID_REALTIME: () => CLOCKID_REALTIME,
  CLOCKID_THREAD_CPUTIME_ID: () => CLOCKID_THREAD_CPUTIME_ID,
  Ciovec: () => Ciovec,
  Dirent: () => Dirent,
  ERRNO_2BIG: () => ERRNO_2BIG,
  ERRNO_ACCES: () => ERRNO_ACCES,
  ERRNO_ADDRINUSE: () => ERRNO_ADDRINUSE,
  ERRNO_ADDRNOTAVAIL: () => ERRNO_ADDRNOTAVAIL,
  ERRNO_AFNOSUPPORT: () => ERRNO_AFNOSUPPORT,
  ERRNO_AGAIN: () => ERRNO_AGAIN,
  ERRNO_ALREADY: () => ERRNO_ALREADY,
  ERRNO_BADF: () => ERRNO_BADF,
  ERRNO_BADMSG: () => ERRNO_BADMSG,
  ERRNO_BUSY: () => ERRNO_BUSY,
  ERRNO_CANCELED: () => ERRNO_CANCELED,
  ERRNO_CHILD: () => ERRNO_CHILD,
  ERRNO_CONNABORTED: () => ERRNO_CONNABORTED,
  ERRNO_CONNREFUSED: () => ERRNO_CONNREFUSED,
  ERRNO_CONNRESET: () => ERRNO_CONNRESET,
  ERRNO_DEADLK: () => ERRNO_DEADLK,
  ERRNO_DESTADDRREQ: () => ERRNO_DESTADDRREQ,
  ERRNO_DOM: () => ERRNO_DOM,
  ERRNO_DQUOT: () => ERRNO_DQUOT,
  ERRNO_EXIST: () => ERRNO_EXIST,
  ERRNO_FAULT: () => ERRNO_FAULT,
  ERRNO_FBIG: () => ERRNO_FBIG,
  ERRNO_HOSTUNREACH: () => ERRNO_HOSTUNREACH,
  ERRNO_IDRM: () => ERRNO_IDRM,
  ERRNO_ILSEQ: () => ERRNO_ILSEQ,
  ERRNO_INPROGRESS: () => ERRNO_INPROGRESS,
  ERRNO_INTR: () => ERRNO_INTR,
  ERRNO_INVAL: () => ERRNO_INVAL,
  ERRNO_IO: () => ERRNO_IO,
  ERRNO_ISCONN: () => ERRNO_ISCONN,
  ERRNO_ISDIR: () => ERRNO_ISDIR,
  ERRNO_LOOP: () => ERRNO_LOOP,
  ERRNO_MFILE: () => ERRNO_MFILE,
  ERRNO_MLINK: () => ERRNO_MLINK,
  ERRNO_MSGSIZE: () => ERRNO_MSGSIZE,
  ERRNO_MULTIHOP: () => ERRNO_MULTIHOP,
  ERRNO_NAMETOOLONG: () => ERRNO_NAMETOOLONG,
  ERRNO_NETDOWN: () => ERRNO_NETDOWN,
  ERRNO_NETRESET: () => ERRNO_NETRESET,
  ERRNO_NETUNREACH: () => ERRNO_NETUNREACH,
  ERRNO_NFILE: () => ERRNO_NFILE,
  ERRNO_NOBUFS: () => ERRNO_NOBUFS,
  ERRNO_NODEV: () => ERRNO_NODEV,
  ERRNO_NOENT: () => ERRNO_NOENT,
  ERRNO_NOEXEC: () => ERRNO_NOEXEC,
  ERRNO_NOLCK: () => ERRNO_NOLCK,
  ERRNO_NOLINK: () => ERRNO_NOLINK,
  ERRNO_NOMEM: () => ERRNO_NOMEM,
  ERRNO_NOMSG: () => ERRNO_NOMSG,
  ERRNO_NOPROTOOPT: () => ERRNO_NOPROTOOPT,
  ERRNO_NOSPC: () => ERRNO_NOSPC,
  ERRNO_NOSYS: () => ERRNO_NOSYS,
  ERRNO_NOTCAPABLE: () => ERRNO_NOTCAPABLE,
  ERRNO_NOTCONN: () => ERRNO_NOTCONN,
  ERRNO_NOTDIR: () => ERRNO_NOTDIR,
  ERRNO_NOTEMPTY: () => ERRNO_NOTEMPTY,
  ERRNO_NOTRECOVERABLE: () => ERRNO_NOTRECOVERABLE,
  ERRNO_NOTSOCK: () => ERRNO_NOTSOCK,
  ERRNO_NOTSUP: () => ERRNO_NOTSUP,
  ERRNO_NOTTY: () => ERRNO_NOTTY,
  ERRNO_NXIO: () => ERRNO_NXIO,
  ERRNO_OVERFLOW: () => ERRNO_OVERFLOW,
  ERRNO_OWNERDEAD: () => ERRNO_OWNERDEAD,
  ERRNO_PERM: () => ERRNO_PERM,
  ERRNO_PIPE: () => ERRNO_PIPE,
  ERRNO_PROTO: () => ERRNO_PROTO,
  ERRNO_PROTONOSUPPORT: () => ERRNO_PROTONOSUPPORT,
  ERRNO_PROTOTYPE: () => ERRNO_PROTOTYPE,
  ERRNO_RANGE: () => ERRNO_RANGE,
  ERRNO_ROFS: () => ERRNO_ROFS,
  ERRNO_SPIPE: () => ERRNO_SPIPE,
  ERRNO_SRCH: () => ERRNO_SRCH,
  ERRNO_STALE: () => ERRNO_STALE,
  ERRNO_SUCCESS: () => ERRNO_SUCCESS,
  ERRNO_TIMEDOUT: () => ERRNO_TIMEDOUT,
  ERRNO_TXTBSY: () => ERRNO_TXTBSY,
  ERRNO_XDEV: () => ERRNO_XDEV,
  EVENTRWFLAGS_FD_READWRITE_HANGUP: () => EVENTRWFLAGS_FD_READWRITE_HANGUP,
  EVENTTYPE_CLOCK: () => EVENTTYPE_CLOCK,
  EVENTTYPE_FD_READ: () => EVENTTYPE_FD_READ,
  EVENTTYPE_FD_WRITE: () => EVENTTYPE_FD_WRITE,
  FDFLAGS_APPEND: () => FDFLAGS_APPEND,
  FDFLAGS_DSYNC: () => FDFLAGS_DSYNC,
  FDFLAGS_NONBLOCK: () => FDFLAGS_NONBLOCK,
  FDFLAGS_RSYNC: () => FDFLAGS_RSYNC,
  FDFLAGS_SYNC: () => FDFLAGS_SYNC,
  FD_STDERR: () => FD_STDERR,
  FD_STDIN: () => FD_STDIN,
  FD_STDOUT: () => FD_STDOUT,
  FILETYPE_BLOCK_DEVICE: () => FILETYPE_BLOCK_DEVICE,
  FILETYPE_CHARACTER_DEVICE: () => FILETYPE_CHARACTER_DEVICE,
  FILETYPE_DIRECTORY: () => FILETYPE_DIRECTORY,
  FILETYPE_REGULAR_FILE: () => FILETYPE_REGULAR_FILE,
  FILETYPE_SOCKET_DGRAM: () => FILETYPE_SOCKET_DGRAM,
  FILETYPE_SOCKET_STREAM: () => FILETYPE_SOCKET_STREAM,
  FILETYPE_SYMBOLIC_LINK: () => FILETYPE_SYMBOLIC_LINK,
  FILETYPE_UNKNOWN: () => FILETYPE_UNKNOWN,
  FSTFLAGS_ATIM: () => FSTFLAGS_ATIM,
  FSTFLAGS_ATIM_NOW: () => FSTFLAGS_ATIM_NOW,
  FSTFLAGS_MTIM: () => FSTFLAGS_MTIM,
  FSTFLAGS_MTIM_NOW: () => FSTFLAGS_MTIM_NOW,
  Fdstat: () => Fdstat,
  Filestat: () => Filestat,
  Iovec: () => Iovec,
  OFLAGS_CREAT: () => OFLAGS_CREAT,
  OFLAGS_DIRECTORY: () => OFLAGS_DIRECTORY,
  OFLAGS_EXCL: () => OFLAGS_EXCL,
  OFLAGS_TRUNC: () => OFLAGS_TRUNC,
  PREOPENTYPE_DIR: () => PREOPENTYPE_DIR,
  Prestat: () => Prestat,
  PrestatDir: () => PrestatDir,
  RIFLAGS_RECV_PEEK: () => RIFLAGS_RECV_PEEK,
  RIFLAGS_RECV_WAITALL: () => RIFLAGS_RECV_WAITALL,
  RIGHTS_FD_ADVISE: () => RIGHTS_FD_ADVISE,
  RIGHTS_FD_ALLOCATE: () => RIGHTS_FD_ALLOCATE,
  RIGHTS_FD_DATASYNC: () => RIGHTS_FD_DATASYNC,
  RIGHTS_FD_FDSTAT_SET_FLAGS: () => RIGHTS_FD_FDSTAT_SET_FLAGS,
  RIGHTS_FD_FILESTAT_GET: () => RIGHTS_FD_FILESTAT_GET,
  RIGHTS_FD_FILESTAT_SET_SIZE: () => RIGHTS_FD_FILESTAT_SET_SIZE,
  RIGHTS_FD_FILESTAT_SET_TIMES: () => RIGHTS_FD_FILESTAT_SET_TIMES,
  RIGHTS_FD_READ: () => RIGHTS_FD_READ,
  RIGHTS_FD_READDIR: () => RIGHTS_FD_READDIR,
  RIGHTS_FD_SEEK: () => RIGHTS_FD_SEEK,
  RIGHTS_FD_SYNC: () => RIGHTS_FD_SYNC,
  RIGHTS_FD_TELL: () => RIGHTS_FD_TELL,
  RIGHTS_FD_WRITE: () => RIGHTS_FD_WRITE,
  RIGHTS_PATH_CREATE_DIRECTORY: () => RIGHTS_PATH_CREATE_DIRECTORY,
  RIGHTS_PATH_CREATE_FILE: () => RIGHTS_PATH_CREATE_FILE,
  RIGHTS_PATH_FILESTAT_GET: () => RIGHTS_PATH_FILESTAT_GET,
  RIGHTS_PATH_FILESTAT_SET_SIZE: () => RIGHTS_PATH_FILESTAT_SET_SIZE,
  RIGHTS_PATH_FILESTAT_SET_TIMES: () => RIGHTS_PATH_FILESTAT_SET_TIMES,
  RIGHTS_PATH_LINK_SOURCE: () => RIGHTS_PATH_LINK_SOURCE,
  RIGHTS_PATH_LINK_TARGET: () => RIGHTS_PATH_LINK_TARGET,
  RIGHTS_PATH_OPEN: () => RIGHTS_PATH_OPEN,
  RIGHTS_PATH_READLINK: () => RIGHTS_PATH_READLINK,
  RIGHTS_PATH_REMOVE_DIRECTORY: () => RIGHTS_PATH_REMOVE_DIRECTORY,
  RIGHTS_PATH_RENAME_SOURCE: () => RIGHTS_PATH_RENAME_SOURCE,
  RIGHTS_PATH_RENAME_TARGET: () => RIGHTS_PATH_RENAME_TARGET,
  RIGHTS_PATH_SYMLINK: () => RIGHTS_PATH_SYMLINK,
  RIGHTS_PATH_UNLINK_FILE: () => RIGHTS_PATH_UNLINK_FILE,
  RIGHTS_POLL_FD_READWRITE: () => RIGHTS_POLL_FD_READWRITE,
  RIGHTS_SOCK_SHUTDOWN: () => RIGHTS_SOCK_SHUTDOWN,
  ROFLAGS_RECV_DATA_TRUNCATED: () => ROFLAGS_RECV_DATA_TRUNCATED,
  SDFLAGS_RD: () => SDFLAGS_RD,
  SDFLAGS_WR: () => SDFLAGS_WR,
  SIGNAL_ABRT: () => SIGNAL_ABRT,
  SIGNAL_ALRM: () => SIGNAL_ALRM,
  SIGNAL_BUS: () => SIGNAL_BUS,
  SIGNAL_CHLD: () => SIGNAL_CHLD,
  SIGNAL_CONT: () => SIGNAL_CONT,
  SIGNAL_FPE: () => SIGNAL_FPE,
  SIGNAL_HUP: () => SIGNAL_HUP,
  SIGNAL_ILL: () => SIGNAL_ILL,
  SIGNAL_INT: () => SIGNAL_INT,
  SIGNAL_KILL: () => SIGNAL_KILL,
  SIGNAL_NONE: () => SIGNAL_NONE,
  SIGNAL_PIPE: () => SIGNAL_PIPE,
  SIGNAL_POLL: () => SIGNAL_POLL,
  SIGNAL_PROF: () => SIGNAL_PROF,
  SIGNAL_PWR: () => SIGNAL_PWR,
  SIGNAL_QUIT: () => SIGNAL_QUIT,
  SIGNAL_SEGV: () => SIGNAL_SEGV,
  SIGNAL_STOP: () => SIGNAL_STOP,
  SIGNAL_SYS: () => SIGNAL_SYS,
  SIGNAL_TERM: () => SIGNAL_TERM,
  SIGNAL_TRAP: () => SIGNAL_TRAP,
  SIGNAL_TSTP: () => SIGNAL_TSTP,
  SIGNAL_TTIN: () => SIGNAL_TTIN,
  SIGNAL_TTOU: () => SIGNAL_TTOU,
  SIGNAL_URG: () => SIGNAL_URG,
  SIGNAL_USR1: () => SIGNAL_USR1,
  SIGNAL_USR2: () => SIGNAL_USR2,
  SIGNAL_VTALRM: () => SIGNAL_VTALRM,
  SIGNAL_WINCH: () => SIGNAL_WINCH,
  SIGNAL_XCPU: () => SIGNAL_XCPU,
  SIGNAL_XFSZ: () => SIGNAL_XFSZ,
  SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME: () => SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME,
  WHENCE_CUR: () => WHENCE_CUR,
  WHENCE_END: () => WHENCE_END,
  WHENCE_SET: () => WHENCE_SET
});
var FD_STDIN = 0;
var FD_STDOUT = 1;
var FD_STDERR = 2;
var CLOCKID_REALTIME = 0;
var CLOCKID_MONOTONIC = 1;
var CLOCKID_PROCESS_CPUTIME_ID = 2;
var CLOCKID_THREAD_CPUTIME_ID = 3;
var ERRNO_SUCCESS = 0;
var ERRNO_2BIG = 1;
var ERRNO_ACCES = 2;
var ERRNO_ADDRINUSE = 3;
var ERRNO_ADDRNOTAVAIL = 4;
var ERRNO_AFNOSUPPORT = 5;
var ERRNO_AGAIN = 6;
var ERRNO_ALREADY = 7;
var ERRNO_BADF = 8;
var ERRNO_BADMSG = 9;
var ERRNO_BUSY = 10;
var ERRNO_CANCELED = 11;
var ERRNO_CHILD = 12;
var ERRNO_CONNABORTED = 13;
var ERRNO_CONNREFUSED = 14;
var ERRNO_CONNRESET = 15;
var ERRNO_DEADLK = 16;
var ERRNO_DESTADDRREQ = 17;
var ERRNO_DOM = 18;
var ERRNO_DQUOT = 19;
var ERRNO_EXIST = 20;
var ERRNO_FAULT = 21;
var ERRNO_FBIG = 22;
var ERRNO_HOSTUNREACH = 23;
var ERRNO_IDRM = 24;
var ERRNO_ILSEQ = 25;
var ERRNO_INPROGRESS = 26;
var ERRNO_INTR = 27;
var ERRNO_INVAL = 28;
var ERRNO_IO = 29;
var ERRNO_ISCONN = 30;
var ERRNO_ISDIR = 31;
var ERRNO_LOOP = 32;
var ERRNO_MFILE = 33;
var ERRNO_MLINK = 34;
var ERRNO_MSGSIZE = 35;
var ERRNO_MULTIHOP = 36;
var ERRNO_NAMETOOLONG = 37;
var ERRNO_NETDOWN = 38;
var ERRNO_NETRESET = 39;
var ERRNO_NETUNREACH = 40;
var ERRNO_NFILE = 41;
var ERRNO_NOBUFS = 42;
var ERRNO_NODEV = 43;
var ERRNO_NOENT = 44;
var ERRNO_NOEXEC = 45;
var ERRNO_NOLCK = 46;
var ERRNO_NOLINK = 47;
var ERRNO_NOMEM = 48;
var ERRNO_NOMSG = 49;
var ERRNO_NOPROTOOPT = 50;
var ERRNO_NOSPC = 51;
var ERRNO_NOSYS = 52;
var ERRNO_NOTCONN = 53;
var ERRNO_NOTDIR = 54;
var ERRNO_NOTEMPTY = 55;
var ERRNO_NOTRECOVERABLE = 56;
var ERRNO_NOTSOCK = 57;
var ERRNO_NOTSUP = 58;
var ERRNO_NOTTY = 59;
var ERRNO_NXIO = 60;
var ERRNO_OVERFLOW = 61;
var ERRNO_OWNERDEAD = 62;
var ERRNO_PERM = 63;
var ERRNO_PIPE = 64;
var ERRNO_PROTO = 65;
var ERRNO_PROTONOSUPPORT = 66;
var ERRNO_PROTOTYPE = 67;
var ERRNO_RANGE = 68;
var ERRNO_ROFS = 69;
var ERRNO_SPIPE = 70;
var ERRNO_SRCH = 71;
var ERRNO_STALE = 72;
var ERRNO_TIMEDOUT = 73;
var ERRNO_TXTBSY = 74;
var ERRNO_XDEV = 75;
var ERRNO_NOTCAPABLE = 76;
var RIGHTS_FD_DATASYNC = 1 << 0;
var RIGHTS_FD_READ = 1 << 1;
var RIGHTS_FD_SEEK = 1 << 2;
var RIGHTS_FD_FDSTAT_SET_FLAGS = 1 << 3;
var RIGHTS_FD_SYNC = 1 << 4;
var RIGHTS_FD_TELL = 1 << 5;
var RIGHTS_FD_WRITE = 1 << 6;
var RIGHTS_FD_ADVISE = 1 << 7;
var RIGHTS_FD_ALLOCATE = 1 << 8;
var RIGHTS_PATH_CREATE_DIRECTORY = 1 << 9;
var RIGHTS_PATH_CREATE_FILE = 1 << 10;
var RIGHTS_PATH_LINK_SOURCE = 1 << 11;
var RIGHTS_PATH_LINK_TARGET = 1 << 12;
var RIGHTS_PATH_OPEN = 1 << 13;
var RIGHTS_FD_READDIR = 1 << 14;
var RIGHTS_PATH_READLINK = 1 << 15;
var RIGHTS_PATH_RENAME_SOURCE = 1 << 16;
var RIGHTS_PATH_RENAME_TARGET = 1 << 17;
var RIGHTS_PATH_FILESTAT_GET = 1 << 18;
var RIGHTS_PATH_FILESTAT_SET_SIZE = 1 << 19;
var RIGHTS_PATH_FILESTAT_SET_TIMES = 1 << 20;
var RIGHTS_FD_FILESTAT_GET = 1 << 21;
var RIGHTS_FD_FILESTAT_SET_SIZE = 1 << 22;
var RIGHTS_FD_FILESTAT_SET_TIMES = 1 << 23;
var RIGHTS_PATH_SYMLINK = 1 << 24;
var RIGHTS_PATH_REMOVE_DIRECTORY = 1 << 25;
var RIGHTS_PATH_UNLINK_FILE = 1 << 26;
var RIGHTS_POLL_FD_READWRITE = 1 << 27;
var RIGHTS_SOCK_SHUTDOWN = 1 << 28;
var Iovec = class _Iovec {
  static read_bytes(view, ptr) {
    const iovec = new _Iovec();
    iovec.buf = view.getUint32(ptr, true);
    iovec.buf_len = view.getUint32(ptr + 4, true);
    return iovec;
  }
  static read_bytes_array(view, ptr, len) {
    const iovecs = [];
    for (let i2 = 0; i2 < len; i2++) {
      iovecs.push(_Iovec.read_bytes(view, ptr + 8 * i2));
    }
    return iovecs;
  }
};
var Ciovec = class _Ciovec {
  static read_bytes(view, ptr) {
    const iovec = new _Ciovec();
    iovec.buf = view.getUint32(ptr, true);
    iovec.buf_len = view.getUint32(ptr + 4, true);
    return iovec;
  }
  static read_bytes_array(view, ptr, len) {
    const iovecs = [];
    for (let i2 = 0; i2 < len; i2++) {
      iovecs.push(_Ciovec.read_bytes(view, ptr + 8 * i2));
    }
    return iovecs;
  }
};
var WHENCE_SET = 0;
var WHENCE_CUR = 1;
var WHENCE_END = 2;
var FILETYPE_UNKNOWN = 0;
var FILETYPE_BLOCK_DEVICE = 1;
var FILETYPE_CHARACTER_DEVICE = 2;
var FILETYPE_DIRECTORY = 3;
var FILETYPE_REGULAR_FILE = 4;
var FILETYPE_SOCKET_DGRAM = 5;
var FILETYPE_SOCKET_STREAM = 6;
var FILETYPE_SYMBOLIC_LINK = 7;
var Dirent = class {
  head_length() {
    return 24;
  }
  name_length() {
    return this.dir_name.byteLength;
  }
  write_head_bytes(view, ptr) {
    view.setBigUint64(ptr, this.d_next, true);
    view.setBigUint64(ptr + 8, this.d_ino, true);
    view.setUint32(ptr + 16, this.dir_name.length, true);
    view.setUint8(ptr + 20, this.d_type);
  }
  write_name_bytes(view8, ptr, buf_len) {
    view8.set(this.dir_name.slice(0, Math.min(this.dir_name.byteLength, buf_len)), ptr);
  }
  constructor(next_cookie, d_ino, name, type) {
    const encoded_name = new TextEncoder().encode(name);
    this.d_next = next_cookie;
    this.d_ino = d_ino;
    this.d_namlen = encoded_name.byteLength;
    this.d_type = type;
    this.dir_name = encoded_name;
  }
};
var ADVICE_NORMAL = 0;
var ADVICE_SEQUENTIAL = 1;
var ADVICE_RANDOM = 2;
var ADVICE_WILLNEED = 3;
var ADVICE_DONTNEED = 4;
var ADVICE_NOREUSE = 5;
var FDFLAGS_APPEND = 1 << 0;
var FDFLAGS_DSYNC = 1 << 1;
var FDFLAGS_NONBLOCK = 1 << 2;
var FDFLAGS_RSYNC = 1 << 3;
var FDFLAGS_SYNC = 1 << 4;
var Fdstat = class {
  write_bytes(view, ptr) {
    view.setUint8(ptr, this.fs_filetype);
    view.setUint16(ptr + 2, this.fs_flags, true);
    view.setBigUint64(ptr + 8, this.fs_rights_base, true);
    view.setBigUint64(ptr + 16, this.fs_rights_inherited, true);
  }
  constructor(filetype, flags) {
    this.fs_rights_base = 0n;
    this.fs_rights_inherited = 0n;
    this.fs_filetype = filetype;
    this.fs_flags = flags;
  }
};
var FSTFLAGS_ATIM = 1 << 0;
var FSTFLAGS_ATIM_NOW = 1 << 1;
var FSTFLAGS_MTIM = 1 << 2;
var FSTFLAGS_MTIM_NOW = 1 << 3;
var OFLAGS_CREAT = 1 << 0;
var OFLAGS_DIRECTORY = 1 << 1;
var OFLAGS_EXCL = 1 << 2;
var OFLAGS_TRUNC = 1 << 3;
var Filestat = class {
  write_bytes(view, ptr) {
    view.setBigUint64(ptr, this.dev, true);
    view.setBigUint64(ptr + 8, this.ino, true);
    view.setUint8(ptr + 16, this.filetype);
    view.setBigUint64(ptr + 24, this.nlink, true);
    view.setBigUint64(ptr + 32, this.size, true);
    view.setBigUint64(ptr + 38, this.atim, true);
    view.setBigUint64(ptr + 46, this.mtim, true);
    view.setBigUint64(ptr + 52, this.ctim, true);
  }
  constructor(ino, filetype, size) {
    this.dev = 0n;
    this.nlink = 0n;
    this.atim = 0n;
    this.mtim = 0n;
    this.ctim = 0n;
    this.ino = ino;
    this.filetype = filetype;
    this.size = size;
  }
};
var EVENTTYPE_CLOCK = 0;
var EVENTTYPE_FD_READ = 1;
var EVENTTYPE_FD_WRITE = 2;
var EVENTRWFLAGS_FD_READWRITE_HANGUP = 1 << 0;
var SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME = 1 << 0;
var SIGNAL_NONE = 0;
var SIGNAL_HUP = 1;
var SIGNAL_INT = 2;
var SIGNAL_QUIT = 3;
var SIGNAL_ILL = 4;
var SIGNAL_TRAP = 5;
var SIGNAL_ABRT = 6;
var SIGNAL_BUS = 7;
var SIGNAL_FPE = 8;
var SIGNAL_KILL = 9;
var SIGNAL_USR1 = 10;
var SIGNAL_SEGV = 11;
var SIGNAL_USR2 = 12;
var SIGNAL_PIPE = 13;
var SIGNAL_ALRM = 14;
var SIGNAL_TERM = 15;
var SIGNAL_CHLD = 16;
var SIGNAL_CONT = 17;
var SIGNAL_STOP = 18;
var SIGNAL_TSTP = 19;
var SIGNAL_TTIN = 20;
var SIGNAL_TTOU = 21;
var SIGNAL_URG = 22;
var SIGNAL_XCPU = 23;
var SIGNAL_XFSZ = 24;
var SIGNAL_VTALRM = 25;
var SIGNAL_PROF = 26;
var SIGNAL_WINCH = 27;
var SIGNAL_POLL = 28;
var SIGNAL_PWR = 29;
var SIGNAL_SYS = 30;
var RIFLAGS_RECV_PEEK = 1 << 0;
var RIFLAGS_RECV_WAITALL = 1 << 1;
var ROFLAGS_RECV_DATA_TRUNCATED = 1 << 0;
var SDFLAGS_RD = 1 << 0;
var SDFLAGS_WR = 1 << 1;
var PREOPENTYPE_DIR = 0;
var PrestatDir = class {
  write_bytes(view, ptr) {
    view.setUint32(ptr, this.pr_name.byteLength, true);
  }
  constructor(name) {
    this.pr_name = new TextEncoder().encode(name);
  }
};
var Prestat = class _Prestat {
  static dir(name) {
    const prestat = new _Prestat();
    prestat.tag = PREOPENTYPE_DIR;
    prestat.inner = new PrestatDir(name);
    return prestat;
  }
  write_bytes(view, ptr) {
    view.setUint32(ptr, this.tag, true);
    this.inner.write_bytes(view, ptr + 4);
  }
};

// node_modules/@bjorn3/browser_wasi_shim/dist/debug.js
var Debug = class Debug2 {
  enable(enabled) {
    this.log = createLogger(enabled === void 0 ? true : enabled, this.prefix);
  }
  get enabled() {
    return this.isEnabled;
  }
  constructor(isEnabled) {
    this.isEnabled = isEnabled;
    this.prefix = "wasi:";
    this.enable(isEnabled);
  }
};
function createLogger(enabled, prefix) {
  if (enabled) {
    const a2 = console.log.bind(console, "%c%s", "color: #265BA0", prefix);
    return a2;
  } else {
    return () => {
    };
  }
}
var debug = new Debug(false);

// node_modules/@bjorn3/browser_wasi_shim/dist/wasi.js
var WASIProcExit = class extends Error {
  constructor(code) {
    super("exit with exit code " + code);
    this.code = code;
  }
};
var WASI = class WASI2 {
  start(instance) {
    this.inst = instance;
    try {
      instance.exports._start();
      return 0;
    } catch (e) {
      if (e instanceof WASIProcExit) {
        return e.code;
      } else {
        throw e;
      }
    }
  }
  initialize(instance) {
    this.inst = instance;
    if (instance.exports._initialize) {
      instance.exports._initialize();
    }
  }
  constructor(args, env, fds, options = {}) {
    this.args = [];
    this.env = [];
    this.fds = [];
    debug.enable(options.debug);
    this.args = args;
    this.env = env;
    this.fds = fds;
    const self = this;
    this.wasiImport = { args_sizes_get(argc, argv_buf_size) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      buffer.setUint32(argc, self.args.length, true);
      let buf_size = 0;
      for (const arg of self.args) {
        buf_size += arg.length + 1;
      }
      buffer.setUint32(argv_buf_size, buf_size, true);
      debug.log(buffer.getUint32(argc, true), buffer.getUint32(argv_buf_size, true));
      return 0;
    }, args_get(argv, argv_buf) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      const orig_argv_buf = argv_buf;
      for (let i2 = 0; i2 < self.args.length; i2++) {
        buffer.setUint32(argv, argv_buf, true);
        argv += 4;
        const arg = new TextEncoder().encode(self.args[i2]);
        buffer8.set(arg, argv_buf);
        buffer.setUint8(argv_buf + arg.length, 0);
        argv_buf += arg.length + 1;
      }
      if (debug.enabled) {
        debug.log(new TextDecoder("utf-8").decode(buffer8.slice(orig_argv_buf, argv_buf)));
      }
      return 0;
    }, environ_sizes_get(environ_count, environ_size) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      buffer.setUint32(environ_count, self.env.length, true);
      let buf_size = 0;
      for (const environ of self.env) {
        buf_size += environ.length + 1;
      }
      buffer.setUint32(environ_size, buf_size, true);
      debug.log(buffer.getUint32(environ_count, true), buffer.getUint32(environ_size, true));
      return 0;
    }, environ_get(environ, environ_buf) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      const orig_environ_buf = environ_buf;
      for (let i2 = 0; i2 < self.env.length; i2++) {
        buffer.setUint32(environ, environ_buf, true);
        environ += 4;
        const e = new TextEncoder().encode(self.env[i2]);
        buffer8.set(e, environ_buf);
        buffer.setUint8(environ_buf + e.length, 0);
        environ_buf += e.length + 1;
      }
      if (debug.enabled) {
        debug.log(new TextDecoder("utf-8").decode(buffer8.slice(orig_environ_buf, environ_buf)));
      }
      return 0;
    }, clock_res_get(id, res_ptr) {
      let resolutionValue;
      switch (id) {
        case CLOCKID_MONOTONIC: {
          resolutionValue = 5000n;
          break;
        }
        case CLOCKID_REALTIME: {
          resolutionValue = 1000000n;
          break;
        }
        default:
          return ERRNO_NOSYS;
      }
      const view = new DataView(self.inst.exports.memory.buffer);
      view.setBigUint64(res_ptr, resolutionValue, true);
      return ERRNO_SUCCESS;
    }, clock_time_get(id, precision, time) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      if (id === CLOCKID_REALTIME) {
        buffer.setBigUint64(time, BigInt((/* @__PURE__ */ new Date()).getTime()) * 1000000n, true);
      } else if (id == CLOCKID_MONOTONIC) {
        let monotonic_time;
        try {
          monotonic_time = BigInt(Math.round(performance.now() * 1e6));
        } catch (e) {
          monotonic_time = 0n;
        }
        buffer.setBigUint64(time, monotonic_time, true);
      } else {
        buffer.setBigUint64(time, 0n, true);
      }
      return 0;
    }, fd_advise(fd, offset, len, advice) {
      if (self.fds[fd] != void 0) {
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_allocate(fd, offset, len) {
      if (self.fds[fd] != void 0) {
        return self.fds[fd].fd_allocate(offset, len);
      } else {
        return ERRNO_BADF;
      }
    }, fd_close(fd) {
      if (self.fds[fd] != void 0) {
        const ret = self.fds[fd].fd_close();
        self.fds[fd] = void 0;
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_datasync(fd) {
      if (self.fds[fd] != void 0) {
        return self.fds[fd].fd_sync();
      } else {
        return ERRNO_BADF;
      }
    }, fd_fdstat_get(fd, fdstat_ptr) {
      if (self.fds[fd] != void 0) {
        const { ret, fdstat } = self.fds[fd].fd_fdstat_get();
        if (fdstat != null) {
          fdstat.write_bytes(new DataView(self.inst.exports.memory.buffer), fdstat_ptr);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_fdstat_set_flags(fd, flags) {
      if (self.fds[fd] != void 0) {
        return self.fds[fd].fd_fdstat_set_flags(flags);
      } else {
        return ERRNO_BADF;
      }
    }, fd_fdstat_set_rights(fd, fs_rights_base, fs_rights_inheriting) {
      if (self.fds[fd] != void 0) {
        return self.fds[fd].fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting);
      } else {
        return ERRNO_BADF;
      }
    }, fd_filestat_get(fd, filestat_ptr) {
      if (self.fds[fd] != void 0) {
        const { ret, filestat } = self.fds[fd].fd_filestat_get();
        if (filestat != null) {
          filestat.write_bytes(new DataView(self.inst.exports.memory.buffer), filestat_ptr);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_filestat_set_size(fd, size) {
      if (self.fds[fd] != void 0) {
        return self.fds[fd].fd_filestat_set_size(size);
      } else {
        return ERRNO_BADF;
      }
    }, fd_filestat_set_times(fd, atim, mtim, fst_flags) {
      if (self.fds[fd] != void 0) {
        return self.fds[fd].fd_filestat_set_times(atim, mtim, fst_flags);
      } else {
        return ERRNO_BADF;
      }
    }, fd_pread(fd, iovs_ptr, iovs_len, offset, nread_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
        let nread = 0;
        for (const iovec of iovecs) {
          const { ret, data } = self.fds[fd].fd_pread(iovec.buf_len, offset);
          if (ret != ERRNO_SUCCESS) {
            buffer.setUint32(nread_ptr, nread, true);
            return ret;
          }
          buffer8.set(data, iovec.buf);
          nread += data.length;
          offset += BigInt(data.length);
          if (data.length != iovec.buf_len) {
            break;
          }
        }
        buffer.setUint32(nread_ptr, nread, true);
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_prestat_get(fd, buf_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const { ret, prestat } = self.fds[fd].fd_prestat_get();
        if (prestat != null) {
          prestat.write_bytes(buffer, buf_ptr);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_prestat_dir_name(fd, path_ptr, path_len) {
      if (self.fds[fd] != void 0) {
        const { ret, prestat } = self.fds[fd].fd_prestat_get();
        if (prestat == null) {
          return ret;
        }
        const prestat_dir_name = prestat.inner.pr_name;
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        buffer8.set(prestat_dir_name.slice(0, path_len), path_ptr);
        return prestat_dir_name.byteLength > path_len ? ERRNO_NAMETOOLONG : ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_pwrite(fd, iovs_ptr, iovs_len, offset, nwritten_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
        let nwritten = 0;
        for (const iovec of iovecs) {
          const data = buffer8.slice(iovec.buf, iovec.buf + iovec.buf_len);
          const { ret, nwritten: nwritten_part } = self.fds[fd].fd_pwrite(data, offset);
          if (ret != ERRNO_SUCCESS) {
            buffer.setUint32(nwritten_ptr, nwritten, true);
            return ret;
          }
          nwritten += nwritten_part;
          offset += BigInt(nwritten_part);
          if (nwritten_part != data.byteLength) {
            break;
          }
        }
        buffer.setUint32(nwritten_ptr, nwritten, true);
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_read(fd, iovs_ptr, iovs_len, nread_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
        let nread = 0;
        for (const iovec of iovecs) {
          const { ret, data } = self.fds[fd].fd_read(iovec.buf_len);
          if (ret != ERRNO_SUCCESS) {
            buffer.setUint32(nread_ptr, nread, true);
            return ret;
          }
          buffer8.set(data, iovec.buf);
          nread += data.length;
          if (data.length != iovec.buf_len) {
            break;
          }
        }
        buffer.setUint32(nread_ptr, nread, true);
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_readdir(fd, buf, buf_len, cookie, bufused_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        let bufused = 0;
        while (true) {
          const { ret, dirent } = self.fds[fd].fd_readdir_single(cookie);
          if (ret != 0) {
            buffer.setUint32(bufused_ptr, bufused, true);
            return ret;
          }
          if (dirent == null) {
            break;
          }
          if (buf_len - bufused < dirent.head_length()) {
            bufused = buf_len;
            break;
          }
          const head_bytes = new ArrayBuffer(dirent.head_length());
          dirent.write_head_bytes(new DataView(head_bytes), 0);
          buffer8.set(new Uint8Array(head_bytes).slice(0, Math.min(head_bytes.byteLength, buf_len - bufused)), buf);
          buf += dirent.head_length();
          bufused += dirent.head_length();
          if (buf_len - bufused < dirent.name_length()) {
            bufused = buf_len;
            break;
          }
          dirent.write_name_bytes(buffer8, buf, buf_len - bufused);
          buf += dirent.name_length();
          bufused += dirent.name_length();
          cookie = dirent.d_next;
        }
        buffer.setUint32(bufused_ptr, bufused, true);
        return 0;
      } else {
        return ERRNO_BADF;
      }
    }, fd_renumber(fd, to) {
      if (self.fds[fd] != void 0 && self.fds[to] != void 0) {
        const ret = self.fds[to].fd_close();
        if (ret != 0) {
          return ret;
        }
        self.fds[to] = self.fds[fd];
        self.fds[fd] = void 0;
        return 0;
      } else {
        return ERRNO_BADF;
      }
    }, fd_seek(fd, offset, whence, offset_out_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const { ret, offset: offset_out } = self.fds[fd].fd_seek(offset, whence);
        buffer.setBigInt64(offset_out_ptr, offset_out, true);
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_sync(fd) {
      if (self.fds[fd] != void 0) {
        return self.fds[fd].fd_sync();
      } else {
        return ERRNO_BADF;
      }
    }, fd_tell(fd, offset_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const { ret, offset } = self.fds[fd].fd_tell();
        buffer.setBigUint64(offset_ptr, offset, true);
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_write(fd, iovs_ptr, iovs_len, nwritten_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
        let nwritten = 0;
        for (const iovec of iovecs) {
          const data = buffer8.slice(iovec.buf, iovec.buf + iovec.buf_len);
          const { ret, nwritten: nwritten_part } = self.fds[fd].fd_write(data);
          if (ret != ERRNO_SUCCESS) {
            buffer.setUint32(nwritten_ptr, nwritten, true);
            return ret;
          }
          nwritten += nwritten_part;
          if (nwritten_part != data.byteLength) {
            break;
          }
        }
        buffer.setUint32(nwritten_ptr, nwritten, true);
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, path_create_directory(fd, path_ptr, path_len) {
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        return self.fds[fd].path_create_directory(path);
      } else {
        return ERRNO_BADF;
      }
    }, path_filestat_get(fd, flags, path_ptr, path_len, filestat_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        const { ret, filestat } = self.fds[fd].path_filestat_get(flags, path);
        if (filestat != null) {
          filestat.write_bytes(buffer, filestat_ptr);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, path_filestat_set_times(fd, flags, path_ptr, path_len, atim, mtim, fst_flags) {
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        return self.fds[fd].path_filestat_set_times(flags, path, atim, mtim, fst_flags);
      } else {
        return ERRNO_BADF;
      }
    }, path_link(old_fd, old_flags, old_path_ptr, old_path_len, new_fd, new_path_ptr, new_path_len) {
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[old_fd] != void 0 && self.fds[new_fd] != void 0) {
        const old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
        const new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
        const { ret, inode_obj } = self.fds[old_fd].path_lookup(old_path, old_flags);
        if (inode_obj == null) {
          return ret;
        }
        return self.fds[new_fd].path_link(new_path, inode_obj, false);
      } else {
        return ERRNO_BADF;
      }
    }, path_open(fd, dirflags, path_ptr, path_len, oflags, fs_rights_base, fs_rights_inheriting, fd_flags, opened_fd_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        debug.log(path);
        const { ret, fd_obj } = self.fds[fd].path_open(dirflags, path, oflags, fs_rights_base, fs_rights_inheriting, fd_flags);
        if (ret != 0) {
          return ret;
        }
        self.fds.push(fd_obj);
        const opened_fd = self.fds.length - 1;
        buffer.setUint32(opened_fd_ptr, opened_fd, true);
        return 0;
      } else {
        return ERRNO_BADF;
      }
    }, path_readlink(fd, path_ptr, path_len, buf_ptr, buf_len, nread_ptr) {
      const buffer = new DataView(self.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        debug.log(path);
        const { ret, data } = self.fds[fd].path_readlink(path);
        if (data != null) {
          const data_buf = new TextEncoder().encode(data);
          if (data_buf.length > buf_len) {
            buffer.setUint32(nread_ptr, 0, true);
            return ERRNO_BADF;
          }
          buffer8.set(data_buf, buf_ptr);
          buffer.setUint32(nread_ptr, data_buf.length, true);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, path_remove_directory(fd, path_ptr, path_len) {
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        return self.fds[fd].path_remove_directory(path);
      } else {
        return ERRNO_BADF;
      }
    }, path_rename(fd, old_path_ptr, old_path_len, new_fd, new_path_ptr, new_path_len) {
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0 && self.fds[new_fd] != void 0) {
        const old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
        const new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
        let { ret, inode_obj } = self.fds[fd].path_unlink(old_path);
        if (inode_obj == null) {
          return ret;
        }
        ret = self.fds[new_fd].path_link(new_path, inode_obj, true);
        if (ret != ERRNO_SUCCESS) {
          if (self.fds[fd].path_link(old_path, inode_obj, true) != ERRNO_SUCCESS) {
            throw "path_link should always return success when relinking an inode back to the original place";
          }
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, path_symlink(old_path_ptr, old_path_len, fd, new_path_ptr, new_path_len) {
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
        const new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
        return ERRNO_NOTSUP;
      } else {
        return ERRNO_BADF;
      }
    }, path_unlink_file(fd, path_ptr, path_len) {
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
      if (self.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        return self.fds[fd].path_unlink_file(path);
      } else {
        return ERRNO_BADF;
      }
    }, poll_oneoff(in_, out, nsubscriptions) {
      throw "async io not supported";
    }, proc_exit(exit_code) {
      throw new WASIProcExit(exit_code);
    }, proc_raise(sig) {
      throw "raised signal " + sig;
    }, sched_yield() {
    }, random_get(buf, buf_len) {
      const buffer8 = new Uint8Array(self.inst.exports.memory.buffer).subarray(buf, buf + buf_len);
      if ("crypto" in globalThis && (typeof SharedArrayBuffer === "undefined" || !(self.inst.exports.memory.buffer instanceof SharedArrayBuffer))) {
        for (let i2 = 0; i2 < buf_len; i2 += 65536) {
          crypto.getRandomValues(buffer8.subarray(i2, i2 + 65536));
        }
      } else {
        for (let i2 = 0; i2 < buf_len; i2++) {
          buffer8[i2] = Math.random() * 256 | 0;
        }
      }
    }, sock_recv(fd, ri_data, ri_flags) {
      throw "sockets not supported";
    }, sock_send(fd, si_data, si_flags) {
      throw "sockets not supported";
    }, sock_shutdown(fd, how) {
      throw "sockets not supported";
    }, sock_accept(fd, flags) {
      throw "sockets not supported";
    } };
  }
};

// node_modules/@bjorn3/browser_wasi_shim/dist/fd.js
var Fd = class {
  fd_allocate(offset, len) {
    return ERRNO_NOTSUP;
  }
  fd_close() {
    return 0;
  }
  fd_fdstat_get() {
    return { ret: ERRNO_NOTSUP, fdstat: null };
  }
  fd_fdstat_set_flags(flags) {
    return ERRNO_NOTSUP;
  }
  fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting) {
    return ERRNO_NOTSUP;
  }
  fd_filestat_get() {
    return { ret: ERRNO_NOTSUP, filestat: null };
  }
  fd_filestat_set_size(size) {
    return ERRNO_NOTSUP;
  }
  fd_filestat_set_times(atim, mtim, fst_flags) {
    return ERRNO_NOTSUP;
  }
  fd_pread(size, offset) {
    return { ret: ERRNO_NOTSUP, data: new Uint8Array() };
  }
  fd_prestat_get() {
    return { ret: ERRNO_NOTSUP, prestat: null };
  }
  fd_pwrite(data, offset) {
    return { ret: ERRNO_NOTSUP, nwritten: 0 };
  }
  fd_read(size) {
    return { ret: ERRNO_NOTSUP, data: new Uint8Array() };
  }
  fd_readdir_single(cookie) {
    return { ret: ERRNO_NOTSUP, dirent: null };
  }
  fd_seek(offset, whence) {
    return { ret: ERRNO_NOTSUP, offset: 0n };
  }
  fd_sync() {
    return 0;
  }
  fd_tell() {
    return { ret: ERRNO_NOTSUP, offset: 0n };
  }
  fd_write(data) {
    return { ret: ERRNO_NOTSUP, nwritten: 0 };
  }
  path_create_directory(path) {
    return ERRNO_NOTSUP;
  }
  path_filestat_get(flags, path) {
    return { ret: ERRNO_NOTSUP, filestat: null };
  }
  path_filestat_set_times(flags, path, atim, mtim, fst_flags) {
    return ERRNO_NOTSUP;
  }
  path_link(path, inode, allow_dir) {
    return ERRNO_NOTSUP;
  }
  path_unlink(path) {
    return { ret: ERRNO_NOTSUP, inode_obj: null };
  }
  path_lookup(path, dirflags) {
    return { ret: ERRNO_NOTSUP, inode_obj: null };
  }
  path_open(dirflags, path, oflags, fs_rights_base, fs_rights_inheriting, fd_flags) {
    return { ret: ERRNO_NOTDIR, fd_obj: null };
  }
  path_readlink(path) {
    return { ret: ERRNO_NOTSUP, data: null };
  }
  path_remove_directory(path) {
    return ERRNO_NOTSUP;
  }
  path_rename(old_path, new_fd, new_path) {
    return ERRNO_NOTSUP;
  }
  path_unlink_file(path) {
    return ERRNO_NOTSUP;
  }
};
var Inode = class _Inode {
  static issue_ino() {
    return _Inode.next_ino++;
  }
  static root_ino() {
    return 0n;
  }
  constructor() {
    this.ino = _Inode.issue_ino();
  }
};
Inode.next_ino = 1n;

// node_modules/@bjorn3/browser_wasi_shim/dist/fs_mem.js
var OpenFile = class extends Fd {
  fd_allocate(offset, len) {
    if (this.file.size > offset + len) {
    } else {
      const new_data = new Uint8Array(Number(offset + len));
      new_data.set(this.file.data, 0);
      this.file.data = new_data;
    }
    return ERRNO_SUCCESS;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Fdstat(FILETYPE_REGULAR_FILE, 0) };
  }
  fd_filestat_set_size(size) {
    if (this.file.size > size) {
      this.file.data = new Uint8Array(this.file.data.buffer.slice(0, Number(size)));
    } else {
      const new_data = new Uint8Array(Number(size));
      new_data.set(this.file.data, 0);
      this.file.data = new_data;
    }
    return ERRNO_SUCCESS;
  }
  fd_read(size) {
    const slice = this.file.data.slice(Number(this.file_pos), Number(this.file_pos + BigInt(size)));
    this.file_pos += BigInt(slice.length);
    return { ret: 0, data: slice };
  }
  fd_pread(size, offset) {
    const slice = this.file.data.slice(Number(offset), Number(offset + BigInt(size)));
    return { ret: 0, data: slice };
  }
  fd_seek(offset, whence) {
    let calculated_offset;
    switch (whence) {
      case WHENCE_SET:
        calculated_offset = offset;
        break;
      case WHENCE_CUR:
        calculated_offset = this.file_pos + offset;
        break;
      case WHENCE_END:
        calculated_offset = BigInt(this.file.data.byteLength) + offset;
        break;
      default:
        return { ret: ERRNO_INVAL, offset: 0n };
    }
    if (calculated_offset < 0) {
      return { ret: ERRNO_INVAL, offset: 0n };
    }
    this.file_pos = calculated_offset;
    return { ret: 0, offset: this.file_pos };
  }
  fd_tell() {
    return { ret: 0, offset: this.file_pos };
  }
  fd_write(data) {
    if (this.file.readonly) return { ret: ERRNO_BADF, nwritten: 0 };
    if (this.file_pos + BigInt(data.byteLength) > this.file.size) {
      const old = this.file.data;
      this.file.data = new Uint8Array(Number(this.file_pos + BigInt(data.byteLength)));
      this.file.data.set(old);
    }
    this.file.data.set(data, Number(this.file_pos));
    this.file_pos += BigInt(data.byteLength);
    return { ret: 0, nwritten: data.byteLength };
  }
  fd_pwrite(data, offset) {
    if (this.file.readonly) return { ret: ERRNO_BADF, nwritten: 0 };
    if (offset + BigInt(data.byteLength) > this.file.size) {
      const old = this.file.data;
      this.file.data = new Uint8Array(Number(offset + BigInt(data.byteLength)));
      this.file.data.set(old);
    }
    this.file.data.set(data, Number(offset));
    return { ret: 0, nwritten: data.byteLength };
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.file.stat() };
  }
  constructor(file) {
    super();
    this.file_pos = 0n;
    this.file = file;
  }
};
var File = class extends Inode {
  path_open(oflags, fs_rights_base, fd_flags) {
    if (this.readonly && (fs_rights_base & BigInt(RIGHTS_FD_WRITE)) == BigInt(RIGHTS_FD_WRITE)) {
      return { ret: ERRNO_PERM, fd_obj: null };
    }
    if ((oflags & OFLAGS_TRUNC) == OFLAGS_TRUNC) {
      if (this.readonly) return { ret: ERRNO_PERM, fd_obj: null };
      this.data = new Uint8Array([]);
    }
    const file = new OpenFile(this);
    if (fd_flags & FDFLAGS_APPEND) file.fd_seek(0n, WHENCE_END);
    return { ret: ERRNO_SUCCESS, fd_obj: file };
  }
  get size() {
    return BigInt(this.data.byteLength);
  }
  stat() {
    return new Filestat(this.ino, FILETYPE_REGULAR_FILE, this.size);
  }
  constructor(data, options) {
    super();
    this.data = new Uint8Array(data);
    this.readonly = !!options?.readonly;
  }
};
var ConsoleStdout = class _ConsoleStdout extends Fd {
  fd_filestat_get() {
    const filestat = new Filestat(this.ino, FILETYPE_CHARACTER_DEVICE, BigInt(0));
    return { ret: 0, filestat };
  }
  fd_fdstat_get() {
    const fdstat = new Fdstat(FILETYPE_CHARACTER_DEVICE, 0);
    fdstat.fs_rights_base = BigInt(RIGHTS_FD_WRITE);
    return { ret: 0, fdstat };
  }
  fd_write(data) {
    this.write(data);
    return { ret: 0, nwritten: data.byteLength };
  }
  static lineBuffered(write) {
    const dec = new TextDecoder("utf-8", { fatal: false });
    let line_buf = "";
    return new _ConsoleStdout((buffer) => {
      line_buf += dec.decode(buffer, { stream: true });
      const lines = line_buf.split("\n");
      for (const [i2, line] of lines.entries()) {
        if (i2 < lines.length - 1) {
          write(line);
        } else {
          line_buf = line;
        }
      }
    });
  }
  constructor(write) {
    super();
    this.ino = Inode.issue_ino();
    this.write = write;
  }
};

// fs.ts
var File2 = class extends Inode {
  handle;
  readonly;
  // FIXME needs a close() method to be called after start() to release the underlying handle
  constructor(handle, options) {
    super();
    this.handle = handle;
    this.readonly = !!options?.readonly;
  }
  path_open(oflags, fs_rights_base, fd_flags) {
    if (this.readonly && (fs_rights_base & BigInt(wasi_defs_exports.RIGHTS_FD_WRITE)) == BigInt(wasi_defs_exports.RIGHTS_FD_WRITE)) {
      return { ret: wasi_defs_exports.ERRNO_PERM, fd_obj: null };
    }
    if ((oflags & wasi_defs_exports.OFLAGS_TRUNC) == wasi_defs_exports.OFLAGS_TRUNC) {
      if (this.readonly) return { ret: wasi_defs_exports.ERRNO_PERM, fd_obj: null };
      this.handle.truncate(0);
    }
    const file = new OpenFile2(this);
    if (fd_flags & wasi_defs_exports.FDFLAGS_APPEND) file.fd_seek(0n, wasi_defs_exports.WHENCE_END);
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, fd_obj: file };
  }
  get size() {
    return BigInt(this.handle.getSize());
  }
  stat() {
    return new wasi_defs_exports.Filestat(this.ino, wasi_defs_exports.FILETYPE_REGULAR_FILE, this.size);
  }
};
var OpenFile2 = class extends Fd {
  file;
  position = 0n;
  ino;
  constructor(file) {
    super();
    this.file = file;
    this.ino = Inode.issue_ino();
    this.file.handle.open();
  }
  fd_allocate(offset, len) {
    if (BigInt(this.file.handle.getSize()) > offset + len) {
    } else {
      this.file.handle.truncate(Number(offset + len));
    }
    return wasi_defs_exports.ERRNO_SUCCESS;
  }
  fd_fdstat_get() {
    const size = this.file.handle.getSize();
    const fdstat = new wasi_defs_exports.Fdstat(size > 0 ? wasi_defs_exports.FILETYPE_REGULAR_FILE : wasi_defs_exports.FILETYPE_CHARACTER_DEVICE, 0);
    if (!this.file.readonly) {
      fdstat.fs_rights_base = BigInt(wasi_defs_exports.RIGHTS_FD_WRITE);
    }
    return { ret: 0, fdstat };
  }
  fd_filestat_get() {
    const size = this.file.handle.getSize();
    return {
      ret: 0,
      filestat: new wasi_defs_exports.Filestat(
        this.ino,
        size > 0 ? wasi_defs_exports.FILETYPE_REGULAR_FILE : wasi_defs_exports.FILETYPE_CHARACTER_DEVICE,
        BigInt(size)
      )
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fd_filestat_set_size(size) {
    this.file.handle.truncate(Number(size));
    return wasi_defs_exports.ERRNO_SUCCESS;
  }
  fd_read(size) {
    const buf = new Uint8Array(size);
    const n = this.file.handle.read(buf, { at: Number(this.position) });
    this.position += BigInt(n);
    return { ret: 0, data: buf.slice(0, n) };
  }
  fd_seek(offset, whence) {
    let calculated_offset;
    switch (whence) {
      case wasi_defs_exports.WHENCE_SET:
        calculated_offset = BigInt(offset);
        break;
      case wasi_defs_exports.WHENCE_CUR:
        calculated_offset = this.position + BigInt(offset);
        break;
      case wasi_defs_exports.WHENCE_END:
        calculated_offset = BigInt(this.file.handle.getSize()) + BigInt(offset);
        break;
      default:
        return { ret: wasi_defs_exports.ERRNO_INVAL, offset: 0n };
    }
    if (calculated_offset < 0) {
      return { ret: wasi_defs_exports.ERRNO_INVAL, offset: 0n };
    }
    this.position = calculated_offset;
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, offset: this.position };
  }
  fd_write(data) {
    if (this.file.readonly) return { ret: wasi_defs_exports.ERRNO_BADF, nwritten: 0 };
    const n = this.file.handle.write(data, { at: Number(this.position) });
    this.position += BigInt(n);
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, nwritten: n };
  }
  fd_sync() {
    this.file.handle.flush();
    return wasi_defs_exports.ERRNO_SUCCESS;
  }
};
var OpenDirectory2 = class extends Fd {
  dir;
  constructor(dir) {
    super();
    this.dir = dir;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fd_seek(offset, whence) {
    return { ret: wasi_defs_exports.ERRNO_BADF, offset: 0n };
  }
  fd_tell() {
    return { ret: wasi_defs_exports.ERRNO_BADF, offset: 0n };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fd_allocate(offset, len) {
    return wasi_defs_exports.ERRNO_BADF;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new wasi_defs_exports.Fdstat(wasi_defs_exports.FILETYPE_DIRECTORY, 0) };
  }
  fd_readdir_single(cookie) {
    if (cookie == 0n) {
      return {
        ret: wasi_defs_exports.ERRNO_SUCCESS,
        dirent: new wasi_defs_exports.Dirent(1n, this.dir.ino, ".", wasi_defs_exports.FILETYPE_DIRECTORY)
      };
    } else if (cookie == 1n) {
      return {
        ret: wasi_defs_exports.ERRNO_SUCCESS,
        dirent: new wasi_defs_exports.Dirent(
          2n,
          this.dir.parent_ino(),
          "..",
          wasi_defs_exports.FILETYPE_DIRECTORY
        )
      };
    }
    if (cookie >= BigInt(this.dir.contents.size) + 2n) {
      return { ret: 0, dirent: null };
    }
    const [name, entry] = Array.from(this.dir.contents.entries())[Number(cookie - 2n)];
    return {
      ret: 0,
      dirent: new wasi_defs_exports.Dirent(
        cookie + 1n,
        entry.ino,
        name,
        entry.stat().filetype
      )
    };
  }
  path_filestat_get(flags, path_str) {
    const { ret: path_err, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_err, filestat: null };
    }
    const { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      return { ret, filestat: null };
    }
    return { ret: 0, filestat: entry.stat() };
  }
  path_lookup(path_str, dirflags) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, inode_obj: null };
    }
    const { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      return { ret, inode_obj: null };
    }
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, inode_obj: entry };
  }
  path_open(dirflags, path_str, oflags, fs_rights_base, fs_rights_inheriting, fd_flags) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, fd_obj: null };
    }
    let { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      if (ret != wasi_defs_exports.ERRNO_NOENT) {
        return { ret, fd_obj: null };
      }
      if ((oflags & wasi_defs_exports.OFLAGS_CREAT) == wasi_defs_exports.OFLAGS_CREAT) {
        const { ret: ret2, entry: new_entry } = this.dir.create_entry_for_path(
          path_str,
          (oflags & wasi_defs_exports.OFLAGS_DIRECTORY) == wasi_defs_exports.OFLAGS_DIRECTORY
        );
        if (new_entry == null) {
          return { ret: ret2, fd_obj: null };
        }
        entry = new_entry;
      } else {
        return { ret: wasi_defs_exports.ERRNO_NOENT, fd_obj: null };
      }
    } else if ((oflags & wasi_defs_exports.OFLAGS_EXCL) == wasi_defs_exports.OFLAGS_EXCL) {
      return { ret: wasi_defs_exports.ERRNO_EXIST, fd_obj: null };
    }
    if ((oflags & wasi_defs_exports.OFLAGS_DIRECTORY) == wasi_defs_exports.OFLAGS_DIRECTORY && entry.stat().filetype !== wasi_defs_exports.FILETYPE_DIRECTORY) {
      return { ret: wasi_defs_exports.ERRNO_NOTDIR, fd_obj: null };
    }
    return entry.path_open(oflags, fs_rights_base, fd_flags);
  }
  path_create_directory(path) {
    return this.path_open(
      0,
      path,
      wasi_defs_exports.OFLAGS_CREAT | wasi_defs_exports.OFLAGS_DIRECTORY,
      0n,
      0n,
      0
    ).ret;
  }
  path_link(path_str, inode, allow_dir) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    if (path.is_dir) {
      return wasi_defs_exports.ERRNO_NOENT;
    }
    const {
      ret: parent_ret,
      parent_entry,
      filename,
      entry
    } = this.dir.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return parent_ret;
    }
    if (entry != null) {
      const source_is_dir = inode.stat().filetype == wasi_defs_exports.FILETYPE_DIRECTORY;
      const target_is_dir = entry.stat().filetype == wasi_defs_exports.FILETYPE_DIRECTORY;
      if (source_is_dir && target_is_dir) {
        if (allow_dir && entry instanceof Directory2) {
          if (entry.contents.size == 0) {
          } else {
            return wasi_defs_exports.ERRNO_NOTEMPTY;
          }
        } else {
          return wasi_defs_exports.ERRNO_EXIST;
        }
      } else if (source_is_dir && !target_is_dir) {
        return wasi_defs_exports.ERRNO_NOTDIR;
      } else if (!source_is_dir && target_is_dir) {
        return wasi_defs_exports.ERRNO_ISDIR;
      } else if (inode.stat().filetype == wasi_defs_exports.FILETYPE_REGULAR_FILE && entry.stat().filetype == wasi_defs_exports.FILETYPE_REGULAR_FILE) {
      } else {
        return wasi_defs_exports.ERRNO_EXIST;
      }
    }
    if (!allow_dir && inode.stat().filetype == wasi_defs_exports.FILETYPE_DIRECTORY) {
      return wasi_defs_exports.ERRNO_PERM;
    }
    parent_entry.createLink(filename, inode);
    return wasi_defs_exports.ERRNO_SUCCESS;
  }
  path_unlink(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, inode_obj: null };
    }
    const {
      ret: parent_ret,
      parent_entry,
      filename,
      entry
    } = this.dir.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return { ret: parent_ret, inode_obj: null };
    }
    if (entry == null) {
      return { ret: wasi_defs_exports.ERRNO_NOENT, inode_obj: null };
    }
    parent_entry.removeEntry(filename);
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, inode_obj: entry };
  }
  path_unlink_file(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    const {
      ret: parent_ret,
      parent_entry,
      filename,
      entry
    } = this.dir.get_parent_dir_and_entry_for_path(path, false);
    if (parent_entry == null || filename == null || entry == null) {
      return parent_ret;
    }
    if (entry.stat().filetype === wasi_defs_exports.FILETYPE_DIRECTORY) {
      return wasi_defs_exports.ERRNO_ISDIR;
    }
    parent_entry.removeEntry(filename);
    return wasi_defs_exports.ERRNO_SUCCESS;
  }
  path_remove_directory(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    const {
      ret: parent_ret,
      parent_entry,
      filename,
      entry
    } = this.dir.get_parent_dir_and_entry_for_path(path, false);
    if (parent_entry == null || filename == null || entry == null) {
      return parent_ret;
    }
    if (!(entry instanceof Directory2) || entry.stat().filetype !== wasi_defs_exports.FILETYPE_DIRECTORY) {
      return wasi_defs_exports.ERRNO_NOTDIR;
    }
    entry.syncEntries();
    if (entry.contents.size !== 0) {
      return wasi_defs_exports.ERRNO_NOTEMPTY;
    }
    if (!parent_entry.removeEntry(filename)) {
      return wasi_defs_exports.ERRNO_NOENT;
    }
    return wasi_defs_exports.ERRNO_SUCCESS;
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.dir.stat() };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fd_filestat_set_size(size) {
    return wasi_defs_exports.ERRNO_BADF;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fd_read(size) {
    return { ret: wasi_defs_exports.ERRNO_BADF, data: new Uint8Array() };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fd_pread(size, offset) {
    return { ret: wasi_defs_exports.ERRNO_BADF, data: new Uint8Array() };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fd_write(data) {
    return { ret: wasi_defs_exports.ERRNO_BADF, nwritten: 0 };
  }
  fd_pwrite(data, offset) {
    return { ret: wasi_defs_exports.ERRNO_BADF, nwritten: 0 };
  }
};
var PreopenDirectory2 = class extends OpenDirectory2 {
  prestat_name;
  constructor(name, dir) {
    super(dir);
    this.prestat_name = name;
  }
  fd_prestat_get() {
    return {
      ret: 0,
      prestat: wasi_defs_exports.Prestat.dir(this.prestat_name)
    };
  }
};
var Path = class _Path {
  parts = [];
  is_dir = false;
  static from(path) {
    const self = new _Path();
    self.is_dir = path.endsWith("/");
    if (path.startsWith("/")) {
      return { ret: wasi_defs_exports.ERRNO_NOTCAPABLE, path: null };
    }
    if (path.includes("\0")) {
      return { ret: wasi_defs_exports.ERRNO_INVAL, path: null };
    }
    for (const component of path.split("/")) {
      if (component === "" || component === ".") {
        continue;
      }
      if (component === "..") {
        if (self.parts.pop() == void 0) {
          return { ret: wasi_defs_exports.ERRNO_NOTCAPABLE, path: null };
        }
        continue;
      }
      self.parts.push(component);
    }
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, path: self };
  }
  to_path_string() {
    let s = this.parts.join("/");
    if (this.is_dir) {
      s += "/";
    }
    return s;
  }
};
var Directory2 = class _Directory extends Inode {
  contents;
  parent = null;
  handle;
  constructor(handle) {
    super();
    this.handle = handle;
  }
  syncEntries() {
    this.contents = this.handle.readDir();
    for (const entry of this.contents.values()) {
      if (entry instanceof _Directory) {
        entry.parent = this;
      }
    }
  }
  removeEntry(name) {
    if (this.handle.removeEntry(name)) {
      return this.contents.delete(name);
    }
    return false;
  }
  createLink(name, entry) {
    if (this.handle.createLink(name, entry)) {
      this.contents.set(name, entry);
    }
  }
  createFile(name, entry) {
    if (this.handle.createFile(name, entry)) {
      this.contents.set(name, entry);
    }
  }
  createDirectory(name, entry) {
    if (this.handle.createDirectory(name, entry)) {
      this.contents.set(name, entry);
    }
  }
  parent_ino() {
    if (this.parent == null) {
      return Inode.root_ino();
    }
    return this.parent.ino;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  path_open(oflags, fs_rights_base, fd_flags) {
    this.syncEntries();
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, fd_obj: new OpenDirectory2(this) };
  }
  stat() {
    return new wasi_defs_exports.Filestat(this.ino, wasi_defs_exports.FILETYPE_DIRECTORY, 0n);
  }
  get_entry_for_path(path) {
    let entry = this;
    for (const component of path.parts) {
      if (!(entry instanceof _Directory)) {
        return { ret: wasi_defs_exports.ERRNO_NOTDIR, entry: null };
      }
      entry.syncEntries();
      const child = entry.contents.get(component);
      if (child !== void 0) {
        entry = child;
      } else {
        return { ret: wasi_defs_exports.ERRNO_NOENT, entry: null };
      }
    }
    if (path.is_dir) {
      if (entry.stat().filetype != wasi_defs_exports.FILETYPE_DIRECTORY) {
        return { ret: wasi_defs_exports.ERRNO_NOTDIR, entry: null };
      }
    }
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, entry };
  }
  get_parent_dir_and_entry_for_path(path, allow_undefined) {
    const filename = path.parts.pop();
    if (filename === void 0) {
      return {
        ret: wasi_defs_exports.ERRNO_INVAL,
        parent_entry: null,
        filename: null,
        entry: null
      };
    }
    const { ret: entry_ret, entry: parent_entry } = this.get_entry_for_path(path);
    if (parent_entry == null) {
      return {
        ret: entry_ret,
        parent_entry: null,
        filename: null,
        entry: null
      };
    }
    if (!(parent_entry instanceof _Directory)) {
      return {
        ret: wasi_defs_exports.ERRNO_NOTDIR,
        parent_entry: null,
        filename: null,
        entry: null
      };
    }
    parent_entry.syncEntries();
    const entry = parent_entry.contents.get(filename);
    if (entry === void 0) {
      if (!allow_undefined) {
        return {
          ret: wasi_defs_exports.ERRNO_NOENT,
          parent_entry: null,
          filename: null,
          entry: null
        };
      } else {
        return { ret: wasi_defs_exports.ERRNO_SUCCESS, parent_entry, filename, entry: null };
      }
    }
    if (path.is_dir) {
      if (entry.stat().filetype != wasi_defs_exports.FILETYPE_DIRECTORY) {
        return {
          ret: wasi_defs_exports.ERRNO_NOTDIR,
          parent_entry: null,
          filename: null,
          entry: null
        };
      }
    }
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, parent_entry, filename, entry };
  }
  create_entry_for_path(path_str, is_dir) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, entry: null };
    }
    let {
      // eslint-disable-next-line prefer-const
      ret: parent_ret,
      // eslint-disable-next-line prefer-const
      parent_entry,
      // eslint-disable-next-line prefer-const
      filename,
      entry
    } = this.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return { ret: parent_ret, entry: null };
    }
    if (entry != null) {
      return { ret: wasi_defs_exports.ERRNO_EXIST, entry: null };
    }
    let new_child;
    if (!is_dir) {
      new_child = parent_entry.handle.newEntry(filename, false);
      parent_entry.createFile(filename, new_child);
    } else {
      new_child = parent_entry.handle.newEntry(filename, true);
      parent_entry.createDirectory(filename, new_child);
    }
    entry = new_child;
    return { ret: wasi_defs_exports.ERRNO_SUCCESS, entry };
  }
};

// wanix.ts
var WanixHandle = class {
  caller;
  path;
  constructor(caller, path) {
    this.caller = caller;
    this.path = path;
  }
  subpath(path) {
    if (this.path === ".") {
      return path;
    }
    return [this.path, path].join("/");
  }
};
var FileHandle = class extends WanixHandle {
  fd;
  open() {
    this.fd = this.caller.call("path_open", { path: this.path });
  }
  close() {
    this.caller.call("fd_close", { fd: this.fd });
  }
  flush() {
    this.caller.call("fd_flush", { fd: this.fd });
  }
  read(buffer, options) {
    let at2 = 0;
    if (options?.at) {
      at2 = options.at;
    }
    const count = buffer.byteLength;
    const data = this.caller.call("fd_read", { fd: this.fd, count, at: at2 });
    let writeBuffer2;
    if (buffer instanceof ArrayBuffer) {
      writeBuffer2 = new Uint8Array(buffer);
    } else if (buffer instanceof Uint8Array) {
      writeBuffer2 = buffer;
    } else {
      throw new Error("Buffer must be ArrayBuffer or Uint8Array");
    }
    writeBuffer2.set(data, 0);
    return data.length;
  }
  write(buffer, options) {
    let at2 = 0;
    if (options?.at) {
      at2 = options.at;
    }
    const data = new Uint8Array(buffer);
    return this.caller.call("fd_write", { fd: this.fd, data, at: at2 });
  }
  truncate(to) {
    this.caller.call("path_truncate", { path: this.path, to });
  }
  getSize() {
    return this.caller.call("path_size", { path: this.path });
  }
};
var DirectoryHandle = class _DirectoryHandle extends WanixHandle {
  dirCache;
  lastReadDir;
  newEntry(name, isDir) {
    if (isDir) {
      const handle = new _DirectoryHandle(this.caller, this.subpath(name));
      return new Directory2(handle);
    } else {
      const handle = new FileHandle(this.caller, this.subpath(name));
      return new File2(handle);
    }
  }
  readDir() {
    if (performance.now() - this.lastReadDir < 1e3) {
      return this.dirCache;
    }
    this.lastReadDir = performance.now();
    const m = /* @__PURE__ */ new Map();
    const entries = this.caller.call("path_readdir", { path: this.path }) || [];
    for (const entry of entries) {
      let isDir = false;
      let name = entry;
      if (name.slice(-1) === "/") {
        isDir = true;
        name = name.slice(0, -1);
      }
      m.set(name, this.newEntry(name, isDir));
    }
    this.dirCache = m;
    return m;
  }
  removeEntry(name) {
    return this.caller.call("path_remove", { path: this.subpath(name) });
  }
  createLink(name, entry) {
    return false;
  }
  createFile(name, entry) {
    return this.caller.call("path_touch", { path: this.subpath(name) });
  }
  createDirectory(name, entry) {
    return this.caller.call("path_mkdir", { path: this.subpath(name) });
  }
};

// misc.ts
var EmptyFile = class extends File {
  constructor() {
    super([]);
  }
};
var OpenEmptyFile = class extends OpenFile {
  constructor() {
    super(new EmptyFile());
  }
};

// poll-oneoff.ts
function applyPatchPollOneoff(self) {
  self.wasiImport.poll_oneoff = (inPtr, outPtr, nsubscriptions, sizeOutPtr) => {
    if (nsubscriptions < 0) {
      return wasi_defs_exports.ERRNO_INVAL;
    }
    const size_subscription = 48;
    const subscriptions = new DataView(
      self.inst.exports.memory.buffer,
      inPtr,
      nsubscriptions * size_subscription
    );
    const size_event = 32;
    const events = new DataView(
      self.inst.exports.memory.buffer,
      outPtr,
      nsubscriptions * size_event
    );
    for (let i2 = 0; i2 < nsubscriptions; ++i2) {
      let assertOpenFileAvailable = function() {
        const fd = subscriptions.getUint32(
          i2 * size_subscription + subscription_u_offset + subscription_u_tag_size,
          true
        );
        const openFile = self.fds[fd];
        if (!(openFile instanceof OpenFile2)) {
          throw new Error(`FD#${fd} cannot be polled!`);
        }
        return openFile;
      }, setEventFdReadWrite = function(size) {
        events.setUint16(
          i2 * size_event + event_type_offset,
          wasi_defs_exports.EVENTTYPE_FD_READ,
          true
        );
        events.setBigUint64(
          i2 * size_event + event_fd_readwrite_nbytes_offset,
          size,
          true
        );
        events.setUint16(
          i2 * size_event + event_fd_readwrite_flags_offset,
          0,
          true
        );
      };
      const subscription_userdata_offset = 0;
      const userdata = subscriptions.getBigUint64(
        i2 * size_subscription + subscription_userdata_offset,
        true
      );
      const subscription_u_offset = 8;
      const subscription_u_tag = subscriptions.getUint8(
        i2 * size_subscription + subscription_u_offset
      );
      const subscription_u_tag_size = 1;
      const event_userdata_offset = 0;
      const event_error_offset = 8;
      const event_type_offset = 10;
      const event_fd_readwrite_nbytes_offset = 16;
      const event_fd_readwrite_flags_offset = 16 + 8;
      events.setBigUint64(
        i2 * size_event + event_userdata_offset,
        userdata,
        true
      );
      events.setUint32(
        i2 * size_event + event_error_offset,
        wasi_defs_exports.ERRNO_SUCCESS,
        true
      );
      switch (subscription_u_tag) {
        case wasi_defs_exports.EVENTTYPE_CLOCK:
          events.setUint16(
            i2 * size_event + event_type_offset,
            wasi_defs_exports.EVENTTYPE_CLOCK,
            true
          );
          break;
        case wasi_defs_exports.EVENTTYPE_FD_READ:
          const fileR = assertOpenFileAvailable();
          setEventFdReadWrite(fileR.file.size);
          break;
        case wasi_defs_exports.EVENTTYPE_FD_WRITE:
          setEventFdReadWrite(1n << 31n);
          break;
        default:
          throw new Error(`Unknown event type: ${subscription_u_tag}`);
      }
    }
    const size_size = 4;
    const outNSize = new DataView(
      self.inst.exports.memory.buffer,
      sizeOutPtr,
      size_size
    );
    outNSize.setUint32(0, nsubscriptions, true);
    return wasi_defs_exports.ERRNO_SUCCESS;
  };
}

// wanixjs/duplex.min.js
var hr = Object.defineProperty;
var yr = (t2, e) => {
  for (var r in e) hr(t2, r, { get: e[r], enumerable: true });
};
var it;
try {
  it = new TextDecoder();
} catch {
}
var p;
var ee;
var f = 0;
var $t = [];
var pr = 105;
var mr = 57342;
var xr = 57343;
var Nt = 57337;
var Ht = 6;
var ae = {};
var ot = $t;
var at = 0;
var U = {};
var O;
var Pe;
var ke = 0;
var ge = 0;
var R;
var H;
var M = [];
var ct = [];
var T;
var V;
var we;
var jt = { useRecords: false, mapsAsObjects: true };
var be = false;
var te = class t {
  constructor(e) {
    if (e && ((e.keyMap || e._keyMap) && !e.useRecords && (e.useRecords = false, e.mapsAsObjects = true), e.useRecords === false && e.mapsAsObjects === void 0 && (e.mapsAsObjects = true), e.getStructures && (e.getShared = e.getStructures), e.getShared && !e.structures && ((e.structures = []).uninitialized = true), e.keyMap)) {
      this.mapKey = /* @__PURE__ */ new Map();
      for (let [r, n] of Object.entries(e.keyMap)) this.mapKey.set(n, r);
    }
    Object.assign(this, e);
  }
  decodeKey(e) {
    return this.keyMap && this.mapKey.get(e) || e;
  }
  encodeKey(e) {
    return this.keyMap && this.keyMap.hasOwnProperty(e) ? this.keyMap[e] : e;
  }
  encodeKeys(e) {
    if (!this._keyMap) return e;
    let r = /* @__PURE__ */ new Map();
    for (let [n, s] of Object.entries(e)) r.set(this._keyMap.hasOwnProperty(n) ? this._keyMap[n] : n, s);
    return r;
  }
  decodeKeys(e) {
    if (!this._keyMap || e.constructor.name != "Map") return e;
    if (!this._mapKey) {
      this._mapKey = /* @__PURE__ */ new Map();
      for (let [n, s] of Object.entries(this._keyMap)) this._mapKey.set(s, n);
    }
    let r = {};
    return e.forEach((n, s) => r[v(this._mapKey.has(s) ? this._mapKey.get(s) : s)] = n), r;
  }
  mapDecode(e, r) {
    let n = this.decode(e);
    if (this._keyMap) switch (n.constructor.name) {
      case "Array":
        return n.map((s) => this.decodeKeys(s));
    }
    return n;
  }
  decode(e, r) {
    if (p) return Xt(() => (Oe(), this ? this.decode(e, r) : t.prototype.decode.call(jt, e, r)));
    ee = r > -1 ? r : e.length, f = 0, at = 0, ge = 0, Pe = null, ot = $t, R = null, p = e;
    try {
      V = e.dataView || (e.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength));
    } catch (n) {
      throw p = null, e instanceof Uint8Array ? n : new Error("Source must be a Uint8Array or Buffer but was a " + (e && typeof e == "object" ? e.constructor.name : typeof e));
    }
    if (this instanceof t) {
      if (U = this, T = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues), this.structures) return O = this.structures, Se();
      (!O || O.length > 0) && (O = []);
    } else U = jt, (!O || O.length > 0) && (O = []), T = null;
    return Se();
  }
  decodeMultiple(e, r) {
    let n, s = 0;
    try {
      let o = e.length;
      be = true;
      let l = this ? this.decode(e, o) : ht.decode(e, o);
      if (r) {
        if (r(l) === false) return;
        for (; f < o; ) if (s = f, r(Se()) === false) return;
      } else {
        for (n = [l]; f < o; ) s = f, n.push(Se());
        return n;
      }
    } catch (o) {
      throw o.lastPosition = s, o.values = n, o;
    } finally {
      be = false, Oe();
    }
  }
};
function Se() {
  try {
    let t2 = D();
    if (R) {
      if (f >= R.postBundlePosition) {
        let e = new Error("Unexpected bundle position");
        throw e.incomplete = true, e;
      }
      f = R.postBundlePosition, R = null;
    }
    if (f == ee) O = null, p = null, H && (H = null);
    else if (f > ee) {
      let e = new Error("Unexpected end of CBOR data");
      throw e.incomplete = true, e;
    } else if (!be) throw new Error("Data read, but end of buffer not reached");
    return t2;
  } catch (t2) {
    throw Oe(), (t2 instanceof RangeError || t2.message.startsWith("Unexpected end of buffer")) && (t2.incomplete = true), t2;
  }
}
function D() {
  let t2 = p[f++], e = t2 >> 5;
  if (t2 = t2 & 31, t2 > 23) switch (t2) {
    case 24:
      t2 = p[f++];
      break;
    case 25:
      if (e == 7) return Ir();
      t2 = V.getUint16(f), f += 2;
      break;
    case 26:
      if (e == 7) {
        let r = V.getFloat32(f);
        if (U.useFloat32 > 2) {
          let n = Me[(p[f] & 127) << 1 | p[f + 1] >> 7];
          return f += 4, (n * r + (r > 0 ? 0.5 : -0.5) >> 0) / n;
        }
        return f += 4, r;
      }
      t2 = V.getUint32(f), f += 4;
      break;
    case 27:
      if (e == 7) {
        let r = V.getFloat64(f);
        return f += 8, r;
      }
      if (e > 1) {
        if (V.getUint32(f) > 0) throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");
        t2 = V.getUint32(f + 4);
      } else U.int64AsNumber ? (t2 = V.getUint32(f) * 4294967296, t2 += V.getUint32(f + 4)) : t2 = V.getBigUint64(f);
      f += 8;
      break;
    case 31:
      switch (e) {
        case 2:
        case 3:
          throw new Error("Indefinite length not supported for byte or text strings");
        case 4:
          let r = [], n, s = 0;
          for (; (n = D()) != ae; ) r[s++] = n;
          return e == 4 ? r : e == 3 ? r.join("") : Buffer.concat(r);
        case 5:
          let o;
          if (U.mapsAsObjects) {
            let l = {};
            if (U.keyMap) for (; (o = D()) != ae; ) l[v(U.decodeKey(o))] = D();
            else for (; (o = D()) != ae; ) l[v(o)] = D();
            return l;
          } else {
            we && (U.mapsAsObjects = true, we = false);
            let l = /* @__PURE__ */ new Map();
            if (U.keyMap) for (; (o = D()) != ae; ) l.set(U.decodeKey(o), D());
            else for (; (o = D()) != ae; ) l.set(o, D());
            return l;
          }
        case 7:
          return ae;
        default:
          throw new Error("Invalid major type for indefinite length " + e);
      }
    default:
      throw new Error("Unknown token " + t2);
  }
  switch (e) {
    case 0:
      return t2;
    case 1:
      return ~t2;
    case 2:
      return br(t2);
    case 3:
      if (ge >= f) return Pe.slice(f - ke, (f += t2) - ke);
      if (ge == 0 && ee < 140 && t2 < 32) {
        let s = t2 < 16 ? Gt(t2) : gr(t2);
        if (s != null) return s;
      }
      return wr(t2);
    case 4:
      let r = new Array(t2);
      for (let s = 0; s < t2; s++) r[s] = D();
      return r;
    case 5:
      if (U.mapsAsObjects) {
        let s = {};
        if (U.keyMap) for (let o = 0; o < t2; o++) s[v(U.decodeKey(D()))] = D();
        else for (let o = 0; o < t2; o++) s[v(D())] = D();
        return s;
      } else {
        we && (U.mapsAsObjects = true, we = false);
        let s = /* @__PURE__ */ new Map();
        if (U.keyMap) for (let o = 0; o < t2; o++) s.set(U.decodeKey(D()), D());
        else for (let o = 0; o < t2; o++) s.set(D(), D());
        return s;
      }
    case 6:
      if (t2 >= Nt) {
        let s = O[t2 & 8191];
        if (s) return s.read || (s.read = lt(s)), s.read();
        if (t2 < 65536) {
          if (t2 == xr) {
            let o = le(), l = D(), m = D();
            dt(l, m);
            let g = {};
            if (U.keyMap) for (let x = 2; x < o; x++) {
              let k = U.decodeKey(m[x - 2]);
              g[v(k)] = D();
            }
            else for (let x = 2; x < o; x++) {
              let k = m[x - 2];
              g[v(k)] = D();
            }
            return g;
          } else if (t2 == mr) {
            let o = le(), l = D();
            for (let m = 2; m < o; m++) dt(l++, D());
            return D();
          } else if (t2 == Nt) return Cr();
          if (U.getShared && (ut(), s = O[t2 & 8191], s)) return s.read || (s.read = lt(s)), s.read();
        }
      }
      let n = M[t2];
      if (n) return n.handlesRead ? n(D) : n(D());
      {
        let s = D();
        for (let o = 0; o < ct.length; o++) {
          let l = ct[o](t2, s);
          if (l !== void 0) return l;
        }
        return new j(s, t2);
      }
    case 7:
      switch (t2) {
        case 20:
          return false;
        case 21:
          return true;
        case 22:
          return null;
        case 23:
          return;
        case 31:
        default:
          let s = (T || Q())[t2];
          if (s !== void 0) return s;
          throw new Error("Unknown token " + t2);
      }
    default:
      if (isNaN(t2)) {
        let s = new Error("Unexpected end of CBOR data");
        throw s.incomplete = true, s;
      }
      throw new Error("Unknown CBOR token " + t2);
  }
}
var Kt = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function lt(t2) {
  function e() {
    let r = p[f++];
    if (r = r & 31, r > 23) switch (r) {
      case 24:
        r = p[f++];
        break;
      case 25:
        r = V.getUint16(f), f += 2;
        break;
      case 26:
        r = V.getUint32(f), f += 4;
        break;
      default:
        throw new Error("Expected array header, but got " + p[f - 1]);
    }
    let n = this.compiledReader;
    for (; n; ) {
      if (n.propertyCount === r) return n(D);
      n = n.next;
    }
    if (this.slowReads++ >= 3) {
      let o = this.length == r ? this : this.slice(0, r);
      return n = U.keyMap ? new Function("r", "return {" + o.map((l) => U.decodeKey(l)).map((l) => Kt.test(l) ? v(l) + ":r()" : "[" + JSON.stringify(l) + "]:r()").join(",") + "}") : new Function("r", "return {" + o.map((l) => Kt.test(l) ? v(l) + ":r()" : "[" + JSON.stringify(l) + "]:r()").join(",") + "}"), this.compiledReader && (n.next = this.compiledReader), n.propertyCount = r, this.compiledReader = n, n(D);
    }
    let s = {};
    if (U.keyMap) for (let o = 0; o < r; o++) s[v(U.decodeKey(this[o]))] = D();
    else for (let o = 0; o < r; o++) s[v(this[o])] = D();
    return s;
  }
  return t2.slowReads = 0, e;
}
function v(t2) {
  return t2 === "__proto__" ? "__proto_" : t2;
}
var wr = ft;
function ft(t2) {
  let e;
  if (t2 < 16 && (e = Gt(t2))) return e;
  if (t2 > 64 && it) return it.decode(p.subarray(f, f += t2));
  let r = f + t2, n = [];
  for (e = ""; f < r; ) {
    let s = p[f++];
    if (!(s & 128)) n.push(s);
    else if ((s & 224) === 192) {
      let o = p[f++] & 63;
      n.push((s & 31) << 6 | o);
    } else if ((s & 240) === 224) {
      let o = p[f++] & 63, l = p[f++] & 63;
      n.push((s & 31) << 12 | o << 6 | l);
    } else if ((s & 248) === 240) {
      let o = p[f++] & 63, l = p[f++] & 63, m = p[f++] & 63, g = (s & 7) << 18 | o << 12 | l << 6 | m;
      g > 65535 && (g -= 65536, n.push(g >>> 10 & 1023 | 55296), g = 56320 | g & 1023), n.push(g);
    } else n.push(s);
    n.length >= 4096 && (e += B.apply(String, n), n.length = 0);
  }
  return n.length > 0 && (e += B.apply(String, n)), e;
}
var B = String.fromCharCode;
function gr(t2) {
  let e = f, r = new Array(t2);
  for (let n = 0; n < t2; n++) {
    let s = p[f++];
    if ((s & 128) > 0) {
      f = e;
      return;
    }
    r[n] = s;
  }
  return B.apply(String, r);
}
function Gt(t2) {
  if (t2 < 4) if (t2 < 2) {
    if (t2 === 0) return "";
    {
      let e = p[f++];
      if ((e & 128) > 1) {
        f -= 1;
        return;
      }
      return B(e);
    }
  } else {
    let e = p[f++], r = p[f++];
    if ((e & 128) > 0 || (r & 128) > 0) {
      f -= 2;
      return;
    }
    if (t2 < 3) return B(e, r);
    let n = p[f++];
    if ((n & 128) > 0) {
      f -= 3;
      return;
    }
    return B(e, r, n);
  }
  else {
    let e = p[f++], r = p[f++], n = p[f++], s = p[f++];
    if ((e & 128) > 0 || (r & 128) > 0 || (n & 128) > 0 || (s & 128) > 0) {
      f -= 4;
      return;
    }
    if (t2 < 6) {
      if (t2 === 4) return B(e, r, n, s);
      {
        let o = p[f++];
        if ((o & 128) > 0) {
          f -= 5;
          return;
        }
        return B(e, r, n, s, o);
      }
    } else if (t2 < 8) {
      let o = p[f++], l = p[f++];
      if ((o & 128) > 0 || (l & 128) > 0) {
        f -= 6;
        return;
      }
      if (t2 < 7) return B(e, r, n, s, o, l);
      let m = p[f++];
      if ((m & 128) > 0) {
        f -= 7;
        return;
      }
      return B(e, r, n, s, o, l, m);
    } else {
      let o = p[f++], l = p[f++], m = p[f++], g = p[f++];
      if ((o & 128) > 0 || (l & 128) > 0 || (m & 128) > 0 || (g & 128) > 0) {
        f -= 8;
        return;
      }
      if (t2 < 10) {
        if (t2 === 8) return B(e, r, n, s, o, l, m, g);
        {
          let x = p[f++];
          if ((x & 128) > 0) {
            f -= 9;
            return;
          }
          return B(e, r, n, s, o, l, m, g, x);
        }
      } else if (t2 < 12) {
        let x = p[f++], k = p[f++];
        if ((x & 128) > 0 || (k & 128) > 0) {
          f -= 10;
          return;
        }
        if (t2 < 11) return B(e, r, n, s, o, l, m, g, x, k);
        let S = p[f++];
        if ((S & 128) > 0) {
          f -= 11;
          return;
        }
        return B(e, r, n, s, o, l, m, g, x, k, S);
      } else {
        let x = p[f++], k = p[f++], S = p[f++], F = p[f++];
        if ((x & 128) > 0 || (k & 128) > 0 || (S & 128) > 0 || (F & 128) > 0) {
          f -= 12;
          return;
        }
        if (t2 < 14) {
          if (t2 === 12) return B(e, r, n, s, o, l, m, g, x, k, S, F);
          {
            let W = p[f++];
            if ((W & 128) > 0) {
              f -= 13;
              return;
            }
            return B(e, r, n, s, o, l, m, g, x, k, S, F, W);
          }
        } else {
          let W = p[f++], z = p[f++];
          if ((W & 128) > 0 || (z & 128) > 0) {
            f -= 14;
            return;
          }
          if (t2 < 15) return B(e, r, n, s, o, l, m, g, x, k, S, F, W, z);
          let $ = p[f++];
          if (($ & 128) > 0) {
            f -= 15;
            return;
          }
          return B(e, r, n, s, o, l, m, g, x, k, S, F, W, z, $);
        }
      }
    }
  }
}
function br(t2) {
  return U.copyBuffers ? Uint8Array.prototype.slice.call(p, f, f += t2) : p.subarray(f, f += t2);
}
var Yt = new Float32Array(1);
var Ce = new Uint8Array(Yt.buffer, 0, 4);
function Ir() {
  let t2 = p[f++], e = p[f++], r = (t2 & 127) >> 2;
  if (r === 31) return e || t2 & 3 ? NaN : t2 & 128 ? -1 / 0 : 1 / 0;
  if (r === 0) {
    let n = ((t2 & 3) << 8 | e) / 16777216;
    return t2 & 128 ? -n : n;
  }
  return Ce[3] = t2 & 128 | (r >> 1) + 56, Ce[2] = (t2 & 7) << 5 | e >> 3, Ce[1] = e << 5, Ce[0] = 0, Yt[0];
}
var en = new Array(4096);
var j = class {
  constructor(e, r) {
    this.value = e, this.tag = r;
  }
};
M[0] = (t2) => new Date(t2);
M[1] = (t2) => new Date(Math.round(t2 * 1e3));
M[2] = (t2) => {
  let e = BigInt(0);
  for (let r = 0, n = t2.byteLength; r < n; r++) e = BigInt(t2[r]) + e << BigInt(8);
  return e;
};
M[3] = (t2) => BigInt(-1) - M[2](t2);
M[4] = (t2) => +(t2[1] + "e" + t2[0]);
M[5] = (t2) => t2[1] * Math.exp(t2[0] * Math.log(2));
var dt = (t2, e) => {
  t2 = t2 - 57344;
  let r = O[t2];
  r && r.isShared && ((O.restoreStructures || (O.restoreStructures = []))[t2] = r), O[t2] = e, e.read = lt(e);
};
M[pr] = (t2) => {
  let e = t2.length, r = t2[1];
  dt(t2[0], r);
  let n = {};
  for (let s = 2; s < e; s++) {
    let o = r[s - 2];
    n[v(o)] = t2[s];
  }
  return n;
};
M[14] = (t2) => R ? R[0].slice(R.position0, R.position0 += t2) : new j(t2, 14);
M[15] = (t2) => R ? R[1].slice(R.position1, R.position1 += t2) : new j(t2, 15);
var Ar = { Error, RegExp };
M[27] = (t2) => (Ar[t2[0]] || Error)(t2[1], t2[2]);
var Jt = (t2) => {
  if (p[f++] != 132) throw new Error("Packed values structure must be followed by a 4 element array");
  let e = t2();
  return T = T ? e.concat(T.slice(e.length)) : e, T.prefixes = t2(), T.suffixes = t2(), t2();
};
Jt.handlesRead = true;
M[51] = Jt;
M[Ht] = (t2) => {
  if (!T) if (U.getShared) ut();
  else return new j(t2, Ht);
  if (typeof t2 == "number") return T[16 + (t2 >= 0 ? 2 * t2 : -2 * t2 - 1)];
  throw new Error("No support for non-integer packed references yet");
};
M[28] = (t2) => {
  H || (H = /* @__PURE__ */ new Map(), H.id = 0);
  let e = H.id++, r = p[f], n;
  r >> 5 == 4 ? n = [] : n = {};
  let s = { target: n };
  H.set(e, s);
  let o = t2();
  return s.used ? Object.assign(n, o) : (s.target = o, o);
};
M[28].handlesRead = true;
M[29] = (t2) => {
  let e = H.get(t2);
  return e.used = true, e.target;
};
M[258] = (t2) => new Set(t2);
(M[259] = (t2) => (U.mapsAsObjects && (U.mapsAsObjects = false, we = true), t2())).handlesRead = true;
function ce(t2, e) {
  return typeof t2 == "string" ? t2 + e : t2 instanceof Array ? t2.concat(e) : Object.assign({}, t2, e);
}
function Q() {
  if (!T) if (U.getShared) ut();
  else throw new Error("No packed values available");
  return T;
}
var Dr = 1399353956;
ct.push((t2, e) => {
  if (t2 >= 225 && t2 <= 255) return ce(Q().prefixes[t2 - 224], e);
  if (t2 >= 28704 && t2 <= 32767) return ce(Q().prefixes[t2 - 28672], e);
  if (t2 >= 1879052288 && t2 <= 2147483647) return ce(Q().prefixes[t2 - 1879048192], e);
  if (t2 >= 216 && t2 <= 223) return ce(e, Q().suffixes[t2 - 216]);
  if (t2 >= 27647 && t2 <= 28671) return ce(e, Q().suffixes[t2 - 27639]);
  if (t2 >= 1811940352 && t2 <= 1879048191) return ce(e, Q().suffixes[t2 - 1811939328]);
  if (t2 == Dr) return { packedValues: T, structures: O.slice(0), version: e };
  if (t2 == 55799) return e;
});
var Ur = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
var qt = [Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array, typeof BigUint64Array > "u" ? { name: "BigUint64Array" } : BigUint64Array, Int8Array, Int16Array, Int32Array, typeof BigInt64Array > "u" ? { name: "BigInt64Array" } : BigInt64Array, Float32Array, Float64Array];
var Er = [64, 68, 69, 70, 71, 72, 77, 78, 79, 85, 86];
for (let t2 = 0; t2 < qt.length; t2++) Sr(qt[t2], Er[t2]);
function Sr(t2, e) {
  let r = "get" + t2.name.slice(0, -5);
  typeof t2 != "function" && (t2 = null);
  let n = t2.BYTES_PER_ELEMENT;
  for (let s = 0; s < 2; s++) {
    if (!s && n == 1) continue;
    let o = n == 2 ? 1 : n == 4 ? 2 : 3;
    M[s ? e : e - 4] = n == 1 || s == Ur ? (l) => {
      if (!t2) throw new Error("Could not find typed array for code " + e);
      return new t2(Uint8Array.prototype.slice.call(l, 0).buffer);
    } : (l) => {
      if (!t2) throw new Error("Could not find typed array for code " + e);
      let m = new DataView(l.buffer, l.byteOffset, l.byteLength), g = l.length >> o, x = new t2(g), k = m[r];
      for (let S = 0; S < g; S++) x[S] = k.call(m, S << o, s);
      return x;
    };
  }
}
function Cr() {
  let t2 = le(), e = f + D();
  for (let n = 2; n < t2; n++) {
    let s = le();
    f += s;
  }
  let r = f;
  return f = e, R = [ft(le()), ft(le())], R.position0 = 0, R.position1 = 0, R.postBundlePosition = f, f = r, D();
}
function le() {
  let t2 = p[f++] & 31;
  if (t2 > 23) switch (t2) {
    case 24:
      t2 = p[f++];
      break;
    case 25:
      t2 = V.getUint16(f), f += 2;
      break;
    case 26:
      t2 = V.getUint32(f), f += 4;
      break;
  }
  return t2;
}
function ut() {
  if (U.getShared) {
    let t2 = Xt(() => (p = null, U.getShared())) || {}, e = t2.structures || [];
    U.sharedVersion = t2.version, T = U.sharedValues = t2.packedValues, O === true ? U.structures = O = e : O.splice.apply(O, [0, e.length].concat(e));
  }
}
function Xt(t2) {
  let e = ee, r = f, n = at, s = ke, o = ge, l = Pe, m = ot, g = H, x = R, k = new Uint8Array(p.slice(0, ee)), S = O, F = U, W = be, z = t2();
  return ee = e, f = r, at = n, ke = s, ge = o, Pe = l, ot = m, H = g, R = x, p = k, be = W, O = S, U = F, V = new DataView(p.buffer, p.byteOffset, p.byteLength), z;
}
function Oe() {
  p = null, H = null, O = null;
}
function Zt(t2) {
  M[t2.tag] = t2.decode;
}
var Me = new Array(147);
for (let t2 = 0; t2 < 256; t2++) Me[t2] = +("1e" + Math.floor(45.15 - t2 * 0.30103));
var ht = new te({ useRecords: false });
var yt = ht.decode;
var Pr = ht.decodeMultiple;
var Re = { NEVER: 0, ALWAYS: 1, DECIMAL_ROUND: 3, DECIMAL_FIT: 4 };
var _e;
try {
  _e = new TextEncoder();
} catch {
}
var Fe;
var bt;
var Ve = globalThis.Buffer;
var Ae = typeof Ve < "u";
var pt = Ae ? Ve.allocUnsafeSlow : Uint8Array;
var Qt = Ae ? Ve : Uint8Array;
var er = 256;
var tr = Ae ? 4294967296 : 2144337920;
var mt;
var a;
var P;
var i = 0;
var Y;
var _ = null;
var kr = 61440;
var Or = /[\u0080-\uFFFF]/;
var L = Symbol("record-id");
var Ie = class extends te {
  constructor(e) {
    super(e), this.offset = 0;
    let r, n, s, o, l, m;
    e = e || {};
    let g = Qt.prototype.utf8Write ? function(c, y, d) {
      return a.utf8Write(c, y, d);
    } : _e && _e.encodeInto ? function(c, y) {
      return _e.encodeInto(c, a.subarray(y)).written;
    } : false, x = this, k = e.structures || e.saveStructures, S = e.maxSharedStructures;
    if (S == null && (S = k ? 128 : 0), S > 8190) throw new Error("Maximum maxSharedStructure is 8190");
    let F = e.sequential;
    F && (S = 0), this.structures || (this.structures = []), this.saveStructures && (this.saveShared = this.saveStructures);
    let W, z, $ = e.sharedValues, N;
    if ($) {
      N = /* @__PURE__ */ Object.create(null);
      for (let c = 0, y = $.length; c < y; c++) N[$[c]] = c;
    }
    let G = [], et = 0, Ee = 0;
    this.mapEncode = function(c, y) {
      if (this._keyMap && !this._mapped) switch (c.constructor.name) {
        case "Array":
          c = c.map((d) => this.encodeKeys(d));
          break;
      }
      return this.encode(c, y);
    }, this.encode = function(c, y) {
      if (a || (a = new pt(8192), P = new DataView(a.buffer, 0, 8192), i = 0), Y = a.length - 10, Y - i < 2048 ? (a = new pt(a.length), P = new DataView(a.buffer, 0, a.length), Y = a.length - 10, i = 0) : y === gt && (i = i + 7 & 2147483640), n = i, x.useSelfDescribedHeader && (P.setUint32(i, 3654940416), i += 3), m = x.structuredClone ? /* @__PURE__ */ new Map() : null, x.bundleStrings && typeof c != "string" ? (_ = [], _.size = 1 / 0) : _ = null, s = x.structures, s) {
        if (s.uninitialized) {
          let h = x.getShared() || {};
          x.structures = s = h.structures || [], x.sharedVersion = h.version;
          let u = x.sharedValues = h.packedValues;
          if (u) {
            N = {};
            for (let w = 0, b = u.length; w < b; w++) N[u[w]] = w;
          }
        }
        let d = s.length;
        if (d > S && !F && (d = S), !s.transitions) {
          s.transitions = /* @__PURE__ */ Object.create(null);
          for (let h = 0; h < d; h++) {
            let u = s[h];
            if (!u) continue;
            let w, b = s.transitions;
            for (let I = 0, A = u.length; I < A; I++) {
              b[L] === void 0 && (b[L] = h);
              let E = u[I];
              w = b[E], w || (w = b[E] = /* @__PURE__ */ Object.create(null)), b = w;
            }
            b[L] = h | 1048576;
          }
        }
        F || (s.nextId = d);
      }
      if (o && (o = false), l = s || [], z = N, e.pack) {
        let d = /* @__PURE__ */ new Map();
        if (d.values = [], d.encoder = x, d.maxValues = e.maxPrivatePackedValues || (N ? 16 : 1 / 0), d.objectMap = N || false, d.samplingPackedValues = W, Be(c, d), d.values.length > 0) {
          a[i++] = 216, a[i++] = 51, q(4);
          let h = d.values;
          C(h), q(0), q(0), z = Object.create(N || null);
          for (let u = 0, w = h.length; u < w; u++) z[h[u]] = u;
        }
      }
      mt = y & wt;
      try {
        if (mt) return;
        if (C(c), _ && sr(n, C), x.offset = i, m && m.idsToInsert) {
          i += m.idsToInsert.length * 2, i > Y && me(i), x.offset = i;
          let d = _r(a.subarray(n, i), m.idsToInsert);
          return m = null, d;
        }
        return y & gt ? (a.start = n, a.end = i, a) : a.subarray(n, i);
      } finally {
        if (s) {
          if (Ee < 10 && Ee++, s.length > S && (s.length = S), et > 1e4) s.transitions = null, Ee = 0, et = 0, G.length > 0 && (G = []);
          else if (G.length > 0 && !F) {
            for (let d = 0, h = G.length; d < h; d++) G[d][L] = void 0;
            G = [];
          }
        }
        if (o && x.saveShared) {
          x.structures.length > S && (x.structures = x.structures.slice(0, S));
          let d = a.subarray(n, i);
          return x.updateSharedData() === false ? x.encode(c) : d;
        }
        y & vr && (i = n);
      }
    }, this.findCommonStringsToPack = () => (W = /* @__PURE__ */ new Map(), N || (N = /* @__PURE__ */ Object.create(null)), (c) => {
      let y = c && c.threshold || 4, d = this.pack ? c.maxPrivatePackedValues || 16 : 0;
      $ || ($ = this.sharedValues = []);
      for (let [h, u] of W) u.count > y && (N[h] = d++, $.push(h), o = true);
      for (; this.saveShared && this.updateSharedData() === false; ) ;
      W = null;
    });
    let C = (c) => {
      i > Y && (a = me(i));
      var y = typeof c, d;
      if (y === "string") {
        if (z) {
          let b = z[c];
          if (b >= 0) {
            b < 16 ? a[i++] = b + 224 : (a[i++] = 198, b & 1 ? C(15 - b >> 1) : C(b - 16 >> 1));
            return;
          } else if (W && !e.pack) {
            let I = W.get(c);
            I ? I.count++ : W.set(c, { count: 1 });
          }
        }
        let h = c.length;
        if (_ && h >= 4 && h < 1024) {
          if ((_.size += h) > kr) {
            let I, A = (_[0] ? _[0].length * 3 + _[1].length : 0) + 10;
            i + A > Y && (a = me(i + A)), a[i++] = 217, a[i++] = 223, a[i++] = 249, a[i++] = _.position ? 132 : 130, a[i++] = 26, I = i - n, i += 4, _.position && sr(n, C), _ = ["", ""], _.size = 0, _.position = I;
          }
          let b = Or.test(c);
          _[b ? 0 : 1] += c, a[i++] = b ? 206 : 207, C(h);
          return;
        }
        let u;
        h < 32 ? u = 1 : h < 256 ? u = 2 : h < 65536 ? u = 3 : u = 5;
        let w = h * 3;
        if (i + w > Y && (a = me(i + w)), h < 64 || !g) {
          let b, I, A, E = i + u;
          for (b = 0; b < h; b++) I = c.charCodeAt(b), I < 128 ? a[E++] = I : I < 2048 ? (a[E++] = I >> 6 | 192, a[E++] = I & 63 | 128) : (I & 64512) === 55296 && ((A = c.charCodeAt(b + 1)) & 64512) === 56320 ? (I = 65536 + ((I & 1023) << 10) + (A & 1023), b++, a[E++] = I >> 18 | 240, a[E++] = I >> 12 & 63 | 128, a[E++] = I >> 6 & 63 | 128, a[E++] = I & 63 | 128) : (a[E++] = I >> 12 | 224, a[E++] = I >> 6 & 63 | 128, a[E++] = I & 63 | 128);
          d = E - i - u;
        } else d = g(c, i + u, w);
        d < 24 ? a[i++] = 96 | d : d < 256 ? (u < 2 && a.copyWithin(i + 2, i + 1, i + 1 + d), a[i++] = 120, a[i++] = d) : d < 65536 ? (u < 3 && a.copyWithin(i + 3, i + 2, i + 2 + d), a[i++] = 121, a[i++] = d >> 8, a[i++] = d & 255) : (u < 5 && a.copyWithin(i + 5, i + 3, i + 3 + d), a[i++] = 122, P.setUint32(i, d), i += 4), i += d;
      } else if (y === "number") if (!this.alwaysUseFloat && c >>> 0 === c) c < 24 ? a[i++] = c : c < 256 ? (a[i++] = 24, a[i++] = c) : c < 65536 ? (a[i++] = 25, a[i++] = c >> 8, a[i++] = c & 255) : (a[i++] = 26, P.setUint32(i, c), i += 4);
      else if (!this.alwaysUseFloat && c >> 0 === c) c >= -24 ? a[i++] = 31 - c : c >= -256 ? (a[i++] = 56, a[i++] = ~c) : c >= -65536 ? (a[i++] = 57, P.setUint16(i, ~c), i += 2) : (a[i++] = 58, P.setUint32(i, ~c), i += 4);
      else {
        let h;
        if ((h = this.useFloat32) > 0 && c < 4294967296 && c >= -2147483648) {
          a[i++] = 250, P.setFloat32(i, c);
          let u;
          if (h < 4 || (u = c * Me[(a[i] & 127) << 1 | a[i + 1] >> 7]) >> 0 === u) {
            i += 4;
            return;
          } else i--;
        }
        a[i++] = 251, P.setFloat64(i, c), i += 8;
      }
      else if (y === "object") if (!c) a[i++] = 246;
      else {
        if (m) {
          let u = m.get(c);
          if (u) {
            if (a[i++] = 216, a[i++] = 29, a[i++] = 25, !u.references) {
              let w = m.idsToInsert || (m.idsToInsert = []);
              u.references = [], w.push(u);
            }
            u.references.push(i - n), i += 2;
            return;
          } else m.set(c, { offset: i - n });
        }
        let h = c.constructor;
        if (h === Object) tt(c, true);
        else if (h === Array) {
          d = c.length, d < 24 ? a[i++] = 128 | d : q(d);
          for (let u = 0; u < d; u++) C(c[u]);
        } else if (h === Map) if ((this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) && (a[i++] = 217, a[i++] = 1, a[i++] = 3), d = c.size, d < 24 ? a[i++] = 160 | d : d < 256 ? (a[i++] = 184, a[i++] = d) : d < 65536 ? (a[i++] = 185, a[i++] = d >> 8, a[i++] = d & 255) : (a[i++] = 186, P.setUint32(i, d), i += 4), x.keyMap) for (let [u, w] of c) C(x.encodeKey(u)), C(w);
        else for (let [u, w] of c) C(u), C(w);
        else {
          for (let u = 0, w = Fe.length; u < w; u++) {
            let b = bt[u];
            if (c instanceof b) {
              let I = Fe[u], A = I.tag;
              A == null && (A = I.getTag && I.getTag.call(this, c)), A < 24 ? a[i++] = 192 | A : A < 256 ? (a[i++] = 216, a[i++] = A) : A < 65536 ? (a[i++] = 217, a[i++] = A >> 8, a[i++] = A & 255) : A > -1 && (a[i++] = 218, P.setUint32(i, A), i += 4), I.encode.call(this, c, C, me);
              return;
            }
          }
          if (c[Symbol.iterator]) {
            if (mt) {
              let u = new Error("Iterable should be serialized as iterator");
              throw u.iteratorNotHandled = true, u;
            }
            a[i++] = 159;
            for (let u of c) C(u);
            a[i++] = 255;
            return;
          }
          if (c[Symbol.asyncIterator] || xt(c)) {
            let u = new Error("Iterable/blob should be serialized as iterator");
            throw u.iteratorNotHandled = true, u;
          }
          tt(c, !c.hasOwnProperty);
        }
      }
      else if (y === "boolean") a[i++] = c ? 245 : 244;
      else if (y === "bigint") {
        if (c < BigInt(1) << BigInt(64) && c >= 0) a[i++] = 27, P.setBigUint64(i, c);
        else if (c > -(BigInt(1) << BigInt(64)) && c < 0) a[i++] = 59, P.setBigUint64(i, -c - BigInt(1));
        else if (this.largeBigIntToFloat) a[i++] = 251, P.setFloat64(i, Number(c));
        else throw new RangeError(c + " was too large to fit in CBOR 64-bit integer format, set largeBigIntToFloat to convert to float-64");
        i += 8;
      } else if (y === "undefined") a[i++] = 247;
      else throw new Error("Unknown type: " + y);
    }, tt = this.useRecords === false ? this.variableMapSize ? (c) => {
      let y = Object.keys(c), d = Object.values(c), h = y.length;
      h < 24 ? a[i++] = 160 | h : h < 256 ? (a[i++] = 184, a[i++] = h) : h < 65536 ? (a[i++] = 185, a[i++] = h >> 8, a[i++] = h & 255) : (a[i++] = 186, P.setUint32(i, h), i += 4);
      let u;
      if (x.keyMap) for (let w = 0; w < h; w++) C(encodeKey(y[w])), C(d[w]);
      else for (let w = 0; w < h; w++) C(y[w]), C(d[w]);
    } : (c, y) => {
      a[i++] = 185;
      let d = i - n;
      i += 2;
      let h = 0;
      if (x.keyMap) for (let u in c) (y || c.hasOwnProperty(u)) && (C(x.encodeKey(u)), C(c[u]), h++);
      else for (let u in c) (y || c.hasOwnProperty(u)) && (C(u), C(c[u]), h++);
      a[d++ + n] = h >> 8, a[d + n] = h & 255;
    } : (c, y) => {
      let d, h = l.transitions || (l.transitions = /* @__PURE__ */ Object.create(null)), u = 0, w = 0, b, I;
      if (this.keyMap) {
        I = Object.keys(c).map((E) => this.encodeKey(E)), w = I.length;
        for (let E = 0; E < w; E++) {
          let vt = I[E];
          d = h[vt], d || (d = h[vt] = /* @__PURE__ */ Object.create(null), u++), h = d;
        }
      } else for (let E in c) (y || c.hasOwnProperty(E)) && (d = h[E], d || (h[L] & 1048576 && (b = h[L] & 65535), d = h[E] = /* @__PURE__ */ Object.create(null), u++), h = d, w++);
      let A = h[L];
      if (A !== void 0) A &= 65535, a[i++] = 217, a[i++] = A >> 8 | 224, a[i++] = A & 255;
      else if (I || (I = h.__keys__ || (h.__keys__ = Object.keys(c))), b === void 0 ? (A = l.nextId++, A || (A = 0, l.nextId = 1), A >= er && (l.nextId = (A = S) + 1)) : A = b, l[A] = I, A < S) {
        a[i++] = 217, a[i++] = A >> 8 | 224, a[i++] = A & 255, h = l.transitions;
        for (let E = 0; E < w; E++) (h[L] === void 0 || h[L] & 1048576) && (h[L] = A), h = h[I[E]];
        h[L] = A | 1048576, o = true;
      } else {
        if (h[L] = A, P.setUint32(i, 3655335680), i += 3, u && (et += Ee * u), G.length >= er - S && (G.shift()[L] = void 0), G.push(h), q(w + 2), C(57344 + A), C(I), y === null) return;
        for (let E in c) (y || c.hasOwnProperty(E)) && C(c[E]);
        return;
      }
      if (w < 24 ? a[i++] = 128 | w : q(w), y !== null) for (let E in c) (y || c.hasOwnProperty(E)) && C(c[E]);
    }, me = (c) => {
      let y;
      if (c > 16777216) {
        if (c - n > tr) throw new Error("Encoded buffer would be larger than maximum buffer size");
        y = Math.min(tr, Math.round(Math.max((c - n) * (c > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096);
      } else y = (Math.max(c - n << 2, a.length - 1) >> 12) + 1 << 12;
      let d = new pt(y);
      return P = new DataView(d.buffer, 0, y), a.copy ? a.copy(d, 0, n, c) : d.set(a.slice(n, c)), i -= n, n = 0, Y = d.length - 10, a = d;
    }, Z = 100, Vt = 1e3;
    this.encodeAsIterable = function(c, y) {
      return Tt(c, y, oe);
    }, this.encodeAsAsyncIterable = function(c, y) {
      return Tt(c, y, Lt);
    };
    function* oe(c, y, d) {
      let h = c.constructor;
      if (h === Object) {
        let u = x.useRecords !== false;
        u ? tt(c, null) : rr(Object.keys(c).length, 160);
        for (let w in c) {
          let b = c[w];
          u || C(w), b && typeof b == "object" ? y[w] ? yield* oe(b, y[w]) : yield* rt(b, y, w) : C(b);
        }
      } else if (h === Array) {
        let u = c.length;
        q(u);
        for (let w = 0; w < u; w++) {
          let b = c[w];
          b && (typeof b == "object" || i - n > Z) ? y.element ? yield* oe(b, y.element) : yield* rt(b, y, "element") : C(b);
        }
      } else if (c[Symbol.iterator]) {
        a[i++] = 159;
        for (let u of c) u && (typeof u == "object" || i - n > Z) ? y.element ? yield* oe(u, y.element) : yield* rt(u, y, "element") : C(u);
        a[i++] = 255;
      } else xt(c) ? (rr(c.size, 64), yield a.subarray(n, i), yield c, xe()) : c[Symbol.asyncIterator] ? (a[i++] = 159, yield a.subarray(n, i), yield c, xe(), a[i++] = 255) : C(c);
      d && i > n ? yield a.subarray(n, i) : i - n > Z && (yield a.subarray(n, i), xe());
    }
    function* rt(c, y, d) {
      let h = i - n;
      try {
        C(c), i - n > Z && (yield a.subarray(n, i), xe());
      } catch (u) {
        if (u.iteratorNotHandled) y[d] = {}, i = n + h, yield* oe.call(this, c, y[d]);
        else throw u;
      }
    }
    function xe() {
      Z = Vt, x.encode(null, wt);
    }
    function Tt(c, y, d) {
      return y && y.chunkThreshold ? Z = Vt = y.chunkThreshold : Z = 100, c && typeof c == "object" ? (x.encode(null, wt), d(c, x.iterateProperties || (x.iterateProperties = {}), true)) : [x.encode(c)];
    }
    async function* Lt(c, y) {
      for (let d of oe(c, y, true)) {
        let h = d.constructor;
        if (h === Qt || h === Uint8Array) yield d;
        else if (xt(d)) {
          let u = d.stream().getReader(), w;
          for (; !(w = await u.read()).done; ) yield w.value;
        } else if (d[Symbol.asyncIterator]) for await (let u of d) xe(), u ? yield* Lt(u, y.async || (y.async = {})) : yield x.encode(u);
        else yield d;
      }
    }
  }
  useBuffer(e) {
    a = e, P = new DataView(a.buffer, a.byteOffset, a.byteLength), i = 0;
  }
  clearSharedData() {
    this.structures && (this.structures = []), this.sharedValues && (this.sharedValues = void 0);
  }
  updateSharedData() {
    let e = this.sharedVersion || 0;
    this.sharedVersion = e + 1;
    let r = this.structures.slice(0), n = new We(r, this.sharedValues, this.sharedVersion), s = this.saveShared(n, (o) => (o && o.version || 0) == e);
    return s === false ? (n = this.getShared() || {}, this.structures = n.structures || [], this.sharedValues = n.packedValues, this.sharedVersion = n.version, this.structures.nextId = this.structures.length) : r.forEach((o, l) => this.structures[l] = o), s;
  }
};
function rr(t2, e) {
  t2 < 24 ? a[i++] = e | t2 : t2 < 256 ? (a[i++] = e | 24, a[i++] = t2) : t2 < 65536 ? (a[i++] = e | 25, a[i++] = t2 >> 8, a[i++] = t2 & 255) : (a[i++] = e | 26, P.setUint32(i, t2), i += 4);
}
var We = class {
  constructor(e, r, n) {
    this.structures = e, this.packedValues = r, this.version = n;
  }
};
function q(t2) {
  t2 < 24 ? a[i++] = 128 | t2 : t2 < 256 ? (a[i++] = 152, a[i++] = t2) : t2 < 65536 ? (a[i++] = 153, a[i++] = t2 >> 8, a[i++] = t2 & 255) : (a[i++] = 154, P.setUint32(i, t2), i += 4);
}
var Mr = typeof Blob > "u" ? function() {
} : Blob;
function xt(t2) {
  if (t2 instanceof Mr) return true;
  let e = t2[Symbol.toStringTag];
  return e === "Blob" || e === "File";
}
function Be(t2, e) {
  switch (typeof t2) {
    case "string":
      if (t2.length > 3) {
        if (e.objectMap[t2] > -1 || e.values.length >= e.maxValues) return;
        let n = e.get(t2);
        if (n) ++n.count == 2 && e.values.push(t2);
        else if (e.set(t2, { count: 1 }), e.samplingPackedValues) {
          let s = e.samplingPackedValues.get(t2);
          s ? s.count++ : e.samplingPackedValues.set(t2, { count: 1 });
        }
      }
      break;
    case "object":
      if (t2) if (t2 instanceof Array) for (let n = 0, s = t2.length; n < s; n++) Be(t2[n], e);
      else {
        let n = !e.encoder.useRecords;
        for (var r in t2) t2.hasOwnProperty(r) && (n && Be(r, e), Be(t2[r], e));
      }
      break;
    case "function":
      console.log(t2);
  }
}
var Rr = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
bt = [Date, Set, Error, RegExp, j, ArrayBuffer, Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array, typeof BigUint64Array > "u" ? function() {
} : BigUint64Array, Int8Array, Int16Array, Int32Array, typeof BigInt64Array > "u" ? function() {
} : BigInt64Array, Float32Array, Float64Array, We];
Fe = [{ tag: 1, encode(t2, e) {
  let r = t2.getTime() / 1e3;
  (this.useTimestamp32 || t2.getMilliseconds() === 0) && r >= 0 && r < 4294967296 ? (a[i++] = 26, P.setUint32(i, r), i += 4) : (a[i++] = 251, P.setFloat64(i, r), i += 8);
} }, { tag: 258, encode(t2, e) {
  let r = Array.from(t2);
  e(r);
} }, { tag: 27, encode(t2, e) {
  e([t2.name, t2.message]);
} }, { tag: 27, encode(t2, e) {
  e(["RegExp", t2.source, t2.flags]);
} }, { getTag(t2) {
  return t2.tag;
}, encode(t2, e) {
  e(t2.value);
} }, { encode(t2, e, r) {
  nr(t2, r);
} }, { getTag(t2) {
  if (t2.constructor === Uint8Array && (this.tagUint8Array || Ae && this.tagUint8Array !== false)) return 64;
}, encode(t2, e, r) {
  nr(t2, r);
} }, K(68, 1), K(69, 2), K(70, 4), K(71, 8), K(72, 1), K(77, 2), K(78, 4), K(79, 8), K(85, 4), K(86, 8), { encode(t2, e) {
  let r = t2.packedValues || [], n = t2.structures || [];
  if (r.values.length > 0) {
    a[i++] = 216, a[i++] = 51, q(4);
    let s = r.values;
    e(s), q(0), q(0), packedObjectMap = Object.create(sharedPackedObjectMap || null);
    for (let o = 0, l = s.length; o < l; o++) packedObjectMap[s[o]] = o;
  }
  if (n) {
    P.setUint32(i, 3655335424), i += 3;
    let s = n.slice(0);
    s.unshift(57344), s.push(new j(t2.version, 1399353956)), e(s);
  } else e(new j(t2.version, 1399353956));
} }];
function K(t2, e) {
  return !Rr && e > 1 && (t2 -= 4), { tag: t2, encode: function(n, s) {
    let o = n.byteLength, l = n.byteOffset || 0, m = n.buffer || n;
    s(Ae ? Ve.from(m, l, o) : new Uint8Array(m, l, o));
  } };
}
function nr(t2, e) {
  let r = t2.byteLength;
  r < 24 ? a[i++] = 64 + r : r < 256 ? (a[i++] = 88, a[i++] = r) : r < 65536 ? (a[i++] = 89, a[i++] = r >> 8, a[i++] = r & 255) : (a[i++] = 90, P.setUint32(i, r), i += 4), i + r >= a.length && e(i + r), a.set(t2.buffer ? t2 : new Uint8Array(t2), i), i += r;
}
function _r(t2, e) {
  let r, n = e.length * 2, s = t2.length - n;
  e.sort((o, l) => o.offset > l.offset ? 1 : -1);
  for (let o = 0; o < e.length; o++) {
    let l = e[o];
    l.id = o;
    for (let m of l.references) t2[m++] = o >> 8, t2[m] = o & 255;
  }
  for (; r = e.pop(); ) {
    let o = r.offset;
    t2.copyWithin(o + n, o, s), n -= 2;
    let l = o + n;
    t2[l++] = 216, t2[l++] = 28, s = o;
  }
  return t2;
}
function sr(t2, e) {
  P.setUint32(_.position + t2, i - _.position - t2 + 1);
  let r = _;
  _ = null, e(r[0]), e(r[1]);
}
function It(t2) {
  if (t2.Class) {
    if (!t2.encode) throw new Error("Extension has no encode function");
    bt.unshift(t2.Class), Fe.unshift(t2);
  }
  Zt(t2);
}
var At = new Ie({ useRecords: false });
var Dt = At.encode;
var Br = At.encodeAsIterable;
var Fr = At.encodeAsAsyncIterable;
var { NEVER: Wr, ALWAYS: Vr, DECIMAL_ROUND: Tr, DECIMAL_FIT: Lr } = Re;
var gt = 512;
var vr = 1024;
var wt = 2048;
var ir = class {
  debug;
  constructor(e = false, r) {
    this.debug = e, r && r.forEach(It);
  }
  encoder(e) {
    return new Ut(e, this.debug);
  }
  decoder(e) {
    return new Et(e, this.debug);
  }
};
var Ut = class {
  w;
  debug;
  constructor(e, r = false) {
    this.w = e, this.debug = r;
  }
  async encode(e) {
    this.debug && console.log("<<", e);
    let r = Dt(e), n = 0;
    for (; n < r.length; ) n += await this.w.write(r.subarray(n));
  }
};
var Et = class {
  r;
  debug;
  constructor(e, r = false) {
    this.r = e, this.debug = r;
  }
  async decode(e) {
    let r = new Uint8Array(e), n = 0;
    for (; n < e; ) {
      let o = await this.r.read(r.subarray(n));
      if (o === null) return Promise.resolve(null);
      n += o;
    }
    let s = yt(r);
    return this.debug && console.log(">>", s), Promise.resolve(s);
  }
};
function Te(t2, e, r = 0) {
  r = Math.max(0, Math.min(r, e.byteLength));
  let n = e.byteLength - r;
  return t2.byteLength > n && (t2 = t2.subarray(0, n)), e.set(t2, r), t2.byteLength;
}
var Le = 32 * 1024;
var St = 2 ** 32 - 2;
var ve = class {
  _buf;
  _off;
  constructor(e) {
    this._buf = e === void 0 ? new Uint8Array(0) : new Uint8Array(e), this._off = 0;
  }
  bytes(e = { copy: true }) {
    return e.copy === false ? this._buf.subarray(this._off) : this._buf.slice(this._off);
  }
  empty() {
    return this._buf.byteLength <= this._off;
  }
  get length() {
    return this._buf.byteLength - this._off;
  }
  get capacity() {
    return this._buf.buffer.byteLength;
  }
  truncate(e) {
    if (e === 0) {
      this.reset();
      return;
    }
    if (e < 0 || e > this.length) throw Error("bytes.Buffer: truncation out of range");
    this._reslice(this._off + e);
  }
  reset() {
    this._reslice(0), this._off = 0;
  }
  _tryGrowByReslice(e) {
    let r = this._buf.byteLength;
    return e <= this.capacity - r ? (this._reslice(r + e), r) : -1;
  }
  _reslice(e) {
    this._buf = new Uint8Array(this._buf.buffer, 0, e);
  }
  readSync(e) {
    if (this.empty()) return this.reset(), e.byteLength === 0 ? 0 : null;
    let r = Te(this._buf.subarray(this._off), e);
    return this._off += r, r;
  }
  read(e) {
    let r = this.readSync(e);
    return Promise.resolve(r);
  }
  writeSync(e) {
    let r = this._grow(e.byteLength);
    return Te(e, this._buf, r);
  }
  write(e) {
    let r = this.writeSync(e);
    return Promise.resolve(r);
  }
  _grow(e) {
    let r = this.length;
    r === 0 && this._off !== 0 && this.reset();
    let n = this._tryGrowByReslice(e);
    if (n >= 0) return n;
    let s = this.capacity;
    if (e <= Math.floor(s / 2) - r) Te(this._buf.subarray(this._off), this._buf);
    else {
      if (s + e > St) throw new Error("The buffer cannot be grown beyond the maximum size.");
      {
        let o = new Uint8Array(Math.min(2 * s + e, St));
        Te(this._buf.subarray(this._off), o), this._buf = o;
      }
    }
    return this._off = 0, this._reslice(Math.min(r + e, St)), r;
  }
  grow(e) {
    if (e < 0) throw Error("Buffer.grow: negative count");
    let r = this._grow(e);
    this._reslice(r);
  }
  async readFrom(e) {
    let r = 0, n = new Uint8Array(Le);
    for (; ; ) {
      let s = this.capacity - this.length < Le, o = s ? n : new Uint8Array(this._buf.buffer, this.length), l = await e.read(o);
      if (l === null) return r;
      s ? this.writeSync(o.subarray(0, l)) : this._reslice(this.length + l), r += l;
    }
  }
  readFromSync(e) {
    let r = 0, n = new Uint8Array(Le);
    for (; ; ) {
      let s = this.capacity - this.length < Le, o = s ? n : new Uint8Array(this._buf.buffer, this.length), l = e.readSync(o);
      if (l === null) return r;
      s ? this.writeSync(o.subarray(0, l)) : this._reslice(this.length + l), r += l;
    }
  }
};
var fe = class {
  codec;
  constructor(e) {
    this.codec = e;
  }
  encoder(e) {
    return new Ct(e, this.codec);
  }
  decoder(e) {
    return new Pt(e, this.codec.decoder(e));
  }
};
var Ct = class {
  w;
  codec;
  constructor(e, r) {
    this.w = e, this.codec = r;
  }
  async encode(e) {
    let r = new ve();
    await this.codec.encoder(r).encode(e);
    let s = new DataView(new ArrayBuffer(4));
    s.setUint32(0, r.length);
    let o = new Uint8Array(r.length + 4);
    o.set(new Uint8Array(s.buffer), 0), o.set(r.bytes(), 4);
    let l = 0;
    for (; l < o.length; ) l += await this.w.write(o.subarray(l));
  }
};
var Pt = class {
  r;
  dec;
  constructor(e, r) {
    this.r = e, this.dec = r;
  }
  async decode(e) {
    let r = new Uint8Array(4);
    if (await this.r.read(r) === null) return null;
    let o = new DataView(r.buffer).getUint32(0);
    return await this.dec.decode(o);
  }
};
var de = class {
  session;
  codec;
  constructor(e, r) {
    this.session = e, this.codec = r;
  }
  async call(e, r) {
    let n = await this.session.open();
    try {
      let s = new fe(this.codec), o = s.encoder(n), l = s.decoder(n);
      await o.encode({ S: e }), await o.encode(r);
      let m = await l.decode(), g = new ze(n, s);
      if (g.error = m.E, g.error !== void 0 && g.error !== null) throw g.error;
      return g.value = await l.decode(), g.continue = m.C, g.continue || await n.close(), g;
    } catch (s) {
      return await n.close(), Promise.reject(s);
    }
  }
};
function ar(t2) {
  function e(r, n) {
    return new Proxy(Object.assign(() => {
    }, { path: r, callable: n }), { get(s, o, l) {
      return o.startsWith("__") ? Reflect.get(s, o, l) : e(s.path ? `${s.path}.${o}` : o, s.callable);
    }, apply(s, o, l = []) {
      return s.callable(s.path, l);
    } });
  }
  return e("", t2.call.bind(t2));
}
function Ue(t2) {
  return { respondRPC: t2 };
}
function zr() {
  return Ue((t2, e) => {
    t2.return(new Error(`not found: ${e.selector}`));
  });
}
function kt(t2) {
  return t2 === "" ? "/" : (t2[0] != "/" && (t2 = "/" + t2), t2 = t2.replace(".", "/"), t2.toLowerCase());
}
var J = class {
  handlers;
  constructor() {
    this.handlers = {};
  }
  async respondRPC(e, r) {
    await this.handler(r).respondRPC(e, r);
  }
  handler(e) {
    let r = this.match(e.selector);
    return r || zr();
  }
  remove(e) {
    e = kt(e);
    let r = this.match(e);
    return delete this.handlers[e], r || null;
  }
  match(e) {
    if (e = kt(e), this.handlers.hasOwnProperty(e)) return this.handlers[e];
    let r = Object.keys(this.handlers).filter((n) => n.endsWith("/"));
    r.sort((n, s) => s.length - n.length);
    for (let n of r) if (e.startsWith(n)) {
      let s = this.handlers[n], o = s;
      return o.match && o.match instanceof Function ? o.match(e.slice(n.length)) : s;
    }
    return null;
  }
  handle(e, r) {
    if (e === "") throw "handle: invalid selector";
    let n = kt(e), s = r;
    if (s.match && s.match instanceof Function && !n.endsWith("/") && (n = n + "/"), !r) throw "handle: invalid handler";
    if (this.match(n)) throw "handle: selector already registered";
    this.handlers[n] = r;
  }
};
async function cr(t2, e, r) {
  let n = new fe(e), s = n.decoder(t2), o = await s.decode(), l = new Ne(o.S, t2, s);
  l.caller = new de(t2.session, e);
  let m = new He(), g = new Ot(t2, n, m);
  return r || (r = new J()), await r.respondRPC(g, l), g.responded || await g.return(null), Promise.resolve();
}
var Ot = class {
  header;
  ch;
  codec;
  responded;
  constructor(e, r, n) {
    this.ch = e, this.codec = r, this.header = n, this.responded = false;
  }
  send(e) {
    return this.codec.encoder(this.ch).encode(e);
  }
  return(e) {
    return this.respond(e, false);
  }
  async continue(e) {
    return await this.respond(e, true), this.ch;
  }
  async respond(e, r) {
    return this.responded = true, this.header.C = r, e instanceof Error && (this.header.E = e.message, e = null), await this.send(this.header), await this.send(e), r || await this.ch.close(), Promise.resolve();
  }
};
var Ne = class {
  selector;
  channel;
  caller;
  decoder;
  constructor(e, r, n) {
    this.selector = e, this.channel = r, this.decoder = n;
  }
  receive() {
    return this.decoder.decode();
  }
};
var He = class {
  E;
  C;
  constructor() {
    this.E = void 0, this.C = false;
  }
};
var ze = class {
  error;
  continue;
  value;
  channel;
  codec;
  constructor(e, r) {
    this.channel = e, this.codec = r, this.error = void 0, this.continue = false;
  }
  send(e) {
    return this.codec.encoder(this.channel).encode(e);
  }
  receive() {
    return this.codec.decoder(this.channel).decode();
  }
};
var je = class {
  session;
  caller;
  codec;
  responder;
  constructor(e, r) {
    this.session = e, this.codec = r, this.caller = new de(e, r), this.responder = new J();
  }
  close() {
    return this.session.close();
  }
  async respond() {
    for (; ; ) {
      let e = await this.session.accept();
      if (e === null) break;
      cr(e, this.codec, this.responder);
    }
  }
  async call(e, r) {
    return this.caller.call(e, r);
  }
  handle(e, r) {
    this.responder.handle(e, r);
  }
  respondRPC(e, r) {
    this.responder.respondRPC(e, r);
  }
  virtualize() {
    return ar(this.caller);
  }
};
var lr = /* @__PURE__ */ new Map([[100, 12], [101, 16], [102, 4], [103, 8], [104, 8], [105, 4], [106, 4]]);
var Ke = class {
  w;
  constructor(e) {
    this.w = e;
  }
  async encode(e) {
    ue.messages && console.log("<<ENC", e);
    let r = Hr(e);
    ue.bytes && console.log("<<ENC", r);
    let n = 0;
    for (; n < r.length; ) n += await this.w.write(r.subarray(n));
    return n;
  }
};
function Hr(t2) {
  if (t2.ID === 106) {
    let e = t2, r = new DataView(new ArrayBuffer(5));
    return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), new Uint8Array(r.buffer);
  }
  if (t2.ID === 104) {
    let e = t2, r = new DataView(new ArrayBuffer(9));
    r.setUint8(0, e.ID), r.setUint32(1, e.channelID), r.setUint32(5, e.length);
    let n = new Uint8Array(9 + e.length);
    return n.set(new Uint8Array(r.buffer), 0), n.set(e.data, 9), n;
  }
  if (t2.ID === 105) {
    let e = t2, r = new DataView(new ArrayBuffer(5));
    return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), new Uint8Array(r.buffer);
  }
  if (t2.ID === 100) {
    let e = t2, r = new DataView(new ArrayBuffer(13));
    return r.setUint8(0, e.ID), r.setUint32(1, e.senderID), r.setUint32(5, e.windowSize), r.setUint32(9, e.maxPacketSize), new Uint8Array(r.buffer);
  }
  if (t2.ID === 101) {
    let e = t2, r = new DataView(new ArrayBuffer(17));
    return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), r.setUint32(5, e.senderID), r.setUint32(9, e.windowSize), r.setUint32(13, e.maxPacketSize), new Uint8Array(r.buffer);
  }
  if (t2.ID === 102) {
    let e = t2, r = new DataView(new ArrayBuffer(5));
    return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), new Uint8Array(r.buffer);
  }
  if (t2.ID === 103) {
    let e = t2, r = new DataView(new ArrayBuffer(9));
    return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), r.setUint32(5, e.additionalBytes), new Uint8Array(r.buffer);
  }
  throw `marshal of unknown type: ${t2}`;
}
function Ge(t2, e) {
  let r = new Uint8Array(e), n = 0;
  return t2.forEach((s) => {
    r.set(s, n), n += s.length;
  }), r;
}
var pe = class {
  q;
  waiters;
  closed;
  constructor() {
    this.q = [], this.waiters = [], this.closed = false;
  }
  push(e) {
    if (this.closed) throw "closed queue";
    if (this.waiters.length > 0) {
      let r = this.waiters.shift();
      r && r(e);
      return;
    }
    this.q.push(e);
  }
  shift() {
    return this.closed ? Promise.resolve(null) : new Promise((e) => {
      if (this.q.length > 0) {
        e(this.q.shift() || null);
        return;
      }
      this.waiters.push(e);
    });
  }
  close() {
    this.closed || (this.closed = true, this.waiters.forEach((e) => {
      e(null);
    }));
  }
};
var $e = class {
  gotEOF;
  readBuf;
  readers;
  constructor() {
    this.readBuf = new Uint8Array(0), this.gotEOF = false, this.readers = [];
  }
  read(e) {
    return new Promise((r) => {
      let n = () => {
        if (this.readBuf === void 0) {
          r(null);
          return;
        }
        if (this.readBuf.length == 0) {
          if (this.gotEOF) {
            this.readBuf = void 0, r(null);
            return;
          }
          this.readers.push(n);
          return;
        }
        let s = this.readBuf.slice(0, e.length);
        this.readBuf = this.readBuf.slice(s.length), this.readBuf.length == 0 && this.gotEOF && (this.readBuf = void 0), e.set(s), r(s.length);
      };
      n();
    });
  }
  write(e) {
    for (this.readBuf && (this.readBuf = Ge([this.readBuf, e], this.readBuf.length + e.length)); !this.readBuf || this.readBuf.length > 0; ) {
      let r = this.readers.shift();
      if (!r) break;
      r();
    }
    return Promise.resolve(e.length);
  }
  eof() {
    this.gotEOF = true, this.flushReaders();
  }
  close() {
    this.readBuf = void 0, this.flushReaders();
  }
  flushReaders() {
    for (; ; ) {
      let e = this.readers.shift();
      if (!e) return;
      e();
    }
  }
};
var Ye = class {
  r;
  constructor(e) {
    this.r = e;
  }
  async decode() {
    let e = await jr(this.r);
    if (e === null) return Promise.resolve(null);
    ue.bytes && console.log(">>DEC", e);
    let r = Kr(e);
    return ue.messages && console.log(">>DEC", r), r;
  }
};
async function jr(t2) {
  let e = new Uint8Array(1);
  if (await t2.read(e) === null) return Promise.resolve(null);
  let n = e[0], s = lr.get(n);
  if (s === void 0 || n < 100 || n > 106) return Promise.reject(`bad packet: ${n}`);
  let o = new Uint8Array(s);
  if (await t2.read(o) === null) return Promise.reject("unexpected EOF reading packet");
  if (n === 104) {
    let g = new DataView(o.buffer).getUint32(4), x = 0, k = [];
    for (; x < g; ) {
      let S = new Uint8Array(g - x), F = await t2.read(S);
      if (F === null) return Promise.reject("unexpected EOF reading data chunk");
      x += F, k.push(S.slice(0, F));
    }
    return Ge([e, o, ...k], 1 + o.length + g);
  }
  return Ge([e, o], o.length + 1);
}
function Kr(t2) {
  let e = new DataView(t2.buffer);
  switch (t2[0]) {
    case 106:
      return { ID: t2[0], channelID: e.getUint32(1) };
    case 104:
      let r = e.getUint32(5), n = new Uint8Array(t2.buffer.slice(9));
      return { ID: t2[0], channelID: e.getUint32(1), length: r, data: n };
    case 105:
      return { ID: t2[0], channelID: e.getUint32(1) };
    case 100:
      return { ID: t2[0], senderID: e.getUint32(1), windowSize: e.getUint32(5), maxPacketSize: e.getUint32(9) };
    case 101:
      return { ID: t2[0], channelID: e.getUint32(1), senderID: e.getUint32(5), windowSize: e.getUint32(9), maxPacketSize: e.getUint32(13) };
    case 102:
      return { ID: t2[0], channelID: e.getUint32(1) };
    case 103:
      return { ID: t2[0], channelID: e.getUint32(1), additionalBytes: e.getUint32(5) };
    default:
      throw `unmarshal of unknown type: ${t2[0]}`;
  }
}
var ue = { messages: false, bytes: false };
var Rt = 9;
var _t = Number.MAX_VALUE;
var Je = class {
  conn;
  channels;
  incoming;
  enc;
  dec;
  done;
  closed;
  constructor(e) {
    this.conn = e, this.enc = new Ke(e), this.dec = new Ye(e), this.channels = [], this.incoming = new pe(), this.done = this.loop(), this.closed = false;
  }
  async open() {
    let e = this.newChannel();
    if (e.maxIncomingPayload = Xe, await this.enc.encode({ ID: 100, windowSize: e.myWindow, maxPacketSize: e.maxIncomingPayload, senderID: e.localId }), await e.ready.shift()) return e;
    throw "failed to open";
  }
  accept() {
    return this.incoming.shift();
  }
  async close() {
    for (let e of Object.keys(this.channels)) {
      let r = parseInt(e);
      this.channels[r] !== void 0 && this.channels[r].shutdown();
    }
    this.conn.close(), this.closed = true, await this.done;
  }
  async loop() {
    try {
      for (; ; ) {
        let e = await this.dec.decode();
        if (e === null) {
          this.close();
          return;
        }
        if (e.ID === 100) {
          await this.handleOpen(e);
          continue;
        }
        let r = e, n = this.getCh(r.channelID);
        if (n === void 0) {
          if (this.closed) return;
          continue;
        }
        await n.handle(r);
      }
    } catch (e) {
      if (e.message && e.message.contains && e.message.contains("Connection reset by peer")) return;
      throw e;
    }
  }
  async handleOpen(e) {
    if (e.maxPacketSize < Rt || e.maxPacketSize > _t) {
      await this.enc.encode({ ID: 102, channelID: e.senderID });
      return;
    }
    let r = this.newChannel();
    r.remoteId = e.senderID, r.maxRemotePayload = e.maxPacketSize, r.remoteWin = e.windowSize, r.maxIncomingPayload = Xe, this.incoming.push(r), await this.enc.encode({ ID: 101, channelID: r.remoteId, senderID: r.localId, windowSize: r.myWindow, maxPacketSize: r.maxIncomingPayload });
  }
  newChannel() {
    let e = new Ze(this);
    return e.remoteWin = 0, e.myWindow = fr, e.localId = this.addCh(e), e;
  }
  getCh(e) {
    let r = this.channels[e];
    return r && r.localId !== e && console.log("bad ids:", e, r.localId, r.remoteId), r;
  }
  addCh(e) {
    return this.channels.forEach((r, n) => {
      if (r === void 0) return this.channels[n] = e, n;
    }), this.channels.push(e), this.channels.length - 1;
  }
  rmCh(e) {
    delete this.channels[e];
  }
};
var Xe = 1 << 24;
var fr = 64 * Xe;
var Ze = class {
  localId;
  remoteId;
  maxIncomingPayload;
  maxRemotePayload;
  session;
  ready;
  sentEOF;
  sentClose;
  remoteWin;
  myWindow;
  readBuf;
  writers;
  constructor(e) {
    this.localId = 0, this.remoteId = 0, this.maxIncomingPayload = 0, this.maxRemotePayload = 0, this.sentEOF = false, this.sentClose = false, this.remoteWin = 0, this.myWindow = 0, this.ready = new pe(), this.session = e, this.writers = [], this.readBuf = new $e();
  }
  ident() {
    return this.localId;
  }
  async read(e) {
    let r = await this.readBuf.read(e);
    if (r !== null) try {
      await this.adjustWindow(r);
    } catch (n) {
      if (n !== "EOF" && n.name !== "BadResource") throw n;
    }
    return r;
  }
  write(e) {
    return this.sentEOF ? Promise.reject("EOF") : new Promise((r, n) => {
      let s = 0, o = () => {
        if (this.sentEOF || this.sentClose) {
          n("EOF");
          return;
        }
        if (e.byteLength == 0) {
          r(s);
          return;
        }
        let l = Math.min(this.maxRemotePayload, e.length), m = this.reserveWindow(l);
        if (m == 0) {
          this.writers.push(o);
          return;
        }
        let g = e.slice(0, m);
        this.send({ ID: 104, channelID: this.remoteId, length: g.length, data: g }).then(() => {
          if (s += g.length, e = e.slice(g.length), e.length == 0) {
            r(s);
            return;
          }
          this.writers.push(o);
        });
      };
      o();
    });
  }
  reserveWindow(e) {
    return this.remoteWin < e && (e = this.remoteWin), this.remoteWin -= e, e;
  }
  addWindow(e) {
    for (this.remoteWin += e; this.remoteWin > 0; ) {
      let r = this.writers.shift();
      if (!r) break;
      r();
    }
  }
  async closeWrite() {
    this.sentEOF = true, await this.send({ ID: 105, channelID: this.remoteId }), this.writers.forEach((e) => e()), this.writers = [];
  }
  async close() {
    if (this.readBuf.eof(), !this.sentClose) {
      for (await this.send({ ID: 106, channelID: this.remoteId }), this.sentClose = true; await this.ready.shift() !== null; ) ;
      return;
    }
    this.shutdown();
  }
  shutdown() {
    this.readBuf.close(), this.writers.forEach((e) => e()), this.ready.close(), this.session.rmCh(this.localId);
  }
  async adjustWindow(e) {
    this.myWindow += e, await this.send({ ID: 103, channelID: this.remoteId, additionalBytes: e });
  }
  send(e) {
    if (this.sentClose) throw "EOF";
    return this.sentClose = e.ID === 106, this.session.enc.encode(e);
  }
  handle(e) {
    if (e.ID === 104) {
      this.handleData(e);
      return;
    }
    if (e.ID === 106) {
      this.close();
      return;
    }
    if (e.ID === 105 && this.readBuf.eof(), e.ID === 102) {
      this.session.rmCh(e.channelID), this.ready.push(false);
      return;
    }
    if (e.ID === 101) {
      if (e.maxPacketSize < Rt || e.maxPacketSize > _t) throw "invalid max packet size";
      this.remoteId = e.senderID, this.maxRemotePayload = e.maxPacketSize, this.addWindow(e.windowSize), this.ready.push(true);
      return;
    }
    e.ID === 103 && this.addWindow(e.additionalBytes);
  }
  handleData(e) {
    if (e.length > this.maxIncomingPayload) throw "incoming packet exceeds maximum payload size";
    if (this.myWindow < e.length) throw "remote side wrote too much";
    this.myWindow -= e.length, this.readBuf.write(e.data);
  }
};
var Bt = {};
yr(Bt, { Conn: () => Qe, connect: () => $r });
function $r(t2, e) {
  return new Promise((r) => {
    let n = new WebSocket(t2);
    n.onopen = () => r(new Qe(n)), e && (n.onclose = e);
  });
}
var Qe = class {
  ws;
  waiters;
  chunks;
  isClosed;
  constructor(e) {
    this.isClosed = false, this.waiters = [], this.chunks = [], this.ws = e, this.ws.binaryType = "arraybuffer", this.ws.onmessage = (n) => {
      let s = new Uint8Array(n.data);
      if (this.chunks.push(s), this.waiters.length > 0) {
        let o = this.waiters.shift();
        o && o();
      }
    };
    let r = this.ws.onclose;
    this.ws.onclose = (n) => {
      r && r.bind(this.ws)(n), this.close();
    };
  }
  read(e) {
    return new Promise((r) => {
      var n = () => {
        if (this.isClosed) {
          r(null);
          return;
        }
        if (this.chunks.length === 0) {
          this.waiters.push(n);
          return;
        }
        let s = 0;
        for (; s < e.length; ) {
          let o = this.chunks.shift();
          if (o == null) {
            r(s);
            return;
          }
          let l = o.slice(0, e.length - s);
          if (e.set(l, s), s += l.length, o.length > l.length) {
            let m = o.slice(l.length);
            this.chunks.unshift(m);
          }
        }
        r(s);
      };
      n();
    });
  }
  write(e) {
    return this.ws.send(e), Promise.resolve(e.byteLength);
  }
  close() {
    this.isClosed || (this.isClosed = true, this.waiters.forEach((e) => e()), this.ws.close());
  }
};
var Ft = class {
  port;
  waiters;
  chunks;
  isClosed;
  constructor(e) {
    this.isClosed = false, this.waiters = [], this.chunks = [], this.port = e, this.port.onmessage = (r) => {
      let n = new Uint8Array(r.data);
      if (this.chunks.push(n), this.waiters.length > 0) {
        let s = this.waiters.shift();
        s && s();
      }
    };
  }
  read(e) {
    return new Promise((r) => {
      var n = () => {
        if (this.isClosed) {
          r(null);
          return;
        }
        if (this.chunks.length === 0) {
          this.waiters.push(n);
          return;
        }
        let s = 0;
        for (; s < e.length; ) {
          let o = this.chunks.shift();
          if (o == null) {
            r(s);
            return;
          }
          let l = o.slice(0, e.length - s);
          if (e.set(l, s), s += l.length, o.length > l.length) {
            let m = o.slice(l.length);
            this.chunks.unshift(m);
          }
        }
        r(s);
      };
      n();
    });
  }
  write(e) {
    return this.port.postMessage(e, [e.buffer]), Promise.resolve(e.byteLength);
  }
  close() {
    this.isClosed || (this.isClosed = true, this.waiters.forEach((e) => e()), this.port.close());
  }
};

// wanixjs/wanix.js
var WanixFS = class {
  constructor(port) {
    const sess = new Je(new Ft(port));
    this.peer = new je(sess, new ir());
  }
  async readDir(name) {
    return (await this.peer.call("ReadDir", [name])).value;
  }
  async makeDir(name) {
    await this.peer.call("Mkdir", [name]);
  }
  async bind(name, newname) {
    await this.peer.call("Bind", [name, newname]);
  }
  async unbind(name, newname) {
    await this.peer.call("Unbind", [name, newname]);
  }
  async readFile(name) {
    return (await this.peer.call("ReadFile", [name])).value;
  }
  async stat(name) {
    return (await this.peer.call("Stat", [name])).value;
  }
  async writeFile(name, contents) {
    if (typeof contents === "string") {
      contents = new TextEncoder().encode(contents);
    }
    return (await this.peer.call("WriteFile", [name, contents])).value;
  }
  async remove(name) {
    await this.peer.call("Remove", [name]);
  }
  async truncate(name, size) {
    await this.peer.call("Truncate", [name, size]);
  }
  async open(name) {
    return (await this.peer.call("Open", [name])).value;
  }
  async read(fd, count) {
    return (await this.peer.call("Read", [fd, count])).value;
  }
  async write(fd, data) {
    return (await this.peer.call("Write", [fd, data])).value;
  }
  async close(fd) {
    return (await this.peer.call("Close", [fd])).value;
  }
  async sync(fd) {
    return (await this.peer.call("Sync", [fd])).value;
  }
};
var Wanix = class extends WanixFS {
  constructor(config = {}) {
    if (window.wanix) {
      throw new Error("Wanix already initialized on this page");
    }
    const sys = new MessageChannel();
    super(sys.port1);
    window.wanix = this.context = {
      config,
      instance: this,
      sys: new Ft(sys.port2),
      sw: new MessageChannel(),
      _toport: (port) => new Ft(port)
      // kludge: for worker
    };
    if (config.helpers) {
      setupConsoleHelpers();
    }
    const go = new window.Go();
    WebAssembly.instantiateStreaming(fetch("./wanix.wasm"), go.importObject).then((obj) => {
      go.run(obj.instance);
    });
  }
};
if (globalThis.window) {
  window.Wanix = Wanix;
}
function setupConsoleHelpers() {
  window.list = (name) => {
    window.wanix.instance.readDir(name).then(console.log);
  };
  window.read = (name) => {
    window.wanix.instance.readFile(name).then((d) => new TextDecoder().decode(d)).then(console.log);
  };
  window.readBytes = (name) => {
    window.wanix.instance.readFile(name).then(console.log);
  };
  window.write = (name, content) => {
    window.wanix.instance.writeFile(name, content);
  };
  window.mkdir = (name) => {
    window.wanix.instance.makeDir(name);
  };
  window.bind = (name, newname) => {
    window.wanix.instance.bind(name, newname);
  };
  window.unbind = (name, newname) => {
    window.wanix.instance.unbind(name, newname);
  };
  window.rm = (name) => {
    window.wanix.instance.remove(name);
  };
  window.stat = (name) => {
    window.wanix.instance.stat(name).then(console.log);
  };
  window.tail = async (name) => {
    const fd = await window.wanix.instance.open(name);
    while (true) {
      const data = await window.wanix.instance.read(fd, 1024);
      if (!data) {
        break;
      }
      console.log(new TextDecoder().decode(data));
    }
    window.wanix.instance.close(fd);
  };
  window.bootShell = async (screen = false) => {
    if (screen) {
      const screen2 = document.createElement("div");
      const div = document.createElement("div");
      const canvas = document.createElement("canvas");
      screen2.appendChild(div);
      screen2.appendChild(canvas);
      screen2.id = "screen";
      document.body.appendChild(screen2);
    }
    const w = window.wanix.instance;
    const query = new URLSearchParams(window.location.search);
    const url = query.get("tty");
    if (url) {
      await w.readFile("cap/new/ws");
      await w.writeFile("cap/1/ctl", `mount ${url}`);
      await w.readFile("web/vm/new");
      await w.writeFile("task/1/ctl", "bind cap/1/data web/vm/1/ttyS0");
    } else {
      await w.readFile("web/dom/new/xterm");
      await w.writeFile("web/dom/body/ctl", "append-child 1");
      await w.readFile("web/vm/new");
      await w.writeFile("task/1/ctl", "bind web/dom/1/data web/vm/1/ttyS0");
    }
    await w.writeFile("task/1/ctl", "bind . web/vm/1/fsys");
    await w.writeFile("task/1/ctl", "bind #shell web/vm/1/fsys");
    await w.writeFile("web/vm/1/ctl", "start");
  };
}
export {
  CallBuffer,
  ConsoleStdout,
  Directory2 as Directory,
  DirectoryHandle,
  EmptyFile,
  File2 as File,
  FileHandle,
  OpenEmptyFile,
  OpenFile2 as OpenFile,
  PreopenDirectory2 as PreopenDirectory,
  WASI,
  WanixFS,
  applyPatchPollOneoff
};
