# HSK Momo – แอปฝึกภาษาจีนและสอบ HSK (iOS + Android)

แอปมือถือที่ทำงานเองทั้งหมด ไม่ต้องเปิดเว็บไซต์ สร้างด้วย **Expo (React Native)** + **Firebase**
ใช้โค้ดชุดเดียวขึ้นได้ทั้ง **App Store** และ **Google Play** (และเปิดเป็นเว็บสำหรับครูบนคอมพิวเตอร์ได้)

## สิ่งที่มีในแอป

| ส่วน | รายละเอียด |
|---|---|
| ล็อกอิน | อีเมล/รหัสผ่าน, Google, Facebook, WeChat, Apple ID ใช้ได้จริงทั้ง iPhone, Android และเว็บ (ผูกบัญชีเดียวผ่าน Firebase Auth) |
| สมัครสมาชิก | ตรวจรูปแบบอีเมล, รหัสผ่าน 8 ตัวขึ้นไปมีตัวอักษรและตัวเลข, ส่งลิงก์ยืนยันอีเมล |
| ลืมรหัสผ่าน | ส่ง **รหัส 6 หลักทางอีเมลเท่านั้น** → ยืนยันรหัส → ตั้งรหัสใหม่ (รหัสอายุ 10 นาที, ผิดได้ 5 ครั้ง, ขอใหม่ได้ทุก 60 วิ) |
| คำศัพท์ | HSK 3.0 ระดับ 1–6 ครบ **5,455 คำ** มีพินอิน ชนิดคำ ความหมาย ประโยคตัวอย่าง เสียงอ่าน คำโปรด ค้นหา ซ่อนความหมาย และแบบทดสอบ 20 ข้อ |
| แบบทดสอบ | **HSK 5 ชุดที่ 1–5 จากเว็บ HSKmomotest** ครบ **ชุดละ 100 ข้อตามข้อสอบจริง** (ฟัง 45 · อ่าน 45 · เขียน 10, เวลา 30+45+40 นาที, เต็ม 300 ผ่าน 180) มีบทสนทนาสั้น/ยาว เสียงชาย-หญิงแยกกัน เฉลย สคริปต์ คำอธิบาย + ชุดฝึก HSK 1–6 ระดับละ 5 ชุดตามโครงสร้างข้อสอบจริง (จำนวนข้อ เวลา ลำดับส่วน) |
| ห้องสอบ | โหมดสอบจริง (จับเวลา ฟังได้ข้อละ 2 ครั้ง ส่งอัตโนมัติเมื่อหมดเวลา) / โหมดฝึก (ฟังซ้ำ ดูสคริปต์) เรียงประโยค เขียนเรียงความ |
| ผลสอบ | คะแนนแยกส่วน เฉลยเฉพาะข้อผิด สคริปต์เสียง ตัวอย่างคำตอบ ประวัติผลสอบ |
| ภาษา | สลับได้จริง: **จีน–ไทย, จีน–อังกฤษ, จีน–ลาว, จีน–เวียดนาม** ทั้งหน้าจอและคำแปลคำศัพท์ |
| เสียง | ปรับ **ระดับเสียง** และ **ความเร็ว** ได้จริง, **เสียงผู้ชาย (男) / ผู้หญิง (女) แยกกัน** ทุกชุดข้อสอบ, เลือกเสียงในเครื่องเองได้ |
| ระบบครู | ครูสร้างห้องเรียน → ได้รหัสห้อง → นักเรียนกรอกรหัส → ผลสอบเข้าระบบครูทันที (เรียลไทม์) ครูให้คะแนนเรียงความ เขียนความเห็น ส่งออก CSV |
| อื่น ๆ | คู่มือสอบทุกระดับ, แบบประเมินหลังสอบ, ระดับเป้าหมาย, ลบบัญชี (ข้อบังคับของ Apple/Google), ใช้งานออฟไลน์ได้ (ซิงก์เมื่อออนไลน์) |

