"use strict";

/// Vec3: 3 element Vector
function createVec3(heap_size) {
  if(heap_size === undefined || heap_size < 4096) {
    heap_size = 4096;
  }
  var heap = new ArrayBuffer(heap_size);
  var vec3 = (function(stdlib, foreign, heap) {
    "use asm";

    var sqrt = stdlib.Math.sqrt;

    var HEAP = new stdlib.Float32Array(heap);
    var last = 0;

    function create() {
      var ptr = 0;
      ptr = last|0;
      last = (ptr + 12)|0;
      return ptr|0;
    }

    function copy(to, from) {
      to = to|0;
      from = from|0;
      HEAP[(to + 0<<2)>>2] = +HEAP[(from + 0<<2)>>2];
      HEAP[(to + 1<<2)>>2] = +HEAP[(from + 1<<2)>>2];
      HEAP[(to + 2<<2)>>2] = +HEAP[(from + 2<<2)>>2];
      return;
    }

    function clone(v) {
      v = v|0;
      var ptr = 0;
      ptr = create();
      copy(ptr, v);
      return ptr|0;
    }

    function setValues(ptr, x, y, z) {
      ptr = ptr|0;
      x = +x;
      y = +y;
      z = +z;
      HEAP[(ptr + 0<<2)>>2] = x;
      HEAP[(ptr + 1<<2)>>2] = y;
      HEAP[(ptr + 2<<2)>>2] = z;
      return;
    }

    function fromValues(x, y, z) {
      x = +x;
      y = +y;
      z = +z;
      var ptr = 0;
      ptr = create();
      setValues(ptr, x, y, z);
      return ptr|0;
    }

    function get(v, i) {
      v = v|0;
      i = i|0;
      return +HEAP[(v + i<<2)>>2];
    }

    function set(v, i, x) {
      v = v|0;
      i = i|0;
      x = +x;
      HEAP[(v + i<<2)>>2] = x;
      return;
    }

    function add(out, a, b) {
      out = out|0;
      a = a|0;
      b = b|0;
      setValues(out,
                +get(a, 0) + +get(b, 0),
                +get(a, 1) + +get(b, 1),
                +get(a, 2) + +get(b, 2));
      return;
    }

    function subtract(out, a, b) {
      out = out|0;
      a = a|0;
      b = b|0;
      setValues(out,
                +get(a, 0) - +get(b, 0),
                +get(a, 1) - +get(b, 1),
                +get(a, 2) - +get(b, 2));
      return;
    }

    function scale(out, v, c) {
      out = out|0;
      v = v|0;
      c = +c;
      setValues(out, c * +get(v, 0), c * +get(v, 1), c * +get(v, 2));
      return;
    }

    function squareLength(v) {
      v = v|0;
      return +(+get(v, 0) * +get(v, 0) + +get(v, 1) * +get(v, 1) + +get(v, 2) * +get(v, 2));
    }

    function length(v) {
      v = v|0;
      return +sqrt(squareLength(v));
    }

    function negate(out, v) {
      out = out|0;
      v = v|0;
      setValues(out,
                -(+get(v,0)),
                -(+get(v,1)),
                -(+get(v,2)));
      return;
    }

    function normalize(out, v) {
      out = out|0;
      v = v|0;
      var len = 0.0;
      len = +length(v);
      if(+len > 0.0) {
        setValues(out,
                  +get(v,0)/len,
                  +get(v,1)/len,
                  +get(v,2)/len);
      }
      else {
        copy(out, v);
      }
      return;
    }

    function dot(a, b) {
      a = a|0;
      b = b|0;
      return +(+get(a,0) * +get(b,0) +
               +get(a,1) * +get(b,1) +
               +get(a,2) * +get(b,2) );
    }

    function cross(out, a, b) {
      out = out|0;
      a = a|0;
      b = b|0;
      setValues(out,
                +get(a,1)*+get(b,2) - +get(a,2)*+get(b,1),
                +get(a,2)*+get(b,0) - +get(a,0)*+get(b,2),
                +get(a,0)*+get(b,1) - +get(a,1)*+get(b,0));
      return;
    }

    return {
      create : create,
      clone : clone,
      copy : copy,
      fromValues : fromValues,
      setValues : setValues,
      get : get,
      set : set,
      add : add,
      subtract : subtract,
      sub : subtract,
      scale : scale,
      squareLength : squareLength,
      sqrLen : squareLength,
      length : length,
      len : length,
      normalize : normalize,
      dot : dot,
      cross : cross
    };
  })(window, null, heap);

  vec3.format = function(v) {
    var s = "";
    for(var i = 0; i < 3; ++i) {
      s += "(" + vec3.get(v, i) + ")\n";
    }
    return s;
  };

  var tmp = new Float32Array(heap);

  vec3.getArray = function(v) {
    return tmp.subarray(A, A+3);
  };

  return vec3;
}

var vec3 = createVec3();

