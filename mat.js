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

/// Mat4: 4×4 Matrix
function createMat4(heap_size) { // heap_size is optional.
  if(heap_size === undefined || heap_size < 4096) {
    heap_size = 4096;
  }
  var heap = new ArrayBuffer(4096);
  var mat4 = (function(stdlib, foreign, heap) {
    "use asm";

    var sin = stdlib.Math.sin;
    var cos = stdlib.Math.cos;
    var tan = stdlib.Math.tan;
    var abs = stdlib.Math.abs;
    var sqrt = stdlib.Math.sqrt;

    var INF = stdlib.Infinity;

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
      last = (last + 64)|0; // 64bytes = (4*4) * 4bytes
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
      for(; (i|0) < 4; i = (i + 1)|0) {
        for(; (j|0) < 4; j = (j + 1)|0) {
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

    function multiply(Out, A, B) {
      Out = Out|0;
      A = A|0;
      B = B|0;

      var i = 0;
      var j = 0;
      var k = 0;

      var sum = 0.0;

      for(i=0; (i|0) < 4; i = (i + 1)|0) {
        for(j=0; (j|0) < 4; j = (j + 1)|0) {
          for(k=0; (k|0) < 4; k = (k + 1)|0) {
            sum = +sum +
              +( (+get(A, i, k)) * (+get(B, k, j)) );
          }
          set(Out, i, j, sum);
          sum = 0.0;
        }
      }

      return;
    }

    function multiplyScalar(Out, v, A) {
      Out = Out|0;
      v = +v;
      A = A|0;

      var i = 0,
          j = 0;

      for(i=0; (i|0) < 4; i = (i + 1)|0) {
        for(j=0; (j|0) < 4; j = (j + 1)|0) {
          set(Out, i, j, v * +get(A, i, j));
        }
      }

      return;
    }

    function add(Out, A, B) {
      Out = Out|0;
      A = A|0;
      B = B|0;

      var i = 0;
      var j = 0;

      for(i=0; (i|0) < 4; i = (i + 1)|0) {
        for(j=0; (j|0) < 4; j = (j + 1)|0) {
          set(Out, i, j, +get(A, i, j) + +get(B, i, j));
        }
      }

      return;
    }

    function subtract(Out, A, B) {
      Out = Out|0;
      A = A|0;
      B = B|0;

      var i = 0;
      var j = 0;

      for(i=0; (i|0) < 4; i = (i + 1)|0) {
        for(j=0; (j|0) < 4; j = (j + 1)|0) {
          set(Out, i, j, +get(A, i, j) - +get(B, i, j));
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
      for(i=0; (i|0) < 4; i = (i + 1)|0) {
        for(j=0; (j|0) < 4; j = (j + 1)|0) {
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
      return;
    }

    // alternative for transpose
    function transpose2(ptr_to, ptr_from) {
      ptr_to = ptr_to|0;
      ptr_from = ptr_from|0;
      var i = 0;
      for(; (i|0) < 64; i = (i + 4)|0) {
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

    function rotate(Out, A, v, rad) {
      Out = Out|0;
      A = A|0;
      v = v|0;
      rad = +rad;

      var x = 0.0,
          y = 0.0,
          z = 0.0,
          olen = 0.0,
          s = 0.0,
          c = 0.0,
          t = 0.0,
          r00 = 0.0, r01 = 0.0, r02 = 0.0,
          r10 = 0.0, r11 = 0.0, r12 = 0.0,
          r20 = 0.0, r21 = 0.0, r22 = 0.0;
      var i = 0,
          j = 0;

      x = +vec3_get(~~v, 0);
      y = +vec3_get(~~v, 1);
      z = +vec3_get(~~v, 2);
      olen = 1.0/+sqrt(x*x + y*y + z*z);
      x = x * olen; // normalize
      y = y * olen;
      z = z * olen;

      s = +sin(rad);
      c = +cos(rad);
      t = 1.0 - c;

      // construct rotation matrix
      r00 = x * x * t + c;     r01 = y * x * t + z * s; r02 = z * x * t - y * s;
      r10 = x * y * t - z * s; r11 = y * y * t + c;     r12 = z * y * t - x * s;
      r20 = x * z * t + y * s; r21 = y * z * t - x * s; r22 = z * z * t + c;

      // multiply
      for(i = 0; (i|0) < 4; i = (i + 1)|0) {
        set(Out, 0, i, +get(A, 0, i) * r00 + +get(A, 1, i) * r01 + +get(A, 2, i) * r02);
        set(Out, 1, i, +get(A, 0, i) * r10 + +get(A, 1, i) * r11 + +get(A, 2, i) * r12);
        set(Out, 2, i, +get(A, 0, i) * r20 + +get(A, 1, i) * r21 + +get(A, 2, i) * r22);
        set(Out, 3, i, +get(A, 3, i));
      }

      return;
    }

    function copyColumn(Out, A, column) {
      Out = Out|0;
      A = A|0;
      column = column|0;
      var i = 0;
      for(i = 0; (i|0) < 4; i = (i + 1)|0) {
        set(Out, i, column, +get(A, i, column));
      }
      return;
    }

    function rotateX(Out, A, rad) {
      /*
                1 0  0 0
                0 c -s 0
        C = A × 0 s  c 0
                0 0  0 1
       */
      Out = Out|0;
      A = A|0;
      rad = +rad;

      var s = 0.0,
          c = 0.0;
      var i = 0;

      s = +sin(rad);
      c = +cos(rad);

      if( (A|0) != (Out|0) ) {
        copyColumn(Out, A, 0);
        copyColumn(Out, A, 3);
      }

      for(i = 0; (i|0) < 4; i = ((i|0) + 1)|0) {
        set(Out, i, 1, c * +get(A, i, 1) + s * +get(A, i, 2));
        set(Out, i, 2, -s * +get(A, i, 1) + c * +get(A, i, 2));
      }

      return;
    }

    function rotateY(Out, A, rad) {
      /*
                 c 0 s 0
                 0 1 0 0
        C = A × -s 0 c 0
                 0 0 0 1
       */
      Out = Out|0;
      A = A|0;
      rad = +rad;

      var s = 0.0,
          c = 0.0;
      var i = 0;

      s = +sin(rad);
      c = +cos(rad);

      if( (A|0) != (Out|0) ) {
        copyColumn(Out, A, 1);
        copyColumn(Out, A, 3);
      }

      for(i = 0; (i|0) < 4; i = (i + 1)|0) {
        set(Out, i, 0, c * +get(A, i, 0) - s * +get(A, i, 2));
        set(Out, i, 2, s * +get(A, i, 0) + c * +get(A, i, 2));
      }

      return;
    }

    function rotateZ(Out, A, rad) {
      /*
                c -s 0 0
                s  c 0 0
        C = A × 0  0 1 0
                0  0 0 1
       */
      Out = Out|0;
      A = A|0;
      rad = +rad;

      var s = 0.0,
          c = 0.0;
      var i = 0;

      s = +sin(rad);
      c = +cos(rad);

      if( (A|0) != (Out|0) ) {
        copyColumn(Out, A, 2);
        copyColumn(Out, A, 3);
      }

      for(i = 0; (i|0) < 4; i = (i + 1)|0) {
        set(Out, i, 0, c * +get(A, i, 0) + s * +get(A, i, 1));
        set(Out, i, 1, -s * +get(A, i, 0) + c * +get(A, i, 1));
      }

      return;
    }

    function frustum(Out, left, right, bottom, top, near, far) {
      Out = Out|0;
      left = +left;
      right = +right;
      bottom = +bottom;
      top = +top;
      near = +near;
      far = +far;

      var rl = 0.0,
          tb = 0.0,
          nf = 0.0;

      rl = +( 1.0/+(right - left) );
      tb = +( 1.0/+(top - bottom) );
      nf = +( 1.0/+(near - far) );

      setValues(Out,
                2.0 * near * rl, 0.0, (right + left) * rl, 0.0,
                0.0, 2.0 * near * tb, (top + bottom) * tb, 0.0,
                0.0, 0.0, (far + near) * nf, far * near * 2.0 * nf,
                0.0, 0.0,  -1.0, 0.0);
      return;
    }

    function perspective(Out, fovy, aspect, near, far) {
      Out = Out|0;
      fovy = +fovy;
      aspect = +aspect;
      near = +near;
      far = +far;

      var f = 0.0,
          nf = 0.0;

      f = 1.0 / +tan(fovy/2.0);
      nf = 1.0 / (near - far);

      setValues(Out,
                f/aspect, 0.0, 0.0, 0.0,
                0.0, f, 0.0, 0.0,
                0.0, 0.0, (far + near) * nf, 2.0 * far * near * nf,
                0.0, 0.0, -1.0, 0.0);

      return;
    }

    function ortho(Out, left, right, bottom, top, near, far) {
      Out = Out|0;
      left = +left;
      right = +right;
      bottom = +bottom;
      top = +top;
      near = +near;
      far = +far;

      var lr = 0.0,
          bt = 0.0,
          nf = 0.0;

      lr = 1.0 / (left - right);
      bt = 1.0 / (bottom - top);
      nf = 1.0 / (near - far);

      setValues(Out,
                -2.0 * lr, 0.0, 0.0, (right + left ) * lr,
                0.0, -2.0 * bt, 0.0, (top + bottom) * bt,
                0.0, 0.0, 2.0 * nf, (far + near) * nf,
                0.0, 0.0, 0.0, 1.0);
      return;
    }

    function lookAt(Out, eye, center, up) {
      Out = Out|0;
      eye = eye|0; //vec3
      center = center|0; //vec3
      up = up|0; // vec3

      var eyeX = 0.0,
          eyeY = 0.0,
          eyeZ = 0.0,
          centerX = 0.0,
          centerY = 0.0,
          centerZ = 0.0,
          upX = 0.0,
          upY = 0.0,
          upZ = 0.0,
          z0 = 0.0,
          z1 = 0.0,
          z2 = 0.0,
          x0 = 0.0,
          x1 = 0.0,
          x2 = 0.0,
          y0 = 0.0,
          y1 = 0.0,
          y2 = 0.0,
          olen = 0.0;

      eyeX = +vec3_get(~~eye, 0);
      eyeY = +vec3_get(~~eye, 1);
      eyeZ = +vec3_get(~~eye, 2);

      centerX = +vec3_get(~~center, 0);
      centerY = +vec3_get(~~center, 1);
      centerZ = +vec3_get(~~center, 2);

      upX = +vec3_get(~~up, 0);
      upY = +vec3_get(~~up, 1);
      upZ = +vec3_get(~~up, 2);

      z0 = eyeX - centerX;
      z1 = eyeY - centerY;
      z2 = eyeZ - centerZ;
      olen = 1.0 / +sqrt(z0*z0 + z1*z1 + z2*z2);
      if(+olen == INF) {
        identity(Out);
        return;
      }
      else {
        z0 = z0 * olen;
        z1 = z1 * olen;
        z2 = z2 * olen;
      }

      x0 = upY * z2 - upZ * z1;
      x1 = upZ * z0 - upX * z2;
      x2 = upX * z1 - upY * z0;
      olen = 1.0 / +sqrt(x0*x0 + x1*x1 + x2*x2);
      if(+olen == INF) {
        x0 = 0.0;
        x1 = 0.0;
        x2 = 0.0;
      }
      else {
        x0 = x0 * olen;
        x1 = x1 * olen;
        x2 = x2 * olen;
      }

      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;
      olen = 1.0 / +sqrt(y0*y0 + y1*y1 + y2*y2);
      if(+olen == INF) {
        y0 = 0.0;
        y1 = 0.0;
        y2 = 0.0;
      }
      else {
        y0 = y0 * olen;
        y1 = y1 * olen;
        y2 = y2 * olen;
      }

      setValues(Out,
                x0, x1, x2, -(x0 * eyeX + x1 * eyeY + x2 * eyeZ),
                y0, y1, y2, -(y0 * eyeX + y1 * eyeY + y2 * eyeZ),
                z0, z1, z2, -(z0 * eyeX + z1 * eyeY + z2 * eyeZ),
                0.0, 0.0, 0.0, 1.0);

      return;
    }

    function trace(A) {
      A = A|0;
      return +(+get(A, 0, 0) + +get(A, 1, 1) + +get(A, 2, 2) + +get(A, 3, 3));
    }

    function invert(Out, A) {
      Out = Out|0;
      A = A|0;

      var b00 = 0.0, b01 = 0.0, b02 = 0.0, b03 = 0.0,
          b04 = 0.0, b05 = 0.0, b06 = 0.0, b07 = 0.0,
          b08 = 0.0, b09 = 0.0, b10 = 0.0, b11 = 0.0,
          odet = 0.0;

      b00 = +get(A, 0, 0) * +get(A, 1, 1) - +get(A, 0, 1) * +get(A, 1, 0);
      b01 = +get(A, 0, 0) * +get(A, 1, 2) - +get(A, 0, 2) * +get(A, 1, 0);
      b02 = +get(A, 0, 0) * +get(A, 1, 3) - +get(A, 0, 3) * +get(A, 1, 0);
      b03 = +get(A, 0, 1) * +get(A, 1, 2) - +get(A, 0, 2) * +get(A, 1, 1);
      b04 = +get(A, 0, 1) * +get(A, 1, 3) - +get(A, 0, 3) * +get(A, 1, 1);
      b05 = +get(A, 0, 2) * +get(A, 1, 3) - +get(A, 0, 3) * +get(A, 1, 2);
      b06 = +get(A, 2, 0) * +get(A, 3, 1) - +get(A, 2, 1) * +get(A, 3, 0);
      b07 = +get(A, 2, 0) * +get(A, 3, 2) - +get(A, 2, 2) * +get(A, 3, 0);
      b08 = +get(A, 2, 0) * +get(A, 3, 3) - +get(A, 2, 3) * +get(A, 3, 0);
      b09 = +get(A, 2, 1) * +get(A, 3, 2) - +get(A, 2, 2) * +get(A, 3, 1);
      b10 = +get(A, 2, 1) * +get(A, 3, 3) - +get(A, 2, 3) * +get(A, 3, 1);
      b11 = +get(A, 2, 2) * +get(A, 3, 3) - +get(A, 2, 3) * +get(A, 3, 2);

      odet = 1.0/(b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

      if(odet == INF) {
        return;
      }

      set(Out, 0, 0, (+get(A, 1, 1) * b11 - +get(A, 1, 2) * b10 + +get(A, 1, 3) * b09) * odet);
      set(Out, 0, 1, (+get(A, 0, 2) * b10 - +get(A, 0, 1) * b11 - +get(A, 0, 3) * b09) * odet);
      set(Out, 0, 2, (+get(A, 3, 1) * b05 - +get(A, 3, 2) * b04 + +get(A, 3, 3) * b03) * odet);
      set(Out, 0, 3, (+get(A, 2, 2) * b04 - +get(A, 2, 1) * b05 - +get(A, 2, 3) * b03) * odet);
      set(Out, 1, 0, (+get(A, 1, 2) * b08 - +get(A, 1, 0) * b11 - +get(A, 1, 3) * b07) * odet);
      set(Out, 1, 1, (+get(A, 0, 0) * b11 - +get(A, 0, 2) * b08 + +get(A, 0, 3) * b07) * odet);
      set(Out, 1, 2, (+get(A, 3, 2) * b02 - +get(A, 3, 0) * b05 - +get(A, 3, 3) * b01) * odet);
      set(Out, 1, 3, (+get(A, 2, 0) * b05 - +get(A, 2, 2) * b02 + +get(A, 2, 3) * b01) * odet);
      set(Out, 2, 0, (+get(A, 1, 0) * b10 - +get(A, 1, 1) * b08 + +get(A, 1, 3) * b06) * odet);
      set(Out, 2, 1, (+get(A, 0, 1) * b08 - +get(A, 0, 0) * b10 - +get(A, 0, 3) * b06) * odet);
      set(Out, 2, 2, (+get(A, 3, 0) * b04 - +get(A, 3, 1) * b02 + +get(A, 3, 3) * b00) * odet);
      set(Out, 2, 3, (+get(A, 2, 1) * b02 - +get(A, 2, 0) * b04 - +get(A, 2, 3) * b00) * odet);
      set(Out, 3, 0, (+get(A, 1, 1) * b07 - +get(A, 1, 0) * b09 - +get(A, 1, 2) * b06) * odet);
      set(Out, 3, 1, (+get(A, 0, 0) * b09 - +get(A, 0, 1) * b07 + +get(A, 0, 2) * b06) * odet);
      set(Out, 3, 2, (+get(A, 3, 1) * b01 - +get(A, 3, 0) * b03 - +get(A, 3, 2) * b00) * odet);
      set(Out, 3, 3, (+get(A, 2, 0) * b03 - +get(A, 2, 1) * b01 + +get(A, 2, 2) * b00) * odet);

      return;
    }

    return {
      create : create,
      identity : identity,
      clone : clone,
      copy : copy,
      copyColumn : copyColumn,
      set : set,
      get : get,
      multiply : multiply,
      mul : multiply,
      multiplyScalar : multiplyScalar,
      add : add,
      subtract : subtract,
      sub : subtract,
      equal : equal,
      setValues : setValues,
      fromValues : fromValues,
      transpose : transpose,
      determinant : determinant,
      det : determinant,
      translate : translate,
      frustum : frustum,
      perspective : perspective,
      ortho : ortho,
      trace : trace,
      rotate : rotate,
      rotateX : rotateX,
      rotateY : rotateY,
      rotateZ : rotateZ,
      invert : invert,
      inv : invert
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

  mat4.fromArray = function(ar) {
    if(ar.length < 16) {
      return null;
    }
    return mat4.fromValues(
      ar[0],  ar[1],  ar[2],  ar[3],
      ar[4],  ar[5],  ar[6],  ar[7],
      ar[8],  ar[9],  ar[10], ar[11],
      ar[12], ar[13], ar[14], ar[15]
    );
  };

  mat4.diag = function(A) {
    return [
      mat4.get(A, 0, 0),
      mat4.get(A, 1, 1),
      mat4.get(A, 2, 2),
      mat4.get(A, 3, 3)
      ];
  };

  return mat4;
}

var mat4 = createMat4();