---

## 1. ลองรันทันที (โหมดเดโม ยังไม่ต้องตั้งค่า Firebase)

ต้องมี Node.js 20.19+ บนคอมพิวเตอร์ (โปรเจกต์ใช้ **Expo SDK 54** ซึ่งตั้ง target เป็น Android 16 / API 36 ตามข้อกำหนดล่าสุดของ Google Play)

```bash
cd hsk-momo
npm install
npx expo install --fix      # ปรับเวอร์ชันแพ็กเกจให้ตรงกับ Expo ที่ติดตั้ง
npx expo start
```

สแกน QR ด้วยแอป **Expo Go** บนมือถือ หรือกด `w` เพื่อเปิดบนเว็บ
ในโหมดเดโม ล็อกอินด้วยอีเมลอะไรก็ได้ ข้อมูลเก็บในเครื่อง ระบบครูเปิดให้ลองได้ และรหัสลืมรหัสผ่านคือ `482190`

> ปุ่ม WeChat ใช้ไม่ได้ใน Expo Go (ต้องใช้ development build ในข้อ 6)

## 2. ตั้งค่า Firebase (ระบบหลังบ้าน / ระบบกลาง)

1. ไปที่ <https://console.firebase.google.com> → **Add project** (เลือกแพ็กเกจ **Blaze** เพราะ Cloud Functions ต้องใช้ — มีโควตาฟรีรายเดือน)
2. **Build → Authentication → Sign-in method** เปิด: Email/Password, Google, Facebook, Apple
3. **Build → Firestore Database** → Create database (region `asia-southeast1`)
4. **Build → Storage** → Get started
5. **Project settings → Your apps → Web app** → คัดลอกค่า config
6. คัดลอก `.env.example` เป็น `.env` แล้วใส่ค่าที่ได้
7. ติดตั้งและ deploy ระบบหลังบ้าน:

```bash
npm install -g firebase-tools
firebase login
firebase use --add                     # เลือกโปรเจกต์
cd functions && npm install && cd ..
firebase deploy --only firestore,storage,functions
```

## 3. อีเมลส่งรหัสลืมรหัสผ่าน

