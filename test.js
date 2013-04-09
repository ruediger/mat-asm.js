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

mat4.setValues(A,
                1.0,  2.0,  3.0,  4.0,
                5.0,  6.0,  7.0,  8.0,
                9.0, 10.0, 11.0, 12.0,
               13.0, 14.0, 15.0, 16.0);
mat4.identity(B);
mat4.add(C, A, B); // C = A + B
mat4.setValues(B,
                2.0,  2.0,  3.0,  4.0,
                5.0,  7.0,  7.0,  8.0,
                9.0, 10.0, 12.0, 12.0,
               13.0, 14.0, 15.0, 17.0);
check_eq(C, B, "mat4.add");
mat4.identity(B);
mat4.sub(C, A, B); // C = A - B
mat4.setValues(B,
                0.0,  2.0,  3.0,  4.0,
                5.0,  5.0,  7.0,  8.0,
                9.0, 10.0, 10.0, 12.0,
               13.0, 14.0, 15.0, 15.0);
check_eq(C, B, "mat4.sub");

mat4.setValues(A,
                1.0,  2.0,  3.0,  4.0,
                5.0,  6.0,  7.0,  8.0,
                9.0, 10.0, 11.0, 12.0,
               13.0, 14.0, 15.0, 16.0);
mat4.multiplyScalar(C, 2.0, A);
mat4.setValues(A,
               2.0, 4.0, 6.0, 8.0,
               10.0, 12.0, 14.0, 16.0,
               18.0, 20.0, 22.0, 24.0,
               26.0, 28.0, 30.0, 32.0);
check_eq(C, A, "mat4.multiplyScalar");

mat4.setValues(A,
               1.0, 1.0, 1.0, 1.0,
               1.0, 1.0, 1.0, 1.0,
               1.0, 1.0, 1.0, 1.0,
               1.0, 1.0, 1.0, 1.0);
mat4.rotateX(C, A, Math.PI/2);
mat4.setValues(B,
               1.0, 1.0, -1.0, 1.0,
               1.0, 1.0, -1.0, 1.0,
               1.0, 1.0, -1.0, 1.0,
               1.0, 1.0, -1.0, 1.0);
check_eq(B, C, "mat4.rotateX");
vec3.setValues(v, 1.0, 0.0, 0.0);
mat4.rotate(B, A, v, Math.PI/2);
check_eq(B, C, "mat4.rotate (X)");
mat4.rotateY(C, A, Math.PI/2);
mat4.setValues(B,
               -1.0, 1.0, 1.0, 1.0,
               -1.0, 1.0, 1.0, 1.0,
               -1.0, 1.0, 1.0, 1.0,
               -1.0, 1.0, 1.0, 1.0);
check_eq(B, C, "mat4.rotateY");
vec3.setValues(v, 0.0, 1.0, 0.0);
mat4.rotate(B, A, v, Math.PI/2);
check_eq(B, C, "mat4.rotate (Y)");
mat4.rotateZ(C, A, Math.PI/2);
mat4.setValues(B,
               1.0, -1.0, 1.0, 1.0,
               1.0, -1.0, 1.0, 1.0,
               1.0, -1.0, 1.0, 1.0,
               1.0, -1.0, 1.0, 1.0);
check_eq(B, C, "mat4.rotateZ");
vec3.setValues(v, 0.0, 0.0, 1.0);
mat4.rotate(B, A, v, Math.PI/2);
check_eq(B, C, "mat4.rotate (Z)");

mat4.identity(A);
mat4.invert(C, A);
check_eq(A, C, "mat4.invert");

mat4.setValues(A,
               1.0,   2.0,   0.0,   0.0,
               4.0,   1.0,   0.0,   0.0,
               0.0,   0.0,   1.0,   0.0,
               0.0,   0.0,   0.0,   1.0);
mat4.inv(C, A);
// console.log(mat4.format(C));
// TODO find a good example matrix.  Something that doesn't cause floating point rounding issues when compared.

check_reset();
mat4.setValues(B,
               1.0,  5.0,  9.0, 13.0,
               2.0,  6.0, 10.0,  8.0,
               3.0,  7.0, 11.0, 15.0,
               4.0,  8.0, 12.0, 16.0);
check_eq(mat4.determinant(B), 0.0, "mat4.determinant");
mat4.identity(B);
check_eq(mat4.determinant(B), 1.0, "mat4.determinant (identity)");

mat4.setValues(B,
               1.0,  5.0,  9.0, 13.0,
               2.0,  6.0, 10.0,  8.0,
               3.0,  7.0, 11.0, 15.0,
               4.0,  8.0, 12.0, 16.0);
check_eq(mat4.trace(B), 1.0+6.0+11.0+16.0, "mat4.trace");
mat4.transpose(A, B);
check_eq(mat4.trace(A), 1.0+6.0+11.0+16.0, "mat4.trace^T");
mat4.identity(B);
check_eq(mat4.trace(B), 4.0, "mat4.trace (identity)");

check_status();