/// Mat4: 4×4 Matrix
function createMat4(heap_size) { // heap_size is optional.
  if(heap_size === undefined || heap_size < 4096) {
    heap_size = 4096;
  }
  var heap = new ArrayBuffer(4096);
  var mat4 = (function createMat4_asmjs(stdlib, foreign, heap) {
    "use asm";

    var HEAP = new stdlib.Float32Array(heap);
    var last = 0;

    function identity(ptr) {
      ptr = ptr|0;
      HEAP[(ptr+0<<2)>>2]  = 1.0;
      HEAP[(ptr+1<<2)>>2]  = 0.0;
      HEAP[(ptr+2<<2)>>2]  = 0.0;
      HEAP[(ptr+3<<2)>>2]  = 0.0;

      HEAP[(ptr+4<<2)>>2]  = 0.0;
      HEAP[(ptr+5<<2)>>2]  = 1.0;
      HEAP[(ptr+6<<2)>>2]  = 0.0;
      HEAP[(ptr+7<<2)>>2]  = 0.0;

      HEAP[(ptr+8<<2)>>2]  = 0.0;
      HEAP[(ptr+9<<2)>>2]  = 0.0;
      HEAP[(ptr+10<<2)>>2] = 1.0;
      HEAP[(ptr+11<<2)>>2] = 0.0;

      HEAP[(ptr+12<<2)>>2] = 0.0;
      HEAP[(ptr+13<<2)>>2] = 0.0;
      HEAP[(ptr+14<<2)>>2] = 0.0;
      HEAP[(ptr+15<<2)>>2] = 1.0;
      return;
    }

    function _newmat() {
      var ptr = 0;
      ptr = last|0;
      last = ((last|0) + 64)|0; // 64bytes = (4*4) * 4bytes
      return ptr|0;
    }

    function create() {
      var ptr = 0;
      ptr = _newmat()|0;
      identity(ptr);
      return ptr|0;
    }

    function clone(ptr) {
      ptr = ptr|0;
      var new_ptr = 0;
      new_ptr = _newmat()|0;
      copy(new_ptr, ptr);
      return new_ptr|0;
    }

    function copy(ptr_to, ptr_from) {
      ptr_to = ptr_to|0;
      ptr_from = ptr_from|0;
      var i = 0;
      //HEAP.set(HEAP.subarray(ptr_from|0, (ptr_from+16)|0), ptr_to|0);
      for(; i|0 < 64; i = (i|0 + 4)|0) {
        HEAP[ (ptr_to + i)>>2 ] = +HEAP[ (ptr_from + i)>>2 ];
      }
      return;
    }

    function set(ptr, i, j, value) {
      ptr = ptr|0;
      i = i|0;
      j = j|0;
      value = +value;

      HEAP[ (ptr + (i + 4*j)<<2)>>2 ] = value;
      return;
    }

    function get(ptr, i, j) {
      ptr = ptr|0;
      i = i|0;
      j = j|0;

      return +HEAP[ (ptr + (i + 4*j)<<2)>>2 ];
    }

    function multiply(out, a, b) {
      out = out|0;
      a = a|0;
      b = b|0;

      var i = 0;
      var j = 0;
      var k = 0;

      var sum = 0.0;

      for(i=0; (i|0) < 4; i = ((i|0) + 1)|0) {
        for(j=0; (j|0) < 4; j = ((j|0) + 1)|0) {
          for(k=0; (k|0) < 4; k = ((k|0) + 1)|0) {
            sum = +sum +
              +( (+get(a, i|0, k|0)) * (+get(b, k|0, j|0)) );
          }
          set(out, i|0, j|0, +sum);
          sum = 0.0;
        }
      }

      return;
    }

    return {
      create : create,
      identity : identity,
      clone : clone,
      copy : copy,
      set : set,
      get : get,
      multiply : multiply,
      mul : multiply
    };
  })(window,
     {
       vec3_get : function(v, i) {
         return vec3.get(v, i);
       },
       vec3_set : function(v, i, x) {
         vec3.set(v, i, x);
       }
     },
     heap);

  mat4.format = function(A) {
    var s = "";
    for(var i = 0; i < 4; ++i) {
      s += "| ";
      for(var j = 0; j < 4; ++j) {
        s += mat4.get(A, i, j) + " ";
      }
      s += "|\n";
    }
    return s + "\n";
  };

  var tmp = new Float32Array(heap);

  mat4.getArray = function(A) {
    return tmp.subarray(A, A+16);
  };

  return mat4;
}

var mat4 = createMat4();

var A = mat4.create();
mat4.set(A, 0, 0, 4.0);
mat4.set(A, 0, 1, 3.0);
mat4.set(A, 0, 2, 1.0);
console.log(mat4.format(A));

var B = mat4.create();
mat4.set(B, 0, 0, 0.0);
mat4.set(B, 1, 1, 0.0);
console.log(mat4.format(B));

var C = mat4.create();

mat4.multiply(C, A, B); // C = A × B

console.log(mat4.format(C));