ใช้ SMTP ใดก็ได้ เช่น Gmail (สร้าง App Password ที่ <https://myaccount.google.com/apppasswords>) หรือ SendGrid / Mailgun

```bash
firebase functions:secrets:set SMTP_HOST     # เช่น smtp.gmail.com
firebase functions:secrets:set SMTP_USER     # อีเมลผู้ส่ง
firebase functions:secrets:set SMTP_PASS     # App Password
firebase deploy --only functions
```

## 4. เสียงคุณภาพสูง (ชาย/หญิง) และการแปลคำศัพท์อัตโนมัติ

ใน Google Cloud Console ของโปรเจกต์เดียวกัน เปิด API: **Cloud Text-to-Speech API** และ **Cloud Translation API**
- เสียง: ฟังก์ชัน `tts` สร้างไฟล์ MP3 เสียงผู้ชาย `cmn-CN-Wavenet-B` / ผู้หญิง `cmn-CN-Wavenet-A` แล้วเก็บแคชไว้ ข้อความเดิมจะไม่เสียเงินซ้ำ
- ถ้าออฟไลน์ แอปจะใช้เสียงจีนในเครื่องแทนอัตโนมัติ (ตั้งค่า > เลือกเสียงชาย/หญิง)
- คำแปล: **ทั้ง 5,455 คำมีความหมายครบ 4 ภาษา (ไทย อังกฤษ ลาว เวียดนาม) ฝังในแอปแล้ว ใช้ออฟไลน์ได้** ส่วนคำแปลประโยคตัวอย่างมีภาษาไทยครบ ภาษาอื่นจะแสดงประโยคจีน+พินอิน (ถ้าต้องการแปลประโยคตัวอย่างด้วย ให้รันคำสั่งด้านล่าง)
- แนะนำให้ครูหรือเจ้าของภาษาตรวจคำแปลภาษาลาวอีกรอบก่อนเผยแพร่ (ไฟล์ `assets/data/vocab-hsk*.json` ช่อง `m.lo`)
- ถ้าต้องการให้คำแปลทุกภาษาฝังในแอปเลย (ใช้ออฟไลน์ได้ 100%): สร้าง API key แล้วรัน

```bash
GOOGLE_TRANSLATE_API_KEY=xxxx npm run translate-vocab
```

## 5. ระบบครู (ระบบกลางเชื่อมครูกับนักเรียน)

1. สมัครบัญชีในแอปด้วยอีเมลของผู้ดูแล
2. ดาวน์โหลด service account: Firebase console → Project settings → Service accounts → Generate new private key → บันทึกเป็น `service-account.json` ในโฟลเดอร์โปรเจกต์
3. รัน: `npm run seed -- admin@school.com TEACHER2026 30`
   → บัญชีนี้เป็นผู้ดูแล และได้ **รหัสครู `TEACHER2026`** ใช้ได้ 30 คน
4. ครูแต่ละคน: แท็บ "ฉัน" → **ยืนยันสิทธิ์ครู** → กรอกรหัสครู → แท็บ **ครู** จะปรากฏ
5. ครูสร้างห้องเรียน → ได้ **รหัสห้อง 6 ตัว** → ให้นักเรียนกรอกที่ "ฉัน → เข้าร่วมห้องเรียน"
6. ผลสอบของนักเรียนในห้องจะขึ้นที่หน้าห้องเรียนของครูทันที ครูให้คะแนนเรียงความ (เขียน) ได้ และส่งออก CSV
7. ครูใช้บนคอมพิวเตอร์ได้: `npx expo export -p web` แล้ว `firebase deploy --only hosting`

ความปลอดภัย (ไฟล์ `firestore.rules`): นักเรียนเห็นเฉพาะผลของตัวเอง ครูเห็นเฉพาะนักเรียนในห้องของตน และแก้ได้เฉพาะคะแนนเรียงความ ส่วนสิทธิ์ครูเปลี่ยนได้จากฝั่งเซิร์ฟเวอร์เท่านั้น

## 6. ตั้งค่าการล็อกอินแต่ละแบบ (ใช้ได้จริงทั้ง iPhone, Android และเว็บ)

ทุกช่องทางผูกกับ **Firebase Authentication** บัญชีเดียวกัน ล็อกอินจากมือถือหรือเว็บก็เห็นข้อมูลชุดเดียวกัน

| ช่องทาง | iPhone / iPad | Android | เว็บ (คอมพิวเตอร์ + เบราว์เซอร์มือถือ) |
|---|---|---|---|
| Google | หน้าต่าง Google ในแอป | หน้าต่าง Google ในแอป | ป๊อปอัป Google |
| Facebook | หน้าต่าง Facebook ในแอป | หน้าต่าง Facebook ในแอป | ป๊อปอัป Facebook |
| Apple ID | ปุ่ม Apple ของระบบ (Face ID) | หน้าล็อกอิน Apple ในแท็บที่ปลอดภัย | ป๊อปอัป Apple |
| WeChat | เปิดแอป WeChat แล้วกดอนุญาต | เปิดแอป WeChat แล้วกดอนุญาต | คอมพิวเตอร์: สแกน QR ด้วย WeChat · ในเบราว์เซอร์ของ WeChat: กดอนุญาต · เบราว์เซอร์มือถืออื่น: ขึ้นข้อความให้เปิดใน WeChat หรือแอป (WeChat ไม่รองรับกรณีนี้) |

### 6.1 Google
1. Firebase → Authentication → Sign-in method → เปิด **Google**
2. Google Cloud Console (โปรเจกต์เดียวกัน) → APIs & Services → Credentials → สร้าง **OAuth client ID** 3 ตัว:
   - **Web** (Firebase สร้างให้แล้ว ชื่อ "Web client (auto created by Google Service)") → `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
   - **iOS** ใส่ Bundle ID → `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
   - **Android** ใส่ชื่อแพ็กเกจ + SHA-1 จาก `eas credentials` (และ SHA-1 ของ Google Play App Signing ใน Play Console → Setup → App integrity) → `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`

### 6.2 Facebook
1. <https://developers.facebook.com> → Create app → เพิ่ม **Facebook Login**
2. คัดลอก App ID / App Secret ไปใส่ใน Firebase → Sign-in method → **Facebook** แล้วคัดลอก OAuth redirect URI ที่ Firebase ให้ กลับไปใส่ใน Facebook Login → Settings → Valid OAuth Redirect URIs
3. เพิ่มแพลตฟอร์ม iOS (Bundle ID) และ Android (package + key hash) ในแอป Facebook · `EXPO_PUBLIC_FACEBOOK_APP_ID`
4. เปลี่ยนแอปเป็นโหมด **Live** ก่อนเปิดให้คนทั่วไปใช้

### 6.3 Apple ID
1. Firebase → Sign-in method → เปิด **Apple**
2. Apple Developer → Identifiers → App ID ของแอป → เปิด **Sign In with Apple** (iPhone ใช้ได้ทันที)
3. สำหรับ **Android และเว็บ**: Identifiers → **+ Services IDs** เช่น `com.hskmomo.signin` → เปิด Sign In with Apple → Configure:
   - Domains: `your-project.firebaseapp.com` และ `asia-southeast1-your-project.cloudfunctions.net`
   - Return URLs: `https://your-project.firebaseapp.com/__/auth/handler` (เว็บ) และ `https://asia-southeast1-your-project.cloudfunctions.net/appleCallback` (Android)
4. Keys → สร้าง key ที่เปิด Sign In with Apple → ใส่ Services ID, Team ID, Key ID และไฟล์ .p8 ใน Firebase → Apple (OAuth code flow configuration)
5. `.env`: `EXPO_PUBLIC_APPLE_SERVICE_ID`, `EXPO_PUBLIC_APPLE_REDIRECT_URL`

### 6.4 WeChat (ต้องเป็นบัญชีนิติบุคคล ยืนยันตัวตนที่ <https://open.weixin.qq.com>)
สร้างบนบัญชี Open Platform **เดียวกัน** (เพื่อให้ผู้ใช้คนเดียวได้ `unionid` เดียว = บัญชี HSK Momo เดียว ไม่ว่าจะล็อกอินจากแอปหรือเว็บ):

| ประเภท | ใช้กับ | ใส่ใน `.env` |
|---|---|---|
| 移动应用 Mobile App (ใส่ Bundle ID, package, ลายเซ็น Android, Universal Link) | แอป iOS/Android | `EXPO_PUBLIC_WECHAT_APP_ID`, `EXPO_PUBLIC_WECHAT_UNIVERSAL_LINK` |
| 网站应用 Website App (授权回调域 = โดเมนเว็บของคุณ) | QR บนคอมพิวเตอร์ | `EXPO_PUBLIC_WECHAT_WEB_APP_ID` |
| 服务号 Official Account (ไม่บังคับ; 网页授权域名 = โดเมนเว็บ) | เปิดเว็บในแอป WeChat | `EXPO_PUBLIC_WECHAT_MP_APP_ID` |

ใส่ AppSecret ไว้ฝั่งเซิร์ฟเวอร์เท่านั้น (secret เดียว ใส่เฉพาะประเภทที่ใช้):

```bash
firebase functions:secrets:set WECHAT_KEYS
# วางค่า: {"app":{"id":"wx...","secret":"..."},"web":{"id":"wx...","secret":"..."},"mp":{"id":"wx...","secret":"..."}}
```

### 6.5 เว็บจริง (ล็อกอินจริงบนเว็บ)
```bash
npx expo export -p web          # ได้โฟลเดอร์ dist
firebase deploy --only hosting  # ได้ https://your-project.web.app
```
แล้วไปที่ Firebase → Authentication → Settings → **Authorized domains** เพิ่ม `your-project.web.app` และโดเมนของคุณเอง (ถ้ามี)

Google, Facebook, Apple และ WeChat ต้องใช้ **development build** (ไม่ใช่ Expo Go):

```bash
npm install -g eas-cli
eas login
eas build --profile development --platform android   # หรือ ios
```

## 7. ขึ้น App Store และ Google Play

สิ่งที่ต้องมี: บัญชี **Apple Developer** (99 USD/ปี), บัญชี **Google Play Console** (25 USD ครั้งเดียว),
URL นโยบายความเป็นส่วนตัว (privacy policy), ภาพหน้าจอ, คำอธิบายแอป

```bash
eas build --platform android --profile production    # ได้ไฟล์ .aab
eas build --platform ios --profile production        # ได้ไฟล์ .ipa (EAS จัดการ certificate ให้)
eas submit --platform android                        # ส่งขึ้น Google Play (ต้องมี google-play-service-account.json)
eas submit --platform ios                            # ส่งขึ้น App Store Connect / TestFlight
```

เช็กลิสต์ก่อนส่งรีวิว:
- [ ] ตั้ง `EXPO_PUBLIC_BUNDLE_ID` เป็นชื่อแพ็กเกจของคุณเอง เช่น `com.yourschool.hskmomo`
- [ ] แก้ `eas.json` ส่วน `submit` (Apple ID, App Store Connect App ID)
- [ ] มีปุ่ม Sign in with Apple บน iOS แล้ว (Apple บังคับเมื่อมีล็อกอินโซเชียล) ✓
- [ ] มีเมนูลบบัญชีในแอปแล้ว (Apple/Google บังคับ) ✓
- [ ] Google Play: กรอก Data safety form (เก็บอีเมล ชื่อ ผลสอบ) และลิงก์ลบบัญชี
- [ ] ทดสอบด้วย TestFlight / Internal testing ก่อนเผยแพร่
- [ ] รัน `npx expo-doctor` ให้ผ่านทุกข้อก่อน build (โปรเจกต์ใช้ Expo SDK 54 → targetSdk 36 ตามที่ Google Play กำหนด)

## 8. เพิ่มข้อสอบชุดใหม่

ข้อสอบใช้ JSON รูปแบบเดียวกับ `assets/data/hsk5.json`:

```json
{ "id": "hsk4-school-1", "level": 4, "set": 1, "title": "HSK 4 ชุดโรงเรียน 1", "total": 300, "pass": 180,
  "counts": { "listening": 1, "reading": 1 },
  "sections": [
    { "key": "listening", "minutes": 30, "parts": [ { "title": "第一部分", "groups": [
      { "audio": [ { "s": "M", "t": "你明天几点上班？" }, { "s": "F", "t": "九点，不过我想早点儿去。" }, { "s": "N", "t": "问：女的打算怎么做？" } ],
        "questions": [ { "n": 1, "q": "女的打算怎么做？", "o": ["早点儿去", "请假", "九点半去", "不去了"], "a": 0, "x": "คำอธิบาย" } ] } ] } ] },
    { "key": "reading", "minutes": 40, "parts": [ { "title": "第一部分", "groups": [
      { "cloze": true, "passage": "我每天都{{2}}跑步。", "questions": [ { "n": 2, "q": "", "o": ["坚持", "坚决", "坚固", "坚强"], "a": 0 } ] } ] } ] }
  ] }
```

`s`: `M` = เสียงผู้ชาย, `F` = เสียงผู้หญิง, `N` = ผู้บรรยาย/คำถาม · `a` = ลำดับคำตอบที่ถูก (เริ่มที่ 0)
ประเภทพิเศษ: `"type": "order"` (เรียงประโยค: `tiles`, `answers`) และ `"type": "essay"` (`prompt`, `words`, `min`, `sample`)
วางไฟล์ใน `assets/data` แล้วเพิ่มใน `src/data/exams.js` หรือบันทึกลงคอลเลกชัน `exams` ใน Firestore

## 8.1 เว็บเบต้า (หน้าเว็บจริง เก็บข้อมูลบนคลาวด์)

`node preview/build-web.mjs` → `web/dist/hsk-momo-web.html` ใช้โค้ดและข้อมูลชุดเดียวกับแอป
- บนคอมพิวเตอร์: มีแถบเมนูด้านซ้ายและเนื้อหาแบบกว้าง · บนมือถือ: หน้าตาเหมือนแอปและมีแท็บด้านล่าง
- ข้อมูลเก็บที่ `students/{uid}` (โปรไฟล์ ห้องเรียน สรุปผล), `students/{uid}/results/{rid}` (ผลสอบเต็ม), `classes/{id}`
- ผู้ที่มีสิทธิ์แก้ไขหน้า = ครู (เห็นนักเรียนทุกคน ให้คะแนนเรียงความ) · ผู้ใช้สิทธิ์ Contributor = นักเรียน (เห็นเฉพาะผลของตัวเอง)
- โค้ดเชื่อมคลาวด์อยู่ที่ `preview/cloud.js` และ CSS สำหรับเว็บอยู่ที่ `preview/web.css`

## 9. โครงสร้างไฟล์

```
app/                     หน้าจอ (expo-router)
  (auth)/                เข้าสู่ระบบ สมัคร ลืมรหัสผ่าน
  (tabs)/                หน้าแรก คำศัพท์ แบบทดสอบ คู่มือ ครู ฉัน
  exam/[id].js           ห้องสอบ
  result/[id].js         ผลสอบและเฉลย
  teacher/               ห้องเรียน ตรวจเรียงความ ยืนยันสิทธิ์ครู
src/
  data/                  คลังคำศัพท์ เครื่องมือสร้าง/ตรวจข้อสอบ คู่มือ
  i18n/strings.js        ข้อความ 4 ภาษา
  audio.js               เสียงชาย/หญิง ระดับเสียง ความเร็ว
  services/              auth, ผลสอบ, ห้องเรียน
assets/data/             hsk5.json (ข้อสอบ 5 ชุด), vocab-hsk1..6.json (5,455 คำ)
functions/index.js       Cloud Functions (รหัสอีเมล, WeChat, เสียง, แปล, ห้องเรียน, ลบบัญชี)
firestore.rules          สิทธิ์การเข้าถึงข้อมูล
```

## หมายเหตุ

- ข้อสอบ HSK 5 ทั้ง 5 ชุดดึงมาจากเว็บ HSKmomotest ของคุณ ชุดที่ 1, 3, 4, 5 บนเว็บมีข้อไม่ครบ 100 ข้อ จึงเติมข้อเสริมที่แต่งขึ้นใหม่ให้ครบโครงสร้างจริง (ติดป้าย `"sup": true` ในไฟล์ แก้/ลบได้ แล้วรัน `npm run complete-hsk5` เพื่อจัดเลขข้อใหม่) ส่วนชุดฝึก HSK 1–6 สร้างจากคำศัพท์และประโยคตัวอย่างตามระดับ โดยใช้โครงสร้างข้อสอบจริง ข้อสอบจริงที่ออกโดย Chinese Testing International มีลิขสิทธิ์ จะนำมาใส่ได้เมื่อได้รับอนุญาตแล้วเท่านั้น
- คำศัพท์อิงรายการ HSK 3.0 ระดับ 1–6 (5,455 คำ)
