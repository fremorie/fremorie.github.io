uniform vec2 uRes;
uniform float uTime;
uniform float uUnit;
uniform float uScale;
uniform float uFill;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform vec3 uAccent;
uniform vec3 uMouse;
uniform float uRadius;
uniform bool uText;
uniform sampler2D uMask;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p = p * 2.02 + vec2(1.7, 9.2);
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 p = gl_FragCoord.xy;

    vec2 toMouse = p - uMouse.xy;
    float lens = uMouse.z * exp(-dot(toMouse, toMouse) / (uRadius * uRadius));
    vec2 uv = (p - toMouse * lens * 0.35) / uUnit * uScale;

    float t = uTime * 0.03;
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(uv + 3.0 * q + vec2(1.7, 9.2) + t), fbm(uv + 3.0 * q + vec2(8.3, 2.8) - t));
    float h = fbm(uv + 3.0 * r) * 14.0 + lens * 1.5;

    float line = 1.0 - smoothstep(0.0, fwidth(h) * 1.1, abs(fract(h) - 0.5));
    float fill = smoothstep(uFill, uFill + 0.2, h);

    if (uText) {
        float a = texture2D(uMask, p / uRes).a;
        vec3 col = mix(uInk, uAccent, fill * 0.55);
        col = mix(col, uPaper, line * 0.4);
        gl_FragColor = vec4(col * a, a);
    } else {
        vec3 col = mix(uPaper, uAccent, fill * 0.7);
        col = mix(col, uInk, line * 0.28);
        gl_FragColor = vec4(col, 1.0);
    }
}
