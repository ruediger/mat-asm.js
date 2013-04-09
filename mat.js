"use strict";

/// Testing stuff
var _check_passed = 0;
var _check_no = 0;

function _check_formatarg(x) { return x; };
function _check_equalp (a, b) {
  return a === b;
};
// This is a bit silly but vecs and mats are just ints...
var formatarg = _check_formatarg;
var equalp = _check_equalp;

function check_reset() {
  formatarg = _check_formatarg;
  equalp = _check_equalp;
}

function _check_error_msg(a, b, name, cmp) {
  console.error("Check '" + (name ? name : "unnamed") + ":" + _check_no +
                "' Failed: " + formatarg(a) + " " + cmp + " " + formatarg(b));
}

function check_eq(a, b, name) {
  ++_check_no;
  if(!equalp(a, b)) {
    _check_error_msg(a, b, name, "ne");
  }
  else {
    ++_check_passed;
  }
}

function check_ne(a, b, name) {
  if(equalp(a, b)) {
    _check_error_msg(a, b, name, "eq");
  }
}

function check_status() {
  console.info("Passed " + _check_passed + " of " + _check_no + " tests!");
}

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

    function equal(a, b) {
      a = a|0;
      b = b|0;
      return ((+get(a,0) == +get(b,0))|0 +
              (+get(a,1) == +get(b,1))|0 +
              (+get(a,2) == +get(b,2))|0)|0;
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
      negate : negate,
      normalize : normalize,
      dot : dot,
      cross : cross,
      equal : equal
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

/// Vec3 tests
var a = vec3.create(); // [0,0,0]
check_eq(vec3.get(a, 0), 0.0);
check_eq(vec3.get(a, 1), 0.0);
check_eq(vec3.get(a, 2), 0.0);
var b = vec3.fromValues(1.0, 2.0, 3.0);
check_eq(vec3.get(b, 0), 1.0);
check_eq(vec3.get(b, 1), 2.0);
check_eq(vec3.get(b, 2), 3.0);
var c = vec3.clone(a);
check_eq(vec3.get(c, 0), 0.0);
check_eq(vec3.get(c, 1), 0.0);
check_eq(vec3.get(c, 2), 0.0);
check_ne(a, b);
check_ne(b, c);
check_ne(a, c);

formatarg = vec3.format;
equalp = vec3.equal;
vec3.add(c, a, b); // c = a + b
check_eq(c, b, "vec3.add#1.1");
check_ne(c, a, "vec3.add#1.2");

vec3.add(c, a, a);
check_eq(c, a, "vec3.add#2.1");
check_ne(c, b, "vec3.add#2.2");

vec3.sub(c, b, b);
check_ne(c, b, "vec3.subtract#1.1");
check_eq(c, a, "vec3.subtract#1.2");

vec3.setValues(a, 1.0, 1.0, 1.0);
vec3.add(c, a, b);
var v = vec3.fromValues(2.0, 3.0, 4.0);
check_eq(c, v, "vec3.add#3");

vec3.sub(c, b, a);
vec3.setValues(v, 0.0, 1.0, 2.0);
check_eq(c, v, "vec3.subtract#2");

vec3.subtract(c, a, b);
vec3.setValues(v, 0.0, -1.0, -2.0);
check_eq(c, v, "vec3.subtract#3");

vec3.negate(c, b);
vec3.setValues(v, -1.0, -2.0, -3.0);
check_eq(c, v, "vec3.negate");

vec3.scale(c, b, 2.0);
vec3.setValues(v, 2.0, 4.0, 6.0);
check_eq(c, v, "vec3.scale");

vec3.cross(c, a, b);
vec3.setValues(v, 1.0, -2.0, 1.0);
check_eq(c, v, "vec3.cross");

check_reset();
var tmp = vec3.squareLength(a);
check_eq(tmp, 3.0, "vec3.squareLength#1");
tmp = vec3.squareLength(b);
check_eq(tmp, 14.0, "vec3.squareLength#2");
vec3.setValues(v, 0.0, 1.0, 0.0);
tmp = vec3.length(v);
check_eq(tmp, 1.0, "vec3.length");
vec3.setValues(v, 0.0, 0.0, 0.0);
vec3.normalize(c, v);
check_eq(vec3.get(c, 0), 0.0, "vec3.norm");
check_eq(vec3.get(c, 1), 0.0, "vec3.norm");
check_eq(vec3.get(c, 2), 0.0, "vec3.norm");

tmp = vec3.squareLength(b);
var tmp2 = vec3.dot(b, b);
check_eq(tmp, tmp2, "vec3.dot#1");
tmp = vec3.dot(a, b);
check_eq(tmp, 6.0, "vec3.dot#2");

/// Mat4: 4×4 Matrix
function createMat4(heap_size) { // heap_size is optional.
  if(heap_size === undefined || heap_size < 4096) {
    heap_size = 4096;
  }
  var heap = new ArrayBuffer(4096);
  var mat4 = (function(stdlib, foreign, heap) {
    "use asm";

    var vec3_get = foreign.vec3_get;
    var vec3_set = foreign.vec3_set;

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

    function copy(Out, A) {
      Out = Out|0;
      A = A|0;
      var i = 0,
          j = 0;
      //HEAP.set(HEAP.subarray(ptr_from|0, (ptr_from+16)|0), ptr_to|0);
      for(; (i|0) < 4; i = ((i|0) + 1)|0) {
        for(; (j|0) < 4; j = ((j|0) + 1)|0) {
          set(Out, i, j, +get(A, i, j));
        }
        //HEAP[ (ptr_to + i)>>2 ] = +HEAP[ (ptr_from + i)>>2 ];
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

    function equal(A, B) {
      A = A|0;
      B = B|0;
      var ret = 0;
      var i = 0;
      var j = 0;
      for(i=0; (i|0) < 4; i = ((i|0) + 1)|0) {
        for(j=0; (j|0) < 4; j = ((j|0) + 1)|0) {
          ret = ((ret|0) + ((+get(A, i, j) == +get(B, i, j))|0))|0;
        }
      }
      return ret|0;
    }

    function fromValues(a00, a01, a02, a03,
                        a10, a11, a12, a13,
                        a20, a21, a22, a23,
                        a30, a31, a32, a33)
    {
      a00 = +a00; a01 = +a01; a02 = +a02; a03 = +a03;
      a10 = +a10; a11 = +a11; a12 = +a12; a13 = +a13;
      a20 = +a20; a21 = +a21; a22 = +a22; a23 = +a23;
      a30 = +a30; a31 = +a31; a32 = +a32; a33 = +a33;
      var out = 0;
      out = _newmat()|0;
      setValues(out,
                a00, a01, a02, a03,
                a10, a11, a12, a13,
                a20, a21, a22, a23,
                a30, a31, a32, a33);
      return out|0;
    }

    function setValues(A,
                       a00, a01, a02, a03,
                       a10, a11, a12, a13,
                       a20, a21, a22, a23,
                       a30, a31, a32, a33)
    {
      A = A|0;
      a00 = +a00; a01 = +a01; a02 = +a02; a03 = +a03;
      a10 = +a10; a11 = +a11; a12 = +a12; a13 = +a13;
      a20 = +a20; a21 = +a21; a22 = +a22; a23 = +a23;
      a30 = +a30; a31 = +a31; a32 = +a32; a33 = +a33;
      set(A, 0, 0, a00); set(A, 0, 1, a01); set(A, 0, 2, a02); set(A, 0, 3, a03);
      set(A, 1, 0, a10); set(A, 1, 1, a11); set(A, 1, 2, a12); set(A, 1, 3, a13);
      set(A, 2, 0, a20); set(A, 2, 1, a21); set(A, 2, 2, a22); set(A, 2, 3, a23);
      set(A, 3, 0, a30); set(A, 3, 1, a31); set(A, 3, 2, a32); set(A, 3, 3, a33);
      return;
    }

    function transpose(Out, A) {
      Out = Out|0;
      A = A|0;
      var a10 = 0.0,
          a20 = 0.0, a21 = 0.0,
          a30 = 0.0, a31 = 0.0, a32 = 0.0;
      // cache values in case Out === A
      a10 = +get(A, 1, 0);
      a20 = +get(A, 2, 0);
      a21 = +get(A, 2, 1);
      a30 = +get(A, 3, 0);
      a31 = +get(A, 3, 1);
      a32 = +get(A, 3, 2);

      set(Out, 1, 0, +get(A, 0, 1));
      set(Out, 2, 0, +get(A, 0, 2));
      set(Out, 2, 1, +get(A, 1, 2));
      set(Out, 3, 0, +get(A, 0, 3));
      set(Out, 3, 1, +get(A, 1, 3));
      set(Out, 3, 2, +get(A, 2, 3));

      set(Out, 0, 1, a10);
      set(Out, 0, 2, a20);
      set(Out, 1, 2, a21);
      set(Out, 0, 3, a30);
      set(Out, 1, 3, a31);
      set(Out, 2, 3, a32);

      if((Out|0) != (A|0)) {
        set(Out, 0, 0, +get(A, 0, 0));
        set(Out, 1, 1, +get(A, 1, 1));
        set(Out, 2, 2, +get(A, 2, 2));
        set(Out, 3, 3, +get(A, 3, 3));
      }
    }

    // alternative for transpose
    function transpose2(ptr_to, ptr_from) {
      ptr_to = ptr_to|0;
      ptr_from = ptr_from|0;
      var i = 0;
      for(; (i|0) < 64; i = ((i|0) + 4)|0) {
        HEAP[ (ptr_to + i)>>2 ] = +HEAP[ (ptr_from + i)>>2 ];
      }
      return;
    }

    function determinant(A) {
      A = A|0;
      return +(
          +(+get(A, 0, 0) * +get(A, 1, 1) - +get(A, 0, 1) * +get(A, 1, 0)) *
          +(+get(A, 2, 2) * +get(A, 3, 3) - +get(A, 2, 3) * +get(A, 3, 2)) -

          +(+get(A, 0, 0) * +get(A, 1, 2) - +get(A, 0, 2) * +get(A, 1, 0)) *
          +(+get(A, 2, 1) * +get(A, 3, 3) - +get(A, 2, 3) * +get(A, 3, 1)) +

          +(+get(A, 0, 0) * +get(A, 1, 3) - +get(A, 0, 3) * +get(A, 1, 0)) *
          +(+get(A, 2, 1) * +get(A, 3, 2) - +get(A, 2, 2) * +get(A, 3, 1)) +

          +(+get(A, 0, 1) * +get(A, 1, 2) - +get(A, 0, 2) * +get(A, 1, 1)) *
          +(+get(A, 2, 0) * +get(A, 3, 3) - +get(A, 2, 3) * +get(A, 3, 0)) -

          +(+get(A, 0, 1) * +get(A, 1, 3) - +get(A, 0, 3) * +get(A, 1, 1)) *
          +(+get(A, 2, 0) * +get(A, 3, 2) - +get(A, 2, 2) * +get(A, 3, 0)) +

          +(+get(A, 0, 2) * +get(A, 1, 3) - +get(A, 0, 3) * +get(A, 1, 2)) *
          +(+get(A, 2, 0) * +get(A, 3, 1) - +get(A, 2, 1) * +get(A, 3, 0))
        );
    }

    // Translate mat4 A by vec3 V and store in mat4 Out
    function translate(Out, A, V) {
      /*
       *           1   0   0   x
       *           0   1   0   y
       * Out = A × 0   0   1   z
       *           0   0   0   1
       */
      Out = Out|0; // mat4
      A = A|0; // mat4
      V = V|0; // vec3
      var x = 0.0,
          y = 0.0,
          z = 0.0;
      x = +vec3_get(~~V, 0);
      y = +vec3_get(~~V, 1);
      z = +vec3_get(~~V, 2);
      if((A|0) != (Out|0)) {
        copy(Out, A);
      }
      set(Out, 0, 3, +get(A, 0, 0) * x + +get(A, 0, 1) * y + +get(A, 0, 2) * z + +get(A, 0, 3));
      set(Out, 1, 3, +get(A, 1, 0) * x + +get(A, 1, 1) * y + +get(A, 1, 2) * z + +get(A, 1, 3));
      set(Out, 2, 3, +get(A, 2, 0) * x + +get(A, 2, 1) * y + +get(A, 2, 2) * z + +get(A, 2, 3));
      set(Out, 3, 3, +get(A, 3, 0) * x + +get(A, 3, 1) * y + +get(A, 3, 2) * z + +get(A, 3, 3));
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
      mul : multiply,
      equal : equal,
      setValues : setValues,
      fromValues : fromValues,
      transpose : transpose,
      determinant : determinant,
      det : determinant,
      translate : translate
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

/// Mat4 Tests
check_reset();

var A = mat4.create();
mat4.set(A, 0, 0, 4.0);
check_eq(mat4.get(A, 0, 0), 4.0, "mat4: set (a00)");
mat4.set(A, 0, 1, 3.0);
check_eq(mat4.get(A, 0, 1), 3.0, "mat4: set (a01)");
mat4.set(A, 0, 2, 1.0);
check_eq(mat4.get(A, 0, 2), 1.0, "mat4: set (a02)");

var B = mat4.create();
mat4.set(B, 0, 0, 0.0);
check_eq(mat4.get(B, 0, 0), 0.0, "mat4: set (b00)");
mat4.set(B, 1, 1, 0.0);
check_eq(mat4.get(B, 1, 1), 0.0, "mat4: set (b11)");

var C = mat4.create();

check_ne(A, B);
check_ne(A, C);
check_eq(A, A, "mat4: self eq");
check_eq(B, B, "mat4: self eq");
check_eq(C, C, "mat4: self eq");

formatarg = mat4.format;
equalp = mat4.equal;

mat4.multiply(C, A, B); // C = A × B
mat4.setValues(B,
               0.0, 0.0, 1.0, 0.0,
               0.0, 0.0, 0.0, 0.0,
               0.0, 0.0, 1.0, 0.0,
               0.0, 0.0, 0.0, 1.0);
check_eq(C, B, "mat4.multiply");

mat4.setValues(A,
               1.0, 0.0, 0.0, 0.0,
               0.0, 1.0, 0.0, 0.0,
               0.0, 0.0, 1.0, 0.0,
               0.0, 0.0, 0.0, 1.0);
mat4.identity(B);
check_eq(A, B, "mat4.identity");

mat4.copy(B, C);
check_eq(B, C, "mat4.copy");

mat4.setValues(A,
                1.0,  2.0,  3.0,  4.0,
                5.0,  6.0,  7.0,  8.0,
                9.0, 10.0, 11.0, 12.0,
               13.0, 14.0, 15.0, 16.0);
mat4.copy(C, A);
check_eq(C, A, "mat4.copy");
mat4.setValues(B,
                1.0,  5.0,  9.0, 13.0,
                2.0,  6.0, 10.0,  8.0,
                3.0,  7.0, 11.0, 15.0,
                4.0,  8.0, 12.0, 16.0);
mat4.transpose(C, A);
check_eq(C, B, "mat4.transpose");

mat4.transpose(B, B);
check_eq(B, A, "mat4.transpose self");

mat4.setValues(A,
                1.0,  2.0,  3.0,  4.0,
                5.0,  6.0,  7.0,  8.0,
                9.0, 10.0, 11.0, 12.0,
               13.0, 14.0, 15.0, 16.0);
vec3.setValues(v, 3.0, 4.0, 5.0);
mat4.translate(C, A, v);
mat4.setValues(B,
                1.0,  2.0,  3.0,  30.0,
                5.0,  6.0,  7.0,  82.0,
                9.0, 10.0, 11.0, 134.0,
               13.0, 14.0, 15.0, 186.0);
check_eq(C, B, "mat4.translate");

check_reset();
mat4.setValues(B,
               1.0,  5.0,  9.0, 13.0,
               2.0,  6.0, 10.0,  8.0,
               3.0,  7.0, 11.0, 15.0,
               4.0,  8.0, 12.0, 16.0);
check_eq(mat4.determinant(B), 0.0, "mat4.determinant");
mat4.identity(B);
check_eq(mat4.determinant(B), 1.0, "mat4.determinant (identity)");

check_status();
